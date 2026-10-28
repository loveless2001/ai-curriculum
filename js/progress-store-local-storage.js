/* Persistent learner progress backed by localStorage.
   Tracks: per-week checkpoint completion, jargon-reveal state, saved widget data
   (calibration results, capstone draft). Fails soft if storage unavailable. */
GM.store = (function () {
  var KEY = 'guessing-machines-progress-v1';
  var state = { checkpoints: {}, jargonRevealed: false, saved: {}, courseOrderVersion: 2 };

  function load() {
    try {
      var raw = localStorage.getItem(KEY);
      if (raw) {
        var loaded = JSON.parse(raw);
        state = Object.assign(state, loaded);
        if ((loaded.courseOrderVersion || 1) < 2) {
          // Old Week 8 was temperature; old Week 9 was checking answers.
          // Notes retain their original content IDs, so only checkpoints move.
          var oldTemperature = state.checkpoints[8];
          var oldChecking = state.checkpoints[9];
          delete state.checkpoints[8];
          delete state.checkpoints[9];
          if (oldChecking !== undefined) state.checkpoints[8] = oldChecking;
          if (oldTemperature !== undefined) state.checkpoints[9] = oldTemperature;
          state.courseOrderVersion = 2;
          persist();
        }
      }
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
