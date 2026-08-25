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
      checkpointStatement: 'Tôi giải thích được vì sao cùng một thông điệp có thể mang lượng thông tin khác nhau với từng người nhận, và vì sao câu hỏi hữu ích là câu hỏi có các đáp án giúp thu hẹp những khả năng đang được cân nhắc.',
      beats: [
        { html: '<p>Hai tin nhắn đến điện thoại:</p><blockquote>“Sáng nay mặt trời đã mọc.”<br>“Ngân hàng gọi về một giao dịch lớn.”</blockquote><p>Tin thứ hai có thể làm thay đổi điều bạn biết; tin thứ nhất thì hầu như không. Hai câu dài gần bằng nhau. <strong>Vì sao lượng thông tin lại khác?</strong> Khác biệt phụ thuộc vào điều bạn đã kỳ vọng trước khi đọc.</p><p>Bây giờ hãy đổi người nhận. Với nhân viên ngân hàng đang xử lý chính giao dịch ấy, tin thứ hai có thể chẳng mới mẻ gì. Thông tin không chỉ nằm trong câu chữ; nó xuất hiện trong quan hệ giữa thông điệp và kỳ vọng sẵn có của người nhận.</p>' },
        { title: 'Dự đoán trước: thông tin cần một người nhận', html: '<p>Không cần tính toán, hãy xếp các thông điệp sau từ ít đến nhiều thông tin nhất <em>đối với người nhận được nêu</em>:</p><ol><li>Ứng dụng thời tiết báo với một người ở Bangkok vào tháng Tám: “Trời ẩm.”</li><li>Một đồng xu công bằng ra mặt ngửa sau một lần tung bình thường.</li><li>Phòng thí nghiệm báo cùng đồng xu ấy đã ra mặt ngửa 100 lần liên tiếp.</li><li>Bác sĩ nói với bệnh nhân đang chờ xét nghiệm: “Kết quả âm tính.”</li><li>Một người lạ nhắn: “Có.”</li></ol><p>Không thể xếp câu cuối nếu thiếu bối cảnh: “có” có thể là đồng ý đi ăn trưa, cũng có thể là nhận lời cầu hôn. Trước khi học tiếp, hãy nêu người nhận đã nghĩ những khả năng nào có thể xảy ra.</p>' },
        { title: 'Mổ xẻ trò Hai mươi câu hỏi', html: '<p>Trong trò Hai mươi câu hỏi, vì sao “nó có lớn hơn hộp bánh mì không?” là nước mở đầu tốt hơn “đó có phải Tháp Eiffel không?” Hãy chơi bản thu nhỏ. Trước mỗi lần bấm, dự đoán có bao nhiêu vật thuộc nhánh “có” và bao nhiêu vật thuộc nhánh “không”.</p><p>Câu hỏi mở đầu hữu ích tạo ra hai nhánh đáng kể, nhờ đó dù nhận đáp án nào ta cũng loại được nhiều khả năng. Chia gần đều là quy tắc khởi đầu, không phải mệnh lệnh: chi phí, độ tin cậy và hậu quả có thể khiến một câu hỏi chia lệch vẫn đáng hỏi.</p>' },
        { title: 'Thang độ khó dự đoán', html: '<p>Xếp các sự kiện từ dễ dự đoán nhất (trên) đến khó nhất (dưới). Không có một thứ tự đúng duy nhất. Với từng mục, hãy hoàn thành câu: <strong>“Tôi chưa chắc chủ yếu vì ___.”</strong> Quá nhiều đáp án, thiếu bằng chứng, nguyên nhân bất ổn và sự ngẫu nhiên có chủ đích là những vấn đề khác nhau.</p>' },
        { title: 'Từ giờ đến tuần sau: nhật ký bất ngờ', html: '<div class="card"><p>Tuần này hãy ghi lại <strong>ba khoảnh khắc thật sự bất ngờ</strong>; việc nhỏ thường dễ phân tích hơn. Với mỗi lần, hãy trả lời:</p><ol><li>Điều gì đã xảy ra?</li><li>Tôi đã chờ đợi điều gì khác?</li><li>Bằng chứng nào khiến tôi kỳ vọng như vậy?</li><li>Sau đó điều gì thay đổi: niềm tin, cách hiểu tình huống, hay chỉ tâm trạng?</li><li>Nếu không có gì thay đổi, vì sao?</li></ol><p>Bất ngờ mở ra cơ hội học, nhưng không bảo đảm ta sẽ học. Sự việc có thể chỉ là nhiễu, nguồn tin có thể không đáng tin, hoặc kỳ vọng cũ vẫn có bằng chứng mạnh hơn.</p></div>' },
        { title: 'Phòng khám ngộ nhận', html: '<div class="card"><p>Chọn một nhận định rồi sửa lại:</p><ul><li>“Thông điệp càng dài càng chứa nhiều thông tin.”</li><li>“Sự kiện hiếm lúc nào cũng hữu ích.”</li><li>“Cảm thấy sốc và nhận được thông tin là một việc.”</li><li>“Câu hỏi tốt nhất luôn chia các khả năng thành hai nửa bằng nhau.”</li></ul><p>Hãy đưa ra một phản ví dụ, rồi viết lại nhận định sao cho nói rõ khi nào nó hữu ích và giới hạn nằm ở đâu.</p></div>' },
        { html: '<p><strong>Thông tin làm thay đổi mức chưa chắc chắn.</strong> Một thông điệp cho người nhận nhiều thông tin khi nó loại bỏ — hoặc làm giảm mạnh — những khả năng người ấy từng nghiêm túc cân nhắc.</p><p><strong>Mức bất ngờ phụ thuộc vào kỳ vọng.</strong> Cùng một sự kiện có thể bình thường theo cách nhìn của người này nhưng ngoài dự đoán của người khác.</p><p><strong>Cảm giác bất ngờ không phải đại lượng kỹ thuật.</strong> Cảm xúc còn phụ thuộc vào sự chú ý, hệ quả và ký ức. Muốn đo chính thức phải nêu rõ các khả năng và xác suất. Tạm thời trực giác này là đủ; Tuần 10 sẽ giới thiệu thuật ngữ kỹ thuật.</p><p class="plant-note">Hãy giữ lại thang độ khó. Sang Tuần 7, bạn sẽ dùng nó để so sánh dự đoán của mình với dự đoán của mô hình.</p>' },
        { html: '<p>Hãy đưa ra ví dụ mới về (a) một thông điệp dài nhưng cho người nhận rất ít thông tin, (b) một thông điệp chỉ một từ nhưng cho rất nhiều thông tin, và (c) một câu hỏi có-không nghe có vẻ liên quan nhưng hầu như không thu hẹp các khả năng. Với mỗi ví dụ, hãy nêu kỳ vọng của người nhận trước khi có thông điệp hoặc đáp án. Lời giải thích phải dựa vào kỳ vọng ấy, không chỉ vào độ dài câu hay cảm xúc mạnh.</p>' },
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
