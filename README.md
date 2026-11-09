# MémoCare — guide complet

MémoCare est une application d’apprentissage mobile (sans serveur) pour les **auxiliaires de vie, auxiliaires de puériculture, éducateurs spécialisés et métiers du domicile**. Elle propose trois cours :

| Cours | Modules | Contenu |
|---|---|---|
| **English for Care** | 1 · Saluer, 2 · Corps & soins, 3 · Routines | anglais professionnel : BD/dialogues, vocabulaire, équipe, métiers, matériel, corps 3D, routines, grammaire, quiz |
| **Psychologie de l'enfant** | 4 · Découvrir l'enfant, 5 · Le développement, 6 · De 0 à 3 ans, 7 · De 3 à 12 ans, 8 · L'adolescent, 9 · Émotions & attachement, 10 · Famille & culture, 11 · Observer & alerter | pyramide de Maslow, frise 0-3 ans, fiches « Comprendre », cas réels, précautions, mini-jeux, quiz, bilans |
| **Sémiologie** (Dr J. Etoung) | Intro · I AVS · II Auxiliaire de puériculture · III Cuisinier à domicile · IV Agent de ménage et linge · V Éducateur spécialisé · VI Employé familial · VII Méthodologie d'observation | chaque grand titre du support = un chapitre ; fiches de signes, « Comprendre », BD, cas pratiques, conduite à tenir, quiz, mini-jeux, bilan ; chapitre VII : grille Qui/Quoi/Quand/Où/Comment/Pourquoi avec rapport |

L'application est **100 % côté navigateur** : HTML + CSS + JavaScript, aucun serveur. La progression est enregistrée dans le navigateur (`localStorage`).

---

## 1. Démarrage rapide

1. **Installer une fois** : Python 3 et la bibliothèque Pillow (`pip install pillow`). Node.js est facultatif (il sert seulement à détecter les fautes de frappe).
2. **Modifier** ce que vous voulez (voir §3 à §6).
3. **Reconstruire** :
   ```
   python tools/build.py
   ```
   (sous Windows : `py tools/build.py`)
4. **Résultat** : `dist/memocare.html`, un **fichier unique** autonome (photos incluses) : c'est lui qu'on publie ou qu'on envoie. Et `dist/generateur-codes.html` : le générateur de codes de licence, **privé** (voir §6).

> **Pas envie d'installer Python ?** Pour juste changer des photos, suivez le §2 bis (directement dans l'application).

> Astuce : pour tester sans reconstruire, ouvrez `index.html`. Les changements de **textes** et de **code** sont visibles tout de suite ; les changements de **photos** demandent `python tools/build.py`.

Le script affiche `✓ syntaxe JavaScript correcte` si tout va bien. En cas d'erreur, il indique le fichier fautif (le plus souvent une virgule, une apostrophe ou un guillemet oublié dans un texte).

---

## 2. Arborescence

