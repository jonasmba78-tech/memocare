/* === VOIX : moteur de lecture à voix haute (VOX) — l’anglais est lu en anglais, le français en français, sur tous les téléphones ===
   Utilisation dans le code :
     sp('Good morning')              → langue détectée automatiquement (sinon langue du cours en cours)
     sp('Bonjour', 'fr')             → langue imposée ('en' ou 'fr')
     VOX.say([{t:'Fauteuil roulant',l:'fr'},{t:'Wheelchair',l:'en'}])   → plusieurs morceaux à la suite
   Ce que fait le moteur, et pourquoi (les téléphones se comportent très différemment) :
   • Il choisit EXPLICITEMENT une voix installée (utterance.voice) au lieu de se fier à utterance.lang seul, que certains
     téléphones (Android de plusieurs marques) ignorent.
   • Il reconnaît tous les formats de langue : « en-US », « en_US » (Android), « eng-USA » et « fra-FRA » (Samsung), « fr-CM »…
   • Il attend la liste des voix (chargée tardivement sur Android) et la recharge quand elle change.
   • Il préfère les voix hors-ligne (marchent sans connexion), évite les voix « fantaisie ».
   • Il laisse 80 ms entre cancel() et speak() (sinon la lecture est coupée sur beaucoup d’Android) et garde les phrases en
     mémoire (sinon le ramasse-miettes les arrête en plein milieu).
   • Il découpe les longs textes (certains navigateurs coupent après ~15 s).
   • Si la voix d’une langue n’est pas installée, il prévient une fois et explique comment l’installer (bouton « 🔊 Tester les voix »). */
