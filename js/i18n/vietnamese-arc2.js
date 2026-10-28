/* Vietnamese reader-first reconstruction for Arc 2. Loaded after English data. */
(function () {
  if (!GM.language.isVietnamese()) return;

  Object.assign(GM.arcs.find(function (arc) { return arc.id === 2; }), {
    name: 'Chặng 2 — Bằng chứng và mức tự tin',
    shortName: 'Chặng 2 · Bằng chứng và mức tự tin',
    claim: 'Thử mô hình khi điều kiện thay đổi, tìm bằng chứng để phân biệt các cách giải thích và xem mức tự tin có khớp với kết quả không.',
  });

  var weeks = {
    4: {
      short: 'Học thuộc hay hiểu quy luật?', title: 'Làm sao biết một người học thuộc hay hiểu quy luật?',
      tagline: 'Cùng một đáp án có thể đến từ trí nhớ, mẫu quen thuộc hoặc một quy tắc.',
      checkpointStatement: 'Tôi nghĩ ra được nhiều cách kiểm tra một kỹ năng và nói rõ mỗi cách vẫn chưa chứng minh được điều gì.',
      beats: [
        { html: '<p>Hai học sinh cùng trả lời “56” cho 7 × 8. Một em nhớ đáp án; em kia tính ra. Chỉ đáp án này chưa cho biết cách nào đã được dùng.</p><p><strong>Bạn sẽ hỏi gì tiếp?</strong> Thử 17 × 8, rồi hỏi cách làm. Câu hỏi mới cho thêm bằng chứng, nhưng người học cũng có thể đã luyện câu đó.</p>' },
        { title: 'Tìm quy tắc bí mật', html: '<p>Nhập ba số để thử một quy tắc bí mật. Trò chơi sẽ cho biết bộ số có phù hợp không.</p><p>Sau mỗi kết quả, ghi quy tắc bạn đang đoán. Sau đó chọn một phép thử có thể bác bỏ quy tắc ấy. Chỉ thử các ví dụ bạn nghĩ sẽ đúng có thể khiến bạn không nhận ra mình đoán sai.</p>' },
        { title: 'Thiết kế phép thử rõ hơn', html: '<p>Thử ba cách kiểm tra phép nhân:</p><ol><li>Nhớ đáp án: “7 × 8 bằng bao nhiêu?”</li><li>Đổi số: “17 × 8 bằng bao nhiêu?”</li><li>Đổi tình huống: “Bảy hộp, mỗi hộp tám cốc. Hai cốc bị vỡ. Còn bao nhiêu cốc?”</li></ol><p>Câu cuối còn kiểm tra việc chọn phép tính. Không câu nào tự nó chứng minh người trả lời hiểu. Hãy soạn bộ câu hỏi tương tự cho một kỹ năng bạn biết.</p>' },
        { html: '<p><strong>Khái quát hóa</strong> là dùng điều đã học vào trường hợp mới. Nhân được các số chưa gặp cho thấy nhiều hơn việc nhớ một đáp án.</p><p>Nếu đã luyện các số từ 1 đến 10, thử số 6 là <strong>nội suy</strong>: vẫn trong khoảng đó. Thử số 20 là <strong>ngoại suy</strong>: ra ngoài khoảng. Hai từ này mô tả vị trí của bài thử, chưa cho biết cách người học giải bài.</p>' },
        { html: '<p>Viết ra ba câu hỏi của bạn và giải thích mỗi câu giúp kiểm tra thêm điều gì. Sau đó hoàn thành câu: “Dù trả lời đúng cả ba, vẫn có thể là vì ___.” Tuần 5 sẽ tiếp tục từ chính khả năng đó.</p>' },
      ],
    },
    5: {
      short: 'Một hành vi cho biết được gì?', title: 'Một hành vi cho biết được gì — và chưa cho biết được gì?',
      tagline: 'Cùng một kết quả có thể xuất phát từ nhiều nguyên nhân.',
      checkpointStatement: 'Tôi đưa ra được hai cách giải thích cho cùng một kết quả và nghĩ ra cách kiểm tra để phân biệt chúng.',
      beats: [
        { title: 'Chú ngựa Clever Hans', html: '<p>Tuần 4 đặt câu hỏi: làm sao biết một người đang nhớ đáp án hay thực sự tính ra?</p><p>Clever Hans là một con ngựa từng được cho là biết làm toán: người ta hỏi phép tính, nó gõ móng để trả lời. <strong>Nó có đang tính thật không?</strong> Trước khi xem kết quả, thử đoán: nếu người hỏi không biết đáp án, hoặc Hans không nhìn thấy họ, nó còn trả lời đúng không? Vì sao?</p><details class="answer-reveal"><summary>Xem kết quả kiểm tra</summary><p>Trong cả hai trường hợp, Hans trả lời kém hẳn. Nó đã dựa vào những cử động rất nhỏ của người hỏi để biết lúc nào nên dừng, chứ không phải tự tính ra đáp án.</p><p>Đó là một <strong>phép đối chứng</strong>: thay đổi một điều kiện để xem cách giải thích nào còn đứng vững.</p></details>' },
        { title: 'Một câu trả lời nghe như đang lắng nghe', html: '<p>Trong bài báo năm 1966, Joseph Weizenbaum ở MIT giới thiệu ELIZA. Kịch bản DOCTOR của chương trình đóng vai một nhà trị liệu tâm lý: thường hỏi lại lời người dùng hoặc mời họ kể thêm. ELIZA dùng quy tắc tìm từ rồi ghép câu đáp; cách này có thể tạo cảm giác máy đang lắng nghe dù nó không theo được cả câu chuyện. <a href="https://doi.org/10.1145/365153.365168">Xem bài báo gốc.</a></p><p>Thử hình dung đoạn này:</p><blockquote>Bạn: “Tôi lo vì mai phải đi phỏng vấn.”<br>Máy: “Vì sao bạn lo về buổi phỏng vấn?”</blockquote><p>Nghe như nó đang lắng nghe, nhưng câu đáp này có thể được tạo ra bằng cách lấy lại chữ “phỏng vấn” từ lời bạn nói.</p><p><strong>Giờ thêm tin mới:</strong> “Họ vừa báo hủy buổi phỏng vấn. Vậy mai tôi còn phải đi không?” Tự nghĩ hai câu đáp: một câu chung chung, một câu có dùng tin hủy. Rồi mở gợi ý.</p><details class="answer-reveal"><summary>Câu trả lời cho biết gì?</summary><p>Nếu theo kịp câu chuyện, nó phải nhận ra buổi phỏng vấn đã bị hủy. Chỉ hỏi lại chung chung thì chưa cho thấy nó dùng được tin mới. Còn trả lời đúng một lần cũng chưa đủ để nói nó hiểu như người.</p></details>' },
        { title: 'Quan sát hay suy diễn?', html: '<p>Hãy nghĩ về bộ điều nhiệt, một con chó và chatbot. Với mỗi trường hợp, điền vào câu: “Ta nói nó biết ___ vì thấy nó làm ___.”</p><p>Phần sau là điều quan sát được; phần trước là cách ta diễn giải. Bộ điều nhiệt bật máy sưởi khi trời lạnh, nhưng hành vi đó chưa có nghĩa là nó cảm thấy lạnh.</p>' },
        { title: 'Đặt hai cách giải thích cạnh nhau', html: '<p>Đọc từng tình huống trước khi mở phần giải thích. Thử nghĩ ra hai lý do khác nhau cho cùng một hành vi và một cách kiểm tra để phân biệt chúng. Sau khi xem gợi ý, hãy hỏi lại: điều quan sát được có thay đổi không, hay chỉ cách bạn nhìn nhận nó thay đổi?</p>' },
        { html: '<p><strong>Cùng một kết quả có thể đến từ nhiều nguyên nhân.</strong> Một đáp án đúng có thể do tính toán, do nhớ sẵn, hoặc do vô tình nhận được gợi ý.</p><p><strong>Hãy kiểm tra một khả năng cụ thể.</strong> “Làm được phép nhân chưa từng gặp mà không cần gợi ý” rõ ràng và dễ kiểm tra hơn “thực sự hiểu toán”.</p>' },
        { html: '<p>Chọn một kỹ năng. Nghĩ ra hai lý do khác nhau khiến ai đó làm tốt kỹ năng ấy, rồi thay đổi một điều kiện để phân biệt hai lý do. Trước khi thử, hãy đoán xem mỗi trường hợp sẽ cho kết quả gì.</p>' },
      ],
    },
    6: {
      short: 'Đo mức tự tin', title: 'Mức tự tin có khớp với kết quả không?',
      tagline: 'Nếu thường nói mình chắc 90%, bạn có đúng khoảng chín lần trên mười không?',
      checkpointStatement: 'Tôi biết so mức độ chắc chắn của mình với kết quả thực tế, đồng thời hiểu rằng một bài ngắn chưa nói lên nhiều.',
      beats: [
        { html: '<p>Tuần trước, bạn kiểm tra câu trả lời. Tuần này, bạn sẽ kiểm tra xem mình có đang quá tự tin hay không.</p><p>Với mỗi câu, hãy đưa ra một khoảng mà bạn tin khoảng 90% là có chứa đáp án. Chẳng hạn, nếu không biết rõ chiều cao của một tòa nhà, bạn có thể đoán “20–60 mét” thay vì chốt một con số.</p><p>Nếu làm đủ nhiều câu, khoảng chín trên mười khoảng như vậy nên chứa đáp án đúng. Một bài ngắn chỉ cho tín hiệu ban đầu, chưa đủ để kết luận.</p>' },
        { title: 'Thử lại một vòng', html: '<p>Làm bộ câu hỏi thứ hai. Nếu vòng đầu bạn chọn khoảng quá hẹp và sai nhiều, hãy nới khoảng ở những câu mình không chắc. Mục tiêu là phản ánh đúng mức độ chưa biết, chứ không phải chọn khoảng rộng đến mức đáp án nào cũng lọt vào.</p>' },
        { title: 'Tập nói “tôi không biết”', html: '<p>Thử trả lời theo ba cách:</p><ul><li>“Tôi biết điều này vì ___.”</li><li>“Tôi đoán là ___, dựa trên ___.”</li><li>“Tôi chưa có đủ căn cứ để trả lời.”</li></ul><p>Áp dụng với hai câu: “Thủ đô Australia là gì?” và “Bài hát bà tôi thích nhất là gì?” Hai câu cần những loại bằng chứng khác nhau ra sao?</p>' },
        { title: 'Nhầm, chưa kiểm tra hay cố tình nói sai?', html: '<p>Một câu trả lời sai có thể do nhớ nhầm, chưa kiểm tra, hoặc cố tình đánh lừa. Chỉ nhìn vào câu sai thì chưa biết nguyên nhân nào đúng.</p><p>Ví dụ, ai đó báo sai giờ tàu. Bạn cần biết thêm gì để phân biệt việc họ xem nhầm lịch cũ với việc họ cố tình khiến bạn lỡ tàu? Tuần 8 sẽ quay lại điểm này.</p>' },
        { html: '<p><strong>Hiệu chuẩn</strong> là mức độ khớp nhau giữa sự tự tin và kết quả thực tế, xét qua nhiều lần. Nếu bạn nói “tôi chắc 90%” cho 100 dự đoán, khoảng 90 dự đoán trong số đó nên đúng.</p><p>Trả lời rất nhanh hoặc rất dứt khoát không có nghĩa là đáng tin hơn. Mức độ chắc chắn phải đi cùng bằng chứng.</p>' },
        { html: '<p>Xem lại hai lượt vừa làm. Mỗi lượt có bao nhiêu đáp án đúng nằm trong khoảng bạn chọn? Ở lượt thứ hai, bạn đã nới khoảng cho câu nào, và vì sao?</p><p>Vài câu hỏi là quá ít để kết luận bạn có đang tự tin đúng mức hay không. Đến tuần 8, dùng điều này để giải thích vì sao câu “tôi rất chắc” của chatbot chưa cho biết câu trả lời đáng tin đến đâu.</p>' },
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
