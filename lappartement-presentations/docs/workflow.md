# Workflow — How to work with Claude on a new presentation

This document explains the human-side workflow: how to prepare assets, brief
Claude (or another collaborator), and iterate page by page until the PDF is
ready for delivery.

---

## Phase 1 — Preparation (before opening Claude)

### 1. Gather the raw material

For each new presentation you need:

**Images** (high-resolution, sRGB):
- Cover image (often a detail or full view of the work)
- Main view of the work
- Close-up / alternate angle of the same work
- Artist portrait (often a historical B&W photo)

**Texts** (plain `.txt`, UTF-8, English):
- Artist biography (~3–4 paragraphs)
- A quote from the artist (short, punchy)
- Notes on the work (~3 paragraphs)
- Provenance entries (one per line)
- Exhibitions list (one per line)
- Literature references (one per line)

**Metadata**:
- Artist first name, family name
- Work title, year (conceived / executed)
- Medium, dimensions (cm and inches)
- Price, if it should be displayed (often it shouldn't)

### 2. Prepare the images

This is the part that still requires real designer judgment.

- **2D works** (painting, drawing, collage, print): detour the background
  to pure white. Keep the frame if it's part of the work.
- **3D works** (sculpture, object): keep the studio background as-is.
- Resize so each image is at least 300 dpi at its final display size.
  Roughly 2000–3000 px on the long edge is plenty.
- Save as JPEG quality 90 for photographs, PNG for line-art or pieces with
  fine edges.
- Always work in **sRGB**. Do not embed Adobe RGB or CMYK profiles.

### 3. Pick the accent color

Open the main work image in your color tool of choice. Sample 3–5 dominant
hues. Pick one as the **accent**, and one (black or off-white) as the **accent
text color** that contrasts with it.

Document this in your project notes — eventually you'll have a palette
library, one entry per work.

### 4. Create the folder

```bash
cp -r templates/_new-artist artists/<artist-slug>
```

Slug convention: `<artist-family-name>-<work-title-slugified>`, all lowercase,
hyphenated. Examples: `jean-arp-poupee-borgne`, `alexander-calder-mobile-1948`.

Drop your renamed files into `assets/` and `content/`. Edit `config.yaml`.

---

## Phase 2 — Briefing Claude

When you've done the prep, your message to Claude should look like this:

```
New presentation: [Artist name] — [Work title]

REFERENCE
- Follow the Arp template (system is already preset).
- Specifics this time: [e.g. "2D work, detoured to white background",
  "two works in this presentation", "add an exhibition view page"]

ACCENT
- accent.color = #xxxxxx
- accent.text_color = #xxxxxx

PRICE
- [amount + currency] OR "do not display" OR "Price on request"

FILES
- See artists/<slug>/ directory. Standard structure.

SPECIAL REQUESTS
- [e.g. "add a second quote page between work 1 and work 2",
  "shorten bio to 3 paragraphs", "no notes-on-work page"]
```

The more structured this brief is, the closer the first build will be to the
final deliverable.

### Deltas vs. the baseline

The Arp presentation is the **baseline**. For each new work, only describe
what **differs** from it. Examples of legitimate deltas:

- Different accent color (always)
- 2D vs 3D (different image treatment)
- Multiple works (extends the sequence)
- Skipping a page (no notes, no closeup, etc.)
- Adding a page (exhibition view, second quote)

Don't redescribe the whole design system every time.

---

## Phase 3 — Iteration

### Rule: one page at a time

When you give feedback, target a specific page with a specific request.
Avoid "everything is off" — decompose into:

> Page 3: quote text too small, bump to 34pt.
> Page 6: provenance entries are ambiguous — bold the institution names.
> Page 7: remove the title "NOTE ON THE WORK", keep just the paragraphs.

Each feedback round should resolve cleanly. After 2–3 rounds the PDF is done.

### What good iteration looks like

1. Claude produces v1, you review.
2. You tag 3–5 issues, one per page, concise.
3. Claude fixes, produces v2.
4. You spot-check the fixes plus one full re-read.
5. Maybe one final v3 for a typo or alignment issue.
6. Sign-off.

### What to avoid

- Listing 15 issues at once (impossible to prioritize)
- Vague requests ("make it more elegant", "more space")
- Changing the brief mid-iteration ("actually let's add another work")
- Asking for things outside the system (gradients, decorations, icons) — the
  L'Advisory spec forbids them on purpose

---

## Phase 4 — Final checks

Before delivering to a client:

1. **Print one A4 epreuve** on your inkjet. Screens lie.
2. **Inspect**:
   - Colors realistic (not too saturated)
   - Margins not clipping at page edges
   - Text/background contrast strong enough to read
   - No widow lines or orphaned single words
3. **Re-read all text** for typos, weird spacing, hyphen vs em-dash.
4. **Check the PDF metadata** if you care (title in the file properties).
5. **Archive**: commit the final PDF to `artists/<slug>/output/` and tag
   the commit (e.g. `arp-poupee-borgne-final`).

---

## Building your archive

After 10 presentations you'll have a real visual catalog. Maintain:

- `artists/` populated and consistent in naming
- A `palettes.md` (or Google Sheet) listing accent colors per work
- Final PDFs committed with semantic tags

When a new client comes, you can show them the archive as a body of work.
