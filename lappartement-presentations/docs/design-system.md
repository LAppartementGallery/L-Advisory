# L'Advisory Design System

This is the design specification followed by the build pipeline. Edit
`system/styles/print.css` to change it; this document explains the rationale.

---

## Format

- A4 portrait (210 × 297 mm)
- Editorial margins ≈ 12 mm
- No page numbers, no running footer
- Headers only on biography and work pages (L'Appartement logo, top-left)

---

## Typography

### Display & body: Inter

A single family handles both display and body, with weight changes for
hierarchy. Inter is SIL OFL-licensed (free for any use), geometric, with
neutral openings.

- Display use: titles, family-name lockups, in CAPITALS with `letter-spacing: 0.01–0.02em`
- Body: 9–10pt for paragraphs, line-height 1.55–1.7, justified text

### Ornamental: Ivy Mode

Only used for the large opening/closing quotation marks on the quote page.
Loaded as a `@font-face` from the bundled `.ttf`.

### Hierarchy rule

Hierarchy is created by **three levers only**:

1. **Size** (10pt body → 26pt cover artist name → 140pt ornamental quote marks)
2. **Weight** (300 light → 400 regular → 600 semibold → 700 bold)
3. **Spacing** (letter-spacing for caps, line-height for breathing, margins for separation)

Never use borders, framed boxes, drop shadows, or background tints to create
hierarchy. The page is white (or pure accent), and type does the work.

---

## Color

### Defaults

| Token              | Value      | Use                          |
| ------------------ | ---------- | ---------------------------- |
| Text on white      | `#010101`  | Body, titles, all neutral pages |
| L'Appartement logo | `#000000`  | Headers on bio + work pages  |
| End-page logo      | `#cec2ba`  | L'Advisory mark, end page    |
| Disclaimer text    | `#cec2ba`  | End-page disclaimer paragraph |
| Cover background   | `#d8d6d2`  | Fallback when image loads    |

### Accent (per presentation)

The **quote page** is the only page tinted. The accent is derived from the
dominant tones of the artwork — never picked arbitrarily.

- Light accents (cream, off-white): pair with `#010101` text
- Dark accents: pair with `#f5f1ea` or similar off-white text

This is set in `config.yaml`:

```yaml
accent:
  color: "#f6f2eb"
  text_color: "#010101"
```

---

## Page sequence (canonical)

| # | Page                    | Header logo     | Notes                                |
| - | ----------------------- | --------------- | ------------------------------------ |
| 1 | Cover                   | L'Advisory ⬛   | Full-bleed image, no date            |
| 2 | Biography               | L'Appartement   | Portrait left, text wrapping right   |
| 3 | Quote                   | —               | Accent background, Ivy Mode marks    |
| 4 | Work + commercial sheet | L'Appartement   | Work centered, fiche bottom-right    |
| 5 | Close-up / detail       | —               | Italic caption                       |
| 6 | Provenance / Exh. / Lit.| —               | Three sections, institutions bold    |
| 7 | Note on Work            | —               | Optional. Justified paragraphs       |
| 8 | End / Disclaimer        | L'Advisory beige| `#cec2ba` text and logo              |

For multi-work presentations, repeat pages 4–7 (the **work cycle**) once per
work. Insert an optional second quote page between cycles for breathing room.

---

## Image rules

### Crops & backgrounds

- **2D works**: detour the photo background to pure white. Keep the frame if
  it's part of the work.
- **3D works** (sculptures, objects): keep the original neutral studio
  background. Do not detour to white — it kills the spatial reading.
- **Cover**: detail or full view of the main work, full bleed. The crop must
  not mutilate the artwork (no destructive framing).

### Proportional scaling

When several works appear in the same presentation, their image sizes on
their respective pages must reflect their **relative real-world dimensions**.
A 200 × 150 cm canvas should visually dominate a 30 × 40 cm work by a small
margin (10–30 px on screen). Never just fill the page systematically.

For sculptures of similar height, scale to match the **tallest** of the set
on its page, then proportionally reduce others by their real height ratio.

---

## Things this system explicitly forbids

- Gradients, glassmorphism, drop shadows used for marketing effect
- Icons, emojis, decorative dividers
- Rounded-corner cards, borders, framed text blocks
- Filler copy: "Insights", "Discover", "Explore"
- Social media links, addresses, QR codes, contact info on internal pages
- Prices without context (only in the work-page fiche, below the metadata)
- Date next to the artist name on the cover

When in doubt: **remove**. White space is part of the design.
