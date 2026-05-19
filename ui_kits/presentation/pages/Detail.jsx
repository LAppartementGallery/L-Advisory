// Page 6 — Provenance / Exhibitions / Literature.
// Three sections. Section headings: Inter ExtraLight 14pt, 0.05em tracking.
// Generous space (16mm) between sections. Entries: Inter Light 9pt with
// institutions set in Inter Medium (semibold).

const INSTITUTIONS = [
  "Gallery d'Art Moderne", "Galerie im Erker am Gallusplatz",
  "Sidney Janis Gallery", "Solomon R. Guggenheim Museum", "Sotheby's",
  "The Museum of Modern Art", "Museo Español de Arte Contemporaneo",
  "Württembergischer Kunstverein", "Kunsthalle Nürnberg",
  "Fundació Joan Miró", "Palais des Beaux-Arts", "Museo Correr",
  "Kunsthalle Ziegelhütte", "Fondation Arp"
];

function renderEntry(text) {
  const parts = text.split(/(\*[^*]+\*|\*\*[^*]+\*\*)/g).map((seg, i) => {
    if (/^\*\*[^*]+\*\*$/.test(seg)) return <strong key={i} style={{ fontWeight: 500 }}>{seg.slice(2, -2)}</strong>;
    if (/^\*[^*]+\*$/.test(seg)) return <em key={i}>{seg.slice(1, -1)}</em>;
    let acc = [seg];
    INSTITUTIONS.forEach(name => {
      acc = acc.flatMap(piece => {
        if (typeof piece !== "string") return piece;
        const idx = piece.indexOf(name);
        if (idx === -1) return piece;
        return [
          piece.slice(0, idx),
          <strong key={`${i}-${name}`} style={{ fontWeight: 500 }}>{name}</strong>,
          piece.slice(idx + name.length),
        ];
      });
    });
    return acc.map((piece, j) =>
      typeof piece === "string" ? <React.Fragment key={`${i}-t-${j}`}>{piece}</React.Fragment> : piece
    );
  });
  return parts.flat();
}

function Detail({ work }) {
  const sectionHeader = {
    fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
    fontSize: "14pt",
    fontWeight: 200,
    letterSpacing: "0.05em",
    textTransform: "uppercase",
    margin: "16mm 0 5mm 0",
  };
  const entry = {
    fontFamily: "'Inter', sans-serif",
    fontWeight: 300,
    fontSize: "10pt",
    lineHeight: 1.6,
    marginBottom: "2mm",
    textAlign: "left",
  };
  return (
    <Page label="06 Detail" style={{ padding: "12mm", color: "#010101" }}>
      <h2 style={{ ...sectionHeader, marginTop: 0 }}>Provenance</h2>
      {work.provenance.map((e, i) => <div key={i} style={entry}>{renderEntry(e)}</div>)}
      <h2 style={sectionHeader}>Exhibitions</h2>
      {work.exhibitions.map((e, i) => <div key={i} style={entry}>{renderEntry(e)}</div>)}
      <h2 style={sectionHeader}>Literature</h2>
      {work.literature.map((e, i) => <div key={i} style={entry}>{renderEntry(e)}</div>)}
    </Page>
  );
}

window.Detail = Detail;
window.renderEntry = renderEntry;
