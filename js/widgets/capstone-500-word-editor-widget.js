/* Capstone editor: "What an LLM is and isn't" in <=500 words. Autosaves to
   localStorage, live word count, copy-out, and the two-test checklist. */
(function () {
  GM.widgets['capstone-editor'] = function (container) {
    var w = GM.widgetShell(GM.t('Your 500 words', '500 từ của bạn'),
      GM.t('Drafts save automatically on this device. Write for a lay reader; keep the technical reader honest.', 'Bản nháp được tự động lưu trên thiết bị này. Hãy viết sao cho người không chuyên hiểu được, nhưng vẫn đủ chính xác để người có chuyên môn đồng ý.'));
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
      GM.el('p', { class: 'note', style: { marginTop: 0 } }, [GM.t('Record feedback received; leave a box unchecked if that review is still pending:', 'Đánh dấu sau khi bạn đã nhận và sửa theo từng lượt góp ý:')]),
      GM.el('label', { style: { display: 'flex', gap: '.5em', margin: '.3em 0', fontSize: '.92rem' } }, [
        GM.el('input', { type: 'checkbox' }), GM.el('span', {}, [GM.t('An outsider read it and learned something they could repeat back.', 'Một người không học khóa này đã đọc và có thể giải thích lại ý chính bằng lời của họ.')]),
      ]),
      GM.el('label', { style: { display: 'flex', gap: '.5em', margin: '.3em 0', fontSize: '.92rem' } }, [
        GM.el('input', { type: 'checkbox' }), GM.el('span', {}, [GM.t('A technical reader checked the claims, and I addressed their corrections.', 'Một người có chuyên môn đã kiểm tra độ chính xác và tôi đã sửa theo góp ý của họ.')]),
      ]),
      GM.el('p', { class: 'note' }, [GM.t('Need an outline? Explain what the model predicts, how training differs from use, how scores become selected tokens, why fluent errors occur, and what evidence would support a claim about understanding.', 'Nếu chưa biết bắt đầu từ đâu, hãy lần lượt trả lời: mô hình dự đoán gì; lúc huấn luyện khác lúc sử dụng thế nào; mô hình chọn token tiếp theo ra sao; vì sao nó có thể nói sai mà vẫn rất trôi chảy; và cần bằng chứng gì trước khi kết luận rằng nó “hiểu”.')]),
    ]));
    refresh();
    container.appendChild(w.shell);
  };
})();
