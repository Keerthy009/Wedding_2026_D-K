(function () {
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  let fullMotion = false;
  window.weddingMotion = {
    isReduced: () => reducedMotion.matches && !fullMotion,
    enable: () => { fullMotion = true; document.documentElement.dataset.fullMotion = 'true'; }
  };
  const flightLayer = document.querySelector('#butterflyLayer');
  const flights = new Set();
  function clearButterflies() {
    for (const animation of flights) animation.cancel();
    flights.clear();
    flightLayer.replaceChildren();
  }
  function bezier(a, b, c, d, t) {
    const s = 1 - t;
    return s*s*s*a + 3*s*s*t*b + 3*s*t*t*c + t*t*t*d;
  }
  function releaseButterflies() {
    clearButterflies();
    if (window.weddingMotion.isReduced() || document.hidden) return;
    const rect = document.querySelector('#envelope').getBoundingClientRect();
    const w = innerWidth, h = innerHeight;
    const startX = rect.left + rect.width * .5;
    const startY = rect.top + rect.height * .28;
    const sizes = [43, 35, 48, 39];
    for (let i = 0; i < 4; i++) {
      const side = i % 2 === 0 ? -1 : 1;
      const size = sizes[i];
      const butterfly = document.createElement('div');
      butterfly.className = 'butterfly';
      butterfly.style.width = `${size}px`;
      butterfly.style.height = `${size * 2/3}px`;
      butterfly.style.setProperty('--flutter-time', `${.25 + i * .035}s`);
      butterfly.innerHTML = '<div class="butterfly-sprite"><img class="wing wing-left" src="assets/butterfly.png" alt=""><img class="wing wing-right" src="assets/butterfly.png" alt=""><img class="butterfly-body" src="assets/butterfly.png" alt=""></div>';
      flightLayer.append(butterfly);
      const endX = side < 0 ? -80 : w + 80;
      const endY = i < 2 ? -100 : h * .12;
      const controls = [startX + side*w*.25, startY - 100 - i*10, side < 0 ? w*.03 : w*.97, h*.14 + i*25];
      const frames = Array.from({length:25}, (_, k) => {
        const t = k / 24;
        const x = bezier(startX + side * i*4, controls[0], controls[2], endX, t);
        const y = bezier(startY, controls[1], controls[3], endY, t);
        const drift = Math.sin(t*Math.PI*3 + i) * 9 * Math.sin(t*Math.PI);
        const tilt = side * (14 + Math.sin(t*Math.PI*2)*18);
        return { transform: `translate3d(${x-size/2}px,${y-size/3+drift}px,0) rotate(${tilt}deg)`, opacity: k === 0 || k === 24 ? 0 : 1, offset:t };
      });
      const flight = butterfly.animate(frames, {duration: 4900 + i*430, delay:i*170, easing:'linear', fill:'both'});
      flights.add(flight);
      flight.finished.then(() => { flights.delete(flight); butterfly.remove(); }).catch(() => {});
    }
  }
  const onMotionChange = () => { if (window.weddingMotion.isReduced()) clearButterflies(); };
  if (reducedMotion.addEventListener) reducedMotion.addEventListener('change', onMotionChange);
  else reducedMotion.addListener(onMotionChange);
  document.addEventListener('visibilitychange', () => { if (document.hidden) clearButterflies(); });
  window.weddingEffects = {releaseButterflies, clearButterflies};
})();