```
MémoCare/
├─ config/photos.txt        ← QUELLE PHOTO / QUEL EMOJI s'affiche (à éditer)
├─ config/licence.js        ← clé secrète, durées proposées, anciens codes (à éditer)
├─ Images/                  ← vos photos (nom clair : medecin.jpeg, canne.jpeg…)
├─ index.html               ← squelette de la page + ordre de chargement des scripts
├─ css/theme.css            ← couleurs, mode sombre, polices
├─ css/app.css              ← mise en forme de tous les composants
├─ css/ios.css              ← correctifs iPhone/iPad uniquement (bloc @supports iOS, sans effet ailleurs)
├─ js/data/                 ← LES CONTENUS (textes des cours) — à éditer
│   ├─ textes.js            ← textes de l'interface (titre, sous-titre, pied de page, écran payant)
│   ├─ en-modules-dialogues.js   modules 1-3 : MO (titres, résumés) + CB (BD / dialogues)
│   ├─ en-cards.js          cartes : vocabulaire, équipe, politesse, verbes, matériel, corps, moments
│   ├─ psy-modules.js       cours 2 : liste des cours, modules payants, modules 4-6, BD v1
│   ├─ psy-dialogues-v2.js  BD des modules 4-6 (version finale)
│   ├─ psy-explanations.js  fiches « Comprendre » + bilans (modules 4-11)
│   ├─ psy-precautions-games.js  précautions, cas réels, vrai/faux, associer, ordre, classer
│   ├─ quizzes.js           questions de quiz de tous les modules
│   ├─ sem-intro.js, sem-metiers-1.js, sem-metiers-2.js   COURS 3 Sémiologie : un objet SEMD[n] par chapitre (modules 12 à 19)
│   ├─ banners.js           bannières de photos sous les onglets (MO[n].ph)
│   └─ images-default.js    GÉNÉRÉ automatiquement — ne pas modifier à la main
├─ js/views/                ← un fichier par écran (logique d'affichage) ; sem-core.js construit le cours 3 à partir de SEMD
├─ js/core/                 ← moteur : rendu, progression, licence (`licence-core.js` = calcul des codes), images, événements
├─ js/main.js               ← démarrage
└─ tools/
    ├─ build.py             ← reconstruit tout (images + fichier unique + vérification)
    ├─ build_images.py      ← lit config/photos.txt et fabrique images-default.js
    ├─ generateur-codes.html ← modèle du générateur de codes (devient dist/generateur-codes.html)
    └─ chercher.py          ← retrouve où un texte / emoji est utilisé dans le code
```

**Règle d'or** : `js/data/` contient des **données** (textes, listes) ; `js/views/` et `js/core/` contiennent la **logique**. Pour changer un contenu, on n'a presque jamais besoin d'ouvrir `views/` ni `core/`.

---

## 2 bis. Remplacer une image ou un emoji — SANS Python (le plus simple)

C'est la méthode à utiliser si vous voulez juste **changer une photo** ou **mettre une photo à la place d'un emoji**, sans installer quoi que ce soit.

### Pas à pas (sur ordinateur ou téléphone)
1. **Ouvrez l'application** (`memocare.html`) dans le navigateur, puis **ajoutez `#editeur` à la fin de l'adresse** et validez.
   Exemple : `…/memocare.html#editeur`
