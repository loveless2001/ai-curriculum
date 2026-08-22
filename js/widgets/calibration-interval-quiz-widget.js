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
  var VI_QUESTIONS = {
    1: ['Chiều dài sông Nile (km)', 'Năm máy in Gutenberg được phát minh', 'Độ cao Everest (m)', 'Số xương trong cơ thể người trưởng thành', 'Khoảng cách Trái Đất đến Mặt Trăng (km)', 'Năm Napoleon thất bại ở Waterloo', 'Điểm sâu nhất đại dương (m)', 'Số quốc gia ở châu Phi', 'Nhiệt độ sôi của nước trên đỉnh Everest (°C)', 'Dân số thế giới năm 1900 (tỷ người)'],
    2: ['Tổng chiều dài mọi nhánh Vạn Lý Trường Thành (km)', 'Năm email đầu tiên được gửi', 'Khối lượng cá voi xanh trưởng thành (tấn)', 'Số phím trên đàn piano tiêu chuẩn', 'Tuổi cây sống lâu nhất đã biết (năm)', 'Tốc độ âm thanh ở mực nước biển (km/h)'],
  };
  if (GM.language.isVietnamese()) Object.keys(ROUNDS).forEach(function (round) {
    ROUNDS[round].forEach(function (item, index) { item.q = VI_QUESTIONS[round][index]; });
  });

  GM.widgets['calibration-quiz'] = function (container, opts) {
    var round = opts.round || 1;
    var qs = ROUNDS[round];
    var w = GM.widgetShell(GM.t('Calibration quiz — round ', 'Trắc nghiệm hiệu chuẩn — vòng ') + round,
      GM.t('For each: a low and a high bound you are 90% sure bracket the true value. Wide honest ranges beat narrow brave ones.', 'Với mỗi câu: nhập cận dưới và cận trên mà bạn tin chắc 90% là bao quanh giá trị thật. Khoảng rộng thành thật tốt hơn khoảng hẹp liều lĩnh.'));
    var rows = [];
    var table = GM.el('table');
    table.appendChild(GM.el('thead', {}, [GM.el('tr', {}, [
      GM.el('th', {}, [GM.t('Question', 'Câu hỏi')]), GM.el('th', {}, [GM.t('Low', 'Cận dưới')]), GM.el('th', {}, [GM.t('High', 'Cận trên')]), GM.el('th', {}, ['']),
    ])]));
    var tbody = GM.el('tbody');
    qs.forEach(function (item) {
      var lo = GM.el('input', { type: 'number', style: { width: '6.5em' }, step: 'any', 'aria-label': GM.t('low bound', 'cận dưới') });
      var hi = GM.el('input', { type: 'number', style: { width: '6.5em' }, step: 'any', 'aria-label': GM.t('high bound', 'cận trên') });
      var mark = GM.el('td');
      rows.push({ item: item, lo: lo, hi: hi, mark: mark });
      tbody.appendChild(GM.el('tr', {}, [GM.el('td', {}, [item.q]), GM.el('td', {}, [lo]), GM.el('td', {}, [hi]), mark]));
    });
    table.appendChild(tbody);
    var result = GM.el('div');
    var btn = GM.el('button', { class: 'btn small' }, [GM.t('Score my round', 'Chấm vòng này')]);
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
        verdict = GM.feedback('good', GM.t('<strong>' + hits + ' of ' + answered + ' ranges contained the truth.</strong> At 90% confidence, ' + expected + ' was the target — you’re in calibrated territory. (Check: were the ranges honest, or so wide they said nothing?)', '<strong>' + hits + '/' + answered + ' khoảng chứa giá trị thật.</strong> Với mức tin chắc 90%, mục tiêu là ' + expected + ' — bạn đang ở vùng được hiệu chuẩn. (Hãy kiểm tra: khoảng có thành thật hay rộng đến mức không nói gì?)'));
      } else {
        verdict = GM.feedback('bad', GM.t('<strong>' + hits + ' of ' + answered + ' ranges contained the truth.</strong> A calibrated 90% would land near ' + expected + '. You just measured your own overconfidence — congratulations, that measurement is rarer than it sounds. The fix isn’t knowing more trivia; it’s widening ranges until they’re honest.', '<strong>' + hits + '/' + answered + ' khoảng chứa giá trị thật.</strong> Mức 90% được hiệu chuẩn sẽ gần ' + expected + '. Bạn vừa đo được sự quá tự tin của mình — phép đo hiếm hơn tưởng tượng. Cách sửa không phải biết thêm dữ kiện vụn, mà là mở rộng khoảng cho đến khi thành thật.'));
      }
      result.appendChild(verdict);
      GM.store.setSaved('calibration-round-' + round, { hits: hits, answered: answered });
      var other = GM.store.getSaved('calibration-round-' + (round === 1 ? 2 : 1), null);
      if (other) {
        result.appendChild(GM.feedback('info', GM.t('Across both rounds: round 1 ', 'Qua cả hai vòng: vòng 1 ') +
          describe(round === 1 ? { hits: hits, answered: answered } : other) + GM.t(', round 2 ', ', vòng 2 ') +
          describe(round === 2 ? { hits: hits, answered: answered } : other) + GM.t('. Did widening help? This record returns in Week 9, when you put the same question to the machine.', '. Việc mở rộng có giúp không? Hồ sơ này sẽ quay lại ở Tuần 9, khi bạn đặt cùng câu hỏi cho cỗ máy.')));
      }
    });
    function describe(r) { return r.hits + '/' + r.answered; }
    w.body.appendChild(table);
    w.body.appendChild(GM.el('div', { class: 'gm-row' }, [btn]));
    w.body.appendChild(result);
    container.appendChild(w.shell);
  };
})();
