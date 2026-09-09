/* Home page: course pitch, how sessions work, design principles, arc overview cards. */
GM.views.home = function (main) {
  var page = GM.el('div', { class: 'page' });

  page.appendChild(GM.el('header', { class: 'hero' }, [
    GM.el('p', { class: 'eyebrow' }, [GM.t('A practical, self-paced course', 'Khóa học thực hành, học theo nhịp riêng')]),
    GM.el('h1', {}, [GM.t('Understanding the Guessing Machines', 'Hiểu về những cỗ máy dự đoán')]),
    GM.el('p', { class: 'hero-sub' }, [GM.t('Learn how language models predict text, where they fail, and how to test their answers.', 'Tìm hiểu cách mô hình ngôn ngữ dự đoán văn bản, khi nào chúng sai và cách kiểm tra câu trả lời.')]),
    GM.el('div', { html: GM.t(
      '<p>You do not need a math or computer-science background. We begin with a familiar experience: someone stops halfway ' +
      'through a sentence, and a likely next word comes to mind. That simple act gives us a way to study prediction before ' +
      'we study software.</p>' +
      '<p>First practice prediction (Weeks 1–3), then learn to test answers and confidence (4–6). Apply those ideas to language ' +
      'models (7–9), then examine training and attention (10–12). Each technical term comes with an example.</p>',
      '<p>Bạn không cần biết trước về toán hay khoa học máy tính. Khóa học bắt đầu từ một việc rất quen: ai đó nói dở một câu, ' +
      'và trong đầu bạn bật ra một từ có vẻ hợp lý. Từ trải nghiệm đó, ta tìm hiểu dự đoán trước khi tìm hiểu phần mềm.</p>' +
      '<p>Đầu tiên luyện dự đoán (Tuần 1–3), rồi học kiểm tra đáp án và mức tự tin (4–6). Áp dụng các ý đó vào mô hình ' +
      'ngôn ngữ (7–9), sau đó tìm hiểu huấn luyện và attention (10–12). Mỗi thuật ngữ kỹ thuật đều có ví dụ đi kèm.</p>') }),
    GM.el('p', {}, [GM.el('a', { class: 'btn', href: '#/week/1' }, [GM.t('Start Week 1 →', 'Bắt đầu Tuần 1 →')])]),
  ]));

  page.appendChild(GM.el('h2', {}, [GM.t('How each week works', 'Mỗi tuần diễn ra như thế nào')]));
  page.appendChild(GM.el('div', { html: GM.t(
    '<p>Every session has four parts:</p>' +
    '<ol>' +
    '<li><strong>🧩 The puzzle</strong>: observe something that needs an explanation.</li>' +
    '<li><strong>🛠️ Try it</strong>: reproduce the effect in a short exercise.</li>' +
    '<li><strong>🏷️ Name it</strong>: connect the observation to a clear concept.</li>' +
    '<li><strong>✅ Check yourself</strong>: explain or predict something without looking back.</li>' +
    '</ol>' +
    '<p class="note">A useful test of understanding is whether you can explain an idea to someone else and use it to make ' +
    'a prediction. The checkpoints are private and ungraded.</p>',
    '<p>Mỗi buổi học có bốn phần:</p>' +
    '<ol><li><strong>🧩 Câu hỏi mở đầu</strong>: quan sát một việc cần được giải thích.</li>' +
    '<li><strong>🛠️ Thử ngay</strong>: tự tạo lại hiện tượng bằng một bài tập ngắn.</li>' +
    '<li><strong>🏷️ Gọi tên</strong>: nối điều vừa thấy với một khái niệm rõ ràng.</li>' +
    '<li><strong>✅ Tự kiểm tra</strong>: giải thích hoặc dự đoán mà không xem lại bài.</li></ol>' +
    '<p class="note">Bạn thực sự hiểu khi có thể giải thích cho người khác và dùng ý tưởng đó để dự đoán. Các bài tự kiểm không chấm điểm.</p>') }));

  page.appendChild(GM.el('h2', {}, [GM.t('The four rules this course lives by', 'Bốn nguyên tắc của khóa học')]));
  var principles = [
    [GM.t('1 · Start with evidence', '1 · Bắt đầu từ điều quan sát được'), GM.t('Each new idea begins with an example, question, or result that needs explaining.', 'Mỗi ý tưởng mới bắt đầu bằng một ví dụ, câu hỏi hoặc kết quả cần được giải thích.')],
    [GM.t('2 · Make it testable', '2 · Biến ý tưởng thành việc có thể kiểm tra'), GM.t('An exercise should let you observe the idea directly, not merely agree with a metaphor.', 'Bài tập phải giúp bạn quan sát ý tưởng trực tiếp, chứ không chỉ đồng ý với một phép ví von.')],
    [GM.t('3 · Separate behavior from mechanism', '3 · Tách hành vi khỏi cơ chế'), GM.t('A good answer does not tell us, by itself, how that answer was produced. We use controlled tests to compare explanations.', 'Một câu trả lời hay chưa cho biết nó được tạo ra bằng cách nào. Ta dùng phép thử có đối chứng để so sánh các cách giải thích.')],
    [GM.t('4 · Learn the idea before the label', '4 · Hiểu ý trước khi học tên'), GM.t('Technical terms arrive after you have seen the process they describe.', 'Thuật ngữ kỹ thuật chỉ xuất hiện sau khi bạn đã thấy quá trình mà nó mô tả.')],
  ];
  principles.forEach(function (p) {
    page.appendChild(GM.el('div', { class: 'card principle-card' }, [
      GM.el('h3', {}, [p[0]]), GM.el('p', {}, [p[1]]),
    ]));
  });

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
    '<p class="note">Các bài tập không cần mô hình ngôn ngữ chạy thật. Một số tính xác suất hoặc bước cập nhật khi huấn luyện; ' +
    'số khác hiển thị hội thoại, đáp án hoặc màu attention soạn sẵn. Bài học giải thích mỗi minh họa cho thấy được điều gì.</p>') }));

  main.appendChild(page);
};
