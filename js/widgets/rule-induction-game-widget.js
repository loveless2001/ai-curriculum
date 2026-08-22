/* Rule induction game (disguised Wason 2-4-6): probe a hidden rule with triples,
   then commit to a guess. Tracks whether the player ever tried to FALSIFY. */
(function () {
  var fitsRule = function (a, b, c) { return a < b && b < c; }; // each number bigger than the last

  GM.widgets['rule-induction'] = function (container) {
    var w = GM.widgetShell(GM.t('Probe the hidden rule', 'Thăm dò quy tắc bí mật'),
      GM.t('Example that fits: 2, 4, 6. Enter any triple to test it. When confident, lock in your guess.', 'Ví dụ phù hợp: 2, 4, 6. Nhập bộ ba bất kỳ để thử. Khi đủ tin chắc, hãy chốt dự đoán.'));
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
      { t: GM.t('Counting up by 2 (like 2, 4, 6)', 'Tăng mỗi lần 2 (như 2, 4, 6)'), correct: false,
        why: GM.t('Plausible — every by-2 triple fits. But so do 1, 7, 100. Did you ever test a triple that would break this guess?', 'Nghe hợp lý — mọi bộ tăng 2 đều phù hợp. Nhưng 1, 7, 100 cũng vậy. Bạn đã thử bộ nào có thể phá dự đoán này chưa?') },
      { t: GM.t('Even numbers, increasing', 'Các số chẵn tăng dần'), correct: false,
        why: GM.t('All your even increasing triples fit — but 1, 3, 5 fits too. Only a deliberate odd-number test could tell you.', 'Mọi bộ số chẵn tăng dần đều phù hợp — nhưng 1, 3, 5 cũng vậy. Chỉ phép thử cố ý dùng số lẻ mới phân biệt được.') },
      { t: GM.t('Each number bigger than the last', 'Mỗi số lớn hơn số trước'), correct: true,
        why: GM.t('Yes — the rule is just: strictly increasing. Broader and duller than most people’s guesses.', 'Đúng — quy tắc chỉ là tăng nghiêm ngặt. Rộng hơn và đơn giản hơn dự đoán của đa số.') },
      { t: GM.t('Increasing by the same amount each time', 'Mỗi lần tăng cùng một lượng'), correct: false,
        why: GM.t('Every equal-step triple fits — and so does 1, 2, 50. A triple with unequal steps would have exposed this instantly.', 'Mọi bộ có bước bằng nhau đều phù hợp — và 1, 2, 50 cũng vậy. Một bộ có bước không đều sẽ phơi bày điều này ngay.') },
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
          GM.t('Your testing record: ', 'Hồ sơ kiểm tra: ') + '<strong>' + yesCount + GM.t(' “fits”</strong> and <strong>', ' “phù hợp”</strong> và <strong>') + noCount + GM.t(' “does not fit”</strong>', ' “không phù hợp”</strong>') +
          (total ? '' : GM.t(' (you guessed without testing at all!)', ' (bạn đoán mà không thử!)')) + '. ' +
          (noCount === 0
            ? GM.t('Every test you ran was expected to succeed. That’s the trap this game was built to spring: testing only cases ' +
              'that <em>confirm</em> your hypothesis feels rigorous and proves nothing. The informative test is the one you ' +
              'expect to fail — the same lesson as Week 2: answers you can predict teach you nothing.', 'Mọi phép thử bạn chạy đều được kỳ vọng sẽ thành công. Đây là cái bẫy: chỉ thử trường hợp <em>xác nhận</em> giả thuyết tạo cảm giác chặt chẽ nhưng không chứng minh gì. Phép thử giàu thông tin là phép bạn kỳ vọng thất bại — cùng bài học Tuần 2: đáp án đoán trước không dạy được gì.')
            : GM.t('You tried to break your own hypothesis — the move most people never make. Tests you expect to fail are the ones that carry information.',
              'Bạn đã cố phá giả thuyết của chính mình — nước đi đa số không làm. Phép thử bạn kỳ vọng thất bại mới mang thông tin.'))));
        verdictArea.appendChild(GM.el('p', { class: 'note' },
          [GM.t('Connection to the puzzle: the memorizer and the understander both pass the tests they expect to pass. Only novel, ', 'Liên hệ câu đố: người học thuộc và người hiểu đều vượt các bài họ dự kiến vượt. Chỉ trường hợp mới, '),
           GM.el('em', {}, [GM.t('designed-to-break', 'được thiết kế để phá')]), GM.t(' cases separate them. (Psychologists know this game as Wason’s 2-4-6 task, 1960.)', ' mới tách được họ. (Trong tâm lý học, đây là bài 2-4-6 của Wason, 1960.)')]));
      });
      guessRow.appendChild(b);
    });

    w.body.appendChild(GM.el('div', { class: 'gm-row' }, [inputs[0], inputs[1], inputs[2], testBtn]));
    w.body.appendChild(log);
    w.body.appendChild(GM.el('p', { class: 'note' }, [GM.t('When you’re confident, lock in the rule:', 'Khi đủ tin chắc, hãy chốt quy tắc:')]));
    w.body.appendChild(guessRow);
    w.body.appendChild(verdictArea);
    container.appendChild(w.shell);
  };
})();
