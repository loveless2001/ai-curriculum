/* Practical examples for Weeks 7-9. Loaded after language overlays. */
(function () {
  var vi = GM.language.isVietnamese();
  GM.addApplications(vi ? [
    {
      num: 7, title: 'Giữ đúng giọng thương hiệu',
      html: '<p><strong>Tình huống:</strong> AI bắt chước được giọng của ba email mẫu trong cuộc trò chuyện hiện tại, nhưng sang cuộc trò chuyện mới thì không còn nhớ các mẫu đó.</p><p><strong>Thử:</strong> tách ba loại thông tin: thứ phải đưa vào mỗi lần, thứ sản phẩm có thể lưu trong bộ nhớ, và thứ cần tìm lại từ kho tài liệu.</p>',
      fields: [
        { label: 'Một việc bạn muốn AI làm nhất quán qua nhiều lần', placeholder: 'Mỗi lần AI cần…' },
        { label: 'Thông tin nào phải đưa vào mỗi lần, và thông tin nào có thể lưu hoặc tìm lại?', placeholder: 'Đưa vào mỗi lần… Lưu lại… Tìm từ tài liệu…' },
      ],
    },
    {
      num: 8, title: 'Tìm ý rồi chọn ý',
      html: '<p><strong>Tình huống:</strong> Khi đặt tên sản phẩm, bạn muốn nhiều ý tưởng khác nhau. Khi sửa một thông báo đã được duyệt, bạn lại muốn câu chữ ít thay đổi.</p><p><strong>Thử:</strong> tách thành hai bước: tạo nhiều phương án, rồi chọn và chỉnh theo tiêu chí. Temperature chỉ ảnh hưởng đến độ đa dạng của các phương án.</p>',
      fields: [
        { label: 'Một việc cần khám phá nhiều phương án', placeholder: 'Tôi muốn nhiều góc/ý tưởng cho…' },
        { label: 'Một việc cần ổn định, và tiêu chí chọn', placeholder: 'Sau khi chọn, kết quả phải giữ…' },
      ],
    },
    {
      num: 9, title: 'Báo cáo công việc: con số nào có nguồn?',
      html: '<p><strong>Ba ghi chú giả:</strong> (G1) Thứ Hai: nhận 12 yêu cầu mới, xử lý 11 trong số đó. (G2) Thứ Ba: nhận 8, xử lý cả 8. (G3) Thứ Tư: nhận 10, xử lý 9 trong số đó.</p><p><strong>AI viết:</strong> “Ba ngày qua nhóm đã xử lý 30 yêu cầu, không còn việc tồn và mức hài lòng của khách tăng 20%.” Đoạn này đọc xuôi tai, nhưng ba ghi chú không nói như vậy.</p><p><strong>Thử:</strong> đánh dấu từng nhận định trong câu AI: đúng, sai hay chưa có dữ liệu. Viết lại báo cáo ngắn, dẫn G1–G3 sau mỗi con số. Nếu muốn nói về mức hài lòng, cần tìm nguồn nào trước?</p><details class="answer-reveal"><summary>Đối chiếu với ghi chú</summary><p>Nhóm <strong>nhận 30</strong> yêu cầu nhưng mới <strong>xử lý 28</strong>; còn 2 yêu cầu mới trong ba ngày này chưa xử lý. Không có dữ liệu nào về mức hài lòng. Viết trôi chảy không thay được việc cộng số và kiểm nguồn.</p></details>',
      fields: [
        { label: 'Viết lại báo cáo ba ngày, có dẫn G1–G3', placeholder: 'Nhóm nhận… (G1–G3), xử lý… (G1–G3)…' },
        { label: 'Một báo cáo trong việc của bạn cần kiểm nguồn nào?', placeholder: 'Với nhận định… tôi sẽ đối chiếu với…' },
      ],
    },
  ] : [
    {
      num: 7, title: 'Keep a consistent brand voice',
      html: '<p><strong>Situation:</strong> AI imitates three example emails in the current chat but loses them in a new one.</p><p><strong>Do:</strong> list what every run needs, what product memory saves, and what retrieval brings back from documents.</p>',
      fields: [
        { label: 'One task you want AI to perform consistently', placeholder: 'Each time, the AI needs to…' },
        { label: 'What belongs in context, and what could be saved or retrieved?', placeholder: 'Context… Memory or retrieval…' },
      ],
    },
    {
      num: 8, title: 'Generate options, then choose',
      html: '<p><strong>Situation:</strong> product naming benefits from variety; editing an approved notice needs stability.</p><p><strong>Do:</strong> separate generation from selection and revision against criteria. Temperature affects variety, not the criteria.</p>',
      fields: [
        { label: 'One task that benefits from varied options', placeholder: 'I want many angles or ideas for…' },
        { label: 'One task that needs stability, plus its selection criteria', placeholder: 'After selection, the result must preserve…' },
      ],
    },
    {
      num: 9, title: 'Work report: which numbers have a source?',
      html: '<p><strong>Three fictional notes:</strong> (N1) Monday: 12 new requests received, 11 of those resolved. (N2) Tuesday: 8 received, all 8 resolved. (N3) Wednesday: 10 received, 9 of those resolved.</p><p><strong>AI writes:</strong> “Over three days the team resolved 30 requests, has no work left open, and raised customer satisfaction by 20%.” It reads smoothly, but the notes say otherwise.</p><p><strong>Do:</strong> mark each claim as correct, wrong, or unsupported. Rewrite the short report and cite N1–N3 for each number. What source would you need before saying anything about satisfaction?</p><details class="answer-reveal"><summary>Check against the notes</summary><p>The team <strong>received 30</strong> requests but <strong>resolved 28</strong>; 2 new requests from these three days remain open. The notes say nothing about customer satisfaction. Fluent wording cannot replace arithmetic or a source check.</p></details>',
      fields: [
        { label: 'Rewrite the three-day report with references to N1–N3', placeholder: 'The team received… (N1–N3), resolved… (N1–N3)…' },
        { label: 'Which source would you check for a report in your work?', placeholder: 'For the claim… I would check…' },
      ],
    },
  ]);
})();
