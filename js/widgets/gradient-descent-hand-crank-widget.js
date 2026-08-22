/* Hand-cranked gradient descent on a one-parameter model (guess y = w·x).
   Arithmetic only: feel the slope, step downhill, watch surprise fall.
   Includes a reckless-step mode that overshoots — the honest failure mode. */
(function () {
  var DATA = [[1, 2], [2, 4], [3, 6]]; // truth: y = 2x
  function loss(w) {
    var s = 0;
    DATA.forEach(function (d) { var m = w * d[0] - d[1]; s += m * m; });
    return s / DATA.length;
  }
  function grad(w) {
    var s = 0;
    DATA.forEach(function (d) { s += 2 * d[0] * (w * d[0] - d[1]); });
    return s / DATA.length;
  }

  GM.widgets['gradient-descent'] = function (container) {
    var w = GM.widgetShell(GM.t('Train a one-number model by hand', 'Tự tay huấn luyện mô hình một con số'),
      GM.t('The model: “my guess for y is w times x.” The data: (1→2), (2→4), (3→6). Your job: adjust w until surprise stops falling.', 'Mô hình: “tôi đoán y bằng w nhân x.” Dữ liệu: (1→2), (2→4), (3→6). Hãy chỉnh w đến khi mức bất ngờ ngừng giảm.'));
    var wVal = 3.6, steps = 0;
    var W_MIN = -0.5, W_MAX = 4.5;
    var svg = GM.el('div');
    var table = GM.el('div');
    var log = GM.el('div');

    function plot() {
      var pts = [];
      var maxLoss = loss(W_MIN);
      for (var i = 0; i <= 100; i++) {
        var wi = W_MIN + (W_MAX - W_MIN) * i / 100;
        var x = 30 + 350 * i / 100;
        var y = 190 - 160 * loss(wi) / maxLoss;
        pts.push((i ? 'L' : 'M') + x.toFixed(1) + ',' + y.toFixed(1));
      }
      var cw = Math.min(Math.max(wVal, W_MIN), W_MAX);
      var bx = 30 + 350 * (cw - W_MIN) / (W_MAX - W_MIN);
      var by = 190 - 160 * Math.min(loss(cw), maxLoss) / maxLoss;
      var offChart = (wVal < W_MIN || wVal > W_MAX);
      svg.innerHTML =
        '<svg class="gm-plot" viewBox="0 0 400 220" role="img" aria-label="' + GM.t('loss landscape with current position', 'địa hình loss và vị trí hiện tại') + '">' +
        '<line class="plot-axis" x1="30" y1="190" x2="390" y2="190"></line>' +
        '<line class="plot-axis" x1="30" y1="10" x2="30" y2="190"></line>' +
        '<path class="plot-line" d="' + pts.join(' ') + '"></path>' +
        '<circle class="plot-ball" cx="' + bx + '" cy="' + by + '" r="7"></circle>' +
        '<text x="200" y="212" text-anchor="middle">' + GM.t('the adjustable number w', 'con số điều chỉnh được w') + '</text>' +
        '<text x="12" y="100" transform="rotate(-90 12 100)" text-anchor="middle">' + GM.t('surprise', 'bất ngờ') + '</text>' +
        '<text x="' + bx + '" y="' + (by - 12) + '" text-anchor="middle">w=' + wVal.toFixed(2) + '</text>' +
        '</svg>' +
        (offChart ? '<p class="feedback bad">' + GM.t('The ball flew off the chart — see the log.', 'Quả bóng bay khỏi đồ thị — xem nhật ký.') + '</p>' : '');
      var rows = DATA.map(function (d) {
        var g = wVal * d[0];
        return '<tr><td>' + d[0] + '</td><td>' + d[1] + '</td><td>' + g.toFixed(2) + '</td><td>' + (g - d[1]).toFixed(2) + '</td></tr>';
      }).join('');
      table.innerHTML = '<table><thead><tr><th>x</th><th>' + GM.t('true y', 'y thật') + '</th><th>' + GM.t('model’s guess (w·x)', 'dự đoán của mô hình (w·x)') + '</th><th>' + GM.t('miss', 'sai lệch') + '</th></tr></thead>' +
        '<tbody>' + rows + '</tbody></table>' +
        '<p class="note">' + GM.t('surprise (average squared miss): ', 'bất ngờ (trung bình bình phương sai lệch): ') + '<strong class="mono">' + loss(wVal).toFixed(3) + '</strong></p>';
    }
    function feel() {
      var g = grad(wVal);
      log.insertBefore(GM.feedback('info',
        GM.t('Slope under your feet: ', 'Độ dốc dưới chân: ') + '<span class="mono">' + g.toFixed(2) + '</span> — ' + GM.t('surprise ', 'mức bất ngờ ') +
        (Math.abs(g) < 0.05 ? GM.t('is flat here. You’re at the bottom.', 'phẳng ở đây. Bạn đang ở đáy.') : (g > 0 ? GM.t('rises to the right, so downhill is <strong>left</strong> (decrease w).', 'tăng về bên phải, nên xuống dốc là sang <strong>trái</strong> (giảm w).') : GM.t('rises to the left, so downhill is <strong>right</strong> (increase w).', 'tăng về bên trái, nên xuống dốc là sang <strong>phải</strong> (tăng w).')))), log.firstChild);
    }
    function step(lr, label) {
      var g = grad(wVal);
      var before = loss(wVal);
      wVal = wVal - lr * g;
      steps++;
      var after = loss(wVal);
      log.insertBefore(GM.feedback(after < before ? 'good' : 'bad',
        GM.t('Step ', 'Bước ') + steps + ' (' + label + '): w ' + GM.t('moved by ', 'dịch ') + '<span class="mono">' + (-lr * g).toFixed(3) + '</span> → w = <span class="mono">' +
        wVal.toFixed(3) + '</span>. ' + GM.t('Surprise: ', 'Bất ngờ: ') + '<span class="mono">' + before.toFixed(3) + ' → ' + after.toFixed(3) + '</span>' +
        (after < before ? '' : GM.t(' — it went UP. Too big a step overshoots the valley and can bounce out entirely. Real training tunes the step size for exactly this reason.', ' — nó TĂNG. Bước quá lớn vượt qua thung lũng và có thể bật hẳn ra ngoài. Huấn luyện thật điều chỉnh kích thước bước chính vì lý do này.'))), log.firstChild);
      plot();
    }
    var feelBtn = GM.el('button', { class: 'btn small secondary' }, [GM.t('Feel the slope', 'Cảm nhận độ dốc')]);
    feelBtn.addEventListener('click', feel);
    var smallBtn = GM.el('button', { class: 'btn small' }, [GM.t('Small step downhill', 'Bước nhỏ xuống dốc')]);
    smallBtn.addEventListener('click', function () { step(0.02, GM.t('small', 'nhỏ')); });
    var bigBtn = GM.el('button', { class: 'btn small' }, [GM.t('Bold step downhill', 'Bước mạnh xuống dốc')]);
    bigBtn.addEventListener('click', function () { step(0.08, GM.t('bold', 'mạnh')); });
    var recklessBtn = GM.el('button', { class: 'btn small secondary' }, [GM.t('Reckless step', 'Bước liều lĩnh')]);
    recklessBtn.addEventListener('click', function () { step(0.25, GM.t('reckless', 'liều lĩnh')); });
    var resetBtn = GM.el('button', { class: 'btn small secondary' }, [GM.t('Reset', 'Đặt lại')]);
    resetBtn.addEventListener('click', function () { wVal = 3.6; steps = 0; log.innerHTML = ''; plot(); });
    w.body.appendChild(svg);
    w.body.appendChild(table);
    w.body.appendChild(GM.el('div', { class: 'gm-row' }, [feelBtn, smallBtn, bigBtn, recklessBtn, resetBtn]));
    w.body.appendChild(log);
    w.body.appendChild(GM.el('p', { class: 'note' },
      [GM.t('This is the whole of training: guess, measure surprise, nudge downhill, repeat. A real model does exactly this with ', 'Đây là toàn bộ huấn luyện: đoán, đo bất ngờ, đẩy xuống dốc, lặp lại. Mô hình thật làm đúng việc này với '),
       GM.el('strong', {}, [GM.t('billions', 'hàng tỷ')]), GM.t(' of numbers at once, trillions of times — downhill in the dark, one small step at a time.', ' con số cùng lúc, hàng nghìn tỷ lần — xuống dốc trong bóng tối, từng bước nhỏ.')]));
    plot();
    container.appendChild(w.shell);
  };
})();
