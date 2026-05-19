// Page — an A4 portrait frame at real (210 × 297 mm) proportions.
// Renders a white sheet with overflow:hidden; children position themselves.
function Page({ background = "#ffffff", children, label, style }) {
  return (
    <section
      className="la-page"
      data-screen-label={label}
      style={{
        width: "210mm",
        height: "297mm",
        position: "relative",
        overflow: "hidden",
        background,
        boxShadow: "0 1px 0 rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.06)",
        ...style,
      }}
    >
      {children}
    </section>
  );
}

window.Page = Page;
