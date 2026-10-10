(function () {
  const section = document.querySelector('#countdown');
  const grid = section.querySelector('.countdown-grid');
  const complete = section.querySelector('.countdown-complete');
  const timestamp = window.invitationSettings.celebrationTimestamp;
  const digits = Object.fromEntries(['days', 'hours', 'minutes', 'seconds'].map(unit => [unit, section.querySelector(`[data-unit="${unit}"]`)]));
  let interval = null;
  let ended = false;
  function stop() {
    if (interval !== null) clearInterval(interval);
    interval = null;
  }
  function update() {
    const remaining = window.weddingTime.remainingParts(timestamp, Date.now());
    if (remaining.ended) {
      ended = true;
      stop();
      grid.hidden = true;
      complete.hidden = false;
      return;
    }
    for (const unit of Object.keys(digits)) {
      const value = String(remaining[unit]).padStart(2, '0');
      if (digits[unit].textContent !== value) digits[unit].textContent = value;
    }
  }
  function resume() {
    update(); // Always read the real clock; never subtract from an old counter.
    if (!ended && !document.hidden && interval === null) interval = setInterval(update, 1000);
  }
  document.addEventListener('visibilitychange', () => document.hidden ? stop() : resume());
  window.addEventListener('pageshow', resume);
  window.addEventListener('focus', resume);
  window.addEventListener('pagehide', stop);
  resume(); // Created once per page, independent of envelope/replay timers.
})();
