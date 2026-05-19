// Page 4 — Work + commercial fiche.
// Two presentation modes:
//   - "full-bleed": image covers the whole page, fiche overlays bottom-right.
//     Used for sculpture / 3D works where the studio ground is part of the image.
//     L'Appartement mark is OMITTED so it doesn't sit on the artwork.
//   - "proportional" (default): the work sits centered on a white A4 plate
//     at a size proportional to its real-world dimensions, with generous
//     white space around it. L'Appartement mark sits top-left.
//
// Proportional scaling rule (applied across multi-work presentations):
//   A 200 × 150 cm canvas dominates without filling the page;
//   a 30 × 40 cm work sits small inside generous white space.
//   No plate fills the page edge-to-edge.

function Work({ data, work }) {
  const { artist } = data;
  const year = (work.year || "").match(/\d{4}/)?.[0] || work.year;
  const mode = work.presentation === "full-bleed" ? "full-bleed" : "proportional";

  // Proportional height: map real_size_cm (longest dimension in cm) to
  // a 0–230mm scale where:
  //   200 cm → 215mm on page (dominant but not filling)
  //   100 cm → ~130mm
  //   30 cm  →  ~50mm  (timbre-poste guarded against by 50mm floor)
  const realCm = work.real_size_cm || 100;
  const proportionalHeightMm = Math.max(50, Math.min(215, 60 + realCm * 0.78));

  if (mode === "full-bleed") {
    return (
      <Page label="04 Work" background="#d8d6d2">
        <img
          src={work.image_main}
          alt={`${artist.first_name} ${artist.family_name}, ${work.title}`}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
        />
        <WorkFiche
          artist={artist} work={work} year={year}
          color="#010101"
          style={{ position: "absolute", bottom: "18mm", right: "18mm", zIndex: 2 }}
        />
      </Page>
    );
  }

  // Proportional plate
  return (
    <Page label="04 Work" style={{ padding: "12mm", position: "relative" }}>
      <div style={{ position: "absolute", top: "12mm", left: "12mm" }}>
        <Logo kind="lappartement" widthMm={35} color="#000000" />
      </div>
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -54%)",
          height: `${proportionalHeightMm}mm`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          src={work.image_main}
          alt={`${artist.first_name} ${artist.family_name}, ${work.title}`}
          style={{ height: "100%", width: "auto", maxWidth: "180mm", objectFit: "contain" }}
        />
      </div>
      <WorkFiche
        artist={artist} work={work} year={year}
        color="#010101"
        style={{ position: "absolute", bottom: "18mm", right: "18mm" }}
      />
    </Page>
  );
}

// Fiche component reused across modes
function WorkFiche({ artist, work, year, color, style }) {
  return (
    <div style={{ color, ...style }}>
      <div
        style={{
          display: "flex", alignItems: "baseline", gap: "2.4mm",
          textTransform: "uppercase",
          letterSpacing: "0.02em",
          lineHeight: 1,
          fontSize: "16pt",
        }}
      >
        <span style={{ fontFamily: "'Inter', 'Helvetica Neue', sans-serif", fontWeight: 200 }}>
          {artist.first_name}
        </span>
        <span style={{ fontFamily: "'Ivy Mode', 'Times New Roman', serif", fontWeight: 400, letterSpacing: "0.005em" }}>
          {artist.family_name}
        </span>
      </div>
      <div
        style={{
          fontFamily: "'Inter', sans-serif",
          fontWeight: 300,
          fontSize: "11pt",
          lineHeight: 1.45,
          marginTop: "3mm",
        }}
      >
        <span style={{ display: "block" }}>{work.title}, {year}</span>
        <span style={{ display: "block", marginTop: "4mm" }}>{work.medium}</span>
        <span style={{ display: "block" }}>{work.dimensions_cm}</span>
        <span style={{ display: "block" }}>{work.dimensions_in}</span>
      </div>
      {work.price && (
        <div
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 500,
            fontSize: "11pt",
            marginTop: "5mm",
            letterSpacing: "-0.005em",
          }}
        >
          Price (excl. VAT): {work.price}
        </div>
      )}
    </div>
  );
}

window.Work = Work;
window.WorkFiche = WorkFiche;
