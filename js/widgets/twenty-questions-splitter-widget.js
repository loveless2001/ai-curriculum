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
  var VI_ITEM_NAMES = ['voi', 'cá vàng', 'cây sồi', 'cây cảnh', 'nấm', 'ngựa', 'ong', 'mèo', 'tủ lạnh', 'điện thoại thông minh', 'cây cầu', 'thìa cà phê', 'tua-bin gió', 'bánh sinh nhật', 'ti-vi', 'quả táo'];
  var VI_QUESTIONS = ['Nó có sống không?', 'Nó có lớn hơn hộp bánh mì không?', 'Ta thường thấy nó trong nhà không?', 'Nó có phải thiết bị điện tử không?', 'Có ăn được không?'];
  if (GM.language.isVietnamese()) {
    ITEMS.forEach(function (item, index) { item.n = VI_ITEM_NAMES[index]; });
    QUESTIONS.forEach(function (question, index) { question.q = VI_QUESTIONS[index]; });
  }

  GM.widgets['question-splitter'] = function (container) {
    var w = GM.widgetShell(GM.t('Find the hidden item', 'Tìm vật bí mật'),
      GM.t('One of these 16 items is secretly chosen. Ask questions; watch what each does to the field of possibilities.', 'Một trong 16 vật được chọn bí mật. Hãy hỏi và quan sát mỗi câu tác động ra sao đến tập khả năng.'));
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
      var guessBtn = GM.el('button', { class: 'btn small secondary' }, [GM.t('Is it the ', 'Đó có phải ') + ITEMS[14].n + '?']);
      guessBtn.addEventListener('click', function () {
        var yes = target.n === ITEMS[14].n;
        if (!yes) remaining = remaining.filter(function (it) { return it.n !== ITEMS[14].n; });
        log.appendChild(GM.feedback(yes ? 'good' : 'warn',
          GM.t('“Is it the television?” — answer: <strong>' + (yes ? 'yes (lucky!)' : 'no') + '</strong>. ' + (yes ? 'A lottery win.' : 'This eliminated <strong>1</strong> of ' + (remaining.length + 1) + ' possibilities. Before asking, “no” was overwhelmingly likely; that branch left nearly the whole field in play.'),
            '“Đó có phải ti-vi không?” — đáp án: <strong>' + (yes ? 'có (may mắn!)' : 'không') + '</strong>. ' + (yes ? 'Trúng xổ số.' : 'Câu này loại <strong>1</strong> trong ' + (remaining.length + 1) + ' khả năng. Trước khi hỏi, đáp án “không” có khả năng áp đảo; nhánh ấy vẫn để gần như toàn bộ tập khả năng tồn tại.'))));
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
        GM.t('“' + q.q + '” — answer: <strong>' + (yes ? 'yes' : 'no') + '</strong>. Of ' + before + ' possibilities, ' + yesCount + ' were yes / ' + (before - yesCount) + ' were no → ' + remaining.length + ' remain. ' + (balance > 0.3 ? 'A near-even split: before asking, both branches were substantial, so either answer would narrow the field.' : 'A lopsided split: one answer was much more likely and would leave most possibilities in play.'),
          '“' + q.q + '” — đáp án: <strong>' + (yes ? 'có' : 'không') + '</strong>. Trong ' + before + ' khả năng, ' + yesCount + ' trả lời có / ' + (before - yesCount) + ' trả lời không → còn ' + remaining.length + '. ' + (balance > 0.3 ? 'Chia gần đều: trước khi hỏi, cả hai nhánh đều đáng kể, nên đáp án nào cũng giúp thu hẹp tập khả năng.' : 'Chia lệch: một đáp án có khả năng cao hơn nhiều và sẽ để lại phần lớn các khả năng.'))));
      renderChips(); renderQuestions(); finishCheck();
    }
    function finishCheck() {
      if (remaining.length === 1) {
        log.appendChild(GM.feedback('good', GM.t('Narrowed to one: <strong>' + remaining[0].n + '</strong>. Notice which questions did the work—the ones whose possible answers divided the live field.', 'Đã thu hẹp còn một: <strong>' + remaining[0].n + '</strong>. Hãy để ý câu nào làm được việc—đó là những câu có các đáp án khả dĩ chia được tập khả năng đang xét.')));
        qBox.innerHTML = '';
      } else if (remaining.length > 1 && asked.length === QUESTIONS.length) {
        log.appendChild(GM.feedback('info', GM.t('Out of attribute questions with ' + remaining.length + ' items left: ' + remaining.map(function (i) { return i.n; }).join(', ') + '. These items answer every question identically — no question in the list can split them. To tell them apart you’d need a <em>new</em> question.', 'Đã hết câu hỏi thuộc tính nhưng còn ' + remaining.length + ' vật: ' + remaining.map(function (i) { return i.n; }).join(', ') + '. Chúng trả lời mọi câu giống nhau — không câu nào trong danh sách tách được. Bạn cần một câu hỏi <em>mới</em>.')));
      }
    }
    function start() {
      target = ITEMS[Math.floor(Math.random() * ITEMS.length)];
      remaining = ITEMS.slice(); asked = [];
      log.innerHTML = '';
      renderChips(); renderQuestions();
    }
    var restart = GM.el('button', { class: 'btn small' }, [GM.t('New secret item', 'Chọn vật bí mật mới')]);
    restart.addEventListener('click', start);
    w.body.appendChild(chipBox);
    w.body.appendChild(GM.el('p', { class: 'note' }, [GM.t('Ask a question:', 'Hãy hỏi một câu:')]));
    w.body.appendChild(qBox);
    w.body.appendChild(log);
    w.body.appendChild(GM.el('div', { class: 'gm-row' }, [restart]));
    start();
    container.appendChild(w.shell);
  };
})();
