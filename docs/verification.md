# Prototype verification — 22 October 2026

- **22 generator tests pass.** These cover selected channels, actual copy fields versus setup notes, missing/invalid destinations, numeric pay checks, hidden salary, separate private application settings, source-ad reuse, style and formatting.
- Application and preview-server JavaScript syntax checks pass.
- Browser checked at the default desktop viewport and at **390 × 844**. No horizontal overflow was observed on the mobile layout.
- The fictional example loads, updates the preview and survives reload through local browser storage.
- A malformed application email is visibly flagged. SEEK-only selection hides the social destination and excludes its value from the exported brief.
- The browser's copy handler reports success and the download handler generates a named `.md` Blob download. The browser automation download-event monitor did not return a saved-file path; the generated contents are separately exercised by the automated tests and preserved in `examples/cafe-ai-brief.md`.
- No external AI assistant was run, and no job was submitted. Improved writing/recruitment outcomes remain untested.
- Research uses official public help and, for some SEEK fields, partner UX/schema documentation. Signed-in Australian posting forms were not inspected. Exact current required markers, account features and platform validation remain to be verified in the employer's account.

The screenshot in `output/builder-preview.png` contains fictional example details only.
