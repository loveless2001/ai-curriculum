/* Vietnamese reader-first reconstruction for Arc 1. Loaded after English data. */
(function () {
  if (!GM.language.isVietnamese()) return;

  Object.assign(GM.arcs.find(function (arc) { return arc.id === 1; }), {
    name: 'Chặng 1 — Dự đoán trước khi tìm hiểu mô hình ngôn ngữ',
    shortName: 'Chặng 1 · Dự đoán',
    claim: 'Bắt đầu bằng một từ còn thiếu, tìm manh mối hữu ích, rồi xem mô hình cần giữ lại và bỏ qua điều gì.',
  });

  var weeks = {
    1: {
      short: 'Ngữ cảnh định hướng dự đoán', title: 'Ngữ cảnh định hướng dự đoán như thế nào',
      tagline: 'Nhờ ngữ cảnh, có câu rất dễ đoán và có câu thì không.',
      checkpointStatement: 'Tôi giải thích được vì sao một câu bỏ dở gần như chỉ có một cách điền, còn câu khác có nhiều cách điền hợp lý.',
      beats: [
        { html: '<p>Đọc thành tiếng câu sau, hoặc nhờ ai đó đọc cho bạn:</p><blockquote>“Cô ấy rót cà phê vào ___.”</blockquote><p>Có lẽ bạn nghĩ đến từ “cốc”. Câu này cho khá nhiều manh mối. Còn câu “Sinh nhật năm nay cô ấy muốn một ___” có thể nhận rất nhiều đáp án.</p><p><strong>Vì sao một chỗ trống dễ đoán, còn chỗ kia thì rộng mở?</strong> Hãy tự trả lời trước khi đọc tiếp.</p>' },
        { title: 'Các vòng điền từ', html: '<p>Hãy đoán từ tiếp theo trong từng câu bên dưới. Trước khi mở đáp án, đánh giá xem bạn sẽ bất ngờ đến mức nào nếu sai. Điểm cốt lõi không chỉ là đúng hay sai — hãy chú ý <em>có bao nhiêu đáp án hợp lý</em>. Có chỗ trống chỉ gần như có một đáp án, có chỗ có năm, có chỗ có hàng trăm.</p><p class="note">Bản chơi đôi: một người đọc rồi dừng giữa câu, người kia đoán. Cách đánh giá không đổi.</p>' },
        { title: 'Trò đoán chữ của Shannon (1951)', html: '<p>Rất lâu trước khi máy tính biết trò chuyện, kỹ sư Claude Shannon chơi một trò với vợ mình, Betty: ông lấy một câu trong cuốn sách bà chưa đọc và bà đoán <em>từng chữ cái</em>. Mỗi lần sai, bà đoán lại. Ông đếm số lượt cần cho từng chữ.</p><p>Kết quả: tiếng Anh <em>có thể dự đoán được</em> — và dự đoán của con người là dụng cụ đo. Phần lớn chữ cái chỉ cần một lượt. Đây là giai thoại mở đầu khóa học: <strong>trò đoán đã có trước các cỗ máy bảy mươi năm.</strong> Bây giờ bạn hãy thử vai của Betty:</p>' },
        { html: '<p><strong>Kỳ vọng.</strong> Trước khi câu kết thúc, bạn đã hình dung vài từ có thể xuất hiện tiếp theo.</p><p><strong>Dự đoán.</strong> Ngữ cảnh thu hẹp số đáp án. Có lúc chỉ còn một đáp án rất dễ xảy ra; có lúc vẫn còn nhiều.</p><p><strong>Độ tin chắc.</strong> Bạn có thể tin vào một dự đoán nhiều hoặc ít. Câu hỏi “nếu sai, tôi sẽ bất ngờ đến đâu?” giúp bạn mô tả mức tin đó.</p>' },
        { html: '<p>Bài dạy lại: giải thích cho ai đó (hoặc tự nói thành tiếng) vì sao “cô ấy rót cà phê vào ___” và “sinh nhật cô ấy muốn một ___” là hai <em>loại</em> chỗ trống khác nhau — không dùng thuật ngữ kỹ thuật. Nếu lỡ dùng từ như “xác suất”, hãy thử lại bằng lời đơn giản hơn.</p>' },
      ],
    },
    2: {
      short: 'Bất ngờ và thông tin', title: 'Bất ngờ và thông tin',
      tagline: 'Một thông điệp có ích khi nó làm thay đổi điều bạn dự đoán.',
      checkpointStatement: 'Tôi có thể giải thích vì sao cùng một thông điệp cho mỗi người biết thêm khác nhau, và so sánh hai câu hỏi có/không.',
      beats: [
        { html: '<p>Tuần trước, ngữ cảnh giúp bạn đoán từ còn thiếu. Giờ hãy xem bạn biết thêm gì khi nhận được câu trả lời.</p><p>Bạn đang chờ một bưu kiện, có thể đến thứ Hai hoặc thứ Ba. Nhân viên giao hàng báo: “Thứ Ba.” Người hàng xóm đã xem lịch giao trước đó.</p><p><strong>Cùng một thông điệp, ai biết thêm nhiều hơn?</strong> Bạn còn phân vân giữa hai ngày; người hàng xóm đã biết ngày nào.</p>' },
        { title: 'Dự đoán trước: thông tin cần một người nhận', html: '<p>Với mỗi thông điệp, nói rõ người nhận biết gì <strong>trước</strong> và biết thêm gì <strong>sau</strong>:</p><ul><li>“Bưu kiện đến thứ Ba”, gửi cho bạn và người hàng xóm.</li><li>“Mặt ngửa”, sau khi tung đồng xu cân bằng.</li><li>“Có”, nhưng không kèm câu hỏi.</li></ul><p>Trường hợp nào đã đủ rõ? Với các trường hợp còn lại, bạn cần biết thêm điều gì?</p>' },
        { title: 'Mổ xẻ trò Hai mươi câu hỏi', html: '<p>Giả sử tám đồ vật có khả năng được chọn như nhau. Một câu hỏi chia chúng thành hai nhóm bốn. Câu khác chỉ hỏi về một đồ vật: mỗi đáp án sẽ để lại một hoặc bảy khả năng.</p><p><strong>Tính trung bình, câu nào để lại ít đồ vật hơn?</strong> Thử trò chơi. Trước khi hỏi, đếm số đồ vật ở mỗi nhóm. Chia đều có lợi khi các đồ vật có khả năng được chọn như nhau và mỗi câu hỏi tốn công như nhau.</p>' },
        { title: 'Thang độ khó dự đoán', html: '<p>Xếp dự đoán dễ nhất lên đầu. Với mỗi mục, nêu lý do: “tôi thiếu manh mối”, “nhiều kết quả đều có thể xảy ra”, hoặc “kết quả được chọn ngẫu nhiên”. Giả định khác nhau có thể dẫn đến thứ tự khác nhau.</p><p>Giữ bảng xếp hạng cho Tuần 8, khi ta so sánh những chỗ dễ đoán với những chỗ có nhiều cách viết tiếp.</p>' },
        { title: 'Từ giờ đến tuần sau: nhật ký bất ngờ', html: '<p><strong>Giữa hai buổi học:</strong> ghi lại ba lần bất ngờ. Viết điều bạn chờ đợi, điều đã xảy ra và liệu bạn có thay đổi dự đoán cho lần sau không.</p><p>Ví dụ: một chuyến xe buýt đến muộn chưa chứng minh lịch chạy đã đổi. Cần thêm bằng chứng trước khi đổi nhận định.</p>' },
        { title: 'Phòng khám ngộ nhận', html: '<p>Chọn một khẳng định và đưa ví dụ cho thấy giới hạn của nó:</p><ul><li>“Thông điệp dài hơn luôn cho biết nhiều hơn.”</li><li>“Thông điệp bất ngờ luôn hữu ích.”</li><li>“Câu hỏi tốt nhất luôn chia đôi các khả năng.”</li></ul><p>Sau đó viết lại thành một câu chính xác hơn.</p>' },
        { html: '<p><strong>Thông tin:</strong> một thông điệp cho bạn biết thêm gì phụ thuộc vào điều bạn đã biết. Trong ví dụ bưu kiện, nó loại đi một ngày giao có thể xảy ra.</p><p><strong>Bất ngờ:</strong> kết quả càng ít được dự đoán trước thì càng bất ngờ. Cảm giác sửng sốt còn phụ thuộc vào mức độ bạn quan tâm.</p><p>Tuần 10 sẽ dùng một con số để đo mức bất ngờ của dự đoán. Ở đây chưa cần công thức.</p>' },
        { html: '<p>Nêu một thông điệp dài nhưng cho người nhận biết thêm rất ít, và một thông điệp ngắn nhưng cho biết nhiều. Nói rõ mỗi người đã biết gì từ trước. Sau đó nêu một câu hỏi có/không mà đáp án dễ xảy ra nhất chỉ loại được ít khả năng.</p>' },
      ],
    },
    3: {
      short: 'Mô hình giữ và bỏ chi tiết nào', title: 'Mô hình giữ và bỏ chi tiết nào',
      tagline: 'Mô hình hữu ích khi giữ đúng chi tiết cần cho một công việc.',
      checkpointStatement: 'Tôi có thể mô tả hai mô hình phục vụ hai việc và một chi tiết mỗi mô hình bỏ qua.',
      beats: [
        { html: '<p>Bản đồ tàu điện bỏ qua phần lớn đường phố và không giữ đúng khoảng cách. Ảnh vệ tinh giữ những chi tiết đó. <strong>Cái nào giúp bạn chọn ga để đổi tuyến?</strong></p><p>Tuần 2 hỏi manh mối nào giúp bớt phân vân. Tuần này hỏi mô hình cần giữ lại manh mối nào để có ích.</p>' },
        { title: 'Cuộc tiếp sức nén', html: '<p>Đọc câu chuyện rồi tóm tắt bằng <strong>đúng mười từ</strong>. Người đọc có thể biết được gì từ bản tóm tắt? Chi tiết nào họ phải đoán?</p><p>Nếu có thể, nhờ người chưa đọc truyện kể lại chỉ dựa vào bản tóm tắt của bạn.</p>' },
        { title: 'Hai bản đồ, hai việc', html: '<p>Phác hai bản đồ khu phố: một để tìm chỗ ăn trưa, một để sửa đường ống nước. Với mỗi bản đồ, nêu hai chi tiết cần giữ và hai chi tiết có thể bỏ.</p><p>Bản đồ hữu ích hay không tùy vào việc cần làm. Bản đồ quán ăn không cho thợ sửa ống biết chỗ nào cần đào.</p>' },
        { title: 'Khi bản tóm tắt thiếu điều cần biết', html: '<p>Một đánh giá nói quán ăn “rẻ và đông”. Bạn có biết xe lăn có vào được không? Bản tóm tắt có thể đúng mà vẫn thiếu điều bạn cần.</p><p><strong>Thử:</strong> thêm một chi tiết cho người dùng xe lăn, rồi một chi tiết cho người cần tránh các loại hạt. Tuần 9 sẽ hỏi điều gì xảy ra khi mô hình điền một chi tiết nghe hợp lý nhưng thiếu bằng chứng.</p>' },
        { html: '<p><strong>Mô hình</strong> là cách mô tả hoặc một hệ thống được đơn giản hóa để giải thích hay dự đoán điều gì đó. Bản đồ là một ví dụ.</p><p><strong>Nén mất dữ liệu</strong> là rút gọn thông tin và làm mất một phần chi tiết. Bản tóm tắt mười từ làm điều này. Đây là cách ví von để hiểu mô hình đã học, chưa phải toàn bộ cơ chế của nó.</p>' },
        { html: '<p>Chọn một nơi hoặc chủ đề. Mô tả hai mô hình phục vụ hai việc khác nhau. Mỗi mô hình giữ gì và không trả lời được câu hỏi nào?</p>' },
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
