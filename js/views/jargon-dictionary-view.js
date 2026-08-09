/* Two-column dictionary page. Locked (blurred + gate) until the Week 10 reveal,
   honoring the jargon-quarantine design principle. */
GM.views.dictionary = function (main) {
  var page = GM.el('div', { class: 'page' });

  if (!GM.store.isJargonRevealed()) {
    page.appendChild(GM.el('div', { class: 'dict-locked' }, [
      GM.el('div', { class: 'lock-big' }, ['🔒']),
      GM.el('h1', {}, ['The two-column dictionary']),
      GM.el('div', { html:
        '<p>This page holds the official technical name for every plain-language idea in the course.</p>' +
        '<p><strong>It stays sealed until Week 10.</strong> That’s not gatekeeping for its own sake — meeting a term ' +
        'before you’ve met the <em>thing</em> is exactly the failure this course is built to avoid. The reveal is a ' +
        'set-piece, and it lands hardest when you’ve done the nine weeks of work first.</p>' }),
      GM.el('p', {}, [GM.el('a', { class: 'btn', href: '#/week/10' }, ['Go to Week 10 — the reveal'])]),
      GM.el('p', { class: 'note' }, ['Already done the course elsewhere? The reveal button in Week 10 unlocks this page any time.']),
    ]));
    main.appendChild(page);
    return;
  }

  page.appendChild(GM.el('p', { class: 'eyebrow' }, ['Reference · unlocked in Week 10']));
  page.appendChild(GM.el('h1', {}, ['The two-column dictionary']));
  page.appendChild(GM.el('div', { html:
    '<p>Everything the course called by a folk name has an official name. You did the field’s concepts for nine weeks; ' +
    'these were only the passwords.</p>' }));

  var table = GM.el('table', {}, [
    GM.el('thead', {}, [GM.el('tr', {}, [
      GM.el('th', {}, ['Folk term (Weeks 1–9)']),
      GM.el('th', {}, ['Technical term (Weeks 10–12)']),
      GM.el('th', {}, ['Where you did it']),
    ])]),
  ]);
  var tbody = GM.el('tbody');
  GM.jargon.forEach(function (row) {
    tbody.appendChild(GM.el('tr', {}, [
      GM.el('td', { style: { fontStyle: 'italic' } }, [row.folk]),
      GM.el('td', {}, [GM.el('span', { class: 'jargon-tech' }, [row.tech])]),
      GM.el('td', { html: row.where ? '<a href="#/week/' + row.week + '">Week ' + row.week + '</a> — ' + row.where : '' }),
    ]));
  });
  table.appendChild(tbody);
  page.appendChild(GM.el('div', { class: 'card' }, [table]));

  page.appendChild(GM.el('div', { html:
    '<p class="note">Use it in both directions: when you meet a technical term in the wild, translate it back to the thing ' +
    'you did with your hands. If you can’t, that’s the signal to go back to the week where the intuition lives.</p>' }));
  main.appendChild(page);
};
