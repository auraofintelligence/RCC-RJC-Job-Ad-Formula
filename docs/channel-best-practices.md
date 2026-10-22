# Job-ad posting fields and channel guidance

Checked **22 October 2026** against the official sources linked below. This guide separates platform requirements, publisher advice and this project's editorial choices. The builder prepares an AI writing brief; the employer still reviews the result and completes the platform's publishing fields. No advertising or recruitment outcome is guaranteed.

## Primary: SEEK posting-field inventory

**This is documentation-based research, not an observation of a signed-in employer form.** The public [Create a job ad link](https://au.employer.seek.com/oauth/register/) led to registration. SEEK's [current official partner UX guide](https://developer.seek.com/use-cases/job-posting/user-experience-guide) links a [posting-flow PDF](https://developer.seek.com/static/job-posting-ui-BhtjEFSe.pdf) and explains that it is an adaptable integration example informed by SEEK's own flow. Its labels are useful field targets; exact Australian direct-form wording, required markers and widgets remain unverified. Its example prices/currencies are illustrative, not Australian price quotations.

Use these evidence codes: **H** = official Australian employer Help; **U** = SEEK's documented partner UX; **S** = current official schema. “Required” below describes the documented route, not a claim that a live native form was tested.

| Field / documented label | Value or control | Required / optional evidence | Export / manual publishing action |
| --- | --- | --- | --- |
| Job title | Free text | U; S required, max 80 characters | AI returns this as its own paste block. |
| Location | Type and select suggested suburb/town | U; S requires one location | Return suburb + state + postcode for user selection; remote roles still need a location. |
| Category | Suggested category or select parent and child | U; S requires one child category | Suggest a classification/sub-classification; employer chooses current platform options. |
| Work type | One of Full time, Part time, Contract, Casual | U; S required for `seekAnz` | Return a selection instruction, separately from prose. |
| Work arrangements / Work arrangement | One of On site, Hybrid, Remote | U; official feature docs require hirer selection although API field is optional | Return a selection instruction; do not infer flexibility. |
| Pay type | Hourly rate, Monthly salary, Annual salary, Annual plus commission | U; salary docs require selection | Return supplied type; do not confuse hourly and annual amounts. |
| Pay range: Minimum / Maximum | Numeric amounts + currency and period | U; S requires remuneration range | Return exact supplied figures; these numeric amounts are used for matching rather than shown as the public label. |
| Hide salary on your ad | Slider | H identifies this native-flow label | Return display/hide instruction from employer choice; public pay display is optional. |
| Pay shown on your ad | Free text | H and U optional; H and S max 50 characters | Separate public pay paste block when employer elects to display pay. |
| Job description / About your job | Rich-text body | U; S requires `AdvertisementDetails` | Separate full description; schema max 15,000 characters including markup. |
| Job summary / Search summary | Short free text | U; S requires `SearchSummary` in `seekAnz`, max 150 characters | Separate search-result summary paste block. |
| Key selling points (optional) | Up to three short text entries | U optional; product-dependent; S max 80 characters each | Return three separately labelled suggestions; paste only if chosen ad product supports them. |
| Select an ad type | Product choice | U; actual offerings depend on role/account | Employer chooses in platform; do not generate prices or assume a fixed tier list. |
| Branding | Existing brand choice/assets | U; product/account dependent | Employer selects approved logo/cover assets; no AI text block needed. |
| Video (optional) / Video position | YouTube URL + above/below placement | U optional | Use only supplied URL; optional publishing step. |
| Questions for candidates | Platform screening controls | H confirms optional sorting questions; U allows recommended/custom | Suggest questions separately only if requested; employer configures them. |
| Internal billing reference (optional) | Free text | U optional; S max 50 characters | Employer supplies purchase order/cost centre; omit from public copy. |

### Field evidence and limits

- **H — salary visibility:** [How do I attract quality candidates?](https://help.au.employer.seek.com/s/article/How-do-I-attract-quality-candidates), indexed official Help content updated 8 October 2026, names the hide slider, public pay text field and 50-character space. Direct text retrieval returned a CSS error; this finding comes from the search index of the official article, not live UI observation. [SEEK ad-writing support](https://au.employer.seek.com/support/adwritingtips) independently confirms salary/location entry is mandatory while public pay display is optional.
- **H — classification:** [Can I put my ad in more than one classification?](https://help.au.employer.seek.com/s/article/Can-I-put-my-ad-in-more-than-one-classification), indexed official Help, confirms one classification and one sub-classification. Direct retrieval also returned a CSS error.
- **S — title and structured selections:** [posting input schema](https://developer.seek.com/schema/named-type/PostPosition_PositionProfileInput) verifies title max 80, one location, one child category, and required `seekAnz` work type. [Position-profile feature docs](https://developer.seek.com/use-cases/job-posting/position-profiles) give work type and arrangement options. [Location docs](https://developer.seek.com/use-cases/job-posting/locations) show the suggested-location input and require a location even for remote work.
- **S — text limits:** [formatted-description schema](https://developer.seek.com/schema/named-type/PositionFormattedDescriptionInput) verifies 150 for summary, 80 for each selling point and 15,000 for description. Summary/selling points have HTML stripped; the body supports specified HTML tags. These are verified SEEK API limits, not independently observed native-form counters.
- **S — pay:** [salary documentation](https://developer.seek.com/use-cases/job-posting/salary) gives four pay types and the range/display separation. [Remuneration schema](https://developer.seek.com/schema/named-type/RemunerationPackageInput) verifies one public description of at most 50 characters; an empty description list represents no public label. Numeric range amounts themselves are not displayed.
- **Taxonomy:** [job-category docs](https://developer.seek.com/use-cases/job-posting/job-categories) describe the parent/child choices and warn that names change. AI should suggest a category for human confirmation, not claim a cached list is current. SEEK occupational classification is different from a Fair Work award classification.
- **Screening uncertainty:** Australian Help mentions up to eight sorting questions; the partner UX example says up to eleven total and shows eight recommended plus custom questions. Do not hardcode either as a universally verified native-form maximum. [Questionnaire documentation](https://developer.seek.com/use-cases/job-posting/questionnaires) confirms library/custom questions and privacy-policy support. These are publishing settings, not sections of the ad body.

### Application mechanics

Default to **Apply via SEEK**. [Official application-method documentation](https://developer.seek.com/use-cases/job-posting/application-methods) describes SEEK's Apply Form and an external application route available only to suitably enabled hirers. External linking is not configured by default; the hirer contacts SEEK for permission and complies with link-out terms. Approved link-out routing replaces SEEK's form and does not support SEEK questionnaires. This is a platform/account configuration, not permission to paste an external URL into every ad body.

The current [advertising terms](https://au.employer.seek.com/support/termsconditions), clauses 44–45, prohibit disregarding SEEK applications and inserting external links in the described ad/application surfaces. An external route should be offered only when the employer confirms it is already enabled by SEEK. A public enquiry contact is separate from application collection.

### Required AI output contract for manual entry

Return **individual labelled field blocks**, followed by a concise **Select in SEEK** checklist. The paste blocks are Job title, Pay shown on your ad (if selected), Job summary, Selling point 1/2/3 (if applicable), and Job description. Keep character counts beside labels, outside the copyable text. The checklist covers location, category/sub-category, work type, arrangement, pay type, numeric range, visibility, application configuration and optional screening/branding. Do not put selection instructions, billing details or character counts inside public ad copy.

Until the native signed-in form is inspected, label the map as **based on current official SEEK documentation; confirm available fields when posting**. Do not advertise that the entire live Australian form has been verified.

## Secondary: writing and channel guidance

## Shared facts, separate outputs

Collect the vacancy facts once: recognisable title, employer, suburb, work arrangement, employment type, hours/roster, pay and pay basis, core duties, essential requirements, desirable/trainable skills, genuine benefits and application instructions. Use those facts consistently across the selected channels.

Offer SEEK, organic Facebook/community posts, LinkedIn Jobs, LinkedIn feed posts and a short vacancy notice. LinkedIn Jobs and a LinkedIn feed post need separate formats. Facebook research is maintained in [the Facebook and employment guidance](facebook-and-employment-checks.md).

## SEEK

### Platform requirements and publishing fields

- Advertise one genuine, current, paid job role per ad, in the appropriate category. Use honest information and comply with relevant employment and discrimination laws.
- Do not exclude or disregard applications received through SEEK. Current general terms restrict external links; separately approved application routing is an account capability, as explained in the field inventory above.
- Salary information and location must be entered when publishing. Public salary display is optional; showing pay is publisher advice, not a universal platform requirement.

Sources: [Advertising Terms of Use](https://au.employer.seek.com/support/termsconditions), updated 17 August 2026, clauses 40–50; [ad-writing support](https://au.employer.seek.com/support/adwritingtips).

### Publisher advice

Use an industry-standard title, specific suburb, direct summary, core duties, essential capabilities and licences, concrete benefits, and clear application instructions. Consider transferable skills and whether a fixed number of years' experience really establishes ability. Short headings and bullets help mobile readers. StandOut ads support three selling-point bullets; this is a product-specific feature.

Sources: [SEEK's job-ad guide](https://au.employer.seek.com/hiring-advice/article/how-to-write-a-great-job-ad-with-examples), [ad-writing support](https://au.employer.seek.com/support/adwritingtips).

### Builder choices

Export a title, short summary, three suggested factual selling points where supported, and the complete ad. Use **Apply via SEEK** as the application instruction. Suppress external URLs and email application instructions in SEEK copy by default. Still include the employer's supplied route for other selected channels.

This default is deliberately conservative. SEEK's terms do not categorically ban email addresses: its job-ad guide suggests an enquiry contact name and email. A contact for questions is different from an instruction that bypasses SEEK applications. Do not describe all email addresses as prohibited.

The publishing reminder should explain that the employer must separately enter salary, location and the correct category in SEEK. An AI-written paragraph does not complete those fields.

## LinkedIn Jobs listing

### Platform policy

List one bona fide opportunity with a real intent to hire. Details must be truthful and complete, including role, responsibilities, qualifications, employment type, paid/unpaid status, primary location and relevant travel/relocation conditions. Clearly disclose contractor, commission, piecework or other nonstandard arrangements. Misleading or discriminatory ads and excessive emojis/capitalisation can breach policy.

Source: [LinkedIn Jobs Policies](https://www.linkedin.com/legal/l/jobs-policies), effective 7 January 2025.

### Publisher advice

Use a searchable title, brief purpose/impact statement, priority responsibilities, skills, pay and actual benefits. Keep company background brief and professional. Separate required from preferred qualifications and acknowledge transferable skills. Make the layout easy to scan on mobile and state realistic on-site, hybrid or remote expectations.

Sources: [job-description guide](https://business.linkedin.com/hire/resources/talent-acquisition/how-to-write-a-great-job-description), [required versus preferred skills](https://business.linkedin.com/in/en/hire/resources/tips-write-job-descriptions), [job-posting recommendations](https://business.linkedin.com/hire/resources/talent-engagement/how-to-create-job-postings).

### Builder choices

Generate the complete vacancy description, with separate essential and desirable/trainable requirements. Use the employer's chosen LinkedIn or external application route and state only the documents actually requested. Include employer, location, arrangement and employment type clearly; remind the employer to match the platform fields to the text.

LinkedIn's workflow includes application collection settings. Its advice recommends associating the role with the correct company Page where available. Sources: [posting workflow](https://www.linkedin.com/help/linkedin/answer/a517545/posting-a-job-on-linkedin?lang=en), [posting best practices](https://www.linkedin.com/help/linkedin/answer/a529397).

## LinkedIn feed post

### Documented platform behaviour

A feed post promotes or shares a vacancy to a personal network or Page followers. LinkedIn supports sharing a Jobs listing with an optional comment. It is a distinct publishing action from creating a Jobs listing.

Sources: [share a posted job](https://www.linkedin.com/help/linkedin/answer/a516708), [the #Hiring sharing feature](https://www.linkedin.com/help/linkedin/answer/a522373).

### Builder choices

Write a short, human invitation: role, location/work arrangement, employment type, pay when supplied, one or two real reasons to consider it and one application path. If a full listing exists, use its public URL. Keep extensive selection criteria in that listing. Any length target or hashtag count is editorial advice, not a verified universal platform rule.

## Short vacancy notice

This is an editorial format, not a particular platform's publishing specification. Preserve the facts a person needs to decide whether to learn more: role, location, employment type/hours, pay when supplied, one real benefit, any critical qualification and how to apply. Do not shorten the notice until its location, conditions or application path become misleading.

## Joyful responsible abundance

This project's style means a warm invitation, mutual benefit, fair clarity, useful contribution and credible opportunities to learn or grow. Welcome transferable strengths when the employer has marked them as acceptable. Name the real support and benefits available.

Never manufacture flexibility, benefits, compensation, progression or guarantees to make an ad sound positive. Avoid pressure, artificial scarcity, exaggerated promises and claims that everyone qualifies. Retain practical requirements and material working conditions. These are project style choices, not claims of platform endorsement.

## Limits and maintenance

- Official pages were readable without signing in. Account-specific publishing screens, permissions and paid/free plan features were not independently tested.
- No hardcoded universal word limit is justified by this research. LinkedIn's editorial sources offer differing length suggestions. Its [Recruiter help](https://www.linkedin.com/help/linkedin/answer/a418006/writing-a-job-description-for-your-job-posting-on-recruiter?lang=en-us) specifies 10,000 characters, while its [posting API schema](https://learn.microsoft.com/en-us/linkedin/talent/job-postings/api/job-posting-api-schema?view=li-lts-2026-04) allows 100–25,000. They describe different publishing routes.
- No performance uplift is promised. Salary-display statistics differ between SEEK articles and should not become a fixed product claim.
- Recheck current platform terms before changing application instructions or presenting a technical limit as mandatory. This research records what was accessible on the checked date.
