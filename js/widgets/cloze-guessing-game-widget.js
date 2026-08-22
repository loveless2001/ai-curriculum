/* Cloze next-word guessing game. Two modes:
   - 'human' (Week 1): guess + surprise rating, then reveal typical human guesses.
   - 'versus' (Week 7): guess, then reveal human guesses next to the machine's scores. */
(function () {
  var EN_SENTENCES = [
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
  var VI_SENTENCES = [
    { text: 'Cô ấy rót cà phê vào ___', open: 'gần như bắt buộc', cands: [['cốc', .55, .54], ['tách', .28, .30], ['ly', .10, .09], ['bình giữ nhiệt', .05, .05], ['ấm', .02, .02]] },
    { text: 'Bác sĩ bảo anh ấy hít một hơi thật ___', open: 'gần như bắt buộc', cands: [['sâu', .95, .96], ['dài', .03, .02], ['mạnh', .01, .01], ['nhẹ', .01, .01]] },
    { text: 'Sinh nhật này cô ấy muốn được tặng ___', open: 'rất rộng mở', cands: [['một chú cún', .11, .09], ['một bữa tiệc', .10, .12], ['xe đạp', .09, .08], ['điện thoại', .08, .10], ['bánh kem', .07, .08], ['(hàng trăm đáp án khác…)', .55, .53]] },
    { text: 'Có công mài sắt, có ngày nên ___', open: 'bắt buộc', cands: [['kim', .98, .99], ['dao', .01, .01], ['thép', .01, 0]] },
    { text: 'Anh ấy mở cửa và nhìn thấy một ___', open: 'rất rộng mở', cands: [['người', .12, .14], ['người lạ', .09, .07], ['con chó', .07, .06], ['luồng sáng', .05, .05], ['đống bừa bộn', .04, .05], ['(hàng trăm đáp án khác…)', .63, .63]] },
    { text: 'Những con sóng xô vào ___', open: 'rộng nhưng đã thu hẹp', cands: [['bờ', .38, .41], ['ghềnh đá', .33, .34], ['vách đá', .12, .11], ['con thuyền', .09, .07], ['cầu tàu', .05, .04]] },
  ];
  var SENTENCES = GM.language.isVietnamese() ? VI_SENTENCES : EN_SENTENCES;

  GM.widgets['cloze-game'] = function (container, opts) {
    var versus = (opts.mode === 'versus');
    var w = GM.widgetShell(
      versus ? GM.t('Human vs machine cloze tournament', 'Giải đấu điền từ: người và máy') : GM.t('Cloze rounds', 'Các vòng điền từ'),
      versus ? GM.t('Guess first, then compare your instinct with typical human guesses and the machine’s scores.', 'Hãy đoán trước, rồi so trực giác của bạn với dự đoán điển hình của người và điểm số của máy.')
             : GM.t('Type your guess, rate your surprise-if-wrong, then reveal how people typically guess.', 'Nhập dự đoán, đánh giá mức bất ngờ nếu sai, rồi mở xem mọi người thường đoán thế nào.'));

    SENTENCES.forEach(function (s, idx) {
      var input = GM.el('input', { type: 'text', placeholder: GM.t('your guess…', 'dự đoán của bạn…'), 'aria-label': GM.t('guess for sentence ', 'dự đoán cho câu ') + (idx + 1) });
      var surprise = null;
      var chipRow = GM.el('div', { class: 'gm-row' });
      if (!versus) {
        chipRow.appendChild(GM.el('span', { class: 'note' }, [GM.t('If wrong, I’d be surprised:', 'Nếu sai, tôi sẽ bất ngờ:')]));
        [["not at all", "không hề"], ["a little", "một chút"], ["very", "rất nhiều"]].forEach(function (level) {
          var lvl = GM.t(level[0], level[1]);
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
      var btn = GM.el('button', { class: 'btn small' }, [GM.t('Reveal', 'Mở đáp án')]);
      btn.addEventListener('click', function () {
        btn.disabled = true;
        result.innerHTML = '';
        var guess = input.value.trim().toLowerCase();
        var hit = s.cands.some(function (c) { return c[0].toLowerCase() === guess; });
        if (guess) {
          result.appendChild(GM.feedback(hit ? 'good' : 'info', hit
            ? GM.t('Your guess appears in the sample responses.', 'Dự đoán của bạn có trong nhóm câu trả lời mẫu.')
            : GM.t('Your guess is not in this short sample. This may be normal for a “', 'Dự đoán của bạn không có trong nhóm mẫu ngắn này. Điều đó vẫn bình thường với chỗ trống “') + s.open + GM.t('” blank.', '”.')));
        }
        result.appendChild(GM.el('p', { class: 'note', style: { margin: '0.6em 0 0.2em' } },
          [versus ? GM.t('Typical human guesses (share of a roomful of people):', 'Dự đoán điển hình của người (tỷ lệ trong một phòng):') : GM.t('How a roomful of people typically guesses:', 'Một phòng đầy người thường đoán như sau:')]));
        s.cands.forEach(function (c) { result.appendChild(GM.distRow(c[0], c[1], false)); });
        if (versus) {
          result.appendChild(GM.el('p', { class: 'note', style: { margin: '0.6em 0 0.2em' } }, [GM.t('The machine’s scores for the same blank:', 'Điểm của máy cho cùng chỗ trống:')]));
          s.cands.forEach(function (c) { result.appendChild(GM.distRow(c[0], c[2], true)); });
          result.appendChild(GM.feedback('info', GM.t('Compare the bars. When people strongly prefer one word, the model also gives that word a high score. When people give many answers, the model’s scores are more spread out.', 'Hãy so các thanh điểm. Khi nhiều người cùng chọn một từ, mô hình cũng cho từ đó điểm cao. Khi câu trả lời của người phân tán, điểm của mô hình cũng trải rộng hơn.')));
        }
        result.appendChild(GM.el('p', { class: 'note' }, [GM.t('This blank is: ', 'Chỗ trống này: '), GM.el('strong', {}, [s.open]), '.']));
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
