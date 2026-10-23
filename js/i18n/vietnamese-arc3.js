/* Vietnamese reader-first reconstruction for Arc 3. Loaded after English data. */
(function () {
  if (!GM.language.isVietnamese()) return;

  Object.assign(GM.arcs.find(function (arc) { return arc.id === 3; }), {
    name: 'Chặng 3 — Mô hình ngôn ngữ tạo văn bản như thế nào?',
    shortName: 'Chặng 3 · Mô hình ngôn ngữ',
    claim: 'Bây giờ ta dùng những ý đã học—dự đoán, mức độ chắc chắn và kiểm chứng—để nhìn thẳng vào mô hình ngôn ngữ.',
  });

  var weeks = {
    7: {
      short: 'Mô hình dự đoán văn bản', title: 'Mô hình ngôn ngữ dự đoán văn bản như thế nào?',
      tagline: 'Ở mỗi bước, mô hình chấm điểm những token có thể đứng tiếp theo.',
      checkpointStatement: 'Tôi dùng được một ví dụ để giải thích mô hình dự đoán token ra sao, huấn luyện thay đổi gì và ngữ cảnh chat có vai trò gì.',
      beats: [
        { html: '<p>Quay lại câu ở tuần 1: “Cô ấy rót cà phê vào ___.” Lần này, hãy so đáp án của bạn với bảng điểm mẫu của một mô hình.</p><p><strong>Mô hình ngôn ngữ lớn (LLM)</strong> tính xem phần văn bản nào có khả năng xuất hiện tiếp theo. Mỗi phần như vậy gọi là một <strong>token</strong>; đó có thể là cả từ, một phần của từ hoặc dấu câu.</p><p>Bài này dùng số liệu dựng sẵn để minh họa, không chạy mô hình thật.</p>' },
        { title: 'Người đoán, máy cũng đoán', html: '<p>Hãy tự điền từng chỗ trống trước khi mở bảng điểm. Có một đáp án nổi bật hẳn, hay nhiều đáp án đều nghe hợp lý?</p><p>Các con số trong bài chỉ dùng để minh họa cách so sánh. Chúng không phải kết quả thu từ người học hay từ một mô hình đang chạy.</p>' },
        { title: 'Ngữ cảnh chat không phải là huấn luyện', html: '<p>Nhập một thông tin vào mô phỏng, hỏi lại thông tin đó, rồi mở cuộc trò chuyện mới và hỏi lần nữa.</p><p>Hãy hình dung một học sinh để tờ ghi chú trên bàn. Tờ giấy giúp em trả lời câu hỏi hiện tại, nhưng không làm thay đổi điều em đã học từ trước. Ngữ cảnh chat cũng vậy: nó cung cấp thêm thông tin mà không thay đổi trọng số của mô hình.</p><p>Một số sản phẩm có thể lưu ghi chú hoặc tìm lại nội dung cũ. Đó vẫn không phải là huấn luyện lại mô hình.</p>' },
        { title: 'Thử giải thích trong một phút', html: '<p>Trong 60 giây, hãy giải thích: LLM dự đoán gì, huấn luyện làm thay đổi điều gì, và nội dung cuộc trò chuyện giúp ích ra sao. Bạn có thể dùng ví dụ tờ ghi chú trên bàn.</p>' },
        { html: '<p><strong>Huấn luyện</strong> điều chỉnh các con số bên trong mô hình, gọi là trọng số, dựa trên rất nhiều ví dụ. Khi <strong>sử dụng mô hình</strong>, các trọng số ấy được áp dụng vào văn bản hiện có.</p><p>Để tạo câu trả lời, mô hình lặp lại bốn bước: chấm điểm các token có thể đứng tiếp theo, chọn một token, thêm nó vào văn bản, rồi chấm điểm lại. Tuần 8 đi sâu vào bước chọn; tuần 10 đi sâu vào huấn luyện.</p>' },
        { html: '<p>Hãy thử giải thích cho một người chưa biết về AI. Nếu học một mình, bạn có thể tự ghi âm rồi nghe lại. Chỗ nào nghe khó hiểu, hãy thay bằng một ví dụ cụ thể. Lưu bản này để sửa tiếp ở tuần 12.</p>' },
      ],
    },
    8: {
      short: 'Điểm số, cách chọn và temperature', title: 'Từ điểm số đến token được chọn',
      tagline: 'Temperature làm thay đổi cách mô hình chọn token, chứ không làm mô hình biết thêm sự thật.',
      checkpointStatement: 'Tôi giải thích được temperature ảnh hưởng đến bước chọn token ra sao và vì sao giảm temperature không làm câu trả lời đúng hơn.',
      beats: [
        { html: '<p>Tuần 7 tách hai việc: chấm điểm và chọn. Giả sử token tiếp theo có bảng điểm: “cốc” 80%, “ca” 15%, “bát” 5%.</p><p>Nếu luôn lấy lựa chọn cao nhất, kết quả sẽ là “cốc”. Nếu bốc từ túi có 80 phiếu “cốc”, 15 phiếu “ca” và 5 phiếu “bát”, đôi khi bạn sẽ bốc trúng từ khác.</p><p><strong>Temperature</strong> làm thay đổi mức độ ưu tiên các lựa chọn điểm cao. Nó không huấn luyện lại mô hình.</p>' },
        { title: 'Thử thay đổi temperature', html: '<p>Hãy thử ba kiểu yêu cầu—hỏi dữ kiện, viết sáng tạo và một câu hỏi mơ hồ—ở temperature thấp rồi cao. Trước khi chạy, đoán xem kiểu nào sẽ thay đổi nhiều nhất.</p><p>Yêu cầu có nhiều cách viết tiếp hợp lý thường dễ cho kết quả đa dạng hơn. Tuy vậy, vài lần chạy ngẫu nhiên có thể chưa thể hiện rõ xu hướng.</p>' },
        { title: 'Bảng điểm và túi phiếu', html: '<p>Giữ nguyên bảng điểm rồi so sánh hai cách: luôn lấy lựa chọn cao nhất, hoặc bốc phiếu theo tỷ lệ.</p><p>Temperature thấp làm xác suất tập trung hơn vào các lựa chọn đứng đầu; temperature cao dàn xác suất ra rộng hơn. Trong mô phỏng này, temperature 0 luôn lấy lựa chọn cao nhất.</p><p>Mỗi khi thêm một token, phần văn bản hiện có thay đổi, nên mô hình phải tính một bảng điểm mới cho bước tiếp theo.</p>' },
        { title: 'Cùng một câu hỏi, chạy nhiều lần', html: '<p>Chạy cùng một yêu cầu hai lần ở temperature 0, rồi hai lần ở mức cao hơn. Kết quả khác nhau thế nào?</p><p>Ngay cả khi bốc ngẫu nhiên, hai lượt vẫn có thể tình cờ giống nhau. Ngược lại, dịch vụ thật đôi khi vẫn cho kết quả khác ở temperature 0 vì còn nhiều cài đặt và chi tiết tính toán khác.</p>' },
        { html: '<p><strong>Điểm số</strong> cho biết mô hình đang nghiêng về những token nào. <strong>Giải mã</strong> là cách biến các điểm số ấy thành token được chọn.</p><p><strong>Temperature</strong> chỉ làm thay đổi xác suất khi chọn. Tăng temperature thường khiến câu trả lời đa dạng hơn, nhưng không giúp kiểm tra dữ kiện. Một token rất dễ được chọn vẫn có thể nằm trong một câu sai.</p>' },
        { html: '<p>Hãy giải thích lại ví dụ túi phiếu. Sau đó chọn hai yêu cầu, dự đoán temperature cao sẽ ảnh hưởng ra sao và chạy thử vài lượt. Nếu kết quả không giống dự đoán, điều gì có thể giải thích sự khác biệt?</p><p>Cuối cùng: vì sao hạ temperature không bảo đảm câu trả lời đúng? Tuần 9 sẽ đi tiếp từ câu hỏi này.</p>' },
      ],
    },
    9: {
      short: 'Vì sao câu trôi chảy vẫn có thể sai?', title: 'Vì sao câu trả lời trôi chảy vẫn có thể sai?',
      tagline: 'Nghe hợp lý không có nghĩa là đúng.',
      checkpointStatement: 'Tôi phân biệt được câu trả lời ổn định với câu trả lời đúng, biết cách kiểm chứng và biết ví dụ trong bài chưa chứng minh được điều gì.',
      beats: [
        { html: '<p>Tuần 8 cho thấy ta có thể bỏ bước bốc ngẫu nhiên bằng cách luôn lấy lựa chọn cao nhất. Nhưng làm vậy có khiến câu trả lời đúng hơn không?</p><p>Bài bên dưới có một tiểu sử sai được dựng sẵn. Chạy hai lần, bạn sẽ thấy nó lặp lại y hệt vì văn bản đã được viết trước.</p><p>Ví dụ này chỉ cho thấy một điều: lặp lại ổn định và đúng là hai chuyện khác nhau. Nó không cho biết mô hình thật sai bao nhiêu lần.</p>' },
        { title: 'Kiểm tra một câu trả lời nghe rất ổn', html: '<p>So sánh các ví dụ về tiểu sử, trích dẫn và sự kiện lịch sử. Với mỗi ví dụ, ghi xem câu trả lời có lặp lại không và cần nguồn nào để kiểm chứng.</p><p>“Đây là ví dụ hư cấu do bài học tạo ra” khác với “tôi tìm nhưng chưa thấy nguồn”. Việc chưa tìm thấy nguồn chưa đủ để kết luận một câu chắc chắn sai.</p>' },
        { title: 'Chi tiết nghe hợp lý chưa phải bằng chứng', html: '<p>Ở Tuần 3, “rẻ và đông” chưa cho biết quán có lối vào cho xe lăn không. Đoán chi tiết ấy từ những quán tương tự có thể nghe hợp lý mà vẫn sai.</p><p>Mô hình ngôn ngữ cũng có thể tạo chi tiết quen thuộc khi chưa đủ căn cứ. Cách ví von này mô tả một nguy cơ; không giải thích mọi câu sai hay cho biết dữ liệu huấn luyện chứa gì.</p>' },
        { title: 'Mô tả lỗi trước, giải thích sau', html: '<p>Nhớ lại tuần 6: một câu sai chưa cho ta biết người hay mô hình có ý định gì. “Câu trả lời đưa ra một trích dẫn không có thật” là mô tả điều quan sát được. “Nó cố đánh lừa tôi” là một cách giải thích khác, cần thêm bằng chứng.</p><p>Hãy thay câu “AI nói dối” bằng một mô tả cụ thể hơn, rồi ghi bước kiểm tra tiếp theo.</p>' },
        { title: 'Mô hình tự tin đến đâu?', html: '<p>Sau ví dụ đúng và ví dụ sai, hãy bấm nút hỏi mức độ chắc chắn. Cả hai đều hiện cùng một câu trả lời được dựng sẵn.</p><p>Một câu “tôi rất chắc” tự nó không chứng minh được gì. Muốn biết mô hình có đánh giá đúng độ chắc chắn hay không, ta phải thu nhiều câu trả lời, ghi lại mức tự tin và kiểm tra từng câu bằng nguồn độc lập.</p>' },
        { title: 'Đừng chỉ kiểm tra xem câu trả lời có nhất quán không', html: '<p>Thử đổi cách hỏi, đưa thêm một nguồn đáng tin, hoặc cố tình đặt câu hỏi có giả định sai.</p><p>Trước mỗi phép thử, hãy nói rõ kết quả nào sẽ ủng hộ cách giải thích nào. Việc mô hình lặp lại cùng một đáp án chỉ cho thấy nó nhất quán; một câu sai lặp đi lặp lại vẫn là câu sai.</p>' },
        { html: '<p><strong>Ảo giác</strong> là nội dung được tạo ra nhưng sai hoặc không có căn cứ, chẳng hạn một trích dẫn bịa. Câu trả lời không nhất thiết phải có giọng tự tin mới được coi là ảo giác.</p><p>Mô hình dự đoán văn bản có thể tạo cả câu đúng lẫn câu sai. Dữ liệu, cách huấn luyện, ngữ cảnh và các công cụ đi kèm đều ảnh hưởng đến độ chính xác. Nếu một thông tin quan trọng, hãy kiểm tra nó bằng nguồn bên ngoài.</p>' },
        { html: '<p>Chọn một ví dụ sai. Chỉ ra chi tiết nào chưa có căn cứ, vì sao lặp lại nhiều lần vẫn không làm nó đúng, và bạn sẽ kiểm tra bằng cách nào.</p><p>Cuối cùng, nói rõ ví dụ dựng sẵn này chưa cho ta biết điều gì về một mô hình thật.</p>' },
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
