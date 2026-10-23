/* Bilingual Week 3–4 revision. Load AFTER the original Vietnamese overlays.
 * Replaces whole beats, avoiding positional localization mismatches.
 * Also updates the Week 5 opening bridge; all its other activities remain intact.
 */
(function () {
  'use strict';
  var DATA = {
  "en": [
    {
      "num": 3,
      "arcId": 1,
      "short": "From a route to a model",
      "title": "Remember a route. Build a map.",
      "tagline": "You know one journey. What would help you find another?",
      "checkpointStatement": "I can build a model, use it for a journey not shown in the example, and name a question it cannot yet answer.",
      "beats": [
        {
          "kind": "puzzle",
          "title": "You know one route. Is that enough?",
          "html": "<p>You usually go from <strong>Home A → Square B → Library C → Work D</strong>. Today you need to reach <strong>Park E</strong> instead. Nobody has shown you a route there.</p><p><strong>Can you find E from the route you remember?</strong> If not, what else would you need to know? Make a guess before opening the road cards below.</p>"
        },
        {
          "kind": "exercise",
          "title": "Build something you can use again",
          "html": "<p>The cards below list <strong>every direct road</strong> in a small, invented neighborhood. All roads work in both directions. There are no other roads. Use the cards to connect the five places, then find a journey that was not given as an example.</p>",
          "widget": "model-map-builder"
        },
        {
          "kind": "naming",
          "title": "What changed: from an answer to relationships",
          "html": "<div class=\"br-concept-grid\"><div><h3>Remembering an answer</h3><p>“A → B → C → D worked.” This preserves one journey.</p></div><div><h3>Building a model</h3><p>“A connects to B; B connects to C and E…” These relationships let you assemble other journeys.</p></div><div><h3>Using what you learned</h3><p>You can now plan a journey to E without needing that complete route as another worked example.</p></div></div><p><strong>A model is a representation used for a job.</strong> Here it keeps the roads and leaves out trees, building colors, and exact distances. It is useful because of the relationships it preserves—not simply because it is shorter.</p><p>Memory and understanding are not opposites: you can remember both routes and relationships. A list of connections can also work as a model; a drawing is not magic. What matters is what you can do with the information.</p>"
        },
        {
          "kind": "exercise",
          "title": "A useful model still has limits",
          "html": "<p>Your map can answer “Can I get there?” It cannot yet answer “Which journey is fastest?” because it contains no travel times. Nor does a road line tell you whether the route is suitable for a wheelchair.</p><p><strong>Try:</strong> name one detail to add for a faster journey, and a different detail to add for a step-free journey. A model may be adequate for one job and incomplete for another.</p>",
          "widget": "bridge-notes",
          "widgetOpts": {
            "id": "w3-limits",
            "prompts": [
              [
                "Fastest journey: what information is missing?",
                "Đường nhanh nhất: đang thiếu thông tin gì?"
              ],
              [
                "Step-free journey: what information is missing?",
                "Đường không có bậc thang: đang thiếu thông tin gì?"
              ]
            ]
          }
        },
        {
          "kind": "checkpoint",
          "title": "Show what your model lets you do",
          "html": "<p>Use your map to reach E. Then explain what it kept, what it omitted, and one question that needs more information. You do not have to remember every possible journey.</p><div class=\"br-takeaway\"><strong>Carry forward:</strong> a model is useful when its relationships help you produce an answer—not merely repeat one. In Week 4, a road closes. Will your model still help?</div>",
          "widget": "bridge-notes",
          "widgetOpts": {
            "id": "w3-checkpoint",
            "prompts": [
              [
                "My model keeps… It leaves out… It cannot yet answer…",
                "Mô hình của tôi giữ… Bỏ qua… Chưa trả lời được…"
              ]
            ]
          }
        }
      ]
    },
    {
      "num": 4,
      "arcId": 2,
      "showArcBanner": true,
      "short": "When the situation changes",
      "title": "The road closes. Now what?",
      "tagline": "Understanding shows in how you use, update, and extend what you learned.",
      "checkpointStatement": "I can handle a new condition, distinguish a changed fact from missing kinds of information, and use the same idea in another situation.",
      "beats": [
        {
          "kind": "puzzle",
          "title": "Same destination. One road is closed.",
          "html": "<p>You know the journey <strong>A → B → C → D</strong>. The road between <strong>C and D is now closed</strong>. You still need to get from Home A to Work D. <strong>Choose another journey on the map.</strong></p><p>The solid roads are open in both directions. The × marks the closed section. Use the same connections you built in Week 3.</p>",
          "widget": "route-change-lab"
        },
        {
          "kind": "exercise",
          "title": "Different picture—or different connections?",
          "html": "<p>Moving the places on the page does not necessarily change their connections. Removing a road does. Compare the maps before checking your answer.</p>",
          "widget": "structure-compare"
        },
        {
          "kind": "exercise",
          "title": "A new question needs more information",
          "html": "<p><strong>All roads have reopened.</strong> The question is no longer just “Can I reach D?” It is “Which journey from A to D is fastest?” The diagram is not to scale. A shorter-looking line is not evidence of a shorter travel time.</p>",
          "widget": "model-limits-lab"
        },
        {
          "kind": "exercise",
          "title": "Use the idea somewhere else",
          "html": "<p>A fragile parcel must travel from <strong>Warehouse K</strong> to <strong>Delivery G</strong>. You can send it via North N or South S, but <strong>North does not accept fragile parcels</strong>. All listed links work both ways; there are no other handling restrictions in this exercise.</p><p>Plan the shipment. What can you reuse from the road problem, even though this is now a delivery network?</p>",
          "widget": "transfer-route-lab"
        },
        {
          "kind": "naming",
          "title": "“New” can mean three different things",
          "html": "<div class=\"br-concept-grid\"><div><h3>Another case</h3><p>Find a different journey using connections already represented.</p></div><div><h3>A changed condition</h3><p>A road closes. Update which connection is available; a connection map still works.</p></div><div><h3>A new requirement</h3><p>Find the fastest route. Extend the map with travel times rather than guessing from the drawing.</p></div></div><p><strong>Generalization</strong> means using what you learned beyond the exact example you were shown. Transferring an idea also means checking which relationships still apply—not carrying every assumption into a different situation.</p><p><strong>Our working meaning of understanding:</strong> grasping relationships well enough to explain, predict, or act in new cases, and recognizing when those relationships are not enough. This is a teaching criterion, not a universal definition or a pass/fail intelligence test.</p>"
        },
        {
          "kind": "checkpoint",
          "title": "Explain your change, not just your answer",
          "html": "<p>Describe one thing you reused, one fact you updated, and one type of information you had to add. Use the road and delivery examples rather than repeating the definitions.</p><div class=\"br-takeaway\"><strong>Week 3:</strong> organize what you know into a usable model.<br><strong>Week 4:</strong> use and revise it when the situation changes.<br><strong>Next, Week 5:</strong> test whether this behavior really supports the ability we claim. One successful attempt is evidence, not proof of every kind of understanding.</div>",
          "widget": "bridge-notes",
          "widgetOpts": {
            "id": "w4-checkpoint",
            "prompts": [
              [
                "I reused… I updated… I added…",
                "Tôi dùng lại… Tôi cập nhật… Tôi bổ sung…"
              ],
              [
                "In the delivery problem, the shared relationship is… One assumption I must not carry over is…",
                "Trong bài chuyển hàng, điểm nào giống bài tìm đường? Điều nào ở bài cũ không còn đúng?"
              ]
            ]
          }
        }
      ]
    }
  ],
  "vi": [
    {
      "num": 3,
      "arcId": 1,
      "short": "Từ đường đi đến bản đồ",
      "title": "Nhớ một đường đi, rồi tự dựng bản đồ",
      "tagline": "Thuộc một đường đi rồi, làm sao tìm được đường khác?",
      "checkpointStatement": "Tôi dựng được một bản đồ, dùng nó tìm đường mới và chỉ ra câu hỏi nào bản đồ chưa đủ thông tin để trả lời.",
      "beats": [
        {
          "kind": "puzzle",
          "title": "Thuộc một đường đi đã đủ chưa?",
          "html": "<p>Bạn vẫn thường đi theo đường <strong>Nhà A → Quảng trường B → Thư viện C → Chỗ làm D</strong>. Hôm nay bạn cần đến <strong>Công viên E</strong>, nhưng chưa ai chỉ đường tới đó.</p><p><strong>Chỉ nhớ đường đi làm, bạn có tìm được E không?</strong> Nếu chưa, bạn cần biết thêm gì? Nghĩ một câu trả lời rồi hãy xem các thẻ đường bên dưới.</p>"
        },
        {
          "kind": "exercise",
          "title": "Tự dựng bản đồ",
          "html": "<p>Các thẻ dưới đây ghi <strong>toàn bộ đường nối trực tiếp</strong> trong một khu phố giả lập. Mỗi đường đi được cả hai chiều; ngoài ra không còn đường nào khác.</p><p>Hãy nối năm địa điểm, rồi dùng bản đồ để tìm một hành trình chưa được chỉ sẵn.</p>",
          "widget": "model-map-builder"
        },
        {
          "kind": "naming",
          "title": "Từ một đáp án đến các mối quan hệ",
          "html": "<div class=\"br-concept-grid\"><div><h3>Nhớ một hành trình</h3><p>“A → B → C → D đi được.” Bạn chỉ giữ lại một đường cụ thể.</p></div><div><h3>Dựng một mô hình</h3><p>“A nối với B; B nối với C và E…” Từ các mối nối này, bạn có thể ghép thành nhiều đường khác.</p></div><div><h3>Dùng mô hình</h3><p>Bạn tìm được đường đến E dù chưa từng được chỉ sẵn cả hành trình.</p></div></div><p><strong>Mô hình là một cách biểu diễn phục vụ cho một việc cụ thể.</strong> Bản đồ này giữ lại các đường nối, nhưng bỏ qua cây cối, màu tòa nhà và khoảng cách chính xác.</p><p>Một danh sách đường nối cũng có thể là mô hình; không nhất thiết phải có hình vẽ. Điều quan trọng là thông tin được giữ lại có giúp bạn làm việc cần làm hay không.</p>"
        },
        {
          "kind": "exercise",
          "title": "Một bản đồ không trả lời được mọi câu hỏi",
          "html": "<p>Bản đồ trả lời được câu “Có đường đến đó không?”. Nhưng nó chưa cho biết đường nào nhanh nhất, vì không có thời gian di chuyển. Nó cũng chưa cho biết đường nào phù hợp với người dùng xe lăn.</p><p>Cần thêm thông tin gì cho từng câu hỏi? Một mô hình có thể đủ cho việc này nhưng thiếu cho việc khác.</p>",
          "widget": "bridge-notes",
          "widgetOpts": {
            "id": "w3-limits",
            "prompts": [
              [
                "Fastest journey: what information is missing?",
                "Đường nhanh nhất: đang thiếu thông tin gì?"
              ],
              [
                "Step-free journey: what information is missing?",
                "Đường không có bậc thang: đang thiếu thông tin gì?"
              ]
            ]
          }
        },
        {
          "kind": "checkpoint",
          "title": "Bản đồ của bạn làm được gì?",
          "html": "<p>Dùng bản đồ để tìm đường đến E. Sau đó nói rõ bản đồ giữ lại điều gì, bỏ qua điều gì và câu hỏi nào cần thêm dữ liệu.</p><div class=\"br-takeaway\"><strong>Ghi nhớ:</strong> mô hình có ích khi những quan hệ trong nó giúp ta tìm ra câu trả lời mới, chứ không chỉ nhắc lại đáp án cũ. Sang tuần 4, một đoạn đường sẽ bị đóng. Khi đó bản đồ này còn dùng được không?</div>",
          "widget": "bridge-notes",
          "widgetOpts": {
            "id": "w3-checkpoint",
            "prompts": [
              [
                "My model keeps… It leaves out… It cannot yet answer…",
                "Mô hình của tôi giữ… Bỏ qua… Chưa trả lời được…"
              ]
            ]
          }
        }
      ]
    },
    {
      "num": 4,
      "arcId": 2,
      "showArcBanner": true,
      "short": "Khi tình huống thay đổi",
      "title": "Đường bị đóng. Giờ đi thế nào?",
      "tagline": "Một mô hình tốt phải giúp ta xử lý cả những tình huống chưa gặp trước đó.",
      "checkpointStatement": "Tôi biết khi nào chỉ cần cập nhật một dữ kiện, khi nào phải bổ sung loại thông tin mới, và phần nào có thể dùng lại ở tình huống khác.",
      "beats": [
        {
          "kind": "puzzle",
          "title": "Vẫn điểm đến cũ, nhưng một đường đã đóng",
          "html": "<p>Bạn thường đi theo đường <strong>A → B → C → D</strong>. Hôm nay, đoạn <strong>C–D bị đóng</strong>, nhưng bạn vẫn phải đi từ Nhà A đến Chỗ làm D.</p><p>Hãy dùng bản đồ ở tuần 3 để tìm một đường khác. Các đường còn lại đều đang mở và đi được hai chiều.</p>",
          "widget": "route-change-lab"
        },
        {
          "kind": "exercise",
          "title": "Khác hình vẽ hay khác đường nối?",
          "html": "<p>Di chuyển các địa điểm trên trang chỉ làm hình vẽ trông khác đi; các đường nối có thể vẫn y nguyên. Nhưng xóa một con đường thì cấu trúc đã đổi.</p><p>Hãy so sánh hai bản đồ trước khi xem đáp án.</p>",
          "widget": "structure-compare"
        },
        {
          "kind": "exercise",
          "title": "Câu hỏi mới cần thêm thông tin",
          "html": "<p><strong>Tất cả các đường đã mở lại.</strong> Bây giờ câu hỏi đổi thành: “Từ A đến D, đường nào nhanh nhất?”</p><p>Sơ đồ không vẽ theo đúng tỷ lệ, nên nhìn đường ngắn hơn chưa chắc đi nhanh hơn. Bạn cần thêm loại thông tin nào?</p>",
          "widget": "model-limits-lab"
        },
        {
          "kind": "exercise",
          "title": "Dùng cùng ý tưởng cho một việc khác",
          "html": "<p>Một kiện hàng dễ vỡ cần đi từ <strong>Kho K</strong> đến <strong>Điểm giao G</strong>. Hàng có thể qua Trạm Bắc N hoặc Trạm Nam S, nhưng <strong>Trạm Bắc không nhận hàng dễ vỡ</strong>. Các đường nối đều đi được hai chiều.</p><p>Hãy chọn đường chuyển hàng. Phần nào của bài tìm đường vẫn dùng được, và phần nào phải thay đổi?</p>",
          "widget": "transfer-route-lab"
        },
        {
          "kind": "naming",
          "title": "“Mới” không chỉ có một kiểu",
          "html": "<div class=\"br-concept-grid\"><div><h3>Trường hợp mới</h3><p>Tìm một đường khác từ những mối nối đã có.</p></div><div><h3>Điều kiện thay đổi</h3><p>Một đường bị đóng. Cập nhật đường nào còn dùng được.</p></div><div><h3>Câu hỏi thay đổi</h3><p>Muốn tìm đường nhanh nhất, ta phải thêm thời gian di chuyển.</p></div></div><p><strong>Khái quát hóa</strong> là dùng điều đã học cho một trường hợp khác với ví dụ ban đầu. Khi mang một ý tưởng sang việc khác, ta phải kiểm tra xem phần nào còn đúng và phần nào không.</p><p>Trong khóa học này, “hiểu” có nghĩa là nắm được các mối quan hệ đủ để giải thích, dự đoán hoặc xử lý trường hợp mới, đồng thời nhận ra khi thông tin hiện có chưa đủ. Đây là tiêu chí để học, không phải một bài kiểm tra trí thông minh.</p>"
        },
        {
          "kind": "checkpoint",
          "title": "Bạn đã giữ, đổi và thêm điều gì?",
          "html": "<p>Dựa vào hai bài đường đi và chuyển hàng, hãy chỉ ra: phần nào bạn dùng lại, dữ kiện nào bạn cập nhật, và loại thông tin nào phải bổ sung.</p><div class=\"br-takeaway\"><strong>Tuần 3:</strong> tổ chức điều đã biết thành một mô hình có thể dùng lại.<br><strong>Tuần 4:</strong> sửa hoặc mở rộng mô hình khi tình huống thay đổi.<br><strong>Tuần 5:</strong> hỏi xem một lần làm đúng thực sự cho ta biết được gì về năng lực của người hoặc hệ thống.</div>",
          "widget": "bridge-notes",
          "widgetOpts": {
            "id": "w4-checkpoint",
            "prompts": [
              [
                "I reused… I updated… I added…",
                "Tôi dùng lại… Tôi cập nhật… Tôi bổ sung…"
              ],
              [
                "In the delivery problem, the shared relationship is… One assumption I must not carry over is…",
                "Trong bài chuyển hàng, điểm nào giống bài tìm đường? Điều nào ở bài cũ không còn đúng?"
              ]
            ]
          }
        }
      ]
    }
  ]
};
  GM.bridgeApplyLessons = function () {
    var vi = GM.language.isVietnamese();
    var lessons = JSON.parse(JSON.stringify(DATA[vi ? 'vi' : 'en']));
    lessons.forEach(function (updated) {
      var old = GM.weeks.find(function (w) { return w.num === updated.num; });
      if (old) Object.assign(old, updated); else GM.weeks.push(updated);
    });
    var arc = GM.arcs && GM.arcs.find(function (a) { return a.id === 2; });
    if (arc) {
      arc.name = vi ? 'Chặng 2 — Dùng điều đã học vào tình huống mới' : 'Arc 2 — Use what you learned, then test the evidence';
      arc.claim = vi ? 'Ta dùng mô hình trong tình huống mới, rồi học cách kiểm tra xem một kết quả tốt thực sự đến từ đâu.' : 'Use a model in new situations; then test alternative explanations and confidence.';
    }
    var w5 = GM.weeks.find(function (w) { return w.num === 5; });
    if (w5 && w5.beats && w5.beats[0]) {
      w5.beats[0].html = w5.beats[0].html.replace(/^<p>[\s\S]*?<\/p>/, vi
        ? '<p>Tuần 4, bạn tìm đường khác khi lối quen bị đóng. Tuần này, ta hỏi một câu khác: trả lời đúng thì chứng tỏ điều gì?</p>'
        : '<p>In Week 4, you found another route when the usual road closed. This week, ask a different question: what does a correct answer actually show?</p>');
    }
  };
  GM.bridgeApplyLessons();
})();
