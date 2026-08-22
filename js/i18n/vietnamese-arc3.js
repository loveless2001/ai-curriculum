/* Vietnamese reader-first reconstruction for Arc 3. Loaded after English data. */
(function () {
  if (!GM.language.isVietnamese()) return;

  Object.assign(GM.arcs.find(function (arc) { return arc.id === 3; }), {
    name: 'Chặng 3 — Mô hình ngôn ngữ dự đoán văn bản ra sao',
    shortName: 'Chặng 3 · Cỗ máy',
    claim: 'Ba tuần này áp dụng các ý đã học vào mô hình ngôn ngữ: dự đoán, độ bất định, nén, kiểm thử và hiệu chuẩn.',
  });

  var weeks = {
    7: {
      short: 'Mô hình ngôn ngữ dự đoán văn bản', title: 'Mô hình ngôn ngữ dự đoán văn bản như thế nào',
      tagline: 'Mô hình ngôn ngữ chấm điểm những cách có thể tiếp tục một đoạn văn.',
      checkpointStatement: 'Tôi có thể giải thích cho người ngoài trong một phút, không dùng biệt ngữ, LLM là gì và huấn luyện khác sử dụng như thế nào.',
      beats: [
        { html: '<p>Bên dưới vẫn là trò điền từ của Tuần 1, nhưng lần này một mô hình chơi cùng và hiện những từ được chấm điểm cao nhất. Hãy xem dự đoán của nó có giống bạn không. Đồng thời, so sánh xem hai bên đánh giá chỗ trống nào dễ và chỗ nào có nhiều đáp án.</p><p><strong>Mô hình đang tính điều gì? Quá trình huấn luyện đã làm thay đổi phép tính đó ra sao?</strong></p><p class="note">Trang này dùng một mô phỏng nhỏ với danh sách từ đã chuẩn bị. Nó minh họa bước chấm điểm và chọn từ, nhưng không phải một mô hình ngôn ngữ đầy đủ. Sau này bạn có thể lặp lại bài tập với mô hình thật.</p>' },
        { title: 'So sánh dự đoán của người và máy', html: '<p>Hãy tự điền trước rồi mới mở điểm của mô hình và câu trả lời mẫu của người. So sánh xem các câu trả lời tập trung vào một từ hay phân tán ra nhiều từ.</p>' },
        { title: 'Ngữ cảnh cuộc trò chuyện và việc huấn luyện', html: '<p>Nói cho mô hình mô phỏng một dữ kiện rồi hỏi lại trong cùng cuộc trò chuyện. Sau đó mở cuộc trò chuyện mới và hỏi lại. Bài này cho thấy sự khác nhau giữa dùng ngữ cảnh hiện tại và thay đổi mô hình bằng huấn luyện.</p>' },
        { title: 'Giải thích trong một phút', html: '<div class="card"><p>Giải thích LLM là gì cho một người bạn hoặc tự ghi âm trong 60 giây. Dùng các ý về dự đoán, mô hình và mức bất ngờ. Hãy định nghĩa mọi thuật ngữ kỹ thuật bạn dùng. Nếu nói mô hình “nghĩ”, “muốn” hoặc “biết”, hãy nêu quan sát nào có thể kiểm tra khẳng định đó.</p></div>' },
        { html: '<p><strong>Mô hình ngôn ngữ lớn dự đoán văn bản.</strong> Khi huấn luyện, các con số bên trong được điều chỉnh để mô hình chấm điểm cao hơn cho những cách tiếp tục xuất hiện trong dữ liệu học.</p><p><strong>Huấn luyện và sử dụng là hai giai đoạn khác nhau.</strong> Huấn luyện làm đổi các con số của mô hình. Một cuộc trò chuyện thông thường chỉ dùng các con số đó cùng nội dung đang trò chuyện; nó không huấn luyện lại mô hình.</p>' },
        { html: '<p>Hãy giải thích trong một phút cho người chưa học khóa này. Ghi lại chỗ họ chưa hiểu. Bạn sẽ dùng ghi chú đó trong bài tổng kết Tuần 12.</p>' },
      ],
    },
    8: {
      short: 'Điểm số, cách chọn và temperature', title: 'Điểm số, cách chọn và temperature',
      tagline: 'Temperature thay đổi cách chọn token từ một bộ điểm cố định.',
      checkpointStatement: 'Tôi có thể dự đoán tác động của việc đổi temperature với từng loại yêu cầu trước khi chạy, và giải thích vì sao bản thân mô hình không đổi.',
      beats: [
        { html: '<p>Cùng một yêu cầu, gửi năm lần ở <strong>temperature 0</strong> thì nhận năm câu giống nhau. Khi tăng <strong>temperature</strong>, kết quả có thể khác nhau.</p><p>Các con số mô hình đã học không đổi giữa các lượt. <strong>Temperature tác động lên bước nào diễn ra sau đó?</strong></p>' },
        { title: 'Phòng thí nghiệm temperature', html: '<p>Thử một câu hỏi dữ kiện, một đề bài sáng tạo và một câu mơ hồ ở temperature thấp rồi cao. Dự đoán trước mỗi lượt, sau đó ghi lại điều đã thay đổi.</p><p>Liên hệ với thang Tuần 2: temperature tác động nhiều hơn khi vài cách tiếp tục có điểm gần nhau.</p>' },
        { title: 'Tách bước chấm điểm và bước chọn', html: '<div class="card"><p>Tiện ích phía trên tách hai bước:</p><ul><li><strong>Bước chấm điểm</strong> gán điểm cho các token có thể xuất hiện tiếp theo. Với cùng yêu cầu, bảng điểm không đổi.</li><li><strong>Bước chọn</strong> dùng một quy tắc để lấy một token từ bảng điểm.</li></ul><p>Hãy giữ nguyên bảng điểm và chỉ đổi quy tắc chọn. Nếu học cùng bạn, một người giữ bảng điểm, người kia thực hiện quy tắc chọn.</p></div>' },
        { title: 'Kiểm tra khả năng lặp lại', html: '<div class="card"><p>Bài dự đoán: yêu cầu nào sẽ cho đầu ra giống nhau ở mọi lượt khi temperature 0, và yêu cầu nào thay đổi ở temperature cao? Viết dự đoán rồi kiểm chứng trong phòng thí nghiệm.</p><p class="note">Lưu ý kỹ thuật: trên hệ thống lớn thật, tính tất định tuyệt đối ở temperature 0 đôi khi dao động vì hạ tầng (ghép lô, số học phần cứng). <em>Sự tương phản</em> giữa hai cài đặt mới là điều thật và bền vững.</p></div>' },
        { html: '<p><strong>Chấm điểm và chọn là hai bước riêng.</strong> Mô hình gán điểm cho các token có thể xuất hiện tiếp theo. Sau đó, một quy tắc giải mã chọn một token. Temperature thay đổi quy tắc chọn, không thay đổi các con số mô hình đã học.</p><p><strong>Độ đa dạng đến từ bước chọn.</strong> Temperature thấp ưu tiên mạnh đáp án có điểm cao nhất. Temperature cao cho các đáp án điểm thấp hơn thêm cơ hội được chọn.</p>' },
        { html: '<p>Trước khi chạy: dự đoán với một yêu cầu dữ kiện và một câu mở đầu truyện, tăng temperature sẽ tác động thế nào. Sau đó chạy và kiểm tra. Đúng cả hai kèm lý do là đạt.</p>' },
      ],
    },
    9: {
      short: 'Vì sao câu trôi chảy vẫn có thể sai', title: 'Vì sao câu trả lời trôi chảy vẫn có thể sai',
      tagline: 'Một câu nghe hợp lý vẫn có thể sai sự thật.',
      checkpointStatement: 'Tôi có thể chủ động tạo một ảo giác lặp lại được, giải thích bằng vốn từ khóa học vì sao nó xảy ra, và sửa lời người gọi đó là “nói dối” hoặc “trục trặc”.',
      beats: [
        { html: '<p>Đặt temperature về 0 — cài đặt có thể lặp lại, không còn xúc xắc. Giờ yêu cầu máy viết tiểu sử một người có tên nghe hợp lý nhưng <em>không tồn tại</em>.</p><p>Nó trả lời. Lưu loát. Chi tiết. Và <strong>giống hệt ở mọi lượt chạy.</strong></p><p>Đây không phải ngẫu nhiên — ngẫu nhiên đã tắt. Vậy nó là gì?</p>' },
        { title: 'Phòng thí nghiệm ảo giác', html: '<p>Thử hỏi về tiểu sử bịa, trích dẫn giả và các chi tiết khó có hồ sơ. Với mỗi câu trả lời, ghi xem nó có lặp lại không, các khẳng định có kiểm chứng được không và chủ đề được ghi chép nhiều hay ít. So sánh với câu hỏi về các dữ kiện được ghi chép rộng rãi.</p>' },
        { title: 'Mối liên hệ với sự nén', html: '<div class="card"><p>Quay lại Tuần 3. Một biểu diễn đã nén có thể giữ mẫu phổ biến nhưng làm mất một chi tiết cụ thể. Khi bị hỏi đúng chi tiết đó, mô hình có thể tạo một câu trông điển hình thay vì câu có bằng chứng hỗ trợ.</p></div>' },
        { title: 'Áp dụng phân biệt của Frankfurt', html: '<div class="card"><p>Phân biệt ở Tuần 6, giờ áp lên cỗ máy:</p><ul><li><strong>Nó có nói dối không?</strong> Không. Nói dối đòi hỏi theo dõi sự thật để né tránh nó; mục tiêu tạo từ tiếp theo không trực tiếp theo dõi sự thật.</li><li><strong>Nó có nói mà bất chấp thật sai không?</strong> Gần hơn: văn bản được tạo để có vẻ <em>có khả năng xuất hiện</em>, không trực tiếp tối ưu tính đúng.</li></ul><p>Bài luyện chính xác — viết lại cho đúng: “AI nói dối tôi”; “AI bị trục trặc”; “AI không biết dữ kiện đó”. Hãy thử trước khi xem đáp án mẫu.</p></div>' },
        { title: 'Kiểm tra hiệu chuẩn của máy', html: '<div class="card"><p>Hỏi mô hình mức tự tin về một câu bịa. So lời tự nhận đó với kết quả đã kiểm chứng, rồi liên hệ với bài Tuần 6. Muốn đo hiệu chuẩn, cần so nhiều dự đoán với kết quả thực tế.</p></div>' },
        { title: 'Trò quy gán, vòng cuối', html: '<div class="card"><p>Áp kỷ luật Tuần 5 lên chính cỗ máy: bằng chứng nào cho thấy nó <em>biết</em> một dữ kiện, thay vì chỉ tạo văn bản có vẻ hợp lý? Thiết kế đối chứng kiểu von Pfungst — tương đương việc che mắt ngựa và dùng người hỏi không biết đáp án. Ví dụ: câu trả lời có ổn định khi đổi cách hỏi? độ tự tin có khớp độ chính xác? máy có phân biệt vùng “không biết” với vùng được phủ tốt?</p></div>' },
        { html: '<p><strong>Ảo giác là câu trả lời trôi chảy nhưng không được sự thật nâng đỡ.</strong> Mô hình vẫn tiếp tục mẫu ngôn ngữ khi câu hỏi yêu cầu một chi tiết bị thiếu, hiếm hoặc lẫn lộn trong dữ liệu đã học.</p><p><strong>Cùng một quá trình dự đoán tạo ra cả câu đúng lẫn câu sai.</strong> Dữ liệu, công cụ và cách huấn luyện tốt hơn có thể giảm lỗi. Với thông tin quan trọng, người dùng vẫn cần kiểm chứng.</p>' },
        { html: '<p>Tạo một lỗi tự tin có thể lặp lại trong phòng thí nghiệm, rồi chỉ bằng vốn từ khóa học giải thích vì sao cùng cơ chế tạo cả lỗi này lẫn đáp án đúng. Cuối cùng, sửa thành tiếng câu: “AI đã nói dối tôi về trích dẫn đó.”</p>' },
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
