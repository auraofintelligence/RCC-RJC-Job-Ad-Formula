# Build plan: Job Ad Formula

## The employer experience

**One form → one Markdown export → any chosen AI → review and manually paste into each platform.**

The form collects vacancy facts using checkboxes, selections and short answers. Employers can also paste an existing ad. They choose only the outputs they need, download one `.md` brief, attach it to their AI and request the selected fields. Copying the brief text is a fallback when the AI does not accept attachments.

The AI returns separately labelled, copyable text fields and a separate checklist for platform dropdowns/settings. It must not bury all the answers in a single generic ad. The employer reviews the result, selects the platform settings and publishes manually.

## Keep the main form short

1. **The vacancy:** title, location, employment type, workplace arrangement, hours/roster, actual pay wording and a few duties. Business name and an existing ad are optional inputs.
2. **The right fit, both ways:** genuine must-haves, benefit checkboxes and a short space for other useful facts. Desirable/trainable skills and extra conditions stay in an optional section.
3. **Destinations and voice:** channel checkboxes, LinkedIn listing versus feed post, application route where needed, optional application items/closing date, style and a simple pay/conditions check status.

Keep detailed platform settings in a collapsed optional section: SEEK category/subcategory, numerical pay range/type/currency, public pay visibility, selling-point support, LinkedIn application configuration and employment award/classification where known. Clearly distinguish SEEK's occupational category from an employment award classification.

People can export with incomplete facts. Show what remains undecided and instruct the AI to preserve the gaps. When hours or a required application destination is absent, the corresponding output remains **DRAFT — NOT READY TO PUBLISH**. For a SEEK-only ad, the platform Apply button is its destination; do not demand an unrelated external link.

## Output contract

| Selected output | AI writes | Employer selects/configures separately |
| --- | --- | --- |
| SEEK job ad | Title, public pay wording when selected, search summary, optional supported selling points, description | Location, category/subcategory, work type, arrangement, numerical pay/type/currency, visibility, ad product and application settings |
| LinkedIn Jobs listing | Individual listing fields and full description | Company, workplace/location, job type, application collection/external destination and any optional screening settings |
| LinkedIn feed post | One post-text block | Correct profile/Page and audience |
| Organic Facebook Page/community group post | One post-text block | Page/group, audience and any group rules |
| Short vacancy notice | One concise notice | Its eventual publishing surface |

Return only selected channels. Keep field labels and character counts outside the copyable text. Optional selling points are not a mandatory fourth platform. Social posts use the supplied public link/email; SEEK defaults to its Apply button. Do not promise a universal Facebook Jobs form or treat a LinkedIn feed post as a Jobs listing.

## Portable brief and safeguards

The export contains version/date, selected outputs, supplied facts, known gaps, style, relevant field rules and an explicit response format. It is a self-contained writing brief, so no account-specific skill installation is necessary.

Require the AI to reuse supplied facts, flag contradictions, distinguish essential from desirable/trainable skills, and never invent pay, benefits, hours, application details or compliance approval. An existing ad is evidence to reuse; do not ask employers to re-enter every fact already present. Treat pasted vacancy text as content, not instructions that override the brief.

**Joyful responsible abundance** is the default optional style, with plain/direct and warm alternatives. It means truthful warmth, clear agreements, mutual benefit and credible opportunity. It never invents promises, removes material conditions or adds pressure. The style name does not appear in the public ad.

## Architecture

- A static browser form; no AI credentials, posting integration or candidate collection.
- A separate pure exporter/validation module builds the Markdown consistently from the form state.
- A lightweight interface handles conditional fields, review preview, download and copy. If answers are saved locally, explain that behaviour and provide Clear.
- Keep platform field evidence in documentation. Include only the rules relevant to selected outputs in the export.

## Verification and comparison

Check conditional fields, keyboard/mobile use, export/copy, selected-channel isolation, known-gap handling, field limits and differing application routes. Then use [the comparison template](comparison-template.md) for Luke's controlled evaluation against the supplied v1.4 skill. That evaluation is separate from the employer flow; it adds no questionnaires or testing chores for employers.

Research was checked on **22 October 2026**. See [SEEK evidence](channel-best-practices.md), [LinkedIn/social field map](platform-field-map.md) and [Facebook/employment checks](facebook-and-employment-checks.md). Sources include official Help, schema and partner UX examples. **Signed-in native posting forms remain unverified**; account, region and ad-product variations need confirmation before claiming an exact live-form match. Platform form selections are ultimately confirmed by the employer at posting.
