# Prototype verification — 22 October 2026

- **24 generator tests pass.** These cover selected channels, actual copy fields versus setup notes, missing/invalid destinations, numeric pay checks, hidden salary, separate private application settings, source-ad reuse, style and formatting.
- Application and preview-server JavaScript syntax checks pass.
- Browser checked at the default desktop viewport and at **390 × 844**. No horizontal overflow was observed on the mobile layout.
- The fictional example loads, updates the preview and survives reload through local browser storage.
- A malformed application email is visibly flagged. SEEK-only selection excludes the social destination from the exported brief; all form questions remain visible.
- The browser's copy handler reports success and the download handler generates a named `.md` Blob download. The browser automation download-event monitor did not return a saved-file path; the generated contents are separately exercised by the automated tests and preserved in `examples/cafe-ai-brief.md`.
- No external AI assistant was run, and no job was submitted. Improved writing/recruitment outcomes remain untested.
- Research uses official public help and, for some SEEK fields, partner UX/schema documentation. Signed-in Australian posting forms were not inspected. Exact current required markers, account features and platform validation remain to be verified in the employer's account.

The screenshot in `output/builder-preview.png` contains fictional example details only.

## Readability and the visible employer path

- Browser-computed text sizes were audited at desktop, 1000 × 900 and 390 × 844. The minimum was 16 pixels at all three sizes, with no text below that size and no horizontal overflow.
- There are no accordion elements and no hidden text inputs, textareas or selects. All optional questions remain visible.
- The existing-ad paste box is the first input. Pasting an ad updates the preview to “Existing ad ready to review”; source facts are extracted before missing information is assessed.
- Generated briefs require Australian English exclusively, no em dashes in generated copy and professional formatting for every voice. Pasted source material is preserved unchanged.

## Licence, favicon and GitHub Pages follow-up

- The Strange But True Public Source Licence was copied from `agent-md-form-navigator`, changing only the project identifier and original-project URL.
- The rendered licence and all linked favicon assets load in a browser.
- The generated root entry was checked with the repository served from its root, matching GitHub Pages' current `main` / root source. It loads the builder and its scripts from `dist/`; same-page anchors remain at the project root.
- `prepare-pages.mjs --check` verifies the root entry, static licence copy, crawler policy, sitemap and icon assets. The 22 existing generator tests still pass.
- `robots.txt` follows the allow-all JRA example; the README records the host-root scope of robots rules on GitHub project sites.

## Separate website pages, 23 October 2026

- The website now has eight pages: builder, How it works, Guides, SEEK guidance, LinkedIn/social fields, Facebook/employer checks, comparison template and licence. Main navigation and footer document links open HTML pages; no user-facing Markdown source links remain.
- Research is rendered from its existing Markdown sources, retaining all table rows, source URLs, evidence markers, the 22 October research date and verification boundaries. The comparison remains an unfilled template, not a report of completed trials.
- All 34 tests pass, including document rendering and page/navigation checks. The publishing check verifies local targets, anchors, generated pages, sitemap and assets.
- Browser checks covered all eight pages at desktop and 390 × 844. Computed text sizes were at least 16 pixels, with no page-level horizontal overflow. Research table cells become labelled rows on mobile.
- Clicked the main How it works link and a footer comparison link to confirm separate-page navigation. The builder draft survived a round trip and the Markdown viewer reflected the restored answers. No hidden form sections were introduced.
- Both the repository-root GitHub Pages layout and the dist-root Sites layout loaded the builder, guides, styles and navigation without browser console errors.
