const escapeHtml = (value) => String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;')
  .replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
const decodeHtml = (value) => value.replace(/&(amp|lt|gt|quot|#39);/g, (_, entity) =>
  ({ amp: '&', lt: '<', gt: '>', quot: '"', '#39': "'" })[entity]);
const plainText = (html) => decodeHtml(html.replace(/<[^>]*>/g, ''));
const slug = (value) => value.normalize('NFKD').replace(/[\u0300-\u036f]/g, '')
  .toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'section';

const fenceStart = (line) => line.match(/^ {0,3}(`{3,}|~{3,})([^\r\n]*)$/);
const headingMatch = (line) => line.match(/^ {0,3}(#{1,6})[ \t]+(.+?)(?:[ \t]+#+)?[ \t]*$/);
const listMatch = (line) => {
  const match = line.match(/^( *)([-+*]|\d+[.)])\s+(.+)$/);
  return match && { indent: match[1].length, ordered: /^\d/.test(match[2]),
    start: parseInt(match[2], 10), text: match[3] };
};
const separator = (line) => /^ {0,3}(?:(?:\*\s*){3,}|(?:-\s*){3,}|(?:_\s*){3,})$/.test(line);

function tableCells(line) {
  const cells = [];
  let cell = '', ticks = 0;
  const source = line.trim();
  for (let i = 0; i < source.length; i++) {
    if (source[i] === '\\' && i + 1 < source.length) { cell += source[i] + source[++i]; continue; }
    if (source[i] === '`') {
      const run = source.slice(i).match(/^`+/)[0];
      ticks = ticks === run.length ? 0 : ticks || run.length;
      cell += run;
      i += run.length - 1;
    } else if (source[i] === '|' && !ticks) { cells.push(cell.trim()); cell = ''; }
    else cell += source[i];
  }
  cells.push(cell.trim());
  if (source.startsWith('|')) cells.shift();
  if (source.endsWith('|') && !source.endsWith('\\|')) cells.pop();
  return cells;
}

const isTableRule = (line) => {
  const cells = tableCells(line || '');
  return cells.length > 0 && cells.every((cell) => /^:?-{3,}:?$/.test(cell));
};

function closingBracket(source, start, open, close) {
  let depth = 0;
  for (let i = start; i < source.length; i++) {
    if (source[i] === '\\') { i++; continue; }
    if (source[i] === open) depth++;
    else if (source[i] === close && --depth === 0) return i;
  }
  return -1;
}

function safeLink(destination, linkMap) {
  let value = destination.trim();
  if (!value || /[\u0000-\u0020\u007f\\]/.test(value) || value.startsWith('//')) return null;
  const scheme = value.match(/^([a-z][a-z0-9+.-]*):/i);
  if (scheme) {
    if (!['http', 'https', 'mailto'].includes(scheme[1].toLowerCase())) return null;
    if (/^https?:/i.test(value)) {
      try { if (!new URL(value).hostname || !/^https?:\/\//i.test(value)) return null; }
      catch { return null; }
    } else if (!/^mailto:[^\s@]+@[^\s@]+/i.test(value)) return null;
    return value;
  }
  const split = value.search(/[?#]/);
  const pathname = split === -1 ? value : value.slice(0, split);
  const suffix = split === -1 ? '' : value.slice(split);
  const basename = pathname.split('/').pop();
  if (/\.md$/i.test(basename || '')) {
    const entries = linkMap instanceof Map ? [...linkMap.entries()] : Object.entries(linkMap || {});
    const mapped = entries.find(([key]) => key.toLowerCase() === basename.toLowerCase());
    if (mapped) {
      // Validate map values too; only the original local path gets rewritten.
      const target = safeLink(String(mapped[1]), {});
      return target ? target + suffix : null;
    }
  }
  return value;
}

function trimBareUrl(value) {
  let result = value.replace(/[.,;:!?]+$/g, '');
  for (const [open, close] of [['(', ')'], ['[', ']'], ['{', '}']]) {
    while (result.endsWith(close) && result.split(close).length > result.split(open).length) result = result.slice(0, -1);
  }
  return result;
}

/** Render the project's prose Markdown without trusting source HTML or URLs. */
export function renderDocument(markdown, options = {}) {
  const lines = String(markdown ?? '').replace(/\r\n?/g, '\n').split('\n');
  const evidence = new Set();
  let scanningFence = null;
  for (const line of lines) {
    const fence = fenceStart(line);
    if (scanningFence) {
      if (new RegExp(`^ {0,3}${scanningFence.character}{${scanningFence.length},}\\s*$`).test(line)) scanningFence = null;
      continue;
    }
    if (fence) { scanningFence = { character: fence[1][0], length: fence[1].length }; continue; }
    const match = line.match(/^\s*[-+*]\s+\*\*([A-Z]+\d+):\*\*/);
    if (match) evidence.add(match[1]);
  }
  const ids = new Set(options.referenceCodes ? [...evidence].map((code) => `source-${code.toLowerCase()}`) : []);
  const anchoredEvidence = new Set();
  const headings = [];
  let title = '', latestHeading = '';
  const uniqueId = (text) => {
    const base = slug(text);
    let candidate = base, count = 2;
    while (ids.has(candidate)) candidate = `${base}-${count++}`;
    ids.add(candidate);
    return candidate;
  };

  const inline = (source, depth = 0) => {
    if (depth > 20) return escapeHtml(source);
    let html = '';
    for (let i = 0; i < source.length;) {
      const remaining = source.slice(i);
      if (source[i] === '\\' && /[\\`*{}\[\]()#+\-.!_|>]/.test(source[i + 1] || '')) {
        html += escapeHtml(source[i + 1]); i += 2; continue;
      }
      if (source[i] === '`') {
        const ticks = remaining.match(/^`+/)[0];
        const end = source.indexOf(ticks, i + ticks.length);
        if (end !== -1) {
          html += `<code>${escapeHtml(source.slice(i + ticks.length, end).replace(/\n/g, ' '))}</code>`;
          i = end + ticks.length; continue;
        }
      }
      if (source[i] === '[') {
        const labelEnd = closingBracket(source, i, '[', ']');
        if (labelEnd !== -1 && source[labelEnd + 1] === '(') {
          const destinationEnd = closingBracket(source, labelEnd + 1, '(', ')');
          if (destinationEnd !== -1) {
            let destination = source.slice(labelEnd + 2, destinationEnd).trim();
            const withTitle = destination.match(/^(.*?)\s+["']([^"']*)["']$/);
            if (withTitle) destination = withTitle[1];
            if (destination.startsWith('<') && destination.endsWith('>')) destination = destination.slice(1, -1);
            const href = safeLink(destination, options.linkMap);
            const label = inline(source.slice(i + 1, labelEnd), depth + 1);
            html += href ? `<a href="${escapeHtml(href)}"${withTitle ? ` title="${escapeHtml(withTitle[2])}"` : ''}>${label}</a>` : label;
            i = destinationEnd + 1; continue;
          }
        }
        const marker = options.referenceCodes && remaining.match(/^\[([A-Z]+\d+(?:\s*,\s*[A-Z]+\d+)*)\]/);
        if (marker && marker[1].split(/\s*,\s*/).some((code) => evidence.has(code))) {
          html += `<span class="evidence-references">[${marker[1].split(/\s*,\s*/).map((code) => evidence.has(code)
            ? `<a href="#source-${code.toLowerCase()}">${code}</a>` : escapeHtml(code)).join(', ')}]</span>`;
          i += marker[0].length; continue;
        }
      }
      const autolink = remaining.match(/^<(https?:\/\/[^\s<>]+|mailto:[^\s<>]+)>/i);
      if (autolink) {
        const href = safeLink(autolink[1], options.linkMap);
        if (href) { html += `<a href="${escapeHtml(href)}">${escapeHtml(autolink[1])}</a>`; i += autolink[0].length; continue; }
      }
      const bare = remaining.match(/^https?:\/\/[^\s<>]+/i);
      if (bare) {
        const url = trimBareUrl(bare[0]);
        const href = safeLink(url, options.linkMap);
        if (href) { html += `<a href="${escapeHtml(href)}">${escapeHtml(url)}</a>`; i += url.length; continue; }
      }
      const delimiter = remaining.startsWith('**') ? '**' : remaining.startsWith('__') ? '__' :
        source[i] === '*' ? '*' : source[i] === '_' && !/\w/.test(source[i - 1] || '') ? '_' : null;
      if (delimiter) {
        const end = source.indexOf(delimiter, i + delimiter.length);
        if (end > i + delimiter.length) {
          const tag = delimiter.length === 2 ? 'strong' : 'em';
          html += `<${tag}>${inline(source.slice(i + delimiter.length, end), depth + 1)}</${tag}>`;
          i = end + delimiter.length; continue;
        }
      }
      html += escapeHtml(source[i]); i++;
    }
    return html;
  };

  const startsBlock = (index) => !lines[index]?.trim() || headingMatch(lines[index]) || fenceStart(lines[index]) ||
    separator(lines[index]) || listMatch(lines[index]) ||
    (lines[index].includes('|') && isTableRule(lines[index + 1]));

  const renderList = (start) => {
    const first = listMatch(lines[start]);
    let index = start, items = '';
    while (index < lines.length) {
      const item = listMatch(lines[index]);
      if (!item || item.indent !== first.indent || item.ordered !== first.ordered) break;
      let parts = [item.text];
      const content = [];
      const flush = () => { if (parts.length) content.push(inline(parts.join(' '))); parts = []; };
      index++;
      while (index < lines.length) {
        if (!lines[index].trim()) {
          let next = index + 1;
          while (next < lines.length && !lines[next].trim()) next++;
          const nextItem = listMatch(lines[next] || '');
          if (nextItem && nextItem.indent === first.indent && nextItem.ordered === first.ordered) index = next;
          break;
        }
        const nested = listMatch(lines[index]);
        if (nested && nested.indent > first.indent) {
          flush();
          const result = renderList(index);
          content.push(result.html); index = result.index; continue;
        }
        if (nested || startsBlock(index)) break;
        parts.push(lines[index].trim()); index++;
      }
      const code = options.referenceCodes && item.text.match(/^\*\*([A-Z]+\d+):\*\*/)?.[1];
      const id = code && evidence.has(code) && !anchoredEvidence.has(code) ? ` id="source-${code.toLowerCase()}"` : '';
      if (id) anchoredEvidence.add(code);
      flush();
      items += `<li${id}>${content.join('')}</li>`;
    }
    const tag = first.ordered ? 'ol' : 'ul';
    return { html: `<${tag}${first.ordered && first.start !== 1 ? ` start="${first.start}"` : ''}>${items}</${tag}>`, index };
  };

  const blocks = [];
  for (let index = 0; index < lines.length;) {
    const line = lines[index];
    if (!line.trim()) { index++; continue; }
    const fence = fenceStart(line);
    if (fence) {
      const code = [], character = fence[1][0], length = fence[1].length;
      const close = new RegExp(`^ {0,3}${character}{${length},}\\s*$`);
      const language = fence[2].trim().match(/^[a-z0-9_+-]+$/i)?.[0];
      index++;
      while (index < lines.length && !close.test(lines[index])) code.push(lines[index++]);
      if (index < lines.length) index++;
      blocks.push(`<pre><code${language ? ` class="language-${escapeHtml(language)}"` : ''}>${escapeHtml(code.join('\n'))}</code></pre>`);
      continue;
    }
    const heading = headingMatch(line);
    if (heading) {
      const level = heading[1].length, content = inline(heading[2]), text = plainText(content);
      if (level === 1) { if (!title) title = text; index++; continue; }
      const id = uniqueId(text);
      if (level === 2) headings.push({ id, text });
      latestHeading = text;
      blocks.push(`<h${level} id="${id}">${content}</h${level}>`);
      index++; continue;
    }
    if (separator(line)) { blocks.push('<hr>'); index++; continue; }
    if (line.includes('|') && isTableRule(lines[index + 1])) {
      const headers = tableCells(line), rows = [];
      index += 2;
      while (index < lines.length && lines[index].trim() && lines[index].includes('|')) rows.push(tableCells(lines[index++]));
      const columns = Math.max(headers.length, ...rows.map((row) => row.length));
      const labels = Array.from({ length: columns }, (_, column) => plainText(inline(headers[column] || '')) || `Column ${column + 1}`);
      const head = Array.from({ length: columns }, (_, column) => `<th scope="col">${inline(headers[column] || '')}</th>`).join('');
      const body = rows.map((row) => `<tr>${Array.from({ length: columns }, (_, column) => `<td data-label="${escapeHtml(labels[column])}">${inline(row[column] || '')}</td>`).join('')}</tr>`).join('');
      blocks.push(`<div class="table-scroll" tabindex="0" role="region" aria-label="${escapeHtml(latestHeading ? `Table: ${latestHeading}` : 'Document table')}"><table><thead><tr>${head}</tr></thead><tbody>${body}</tbody></table></div>`);
      continue;
    }
    if (listMatch(line)) {
      const result = renderList(index); blocks.push(result.html); index = result.index; continue;
    }
    const paragraph = [line.trim()];
    index++;
    while (index < lines.length && !startsBlock(index)) paragraph.push(lines[index++].trim());
    blocks.push(`<p>${inline(paragraph.join(' '))}</p>`);
  }
  return { html: blocks.join('\n'), title, headings };
}
