/* Calibration quiz: numeric trivia with 90%-confidence ranges, scored live.
   Round 1 = discovery of overconfidence; round 2 = recalibration. Saves results. */
(function () {
  var ROUNDS = {
    1: [
      { q: 'Length of the Nile (km)', a: 6650 },
      { q: 'Year the printing press was invented (Gutenberg)', a: 1440 },
      { q: 'Height of Mount Everest (m)', a: 8849 },
      { q: 'Number of bones in the adult human body', a: 206 },
      { q: 'Distance from Earth to the Moon (km)', a: 384400 },
      { q: 'Year of Napoleon’s defeat at Waterloo', a: 1815 },
      { q: 'Deepest point of the ocean (m)', a: 10935 },
      { q: 'Number of countries in Africa', a: 54 },
      { q: 'Boiling point of water at Everest’s summit (°C)', a: 71 },
      { q: 'World population in 1900 (billions)', a: 1.6 },
    ],
    2: [
      { q: 'Length of the Great Wall of China, all branches (km)', a: 21196 },
      { q: 'Year the first email was sent', a: 1971 },
      { q: 'Weight of an adult blue whale (tonnes)', a: 150 },
      { q: 'Number of keys on a standard piano', a: 88 },
      { q: 'Age of the oldest known living tree (years)', a: 4850 },
      { q: 'Speed of sound at sea level (km/h)', a: 1235 },
    ],
  };

  GM.widgets['calibration-quiz'] = function (container, opts) {
    var round = opts.round || 1;
    var qs = ROUNDS[round];
    var w = GM.widgetShell('Calibration quiz — round ' + round,
      'For each: a low and a high bound you are 90% sure bracket the true value. Wide honest ranges beat narrow brave ones.');
    var rows = [];
    var table = GM.el('table');
    table.appendChild(GM.el('thead', {}, [GM.el('tr', {}, [
      GM.el('th', {}, ['Question']), GM.el('th', {}, ['Low']), GM.el('th', {}, ['High']), GM.el('th', {}, ['']),
    ])]));
    var tbody = GM.el('tbody');
    qs.forEach(function (item) {
      var lo = GM.el('input', { type: 'number', style: { width: '6.5em' }, step: 'any', 'aria-label': 'low bound' });
      var hi = GM.el('input', { type: 'number', style: { width: '6.5em' }, step: 'any', 'aria-label': 'high bound' });
      var mark = GM.el('td');
      rows.push({ item: item, lo: lo, hi: hi, mark: mark });
      tbody.appendChild(GM.el('tr', {}, [GM.el('td', {}, [item.q]), GM.el('td', {}, [lo]), GM.el('td', {}, [hi]), mark]));
    });
    table.appendChild(tbody);
    var result = GM.el('div');
    var btn = GM.el('button', { class: 'btn small' }, ['Score my round']);
    btn.addEventListener('click', function () {
      var hits = 0, answered = 0;
      rows.forEach(function (r) {
        var lo = parseFloat(r.lo.value), hi = parseFloat(r.hi.value);
        r.mark.innerHTML = '';
        if (isNaN(lo) || isNaN(hi)) return;
        answered++;
        var hit = lo <= r.item.a && r.item.a <= hi;
        if (hit) hits++;
        r.mark.appendChild(GM.el('span', {
          style: { color: hit ? 'var(--good)' : 'var(--bad)', fontWeight: '700', fontFamily: 'var(--font-sans)', fontSize: '.85rem' },
        }, [(hit ? '✓ ' : '✗ ') + r.item.a]));
      });
      if (!answered) return;
      var expected = Math.round(answered * 0.9);
      result.innerHTML = '';
      var verdict;
      if (hits >= expected) {
        verdict = GM.feedback('good', '<strong>' + hits + ' of ' + answered + ' ranges contained the truth.</strong> At 90% confidence, ' + expected + ' was the target — you’re in calibrated territory. (Check: were the ranges honest, or so wide they said nothing?)');
      } else {
        verdict = GM.feedback('bad', '<strong>' + hits + ' of ' + answered + ' ranges contained the truth.</strong> A calibrated 90% would land near ' + expected + '. You just measured your own overconfidence — congratulations, that measurement is rarer than it sounds. The fix isn’t knowing more trivia; it’s widening ranges until they’re honest.');
      }
      result.appendChild(verdict);
      GM.store.setSaved('calibration-round-' + round, { hits: hits, answered: answered });
      var other = GM.store.getSaved('calibration-round-' + (round === 1 ? 2 : 1), null);
      if (other) {
        result.appendChild(GM.feedback('info', 'Across both rounds: round 1 ' +
          describe(round === 1 ? { hits: hits, answered: answered } : other) + ', round 2 ' +
          describe(round === 2 ? { hits: hits, answered: answered } : other) + '. Did widening help? This record returns in Week 9, when you put the same question to the machine.'));
      }
    });
    function describe(r) { return r.hits + '/' + r.answered; }
    w.body.appendChild(table);
    w.body.appendChild(GM.el('div', { class: 'gm-row' }, [btn]));
    w.body.appendChild(result);
    container.appendChild(w.shell);
  };
})();
