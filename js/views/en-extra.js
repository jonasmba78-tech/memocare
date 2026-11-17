/* === VUES · Cours 1 (English for Care) : Corps 3D enrichi, onglet « Cours » (fiche), « Exercices » (moteur corrigé), « Photos » (vie quotidienne) ===
   FORMATS DES DONNÉES (voir js/data/en-course2.js et js/data/en-modules-new.js)
   • FICHE[m] = [[titre, type, contenu], …]   type : 'ul' liste HTML · 'tb' tableau {h:[entêtes], r:[lignes], sp:n° de colonne à lire à voix haute}
                                                      · 'sp' phrases [[anglais, français], …] avec 🔊
   • EXO[m]   = [{t:titre, i:consigne (HTML), k:'f'|'c'|'s', items:[…]}, …]
        k:'f' (écrire)  item {q:'Phrase avec ___', a:['réponse','variante'], w:'explication'}
        k:'c' (choisir) item {q, o:['A','B','C'], a:index juste, alt:[autres index acceptés], w}
        k:'s' (s’exprimer, auto-correction) item {q, s:'réponse modèle'}
   • FPAGES[m] = ['p21','p23'] : pages photographiées du support (fichiers Images/fiches/p21.jpg …)
   • AVQP : photos de la vie quotidienne (fichiers Images/avq/nom.jpeg)                                    */
