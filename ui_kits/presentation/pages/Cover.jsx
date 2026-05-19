// Page 1 — Cover.
// Full-bleed work image. L'Advisory mark top centre, modest size. Artist
// lockup bottom-right using Inter Thin + Ivy Mode. Title + year on same line.
//
// ADAPTIVE CONTRAST RULE (critical):
// The L'Advisory mark and the artist lockup must adopt the color that
// reads best against the underlying cover image at their positions.
//   - Light or warm cover → #010101 (black)
//   - Dark or saturated cover → #ffffff (white)
//   - The choice is driven by `data.cover.text_color` in the presentation
//     config. The designer makes the call per work, never the model.
// Never use transparency, blur, gradient, or scrim under the logo or lockup
// to "fix" contrast — choose a different crop instead.
function Cover({ data }) {
  const { artist, cover, works } = data;
  const work = works[0];

  // Pull the contrast color from the config. Default to black if not set
  // (most covers are light/warm). The designer overrides to "#ffffff" for
  // dark or saturated covers.
  const contrastColor = (cover && cover.text_color) || "#010101";

  return (
    <Page background="#d8d6d2" label="01 Cover">
      <div style={{ position: "absolute", inset: 0 }}>
        <img
          src={cover.image}
          alt={`${artist.first_name} ${artist.family_name}, ${work.title}`}
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }}
        />
      </div>
      <div
        style={{
          position: "absolute", top: "6mm", left: 0, right: 0,
          display: "flex", justifyContent: "center", zIndex: 2,
        }}
      >
        <Logo kind="ladvisory" color={contrastColor} widthMm={75} />
      </div>
      <div
        style={{
          position: "absolute", bottom: "24mm", left: "12mm", right: "12mm",
          zIndex: 2, color: contrastColor,
          display: "flex", flexDirection: "column", alignItems: "flex-end",
        }}
      >
        <div
          style={{
            display: "flex", alignItems: "baseline", gap: "10px",
            fontSize: "38pt", lineHeight: 1,
            textTransform: "uppercase", letterSpacing: "0.02em",
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
            marginTop: "5mm",
            fontFamily: "'Inter', sans-serif",
            fontWeight: 300,
            fontSize: "14pt",
            letterSpacing: "0.01em",
          }}
        >
          {work.title}, {extractYear(work.year)}
        </div>
      </div>
    </Page>
  );
}

function extractYear(yearString) {
  // "Conceived 1963; executed c. 1966" → first 4-digit year
  const m = (yearString || "").match(/\d{4}/);
  return m ? m[0] : yearString;
}

window.Cover = Cover;
