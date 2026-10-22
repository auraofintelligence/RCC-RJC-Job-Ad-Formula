# RCC / RJC Job Ad Formula

A short vacancy form that exports a portable Markdown brief. Employers attach it to their chosen AI, get labelled copy fields and selection notes, then manually copy the text into each platform's form.

**Objective: simpler, faster, better results.** The first two can be measured in use; improved ad quality is a hypothesis to compare with the supplied Better Job Ads v1.4 strategy, not an established result.

## Employer flow

1. Paste an existing advertisement or supply short vacancy facts, then tick the destinations. All form questions are visible; optional sections are labelled so employers can skip them.
2. Download the `.md` brief, or copy its text.
3. Give it to an AI and ask: “Use this brief to write the selected fields.”
4. Review the AI's response, paste each field into the correct platform form, make the platform selections and publish manually.

No AI account or subscription is built into the tool. It does not submit jobs, configure paid advertising, manage applicants or screen candidates. File-upload availability depends on the chosen AI; copying the brief is the fallback.

## Platform fields, not generic versions

- **SEEK:** separate title, optional public pay label, summary, product-dependent selling points and description. Keep category/location/work type/work arrangements/pay range selections outside public copy. Default to SEEK's Apply flow; advanced approved link-out accounts require their own configuration review.
- **LinkedIn Jobs:** title and Description copy blocks plus Company Page, location, workplace, job type and application-route selection notes. Keep notification email private. Optional skills vary by rollout.
- **LinkedIn feed:** one post text block; the verified 3,000-character feed limit does not apply to native Jobs descriptions.
- **Facebook Page/group:** one organic post body; no assumed Australian native Jobs form.
- **Short notice:** one self-contained writing format, not a separate platform schema.

Research checked **22 October 2026** using official public documentation. The signed-in Australian forms were not observed. Some SEEK detail comes from official partner UX/schema documentation; required markers, product features and field limits must be checked in the current form. The tool makes no claim of platform approval or legal compliance.

## Style and accuracy

The default **Joyful, responsible abundance** style applies warm human language, clear agreements and genuine opportunity to contribute and grow. It does not insert that slogan into advertisements, invent training/benefits or promise hiring outcomes. Warm and direct alternatives are available.

Every voice uses Australian English exclusively, professional formatting and no em dashes in generated ad copy. Each field has a clear label, with setup notes separated from public copy. The form uses a minimum text size of 16 pixels across desktop and mobile. Existing job advertisements can be pasted into the visible starting area; employers need only add changes or missing details.

Facts remain employer-supplied. Missing information stays visible; employment checks remain the employer's responsibility. The prompt asks for drafts immediately rather than another lengthy interview. It distinguishes SEEK's job category from an employment-award classification.

## Files

- [SEEK field inventory and channel guidance](docs/channel-best-practices.md)
- [LinkedIn and social form fields](docs/platform-field-map.md)
- [Facebook and Australian employment checks](docs/facebook-and-employment-checks.md)
- [Build plan](docs/BUILD-PLAN.md)
- [Blank comparison template](docs/comparison-template.md)
- `dist/`: dependency-free static application and Markdown generator.
- `tests/`: checks for field selection, application routes, missing facts, truthful drafting and formatting.

## Run

Node.js 20 or newer:

```sh
npm test
npm run prepare-pages
npm run check
npm run preview
```

Open `http://127.0.0.1:8779`. Serve `dist/` as the website root. There is no dependency installation or application backend. The `.openai/hosting.json` manifest identifies the separate owner-private Sites preview.

**Public GitHub Pages:** https://auraofintelligence.github.io/RCC-RJC-Job-Ad-Formula/

GitHub Pages can keep publishing `main` / root. The generated root pages load application assets from `dist/`; `.nojekyll` keeps the static files intact. Run `npm run prepare-pages` after changes to `dist/index.html`, the guide templates, research documents or `LICENCE.md`, then `npm run check`. This keeps all eight pages, rendered documents, navigation, robots policy and sitemap current. `dist/index.html` remains the canonical builder source; `scripts/site-pages.mjs` defines the guide pages. Do not edit generated root pages or rendered articles by hand.

The website has separate pages for [How it works](https://auraofintelligence.github.io/RCC-RJC-Job-Ad-Formula/how-it-works.html), [Guides](https://auraofintelligence.github.io/RCC-RJC-Job-Ad-Formula/guides.html), SEEK guidance, LinkedIn/social fields, employer checks, the comparison template and the licence. Navigation and footer links open readable HTML pages. The Markdown source documents stay in the repository, while the employer's AI brief remains a Markdown download with an always-visible content viewer.

## Licence and favicon

[Strange But True Public Source Licence](LICENCE.md), matching Luke's other projects. Public source; commercial, corporate and employer use requires Luke Nathan Hayes' written permission. User-created outputs belong to their creators under the licence. Third-party material retains its own terms.

The website links the complete licence. Its allow-all `robots.txt` follows the JRA Product Engine example and points to this project's public sitemap. It is a crawler preference, not access control; the private Sites preview retains its authentication gate. On GitHub Pages, a project-directory robots file does not replace the host-root `/robots.txt` policy.

The original AI-generated document-and-spark favicon and PNG/ICO sizes are in `dist/assets/`. See [the exact prompts and generation record](docs/IMAGE-PROMPTS.md).

## Suggested repository topics

Following the existing projects' functional tags, project identifier, owner/project identifier and build-date convention:

```text
ai-tools agent-workflows markdown markdown-builder browser-tool human-in-the-loop recruitment job-advertising small-business redlands-coast joyful-responsible-abundance strange-but-true public-source github-pages built-2026-10-22 rcc-rjc-job-ad-formula auraofintelligence-rcc-rjc-job-ad-formula
```

These are suggested topics for manual entry, not an automatic change to the repository's GitHub metadata.

## Data

Answers autosave in this browser's local storage. Exported files contain the supplied vacancy details and any publication contact provided. The tool sends no typed answers to an AI or application server; the employer chooses when to share the exported brief. Clear removes the local draft. Hosting access logs may exist and Google Fonts makes external font requests, without the form's typed values. No analytics or third-party application scripts are included.

## Verification status

Automated tests verify the builder and exported instructions, not the behaviour of external AI assistants. Cross-platform AI comparisons and real employer trials have not been performed. Native account form verification remains an explicit follow-up in the research.
