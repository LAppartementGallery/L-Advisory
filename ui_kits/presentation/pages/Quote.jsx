// Page 3 — Quote.
//
// Accent-color background. THE FULL QUOTE PAGE IS SET IN IVY MODE:
//   - The two giant quotation marks (open + close)
//   - The quote body text itself
//   - The initial drop cap on the first letter
// Only the signature ("— ARTIST NAME") is set in Inter, all caps,
// medium weight, generous tracking.
//
// Hard rules (do not break):
//   - Body: Ivy Mode Regular ~26pt, JUSTIFIED text, drop cap on first letter
//   - Open mark: Ivy Mode 140pt, top-left of the text block
//   - Close mark: Ivy Mode 140pt, bottom-right of the text block, rotated 180°
//   - Drop cap: Ivy Mode ~90pt, floats left of the first paragraph
//   - Signature: Inter Medium 10pt, all caps, tracked 0.34em, right-aligned,
//     below the closing mark with breathing room
function Quote({ data }) {
  const { artist } = data;
  return (
    <Page
      background="var(--accent-color, #f6f2eb)"
      label="03 Quote"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div style={{ position: "relative", width: "145mm" }}>
        {/* Opening mark */}
        <span
          style={{
            fontFamily: "'Ivy Mode', 'Times New Roman', serif",
            fontSize: "140pt",
            lineHeight: 0.4,
            position: "absolute",
            top: "-2mm",
            left: "-16mm",
            color: "var(--accent-text-color, #010101)",
            fontWeight: 400,
          }}
        >
          &ldquo;
        </span>

        {/* Body text — IVY MODE, justified, with drop cap on first letter */}
        <p
          className="la-quote-body"
          style={{
            fontFamily: "'Ivy Mode', 'Times New Roman', serif",
            fontWeight: 400,
            fontSize: "26pt",
            lineHeight: 1.22,
            letterSpacing: "-0.005em",
            color: "var(--accent-text-color, #010101)",
            margin: 0,
            textAlign: "justify",
            textAlignLast: "left",
          }}
        >
          {artist.quote}
        </p>

        {/* Closing mark */}
        <span
          style={{
            fontFamily: "'Ivy Mode', 'Times New Roman', serif",
            fontSize: "140pt",
            lineHeight: 0.4,
            position: "absolute",
            bottom: "-22mm",
            right: "-16mm",
            transform: "rotate(180deg)",
            color: "var(--accent-text-color, #010101)",
            fontWeight: 400,
          }}
        >
          &ldquo;
        </span>

        {/* Signature — Inter, well below the closing mark */}
        <div
          style={{
            marginTop: "44mm",
            display: "flex",
            alignItems: "baseline",
            justifyContent: "flex-end",
            gap: "2mm",
            textTransform: "uppercase",
            color: "var(--accent-text-color, #010101)",
          }}
        >
          <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: "10pt", letterSpacing: "0.04em", marginRight: "3mm" }}>—</span>
          <span style={{ fontFamily: "'Inter', 'Helvetica Neue', sans-serif", fontWeight: 500, fontSize: "10pt", letterSpacing: "0.34em" }}>
            {artist.first_name}
          </span>
          <span style={{ fontFamily: "'Inter', 'Helvetica Neue', sans-serif", fontWeight: 500, fontSize: "10pt", letterSpacing: "0.34em" }}>
            {artist.family_name}
          </span>
        </div>
      </div>

      {/* Drop cap on the first letter of the quote — applied via ::first-letter */}
      <style>{`
        .la-quote-body::first-letter {
          font-family: 'Ivy Mode', 'Times New Roman', serif;
          font-size: 96pt;
          line-height: 0.9;
          float: left;
          padding-right: 4mm;
          padding-top: 2mm;
          font-weight: 400;
        }
      `}</style>
    </Page>
  );
}

window.Quote = Quote;
