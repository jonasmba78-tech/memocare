/* === VUE · Corps 3D (Three.js) : rotation et sélection par raycasting === */
function body3d(){const b=$('#c3');if(!window.THREE){b.textContent='3D indisponible ici.';return}
try{const T=THREE,W=b.clientWidth,H=380,r=new T.WebGLRenderer({antialias:true,alpha:true});r.setSize(W,H);r.setPixelRatio(Math.min(devicePixelRatio,2));b.appendChild(r.domElement);
const s=new T.Scene(),c=new T.PerspectiveCamera(40,W/H,.1,50);c.position.set(0,0,7.2);
s.add(new T.AmbientLight(0xffffff,.8));const d=new T.DirectionalLight(0xffffff,.7);d.position.set(3,5,6);s.add(d);
const g=new T.Group();s.add(g);const ms=[];
const A=(geo,x,y,z,n,col=0xc98f62,rot=0)=>{const m=new T.Mesh(geo,new T.MeshStandardMaterial({color:col}));m.position.set(x,y,z);m.rotation.z=rot;m.userData.n=n;g.add(m);ms.push(m)};
const Sp=q=>new T.SphereGeometry(q,20,16),Cy=(a,b,h)=>new T.CylinderGeometry(a,b,h,16),Bx=(w,h,z)=>new T.BoxGeometry(w,h,z);
A(Sp(.45),0,1.9,0,'Head');A(Sp(.08),0,1.86,.45,'Nose');A(Bx(.22,.05,.05),0,1.68,.43,'Mouth',0xb03a3a);A(Cy(.15,.15,.25),0,1.4,0,'Neck');
A(Bx(1.1,.7,.5),0,.95,0,'Chest',0x2447d6);A(Bx(.95,.6,.45),0,.3,0,'Stomach',0x3a5ce0);A(Bx(1,.3,.46),0,-.15,0,'Hip',0x4a4a6a);A(Bx(1,1.2,.04),0,.75,-.27,'Back',0x1a36a8);
[-1,1].forEach(k=>{A(Sp(.07),k*.16,1.98,.4,'Eye',0x222222);A(Sp(.1),k*.46,1.9,0,'Ear');A(Sp(.2),k*.65,1.2,0,'Shoulder',0x2447d6);A(Cy(.12,.1,.9),k*.8,.65,0,'Arm',0xc98f62,k*.08);A(Sp(.13),k*.86,.1,0,'Hand');A(Cy(.2,.17,.9),k*.28,-.75,0,'Leg',0x4a4a6a);A(Sp(.18),k*.28,-1.2,0,'Knee',0x4a4a6a);A(Cy(.15,.12,.9),k*.28,-1.65,0,'Leg',0x4a4a6a);A(Bx(.3,.14,.55),k*.28,-2.17,.12,'Foot',0x5a3a2a)});
const rc=new T.Raycaster(),v=new T.Vector2(),e=r.domElement;let dn=null,mv=0;
e.onpointerdown=ev=>{dn=ev.clientX;mv=0};
e.onpointermove=ev=>{if(dn!==null){const dx=ev.clientX-dn;mv+=Math.abs(dx);g.rotation.y+=dx*.012;dn=ev.clientX}};
e.onpointerleave=()=>{dn=null};
e.onpointerup=ev=>{dn=null;if(mv<6){const q=e.getBoundingClientRect();v.set((ev.clientX-q.left)/q.width*2-1,-(ev.clientY-q.top)/q.height*2+1);rc.setFromCamera(v,c);const h=rc.intersectObjects(ms)[0];if(h){const n=h.object.userData.n;TP.add(n);if(TP.size>=10)mk('2:corps');ms.forEach(m=>m.material.emissive.setHex(m.userData.n==n?0x886600:0));$('#lb').innerHTML=`<b>${n}</b> · ${FR[n]}`;sp(n)}}};
(function L(){if(!b.isConnected)return;if(dn===null)g.rotation.y+=.005;r.render(s,c);requestAnimationFrame(L)})()}
catch(x){b.textContent='3D indisponible ici.'}}
