/* Attention made visible: click a word, see how strongly the model weighs each
   earlier word when guessing at that position. Canned weights for key positions. */
(function () {
  var WORDS = ['The', 'keys', 'are', 'on', 'the', 'table', 'next', 'to', 'the', 'lamp', ';', 'hand', 'me', 'them'];
  // Hand-prepared relevance maps (index -> {earlierIndex: weight}) for the interesting positions.
  var MAPS = {
    13: { 1: 0.58, 11: 0.13, 9: 0.08, 5: 0.07, 12: 0.06 },     // "them" -> keys
    9:  { 5: 0.34, 6: 0.22, 8: 0.14, 3: 0.09 },                 // "lamp" -> table/next
    5:  { 3: 0.31, 1: 0.27, 4: 0.16 },                          // "table" -> on/keys
    11: { 10: 0.25, 1: 0.22, 9: 0.12, 5: 0.1 },                 // "hand" -> ;/keys
  };
  function weightsFor(idx) {
    if (MAPS[idx]) return MAPS[idx];
    var m = {}; // fallback: mild recency profile
    for (var i = Math.max(0, idx - 3); i < idx; i++) m[i] = 0.3 - 0.08 * (idx - 1 - i);
    return m;
  }

  GM.widgets['attention-viz'] = function (container) {
    var w = GM.widgetShell('The relevance visualizer',
      'Click any word. Shading shows how strongly the model weighs each earlier word while guessing at that position. Try “them” last.');
    var row = GM.el('div', { class: 'attn-sentence' });
    var detail = GM.el('div');
    var wordEls = [];

    function select(idx) {
      var map = weightsFor(idx);
      var max = Math.max.apply(null, Object.keys(map).map(function (k) { return map[k]; }).concat([0.01]));
      wordEls.forEach(function (el, i) {
        el.classList.toggle('focus', i === idx);
        if (i < idx && map[i]) {
          var pct = Math.round(map[i] / max * 75);
          el.style.background = 'color-mix(in srgb, var(--teal) ' + pct + '%, var(--bg-inset))';
          el.style.color = pct > 45 ? '#fff' : '';
        } else if (i !== idx) {
          el.style.background = ''; el.style.color = '';
        }
      });
      detail.innerHTML = '';
      var top = Object.keys(map).sort(function (a, b) { return map[b] - map[a]; }).slice(0, 3);
      detail.appendChild(GM.el('p', { class: 'note' }, [
        'While guessing at “' + WORDS[idx] + '”, the heaviest-weighted earlier words: ' +
        top.map(function (k) { return '“' + WORDS[k] + '” (' + Math.round(map[k] * 100) + '%)'; }).join(', ') + '.',
      ]));
      if (idx === 13) {
        detail.appendChild(GM.feedback('info',
          '“them” leans hardest on <strong>“keys”</strong> — nine words back, past a decoy noun (“lamp”) and a nearer one ' +
          '(“table”). This is the answer to the puzzle: at every step, a computed relevance lookup decides which earlier ' +
          'words matter <em>now</em>, and it learned to link pronouns to the things they stand for. No “focus” in any mental ' +
          'sense — numbers you are currently looking at.'));
      }
    }
    WORDS.forEach(function (word, i) {
      var el = GM.el('span', { class: 'attn-word', role: 'button', tabindex: '0' }, [word]);
      el.addEventListener('click', function () { select(i); });
      el.addEventListener('keydown', function (e) { if (e.key === 'Enter') select(i); });
      wordEls.push(el); row.appendChild(el);
    });
    w.body.appendChild(row);
    w.body.appendChild(detail);
    w.body.appendChild(GM.el('p', { class: 'note' },
      ['These weights are hand-prepared for this one sentence, shaped like real attention maps; real models compute fresh ones for every sentence, at every position, in every layer — all inspectable the same way.']));
    select(13);
    container.appendChild(w.shell);
  };
})();
