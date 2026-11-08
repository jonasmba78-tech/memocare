/* === COURS 3 « Sémiologie » : transforme SEMD[n] (js/data/sem-*.js) en modules 12 à 19 de l’application ===
   Réutilise les vues existantes (Fiches, Comprendre, BD, Cas, Conduite à tenir, Quiz, Mini-jeux, Bilan)
   et ajoute la vue « Grille » (chapitre VII) : grille Qui / Quoi / Quand / Où / Comment / Pourquoi + rapport. */
(function(){
const IDS=[12,13,14,15,16,17,18,19];
const ORD=['plan','mots','expl','bd','grille','cas','preca','jeux','jeux2','esprit'];
const LAB={plan:'Parcours',mots:'Fiches',expl:'Comprendre',bd:'BD',grille:'Grille',cas:'Cas pratiques',preca:'Conduite à tenir',jeux:'Quiz',jeux2:'Mini-jeux',esprit:'Bilan'};
const LBG={m:'🔍 Signes à observer',o:'👀 Comment observer',p:'🧭 Conduite à tenir',r:'⚠️ Si on passe à côté'};
CRS[3]={t:'Sémiologie',m:IDS};
OBJ[19]=[];
IDS.forEach(m=>{const d=SEMD[m];
 /* fiches (cartes) et « Comprendre » : fabriqués à partir des groupes de signes g, sauf si cd / ex sont fournis */
 if(d.g){
  d.cd=d.g.map(g=>[g.t,g.s.map(x=>{const[a,b,c,e]=x.split('|');return c&&e?`${a}|${b}|${c}|${e}`:`${a}|${b}|${c||e}|`}),0]);
  if(d.ori)d.cd.push(['Vers qui orienter ?',d.ori,0]);
  d.ex=[['Signes à observer',d.g.map(g=>E(g.t,g.i,{d:g.d,m:g.s.map(x=>{const[,b,c,e]=x.split('|');return `<b>${b}</b> : ${c||e}`}),o:g.o,p:g.p,r:g.r,lb:Object.assign({},LBG,g.lb||{})}))]];
 }
 CD[m]=d.cd;EX[m]=d.ex;OBJ[m]=d.obj;ES[m]=d.es;
 if(d.pre)PRE[m]=d.pre;if(d.prh)PRH[m]=d.prh;
 if(d.cb)CB[m]=d.cb;if(d.cas)CAS[m]=d.cas;
 if(d.vf)VF[m]=d.vf;if(d.mt)MT[m]=d.mt;if(d.or)OR[m]=d.or;if(d.cl)CL[m]=d.cl;
 QZ[m]=d.qz.map(x=>Q(...x));
 /* mélange des bonnes réponses (comme pour les modules 4-11) */
 QZ[m].forEach((q,i)=>{const k=(i+m)%q.o.length,o=q.o.slice(),a=q.a;q.o=o.map((_,j)=>o[(j+k)%o.length]);q.a=(a-k+o.length)%o.length});
 const has={plan:1,mots:CD[m],expl:EX[m],bd:d.cb,grille:d.grille,cas:d.cas,preca:d.pre,jeux:d.qz,jeux2:d.vf||d.mt||d.or||d.cl,esprit:d.es},S={};
 ORD.forEach(k=>{if(has[k])S[k]=LAB[k]});
 MO[m]={t:d.t,S,story:d.story,ph:d.ph};
 if(m>13)PAID.add(m);/* modules 12 et 13 gratuits, comme les modules 1 et 2 des autres cours */
});
Object.assign(HINT,{grille:'Remplis les 6 questions et génère ton rapport'});
ALL.length=0;for(const m in MO)for(const k in MO[m].S)if(k!='plan')ALL.push(m+':'+k);

/* ---- Vue « Grille » : entraînement à l’observation ---- */
const GQ=[['Qui ?','👤',['Qui présente ces signes ?','Qui d’autre est concerné ?']],['Quoi ?','🔎',['Quels signes précis ?','Quelle intensité ?']],['Quand ?','⏰',['À quel moment ?','Depuis quand ?','Fréquence ?']],['Où ?','📍',['Dans quel contexte ?','Quel environnement ?']],['Comment ?','🔄',['De quelle manière ?','Avec quelle évolution ?']],['Pourquoi ?','💡',['Quelles causes possibles ?','Quel impact ?']]];
const GR=['','','','','',''];
const JUG=/\b(méchant|méchante|paresseux|paresseuse|insupportable|menteur|menteuse|fou|folle|bizarre|nul|nulle|stupide|idiot|idiote|capricieux|capricieuse|difficile|exprès)\b/gi;
V.grille=()=>{$('#v').innerHTML='<p class="mu">Entraîne-toi : décris une situation (réelle ou imaginée) en répondant aux six questions. N’écris que des <b>faits</b>, pas de jugement. Puis génère ton rapport.</p>'+GQ.map((g,i)=>`<div class="rl gq"><b>${g[1]} ${g[0]}</b><small class="mu">${g[2].join(' · ')}</small><textarea rows="2" data-gq="${i}" placeholder="Écris uniquement des faits…">${GR[i].replace(/</g,'&lt;')}</textarea></div>`).join('')+'<button class="go" id="gg">Générer mon rapport ▸</button><div id="gr"></div>'};
document.addEventListener('input',e=>{const t=e.target.closest&&e.target.closest('[data-gq]');if(t)GR[+t.dataset.gq]=t.value});
document.addEventListener('click',e=>{if(!e.target.closest('#gg'))return;
 const vide=GR.map((x,i)=>x.trim().length<3?GQ[i][0]:'').filter(Boolean),box=$('#gr');
 if(vide.length){box.innerHTML=`<div class="rl" style="border-left:6px solid #d64545"><b>Il manque des réponses :</b> ${vide.join(', ')}</div>`;return}
 const txt='RAPPORT D’OBSERVATION\n'+GQ.map((g,i)=>`${g[0]} ${GR[i].trim()}`).join('\n'),jug=[...new Set((GR.join(' ').match(JUG)||[]).map(x=>x.toLowerCase()))];
 box.innerHTML=`<h4>Ton rapport</h4><div class="rl"><div class="rapport"></div><button class="go" id="gc">📋 Copier</button></div>${jug.length?`<div class="rl" style="border-left:6px solid #f2b705"><b>⚠ Attention aux jugements :</b> « ${jug.join(' », « ')} ». Remplace chaque mot par le fait observé (ce que tu as vu ou entendu).</div>`:'<div class="rl" style="border-left:6px solid #1f9d6b"><b>✅ Aucun mot de jugement détecté.</b> Vérifie quand même que chaque phrase est un fait observable.</div>'}`;
 box.querySelector('.rapport').textContent=txt;box.dataset.t=txt;mk('19:grille');box.scrollIntoView({behavior:'smooth',block:'nearest'})});
document.addEventListener('click',e=>{if(!e.target.closest('#gc'))return;const t=$('#gr').dataset.t||'';try{navigator.clipboard.writeText(t);e.target.closest('#gc').textContent='✓ Copié'}catch(_){}});
})();
