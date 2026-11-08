#!/usr/bin/env python3
"""Construit l'application :
 1. fabrique js/data/images-default.js à partir de config/photos.txt
 2. assemble index.html + css/ + js/ en UN seul fichier autonome : dist/memocare.html
 3. fabrique dist/generateur-codes.html (générateur de codes de licence, privé)
 4. vérifie la syntaxe JavaScript si Node.js est installé (repère les fautes de frappe dans vos modifications)
Usage : python tools/build.py"""
import re, pathlib, subprocess, shutil, sys, tempfile
root = pathlib.Path(__file__).resolve().parent.parent
subprocess.run([sys.executable, str(root / 'tools' / 'build_images.py')], check=True)
html = (root / 'index.html').read_text(encoding='utf-8')
rd = lambda p: (root / p).read_text(encoding='utf-8')
css = re.findall(r'<link rel="stylesheet" href="([^"]+)">', html)
js = re.findall(r'<script src="((?:js|config)/[^"]+)"></script>', html)
html = re.sub(r'<!-- @CSS -->.*?<!-- /@CSS -->', lambda m: '<style>\n' + '\n'.join(rd(p) for p in css) + '</style>', html, flags=re.S)
html = re.sub(r'<!-- @JS.*?<!-- /@JS -->', lambda m: '<script>\n' + '\n'.join(rd(p) for p in js) + '</script>', html, flags=re.S)
out = root / 'dist' / 'memocare.html'
out.parent.mkdir(exist_ok=True)
out.write_text(html, encoding='utf-8')
print(f'✓ {out} ({out.stat().st_size//1024} Ko)')
# générateur de codes de licence (PRIVÉ : contient la clé secrète)
gen = (root / 'tools' / 'generateur-codes.html').read_text(encoding='utf-8')
core = '<script>\n' + rd('config/licence.js') + '\n' + rd('js/core/licence-core.js') + '</script>'
(root / 'dist' / 'generateur-codes.html').write_text(gen.replace('<!-- @CORE -->', core), encoding='utf-8')
print('✓ dist/generateur-codes.html (PRIVÉ : ne pas publier)')
node = shutil.which('node')
if node:
    bad = 0
    for p in js:
        r = subprocess.run([node, '--check', str(root / p)], capture_output=True, text=True)
        if r.returncode:
            bad += 1; print(f'✗ erreur de syntaxe dans {p} :\n{r.stderr.strip()}')
    print('✓ syntaxe JavaScript correcte' if not bad else f'⚠ {bad} fichier(s) à corriger')
else:
    print('(Node.js absent : vérification de syntaxe ignorée)')
