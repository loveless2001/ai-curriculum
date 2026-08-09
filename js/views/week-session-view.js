/* Week page: arc banner, four session beats (puzzle/exercise/naming/checkpoint),
   mounts interactive widgets declared in week data, pager, checkpoint checkbox. */
GM.views.week = function (main, wk) {
  var page = GM.el('div', { class: 'page' });
  var arc = GM.arcs.find(function (a) { return a.id === wk.arcId; });

  page.appendChild(GM.el('p', { class: 'eyebrow' }, ['Week ' + wk.num + ' · ' + arc.shortName]));
  page.appendChild(GM.el('h1', { class: 'week-title' }, [wk.title]));
  if (wk.tagline) page.appendChild(GM.el('p', { class: 'week-tagline' }, [wk.tagline]));

  if (wk.showArcBanner) {
    page.appendChild(GM.el('div', { class: 'arc-banner' }, [
      GM.el('span', { class: 'arc-name' }, [arc.name]),
      arc.claim,
    ]));
  }

  var beatMeta = {
    puzzle: { icon: '🧩', label: 'The puzzle' },
    exercise: { icon: '🛠️', label: 'Do it yourself' },
    naming: { icon: '🏷️', label: 'Naming what happened' },
    checkpoint: { icon: '✅', label: 'Checkpoint' },
  };

  wk.beats.forEach(function (beat) {
    var meta = beatMeta[beat.kind] || { icon: '•', label: beat.kind };
    var el = GM.el('section', { class: 'beat beat-' + beat.kind }, [
      GM.el('span', { class: 'beat-label' }, [meta.icon + ' ' + meta.label]),
    ]);
    if (beat.title) el.appendChild(GM.el('h3', {}, [beat.title]));
    if (beat.html) el.appendChild(GM.el('div', { html: beat.html }));

    (beat.widgets || (beat.widget ? [{ name: beat.widget, opts: beat.widgetOpts }] : []))
      .forEach(function (w) {
        var mount = GM.widgets[w.name];
        if (mount) {
          try { mount(el, w.opts || {}); }
          catch (e) { el.appendChild(GM.feedback('warn', 'This interactive failed to load: ' + GM.escapeHtml(e.message))); }
        }
      });

    if (beat.kind === 'checkpoint') el.appendChild(buildCheckpointBox(wk));
    page.appendChild(el);
  });

  page.appendChild(buildPager(wk));
  main.appendChild(page);
};

function buildCheckpointBox(wk) {
  var checkbox = GM.el('input', { type: 'checkbox' });
  checkbox.checked = GM.store.isCheckpointDone(wk.num);
  checkbox.addEventListener('change', function () {
    GM.store.setCheckpointDone(wk.num, checkbox.checked);
  });
  return GM.el('div', { class: 'checkpoint-box' }, [
    GM.el('label', {}, [
      checkbox,
      GM.el('span', { html: '<strong>Self-check — be honest:</strong> ' + wk.checkpointStatement }),
    ]),
  ]);
}

function buildPager(wk) {
  var prev = GM.weeks.find(function (w) { return w.num === wk.num - 1; });
  var next = GM.weeks.find(function (w) { return w.num === wk.num + 1; });
  var pager = GM.el('nav', { class: 'week-pager', 'aria-label': 'Week navigation' });
  pager.appendChild(prev
    ? GM.el('a', { href: '#/week/' + prev.num }, [
        '← Week ' + prev.num,
        GM.el('span', { class: 'pager-sub' }, [prev.short]),
      ])
    : GM.el('a', { href: '#/' }, ['← Course overview']));
  if (next) {
    pager.appendChild(GM.el('a', { href: '#/week/' + next.num, style: { textAlign: 'right' } }, [
      'Week ' + next.num + ' →',
      GM.el('span', { class: 'pager-sub' }, [next.short]),
    ]));
  }
  return pager;
}
