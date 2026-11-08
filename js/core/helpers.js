/* === Utilitaires : $ (querySelector), sp() (synthèse vocale) === */
const $=s=>document.querySelector(s),sp=t=>{try{speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(t);u.lang=mod>3?'fr-FR':'en-US';u.rate=.7;speechSynthesis.speak(u)}catch(e){}};
