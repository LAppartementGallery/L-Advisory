#!/usr/bin/env python3
"""
L'Advisory Presentation Builder
================================

Generates a print-ready A4 HTML presentation from a presentation config.

USAGE:
    python system/scripts/build.py artists/<artist-slug>

The given directory must contain:
    - config.yaml         (see schema in any artist directory)
    - assets/             (images: cover, work-main, work-closeup, artist-portrait)
    - content/            (texts: biography, quote, provenance, exhibitions,
                          literature, notes-on-work, closeup-caption)

Output: <slug>.html in the artist's output/ directory.
To convert to PDF, run also: python system/scripts/to_pdf.py artists/<artist-slug>
"""
from __future__ import annotations

import argparse
import base64
import re
import sys
from html import escape
from pathlib import Path

try:
    import yaml
except ImportError:
    sys.exit("ERROR: PyYAML is required.  Install with: pip install pyyaml")


# -----------------------------------------------------------------------------
# Paths & constants
# -----------------------------------------------------------------------------

REPO_ROOT     = Path(__file__).resolve().parents[2]
SYSTEM_DIR    = REPO_ROOT / "system"
STYLES_FILE   = SYSTEM_DIR / "styles" / "print.css"
IVY_FONT_FILE = SYSTEM_DIR / "fonts"  / "IvyMode-Regular.ttf"
LOGO_ADVISORY = SYSTEM_DIR / "logos"  / "ladvisory.svg"
LOGO_APPART   = SYSTEM_DIR / "logos"  / "lappartement.svg"


# -----------------------------------------------------------------------------
# Helpers
# -----------------------------------------------------------------------------

def b64_data_uri(path: Path, mime: str) -> str:
    """Return a `data:` URI for embedding a binary asset in the HTML."""
    return f"data:{mime};base64,{base64.b64encode(path.read_bytes()).decode()}"


def mime_for_image(path: Path) -> str:
    ext = path.suffix.lower()
    return {
        ".jpg": "image/jpeg", ".jpeg": "image/jpeg",
        ".png": "image/png",
        ".webp": "image/webp",
        ".gif": "image/gif",
    }.get(ext, "application/octet-stream")


def load_svg(path: Path, fill_override: str | None = None, uid: str | None = None) -> str:
    """
    Load an SVG for inline embedding, neutralising the leaky <style> blocks
    typical of Illustrator exports. If `fill_override` is None, the original
    fill color is detected from the embedded style and re-applied as path
    attributes — meaning the source file is never modified.
    """
    text = path.read_text(encoding="utf-8")
    text = re.sub(r"<\?xml[^>]*\?>", "", text).strip()
    text = re.sub(r"<!--.*?-->", "", text, flags=re.DOTALL)

    # Detect original fill from <style> if no override is requested
    if fill_override is None:
        m = re.search(r"fill:\s*(#[0-9a-fA-F]{3,6})", text)
        if m:
            fill_override = m.group(1)

    # Strip internal styles that would leak / collide
    text = re.sub(r"<defs>\s*<style>.*?</style>\s*</defs>", "", text, flags=re.DOTALL)
    text = re.sub(r"<style[^>]*>.*?</style>", "", text, flags=re.DOTALL)

    if fill_override:
        def patch_path(match: re.Match) -> str:
            tag = match.group(0)
            tag = re.sub(r'\sclass="[^"]*"', "", tag)
            if re.search(r'\sfill="[^"]*"', tag):
                tag = re.sub(r'\sfill="[^"]*"', f' fill="{fill_override}"', tag)
            else:
                if tag.endswith("/>"):
                    tag = tag[:-2] + f' fill="{fill_override}"/>'
                else:
                    tag = tag[:-1] + f' fill="{fill_override}">'
            return tag
        text = re.sub(r"<path\b[^>]*?/?>", patch_path, text)

    if uid:
        text = re.sub(r"<svg\b", f'<svg data-uid="{uid}"', text, count=1)
    return text


def read_text_file(path: Path) -> str:
    """Read a UTF-8 text file, return empty string if missing."""
    return path.read_text(encoding="utf-8").strip() if path.exists() else ""


