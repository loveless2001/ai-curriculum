/* Hash router + sidebar navigation. Routes: #/ (home), #/week/N, #/dictionary. */
(function () {
  var main = document.getElementById('app');
  var sidebar = document.getElementById('sidebar');
  var toggle = document.getElementById('nav-toggle');
  var scrim = document.getElementById('sidebar-scrim');

  function currentRoute() {
    var h = location.hash.replace(/^#\/?/, '');
    var parts = h.split('/');
    if (parts[0] === 'week' && parts[1]) return { name: 'week', num: parseInt(parts[1], 10) };
    if (parts[0] === 'dictionary') return { name: 'dictionary' };
    return { name: 'home' };
  }

  function renderSidebar() {
    var route = currentRoute();
    sidebar.innerHTML = '';
    sidebar.appendChild(GM.el('a', { class: 'nav-brand', href: '#/' }, [
      GM.el('span', { class: 'brand-emoji' }, ['🔮']),
      GM.el('span', { class: 'brand-title' }, ['Understanding the Guessing Machines']),
      GM.el('span', { class: 'brand-sub' }, ['a 12-week course on AI & LLMs']),
    ]));

    var done = GM.store.completedCount();
    sidebar.appendChild(GM.el('div', { class: 'nav-progress' }, [
      GM.el('div', { class: 'nav-progress-bar' }, [
        GM.el('div', { class: 'nav-progress-fill', style: { width: Math.round(done / 12 * 100) + '%' } }),
      ]),
      GM.el('div', { class: 'nav-progress-label' }, [done + ' of 12 checkpoints passed']),
    ]));

    sidebar.appendChild(GM.el('a', {
      class: 'nav-link' + (route.name === 'home' ? ' active' : ''), href: '#/',
    }, [GM.el('span', { class: 'wk-num' }, ['⌂']), 'Course overview']));

    GM.arcs.forEach(function (arc) {
      var box = GM.el('div', { class: 'nav-arc' }, [
        GM.el('p', { class: 'nav-arc-title' }, [arc.shortName]),
      ]);
      arc.weeks.forEach(function (n) {
        var wk = GM.weeks.find(function (w) { return w.num === n; });
        if (!wk) return;
        var active = route.name === 'week' && route.num === n;
        box.appendChild(GM.el('a', {
          class: 'nav-link' + (active ? ' active' : ''), href: '#/week/' + n,
        }, [
          GM.el('span', { class: 'wk-num' }, [String(n)]),
          wk.short,
          GM.store.isCheckpointDone(n) ? GM.el('span', { class: 'wk-check' }, ['✓']) : null,
        ]));
      });
      sidebar.appendChild(box);
    });

    var revealed = GM.store.isJargonRevealed();
    var dictBox = GM.el('div', { class: 'nav-arc' }, [
      GM.el('p', { class: 'nav-arc-title' }, ['Reference']),
      GM.el('a', {
        class: 'nav-link' + (route.name === 'dictionary' ? ' active' : '') + (revealed ? '' : ' locked'),
        href: '#/dictionary',
      }, [
        GM.el('span', { class: 'wk-num' }, ['📖']),
        'The two-column dictionary',
        revealed ? null : GM.el('span', { class: 'lock-icon' }, ['🔒']),
      ]),
    ]);
    sidebar.appendChild(dictBox);
  }

  function render() {
    var route = currentRoute();
    main.innerHTML = '';
    if (route.name === 'week') {
      var wk = GM.weeks.find(function (w) { return w.num === route.num; });
      if (wk) GM.views.week(main, wk); else GM.views.home(main);
    } else if (route.name === 'dictionary') {
      GM.views.dictionary(main);
    } else {
      GM.views.home(main);
    }
    renderSidebar();
    closeSidebar();
    window.scrollTo(0, 0);
  }

  function closeSidebar() {
    sidebar.classList.remove('open');
    scrim.hidden = true;
    toggle.setAttribute('aria-expanded', 'false');
  }
  toggle.addEventListener('click', function () {
    var open = sidebar.classList.toggle('open');
    scrim.hidden = !open;
    toggle.setAttribute('aria-expanded', String(open));
  });
  scrim.addEventListener('click', closeSidebar);

  window.addEventListener('hashchange', render);
  document.addEventListener('gm:progress-changed', renderSidebar);
  render();
})();
