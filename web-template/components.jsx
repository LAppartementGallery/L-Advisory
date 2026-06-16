/* =============================================================================
   L'ADVISORY — COMPOSANTS DE PAGE (partagés)
   ---------------------------------------------------------------------------
   Recrée chaque page de la séquence canonique en respectant les classes CSS de
   presentation.css et les règles verrouillées de CLAUDE.md. Ne contient AUCUNE
   décision esthétique : tout le style vit dans presentation.css.

   Données : window.SG_DATA (voir data-template.js).
   Rendu   : <Deck data={window.SG_DATA} /> (voir Template.html).

   Séquence : Couverture → Biographie → Citation → [par œuvre : Œuvre/fiche →
   Détail → Vue(s) in situ → Provenance/Expo/Litt.] → Note/Legacy → Fin.
   ============================================================================= */

/* --- Helpers texte --------------------------------------------------------- */
/* Convertit les marqueurs éditoriaux en HTML :
   *italique*  → <em>      (titres d'œuvres, termes étrangers)
   [[gras]]    → <strong>  (mise en gras ponctuelle)
   Les balises <strong>/<em> déjà présentes (provenance, expos) sont conservées.
   Contenu rédigé par le designer → innerHTML maîtrisé, pas d'entrée externe. */
function md(str) {
  if (str == null) return "";
  return String(str)
    .replace(/\*([^*]+)\*/g, "<em>$1</em>")
    .replace(/\[\[([^\]]+)\]\]/g, "<strong>$1</strong>");
}
function Inline({ text, as: Tag = "span", className }) {
  return <Tag className={className} dangerouslySetInnerHTML={{ __html: md(text) }} />;
}

/* Met en gras « Prénom Nom (années) » dans le 1er paragraphe de bio. */
function boldOpener(paragraph, first, family, years) {
  const full = `${first} ${family} (${years})`;
  const html = md(paragraph);
  return html.replace(full, `<strong>${full}</strong>`);
}

/* Échelle proportionnelle : hauteur sur page (mm) à partir de la plus grande
   dimension réelle (cm). clamp(50, 60 + realCm*0.78, 215) — anti timbre-poste
   et plafond pour laisser respirer la page (cf. design system). */
function proportionalHeightMm(realCm) {
  const h = 60 + (Number(realCm) || 100) * 0.78;
  return Math.max(50, Math.min(215, h));
}

/* --- Briques réutilisables ------------------------------------------------- */
function Lockup({ first, last, className }) {
  return (
    <span className={"lockup" + (className ? " " + className : "")}>
      <span className="first">{first}</span>
      <span className="last">{last}</span>
    </span>
  );
}

function Page({ kind, tag, folio, children, style }) {
  return (
    <section className={"page " + kind} style={style}>
      {tag ? <div className="page-tag">{tag}</div> : null}
      {children}
      {folio ? <div className="page-number">{folio}</div> : null}
    </section>
  );
}

/* --- Pages ----------------------------------------------------------------- */
function Cover({ data, logos }) {
  const a = data.artist, c = data.cover || {};
  return (
    <Page kind="cover" tag="Cover">
      {c.image ? <img className="bg" src={c.image} alt="" /> : null}
      <div className="ladvisory">
        <img className="logo-ladvisory-cover" src={logos.ladvisory} alt="L'Advisory" />
      </div>
      {c.skin ? <div className="skin">{c.skin}</div> : null}
      <Lockup first={a.first} last={a.family} />
      {c.title ? <div className="subtitle">{c.title}</div> : null}
    </Page>
  );
}

function Biography({ data, logos, folio }) {
  const a = data.artist;
  const paras = a.bio || [];
  return (
    <Page kind="bio" tag="Biography" folio={folio}>
      <div className="header">
        <img className="logo-lappartement" src={logos.lappartement} alt="L'Appartement" />
      </div>
      <div className="body-wrap">
        <div className="portrait-wrap">
          <img src={a.portrait} alt={`${a.first} ${a.family}`} />
          {a.portrait_caption
            ? <div className="portrait-caption" dangerouslySetInnerHTML={{ __html: md(a.portrait_caption) }} />
            : null}
        </div>
        <Lockup first={a.first} last={a.family} className="name" />
        <div className="body">
          {paras.map((p, i) => (
            <p key={i} dangerouslySetInnerHTML={{
              __html: i === 0 ? boldOpener(p, a.first, a.family, a.years) : md(p)
            }} />
          ))}
        </div>
      </div>
    </Page>
  );
}

function Quote({ quote }) {
  return (
    <Page kind="quote" tag="Quote">
      <div className="block">
        <span className="open">&ldquo;</span>
        <div className="body" dangerouslySetInnerHTML={{ __html: md(quote.text) }} />
        <span className="close">&ldquo;</span>
        <div className="sig">
          <span className="dash">—</span>
          <span className="first">{quote.attr_first}</span>&nbsp;
          <span className="last">{quote.attr_last}</span>
        </div>
      </div>
    </Page>
  );
}

