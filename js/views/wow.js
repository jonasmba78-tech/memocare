/* === EXPÉRIENCE « WOW » : thème clair/sombre, anneau de progression, niveaux, confettis, barre de navigation, animations ===
   Se charge en dernier. Ne contient aucun contenu de cours. */
(function(){
const buzz=n=>{try{navigator.vibrate&&navigator.vibrate(n)}catch(e){}};
/* ---------- thème ---------- */
const root=document.documentElement;let th=null;try{th=localStorage.getItem('mcth')}catch(e){}
const dark=()=>root.dataset.theme?root.dataset.theme=='dark':matchMedia('(prefers-color-scheme:dark)').matches;
function applyTheme(){if(th)root.dataset.theme=th;const ic=dark()?'☀️':'🌙';document.querySelectorAll('[data-thm] i').forEach(i=>i.textContent=ic);const m=document.querySelector('meta[name=theme-color]');if(m)m.content=dark()?'#101a1e':'#2447d6'}
document.addEventListener('click',e=>{if(!e.target.closest('[data-thm]'))return;th=dark()?'light':'dark';try{localStorage.setItem('mcth',th)}catch(_){}applyTheme();buzz(8)});
applyTheme();

/* ---------- confettis ---------- */
const cv=document.createElement('canvas');cv.id='cf';document.body.appendChild(cv);const cx=cv.getContext('2d');let P=[],run=false;
const rs=()=>{cv.width=innerWidth*devicePixelRatio;cv.height=innerHeight*devicePixelRatio};rs();addEventListener('resize',rs);
const COL=['#f2b705','#2447d6','#0f8f86','#e8524a','#8e44ad','#ffffff'];
window.confetti=function(x,y,n){if(matchMedia('(prefers-reduced-motion:reduce)').matches)return;x=(x==null?innerWidth/2:x)*devicePixelRatio;y=(y==null?innerHeight*.4:y)*devicePixelRatio;n=n||70;
 for(let i=0;i<n;i++){const a=Math.random()*Math.PI*2,s=(4+Math.random()*9)*devicePixelRatio;P.push({x,y,vx:Math.cos(a)*s,vy:Math.sin(a)*s-6*devicePixelRatio,w:(5+Math.random()*6)*devicePixelRatio,h:(3+Math.random()*5)*devicePixelRatio,r:Math.random()*6,vr:(Math.random()-.5)*.4,c:COL[i%COL.length],l:1})}
 if(!run){run=true;requestAnimationFrame(tick)}};
function tick(){cx.clearRect(0,0,cv.width,cv.height);P=P.filter(p=>p.l>0&&p.y<cv.height+40);P.forEach(p=>{p.vy+=.35*devicePixelRatio;p.vx*=.99;p.x+=p.vx;p.y+=p.vy;p.r+=p.vr;p.l-=.011;cx.save();cx.globalAlpha=Math.max(0,p.l);cx.translate(p.x,p.y);cx.rotate(p.r);cx.fillStyle=p.c;cx.fillRect(-p.w/2,-p.h/2,p.w,p.h);cx.restore()});if(P.length)requestAnimationFrame(tick);else{run=false;cx.clearRect(0,0,cv.width,cv.height)}}

/* ---------- anneau de progression + niveaux ---------- */
const LV=[[0,'🌱','Découverte'],[10,'📘','Apprenti(e)'],[30,'🩺','Praticien(ne)'],[60,'⭐','Confirmé(e)'],[90,'🏅','Expert(e)']];
const CIRC=2*Math.PI*34;let lastQ=-1;
function ring(){const pb=$('#pb');if(!pb)return;const q=Math.round(parseFloat(pb.style.width)||0);const rg=$('#rg');if(rg){rg.style.strokeDasharray=CIRC;rg.style.strokeDashoffset=CIRC*(1-q/100)}const rp=$('#rp');if(rp)rp.textContent=q+'%';
 const l=LV.filter(x=>q>=x[0]).pop(),c=$('#lvl');if(c)c.textContent=l[1]+' '+l[2];
 if(lastQ>=0&&q>lastQ&&LV.some(x=>lastQ<x[0]&&q>=x[0])){confetti(innerWidth/2,innerHeight*.3,140);toast('🎉 Nouveau niveau : '+l[2]+' !')}lastQ=q}
const _upd=upd;upd=function(){_upd.apply(this,arguments);ring()};
function toast(t){const e=$('#ts');e.textContent=t;e.classList.add('on');clearTimeout(toast.t);toast.t=setTimeout(()=>e.classList.remove('on'),2600)}
const _mk=mk;mk=function(k){const nw=!P[k];_mk.apply(this,arguments);if(nw){confetti(innerWidth/2,innerHeight-120,45);buzz(20)}};

/* ---------- rendu : animation d'arrivée + onglet actif visible ---------- */
const _R=R;R=function(){_R.apply(this,arguments);const v=$('#v');v.classList.remove('fresh');void v.offsetWidth;v.classList.add('fresh');clearTimeout(R.t);R.t=setTimeout(()=>v.classList.remove('fresh'),1100);
 document.querySelectorAll('#app .tabs').forEach(t=>{const b=t.querySelector('button.on');if(b&&t.scrollWidth>t.clientWidth)t.scrollLeft=b.offsetLeft-(t.clientWidth-b.offsetWidth)/2})};
/* section : remonter doucement en haut du contenu */
document.addEventListener('click',e=>{const b=e.target.closest('#app [data-s],#app [data-m],#app [data-c]');if(!b)return;setTimeout(()=>{const t=$('#app .tabs.s');if(t){const y=t.getBoundingClientRect().top+scrollY-8;if(scrollY>y)scrollTo({top:y,behavior:'smooth'})}},30)});

/* ---------- quiz : barre de progression + retour visuel ---------- */
const _qs=qshow;qshow=function(){_qs.apply(this,arguments);if(qs.i<QZ[mod].length){const v=$('#v');v.insertAdjacentHTML('afterbegin',`<div class="qbar"><i style="width:${qs.i/QZ[mod].length*100}%"></i></div>`)}else if(qs.s==QZ[mod].length)confetti(innerWidth/2,innerHeight*.3,120)};
document.addEventListener('click',e=>{const b=e.target.closest('[data-qa]');if(!b||b.dataset.w)return;const L=QZ[mod],q=L[qs.i];if(q==null)return;document.querySelectorAll('[data-qa]').forEach(x=>x.dataset.w=1);const ok=+b.dataset.qa==q.a;b.classList.add(ok?'good':'bad');if(ok){const r=b.getBoundingClientRect();confetti(r.left+r.width/2,r.top,28);buzz(15)}else buzz([25,40,25])});

/* ---------- barre de navigation du bas ---------- */
document.addEventListener('click',e=>{const x=e.target.closest('[data-dk]');if(!x)return;buzz(6);const k=x.dataset.dk;if(k=='home')scrollTo({top:0,behavior:'smooth'});else if(k=='go')$('#go').click()});
let lastY=0;addEventListener('scroll',()=>{const d=$('#dock');if(!d)return;d.classList.toggle('lo',scrollY>lastY+6&&scrollY>300);if(scrollY<lastY-6||scrollY<300)d.classList.remove('lo');lastY=scrollY},{passive:true});
/* ---------- révélation douce des cartes au défilement ---------- */
if('IntersectionObserver' in window){const io=new IntersectionObserver(es=>es.forEach(en=>{if(en.isIntersecting){en.target.classList.add('in-v');io.unobserve(en.target)}}),{rootMargin:'0px 0px -6% 0px'});
 const mo=new MutationObserver(()=>{document.querySelectorAll('#v .cm:not(.rv),#v .rl:not(.rv),#v .xd:not(.rv),#v .mt:not(.rv),#v .sg:not(.rv)').forEach(el=>{el.classList.add('rv');io.observe(el)})});mo.observe($('#app'),{childList:true,subtree:true})}
ring();
})();
