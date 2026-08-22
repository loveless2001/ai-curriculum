/* Capstone editor: "What an LLM is and isn't" in <=500 words. Autosaves to
   localStorage, live word count, copy-out, and the two-test checklist. */
(function () {
  GM.widgets['capstone-editor'] = function (container) {
    var w = GM.widgetShell(GM.t('Your 500 words', '500 từ của bạn'),
      GM.t('Drafts save automatically on this device. Write for a lay reader; keep the technical reader honest.', 'Bản nháp tự lưu trên thiết bị. Viết cho độc giả phổ thông và đủ chính xác với độc giả kỹ thuật.'));
    var ta = GM.el('textarea', { rows: '14', placeholder: GM.t('What an LLM is and isn’t…', 'LLM là gì và không phải gì…') });
    ta.value = GM.store.getSaved('capstone-draft', '');
    var pill = GM.el('span', { class: 'word-count-pill' });
    var savedNote = GM.el('span', { class: 'note' });
    var saveTimer = null;

    function refresh() {
      var n = GM.wordCount(ta.value);
      pill.textContent = n + GM.t(' / 500 words', ' / 500 từ');
      pill.className = 'word-count-pill' + (n > 500 ? ' over' : (n >= 300 ? ' good' : ''));
    }
    ta.addEventListener('input', function () {
      refresh();
      savedNote.textContent = GM.t('saving…', 'đang lưu…');
      clearTimeout(saveTimer);
      saveTimer = setTimeout(function () {
        GM.store.setSaved('capstone-draft', ta.value);
        savedNote.textContent = GM.t('saved ✓', 'đã lưu ✓');
      }, 500);
    });
    var copyBtn = GM.el('button', { class: 'btn small secondary' }, [GM.t('Copy to clipboard', 'Sao chép')]);
    copyBtn.addEventListener('click', function () {
      var done = function () { copyBtn.textContent = GM.t('Copied ✓', 'Đã sao chép ✓'); setTimeout(function () { copyBtn.textContent = GM.t('Copy to clipboard', 'Sao chép'); }, 1500); };
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(ta.value).then(done, function () {});
      else { ta.select(); document.execCommand('copy'); done(); }
    });
    w.body.appendChild(GM.el('div', { class: 'gm-row' }, [pill, savedNote, copyBtn]));
    w.body.appendChild(ta);
    w.body.appendChild(GM.el('div', { class: 'card', style: { boxShadow: 'none' } }, [
      GM.el('p', { class: 'note', style: { marginTop: 0 } }, [GM.t('The artifact passes when both boxes can be honestly ticked:', 'Bài viết đạt khi bạn có thể thành thật đánh dấu cả hai ô:')]),
      GM.el('label', { style: { display: 'flex', gap: '.5em', margin: '.3em 0', fontSize: '.92rem' } }, [
        GM.el('input', { type: 'checkbox' }), GM.el('span', {}, [GM.t('An outsider read it and learned something they could repeat back.', 'Một người ngoài đọc và học được điều họ có thể kể lại.')]),
      ]),
      GM.el('label', { style: { display: 'flex', gap: '.5em', margin: '.3em 0', fontSize: '.92rem' } }, [
        GM.el('input', { type: 'checkbox' }), GM.el('span', {}, [GM.t('A technical reader found nothing to correct.', 'Một độc giả kỹ thuật không tìm thấy điều cần sửa.')]),
      ]),
      GM.el('p', { class: 'note' }, [GM.t('Need an outline? Explain what the model predicts, how training differs from use, how scores become selected tokens, why fluent errors occur, and what evidence would support a claim about understanding.', 'Cần dàn ý? Hãy giải thích mô hình dự đoán gì, huấn luyện khác sử dụng ra sao, điểm số trở thành token được chọn thế nào, vì sao có câu sai nhưng trôi chảy, và bằng chứng nào hỗ trợ một khẳng định về hiểu biết.')]),
    ]));
    refresh();
    container.appendChild(w.shell);
  };
})();