function Work({ work, logos, folio }) {
  const heightMm = proportionalHeightMm(work.real_cm);
  return (
    <Page kind="work" tag="Work" folio={folio}>
      <div className="header">
        <img className="logo-lappartement" src={logos.lappartement} alt="L'Appartement" />
      </div>
      <div className="artwork-wrap">
        <div className="composition">
          <img className="artwork" src={work.image} alt={work.title}
               style={{ height: heightMm + "mm" }} />
          <div className="fiche">
            <Lockup first={work.title} last="" />
            <div className="info">
              <span className="title">{work.title}, {work.year}</span>
              <span className="medium">{work.medium}</span>
              {work.canvas_cm ? <span className="dims">{work.canvas_cm}</span> : null}
              {work.canvas_in ? <span className="dims">{work.canvas_in}</span> : null}
              {work.dims_cm ? <span className="dims framed">{work.dims_cm}</span> : null}
              {work.dims_in ? <span className="dims">{work.dims_in}</span> : null}
              {work.orientation_note ? <span className="dims">{work.orientation_note}</span> : null}
            </div>
            {work.price ? <div className="price">{work.price}</div> : null}
          </div>
        </div>
      </div>
    </Page>
  );
}

/* Détail / close-up : image fournie, plein cadre, pas de zoom synthétique. */
function Detail({ detail }) {
  return (
    <Page kind="detail-zoom" tag="Detail">
      <img src={detail.image} alt=""
           style={{ width: "100%", height: "100%", objectFit: "cover" }} />
    </Page>
  );
}

/* Vue in situ : image centrée + légende italique dessous, jamais full-bleed. */
function ViewPage({ view, folio }) {
  return (
    <Page kind="viewpage" tag="Installation view" folio={folio}>
      <div className="vp-composition">
        <div className="frame"><img src={view.image} alt="" /></div>
        {view.caption
          ? <div className="caption" dangerouslySetInnerHTML={{ __html: md(view.caption) }} />
          : null}
      </div>
    </Page>
  );
}

/* Provenance / Expositions / Littérature / References (en-tête = lockup seul). */
function DetailsPage({ work, artist, folio }) {
  const sections = [
    ["Provenance", work.provenance],
    ["Exhibitions", work.exhibitions],
    ["Literature", work.literature],
    ["References", work.references],
  ].filter(([, items]) => Array.isArray(items) && items.length);

  return (
    <Page kind="details" tag="Provenance" folio={folio}>
      <div className="header">
        <Lockup first={artist.first} last={artist.family} />
      </div>
      {sections.map(([heading, items]) => (
        <React.Fragment key={heading}>
          <h2>{heading}</h2>
          <div className="entries">
            {items.map((e, i) => (
              <div className="entry" key={i} dangerouslySetInnerHTML={{ __html: md(e) }} />
            ))}
          </div>
        </React.Fragment>
      ))}
    </Page>
  );
}

/* Note / Legacy : une colonne, sous-titres en Ivy Mode, paragraphes justifiés. */
function Note({ note, artist, folio }) {
  return (
    <Page kind="note" tag="Note" folio={folio}>
      <div className="header">
        <Lockup first={artist.first} last={artist.family} />
      </div>
      {note.title ? <h2 dangerouslySetInnerHTML={{ __html: md(note.title) }} /> : null}
      <div className="body">
        {(note.blocks || []).map((b, i) =>
          b.sub
            ? <div className="sub" key={i} dangerouslySetInnerHTML={{ __html: md(b.sub) }} />
            : <p key={i} dangerouslySetInnerHTML={{ __html: md(b.text) }} />
        )}
      </div>
    </Page>
  );
}

function End({ data, logos }) {
  const e = data.end || {};
  return (
    <Page kind="end" tag="End">
      <img className="logo logo-ladvisory-end" src={logos.ladvisoryBeige || logos.ladvisory} alt="L'Advisory" />
      {e.footnote ? <div className="footnote">{e.footnote}</div> : null}
      {e.disclaimer ? <div className="disclaimer">{e.disclaimer}</div> : null}
    </Page>
  );
}

/* --- Orchestrateur --------------------------------------------------------- */
function Deck({ data }) {
  // Logos : fournis par window.LA_LOGOS (Template.html) ou chemins par défaut.
  const logos = (typeof window !== "undefined" && window.LA_LOGOS) || {
    ladvisory: "assets/logos/ladvisory.svg",
    ladvisoryBeige: "assets/logos/ladvisory-beige.svg",
    lappartement: "assets/logos/lappartement.svg",
  };

  const works = data.works ? Object.values(data.works) : [];
  const pages = [];
  let folio = 1;                       // folio courant
  const next = () => folio++;          // numéro pour les pages numérotées

  pages.push(<Cover key="cover" data={data} logos={logos} />);          // cover : pas de folio
  pages.push(<Biography key="bio" data={data} logos={logos} folio={next()} />);
  (data.quotes || []).forEach((q, i) =>
    pages.push(<Quote key={"q" + i} quote={q} />));                     // quote : pas de folio

  works.forEach((w, i) => {
    pages.push(<Work key={"w" + i} work={w} logos={logos} folio={next()} />);
    if (w.detail && w.detail.image)
      pages.push(<Detail key={"d" + i} detail={w.detail} />);           // full-bleed : pas de folio
    if (w.view && w.view.image)
      pages.push(<ViewPage key={"v" + i} view={w.view} folio={next()} />);
    if (w.view2 && w.view2.image)
      pages.push(<ViewPage key={"v2" + i} view={w.view2} folio={next()} />);
    const hasDetails = (w.provenance && w.provenance.length) ||
      (w.exhibitions && w.exhibitions.length) ||
      (w.literature && w.literature.length) ||
      (w.references && w.references.length);
    if (hasDetails)
      pages.push(<DetailsPage key={"dp" + i} work={w} artist={data.artist} folio={next()} />);
  });

  if (data.note)
    pages.push(<Note key="note" note={data.note} artist={data.artist} folio={next()} />);
  pages.push(<End key="end" data={data} logos={logos} />);              // end : pas de folio

  return <div className="deck">{pages}</div>;
}
