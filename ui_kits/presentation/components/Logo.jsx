// Logo — inlines the SVG so `color` becomes the path fill (via currentColor).
// Width is in mm to match print spec. Aspect ratio comes from the natural viewBox.

function Logo({ kind, color = "#010101", widthMm = 40, style }) {
  const aspect = window.LA_LOGO_ASPECTS[kind];
  const svg = window.LA_LOGOS[kind];
  // Inject width/height onto the root <svg> so it scales to its container.
  const sized = svg.replace(
    /<svg\b/,
    '<svg style="width:100%;height:100%;display:block" preserveAspectRatio="xMidYMid meet"'
  );
  return (
    <div
      role="img"
      aria-label={kind === "ladvisory" ? "L'Advisory" : "L'Appartement"}
      style={{
        width: `${widthMm}mm`,
        height: `${widthMm / aspect}mm`,
        color: color,
        ...style,
      }}
      dangerouslySetInnerHTML={{ __html: sized }}
    />
  );
}

window.Logo = Logo;
