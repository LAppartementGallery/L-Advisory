# Convenience shortcuts. Usage: make build ARTIST=jean-arp-poupee-borgne

ARTIST ?=

.PHONY: help install build pdf all clean

help:
	@echo "Usage:"
	@echo "  make install                    Install Python deps + Chromium"
	@echo "  make build ARTIST=<slug>        Build HTML for one artist"
	@echo "  make pdf   ARTIST=<slug>        Build PDF (requires prior build)"
	@echo "  make all   ARTIST=<slug>        Build HTML + PDF"
	@echo "  make clean ARTIST=<slug>        Remove generated output"

install:
	pip install -r requirements.txt
	playwright install chromium

build:
	@if [ -z "$(ARTIST)" ]; then echo "ERROR: ARTIST=<slug> required"; exit 1; fi
	python system/scripts/build.py artists/$(ARTIST)

pdf:
	@if [ -z "$(ARTIST)" ]; then echo "ERROR: ARTIST=<slug> required"; exit 1; fi
	python system/scripts/to_pdf.py artists/$(ARTIST)

all: build pdf

clean:
	@if [ -z "$(ARTIST)" ]; then echo "ERROR: ARTIST=<slug> required"; exit 1; fi
	rm -f artists/$(ARTIST)/output/*.html artists/$(ARTIST)/output/*.pdf
