/* Compression relay: read a short story, compress it to exactly 10 words,
   then audit what a stranger could reconstruct — lossy compression felt directly. */
(function () {
  var EN_STORY =
    'Mara had rehearsed her resignation speech for three weeks. She had the letter printed, the box for her desk things ' +
    'folded flat in her bag, and a farewell email drafted with the send time already set. On Monday morning she walked ' +
    'into her manager’s office, letter in hand — and found him packing his own things into a box. He’d been let go an ' +
    'hour earlier. The new interim manager, arriving Thursday, turned out to be Priya: the college roommate who, ten ' +
    'years ago, had convinced Mara to apply for this job in the first place. Mara went back to her desk, put the letter ' +
    'in a drawer, and left the send time unchanged.';
  var STORY = GM.t(EN_STORY, 'Mara đã tập đi tập lại lời xin nghỉ việc suốt ba tuần. Cô in sẵn đơn, để một chiếc thùng carton xếp gọn trong túi để mang đồ cá nhân về, và hẹn giờ gửi email chia tay. Sáng thứ Hai, Mara cầm đơn bước vào phòng quản lý thì thấy ông cũng đang thu dọn đồ đạc. Ông vừa bị cho thôi việc một tiếng trước đó. Đến thứ Năm, quản lý tạm quyền mới sẽ bắt đầu công việc. Người đó lại là Priya, bạn cùng phòng thời đại học đã thuyết phục Mara nộp đơn vào công ty này mười năm trước. Mara quay về bàn, cất đơn nghỉ việc vào ngăn kéo và vẫn giữ nguyên giờ gửi email.');
  var EN_PROBES = [
    'Who the story is about, and what she planned to do?',
    'The twist that interrupted the plan (the manager’s own firing)?',
    'The coincidence (the new boss being her old roommate)?',
    'The ending — and whether the email still sends?',
    'The mood of the story (rehearsed control colliding with chance)?',
  ];
  var VI_PROBES = [
    'Câu chuyện nói về ai và cô ấy định làm gì?',
    'Chuyện bất ngờ khiến kế hoạch thay đổi: quản lý của Mara vừa bị cho thôi việc?',
    'Sự trùng hợp: sếp mới chính là bạn cùng phòng cũ của Mara?',
    'Cuối cùng Mara làm gì, và email có vẫn được gửi không?',
    'Không khí của câu chuyện: mọi thứ được chuẩn bị kỹ nhưng lại đổi hướng vì một chuyện bất ngờ?',
  ];
  var PROBES = GM.language.isVietnamese() ? VI_PROBES : EN_PROBES;

  GM.widgets['compression-relay'] = function (container) {
    var w = GM.widgetShell(GM.t('Compress the story to exactly 10 words', 'Nén câu chuyện thành đúng 10 từ'),
      GM.t('Read, then summarize in exactly ten words. Then audit your compression honestly.', 'Đọc câu chuyện rồi tóm tắt bằng đúng mười từ. Sau đó xem bạn đã buộc phải bỏ đi những gì.'));
    w.body.appendChild(GM.el('div', { class: 'card', style: { boxShadow: 'none' } }, [
      GM.el('p', { style: { margin: 0, fontSize: '.98rem' } }, [STORY]),
    ]));
    var ta = GM.el('textarea', { rows: '2', placeholder: GM.t('Your ten words…', 'Mười từ của bạn…') });
    var pill = GM.el('span', { class: 'word-count-pill' }, [GM.t('0 / 10 words', '0 / 10 từ')]);
    var audit = GM.el('div');
    ta.addEventListener('input', function () {
      var n = GM.wordCount(ta.value);
      pill.textContent = n + GM.t(' / 10 words', ' / 10 từ');
      pill.className = 'word-count-pill' + (n === 10 ? ' good' : (n > 10 ? ' over' : ''));
    });
    var btn = GM.el('button', { class: 'btn small' }, [GM.t('Audit my compression', 'Kiểm tra bản nén')]);
    btn.addEventListener('click', function () {
      var n = GM.wordCount(ta.value);
      audit.innerHTML = '';
      if (n !== 10) {
        audit.appendChild(GM.feedback('warn', GM.t('Exactly ten — that constraint is the exercise (you have ' + n + '). The pain of choosing is the point.', 'Bài tập yêu cầu đúng mười từ; hiện bạn có ' + n + '. Việc phải cân nhắc xem nên giữ hay bỏ chi tiết nào chính là mục đích của bài này.')));
        return;
      }
      audit.appendChild(GM.el('p', {}, [GM.el('strong', {}, [GM.t('Your ten words: ', 'Mười từ của bạn: ')]), GM.el('em', {}, ['“' + ta.value.trim() + '”'])]));
      audit.appendChild(GM.el('p', { class: 'note' }, [GM.t('Now the audit. From those ten words alone, could a stranger recover:', 'Một người chưa đọc truyện có thể biết được những điều nào sau đây chỉ từ mười từ của bạn?')]));
      PROBES.forEach(function (p) {
        audit.appendChild(GM.el('label', { style: { display: 'flex', gap: '.5em', margin: '.3em 0', fontSize: '.92rem' } }, [
          GM.el('input', { type: 'checkbox' }), GM.el('span', {}, [p]),
        ]));
      });
      audit.appendChild(GM.feedback('info',
        GM.t('Whatever you left unchecked <strong>died in compression</strong> — and that was your editorial choice, not an accident. ' +
        'Was what survived the right thing to keep? For whom? A different reader (Mara’s manager, say) would have needed a ' +
        'different ten words. There is no purpose-free summary, only purpose-fit ones.', 'Mỗi ô bỏ trống là một phần thông tin đã mất khi bạn rút gọn. Đó là hệ quả của việc bạn chọn giữ chi tiết này và bỏ chi tiết khác. Nhưng lựa chọn ấy có phù hợp với người đọc không? Chẳng hạn, quản lý của Mara có thể cần một bản tóm tắt hoàn toàn khác. Tóm tắt tốt hay không còn phụ thuộc vào nó được viết cho ai và để làm gì.')));
      audit.appendChild(GM.el('p', { class: 'note' }, [GM.t('Pair variant: send only your ten words to someone who hasn’t read the story, have them retell it back, and compare against the original.', 'Bản chơi đôi: chỉ gửi mười từ cho người chưa đọc truyện, nhờ họ kể lại rồi so với bản gốc.')]));
    });
    w.body.appendChild(GM.el('div', { class: 'gm-row' }, [pill]));
    w.body.appendChild(ta);
    w.body.appendChild(GM.el('div', { class: 'gm-row' }, [btn]));
    w.body.appendChild(audit);
    container.appendChild(w.shell);
  };
})();
