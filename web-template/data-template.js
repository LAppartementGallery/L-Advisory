/* =============================================================================
   L'ADVISORY — TEMPLATE VIERGE (réutilisable)
   ---------------------------------------------------------------------------
   COMMENT UTILISER :
   1. Remplace chaque valeur ci-dessous par les vraies infos de l'artiste/œuvre.
   2. Remplace les images placeholder par tes fichiers (images/...).
      → mets cover_detail.jpg, portrait.jpg, artwork.jpg, detail.jpg,
        wall_view.jpg dans le dossier images/, ou change les chemins ici.
   3. Accent : édite --accent-color / --accent-text dans presentation.css
      (couleur dérivée de l'œuvre, désaturée ~20%).
   4. Texte : *italique* = titre d'œuvre / terme étranger.
              <strong>…</strong> = institution / galerie (provenance, expo, litt.)
   Ne jamais inventer une info manquante — la laisser en placeholder et la demander.
   ============================================================================= */

/* Placeholder gris clair avec libellé — remplacer par une vraie image. */
function PH(label, w, h) {
  w = w || 800; h = h || 1000;
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">` +
    `<rect width="100%" height="100%" fill="#d8d6d2"/>` +
    `<rect x="1" y="1" width="${w - 2}" height="${h - 2}" fill="none" stroke="#b3aea7" stroke-width="2" stroke-dasharray="10 8"/>` +
    `<text x="50%" y="50%" fill="#7d756d" font-family="Inter, sans-serif" font-size="${Math.round(Math.min(w, h) / 16)}" ` +
    `text-anchor="middle" dominant-baseline="middle">${label}</text></svg>`;
  return "data:image/svg+xml;utf8," + encodeURIComponent(svg);
}

window.SG_DATA = {

  // ---- Artiste --------------------------------------------------------------
  artist: {
    first: "Prénom",
    family: "Nom",
    years: "0000–0000",

    bio: [
      "Premier paragraphe de biographie. Le nom complet « Prénom Nom (0000–0000) » sera automatiquement mis en gras dans ce paragraphe d'ouverture. Voix éditoriale, troisième personne, ton de notice de catalogue — jamais de copy marketing. Faits historiques précis plutôt qu'adjectifs.",

      "Deuxième paragraphe. Décrire le langage visuel, les sujets, les lieux. Mettre les titres d'œuvres en *italique* via les astérisques.",

      "Troisième paragraphe. Reconnaissance, collections institutionnelles, rétrospectives. Garder 3 à 4 paragraphes maximum."
    ],

    portrait: PH("PORTRAIT", 800, 1000),
    portrait_caption: ""   // laisser vide — pas de légende sous le portrait
  },

  // ---- Couverture -----------------------------------------------------------
  cover: {
    image: PH("COUVERTURE — détail plein cadre", 1240, 1754),
    skin: "Nom de peau / langue (optionnel)",   // petit sus-titre au-dessus du lockup
    title: "Titre de l'œuvre · Année"
  },

  // ---- Citation -------------------------------------------------------------
  quotes: [
    {
      text: "Citation de l'artiste, centrée verticalement, sur page pleine couleur d'accent. Mesurée, personnelle, jamais promotionnelle.",
      attr_first: "Prénom",
      attr_last: "Nom"
    }
  ],

  // ---- Provenance générale (fallback si l'œuvre n'en a pas) -----------------
  general_provenance: [
    "Source de l'œuvre (ex. The Estate of …)",
    "<strong>Galerie</strong>, Ville"
  ],

  // ---- Note / Legacy (page infos optionnelle) — mettre null si non utilisée -
  note: {
    title: "Titre de la note",
    blocks: [
      { sub: "Sous-titre de section" },
      { text: "Paragraphe justifié. *Italique* pour les titres, [[gras]] pour mettre un terme en gras." },
      { sub: "Autre sous-titre" },
      { text: "Paragraphe suivant." }
    ]
  },

  // ---- Page de fin ----------------------------------------------------------
  end: {
    disclaimer: "The artworks presented in this presentation are not owned by L'Appartement – Gallery & Advisory. The gallery does not hold exclusivity over them; this selection of artworks is sourced from a third party, including private collections and other professional art entities.",
    footnote: ""   // laisser vide sauf demande
  },

  // ---- Œuvre(s) -------------------------------------------------------------
  works: {
    W01: {
      title: "Titre de l'œuvre",
      year: "Année",
      medium: "Medium (ex. Synthetic polymer paint on linen)",

      // Dimensions : cm d'abord, pouces en dessous, chacun sur sa ligne,
      // sans parenthèses, sans préfixe « Canvas: ».
      canvas_cm: "000 × 000 cm",
      canvas_in: "00 × 00 in",
      dims_cm: null,
      dims_in: null,
      orientation_note: "",          // laisser vide sauf demande explicite

      price: "Price upon request",   // ou "$00,000 USD" → formaté « 00'000 USD »
      real_cm: 150,                  // plus grande dimension réelle en cm (échelle proportionnelle)

      image: PH("ŒUVRE", 1100, 740),

      // Détail / close-up — image fournie, plein cadre, pas de zoom synthétique
      detail: {
        image: PH("DÉTAIL — plein cadre", 1240, 1754),
        caption: null
      },

      // Vue in situ — image centrée + légende italique dessous (jamais full-bleed)
      view: {
        image: PH("VUE IN SITU", 1240, 900),
        caption: "*Titre de l'œuvre*, Année, vue in situ."
      },
      view2: null,   // deuxième vue optionnelle — même format que view

      provenance: [
        "Source de l'œuvre",
        "<strong>Galerie</strong>, Ville",
        "Collection privée (acquise auprès de ce qui précède)"
      ],

      references: [
        "Code d'inventaire : 000",
        "&copy; The Estate of the Artist, 0000"
      ],

      exhibitions: null,   // ex. ["<strong>Institution</strong>, Ville, Titre, Année"]
      literature: null     // ex. ["Auteur, *Titre*, Éditeur, Année, p. 00"]
    }
  }
};
