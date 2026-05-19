# L'Advisory Design System

Design system for **L'Appartement — Gallery & Advisory** (Geneva). L'Advisory
is the gallery's editorial advisory arm; this system defines the look of the
print-ready A4 PDF presentations that accompany every artwork proposal sent
to collectors.

It is a **deliberately tiny** system. Two fonts, two colors (plus one
artwork-derived accent per presentation), no icons, no decorations,
no rounded cards. Hierarchy comes from type + space + color, never from
boxes, borders, or shadows. White space is part of the design.

---

## Sources used to build this kit

This kit was reverse-engineered from the public reference repo:

- **L'Advisory presentation pipeline** —
  <https://github.com/LAppartementGallery/L-Advisory>

---

## Index — what's in this folder

```
README.md                   ← you are here
SKILL.md                    ← Claude / Agent Skill entry point
colors_and_type.css         ← CSS vars + semantic type classes
fonts/                      ← IvyMode-Regular.ttf
assets/logos/               ← ladvisory.svg, lappartement.svg
reference/                  ← original print.css from the upstream repo
sample/jean-arp/            ← the canonical baseline presentation
preview/                    ← Design System cards (registered for review)
ui_kits/presentation/       ← React recreations of each canonical page
slides/                     ← Standalone HTML sample per page type
```

---

## Brand context

**L'Appartement Gallery** is a Geneva fine-art gallery. **L'Advisory** is the
advisory practice that surrounds it — sourcing works for collectors from
private collections and third parties. The presentations are not for the
gallery's own holdings; they are sourced selections proposed to a specific
collector for a specific work or set of works.

Every presentation follows the same canonical sequence:

1. **Cover** — full-bleed detail of the work, L'Advisory mark top centre,
   artist name bottom right (first name light, family name bold).
2. **Biography** — L'Appartement mark top left, artist lockup left, portrait
   wrapped by 3–4 bio paragraphs.
3. **Quote** — full accent-color page, oversized Ivy Mode quotation marks.
4. **Work + commercial sheet** — work centered, fiche bottom right (artist,
   title, year, medium, dimensions, optional price).
5. **Close-up / exhibition view** — detail of the work + italic caption.
6. **Provenance / Exhibitions / Literature** — three sections, institutions
   set bold.
7. **Note on Work** (optional) — justified paragraphs.
8. **End** — L'Advisory logo in beige `#cec2ba`, disclaimer in same beige.

Multi-work presentations repeat pages 4–7 per work and may insert a second
quote page between cycles for breathing room.

---

## Content fundamentals

The voice is **editorial, third-person, art-historical**. Never marketing
copy, never "you", never imperatives. It reads like an auction catalogue
entry or a museum wall label written for a literate collector.

- **Voice**: third person, declarative, present or past tense.
- **Tone**: measured, considered, slightly formal.
- **Casing**: title case for proper nouns. ALL CAPS for artist lockups,
  fiche headings, section labels, quote signature.
- **English**: British orthography acceptable. Consistent within a presentation.
- **Numerals**: dimensions in cm and inches. Prices: `430,200 USD`.
- **Italics**: artwork titles, foreign terms, closeup captions.
- **Bold**: artist name + years in bio opener; institutions in detail page.
- **Dashes**: em dash (—) for pauses, en dash (–) for ranges. Never hyphen-minus.
- **Emoji**: never.
- **Filler vocabulary forbidden**: "Insights", "Discover", "Explore",
  "Unlock", "Curated", "Journey", "Vibe", "Story".

---

## Visual foundations

### Type

- **Inter** — display + body. Geometric, SIL OFL licensed (free for any use).
- **Ivy Mode** — used ONLY for the giant `"` quotation marks on the quote
  page. Loaded as `@font-face` from `fonts/IvyMode-Regular.ttf`.
- Hierarchy via **size + weight + spacing**. Never via borders, framed boxes,
  drop shadows, or background tints.

### Color

The palette is intentionally austere.

| Token            | Hex       | Use                                  |
| ---------------- | --------- | ------------------------------------ |
| `--la-black`     | `#010101` | All body text, all titles, lockups   |
| `--la-white`     | `#ffffff` | Page background                      |
| `--la-cover-fb`  | `#d8d6d2` | Cover fallback; generated background for 3D works |
| `--la-beige`     | `#cec2ba` | End-page logo + disclaimer text      |
| `--la-grey-caption` | `#888888` | Exhibition-view caption only      |

Plus one **accent color** per presentation, injected via `--accent-color`
and `--accent-text-color`. Must be **derived from the dominant tones of the
artwork** — never picked arbitrarily — and desaturated 15–25% before use.
Light accents pair with `#010101` text; dark accents pair with off-white
`#f5f1ea`. The accent appears on **one page only**: the quote page.

---

### Imagery — definitive rules

**These rules apply to every page that shows an artwork. They are not
optional and override any default.**

#### 1. Work-type handling

