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
      checkpointStatement: 'Tôi có thể dùng một ví dụ để giải thích dự đoán văn bản, huấn luyện và ngữ cảnh chat.',
      beats: [
        { html: '<p>Quay lại Tuần 1: “Cô ấy rót cà phê vào ___.” Lần này hãy so dự đoán của bạn với một bảng điểm mô hình đã được chuẩn bị sẵn.</p><p><strong>Mô hình ngôn ngữ lớn (LLM)</strong> tính xem những mảnh văn bản nào có thể xuất hiện tiếp. Một mảnh, gọi là <strong>token</strong>, có thể là một từ, một phần của từ hoặc dấu câu.</p><p>Bài tập này dùng ví dụ soạn sẵn, không chạy mô hình thật.</p>' },
        { title: 'So sánh dự đoán của người và máy', html: '<p>Tự điền từng chỗ trống trước khi mở bảng điểm. Một đáp án vượt trội hay có nhiều đáp án đều phù hợp? Dự đoán của người và điểm mô hình ở đây được chuẩn bị để minh họa, không phải số liệu đo từ lớp của bạn.</p>' },
        { title: 'Ngữ cảnh cuộc trò chuyện và việc huấn luyện', html: '<p>Cho mô phỏng một dữ kiện, hỏi lại, rồi mở cuộc trò chuyện mới và hỏi lần nữa.</p><p>Hình dung một học sinh dùng tờ ghi chú trên bàn. Tờ giấy giúp trả lời câu này mà không đổi điều đã học trong buổi học. Tương tự, ngữ cảnh trò chuyện cung cấp thông tin mà không đổi các con số đã được huấn luyện.</p><p>Một số sản phẩm lưu ghi chú hoặc tìm lại cuộc trò chuyện cũ. Việc đó khác với huấn luyện lại mô hình.</p>' },
        { title: 'Giải thích trong một phút', html: '<p>Giải thích LLM trong 60 giây: nó dự đoán gì, huấn luyện thay đổi nó ra sao, và cuộc trò chuyện cung cấp manh mối thế nào. Có thể dùng ví dụ tờ ghi chú trên bàn.</p>' },
        { html: '<p><strong>Huấn luyện</strong> dùng ví dụ để điều chỉnh các con số bên trong, gọi là trọng số. <strong>Sử dụng mô hình</strong> áp dụng các con số đó vào văn bản hiện tại.</p><p>Để tạo câu trả lời: chấm điểm các token tiếp theo, chọn một token, thêm vào văn bản rồi lặp lại. Tuần 8 xem bước chọn; Tuần 10 xem việc huấn luyện.</p>' },
        { html: '<p>Giải thích cho người mới học, hoặc tự ghi âm rồi nghe lại. Tìm một cụm chưa rõ và thay bằng ví dụ. Giữ bản giải thích cho Tuần 12.</p>' },
      ],
    },
    8: {
      short: 'Điểm số, cách chọn và temperature', title: 'Điểm số, cách chọn và temperature',
      tagline: 'Temperature thay đổi cách chọn token từ một bộ điểm cố định.',
      checkpointStatement: 'Tôi có thể giải thích temperature thay đổi bước chọn thế nào và vì sao nó không kiểm tra dữ kiện.',
      beats: [
        { html: '<p>Tuần 7 tách bước chấm điểm và chọn. Hình dung bảng điểm cho từ tiếp theo: “cốc” 80%, “ca” 15%, “bát” 5%.</p><p>Luôn chọn từ đứng đầu sẽ cho “cốc”. Bốc từ túi có 80 phiếu “cốc”, 15 phiếu “ca” và 5 phiếu “bát” có thể cho đáp án khác.</p><p><strong>Temperature</strong> điều chỉnh mức ưu tiên các lựa chọn điểm cao khi bốc. Nó không huấn luyện lại mô hình.</p>' },
        { title: 'Phòng thí nghiệm temperature', html: '<p>Thử yêu cầu về dữ kiện, sáng tác và câu hỏi mơ hồ ở temperature thấp rồi cao. Dự đoán loại nào thay đổi nhiều nhất, sau đó tạo nhiều lượt.</p><p>Dùng bảng xếp hạng Tuần 2: yêu cầu có nhiều cách viết tiếp hợp lý có thể cho kết quả đa dạng hơn. Một nhóm lượt ngẫu nhiên không nhất thiết khớp dự đoán.</p>' },
        { title: 'Bảng điểm và túi phiếu', html: '<p>Giữ nguyên một bảng điểm. So sánh việc luôn chọn từ đứng đầu với bốc phiếu trong túi.</p><p>Temperature thấp dồn nhiều phiếu hơn vào lựa chọn đứng đầu; temperature cao chia phiếu đều hơn. Trong mô phỏng này, temperature 0 chọn đáp án đứng đầu.</p><p>Sau khi thêm một token, văn bản đã đổi nên bước tiếp theo có bảng điểm mới.</p>' },
        { title: 'Kiểm tra khả năng lặp lại', html: '<p>Chạy cùng yêu cầu hai lần ở temperature 0, rồi hai lần ở mức cao hơn. So sánh kết quả.</p><p>Bốc ngẫu nhiên vẫn có thể trúng cùng đáp án dù temperature cao. Dịch vụ thật cũng có thể thay đổi ở temperature 0 nếu phép tính hoặc cài đặt khác nhau.</p>' },
        { html: '<p><strong>Điểm số</strong> mô tả các token có thể xuất hiện tiếp. <strong>Giải mã</strong> là quá trình chọn token từ những điểm đó.</p><p><strong>Temperature</strong> thay đổi xác suất dùng khi chọn. Tăng nó có thể làm câu trả lời đa dạng hơn; nó không kiểm tra dữ kiện. Một từ dễ xuất hiện vẫn có thể nằm trong câu sai.</p>' },
        { html: '<p>Giải thích ví dụ túi phiếu bằng lời của bạn. Dự đoán tác động của temperature cao với hai yêu cầu, chạy vài lượt rồi giải thích chỗ không khớp. Vì sao giảm temperature không bảo đảm đúng sự thật? Tuần 9 sẽ thử điều đó.</p>' },
      ],
    },
    9: {
      short: 'Vì sao câu trôi chảy vẫn có thể sai', title: 'Vì sao câu trả lời trôi chảy vẫn có thể sai',
      tagline: 'Một câu nghe hợp lý vẫn có thể sai sự thật.',
      checkpointStatement: 'Tôi có thể phân biệt lặp lại được với đúng sự thật, đề xuất cách kiểm chứng và nêu giới hạn của ví dụ soạn sẵn.',
      beats: [
        { html: '<p>Tuần 8 cho thấy chọn đáp án đứng đầu bỏ được bước bốc ngẫu nhiên. Như vậy có làm đáp án đúng không?</p><p>Bài bên dưới có một tiểu sử sai được soạn sẵn. Chạy hai lần. Nó lặp lại y hệt vì văn bản đã được viết trước.</p><p>Điều này minh họa rằng lặp lại được và đúng sự thật là hai chuyện khác nhau. Nó không đo tần suất mô hình thật mắc lỗi; mô hình thật có thể từ chối hoặc sửa giả định sai trong câu hỏi.</p>' },
        { title: 'Kiểm tra câu trả lời trôi chảy', html: '<p>So sánh tiểu sử, trích dẫn và chi tiết lịch sử soạn sẵn với ví dụ đúng. Ghi xem câu trả lời có lặp lại không và cần bằng chứng gì để kiểm chứng.</p><p>Phân biệt “chúng tôi viết đây là ví dụ hư cấu” với “đã tìm nhưng chưa thấy nguồn”. Chưa tìm thấy nguồn chưa đủ chứng minh một khẳng định sai.</p>' },
        { title: 'Chi tiết nghe hợp lý chưa phải bằng chứng', html: '<p>Ở Tuần 3, “rẻ và đông” chưa cho biết quán có lối vào cho xe lăn không. Đoán chi tiết ấy từ những quán tương tự có thể nghe hợp lý mà vẫn sai.</p><p>Mô hình ngôn ngữ cũng có thể tạo chi tiết quen thuộc khi chưa đủ căn cứ. Cách ví von này mô tả một nguy cơ; không giải thích mọi câu sai hay cho biết dữ liệu huấn luyện chứa gì.</p>' },
        { title: 'Mô tả lỗi trước khi giải thích', html: '<p>Nhớ lại Tuần 6: một câu sai chưa chứng minh ý định. “Nó tạo trích dẫn bịa” mô tả đầu ra. “Nó cố đánh lừa tôi” là khẳng định thêm, cần bằng chứng.</p><p>Viết lại “AI nói dối” thành quan sát cụ thể: “Câu trả lời nêu một bài báo mà tôi chưa kiểm chứng được.” Sau đó nói bạn sẽ kiểm tra gì tiếp.</p>' },
        { title: 'Kiểm tra hiệu chuẩn của máy', html: '<p>Bấm nút hỏi mức tự tin sau ví dụ đúng và ví dụ sai. Cả hai đều hiện cùng lời đảm bảo soạn sẵn.</p><p>Như Tuần 6, lời tự nhận không phải phép đo. Muốn đo hiệu chuẩn của mô hình thật, cần thu nhiều đáp án kèm mức tự tin rồi kiểm tra độ chính xác bằng nguồn độc lập.</p>' },
        { title: 'Kiểm tra thêm ngoài tính nhất quán', html: '<p>Dùng cách kiểm tra ở Tuần 5 cho mô hình trả lời câu hỏi dữ kiện. Thử đổi cách hỏi, cung cấp nguồn đáng tin, hoặc đặt câu hỏi có giả định sai.</p><p>Nói rõ mỗi kết quả hỗ trợ kết luận gì. Giữ nguyên đáp án khi đổi cách hỏi cho thấy tính nhất quán, nhưng câu sai nhất quán vẫn là câu sai.</p>' },
        { html: '<p><strong>Ảo giác</strong> là nội dung được tạo ra nhưng sai hoặc thiếu căn cứ, chẳng hạn trích dẫn bịa. Nó không nhất thiết được nói với giọng tự tin.</p><p>Dự đoán văn bản có thể tạo cả câu đúng lẫn câu sai. Dữ liệu, huấn luyện, ngữ cảnh và công cụ đều ảnh hưởng độ chính xác. Đối chiếu khẳng định quan trọng với bằng chứng ngoài câu trả lời.</p>' },
        { html: '<p>Chọn một ví dụ sai. Giải thích vì sao lặp lại không làm nó đúng, chỉ ra chi tiết thiếu căn cứ và đề xuất cách kiểm tra. Nói rõ bài soạn sẵn này chưa cho biết điều gì về mô hình thật.</p>' },
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
