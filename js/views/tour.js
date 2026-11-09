/* === VISITE GUIDÉE : présente l’application pas à pas (écran d’accueil, cours, modules, sections, progression).
   S’ouvre toute seule à la première utilisation ; bouton « ❓ Visite guidée » pour la relancer. Textes : tableau TOUR ci-dessous. === */
(function(){
const TOUR=[
{s:'.hero h1',t:'Bienvenue dans MémoCare 👋',d:'Cette visite de 8 étapes te montre comment suivre ton parcours. Tu peux la quitter à tout moment avec « Passer ».'},
{s:'#pb',t:'Ta progression',d:()=>'Cette barre se remplit à chaque étape validée. Pour l’instant : <b>'+($('#pt').textContent||'0 %')+'</b>.'},
{s:'#go',t:'Le bouton « Continuer »',d:'Il t’emmène directement à la prochaine étape à faire. Si tu ne sais pas par où reprendre, touche-le.'},
{s:'.tabs.c',t:'Les trois cours',d:'<b>English for Care</b>, <b>Psychologie de l’enfant</b> et <b>Sémiologie</b>. Touche un cours pour changer.'},
{s:'.tabs:not(.c):not(.s)',t:'Les modules et chapitres',d:'Chaque cours est découpé en modules ou chapitres. Le 🔒 indique un module payant : les deux premiers de chaque cours sont gratuits.'},
{s:'.story',t:'Le résumé du chapitre',d:'Avant de commencer, lis ce court texte : il donne l’idée à retenir. Les photos au-dessus montrent le sujet.'},
{s:'.tabs.s',t:'Les sections',d:'Suis-les dans l’ordre : <b>Parcours</b> (objectifs), <b>Fiches</b>, <b>Comprendre</b>, <b>Cas</b>, <b>Quiz</b>, <b>Mini-jeux</b>, <b>Bilan</b>. Chaque section terminée valide une étape.'},
{s:'#v',t:'À toi de jouer !',d:'Ici s’affiche le contenu : touche les cartes pour les retourner, ouvre les notions, réponds aux quiz. Tu peux relancer cette visite avec « ❓ Visite guidée ».'}];
let i=-1,ov,hl,card;
const done=()=>{try{localStorage.setItem('mctour','1')}catch(e){}};
function end(){if(ov){ov.remove();ov=hl=card=null}removeEventListener('resize',place);done()}
function place(){if(!ov)return;const st=TOUR[i];let el=document.querySelector(st.s);if(!el){next(1);return}
 el.scrollIntoView({block:'center'});const r=el.getBoundingClientRect(),m=6;
 Object.assign(hl.style,{top:r.top-m+'px',left:r.left-m+'px',width:r.width+2*m+'px',height:Math.min(r.height,innerHeight*.6)+2*m+'px'});
 const below=r.bottom+m+190<innerHeight||r.top<190;card.style.top=below?Math.min(r.top+Math.min(r.height,innerHeight*.6)+m+10,innerHeight-190)+'px':'auto';card.style.bottom=below?'auto':(innerHeight-r.top+m+10)+'px'}
function show(){const st=TOUR[i];card.innerHTML=`<small>Étape ${i+1} / ${TOUR.length}</small><h3>${st.t}</h3><p>${typeof st.d=='function'?st.d():st.d}</p><div class="tb"><button data-tk="x">Passer</button><span>${i>0?'<button data-tk="p">◂ Précédent</button>':''}<button class="go" data-tk="n">${i==TOUR.length-1?'Terminer ✓':'Suivant ▸'}</button></span></div>`;place();setTimeout(place,350)}
function next(d){i+=d;if(i<0)i=0;if(i>=TOUR.length){end();return}if(!document.querySelector(TOUR[i].s)&&i<TOUR.length-1){next(d||1);return}show()}
function start(){if(ov)return;scrollTo(0,0);ov=document.createElement('div');ov.id='tour';ov.innerHTML='<div class="th"></div><div class="tc"></div>';document.body.appendChild(ov);hl=ov.querySelector('.th');card=ov.querySelector('.tc');addEventListener('resize',place);i=0;show()}
document.addEventListener('click',e=>{const t=e.target.closest('[data-tk],#tourbtn');if(!t)return;if(t.id=='tourbtn'){start();return}const k=t.dataset.tk;if(k=='x')end();else next(k=='p'?-1:1)});
const b=document.createElement('button');b.id='tourbtn';b.className='tourbtn';b.textContent='❓ Visite guidée';const h=document.querySelector('.hero');if(h)h.appendChild(b);
const st=document.createElement('style');st.textContent='#tour{position:fixed;inset:0;z-index:50}#tour .th{position:fixed;border-radius:14px;box-shadow:0 0 0 9999px rgba(8,16,22,.68);border:2px solid #f2b705;transition:all .3s;pointer-events:none}#tour .tc{position:fixed;left:12px;right:12px;max-width:420px;margin:0 auto;background:var(--cd);color:var(--fg);border-radius:16px;padding:14px 16px;box-shadow:0 8px 30px #0006}#tour .tc h3{margin:2px 0 6px;font:700 18px Rockwell,Georgia,serif}#tour .tc p{margin:0 0 10px;font-size:15px}#tour small{color:var(--mu)}#tour .tb{display:flex;justify-content:space-between;align-items:center;gap:8px}#tour .tb button{font:600 14px inherit;font-family:inherit;padding:9px 14px;border-radius:10px;border:1.5px solid var(--ln);background:var(--cd);color:var(--fg)}#tour .tb .go{background:var(--ac);border-color:var(--ac);color:#fff;width:auto;margin:0}#tour .tb span{display:flex;gap:8px}.tourbtn{margin-top:8px;background:transparent;border:1.5px solid rgba(255,255,255,.6);color:#fff;border-radius:10px;padding:7px 12px;font:600 13px inherit;font-family:inherit}';document.head.appendChild(st);
let seen=0;try{seen=localStorage.getItem('mctour')}catch(e){}
if(!seen)setTimeout(start,700);
})();
