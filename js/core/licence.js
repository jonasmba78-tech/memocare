/* === LICENCE (mode payant) : état, écran verrouillé LK(), saisie du code, upd() ===
   Calcul des codes : js/core/licence-core.js · réglages : config/licence.js · textes : js/data/textes.js */
const rempl=(s,o)=>s.replace(/\{(\w+)\}/g,(_,k)=>o[k]);
/* jour courant ; on mémorise le jour le plus récent vu (P.ld) pour empêcher de « reculer » l'horloge */
const aujourdhui=()=>{const j=Math.max(jourDe(new Date()),P.ld||0);if(P.ld!==j){P.ld=j;try{sv()}catch(e){}}return j};
function etat(){
 if(!P.ln||!P.lc)return{actif:false,statut:'aucune'};
 const r=lireCode(P.ln,P.lc);if(!r.ok)return{actif:false,statut:'invalide'};
 const j=aujourdhui();
 if(j<r.debut)return{...r,actif:false,statut:'avenir'};
 if(j>=r.fin)return{...r,actif:false,statut:'expiree'};
 return{...r,actif:true,statut:'ok',restant:r.fin-j}}
const lic=()=>etat().actif;
const LK=()=>{const e=etat();return`<div class="lock"><div class="lk">🔒</div><h3>${TXT.verrouTitre}</h3><p>${TXT.verrouTexte}</p>${e.statut=='expiree'?`<p class="rl"><b>${rempl(TXT.verrouExpire,{date:fmtJour(e.fin-1)})}</b></p>`:''}<input id="ln" placeholder="Nom complet" autocomplete="name" value="${(P.ln||'').replace(/"/g,'&quot;')}"><input id="lc" placeholder="CARE-XXXX-XXX-XXX" autocapitalize="characters"><button class="go" id="lb2">Débloquer</button><p class="mu" id="le"></p></div>`};
document.addEventListener('click',e=>{if(!e.target.closest('#lb2'))return;const n=$('#ln').value.trim(),c=$('#lc').value.trim().toUpperCase(),r=lireCode(n,c),j=aujourdhui();let m='';
 if(!r.ok)m=TXT.codeIncorrect;else if(j<r.debut)m=rempl(TXT.codeAvenir,{date:fmtJour(r.debut)});else if(j>=r.fin)m=rempl(TXT.codeExpire,{date:fmtJour(r.fin-1)});
 if(m){$('#le').textContent=m;return}
 P.ln=n;P.lc=c;sv();R();const t=$('#ts');t.textContent=TXT.modulesDebloques;t.classList.add('on');setTimeout(()=>t.classList.remove('on'),2200)});
const libelleLicence=()=>{const e=etat();
 if(e.actif)return e.ancien?rempl(TXT.licenceSansFin,{nom:P.ln}):rempl(TXT.licence,{nom:P.ln,date:fmtJour(e.fin-1)})+(e.restant<=LICENCE.avertirJours?rempl(TXT.licenceBientot,{n:e.restant}):'');
 if(e.statut=='expiree')return rempl(TXT.licenceExpiree,{date:fmtJour(e.fin-1)});
 return TXT.versionGratuite};
HINT.pyr='Touche les 5 niveaux';HINT.frise='Fais défiler tous les âges';
function upd(){const ok=k=>lic()||!PAID.has(+k.split(':')[0]),A=ALL.filter(ok),n=A.filter(k=>P[k]).length,q=A.length?Math.round(n/A.length*100):0;$('#pb').style.width=q+'%';$('#pt').textContent=n+'/'+A.length+' étapes · '+q+' %';$('#lic').textContent=libelleLicence();const nx=A.find(k=>!P[k]),b=$('#go');if(nx){const[m,k]=nx.split(':');b.dataset.k=nx;b.textContent='Continuer · '+MO[m].t+' › '+MO[m].S[k]}else{b.dataset.k=lic()?'':(ALL.find(k=>PAID.has(+k.split(':')[0]))||'');b.textContent=lic()?'Parcours terminé, bravo ! 🎉':'Gratuit terminé · débloque la suite 🔒'}}
