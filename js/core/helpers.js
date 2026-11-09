/* === Utilitaires : $ (querySelector), sp() (synthèse vocale, compatible iPhone/iPad) === */
const $=s=>document.querySelector(s);
const TTS=(()=>{
  const ok=typeof window!=='undefined'&&'speechSynthesis' in window&&'SpeechSynthesisUtterance' in window;
  const IOS=/iP(hone|ad|od)/.test(navigator.userAgent)||(navigator.platform==='MacIntel'&&navigator.maxTouchPoints>1);
  /* voix « fantaisie » d'iOS/macOS (Eddy, Flo, Grandma…) : à éviter absolument */
  const NOVELTY=/^(eddy|flo|grandma|grandpa|rocko|reed|sandy|shelley|bad news|bahh|bells|boing|bubbles|cellos|good news|jester|organ|superstar|trinoids|whisper|wobble|zarvox|albert|fred|junior|kathy|ralph)\b/i;
  let voices=[],keep=[],token=0,unlocked=false;
  const norm=l=>String(l||'').replace('_','-').toLowerCase();
  const load=()=>{try{voices=speechSynthesis.getVoices()||[]}catch(e){}};
  if(ok){
    load();
    try{speechSynthesis.addEventListener('voiceschanged',load)}catch(e){speechSynthesis.onvoiceschanged=load}
    /* iOS ne remplit parfois la liste qu'un peu plus tard */
    [300,1200,3000].forEach(ms=>setTimeout(()=>{if(!voices.length)load()},ms));
  }
  /* choisit explicitement une voix de la bonne langue (sinon iOS prend la voix du système, souvent mauvaise langue) */
  const pick=lang=>{
    const L=norm(lang),p=L.slice(0,2);
    const same=voices.filter(v=>norm(v.lang).slice(0,2)===p&&!NOVELTY.test(v.name));
    const score=v=>(norm(v.lang)===L?4:0)+(/enhanced|premium|améliorée|amélioré/i.test(v.name)?3:0)+(v.localService?1:0)+(v.default?1:0);
    return same.sort((a,b)=>score(b)-score(a))[0]||null;
  };
  /* découpe en phrases courtes : évite les coupures de lecture sur Safari */
  const chunks=t=>{
    const out=[];
    (t.match(/[^.!?;:…\n]+[.!?;:…]*/g)||[t]).forEach(s=>{
      s=s.trim();if(!s)return;
      while(s.length>160){let i=s.lastIndexOf(',',160);if(i<40)i=s.lastIndexOf(' ',160);if(i<40)i=160;out.push(s.slice(0,i+1).trim());s=s.slice(i+1).trim()}
      if(s)out.push(s);
    });
    return out;
  };
  const clean=t=>String(t==null?'':t)
    .replace(/<[^>]*>/g,' ')
    .replace(/&nbsp;/g,' ').replace(/&amp;/g,'&')
    .replace(/[\u{1F000}-\u{1FFFF}\u{2600}-\u{27BF}\u{FE0F}\u{200D}]/gu,' ')
    .replace(/\s+/g,' ').trim();
  const make=(txt,lang,voice,retry)=>{
    const u=new SpeechSynthesisUtterance(txt);
    u.lang=voice?voice.lang:lang;
    if(voice)u.voice=voice;
    u.rate=IOS?.85:.7; u.pitch=1; u.volume=1;
    /* si la voix choisie échoue, on réessaie une fois avec la langue seule */
    u.onerror=e=>{if(retry&&voice&&e&&e.error!=='canceled'&&e.error!=='interrupted'){retry()}};
    keep.push(u);                                  /* garde une référence : Safari ramasse sinon l'objet avant la fin */
    u.onend=()=>{keep=keep.filter(x=>x!==u)};
    return u;
  };
  const run=(parts,lang,my)=>{
    if(my!==token)return;
    try{speechSynthesis.resume()}catch(e){}
    const v=pick(lang);
    parts.forEach((p,i)=>{
      const retry=i===0?()=>{if(my===token){try{speechSynthesis.cancel()}catch(e){}parts.forEach(q=>{try{speechSynthesis.speak(make(q,lang,null,null))}catch(e){}})}}:null;
      speechSynthesis.speak(make(p,lang,v,retry));
    });
  };
  const speak=(t,lang)=>{
    if(!ok)return;
    try{
      t=clean(t);if(!t)return;
      lang=lang||(typeof mod!=='undefined'&&mod>3?'fr-FR':'en-US');
      const my=++token,parts=chunks(t);
      if(!voices.length)load();
      if(speechSynthesis.speaking||speechSynthesis.pending){
        speechSynthesis.cancel();
        /* iOS : un speak() immédiatement après cancel() est ignoré → petite pause */
        setTimeout(()=>run(parts,lang,my),IOS?120:0);
      }else run(parts,lang,my);   /* synchrone : reste dans le geste tactile (obligatoire sur iOS) */
    }catch(e){}
  };
  /* iOS n'autorise la parole qu'après un premier geste de l'utilisateur : on « déverrouille » au premier toucher,
     ce qui permet ensuite les lectures automatiques (minuteries : routines, frise, etc.) */
  const unlock=()=>{
    if(unlocked||!ok)return;unlocked=true;
    try{const u=new SpeechSynthesisUtterance(' ');u.volume=0;speechSynthesis.speak(u)}catch(e){}
    ['touchend','click','keydown'].forEach(ev=>document.removeEventListener(ev,unlock,true));
  };
  ['touchend','click','keydown'].forEach(ev=>document.addEventListener(ev,unlock,true));
  /* on coupe la voix quand l'app passe en arrière-plan (sinon elle reste bloquée sur iOS) */
  const stop=()=>{token++;try{speechSynthesis.cancel()}catch(e){}};
  document.addEventListener('visibilitychange',()=>{if(document.hidden)stop()});
  addEventListener('pagehide',stop);
  return{speak,stop,pick};
})();
const sp=(t,l)=>TTS.speak(t,l);
