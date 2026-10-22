import {readFile, writeFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
import {createSitePages, PUBLIC_URL} from './site-pages.mjs';

const root = path.resolve(fileURLToPath(new URL('../', import.meta.url)));
const checking = process.argv.includes('--check');
const read = (relative) => readFile(path.join(root, relative), 'utf8');
const pages = await createSitePages(read);
pages.set('index.html',await read('dist/index.html'));

// GitHub Pages publishes the repository root, while Sites serves dist directly.
// Only asset paths change; page links work at either root without a <base> tag.
const githubPage = (html) => html.replaceAll('href="assets/','href="dist/assets/')
  .replaceAll('href="styles.css','href="dist/styles.css').replaceAll('src="app.mjs','src="dist/app.mjs');
const robots = `User-agent: *\nAllow: /\nSitemap: ${PUBLIC_URL}sitemap.xml\n`;
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${[...pages.keys()].map(file=>`  <url><loc>${PUBLIC_URL}${file==='index.html'?'':file}</loc></url>`).join('\n')}\n</urlset>\n`;
const outputs = new Map([
  ['.nojekyll',''],['robots.txt',robots],['sitemap.xml',sitemap],
  ['dist/robots.txt',robots],['dist/sitemap.xml',sitemap],['dist/LICENCE.md',await read('LICENCE.md')],
]);
for(const [file,html] of pages) {
  outputs.set(file,githubPage(html));
  if(file!=='index.html') outputs.set(`dist/${file}`,html);
}
for (const [relative, content] of outputs) {
  if (checking) {
    let actual; try { actual = await read(relative); } catch { throw new Error(`Missing publishing file: ${relative}. Run npm run prepare-pages.`); }
    if (actual !== content) throw new Error(`Stale publishing file: ${relative}. Run npm run prepare-pages.`);
  } else await writeFile(path.join(root,relative),content,'utf8');
}
for (const asset of ['favicon.ico','favicon-32.png','favicon-192.png','apple-touch-icon.png']) {
  const data = await readFile(path.join(root,'dist/assets',asset));
  if (!data.length) throw new Error(`Empty favicon asset: ${asset}`);
}
// Verify local navigation targets and document anchors for both hosting layouts.
for(const [file,html] of pages) {
  if(/href="[^"\n]*\.md(?:[#?"])/.test(html)) throw new Error(`Raw Markdown link in ${file}`);
  for(const [,href] of html.matchAll(/href="([^"]+)"/g)) {
    if(/^(?:https?:|mailto:)/.test(href)) continue;
    const [targetPart,hash] = href.split('#');
    const route = targetPart.split('?')[0];
    const target = route==='./' ? 'index.html' : route || file;
    if(pages.has(target)) {
      if(hash && !pages.get(target).includes(`id="${hash}"`)) throw new Error(`Missing anchor ${href} in ${file}`);
    } else await readFile(path.join(root,'dist',target));
  }
}
console.log(checking ? 'Eight website pages, navigation, sources, sitemap and assets checked.' : 'Eight website pages and publishing files prepared.');
