// Page 3 — Quote.
// White background. Oversized Ivy Mode marks framing a wide column of
// Ivy Mode body text with a drop cap. Signature uses the Inter Thin + Ivy Mode
// lockup, right-aligned to the text column.
function Quote({ data }) {
  const { artist } = data;
  return (
    <Page background="#ffffff" label="03 Quote">
      <div
        style={{
          position: "absolute",
          top: "40%",
          left: "36mm",
          right: "36mm",
        }}
      >
        <span
          style={{
            fontFamily: "'Ivy Mode', 'Times New Roman', serif",
            fontSize: "180pt",
            lineHeight: 0.55,
            position: "absolute",
            top: "-14mm",
            left: "-24mm",
            color: "#010101",
          }}
        >
          &ldquo;
        </span>
        <p
          style={{
            fontFamily: "'Ivy Mode', 'Times New Roman', serif",
            fontWeight: 400,
            fontSize: "28pt",
            lineHeight: 1.18,
            letterSpacing: "-0.005em",
            color: "#010101",
            margin: 0,
            textAlign: "justify",
            textAlignLast: "left",
          }}
          className="la-quote-body"
        >
          {artist.quote}
        </p>
        <span
          style={{
            fontFamily: "'Ivy Mode', 'Times New Roman', serif",
            fontSize: "180pt",
            lineHeight: 0.55,
            position: "absolute",
            bottom: "-14mm",
            right: "-24mm",
            transform: "rotate(180deg)",
            color: "#010101",
          }}
        >
          &ldquo;
        </span>
        <div
          style={{
            position: "absolute",
            right: 0,
            bottom: "-38mm",
            display: "flex", alignItems: "baseline", gap: "1.5mm",
            textTransform: "uppercase",
            color: "#010101",
          }}
        >
          <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 200, fontSize: "11pt", letterSpacing: "0.04em", marginRight: "2mm" }}>—</span>
          <span style={{ fontFamily: "'Inter', 'Helvetica Neue', sans-serif", fontWeight: 200, fontSize: "11pt", letterSpacing: "0.05em" }}>
            {artist.first_name}
          </span>
          <span style={{ fontFamily: "'Ivy Mode', 'Times New Roman', serif", fontWeight: 400, fontSize: "11pt", letterSpacing: "0.01em" }}>
            {artist.family_name}
          </span>
        </div>
      </div>
      <style>{`
        .la-quote-body::first-letter {
          font-family: 'Ivy Mode', 'Times New Roman', serif;
          font-size: 96pt;
          line-height: 0.92;
          float: left;
          padding-right: 3.5mm;
          padding-top: 1mm;
          font-weight: 400;
        }
      `}</style>
    </Page>
  );
}

window.Quote = Quote;
