/* Cloze next-word guessing game. Two modes:
   - 'human' (Week 1): guess + surprise rating, then reveal typical human guesses.
   - 'versus' (Week 7): guess, then reveal human guesses next to the machine's scores. */
(function () {
  var SENTENCES = [
    { text: 'She poured the coffee into the ___', open: 'nearly forced',
      cands: [['cup', .62, .58], ['mug', .27, .31], ['sink', .06, .07], ['thermos', .03, .03], ['pot', .02, .01]] },
    { text: 'The doctor told him to take a deep ___', open: 'forced',
      cands: [['breath', .96, .97], ['sigh', .02, .01], ['dive', .01, .01], ['drink', .01, .01]] },
    { text: 'For her birthday she wanted a ___', open: 'wide open',
      cands: [['puppy', .11, .09], ['party', .10, .12], ['bike', .09, .08], ['phone', .08, .10], ['cake', .07, .08], ['(hundreds more…)', .55, .53]] },
    { text: 'Better late than ___', open: 'forced',
      cands: [['never', .98, .99], ['sorry', .01, .01], ['early', .01, 0]] },
    { text: 'He opened the door and saw a ___', open: 'wide open',
      cands: [['man', .12, .14], ['stranger', .09, .07], ['dog', .07, .06], ['light', .05, .05], ['mess', .04, .05], ['(hundreds more…)', .63, .63]] },
    { text: 'The waves crashed against the ___', open: 'open, but narrowed',
      cands: [['shore', .38, .41], ['rocks', .33, .34], ['cliffs', .12, .11], ['boat', .09, .07], ['pier', .05, .04]] },
  ];

  GM.widgets['cloze-game'] = function (container, opts) {
    var versus = (opts.mode === 'versus');
    var w = GM.widgetShell(
      versus ? 'Human vs machine cloze tournament' : 'Cloze rounds',
      versus ? 'Guess first, then compare your instinct with typical human guesses and the machine’s scores.'
             : 'Type your guess, rate your surprise-if-wrong, then reveal how people typically guess.');

    SENTENCES.forEach(function (s, idx) {
      var input = GM.el('input', { type: 'text', placeholder: 'your guess…', 'aria-label': 'guess for sentence ' + (idx + 1) });
      var surprise = null;
      var chipRow = GM.el('div', { class: 'gm-row' });
      if (!versus) {
        chipRow.appendChild(GM.el('span', { class: 'note' }, ['If wrong, I’d be surprised:']));
        ['not at all', 'a little', 'very'].forEach(function (lvl) {
          var chip = GM.el('span', { class: 'chip', role: 'button', tabindex: '0' }, [lvl]);
          chip.addEventListener('click', function () {
            chipRow.querySelectorAll('.chip').forEach(function (c) { c.classList.remove('selected'); });
            chip.classList.add('selected');
            surprise = lvl;
          });
          chipRow.appendChild(chip);
        });
      }
      var result = GM.el('div');
      var btn = GM.el('button', { class: 'btn small' }, ['Reveal']);
      btn.addEventListener('click', function () {
        btn.disabled = true;
        result.innerHTML = '';
        var guess = input.value.trim().toLowerCase();
        var hit = s.cands.some(function (c) { return c[0].toLowerCase() === guess; });
        if (guess) {
          result.appendChild(GM.feedback(hit ? 'good' : 'info', hit
            ? 'Your guess is on the list — you and the crowd share a distribution.'
            : 'Not on the shortlist — which for a “' + s.open + '” blank may just mean the field was big.'));
        }
        result.appendChild(GM.el('p', { class: 'note', style: { margin: '0.6em 0 0.2em' } },
          [versus ? 'Typical human guesses (share of a roomful of people):' : 'How a roomful of people typically guesses:']));
        s.cands.forEach(function (c) { result.appendChild(GM.distRow(c[0], c[1], false)); });
        if (versus) {
          result.appendChild(GM.el('p', { class: 'note', style: { margin: '0.6em 0 0.2em' } }, ['The machine’s scores for the same blank:']));
          s.cands.forEach(function (c) { result.appendChild(GM.distRow(c[0], c[2], true)); });
          result.appendChild(GM.feedback('info', 'Compare the <em>shapes</em>: where humans pile onto one word, so does the machine; where humans scatter, it spreads its bets. It agrees with the room about which blanks are open vs forced.'));
        }
        result.appendChild(GM.el('p', { class: 'note' }, ['This blank is: ', GM.el('strong', {}, [s.open]), '.']));
      });
      w.body.appendChild(GM.el('div', { class: 'card', style: { boxShadow: 'none' } }, [
        GM.el('p', { style: { marginTop: 0 } }, [GM.el('em', {}, ['“' + s.text.replace('___', ' _____') + '”'])]),
        GM.el('div', { class: 'gm-row' }, [input, btn]),
        chipRow, result,
      ]));
    });
    container.appendChild(w.shell);
  };
})();
