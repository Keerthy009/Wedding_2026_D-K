const scene = document.querySelector('#letterScene');
const envelope = document.querySelector('#envelope');
const seal = document.querySelector('#seal');
const invitation = document.querySelector('#invitation');
const replay = document.querySelector('#replay');
const status = document.querySelector('#status');
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');
let opening = false;
let timers = [];
const later = (fn, ms) => timers.push(setTimeout(fn, ms));
document.querySelector('#directions').href = window.invitationSettings.directionsUrl;
function finishOpening() {
  invitation.hidden = false;
  document.body.classList.add('is-open');
  scene.classList.add('departing');
  invitation.classList.add('arriving');
  later(() => {
    scene.hidden = true;
    scene.classList.remove('departing');
    document.body.classList.remove('opening');
    invitation.focus({ preventScroll: true });
    status.textContent = 'Your invitation is open. Scroll to read the celebration and event details.';
    opening = false;
  }, window.weddingMotion.isReduced() ? 0 : 650);
}
function openLetter() {
  if (opening || document.body.classList.contains('is-open')) return;
  window.weddingMotion.enable();
  opening = true;
  window.weddingEffects.clearButterflies();
  seal.disabled = true;
  seal.setAttribute('aria-expanded', 'true');
  status.textContent = 'Opening your letter…';
  document.body.classList.add('opening');
  envelope.classList.add('releasing');
  later(() => envelope.classList.add('unfolding'), 550);
  later(() => {
    envelope.classList.add('revealing');
    window.weddingEffects.releaseButterflies();
  }, 1550);
  later(finishOpening, 3200);
}
function resetLetter() {
  window.weddingEffects.clearButterflies();
  timers.forEach(clearTimeout); timers = [];
  opening = false;
  scene.hidden = false;
  invitation.hidden = true;
  invitation.classList.remove('arriving');
  document.body.classList.remove('is-open', 'opening');
  envelope.classList.remove('releasing', 'unfolding', 'revealing');
  seal.disabled = false;
  seal.setAttribute('aria-expanded', 'false');
  scrollTo({top: 0, behavior: 'instant'});
  seal.focus({preventScroll: true});
  status.textContent = 'The letter is ready to open again.';
}
seal.addEventListener('click', openLetter);
replay.addEventListener('click', resetLetter);
const onMotionChange = () => { if (window.weddingMotion.isReduced()) window.weddingEffects.clearButterflies(); if (opening && window.weddingMotion.isReduced()) {timers.forEach(clearTimeout); finishOpening();} };
if (reduceMotion.addEventListener) reduceMotion.addEventListener('change', onMotionChange);
else reduceMotion.addListener(onMotionChange);
