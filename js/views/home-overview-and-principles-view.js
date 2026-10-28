/* Home page: course pitch, how sessions work, design principles, arc overview cards. */
GM.views.home = function (main) {
  var page = GM.el('div', { class: 'page' });

  page.appendChild(GM.el('header', { class: 'hero' }, [
    GM.el('p', { class: 'eyebrow' }, [GM.t('A practical, self-paced course', 'Khóa học thực hành, học theo nhịp riêng')]),
    GM.el('h1', {}, [GM.t('Understanding the Guessing Machines', 'Hiểu về những cỗ máy dự đoán')]),
    GM.el('p', { class: 'hero-sub' }, [GM.t('Learn how language models predict text, where they fail, and how to turn vague requests into work you can test.', 'Hiểu mô hình ngôn ngữ dự đoán văn bản ra sao, vì sao nó có thể sai và cách biến một yêu cầu mơ hồ thành việc có thể kiểm tra.')]),
    GM.el('div', { html: GM.t(
      '<p>You do not need a math or computer-science background. We begin with a familiar experience: someone stops halfway ' +
      'through a sentence, and a likely next word comes to mind. That simple act gives us a way to study prediction before ' +
      'we study software.</p>' +
      '<p>First explore prediction and build a model (Weeks 1–3), then examine evidence and confidence (4–6). Apply those ideas to language ' +
      'models and complete a checked task (7–8), then examine token selection, training, and attention (9–12). Each week also transfers its idea to ordinary work: writing, planning, research, comparison, or document use.</p>',
      '<p>Bạn không cần biết trước về toán hay khoa học máy tính. Khóa học bắt đầu bằng một trải nghiệm rất quen: ai đó nói dở một câu, và trong đầu bạn tự bật ra một từ có vẻ hợp lý. Từ đó, ta tìm hiểu cách dự đoán hoạt động trước khi nói đến phần mềm.</p>' +
      '<p>Tuần 1–3 nói về dự đoán và cách dựng mô hình. Tuần 4–6 nói về bằng chứng và mức tự tin. Tuần 7–8 áp dụng những ý này vào mô hình ngôn ngữ, kết thúc bằng một công việc có tiêu chí và cách kiểm. Tuần 9–12 đi sâu vào cách chọn token, huấn luyện và attention. Mỗi tuần đều có một ví dụ từ công việc thường ngày.</p>') }),
    GM.el('p', {}, [GM.el('a', { class: 'btn', href: '#/week/1' }, [GM.t('Start Week 1 →', 'Bắt đầu Tuần 1 →')])]),
  ]));

  page.appendChild(GM.el('h2', {}, [GM.t('How each week works', 'Mỗi tuần diễn ra như thế nào')]));
  page.appendChild(GM.el('div', { html: GM.t(
    '<p>Every session has five parts:</p>' +
    '<ol>' +
    '<li><strong>🧩 The puzzle</strong>: observe something that needs an explanation.</li>' +
    '<li><strong>🛠️ Try it</strong>: reproduce the effect in a short exercise.</li>' +
    '<li><strong>🏷️ Name it</strong>: connect the observation to a clear concept.</li>' +
    '<li><strong>🔎 Apply it</strong>: use the idea to diagnose an ordinary task involving AI.</li>' +
    '<li><strong>✅ Check yourself</strong>: explain or predict something without looking back.</li>' +
    '</ol>' +
    '<p class="note">A useful test of understanding is whether you can explain an idea to someone else and use it to make ' +
    'a prediction. The checkpoints are private and ungraded.</p>',
    '<p>Mỗi buổi học có năm phần:</p>' +
    '<ol><li><strong>🧩 Câu hỏi mở đầu</strong>: bắt đầu từ một hiện tượng cần giải thích.</li>' +
    '<li><strong>🛠️ Thử ngay</strong>: tự quan sát hiện tượng đó qua một bài tập ngắn.</li>' +
    '<li><strong>🏷️ Gọi tên</strong>: nối điều vừa thấy với một khái niệm.</li>' +
    '<li><strong>🔎 Áp dụng</strong>: dùng ý vừa học vào một việc quen thuộc.</li>' +
    '<li><strong>✅ Tự kiểm tra</strong>: giải thích hoặc dự đoán mà không xem lại bài.</li></ol>' +
    '<p class="note">Bạn thực sự hiểu khi có thể giải thích cho người khác và dùng ý tưởng đó để dự đoán. Các bài tự kiểm không chấm điểm.</p>') }));

  page.appendChild(GM.el('h2', {}, [GM.t('The four rules this course lives by', 'Bốn nguyên tắc của khóa học')]));
  var principles = [
    [GM.t('1 · Start with evidence', '1 · Bắt đầu từ điều quan sát được'), GM.t('Each new idea begins with an example, question, or result that needs explaining.', 'Mỗi ý tưởng mới bắt đầu bằng một ví dụ, câu hỏi hoặc kết quả cần được giải thích.')],
    [GM.t('2 · Make it testable', '2 · Biến ý tưởng thành việc có thể kiểm tra'), GM.t('An exercise should let you observe the idea directly, not merely agree with a metaphor.', 'Bài tập phải giúp bạn quan sát ý tưởng trực tiếp, chứ không chỉ đồng ý với một phép ví von.')],
    [GM.t('3 · Separate behavior from mechanism', '3 · Tách kết quả khỏi cơ chế'), GM.t('A good answer does not tell us, by itself, how that answer was produced. We use controlled tests to compare explanations.', 'Một câu trả lời đúng chưa cho biết nó được tạo ra bằng cách nào. Muốn phân biệt các cách giải thích, ta phải thay đổi điều kiện kiểm tra.')],
    [GM.t('4 · Learn the idea before the label', '4 · Hiểu ý trước khi học tên'), GM.t('Technical terms arrive after you have seen the process they describe.', 'Thuật ngữ kỹ thuật chỉ xuất hiện sau khi bạn đã thấy quá trình mà nó mô tả.')],
  ];
  principles.forEach(function (p) {
    page.appendChild(GM.el('div', { class: 'card principle-card' }, [
      GM.el('h3', {}, [p[0]]), GM.el('p', {}, [p[1]]),
    ]));
  });

  page.appendChild(GM.el('h2', {}, [GM.t('Use it in real work', 'Dùng vào việc thật')]));
  page.appendChild(GM.el('div', { class: 'card practical-thread-card', html: GM.t(
    '<p>Each week applies its idea to a short example from writing, planning, research, or decision-making. You can save notes for a task of your own.</p>',
    '<p>Mỗi tuần áp dụng ý vừa học vào một ví dụ ngắn về viết, lập kế hoạch, nghiên cứu hoặc ra quyết định. Bạn có thể lưu ghi chú cho việc của mình.</p>'
  ) }));

  page.appendChild(GM.el('h2', {}, [GM.t('The four arcs', 'Bốn chặng học')]));
  GM.arcs.forEach(function (arc) {
    var doneInArc = arc.weeks.filter(function (n) { return GM.store.isCheckpointDone(n); }).length;
    page.appendChild(GM.el('a', { class: 'card arc-overview-card', href: '#/week/' + arc.weeks[0] }, [
      GM.el('h3', {}, [arc.name]),
      GM.el('p', { style: { fontStyle: 'italic', color: 'var(--ink-soft)' } }, [arc.claim]),
      GM.el('p', { class: 'arc-weeks' }, [
        GM.t('Weeks ' + arc.weeks[0] + '–' + arc.weeks[arc.weeks.length - 1] + ' · ' + doneInArc + '/' + arc.weeks.length + ' checkpoints passed',
          'Tuần ' + arc.weeks[0] + '–' + arc.weeks[arc.weeks.length - 1] + ' · hoàn thành ' + doneInArc + '/' + arc.weeks.length + ' mốc kiểm tra'),
      ]),
    ]));
  });

  page.appendChild(GM.el('hr'));
  page.appendChild(GM.el('div', { html: GM.t(
    '<p class="note">All exercises work without a live language model. Some calculate probabilities or training updates; ' +
    'others show prepared conversations, answers, or attention highlights. The lessons explain what each demonstration can show.</p>',
    '<p class="note">Bạn không cần chạy một mô hình ngôn ngữ thật để làm bài. Một số bài tự tính xác suất hoặc bước cập nhật; số khác dùng hội thoại, câu trả lời hay màu attention được dựng sẵn. Mỗi bài đều nói rõ ví dụ đó chứng minh được gì và chưa chứng minh được gì.</p>') }));

  main.appendChild(page);
};
