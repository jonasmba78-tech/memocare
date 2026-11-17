/* === VUE · Corps 3D (Three.js) : rotation, zoom par zone, mode Extérieur / Intérieur, sélection par raycasting ===
   Pour ajouter une partie : add(géométrie, x, y, z, 'Clé anglaise', couleur, {i:1 si interne, r:[rx,ry,rz], s:[sx,sy,sz]})
   puis la ligne correspondante dans js/data/en-body.js (français + phrase d’exemple). */
const BODYFOC={all:[0,7.2,'🧍🏾 Corps entier'],head:[1.85,3.1,'🙂 Tête'],torso:[.65,4.8,'🫁 Tronc'],hands:[.05,3.4,'✋🏾 Mains'],legs:[-1.35,5.2,'🦵🏾 Jambes'],feet:[-2.1,3.4,'🦶🏾 Pieds']};
let BODYMODE='ext';
function body3d(){const b=$('#c3');if(!window.THREE){b.textContent='3D indisponible ici.';return}
try{const T=THREE,W=b.clientWidth||340,H=380,r=new T.WebGLRenderer({antialias:true,alpha:true});r.setSize(W,H);r.setPixelRatio(Math.min(devicePixelRatio,2));b.appendChild(r.domElement);
const s=new T.Scene(),c=new T.PerspectiveCamera(40,W/H,.1,50);c.position.set(0,0,7.2);
s.add(new T.AmbientLight(0xffffff,.85));const d=new T.DirectionalLight(0xffffff,.7);d.position.set(3,5,6);s.add(d);
const g=new T.Group();s.add(g);const ms=[];
const add=(geo,x,y,z,n,col,o={})=>{const m=new T.Mesh(geo,new T.MeshStandardMaterial({color:col,transparent:true,roughness:.75}));m.position.set(x,y,z);if(o.r)m.rotation.set(o.r[0]||0,o.r[1]||0,o.r[2]||0);if(o.s)m.scale.set(o.s[0],o.s[1],o.s[2]);m.userData={n,i:!!o.i};g.add(m);ms.push(m);return m};
const Sp=q=>new T.SphereGeometry(q,20,16),Cy=(a,b2,h)=>new T.CylinderGeometry(a,b2,h,16),Bx=(w,h,z)=>new T.BoxGeometry(w,h,z);
const SK=0xc98f62,SK2=0xd09a6c,SK3=0xb9814f,SH=0x4a4a6a,PK=0xe58fb0,BONE=0xece6d8;
/* ---------- EXTÉRIEUR : tête et visage ---------- */
add(Sp(.45),0,1.9,0,'Head',SK);
add(new T.SphereGeometry(.47,24,12,0,Math.PI*2,0,Math.PI*.33),0,1.9,-.02,'Hair',0x2b1b12);
add(Sp(.13),0,2.06,.34,'Forehead',SK2);
[-1,1].forEach(k=>{add(Bx(.16,.035,.05),k*.16,2.04,.41,'Eyebrow',0x2b1b12,{r:[0,0,k*-.12]});
add(Sp(.075),k*.16,1.97,.4,'Eye',0xf5f5f5);add(Sp(.04),k*.16,1.97,.46,'Eye',0x222222);
add(Sp(.1),k*.27,1.8,.33,'Cheek',0xd18a68);
add(Sp(.1),k*.46,1.9,0,'Ear',SK3,{s:[.5,1,.8]})});
add(Sp(.08),0,1.86,.45,'Nose',SK3);
add(Bx(.3,.13,.03),0,1.68,.41,'Mouth',0x7a2a2a);add(Bx(.24,.06,.05),0,1.68,.425,'Lips',0xb03a3a);
add(Sp(.1),0,1.53,.3,'Chin',SK2);
add(Cy(.15,.15,.25),0,1.4,0,'Neck',SK);
/* ---------- EXTÉRIEUR : tronc ---------- */
add(Bx(1.1,.7,.5),0,.95,0,'Chest',SK);add(Bx(.95,.6,.45),0,.3,0,'Belly',SK2);add(Sp(.035),0,.25,.235,'Navel',0x7a4a2a);
add(Bx(1,.7,.04),0,.95,-.27,'Back',SK3);add(Bx(.9,.55,.04),0,.32,-.25,'Lower back',SK);
add(Bx(1,.3,.46),0,-.15,0,'Hip',SH);[-1,1].forEach(k=>add(Sp(.2),k*.2,-.2,-.17,'Buttocks',SH));
/* ---------- EXTÉRIEUR : bras et mains ---------- */
[-1,1].forEach(k=>{add(Sp(.2),k*.65,1.2,0,'Shoulder',SK);add(Sp(.09),k*.62,.97,.12,'Armpit',0x8a5a36);
add(Cy(.12,.1,.5),k*.8,.85,0,'Arm',SK2);add(Sp(.1),k*.8,.58,0,'Elbow',SK3);add(Cy(.1,.075,.5),k*.8,.31,0,'Forearm',SK);add(Sp(.075),k*.8,.05,0,'Wrist',SK3);
add(Sp(.11),k*.8,-.07,0,'Hand',SK2,{s:[1,1.25,.6]});add(Cy(.085,.085,.03),k*.72,-.07,0,'Palm',0xd9a97f,{r:[0,0,Math.PI/2]});
add(Cy(.022,.02,.12),k*.72,-.15,.04,'Thumb',SK,{r:[0,0,k*.35]});
[-.045,-.015,.015,.045].forEach(dx=>{add(Cy(.018,.016,.16),k*.8+dx,-.27,0,'Finger',SK);add(Bx(.028,.03,.016),k*.8+dx,-.355,.012,'Nail',0xf0d9c8)});
/* ---------- EXTÉRIEUR : jambes et pieds ---------- */
add(Cy(.2,.17,.9),k*.28,-.75,0,'Thigh',SH);add(Sp(.18),k*.28,-1.2,0,'Knee',SK);add(Cy(.15,.12,.9),k*.28,-1.65,0,'Shin',SK2);
add(Sp(.14),k*.28,-1.5,-.1,'Calf',SK3,{s:[1,1.5,1]});add(Sp(.1),k*.28,-2.1,0,'Ankle',SK);
add(Bx(.3,.14,.55),k*.28,-2.2,.12,'Foot',SK2);add(Sp(.1),k*.28,-2.2,-.17,'Heel',SK3);
[-.1,-.05,0,.05,.1].forEach(dx=>add(Sp(.045),k*.28+dx,-2.2,.42,'Toe',SK))});
/* ---------- INTÉRIEUR (visible seulement en mode « Intérieur ») ---------- */
const I={i:1};
add(new T.SphereGeometry(.43,24,12,Math.PI,Math.PI,0,Math.PI*.75),0,1.9,0,'Skull',BONE,I);
add(Sp(.33),0,1.95,0,'Brain',PK,{i:1,s:[1,.9,1.05]});
add(Bx(.22,.05,.04),0,1.7,.4,'Teeth',0xffffff,I);add(Bx(.14,.03,.05),0,1.655,.4,'Tongue',0xe0757a,I);
add(Cy(.07,.07,.2),0,1.52,.03,'Throat',0xd98c8c,I);add(Cy(.05,.05,.55),0,1.2,.04,'Windpipe',0xbcd4f0,I);
[-1,1].forEach(k=>{add(Sp(.3),k*.3,.98,-.02,'Lungs',0xf4a6a6,{i:1,s:[.8,1.2,.7]});
add(Sp(.09),k*.2,.42,-.1,'Kidneys',0x7a2a3a,{i:1,s:[.8,1.3,.8]});
add(Sp(.1),k*.8,.88,.05,'Muscle',0xb03030,{i:1,s:[.9,1.8,.9]});
add(Cy(.05,.05,.9),k*.28,-.75,0,'Femur',BONE,I);add(Sp(.07),k*.28,-1.2,.14,'Kneecap',BONE,{i:1,s:[1,1,.6]})});
add(Sp(.16),.14,.88,.1,'Heart',0xc0392b,{i:1,s:[1,1.15,.9]});
[1.22,1.12,1.02,.92,.82,.72].forEach(y=>add(new T.TorusGeometry(.4,.016,6,28),0,y,0,'Ribs',BONE,{i:1,r:[Math.PI/2,0,0],s:[1.3,.62,1]}));
add(Cy(.05,.05,1.75),0,.55,-.18,'Spine',BONE,I);for(let y=-.25;y<1.4;y+=.16)add(Cy(.085,.085,.07),0,y,-.18,'Spine',BONE,I);
add(Sp(.22),-.24,.5,.1,'Liver',0x8e3b2a,{i:1,s:[1.4,.7,.8]});add(Sp(.17),.2,.52,.1,'Stomach',0xe08a6a,{i:1,s:[1,.9,.8]});
add(new T.TorusKnotGeometry(.1,.045,64,8,2,3),0,.12,.1,'Intestines',0xe6a38c,{i:1,s:[1.1,1.1,1.1]});
add(Sp(.1),0,-.12,.1,'Bladder',0xe9c85a,I);add(new T.TorusGeometry(.33,.07,8,24),0,-.12,-.02,'Pelvis',BONE,{i:1,r:[Math.PI/2,0,0],s:[1.1,.7,1]});
/* ---------- affichage selon le mode ---------- */
let sel=null;const setMode=md=>{BODYMODE=md;ms.forEach(m=>{const mat=m.material;if(m.userData.i){m.visible=md=='int'}else{mat.opacity=md=='int'?.1:1;mat.depthWrite=md!='int'}})};setMode(BODYMODE);
const glow=n=>{sel=n;ms.forEach(m=>m.material.emissive.setHex(m.userData.n==n?0x886600:0))};
const rc=new T.Raycaster(),v=new T.Vector2(),e=r.domElement;let dn=null,mv=0,fy=0,fz=7.2,ty=0,tz=7.2;
const tabs=document.querySelectorAll('[data-bm]'),foc=document.querySelectorAll('[data-bf]');
const paint=()=>{tabs.forEach(t=>t.classList.toggle('on',t.dataset.bm==BODYMODE));foc.forEach(t=>t.classList.toggle('on',t.dataset.bf==cf))};let cf='all';
tabs.forEach(t=>t.onclick=()=>{setMode(t.dataset.bm);glow(null);$('#lb').textContent=BODYMODE=='int'?'Mode intérieur : touche un organe ou un os.':'Mode extérieur : touche une partie du corps.';paint()});
foc.forEach(t=>t.onclick=()=>{cf=t.dataset.bf;ty=BODYFOC[cf][0];tz=BODYFOC[cf][1];paint()});paint();
e.onpointerdown=ev=>{dn=ev.clientX;mv=0};
e.onpointermove=ev=>{if(dn!==null){const dx=ev.clientX-dn;mv+=Math.abs(dx);g.rotation.y+=dx*.012;dn=ev.clientX}};
e.onpointerleave=()=>{dn=null};
e.onpointerup=ev=>{dn=null;if(mv<6){const q=e.getBoundingClientRect();v.set((ev.clientX-q.left)/q.width*2-1,-(ev.clientY-q.top)/q.height*2+1);rc.setFromCamera(v,c);const h=rc.intersectObjects(ms.filter(m=>m.visible&&(BODYMODE=='int'?m.userData.i:!m.userData.i)))[0];if(h){const n=h.object.userData.n;TP.add(n);if(TP.size>=10)mk('2:corps');glow(n);$('#lb').innerHTML=`<b>${n}</b> · ${FR[n]||''}<br><small>${BX[n]||''}</small>`;sp(BX[n]?n+'. '+BX[n]:n,'en')}}};
(function L(){if(!b.isConnected)return;if(dn===null&&cf=='all')g.rotation.y+=.005;fy+=(ty-fy)*.12;fz+=(tz-fz)*.12;c.position.set(0,fy,fz);c.lookAt(0,fy,0);r.render(s,c);requestAnimationFrame(L)})()}
catch(x){b.textContent='3D indisponible ici.'}}