def inline_markdown(text: str) -> str:
    """
    Very small subset of Markdown for content files:
      *italic*       -> <em>italic</em>
      **bold**       -> <strong>bold</strong>
      _italic_ also  -> <em>italic</em>
    All HTML is escaped first.
    """
    text = escape(text)
    text = re.sub(r"\*\*(.+?)\*\*", r"<strong>\1</strong>", text)
    text = re.sub(r"\*(.+?)\*",     r"<em>\1</em>", text)
    text = re.sub(r"_(.+?)_",       r"<em>\1</em>", text)
    return text


def paragraphs_to_html(raw_text: str) -> str:
    """Split a multi-paragraph .txt into <p>...</p> blocks with light markdown."""
    if not raw_text:
        return ""
    paragraphs = re.split(r"\n\s*\n", raw_text.strip())
    return "\n".join(f"<p>{inline_markdown(p.strip())}</p>" for p in paragraphs)


def lines_to_entries(raw_text: str) -> str:
    """
    Turn a list-style .txt (one item per line, blanks ignored) into a stack of
    <div class="entry">...</div> blocks. Auto-bolds the first comma-segment
    when it looks like a gallery/institution (heuristic: title-cased proper noun).
    """
    if not raw_text:
        return ""
    out = []
    for line in raw_text.splitlines():
        line = line.strip()
        if not line:
            continue
        out.append(f'<div class="entry">{inline_markdown(line)}</div>')
    return "\n".join(out)


def bold_institutions(html_entries: str) -> str:
    """
    Post-pass on the entries HTML: wrap the first proper-noun phrase
    that follows a known prefix ('Gallery', 'Galerie', 'Museum', 'Sidney',
    'Solomon', 'Sotheby', 'Württembergischer', 'Kunsthalle', 'Fundació',
    'Palais', 'Museo', 'Fondation', 'The Museum') in <strong>…</strong>.
    This is a heuristic that works for the canonical art-historical sources;
    edit content files directly with **bold** markers when in doubt.
    """
    institutions = [
        "Gallery d'Art Moderne", "Galerie im Erker am Gallusplatz",
        "Sidney Janis Gallery", "Solomon R. Guggenheim Museum", "Sotheby's",
        "The Museum of Modern Art", "Museo Español de Arte Contemporaneo",
        "Württembergischer Kunstverein", "Kunsthalle Nürnberg",
        "Fundació Joan Miró", "Palais des Beaux-Arts", "Museo Correr",
        "Kunsthalle Ziegelhütte", "Fondation Arp", "Biarritz, Le Bellevue",
        "Zaragoza, La Lonja – Palacio de Montemuzo",
    ]
    for name in institutions:
        # Escape regex-significant chars in the name
        safe = re.escape(escape(name))
        html_entries = re.sub(
            rf"(?<!<strong>){safe}(?!</strong>)",
            f"<strong>{escape(name)}</strong>",
            html_entries,
        )
    return html_entries


# -----------------------------------------------------------------------------
# Page builders — one function per page of the canonical sequence
# -----------------------------------------------------------------------------

def page_cover(cfg: dict, artist_dir: Path, logos: dict, image_uri: str) -> str:
    first = escape(cfg["artist"]["first_name"])
    last  = escape(cfg["artist"]["family_name"])
    work_title = escape(cfg["works"][0]["title"])
    return f"""
<section class="page cover">
  <div class="cover-img-wrap">
    <img src="{image_uri}" alt="{first} {last}, {work_title}">
  </div>
  <div class="cover-logo">{logos['advisory_black']}</div>
  <div class="cover-artist">
    <div class="first">{first}</div>
    <div class="last">{last}</div>
    <div class="work">{work_title}</div>
  </div>
</section>
"""