2. **Descendez tout en bas** de la page. Trois boutons sont apparus : « 🖼️ Mode éditeur d'images », « ⬇ Exporter les images », « ↺ Réinitialiser mes images ».
3. Touchez **« 🖼️ Mode éditeur d'images »**. Le bouton devient « ✅ Touche une image à remplacer » et tout ce qui peut être changé (emojis **et** photos) est entouré d'un **contour jaune en pointillés**.
4. Allez sur l'écran voulu (équipe, matériel, pyramide, frise…) et **touchez l'emoji ou la photo à changer**.
5. Le navigateur ouvre le choix de fichier : **choisissez votre photo** (galerie du téléphone ou dossier de l'ordinateur).
6. C'est fait : la photo remplace l'ancienne image ou l'emoji, **partout où il apparaît**. Recommencez pour d'autres images.
7. Touchez à nouveau le bouton du bas pour quitter le mode éditeur.

Une photo remplace aussi bien **une autre photo** qu'**un emoji** : c'est exactement la même manipulation.

### Revenir en arrière
Touchez **« ↺ Réinitialiser mes images »** (en bas de page, en mode `#editeur`) : toutes vos photos choisies sont supprimées et on retrouve les images d'origine.

### Garder ou partager vos changements
- Vos remplacements sont enregistrés **dans ce navigateur, sur cet appareil seulement**. Si vous changez d'appareil ou videz les données du site, ils disparaissent.
- Pour les **sauvegarder** : touchez **« ⬇ Exporter les images »**. Un fichier **`images.json`** est téléchargé.
- Pour les **retrouver ou les donner à tous les élèves** : placez `images.json` **dans le même dossier que `memocare.html`** sur votre site ou votre serveur (WampServer, hébergement…). L'application le lit automatiquement. ⚠ Cela fonctionne quand l'application est ouverte via une adresse web (`http://` ou `https://`), pas toujours en double-cliquant sur le fichier sur l'ordinateur.

### Remplacer un emoji par un autre emoji (sans Python)
1. Ouvrez le dossier du projet avec un éditeur de texte (Bloc-notes, VS Code…).
2. Utilisez **« Rechercher dans les fichiers »** (dans VS Code : Ctrl+Maj+F) et collez l'emoji à changer.
3. Dans le fichier trouvé (dans `js/data/` ou `js/views/`), **remplacez l'emoji par le nouveau**, puis enregistrez.
4. Ouvrez **`index.html`** pour voir le résultat.
Le changement ne touche que cet endroit du code ; pour le fichier unique `dist/memocare.html`, il faudra ensuite lancer `python tools/build.py` (voir §1).

### Limites de cette méthode
- Les photos choisies dans l'application sont réduites automatiquement (320 px) : suffisant pour les cartes, un peu moins net en grand fond de frise. Pour une qualité maximale, utilisez `config/photos.txt` (§3).
- Un emoji = une photo partout où il apparaît (voir §3, « un emoji = une photo partout »).

---

## 3. Remplacer une photo ou un emoji avec `config/photos.txt` (qualité maximale, avec Python)

Tout se passe dans **`config/photos.txt`**. Une ligne = un emoji de l'application :

```
🩺 = medecin.jpeg        → l'emoji 🩺 devient la photo Images/medecin.jpeg
🧩 = 🧠                  → l'emoji 🧩 devient l'emoji 🧠
🩺 =                     → (vide) ou ligne supprimée : on revoit l'emoji d'origine
```

### Changer une photo existante
1. Déposez votre nouvelle photo dans `Images/` (ex. `nouveau-medecin.jpg`).
2. Dans `config/photos.txt`, changez la ligne : `🩺 = nouveau-medecin.jpg`.
3. `python tools/build.py`.

### Mettre une photo à la place d'un emoji
1. Trouvez l'emoji : `python tools/chercher.py "Nurse"` montre la ligne du code, avec l'emoji devant le mot.
2. Copiez-collez cet emoji dans `config/photos.txt` : `💊 = pilulier.jpg`.
3. `python tools/build.py`.

### Remplacer un emoji par un autre emoji
Même principe : `🧩 = 🧠`. Cela ne change pas le code : l'emoji est substitué à l'affichage.

### Réglages (en haut de `photos.txt`)
- `@taille = 480` : taille maximale d'une photo en pixels (plus grand = plus net mais fichier plus lourd).
- `@qualite = 76` : qualité JPEG (1 à 95).

### Où une photo / un emoji est-il pris en compte ?
Le remplacement agit sur : les **cartes** (équipe, matériel, vocabulaire, politesse), les **métiers**, les **niveaux de la pyramide**, la **frise 0-3 ans**, les personnages et pastilles des BD, les en-têtes de fiches « Comprendre ».
Il n'agit **pas** sur les emojis écrits au milieu d'une phrase.

### Comment la photo est affichée
- **Carte** : la photo remplit toute la carte, le mot en bas sur un dégradé sombre.
- **Frise** : photo plein panneau, texte dans un bandeau lisible.
- **Pyramide** : bande de photo teintée de la couleur du niveau.
- **Métiers** : photo en fond de la ligne.
Ces styles se trouvent à la fin de `css/app.css` (section « photos en fond de section »).

### Attention : un emoji = une photo partout
Si le même emoji sert à deux endroits (par ex. 🤝🏾 « Nice to meet you » et le niveau « Appartenance »), la photo apparaîtra aux deux. Pour séparer :
1. `python tools/chercher.py 🤝🏾` liste tous les endroits.
2. Dans le fichier concerné, changez l'emoji de l'un des deux (un emoji que personne n'utilise).
3. Associez la photo à ce nouvel emoji dans `photos.txt`.

C'est ce qui a été fait pour « Care assistant » (🧑🏾‍🦳), « Childcare assistant » (👩🏾‍🍼), « Special educator » (👨🏾‍🏫) et « Nurse » (👨🏾‍⚕️).

### Rappel : la méthode dans l'application (sans Python)
1. Ouvrez l'application avec `#editeur` à la fin de l'adresse (ex. `memocare.html#editeur`).
2. En bas de page : **🖼️ Mode éditeur d'images**, puis touchez l'image (bordure pointillée jaune) à remplacer et choisissez une photo.
3. **⬇ Exporter les images** télécharge un `images.json` (sauvegarde). Placé à côté de `memocare.html`, il est rechargé automatiquement.
4. **↺ Réinitialiser mes images** supprime vos remplacements faits dans l'application.

⚠ Ces remplacements sont mémorisés **dans ce navigateur** et **passent avant** `photos.txt`. Si vous modifiez `photos.txt` et que rien ne change, cliquez sur « Réinitialiser mes images ».

---

## 4. Modifier les textes de l'interface

Fichier **`js/data/textes.js`** :

```js
const TXT={
 titre:'MémoCare',
 sousTitre:'Cours pour auxiliaires de vie, …',
 versionGratuite:'Version gratuite · modules 1 et 2 de chaque cours',
 verrouTitre:'Module payant',
 verrouTexte:'Les modules 1 et 2 de chaque cours sont gratuits. …',
 piedDePage:'Contenus tirés des cours de la formation. …'
};
```

Modifiez seulement le texte entre les apostrophes. Pour écrire une apostrophe dans un texte, utilisez `’` (apostrophe typographique) ou `\'`.

---

## 5. Où modifier quoi (textes des cours)

**Astuce n°1** : `python tools/chercher.py "un bout du texte"` donne directement le fichier et la ligne.

| Ce que vous voyez à l'écran | Fichier | Variable |
|---|---|---|
| Titre d'un module, noms des sections, histoire d'introduction | `en-modules-dialogues.js`, `psy-modules.js`, `psy-explanations.js` | `MO[n]` |
| Bulles de BD / dialogues (modules 1-3) | `en-modules-dialogues.js` | `CB[1..3]` |
| BD des modules 4-6 | `psy-dialogues-v2.js` | `CB[4..6]` |
| Cartes de vocabulaire | `en-cards.js` | `L3`, `J1`, `J2`, `J3`, `VERB`, `EQ`, `POL`, `TEAM` |
| Parties du corps | `en-cards.js` | `FR` |
| Moments de la journée (Good morning…) | `en-cards.js` | `ST` |
| Routines illustrées, grammaire | `views/routines-grammar.js` | `RT`, `GV`, `GS` |
| Fiches métiers, bilans modules 1-3 | `views/metiers-bilan.js` | `ME`, `ES` |
| Pyramide de Maslow (niveaux) | `views/pyramid-frise.js` | `PY` |
| Pyramide : explications détaillées | `views/pyramid-detail.js` | `PYX` |
| Frise 0-3 ans | `views/pyramid-frise.js` | `FR2` |
| Objectifs du parcours | `views/plan.js` | `OBJ` |
| Fiches « Comprendre » | `psy-explanations.js` | `EX[n]` |
| Bilans modules 7-11 | `psy-explanations.js` | `ES[n]` |
| Précautions | `psy-precautions-games.js` | `PRE[n]` |
| Cas réels | `psy-precautions-games.js` | `CAS[n]` |
| Vrai / faux · Associe · Ordre · Classe | `psy-precautions-games.js` | `VF`, `MT`, `OR`, `CL` |
| Questions de quiz | `quizzes.js` (+ ajouts dans `views/understanding-games.js`) | `QZ[n]` |

### Formats des données

**Cartes** (`L3`, `J1`…, `TEAM`, `POL`, `VERB`, `EQ`) : une chaîne par carte, champs séparés par `|`
```
"🩺|Doctor|Médecin|Consulte, diagnostique, prescrit"
  emoji | anglais | français | complément (exemple ou explication)
```
Le 4ᵉ champ est facultatif. Pour **ajouter** une carte, ajoutez une chaîne dans la liste (sans oublier la virgule). Pour **supprimer**, retirez la chaîne et sa virgule.

**BD / dialogues** (`CB`) : chaque scène a un titre `t`, des personnages `c` et des répliques `p`.
```js
{t:"A · Accueil à l’hôpital",
 c:[["🧑🏾‍⚕️","Mary"],["👴🏾","Mr. Njoya"]],          // personnages : [emoji, nom]
 p:[[0,"Good morning…","Bonjour…","👋🏾"], …]}         // [numéro du personnage (0 = premier), anglais, français, emoji]
```
Cours de psychologie : `[numéro, texte, étiquette, emoji]` (le 3ᵉ champ est le titre de la bulle, par ex. « Besoins physiques »).

**Quiz** : `Q('Type','Question ?',['choix 0','choix 1','choix 2'], numéroBonneRéponse, 'explication')`. La numérotation commence à **0** (`1` = deuxième choix).

**Fiches « Comprendre »** : `E('Titre','🧠',{d:'Définition', m:'Comment ça se manifeste', e:'Exemple concret', o:'Ce qu’on observe', p:['précaution 1','précaution 2'], r:'Risques si on se trompe', c:'À ne pas confondre'})`. Tous les champs sont facultatifs ; seuls ceux renseignés s'affichent. `p` est une liste.

**Précautions** (`PRE`) : `['emoji','Titre','Explication']`.

**Vrai / faux** (`VF`) : `['Affirmation',1,'Explication']` — `1` = vrai, `0` = faux.

**Associer** (`MT`) : `['Mot','Définition']`.

**Ordre** (`OR`) : `['Consigne',['étape 1','étape 2','…']]` dans le bon ordre.

**Classer** (`CL`) : `{t:'Titre', c:['catégorie 0','catégorie 1'], i:[['élément',numéroCatégorie,'explication'], …]}`.

**Cas réels** (`CAS`) : `['Titre','emoji','Mention (cas illustratif…)','Situation','Question',['analyse 1','analyse 2'],['que faire 1','que faire 2'],'Leçon à retenir']`.

### Règles pour ne rien casser
- Gardez les **guillemets / apostrophes** qui entourent chaque texte ; ne les supprimez pas.
- Un texte entre `"…"` peut contenir `’` ; un texte entre `'…'` ne doit pas contenir de `'` simple (utilisez `’`).
- Gardez les **virgules** entre éléments d'une liste, et pas de virgule en trop avant `]`.
- Le texte peut contenir `<b>mot</b>` pour mettre en gras.
- Après chaque modification : `python tools/build.py` ; si le message est `✓ syntaxe JavaScript correcte`, tout est bon.
- Faites une copie du dossier avant un gros changement.

---

## 6. Modules gratuits / payants et licence (codes datés)

### Gratuit / payant
- **Gratuits** : modules 1, 2 (English for Care), 4, 5 (Psychologie) et 12, 13 (Sémiologie : Introduction et chapitre I). **Payants** : 3, 6, 7, 8, 9, 10, 11 et 14 à 19.
- La liste des modules payants est `PAID` dans `js/data/psy-modules.js` (complétée dans `js/views/understanding-games.js`). Pour rendre un module gratuit, retirez son numéro.

### Comment fonctionne un code
Un code ressemble à `CARE-0FB5-XNE-3H6`. Il est calculé à partir de **quatre choses** :
1. le **nom complet** de l'élève (accents, majuscules et espaces sans importance) ;
2. le **jour de début** de la licence ;
3. la **durée** en mois ;
4. la **clé secrète** (`config/licence.js`).

Conséquences :
- **Le même nom n'a jamais le même code d'un mois à l'autre** (ni d'un jour à l'autre, ni pour une durée différente).
- Le code **s'arrête tout seul** à la fin de la durée : l'élève retrouve la version gratuite et un message « Ta licence a expiré le … ».
- Un code **ne marche qu'avec le nom** pour lequel il a été fait.
- Un code ne peut pas être activé **avant** sa date de début (« Ce code sera actif à partir du … ») ni **après** sa fin (« Ce code a expiré le … »).
- Pour renouveler : générez un **nouveau code** (nouveau début) et l'élève le saisit à la place de l'ancien.
- Les 7 derniers jours (réglable), l'écran d'accueil affiche « ⚠ expire dans N j ».

### Générer des codes (sans écrire de code)
1. Lancez `python tools/build.py` : cela crée **`dist/generateur-codes.html`** (⚠ **privé**, ne le publiez jamais : il contient la clé).
2. Ouvrez ce fichier dans votre navigateur (double-clic).
3. Écrivez **un nom par ligne**, choisissez la **date de début** (par défaut aujourd'hui) et la **durée** (1, 3, 6, 12 mois ou « Autre durée… »).
4. Cliquez **Générer les codes**. Chaque ligne affiche le code et sa période, par exemple « valable du 07/11/2026 au 06/12/2026 ».
5. **📋 Copier la liste** pour l'envoyer à l'élève (par message, après paiement).

L'élève ouvre un module payant, écrit son **nom exactement comme donné au paiement** et colle le code.

### Réglages : `config/licence.js`
| Réglage | Rôle |
|---|---|
| `cle` | clé secrète. **La changer invalide tous les codes déjà vendus.** |
| `durees` | durées proposées dans le générateur, en mois (ex. `[1,3,6,12]`) |
| `avertirJours` | nombre de jours avant la fin à partir duquel l'élève est prévenu |
| `anciensCodes` | `true` = accepter aussi les anciens codes `CARE-XXX-XXX` (sans date, valables sans limite) ; `false` = seulement les nouveaux |
| `epoque` | date de référence des codes — **ne pas modifier** |

Après modification : `python tools/build.py` (le générateur et l'application utilisent le même fichier de réglages, ils restent donc toujours d'accord).

Les messages affichés à l'élève (licence valable jusqu'au…, code expiré, etc.) se modifient dans `js/data/textes.js`.

### Limites à connaître
- La vérification se fait **dans le navigateur** (pas de serveur) : elle décourage le partage occasionnel mais **ne remplace pas une vraie vérification côté serveur**. Quelqu'un qui lit le code de l'application peut retrouver la clé.
- L'application mémorise le **jour le plus récent** où elle a été ouverte : remettre l'horloge du téléphone en arrière ne prolonge donc pas la licence. Inversement, si l'horloge a été mise par erreur très loin dans le futur, la licence paraîtra expirée jusqu'à ce que l'élève vide les données du site et saisisse à nouveau son code.
- Les durées sont en mois calendaires (1 mois à partir du 31 janvier = jusqu'au 27 ou 28 février).

---

## 7. Comment fonctionne l'application (pour aller plus loin)

- **Rendu** : `R()` (dans `js/core/state-views.js`) affiche la section courante en appelant `V[section]()` et écrit le résultat dans `#v`.
- **Navigation** : `mod` (module courant) et `sec` (section courante) sont mémorisés dans `localStorage` (clé `mc`) avec la progression `P`.
- **Progression** : `mk('module:section')` valide une étape ; `upd()` met à jour la barre et le bouton « Continuer ».
- **Images** : après chaque rendu, `imgify()` (`js/core/images-editor.js`) remplace les emojis connus par leurs photos ou leurs emojis de remplacement. Les photos intégrées viennent de `images-default.js` (généré), puis les remplacements faits dans l'application (`localStorage` clé `mcimg`) passent par-dessus.
- **Ordre de chargement** : les scripts partagent la portée globale ; l'ordre dans `index.html` compte. Certains fichiers « v2 » complètent ou remplacent des définitions précédentes (`upd`, `V.plan`, `CB[4-6]`, ordre des sections dans `views/understanding-games.js`). Ne changez pas l'ordre des `<script>` sans raison.
- **Corps 3D** : `views/body3d.js`, bibliothèque Three.js chargée depuis cdnjs (connexion nécessaire pour cet écran lors de la première ouverture).
- **Synthèse vocale** : `sp()` dans `helpers.js` (voix anglaise pour les modules 1-3, française au-delà).
- **Couleurs et thème sombre** : variables dans `css/theme.css`.

---

## 8. Dépannage

| Problème | Cause probable | Solution |
|---|---|---|
| `✗ Pillow manque` | Pillow non installé | `pip install pillow` |
| `✗ photo introuvable : Images/xxx` | nom de fichier faux dans `photos.txt` | vérifiez le nom exact (majuscules, extension) |
| `⚠ l'emoji … n'apparaît nulle part` | emoji mal copié | copiez-le depuis `python tools/chercher.py …` |
| L'écran est blanc après une modification | faute de frappe dans un fichier de `js/data/` | lancez `python tools/build.py` : le fichier et la ligne fautifs sont indiqués (Node.js requis) |
| La photo ne change pas | remplacement fait dans l'application (`mcimg`) | bouton **↺ Réinitialiser mes images**, ou vider les données du site |
| Une photo apparaît à un endroit non voulu | même emoji utilisé ailleurs | voir §3 « un emoji = une photo partout » |
| Les changements de texte n'apparaissent pas dans `memocare.html` | il faut reconstruire | `python tools/build.py` |

---

## 9. Idées d'évolution

Révision espacée des cartes, questions avant lecture, mini-quiz de fin de section, mode « explique avec tes mots », fusion des fichiers « v2 » en doublon, ajout d'un manifeste PWA (installation sur l'écran d'accueil et cache hors ligne complet).


---

## 10. Cours 3 « Sémiologie » : comment modifier un chapitre

Chaque chapitre est **un seul objet** `SEMD[n]` dans `js/data/sem-*.js` (12 = Introduction, 13 à 18 = chapitres I à VI, 19 = chapitre VII). Le support de cours numérote deux fois « VI » ; l'application numérote la méthodologie « VII ».
- `g` : groupes de signes. Chaque signe s'écrit `'emoji|nom|détail du cours|ce que cela peut révéler'` ; il alimente **à la fois** les Fiches (cartes) et « Comprendre ».
- `ori` : cartes « Vers qui orienter ? » (photos de l'équipe). `pre` : la **Conduite à tenir** du cours. `cb` : BD. `cas` : cas pratiques. `qz`, `vf`, `mt`, `or`, `cl` : quiz et mini-jeux. `es` : bilan. `ph` : bannière de photos.
- Les cas, scènes de BD et le « ce que cela peut révéler » sont des **compléments pédagogiques** (cas illustratifs), pas du texte du support.
- Pour changer une photo d'un signe, changez son emoji (ou l'association dans `config/photos.txt`), puis `python tools/build.py`.

## 11. Photos : règles d'association

Les 31 photos de `Images/` sont toutes utilisées (voir `config/photos.txt`). Les étapes de l'enfance (cours 2) ont chacune leur photo : 👶🏽 Nouveau-né, 🥰 Nourrisson, 🧒🏽 Jeune enfant, 🎒 Âge scolaire, 🛹 Adolescent ; ♿ Handicap et 🧳 Déplacé/réfugié. Une photo utilisée par plusieurs emojis n'est stockée qu'une fois dans le fichier généré.

## 12. Visite guidée

`js/views/tour.js` : 8 étapes (progression, « Continuer », cours, modules, résumé, sections, contenu). Elle s'ouvre à la première utilisation (mémorisée dans `localStorage`, clé `mctour`) et se relance avec le bouton « ❓ Visite guidée » de l'en-tête. Les textes sont dans le tableau `TOUR` en haut du fichier.
