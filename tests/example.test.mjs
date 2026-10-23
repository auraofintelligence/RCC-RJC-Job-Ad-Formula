import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {EXAMPLES, buildMarkdown, getReadiness} from '../dist/formula.mjs';

const html = await readFile(new URL('../dist/index.html', import.meta.url), 'utf8');
const attributes = (tag) => Object.fromEntries([...tag.matchAll(/([\w-]+)="([^"]*)"/g)]
  .map(([, name, value]) => [name, value]));
const controls = [...html.matchAll(/<(input|textarea|select)\b([^>]*?)(?:>([\s\S]*?)<\/\1>|>)/g)]
  .map(([, tag, attrs, content]) => ({tag, ...attributes(attrs), content}))
  .filter((control) => control.name);

test('example chooser and both bottom reset controls are labelled and do not become vacancy fields', () => {
  assert.match(html, /<label for="example-choice">Try an example<\/label>/);
  assert.match(html, /<select id="example-choice" aria-describedby="example-help">/);
  assert.equal((html.match(/data-clear-draft/g) || []).length, 3);
  assert.match(html, /class="form-reset"><button[^>]+data-clear-draft>Clear \/ reset form<\/button><\/div>\s*<\/form>/);
  assert.match(html, /id="action-status"[^>]*><\/p>\s*<button[^>]+data-clear-draft>Clear \/ reset form/);
  assert.match(html, /href="examples.html">Pay sources and example notes/);
});

for (const {id, data: EXAMPLE} of EXAMPLES) test(`${id} supplies every applicable actual form field with valid values`, () => {
  const names = [...new Set(controls.map((control) => control.name))];
  assert.ok(names.length > 30, 'Read the complete form, including later sections.');
  assert.deepEqual(Object.keys(EXAMPLE).sort(), names.sort());
  for (const name of names) {
    const group = controls.filter((control) => control.name === name);
    const control = group[0];
    const value = EXAMPLE[name];
    if (control.type === 'checkbox' && group.length === 1) {
      assert.equal(typeof value, 'boolean', name);
    } else if (control.type === 'checkbox') {
      assert.ok(Array.isArray(value) && value.length > 0, name);
      assert.equal(new Set(value).size, value.length, name);
      for (const item of value) assert.ok(group.some((option) => option.value === item), `${name}: ${item}`);
    } else {
      assert.equal(typeof value, 'string', name);
      if (name !== 'linkedinApplyUrl' || (EXAMPLE.linkedinFormat === 'listing' && EXAMPLE.linkedinApply === 'external')) {
        assert.ok(value.trim(), `${name} must demonstrate a filled answer`);
      } else assert.equal(value, '', 'Unused external application URL must be cleared.');
      if (control.type === 'radio') assert.ok(group.some((option) => option.value === value), name);
      if (control.tag === 'select') {
        const options = [...control.content.matchAll(/<option([^>]*)>([^<]*)<\/option>/g)]
          .map(([, attrs, text]) => attributes(attrs).value ?? text);
        assert.ok(options.includes(value), `${name}: ${value}`);
      }
      if (control.type === 'number') {
        assert.ok(Number.isFinite(Number(value)) && Number(value) >= Number(control.min), name);
      }
      if (control.type === 'date') {
        assert.match(value, /^\d{4}-\d{2}-\d{2}$/);
        assert.equal(new Date(`${value}T00:00:00Z`).toISOString().slice(0, 10), value);
      }
    }
  }
});

test('six distinct roles exercise different application routes, lists, hours and pay bases', () => {
  assert.deepEqual(EXAMPLES.map(({id}) => id), ['entry-level', 'trade', 'graduate', 'manager', 'technical', 'aged-care']);
  for (const {data: EXAMPLE} of EXAMPLES) {
  assert.equal(EXAMPLE.seekProduct, 'selling-points');
  assert.ok(EXAMPLE.benefits.length > 1 && EXAMPLE.applicationItems.length > 1);
  assert.equal(EXAMPLE.currency, 'AUD');
  assert.ok(Number(EXAMPLE.payMin) <= Number(EXAMPLE.payMax));
  assert.ok(EXAMPLE.existingAd.includes(EXAMPLE.closingDate));
  assert.ok(EXAMPLE.existingAd.includes(EXAMPLE.applyDestination));
  assert.match(EXAMPLE.pay, /plus super/);
  assert.equal(EXAMPLE.payStatus, 'not-checked');
  assert.ok(EXAMPLE.business.trim());
  if (EXAMPLE.applyMethod === 'email') assert.match(EXAMPLE.applyDestination, /@example\.org$/);
  else assert.equal(new URL(EXAMPLE.applyDestination).hostname, 'example.org');
  if (EXAMPLE.linkedinApplyUrl) assert.equal(new URL(EXAMPLE.linkedinApplyUrl).hostname, 'example.org');
  }
  assert.deepEqual(new Set(EXAMPLES.map(({data}) => data.payType)), new Set(['Hourly rate', 'Annual salary']));
  assert.deepEqual(new Set(EXAMPLES.map(({data}) => data.workplace)), new Set(['On site', 'Hybrid', 'Remote']));
  assert.match(EXAMPLES[0].data.essential, /No previous paid work/);
  assert.match(EXAMPLES[0].data.pay, /including 25% casual loading/);
  assert.match(EXAMPLES[5].data.essential, /Certificate III in Individual Support \(Ageing\)/);
  assert.match(EXAMPLES[5].data.location, /Thornlands, Redlands/);
});

for (const {id, label, data: EXAMPLE} of EXAMPLES) test(`${id} exports a complete employer brief without example metadata`, () => {
  const readiness = getReadiness(EXAMPLE);
  assert.equal(readiness.ready, true);
  assert.deepEqual(readiness.missing, []);
  assert.equal(readiness.checks.length, 1);
  assert.match(readiness.checks[0], /Employer: verify pay/);
  const markdown = buildMarkdown(EXAMPLE);
  const facts = markdown.split('## Employer facts\n')[1].split('\n\n## Style')[0];
  assert.doesNotMatch(facts, /\[CONFIRM:|INVALID:|None supplied|None specified|Not supplied/);
  for (const field of ['payMin', 'payMax', 'award', 'classification', 'closingDate']) {
    assert.ok(markdown.includes(EXAMPLE[field]), field);
  }
  for (const heading of ['Main duties', 'Essential requirements', 'Desirable / trainable skills',
    'Confirmed benefits', 'Existing advertisement: source material only', 'Additional employer notes: source material only',
    'SEEK / job board', 'Facebook / community groups', EXAMPLE.linkedinFormat === 'post' ? 'LinkedIn feed post' : 'LinkedIn job listing', 'Short vacancy notice']) {
    assert.ok(markdown.includes(`### ${heading}`), heading);
  }
  assert.match(markdown, /\*\*Key selling point 3\*\*/);
  assert.match(markdown, /Not checked; verification required/);
  const metadata = /fictional|illustrati(?:ve|on)|\bsample\b|not a real vacancy|not employer commitments|do not publish this|research context|docs\/example-briefs|Try an example|Six complete fictional/i;
  assert.doesNotMatch(JSON.stringify(EXAMPLE), metadata, 'Form values must contain employer facts, not UI/research disclaimers.');
  assert.doesNotMatch(markdown, metadata, 'The exact copied/downloaded payload must stay free of example metadata.');
  assert.ok(!markdown.includes(label), 'The chooser label must not leak into the payload.');
});
