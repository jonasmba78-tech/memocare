/* === LICENCE · calcul et lecture des codes (partagé par l'application et le générateur de codes) ===
   Un code contient : le JOUR DE DÉBUT et la DURÉE EN MOIS (lisibles) + une SIGNATURE calculée à partir
   du nom, de ces deux valeurs et de la clé secrète (config/licence.js).
   Format :  CARE-DDDD-SSS-SSS   (DDDD = début + durée, SSSSSS = signature)
   → le même nom donne un code DIFFÉRENT selon le jour de début et la durée choisis.
   Aucune dépendance à la page : ce fichier est aussi inclus tel quel dans le générateur. */
function hc(s){let a=0xdeadbeef,b=0x41c6ce57;for(let i=0;i<s.length;i++){const c=s.charCodeAt(i);a=Math.imul(a^c,2654435761);b=Math.imul(b^c,1597334677)}a=Math.imul(a^a>>>16,2246822507)^Math.imul(b^b>>>13,3266489909);b=Math.imul(b^b>>>16,2246822507)^Math.imul(a^a>>>13,3266489909);return(b>>>0).toString(36).toUpperCase().padStart(7,'0').slice(-6)}
const nm=n=>n.normalize('NFD').replace(/[̀-ͯ]/g,'').toLowerCase().replace(/[^a-z]/g,'');
const _JOUR=864e5,_EPOQUE=(([y,m,d])=>Date.UTC(y,m-1,d))(LICENCE.epoque.split('-').map(Number));
/* jour = nombre de jours depuis l'époque (date locale de l'appareil) */
const jourDe=d=>Math.floor((Date.UTC(d.getFullYear(),d.getMonth(),d.getDate())-_EPOQUE)/_JOUR);
const dateDe=j=>new Date(_EPOQUE+j*_JOUR);
const fmtJour=j=>{const d=dateDe(j),p=n=>String(n).padStart(2,'0');return p(d.getUTCDate())+'/'+p(d.getUTCMonth()+1)+'/'+d.getUTCFullYear()};
/* jour de fin (EXCLU) = début + n mois calendaires (31 janv. + 1 mois → 28/29 févr.) */
function ajouteMois(j,n){const d=dateDe(j),y=d.getUTCFullYear(),m=d.getUTCMonth()+n,max=new Date(Date.UTC(y,m+1,0)).getUTCDate();return Math.round((Date.UTC(y,m,Math.min(d.getUTCDate(),max))-_EPOQUE)/_JOUR)}
const _sig=(nom,p)=>hc(LICENCE.cle+'|'+nm(nom)+'|'+p);
function creerCode(nom,jourDebut,mois){
 if(!nm(nom))throw new Error('Nom invalide (il doit contenir des lettres)');
 if(!(Number.isInteger(jourDebut)&&jourDebut>=0&&jourDebut<26000))throw new Error('Date de début invalide (à partir du '+LICENCE.epoque+')');
 if(!(Number.isInteger(mois)&&mois>=1&&mois<=63))throw new Error('Durée invalide (1 à 63 mois)');
 const p=(jourDebut*64+mois).toString(36).toUpperCase().padStart(4,'0'),s=_sig(nom,p);
 return 'CARE-'+p+'-'+s.slice(0,3)+'-'+s.slice(3)}
/* lit un code pour un nom : {ok,debut,fin,mois} (fin exclue) ou {ok:false} */
function lireCode(nom,code){
 code=String(code||'').trim().toUpperCase();if(!nm(nom||''))return{ok:false};
 let m=code.match(/^CARE-([0-9A-Z]{4})-([0-9A-Z]{3})-([0-9A-Z]{3})$/);
 if(m){if(_sig(nom,m[1])!==m[2]+m[3])return{ok:false};const v=parseInt(m[1],36),mois=v%64,debut=Math.floor(v/64);return mois?{ok:true,debut,mois,fin:ajouteMois(debut,mois)}:{ok:false}}
 m=code.match(/^CARE-([0-9A-Z]{3})-([0-9A-Z]{3})$/);
 if(m&&LICENCE.anciensCodes){const h=hc(LICENCE.cle+nm(nom));if(h.slice(0,3)===m[1]&&h.slice(3)===m[2])return{ok:true,ancien:true,debut:0,fin:Infinity,mois:0}}
 return{ok:false}}
