# L'Advisory Presentation UI Kit

A React/JSX recreation of the canonical 8-page L'Advisory artist presentation,
faithful to the upstream `print.css` design.

## What's here

```
index.html                — Renders the full Jean Arp baseline as A4 pages,
                            scaled to fit the viewport. Use as a click-through.
PresentationApp.jsx       — Top-level component. Reads the sample data from
                            window.LA_DATA and renders the page sequence.
pages/Cover.jsx           — Page 1
pages/Biography.jsx       — Page 2
pages/Quote.jsx           — Page 3
pages/Work.jsx            — Page 4 (work + commercial fiche)
pages/Closeup.jsx         — Page 5 (close-up / exhibition view variant)
pages/Detail.jsx          — Page 6 (provenance / exhibitions / literature)
pages/Notes.jsx           — Page 7 (note on work, optional)
pages/End.jsx             — Page 8 (L'Advisory mark + disclaimer)
components/Lockup.jsx     — Artist first-name-light + family-name-bold lockup
components/Logo.jsx       — Inline-SVG logo with color override + sizing
components/Page.jsx       — A4 page frame with screen-scale wrapper
data/sample.js            — The Jean Arp / Poupée Borgne sample content
```

## How to use

1. Open `index.html` in the preview — it renders all 8 pages stacked, each at
   real A4 proportions, scaled to fit the viewport.
2. Components are pure-cosmetic recreations. They are NOT a 1:1 port of the
   upstream Python `build.py` — they exist to compose new visual designs in
   this design system.
3. To swap content, edit `data/sample.js` (or supply your own
   `window.LA_DATA` before the app script loads).

## Notes

- Inter is loaded from Google Fonts.
- Ivy Mode is loaded from `../../fonts/IvyMode-Regular.ttf` via `@font-face`.
- Logos are loaded from `../../assets/logos/*.svg` and recolored via CSS mask.
- The exact accent / accent-text color pair is set in `data/sample.js`.
- This kit recreates the print look on screen; the upstream pipeline targets
  A4 PDF via Chromium print. To export to PDF, browser-print at A4 portrait
  with backgrounds enabled.
