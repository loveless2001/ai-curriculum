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
      checkpointStatement: 'Tôi có thể kể lại toàn bộ vòng huấn luyện bằng lời thường lẫn từ vựng chính thức, và đọc từ điển hai cột như vốn hiểu biết của chính mình.',
      beats: [
        { html: '<p>Tuần 7 nói rằng mô hình được <em>“điều chỉnh trên lượng văn bản khổng lồ cho đến khi mức bất ngờ giảm xuống.”</em></p><p>Điều chỉnh <strong>bằng cách nào</strong>? Bên trong có hàng tỷ con số và không lập trình viên nào đặt từng số bằng tay. Không ai có thể. Vậy thứ gì thực hiện việc điều chỉnh?</p>' },
        { title: 'Màn bật mí thuật ngữ', html: '<p>Bạn đã dùng những ý này bằng lời thường. Hãy mở tên kỹ thuật tương ứng của từng ý:</p>' },
        { title: 'Kể lại vòng huấn luyện', html: '<div class="card"><p>Toàn bộ vòng lặp có năm bước:</p><ol><li><strong>Cho mô hình xem</strong> một đoạn văn bản thật.</li><li><strong>Đoán:</strong> mô hình dự đoán token tiếp theo ở mỗi vị trí.</li><li><strong>Đo sai số:</strong> dự đoán lệch bao nhiêu? (<em>loss, cross-entropy</em>)</li><li><strong>Điều chỉnh:</strong> đổi các con số bên trong một lượng nhỏ theo hướng làm loss giảm.</li><li><strong>Lặp lại</strong> rất nhiều lần.</li></ol><p>Bước 4 gọi là <strong>gradient descent</strong>. Quá trình huấn luyện ước tính thay đổi nhỏ nào sẽ làm loss giảm, áp dụng thay đổi đó rồi lặp lại.</p></div>' },
        { title: 'Tự tay chạy vòng lặp', html: '<p>Đây là đồ thị đầu tiên của khóa học. Bên dưới là một “mô hình” chỉ có <strong>một</strong> con số điều chỉnh được, và độ bất ngờ được vẽ theo con số ấy. Tự huấn luyện: cảm nhận độ dốc, bước xuống, lặp lại. Chỉ cần số học — và thật sự là cùng vòng lặp, chỉ với một số thay vì hàng tỷ.</p>' },
        { title: 'Vì sao cả lĩnh vực đặt cược vào cách này', html: '<div class="card"><p>Một dữ kiện chiến lược: nhiều văn bản hơn, nhiều tham số hơn, nhiều năng lực tính toán hơn → mức bất ngờ giảm một cách đáng tin cậy. Mức cải thiện còn <em>dự đoán được</em> — đủ để vẽ thành đường thẳng trên trục thích hợp <em>trước khi xây mô hình tiếp theo</em> (các <strong>quy luật tỷ lệ</strong>).</p><p>Chính tính dự đoán này — không phải một ý tưởng khéo léo riêng lẻ — khiến lĩnh vực dồn lực vào quy mô. Người ta có thể mua năng lực với độ tin cậy của một đường đã vẽ.</p></div>' },
        { html: '<p>Hôm nay nhịp gọi tên <em>chính là</em> màn bật mí. Từ đây khóa học dùng hai vốn từ thay thế cho nhau — và bạn cũng vậy. <a href="#/dictionary">Từ điển hai cột</a> đã được mở khóa trong thanh bên.</p>' },
        { html: '<p>Kể vòng huấn luyện hai lần — một lần bằng lời thường (cho xem, đoán, bất ngờ, đẩy nhẹ), một lần bằng từ chính thức (token, dự đoán, loss, gradient descent). Nếu có từ nào bạn không giải thích được, hãy quay lại một tuần.</p>' },
      ],
    },
    11: {
      short: 'Attention và các mạch bên trong', title: 'Attention và các mạch bên trong',
      tagline: 'Cơ chế bên trong khó nghiên cứu, nhưng một số cơ chế có thể được kiểm tra trực tiếp.',
      checkpointStatement: 'Tôi có thể mô tả attention trong một câu mà không dùng từ ngữ tâm trí, và kể lại một cơ chế cụ thể đã được tìm thấy trong mô hình thật.',
      beats: [
        { html: '<blockquote>“Chìa khóa ở trên bàn cạnh đèn; đưa ___ cho tôi.”</blockquote><p>Thứ đoán từng từ nên điền “chúng”. Nhưng “chúng” chỉ <em>chìa khóa</em> — cách đó chín từ. <strong>Làm sao bộ đoán từng từ biết từ nào trước đó quan trọng ngay lúc này?</strong> Bên trong phải có thứ quyết định.</p>' },
        { title: 'Trình trực quan hóa mức liên quan', html: '<p>Ở mỗi bước, mô hình tính mức liên quan của các token trước đó với token hiện tại rồi kết hợp thông tin theo các trọng số ấy. Nhấp vào một từ để xem kết quả tính.</p><p>Đây không phải “sự tập trung” của con người. Nó là một phép tính số diễn ra ở mỗi bước, nên ta có thể hiển thị và kiểm tra kết quả.</p>' },
        { title: 'Một mạch thật từ đầu đến cuối: induction head', html: '<p>Mô hình học một mẫu sao chép: <span class="mono">…A B … A → đoán B</span>. Nếu trước đó văn bản có “Blicket Farnsworth”, lần sau “Blicket” xuất hiện nó đoán “Farnsworth” — kể cả tên vừa được bịa ra và không thể có trong dữ liệu huấn luyện. Hãy tự tái tạo hành vi:</p>' },
        { title: 'Sau đó các nhà nghiên cứu tìm thấy gì', html: '<div class="card"><p>Đây là lý do mẫu nhỏ này nổi tiếng. Các nhà nghiên cứu không chỉ quan sát hành vi — họ <strong>xác định các thành phần bên trong cụ thể thực hiện nó</strong> (đặt biệt danh <em>induction head</em>), quan sát chúng hình thành trong huấn luyện, và thấy khả năng sao chép mẫu xuất hiện cùng lúc.</p><p>Kết luận thận trọng: chiếc hộp mặc định khó nhìn nhưng <em>không bị niêm phong</em>. Cơ chế có thể được tìm, lần theo và kiểm tra. Công việc này — <strong>khả năng diễn giải</strong> — còn trẻ, và phần lớn chiếc hộp chưa được lập bản đồ. Cả “ta hiểu mọi thứ bên trong” lẫn “đó là hộp đen không thể biết” đều sai.</p></div>' },
        { html: '<p><strong>Attention</strong> tính mức ảnh hưởng của thông tin từ các token trước lên token hiện tại.</p><p><strong>Mạch</strong> là một nhóm thành phần bên trong được cho là thực hiện một chức năng cụ thể. Nhà nghiên cứu kiểm tra giả thuyết đó bằng cách quan sát và can thiệp vào các thành phần.</p>' },
        { html: '<p>Hai câu nói thành tiếng: (1) mô tả attention không dùng từ ngữ tâm trí; (2) kể câu chuyện induction head — hành vi và việc người ta tìm thấy, quan sát các thành phần cụ thể hình thành.</p>' },
      ],
    },
    12: {
      short: 'Từ bộ dự đoán văn bản đến chatbot', title: 'Từ bộ dự đoán văn bản đến chatbot',
      tagline: 'Huấn luyện bổ sung biến bộ dự đoán văn bản thành sản phẩm có cách trả lời như trợ lý.',
      checkpointStatement: 'Bài viết 500 từ của tôi vượt hai phép thử: người ngoài học được điều gì đó, và người có chuyên môn không tìm thấy lỗi cần sửa.',
      beats: [
        { html: '<p>Đối tượng ở Tuần 7–9 dự đoán văn bản có khả năng xuất hiện. Nhưng phần tiếp nối <em>có khả năng</em> của câu “Làm sao xin sếp tăng lương?” trên internet thô có thể là lời đáp của người dùng diễn đàn khác — hoặc danh sách mười câu hỏi tương tự.</p><p><strong>Vì sao chatbot lại trả lời hữu ích bằng một giọng nhất quán?</strong> Có điều gì đó xảy ra giữa bộ dự đoán và sản phẩm.</p>' },
        { title: 'Toàn bộ quy trình điều chỉnh trong một hình', html: '<div class="card"><p style="font-family:var(--font-mono);font-size:.85rem;text-align:center;line-height:2">bộ dự đoán nền<br>↓ &nbsp;học từ ví dụ trả lời theo kiểu trợ lý <em>(instruction tuning)</em><br>↓ &nbsp;được điều chỉnh bằng lựa chọn của con người giữa các câu trả lời <em>(RLHF, phần này chỉ giới thiệu tên)</em><br>chatbot</p><p>Cách trả lời của trợ lý đến từ quá trình huấn luyện và chỉ dẫn của sản phẩm. Những câu như “trợ lý trung thực” hay “trợ lý thận trọng” vẫn cần phép thử hành vi, như đã học ở Tuần 5.</p></div>' },
        { title: 'Tiền tuyến, được ghi rõ là vùng đang chuyển động', html: '<div class="card"><p><strong>Mô hình suy luận:</strong> hệ thống được huấn luyện để tạo bước làm trung gian trước khi trả lời (<em>tính toán lúc chạy</em>). Điều này nối với Tuần 4: có bài cần giấy nháp; đoán một lần từng từ có những bức tường mà vết giải từng bước vượt qua.</p><p><strong>Tranh luận còn sống, không phải sự thật đã chốt:</strong> bao nhiêu phần của “năng lực nổi lên” là thật và bao nhiêu là giả ảnh đo lường; giới hạn của mô thức dự đoán văn bản ở đâu. Ai nói các câu hỏi này đã ngã ngũ theo một trong hai phía đều đang đi trước bằng chứng.</p></div>' },
        { title: 'Bài tổng kết, phần 1: giải thích một khái niệm', html: '<div class="card"><p>Trước khi viết, hãy giải thích một khái niệm trong khóa học cho bạn bè, đồng nghiệp hoặc người thân. Ghi lại chỗ họ chưa hiểu, ví dụ nào giúp làm rõ và câu hỏi nào bạn chưa trả lời được. Dùng các ghi chú đó để chuẩn bị phần 2.</p></div>' },
        { title: 'Bài tổng kết, phần 2: “LLM là gì và không phải gì”', html: '<p>Sản phẩm cuối và bài thi thật của khóa học: tối đa <strong>500 từ</strong>, cho độc giả phổ thông. Bài đạt khi một người ngoài học được từ nó <em>và</em> người có chuyên môn không tìm thấy lỗi. Bản nháp tự lưu trên thiết bị này.</p>' },
        { title: 'Lối đi tiếp', html: '<div class="card"><p>Dành cho người muốn đi sâu — lộ trình có chú giải:</p><p><strong>Thực hành:</strong> loạt video <em>“Neural Networks: Zero to Hero”</em> của Andrej Karpathy — tự tay xây các bản đồ chơi.</p><p><strong>Trục đọc theo thứ tự:</strong></p><ol style="font-size:.95rem"><li>Vaswani và cộng sự, 2017, <em>Attention Is All You Need</em> — kiến trúc</li><li>Kaplan và cộng sự, 2020 — quy luật tỷ lệ</li><li>Holtzman và cộng sự, 2020 — cách chọn đầu ra</li><li>Ouyang và cộng sự, 2022 — InstructGPT</li><li>Wei và cộng sự, 2022 — chuỗi suy nghĩ</li><li>Schaeffer và cộng sự, 2023 — tranh luận về năng lực nổi lên</li><li>Olsson và cộng sự, 2022 — induction head</li></ol><p><strong>Sau đó:</strong> khả năng diễn giải cơ chế (superposition, sparse autoencoder) và văn liệu về mô hình suy luận — cả hai chuyển động quá nhanh để khóa học đóng thành kinh điển cố định.</p></div>' },
        { html: '<p>Khóa học kết thúc bằng một phương pháp có thể dùng lại: <strong>bắt đầu từ hành vi quan sát được, gắn phép thử vào từng khẳng định, rồi đối chiếu mức tự tin với kết quả.</strong> Hãy dùng phương pháp đó khi các hệ thống hiện nay thay đổi.</p>' },
        { html: '<p>Hãy công bố bài viết: đưa 500 từ cho một người ngoài và, nếu có thể, một độc giả kỹ thuật. Sửa đến khi vượt cả hai phép thử. Đó là bài thi, và không ai chấm ngoài thực tế.</p>' },
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
    { folk: 'bất ngờ', tech: 'loss / cross-entropy', week: 2, where: 'thang độ khó và nhật ký bất ngờ' },
    { folk: 'bản đồ có lược bỏ', tech: 'mô hình / biểu diễn được học / sự nén', week: 3, where: 'cuộc tiếp sức nén' },
    { folk: 'lớp chấm điểm', tech: 'forward pass / phân bố', week: 8, where: 'đóng vai người chấm và người chọn' },
    { folk: 'núm chọn', tech: 'cách chọn đầu ra: temperature, top-p', week: 8, where: 'phòng thí nghiệm núm chọn' },
    { folk: 'học và nhớ lại', tech: 'huấn luyện và suy luận', week: 7, where: 'minh họa cuộc trò chuyện cá vàng' },
    { folk: 'sự tự tin sai', tech: 'lệch hiệu chuẩn / ảo giác', week: 9, where: 'trắc nghiệm hiệu chuẩn và phòng thí nghiệm ảo giác' },
    { folk: 'từ nào trước đó quan trọng', tech: 'attention', week: 11, where: 'trình trực quan hóa mức liên quan' },
  ];
})();
