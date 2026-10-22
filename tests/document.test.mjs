import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { renderDocument } from '../scripts/render-document.mjs';

test('document title is separate, headings are unique, and prose keeps soft line breaks readable', () => {
  const result = renderDocument('# A **clear** title\n\nFirst line\ncontinues here.\n\n## Next step\nText.\n\n## Next step\nMore.\n\n### Details');
  assert.equal(result.title, 'A clear title');
  assert.doesNotMatch(result.html, /<h1/);
  assert.match(result.html, /<p>First line continues here\.<\/p>/);
  assert.deepEqual(result.headings, [{ id: 'next-step', text: 'Next step' }, { id: 'next-step-2', text: 'Next step' }]);
  assert.match(result.html, /<h3 id="details">Details<\/h3>/);
  assert.equal(renderDocument('# C#').title, 'C#');
});

test('mapped local Markdown links keep fragments and balanced-parenthesis external URLs stay complete', () => {
  const source = '[Plan](../docs/BUILD-PLAN.md#first-step) and [Help](https://example.org/a_(b)?mode=(x)).\n\nhttps://example.org/licence_(2026).';
  const { html } = renderDocument(source, { linkMap: { 'BUILD-PLAN.md': 'plan.html' } });
  assert.match(html, /href="plan\.html#first-step">Plan<\/a>/);
  assert.match(html, /href="https:\/\/example\.org\/a_\(b\)\?mode=\(x\)">Help<\/a>/);
  assert.match(html, /href="https:\/\/example\.org\/licence_\(2026\)">https:\/\/example\.org\/licence_\(2026\)<\/a>\./);
});

test('tables retain every column, escaped and code pipes, inline content and accessible mobile labels', () => {
  const source = '## Native fields\n\n| Field | Input **type** | Evidence |\n| --- | --- | --- |\n| Pay \\| range | `A|B` | [Guide](https://example.org) |';
  const { html } = renderDocument(source);
  assert.match(html, /class="table-scroll" tabindex="0" role="region" aria-label="Table: Native fields"/);
  assert.equal((html.match(/<th scope="col">/g) || []).length, 3);
  assert.equal((html.match(/<td /g) || []).length, 3);
  assert.match(html, /data-label="Field">Pay \| range<\/td>/);
  assert.match(html, /data-label="Input type"><code>A\|B<\/code><\/td>/);
  assert.match(html, /data-label="Evidence"><a href="https:\/\/example\.org">Guide<\/a><\/td>/);
});

test('evidence markers point to real source bullets and duplicate source definitions keep unique anchors', () => {
  const source = '# Research\n\nA claim [L1, L2], another [L99].\n\n## Source L1\n\n- **L1:** [One](https://example.org/one)\n- **L2:** Two\n- **L1:** Repeated definition';
  const { html, headings } = renderDocument(source, { referenceCodes: true });
  assert.match(html, /href="#source-l1">L1<\/a>, <a href="#source-l2">L2<\/a>/);
  assert.match(html, /<li id="source-l1"><strong>L1:<\/strong>/);
  assert.match(html, /<li id="source-l2"><strong>L2:<\/strong>/);
  assert.equal((html.match(/id="source-l1"/g) || []).length, 1);
  assert.match(html, /another \[L99\]/);
  assert.equal(headings[0].id, 'source-l1-2');
  assert.doesNotMatch(renderDocument(source).html, /href="#source-l1"/);
});

test('source HTML and attribute text are escaped and unsafe links cannot become active', () => {
  const source = '<script>alert("x")</script> and <img src=x onerror=alert(1)>\n\n[Unsafe](javascript:alert(1)) [Data](data:text/html,bad) [File](file:///C:/secret) [Safe](mailto:jobs@example.org)\n\n| A "label" |\n| --- |\n| <svg onload=bad> |';
  const { html } = renderDocument(source);
  assert.doesNotMatch(html, /<script|<img|<svg|href="javascript:|href="data:|href="file:/);
  assert.match(html, /&lt;script&gt;alert\(&quot;x&quot;\)&lt;\/script&gt;/);
  assert.match(html, /data-label="A &quot;label&quot;"/);
  assert.match(html, /href="mailto:jobs@example\.org"/);
  assert.doesNotMatch(renderDocument('[Map](safe.md)', { linkMap: { 'safe.md': 'javascript:bad()' } }).html, /<a/);
});

test('fenced code remains verbatim escaped evidence, with no inline rendering or fake source anchors', () => {
  const source = '# Code\n\n```html\n<script>bad()</script>\n**bold** [L1]\n- **L1:** Not a source definition\n```\n\nClaim [L1].\n\n---\n\n3. **Three**\n4. *Four* with `code`';
  const { html } = renderDocument(source, { referenceCodes: true });
  assert.match(html, /<pre><code class="language-html">&lt;script&gt;bad\(\)&lt;\/script&gt;\n\*\*bold\*\* \[L1\]/);
  assert.match(html, /<p>Claim \[L1\]\.<\/p>/);
  assert.match(html, /<hr>/);
  assert.match(html, /<ol start="3"><li><strong>Three<\/strong><\/li><li><em>Four<\/em> with <code>code<\/code><\/li><\/ol>/);
});

test('nested list continuation keeps source ordering and extra table cells are never truncated', () => {
  const { html } = renderDocument('- Parent\n  - Child\n  After child\n\n| One | Two |\n| --- | --- |\n| A | B | Extra |');
  assert.match(html, /<li>Parent<ul><li>Child After child<\/li><\/ul><\/li>/);
  assert.equal((html.match(/<td /g) || []).length, 3);
  assert.match(html, /data-label="Column 3">Extra<\/td>/);
});

test('actual platform map keeps its table rows and clickable evidence references', async () => {
  const source = await readFile(new URL('../docs/platform-field-map.md', import.meta.url), 'utf8');
  const { html, title, headings } = renderDocument(source, { referenceCodes: true });
  assert.equal(title, 'Platform field map for manual copy and paste');
  assert.ok(headings.length >= 5);
  assert.match(html, /href="#source-l11"/);
  assert.match(html, /id="source-l11"/);
  assert.match(html, /data-label="Status and builder treatment"/);
  assert.match(html, /data-label="Input type and verified choices"/);
  assert.match(html, /Applicant-options guidance says the collection method cannot be changed after posting\./i);
});
