---
name: ladvisory-design
description: Use this skill to generate well-branded interfaces and assets for L'Appartement Gallery's L'Advisory presentations, either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping editorial fine-art A4 PDF presentations.
user-invocable: true
---

Read the `README.md` file within this skill, and explore the other available files.

This skill captures the L'Advisory editorial presentation system used by L'Appartement Gallery (Geneva) for artist + artwork proposals sent to collectors. It is deliberately tiny: two fonts, two colors, one artwork-derived accent per presentation, no icons, no decorations.

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out of `assets/`, `fonts/`, and `sample/` and create static HTML files for the user to view. Use the standalone slide templates in `slides/` as copy-paste starters — one file per canonical page type (cover, quote, work, detail, end).

If working on production code, you can copy assets and read the rules in `README.md` to become an expert in designing with this brand. The reference upstream Python pipeline at <https://github.com/LAppartementGallery/L-Advisory> contains the source-of-truth `print.css` and a build script that produces A4 PDFs from a YAML config.

If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions (artist, work title, accent color derivation, whether to include price, single vs multiple works), and act as an expert editorial designer who outputs HTML artifacts _or_ production code, depending on the need.

## Quick reference

- **Format**: A4 portrait, 210 × 297 mm. Editorial margins ~12 mm.
- **Type**: Inter for everything; Ivy Mode only for the giant `"` on the quote page.
- **Color**: `#010101` text on `#ffffff`. Beige `#cec2ba` only on the end page. Accent only on the quote page, derived from the artwork.
- **Canonical sequence**: Cover → Biography → Quote → Work + fiche → Close-up → Provenance/Exhibitions/Literature → Notes (optional) → End.
- **Anti-slop**: no gradients, no icons, no emoji, no rounded cards, no borders, no protection gradients, no page numbers, no contact info on internal pages.
