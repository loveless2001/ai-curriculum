/* Rule induction game (disguised Wason 2-4-6): probe a hidden rule with triples,
   then commit to a guess. Tracks whether the player ever tried to FALSIFY. */
(function () {
  var fitsRule = function (a, b, c) { return a < b && b < c; }; // each number bigger than the last

  GM.widgets['rule-induction'] = function (container) {
    var w = GM.widgetShell('Probe the hidden rule',
      'Example that fits: 2, 4, 6. Enter any triple to test it. When confident, lock in your guess.');
    var yesCount = 0, noCount = 0, done = false;
    var inputs = [0, 1, 2].map(function (i) {
      return GM.el('input', { type: 'number', style: { width: '5.5em' }, 'aria-label': 'number ' + (i + 1) });
    });
    var log = GM.el('div');
    var verdictArea = GM.el('div');

    var testBtn = GM.el('button', { class: 'btn small teal' }, ['Test this triple']);
    testBtn.addEventListener('click', function () {
      if (done) return;
      var vals = inputs.map(function (i) { return parseFloat(i.value); });
      if (vals.some(isNaN)) { return; }
      var yes = fitsRule(vals[0], vals[1], vals[2]);
      if (yes) yesCount++; else noCount++;
      log.insertBefore(GM.el('div', { class: 'feedback ' + (yes ? 'good' : 'bad'), style: { margin: '.3rem 0' } },
        [vals.join(', ') + ' → ' + (yes ? 'fits the rule' : 'does NOT fit')]), log.firstChild);
      inputs.forEach(function (i) { i.value = ''; });
    });

    var GUESSES = [
      { t: 'Counting up by 2 (like 2, 4, 6)', correct: false,
        why: 'Plausible — every by-2 triple fits. But so do 1, 7, 100. Did you ever test a triple that would break this guess?' },
      { t: 'Even numbers, increasing', correct: false,
        why: 'All your even increasing triples fit — but 1, 3, 5 fits too. Only a deliberate odd-number test could tell you.' },
      { t: 'Each number bigger than the last', correct: true,
        why: 'Yes — the rule is just: strictly increasing. Broader and duller than most people’s guesses.' },
      { t: 'Increasing by the same amount each time', correct: false,
        why: 'Every equal-step triple fits — and so does 1, 2, 50. A triple with unequal steps would have exposed this instantly.' },
    ];
    var guessRow = GM.el('div', { class: 'gm-row' });
    GUESSES.forEach(function (g) {
      var b = GM.el('button', { class: 'btn small secondary' }, [g.t]);
      b.addEventListener('click', function () {
        if (done) return;
        done = true;
        verdictArea.appendChild(GM.feedback(g.correct ? 'good' : 'bad',
          '<strong>' + (g.correct ? 'Correct.' : 'Not quite.') + '</strong> ' + g.why +
          ' The hidden rule: <strong>each number bigger than the last</strong> — nothing more.'));
        var total = yesCount + noCount;
        verdictArea.appendChild(GM.feedback(noCount === 0 ? 'warn' : 'info',
          'Your testing record: <strong>' + yesCount + ' “fits”</strong> and <strong>' + noCount + ' “does not fit”</strong>' +
          (total ? '' : ' (you guessed without testing at all!)') + '. ' +
          (noCount === 0
            ? 'Every test you ran was expected to succeed. That’s the trap this game was built to spring: testing only cases ' +
              'that <em>confirm</em> your hypothesis feels rigorous and proves nothing. The informative test is the one you ' +
              'expect to fail — the same lesson as Week 2: answers you can predict teach you nothing.'
            : 'You tried to break your own hypothesis — the move most people never make. Tests you expect to fail are the ' +
              'ones that carry information.')));
        verdictArea.appendChild(GM.el('p', { class: 'note' },
          ['Connection to the puzzle: the memorizer and the understander both pass the tests they expect to pass. Only novel, ',
           GM.el('em', {}, ['designed-to-break']), ' cases separate them. (Psychologists know this game as Wason’s 2-4-6 task, 1960.)']));
      });
      guessRow.appendChild(b);
    });

    w.body.appendChild(GM.el('div', { class: 'gm-row' }, [inputs[0], inputs[1], inputs[2], testBtn]));
    w.body.appendChild(log);
    w.body.appendChild(GM.el('p', { class: 'note' }, ['When you’re confident, lock in the rule:']));
    w.body.appendChild(guessRow);
    w.body.appendChild(verdictArea);
    container.appendChild(w.shell);
  };
})();
