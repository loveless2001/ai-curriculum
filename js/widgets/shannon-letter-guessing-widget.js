/* Shannon's 1951 letter-guessing game: reveal a hidden sentence letter by letter,
   counting guesses per letter. Demonstrates that English is measurably predictable. */
(function () {
  var TEXT = GM.t('IT WAS A DARK AND STORMY NIGHT', 'TRỜI TỐI VÀ MƯA RẤT TO');
  var KEYS = GM.t('ABCDEFGHIJKLMNOPQRSTUVWXYZ␣', 'AĂÂBCDĐEÊGHIKLMNOÔƠPQRSTUƯVXYÀÁẢÃẠÈÉẺẼẸÌÍỈĨỊÒÓỎÕỌỜỚỞỠỢÙÚỦŨỤ␣').split('');

  GM.widgets['shannon-game'] = function (container) {
    var w = GM.widgetShell(GM.t('Play Betty’s side', 'Thử vai của Betty'),
      GM.t('A sentence is hidden. Guess it one letter at a time (␣ = space). Wrong guesses stay struck out; your guess-count per letter is the measurement.', 'Một câu đang bị giấu. Đoán từng ký tự (␣ = dấu cách). Lựa chọn sai bị gạch; số lượt đoán cho mỗi ký tự là phép đo.'));

    var pos = 0, guessesThisLetter = 0, counts = [];
    var revealed = GM.el('div', { class: 'revealed-text' }, ['· '.repeat(TEXT.length).trim()]);
    var grid = GM.el('div', { class: 'letter-grid' });
    var status = GM.el('p', { class: 'note' }, [GM.t('Letter 1 of ', 'Ký tự 1 trên ') + TEXT.length + GM.t(' — take a guess.', ' — hãy đoán.')]);
    var strip = GM.el('div', { class: 'guess-count-strip' });
    var summary = GM.el('div');

    function renderRevealed() {
      var out = '';
      for (var i = 0; i < TEXT.length; i++) {
        out += i < pos ? (TEXT[i] === ' ' ? '␣' : TEXT[i]) : '·';
        out += ' ';
      }
      revealed.textContent = out.trim();
    }
    function resetKeys() {
      grid.querySelectorAll('button').forEach(function (b) { b.disabled = false; });
    }
    function heat(n) {
      if (n === 1) return 'var(--good-soft)';
      if (n <= 3) return 'var(--gold-soft)';
      return 'var(--bad-soft)';
    }
    function finish() {
      var total = counts.reduce(function (a, b) { return a + b; }, 0);
      var ones = counts.filter(function (c) { return c === 1; }).length;
      summary.appendChild(GM.feedback('good',
        GM.t(
          'Done. <strong>' + total + ' guesses for ' + TEXT.length + ' letters</strong> — ' + ones + ' letters took exactly one guess. If English letters were unpredictable coin-flips over 27 symbols, you’d have needed about ' + (TEXT.length * 14) + ' guesses. The gap between those numbers <em>is</em> the predictability of English — and your own expectations were the measuring instrument. That’s Shannon’s 1951 result, and you just reproduced it.',
          'Xong. <strong>' + total + ' lượt đoán cho ' + TEXT.length + ' ký tự</strong> — ' + ones + ' ký tự chỉ cần đúng một lượt. Nếu các ký tự không thể dự đoán và mọi phím đều ngang nhau, bạn sẽ cần nhiều lượt hơn rất nhiều. Khoảng cách ấy chính là tính có thể dự đoán của ngôn ngữ — và kỳ vọng của bạn là dụng cụ đo. Bạn vừa tái tạo ý tưởng trong thí nghiệm Shannon năm 1951.')));
    }
    KEYS.forEach(function (k) {
      var b = GM.el('button', { class: 'letter-key', 'aria-label': GM.t('guess ', 'đoán ') + k }, [k]);
      b.addEventListener('click', function () {
        if (pos >= TEXT.length) return;
        guessesThisLetter++;
        var target = TEXT[pos] === ' ' ? '␣' : TEXT[pos];
        if (k === target) {
          counts.push(guessesThisLetter);
          strip.appendChild(GM.el('span', {
            class: 'guess-count-cell', title: GM.t('guesses for "', 'số lượt cho "') + target + '"',
            style: { background: heat(guessesThisLetter) },
          }, [String(guessesThisLetter)]));
          pos++; guessesThisLetter = 0;
          renderRevealed(); resetKeys();
          if (pos >= TEXT.length) { status.textContent = GM.t('Finished.', 'Đã hoàn thành.'); finish(); }
          else status.textContent = GM.t('Letter ', 'Ký tự ') + (pos + 1) + GM.t(' of ', ' trên ') + TEXT.length + GM.t(' — take a guess.', ' — hãy đoán.');
        } else {
          b.disabled = true;
        }
      });
      grid.appendChild(b);
    });
    renderRevealed();
    w.body.appendChild(revealed);
    w.body.appendChild(grid);
    w.body.appendChild(status);
    w.body.appendChild(GM.el('p', { class: 'note' }, [GM.t('Guesses needed per letter (green = 1st try):', 'Số lượt cần cho từng ký tự (xanh = đúng ngay lần đầu):')]));
    w.body.appendChild(strip);
    w.body.appendChild(summary);
    container.appendChild(w.shell);
  };
})();
