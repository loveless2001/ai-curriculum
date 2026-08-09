/* Induction-head demo: the "…A B … A → guess B" copy pattern, run on names the
   learner invents this minute — so the completion cannot be memorized. */
(function () {
  GM.widgets['induction-demo'] = function (container) {
    var w = GM.widgetShell('The paired-name induction test',
      'Invent a first and last name nobody has ever written down. The machine will see the pair once — then complete the pattern.');
    var a = GM.el('input', { type: 'text', placeholder: 'first name (e.g. Blicket)', value: 'Blicket' });
    var b = GM.el('input', { type: 'text', placeholder: 'last name (e.g. Farnsworth)', value: 'Vantorbeck' });
    var out = GM.el('div');
    var btn = GM.el('button', { class: 'btn small teal' }, ['Run the test']);
    btn.addEventListener('click', function () {
      var A = (a.value.trim().split(/\s+/)[0] || 'Blicket');
      var B = (b.value.trim().split(/\s+/)[0] || 'Vantorbeck');
      out.innerHTML = '';
      out.appendChild(GM.el('div', { class: 'machine-out' }, [
        GM.el('span', { class: 'machine-tag' }, ['prompt']),
        'At the conference I was introduced to ' + A + ' ' + B + ', who gave the opening talk. Later that evening, ' +
        'I ran into ' + A + ' ▊',
      ]));
      out.appendChild(GM.el('div', { class: 'machine-out' }, [
        GM.el('span', { class: 'machine-tag' }, ['model’s top guess for the next word']),
        B + '   (by a wide margin)',
      ]));
      out.appendChild(GM.feedback('info',
        '“' + A + ' ' + B + '” appears in no training data — you invented it seconds ago. The model is running a learned, ' +
        'general pattern: <span class="mono">…A B … A → guess B</span>. Whatever followed this token last time it appeared, ' +
        'guess it again.'));
      out.appendChild(GM.feedback('good',
        '<strong>Why this matters:</strong> researchers located the specific internal components performing this copy ' +
        '(nicknamed <em>induction heads</em>), watched them form partway through training, and saw this ability appear when ' +
        'they do. Behavior you just replicated → mechanism found, traced, and tested. The box is opaque by default, ' +
        'not sealed.'));
    });
    w.body.appendChild(GM.el('div', { class: 'gm-row' }, [a, b, btn]));
    w.body.appendChild(out);
    container.appendChild(w.shell);
  };
})();
