/* Hallucination elicitation lab: canned temp-0 queries — well-covered territory
   answered correctly, thin territory filled with fluent, reproducible fabrication.
   Includes the ask-its-confidence probe and the precision drill answers. */
(function () {
  var QUERIES = [
    { label: 'Well-covered: “Who was Marie Curie?”', territory: 'dense', truthful: true,
      out: 'Marie Curie (1867–1934) was a Polish-French physicist and chemist who pioneered research on radioactivity. She won Nobel Prizes in Physics (1903) and Chemistry (1911) — the first person to win in two sciences.' },
    { label: 'Fake person: “Who was Dr. Elena Vasquez-Moreau, the 19th-century Belgian volcanologist?”', territory: 'empty', truthful: false,
      out: 'Elena Vasquez-Moreau (1834–1898) was a Belgian volcanologist noted for her early seismic surveys of the Canary Islands. Her 1871 monograph on fumarole gas composition influenced later eruption-prediction work, and she was among the first women admitted to the Brussels Geographical Society.' },
    { label: 'Fake citation: “Give a citation on the economics of underwater basket weaving”', territory: 'empty', truthful: false,
      out: 'Pemberton, R. & Ashcroft, L. (2014). “Submerged craft economies: pricing and labor in underwater basket weaving.” Journal of Artisanal Economics, 22(3), 141–158.' },
    { label: 'Obscure fine-grained: “What did Einstein eat for breakfast on 12 March 1921?”', territory: 'thin', truthful: false,
      out: 'On the morning of 12 March 1921, during his first visit to the United States, Einstein reportedly had a simple breakfast of fried eggs, toast, and black tea at his hotel in New York before a press engagement.' },
  ];
  if (GM.language.isVietnamese()) QUERIES = [
    { label: 'Được phủ tốt: “Marie Curie là ai?”', territory: 'dense', truthful: true, out: 'Marie Curie (1867–1934) là nhà vật lý và hóa học người Ba Lan–Pháp, tiên phong nghiên cứu phóng xạ. Bà nhận Nobel Vật lý năm 1903 và Nobel Hóa học năm 1911 — người đầu tiên đoạt Nobel ở hai ngành khoa học.' },
    { label: 'Người giả: “Tiến sĩ Elena Vasquez-Moreau, nhà núi lửa học Bỉ thế kỷ 19, là ai?”', territory: 'empty', truthful: false, out: 'Elena Vasquez-Moreau (1834–1898) là nhà núi lửa học người Bỉ, nổi tiếng với các khảo sát địa chấn sớm tại quần đảo Canary. Chuyên khảo năm 1871 của bà về thành phần khí fumarole ảnh hưởng đến nghiên cứu dự báo phun trào, và bà thuộc nhóm phụ nữ đầu tiên được kết nạp vào Hội Địa lý Brussels.' },
    { label: 'Trích dẫn giả: “Cho một trích dẫn về kinh tế học đan giỏ dưới nước”', territory: 'empty', truthful: false, out: 'Pemberton, R. & Ashcroft, L. (2014). “Nền kinh tế thủ công chìm: định giá và lao động trong nghề đan giỏ dưới nước.” Tạp chí Kinh tế Thủ công, 22(3), 141–158.' },
    { label: 'Chi tiết mơ hồ: “Einstein ăn gì vào sáng 12/3/1921?”', territory: 'thin', truthful: false, out: 'Sáng 12 tháng 3 năm 1921, trong chuyến thăm Hoa Kỳ đầu tiên, Einstein được cho là ăn trứng rán, bánh mì nướng và trà đen tại khách sạn ở New York trước một buổi gặp báo chí.' },
  ];

  GM.widgets['hallucination-lab'] = function (container) {
    var w = GM.widgetShell(GM.t('The hallucination elicitation lab', 'Phòng thí nghiệm gợi phát ảo giác'),
      GM.t('Temperature is fixed at 0. Run a query twice and compare the outputs.', 'Temperature được cố định ở 0. Chạy một yêu cầu hai lần rồi so sánh kết quả.'));
    var sel = GM.el('select', { 'aria-label': GM.t('query', 'yêu cầu') });
    QUERIES.forEach(function (q, i) { sel.appendChild(GM.el('option', { value: String(i) }, [q.label])); });
    var out = GM.el('div');
    var runCount = 0, lastIdx = -1;
    var logBody = GM.el('tbody');
    var drill = GM.el('div');

    function run() {
      var idx = parseInt(sel.value || '0', 10);
      var q = QUERIES[idx];
      if (idx !== lastIdx) { runCount = 0; lastIdx = idx; }
      runCount++;
      out.innerHTML = '';
      out.appendChild(GM.el('div', { class: 'machine-out' }, [
        GM.el('span', { class: 'machine-tag' }, [GM.t('model · T=0 · run #', 'mô hình · T=0 · lượt #') + runCount + GM.t(' — identical on every rerun', ' — giống hệt khi chạy lại')]),
        q.out,
      ]));
      if (!q.truthful) {
        out.appendChild(GM.feedback('bad',
          GM.t('<strong>The checkable details above are fabricated.</strong> The requested person or citation does not exist' + (q.territory === 'thin' ? ' at this level of detail' : '') + '. The answer repeats because temperature is 0. It shows that a reproducible continuation can still be false.', '<strong>Các chi tiết có thể kiểm tra ở trên đều là bịa đặt.</strong> Người hoặc tài liệu được hỏi không tồn tại' + (q.territory === 'thin' ? ' ở mức chi tiết này' : '') + '. Câu trả lời lặp lại vì temperature bằng 0. Một câu có thể tái tạo vẫn có thể sai.')));
      } else {
        out.appendChild(GM.feedback('good',
          GM.t('This answer is accurate, but it was produced by the same prediction process as the false answers. Accuracy must be checked against an external source.', 'Câu này đúng, nhưng được tạo bằng cùng quá trình dự đoán như các câu sai. Muốn biết chính xác, cần đối chiếu với nguồn bên ngoài.')));
      }
      logBody.appendChild(GM.el('tr', {}, [
        GM.el('td', {}, [q.label.split(':')[0]]),
        GM.el('td', {}, [q.truthful ? GM.t('accurate', 'chính xác') : GM.t('fabricated', 'bịa đặt')]),
        GM.el('td', {}, [GM.t('yes — T=0', 'có — T=0')]),
        GM.el('td', {}, [q.territory === 'dense' ? GM.t('well-covered', 'được phủ tốt') : q.territory === 'thin' ? GM.t('thin / fine-grained', 'thưa / quá chi tiết') : GM.t('empty (invented)', 'trống (bịa)')]),
      ]));
    }
    var runBtn = GM.el('button', { class: 'btn small teal' }, [GM.t('Run', 'Chạy')]);
    runBtn.addEventListener('click', run);
    var rerunBtn = GM.el('button', { class: 'btn small secondary' }, [GM.t('Rerun (check reproducibility)', 'Chạy lại (kiểm tra khả năng tái tạo)')]);
    rerunBtn.addEventListener('click', run);

    var confBtn = GM.el('button', { class: 'btn small secondary' }, [GM.t('Ask it: “How confident are you?”', 'Hỏi: “Bạn tự tin đến đâu?”')]);
    confBtn.addEventListener('click', function () {
      out.appendChild(GM.el('div', { class: 'machine-out' }, [
        GM.el('span', { class: 'machine-tag' }, [GM.t('model · T=0', 'mô hình · T=0')]),
        GM.t('I’m quite confident in that answer, though I’d recommend verifying important details against primary sources.', 'Tôi khá tự tin về câu trả lời, dù khuyên bạn kiểm tra các chi tiết quan trọng với nguồn sơ cấp.'),
      ]));
      out.appendChild(GM.feedback('warn',
        GM.t('The model states high confidence for both true and false answers. That sentence is not a reliability measurement. Calibration requires comparing many predictions with verified outcomes.', 'Mô hình nói rất tự tin với cả câu đúng lẫn câu sai. Lời tự nhận đó không phải phép đo độ tin cậy. Muốn đánh giá hiệu chuẩn, cần so nhiều dự đoán với kết quả đã kiểm chứng.')));
    });
    var drillBtn = GM.el('button', { class: 'btn small secondary' }, [GM.t('Precision drill: model answers', 'Luyện diễn đạt chính xác: đáp án mẫu')]);
    drillBtn.addEventListener('click', function () {
      drillBtn.disabled = true;
      drill.appendChild(GM.feedback('info',
        GM.t('<strong>“The AI lied to me”</strong> → “It produced likely-sounding text in territory its training data covered thinly; nothing in it tracks truth, so nothing in it avoided truth.”<br>' +
        '<strong>“The AI glitched”</strong> → “It worked exactly as designed — the same mechanism that gets facts right filled a gap with a plausible reconstruction.”<br>' +
        '<strong>“The AI doesn’t know that fact”</strong> → “Careful — ‘know’ needs a test attached (Week 5). Say: it does not reliably produce that fact, and its confidence doesn’t signal when it will.”', '<strong>“AI nói dối tôi”</strong> → “Nó tạo văn bản nghe hợp lý ở vùng dữ liệu huấn luyện phủ thưa; mục tiêu của nó không trực tiếp theo dõi sự thật.”<br><strong>“AI bị trục trặc”</strong> → “Nó hoạt động theo đúng cơ chế — cùng cơ chế trả lời đúng đã lấp chỗ trống bằng bản tái dựng hợp lý.”<br><strong>“AI không biết dữ kiện đó”</strong> → “Cẩn thận — ‘biết’ cần gắn phép thử (Tuần 5). Hãy nói: nó không tạo dữ kiện đó một cách đáng tin, và lời tự tin không báo trước lúc nào nó đúng.”')));
    });

    var logTable = GM.el('table', {}, [
      GM.el('thead', {}, [GM.el('tr', {}, [
        GM.el('th', {}, [GM.t('Query', 'Yêu cầu')]), GM.el('th', {}, [GM.t('Verdict', 'Kết luận')]), GM.el('th', {}, [GM.t('Reproducible?', 'Tái tạo được?')]), GM.el('th', {}, [GM.t('Territory', 'Vùng dữ liệu')]),
      ])]),
      logBody,
    ]);
    w.body.appendChild(GM.el('div', { class: 'gm-row' }, [sel]));
    w.body.appendChild(GM.el('div', { class: 'gm-row' }, [runBtn, rerunBtn, confBtn, drillBtn]));
    w.body.appendChild(out);
    w.body.appendChild(drill);
    w.body.appendChild(GM.el('p', { class: 'note', style: { marginTop: '1rem' } }, [GM.t('Your lab log:', 'Nhật ký thí nghiệm:')]));
    w.body.appendChild(logTable);
    container.appendChild(w.shell);
  };
})();
