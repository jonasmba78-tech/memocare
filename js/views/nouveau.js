/* === VUE · Badges « NOUVEAU » sur les onglets + carte « Nouveautés » sous la bannière. Données : js/data/nouveautes.js === */
(function(){
const DAYS=14,MS=['janv.','févr.','mars','avr.','mai','juin','juil.','août','sept.','oct.','nov.','déc.'];
const parse=d=>{const[y,m,j]=d.split('-').map(Number);return new Date(y,m-1,j)};
const today=()=>{const n=new Date();return new Date(n.getFullYear(),n.getMonth(),n.getDate())};
const age=d=>Math.round((today()-parse(d))/864e5);
const fmt=d=>d.getDate()+' '+MS[d.getMonth()];
const lastDay=d=>{const e=parse(d);e.setDate(e.getDate()+DAYS-1);return e};
const live=()=>NOUV.filter(n=>age(n[0])<DAYS);
function badges(){const L=live();if(!L.length)return;
 const mods=new Set(L.filter(n=>n[1]).map(n=>n[1])),secs=new Set(L.filter(n=>n[1]&&n[2]).map(n=>n[1]+':'+n[2]));
 const add=(host)=>{if(!host||host.querySelector('.nw'))return;const b=document.createElement('i');b.className='nw';b.textContent='NOUVEAU';host.appendChild(b)};
 document.querySelectorAll('#app .tabs button[data-m]').forEach(b=>{if(mods.has(+b.dataset.m))add(b)});
 document.querySelectorAll('#app .tabs.c button[data-c]').forEach(b=>{const c=CRS[b.dataset.c];if(c&&c.m.some(m=>mods.has(m)))add(b)});
 document.querySelectorAll('#app .tabs.s button[data-s]').forEach(b=>{if(secs.has(mod+':'+b.dataset.s))add(b)});
 document.querySelectorAll('#app .node[data-s]').forEach(b=>{if(secs.has(mod+':'+b.dataset.s))add(b.querySelector('b'))})}
function card(){const h=document.getElementById('nouv');if(!h)return;const L=live();if(!L.length){h.innerHTML='';return}
 const open=h.querySelector('details')&&h.querySelector('details').open;
 h.innerHTML=`<details class="nvd" ${open?'open':''}><summary><i class="nw">NOUVEAU</i> <b>Nouveautés</b> <span class="nvn">${L.length}</span></summary>`+
 L.slice().sort((a,b)=>b[0].localeCompare(a[0])).map(n=>`<button class="nvi" data-nv="${NOUV.indexOf(n)}"><i>${n[4]}</i><span><b>${n[3]}</b><small>Ajouté le ${fmt(parse(n[0]))} · visible jusqu’au ${fmt(lastDay(n[0]))}</small></span><em>›</em></button>`).join('')+'</details>'}
document.addEventListener('click',e=>{const b=e.target.closest('[data-nv]');if(!b)return;const n=NOUV[+b.dataset.nv];if(!n)return;
 if(n[5]=='voix'){VOX.panel();return}
 if(n[1]){mod=n[1];sec=n[2]||'plan';R();const a=document.getElementById('app');if(a)a.scrollIntoView({behavior:'smooth'})}});
/* après chaque affichage d’écran (R), on repose les badges */
const _R=R;R=function(){_R.apply(this,arguments);try{badges()}catch(e){}};
try{badges();card()}catch(e){}
window.NOUVEAU={live,age,badges,card};
})();
