const windows = [...document.querySelectorAll('[data-window]')];
const openers = [...document.querySelectorAll('[data-open]')];
const startButton = document.getElementById('startButton');
const startMenu = document.getElementById('startMenu');
const player = document.getElementById('mediaPlayer');
const playerFrame = document.getElementById('playerFrame');
const openVideoLink = document.getElementById('openVideoLink');
const playerTitle = document.getElementById('playerTitle');
let z = 30;

function showWindow(name){
  const win = document.querySelector(`[data-window="${name}"]`);
  if(!win) return;
  win.hidden = false;
  win.style.zIndex = ++z;
  startMenu.hidden = true;
}
function closeWindow(win){win.hidden = true;}
openers.forEach(btn=>btn.addEventListener('click',()=>showWindow(btn.dataset.open)));
document.querySelectorAll('[data-close]').forEach(btn=>btn.addEventListener('click',()=>closeWindow(btn.closest('.window'))));
windows.forEach(win=>win.addEventListener('pointerdown',()=>win.style.zIndex=++z));

startButton.addEventListener('click',()=>startMenu.hidden=!startMenu.hidden);
document.addEventListener('pointerdown',e=>{if(!startMenu.hidden && !startMenu.contains(e.target) && e.target!==startButton) startMenu.hidden=true});

document.querySelectorAll('.video-card').forEach(card=>{
  card.tabIndex=0;
  const open=()=>{
    playerTitle.textContent = `${card.dataset.title} — Windows Media Player`;
    playerFrame.src = card.dataset.video;
    openVideoLink.href = card.dataset.video;
    player.hidden = false;
    player.style.zIndex=++z;
  };
  card.addEventListener('click',open);
  card.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();open();}});
});

document.getElementById('closePlayer').addEventListener('click',()=>{
  playerFrame.removeAttribute('src'); player.hidden=true;
});

function updateClock(){
  const now=new Date();
  const clock=document.getElementById('clock');
  if(clock) clock.textContent=now.toLocaleTimeString('es-AR',{hour:'2-digit',minute:'2-digit'});
}
updateClock();setInterval(updateClock,30000);