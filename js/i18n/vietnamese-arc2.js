/* Vietnamese reader-first reconstruction for Arc 2. Loaded after English data. */
(function () {
  if (!GM.language.isVietnamese()) return;

  Object.assign(GM.arcs.find(function (arc) { return arc.id === 2; }), {
    name: 'Chặng 2 — Kiểm tra một khẳng định về hiểu biết',
    shortName: 'Chặng 2 · Biết',
    claim: 'Một câu trả lời đúng chưa cho biết nó được tạo ra bằng cách nào. Chặng này hướng dẫn cách kiểm tra một tuyên bố về hiểu biết và cách nói rõ giới hạn của từng phép thử.',
  });

  var weeks = {
    4: {
      short: 'Kiểm tra trí nhớ, mẫu và quy tắc', title: 'Kiểm tra trí nhớ, mẫu và quy tắc',
      tagline: 'Cùng một đáp án có thể đến từ trí nhớ, mẫu quen thuộc hoặc một quy tắc.',
      checkpointStatement: 'Tôi có thể thiết kế phép thử kỹ năng và giải thích điều kết quả vẫn chưa chứng minh được.',
      beats: [
        { html: '<p>Hai học sinh cùng trả lời “56” cho 7 × 8. Một em nhớ đáp án; em kia tính ra. Chỉ đáp án này chưa cho biết cách nào đã được dùng.</p><p><strong>Bạn sẽ hỏi gì tiếp?</strong> Thử 17 × 8, rồi hỏi cách làm. Câu hỏi mới cho thêm bằng chứng, nhưng người học cũng có thể đã luyện câu đó.</p>' },
        { title: 'Tìm quy tắc bí mật', html: '<p>Nhập ba số để thử một quy tắc bí mật. Trò chơi sẽ cho biết bộ số có phù hợp không.</p><p>Sau mỗi kết quả, ghi quy tắc bạn đang đoán. Sau đó chọn một phép thử có thể bác bỏ quy tắc ấy. Chỉ thử các ví dụ bạn nghĩ sẽ đúng có thể khiến bạn không nhận ra mình đoán sai.</p>' },
        { title: 'Thiết kế phép thử rõ hơn', html: '<p>Thử ba cách kiểm tra phép nhân:</p><ol><li>Nhớ đáp án: “7 × 8 bằng bao nhiêu?”</li><li>Đổi số: “17 × 8 bằng bao nhiêu?”</li><li>Đổi tình huống: “Bảy hộp, mỗi hộp tám cốc. Hai cốc bị vỡ. Còn bao nhiêu cốc?”</li></ol><p>Câu cuối còn kiểm tra việc chọn phép tính. Không câu nào tự nó chứng minh người trả lời hiểu. Hãy soạn bộ câu hỏi tương tự cho một kỹ năng bạn biết.</p>' },
        { html: '<p><strong>Khái quát hóa</strong> là dùng điều đã học vào trường hợp mới. Nhân được các số chưa gặp cho thấy nhiều hơn việc nhớ một đáp án.</p><p>Nếu đã luyện các số từ 1 đến 10, thử số 6 là <strong>nội suy</strong>: vẫn trong khoảng đó. Thử số 20 là <strong>ngoại suy</strong>: ra ngoài khoảng. Hai từ này mô tả vị trí của bài thử, chưa cho biết cách người học giải bài.</p>' },
        { html: '<p>Nêu ba câu hỏi của bạn. Giải thích mỗi câu bổ sung bằng chứng gì, rồi hoàn thành: “Dù cả ba câu đều đúng, tôi vẫn chưa loại trừ được ___.” Tuần 5 sẽ giúp bạn kiểm tra một cách giải thích khác.</p>' },
      ],
    },
    5: {
      short: 'Hành vi cho biết được gì', title: 'Hành vi cho biết được và không cho biết được gì',
      tagline: 'Phép đối chứng tốt giúp phân biệt hai cách giải thích cho cùng một hành vi.',
      checkpointStatement: 'Tôi có thể nêu hai cách giải thích một kết quả và phép thử có thể phân biệt chúng.',
      beats: [
        { title: 'Chú ngựa Hans thông minh', html: '<p>Tuần 4 hỏi liệu câu hỏi mới có phân biệt được nhớ đáp án với tính toán không. Đây là một trường hợp mà đổi phép thử đã làm lộ ra cách giải thích khác.</p><p>Chú ngựa Clever Hans dường như trả lời phép tính bằng cách gõ móng. Nhà tâm lý Oskar Pfungst thử để người không biết đáp án đặt câu hỏi, hoặc không cho Hans nhìn thấy người hỏi. Khả năng trả lời đúng giảm đi.</p><p>Hans đã phản ứng với những cử động nhỏ của con người. <strong>Phép đối chứng</strong> thay đổi một điều kiện để kiểm tra cách giải thích khác.</p>' },
        { title: 'Một câu đáp nghe có vẻ thấu hiểu', html: '<p>ELIZA là chương trình đời đầu dùng quy tắc xử lý văn bản để mô phỏng trò chuyện. Hãy tưởng tượng đoạn này:</p><blockquote>“Tôi thấy lo.”<br>“Vì sao bạn thấy lo?”</blockquote><p>Câu đáp phù hợp nhưng chưa cho thấy chương trình biết nguyên nhân lo lắng. Viết một câu hỏi tiếp để kiểm tra điều gì đó ngoài việc lặp lại lời bạn.</p>' },
        { title: 'Quan sát hay suy diễn?', html: '<p>Xét bộ điều nhiệt, con chó và chatbot. Với mỗi trường hợp, hoàn thành: “Người ta nói nó biết ___ vì nó làm ___.”</p><p>Tách điều quan sát được khỏi điều bạn suy ra. Ví dụ, bật máy sưởi cho thấy phản ứng với nhiệt độ; chưa cho thấy cảm giác biết lạnh.</p>' },
        { title: 'So sánh các cách giải thích', html: '<p>Đọc từng mô tả trước khi mở nguồn. Viết một cách giải thích hành vi, một cách khác, và một phép thử có thể phân biệt chúng. Sau khi mở nguồn, xem bằng chứng đã đổi hay chỉ kỳ vọng của bạn đổi.</p>' },
        { html: '<p><strong>Cùng kết quả có thể do những nguyên nhân khác nhau.</strong> Đáp án đúng có thể đến từ tính toán, trí nhớ hoặc một gợi ý chưa được nhận ra.</p><p><strong>Kiểm tra khẳng định cụ thể.</strong> “Nhân được số chưa gặp mà không cần gợi ý” dễ kiểm tra hơn “hiểu mọi thứ”.</p>' },
        { html: '<p>Chọn một kỹ năng, nêu hai cách giải thích cho kết quả tốt, rồi đổi một điều kiện thử để phân biệt chúng. Dự đoán bạn sẽ quan sát thấy gì nếu từng cách giải thích là đúng.</p>' },
      ],
    },
    6: {
      short: 'Đo mức tự tin', title: 'Đo mức tự tin',
      tagline: 'So sánh mức tin chắc bạn đã nêu với tỷ lệ trả lời đúng.',
      checkpointStatement: 'Tôi có thể so mức tự tin với kết quả trắc nghiệm và giải thích giới hạn của bài ngắn.',
      beats: [
        { html: '<p>Tuần trước bạn kiểm tra câu trả lời. Tuần này bạn kiểm tra nên tin chắc đến mức nào.</p><p>Với mỗi câu, đưa ra khoảng mà bạn <strong>tin chắc 90%</strong> là chứa đáp án. Với tòa nhà chưa biết rõ, bạn có thể đoán “cao 20–60 mét” thay vì chọn một độ cao duy nhất.</p><p>Qua nhiều lần ước lượng như vậy, khoảng chín trên mười khoảng nên chứa đáp án. Kết quả một bài ngắn có thể dao động; chưa đủ kết luận mức tự tin của bạn có sát thực tế không.</p>' },
        { title: 'Vòng hiệu chuẩn lại', html: '<p>Thử bộ câu hỏi thứ hai. Mở rộng khoảng ở những câu bạn đã quá tự tin trong vòng đầu. Mục tiêu là thể hiện đúng mức chưa chắc chắn, không phải chọn khoảng rộng đến mức chứa gần như mọi đáp án.</p>' },
        { title: 'Luyện nói “tôi không biết”', html: '<p>Cùng bạn học hoặc tự viết, luyện ba cách trả lời:</p><ul><li>“Tôi biết điều này vì ___.”</li><li>“Tôi đoán ___, dựa trên ___.”</li><li>“Tôi không có bằng chứng để trả lời.”</li></ul><p>Thử “Thủ đô Australia là gì?” và “Bài hát yêu thích của bà tôi là gì?” Cần bằng chứng nào để trả lời từng câu?</p>' },
        { title: 'Nhầm, thiếu kiểm tra hay cố ý đánh lừa?', html: '<p>Một người có thể nhầm, cố ý đánh lừa bạn, hoặc trả lời mà không kiểm tra. Cùng một câu sai chưa cho biết trường hợp nào đã xảy ra.</p><p>Ví dụ: ai đó báo sai giờ tàu. Điều gì giúp phân biệt họ dùng lịch cũ với việc họ muốn bạn lỡ tàu? Giữ phân biệt này cho Tuần 9.</p>' },
        { html: '<p><strong>Hiệu chuẩn</strong> nghĩa là mức tự tin đã nêu phù hợp với kết quả qua nhiều trường hợp. Trong 100 dự đoán được gắn “chắc 90%”, khoảng 90 dự đoán nên đúng.</p><p><strong>Sai nhưng rất tự tin</strong> khiến người nghe khó nhận ra lỗi hơn. Mức tự tin nên dựa vào bằng chứng, không phải việc đáp án đến nhanh thế nào.</p>' },
        { html: '<p>Nêu tỷ lệ khoảng chứa đáp án của từng vòng. Cho một lý do để mở rộng khoảng ở lần sau, và giải thích vì sao bài ngắn chỉ là bước đầu để đo hiệu chuẩn. Giữ kết quả cho Tuần 9.</p>' },
      ],
    },
  };

  Object.keys(weeks).forEach(function (number) {
    var week = GM.weeks.find(function (item) { return item.num === Number(number); });
    var localized = weeks[number];
    ['short', 'title', 'tagline', 'checkpointStatement'].forEach(function (key) { week[key] = localized[key]; });
    localized.beats.forEach(function (beat, index) { Object.assign(week.beats[index], beat); });
  });
})();
