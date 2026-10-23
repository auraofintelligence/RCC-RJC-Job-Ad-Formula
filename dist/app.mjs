import {buildMarkdown, getReadiness, slugify, EXAMPLES} from './formula.mjs?v=20261023-six-examples';

const form = document.querySelector('#vacancy-form');
const byId = (id) => document.getElementById(id);
const STORAGE_KEY = 'rcc-rjc-job-ad-brief-v1';
const LIST_FIELDS = new Set(['channels', 'benefits', 'applicationItems']);
const defaults = {
  workplace: 'On site', employment: 'To confirm', channels: ['seek', 'facebook', 'linkedin', 'short'],
  linkedinFormat: 'listing', applyMethod: 'link', style: 'jra', payStatus: 'unsure',
  currency: 'AUD', showPay: true, linkedinApply: 'platform', seekProduct: 'unspecified',
};
let storageAvailable = true;
let currentMarkdown = '';

function readForm() {
  const entries = new FormData(form);
  const data = {...Object.fromEntries(entries)};
  for (const key of LIST_FIELDS) data[key] = entries.getAll(key);
  data.showPay = entries.has('showPay');
  return data;
}

function fillForm(data) {
  form.reset();
  const values = {...defaults, ...data};
  for (const element of form.elements) {
    if (!element.name) continue;
    if (LIST_FIELDS.has(element.name)) element.checked = (Array.isArray(values[element.name]) ? values[element.name] : []).includes(element.value);
    else if (element.type === 'radio') element.checked = values[element.name] === element.value;
    else if (element.type === 'checkbox') element.checked = Boolean(values[element.name]);
    else element.value = typeof values[element.name] === 'string' ? values[element.name] : '';
  }
}

const outputMap = {
  seek: ['SEEK', 'Job title · location · category · work type · pay fields · summary · selling points (if supported) · description'],
  linkedin: ['LinkedIn Jobs', 'Job title · company · workplace · location · job type · description · application settings'],
  facebook: ['Facebook Page / group', 'Post text · application link or email'],
  short: ['Short notice', 'A self-contained caption or notice'],
};

function render({save = true} = {}) {
  const data = readForm();
  const readiness = getReadiness(data);
  const hasExistingAd = Boolean(data.existingAd.trim());
  byId('business-optional').textContent = data.channels.includes('linkedin') && data.linkedinFormat === 'listing' ? 'needed for a LinkedIn company Page' : 'optional';
  const destination = form.elements.namedItem('applyDestination');
  destination.placeholder = data.applyMethod === 'email' ? 'jobs@yourbusiness.com.au' : 'https://…';
  destination.inputMode = data.applyMethod === 'email' ? 'email' : 'url';
  byId('preview-title').textContent = data.title.trim() || (hasExistingAd ? 'Improve your existing job ad' : 'Your next great hire starts with the facts.');
  byId('preview-meta').textContent = [data.location, data.employment === 'To confirm' ? '' : data.employment, data.hours].filter(Boolean).join(' · ') || (hasExistingAd ? 'Your AI will extract the details from the ad you pasted.' : 'Add your vacancy details on the left.');
  byId('channel-count').textContent = `${data.channels.length} ${data.channels.length === 1 ? 'output' : 'outputs'}`;
  byId('output-fields').replaceChildren();
  for (const key of ['seek', 'linkedin', 'facebook', 'short'].filter((key) => data.channels.includes(key))) {
    let [heading, fields] = outputMap[key];
    if (key === 'linkedin' && data.linkedinFormat === 'post') [heading, fields] = ['LinkedIn feed', 'Post text · application link or email'];
    const item = document.createElement('div'); item.className = 'output-item';
    const title = document.createElement('strong'); title.textContent = heading;
    const detail = document.createElement('p'); detail.textContent = fields;
    item.append(title, detail); byId('output-fields').append(item);
  }
  if (!data.channels.length) {
    const text = document.createElement('p'); text.className = 'hint'; text.textContent = 'Choose at least one destination.'; byId('output-fields').append(text);
  }
  const styles = {
    jra: ['Joyful, responsible abundance', 'A warm invitation. Honest promises. Opportunity to contribute.'],
    warm: ['Warm & welcoming', 'Friendly, specific and natural. Real details carry the appeal.'],
    direct: ['Plain & direct', 'Clear expectations. Short sentences. Useful specifics.'],
  };
  [byId('preview-style').textContent, byId('preview-style-detail').textContent] = styles[data.style] || styles.jra;
  byId('readiness-title').textContent = hasExistingAd ? 'Existing ad ready to review' : readiness.ready ? 'Core details ready to draft' : 'You can start with what you know';
  byId('readiness-detail').textContent = hasExistingAd ? 'Add only changes to the form. Your AI will reuse the ad’s facts and flag anything still missing before publication.' : readiness.ready ? 'Review the AI’s output and verify pay and conditions before posting.' : 'The AI will mark these gaps clearly. You can still export:';
  byId('missing-list').replaceChildren();
  for (const field of hasExistingAd ? [] : readiness.missing) { const li = document.createElement('li'); li.textContent = field; byId('missing-list').append(li); }
  currentMarkdown = buildMarkdown(data);
  byId('markdown-preview').textContent = currentMarkdown;
  if (save) {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); storageAvailable = true; }
    catch { storageAvailable = false; }
    byId('save-status').textContent = storageAvailable ? 'Saved on this device. You choose what to share.' : 'Answers are available in this tab; saving is unavailable.';
  }
}

