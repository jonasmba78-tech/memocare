/* === PERSISTANCE localStorage (P, sv), ALL, HINT, upd() (v1), mk() (validation d’étape) === */
let P={};const seen=new Set(),TP=new Set(),GC=new Set();let rp=null,rk='A',ri=0,g={s:2,v:0,f:0};
try{const o=JSON.parse(localStorage.getItem('mc')||'{}');P=o.P||{};if(o.mod){mod=o.mod;sec=o.sec||'plan'}else sec='plan'}catch(e){sec='plan'}
const sv=()=>{try{localStorage.setItem('mc',JSON.stringify({P,mod,sec}))}catch(e){}};
const ALL=[];for(const m in MO)for(const k in MO[m].S)if(k!='plan')ALL.push(m+':'+k);
const HINT={bd:"Rejoue chaque scène jusqu’au bout",jour:"Regarde les 4 moments de la journée",eq:"Retourne toutes les cartes",corps:"Touche 10 parties du corps",mots:"Retourne toutes les cartes",rout:"Suis les 3 routines jusqu’à la fin",gram:"Essaie 4 phrases différentes"};
function upd(){const n=ALL.filter(k=>P[k]).length,q=Math.round(n/ALL.length*100);$('#pb').style.width=q+'%';$('#pt').textContent=n+'/'+ALL.length+' étapes · '+q+' %';$('#lic').textContent=lic()?'Licence : '+P.ln:'Version gratuite · modules 1 et 2';const nx=ALL.find(k=>!P[k]),b=$('#go');if(nx){const[m,k]=nx.split(':');b.dataset.k=nx;b.textContent='Continuer · '+MO[m].t+' › '+MO[m].S[k]}else{b.dataset.k='';b.textContent='Parcours terminé, bravo ! 🎉'}}
function mk(k){if(P[k])return;P[k]=1;sv();upd();const t=$('#ts');t.textContent='✓ Étape validée';t.classList.add('on');setTimeout(()=>t.classList.remove('on'),2200)}
