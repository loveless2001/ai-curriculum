/* Two-column dictionary page. Locked (blurred + gate) until the Week 10 reveal,
   honoring the jargon-quarantine design principle. */
GM.views.dictionary = function (main) {
  var page = GM.el('div', { class: 'page' });

  if (!GM.store.isJargonRevealed()) {
    page.appendChild(GM.el('div', { class: 'dict-locked' }, [
      GM.el('div', { class: 'lock-big' }, ['🔒']),
      GM.el('h1', {}, [GM.t('The two-column dictionary', 'Từ điển hai cột')]),
      GM.el('div', { html: GM.t(
        '<p>This table connects examples to technical terms and notes where an analogy has limits.</p>' +
        '<p><strong>Reveal the table in Week 10.</strong> Earlier lessons define terms as needed; Week 10 brings them together.</p>',
        '<p>Bảng này nối ví dụ với thuật ngữ kỹ thuật và chỉ ra giới hạn của cách ví von.</p>' +
        '<p><strong>Mở bảng ở Tuần 10.</strong> Các bài trước giải thích thuật ngữ khi cần; Tuần 10 tập hợp chúng lại.</p>') }),
      GM.el('p', {}, [GM.el('a', { class: 'btn', href: '#/week/10' }, [GM.t('Go to Week 10 — the reveal', 'Đến Tuần 10 — màn bật mí')])]),
      GM.el('p', { class: 'note' }, [GM.t('Already done the course elsewhere? The reveal button in Week 10 unlocks this page any time.', 'Đã học khóa này ở nơi khác? Nút bật mí trong Tuần 10 có thể mở khóa trang này bất cứ lúc nào.')]),
    ]));
    main.appendChild(page);
    return;
  }

  page.appendChild(GM.el('p', { class: 'eyebrow' }, [GM.t('Reference · unlocked in Week 10', 'Tra cứu · mở khóa ở Tuần 10')]));
  page.appendChild(GM.el('h1', {}, [GM.t('The two-column dictionary', 'Từ điển hai cột')]));
  page.appendChild(GM.el('div', { html: GM.t(
    '<p>This table connects the course’s plain-language explanations with the terms used in technical material.</p>',
    '<p>Bảng này nối cách giải thích bằng lời thường trong khóa học với các thuật ngữ dùng trong tài liệu kỹ thuật.</p>') }));

  var table = GM.el('table', {}, [
    GM.el('thead', {}, [GM.el('tr', {}, [
      GM.el('th', {}, [GM.t('Plain-language idea', 'Ý diễn đạt bằng lời thường')]),
      GM.el('th', {}, [GM.t('Technical connection', 'Liên hệ với thuật ngữ kỹ thuật')]),
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
    '<p class="note">Hãy dùng từ điển theo cả hai chiều: khi gặp một thuật ngữ kỹ thuật ngoài đời, hãy dịch ngược nó về điều bạn đã tự tay làm. Nếu chưa thể, đó là tín hiệu quay lại tuần nơi trực giác ấy được hình thành.</p>') }));
  main.appendChild(page);
};
