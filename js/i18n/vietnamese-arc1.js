/* Vietnamese reader-first reconstruction for Arc 1. Loaded after English data. */
(function () {
  if (!GM.language.isVietnamese()) return;

  Object.assign(GM.arcs.find(function (arc) { return arc.id === 1; }), {
    name: 'Chặng 1 — Dự đoán trước khi tìm hiểu mô hình ngôn ngữ',
    shortName: 'Chặng 1 · Dự đoán',
    claim: 'Bạn vẫn đoán phần tiếp theo của một câu khi đọc hoặc nghe. Chặng này giải thích ngữ cảnh thu hẹp các đáp án ra sao, và vì sao sự bất ngờ cho biết bạn vừa học được điều mới.',
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
      checkpointStatement: 'Tôi có thể giải thích vì sao một thông điệp ai cũng đoán trước không mang thông tin, và vì sao câu hỏi hay là câu hỏi có đáp án khiến ta bất ngờ.',
      beats: [
        { html: '<p>Hai tin nhắn đến điện thoại:</p><blockquote>“Sáng nay mặt trời đã mọc.”<br>“Ngân hàng gọi về một giao dịch lớn.”</blockquote><p>Một câu là tin tức; câu kia thì không. Cả hai đều ngắn, đúng ngữ pháp và dài gần bằng nhau. <strong>Khác biệt được tạo nên từ đâu?</strong> Nó không nằm trong bản thân từ ngữ — mà trong điều bạn đã kỳ vọng.</p>' },
        { title: 'Mổ xẻ trò Hai mươi câu hỏi', html: '<p>Trong trò Hai mươi câu hỏi, vì sao “nó có lớn hơn hộp bánh mì không?” là nước mở đầu tốt hơn “đó có phải Tháp Eiffel không?” Hãy chơi bản thu nhỏ: tìm vật bí mật và xem mỗi câu hỏi tác động thế nào đến tập khả năng. Câu hỏi hay là câu mà bạn <em>không đoán trước được</em> đáp án — nó chia đôi các khả năng.</p>' },
        { title: 'Thang độ khó dự đoán', html: '<p>Xếp các sự kiện từ dễ dự đoán nhất (trên) đến khó nhất (dưới). Không có một thứ tự đúng duy nhất — điều quan trọng là cuộc tranh luận của bạn với chính mình. Chính xác điều gì khiến cái này khó hơn cái kia?</p>' },
        { title: 'Từ giờ đến tuần sau: nhật ký bất ngờ', html: '<div class="card"><p>Tuần này hãy ghi lại <strong>ba khoảnh khắc thật sự bất ngờ</strong> — lớn hay nhỏ — và với mỗi khoảnh khắc, viết một dòng về điều nó dạy bạn. Mẫu hình cần nhận ra: bất ngờ = bạn học được điều gì đó = kỳ vọng của bạn đã thay đổi. Không bất ngờ, không học hỏi.</p></div>' },
        { html: '<p><strong>Thông tin làm giảm mức chưa chắc chắn.</strong> Một thông điệp cho bạn nhiều thông tin khi nó loại bỏ nhiều khả năng mà trước đó bạn còn cân nhắc.</p><p><strong>Có thể đo mức bất ngờ.</strong> Tạm thời ta cứ gọi là “mức bất ngờ”. Tuần 10 sẽ giới thiệu thuật ngữ kỹ thuật.</p><p class="plant-note">Hãy giữ lại thang độ khó. Sang Tuần 7, bạn sẽ dùng nó để so sánh dự đoán của mình với dự đoán của mô hình.</p>' },
        { html: '<p>Tự kiểm tra: đưa ra ví dụ mới về (a) một thông điệp dài nhưng hầu như không có thông tin, và (b) một thông điệp chỉ một từ nhưng có rất nhiều thông tin. Sau đó giải thích điều gì tạo ra khác biệt — bằng lời thường.</p>' },
      ],
    },
    3: {
      short: 'Mô hình giữ và bỏ chi tiết nào', title: 'Mô hình giữ và bỏ chi tiết nào',
      tagline: 'Mô hình hữu ích khi giữ đúng chi tiết cần cho một công việc.',
      checkpointStatement: 'Tôi có thể nêu một ví dụ mới trong đó cùng một lãnh địa cần hai bản đồ khác nhau, và nói mỗi bản đồ đã hy sinh điều gì.',
      beats: [
        { html: '<p>Hãy hình dung bản đồ tàu điện và ảnh vệ tinh của cùng một thành phố đặt cạnh nhau. Bản đồ tàu điện <em>sai rất nhiều</em>: khoảng cách bị bóp méo, đường cong bị nắn thẳng, địa lý bị bỏ qua. Vậy mà để bắt tàu, nó luôn hữu ích hơn bức ảnh chính xác.</p><p><strong>Làm sao một hình ảnh sai hơn lại hữu ích hơn?</strong></p>' },
        { title: 'Cuộc tiếp sức nén', html: '<p>Đọc truyện ngắn bên dưới rồi tóm tắt bằng <strong>đúng mười từ</strong>. Sau đó xem người lạ có thể và không thể dựng lại điều gì từ mười từ ấy. Điều gì sống sót? Điều gì biến mất? Và câu hỏi thật sự: <em>bạn có giữ đúng thứ cần giữ không?</em></p><p class="note">Bản chơi đôi: đưa mười từ cho người chưa đọc truyện, nhờ họ kể lại rồi so với bản gốc.</p>' },
        { title: 'Bản đồ phụ thuộc mục đích', html: '<div class="card"><p>Hãy nghĩ về khu phố của bạn. Trên giấy (hoặc trong đầu), vẽ ba bản đồ:</p><ul><li>cho một <strong>chuyến khám phá ẩm thực</strong></li><li>cho một <strong>thợ sửa ống nước</strong></li><li>cho một <strong>tên trộm</strong></li></ul><p>Cùng một lãnh địa, ba tài liệu khác nhau. Với mỗi bản đồ: bạn giữ gì, bỏ gì, và vì sao? Không có “bản đồ khu phố tốt nhất” — chỉ có bản đồ tốt nhất <em>cho một mục đích</em>.</p></div>' },
        { title: 'Định kiến như một dạng nén (cần thận trọng)', html: '<div class="card"><p>Một khái quát về một nhóm người cũng là bản đồ: đổi chi tiết lấy tốc độ. Nó sai đúng ở nơi chi tiết bị bỏ đi lại quan trọng — con người cụ thể trước mặt bạn. Đây không phải lời biện hộ cho định kiến; nó chẩn đoán kiểu thất bại: <strong>lỗi của bộ nén có tính hệ thống, không ngẫu nhiên</strong>. Lỗi xuất hiện chính nơi việc nén đã vứt bỏ điều bạn cần.</p><p class="plant-note">Gieo mầm cho Tuần 9: khi máy tự tin bịa dữ kiện, bạn sẽ thấy đúng hình dạng thất bại này — một lần tái dựng trông hợp lý nhưng sai của bộ nén.</p></div>' },
        { html: '<p><strong>Mô hình là bản tóm lược có chọn lọc, được làm cho một mục đích.</strong> Nó bỏ bớt chi tiết để những phần cần cho công việc dễ dùng hơn.</p><p><strong>Bản đồ không phải nơi thật.</strong> Muốn đánh giá một bản đồ, cần biết nó được dùng để làm gì.</p>' },
        { html: '<p>Hãy tạo ví dụ riêng: một lãnh địa (lĩnh vực, nơi chốn, con người, môn học) cần hai bản đồ cho hai mục đích. Nêu điều mỗi bản đồ hy sinh. Nếu đó là ví dụ bạn từng nghe, hãy tìm ví dụ khác.</p>' },
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
