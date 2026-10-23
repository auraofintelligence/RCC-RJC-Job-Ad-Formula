// Fictional teaching briefs, not live vacancies or verified employment offers.
// Earnings research and scope are recorded separately in docs/example-briefs.md.
const disclaimer = 'FICTIONAL EXAMPLE ONLY. Not a real vacancy. All company names, contacts, earnings, benefits and dates are illustrative, not employer commitments. Reserved example.org contacts are placeholders; do not send applications. Do not publish this sample.';
const makeExample = ({id, label, notes, ...facts}) => {
  const data = {
    currency: 'AUD', showPay: true, payStatus: 'not-checked',
    channels: ['seek', 'facebook', 'linkedin', 'short'],
    linkedinFormat: 'listing', linkedinApply: 'external',
    seekProduct: 'selling-points', style: 'jra', closingDate: '2030-06-30',
    ...facts,
  };
  data.extraNotes = `${disclaimer}\n${notes}\nPay ranges are before income tax and exclude superannuation. Check current award/agreement coverage, classification, penalties, overtime, allowances and super before using your own facts. The sample closing date is not a recruitment deadline. Research context: docs/example-briefs.md in the project repository; research links are not application destinations.`;
  data.existingAd = `${disclaimer}
${data.title} at ${data.business}, ${data.location}.
${data.employment}; ${data.workplace}. ${data.hours}. ${data.schedule}.
${data.pay}. Pay and conditions have not been checked.
Main duties:\n${data.duties}
Must-haves:\n${data.essential}
Useful or trainable:\n${data.desirable}
Illustrative benefits: ${data.benefits.join('; ')}. ${data.otherBenefits}.
Sample application: ${data.applicationItems.join(' and ')} via ${data.applyDestination}. ${data.linkedinFormat === 'listing' ? data.linkedinApply === 'external' ? `LinkedIn listing route: ${data.linkedinApplyUrl}.` : 'The LinkedIn listing collects applications through LinkedIn.' : 'LinkedIn uses a feed post and the social application destination.'} SEEK uses its own Apply button.
Sample closing date: ${data.closingDate}. ${notes}`;
  for (const key of ['benefits', 'applicationItems', 'channels']) Object.freeze(data[key]);
  return Object.freeze({id, label, data: Object.freeze(data)});
};

