/* Capstone editor: "What an LLM is and isn't" in <=500 words. Autosaves to
   localStorage, live word count, copy-out, and the two-test checklist. */
(function () {
  GM.widgets['capstone-editor'] = function (container) {
    var w = GM.widgetShell('Your 500 words',
      'Drafts save automatically on this device. Write for a lay reader; keep the technical reader honest.');
    var ta = GM.el('textarea', { rows: '14', placeholder: 'What an LLM is and isn’t…' });
    ta.value = GM.store.getSaved('capstone-draft', '');
    var pill = GM.el('span', { class: 'word-count-pill' });
    var savedNote = GM.el('span', { class: 'note' });
    var saveTimer = null;

    function refresh() {
      var n = GM.wordCount(ta.value);
      pill.textContent = n + ' / 500 words';
      pill.className = 'word-count-pill' + (n > 500 ? ' over' : (n >= 300 ? ' good' : ''));
    }
    ta.addEventListener('input', function () {
      refresh();
      savedNote.textContent = 'saving…';
      clearTimeout(saveTimer);
      saveTimer = setTimeout(function () {
        GM.store.setSaved('capstone-draft', ta.value);
        savedNote.textContent = 'saved ✓';
      }, 500);
    });
    var copyBtn = GM.el('button', { class: 'btn small secondary' }, ['Copy to clipboard']);
    copyBtn.addEventListener('click', function () {
      var done = function () { copyBtn.textContent = 'Copied ✓'; setTimeout(function () { copyBtn.textContent = 'Copy to clipboard'; }, 1500); };
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(ta.value).then(done, function () {});
      else { ta.select(); document.execCommand('copy'); done(); }
    });
    w.body.appendChild(GM.el('div', { class: 'gm-row' }, [pill, savedNote, copyBtn]));
    w.body.appendChild(ta);
    w.body.appendChild(GM.el('div', { class: 'card', style: { boxShadow: 'none' } }, [
      GM.el('p', { class: 'note', style: { marginTop: 0 } }, ['The artifact passes when both boxes can be honestly ticked:']),
      GM.el('label', { style: { display: 'flex', gap: '.5em', margin: '.3em 0', fontSize: '.92rem' } }, [
        GM.el('input', { type: 'checkbox' }), GM.el('span', {}, ['An outsider read it and learned something they could repeat back.']),
      ]),
      GM.el('label', { style: { display: 'flex', gap: '.5em', margin: '.3em 0', fontSize: '.92rem' } }, [
        GM.el('input', { type: 'checkbox' }), GM.el('span', {}, ['A technical reader found nothing to correct.']),
      ]),
      GM.el('p', { class: 'note' }, ['Stuck? The course in one breath: the guessing game industrialized; two layers (scoring, choosing); training vs using; confident wrongness as structure, not glitch; “understands” needs a test attached.']),
    ]));
    refresh();
    container.appendChild(w.shell);
  };
})();
