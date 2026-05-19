// Page 8 — End / disclaimer.
// L'Advisory mark in beige, centered, LARGE. Disclaimer in same beige.
function End() {
  return (
    <Page
      label="08 End"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "12mm",
        textAlign: "center",
      }}
    >
      <div style={{ marginBottom: "22mm" }}>
        <Logo kind="ladvisory" color="#cec2ba" widthMm={130} />
      </div>
      <p
        style={{
          fontFamily: "'Inter', sans-serif",
          fontWeight: 300,
          fontSize: "8.5pt",
          lineHeight: 1.65,
          color: "#cec2ba",
          maxWidth: "140mm",
          textAlign: "center",
          margin: 0,
        }}
      >
        The artworks presented in this presentation are not owned by L&rsquo;Appartement
        &ndash; Gallery &amp; Advisory. The gallery does not hold exclusivity over them;
        this selection of artworks is sourced from a third party, including private
        collections and other professional art entities.
      </p>
    </Page>
  );
}

window.End = End;
