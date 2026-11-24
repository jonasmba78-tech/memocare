/* === DONNÉES · NOUVEAUTÉS : les badges « NOUVEAU » (visibles 14 jours après la date indiquée) ===
   Une ligne = une nouveauté :   ['AAAA-MM-JJ', module, 'section', 'Titre affiché', '😀', 'action']
   • date      : jour où la nouveauté a été ajoutée. Le badge s’affiche ce jour-là puis pendant 13 jours (14 jours en tout), puis disparaît tout seul.
   • module    : numéro du module concerné (voir MO[n]) ; 0 pour une fonctionnalité qui ne concerne pas un module.
                 → le badge apparaît sur l’onglet du module ET sur l’onglet du cours qui le contient.
   • section   : clé de l’onglet concerné dans ce module (corps, fiche, exo, jeux2, img, bd, mots, jeux, esprit…) ou '' pour tout le module.
                 → le badge apparaît aussi sur cet onglet (et sur sa carte dans « Parcours »).
   • action    : '' (ouvre le module / la section) ou 'voix' (ouvre le test des voix).
   AJOUTER UNE NOUVEAUTÉ :  python tools/nouveau.py 2 corps "Titre" "🫀"   (la date du jour est ajoutée toute seule)
   ou copier une ligne ci-dessous. Les lignes plus vieilles que 14 jours peuvent rester : elles ne s’affichent plus. */
const NOUV=[
['2026-11-15',2,'corps','Corps 3D : extérieur, intérieur et zooms','🫀',''],
['2026-11-15',2,'fiche','Cours en bref pour le module Corps & soins','📘',''],
['2026-11-15',2,'exo','Exercices corrigés qui expliquent le cours','✍🏾',''],
['2026-11-15',2,'jeux2','Mini-jeux sur le corps humain','🎮',''],
['2026-11-15',20,'','Nouveau module : AVQ (suite) avec photos','🌅',''],
['2026-11-15',21,'','Nouveau module : Familles & collègues','👪',''],
['2026-11-15',22,'','Nouveau module : Nourriture & régimes','🍚',''],
['2026-11-17',0,'','Voix corrigées : l’anglais en anglais, le français en français (test des voix en bas de page)','🔊','voix'],
['2026-11-17',0,'','Badges « Nouveau » pendant 2 semaines','🆕',''],
['2026-11-17',23,'','Nouveau cours : Équipements, logement et entretien (8 chapitres)','🏠','']
/* @FIN */];
