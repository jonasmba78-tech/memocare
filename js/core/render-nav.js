/* === RENDU R() (en-tête, onglets, modules, sections) + clics de navigation, cartes, BD === */
/* bannière de photos d'un module : MO[n].ph=[[emoji,légende],…] (voir js/data/banners.js) */
const ban=m=>m.ph?`<div class="ban n${m.ph.length}">${m.ph.map(p=>`<span class="bp" data-l="${p[1]}">${p[0]}</span>`).join('')}</div>`:'';
function R(){clearInterval(tm);clearInterval(rp);crs=+Object.keys(CRS).find(k=>CRS[k].m.includes(mod))||1;const m=MO[mod],ks=Object.keys(m.S);if(!m.S[sec])sec=ks[0];
$('#app').innerHTML=`<div class="tabs c">${Object.keys(CRS).map(k=>`<button data-c="${k}" class="${k==crs?'on':''}">${CRS[k].t}</button>`).join('')}</div><div class="tabs">${CRS[crs].m.map(n=>`<button data-m="${n}" class="${n==mod?'on':''}">${PAID.has(n)&&!lic()?'🔒 ':''}${MO[n].t}</button>`).join('')}</div>${ban(m)}<div class="story">${m.story}</div><div class="tabs s">${ks.map(k=>`<button data-s="${k}" class="${k==sec?'on':''}">${m.S[k]}</button>`).join('')}</div><div id="v"></div>`;if(PAID.has(mod)&&!lic())$('#v').innerHTML=LK();else V[sec]();upd();sv()}
document.addEventListener('click',e=>{const t=e.target;let x;
if(x=t.closest('[data-m]')){mod=+x.dataset.m;R()}
else if(x=t.closest('[data-s]')){sec=x.dataset.s;R()}
else if(x=t.closest('.sp')){sp(x.dataset.t)}
else if(x=t.closest('.fc')){x.classList.toggle('flip');sp(x.dataset.t)}
else if(x=t.closest('.nx')){const c=x.closest('.cm'),d=CB[mod][+c.dataset.i],st=c.querySelector('.strip');let k=+c.dataset.k||0;if(k>=d.p.length){st.innerHTML='';k=0}
const[w,en,fr,fx]=d.p[k],p=document.createElement('div');p.className='pn';
p.innerHTML=`<div class="sc"><span class="ch ${w==0?'on':''}">${d.c[0][0]}<small>${d.c[0][1]}</small></span><span class="fx">${fx}</span><span class="ch ${w==1?'on':''}">${d.c[1][0]}<small>${d.c[1][1]}</small></span></div><div class="bb ${w?'r':'l'}">${en}<button class="sp" data-t="${en}">🔊</button><small>${fr}</small></div>`;
st.appendChild(p);p.scrollIntoView({block:'nearest',behavior:'smooth'});sp(en);k++;c.dataset.k=k;x.textContent=k>=d.p.length?'Rejouer ↺':'Suivant ▸'}});