def page_biography(cfg: dict, artist_dir: Path, logos: dict, portrait_uri: str) -> str:
    first = escape(cfg["artist"]["first_name"])
    last  = escape(cfg["artist"]["family_name"])
    bio_raw  = read_text_file(artist_dir / cfg["artist"]["bio_file"])
    bio_html = paragraphs_to_html(bio_raw)
    # Bold the very first occurrence of "First Last (years)" if present
    bio_html = re.sub(
        rf"({re.escape(first)} {re.escape(last)} \(\d{{4}}–\d{{4}}\))",
        r"<strong>\1</strong>",
        bio_html,
        count=1,
    )
    return f"""
<section class="page bio">
  <div class="bio-header">{logos['appartement']}</div>
  <div class="bio-body">
    <div class="bio-floatbox">
      <div class="name"><span class="first">{first}</span><span class="last">{last}</span></div>
      <img src="{portrait_uri}" alt="Portrait of {first} {last}">
    </div>
    {bio_html}
  </div>
</section>
"""


def page_quote(cfg: dict, artist_dir: Path) -> str:
    quote_raw = read_text_file(artist_dir / cfg["artist"]["quote_file"])
    # Strip an attribution line like "- Jean Arp" if present at the end of the file
    quote_lines = [l for l in quote_raw.splitlines() if l.strip() and not l.strip().startswith("-")]
    quote_text = " ".join(quote_lines).strip()
    author = escape(cfg["artist"].get("quote_author", cfg["artist"]["family_name"]))
    return f"""
<section class="page quote">
  <div class="quote-wrap">
    <span class="quote-mark open">&ldquo;</span>
    <div class="quote-text">{escape(quote_text)}</div>
    <span class="quote-mark close">&ldquo;</span>
  </div>
  <div class="quote-sig">&mdash; {author}</div>
</section>
"""


def page_work(cfg: dict, work: dict, logos: dict, image_uri: str) -> str:
    first = escape(cfg["artist"]["first_name"])
    last  = escape(cfg["artist"]["family_name"])
    title = escape(work["title"])
    year      = escape(work.get("year", ""))
    medium    = escape(work.get("medium", ""))
    dim_cm    = escape(work.get("dimensions_cm", ""))
    dim_in    = escape(work.get("dimensions_in", ""))
    price_line = ""
    if work.get("price"):
        price_line = f'<div class="price-line">Price (excl. VAT): {escape(str(work["price"]))}</div>'

    return f"""
<section class="page work-page">
  <div class="work-header">{logos['appartement']}</div>
  <div class="work-image">
    <img src="{image_uri}" alt="{first} {last}, {title}">
  </div>
  <div class="work-fiche">
    <div class="artist-line"><span class="first">{first}</span> <span class="last">{last}</span></div>
    <div class="title-line">{title}</div>
    <div class="meta-line">{year}</div>
    <div class="meta-line italic">{medium}</div>
    <div class="meta-line italic">{dim_cm} ({dim_in})</div>
    {price_line}
  </div>
</section>
"""


def page_closeup(cfg: dict, work: dict, artist_dir: Path, image_uri: str) -> str:
    first = escape(cfg["artist"]["first_name"])
    last  = escape(cfg["artist"]["family_name"])
    title = escape(work["title"])
    caption_raw = read_text_file(artist_dir / work["closeup_caption_file"]) if work.get("closeup_caption_file") else ""
    caption_html = inline_markdown(caption_raw).replace("\n", "<br>") if caption_raw else ""
    return f"""
<section class="page closeup">
  <div class="closeup-image">
    <img src="{image_uri}" alt="{first} {last}, {title}, detail">
  </div>
  <div class="closeup-text">{caption_html}</div>
</section>
"""


def page_detail(cfg: dict, work: dict, artist_dir: Path) -> str:
    prov_html = lines_to_entries(read_text_file(artist_dir / work["provenance_file"]))
    exhi_html = lines_to_entries(read_text_file(artist_dir / work["exhibitions_file"]))
    lit_html  = lines_to_entries(read_text_file(artist_dir / work["literature_file"]))
    # Auto-bold known institutions across all three sections
    prov_html = bold_institutions(prov_html)
    exhi_html = bold_institutions(exhi_html)
    lit_html  = bold_institutions(lit_html)
    return f"""
<section class="page detail-page">
  <h2>Provenance</h2>
  {prov_html}
  <h2>Exhibitions</h2>
  {exhi_html}
  <h2>Literature</h2>
  {lit_html}
</section>
"""


