// Page 7 — Note on work (optional).
// Paragraphs use the same body type as Biography + Detail entries:
//   Inter Light 10pt, line-height 1.6, justified. Italics via *...* markdown.
function Notes({ work }) {
  if (!work.notes || !work.notes.length) return null;

  function withItalics(text) {
    return text.split(/(\*[^*]+\*)/g).map((seg, i) =>
      /^\*[^*]+\*$/.test(seg)
        ? <em key={i}>{seg.slice(1, -1)}</em>
        : <React.Fragment key={i}>{seg}</React.Fragment>
    );
  }

  return (
    <Page label="07 Notes" style={{ padding: "12mm", color: "#010101" }}>
      <div style={{ maxWidth: "160mm", margin: "12mm auto 0" }}>
        {work.notes.map((p, i) => (
          <p
            key={i}
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 300,
              fontSize: "10pt",
              lineHeight: 1.6,
              marginBottom: "4mm",
              textAlign: "justify",
            }}
          >
            {withItalics(p)}
          </p>
        ))}
      </div>
    </Page>
  );
}

window.Notes = Notes;
