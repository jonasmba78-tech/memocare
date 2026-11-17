/* === GLOSSAIRE : mots difficiles soulignés dans toute l'appli, fiche explicative, glossaire complet, défi, mot du jour ===
   Les données sont dans js/data/glossaire.js */
(function(){
const norm=s=>s.normalize('NFD').replace(/[̀-ͯ]/g,'').toLowerCase();
const BY={};GL.forEach(g=>BY[g.k]=g);
const fr=s=>s.replace(/&/g,'&amp;').replace(/</g,'&lt;');
let OK=new Set();try{OK=new Set(JSON.parse(localStorage.getItem('mcgl')||'[]'))}catch(e){}
const save=()=>{try{localStorage.setItem('mcgl',JSON.stringify([...OK]))}catch(e){}badge()};
function badge(){const b=$('#gbadge');if(b)b.textContent=OK.size+'/'+GL.length;const h=$('#gcnt');if(h)h.textContent=OK.size+'/'+GL.length;const c=$('#gcount');if(c)c.textContent=OK.size+' / '+GL.length+' mots compris'}
const buzz=n=>{try{navigator.vibrate&&navigator.vibrate(n)}catch(e){}};
function say(t){try{VOX.say([{t,d:'fr'}])}catch(e){}}

/* ---------- repérage automatique des mots dans les écrans ---------- */
const alts=GL.map(g=>g.re).sort((a,b)=>b.length-a.length).join('|');
const RX=new RegExp('(^|[^\\p{L}\\p{N}])('+alts+')(?![\\p{L}\\p{N}])','giu');
const own=GL.map(g=>[g,new RegExp('^(?:'+g.re+')$','iu')]);
const find=s=>{for(const[g,r]of own)if(r.test(s))return g;return null};
const SKIP='script,style,textarea,input,button,summary,.tabs,.hero,#dock,.gl,.gsheet,.gpanel,.gstrip,[data-qa],.bp,.f,.ch,.fx,.re,.lv,.xh,#tour,#motjour,.lock,.ban,.node';
const BLK='.xd,.fc,.cm,.cs,.rl,.sg,.mt,.story,.gout,.pn';
function mark(root){
 const seen=new Map(),w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT,{acceptNode:n=>{if(!n.nodeValue||n.nodeValue.trim().length<3)return 2;const p=n.parentElement;return p&&!p.closest(SKIP)?1:2}}),L=[];
 let n;while(n=w.nextNode())L.push(n);
 L.forEach(n=>{const t=n.nodeValue;RX.lastIndex=0;let m,last=0,f=null;const box=n.parentElement.closest(BLK)||root;
  while(m=RX.exec(t)){const g=find(m[2]);if(!g)continue;let s=seen.get(box);if(!s)seen.set(box,s=new Set());if(s.has(g.k))continue;s.add(g.k);
   f=f||document.createDocumentFragment();const st=m.index+m[1].length;f.append(t.slice(last,st));
   const sp=document.createElement('span');sp.className='gl'+(OK.has(g.k)?' ok':'');sp.dataset.g=g.k;sp.tabIndex=0;sp.setAttribute('role','button');sp.dataset.w=g.w;sp.textContent=m[2];f.append(sp);last=st+m[2].length}
  if(f){f.append(t.slice(last));n.replaceWith(f)}})}
function strip(){const v=$('#v');if(!v)return;const old=v.querySelector(':scope>.gstrip');if(old)old.remove();
 if(typeof sec!=='undefined'&&(sec=='jeux'||sec=='jeux2'))return;
 const ks=[...new Set([...v.querySelectorAll('.gl')].map(x=>x.dataset.g))];if(!ks.length)return;
 const d=document.createElement('div');d.className='gstrip';
 d.innerHTML='<span class="gs-t">🧩 Mots difficiles ici</span><div class="gs-c">'+ks.map(k=>`<button data-gk="${k}" class="${OK.has(k)?'ok':''}">${BY[k].e} ${fr(BY[k].t.split(' (')[0])}</button>`).join('')+'</div>';
 v.prepend(d)}
let busy=false;
function scan(){if(busy)return;busy=true;requestAnimationFrame(()=>{const a=$('#app');if(a){obs.disconnect();try{const s=a.querySelector('.story'),v=$('#v');if(s)mark(s);if(v){mark(v);strip()}}catch(e){console.error(e)}obs.observe(a,{childList:true,subtree:true})}busy=false})}
const obs=new MutationObserver(scan);obs.observe($('#app'),{childList:true,subtree:true});scan();

/* ---------- fiche explicative (bottom sheet) ---------- */
const sh=document.createElement('div');sh.className='gsheet';sh.id='gsheet';sh.hidden=true;sh.innerHTML='<div class="gbk" data-gx></div><div class="gcard" role="dialog" aria-modal="true"><div class="ghandle" id="ghandle"></div><div id="gbody"></div></div>';document.body.appendChild(sh);
let cur=null;
function openG(k){const g=BY[k];if(!g)return;cur=k;const c=GCAT[g.c];
 $('#gbody').innerHTML=`<div class="gh" style="--gc:${c[2]}"><div class="ge">${g.e}</div><div><small class="gcat">${c[0]} ${c[1]}</small><h3>${fr(g.t)}</h3><button class="gsay" data-gsay>🔊 <span>${fr(g.p)}</span></button></div><button class="gclose" data-gx aria-label="Fermer">✕</button></div>
 ${g.u?'<div class="gurg">🚨 <b>Signe d’urgence</b> : agis vite, ne reste pas seul(e) avec ce signe.</div>':''}
 <div class="gw"><small>En deux mots</small><b>${fr(g.w)}</b></div>
 <div class="gs"><h5>🗣️ Expliqué simplement</h5><p>${fr(g.d)}</p></div>
 <div class="gs"><h5>🌍 Exemple concret</h5><p>${fr(g.x)}</p></div>
 <div class="gs ga"><h5>✅ Ce que je fais</h5><p>${fr(g.a)}</p></div>
 ${g.r.length?'<div class="gs"><h5>🔗 À lire aussi</h5><div class="grel">'+g.r.filter(r=>BY[r]).map(r=>`<button data-gk="${r}">${BY[r].e} ${fr(BY[r].t.split(' (')[0])}</button>`).join('')+'</div></div>':''}
 <div class="gfoot"><button class="go gok${OK.has(k)?' done':''}" data-gok>${OK.has(k)?'✓ Compris':'J’ai compris ✓'}</button><button class="gall" data-gall>📚 Tout le glossaire</button></div>`;
 sh.hidden=false;requestAnimationFrame(()=>sh.classList.add('on'));$('.gcard',sh).scrollTop=0;buzz(8)}
function closeG(){sh.classList.remove('on');setTimeout(()=>{if(!sh.classList.contains('on'))sh.hidden=true},260)}
/* glisser vers le bas pour fermer */
(function(){const c=$('.gcard',sh);let y0=null,dy=0;const st=e=>{if(c.scrollTop>0&&e.target.id!='ghandle')return;y0=e.touches[0].clientY;dy=0},mv=e=>{if(y0==null)return;dy=Math.max(0,e.touches[0].clientY-y0);c.style.transform=`translateY(${dy}px)`;c.style.transition='none'},en=()=>{if(y0==null)return;c.style.transition='';c.style.transform='';if(dy>90)closeG();y0=null};c.addEventListener('touchstart',st,{passive:true});c.addEventListener('touchmove',mv,{passive:true});c.addEventListener('touchend',en)})();

/* ---------- glossaire complet ---------- */
const pn=document.createElement('div');pn.className='gpanel';pn.id='gpanel';pn.hidden=true;document.body.appendChild(pn);
let cat='all',q='',mode='list';
function panel(){
 if(mode=='quiz')return;
 const Lq=norm(q),L=GL.filter(g=>(cat=='all'||g.c==cat)&&(!Lq||norm(g.t+' '+g.w+' '+g.d).includes(Lq))).sort((a,b)=>a.t.localeCompare(b.t,'fr'));
 let h='',last='';L.forEach(g=>{const l=norm(g.t)[0].toUpperCase();if(l!=last){h+=`<div class="gletter">${l}</div>`;last=l}const c=GCAT[g.c];h+=`<button class="grow${OK.has(g.k)?' ok':''}" data-gk="${g.k}" style="--gc:${c[2]}"><i>${g.e}</i><span><b>${fr(g.t)}</b><small>${fr(g.w)}</small></span>${g.u?'<em>🚨</em>':''}<u>${OK.has(g.k)?'✓':'›'}</u></button>`});
 $('#glist').innerHTML=h||'<p class="mu" style="text-align:center;padding:30px">Aucun mot trouvé. Essaie une autre orthographe.</p>'}
function openPanel(){mode='list';pn.hidden=false;
 pn.innerHTML=`<div class="gptop"><button class="gback" data-gpx aria-label="Retour">←</button><div><h2>📚 Glossaire</h2><small id="gcount"></small></div><button class="gquiz" data-gq>🎯 Défi</button></div>
 <div class="gsearch"><span>🔍</span><input id="gq" type="search" placeholder="Chercher un mot (ex. escarre)…" autocomplete="off" value="${fr(q)}"></div>
 <div class="gchips"><button data-gc="all" class="${cat=='all'?'on':''}">Tous</button>${Object.keys(GCAT).map(k=>`<button data-gc="${k}" class="${cat==k?'on':''}">${GCAT[k][0]} ${GCAT[k][1]}</button>`).join('')}</div><div id="glist" class="glist"></div>`;
 requestAnimationFrame(()=>pn.classList.add('on'));badge();panel()}
function closePanel(){pn.classList.remove('on');setTimeout(()=>{if(!pn.classList.contains('on'))pn.hidden=true},260)}

/* ---------- défi : retrouve le sens du mot ---------- */
let Q=null;
const sh6=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
function startQuiz(){mode='quiz';const pool=sh6(GL.filter(g=>!OK.has(g.k))).concat(sh6(GL.filter(g=>OK.has(g.k)))).slice(0,7);Q={L:pool,i:0,s:0};qnext()}
function qnext(){if(Q.i>=Q.L.length){const bonus=Q.s==Q.L.length;pn.innerHTML=`<div class="gptop"><button class="gback" data-gpx>←</button><div><h2>🎯 Défi terminé</h2></div></div><div class="gend"><div class="gtrophy">${bonus?'🏆':Q.s>=Q.L.length/2?'👏🏾':'💪🏾'}</div><h3>${Q.s} / ${Q.L.length}</h3><p>${bonus?'Sans faute ! Tu parles le langage du métier.':'Chaque mot compris te rend plus à l’aise sur le terrain.'}</p><button class="go" data-gq>Rejouer ↺</button><button class="gall" data-glist>Voir le glossaire</button></div>`;if(bonus&&window.confetti)confetti();return}
 const g=Q.L[Q.i],o=sh6([g].concat(sh6(GL.filter(x=>x.k!=g.k&&x.w!=g.w)).slice(0,3)));Q.g=g;
 pn.innerHTML=`<div class="gptop"><button class="gback" data-glist>←</button><div><h2>🎯 Défi des mots</h2><small>Question ${Q.i+1} / ${Q.L.length}</small></div></div><div class="qbar"><i style="width:${Q.i/Q.L.length*100}%"></i></div>
 <div class="gqc"><div class="gqe">${g.e}</div><small>Que veut dire…</small><h3>${fr(g.t.split(' (')[0])}</h3><button class="gsay" data-gsay2>🔊 <span>${fr(g.p)}</span></button></div>
 <div class="gopts">${o.map(x=>`<button class="node gopt" data-go="${x.k}"><span><b>${fr(x.w)}</b></span></button>`).join('')}</div><div id="gfb"></div>`}
function answer(k,btn){if(Q.done)return;Q.done=1;const g=Q.g,ok=k==g.k;if(ok){Q.s++;OK.add(g.k);save();buzz(15);if(window.confetti){const r=btn.getBoundingClientRect();confetti(r.left+r.width/2,r.top)}}else buzz([30,40,30]);
 document.querySelectorAll('.gopt').forEach(b=>{b.disabled=true;if(b.dataset.go==g.k)b.classList.add('good');else if(b==btn)b.classList.add('bad')});
 $('#gfb').innerHTML=`<div class="rl gres ${ok?'g':'b'}"><b>${ok?'✅ Bravo !':'❌ Pas tout à fait.'}</b> <b>${fr(g.t.split(' (')[0])}</b> = ${fr(g.w.toLowerCase())}.<p>${fr(g.d)}</p></div><button class="go" data-gnext>${Q.i+1>=Q.L.length?'Voir mon score':'Question suivante ▸'}</button>`;Q.done=0;Q.ans=1}

/* ---------- événements (phase de capture : prioritaires sur les cartes et accordéons) ---------- */
document.addEventListener('click',e=>{const t=e.target;let x;
 if(x=t.closest('.gl')){e.preventDefault();e.stopPropagation();openG(x.dataset.g);return}
 if(x=t.closest('[data-gk]')){e.stopPropagation();openG(x.dataset.gk);return}
 if(t.closest('[data-gx]')){closeG();return}
 if(t.closest('[data-gsay]')){say(BY[cur].t+'. '+BY[cur].w+'. '+BY[cur].d);return}
 if(t.closest('[data-gsay2]')){say(Q.g.t);return}
 if(t.closest('[data-gok]')){const b=t.closest('[data-gok]');if(!OK.has(cur)){OK.add(cur);save();buzz(12);if(window.confetti){const r=b.getBoundingClientRect();confetti(r.left+r.width/2,r.top)}}b.classList.add('done');b.textContent='✓ Compris';scan();setTimeout(closeG,450);return}
 if(t.closest('[data-gall]')||t.closest('#dockgl')||t.closest('#chgl')||t.closest('#motjour [data-gopen]')){e.stopPropagation();closeG();mode='list';if(pn.hidden)openPanel();else openPanel();return}
 if(t.closest('[data-gpx]')){closePanel();return}
 if(t.closest('[data-glist]')){mode='list';openPanel();return}
 if(t.closest('[data-gq]')){startQuiz();return}
 if(x=t.closest('[data-gc]')){cat=x.dataset.gc;document.querySelectorAll('[data-gc]').forEach(b=>b.classList.toggle('on',b==x));panel();return}
 if(x=t.closest('[data-go]')){answer(x.dataset.go,x);return}
 if(t.closest('[data-gnext]')){Q.i++;qnext();return}
},true);
document.addEventListener('input',e=>{if(e.target.id=='gq'){q=e.target.value;panel()}});
document.addEventListener('keydown',e=>{if(e.key=='Escape'){if(!sh.hidden)closeG();else if(!pn.hidden)closePanel()}if((e.key=='Enter'||e.key==' ')&&e.target.classList&&e.target.classList.contains('gl')){e.preventDefault();openG(e.target.dataset.g)}});

/* ---------- petite bulle au survol (ordinateur) ---------- */
const tip=document.createElement('div');tip.className='gtip';document.body.appendChild(tip);
document.addEventListener('mouseover',e=>{const x=e.target.closest&&e.target.closest('.gl');if(!x||!matchMedia('(hover:hover)').matches){tip.classList.remove('on');return}tip.textContent='💡 '+x.dataset.w+' · touche pour en savoir plus';const r=x.getBoundingClientRect();tip.classList.add('on');const w=tip.offsetWidth;tip.style.left=Math.max(8,Math.min(innerWidth-w-8,r.left+r.width/2-w/2))+'px';tip.style.top=(r.top-tip.offsetHeight-8<8?r.bottom+8:r.top-tip.offsetHeight-8)+'px'});
document.addEventListener('mouseout',e=>{if(e.target.closest&&e.target.closest('.gl'))tip.classList.remove('on')});

/* ---------- mot du jour ---------- */
function motJour(){const el=$('#motjour');if(!el)return;const d=new Date(),n=Math.floor((d-new Date(d.getFullYear(),0,0))/864e5),g=GL[(n*7+d.getFullYear())%GL.length],c=GCAT[g.c];
 el.innerHTML=`<div class="mj" style="--gc:${c[2]}"><div class="mje">${g.e}</div><div class="mjt"><small>💡 Mot du jour</small><b>${fr(g.t.split(' (')[0])}</b><span>${fr(g.w)}</span></div><button data-gk="${g.k}">Comprendre</button></div><button class="mjall" data-gopen>📚 Voir les ${GL.length} mots du glossaire ›</button>`}
motJour();badge();
window.GLOSS={open:openG,panel:openPanel,rescan:scan};
})();
