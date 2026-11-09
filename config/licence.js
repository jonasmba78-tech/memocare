/* === RÉGLAGES DE LA LICENCE (mode payant) ===
   Ce fichier est lu par l'application ET par le générateur de codes (dist/generateur-codes.html).
   Après modification :  python tools/build.py                                                     */
const LICENCE={
 // CLÉ SECRÈTE : sert à calculer les codes. La changer INVALIDE tous les codes déjà vendus.
 cle:'MC1-2026',
 // Les durées proposées dans le générateur de codes, en MOIS.
 durees:[1,3,6,12],
 // Prévenir l'élève quand il reste N jours ou moins avant la fin de sa licence.
 avertirJours:7,
 // true = accepter aussi les anciens codes « CARE-XXX-XXX » (sans date, valables sans limite).
 // false = seuls les nouveaux codes datés sont acceptés.
 anciensCodes:false,
 // NE PAS MODIFIER : date de référence des codes. La changer casse tous les codes.
 epoque:'2026-01-01'
};
