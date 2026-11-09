#!/usr/bin/env python3
"""Retrouve où un texte ou un emoji est utilisé dans le code.
Exemples :  python tools/chercher.py "Care assistant"
            python tools/chercher.py 🩺
Affiche : fichier, numéro de ligne, extrait. Ouvrez ce fichier et modifiez le texte directement."""
import sys, pathlib
root = pathlib.Path(__file__).resolve().parent.parent
if len(sys.argv) < 2: sys.exit(__doc__)
q = ' '.join(sys.argv[1:]).lower(); n = 0
for f in sorted(list(root.glob('js/**/*.js')) + [root / 'index.html']):
    if f.name == 'images-default.js': continue
    for i, l in enumerate(f.read_text(encoding='utf-8').splitlines(), 1):
        p = l.lower().find(q)
        while p != -1:
            a = max(0, p - 45); print(f'{f.relative_to(root)}:{i}  …{l[a:p+len(q)+45]}…'); n += 1
            p = l.lower().find(q, p + len(q))
print(f'\n{n} occurrence(s)' if n else 'Aucune occurrence.')
