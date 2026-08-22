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
      GM.el('span', { class: 'brand-title' }, [GM.t('Understanding the Guessing Machines', 'Hiểu về những cỗ máy dự đoán')]),
      GM.el('span', { class: 'brand-sub' }, [GM.t('a 12-week course on AI & LLMs', 'khóa học 12 tuần về AI và LLM')]),
    ]));

    var done = GM.store.completedCount();
    sidebar.appendChild(GM.el('div', { class: 'nav-progress' }, [
      GM.el('div', { class: 'nav-progress-bar' }, [
        GM.el('div', { class: 'nav-progress-fill', style: { width: Math.round(done / 12 * 100) + '%' } }),
      ]),
      GM.el('div', { class: 'nav-progress-label' }, [GM.t(done + ' of 12 checkpoints passed', 'Đã hoàn thành ' + done + '/12 mốc kiểm tra')]),
    ]));

    sidebar.appendChild(GM.el('a', {
      class: 'nav-link' + (route.name === 'home' ? ' active' : ''), href: '#/',
    }, [GM.el('span', { class: 'wk-num' }, ['⌂']), GM.t('Course overview', 'Tổng quan khóa học')]));

    var languageBox = GM.el('div', { class: 'language-switcher', role: 'group', 'aria-label': GM.t('Language', 'Ngôn ngữ') });
    [['en', 'English'], ['vi', 'Tiếng Việt']].forEach(function (choice) {
      languageBox.appendChild(GM.el('button', {
        type: 'button',
        class: 'language-option' + (GM.language.get() === choice[0] ? ' active' : ''),
        'aria-pressed': String(GM.language.get() === choice[0]),
        onclick: function () { if (GM.language.get() !== choice[0]) GM.language.set(choice[0]); },
      }, [choice[1]]));
    });
    sidebar.appendChild(languageBox);

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
      GM.el('p', { class: 'nav-arc-title' }, [GM.t('Reference', 'Tra cứu')]),
      GM.el('a', {
        class: 'nav-link' + (route.name === 'dictionary' ? ' active' : '') + (revealed ? '' : ' locked'),
        href: '#/dictionary',
      }, [
        GM.el('span', { class: 'wk-num' }, ['📖']),
        GM.t('The two-column dictionary', 'Từ điển hai cột'),
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
    document.documentElement.lang = GM.language.get();
    document.title = GM.t(
      'Understanding the Guessing Machines — an interactive course on AI & LLMs',
      'Hiểu về những cỗ máy dự đoán — khóa học tương tác về AI và LLM'
    );
    var description = document.querySelector('meta[name="description"]');
    if (description) description.content = GM.t(
      'A 12-week self-paced interactive course on AI and LLMs — epistemology first, machinery second. No math or CS background assumed.',
      'Khóa học tương tác 12 tuần, tự học về AI và LLM — nhận thức luận trước, máy móc sau. Không yêu cầu nền tảng toán hay khoa học máy tính.'
    );
    var skip = document.querySelector('.skip-link');
    if (skip) skip.textContent = GM.t('Skip to content', 'Bỏ qua để đến nội dung');
    toggle.setAttribute('aria-label', GM.t('Toggle navigation', 'Bật hoặc tắt điều hướng'));
    sidebar.setAttribute('aria-label', GM.t('Course navigation', 'Điều hướng khóa học'));
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
