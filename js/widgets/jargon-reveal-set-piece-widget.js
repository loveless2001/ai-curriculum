/* The Week 10 set-piece: unblur the technical column term by term, then unlock
   the dictionary page for the rest of the course. */
(function () {
  GM.widgets['jargon-reveal'] = function (container) {
    var w = GM.widgetShell(GM.t('The reveal', 'Màn bật mí'),
      GM.t('Nine weeks of folk vocabulary, one term at a time. Click each blurred term — or take them all at once.', 'Chín tuần dùng từ đời thường, giờ mở từng thuật ngữ. Nhấp từng từ bị làm mờ — hoặc mở tất cả.'));
    var remaining = GM.jargon.length;
    var finale = GM.el('div');
    function done() {
      if (GM.store.isJargonRevealed()) return;
      GM.store.setJargonRevealed();
      finale.appendChild(GM.feedback('good',
        GM.t('<strong>All terms are now visible.</strong> The <a href="#/dictionary">two-column dictionary</a> links each ' +
        'technical term to the exercise where you first used the idea.', '<strong>Tất cả thuật ngữ đã được mở.</strong> ' +
        '<a href="#/dictionary">Từ điển hai cột</a> nối mỗi thuật ngữ kỹ thuật với bài tập nơi bạn dùng ý đó lần đầu.')));
    }
    GM.jargon.forEach(function (row) {
      var tech = GM.el('span', {
        class: 'jargon-tech' + (GM.store.isJargonRevealed() ? '' : ' hidden-term'),
        role: 'button', tabindex: '0', title: GM.t('click to reveal', 'nhấp để mở'),
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
      var allBtn = GM.el('button', { class: 'btn' }, [GM.t('Reveal everything', 'Mở tất cả')]);
      allBtn.addEventListener('click', function () {
        w.body.querySelectorAll('.jargon-tech').forEach(function (t) { t.classList.remove('hidden-term'); });
        remaining = 0; done();
      });
      w.body.appendChild(GM.el('div', { class: 'gm-row', style: { marginTop: '1rem' } }, [allBtn]));
    } else {
      finale.appendChild(GM.feedback('info', GM.t('Already revealed — the <a href="#/dictionary">dictionary</a> is yours.', 'Đã bật mí — <a href="#/dictionary">từ điển</a> thuộc về bạn.')));
    }
    w.body.appendChild(finale);
    container.appendChild(w.shell);
  };
})();
