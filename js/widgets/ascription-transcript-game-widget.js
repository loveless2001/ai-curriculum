/* The ascription game: transcripts with hidden sources. Vote, then reveal source
   + what test would actually move the needle. The point is the test, not the verdict. */
(function () {
  var CASES = [
    { title: 'Transcript A', text:
        '<span class="speaker">Q:</span> I’ve been feeling like nobody listens to me.<br>' +
        '<span class="speaker">A:</span> Why do you feel that nobody listens to you?<br>' +
        '<span class="speaker">Q:</span> My sister only talks about herself.<br>' +
        '<span class="speaker">A:</span> Tell me more about your sister.',
      source: 'ELIZA (1966) — a program of a few reflection tricks: flip pronouns, echo, prompt for more.',
      test: 'Break the script: say something the reflection rules mangle (“my sister is a submarine”). A listener who understands notices absurdity; a pattern-flipper reflects it back deadpan.' },
    { title: 'Transcript B', text:
        '<span class="speaker">Q:</span> Why does the big boat float when a little stone sinks?<br>' +
        '<span class="speaker">A:</span> The boat is spread out big so the water can hold it up everywhere. The stone is all squeezed into one spot, so the water can’t hold it.',
      source: 'A five-year-old human. Wrong in the details, yet tracking a real principle (displacement, groped-for).',
      test: 'Novel transfer: “would a flat sheet of the stone float?” The child’s answer will show whether the spread-out idea does real work or was a memorized phrase.' },
    { title: 'Transcript C', text:
        '<span class="speaker">Q:</span> Explain the joke: “I told my suitcase there’ll be no vacation this year. Now I’m dealing with emotional baggage.”<br>' +
        '<span class="speaker">A:</span> The humor comes from the double meaning of “emotional baggage”: literally, a suitcase with feelings; figuratively, unresolved psychological burdens. The joke treats the idiom as if it were literal.',
      source: 'A large language model. Fluent, correct, and produced by likely-text machinery.',
      test: 'The Week 4 move: novel cases. Invent a brand-new joke structure never written down anywhere and ask for the mechanism. Also probe consistency: does it give compatible explanations under rephrasing?' },
    { title: 'Transcript D', text:
        '<span class="speaker">Report:</span> The dog was taught names for over 1,000 toys. Told “fetch Bamboozle” — a name she had never heard, placed among familiar toys — she paused, then brought the one unfamiliar toy.',
      source: 'Chaser, a border collie (published animal-cognition research). The inference: new word → the thing without a name yet.',
      test: 'Controls, von-Pfungst style: does it survive when the handler doesn’t know which toy is which? Repeat with the experimenter out of the room; vary positions; rule out scent and gaze cues.' },
    { title: 'Transcript E', text:
        '<span class="speaker">Report:</span> Asked “what is 12 plus 7?”, the pony tapped its hoof nineteen times and stopped, to applause. It succeeded with several different questioners.',
      source: 'A Clever-Hans-style performance. Genuine skill — reading humans — misdescribed as arithmetic.',
      test: 'The historical controls exactly: questioners who don’t know the answer, and blinders. If accuracy collapses, the skill was cue-reading. (It did, and it was.)' },
  ];
  if (GM.language.isVietnamese()) CASES = [
    { title: 'Đoạn A', text: '<span class="speaker">Hỏi:</span> Gần đây tôi cảm thấy chẳng ai lắng nghe mình.<br><span class="speaker">Đáp:</span> Vì sao bạn cảm thấy không ai lắng nghe?<br><span class="speaker">Hỏi:</span> Chị tôi chỉ nói về bản thân.<br><span class="speaker">Đáp:</span> Hãy kể thêm về chị của bạn.', source: 'ELIZA (1966) — chương trình với vài thủ thuật phản chiếu: đổi đại từ, lặp lại và gợi người dùng nói thêm.', test: 'Phá kịch bản: nói điều quy tắc phản chiếu sẽ làm sai (“chị tôi là tàu ngầm”). Người hiểu nhận ra sự vô lý; bộ lật mẫu sẽ bình thản phản chiếu lại.' },
    { title: 'Đoạn B', text: '<span class="speaker">Hỏi:</span> Vì sao tàu lớn nổi còn viên đá nhỏ chìm?<br><span class="speaker">Đáp:</span> Tàu trải rộng nên nước đỡ nó ở khắp nơi. Đá bị dồn vào một chỗ nên nước không đỡ nổi.', source: 'Một em bé năm tuổi. Sai ở chi tiết nhưng đang lần tới nguyên lý thật về lực đẩy và thể tích chiếm chỗ.', test: 'Chuyển sang trường hợp mới: “một tấm đá phẳng có nổi không?” Câu trả lời cho thấy ý tưởng “trải rộng” có thật sự làm việc hay chỉ là câu học thuộc.' },
    { title: 'Đoạn C', text: '<span class="speaker">Hỏi:</span> Giải thích câu đùa: “Tôi bảo chiếc va-li năm nay không được đi nghỉ. Giờ tôi phải xử lý hành lý cảm xúc.”<br><span class="speaker">Đáp:</span> Sự hài hước đến từ hai nghĩa của “hành lý cảm xúc”: theo nghĩa đen là chiếc va-li có cảm xúc; theo nghĩa bóng là gánh nặng tâm lý chưa giải quyết. Câu đùa biến thành ngữ thành nghĩa đen.', source: 'Một mô hình ngôn ngữ lớn. Lưu loát, chính xác, được tạo bởi cơ chế tạo văn bản có khả năng cao.', test: 'Nước đi Tuần 4: trường hợp mới. Bịa cấu trúc câu đùa chưa từng được viết rồi hỏi cơ chế. Đồng thời thử tính nhất quán khi diễn đạt lại.' },
    { title: 'Đoạn D', text: '<span class="speaker">Báo cáo:</span> Một con chó được dạy tên hơn 1.000 đồ chơi. Khi nghe “lấy Bamboozle” — cái tên chưa từng nghe, đặt giữa đồ quen — nó dừng lại rồi mang về món đồ lạ duy nhất.', source: 'Chaser, chó border collie trong nghiên cứu nhận thức động vật. Suy luận: từ mới → vật chưa có tên.', test: 'Đối chứng kiểu von Pfungst: kết quả còn đúng khi người hướng dẫn không biết món nào là gì? Cho người thí nghiệm ra khỏi phòng, đổi vị trí, loại trừ mùi và hướng nhìn.' },
    { title: 'Đoạn E', text: '<span class="speaker">Báo cáo:</span> Khi được hỏi “12 cộng 7 bằng bao nhiêu?”, con ngựa gõ móng mười chín lần rồi dừng giữa tiếng vỗ tay. Nó thành công với nhiều người hỏi.', source: 'Màn biểu diễn kiểu Hans Thông minh. Kỹ năng thật — đọc tín hiệu người — bị mô tả nhầm thành số học.', test: 'Đúng các đối chứng lịch sử: người hỏi không biết đáp án và che mắt ngựa. Nếu độ chính xác sụp, kỹ năng là đọc tín hiệu. (Và nó đã sụp.)' },
  ];

  GM.widgets['ascription-game'] = function (container) {
    var w = GM.widgetShell(GM.t('The ascription game', 'Trò quy gán'),
      GM.t('For each transcript: argue both sides in your head, vote, then reveal. Score yourself on the quality of your proposed test, not your verdict.', 'Với mỗi đoạn: tự lập luận cả hai phía, bỏ phiếu rồi mở nguồn. Hãy đánh giá chất lượng phép thử bạn đề xuất, không phải phán đoán.'));
    CASES.forEach(function (c) {
      var verdict = null;
      var voteRow = GM.el('div', { class: 'gm-row' });
      var reveal = GM.el('div');
      [GM.t('It understands', 'Nó hiểu'), GM.t('It doesn’t', 'Nó không hiểu'), GM.t('Can’t say without a further test', 'Chưa thể nói nếu chưa thử thêm')].forEach(function (v) {
        var chip = GM.el('span', { class: 'chip', role: 'button', tabindex: '0' }, [v]);
        chip.addEventListener('click', function () {
          voteRow.querySelectorAll('.chip').forEach(function (x) { x.classList.remove('selected'); });
          chip.classList.add('selected'); verdict = v;
        });
        voteRow.appendChild(chip);
      });
      var btn = GM.el('button', { class: 'btn small' }, [GM.t('Reveal source & the test', 'Mở nguồn và phép thử')]);
      btn.addEventListener('click', function () {
        btn.disabled = true;
        reveal.appendChild(GM.feedback('info', GM.t('<strong>Source:</strong> ', '<strong>Nguồn:</strong> ') + c.source));
        reveal.appendChild(GM.feedback('good', GM.t('<strong>A test that would move the needle:</strong> ', '<strong>Phép thử có thể làm thay đổi kết luận:</strong> ') + c.test));
        if (verdict === GM.t('Can’t say without a further test', 'Chưa thể nói nếu chưa thử thêm')) {
          reveal.appendChild(GM.el('p', { class: 'note' }, [GM.t('You picked the option this game exists to teach. “Understands” without a test attached is a feeling, not a finding.', 'Bạn đã chọn phương án mà trò chơi muốn dạy. “Hiểu” mà không gắn phép thử là cảm giác, không phải phát hiện.')]));
        }
      });
      w.body.appendChild(GM.el('div', { class: 'card transcript', style: { boxShadow: 'none' } }, [
        GM.el('strong', { style: { fontFamily: 'var(--font-sans)', fontSize: '.85rem' } }, [c.title]),
        GM.el('p', { html: c.text }),
        voteRow,
        GM.el('div', { class: 'gm-row' }, [btn]),
        reveal,
      ]));
    });
    container.appendChild(w.shell);
  };
})();
