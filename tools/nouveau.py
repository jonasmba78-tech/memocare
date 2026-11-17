#!/usr/bin/env python3
"""Ajoute une nouveauté (badge « NOUVEAU » pendant 14 jours) dans js/data/nouveautes.js, avec la date du jour.
Usage :  python tools/nouveau.py MODULE SECTION "Titre" "😀" [action]
Exemples : python tools/nouveau.py 2 corps "Corps 3D : nouveaux organes" "🫀"
           python tools/nouveau.py 23 "" "Nouveau module : Santé" "🏥"        (tout un module)
           python tools/nouveau.py 0 "" "Nouvelle fonction" "✨"               (fonctionnalité hors module)
Puis reconstruire :  python tools/build.py"""
import sys, pathlib, datetime
if len(sys.argv) < 5:
    sys.exit(__doc__)
mod, sec, titre, ico = sys.argv[1:5]
act = sys.argv[5] if len(sys.argv) > 5 else ''
p = pathlib.Path(__file__).resolve().parent.parent / 'js' / 'data' / 'nouveautes.js'
s = p.read_text(encoding='utf-8')
if '/* @FIN */' not in s:
    sys.exit('Marqueur /* @FIN */ introuvable dans nouveautes.js')
q = lambda x: x.replace('\\', '\\\\').replace("'", '’')
ligne = f"['{datetime.date.today().isoformat()}',{int(mod)},'{q(sec)}','{q(titre)}','{ico}','{act}']"
s = s.replace('\n/* @FIN */', ',\n' + ligne + '\n/* @FIN */', 1)
p.write_text(s, encoding='utf-8')
print('✓ ajouté :', ligne, '\n  → visible 14 jours. Pensez à : python tools/build.py')
