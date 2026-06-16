# web-template — présentation L'Advisory sans build (HTML + React)

Surface "ouvrir → Imprimer → PDF" pour non-designers, partageant le MÊME design
system que le pipeline Python (`presentation.css`). Dossier autonome.

## Deux façons de l'utiliser
- **Template-standalone.html** — UN seul fichier, marche au DOUBLE-CLIC
  (tout est embarqué). Le plus simple pour prévisualiser / envoyer.
- **Template.html** — version modulaire (charge `components.jsx` + données
  séparément). À prévisualiser via l'extension **Live Server** de VS Code
  (le chargement externe ne marche pas en double-clic `file://`).

## Contenu
- `Template-standalone.html`  fichier unique autonome (double-clic)
- `Template.html`             gabarit modulaire
- `components.jsx`            composants partagés (rendent chaque page)
- `presentation.css`          design system (style verrouillé)
- `data-template.js`          données vierges commentées — à copier par artiste
- `fonts/`, `assets/logos/`, `images/`

## Pour une présentation
1. Copier `data-template.js` → `data-<artiste>.js`, remplir les valeurs.
2. Images dans `images/` (ou ajuster les chemins).
3. Modulaire : pointer `<script src="data-template.js">` de `Template.html`
   vers ton fichier. Autonome : éditer le bloc de données dans le HTML.
4. Imprimer → Enregistrer en PDF.

Règles de mise en page : voir `CLAUDE.md` à la racine du repo.
