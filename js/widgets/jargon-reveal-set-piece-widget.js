/* The Week 10 set-piece: unblur the technical column term by term, then unlock
   the dictionary page for the rest of the course. */
(function () {
  GM.widgets['jargon-reveal'] = function (container) {
    var w = GM.widgetShell('The reveal',
      'Nine weeks of folk vocabulary, one term at a time. Click each blurred term — or take them all at once.');
    var remaining = GM.jargon.length;
    var finale = GM.el('div');
    function done() {
      if (GM.store.isJargonRevealed()) return;
      GM.store.setJargonRevealed();
      finale.appendChild(GM.feedback('good',
        '🎓 <strong>That’s the whole secret.</strong> You have been doing next-token prediction, loss minimization, ' +
        'decoding strategy and calibration analysis for nine weeks — you were only missing the passwords. ' +
        'The <a href="#/dictionary">two-column dictionary</a> is now unlocked in the sidebar, for keeps.'));
    }
    GM.jargon.forEach(function (row) {
      var tech = GM.el('span', {
        class: 'jargon-tech' + (GM.store.isJargonRevealed() ? '' : ' hidden-term'),
        role: 'button', tabindex: '0', title: 'click to reveal',
      }, [row.tech]);
      function reveal() {
        if (!tech.classList.contains('hidden-term')) return;
        tech.classList.remove('hidden-term');
        remaining--;
        if (remaining <= 0) done();
      }
      tech.addEventListener('click', reveal);
      tech.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); reveal(); } });
      w.body.appendChild(GM.el('div', { class: 'jargon-row' }, [
        GM.el('span', { class: 'jargon-folk' }, [row.folk]),
        GM.el('span', { class: 'jargon-arrow' }, ['→']),
        tech,
      ]));
    });
    if (!GM.store.isJargonRevealed()) {
      var allBtn = GM.el('button', { class: 'btn' }, ['Reveal everything']);
      allBtn.addEventListener('click', function () {
        w.body.querySelectorAll('.jargon-tech').forEach(function (t) { t.classList.remove('hidden-term'); });
        remaining = 0; done();
      });
      w.body.appendChild(GM.el('div', { class: 'gm-row', style: { marginTop: '1rem' } }, [allBtn]));
    } else {
      finale.appendChild(GM.feedback('info', 'Already revealed — the <a href="#/dictionary">dictionary</a> is yours.'));
    }
    w.body.appendChild(finale);
    container.appendChild(w.shell);
  };
})();
