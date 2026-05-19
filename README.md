[README.md](https://github.com/user-attachments/files/28008594/README.md)
# L'Appartement Presentations

Print-ready A4 PDF presentations for **L'Appartement — Gallery & Advisory** (Geneva).
One repository, one design system, one Python pipeline. Produces editorial fine-art
presentations from a config file and a folder of assets.

---

## Quick start

```bash
# 1. Install dependencies (once)
pip install pyyaml playwright pdf2image
playwright install chromium

# 2. Build a presentation
python system/scripts/build.py  artists/jean-arp-poupee-borgne
python system/scripts/to_pdf.py artists/jean-arp-poupee-borgne

# 3. Open the result
open artists/jean-arp-poupee-borgne/output/jean-arp-poupee-borgne.pdf
```

That's it. The HTML is self-contained (fonts + images embedded as base64),
so it can be sent or hosted without external dependencies.

---

## Repository structure

```
lappartement-presentations/
├── README.md
├── .gitignore
├── system/                          ← design system, shared across all presentations
│   ├── styles/
│   │   └── print.css                ← THE stylesheet. Edit here to update the system.
│   ├── fonts/
│   │   └── IvyMode-Regular.ttf      ← used for ornamental quotation marks
│   ├── logos/
│   │   ├── ladvisory.svg            ← L'Advisory logo (originals, never modified)
│   │   └── lappartement.svg         ← L'Appartement logo
│   └── scripts/
│       ├── build.py                 ← reads a config, produces self-contained HTML
│       └── to_pdf.py                ← converts the HTML to A4 PDF via Chromium
│
├── artists/                         ← one folder per presentation
│   └── jean-arp-poupee-borgne/
│       ├── config.yaml              ← all variables for this presentation
│       ├── assets/                  ← images (cover, work-main, work-closeup, portrait)
│       ├── content/                 ← text files (biography, quote, provenance, …)
│       └── output/                  ← generated .html and .pdf land here
│
├── templates/                       ← starter folder you copy for a new artist
│   └── _new-artist/
│
└── docs/
    ├── workflow.md                  ← how to brief, prepare assets, iterate
    └── design-system.md             ← rules, type scale, color principles
```

---

## Creating a new presentation

```bash
# 1. Copy the template
cp -r templates/_new-artist artists/<artist-slug>

# 2. Drop your assets in artists/<artist-slug>/assets/
#    Required filenames (rename your files to match these):
#      cover.jpeg              ← used full-bleed on page 1
#      work-main.jpeg          ← main view of the work, page 4
#      work-closeup.jpeg       ← detail or alternate angle, page 5
#      artist-portrait.png     ← page 2 biography portrait

# 3. Replace text content in artists/<artist-slug>/content/
#      biography.txt
#      quote.txt
#      closeup-caption.txt
#      provenance.txt          ← one entry per line
#      exhibitions.txt         ← one entry per line
#      literature.txt          ← one entry per line
#      notes-on-work.txt

# 4. Edit artists/<artist-slug>/config.yaml
#    Update artist name, work title/year/medium/dimensions, accent color, etc.

# 5. Build
python system/scripts/build.py  artists/<artist-slug>
python system/scripts/to_pdf.py artists/<artist-slug>
```

---

## The accent color

Each presentation has an `accent.color` (page 3 background) and `accent.text_color`
(text on that background). **Derive both from the dominant tones of the artwork**,
never pick arbitrary colors. Useful tools:

- [Coolors.co Image Picker](https://coolors.co/image-picker)
- Adobe Color → Extract Theme
- Photoshop → Image → Adjustments → Color Picker

Rule of thumb: desaturate the picked color by 15–25% before using it.
Bright web colors look cheap on a fine-art document.

---

## Required image preparation

The pipeline does **not** retouch images. You handle that in Photoshop / Affinity
before adding files to `assets/`:

| Work type           | Background           | Format     | Color space | Min. resolution |
| ------------------- | -------------------- | ---------- | ----------- | --------------- |
| 2D (painting, etc.) | Detoured to white    | JPEG q90   | sRGB        | 300 dpi at output size |
| Sculpture / 3D      | Keep original studio | JPEG q90   | sRGB        | 300 dpi at output size |
| Artist portrait     | As-is (often B&W)    | PNG or JPEG| sRGB        | 1000 px tall+   |

---

## Editing the design system

Everything visual lives in `system/styles/print.css`. The page sequence and
typographic rules follow the L'Advisory design system specification. Avoid
hard-coding colors into individual artist configs — use the `accent` block in
the YAML so the system stays consistent.

---

## Versioning

- Commit your `config.yaml` and `content/` text files freely.
- Commit `assets/` selectively. Large hi-res images can blow up the repo —
  see `.gitignore` for the policy.
- The `output/` folder is gitignored by default. Commit a final PDF only if
  it's a delivered/approved version, ideally tagged.

---

## Credits

Design direction: L'Appartement Gallery, Geneva.
Build pipeline: HTML + CSS + Chromium-headless via Playwright.
