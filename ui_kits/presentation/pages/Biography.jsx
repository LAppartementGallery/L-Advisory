// Page 2 — Biography.
// Layout:
//   - L'Appartement mark top-left (35mm).
//   - Below it, the bio block is vertically centered in the remaining page
//     so empty space above and below it is equal.
//   - Portrait floats left. The artist lockup (Inter Thin + Ivy Mode) sits
//     to the RIGHT of the portrait, aligned to its TOP. Justified bio text
//     follows under the lockup, wrapping around the portrait.
function Biography({ data }) {
  const { artist } = data;
  return (
    <Page
      label="02 Biography"
      style={{
        padding: "12mm",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Logo kind="lappartement" widthMm={35} color="#000000" />

      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: "100%",
            fontFamily: "'Inter', sans-serif",
            fontWeight: 300,
            fontSize: "10pt",
            lineHeight: 1.6,
            textAlign: "justify",
            color: "#010101",
          }}
        >
          {/* Portrait — floats left. Name + bio flow to its right starting at its top. */}
          <img
            src={artist.portrait}
            alt={`Portrait of ${artist.first_name} ${artist.family_name}`}
            style={{
              float: "left",
              width: "72mm",
              height: "auto",
              objectFit: "cover",
              margin: "0 8mm 4mm 0",
              shapeOutside: "margin-box",
              display: "block",
            }}
          />
          {/* Family-name lockup — first element of the right column. Sits aligned
              to the TOP of the portrait. */}
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: "8px",
              fontSize: "30pt",
              lineHeight: 1,
              marginBottom: "8mm",
              textTransform: "uppercase",
              letterSpacing: "0.02em",
              color: "#010101",
            }}
          >
            <span style={{ fontFamily: "'Inter', 'Helvetica Neue', sans-serif", fontWeight: 200 }}>
              {artist.first_name}
            </span>
            <span style={{ fontFamily: "'Ivy Mode', 'Times New Roman', serif", fontWeight: 400, letterSpacing: "0.005em" }}>
              {artist.family_name}
            </span>
          </div>

          {artist.bio.map((para, i) => (
            <p key={i} style={{ marginBottom: "4mm" }}>
              {i === 0 ? renderBioOpener(para, artist) : para}
            </p>
          ))}
        </div>
      </div>
    </Page>
  );
}

function renderBioOpener(text, artist) {
  const pattern = new RegExp(`(${artist.first_name} ${artist.family_name} \\(\\d{4}–\\d{4}\\))`);
  const parts = text.split(pattern);
  return parts.map((p, i) =>
    pattern.test(p) ? <strong key={i} style={{ fontWeight: 500 }}>{p}</strong> : <React.Fragment key={i}>{p}</React.Fragment>
  );
}

window.Biography = Biography;
