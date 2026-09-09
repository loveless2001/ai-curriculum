/* Vietnamese reader-first reconstruction for Arc 4 and the two-column dictionary. */
(function () {
  if (!GM.language.isVietnamese()) return;

  Object.assign(GM.arcs.find(function (arc) { return arc.id === 4; }), {
    name: 'Chặng 4 — Huấn luyện, attention và chatbot',
    shortName: 'Chặng 4 · Bên trong',
    claim: 'Chặng này nối các cách giải thích đời thường với thuật ngữ kỹ thuật, rồi giới thiệu vòng huấn luyện, attention và instruction tuning.',
  });

  var weeks = {
    10: {
      short: 'Huấn luyện thay đổi mô hình ra sao', title: 'Huấn luyện thay đổi mô hình như thế nào',
      tagline: 'Nối những ý quen thuộc với cách gọi trong tài liệu kỹ thuật.',
      checkpointStatement: 'Tôi có thể giải thích một lần cập nhật trọng số và phân biệt số đo sai lệch của bài nhỏ với loss dự đoán văn bản.',
      beats: [
        { html: '<p>Ở Tuần 7, huấn luyện thay đổi các con số bên trong mô hình. Làm sao chọn được thay đổi nào?</p><p>Mô hình nhỏ đoán ba món hàng giá 12 đồng. Ví dụ cho biết chúng giá 6 đồng. <strong>Nên tăng hay giảm giá ước tính cho mỗi món?</strong> Huấn luyện dùng số đo sai lệch để hướng dẫn thay đổi như vậy.</p>' },
        { title: 'Màn bật mí thuật ngữ', html: '<p>Mở các thuật ngữ bên dưới. Chúng nối ví dụ đã học với ý kỹ thuật; ví von và định nghĩa không phải lúc nào cũng đồng nhất. Attention là phần xem trước của Tuần 11.</p>' },
        { title: 'Kể lại vòng huấn luyện', html: '<ol><li><strong>Cho xem</strong> văn bản học, che các token phía sau mỗi vị trí cần dự đoán.</li><li><strong>Dự đoán</strong> token tiếp theo ở từng vị trí.</li><li><strong>Đo loss:</strong> mức phạt lớn hơn khi token thực tế được gán xác suất thấp hơn.</li><li><strong>Điều chỉnh</strong> trọng số theo hướng dự kiến làm loss giảm.</li><li><strong>Lặp lại</strong> qua các nhóm ví dụ.</li></ol><p>Loss dùng cho dự đoán văn bản này gọi là <strong>cross-entropy</strong>. Cách điều chỉnh xuống dốc gọi là <strong>gradient descent</strong>. Loss thấp trên ví dụ học chưa bảo đảm trả lời đúng câu mới.</p>' },
        { title: 'Tự tay chạy vòng lặp', html: '<p>Mô hình nhỏ dự đoán <strong>y = w × x</strong>: lấy đầu vào x nhân với số điều chỉnh được w. Các ví dụ là 1 → 2, 2 → 4 và 3 → 6. Giá trị w nào khớp cả ba?</p><p>Trục ngang là w, trục dọc là loss. Bài này dùng trung bình bình phương sai lệch, không phải cross-entropy của văn bản. Cả hai đều cho huấn luyện một con số để giảm.</p><p>Đi ba bước nhỏ rồi thử một bước liều lĩnh. Vì sao bước quá lớn có thể làm sai lệch tăng?</p>' },
        { title: 'Tùy chọn: quy luật quy mô dự đoán gì', html: '<p><strong>Tùy chọn:</strong> các nhà nghiên cứu tìm thấy quy luật liên hệ kích thước mô hình, dữ liệu và lượng tính toán với loss dự đoán. Chúng được gọi là quy luật mở rộng quy mô.</p><p>Giống ước tính thời gian đi từ quãng đường, chúng giúp lập kế hoạch trong điều kiện đã kiểm tra. Loss thấp hơn chưa bảo đảm mọi kỹ năng hữu ích. <a href="https://arxiv.org/abs/2001.08361">Đọc nghiên cứu gốc.</a></p>' },
        { html: '<p><strong>Loss</strong> là mức phạt bằng số cho dự đoán. <strong>Gradient</strong> mô tả loss thay đổi thế nào khi trọng số đổi. <strong>Learning rate</strong> điều khiển độ lớn của bước cập nhật.</p><p>Sau khi mở các thuật ngữ, dùng <a href="#/dictionary">từ điển</a> để tra lại.</p>' },
        { html: '<p>Giải thích một lần cập nhật mô hình nhỏ: dự đoán, sai lệch và lý do w đổi theo hướng đó. Sau đó mô tả cách huấn luyện văn bản dùng cùng vòng dự đoán–đo–điều chỉnh nhưng với loss khác. Xem lại đồ thị nếu bước nào chưa rõ.</p>' },
      ],
    },
    11: {
      short: 'Attention và các mạch bên trong', title: 'Attention và các mạch bên trong',
      tagline: 'Cơ chế bên trong khó nghiên cứu, nhưng một số cơ chế có thể được kiểm tra trực tiếp.',
      checkpointStatement: 'Tôi có thể ví dụ hóa attention và phân biệt mô phỏng lập trình sẵn với bằng chứng về mô hình thật.',
      beats: [
        { html: '<p>Tuần 10 cho thấy huấn luyện đổi trọng số thế nào. Giờ xem một phép tính dùng những trọng số đó.</p><blockquote>“Chìa khóa ở trên bàn cạnh ngọn đèn; đưa chúng cho tôi.”</blockquote><p>“Chúng” có thể chỉ “chìa khóa”. <strong>Mô hình dùng từ xuất hiện trước khi xử lý từ phía sau bằng cách nào?</strong></p>' },
        { title: 'Trình trực quan hóa mức liên quan', html: '<p>Attention trộn thông tin từ các vị trí trong văn bản theo trọng số được tính ra. Có thể hình dung việc đánh dấu đoạn hữu ích trước khi trả lời, nhưng ở đây các con số quyết định mỗi đoạn đóng góp bao nhiêu.</p><p>Nhấp các từ bên dưới. Màu được chuẩn bị bằng tay để minh họa, không đo từ mô hình. Attention thật xử lý biểu diễn của token; một bản đồ attention chưa giải thích toàn bộ câu trả lời.</p>' },
        { title: 'Sao chép mẫu từ ngữ cảnh', html: '<p>Thử mẫu <span class="mono">A B … A → B</span>. Nếu “Blicket Farnsworth” đã xuất hiện, gặp lại “Blicket” có thể gợi “Farnsworth”.</p><p>Mô phỏng dùng quy tắc sao chép được lập trình sẵn. Nó cho thấy hành vi được nghiên cứu; không huấn luyện hay kiểm tra mạng nơ-ron.</p>' },
        { title: 'Các nhà nghiên cứu kiểm tra cơ chế ra sao', html: '<p>Các nhà nghiên cứu tìm thấy thành phần attention gọi là <strong>induction head</strong>, giúp sao chép mẫu trong những mô hình đã khảo sát. Với mô hình nhỏ, họ kiểm tra cách giải thích bằng cách thay đổi hoặc vô hiệu hóa thành phần.</p><p>Đây là kiểm tra nguyên nhân, vượt ra ngoài quan sát một câu điền đúng. Kết quả chưa giải thích mọi mô hình hay mọi dạng học. <a href="https://transformer-circuits.pub/2022/in-context-learning-and-induction-heads/index.html">Đọc nghiên cứu về induction head.</a></p>' },
        { html: '<p><strong>Attention</strong> kết hợp thông tin từ các vị trí token theo trọng số tính được. Tên gọi không khẳng định sự tập trung có ý thức.</p><p><strong>Mạch</strong> là nhóm thành phần được cho là thực hiện một việc cụ thể. <strong>Nghiên cứu khả năng diễn giải</strong> tìm hiểu các thành phần tạo ra hành vi thế nào. Vẫn dùng nguyên tắc Tuần 5: kiểm tra các cách giải thích khác nhau.</p>' },
        { html: '<p>Giải thích attention bằng ví dụ đánh dấu đoạn văn và nêu giới hạn của ví von. Sau đó phân biệt ba điều: hành vi sao chép, mô phỏng được lập trình sẵn, và bằng chứng cho thấy một mạch gây ra hành vi đó trong mô hình.</p>' },
      ],
    },
    12: {
      short: 'Từ bộ dự đoán văn bản đến chatbot', title: 'Từ bộ dự đoán văn bản đến chatbot',
      tagline: 'Huấn luyện bổ sung biến bộ dự đoán văn bản thành sản phẩm có cách trả lời như trợ lý.',
      checkpointStatement: 'Bản nháp của tôi có đủ năm yêu cầu và ghi rõ phản hồi nào vẫn còn cần.',
      beats: [
        { html: '<p>Bạn đã có thể giải thích dự đoán văn bản, huấn luyện, chọn token và lỗi. Còn một bước: vì sao chatbot thường trả lời như trợ lý?</p><p>Bộ dự đoán văn bản có thể tiếp tục “Làm sao xin tăng lương?” bằng lời khuyên, câu hỏi khác hoặc thảo luận diễn đàn. Huấn luyện thêm giúp ưu tiên cách đáp hữu ích cho yêu cầu.</p>' },
        { title: 'Từ bộ dự đoán thành trợ lý', html: '<ol><li><strong>Huấn luyện nền:</strong> học dự đoán văn bản.</li><li><strong>Huấn luyện làm theo chỉ dẫn:</strong> học từ ví dụ gồm yêu cầu và câu đáp phù hợp.</li><li><strong>Huấn luyện theo đánh giá ưu tiên:</strong> dùng so sánh các đáp án để khuyến khích cách đáp được đánh giá cao hơn.</li></ol><p>Hình dung học viết rồi luyện trả lời khách hàng. Đây là các giai đoạn huấn luyện, không phải những tính cách riêng bên trong mô hình.</p><p>RLHF là học tăng cường từ phản hồi của con người, một cách huấn luyện theo đánh giá ưu tiên. Đây là <a href="https://arxiv.org/abs/2203.02155">một quy trình đã được nghiên cứu</a>, không phải chatbot nào cũng theo đúng như vậy. Chỉ dẫn của sản phẩm và công cụ cũng ảnh hưởng câu đáp.</p>' },
        { title: 'Tùy chọn: làm thêm trước khi trả lời', html: '<p><strong>Tùy chọn:</strong> làm thêm trước khi đáp có thể giúp ở một số bài. So sánh đoán ngay 17 × 24 với viết ra các bước tính.</p><p>Nhiều bước vẫn có thể sai. Muốn kiểm tra tính thêm có ích không, hãy so độ chính xác trên cùng các câu hỏi. Lời giải trôi chảy chưa chứng minh các bước đúng.</p>' },
        { title: 'Bài tổng kết, phần 1: giải thích một khái niệm', html: '<p>Xem lại bản giải thích Tuần 7 và cụm từ từng gây khó hiểu. Dạy bản sửa cho người chưa biết AI. Nhờ họ nói lại ý đã hiểu và ghi chỗ cần thêm ví dụ.</p><p>Nếu học một mình, tự ghi âm rồi kiểm tra xem mỗi từ kỹ thuật đã có ví dụ cụ thể chưa.</p>' },
        { title: 'Bài tổng kết, phần 2: “LLM là gì và không phải gì”', html: '<p>Viết <strong>không quá 500 từ</strong> trả lời “LLM là gì, và khi nào nên kiểm tra câu trả lời của nó?” Gồm:</p><ol><li>Mô hình dự đoán gì.</li><li>Huấn luyện khác ngữ cảnh chat thế nào.</li><li>Điểm số trở thành token được chọn ra sao.</li><li>Một lỗi dữ kiện có thể xảy ra và cách kiểm tra.</li><li>Một ví dụ hoặc ví von, kèm giới hạn.</li></ol><p> Bản nháp được lưu trên thiết bị.</p>' },
        { title: 'Tùy chọn: học gì tiếp', html: '<p><strong>Học tiếp, tùy chọn:</strong> chọn chủ đề bạn muốn tìm hiểu; đây không phải yêu cầu của bài tổng kết.</p><ul><li>Huấn luyện: luyện số học, đồ thị và lập trình cơ bản, rồi xây mô hình dự đoán nhỏ.</li><li>Attention: trở lại Tuần 11 và nghiên cứu được dẫn sau khi học vectơ và ma trận.</li><li>Huấn luyện chatbot: đọc lại nghiên cứu về làm theo chỉ dẫn sau khi giải thích được vòng huấn luyện.</li></ul><p>Không cần đọc bài nghiên cứu để hoàn thành khóa học.</p>' },
        { html: '<p>Tiếp tục dùng cùng phương pháp: dự đoán, kiểm tra, so sánh cách giải thích và nêu mức chưa chắc chắn. Phương pháp đó nối trò đoán mở đầu với việc kiểm tra câu trả lời chatbot.</p>' },
        { html: '<p>Đối chiếu bài viết với năm yêu cầu ở trên. Hỏi người mới họ học được gì và người có chuyên môn, nếu có, điều gì cần sửa. Nếu chưa có người đọc, tự dùng danh sách kiểm tra và ghi rõ vẫn đang chờ phản hồi bên ngoài. Sửa các câu chưa rõ hoặc thiếu căn cứ.</p>' },
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
    { folk: 'mức phạt khi dự đoán gán xác suất thấp cho đáp án', tech: 'loss cross-entropy (khác cảm giác bất ngờ)', week: 10, where: 'vòng huấn luyện văn bản; Tuần 2 tạo trực giác' },
    { folk: 'bản đồ lược bớt chi tiết', tech: 'nén mất dữ liệu (ví von cho mô hình)', week: 3, where: 'bản tóm tắt mười từ' },
    { folk: 'tính điểm token tiếp theo', tech: 'forward pass', week: 8, where: 'bảng điểm' },
    { folk: 'chọn từ bảng điểm', tech: 'giải mã; temperature chỉnh xác suất chọn', week: 8, where: 'ví dụ túi phiếu' },
    { folk: 'đổi trọng số và dùng trọng số', tech: 'huấn luyện và suy luận', week: 7, where: 'ví dụ tờ ghi chú trên bàn' },
    { folk: 'mức tự tin không khớp độ chính xác', tech: 'lệch hiệu chuẩn; ảo giác là lỗi nội dung riêng', week: 6, where: 'trắc nghiệm hiệu chuẩn; so với Tuần 9' },
    { folk: 'từ nào trước đó quan trọng', tech: 'attention', week: 11, where: 'trình trực quan hóa mức liên quan' },
  ];
})();