function canExport() {
  if (readForm().channels.length) return true;
  byId('action-status').textContent = 'Choose at least one posting destination, then export.';
  form.querySelector('[name="channels"]').focus();
  return false;
}

form.addEventListener('input', () => { byId('action-status').textContent = ''; render(); });
form.addEventListener('change', () => render());
form.addEventListener('submit', (event) => event.preventDefault());
byId('download').addEventListener('click', () => {
  if (!canExport()) return;
  const blob = new Blob([currentMarkdown], {type: 'text/markdown;charset=utf-8'});
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url; link.download = `${slugify(readForm().title)}-ai-brief.md`;
  document.body.append(link); link.click(); link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 2000);
  byId('action-status').textContent = 'Brief downloaded. Attach it to your AI, review the result, then copy each field into the platform.';
});
byId('copy').addEventListener('click', async () => {
  if (!canExport()) return;
  try {
    await navigator.clipboard.writeText(currentMarkdown);
    byId('action-status').textContent = 'Brief copied. Paste it into your chosen AI.';
  } catch {
    byId('action-status').textContent = 'Copying is unavailable in this browser. Use “Download AI brief” and attach the file to your AI.';
    byId('download').focus();
  }
});
const exampleChoice = byId('example-choice');
for (const example of EXAMPLES) {
  const option = document.createElement('option');
  option.value = example.id; option.textContent = example.label; exampleChoice.append(option);
}
function hasDraft(data) {
  return Object.entries(data).some(([key, value]) => Array.isArray(value)
    ? [...value].sort().join('\n') !== [...(defaults[key] || [])].sort().join('\n')
    : value !== (defaults[key] ?? ''));
}
exampleChoice.addEventListener('change', () => {
  const example = EXAMPLES.find(({id}) => id === exampleChoice.value);
  if (!example) return;
  const data = readForm();
  if (hasDraft(data) && !confirm('Replace this draft with the selected fictional example?')) {
    exampleChoice.value = '';
    return;
  }
  fillForm(example.data); render();
  exampleChoice.value = '';
  byId('action-status').textContent = `${example.label} loaded. All details are fictional, not a real vacancy. Pay and conditions remain unverified.`;
});
function clearDraft() {
  if (!confirm('Clear this draft from the form and this device? Download it first if you want to keep it.')) return;
  fillForm(defaults);
  exampleChoice.value = '';
  try { localStorage.removeItem(STORAGE_KEY); } catch { /* No stored draft is available. */ }
  render({save: false});
  byId('save-status').textContent = 'Draft cleared. Your next answers will save on this device.';
  byId('action-status').textContent = 'Draft cleared.';
}
document.querySelectorAll('[data-clear-draft]').forEach((button) => button.addEventListener('click', clearDraft));

try {
  const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
  if (saved && typeof saved === 'object' && !Array.isArray(saved)) {
    fillForm(saved); byId('save-status').textContent = 'Your previous draft is saved on this device.';
  }
} catch { storageAvailable = false; byId('save-status').textContent = 'Answers stay in this tab; device saving is unavailable.'; }
render({save: false});
