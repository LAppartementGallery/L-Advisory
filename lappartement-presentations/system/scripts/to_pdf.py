#!/usr/bin/env python3
"""
HTML → PDF converter for L'Advisory presentations.

USAGE:
    python system/scripts/to_pdf.py artists/<artist-slug>

Reads the HTML produced by build.py from <artist-dir>/output/ and writes the
matching .pdf next to it.

Requires: playwright + chromium browser
    pip install playwright
    playwright install chromium
"""
from __future__ import annotations

import argparse
import asyncio
import sys
from pathlib import Path

try:
    import yaml
    from playwright.async_api import async_playwright
except ImportError as e:
    sys.exit(f"ERROR: missing dependency ({e}). Install with: pip install pyyaml playwright")


async def convert(html_path: Path, pdf_path: Path) -> None:
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        context = await browser.new_context()
        page = await context.new_page()
        await page.goto(f"file://{html_path}", wait_until="networkidle")
        # Let Inter (loaded from Google Fonts) settle before printing.
        await page.wait_for_timeout(1500)
        await page.pdf(
            path=str(pdf_path),
            format="A4",
            print_background=True,
            margin={"top": "0", "right": "0", "bottom": "0", "left": "0"},
            prefer_css_page_size=True,
        )
        await browser.close()


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument("artist_dir", type=Path)
    args = parser.parse_args()

    artist_dir = args.artist_dir.resolve()
    cfg_path = artist_dir / "config.yaml"
    if not cfg_path.exists():
        sys.exit(f"ERROR: {cfg_path} not found.")
    cfg = yaml.safe_load(cfg_path.read_text(encoding="utf-8"))

    stem = cfg["output"]["filename"]
    html_path = artist_dir / "output" / f"{stem}.html"
    pdf_path  = artist_dir / "output" / f"{stem}.pdf"

    if not html_path.exists():
        sys.exit(f"ERROR: {html_path} not found. Run build.py first.")

    asyncio.run(convert(html_path, pdf_path))
    print(f"✓ PDF written to {pdf_path} ({pdf_path.stat().st_size / 1024:.1f} KB)")


if __name__ == "__main__":
    main()
