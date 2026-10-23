/* The ascription game: transcripts with hidden sources. Vote, then reveal source
   + what test would actually move the needle. The point is the test, not the verdict. */
(function () {
  var CASES = [
    { title: 'Transcript A', text:
        '<span class="speaker">Q:</span> I’ve been feeling like nobody listens to me.<br>' +
        '<span class="speaker">A:</span> Why do you feel that nobody listens to you?<br>' +
        '<span class="speaker">Q:</span> My sister only talks about herself.<br>' +
        '<span class="speaker">A:</span> Tell me more about your sister.',
      source: 'An illustrative exchange in the style of ELIZA’s DOCTOR script (Joseph Weizenbaum, MIT; described in 1966). It used keyword rules to reshape a user’s words and invite them to say more.',
      test: 'Stay with the sister story, but add a new fact: “Last night my sister listened to me for an hour.” Ask whether “she only talks about herself” still fits. A reply should use the new fact, not just echo “sister.” One good reply would still not prove human-like understanding.' },
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
    { title: 'Đoạn A', text: '<span class="speaker">Hỏi:</span> Gần đây tôi cảm thấy chẳng ai lắng nghe mình.<br><span class="speaker">Đáp:</span> Vì sao bạn cảm thấy không ai lắng nghe?<br><span class="speaker">Hỏi:</span> Chị tôi chỉ nói về bản thân.<br><span class="speaker">Đáp:</span> Hãy kể thêm về chị của bạn.', source: 'Đoạn minh họa theo kịch bản DOCTOR của ELIZA (Joseph Weizenbaum, MIT; công bố năm 1966). Kịch bản dùng quy tắc tìm từ, đổi đại từ và hỏi lại.', test: 'Giữ chuyện người chị nhưng thêm tin mới: “Tối qua chị ấy ngồi nghe tôi kể chuyện suốt một giờ.” Hỏi: “Vậy tôi có còn chắc chị ấy chỉ nói về bản thân không?” Câu trả lời cần xét tin mới, không chỉ nhắc lại chữ “chị”. Một lần trả lời hợp lý vẫn chưa đủ kết luận nó hiểu như người.' },
    { title: 'Đoạn B', text: '<span class="speaker">Hỏi:</span> Vì sao tàu lớn nổi còn viên đá nhỏ chìm?<br><span class="speaker">Đáp:</span> Tàu trải rộng nên nước đỡ nó ở khắp nơi. Đá bị dồn vào một chỗ nên nước không đỡ nổi.', source: 'Ví dụ mô phỏng câu trả lời của một trẻ nhỏ: chưa chính xác, nhưng đã chạm tới ý tưởng thật về lực đẩy và thể tích chiếm chỗ.', test: 'Hỏi sang trường hợp mới: “Một tấm đá thật mỏng và phẳng có nổi không?” Câu trả lời sẽ cho thấy ý “trải rộng” có thực sự được dùng để suy nghĩ hay chỉ là câu học thuộc.' },
    { title: 'Đoạn C', text: '<span class="speaker">Hỏi:</span> Giải thích câu đùa: “Tôi kể chuyện buồn cho cái cân. Nó bảo: Chuyện này nặng thật.”<br><span class="speaker">Đáp:</span> Câu “chuyện này nặng” có hai nghĩa. Với cái cân, “nặng” gợi đến trọng lượng. Còn khi nói về chuyện buồn, “nặng” nghĩa là nghiêm trọng, khó chịu đựng. Câu đùa ghép hai nghĩa đó lại.', source: 'Ví dụ mô phỏng kiểu câu trả lời mà một mô hình ngôn ngữ lớn có thể đưa ra. Đoạn này không được lấy từ một lượt chạy thật.', test: 'Đưa một câu đùa mới với cấu trúc khác rồi hỏi lại cách gây cười. Sau đó diễn đạt cùng câu hỏi theo vài cách để xem lời giải thích có nhất quán không.' },
    { title: 'Đoạn D', text: '<span class="speaker">Báo cáo:</span> Một con chó được dạy tên hơn 1.000 đồ chơi. Khi nghe “lấy Bamboozle” — một cái tên chưa từng nghe — giữa nhiều món quen thuộc, nó dừng lại rồi mang về món đồ lạ duy nhất.', source: 'Chaser, một chú chó border collie trong nghiên cứu về nhận thức động vật. Có vẻ nó suy ra: từ mới chỉ món đồ chưa có tên.', test: 'Lặp lại khi người hướng dẫn không biết món đồ nào là đáp án. Đổi vị trí đồ vật, cho người thí nghiệm ra khỏi phòng và loại trừ mùi hoặc hướng nhìn.' },
    { title: 'Đoạn E', text: '<span class="speaker">Báo cáo:</span> Khi được hỏi “12 cộng 7 bằng bao nhiêu?”, con ngựa gõ móng mười chín lần rồi dừng giữa tiếng vỗ tay. Nó làm đúng với nhiều người hỏi.', source: 'Một màn biểu diễn kiểu Clever Hans. Con ngựa thực sự có kỹ năng đọc tín hiệu của con người, nhưng kỹ năng ấy bị nhầm thành khả năng làm toán.', test: 'Để người không biết đáp án đặt câu hỏi, hoặc che tầm nhìn của con ngựa. Nếu nó không còn trả lời đúng, nguyên nhân nhiều khả năng là tín hiệu từ người hỏi. Đây cũng chính là điều đã xảy ra.' },
  ];

  GM.widgets['ascription-game'] = function (container) {
    var w = GM.widgetShell(GM.t('The ascription game', 'Đoán xem ai thực sự hiểu'),
      GM.t('For each transcript: argue both sides in your head, vote, then reveal. Score yourself on the quality of your proposed test, not your verdict.', 'Các đoạn này được viết lại để minh họa, không phải bản ghi nguyên văn. Đọc từng đoạn, chọn một phương án, rồi xem tình huống dựa trên điều gì và có thể kiểm tra thêm ra sao.'));
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
      var btn = GM.el('button', { class: 'btn small' }, [GM.t('Reveal source & the test', 'Xem giải thích và cách kiểm tra')]);
      btn.addEventListener('click', function () {
        btn.disabled = true;
        reveal.appendChild(GM.feedback('info', GM.t('<strong>Source:</strong> ', '<strong>Dựa trên:</strong> ') + c.source));
        reveal.appendChild(GM.feedback('good', GM.t('<strong>A test that would move the needle:</strong> ', '<strong>Có thể kiểm tra thêm bằng cách:</strong> ') + c.test));
        if (verdict === GM.t('Can’t say without a further test', 'Chưa thể nói nếu chưa thử thêm')) {
          reveal.appendChild(GM.el('p', { class: 'note' }, [GM.t('You picked the option this game exists to teach. “Understands” without a test attached is a feeling, not a finding.', 'Đây là điểm chính của bài: nếu chưa nói rõ sẽ kiểm tra thế nào, nhận xét “nó hiểu” mới chỉ là ấn tượng.')]));
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
