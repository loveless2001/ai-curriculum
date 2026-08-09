/* Persistent learner progress backed by localStorage.
   Tracks: per-week checkpoint completion, jargon-reveal state, saved widget data
   (calibration results, capstone draft). Fails soft if storage unavailable. */
GM.store = (function () {
  var KEY = 'guessing-machines-progress-v1';
  var state = { checkpoints: {}, jargonRevealed: false, saved: {} };

  function load() {
    try {
      var raw = localStorage.getItem(KEY);
      if (raw) state = Object.assign(state, JSON.parse(raw));
    } catch (e) { /* private mode / disabled storage: keep in-memory state */ }
  }
  function persist() {
    try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) { /* ignore */ }
  }
  load();

  return {
    isCheckpointDone: function (weekNum) { return !!state.checkpoints[weekNum]; },
    setCheckpointDone: function (weekNum, done) {
      state.checkpoints[weekNum] = !!done;
      persist();
      document.dispatchEvent(new CustomEvent('gm:progress-changed'));
    },
    completedCount: function () {
      return Object.keys(state.checkpoints).filter(function (k) { return state.checkpoints[k]; }).length;
    },
    isJargonRevealed: function () { return !!state.jargonRevealed; },
    setJargonRevealed: function () {
      state.jargonRevealed = true;
      persist();
      document.dispatchEvent(new CustomEvent('gm:progress-changed'));
    },
    /* Generic per-widget persistence (capstone draft, calibration score, ...) */
    getSaved: function (key, fallback) {
      return (key in state.saved) ? state.saved[key] : fallback;
    },
    setSaved: function (key, value) { state.saved[key] = value; persist(); },
  };
})();