export const EXAMPLES = Object.freeze([
  makeExample({
    id: 'entry-level', label: 'Entry level: retail assistant',
    title: 'Retail assistant (fictional example)', business: 'Paperbark Corner Store (fictional)',
    location: 'Capalaba, Queensland', workplace: 'On site', employment: 'Casual',
    hours: 'Usually 12-20 hours per week; casual hours are not guaranteed',
    schedule: 'Weekday daytime shifts between 9 am and 5 pm, usually 4-5 hours; availability agreed when shifts are offered',
    pay: 'Illustrative: AUD $36-$38 per hour including 25% casual loading, plus super; penalties and overtime extra where applicable',
    payMin: '36', payMax: '38', payType: 'Hourly rate',
    award: 'General Retail Industry Award 2020, MA000004 (indicative; coverage unverified)',
    classification: 'Retail Employee Level 1, adult-rate illustration (classification unverified; no age restriction)',
    duties: 'Welcome customers and answer product questions\nUse the checkout and handle payments after induction\nReplenish shelves and keep aisles clear',
    essential: 'No previous paid work or retail experience required\nClear, respectful communication and willingness to learn\nAble to follow safe stock-handling instructions, with reasonable adjustments discussed',
    desirable: 'School, volunteering or community teamwork experience\nCheckout skills can be learned during paid induction',
    benefits: ['Training provided', 'Transferable skills welcome', 'Staff discounts'],
    otherBenefits: 'Illustrative offer: paid checkout induction and 10% staff discount on store products',
    applyMethod: 'email', applyDestination: 'paperbark-jobs@example.org',
    applicationItems: ['A short introduction', 'Availability'],
    linkedinFormat: 'post', linkedinApply: 'platform', linkedinApplyUrl: '',
    seekCategory: 'Retail & Consumer Products', seekSubcategory: 'Retail Assistants', style: 'warm',
    notes: 'Entry pathway: apply without a CV, interview about customer scenarios, then paid induction. The hourly range includes 25% casual loading (illustrative underlying base $28.80-$30.40); do not add the loading twice. Weekend, evening and public-holiday penalties are not included. Adult-rate figures illustrate pay, not a preference for a particular age.',
  }),
  makeExample({
    id: 'trade', label: 'Skilled trade: licensed electrician',
    title: 'Maintenance electrician (fictional example)', business: 'Tidal Circuit Services (fictional)',
    location: 'Cleveland depot and Redlands customer sites, Queensland', workplace: 'On site', employment: 'Full-time',
    hours: '38 ordinary paid hours per week',
    schedule: 'Monday to Thursday 7 am-3.30 pm; Friday 7 am-1.30 pm; 30-minute unpaid meal break each day; no on-call roster',
    pay: 'Illustrative: AUD $50-$58 per ordinary hour, plus super; overtime, penalties and applicable allowances extra; no casual loading',
    payMin: '50', payMax: '58', payType: 'Hourly rate',
    award: 'Electrical, Electronic and Communications Contracting Award 2020, MA000025 (indicative; coverage unverified)',
    classification: 'Electrical worker grade 5 (illustrative licensed-trade entry; classification unverified)',
    duties: 'Inspect and fault-find commercial lighting and power circuits\nComplete maintenance and repairs within licence scope\nRecord test results and explain completed work to customers',
    essential: 'Current Queensland electrical work licence authorising the stated work\nCompleted electrical trade qualification and safe fault-finding skills\nCurrent driver licence for travel between customer sites',
    desirable: 'Commercial maintenance experience\nDigital job-recording and customer communication skills',
    benefits: ['Equipment provided', 'Training provided'],
    otherBenefits: 'Illustrative offer: work-use service vehicle, PPE and test equipment; paid induction in site procedures',
    applyMethod: 'link', applyDestination: 'https://example.org/tidal-circuit/careers/electrician',
    linkedinApplyUrl: 'https://example.org/tidal-circuit/careers/electrician',
    applicationItems: ['CV', 'Availability'],
    seekCategory: 'Trades & Services', seekSubcategory: 'Electricians', style: 'direct',
    notes: 'Qualified-trade pathway: CV review, practical discussion and licence verification before appointment. This is an employee role, not a contractor or apprentice vacancy. No unpaid trial. Vehicle is for work use only; no private-use benefit is implied.',
  }),
  makeExample({
    id: 'graduate', label: 'University graduate: accountant',
    title: 'Graduate accountant (fictional example)', business: 'Mango Ledger Advisory (fictional)',
    location: 'Cleveland, Queensland', workplace: 'Hybrid', employment: 'Full-time',
    hours: '38 ordinary paid hours per week',
    schedule: 'Monday to Friday, 8.30 am-4.36 pm with a 30-minute unpaid meal break; first month in office, then two home days by agreement',
    pay: 'Illustrative: AUD $68,000-$75,000 annual base salary for 38 hours per week, plus super; overtime and any applicable penalties extra; no casual loading',
    payMin: '68000', payMax: '75000', payType: 'Annual salary',
    award: 'Coverage must be determined from employer and duties; no award-free conclusion is asserted',
    classification: 'Graduate accountant; industrial classification unverified pending coverage review',
    duties: 'Prepare reconciliations and draft working papers under supervision\nAssist with financial statements and client record checks\nDocument questions and discuss them with a supervising accountant',
    essential: 'Completed accounting degree, or completion before the agreed start date\nBasic spreadsheet skills and careful handling of confidential information\nNo prior professional accounting employment required',
    desirable: 'University projects, placements or volunteering with financial records\nInterest in learning business-services accounting software',
    benefits: ['Mentoring available', 'Training provided', 'Flexible working arrangements', 'Equipment provided'],
    otherBenefits: 'Illustrative offer: weekly supervisor check-in, paid software induction and a work laptop; professional-course fees are not included',
    applyMethod: 'link', applyDestination: 'https://example.org/mango-ledger/graduate',
    linkedinApplyUrl: 'https://example.org/mango-ledger/graduate',
    applicationItems: ['CV', 'A short introduction'],
    seekCategory: 'Accounting', seekSubcategory: 'Assistant Accountants',
    notes: 'Graduate pathway: CV and short introduction, interview using a university or placement example, then supervised onboarding. Hybrid work is specific to the sample, not an industry entitlement. The salary is a full-time annual base, not a package including super.',
  }),
  makeExample({
    id: 'manager', label: 'Manager: retail store manager',
    title: 'Retail store manager (fictional example)', business: 'Saltleaf Homewares (fictional)',
    location: 'Victoria Point, Queensland', workplace: 'On site', employment: 'Full-time',
    hours: '38 ordinary paid hours per week, averaged over a two-week roster',
    schedule: 'Week 1 Monday-Friday; week 2 Tuesday-Saturday; 7.6 paid hours per shift plus a 30-minute unpaid meal break; no on-call work',
    pay: 'Illustrative: AUD $78,000-$85,000 annual base salary for 38 hours per week, plus super; applicable Saturday penalties and overtime paid extra; no casual loading',
    payMin: '78000', payMax: '85000', payType: 'Annual salary',
    award: 'General Retail Industry Award 2020, MA000004 (indicative; coverage unverified)',
    classification: 'Retail Employee Level 8, store management (illustrative; verify duties and classification)',
    duties: 'Lead daily store operations and coach a team of eight\nPlan rosters within approved hours and wage budgets\nManage stock accuracy, safe opening and closing, and customer escalations',
    essential: 'Experience supervising a retail team and planning rosters\nAble to discuss stock control, customer service and safe store operations\nAvailable for the stated alternating Saturday roster',
    desirable: 'Experience mentoring new supervisors\nRetail reporting and inventory-system skills',
    benefits: ['Mentoring available', 'Staff discounts'],
    otherBenefits: 'Illustrative offer: monthly area-manager coaching and 15% discount on store products; no sales bonus is promised',
    applyMethod: 'email', applyDestination: 'saltleaf-careers@example.org',
    linkedinApply: 'platform', linkedinApplyUrl: '',
    applicationItems: ['CV', 'A short introduction'],
    seekCategory: 'Retail & Consumer Products', seekSubcategory: 'Management - Store',
    notes: 'Manager pathway: CV review and structured interview about leading a team. The annual salary does not absorb Saturday penalties or overtime; confirm the actual roster and applicable entitlements separately. LinkedIn collects listing applications in its own form; the example email is for social posts.',
  }),
  makeExample({
    id: 'technical', label: 'Technical professional: software engineer',
    title: 'Software engineer (fictional example)', business: 'Kiteglass Software (fictional)',
    location: 'Remote within Queensland; team based in Brisbane', workplace: 'Remote', employment: 'Full-time',
    hours: '38 ordinary paid hours per week',
    schedule: 'Monday-Friday; start between 8 am and 9.30 am AEST; 7.6 paid hours plus a 30-minute unpaid meal break; no on-call roster',
    pay: 'Illustrative: AUD $110,000-$125,000 annual base salary for 38 hours per week, plus super; overtime and applicable penalties extra; no casual loading',
    payMin: '110000', payMax: '125000', payType: 'Annual salary',
    award: 'Professional Employees Award 2020, MA000065 may apply; employer and duties require coverage review',
    classification: 'Professional IT employee level 2 (illustrative; qualifications, duties and classification unverified)',
    duties: 'Build and maintain TypeScript web services and accessible interfaces\nWrite tests and review changes with other engineers\nInvestigate defects and document clear technical decisions',
    essential: 'Experience delivering and maintaining production web software\nPractical TypeScript, SQL, testing and version-control skills\nAble to explain technical decisions; equivalent industry experience or relevant degree welcomed',
    desirable: 'Accessible-interface and cloud-deployment experience\nExamples of collaborative code review or mentoring',
    benefits: ['Equipment provided', 'Flexible working arrangements', 'Mentoring available'],
    otherBenefits: 'Illustrative offer: laptop and monitor supplied, fortnightly peer mentoring and the stated start-time flexibility; no bonus or equity included',
    applyMethod: 'link', applyDestination: 'https://example.org/kiteglass/engineer',
    linkedinApplyUrl: 'https://example.org/kiteglass/engineer',
    applicationItems: ['CV', 'A short introduction'],
    seekCategory: 'Information & Communication Technology', seekSubcategory: 'Developers/Programmers', style: 'direct',
    notes: 'Professional pathway: CV and short introduction, technical discussion of previous work and a short paired exercise during interview. No production work or unpaid take-home project is requested. Do not share confidential employer code. Remote work applies within Queensland in this sample.',
  }),
  makeExample({
    id: 'aged-care', label: 'Aged care: personal care worker',
    title: 'Aged care personal care worker (fictional example)', business: 'Wattle Haven Aged Care (fictional)',
    location: 'Residential aged-care home, Thornlands, Redlands, Queensland', workplace: 'On site', employment: 'Part-time',
    hours: '24 guaranteed ordinary paid hours per week across three 8-hour shifts',
    schedule: 'Monday, Wednesday and Friday, 7 am-3.30 pm; 30-minute unpaid meal break per shift; day roster only, no nights or weekends',
    pay: 'Illustrative: AUD $38-$42 per ordinary hour, plus super; applicable shift penalties, overtime and allowances extra; no casual loading',
    payMin: '38', payMax: '42', payType: 'Hourly rate',
    award: 'Aged Care Award 2010, MA000018 (residential direct-care illustration; coverage unverified)',
    classification: 'Aged care employee, direct care, level 3 - Qualified (illustrative; verify qualification and duties)',
    duties: 'Support residents with personal care, meals and daily routines using their care plans\nAssist safe mobility within training and supervision arrangements\nRecord care provided and promptly report changes to the supervising nurse\nRespect residents\' choices, privacy, dignity and cultural needs',
    essential: 'Certificate III in Individual Support (Ageing), or equivalent qualification, requested for this sample qualified role\nAble to communicate respectfully and follow care plans and infection-prevention procedures\nMeet current aged-care worker screening requirements before starting; employer verifies the applicable checks',
    desirable: 'Residential aged-care placement or paid care experience\nDementia-aware communication and electronic care-record skills; new qualified entrants welcome',
    benefits: ['Training provided', 'Mentoring available', 'Equipment provided'],
    otherBenefits: 'Illustrative offer: paid site induction, supervised buddy shifts and required PPE; no salary-packaging arrangement is promised',
    applyMethod: 'link', applyDestination: 'https://example.org/wattle-haven/personal-care',
    linkedinApplyUrl: 'https://example.org/wattle-haven/personal-care',
    applicationItems: ['CV', 'Availability'],
    seekCategory: 'Healthcare & Medical', seekSubcategory: 'Nursing - Aged Care', style: 'warm',
    notes: 'Qualified-care pathway: CV and availability, interview, qualification and current worker-screening verification, then paid induction and buddy shifts. This is residential aged care, not home care or a registered nurse role. No independent clinical assessment or medication administration is part of this example. The Certificate III is an example employer requirement for the illustrated qualified classification, not a claim that every aged-care role requires it. No resident or applicant screening documents should be placed in this brief.',
  }),
]);

// Preserve the original single-example export for existing consumers/tests.
export const EXAMPLE = EXAMPLES[0].data;
