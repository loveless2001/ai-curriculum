/* Vietnamese reader-first reconstruction for Arc 4 and the two-column dictionary. */
(function () {
  if (!GM.language.isVietnamese()) return;

  Object.assign(GM.arcs.find(function (arc) { return arc.id === 4; }), {
    name: 'Chặng 4 — Huấn luyện, attention và chatbot',
    shortName: 'Chặng 4 · Bên trong mô hình',
    claim: 'Ta nối những ví dụ quen thuộc với thuật ngữ kỹ thuật, rồi xem mô hình được huấn luyện và dùng ngữ cảnh ra sao.',
  });

  var weeks = {
    10: {
      short: 'Huấn luyện thay đổi mô hình', title: 'Huấn luyện thay đổi mô hình như thế nào?',
      tagline: 'Dự đoán, đo sai số, điều chỉnh, rồi lặp lại.',
      checkpointStatement: 'Tôi giải thích được một bước cập nhật trọng số và biết bài toán nhỏ trong bài dùng loại loss khác với mô hình ngôn ngữ.',
      beats: [
        { html: '<p>Ở tuần 7, ta nói huấn luyện làm thay đổi các trọng số bên trong mô hình. Nhưng làm sao biết cần thay đổi theo hướng nào?</p><p>Một mô hình nhỏ dự đoán ba món hàng có giá tổng cộng 12 đồng, trong khi giá đúng là 6 đồng. <strong>Mô hình nên điều chỉnh giá mỗi món lên hay xuống?</strong> Để làm được việc đó, quá trình huấn luyện cần một con số đo mức sai của dự đoán.</p>' },
        { title: 'Gọi tên những gì đã học', html: '<p>Mở từng thẻ bên dưới để nối các ví dụ quen thuộc với thuật ngữ kỹ thuật. Một ví dụ minh họa chỉ giúp ta hình dung; nó không thay thế định nghĩa chính xác. Phần attention sẽ được học kỹ hơn ở tuần 11.</p>' },
        { title: 'Vòng huấn luyện', html: '<ol><li><strong>Đưa vào</strong> một nhóm văn bản huấn luyện.</li><li><strong>Dự đoán</strong> token tiếp theo ở nhiều vị trí.</li><li><strong>Tính loss:</strong> nếu mô hình chấm token đúng quá thấp, loss sẽ cao.</li><li><strong>Điều chỉnh</strong> trọng số theo hướng có thể làm loss giảm.</li><li><strong>Lặp lại</strong> với nhiều nhóm văn bản khác.</li></ol><p>Với bài toán dự đoán văn bản, một loại loss thường dùng là <strong>cross-entropy</strong>. Cách tìm hướng điều chỉnh gọi là <strong>gradient descent</strong>. Loss thấp trên dữ liệu huấn luyện chưa bảo đảm mô hình sẽ trả lời đúng ở trường hợp mới.</p>' },
        { title: 'Tự chạy một mô hình rất nhỏ', html: '<p>Mô hình này dùng công thức <strong>y = w × x</strong>, trong đó w là con số có thể điều chỉnh. Các ví dụ đúng là 1 → 2, 2 → 4 và 3 → 6. Giá trị w nào khớp với cả ba?</p><p>Trục ngang là w, trục dọc là loss. Bài này dùng sai số bình phương trung bình, không phải cross-entropy. Tuy khác công thức, cả hai đều cho biết mô hình cần giảm sai số theo hướng nào.</p><p>Thử ba bước nhỏ, rồi một bước thật lớn. Vì sao bước quá lớn có thể khiến kết quả tệ hơn?</p>' },
        { title: 'Tùy chọn: scaling laws', html: '<p><strong>Phần đọc thêm:</strong> các nhà nghiên cứu đã đo được những quy luật liên hệ quy mô mô hình, lượng dữ liệu, lượng tính toán và loss. Chúng thường được gọi là <em>scaling laws</em>.</p><p>Các quy luật này giúp dự đoán xu hướng trong phạm vi đã được thử nghiệm. Loss thấp hơn không đồng nghĩa với việc mọi kỹ năng đều tốt hơn. <a href="https://arxiv.org/abs/2001.08361">Đọc nghiên cứu gốc.</a></p>' },
        { html: '<p><strong>Loss</strong> là con số dùng để đo mức sai của dự đoán. <strong>Gradient</strong> cho biết loss thay đổi ra sao khi trọng số thay đổi. <strong>Learning rate</strong> quyết định mỗi lần cập nhật đi một bước lớn hay nhỏ.</p><p>Bạn có thể tra lại các thuật ngữ trong <a href="#/dictionary">từ điển</a>.</p>' },
        { html: '<p>Hãy kể lại một bước cập nhật của mô hình nhỏ: nó dự đoán gì, sai bao nhiêu và vì sao w phải đổi theo hướng đó.</p><p>Sau đó chỉ ra điểm giống và khác giữa bài toán nhỏ này với huấn luyện mô hình ngôn ngữ.</p>' },
      ],
    },
    11: {
      short: 'Attention và các mạch bên trong', title: 'Attention và các mạch bên trong mô hình',
      tagline: 'Muốn hiểu cơ chế, ta phải kiểm tra nguyên nhân chứ không chỉ nhìn kết quả.',
      checkpointStatement: 'Tôi giải thích được attention bằng một ví dụ, đồng thời phân biệt rõ mô phỏng trong bài với bằng chứng thu được từ mô hình thật.',
      beats: [
        { html: '<p>Tuần 10 nói về cách huấn luyện làm thay đổi trọng số. Bây giờ ta xem mô hình dùng những trọng số đó khi xử lý một câu.</p><blockquote>“Chìa khóa ở trên bàn cạnh hai cuốn sách; đưa nó cho tôi.”</blockquote><p>Ở đây “nó” chỉ chìa khóa, không phải hai cuốn sách. <strong>Khi xử lý phần cuối câu, mô hình lấy lại thông tin ở phần đầu bằng cách nào?</strong></p>' },
        { title: 'Từ nào liên quan đến câu hỏi?', html: '<p>Attention kết hợp thông tin từ nhiều vị trí trong văn bản, với mức đóng góp khác nhau. Có thể hình dung như việc đánh dấu những đoạn cần xem trước khi trả lời, nhưng trong mô hình, mức đóng góp được tính bằng số.</p><p>Hãy bấm vào các từ bên dưới. Màu sắc ở đây do người viết bài chuẩn bị để minh họa, không phải số đo lấy từ mô hình. Một bản đồ attention thật cũng chưa đủ để giải thích toàn bộ câu trả lời.</p>' },
        { title: 'Sao chép một mẫu trong ngữ cảnh', html: '<p>Thử mẫu <span class="mono">A B … A → B</span>. Nếu “Blicket Farnsworth” đã xuất hiện trước đó, gặp lại “Blicket” có thể khiến “Farnsworth” trở thành phần tiếp theo hợp lý.</p><p>Mô phỏng này dùng một quy tắc sao chép được lập trình sẵn. Nó tái hiện hành vi cần nghiên cứu, chứ không phải một mạng nơ-ron đang học.</p>' },
        { title: 'Kiểm tra một cơ chế bên trong mô hình', html: '<p>Trong một số mô hình nhỏ, các nhà nghiên cứu tìm thấy những thành phần attention gọi là <strong>induction head</strong>, có vai trò trong việc sao chép mẫu. Họ thay đổi hoặc vô hiệu hóa từng thành phần để xem hành vi có mất đi không.</p><p>Đó là cách kiểm tra nguyên nhân, thay vì chỉ nhìn thấy mô hình điền đúng một từ. Kết quả này không tự động áp dụng cho mọi mô hình hay mọi kiểu học. <a href="https://transformer-circuits.pub/2022/in-context-learning-and-induction-heads/index.html">Đọc nghiên cứu về induction head.</a></p>' },
        { html: '<p><strong>Attention</strong> kết hợp thông tin từ các vị trí token theo những trọng số được tính trong lúc mô hình chạy. Tên gọi này không có nghĩa là mô hình “chú ý” theo nghĩa có ý thức.</p><p><strong>Mạch</strong> là một nhóm thành phần được cho là cùng thực hiện một chức năng. <strong>Interpretability</strong> nghiên cứu cách các thành phần bên trong tạo ra hành vi ta quan sát được.</p>' },
        { html: '<p>Hãy giải thích attention bằng ví dụ đánh dấu đoạn văn, rồi nói rõ ví dụ ấy chưa mô tả được điều gì.</p><p>Sau đó phân biệt ba thứ: hành vi sao chép, mô phỏng lập trình sẵn trong bài, và bằng chứng cho thấy một mạch bên trong mô hình thật góp phần tạo ra hành vi đó.</p>' },
      ],
    },
    12: {
      short: 'Từ mô hình dự đoán đến chatbot', title: 'Từ mô hình dự đoán văn bản đến chatbot',
      tagline: 'Mô hình còn cần được huấn luyện thêm để trả lời theo kiểu một trợ lý.',
      checkpointStatement: 'Bản giải thích của tôi đã đủ năm ý chính, và tôi đã ghi rõ phần nào vẫn cần người khác góp ý.',
      beats: [
        { html: '<p>Đến đây, bạn đã biết mô hình dự đoán token ra sao, được huấn luyện thế nào, chọn token bằng cách nào và vì sao có thể tạo ra câu sai. Còn một câu hỏi: vì sao chatbot thường trả lời như một trợ lý?</p><p>Một mô hình chỉ học dự đoán văn bản có thể nối tiếp câu “Làm sao xin tăng lương?” bằng lời khuyên, một câu hỏi khác, hoặc đoạn thảo luận trên diễn đàn. Cần thêm các bước huấn luyện để nó ưu tiên kiểu trả lời hữu ích cho người dùng.</p>' },
        { title: 'Từ mô hình dự đoán thành trợ lý', html: '<ol><li><strong>Huấn luyện nền:</strong> học dự đoán văn bản.</li><li><strong>Huấn luyện làm theo chỉ dẫn:</strong> học từ các cặp yêu cầu và câu trả lời mẫu.</li><li><strong>Huấn luyện theo ưu tiên:</strong> học từ việc con người so sánh các câu trả lời.</li></ol><p>Đây là các giai đoạn huấn luyện, không phải những “tính cách” khác nhau bên trong mô hình.</p><p>RLHF—học tăng cường từ phản hồi của con người—là một cách thực hiện bước thứ ba. <a href="https://arxiv.org/abs/2203.02155">Đây là một quy trình đã được công bố</a>, không phải công thức bắt buộc cho mọi chatbot. Chỉ dẫn hệ thống và công cụ đi kèm cũng ảnh hưởng đến câu trả lời.</p>' },
        { title: 'Tùy chọn: dành thêm bước suy luận trước khi trả lời', html: '<p>Với một số bài, việc dành thêm thời gian tính toán trước khi trả lời có thể giúp ích. Hãy so việc đoán ngay 17 × 24 với việc viết phép tính ra từng bước.</p><p>Làm nhiều bước hơn vẫn có thể sai. Muốn biết cách nào tốt hơn, phải thử trên cùng một bộ câu hỏi rồi so độ chính xác; lời giải nghe mạch lạc chưa đủ để kết luận.</p>' },
        { title: 'Bài tổng kết, phần 1: giải thích một ý', html: '<p>Xem lại bản giải thích bạn đã làm ở tuần 7. Chọn một chỗ còn khó hiểu và sửa bằng một ví dụ cụ thể.</p><p>Nếu có thể, hãy đưa cho một người chưa biết về AI rồi nhờ họ nói lại điều họ hiểu. Nếu học một mình, bạn có thể tự ghi âm và nghe lại.</p>' },
        { title: 'Bài tổng kết, phần 2: “LLM là gì, và không phải là gì?”', html: '<p>Viết <strong>không quá 500 từ</strong> để trả lời: “LLM là gì, và khi nào cần kiểm tra câu trả lời của nó?” Bài viết cần có:</p><ol><li>Mô hình dự đoán gì.</li><li>Huấn luyện khác với ngữ cảnh chat ra sao.</li><li>Mô hình chọn token từ điểm số như thế nào.</li><li>Một kiểu lỗi dữ kiện và cách kiểm tra.</li><li>Một ví dụ hoặc phép so sánh, kèm giới hạn của nó.</li></ol><p>Bản nháp được lưu trên thiết bị này.</p>' },
        { title: 'Tùy chọn: nếu muốn học tiếp', html: '<p>Chọn một hướng bạn muốn tìm hiểu sâu hơn:</p><ul><li><strong>Huấn luyện:</strong> ôn số học, đồ thị và lập trình cơ bản, rồi thử xây một mô hình dự đoán nhỏ.</li><li><strong>Attention:</strong> học thêm về vectơ và ma trận trước khi đọc lại nghiên cứu ở tuần 11.</li><li><strong>Huấn luyện chatbot:</strong> đọc nghiên cứu về instruction tuning sau khi bạn đã giải thích được vòng huấn luyện.</li></ul><p>Đây là phần đọc thêm, không bắt buộc để hoàn thành khóa học.</p>' },
        { html: '<p>Từ đầu đến cuối, ta vẫn dùng cùng một cách làm: đưa ra dự đoán, tìm cách kiểm tra, so sánh các cách giải thích và nói rõ mức độ chưa chắc chắn. Cách làm đó nối trò đoán ở tuần đầu với việc đánh giá một chatbot.</p>' },
        { html: '<p>Đọc lại bài viết và kiểm tra xem đã đủ năm ý chưa. Nếu có người đọc cùng, hãy hỏi chỗ nào họ hiểu và chỗ nào còn vướng. Nếu chưa tìm được người góp ý, hãy tự rà bằng danh sách trên và ghi rõ phần phản hồi bên ngoài vẫn còn thiếu.</p>' },
      ],
    },
  };

  Object.keys(weeks).forEach(function (number) {
    var week = GM.weeks.find(function (item) { return item.num === Number(number); });
    var localized = weeks[number];
    ['short', 'title', 'tagline', 'checkpointStatement'].forEach(function (key) { week[key] = localized[key]; });
    localized.beats.forEach(function (beat, index) { Object.assign(week.beats[index], beat); });
  });

  GM.jargon = [
    { folk: 'trò đoán', tech: 'dự đoán token tiếp theo', week: 1, where: 'các vòng điền từ và trò đoán chữ của Shannon' },
    { folk: 'mô hình bị tính là sai nhiều hơn khi chấm đáp án đúng quá thấp', tech: 'loss cross-entropy (khác với cảm giác bất ngờ)', week: 10, where: 'vòng huấn luyện; Tuần 2 giúp hình dung ý tưởng' },
    { folk: 'rút gọn và chấp nhận bỏ bớt chi tiết', tech: 'nén mất dữ liệu (một cách ví von cho mô hình)', week: 3, where: 'bản tóm tắt mười từ' },
    { folk: 'tính điểm token tiếp theo', tech: 'forward pass', week: 8, where: 'bảng điểm' },
    { folk: 'chọn từ bảng điểm', tech: 'giải mã; temperature chỉnh xác suất chọn', week: 8, where: 'ví dụ túi phiếu' },
    { folk: 'đổi trọng số và dùng trọng số', tech: 'huấn luyện và suy luận', week: 7, where: 'ví dụ tờ ghi chú trên bàn' },
    { folk: 'mức tự tin không khớp với tỷ lệ trả lời đúng', tech: 'lệch hiệu chuẩn; ảo giác là một loại lỗi khác', week: 6, where: 'bài ước lượng; so sánh lại ở Tuần 9' },
    { folk: 'phần nào ở phía trước có liên quan đến từ đang xử lý', tech: 'attention', week: 11, where: 'bài bấm vào từng từ để xem mức liên quan' },
  ];
})();
