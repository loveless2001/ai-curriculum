/* Vietnamese reader-first reconstruction for Arc 1. Loaded after English data. */
(function () {
  if (!GM.language.isVietnamese()) return;

  Object.assign(GM.arcs.find(function (arc) { return arc.id === 1; }), {
    name: 'Chặng 1 — Ta dự đoán bằng ngữ cảnh như thế nào?',
    shortName: 'Chặng 1 · Dự đoán',
    claim: 'Ta bắt đầu bằng một từ còn thiếu, tìm xem manh mối nào có ích, rồi hỏi một mô hình nên giữ lại những gì.',
  });

  var weeks = {
    1: {
      short: 'Ngữ cảnh giúp ta đoán', title: 'Ngữ cảnh giúp ta đoán như thế nào',
      tagline: 'Có câu gần như chỉ có một cách điền; có câu lại có vô số đáp án.',
      checkpointStatement: 'Tôi giải thích được vì sao có câu bỏ dở rất dễ đoán, còn câu khác lại có nhiều cách điền hợp lý.',
      beats: [
        { html: '<p>Đọc câu này thành tiếng, hoặc nhờ ai đó đọc cho bạn:</p><blockquote>“Cô ấy rót cà phê vào ___.”</blockquote><p>Có lẽ bạn nghĩ ngay đến “cốc”. Câu này gợi khá rõ đáp án. Còn câu “Sinh nhật năm nay, cô ấy muốn được tặng ___” thì có rất nhiều cách điền.</p><p><strong>Vì sao câu đầu dễ đoán hơn?</strong> Hãy tự trả lời trước khi đọc tiếp.</p>' },
        { title: 'Thử điền từ', html: '<p>Với mỗi câu bên dưới, hãy đoán phần còn thiếu. Trước khi xem các cách điền minh họa, tự hỏi: nếu người khác điền khác bạn, bạn có bất ngờ không? Hãy để ý <em>có bao nhiêu cách điền vẫn nghe hợp lý</em>.</p><p class="note">Nếu học cùng người khác, một người đọc rồi dừng giữa câu, người kia đoán.</p>' },
        { title: 'Trò đoán chữ của Shannon (1951)', html: '<p>Trước thời chatbot rất lâu, kỹ sư Claude Shannon từng chơi trò đoán chữ với vợ mình, Betty. Ông lấy một câu trong cuốn sách bà chưa đọc; bà đoán từng chữ cái, sai thì đoán lại. Shannon ghi xem mỗi chữ cần bao nhiêu lượt.</p><p>Số lượt đoán cho thấy ta có thể dựa vào các chữ đã biết để đoán phần tiếp theo. Bây giờ bạn thử vào vai Betty:</p>' },
        { html: '<p><strong>Kỳ vọng.</strong> Khi một câu chưa kết thúc, trong đầu bạn đã có vài khả năng cho phần tiếp theo.</p><p><strong>Dự đoán.</strong> Ngữ cảnh loại bớt các khả năng. Có lúc gần như chỉ còn một đáp án; có lúc vẫn còn rất nhiều.</p><p><strong>Độ chắc chắn.</strong> Có dự đoán bạn rất tin, có dự đoán bạn chỉ đoán mò. Hỏi “nếu sai, mình có bất ngờ không?” là một cách tự kiểm tra mức độ chắc chắn ấy.</p>' },
        { html: '<p>Hãy giải thích cho một người khác, hoặc tự nói thành tiếng: vì sao “cô ấy rót cà phê vào ___” dễ đoán hơn “sinh nhật cô ấy muốn được tặng ___”? Thử nói bằng lời thường ngày, không dùng các từ như “xác suất”.</p>' },
      ],
    },
    2: {
      short: 'Bất ngờ và thông tin', title: 'Bất ngờ và thông tin',
      tagline: 'Cùng một thông tin có thể rất mới với người này nhưng chẳng mới gì với người khác.',
      checkpointStatement: 'Tôi giải thích được vì sao cùng một thông báo lại cho mỗi người biết thêm một lượng khác nhau.',
      beats: [
        { html: '<p>Tuần trước, ngữ cảnh giúp bạn đoán phần còn thiếu. Tuần này ta hỏi: khi đáp án xuất hiện, bạn thực sự biết thêm được gì?</p><p>Bưu kiện của bạn sẽ đến thứ Hai hoặc thứ Ba. Nhân viên giao hàng báo: “Thứ Ba.” Người hàng xóm cũng nhận tin đó, nhưng họ đã xem lịch giao từ trước.</p><p><strong>Ai biết thêm nhiều hơn từ cùng một câu?</strong></p>' },
        { title: 'Trước và sau khi nhận tin', html: '<p>Với mỗi trường hợp, hãy nói người nhận biết gì <strong>trước</strong> và biết thêm gì <strong>sau</strong>:</p><ul><li>“Bưu kiện đến thứ Ba”, gửi cho bạn và người hàng xóm.</li><li>“Mặt ngửa”, sau một lần tung đồng xu.</li><li>“Có”, nhưng không biết câu hỏi là gì.</li></ul><p>Trường hợp nào đã đủ rõ? Trường hợp nào còn thiếu ngữ cảnh?</p>' },
        { title: 'Trò Hai mươi câu hỏi', html: '<p>Có tám đồ vật và bạn chưa có lý do để nghiêng về vật nào. Một câu hỏi chia chúng thành hai nhóm bốn. Câu khác hỏi thẳng về một vật, nên sau khi trả lời có thể còn một hoặc bảy đáp án.</p><p><strong>Câu nào thường loại được nhiều đáp án hơn?</strong> Hãy đếm số đồ vật ở mỗi phía trước khi hỏi. Khi các vật có khả năng được chọn như nhau, câu hỏi chia danh sách khá đều thường có ích hơn.</p>' },
        { title: 'Dự đoán nào khó hơn?', html: '<p>Xếp các dự đoán từ dễ đến khó. Với mỗi mục, ghi lý do: thiếu manh mối, có quá nhiều đáp án hợp lý, hay kết quả vốn ngẫu nhiên.</p><p>Lưu lại thứ tự này. Đến tuần 8, bạn sẽ dùng nó để so sánh các kiểu yêu cầu khác nhau.</p>' },
        { title: 'Ghi lại những lần bất ngờ', html: '<p>Trước buổi học sau, hãy ghi lại ba lần bạn thấy bất ngờ: bạn đã nghĩ điều gì sẽ xảy ra, chuyện gì thực sự xảy ra, và bạn có đổi dự đoán cho lần sau không.</p><p>Ví dụ: xe buýt đến muộn một lần chưa có nghĩa là lịch chạy đã đổi.</p>' },
        { title: 'Kiểm tra một ngộ nhận', html: '<p>Chọn một khẳng định và đưa ví dụ cho thấy giới hạn của nó:</p><ul><li>“Thông điệp dài hơn luôn cho biết nhiều hơn.”</li><li>“Thông điệp bất ngờ luôn hữu ích.”</li><li>“Câu hỏi tốt nhất luôn chia đôi các khả năng.”</li></ul><p>Sau đó viết lại thành một câu chính xác hơn.</p>' },
        { html: '<p><strong>Thông tin</strong> không chỉ nằm trong bản thân câu nói; nó còn phụ thuộc vào người nghe đã biết gì. Trong ví dụ bưu kiện, câu “Thứ Ba” giúp bạn loại một ngày, nhưng không cho người hàng xóm biết thêm gì.</p><p><strong>Bất ngờ</strong> lớn hay nhỏ phụ thuộc vào điều bạn chờ đợi trước đó. Nó không hoàn toàn giống cảm giác sửng sốt, vì cảm xúc còn phụ thuộc vào việc bạn quan tâm đến kết quả đến đâu.</p><p>Tuần 10 sẽ giới thiệu một cách đo bằng số. Ở đây chưa cần công thức.</p>' },
        { html: '<p>Hãy nghĩ ra một câu dài nhưng gần như không cho người nghe biết thêm gì, và một câu ngắn nhưng làm họ thay đổi hẳn điều đang nghĩ. Với mỗi câu, nói rõ người nghe đã biết gì từ trước.</p><p>Sau đó nghĩ ra một câu hỏi có/không mà câu trả lời dễ xảy ra nhất chỉ loại được rất ít khả năng.</p>' },
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
