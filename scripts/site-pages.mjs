import {renderDocument} from './render-document.mjs';

export const PUBLIC_URL = 'https://auraofintelligence.github.io/RCC-RJC-Job-Ad-Formula/';
export const STYLE_VERSION = '20261023-pages';
const escape = (value) => String(value).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');

export const documents = [
  {file:'examples.html',source:'docs/example-briefs.md',title:'Six fictional example briefs',label:'Example pay sources',tag:'Try an example',description:'The roles, illustrative earnings and research behind the six complete sample briefs.',summary:'All six companies and vacancies are fictional. These earnings are examples informed by Australian sources, not verified offers or legal pay calculations.'},
  {file:'seek-guide.html',source:'docs/channel-best-practices.md',title:'SEEK fields and ad-writing guidance',label:'SEEK guide',tag:'SEEK',description:'What to paste, what to select and how to keep the wording useful. Includes the full field inventory and writing guidance.',summary:'Keep copy fields separate from location, category, work type and pay selections. SEEK applications use SEEK’s Apply route by default.'},
  {file:'platform-fields.html',source:'docs/platform-field-map.md',title:'LinkedIn and social posting fields',label:'LinkedIn & social fields',tag:'LinkedIn + social',description:'The differences between a LinkedIn job listing, a feed post, a Facebook post and a short notice.',summary:'LinkedIn Jobs needs separate fields and settings. A feed or Facebook post uses one post body. These are different publishing formats.'},
  {file:'employer-checks.html',source:'docs/facebook-and-employment-checks.md',title:'Facebook and employer checks',label:'Facebook & employer checks',tag:'Before publishing',description:'Organic Facebook posting, accurate employment details, inclusive requirements and information to verify.',summary:'Use confirmed vacancy facts, check the chosen Facebook group’s rules and verify pay and conditions before publishing.'},
  {file:'comparison.html',source:'docs/comparison-template.md',title:'Compare the two approaches',label:'Comparison guide',tag:'For reviewers',description:'A blank review template for comparing this builder with the supplied skill using the same vacancy facts.',summary:'This is a blank evaluation template. It records proposed tests and measures; it does not report completed AI trials or proven improvements.'},
];

export function siteHeader(active = '') {
  const nav = [['./','Build your brief'],['how-it-works.html','How it works'],['guides.html','Guides']];
  return `<header class="topbar shell">
    <a class="brand" href="./"><span class="brand-mark" aria-hidden="true">+</span><span>Job Ad <strong>Formula</strong></span></a>
    <span class="pilot">RCC / RJC <span>·</span> Independent prototype</span>
    <nav class="site-nav" aria-label="Main navigation">${nav.map(([href,label])=>`<a href="${href}"${active===href?' aria-current="page"':''}>${label}</a>`).join('')}</nav>
  </header>`;
}

export function siteFooter() {
  return `<footer class="shell footer site-footer">
    <div class="footer-about"><p>© 2026 Luke Nathan Hayes / Strange But True / Aura of Intelligence.</p><p>A prototype for review. Your AI drafts; you review and publish.</p></div>
    <nav class="footer-links" aria-label="Further reading"><a href="how-it-works.html">How it works</a><a href="guides.html">All guides</a>${documents.map(doc=>`<a href="${doc.file}">${doc.label}</a>`).join('')}<a href="licence.html">Public source licence</a><a href="https://github.com/auraofintelligence/RCC-RJC-Job-Ad-Formula" target="_blank" rel="noopener">Project source ↗</a></nav>
  </footer>`;
}

function page({file,title,description,kicker,body,active='',article=false}) {
  return `<!doctype html>
<html lang="en-AU">
<head>
  <meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="${escape(description)}"><meta name="theme-color" content="#173d35">
  <title>${escape(title)} · Job Ad Formula</title>
  <link rel="icon" type="image/x-icon" href="assets/favicon.ico"><link rel="icon" type="image/png" sizes="32x32" href="assets/favicon-32.png"><link rel="apple-touch-icon" sizes="180x180" href="assets/apple-touch-icon.png">
  <link rel="canonical" href="${PUBLIC_URL}${file}"><link rel="stylesheet" href="styles.css?v=${STYLE_VERSION}">
</head>
<body>
  <a class="skip" href="#content">Skip to content</a>
  ${siteHeader(active)}
  <main class="shell content-page${article?' article-page':''}" id="content">
    <div class="page-hero"><p class="eyebrow">${escape(kicker)}</p><h1>${escape(title)}</h1><p class="page-lede">${escape(description)}</p></div>
    ${body}
  </main>
  ${siteFooter()}
</body>
</html>
`;
}

