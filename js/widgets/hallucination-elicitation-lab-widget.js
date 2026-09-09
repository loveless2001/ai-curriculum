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
      GM.t('These answers are scripted examples, not live model output. Run a query twice and compare.', 'Đây là câu trả lời soạn sẵn, không phải đầu ra mô hình thật. Chạy hai lần rồi so sánh.'));
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
        GM.el('span', { class: 'machine-tag' }, [GM.t('prepared example · run #', 'ví dụ soạn sẵn · lượt #') + runCount + GM.t(' — identical on every rerun', ' — giống hệt khi chạy lại')]),
        q.out,
      ]));
      if (!q.truthful) {
        out.appendChild(GM.feedback('bad',
          GM.t('This answer was written as a fictional example. It repeats because the demo returns saved text. For the historical question, the breakfast description is invented; the person is real.', 'Câu này được soạn làm ví dụ hư cấu. Nó lặp lại vì mô phỏng trả về văn bản đã lưu. Với câu lịch sử, phần bữa sáng là bịa; nhân vật là có thật.')));
      } else {
        out.appendChild(GM.feedback('good',
          GM.t('This is the factual example in our prepared set. In a real model, correct and incorrect answers can both sound fluent. Check claims against independent sources.', 'Đây là ví dụ đúng trong bộ soạn sẵn. Ở mô hình thật, cả câu đúng và sai đều có thể trôi chảy. Hãy đối chiếu khẳng định với nguồn độc lập.')));
      }
      logBody.appendChild(GM.el('tr', {}, [
        GM.el('td', {}, [q.label.split(':')[0]]),
        GM.el('td', {}, [q.truthful ? GM.t('accurate', 'chính xác') : GM.t('fabricated', 'bịa đặt')]),
        GM.el('td', {}, [GM.t('yes — scripted', 'có — soạn sẵn')]),
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
        GM.el('span', { class: 'machine-tag' }, [GM.t('prepared example', 'ví dụ soạn sẵn')]),
        GM.t('I’m quite confident in that answer, though I’d recommend verifying important details against primary sources.', 'Tôi khá tự tin về câu trả lời, dù khuyên bạn kiểm tra các chi tiết quan trọng với nguồn sơ cấp.'),
      ]));
      out.appendChild(GM.feedback('warn',
        GM.t('The demo returns the same confidence statement for true and false examples. That sentence is not a reliability measurement. Calibration requires comparing many predictions with verified outcomes.', 'Mô phỏng trả cùng lời tự nhận mức tự tin cho cả ví dụ đúng lẫn sai. Lời tự nhận đó không phải phép đo độ tin cậy. Muốn đánh giá hiệu chuẩn, cần so nhiều dự đoán với kết quả đã kiểm chứng.')));
    });
    var drillBtn = GM.el('button', { class: 'btn small secondary' }, [GM.t('Precision drill: model answers', 'Luyện diễn đạt chính xác: đáp án mẫu')]);
    drillBtn.addEventListener('click', function () {
      drillBtn.disabled = true;
      drill.appendChild(GM.feedback('info',
        GM.t('<strong>“The AI lied”</strong> → “Its answer contained an invented citation; that alone does not establish intent.”<br>' +
        '<strong>“The AI glitched”</strong> → “The answer was wrong. I need more evidence to explain the cause.”<br>' +
        '<strong>“The AI knows this”</strong> → “It answered this question correctly. I would test new cases before generalizing.”', '<strong>“AI nói dối”</strong> → “Câu trả lời có trích dẫn bịa; riêng điều đó chưa chứng minh ý định.”<br><strong>“AI trục trặc”</strong> → “Câu trả lời sai. Cần thêm bằng chứng để giải thích nguyên nhân.”<br><strong>“AI biết điều này”</strong> → “Nó trả lời đúng câu này. Tôi sẽ thử trường hợp mới trước khi kết luận rộng hơn.”')));
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