| Work type | Background | Frame | Page layout |
| --------- | ---------- | ----- | ----------- |
| **2D works** (painting, drawing, collage, photograph, print) | **Detoured to pure white** before insertion | **Kept if it is part of the work** | Centered with generous white space, proportional sizing |
| **3D works** (sculpture, object, installation) | Original studio background preserved; if absent, **generate a soft warm-grey** matching `--la-cover-fb` (`#d8d6d2`) | N/A | Full-bleed page; L'Appartement mark OMITTED to avoid sitting on the artwork |

The detour rule for 2D works is **strict**: any grey studio ground, paper
bleed, or photographic background must be removed. The frame, when present
and part of the work, is preserved with the artwork.

#### 2. Proportional scaling across works in the same presentation

When a single presentation contains multiple works, each work appears on
its own page. Their relative size on page is governed by their **real-world
physical dimensions**:

- A **200 × 150 cm** canvas should visually dominate a **30 × 40 cm**
  drawing by a small but visible margin (10–30 px difference on screen,
  not orders of magnitude). The dominant work occupies roughly 215mm of
  page height; the smallest works floor at 50mm.
- **Never fill the page systematically.** Generous white space is part of
  the system — even the dominant work leaves 40–50mm of clearance.
- **Anti-postage-stamp floor**: a miniature (e.g. 5 × 5 cm) is shown at
  50mm minimum, not literally proportional. The system protects against
  unreadable thumbnails.

The proportional curve is encoded in `ui_kits/presentation/pages/Work.jsx`
as `proportionalHeightMm = clamp(50, 60 + realCm × 0.78, 215)`.

This rule applies equally to the **Work page** (page 4) and the **Detail
page** (close-up, page 5). The detail crop on page 5 is shown full-bleed
or at the page width — proportional scaling does not apply at the
close-up scale.

#### 3. Cover image

- **Full-bleed**: image covers the entire A4 page, no margins.
- **Crop discipline**: the crop must NEVER destroy the legibility of the
  motif. No cropping through a face, no decapitating a sculpture, no
  hiding the principal element behind the title block.
- **3D works**: use the full sculpture image (don't crop into a detail —
  the silhouette matters).
- **2D works**: a detail crop is acceptable and often preferable —
  selecting a passage of texture or color that anchors the cover.

#### 4. Adaptive logo + label color on cover (critical)

The L'Advisory mark at top center and the artist lockup at bottom right
**must adopt the color that creates the strongest contrast** with the
underlying cover image at those positions.

- **Light or warm cover** (cream sculpture, beige stone, pale painting)
  → both elements in `--la-black` (`#010101`).
- **Dark or saturated cover** (deep blacks, dark oils, dramatic
  sculpture) → both elements in `--la-white` (`#ffffff`).
- **Ambiguous case**: choose the color that wins at the **top-center**
  (where the logo sits), even if it loses slightly at the bottom-right
  (where the artist lockup sits). The logo is the primary identity mark
  and must read at first glance.
- **Never** use transparency, blur, gradient, or scrim under the logo or
  lockup to improve contrast. If neither black nor white reads cleanly on
  a given crop, **choose a different crop**.

The implementation lives in `ui_kits/presentation/pages/Cover.jsx` as a
`coverContrastColor` prop driven from the presentation config.

#### 5. Artist portrait (page 2)

- Kept as-is. Often historical B&W; never color-graded.
- Wrapped by the bio body text with 25 px inner padding.

---

### Spacing & layout

- **Format**: A4 portrait, 210 × 297 mm.
- **Editorial margins**: ~12 mm baseline; most pages use 14–18 mm.
- **Text wrap**: 25 px inner padding around floated objects (portrait,
  artist name lockup wraps at 30 px).
- **Body text**: justified with last line flush left.
- **No page numbers**, no running footer.
- **Headers** appear only on biography (L'Appartement top-left) and work
  pages in proportional mode (L'Appartement top-left). In full-bleed mode
  for 3D works, the L'Appartement mark is omitted. The L'Advisory mark
  appears only on the cover (centered top) and the end page (centered, beige).

### Anti-slop rules (forbidden)

- No gradients, glassmorphism, drop shadows, rounded-corner cards,
  decorative dividers, or lines used as separators.
- No animations beyond imperceptible 200ms cross-fades.
- No hover color shifts on type. No press states. No buttons.
- No transparency on text. No blur. No capsules. No protection gradients.
- Corner radii: **0** everywhere.

---

## Iconography

**There is no icon system.** None of the pages contain icons, emoji, social
glyphs, or unicode pictograms. The only graphic marks are:

- `assets/logos/lappartement.svg` — top-left of biography and work pages.
- `assets/logos/ladvisory.svg` — top of cover, center of end page.
- The cover logo specifically follows the **adaptive contrast rule**
  (see Imagery section above).
- The giant `"` open / close quotation marks on the quote page, Ivy Mode 140pt.

---

## Changelog

- **2026-05-19 (v2)** — Imagery rules expanded with explicit work-type
  table (2D detoured to white, 3D full-bleed with generated grey
  background). Cover logo and label adaptive-contrast rule documented.
  Proportional scaling formula referenced and extended to detail page.
- **2026-05-17 (v1)** — Initial reverse-engineered kit from upstream repo.