const VOX=(()=>{
const ok=typeof speechSynthesis!=='undefined'&&typeof SpeechSynthesisUtterance!=='undefined';
let voices=[],keep=[],warned={},tid=0;
const code=l=>{const c=String(l||'').replace(/_/g,'-').toLowerCase().split('-')[0];return c=='eng'?'en':(c=='fra'||c=='fre'||c=='fro')?'fr':c};
const region=l=>String(l||'').replace(/_/g,'-').toLowerCase().split('-').slice(1).join('-');
const load=()=>{try{voices=ok?(speechSynthesis.getVoices()||[]):[]}catch(e){voices=[]}};
if(ok){load();try{speechSynthesis.addEventListener('voiceschanged',()=>{load();if(VOX.onVoices)VOX.onVoices()})}catch(e){try{speechSynthesis.onvoiceschanged=load}catch(_){}}setTimeout(load,500);setTimeout(load,1500)}
/* ---- choix de la voix ---- */
const PREF={en:['us','gb','au','ca','in','za','ng','ie'],fr:['fr','ca','be','ch','cm','sn','ci']};
const rank=(v,l)=>{const r=region(v.lang).replace(/^(usa)$/,'us').replace(/^(gbr)$/,'gb').replace(/^(fra)$/,'fr'),i=PREF[l].indexOf(r.slice(0,2));
 let s=(i<0?50:i)+(v.localService?0:20)+(/novelty|bad news|bells|boing|cellos|deranged|good news|hysterical|pipe organ|trinoids|whisper|zarvox|albert|fred|junior|ralph|kathy|bubbles|superstar/i.test(v.name)?200:0);
 return s+(v.default&&code(v.lang)==l?-5:0)};
const find=l=>{const c=voices.filter(v=>code(v.lang)==l);if(!c.length)return null;return c.slice().sort((a,b)=>rank(a,l)-rank(b,l))[0]};
/* ---- détection de la langue d’un texte ---- */
const FRW=new Set(('le la les un une des de du et est sont il elle je tu nous vous ils elles au aux pour avec dans sur pas que qui ce cette mon ma mes sa ses ne se ou où par très bien comme mais donc car si été être avoir fait faire votre vos notre nos leur leurs lui moi toi bonjour bonsoir merci salut patient patiente enfant bébé madame monsieur aide soin soins douleur manger boire dormir lever coucher laver habiller toujours souvent parfois jamais fois jour matin soir nuit midi ici voici voilà oui non peut peuvent doit doivent faut dit dire avoir avez avons ont suis es sommes êtes quand comment pourquoi quel quelle quels quelles ceci cela ça aussi alors après avant pendant sans sous entre chez vers depuis tout tous toute toutes plus moins beaucoup peu trop assez déjà encore ensuite puis enfin').split(' '));
const ENW=new Set(('the a an is are was were be been am he she it they we you i my your his her its our their to of in at for with and not do does did don\'t doesn\'t can could will would please thank thanks hello hi good morning afternoon evening night welcome sorry excuse yes no how what where when who why this that these those have has had here there now today tomorrow help need needs like likes prefer prefers eat eats drink drinks sleep sleeps wake wakes take takes give gives feel feels after before from by but if some any all very too much many more also just again then than so up down out over let let\'s i\'m i\'ll it\'s he\'s she\'s you\'re we\'re they\'re doctor nurse baby child water milk food bottle nappy bed bath wash brush teeth hand arm leg head foot feet eye ear nose mouth back knee hurts hurt pain allergy diet lunch breakfast dinner snack rice fish chicken always often sometimes never every twice once week month year day time family mother father daughter son care assistant educator ward centre center sit stand walk walker cane stick wheelchair cot crib mat').split(' '));
const DIA=/[àâäçéèêëîïôöùûüÿœæ]/gi,ELI=/(?:^|[^a-zà-ÿ])(?:l|d|j|qu|n|s|c|m|t|jusqu)['’](?=[a-zà-ÿ])/gi;
function score(t){const s=String(t).toLowerCase().replace(/’/g,"'");let fr=0,en=0,m;
 fr+=3*Math.min(3,(s.match(DIA)||[]).length);fr+=2*Math.min(3,(s.match(ELI)||[]).length);
 (s.match(/[a-zà-ÿ]+(?:'[a-z]+)?/g)||[]).forEach(w=>{if(FRW.has(w))fr++;if(ENW.has(w))en++});
 return[fr,en]}
function detect(t,def){const[fr,en]=score(t);return fr>en?'fr':en>fr?'en':null}
/* ---- découpage : phrases, parenthèses, guillemets ; les segments sans indice héritent de la langue voisine ---- */
function segments(text,forced,def){
 const clean=String(text).replace(/\s+/g,' ').trim();if(!clean)return[];
 if(forced)return[{t:clean,l:forced}];
 const raw=clean.match(/[^.!?;:,()«»—\n]+[.!?;:,]*/g)||[clean];
 const out=[];let prev=null;
 raw.map(x=>x.trim()).filter(x=>/[a-zà-ÿ0-9]/i.test(x)).forEach(x=>{const d=detect(x)||prev||def;prev=d;
  if(out.length&&out[out.length-1].l==d)out[out.length-1].t+=' '+x;else out.push({t:x,l:d})});
 /* si le tout premier segment n’avait aucun indice mais le suivant oui, on aligne (ex. « Hello. (l’enfant) ») */
 return out}
const chunk=t=>{if(t.length<=170)return[t];const r=[];let c='';t.split(/(?<=[.!?;,])\s+/).forEach(p=>{if((c+' '+p).length>170&&c){r.push(c);c=p}else c=c?c+' '+p:p});if(c)r.push(c);return r.flatMap(x=>x.length>220?x.match(/.{1,200}(\s|$)/g).map(y=>y.trim()):[x])};
const defLang=()=>{try{return(typeof CRS!=='undefined'&&CRS[1]&&CRS[1].m.includes(mod))?'en':'fr'}catch(e){return'fr'}};
/* ---- annonce discrète (réutilise la pastille #ts) ---- */
function toast(msg){try{const t=document.getElementById('ts');if(!t)return;const old=t.textContent,cls=t.className;t.textContent=msg;t.classList.add('on');t.style.background='#8a5a00';clearTimeout(toast.i);toast.i=setTimeout(()=>{t.classList.remove('on');t.style.background=''},5200)}catch(e){}}
function warn(l){if(warned[l]||!voices.length)return;warned[l]=1;toast(l=='en'?'Voix anglaise introuvable sur ce téléphone. Touche « 🔊 Tester les voix » en bas de page.':'Voix française introuvable sur ce téléphone. Touche « 🔊 Tester les voix » en bas de page.')}
/* ---- lecture ---- */
function speak(parts,done){
 if(!ok){if(!warned.none){warned.none=1;toast('Lecture audio indisponible sur ce navigateur.')}return}
 const def=defLang();let list=[];
 (Array.isArray(parts)?parts:[{t:parts}]).forEach(p=>{if(!p||!p.t)return;segments(p.t,p.l,p.d||def).forEach(s=>list.push(s))});
 if(!list.length)return;
 try{speechSynthesis.cancel()}catch(e){}
 clearTimeout(tid);
 tid=setTimeout(()=>{try{speechSynthesis.resume()}catch(e){}
  keep=[];
  list.forEach(s=>chunk(s.t).forEach(c=>{
   const u=new SpeechSynthesisUtterance(c),v=find(s.l);
   if(v){u.voice=v;u.lang=v.lang}else{u.lang=s.l=='en'?'en-US':'fr-FR';warn(s.l)}
   u.rate=s.l=='en'?.78:.88;u.pitch=1;u.volume=1;
   u.onerror=()=>{};keep.push(u);speechSynthesis.speak(u)}));
  if(done)done()},80)}
/* ---- panneau « Tester les voix » ---- */
function guide(){const ua=navigator.userAgent||'';
 if(/iPhone|iPad|iPod/i.test(ua))return'iPhone / iPad : Réglages › Accessibilité › Contenu énoncé › Voix › choisir Anglais et Français, puis télécharger une voix.';
 if(/Android/i.test(ua))return'Android : Réglages › Gestion globale (ou Système) › Langue et saisie › Synthèse vocale › moteur « Google » (⚙) › Installer les données vocales › Anglais et Français. Sur Samsung, tu peux aussi choisir le moteur « Synthèse vocale Samsung ».';
 return'Ordinateur : installe les voix Anglais et Français dans les réglages de ton système (Windows : Paramètres › Heure et langue › Voix ; Mac : Réglages › Accessibilité › Contenu énoncé).'}
function panel(){let p=document.getElementById('voxp');if(p){p.remove();return}
 p=document.createElement('div');p.id='voxp';document.body.appendChild(p);
 const draw=()=>{load();const e=find('en'),f=find('fr'),n=voices.length;
  p.innerHTML=`<div class="vc"><h3>🔊 Voix de ce téléphone</h3>`+
  (!ok?'<p>❌ Ce navigateur ne sait pas lire à voix haute. Essaie avec Chrome (Android) ou Safari (iPhone).</p>':
  `<p>${e?'✅':'❌'} <b>Anglais</b> : ${e?e.name+' <small>('+e.lang+(e.localService?', hors-ligne':', en ligne')+')</small>':'aucune voix trouvée'}</p><button class="go" data-vx="en">▶ Écouter l’anglais</button>
   <p>${f?'✅':'❌'} <b>Français</b> : ${f?f.name+' <small>('+f.lang+(f.localService?', hors-ligne':', en ligne')+')</small>':'aucune voix trouvée'}</p><button class="go" data-vx="fr">▶ Écouter le français</button>
   ${n?'':'<p class="mu">La liste des voix n’est pas encore chargée (ou ce navigateur ne la donne pas). Les boutons essaient quand même.</p>'}
   ${(e&&f)?'':'<div class="rl"><b>Comment installer la voix manquante</b><p>'+guide()+'</p></div>'}`)+
  `<button class="go" data-vx="x" style="background:var(--cd);color:var(--fg);border:1px solid var(--ln)">Fermer</button></div>`};
 draw();VOX.onVoices=()=>{if(document.getElementById('voxp'))draw()}}
document.addEventListener('click',e=>{const b=e.target.closest&&e.target.closest('[data-vx],#voxbtn');if(!b)return;
 if(b.id=='voxbtn'){panel();return}
 const k=b.dataset.vx;if(k=='x'){panel();return}
 speak([{t:k=='en'?'Good morning. How are you feeling today?':'Bonjour. Comment vous sentez-vous aujourd’hui ?',l:k}])});
return{say:speak,detect:(t,d)=>detect(t)||d||defLang(),segments,find,panel,voices:()=>voices,onVoices:null,defLang}})();