def page_notes(cfg: dict, work: dict, artist_dir: Path) -> str:
    notes_raw = read_text_file(artist_dir / work["notes_file"]) if work.get("notes_file") else ""
    if not notes_raw:
        return ""
    notes_html = paragraphs_to_html(notes_raw)
    return f"""
<section class="page note-page">
  {notes_html}
</section>
"""


def page_end(logos: dict) -> str:
    return f"""
<section class="page end-page">
  <div class="end-logo">{logos['advisory_cream']}</div>
  <p class="disclaimer">The artworks presented in this presentation are not owned by L&rsquo;Appartement &ndash; Gallery &amp; Advisory. The gallery does not hold exclusivity over them; this selection of artworks is sourced from a third party, including private collections and other professional art entities.</p>
</section>
"""


# -----------------------------------------------------------------------------
# Main build pipeline
# -----------------------------------------------------------------------------

def build(artist_dir: Path) -> Path:
    config_path = artist_dir / "config.yaml"
    if not config_path.exists():
        sys.exit(f"ERROR: {config_path} not found.")
    cfg = yaml.safe_load(config_path.read_text(encoding="utf-8"))

    # Load CSS and inline the Ivy Mode font as a data URI
    css = STYLES_FILE.read_text(encoding="utf-8")
    ivy_uri = b64_data_uri(IVY_FONT_FILE, "font/ttf")
    css = css.replace("__IVY_FONT_DATA_URI__", ivy_uri)

    # Inject accent variables for the quote page
    accent_color = cfg.get("accent", {}).get("color", "#f6f2eb")
    accent_text  = cfg.get("accent", {}).get("text_color", "#010101")
    accent_block = (
        f":root {{ --accent-color: {accent_color}; "
        f"--accent-text-color: {accent_text}; }}\n"
    )
    css = accent_block + css

    # Logos
    logos = {
        "advisory_black": load_svg(LOGO_ADVISORY, fill_override="#010101", uid="adv-blk"),
        "advisory_cream": load_svg(LOGO_ADVISORY, fill_override="#cec2ba", uid="adv-cream"),
        "appartement":    load_svg(LOGO_APPART,   fill_override=None,      uid="app"),
    }

    # Images — encode each asset path referenced from the config
    def img_uri(rel_path: str) -> str:
        p = artist_dir / rel_path
        return b64_data_uri(p, mime_for_image(p))

    cover_uri    = img_uri(cfg["cover"]["image"])
    portrait_uri = img_uri(cfg["artist"]["portrait"])

    # Build pages: cover, bio, quote, then one (or more) work cycles, then end
    body_parts = [
        page_cover(cfg, artist_dir, logos, cover_uri),
        page_biography(cfg, artist_dir, logos, portrait_uri),
        page_quote(cfg, artist_dir),
    ]
    for work in cfg["works"]:
        work_uri    = img_uri(work["image_main"])
        closeup_uri = img_uri(work["image_closeup"])
        body_parts.append(page_work(cfg, work, logos, work_uri))
        body_parts.append(page_closeup(cfg, work, artist_dir, closeup_uri))
        body_parts.append(page_detail(cfg, work, artist_dir))
        notes_section = page_notes(cfg, work, artist_dir)
        if notes_section:
            body_parts.append(notes_section)
    body_parts.append(page_end(logos))

    # Compose the final document
    title = f"{cfg['artist']['first_name']} {cfg['artist']['family_name']} — {cfg['works'][0]['title']} | L'Advisory"
    html = f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>{escape(title)}</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
<style>
{css}
</style>
</head>
<body>
{''.join(body_parts)}
</body>
</html>
"""

    output_dir = artist_dir / "output"
    output_dir.mkdir(exist_ok=True)
    out_path = output_dir / f"{cfg['output']['filename']}.html"
    out_path.write_text(html, encoding="utf-8")
    print(f"✓ HTML written to {out_path} ({out_path.stat().st_size / 1024:.1f} KB)")
    return out_path


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument("artist_dir", type=Path, help="Path to the artist directory (containing config.yaml)")
    args = parser.parse_args()
    artist_dir = args.artist_dir.resolve()
    if not artist_dir.is_dir():
        sys.exit(f"ERROR: {artist_dir} is not a directory.")
    build(artist_dir)


if __name__ == "__main__":
    main()
