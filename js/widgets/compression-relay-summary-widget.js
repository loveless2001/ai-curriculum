/* Compression relay: read a short story, compress it to exactly 10 words,
   then audit what a stranger could reconstruct — lossy compression felt directly. */
(function () {
  var STORY =
    'Mara had rehearsed her resignation speech for three weeks. She had the letter printed, the box for her desk things ' +
    'folded flat in her bag, and a farewell email drafted with the send time already set. On Monday morning she walked ' +
    'into her manager’s office, letter in hand — and found him packing his own things into a box. He’d been let go an ' +
    'hour earlier. The new interim manager, arriving Thursday, turned out to be Priya: the college roommate who, ten ' +
    'years ago, had convinced Mara to apply for this job in the first place. Mara went back to her desk, put the letter ' +
    'in a drawer, and left the send time unchanged.';
  var PROBES = [
    'Who the story is about, and what she planned to do?',
    'The twist that interrupted the plan (the manager’s own firing)?',
    'The coincidence (the new boss being her old roommate)?',
    'The ending — and whether the email still sends?',
    'The mood of the story (rehearsed control colliding with chance)?',
  ];

  GM.widgets['compression-relay'] = function (container) {
    var w = GM.widgetShell('Compress the story to exactly 10 words',
      'Read, then summarize in exactly ten words. Then audit your compression honestly.');
    w.body.appendChild(GM.el('div', { class: 'card', style: { boxShadow: 'none' } }, [
      GM.el('p', { style: { margin: 0, fontSize: '.98rem' } }, [STORY]),
    ]));
    var ta = GM.el('textarea', { rows: '2', placeholder: 'Your ten words…' });
    var pill = GM.el('span', { class: 'word-count-pill' }, ['0 / 10 words']);
    var audit = GM.el('div');
    ta.addEventListener('input', function () {
      var n = GM.wordCount(ta.value);
      pill.textContent = n + ' / 10 words';
      pill.className = 'word-count-pill' + (n === 10 ? ' good' : (n > 10 ? ' over' : ''));
    });
    var btn = GM.el('button', { class: 'btn small' }, ['Audit my compression']);
    btn.addEventListener('click', function () {
      var n = GM.wordCount(ta.value);
      audit.innerHTML = '';
      if (n !== 10) {
        audit.appendChild(GM.feedback('warn', 'Exactly ten — that constraint is the exercise (you have ' + n + '). The pain of choosing is the point.'));
        return;
      }
      audit.appendChild(GM.el('p', {}, [GM.el('strong', {}, ['Your ten words: ']), GM.el('em', {}, ['“' + ta.value.trim() + '”'])]));
      audit.appendChild(GM.el('p', { class: 'note' }, ['Now the audit. From those ten words alone, could a stranger recover:']));
      PROBES.forEach(function (p) {
        audit.appendChild(GM.el('label', { style: { display: 'flex', gap: '.5em', margin: '.3em 0', fontSize: '.92rem' } }, [
          GM.el('input', { type: 'checkbox' }), GM.el('span', {}, [p]),
        ]));
      });
      audit.appendChild(GM.feedback('info',
        'Whatever you left unchecked <strong>died in compression</strong> — and that was your editorial choice, not an accident. ' +
        'Was what survived the right thing to keep? For whom? A different reader (Mara’s manager, say) would have needed a ' +
        'different ten words. There is no purpose-free summary, only purpose-fit ones.'));
      audit.appendChild(GM.el('p', { class: 'note' }, ['Pair variant: send only your ten words to someone who hasn’t read the story, have them retell it back, and compare against the original.']));
    });
    w.body.appendChild(GM.el('div', { class: 'gm-row' }, [pill]));
    w.body.appendChild(ta);
    w.body.appendChild(GM.el('div', { class: 'gm-row' }, [btn]));
    w.body.appendChild(audit);
    container.appendChild(w.shell);
  };
})();
