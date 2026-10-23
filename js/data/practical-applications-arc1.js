/* Practical examples for Weeks 1-3. Loaded after language overlays. */
(function () {
  var vi = GM.language.isVietnamese();
  GM.addApplications(vi ? [
    {
      num: 1, title: 'Email “chuyên nghiệp hơn”',
      html: '<p><strong>Tình huống:</strong> Bạn bảo AI: “Viết email này chuyên nghiệp hơn.” Nhưng email xin lỗi khách hàng và email nhắc đồng nghiệp phải viết khác nhau.</p><p><strong>Thử:</strong> nói rõ người đọc là ai, mục đích của email, người đọc cần làm gì tiếp theo và điều gì không được hứa.</p>',
      fields: [
        { label: 'Một yêu cầu còn mơ hồ của bạn là gì?', placeholder: 'Ví dụ: Viết email này chuyên nghiệp hơn…' },
        { label: 'Thêm những chi tiết nào thì AI sẽ bớt phải đoán?', placeholder: 'Người đọc… Mục đích… Điều cần tránh…' },
      ],
    },
    {
      num: 2, title: 'Hỏi gì trước khi mở ca sáng?',
      html: '<p><strong>Tình huống giả:</strong> Một tiệm nước đang cân nhắc mở thêm ca 7–10 giờ sáng. Chủ tiệm biết doanh thu cả ngày, nhưng chưa tách doanh thu theo giờ. AI gợi ý hỏi về màu biển hiệu, số khách buổi sáng, chi phí thuê người và món bán chạy.</p><p><strong>Thử:</strong> nếu chỉ được hỏi một điều trước, bạn hỏi gì để quyết định có nên thử mở ca sáng? Nói rõ câu trả lời nào khiến bạn mở, câu nào khiến bạn hoãn. Không có một câu hỏi luôn đúng: điều quan trọng là nó có thể làm quyết định thay đổi.</p>',
      fields: [
        { label: 'Bạn sẽ hỏi điều gì trước? Vì sao?', placeholder: 'Tôi cần biết… vì nếu… thì tôi sẽ…' },
        { label: 'Một quyết định trong việc của bạn và câu hỏi có thể làm bạn đổi ý', placeholder: 'Tôi đang cân nhắc… Nếu biết… thì…' },
      ],
    },
    {
      num: 3, title: '“Viết một bài hay”',
      html: '<p><strong>Tình huống:</strong> Hai cách mở bài về AI trong cuộc họp:</p><blockquote>A. “Họp xong, Lan dùng AI gom các việc cần làm, rồi kiểm lại từng mục với biên bản.”<br>B. “Một giờ họp thường để lại cả trang ghi chép. Lan thử nhờ AI rút xuống thành danh sách việc cần làm.”</blockquote><p>Viết cho đồng nghiệp thì bạn chọn câu nào? Viết bài kể trải nghiệm thì sao? Vì sao?</p><p><strong>Thử:</strong> tìm hai bài bạn thích và một bài chưa đạt, cùng thể loại với bài bạn muốn viết. So cách mở, dẫn chứng và cách nối ý. Ghi ra ba tiêu chí rồi nhờ AI viết thử về chủ đề mới. Bản nháp đạt tiêu chí nào, thiếu tiêu chí nào? Kiểm tra dẫn chứng trước khi dùng.</p>',
      fields: [
        { label: 'Câu nào hợp với người đọc nào? Vì sao?', placeholder: 'Với đồng nghiệp tôi chọn… vì…' },
        { label: 'Ba tiêu chí cho bài bạn muốn viết', placeholder: 'Bài viết cần…' },
        { label: 'Bộ tiêu chí này chưa đánh giá được điều gì?', placeholder: 'Nó chưa đánh giá được…' },
      ],
    },
  ] : [
    {
      num: 1, title: '“Make this email more professional”',
      html: '<p><strong>Situation:</strong> AI receives “Make this email more professional.” A customer apology and a reminder to a colleague need different writing.</p><p><strong>Do:</strong> specify the reader, purpose, desired action, and promises to avoid.</p>',
      fields: [
        { label: 'One request of yours that is still vague', placeholder: 'For example: Make this email more professional…' },
        { label: 'Which three facts would narrow the plausible answers?', placeholder: 'Reader… Purpose… Constraint…' },
      ],
    },
    {
      num: 2, title: 'What should you ask before opening a morning shift?',
      html: '<p><strong>Fictional situation:</strong> A drink shop is considering opening from 7 to 10 a.m. The owner knows daily revenue but not revenue by hour. AI suggests asking about the sign color, morning customers, staffing cost, and best-selling drinks.</p><p><strong>Do:</strong> if you can ask one question first, which answer could change the decision to try a morning shift? Say which answer would make you open and which would make you wait. No question is always best; what matters is whether its answer could change your decision.</p>',
      fields: [
        { label: 'What would you ask first, and why?', placeholder: 'I need to know… because if… then I would…' },
        { label: 'One decision at work and a question that could change your mind', placeholder: 'I am considering… If I knew… then…' },
      ],
    },
    {
      num: 3, title: '“Write a good article”',
      html: '<p><strong>Situation:</strong> Two openings for an article about AI in meetings:</p><blockquote>A. “After the meeting, Lan used AI to list the action items, then checked each one against the minutes.”<br>B. “An hour-long meeting often leaves pages of notes. Lan tried using AI to turn them into an action list.”</blockquote><p>Which would you use in a guide for colleagues? What about a personal story? Why?</p><p><strong>Do:</strong> find two pieces you like and one that falls short, all in the genre you want to write. Compare their openings, evidence, and transitions. Write three criteria and ask AI to draft a new topic. Which criteria does the draft meet or miss? Verify its evidence before using it.</p>',
      fields: [
        { label: 'Which opening fits which reader? Why?', placeholder: 'For colleagues, I would choose… because…' },
        { label: 'Three criteria for the article you want', placeholder: 'The article should…' },
        { label: 'What does this quality model leave out?', placeholder: 'It still cannot judge…' },
      ],
    },
  ]);
})();
