# Brief Template — Nouvelle présentation L'Advisory

Copie ce fichier à chaque nouvelle présentation, remplis les champs entre
crochets `[…]`, puis colle-le dans Claude Design avec le zip de la
présentation en pièce jointe.

---

## Procédure avant de remplir

### 1. Prépare ton zip de présentation

Le zip doit contenir :
- `config.yaml` (variables de la présentation)
- `assets/` : cover, work-main, work-closeup, artist-portrait (et plus
  si multi-œuvres)
- `content/` : biography.txt, quote.txt, provenance.txt, exhibitions.txt
  (optionnel), literature.txt (optionnel), notes-on-work.txt (optionnel)

### 2. Détermine la cover logo color (CRITIQUE)

Avant de coller le brief, regarde ton image cover. Zoome mentalement
sur **deux zones** :

- **Logo zone** : haut de l'image, au centre (où ira "L'Advisory")
- **Lockup zone** : bas-droite de l'image (où ira "Prénom NOM")

Pose-toi la question pour chaque zone : si je mets du **NOIR pur** ici,
est-ce que ça se lit clairement ?

| Cas | Couleur à utiliser |
| --- | ------------------ |
| Les DEUX zones supportent le noir | `#010101` (la-black) |
| Au moins UNE zone est trop sombre/saturée pour le noir | `#f5f1ea` (la-off-white) |
| Tu hésites | Choisis `#f5f1ea` — l'off-white pardonne plus que le noir |

**Si vraiment aucune des deux couleurs ne marche** → tu dois changer le crop
de la cover, pas chercher un compromis.

### 3. Détermine la couleur d'accent (page citation)

Ouvre l'œuvre principale dans Photoshop ou un color picker. Échantillonne
3-5 couleurs dominantes. Choisis-en une, **désature 15-25%**, vérifie
qu'elle reste subtile (pas saturée). C'est ta `accent.color`.

Pour le `accent.text_color` :
- Accent clair (cream, off-white, beige clair) → texte `#010101`
- Accent sombre → texte `#f5f1ea`

---

## Template de brief à copier-coller dans Claude Design

```
Nouvelle présentation L'Advisory — [Artiste], [Titre œuvre(s)] ([année])

Utilise le design system L'Advisory tel qu'il est défini dans ce projet
(README.md à jour, ui_kits/presentation/ pour la structure React).
Respecte STRICTEMENT les règles d'imagerie et de typographie du README.

PARTICULARITÉS DE CETTE PRÉSENTATION
- [Une seule œuvre / N œuvres dans la même présentation]
- Type d'œuvre : [2D détourer fond blanc / 3D garder fond studio]
- Cadre : [conservé car partie de l'œuvre / sans cadre]
- Prix : [montant + devise / ne pas afficher / Price on request]
- Notes on Work : [oui, fichier fourni / non, omettre cette page]
- Provenance : [détails ou "voir fichiers content/"]

COVER — LOGO + LOCKUP COLOR (décision DÉJÀ prise par le designer)
- Couleur : [#010101 OU #f5f1ea]
- Raison : [bref explicatif - "œuvre claire, noir lisible aux 2 positions"
  OU "œuvre sombre/saturée, off-white nécessaire au top-center"]
- N'applique PAS la décision automatique de luminance — utilise
  EXACTEMENT la couleur ci-dessus.

ACCENT COLOR (page citation uniquement)
- accent.color = [#xxxxxx]
- accent.text_color = [#010101 si fond clair / #f5f1ea si fond sombre]
- Dérivée des tons : [tons dominants identifiés dans l'œuvre]

SÉQUENCE DES N PAGES À PRODUIRE
01. COVER : [œuvre choisie] full-bleed. Logo L'Advisory et "[ARTIST]"
    + "[sous-titre]" en [couleur cover choisie ci-dessus].
02. BIOGRAPHY : lockup "[PRÉNOM] / [NOM]", portrait à gauche, bio
    justifiée à droite en habillage.
03. QUOTE : fond [accent.color], guillemets Ivy Mode, citation,
    signature "— [PRÉNOM NOM]" en bas-droite.

[Pour chaque œuvre, répéter ce cycle :]
0X. ŒUVRE [titre] : mode proportional [ou full-bleed si sculpture],
    fiche commerciale en bas-droite.
0X+1. CLOSE-UP : détail full-bleed.
0X+2. PROVENANCE/EXH/LIT : sections selon disponibilité du contenu.
0X+3. (optionnel) NOTE ON WORK : justified paragraphs.

[Dernière page :]
0N. END : logo L'Advisory beige #cec2ba centré, disclaimer standard.

ÉCHELLE PROPORTIONNELLE (si multi-œuvres)
[Indique les dimensions réelles de chaque œuvre pour que Claude Design
applique la formule proportionnelle. Ex :]
- Œuvre 1 : 200 × 150 cm → dominante
- Œuvre 2 : 30 × 40 cm → réduite, mais pas en timbre-poste
[Si les œuvres font les MÊMES dimensions, précise-le explicitement.]

FICHIERS FOURNIS (zip joint)
- config.yaml avec toutes les variables ci-dessus
- assets/ : [liste]
- content/ : [liste]

Build la présentation complète. Livre-moi le résultat en PDF ou en
HTML preview. Je validerai page par page.
```

---

## Exemples remplis

### Exemple A — Sculpture en pierre claire (Arp, Poupée Borgne)

```
COVER — LOGO + LOCKUP COLOR
- Couleur : #010101 (noir)
- Raison : sculpture brun-clair sur fond gris perle, les deux zones
  supportent largement le noir. Aucun risque à mid-tone.
```

### Exemple B — Peinture rose/noir dramatique (Sillman, FF5)

```
COVER — LOGO + LOCKUP COLOR
- Couleur : #f5f1ea (off-white)
- Raison : peinture aux tons rose poudré saturés avec grandes zones
  noires aux deux positions du logo et du lockup. Le noir disparaît
  dans les masses sombres.
```

### Exemple C — Bronze brillant noir (sculpture moderne sombre)

```
COVER — LOGO + LOCKUP COLOR
- Couleur : #f5f1ea (off-white)
- Raison : bronze patiné foncé sur fond studio sombre. Le noir est
  invisible. Off-white nécessaire.
```

### Exemple D — Tableau cubiste blanc/ocre clair (Picasso 1912)

```
COVER — LOGO + LOCKUP COLOR
- Couleur : #010101 (noir)
- Raison : palette globalement claire (ocres, beiges, blanc cassé),
  les deux zones acceptent le noir sans ambiguïté.
```

---

## Cheat sheet rapide à imprimer

```
┌────────────────────────────────────────────────┐
│  COVER LOGO COLOR — 5 secondes de décision     │
├────────────────────────────────────────────────┤
│                                                │
│  Regarde l'image cover.                        │
│  Zone HAUT-CENTRE (logo) : noir lisible ?  →   │
│  Zone BAS-DROITE (lockup) : noir lisible ?  →  │
│                                                │
│  Les DEUX = oui     → #010101 (la-black)       │
│  Au moins UNE = non → #f5f1ea (la-off-white)   │
│  Vraiment aucune ?  → change le crop !         │
│                                                │
└────────────────────────────────────────────────┘
```
