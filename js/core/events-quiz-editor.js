/* === ÉVÉNEMENTS · réponses quiz, accordéons, boutons éditeur d’images === */
document.addEventListener('click',e=>{const t=e.target;let x;
if(x=t.closest('[data-qa]')){const L=QZ[mod],q=L[qs.i];if(x.dataset.d)return;const i=+x.dataset.qa;document.querySelectorAll('[data-qa]').forEach((b,j)=>{b.dataset.d=1;b.style.borderColor=j==q.a?'#1f9d6b':j==i?'#d64545':'';b.style.opacity=(j==q.a||j==i)?1:.5});if(i==q.a)qs.s++;$('#qf').innerHTML=`<div class='rl'><b>${i==q.a?'✅ Bien joué !':'❌ Pas tout à fait.'}</b><p>Réponse : ${q.o[q.a]}</p><p class='mu'>${q.w}</p></div><button class='go' id='qn'>${qs.i+1>=L.length?'Voir les réponses':'Suivant ▸'}</button>`}
else if(t.closest('#qn')){qs.i++;qshow();scrollTo({top:0})}
else if(t.closest('#qr')){V.jeux()}
else if(x=t.closest('summary')){x.parentElement.dataset.o=1;if(!document.querySelector('details.mt:not([data-o])'))mk('1:metiers')}
else if(t.closest('#ed')){EDM=!EDM;document.body.classList.toggle('edm',EDM);t.closest('#ed').textContent=EDM?'✅ Touche une image à remplacer':'🖼️ Mode éditeur d’images'}
else if(t.closest('#rz')){try{localStorage.removeItem('mcimg')}catch(_){}location.reload()}
else if(t.closest('#ex')){const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([JSON.stringify(IMGS)],{type:'application/json'}));a.download='images.json';a.click()}
else if(EDM&&(x=t.closest(SEL))){const k=keyOf(x);if(k)pick(k)}});
