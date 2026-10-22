# Generated favicon

Created on 22 October 2026 using the built-in `image_gen` tool in this Codex chat. No CLI, API-key workflow, downloaded stock artwork or vector substitute was used.

The original mark is a pale-lime document with a folded corner, two bold lines and an integrated opportunity spark on evergreen. It has no text, people or existing brand logos. The source and its 16- and 32-pixel derivatives were visually inspected; the large shapes and contrast remain clear at small sizes.

## Initial generation prompt

```text
Use case: logo-brand.
Asset type: original raster favicon for Job Ad Formula, a simple job-ad writing tool.
Primary request: create one bold, original document-and-opportunity-spark symbol, with no text. A solid pale-lime document silhouette with a small folded corner and a single bold four-point opportunity spark integrated at its upper right. One or two thick evergreen negative-space lines inside the document may suggest a clear job advertisement.
Style/medium: extremely simple flat graphic, crisp edges and large shapes, designed to remain legible when downscaled to 16×16 and 32×32 pixels.
Composition: square canvas, centred symbol occupying about 75 percent of the square, balanced generous margins. Solid full-bleed evergreen background #173d35; primary mark pale lime #dcecaf. Use only these two colours.
Constraints: no letters, no words, no numbers, no people, no existing company logos, no watermark, no mockup or border, no gradients, no shadows, no texture, no tiny details, no extra decorative shapes. Do not show a browser, screen or application. Deliver the actual square icon image.
```

## Final refinement prompt

The built-in tool edited the initial generated image. This is the exact final prompt:

```text
Use case: precise-object-edit.
Edit the referenced original favicon. Preserve its document silhouette, folded corner, integrated four-point opportunity spark, two thick internal lines, square composition and generous margins exactly.
Make only one correction: remove every trace of texture, shading and tonal variation, so all flat background regions are one perfectly uniform evergreen #173d35 and all flat mark regions are one perfectly uniform pale lime #dcecaf. Antialiased edges are fine. No gradients, no grain, no shadows, no lighting. No text, no new elements, no border. Keep the bold small-size readability. Deliver the actual square icon image.
```

The final generated source is retained unchanged. As a generated raster it has slight tonal variation; palette values in the prompt are intended colours, not a guarantee that every interior pixel exactly matches those hex values. No manual drawing, recolouring, masking, cropping or creative modification was applied after generation.

## Project files

All paths below are relative to the repository root.

| File | Purpose | Dimensions |
| --- | --- | --- |
| `dist/assets/job-ad-formula-favicon-source.png` | Unchanged final generated source | 1254 × 1254 |
| `dist/assets/favicon-16.png` | Small browser icon and inspection derivative | 16 × 16 |
| `dist/assets/favicon-32.png` | Browser PNG favicon | 32 × 32 |
| `dist/assets/favicon-192.png` | Large browser icon | 192 × 192 |
| `dist/assets/apple-touch-icon.png` | Apple touch icon | 180 × 180 |
| `dist/assets/favicon.ico` | Multi-resolution browser icon | 16, 32 and 48 pixels square |

Derivatives use standard Pillow Lanczos downscaling and PNG/ICO format conversion only. The 16-pixel PNG was extracted from the ICO for visual inspection. ICO dimensions were checked programmatically.
