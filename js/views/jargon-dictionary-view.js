/* Two-column dictionary page. Locked (blurred + gate) until the Week 10 reveal,
   honoring the jargon-quarantine design principle. */
GM.views.dictionary = function (main) {
  var page = GM.el('div', { class: 'page' });

  if (!GM.store.isJargonRevealed()) {
    page.appendChild(GM.el('div', { class: 'dict-locked' }, [
      GM.el('div', { class: 'lock-big' }, ['🔒']),
      GM.el('h1', {}, [GM.t('The two-column dictionary', 'Từ điển thuật ngữ')]),
      GM.el('div', { html: GM.t(
        '<p>This table connects examples to technical terms and notes where an analogy has limits.</p>' +
        '<p><strong>Reveal the table in Week 10.</strong> Earlier lessons define terms as needed; Week 10 brings them together.</p>',
        '<p>Bảng này ghép các ví dụ trong khóa học với tên gọi kỹ thuật của chúng, đồng thời nhắc chỗ nào phép so sánh không còn đúng.</p>' +
        '<p><strong>Bảng sẽ mở ở Tuần 10.</strong> Trước đó, mỗi thuật ngữ sẽ được giải thích ngay khi cần dùng.</p>') }),
      GM.el('p', {}, [GM.el('a', { class: 'btn', href: '#/week/10' }, [GM.t('Go to Week 10 — the reveal', 'Đến Tuần 10 để mở từ điển')])]),
      GM.el('p', { class: 'note' }, [GM.t('Already done the course elsewhere? The reveal button in Week 10 unlocks this page any time.', 'Nếu đã biết các nội dung này, bạn có thể vào Tuần 10 và bấm “Mở tất cả” để mở khóa trang.')]),
    ]));
    main.appendChild(page);
    return;
  }

  page.appendChild(GM.el('p', { class: 'eyebrow' }, [GM.t('Reference · unlocked in Week 10', 'Tra cứu · mở khóa ở Tuần 10')]));
  page.appendChild(GM.el('h1', {}, [GM.t('The two-column dictionary', 'Từ điển thuật ngữ')]));
  page.appendChild(GM.el('div', { html: GM.t(
    '<p>This table connects the course’s plain-language explanations with the terms used in technical material.</p>',
    '<p>Bảng này cho biết tên gọi kỹ thuật của những ý bạn đã gặp trong khóa học.</p>') }));

  var table = GM.el('table', {}, [
    GM.el('thead', {}, [GM.el('tr', {}, [
      GM.el('th', {}, [GM.t('Plain-language idea', 'Cách nói trong khóa học')]),
      GM.el('th', {}, [GM.t('Technical connection', 'Tên gọi kỹ thuật')]),
      GM.el('th', {}, [GM.t('Where you did it', 'Bạn đã thực hành ở đâu')]),
    ])]),
  ]);
  var tbody = GM.el('tbody');
  GM.jargon.forEach(function (row) {
    tbody.appendChild(GM.el('tr', {}, [
      GM.el('td', { style: { fontStyle: 'italic' } }, [row.folk]),
      GM.el('td', {}, [GM.el('span', { class: 'jargon-tech' }, [row.tech])]),
      GM.el('td', { html: row.where ? '<a href="#/week/' + row.week + '">' + GM.t('Week ', 'Tuần ') + row.week + '</a> — ' + row.where : '' }),
    ]));
  });
  table.appendChild(tbody);
  page.appendChild(GM.el('div', { class: 'card' }, [table]));

  page.appendChild(GM.el('div', { html: GM.t(
    '<p class="note">Use it in both directions: when you meet a technical term in the wild, translate it back to the thing ' +
    'you did with your hands. If you can’t, that’s the signal to go back to the week where the intuition lives.</p>',
    '<p class="note">Khi gặp một thuật ngữ trong tài liệu kỹ thuật, hãy thử nối nó với bài tập cụ thể bạn đã làm. Nếu chưa nối được, hãy quay lại tuần tương ứng và xem lại ví dụ.</p>') }));
  main.appendChild(page);
};
