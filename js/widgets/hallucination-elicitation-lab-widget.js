/* Hallucination elicitation lab: canned temp-0 queries — well-covered territory
   answered correctly, thin territory filled with fluent, reproducible fabrication.
   Includes the ask-its-confidence probe and the precision drill answers. */
(function () {
  var QUERIES = [
    { label: 'Well-covered: “Who was Marie Curie?”', territory: 'dense', truthful: true,
      out: 'Marie Curie (1867–1934) was a Polish-French physicist and chemist who pioneered research on radioactivity. She won Nobel Prizes in Physics (1903) and Chemistry (1911) — the first person to win in two sciences.' },
    { label: 'Fake person: “Who was Dr. Elena Vasquez-Moreau, the 19th-century Belgian volcanologist?”', territory: 'empty', truthful: false,
      out: 'Elena Vasquez-Moreau (1834–1898) was a Belgian volcanologist noted for her early seismic surveys of the Canary Islands. Her 1871 monograph on fumarole gas composition influenced later eruption-prediction work, and she was among the first women admitted to the Brussels Geographical Society.' },
    { label: 'Fake citation: “Give a citation on the economics of underwater basket weaving”', territory: 'empty', truthful: false,
      out: 'Pemberton, R. & Ashcroft, L. (2014). “Submerged craft economies: pricing and labor in underwater basket weaving.” Journal of Artisanal Economics, 22(3), 141–158.' },
    { label: 'Obscure fine-grained: “What did Einstein eat for breakfast on 12 March 1921?”', territory: 'thin', truthful: false,
      out: 'On the morning of 12 March 1921, during his first visit to the United States, Einstein reportedly had a simple breakfast of fried eggs, toast, and black tea at his hotel in New York before a press engagement.' },
  ];

  GM.widgets['hallucination-lab'] = function (container) {
    var w = GM.widgetShell('The hallucination elicitation lab',
      'Temperature is locked at 0 — no dice anywhere. Run queries, rerun them, and log what you find.');
    var sel = GM.el('select', { 'aria-label': 'query' });
    QUERIES.forEach(function (q, i) { sel.appendChild(GM.el('option', { value: String(i) }, [q.label])); });
    var out = GM.el('div');
    var runCount = 0, lastIdx = -1;
    var logBody = GM.el('tbody');
    var drill = GM.el('div');

    function run() {
      var idx = parseInt(sel.value || '0', 10);
      var q = QUERIES[idx];
      if (idx !== lastIdx) { runCount = 0; lastIdx = idx; }
      runCount++;
      out.innerHTML = '';
      out.appendChild(GM.el('div', { class: 'machine-out' }, [
        GM.el('span', { class: 'machine-tag' }, ['model · T=0 · run #' + runCount + ' — identical on every rerun']),
        q.out,
      ]));
      if (!q.truthful) {
        out.appendChild(GM.feedback('bad',
          '<strong>Every checkable detail above is fabricated</strong> — the person/citation does not exist' +
          (q.territory === 'thin' ? ' in this detail; no such record survives' : '') +
          '. Yet: fluent, specific, and byte-identical on rerun ' + runCount + '. Not randomness (it’s off), not a glitch ' +
          '(it reproduces): this is the compressor filling ' + (q.territory === 'empty' ? 'empty' : 'thin') +
          ' territory with what such an answer <em>typically looks like</em>.'));
      } else {
        out.appendChild(GM.feedback('good',
          'Accurate — and produced by <strong>exactly the same mechanism</strong> as the fabrications: likely text, given ' +
          'the prompt. Dense territory makes likely text and true text coincide. That coincidence is what you’re trusting, ' +
          'every time.'));
      }
      logBody.appendChild(GM.el('tr', {}, [
        GM.el('td', {}, [q.label.split(':')[0]]),
        GM.el('td', {}, [q.truthful ? 'accurate' : 'fabricated']),
        GM.el('td', {}, ['yes — T=0']),
        GM.el('td', {}, [q.territory === 'dense' ? 'well-covered' : q.territory === 'thin' ? 'thin / fine-grained' : 'empty (invented)']),
      ]));
    }
    var runBtn = GM.el('button', { class: 'btn small teal' }, ['Run']);
    runBtn.addEventListener('click', run);
    var rerunBtn = GM.el('button', { class: 'btn small secondary' }, ['Rerun (check reproducibility)']);
    rerunBtn.addEventListener('click', run);

    var confBtn = GM.el('button', { class: 'btn small secondary' }, ['Ask it: “How confident are you?”']);
    confBtn.addEventListener('click', function () {
      out.appendChild(GM.el('div', { class: 'machine-out' }, [
        GM.el('span', { class: 'machine-tag' }, ['model · T=0']),
        'I’m quite confident in that answer, though I’d recommend verifying important details against primary sources.',
      ]));
      out.appendChild(GM.feedback('warn',
        'Stated confidence: high — for the fabrications and the fact alike. Its confidence talk is also just likely text, ' +
        'not a readout of reliability. Compare your own Week 6 quiz: calibration has to be <em>measured against outcomes</em>, ' +
        'for machines exactly as for you.'));
    });
    var drillBtn = GM.el('button', { class: 'btn small secondary' }, ['Precision drill: model answers']);
    drillBtn.addEventListener('click', function () {
      drillBtn.disabled = true;
      drill.appendChild(GM.feedback('info',
        '<strong>“The AI lied to me”</strong> → “It produced likely-sounding text in territory its training data covered thinly; nothing in it tracks truth, so nothing in it avoided truth.”<br>' +
        '<strong>“The AI glitched”</strong> → “It worked exactly as designed — the same mechanism that gets facts right filled a gap with a plausible reconstruction.”<br>' +
        '<strong>“The AI doesn’t know that fact”</strong> → “Careful — ‘know’ needs a test attached (Week 5). Say: it does not reliably produce that fact, and its confidence doesn’t signal when it will.”'));
    });

    var logTable = GM.el('table', {}, [
      GM.el('thead', {}, [GM.el('tr', {}, [
        GM.el('th', {}, ['Query']), GM.el('th', {}, ['Verdict']), GM.el('th', {}, ['Reproducible?']), GM.el('th', {}, ['Territory']),
      ])]),
      logBody,
    ]);
    w.body.appendChild(GM.el('div', { class: 'gm-row' }, [sel]));
    w.body.appendChild(GM.el('div', { class: 'gm-row' }, [runBtn, rerunBtn, confBtn, drillBtn]));
    w.body.appendChild(out);
    w.body.appendChild(drill);
    w.body.appendChild(GM.el('p', { class: 'note', style: { marginTop: '1rem' } }, ['Your lab log:']));
    w.body.appendChild(logTable);
    container.appendChild(w.shell);
  };
})();
