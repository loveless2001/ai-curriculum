/* Practical examples for Weeks 4-6. Loaded after language overlays. */
(function () {
  var vi = GM.language.isVietnamese();
  GM.addApplications(vi ? [
    {
      num: 4, title: 'Dùng lại quy trình cho nhân viên làm từ xa',
      html: '<p><strong>Quy trình cũ:</strong> Nhân viên mới đến văn phòng. Nhóm (1) cấp tài khoản, (2) gửi lịch tuần đầu, (3) để người cũ ngồi cạnh hướng dẫn xử lý một đơn hàng và (4) cho nhân viên ký nhận máy tại văn phòng.</p><p><strong>Tình huống mới:</strong> Người tiếp theo làm từ xa. Bước nào vẫn dùng được, bước nào phải đổi? Còn thiếu thông tin gì về máy, quyền truy cập hoặc cách hướng dẫn?</p><p><strong>Thử:</strong> viết lại quy trình cho trường hợp mới. Sau đó giả sử người này dùng máy cá nhân: quy trình cần đổi thêm ở đâu? Đừng chỉ thay chữ “văn phòng” bằng “trực tuyến”.</p>',
      fields: [
        { label: 'Với quy trình mẫu, bạn giữ, đổi và thêm những gì?', placeholder: 'Giữ… Đổi… Cần biết thêm…' },
        { label: 'Một quy trình trong việc của bạn có thể gặp trường hợp mới', placeholder: 'Quy trình hiện tại… Nếu tình huống đổi thành… thì…' },
      ],
    },
    {
      num: 5, title: 'Vì sao bản tóm tắt trở nên tốt hơn?',
      html: '<p><strong>Ghi chú cuộc họp (giả):</strong> Lan gửi bản demo cho khách trước thứ Sáu. Huy kiểm lại bảng giá trước thứ Năm. Nhóm chưa quyết định có giảm giá hay không.</p><p><strong>Bản AI đầu tiên:</strong> “Nhóm sẽ gửi demo và giảm giá cho khách.” Bản này bỏ mất người làm, hạn chót và biến việc chưa quyết thành việc đã chốt.</p><p>Lần sau, bạn vừa đưa một bản tóm tắt mẫu của cuộc họp khác, vừa dặn AI ghi từng việc kèm người làm và hạn chót. Bản mới tốt hơn. Là nhờ bài mẫu hay lời dặn?</p><p><strong>Thử:</strong> dùng cùng biên bản để chạy hai lần riêng: một lần chỉ thêm bài mẫu, một lần chỉ thêm lời dặn. So với ghi chú gốc: có đủ việc, đúng người, đúng hạn và không tự thêm quyết định chưa có không? Nếu chưa dùng chatbot, xem hai kết quả giả định bên dưới.</p><details class="answer-reveal"><summary>Hai kết quả giả định để so</summary><p><strong>Chỉ thêm bài mẫu:</strong> “Gửi demo trước thứ Sáu; kiểm bảng giá trước thứ Năm.” Đúng việc và hạn nhưng thiếu người làm.</p><p><strong>Chỉ thêm lời dặn:</strong> “Lan gửi demo trước thứ Sáu. Huy kiểm bảng giá trước thứ Năm. Chưa có quyết định giảm giá.” Bản này đủ hơn trong ví dụ này; một cuộc họp chưa chứng minh lời dặn luôn tốt hơn bài mẫu.</p></details>',
      fields: [
        { label: 'Bản đầu sai hoặc thiếu điều gì so với ghi chú gốc?', placeholder: 'Thiếu…; nói sai rằng…' },
        { label: 'Bạn sẽ thử tách tác dụng của bài mẫu và lời dặn thế nào?', placeholder: 'Giữ nguyên biên bản. Lượt A chỉ thêm… Lượt B chỉ thêm…' },
        { label: 'Nếu ra hai kết quả giả định trên, bạn kết luận được gì?', placeholder: 'Với cuộc họp này… nhưng chưa thể nói…' },
      ],
    },
    {
      num: 6, title: 'So sánh hai nhà cung cấp',
      html: '<p><strong>Tình huống:</strong> Bản so sánh hai nhà cung cấp đang trộn lẫn dữ kiện từ báo giá, suy đoán từ website và những nhận định không có nguồn.</p><p><strong>Thử:</strong> đánh dấu từng nhận định là “có bằng chứng”, “suy đoán” hoặc “chưa biết”, rồi ghi rõ phần nào cần kiểm tra thêm.</p>',
      fields: [
        { label: 'Một nhận định có thể ảnh hưởng đến quyết định', placeholder: 'Ví dụ: Nhà cung cấp A triển khai nhanh hơn…' },
        { label: 'Bạn có bằng chứng gì, chắc đến đâu và còn phải kiểm tra gì?', placeholder: 'Tôi biết… Tôi đoán… Tôi chưa biết…' },
      ],
    },
  ] : [
    {
      num: 4, title: 'Reuse an onboarding process for a remote hire',
      html: '<p><strong>Old process:</strong> A new employee comes to the office. The team (1) creates their account, (2) sends the first-week schedule, (3) has a colleague sit beside them for their first order, and (4) has them sign for a laptop at the office.</p><p><strong>New situation:</strong> The next hire works remotely. Which steps still work, which must change, and what do you need to know about the laptop, access rights, or training?</p><p><strong>Do:</strong> rewrite the process for this case. Then assume the hire uses a personal computer. What else changes? Merely replacing “office” with “online” is not enough.</p>',
      fields: [
        { label: 'What would you keep, change, and add in the example?', placeholder: 'Keep… Change… Need to know…' },
        { label: 'A process from your work that may face a new case', placeholder: 'The current process… If the situation changes to… then…' },
      ],
    },
    {
      num: 5, title: 'Why did the summary get better?',
      html: '<p><strong>Fictional meeting notes:</strong> Lan will send the demo to the client by Friday. Huy will check the price list by Thursday. The team has not decided whether to offer a discount.</p><p><strong>First AI draft:</strong> “The team will send the demo and give the client a discount.” It drops the owners and deadlines and turns an open question into a decision.</p><p>Next time you add both a sample summary from another meeting and an instruction to list each task, owner, and deadline. The new draft is better. Which change helped?</p><p><strong>Do:</strong> use the same minutes for two separate trials: add only the sample, then only the instruction. Check each draft against the notes for tasks, owners, deadlines, and invented decisions. If you are not using a chatbot, inspect the two illustrative results below.</p><details class="answer-reveal"><summary>Two illustrative results</summary><p><strong>Sample only:</strong> “Send the demo by Friday; check prices by Thursday.” The tasks and dates are right, but the owners are missing.</p><p><strong>Instruction only:</strong> “Lan sends the demo by Friday. Huy checks prices by Thursday. No discount decision has been made.” This is more complete in this example; one meeting cannot show that instructions always beat samples.</p></details>',
      fields: [
        { label: 'What is wrong or missing in the first draft?', placeholder: 'It omits… and falsely says…' },
        { label: 'How will you isolate the sample and the instruction?', placeholder: 'Keep the minutes fixed. Trial A adds only… Trial B adds only…' },
        { label: 'What do the illustrative results establish?', placeholder: 'For this meeting… but not necessarily…' },
      ],
    },
    {
      num: 6, title: 'Compare two vendors',
      html: '<p><strong>Situation:</strong> a comparison mixes facts from quotes, inferences from websites, and claims with no source.</p><p><strong>Do:</strong> mark each claim “supported,” “inferred,” or “unknown,” then note what still needs checking.</p>',
      fields: [
        { label: 'One claim that a decision may depend on', placeholder: 'For example: Vendor A can deploy faster…' },
        { label: 'Evidence, confidence, and what remains to check', placeholder: 'I know… I infer… I do not yet know…' },
      ],
    },
  ]);
})();
