/* Pure time arithmetic, shared by the live countdown and its checks. */
(function (root) {
  function remainingParts(targetTimestamp, now = Date.now()) {
    const totalSeconds = Math.max(0, Math.ceil((Date.parse(targetTimestamp) - now) / 1000));
    return {
      ended: now >= Date.parse(targetTimestamp),
      days: Math.floor(totalSeconds / 86400),
      hours: Math.floor(totalSeconds / 3600) % 24,
      minutes: Math.floor(totalSeconds / 60) % 60,
      seconds: totalSeconds % 60,
    };
  }
  const api = { remainingParts };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.weddingTime = api;
})(typeof window !== 'undefined' ? window : globalThis);
