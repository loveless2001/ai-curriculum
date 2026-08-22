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
  var STORY = GM.t(EN_STORY, 'Mara đã tập bài nói xin nghỉ việc suốt ba tuần. Cô in sẵn lá thư, gấp phẳng chiếc hộp đựng đồ bàn làm việc trong túi và soạn email chia tay với giờ gửi đã hẹn. Sáng thứ Hai, cô bước vào phòng quản lý, thư cầm trên tay — rồi thấy ông đang tự xếp đồ vào hộp. Ông vừa bị cho thôi việc một giờ trước. Quản lý tạm quyền mới đến vào thứ Năm hóa ra là Priya: bạn cùng phòng đại học, người mười năm trước đã thuyết phục Mara ứng tuyển công việc này. Mara quay về bàn, cất lá thư vào ngăn kéo và không đổi giờ gửi email.');
  var EN_PROBES = [
    'Who the story is about, and what she planned to do?',
    'The twist that interrupted the plan (the manager’s own firing)?',
    'The coincidence (the new boss being her old roommate)?',
    'The ending — and whether the email still sends?',
    'The mood of the story (rehearsed control colliding with chance)?',
  ];
  var VI_PROBES = [
    'Câu chuyện nói về ai và cô ấy định làm gì?',
    'Bước ngoặt làm gián đoạn kế hoạch (người quản lý cũng bị cho thôi việc)?',
    'Sự trùng hợp (sếp mới là bạn cùng phòng cũ)?',
    'Kết thúc — và email có còn được gửi không?',
    'Tâm trạng của truyện (kế hoạch được tập kỹ va vào ngẫu nhiên)?',
  ];
  var PROBES = GM.language.isVietnamese() ? VI_PROBES : EN_PROBES;

  GM.widgets['compression-relay'] = function (container) {
    var w = GM.widgetShell(GM.t('Compress the story to exactly 10 words', 'Nén câu chuyện thành đúng 10 từ'),
      GM.t('Read, then summarize in exactly ten words. Then audit your compression honestly.', 'Đọc rồi tóm tắt bằng đúng mười từ. Sau đó kiểm tra bản nén một cách thành thật.'));
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
        audit.appendChild(GM.feedback('warn', GM.t('Exactly ten — that constraint is the exercise (you have ' + n + '). The pain of choosing is the point.', 'Phải đúng mười — ràng buộc ấy chính là bài tập (bạn đang có ' + n + '). Cảm giác khó chọn mới là điều cần trải nghiệm.')));
        return;
      }
      audit.appendChild(GM.el('p', {}, [GM.el('strong', {}, [GM.t('Your ten words: ', 'Mười từ của bạn: ')]), GM.el('em', {}, ['“' + ta.value.trim() + '”'])]));
      audit.appendChild(GM.el('p', { class: 'note' }, [GM.t('Now the audit. From those ten words alone, could a stranger recover:', 'Bây giờ hãy kiểm tra. Chỉ từ mười từ ấy, người lạ có thể dựng lại:')]));
      PROBES.forEach(function (p) {
        audit.appendChild(GM.el('label', { style: { display: 'flex', gap: '.5em', margin: '.3em 0', fontSize: '.92rem' } }, [
          GM.el('input', { type: 'checkbox' }), GM.el('span', {}, [p]),
        ]));
      });
      audit.appendChild(GM.feedback('info',
        GM.t('Whatever you left unchecked <strong>died in compression</strong> — and that was your editorial choice, not an accident. ' +
        'Was what survived the right thing to keep? For whom? A different reader (Mara’s manager, say) would have needed a ' +
        'different ten words. There is no purpose-free summary, only purpose-fit ones.', 'Điều bạn không đánh dấu đã <strong>chết trong quá trình nén</strong> — đó là lựa chọn biên tập, không phải tai nạn. Thứ sống sót có phải thứ đúng để giữ không? Cho ai? Một độc giả khác, chẳng hạn quản lý của Mara, sẽ cần mười từ khác. Không có bản tóm tắt phi mục đích, chỉ có bản phù hợp mục đích.')));
      audit.appendChild(GM.el('p', { class: 'note' }, [GM.t('Pair variant: send only your ten words to someone who hasn’t read the story, have them retell it back, and compare against the original.', 'Bản chơi đôi: chỉ gửi mười từ cho người chưa đọc truyện, nhờ họ kể lại rồi so với bản gốc.')]));
    });
    w.body.appendChild(GM.el('div', { class: 'gm-row' }, [pill]));
    w.body.appendChild(ta);
    w.body.appendChild(GM.el('div', { class: 'gm-row' }, [btn]));
    w.body.appendChild(audit);
    container.appendChild(w.shell);
  };
})();
