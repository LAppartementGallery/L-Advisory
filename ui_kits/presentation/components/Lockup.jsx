// Lockup — "Jean Arp" with first-name light + family-name bold.
// Used on cover, biography, and fiche; each context overrides the size.
function Lockup({ first, last, sizePt = 26, inline = false, style }) {
  if (inline) {
    return (
      <span style={{ ...style, letterSpacing: "0.02em", textTransform: "uppercase" }}>
        <span style={{ fontWeight: 300 }}>{first}</span>{" "}
        <span style={{ fontWeight: 700 }}>{last}</span>
      </span>
    );
  }
  return (
    <div
      style={{
        lineHeight: 1,
        letterSpacing: "0.01em",
        textTransform: "uppercase",
        color: "#010101",
        ...style,
      }}
    >
      <div style={{ fontWeight: 300, fontSize: `${sizePt}pt` }}>{first}</div>
      <div style={{ fontWeight: 700, fontSize: `${sizePt}pt`, marginTop: "0.5mm" }}>
        {last}
      </div>
    </div>
  );
}

window.Lockup = Lockup;