const howToBody = `
  <div class="guide-intro"><p class="guide-big">A few facts from you.<br>Clear sections from your AI.</p><p>Use the builder to prepare one brief. Give it to the AI you already use, then review the result and copy each section into the right posting form.</p></div>
  <ol class="guide-flow">
    <li><span class="guide-number" aria-hidden="true">01</span><div><h2>Start with what you have</h2><p><strong>Already have a job ad?</strong> Paste it into the first box. Your AI will reuse its facts. Add only changes or extra information below.</p><p><strong>Starting fresh?</strong> Add the job title, location, hours, duties and other details you know. Short answers are fine. Leave undecided details blank.</p></div></li>
    <li><span class="guide-number" aria-hidden="true">02</span><div><h2>Choose where it will go</h2><p>Tick SEEK, LinkedIn, Facebook or a short notice. For LinkedIn, choose a job listing or a feed post. They use different fields.</p><p>Choose a voice and include only benefits you can genuinely offer. Every voice uses Australian English, professional formatting and no em dashes.</p></div></li>
    <li><span class="guide-number" aria-hidden="true">03</span><div><h2>Give the brief to your AI</h2><p>Select <strong>Download AI brief</strong>. The <strong>.md file</strong> is a text document containing your vacancy facts and writing instructions. The visible Markdown content viewer shows exactly what is in it.</p><p>Open a new chat in your usual AI, attach the file and send:</p><blockquote>Use this brief to write the selected fields.</blockquote><p>If your AI cannot accept the file, select <strong>Copy brief for AI</strong> and paste the text into the chat instead. File support depends on the AI and your account.</p></div></li>
    <li><span class="guide-number" aria-hidden="true">04</span><div><h2>Review, then copy and paste</h2><p>Your AI should return labelled sections for the destinations you chose, with platform selections kept separate from public wording.</p><p>Check every fact, resolve visible placeholders and verify pay and conditions. Open the posting platform, paste each section into its matching field and make the required selections yourself.</p><p>The employer reviews and publishes the ad. <a href="guides.html">See the posting guides</a> for the field details and recorded research limits.</p></div></li>
  </ol>
  <section class="guide-note"><p class="eyebrow">The voice</p><h2>Joyful, responsible abundance</h2><p>A warm invitation, clear agreements and genuine opportunity. Describe the real work, support and benefits. Positive language earns trust when the facts support it.</p></section>
  <div class="guide-pair"><section class="info-card"><h2>Your answers stay on this device</h2><p>The builder saves your draft in this browser. You choose when to download or copy it and share it with your AI. Use vacancy facts and approved public contact details.</p></section><section class="info-card"><h2>Keep the final review human</h2><p>Your AI can make mistakes. Missing details, conflicting facts and employment checks still need your attention. The builder prepares a brief; it does not submit listings or assess applicants.</p></section></div>
  <div class="page-action"><div><h2>Ready to make your brief?</h2><p>Paste an existing ad or start with a few facts.</p></div><a class="page-button" href="./">Build your brief <span aria-hidden="true">↗</span></a></div>`;

export async function createSitePages(read) {
  const outputs = new Map();
  outputs.set('how-it-works.html',page({file:'how-it-works.html',title:'How it works',description:'From an existing ad or a few short answers to the right sections for each posting form.',kicker:'A clear path, start to finish',active:'how-it-works.html',body:howToBody}));
  const cards=documents.map(doc=>`<a class="guide-card" href="${doc.file}"><span class="card-label">${doc.tag}</span><h2>${doc.title}</h2><p>${doc.description}</p><span class="card-link">Read the guide <span aria-hidden="true">↗</span></span></a>`).join('\n');
  outputs.set('guides.html',page({file:'guides.html',title:'The right fields. The useful detail.',description:'Readable guides for the places you will post, plus the checks and evidence behind this builder.',kicker:'Posting guides',active:'guides.html',body:`<div class="guide-grid">${cards}</div><section class="guide-note"><h2>Know what the research covers</h2><p>Official documentation was checked on <strong>22 October 2026</strong>. The signed-in Australian posting forms were not inspected. Available fields, labels and features can vary by account or ad product, so check the form in front of you when posting.</p><p>The guides keep platform requirements, publisher advice and this project’s choices separate. Sources and limitations remain alongside the detail.</p></section><div class="page-action"><div><h2>Put the facts to work</h2><p>One brief for your chosen AI.</p></div><a class="page-button" href="./">Build your brief <span aria-hidden="true">↗</span></a></div>`}));
  const linkMap=Object.fromEntries(documents.map(doc=>[doc.source.split('/').pop(),doc.file]));
  linkMap['LICENCE.md']='licence.html';
  for(const doc of documents) {
    const rendered=renderDocument(await read(doc.source),{linkMap,referenceCodes:true});
    const contents=`<nav class="article-contents" aria-label="On this page"><h2>On this page</h2><ol>${rendered.headings.map(heading=>`<li><a href="#${escape(heading.id)}">${escape(heading.text)}</a></li>`).join('')}</ol><a class="contents-back" href="guides.html">← All guides</a></nav>`;
    outputs.set(doc.file,page({...doc,kicker:doc.tag,article:true,body:`<div class="article-summary"><p>${doc.summary}</p></div><div class="article-layout">${contents}<article class="document-body" aria-label="${escape(doc.title)}">${rendered.html}</article></div><div class="page-action"><a href="guides.html">← All guides</a><a class="page-button" href="./">Build your brief <span aria-hidden="true">↗</span></a></div>`}));
  }
  const licence=renderDocument(await read('LICENCE.md'),{linkMap});
  outputs.set('licence.html',page({file:'licence.html',title:licence.title,description:'The full licence for Job Ad Formula by Luke Nathan Hayes / Strange But True / Aura of Intelligence.',kicker:'Public source licence',body:`<article class="document-body licence-body">${licence.html}</article>`}));
  return outputs;
}
