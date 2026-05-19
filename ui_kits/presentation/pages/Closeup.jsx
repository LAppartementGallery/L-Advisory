// Page 5 — Close-up / detail.
// Two presentation modes mirror the work page:
//   - "full-bleed": detail image covers the whole page. Italic caption sits
//     as a small overlay bottom-right.
//   - "proportional" (default): close-up sits centered on a white page,
//     scaled relative to the work's real dimensions, caption below.
function Closeup({ data, work }) {
  const { artist } = data;
  const mode = work.presentation === "full-bleed" ? "full-bleed" : "proportional";

  // Markdown-italic helper
  const caption = (work.closeup_caption || "")
    .split(/(\*[^*]+\*)/g)
    .map((seg, i) =>
      /^\*[^*]+\*$/.test(seg)
        ? <em key={i}>{seg.slice(1, -1)}</em>
        : <React.Fragment key={i}>{seg}</React.Fragment>
    );

  const realCm = work.real_size_cm || 100;
  const proportionalHeightMm = Math.max(60, Math.min(225, 70 + realCm * 0.78));

  if (mode === "full-bleed") {
    // Full-bleed close-up: image fills the top, caption sits in a clean
    // white strip below it so type NEVER overlays the artwork.
    return (
      <Page label="05 Close-up">
        <div
          style={{
            position: "absolute",
            top: 0, left: 0, right: 0,
            height: "230mm",         // image strip
            background: "#d8d6d2",
            overflow: "hidden",
          }}
        >
          <img
            src={work.image_closeup}
            alt={`${artist.first_name} ${artist.family_name}, ${work.title}, detail`}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
        <div
          style={{
            position: "absolute",
            top: "240mm", left: "12mm", right: "12mm",
            fontFamily: "'Inter', sans-serif",
            fontSize: "10pt",
            fontWeight: 300,
            fontStyle: "italic",
            lineHeight: 1.6,
            color: "#010101",
            textAlign: "justify",
            maxWidth: "120mm",
          }}
        >
          {caption}
        </div>
      </Page>
    );
  }

  return (
    <Page label="05 Close-up" style={{ padding: "12mm", position: "relative" }}>
      <div
        style={{
          position: "absolute",
          top: "12mm",
          left: "50%",
          transform: "translateX(-50%)",
          height: `${proportionalHeightMm}mm`,
        }}
      >
        <img
          src={work.image_closeup}
          alt={`${artist.first_name} ${artist.family_name}, ${work.title}, detail`}
          style={{ height: "100%", width: "auto", maxWidth: "180mm", objectFit: "contain" }}
        />
      </div>
      <div
        style={{
          position: "absolute",
          bottom: "18mm",
          left: "12mm",
          right: "12mm",
          maxWidth: "120mm",
          fontFamily: "'Inter', sans-serif",
          fontSize: "10pt",
          fontStyle: "italic",
          fontWeight: 300,
          lineHeight: 1.6,
          color: "#010101",
          textAlign: "justify",
        }}
      >
        {caption}
      </div>
    </Page>
  );
}

window.Closeup = Closeup;
