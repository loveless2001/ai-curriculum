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
    var w = GM.widgetShell('Train a one-number model by hand',
      'The model: “my guess for y is w times x.” The data: (1→2), (2→4), (3→6). Your job: adjust w until surprise stops falling.');
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
        '<svg class="gm-plot" viewBox="0 0 400 220" role="img" aria-label="loss landscape with current position">' +
        '<line class="plot-axis" x1="30" y1="190" x2="390" y2="190"></line>' +
        '<line class="plot-axis" x1="30" y1="10" x2="30" y2="190"></line>' +
        '<path class="plot-line" d="' + pts.join(' ') + '"></path>' +
        '<circle class="plot-ball" cx="' + bx + '" cy="' + by + '" r="7"></circle>' +
        '<text x="200" y="212" text-anchor="middle">the adjustable number w</text>' +
        '<text x="12" y="100" transform="rotate(-90 12 100)" text-anchor="middle">surprise</text>' +
        '<text x="' + bx + '" y="' + (by - 12) + '" text-anchor="middle">w=' + wVal.toFixed(2) + '</text>' +
        '</svg>' +
        (offChart ? '<p class="feedback bad">The ball flew off the chart — see the log.</p>' : '');
      var rows = DATA.map(function (d) {
        var g = wVal * d[0];
        return '<tr><td>' + d[0] + '</td><td>' + d[1] + '</td><td>' + g.toFixed(2) + '</td><td>' + (g - d[1]).toFixed(2) + '</td></tr>';
      }).join('');
      table.innerHTML = '<table><thead><tr><th>x</th><th>true y</th><th>model’s guess (w·x)</th><th>miss</th></tr></thead>' +
        '<tbody>' + rows + '</tbody></table>' +
        '<p class="note">surprise (average squared miss): <strong class="mono">' + loss(wVal).toFixed(3) + '</strong></p>';
    }
    function feel() {
      var g = grad(wVal);
      log.insertBefore(GM.feedback('info',
        'Slope under your feet: <span class="mono">' + g.toFixed(2) + '</span> — surprise ' +
        (Math.abs(g) < 0.05 ? 'is flat here. You’re at the bottom.' : (g > 0 ? 'rises to the right, so downhill is <strong>left</strong> (decrease w).' : 'rises to the left, so downhill is <strong>right</strong> (increase w).'))), log.firstChild);
    }
    function step(lr, label) {
      var g = grad(wVal);
      var before = loss(wVal);
      wVal = wVal - lr * g;
      steps++;
      var after = loss(wVal);
      log.insertBefore(GM.feedback(after < before ? 'good' : 'bad',
        'Step ' + steps + ' (' + label + '): w moved by <span class="mono">' + (-lr * g).toFixed(3) + '</span> → w = <span class="mono">' +
        wVal.toFixed(3) + '</span>. Surprise: <span class="mono">' + before.toFixed(3) + ' → ' + after.toFixed(3) + '</span>' +
        (after < before ? '' : ' — it went UP. Too big a step overshoots the valley and can bounce out entirely. Real training tunes the step size for exactly this reason.')), log.firstChild);
      plot();
    }
    var feelBtn = GM.el('button', { class: 'btn small secondary' }, ['Feel the slope']);
    feelBtn.addEventListener('click', feel);
    var smallBtn = GM.el('button', { class: 'btn small' }, ['Small step downhill']);
    smallBtn.addEventListener('click', function () { step(0.02, 'small'); });
    var bigBtn = GM.el('button', { class: 'btn small' }, ['Bold step downhill']);
    bigBtn.addEventListener('click', function () { step(0.08, 'bold'); });
    var recklessBtn = GM.el('button', { class: 'btn small secondary' }, ['Reckless step']);
    recklessBtn.addEventListener('click', function () { step(0.25, 'reckless'); });
    var resetBtn = GM.el('button', { class: 'btn small secondary' }, ['Reset']);
    resetBtn.addEventListener('click', function () { wVal = 3.6; steps = 0; log.innerHTML = ''; plot(); });
    w.body.appendChild(svg);
    w.body.appendChild(table);
    w.body.appendChild(GM.el('div', { class: 'gm-row' }, [feelBtn, smallBtn, bigBtn, recklessBtn, resetBtn]));
    w.body.appendChild(log);
    w.body.appendChild(GM.el('p', { class: 'note' },
      ['This is the whole of training: guess, measure surprise, nudge downhill, repeat. A real model does exactly this with ',
       GM.el('strong', {}, ['billions']), ' of numbers at once, trillions of times — downhill in the dark, one small step at a time.']));
    plot();
    container.appendChild(w.shell);
  };
})();
