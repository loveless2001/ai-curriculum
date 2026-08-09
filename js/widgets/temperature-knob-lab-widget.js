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

  GM.widgets['temperature-lab'] = function (container) {
    var w = GM.widgetShell('The knob lab',
      'Left: the scorer’s card — raw scores, fixed for each prompt. Right: what the chooser does with them. Only the chooser’s settings ever change.');
    var promptSel = GM.el('select', { 'aria-label': 'prompt' });
    PROMPTS.forEach(function (p, i) { promptSel.appendChild(GM.el('option', { value: String(i) }, [p.label])); });
    var ruleSel = GM.el('select', { 'aria-label': 'choosing rule' });
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
      scoreCard.appendChild(GM.el('p', { class: 'note', style: { margin: '0 0 .2em' } }, ['THE SCORER’S CARD (fixed raw scores — never changes for this prompt):']));
      var maxScore = Math.max.apply(null, p.cands.map(function (c) { return c[1]; }));
      p.cands.forEach(function (c) { scoreCard.appendChild(GM.distRow(c[0], c[1] / maxScore * 0.95, false)); });
      distCard.appendChild(GM.el('p', { class: 'note', style: { margin: '.8em 0 .2em' } }, ['THE CHOOSER’S ODDS (after your knob + rule are applied):']));
      var pr = probs();
      p.cands.forEach(function (c, i) { distCard.appendChild(GM.distRow(c[0], pr[i], true)); });
      note.appendChild(GM.feedback('info', p.kind === 'forced'
        ? 'A near-forced blank: one candidate towers over the rest, so even a hot knob rarely dislodges it. The knob barely matters here.'
        : 'An open blank: the scores are close together, so the knob decides everything about variety. This is where “temperature” earns its reputation.'));
    }
    var runBtn = GM.el('button', { class: 'btn small' }, ['Generate 5 times']);
    runBtn.addEventListener('click', function () {
      var p = current(); var pr = probs();
      samples.innerHTML = '';
      var outs = [];
      for (var i = 0; i < 5; i++) outs.push(p.cands[GM.sample(pr)][0]);
      samples.appendChild(GM.el('div', { class: 'machine-out' }, [
        GM.el('span', { class: 'machine-tag' }, ['5 runs, same prompt, same model']),
        outs.map(function (o, i) { return 'run ' + (i + 1) + ': …' + o; }).join('\n'),
      ]));
      var allSame = outs.every(function (o) { return o === outs[0]; });
      samples.appendChild(GM.feedback(allSame ? 'good' : 'info', allSame
        ? 'Five identical outputs — with the dice off (or the distribution effectively forced), the machine is a deterministic lookup. Rerun forever; it won’t change.'
        : 'Five runs, ' + new Set(outs).size + ' different outputs — and every number inside the model identical across runs. You changed the chooser, never the scorer.'));
    });
    [promptSel, ruleSel].forEach(function (s) { s.addEventListener('change', render); });
    temp.addEventListener('input', render);
    w.body.appendChild(GM.el('div', { class: 'gm-row' }, [promptSel, ruleSel]));
    w.body.appendChild(GM.el('div', { class: 'gm-slider' }, [GM.el('span', { class: 'note' }, ['the knob:']), temp, tempVal]));
    w.body.appendChild(scoreCard);
    w.body.appendChild(distCard);
    w.body.appendChild(GM.el('div', { class: 'gm-row' }, [runBtn]));
    w.body.appendChild(samples);
    w.body.appendChild(note);
    render();
    container.appendChild(w.shell);
  };
})();
