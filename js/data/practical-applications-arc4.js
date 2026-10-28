/* Practical examples for Weeks 9-12. Loaded after language overlays. */
(function () {
  var vi = GM.language.isVietnamese();
  GM.addApplications(vi ? [
    {
      num: 9, id: 'week-8', title: 'Tìm ý rồi chọn ý',
      html: '<p><strong>Tình huống:</strong> Khi đặt tên sản phẩm, bạn muốn nhiều ý tưởng khác nhau. Khi sửa một thông báo đã được duyệt, bạn lại muốn câu chữ ít thay đổi.</p><p><strong>Thử:</strong> tách thành hai bước: tạo nhiều phương án, rồi chọn và chỉnh theo tiêu chí. Temperature chỉ ảnh hưởng đến độ đa dạng của các phương án. Dùng cách kiểm ở tuần 8 để chọn bản thực sự phù hợp.</p>',
      fields: [
        { label: 'Một việc cần khám phá nhiều phương án', placeholder: 'Tôi muốn nhiều góc/ý tưởng cho…' },
        { label: 'Một việc cần ổn định, và tiêu chí chọn', placeholder: 'Sau khi chọn, kết quả phải giữ…' },
      ],
    },
    {
      num: 10, title: 'AI gom phản hồi khách sai ở đâu?',
      html: '<p><strong>Sáu phản hồi giả:</strong> (1) “Giao trễ hai ngày.” (2) “Phí giao hàng cao.” (3) “Áo nhận được sai cỡ.” (4) “Khóa kéo bị hỏng.” (5) “Nhắn hỏi đổi cỡ, hai ngày sau mới được trả lời.” (6) “Nhân viên trả lời nhưng không nói rõ cách đổi cỡ.”</p><p>Chỉ chọn <strong>vấn đề khách phàn nàn chính</strong>: giao hàng, sản phẩm hay hỗ trợ. AI xếp 1–2 vào giao hàng, 3–6 vào sản phẩm, không xếp phản hồi nào vào hỗ trợ.</p><p><strong>Thử:</strong> tìm hai chỗ AI xếp sai và đoán vì sao nó sai giống nhau. Sửa đúng một câu trong hướng dẫn phân loại, rồi thử lại trên sáu phản hồi cũ và hai phản hồi mới: (7) “Áo đẹp, nhưng ba ngày chưa ai trả lời tin nhắn bảo hành.” (8) “Shop trả lời nhanh, nhưng giày bị bong đế.” Sửa hướng dẫn sử dụng không có nghĩa là đã huấn luyện lại mô hình.</p><details class="answer-reveal"><summary>Đáp án để tự kiểm</summary><p>Phản hồi 5–6 phàn nàn về <strong>hỗ trợ</strong>, không phải chất lượng áo. Có thể thêm: “Xếp theo điều khách đang phàn nàn, đừng xếp chỉ vì thấy chữ ‘đổi cỡ’.” Phản hồi 7 thuộc hỗ trợ; 8 thuộc sản phẩm. Nếu một phản hồi thật có hai vấn đề ngang nhau, đừng ép nó vào một nhóm mà hãy ghi nhận cả hai.</p></details>',
      fields: [
        { label: 'AI xếp sai phản hồi nào, và hai lỗi giống nhau ở đâu?', placeholder: 'Số… và số… đều bị xếp theo từ… thay vì…' },
        { label: 'Một câu hướng dẫn bạn sẽ sửa và cách thử lại', placeholder: 'Tôi sẽ thêm… rồi chạy lại 1–8…' },
      ],
    },
    {
      num: 11, title: 'Tìm đúng ngoại lệ trong quy định đổi hàng',
      html: '<p><strong>Trích quy định giả của một cửa hàng:</strong> (Mục 1) Hàng nguyên giá được đổi cỡ trong 14 ngày nếu chưa dùng và còn biên nhận. (Mục 2) Hàng giảm giá chỉ được đổi khi sản phẩm có lỗi; không đổi vì mặc không vừa. (Mục 3) Tiền hoàn cho trường hợp đủ điều kiện được chuyển trong tối đa 5 ngày làm việc.</p><p><strong>Câu hỏi:</strong> Khách mua áo giảm giá cỡ M, nhận đúng cỡ M nhưng mặc không vừa. Tám ngày sau khách muốn đổi cỡ. Quy định có cho đổi không?</p><p><strong>Thử:</strong> chọn đoạn thực sự quyết định câu trả lời, rồi nhờ AI trả lời kèm số mục. Tự mở lại mục đó để so. Mục 1 và 3 có vẻ liên quan đến đổi trả, nhưng không trả lời đúng trường hợp này. Với tài liệu dài hơn, hãy đưa cả định nghĩa và ngoại lệ cần thiết, đừng chỉ lấy một câu đứng riêng.</p><details class="answer-reveal"><summary>Đối chiếu quy định</summary><p>Không đổi cỡ theo <strong>Mục 2</strong>: đây là hàng giảm giá, không có lỗi sản phẩm. Mốc 14 ngày của Mục 1 chỉ dành cho hàng nguyên giá. Mục 3 nói về thời gian hoàn tiền, không quyết định trường hợp này có được đổi hay không.</p></details>',
      fields: [
        { label: 'Bạn sẽ trả lời khách thế nào? Dẫn đúng mục', placeholder: 'Theo Mục… trường hợp này…' },
        { label: 'Một câu hỏi trong tài liệu công việc của bạn và đoạn cần đối chiếu', placeholder: 'Tôi cần tìm… trong… và sẽ đối chiếu với Mục…' },
      ],
    },
    {
      num: 12, title: 'Hoàn thiện cách làm từ tuần 8',
      checkpointStatement: 'Tôi đã hoàn thiện bài giải thích và phác ra một quy trình cho công việc thật, trong đó có tiêu chí, cách kiểm tra, giới hạn và những quyết định vẫn phải do con người đưa ra.',
      html: '<p>Mở lại ghi chú <a href="#/week/8">bài thực hành tuần 8</a>. Sau khi học cách chọn token, huấn luyện và attention, có điều gì trong cách làm của bạn cần sửa hoặc giải thích rõ hơn?</p><ol><li>Kiểm lại người dùng, mục đích và tiêu chí.</li><li>Chỉ ra thông tin nào phải đưa vào ngữ cảnh, lưu lại hoặc tìm từ nguồn khác. Tách việc sửa yêu cầu khỏi huấn luyện lại mô hình.</li><li>Xem lại các bước, cách kiểm và quyết định cần con người.</li><li>Đối chiếu hai lần thử cũ, rồi thử thêm một trường hợp mới. Ghi điều kiện nào làm kết quả hoặc cách xử lý thay đổi.</li></ol><p>Nếu chọn việc mới, hãy làm đủ hai trường hợp trước khi thử thêm. Giữ một ví dụ đã đạt và một trường hợp phải hỏi thêm hoặc dừng lại.</p>',
      fields: [
        { label: 'Yêu cầu ban đầu còn mơ hồ ở đâu, và kết quả tốt trông như thế nào?', placeholder: 'Ban đầu: “AI hãy…” Thành công nghĩa là…' },
        { label: 'Các bước, thông tin và tiêu chí kiểm tra', placeholder: '1… 2… 3… Mỗi bước được kiểm bằng…' },
        { label: 'Giới hạn, rủi ro và những quyết định vẫn phải do con người đưa ra', placeholder: 'AI không nên tự quyết… Tôi sẽ kiểm…' },
      ],
    },
  ] : [
    {
      num: 9, id: 'week-8', title: 'Generate options, then choose',
      html: '<p><strong>Situation:</strong> product naming benefits from variety; editing an approved notice needs stability.</p><p><strong>Do:</strong> separate generation from selection and revision against criteria. Temperature affects variety, not the criteria. Use the Week 8 checks to choose a suitable result.</p>',
      fields: [
        { label: 'One task that benefits from varied options', placeholder: 'I want many angles or ideas for…' },
        { label: 'One task that needs stability, plus its selection criteria', placeholder: 'After selection, the result must preserve…' },
      ],
    },
    {
      num: 10, title: 'Where did AI misgroup customer feedback?',
      html: '<p><strong>Six fictional comments:</strong> (1) “Delivery was two days late.” (2) “Shipping costs too much.” (3) “The shirt arrived in the wrong size.” (4) “The zipper is broken.” (5) “I asked about exchanging sizes and waited two days for a reply.” (6) “The employee replied but did not explain how to exchange sizes.”</p><p>Choose the <strong>main complaint</strong>: delivery, product, or support. AI puts 1–2 under delivery, 3–6 under product, and none under support.</p><p><strong>Do:</strong> find two repeated errors and explain what may have caused them. Change one sentence in the classification instructions, then test the six old comments and two new ones: (7) “The shirt is nice, but nobody has answered my warranty message for three days.” (8) “The shop replied promptly, but the shoe sole is coming off.” Changing an instruction does not retrain the model.</p><details class="answer-reveal"><summary>Check your labels</summary><p>Comments 5–6 complain about <strong>support</strong>, not shirt quality. A possible instruction is: “Classify the issue the customer is complaining about, not a word such as ‘size exchange’.” Comment 7 is support; 8 is product. If a real comment has two equally important issues, record both rather than forcing one label.</p></details>',
      fields: [
        { label: 'Which comments are wrong, and what do the errors share?', placeholder: 'Numbers… were classified by the word… rather than…' },
        { label: 'One instruction to change and how you will retest it', placeholder: 'I will add… and rerun comments 1–8…' },
      ],
    },
    {
      num: 11, title: 'Find the exception in a return policy',
      html: '<p><strong>Fictional shop policy excerpts:</strong> (Section 1) Full-price items may be exchanged for another size within 14 days if unused and accompanied by a receipt. (Section 2) Discounted items may be exchanged only when defective, not because they do not fit. (Section 3) Refunds for eligible returns are sent within five business days.</p><p><strong>Question:</strong> A customer bought a discounted size-M shirt, received size M, but it does not fit. Eight days later they ask to exchange sizes. Does the policy allow it?</p><p><strong>Do:</strong> choose the passage that decides the answer and ask AI to cite the section. Check that section yourself. Sections 1 and 3 sound related to returns, but do not decide this case. For a longer document, include the necessary definitions and exceptions rather than one isolated sentence.</p><details class="answer-reveal"><summary>Check the policy</summary><p>No size exchange under <strong>Section 2</strong>: this is a discounted item without a defect. Section 1 applies only to full-price items. Section 3 concerns refund timing, not eligibility.</p></details>',
      fields: [
        { label: 'How would you answer the customer? Cite the deciding section', placeholder: 'Under Section… this case…' },
        { label: 'A question in a document from your work and what you would verify', placeholder: 'I need to find… in… and check Section…' },
      ],
    },
    {
      num: 12, title: 'Refine your Week 8 process',
      checkpointStatement: 'I completed the explanation and mapped one real task into a process with criteria, checks, limits, and human decisions.',
      html: '<p>Reopen your <a href="#/week/8">Week 8 task notes</a>. Having studied token selection, training, and attention, what would you revise or explain more clearly?</p><ol><li>Check the user, purpose, and criteria.</li><li>Identify what belongs in context, saved memory, or retrieved sources. Distinguish changing an instruction from retraining the model.</li><li>Review the steps, checks, and human decisions.</li><li>Compare your two earlier trials, then try one new case. Record which condition changes the result or the way you handle it.</li></ol><p>If you choose a new task, test two cases before adding a third. Keep one successful example and one case that requires more information or a stop.</p>',
      fields: [
        { label: 'The initial vague request and an observable outcome', placeholder: 'Initial: “AI, please…” Success means…' },
        { label: 'Steps, information, and checks', placeholder: '1… 2… 3… Each step is checked by…' },
        { label: 'Limits, risks, and human decisions', placeholder: 'AI should not decide… I will verify…' },
      ],
    },
  ]);
})();
