/* === COURS 4 « Sciences des équipements, du logement et aménagement du milieu de vie » ===
   Transforme LOGD[n] (js/data/log-*.js) en modules 23 à 30. Même mécanique que le cours 3 (sem-core.js) :
   chaque chapitre = un objet LOGD[n] ; réutilise les vues Fiches, Comprendre, BD, Cas, Précautions, Quiz, Mini-jeux, Bilan. */
(function(){
const IDS=[23,24,25,26,27,28,29,30];
const ORD=['plan','mots','expl','bd','cas','preca','jeux','jeux2','esprit'];
const LAB={plan:'Parcours',mots:'Fiches',expl:'Comprendre',bd:'BD',cas:'Cas pratiques',preca:'Précautions',jeux:'Quiz',jeux2:'Mini-jeux',esprit:'Bilan'};
const LBG={m:'📋 À retenir',o:'🛠️ Comment faire',p:'🛡️ Précautions',r:'⚠️ Si on se trompe'};
CRS[4]={t:'Logement & entretien',m:IDS};
IDS.forEach(m=>{const d=LOGD[m];
 /* fiches (cartes) et « Comprendre » : fabriqués à partir des groupes g (chaque ligne : 'emoji|nom|détail') */
 d.cd=d.g.map(g=>[g.t,g.s.map(x=>{const[a,b,c,e]=x.split('|');return c&&e?`${a}|${b}|${c}|${e}`:`${a}|${b}|${c||e}|`}),0]);
 d.ex=[['Notions du chapitre',d.g.map(g=>E(g.t,g.i,{d:g.d,m:g.s.map(x=>{const[,b,c,e]=x.split('|');return `<b>${b}</b> : ${c||e}`}),o:g.o,p:g.p,r:g.r,lb:Object.assign({},LBG,g.lb||{})}))]];
 CD[m]=d.cd;EX[m]=d.ex;OBJ[m]=d.obj;ES[m]=d.es;
 if(d.pre)PRE[m]=d.pre;if(d.prh)PRH[m]=d.prh;
 if(d.cb)CB[m]=d.cb;if(d.cas)CAS[m]=d.cas;
 if(d.vf)VF[m]=d.vf;if(d.mt)MT[m]=d.mt;if(d.or)OR[m]=d.or;if(d.cl)CL[m]=d.cl;
 QZ[m]=d.qz.map(x=>Q(...x));
 /* mélange des bonnes réponses */
 QZ[m].forEach((q,i)=>{const k=(i+m)%q.o.length,o=q.o.slice(),a=q.a;q.o=o.map((_,j)=>o[(j+k)%o.length]);q.a=(a-k+o.length)%o.length});
 const has={plan:1,mots:CD[m],expl:EX[m],bd:d.cb,cas:d.cas,preca:d.pre,jeux:d.qz,jeux2:d.vf||d.mt||d.or||d.cl,esprit:d.es},S={};
 ORD.forEach(k=>{if(has[k])S[k]=LAB[k]});
 MO[m]={t:d.t,S,story:d.story,ph:d.ph};
 if(m>24)PAID.add(m);/* modules 23 et 24 gratuits, comme les modules 1 et 2 des autres cours */
});
ALL.length=0;for(const m in MO)for(const k in MO[m].S)if(k!='plan')ALL.push(m+':'+k);
})();
