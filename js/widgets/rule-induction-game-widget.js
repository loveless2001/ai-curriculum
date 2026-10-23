/* Rule induction game (disguised Wason 2-4-6): probe a hidden rule with triples,
   then commit to a guess. Tracks whether the player ever tried to FALSIFY. */
(function () {
  var fitsRule = function (a, b, c) { return a < b && b < c; }; // each number bigger than the last

  GM.widgets['rule-induction'] = function (container) {
    var w = GM.widgetShell(GM.t('Probe the hidden rule', 'Tìm quy luật bí mật'),
      GM.t('Example that fits: 2, 4, 6. Enter any triple to test it. When confident, lock in your guess.', 'Dãy 2, 4, 6 đúng quy luật. Hãy nhập ba số bất kỳ để thử, rồi chọn quy luật mà bạn cho là đúng.'));
    var yesCount = 0, noCount = 0, done = false;
    var inputs = [0, 1, 2].map(function (i) {
      return GM.el('input', { type: 'number', style: { width: '5.5em' }, 'aria-label': GM.t('number ', 'số ') + (i + 1) });
    });
    var log = GM.el('div');
    var verdictArea = GM.el('div');

    var testBtn = GM.el('button', { class: 'btn small teal' }, [GM.t('Test this triple', 'Kiểm tra bộ ba')]);
    testBtn.addEventListener('click', function () {
      if (done) return;
      var vals = inputs.map(function (i) { return parseFloat(i.value); });
      if (vals.some(isNaN)) { return; }
      var yes = fitsRule(vals[0], vals[1], vals[2]);
      if (yes) yesCount++; else noCount++;
      log.insertBefore(GM.el('div', { class: 'feedback ' + (yes ? 'good' : 'bad'), style: { margin: '.3rem 0' } },
        [vals.join(', ') + ' → ' + (yes ? GM.t('fits the rule', 'phù hợp quy tắc') : GM.t('does NOT fit', 'KHÔNG phù hợp'))]), log.firstChild);
      inputs.forEach(function (i) { i.value = ''; });
    });

    var GUESSES = [
      { t: GM.t('Counting up by 2 (like 2, 4, 6)', 'Mỗi số hơn số trước 2 đơn vị'), correct: false,
        why: GM.t('Plausible — every by-2 triple fits. But so do 1, 7, 100. Did you ever test a triple that would break this guess?', 'Nghe có lý, vì mọi dãy tăng 2 đều đúng. Nhưng 1, 7, 100 cũng đúng. Bạn có thử một dãy không tăng đều 2 để kiểm tra giả thuyết này không?') },
      { t: GM.t('Even numbers, increasing', 'Các số chẵn tăng dần'), correct: false,
        why: GM.t('All your even increasing triples fit — but 1, 3, 5 fits too. Only a deliberate odd-number test could tell you.', 'Các dãy số chẵn tăng dần đều đúng, nhưng 1, 3, 5 cũng đúng. Muốn biết quy luật có bắt buộc là số chẵn hay không, bạn phải chủ động thử số lẻ.') },
      { t: GM.t('Each number bigger than the last', 'Mỗi số lớn hơn số trước'), correct: true,
        why: GM.t('Yes — the rule is just: strictly increasing. Broader and duller than most people’s guesses.', 'Đúng. Quy luật chỉ là số sau lớn hơn số trước, đơn giản và rộng hơn điều đa số mọi người đoán.') },
      { t: GM.t('Increasing by the same amount each time', 'Mỗi lần tăng cùng một lượng'), correct: false,
        why: GM.t('Every equal-step triple fits — and so does 1, 2, 50. A triple with unequal steps would have exposed this instantly.', 'Mọi dãy tăng đều đều đúng, nhưng 1, 2, 50 cũng đúng. Chỉ cần thử một dãy tăng không đều là bạn sẽ bác được giả thuyết này.') },
    ];
    var guessRow = GM.el('div', { class: 'gm-row' });
    GUESSES.forEach(function (g) {
      var b = GM.el('button', { class: 'btn small secondary' }, [g.t]);
      b.addEventListener('click', function () {
        if (done) return;
        done = true;
        verdictArea.appendChild(GM.feedback(g.correct ? 'good' : 'bad',
          '<strong>' + (g.correct ? GM.t('Correct.', 'Chính xác.') : GM.t('Not quite.', 'Chưa đúng.')) + '</strong> ' + g.why +
          GM.t(' The hidden rule: <strong>each number bigger than the last</strong> — nothing more.', ' Quy tắc bí mật: <strong>mỗi số lớn hơn số trước</strong> — chỉ vậy thôi.')));
        var total = yesCount + noCount;
        verdictArea.appendChild(GM.feedback(noCount === 0 ? 'warn' : 'info',
          GM.t('Your testing record: ', 'Bạn đã thử: ') + '<strong>' + yesCount + GM.t(' “fits”</strong> and <strong>', ' dãy đúng</strong> và <strong>') + noCount + GM.t(' “does not fit”</strong>', ' dãy sai</strong>') +
          (total ? '' : GM.t(' (you guessed without testing at all!)', ' (bạn đoán mà không thử!)')) + '. ' +
          (noCount === 0
            ? GM.t('Every test you ran was expected to succeed. That’s the trap this game was built to spring: testing only cases ' +
              'that <em>confirm</em> your hypothesis feels rigorous and proves nothing. The informative test is the one you ' +
              'expect to fail — the same lesson as Week 2: answers you can predict teach you nothing.', 'Bạn chỉ thử những dãy mà mình nghĩ chắc chắn sẽ đúng. Đây chính là cái bẫy: liên tục tìm ví dụ <em>ủng hộ</em> giả thuyết khiến ta tưởng mình đã kiểm tra kỹ, nhưng thực ra chưa loại được khả năng nào. Một phép thử tốt phải có cơ hội làm giả thuyết sai — cũng như ở Tuần 2, đáp án đã biết trước không cho ta thêm thông tin.')
            : GM.t('You tried to break your own hypothesis — the move most people never make. Tests you expect to fail are the ones that carry information.',
              'Bạn đã chủ động tìm cách bác giả thuyết của mình. Nhiều người bỏ qua bước này, trong khi chính những phép thử có thể cho kết quả ngược dự đoán mới giúp ta học được điều gì đó.'))));
        verdictArea.appendChild(GM.el('p', { class: 'note' },
          [GM.t('Connection to the puzzle: the memorizer and the understander both pass the tests they expect to pass. Only novel, ', 'Liên hệ với câu đố trước: người học thuộc và người thực sự hiểu đều làm được những bài quen thuộc. Muốn phân biệt hai trường hợp, ta cần một bài mới '),
           GM.el('em', {}, [GM.t('designed-to-break', 'được thiết kế để làm lộ điểm yếu')]), GM.t(' cases separate them. (Psychologists know this game as Wason’s 2-4-6 task, 1960.)', '. Trong tâm lý học, trò này được gọi là bài toán 2-4-6 của Wason (1960).')]));
      });
      guessRow.appendChild(b);
    });

    w.body.appendChild(GM.el('div', { class: 'gm-row' }, [inputs[0], inputs[1], inputs[2], testBtn]));
    w.body.appendChild(log);
    w.body.appendChild(GM.el('p', { class: 'note' }, [GM.t('When you’re confident, lock in the rule:', 'Khi đã có câu trả lời, hãy chọn một quy luật:')]));
    w.body.appendChild(guessRow);
    w.body.appendChild(verdictArea);
    container.appendChild(w.shell);
  };
})();