(function(){
const esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;');
const shuf=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
const SU=(typeof SUPPORT!='undefined')?SUPPORT:{avq:{},fiches:{}};
/* ---------- sections, libellés, objectifs ---------- */
const reorder=(m,ord)=>{const S=MO[m].S,o={};ord.forEach(k=>{if(S[k])o[k]=S[k]});Object.keys(S).forEach(k=>{if(!o[k])o[k]=S[k]});MO[m].S=o};
Object.assign(MO[2].S,{fiche:'Cours',exo:'Exercices',jeux2:'Mini-jeux',jeux:'Quiz'});
reorder(2,['plan','bd','corps','mots','fiche','exo','jeux2','jeux','esprit']);
Object.assign(HINT,{fiche:'Lis le cours résumé (touche une ligne pour l’écouter)',exo:'Corrige tous les exercices (50 % ou plus)',img:'Ouvre toutes les photos'});
const rebuildAll=()=>{ALL.length=0;for(const m in MO)for(const k in MO[m].S)if(k!='plan')ALL.push(m+':'+k)};rebuildAll();
/* mélange des réponses des quiz ajoutés (la bonne réponse n’est pas toujours la première) */
[2,20,21,22].forEach(m=>QZ[m].forEach((q,i)=>{if(q.sh||(m==2&&i<6))return;q.sh=1;const k=(i+m)%q.o.length,o=q.o.slice(),a=q.a;q.o=o.map((_,j)=>o[(j+k)%o.length]);q.a=(a-k+o.length)%o.length}));
/* ---------- styles ---------- */
const st=document.createElement('style');st.textContent=`
.ft2{width:100%;border-collapse:collapse;margin:6px 0 14px;font-size:15px}.ft2 th{background:var(--cd);text-align:left;padding:8px;border:1px solid var(--ln)}.ft2 td{padding:8px;border:1px solid var(--ln);vertical-align:top}.ft2 tr.sp{cursor:pointer}.ft2 tr.sp:active{background:rgba(242,183,5,.2)}
.fq{display:flex;gap:10px;align-items:center;justify-content:space-between;background:var(--cd);border:1px solid var(--ln);border-radius:12px;padding:9px 12px;margin:0 0 8px}.fq small{color:var(--mu);display:block;margin-top:2px}.fq .sp{flex:none}
.fh{font:700 17px Rockwell,Georgia,serif;margin:18px 0 6px}
details.pg{background:var(--cd);border:1px solid var(--ln);border-radius:14px;padding:10px 14px;margin:14px 0}details.pg summary{cursor:pointer;font-weight:700}details.pg img{width:100%;border-radius:8px;margin-top:10px;display:block}
.xq{background:var(--cd);border:1px solid var(--ln);border-radius:14px;padding:12px;margin:0 0 10px}.xq p{margin:0 0 8px}
.xi{font:inherit;color:inherit;background:transparent;border:0;border-bottom:2px solid #f2b705;min-width:90px;width:150px;max-width:100%;padding:2px 4px;text-align:center}textarea.xi{width:100%;min-height:70px;border:2px solid var(--ln);border-radius:10px;text-align:left;padding:8px;box-sizing:border-box}
.xi.ok{border-color:#1f9d6b;color:#1f9d6b;font-weight:700}.xi.ko{border-color:#d64545;color:#d64545}
.xo{display:block;width:100%;text-align:left;margin:0 0 6px}.xo.sel{outline:3px solid #f2b705}.xo.ok{border-color:#1f9d6b;background:rgba(31,157,107,.15)}.xo.ko{border-color:#d64545;background:rgba(214,69,69,.12)}
.xr{font-size:14px;margin-top:8px;padding:8px 10px;border-radius:10px;background:rgba(0,0,0,.05)}.xr.g{border-left:5px solid #1f9d6b}.xr.b{border-left:5px solid #d64545}
.pgrid{display:grid;grid-template-columns:repeat(2,1fr);gap:10px}.pc{background:var(--cd);border:1px solid var(--ln);border-radius:14px;overflow:hidden;cursor:pointer}.pc img{width:100%;height:130px;object-fit:cover;display:block}.pc .pt{padding:8px 10px}.pc .pt small{display:block;color:var(--mu)}.pc .ps{display:none;padding:0 10px 10px;font-size:14px}.pc.o .ps{display:block}.pc.o{outline:3px solid #1f9d6b}
.bsel{margin:6px 0}
`;document.head.appendChild(st);
/* ---------- CORPS 3D : commandes + cartes de toutes les parties ---------- */
V.corps=()=>{
$('#v').innerHTML=`<div class="tabs" id="bmode"><button data-bm="ext">🧍🏾 Extérieur</button><button data-bm="int">🫀 Intérieur</button></div><div id="c3"></div><div class="tabs bsel">${Object.keys(BODYFOC).map(k=>`<button data-bf="${k}">${BODYFOC[k][2]}</button>`).join('')}</div><div id="lb">Touche une partie du corps. Glisse pour tourner. Bascule sur « Intérieur » pour voir les organes.</div><p class="mu">Touche une carte pour retourner : mot anglais, puis français. Une phrase d’exemple est lue à voix haute.</p>`+BODYG.map(([t,L])=>cards(t,L,1)).join('');
body3d()};
/* ---------- FICHE : cours transcrit ---------- */
V.fiche=()=>{const F=FICHE[mod]||[];
let h='<p class="mu">Résumé du cours. Touche une ligne ou le 🔊 pour écouter l’anglais.</p>';
F.forEach(([t,k,c])=>{h+=`<h4 class="fh">${t}</h4>`;
if(k=='ul')h+='<div class="rl"><ul>'+c.map(x=>`<li style="margin:6px 0">${x}</li>`).join('')+'</ul></div>';
else if(k=='tb')h+=`<table class="ft2"><tr>${c.h.map(x=>`<th>${x}</th>`).join('')}</tr>${c.r.map(r=>`<tr ${c.sp!=null?`class="sp" data-l="en" data-t="${esc(r[c.sp])}"`:''}>${r.map(x=>`<td>${x}</td>`).join('')}</tr>`).join('')}</table>`;
else if(k=='sp')h+=c.map(([en,fr])=>`<div class="fq"><span><b>${en}</b><small>${fr}</small></span><button class="sp" data-l="en" data-t="${esc(en)}" aria-label="Écouter">🔊</button></div>`).join('')});
const pg=(FPAGES[mod]||[]).filter(n=>SU.fiches[n]);
if(pg.length)h+=`<details class="pg"><summary>📷 Voir les pages du support (${pg.length})</summary>${pg.map(n=>`<img loading="lazy" alt="Page ${n.slice(1)} du support" src="${SU.fiches[n]}">`).join('')}</details>`;
$('#v').innerHTML=h;mk(mod+':fiche')};
/* ---------- PHOTOS : la vie quotidienne en images ---------- */
const AVQP=[['appareil-auditif','Hearing aid','Appareil auditif','She wears her hearing aid every day.','Elle porte son appareil auditif tous les jours.'],['escalier','Stairs','Escalier','The child goes down the stairs. Hold the handrail!','L’enfant descend l’escalier. Tiens la rampe !'],['cuisinier','Preparing a meal','Préparer un repas','The cook prepares dinner for the family.','Le cuisinier prépare le dîner pour la famille.'],['rangement','Tidying up','Ranger','The chest of drawers is messy. I tidy up the room every day.','La commode est en désordre. Je range la chambre tous les jours.'],['chute','A fall','Une chute','He has fallen. Stay calm and call the nurse.','Il est tombé. Restez calme et appelez l’infirmier.'],['television','Watching TV','Regarder la télévision','The family watches TV in the evening.','La famille regarde la télévision le soir.'],['radio','Listening to the radio','Écouter la radio','He listens to the radio in the morning.','Il écoute la radio le matin.'],['bibliotheque','Reading books','Lire des livres','She often reads books.','Elle lit souvent des livres.'],['repas-bebe','Feeding the baby','Donner à manger au bébé','The mother feeds the baby with a spoon.','La maman donne à manger au bébé à la cuillère.'],['bebe-mord-cube','A toy in his mouth','Un jouet dans la bouche','The baby puts toys in his mouth. Watch him!','Le bébé met les jouets dans sa bouche. Surveillez-le !'],['bebe-salue','Waving','Faire coucou','The baby waves his hand.','Le bébé fait coucou de la main.'],['enfant-debout','Standing up','Se tenir debout','The child stands and holds the sofa.','L’enfant se tient debout en s’appuyant au canapé.'],['enfant-court','Running','Courir','The child runs in the street. Watch him!','L’enfant court dans la rue. Surveillez-le !'],['brossage-dents','Brushing teeth','Se brosser les dents','He brushes his teeth twice a day.','Il se brosse les dents deux fois par jour.']].filter(p=>SU.avq[p[0]]);
let PQ={i:0,s:0,o:[],fb:''};
V.img=()=>{$('#v').innerHTML='<p class="mu">Touche une photo : le mot anglais, la phrase d’exemple, puis le français. Ouvre-les toutes pour valider l’étape, puis teste-toi avec le quiz photo.</p><div class="pgrid">'+AVQP.map((p,i)=>`<div class="pc" data-pc="${i}"><img loading="lazy" alt="${esc(p[1])}" src="${SU.avq[p[0]]}"><div class="pt"><b>${p[1]}</b><small>${p[2]}</small></div><div class="ps"><b>${p[3]}</b><br><small>${p[4]}</small></div></div>`).join('')+'</div><h4 class="fh">Quiz photo</h4><div id="pq"></div>';PQ={i:0,s:0,o:shuf(AVQP.map((_,i)=>i)).slice(0,8),fb:''};pqShow()};
function pqShow(){const b=$('#pq');if(!b)return;if(PQ.i>=PQ.o.length){b.innerHTML=`<div class="gout">Score : ${PQ.s} / ${PQ.o.length} ${PQ.s>=PQ.o.length-1?'🏆':'💪🏾'}</div><button class="go" data-pqr>Rejouer ↺</button>`;return}
const p=AVQP[PQ.o[PQ.i]],wr=shuf(AVQP.filter(x=>x!==p)).slice(0,2),op=shuf([p,...wr]);
b.innerHTML=`<p class="mu">${PQ.i+1}/${PQ.o.length} · Que voit-on sur cette photo ?</p><img alt="photo à deviner" src="${SU.avq[p[0]]}" style="width:100%;max-height:220px;object-fit:cover;border-radius:12px">${op.map(o=>`<button class="jb xo" data-pqa="${AVQP.indexOf(o)}" data-ok="${o===p?1:0}">${o[1]}</button>`).join('')}<div id="pqf">${PQ.fb}</div>`}
/* ---------- EXERCICES : moteur ---------- */
const EXS={};
const nz=s=>String(s).normalize('NFD').replace(/[̀-ͯ]/g,'').toLowerCase().replace(/[’‘`´]/g,"'").replace(/[.,;:!?]+$/,'').replace(/\s+/g,' ').trim();
const getS=m=>EXS[m]||(EXS[m]={b:0,a:{},c:{},p:{},r:{}});
const done=(m,i)=>!!P['x'+m+'_'+i];
function exo(){const E=EXO[mod],S=getS(mod),B=E[S.b],bi=S.b,cor=!!S.c[bi],A=S.a[bi]||(S.a[bi]={});
let h=`<div class="tabs">${E.map((x,i)=>`<button data-xb="${i}" class="${i==bi?'on':''}">${done(mod,i)?'✓ ':''}${x.t.split(' · ')[0]}</button>`).join('')}</div><h4 class="fh">${B.t}</h4><div class="rl"><p>${B.i}</p></div>`;
if(!S.p[bi])S.p[bi]=B.items.map(it=>it.o?shuf(it.o.map((_,k)=>k)):null);
let ok=0;
B.items.forEach((it,j)=>{h+=`<div class="xq">`;
if(B.k=='f'){const v=A[j]||'',good=cor&&it.a.some(x=>nz(x)==nz(v));if(good)ok++;
const inp=`<input class="xi ${cor?(good?'ok':'ko'):''}" data-xi="${j}" value="${esc(v)}" ${cor?'disabled':''} autocomplete="off" autocapitalize="off" spellcheck="false" aria-label="réponse ${j+1}">`;
h+=`<p>${j+1}. ${it.q.includes('___')?esc(it.q).replace('___',inp):esc(it.q)+' → '+inp}</p>`;
if(cor)h+=`<div class="xr ${good?'g':'b'}">${good?'✅ Bien joué !':'❌ Réponse attendue : <b>'+esc(it.a[0])+'</b>'}<br>${it.w||''}</div>`}
else if(B.k=='c'){const sel=A[j];const good=cor&&(sel==it.a||(it.alt||[]).includes(sel));if(good)ok++;
h+=`<p>${j+1}. ${it.q}</p>`+S.p[bi][j].map(k=>{let c='';if(cor){if(k==it.a)c='ok';else if(k==sel)c=(it.alt||[]).includes(k)?'ok':'ko'}else if(k===sel)c='sel';return `<button class="jb xo ${c}" data-xo="${j}:${k}" ${cor?'disabled':''}>${esc(it.o[k])}</button>`}).join('');
if(cor)h+=`<div class="xr ${good?'g':'b'}">${good?'✅ Bien joué !':'❌ Réponse attendue : <b>'+esc(it.o[it.a])+'</b>'}<br>${it.w||''}</div>`}
else{const rv=!!S.r[bi+':'+j];h+=`<p>${j+1}. ${it.q}</p><textarea class="xi" data-xi="${j}" rows="3" placeholder="Écris ta réponse en anglais…">${esc(A[j]||'')}</textarea><button class="jb" data-xs="${j}" ${rv?'disabled':''}>${rv?'Réponse modèle ci-dessous':'Voir la réponse modèle'}</button>${rv?`<div class="xr g">💡 <b>Modèle :</b> ${esc(it.s)}</div>`:''}`}
h+='</div>'});
if(B.k=='s'){const n=B.items.filter((_,j)=>S.r[bi+':'+j]).length;h+=n>=B.items.length?'<div class="gout">Bravo, exercice terminé 🏆</div>':`<p class="mu">${n}/${B.items.length} réponse(s) modèle(s) consultée(s).</p>`;if(n>=B.items.length&&!done(mod,bi)){P['x'+mod+'_'+bi]=1;sv();exoAll()}}
else if(!cor)h+='<button class="go" data-xc>Corriger ✔</button>';
else{const n=B.items.length,pass=ok*2>=n;h+=`<div class="gout">Score : ${ok} / ${n} ${ok==n?'🏆':pass?'👏🏾':'💪🏾'}</div>`;if(pass&&!done(mod,bi)){P['x'+mod+'_'+bi]=1;sv();exoAll()}h+=`<button class="go" data-xr>Recommencer ↺</button>`+(bi+1<E.length?`<button class="go" data-xb="${bi+1}" style="margin-top:8px">Exercice suivant ▸</button>`:'')}
$('#v').innerHTML=h}
const exoAll=()=>{if(EXO[mod].every((_,i)=>done(mod,i)))mk(mod+':exo');else upd()};
V.exo=()=>{getS(mod);exo()};
/* ---------- événements ---------- */
document.addEventListener('click',e=>{const t=e.target;let x;
if(x=t.closest('[data-xb]')){getS(mod).b=+x.dataset.xb;exo();scrollTo({top:0})}
else if(x=t.closest('[data-xo]')){const S=getS(mod);if(S.c[S.b])return;const[j,k]=x.dataset.xo.split(':').map(Number);(S.a[S.b]||(S.a[S.b]={}))[j]=k;exo()}
else if(t.closest('[data-xc]')){const S=getS(mod);S.c[S.b]=1;exo();scrollTo({top:0})}
else if(t.closest('[data-xr]')){const S=getS(mod);delete S.c[S.b];delete S.a[S.b];delete S.p[S.b];exo();scrollTo({top:0})}
else if(x=t.closest('[data-xs]')){const S=getS(mod);S.r[S.b+':'+x.dataset.xs]=1;exo()}
else if(x=t.closest('[data-pc]')){x.classList.toggle('o');x.dataset.v=1;const it=AVQP[+x.dataset.pc];if(x.classList.contains('o'))sp(it[1]+'. '+it[3],'en');if(sec=='img'&&[...document.querySelectorAll('#v .pc')].every(c=>c.dataset.v))mk(mod+':img')}
else if(x=t.closest('[data-pqa]')){if(PQ.fb)return;const g=x.dataset.ok==='1';if(g)PQ.s++;document.querySelectorAll('[data-pqa]').forEach(b=>{b.disabled=true;if(b.dataset.ok==='1')b.classList.add('ok');else if(b===x)b.classList.add('ko')});PQ.fb=`<div class="xr ${g?'g':'b'}">${g?'✅ Bien joué !':'❌ Pas tout à fait.'}</div><button class="go" data-pqn>${PQ.i+1>=PQ.o.length?'Voir le score':'Suivant ▸'}</button>`;$('#pqf').innerHTML=PQ.fb}
else if(t.closest('[data-pqn]')){PQ.i++;PQ.fb='';pqShow()}
else if(t.closest('[data-pqr]')){PQ={i:0,s:0,o:shuf(AVQP.map((_,i)=>i)).slice(0,8),fb:''};pqShow()}});
document.addEventListener('input',e=>{const x=e.target.closest&&e.target.closest('[data-xi]');if(!x||sec!='exo')return;const S=getS(mod);(S.a[S.b]||(S.a[S.b]={}))[+x.dataset.xi]=x.value});
})();
