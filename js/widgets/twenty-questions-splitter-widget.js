/* Mini twenty-questions with a visible possibility space. Shows how much each
   question splits the remaining candidates — good questions split ~in half. */
(function () {
  var ITEMS = [
    { n: 'elephant', a: { alive: 1, big: 1, indoor: 0, electronic: 0, edible: 0 } },
    { n: 'goldfish', a: { alive: 1, big: 0, indoor: 1, electronic: 0, edible: 0 } },
    { n: 'oak tree', a: { alive: 1, big: 1, indoor: 0, electronic: 0, edible: 0 } },
    { n: 'houseplant', a: { alive: 1, big: 0, indoor: 1, electronic: 0, edible: 0 } },
    { n: 'mushroom', a: { alive: 1, big: 0, indoor: 0, electronic: 0, edible: 1 } },
    { n: 'horse', a: { alive: 1, big: 1, indoor: 0, electronic: 0, edible: 0 } },
    { n: 'bee', a: { alive: 1, big: 0, indoor: 0, electronic: 0, edible: 0 } },
    { n: 'cat', a: { alive: 1, big: 0, indoor: 1, electronic: 0, edible: 0 } },
    { n: 'refrigerator', a: { alive: 0, big: 1, indoor: 1, electronic: 1, edible: 0 } },
    { n: 'smartphone', a: { alive: 0, big: 0, indoor: 1, electronic: 1, edible: 0 } },
    { n: 'bridge', a: { alive: 0, big: 1, indoor: 0, electronic: 0, edible: 0 } },
    { n: 'teaspoon', a: { alive: 0, big: 0, indoor: 1, electronic: 0, edible: 0 } },
    { n: 'wind turbine', a: { alive: 0, big: 1, indoor: 0, electronic: 1, edible: 0 } },
    { n: 'birthday cake', a: { alive: 0, big: 0, indoor: 1, electronic: 0, edible: 1 } },
    { n: 'television', a: { alive: 0, big: 1, indoor: 1, electronic: 1, edible: 0 } },
    { n: 'apple', a: { alive: 0, big: 0, indoor: 1, electronic: 0, edible: 1 } },
  ];
  var QUESTIONS = [
    { q: 'Is it alive?', key: 'alive' },
    { q: 'Is it bigger than a breadbox?', key: 'big' },
    { q: 'Would you usually find it indoors?', key: 'indoor' },
    { q: 'Is it electronic?', key: 'electronic' },
    { q: 'Can you eat it?', key: 'edible' },
  ];

  GM.widgets['question-splitter'] = function (container) {
    var w = GM.widgetShell('Find the hidden item',
      'One of these 16 items is secretly chosen. Ask questions; watch what each does to the field of possibilities.');
    var target, remaining, asked;
    var chipBox = GM.el('div', { class: 'gm-row' });
    var qBox = GM.el('div', { class: 'gm-row' });
    var log = GM.el('div');

    function renderChips() {
      chipBox.innerHTML = '';
      ITEMS.forEach(function (it) {
        var out = remaining.indexOf(it) === -1;
        chipBox.appendChild(GM.el('span', {
          class: 'chip static', style: out ? { opacity: '.25', textDecoration: 'line-through' } : {},
        }, [it.n]));
      });
    }
    function renderQuestions() {
      qBox.innerHTML = '';
      QUESTIONS.forEach(function (q) {
        if (asked.indexOf(q.key) !== -1) return;
        var b = GM.el('button', { class: 'btn small secondary' }, [q.q]);
        b.addEventListener('click', function () { ask(q); });
        qBox.appendChild(b);
      });
      // The famous bad opening move, always available:
      var guessBtn = GM.el('button', { class: 'btn small secondary' }, ['Is it the ' + ITEMS[14].n + '?']);
      guessBtn.addEventListener('click', function () {
        var yes = target.n === ITEMS[14].n;
        if (!yes) remaining = remaining.filter(function (it) { return it.n !== ITEMS[14].n; });
        log.appendChild(GM.feedback(yes ? 'good' : 'warn',
          '“Is it the television?” — answer: <strong>' + (yes ? 'yes (lucky!)' : 'no') + '</strong>. ' +
          (yes ? 'A lottery win.' : 'This eliminated <strong>1</strong> of ' + (remaining.length + 1) +
          ' possibilities. You could predict the answer would almost certainly be “no” — and a question whose answer you can predict teaches you almost nothing.')));
        finishCheck(); renderChips();
      });
      qBox.appendChild(guessBtn);
    }
    function ask(q) {
      var before = remaining.length;
      var yes = !!target.a[q.key];
      var yesCount = remaining.filter(function (it) { return !!it.a[q.key]; }).length;
      remaining = remaining.filter(function (it) { return !!it.a[q.key] === yes; });
      asked.push(q.key);
      var balance = Math.min(yesCount, before - yesCount) / before;
      log.appendChild(GM.feedback(balance > 0.3 ? 'good' : 'info',
        '“' + q.q + '” — answer: <strong>' + (yes ? 'yes' : 'no') + '</strong>. Of ' + before + ' possibilities, ' +
        yesCount + ' were yes / ' + (before - yesCount) + ' were no → ' + remaining.length + ' remain. ' +
        (balance > 0.3 ? 'A near-even split: you couldn’t predict the answer, so the answer carried real information.'
                       : 'A lopsided split: you could half-guess the answer, so it taught you less.')));
      renderChips(); renderQuestions(); finishCheck();
    }
    function finishCheck() {
      if (remaining.length === 1) {
        log.appendChild(GM.feedback('good', 'Narrowed to one: <strong>' + remaining[0].n +
          '</strong>. Notice which questions did the work — the ones whose answers you couldn’t predict.'));
        qBox.innerHTML = '';
      } else if (remaining.length > 1 && asked.length === QUESTIONS.length) {
        log.appendChild(GM.feedback('info', 'Out of attribute questions with ' + remaining.length +
          ' items left: ' + remaining.map(function (i) { return i.n; }).join(', ') +
          '. These items answer every question identically — no question in the list can split them. To tell them apart you’d need a <em>new</em> question.'));
      }
    }
    function start() {
      target = ITEMS[Math.floor(Math.random() * ITEMS.length)];
      remaining = ITEMS.slice(); asked = [];
      log.innerHTML = '';
      renderChips(); renderQuestions();
    }
    var restart = GM.el('button', { class: 'btn small' }, ['New secret item']);
    restart.addEventListener('click', start);
    w.body.appendChild(chipBox);
    w.body.appendChild(GM.el('p', { class: 'note' }, ['Ask a question:']));
    w.body.appendChild(qBox);
    w.body.appendChild(log);
    w.body.appendChild(GM.el('div', { class: 'gm-row' }, [restart]));
    start();
    container.appendChild(w.shell);
  };
})();
