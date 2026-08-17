// script.js - gestion du formulaire, dynamique des champs et fallback mailto
document.addEventListener('DOMContentLoaded', function(){
  const form = document.getElementById('mixForm');
  const status = document.getElementById('status');
  const replyTo = document.getElementById('_replyto');
  const emailInput = document.getElementById('email');

  // Mettre l'email dans _replyto (utile pour Formspree)
  emailInput.addEventListener('input', ()=> replyTo.value = emailInput.value);

  // Background audio: try to autoplay and loop. If autoplay is blocked, start on first user interaction.
  const bgAudio = document.getElementById('bgAudio');
  if(bgAudio){
    bgAudio.volume = 0.6; // comfortable default
    bgAudio.loop = true;
    const tryPlay = ()=>{
      const p = bgAudio.play();
      if(p && typeof p.then === 'function'){
        p.catch(()=>{
          // autoplay blocked — play on first user gesture (click/touch)
          const startOnUser = ()=>{ bgAudio.play().catch(()=>{}); window.removeEventListener('click', startOnUser); window.removeEventListener('touchstart', startOnUser); };
          window.addEventListener('click', startOnUser, {once:true});
          window.addEventListener('touchstart', startOnUser, {once:true});
        });
      }
    };
    // Attempt to play shortly after load (some browsers require a small delay)
    setTimeout(tryPlay, 200);
  }

  // Note: QR element removed from the page; no QR generation here.
  // Note: single approximate age field (age_approx) is used instead of min/max selects.

  // Remplir durée désirée (pas de 15s jusqu'à 20:00)
  const desiredDuration = document.getElementById('desired_duration');
  for(let s=15;s<=1200;s+=15){
    const mm = Math.floor(s/60).toString().padStart(2,'0');
    const ss = (s%60).toString().padStart(2,'0');
    const opt = document.createElement('option'); opt.value = `${mm}:${ss}`; opt.textContent = `${mm}:${ss}`; desiredDuration.appendChild(opt);
  }

  // Remplir le select d'âge approximatif (3..70)
  const ageApprox = document.getElementById('age_approx');
  if(ageApprox){
    const placeholder = document.createElement('option');
    placeholder.value = '';
    placeholder.textContent = 'Sélectionnez un âge (approx.)';
    placeholder.disabled = true;
    placeholder.selected = true;
    ageApprox.appendChild(placeholder);
    for(let a=3;a<=70;a++){
      const o = document.createElement('option'); o.value = a; o.textContent = a; ageApprox.appendChild(o);
    }
  }

  // YouTube links area
  const linksContainer = document.getElementById('linksContainer');
  const addLinkBtn = document.getElementById('addLinkBtn');
  const noLinksChoice = document.getElementById('noLinksChoice');
  const themeInput = document.getElementById('theme');
  let linkCount = 0;
  const MAX_LINKS = 6;

  function createTimeSelect(name){
    const sel = document.createElement('select');
    sel.name = name;
    sel.className = 'seconds';
    // options every 5 seconds up to 20:00 (1200s)
    for(let s=0;s<=1200;s+=5){
      const mm = Math.floor(s/60).toString().padStart(2,'0');
      const ss = (s%60).toString().padStart(2,'0');
      const opt = document.createElement('option'); opt.value = `${mm}:${ss}`; opt.textContent = `${mm}:${ss}`; sel.appendChild(opt);
    }
    return sel;
  }

  function createLinkBlock(index){
    const div = document.createElement('div');
    div.className = 'link-block';
    div.dataset.index = index;

    const url = document.createElement('input');
    url.type = 'text'; url.name = `yt_url_${index}`; url.placeholder = 'https://youtube.com/...';

    const labelFrom = document.createElement('span');
    labelFrom.className = 'time-label';
    labelFrom.textContent = 'de';

    const start = createTimeSelect(`yt_start_${index}`);

    const labelTo = document.createElement('span');
    labelTo.className = 'time-label';
    labelTo.textContent = 'à';

    const end = createTimeSelect(`yt_end_${index}`);

    const remove = document.createElement('button');
    remove.type = 'button'; remove.className='remove-link'; remove.textContent = 'Supprimer';
    remove.addEventListener('click', ()=>{
      linksContainer.removeChild(div);
      linkCount--;
    });

    div.appendChild(url);
    div.appendChild(labelFrom);
    div.appendChild(start);
    div.appendChild(labelTo);
    div.appendChild(end);
    div.appendChild(remove);
    return div;
  }

  addLinkBtn.addEventListener('click', ()=>{
    if(linkCount>=MAX_LINKS){ alert('Maximum de 6 liens atteints'); return; }
    linkCount++;
    const block = createLinkBlock(linkCount);
    linksContainer.appendChild(block);
  });

  noLinksChoice.addEventListener('change', ()=>{
    const disabled = noLinksChoice.checked;
    // activer/desactiver le container et le bouton
    linksContainer.querySelectorAll('input,button').forEach(el=> el.disabled = disabled);
    addLinkBtn.disabled = disabled;
    themeInput.disabled = !disabled ? true : false;
  });

  // Par défaut, theme disabled
  themeInput.disabled = true;

  // Gestion du submit: toujours ouvrir le client mail avec le résumé des réponses
  form.addEventListener('submit', function(e){
    e.preventDefault();
    const data = new FormData(form);
    const entries = [];
    for(const pair of data.entries()){
      if(pair[0] === '_subject') continue;
      entries.push(`${pair[0]}: ${pair[1]}`);
    }
    const body = encodeURIComponent(entries.join('\n'));
    const subject = encodeURIComponent('Demande de mix - Studio 5.4');
    // Adresse de réception fournie (ton adresse)
    const to = 'mike_super_star@hotmail.com';
    window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
    status.textContent = 'Ouverture du client mail...';
  });
});