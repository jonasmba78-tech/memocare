/* === Utilitaires : $ (querySelector), sp(texte, langue?) (lecture à voix haute : voir js/core/voice.js) === */
const $=s=>document.querySelector(s),sp=(t,l)=>{try{VOX.say([{t,l}])}catch(e){}};
