/* The knob lab: fixed score-cards (logits) for three prompt types; a live
   temperature slider + choosing rule. Shows the scorer/chooser separation and why
   the knob only matters where the distribution is open. */
(function () {
  var PROMPTS = [
    { label: 'Factual: “The capital of France is”', kind: 'forced',
      cands: [['Paris', 6.0], ['located', 1.2], ['the', 0.8], ['famous', 0.5], ['Lyon', 0.1]] },
    { label: 'Creative: “Once upon a time, the dragon”', kind: 'open',
      cands: [['slept', 1.4], ['roared', 1.3], ['wept', 1.1], ['waited', 1.0], ['sneezed', 0.8], ['dreamed', 0.9]] },
    { label: 'Ambiguous: “The best movie ever made is”', kind: 'open',
      cands: [['probably', 1.3], ['Casablanca', 1.1], ['subjective', 1.2], ['impossible', 1.0], ['whatever', 0.8]] },
  ];
  var RULES = [
    { id: 'top1', label: 'always take the top' },
    { id: 'dice', label: 'weighted dice' },
    { id: 'top3', label: 'dice among top 3' },
  ];
  if (GM.language.isVietnamese()) {
    PROMPTS = [
      { label: 'Dữ kiện: “Thủ đô của Việt Nam là”', kind: 'forced', cands: [['Hà Nội', 6.0], ['nằm', 1.2], ['một', 0.8], ['nổi tiếng', 0.5], ['Huế', 0.1]] },
      { label: 'Sáng tạo: “Ngày xửa ngày xưa, con rồng”', kind: 'open', cands: [['ngủ', 1.4], ['gầm', 1.3], ['khóc', 1.1], ['chờ đợi', 1.0], ['hắt hơi', 0.8], ['mơ', 0.9]] },
      { label: 'Mơ hồ: “Bộ phim hay nhất từng được làm là”', kind: 'open', cands: [['có lẽ', 1.3], ['Casablanca', 1.1], ['chủ quan', 1.2], ['không thể chọn', 1.0], ['bất kỳ phim nào', 0.8]] },
    ];
    RULES = [
      { id: 'top1', label: 'luôn lấy từ đầu bảng' },
      { id: 'dice', label: 'xúc xắc có trọng số' },
      { id: 'top3', label: 'gieo trong 3 từ đầu' },
    ];
  }

  GM.widgets['temperature-lab'] = function (container) {
    var w = GM.widgetShell(GM.t('The knob lab', 'Phòng thí nghiệm núm chọn'),
      GM.t('Choose weighted dice to explore temperature. The left bars are prepared scores. The right bars show the selection probabilities after applying your settings.', 'Chọn xúc xắc có trọng số để thử temperature. Các thanh bên trái là điểm soạn sẵn. Các thanh bên phải là xác suất chọn sau khi áp dụng cài đặt.'));
    var promptSel = GM.el('select', { 'aria-label': GM.t('prompt', 'yêu cầu') });
    PROMPTS.forEach(function (p, i) { promptSel.appendChild(GM.el('option', { value: String(i) }, [p.label])); });
    var ruleSel = GM.el('select', { 'aria-label': GM.t('choosing rule', 'quy tắc chọn') });
    RULES.forEach(function (r) { ruleSel.appendChild(GM.el('option', { value: r.id }, [r.label])); });
    var temp = GM.el('input', { type: 'range', min: '0', max: '1.5', step: '0.1', value: '0.7' });
    var tempVal = GM.el('span', { class: 'slider-val' }, ['T = 0.7']);
    var scoreCard = GM.el('div');
    var distCard = GM.el('div');
    var samples = GM.el('div');
    var note = GM.el('div');

    function current() { return PROMPTS[parseInt(promptSel.value || '0', 10)]; }
    function probs() {
      var p = current();
      var t = parseFloat(temp.value);
      var scores = p.cands.map(function (c) { return c[1]; });
      var pr = GM.softmaxT(scores, t);
      if (ruleSel.value === 'top1') {
        var best = scores.indexOf(Math.max.apply(null, scores));
        pr = scores.map(function (_, i) { return i === best ? 1 : 0; });
      } else if (ruleSel.value === 'top3') {
        var idx = scores.map(function (s, i) { return [s, i]; }).sort(function (a, b) { return b[0] - a[0]; }).slice(0, 3).map(function (x) { return x[1]; });
        var masked = pr.map(function (v, i) { return idx.indexOf(i) !== -1 ? v : 0; });
        var sum = masked.reduce(function (a, b) { return a + b; }, 0) || 1;
        pr = masked.map(function (v) { return v / sum; });
      }
      return pr;
    }
    function render() {
      var p = current();
      tempVal.textContent = 'T = ' + parseFloat(temp.value).toFixed(1);
      scoreCard.innerHTML = ''; distCard.innerHTML = ''; samples.innerHTML = ''; note.innerHTML = '';
      scoreCard.appendChild(GM.el('p', { class: 'note', style: { margin: '0 0 .2em' } }, [GM.t('THE SCORER’S CARD (fixed raw scores — never changes for this prompt):', 'THẺ CỦA NGƯỜI CHẤM (điểm thô cố định — không đổi với yêu cầu này):')]));
      var maxScore = Math.max.apply(null, p.cands.map(function (c) { return c[1]; }));
      p.cands.forEach(function (c) { scoreCard.appendChild(GM.distRow(c[0], c[1] / maxScore * 0.95, false)); });
      distCard.appendChild(GM.el('p', { class: 'note', style: { margin: '.8em 0 .2em' } }, [GM.t('THE CHOOSER’S ODDS (after your knob + rule are applied):', 'XÁC SUẤT CỦA NGƯỜI CHỌN (sau khi áp dụng núm và quy tắc):')]));
      var pr = probs();
      p.cands.forEach(function (c, i) { distCard.appendChild(GM.distRow(c[0], pr[i], true)); });
      note.appendChild(GM.feedback('info', p.kind === 'forced'
        ? GM.t('One candidate has a much higher score. Changing temperature has little effect here.', 'Một ứng viên có điểm cao hơn hẳn. Thay đổi temperature ít tác động trong trường hợp này.')
        : GM.t('Several candidates have similar scores. Temperature therefore has a larger effect on which one is selected.', 'Nhiều ứng viên có điểm gần nhau. Vì vậy, temperature ảnh hưởng nhiều hơn đến lựa chọn cuối.')));
    }
    var runBtn = GM.el('button', { class: 'btn small' }, [GM.t('Generate 5 times', 'Tạo 5 lần')]);
    runBtn.addEventListener('click', function () {
      var p = current(); var pr = probs();
      samples.innerHTML = '';
      var outs = [];
      for (var i = 0; i < 5; i++) outs.push(p.cands[GM.sample(pr)][0]);
      samples.appendChild(GM.el('div', { class: 'machine-out' }, [
        GM.el('span', { class: 'machine-tag' }, [GM.t('5 runs, same prompt, same model', '5 lượt, cùng yêu cầu, cùng mô hình')]),
        outs.map(function (o, i) { return GM.t('run ', 'lượt ') + (i + 1) + ': …' + o; }).join('\n'),
      ]));
      var allSame = outs.every(function (o) { return o === outs[0]; });
      samples.appendChild(GM.feedback(allSame ? 'good' : 'info', allSame
        ? GM.t('All five selections match. This can happen by a fixed rule or by chance; matching samples alone do not tell you which.', 'Cả năm lần đều giống nhau. Có thể do quy tắc cố định hoặc trùng hợp ngẫu nhiên; chỉ nhìn kết quả chưa biết trường hợp nào.')
        : GM.t('Five runs produced ', 'Năm lượt tạo ra ') + new Set(outs).size + GM.t(' different outputs. The model scores stayed fixed; only the selection step varied.', ' đầu ra khác nhau. Điểm của mô hình không đổi; chỉ bước chọn thay đổi.')));
    });
    [promptSel, ruleSel].forEach(function (s) { s.addEventListener('change', render); });
    temp.addEventListener('input', render);
    w.body.appendChild(GM.el('div', { class: 'gm-row' }, [promptSel, ruleSel]));
    w.body.appendChild(GM.el('div', { class: 'gm-slider' }, [GM.el('span', { class: 'note' }, [GM.t('the knob:', 'núm chọn:')]), temp, tempVal]));
    w.body.appendChild(scoreCard);
    w.body.appendChild(distCard);
    w.body.appendChild(GM.el('div', { class: 'gm-row' }, [runBtn]));
    w.body.appendChild(samples);
    w.body.appendChild(note);
    render();
    container.appendChild(w.shell);
  };
})();
