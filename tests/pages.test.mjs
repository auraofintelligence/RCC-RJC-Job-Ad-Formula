import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {createSitePages, documents} from '../scripts/site-pages.mjs';

const read = (file) => readFile(new URL(`../${file}`,import.meta.url),'utf8');

test('guide navigation uses separate HTML pages and keeps builder scripts off reading pages',async()=>{
  const pages=await createSitePages(read);
  assert.equal(pages.size,7);
  for(const [file,html] of pages){
    assert.match(html,/<html lang="en-AU">/);
    assert.equal((html.match(/<h1>/g)||[]).length,1,file);
    assert.match(html,/href="how-it-works.html">How it works/);
    assert.doesNotMatch(html,/src="app\.mjs|href="[^"\n]*\.md(?:[#?"])/,file);
    for(const doc of documents) assert.ok(html.includes(`href="${doc.file}"`),`${file} has footer link ${doc.file}`);
  }
  const builder=await read('dist/index.html');
  assert.match(builder,/href="how-it-works.html">How it works/);
  assert.doesNotMatch(builder,/href="#how-it-works"|github\.com\/[^" ]+\/blob\/[^" ]+\.md/);
  assert.match(builder,/id="markdown-preview"/);
});

test('research pages retain evidence, boundaries and complete comparison tables',async()=>{
  const pages=await createSitePages(read);
  assert.match(pages.get('seek-guide.html'),/This is documentation-based research, not an observation of a signed-in employer form\./);
  assert.match(pages.get('seek-guide.html'),/href="employer-checks.html"/);
  assert.match(pages.get('platform-fields.html'),/href="#source-l11"/);
  assert.match(pages.get('platform-fields.html'),/id="source-l11"/);
  assert.match(pages.get('employer-checks.html'),/22 October 2026/);
  assert.match(pages.get('comparison.html'),/Blank evaluation template\. No AI trial results or employer feedback are claimed here\./);
  const source=await read('docs/comparison-template.md');
  const sourceRows=source.split(/\r?\n/).filter(line=>line.startsWith('|')&&!/^\|[ :|\-]+\|$/.test(line)).length;
  assert.equal((pages.get('comparison.html').match(/<tr>/g)||[]).length,sourceRows);
});
