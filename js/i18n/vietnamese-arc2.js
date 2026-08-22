/* Vietnamese reader-first reconstruction for Arc 2. Loaded after English data. */
(function () {
  if (!GM.language.isVietnamese()) return;

  Object.assign(GM.arcs.find(function (arc) { return arc.id === 2; }), {
    name: 'Chặng 2 — Kiểm tra một khẳng định về hiểu biết',
    shortName: 'Chặng 2 · Biết',
    claim: 'Một câu trả lời đúng chưa cho biết nó được tạo ra bằng cách nào. Chặng này hướng dẫn cách kiểm tra một tuyên bố về hiểu biết và cách nói rõ giới hạn của từng phép thử.',
  });

  var weeks = {
    4: {
      short: 'Kiểm tra trí nhớ, mẫu và quy tắc', title: 'Kiểm tra trí nhớ, mẫu và quy tắc',
      tagline: 'Cùng một đáp án có thể đến từ trí nhớ, mẫu quen thuộc hoặc một quy tắc.',
      checkpointStatement: 'Tôi có thể thiết kế một phép thử đơn giản để phân biệt người học thuộc với người nắm quy tắc — và nói điều phép thử vẫn chưa loại trừ được.',
      beats: [
        { html: '<p>Hai học sinh đều trả lời “56” cho 7×8. Một em học thuộc bảng cửu chương; một em biết nhân. <em>Đáp án hoàn toàn giống nhau.</em> Chỉ nhìn câu trả lời không cho bạn biết gì.</p><p><strong>Câu hỏi nào sẽ phơi bày khác biệt?</strong> Hãy viết một câu trước khi tiếp tục. (Gợi ý: nó không nằm trong bảng cửu chương.)</p>' },
        { title: 'Trò suy ra quy tắc', html: '<p>Cỗ máy bên dưới có một quy tắc bí mật cho dãy ba số. Hãy thăm dò: nhập bộ ba bất kỳ, máy cho biết bộ đó có hợp quy tắc không. Khi đủ tin chắc, hãy chốt dự đoán về quy tắc.</p><p>Cảnh báo công bằng: trò này từng làm nhiều thế hệ người tự tin phải bối rối. Cái bẫy không nằm ở quy tắc — mà ở cách bạn kiểm tra.</p>' },
        { title: 'Thiết kế phép thăm dò', html: '<div class="card"><p>Ai đó nói: <em>“người này biết hóa học.”</em> Hãy thiết kế ba câu hỏi có sức phân biệt tăng dần:</p><ol><li>câu người <strong>học thuộc</strong> trả lời được,</li><li>câu người <strong>khớp mẫu</strong> trả lời được (bài quen, số mới),</li><li>câu chỉ người <strong>thấu hiểu</strong> làm được (tình huống mới phải <em>áp dụng</em> quy tắc).</li></ol><p>Rồi đến câu khó chịu: câu thứ ba có phải lúc nào cũng tồn tại? Với kỹ năng nào, hành vi một mình không bao giờ tách hẳn được ba trường hợp? Hãy giữ câu trả lời — Tuần 5 biến nó thành một kỷ luật.</p></div>' },
        { html: '<p><strong>Khái quát hóa</strong> là áp dụng điều đã học vào trường hợp mới. Trường hợp mới giúp phân biệt việc nhớ đáp án với việc dùng được quy tắc.</p><p><strong>Nội suy</strong> là xử lý ví dụ nằm trong vùng quen thuộc. <strong>Ngoại suy</strong> là đi ra ngoài vùng đó.</p><p>Không có bài kiểm tra hành vi ngắn nào chứng minh chắc chắn rằng ai đó hiểu. Họ có thể đã học chính dạng bài kiểm tra. Kết quả tốt làm ta tin hơn, nhưng không loại bỏ mọi cách giải thích khác.</p>' },
        { html: '<p>Chọn một kỹ năng bạn biết rõ. Thiết kế phép thăm dò ba câu, rồi hoàn tất câu: “ngay cả khi vượt qua cả ba, phép thử này vẫn không loại trừ được ___.”</p>' },
      ],
    },
    5: {
      short: 'Hành vi cho biết được gì', title: 'Hành vi cho biết được và không cho biết được gì',
      tagline: 'Phép đối chứng tốt giúp phân biệt hai cách giải thích cho cùng một hành vi.',
      checkpointStatement: 'Tôi có thể nói vì sao đầu ra lưu loát một mình không giải quyết được câu “nó có hiểu không”, và nêu một phép thử mạnh hơn cho trường hợp mình chọn.',
      beats: [
        { title: 'Chú ngựa Hans thông minh', html: '<p>Berlin, khoảng năm 1904. Một con ngựa tên Hans trả lời câu hỏi số học trước đám đông bằng cách gõ móng rồi dừng ở con số đúng. Chủ ngựa tin rằng Hans biết làm toán; các cuộc điều tra ban đầu cũng không tìm thấy gian lận.</p><p>Nhà tâm lý Oskar von Pfungst thay đổi hai điều. Ông cho người không biết đáp án đặt câu hỏi, rồi che để Hans không nhìn thấy người hỏi. Khi đó Hans không còn trả lời đúng. Hóa ra con ngựa nhận ra những cử động rất nhỏ của con người khi số lần gõ tiến gần đáp án.</p><p>Hans phản ứng rất giỏi với tín hiệu của người hỏi, nhưng không làm phép tính. Bằng chứng quyết định đến từ việc thay đổi ai biết đáp án và con ngựa nhìn thấy gì. Đó là <strong>phép đối chứng</strong>.</p>' },
        { title: 'Câu chuyện ELIZA', html: '<div class="card"><p>Năm 1966, Joseph Weizenbaum tạo ELIZA bằng vài thủ thuật phản chiếu — biến “tôi là X” thành “vì sao bạn là X?”, thêm “hãy kể thêm”. Người dùng tâm sự với nó. Có người khăng khăng nó hiểu mình. Thư ký của Weizenbaum còn đề nghị ông ra ngoài để cô nói chuyện riêng — <em>dù cô biết nó hoạt động ra sao</em>.</p><p>Thảo luận: thôi thúc quy tâm trí nằm trong <strong>chúng ta</strong>, và biết thủ thuật cũng chưa vô hiệu hóa nó. Lần gần nhất bạn có cảm giác ấy là khi nào? Với thú cưng, xe hơi hay chatbot?</p></div>' },
        { title: 'Phổ quy gán', html: '<div class="card"><p>Đi dọc chiếc thang: <strong>bộ điều nhiệt → cây cảnh → chó → trẻ sơ sinh → người lớn → chatbot</strong>.</p><p>Với mỗi trường hợp, ta thoải mái nói nó “biết” điều gì? (“Bộ điều nhiệt biết phòng đang lạnh” — bạn phản đối chứ?) Bằng chứng hành vi nào tạo ra sự thoải mái ấy? Ở bậc nào từ ngữ bắt đầu chao đảo? Hãy đánh dấu đúng bậc khiến bạn do dự — chính sự do dự đó là chủ đề khóa học.</p></div>' },
        { title: 'Trò quy gán', html: '<p>Bài tập cốt lõi của cả khóa học. Bên dưới là các đoạn hành vi — có người, có máy, có thí nghiệm động vật. Nguồn được giấu. Với mỗi đoạn, hãy lập luận <em>ủng hộ</em> và <em>phản đối</em> câu “nó hiểu”, đưa ra phán đoán, rồi xem nguồn và — quan trọng nhất — phép thử bổ sung nào thật sự làm thay đổi kết luận.</p>' },
        { html: '<p><strong>Hành vi chưa cho biết duy nhất nguyên nhân.</strong> Nhiều cơ chế khác nhau có thể tạo ra cùng một kết quả quan sát được.</p><p><strong>Câu trả lời trôi chảy là một bằng chứng, nhưng riêng nó chưa đủ.</strong> Con người rất dễ gán hiểu biết hoặc ý định cho sự vật.</p><p><strong>Tuyên bố “hiểu” cần đi kèm phép thử.</strong> Cách làm hữu ích là thiết kế đối chứng để phân biệt các cách giải thích đang cạnh tranh.</p>' },
        { html: '<p>Chọn một hệ thống bạn tương tác (ứng dụng, động vật, kỹ năng của một người). Nêu điều mọi người thường nói nó “biết”, rồi thiết kế đối chứng kiểu von Pfungst để kiểm tra. Mỗi kết quả sẽ cho thấy gì?</p>' },
      ],
    },
    6: {
      short: 'Đo mức tự tin', title: 'Đo mức tự tin',
      tagline: 'So sánh mức tin chắc bạn đã nêu với tỷ lệ trả lời đúng.',
      checkpointStatement: 'Tôi có bản ghi đo được về độ hiệu chuẩn của mình, có thể định nghĩa sự tự tin sai và nói vì sao nó tệ hơn việc thừa nhận không biết.',
      beats: [
        { html: '<p>Trước mọi giải thích, hãy làm bài trắc nghiệm bên dưới. Mỗi câu có đáp án số. Với từng câu, đưa ra một khoảng mà bạn <strong>tin chắc 90%</strong> là chứa giá trị đúng. Hãy để khoảng rộng đúng mức bạn thật sự cần.</p><p>Người hiệu chuẩn hoàn hảo sẽ sai khoảng một trên mười. Gần như ai cũng sai bốn câu trở lên. Hãy thử xem.</p>' },
        { title: 'Vòng hiệu chuẩn lại', html: '<p>Giờ đã thấy kết quả: câu hỏi mới, nhiệm vụ cũ. Mở rộng khoảng cho đến khi thành thật. Hãy cảm nhận sự <em>khó chịu</em> của bất định chân thật — những khoảng rộng đến mức ngượng ngùng thường mới gần đúng.</p>' },
        { title: 'Luyện nói “tôi không biết”', html: '<div class="card"><p>Cùng bạn học (hoặc tự viết): lần lượt hỏi từ điều có thể biết đến không thể biết — “thủ đô Australia là gì?”, “40 ngày nữa thời tiết thế nào?”, “bài hát yêu thích của bà tôi là gì?” Luyện ba mức trả lời thành thật:</p><ul><li>“Tôi biết: X.”</li><li>“Tôi đoán X, nhưng cơ sở yếu.”</li><li>“Tôi không có cơ sở để trả lời.”</li></ul><p>Để ý câu nào miệng bạn ngại nói. Trả lời lưu loát, tự tin là chế độ <em>dễ</em>; trả lời có hiệu chuẩn mới là kỹ năng.</p></div>' },
        { title: 'Nói nhảm và nói dối', html: '<div class="card"><p>Một phân biệt của triết gia Harry Frankfurt, nói đơn giản: người <strong>nói dối</strong> theo dõi sự thật rất kỹ — để né nó. Người <strong>nói nhảm bất chấp thật sai</strong> nói mà không quan tâm lời mình có đúng không; sự thật không phải biến số họ tối ưu.</p><p>Thảo luận: trong vai trò cố vấn, ai nguy hiểm hơn — người nói dối bạn hay người không quan tâm? Vì sao?</p><p class="plant-note">Gieo mầm cho Tuần 9: chính phân biệt này sẽ quay lại với cỗ máy. Tiết lộ trước: cỗ máy không hề nói dối.</p></div>' },
        { html: '<p><strong>Hiệu chuẩn</strong> là mức khớp giữa độ tin chắc đã nêu và độ chính xác thực tế. Bài kiểm tra vừa cho bạn một lần đo.</p><p><strong>Sai nhưng rất tự tin</strong> nguy hiểm vì người nghe nhận cả thông tin sai lẫn một lý do sai để tin vào nó. Câu “tôi không biết” vẫn để lộ phần chưa chắc chắn.</p><p><strong>Hiệu chuẩn cần luyện tập.</strong> Hãy đối chiếu dự đoán với kết quả rồi điều chỉnh mức tự tin ở lần sau.</p>' },
        { html: '<p>Kết quả trắc nghiệm phía trên được lưu trên thiết bị. Hãy nói thành tiếng tỷ lệ trúng, rồi định nghĩa “sự tự tin sai” cho một người ngoài cuộc tưởng tượng và giải thích vì sao nó tệ hơn “tôi không biết”.</p>' },
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
