/* Practical examples for Weeks 7-8. Loaded after language overlays. */
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
      num: 8, id: 'arc3-task', title: 'Thử một việc từ đầu đến cuối',
      html: '<p>Chọn một việc nhỏ: soạn email, tóm tắt cuộc họp, so hai báo giá hoặc kiểm một báo cáo. Bạn có thể dùng lại tình huống trong bài và tự đối chiếu, hoặc thử với công cụ bạn đang dùng.</p><ol><li>Nói rõ ai dùng kết quả, để làm gì và thế nào là đạt.</li><li>Liệt kê thông tin đã có, nguồn cần giữ và điều còn thiếu. Đừng biến chỗ chưa biết thành dữ kiện.</li><li>Chia thành vài bước nếu mỗi bước cần một cách kiểm khác nhau. Ghi điều phải đúng trước khi làm bước tiếp.</li><li>Thử hai trường hợp: một đủ thông tin, một thiếu thông tin quan trọng hoặc có điều kiện thay đổi. Ghi kết quả thực tế, chỗ phải sửa và phần vẫn chưa thử.</li></ol><p>Sau cùng, ghi: đã tạo gì, đã kiểm bằng gì, còn chờ gì và ai làm tiếp. Nếu cần khách đồng ý hoặc người nhận sử dụng thử, ghi đúng phần còn chờ ấy.</p>',
      fields: [
        { label: 'Việc gì, cho ai và thế nào là đạt?', placeholder: 'Tôi cần… để… Kết quả đạt khi…' },
        { label: 'Thông tin, nguồn và điều chưa biết', placeholder: 'Đã có… Nguồn… Còn thiếu…' },
        { label: 'Các bước và cách kiểm trước khi chuyển tiếp', placeholder: '1… Kiểm bằng… 2… Chỉ làm tiếp khi…' },
        { label: 'Hai lần thử, chỗ đã sửa và phần còn chờ', placeholder: 'Lần 1… Lần 2 đổi… Kết quả… Đã kiểm… Còn chờ…' },
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
      num: 8, id: 'arc3-task', title: 'Try one task from start to finish',
      html: '<p>Choose a small task: draft an email, summarize a meeting, compare two quotes, or check a report. You can reuse a lesson case and check it yourself, or try your usual AI tool.</p><ol><li>Name the person using the result, its purpose, and what would count as success.</li><li>List the information you have, the sources to preserve, and what is missing. Keep unknowns explicit.</li><li>Split the work when different steps need different checks. State what must be right before each handoff.</li><li>Test two cases: one with enough information and one with an important fact missing or a condition changed. Record what happened, what you revised, and anything not yet tested.</li></ol><p>Finish by recording what was produced, how it was checked, what is pending, and who acts next. A client’s agreement or a user trial may still be needed.</p>',
      fields: [
        { label: 'The task, its user, and what counts as success', placeholder: 'I need… so that… Success means…' },
        { label: 'Information, sources, and unknowns', placeholder: 'Available… Sources… Missing…' },
        { label: 'Steps and checks before each handoff', placeholder: '1… Check with… 2… Continue only when…' },
        { label: 'Two trials, revisions, and what is still pending', placeholder: 'Trial 1… Trial 2 changes… Result… Checked… Pending…' },
      ],
    },
  ]);
})();
