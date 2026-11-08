#!/usr/bin/env python3
"""Lit config/photos.txt et fabrique js/data/images-default.js (photos en base64 + emojis de remplacement).
Utilisation : python tools/build_images.py   (appelé automatiquement par tools/build.py)
Nécessite Pillow :  pip install pillow"""
import re, io, base64, json, pathlib, sys

root = pathlib.Path(__file__).resolve().parent.parent
EXT = ('.jpg', '.jpeg', '.png', '.webp')

def lire_config():
    photos, emojis, reglages = {}, {}, {'taille': 480, 'qualite': 76}
    for n, brut in enumerate((root / 'config' / 'photos.txt').read_text(encoding='utf-8').splitlines(), 1):
        ligne = re.split(r'\s#', brut, maxsplit=1)[0].strip()
        if not ligne or ligne.startswith('#'):
            continue
        if ligne.startswith('@'):
            k, _, v = ligne[1:].partition('=')
            try: reglages[k.strip()] = int(v)
            except ValueError: print(f'⚠ ligne {n} : réglage invalide « {brut.strip()} »')
            continue
        cle, sep, val = ligne.partition('=')
        cle, val = cle.strip(), val.strip()
        if not sep or not cle:
            print(f'⚠ ligne {n} ignorée (format « emoji = photo ») : {brut.strip()}'); continue
        if not val: continue
        if val.lower().endswith(EXT): photos[cle] = val
        else: emojis[cle] = val
    return photos, emojis, reglages

def main():
    try:
        from PIL import Image
    except ImportError:
        sys.exit('✗ Pillow manque. Installez-le :  pip install pillow')
    photos, emojis, reg = lire_config()
    cache, sortie, erreurs = {}, {}, 0
    uniques = []   # chaque photo n'est écrite qu'UNE fois dans le fichier, même si plusieurs emojis l'utilisent
    for cle, f in photos.items():
        chemin = root / 'Images' / f
        if not chemin.exists():
            print(f'✗ photo introuvable : Images/{f}  (emoji {cle})'); erreurs += 1; continue
        if f not in cache:
            im = Image.open(chemin).convert('RGB')
            s = min(1, reg['taille'] / max(im.size))
            im = im.resize((max(1, round(im.width * s)), max(1, round(im.height * s))), Image.LANCZOS)
            b = io.BytesIO(); im.save(b, 'JPEG', quality=reg['qualite'], optimize=True)
            cache[f] = len(uniques)
            uniques.append('data:image/jpeg;base64,' + base64.b64encode(b.getvalue()).decode())
        sortie[cle] = cache[f]
    # vérification : l'emoji existe-t-il dans le code ?
    code = ''.join(p.read_text(encoding='utf-8') for d in ('js/core', 'js/views', 'js/data') for p in (root / d).glob('*.js') if p.name != 'images-default.js') + (root / 'index.html').read_text(encoding='utf-8')
    for cle in list(photos) + list(emojis):
        if cle not in code: print(f'⚠ l\'emoji {cle} n\'apparaît nulle part dans l\'application (faute de frappe ?)')
    js = ('/* === GÉNÉRÉ par tools/build_images.py à partir de config/photos.txt — NE PAS MODIFIER ICI === */\n'
          'const PHOTOS=' + json.dumps(uniques, ensure_ascii=False) + ';\n'
          'const DEFIMG=Object.fromEntries(Object.entries(' + json.dumps(sortie, ensure_ascii=False) + ').map(([k,i])=>[k,PHOTOS[i]]));\n'
          'const EMOJIS=' + json.dumps(emojis, ensure_ascii=False) + ';\n'
          "const IMGS=Object.assign({},DEFIMG);try{Object.assign(IMGS,JSON.parse(localStorage.getItem('mcimg')||'{}'))}catch(e){}\n")
    (root / 'js' / 'data' / 'images-default.js').write_text(js, encoding='utf-8')
    print(f'✓ {len(uniques)} photo(s) pour {len(sortie)} emoji(s), {len(emojis)} emoji(s) de remplacement' + (f' — {erreurs} erreur(s)' if erreurs else ''))
    if erreurs: sys.exit(1)

if __name__ == '__main__':
    main()
