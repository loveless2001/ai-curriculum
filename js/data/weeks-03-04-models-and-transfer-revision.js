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
      "tagline": "Keep the connections, not just the journey you were shown.",
      "checkpointStatement": "I can build a model, use it for a journey not shown in the example, and name a question it cannot yet answer.",
      "beats": [
        {
          "kind": "puzzle",
          "title": "You know one route. Is that enough?",
          "html": "<p>You usually go from <strong>Home A → Square B → Library C → Work D</strong>. Today you need to reach <strong>Park E</strong> instead. Repeating the familiar journey will not get you there.</p><p>Week 2 asked which clues help. Now ask: <strong>how should we organize those clues so we can answer a different question?</strong></p>"
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
                "Trong bài chuyển hàng, quan hệ dùng lại được là… Một giả định không nên bê nguyên sang là…"
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
      "short": "Từ một đường đi đến một mô hình",
      "title": "Nhớ đường đi. Dựng bản đồ.",
      "tagline": "Giữ các mối nối, không chỉ giữ chuyến đi đã được chỉ sẵn.",
      "checkpointStatement": "Tôi dựng được mô hình, dùng nó tìm đường chưa có trong ví dụ, và nêu được một câu hỏi nó chưa đủ thông tin để trả lời.",
      "beats": [
        {
          "kind": "puzzle",
          "title": "Thuộc một đường đi đã đủ chưa?",
          "html": "<p>Bạn thường đi từ <strong>Nhà A → Quảng trường B → Thư viện C → Chỗ làm D</strong>. Hôm nay bạn cần đến <strong>Công viên E</strong>. Lặp lại chuyến đi quen thuộc sẽ không đưa bạn đến đó.</p><p>Tuần 2 hỏi manh mối nào có ích. Giờ hãy hỏi: <strong>nên tổ chức các manh mối ấy thế nào để trả lời được một câu hỏi khác?</strong></p>"
        },
        {
          "kind": "exercise",
          "title": "Dựng thứ có thể dùng lại",
          "html": "<p>Các thẻ dưới đây liệt kê <strong>toàn bộ đường nối trực tiếp</strong> trong một khu phố giả lập. Mỗi đường đều đi được hai chiều. Không có đường nào khác. Dựa vào các thẻ để nối năm địa điểm, rồi tìm một chuyến đi chưa được cho làm mẫu.</p>",
          "widget": "model-map-builder"
        },
        {
          "kind": "naming",
          "title": "Từ một đáp án đến các mối quan hệ",
          "html": "<div class=\"br-concept-grid\"><div><h3>Nhớ một đáp án</h3><p>“A → B → C → D đi được.” Bạn giữ lại một chuyến đi.</p></div><div><h3>Dựng một mô hình</h3><p>“A nối với B; B nối với C và E…” Các quan hệ này cho phép ghép thành những chuyến đi khác.</p></div><div><h3>Dùng điều đã học</h3><p>Bạn có thể tìm đường đến E mà không cần ai chỉ sẵn toàn bộ chuyến đi ấy như một ví dụ nữa.</p></div></div><p><strong>Mô hình là cách biểu diễn để làm một việc.</strong> Ở đây, nó giữ các đường nối và bỏ qua cây cối, màu tòa nhà, khoảng cách chính xác. Nó có ích nhờ những quan hệ được giữ lại—không đơn giản vì ngắn hơn.</p><p>Nhớ và hiểu không đối lập: bạn có thể nhớ cả đường đi lẫn các mối nối. Một danh sách đường nối cũng có thể là mô hình; hình vẽ không có phép màu. Điều quan trọng là bạn làm được gì với thông tin ấy.</p>"
        },
        {
          "kind": "exercise",
          "title": "Có ích không có nghĩa là đủ cho mọi việc",
          "html": "<p>Bản đồ của bạn trả lời được “Có đường đến đó không?”. Nó chưa trả lời được “Đi đường nào nhanh nhất?” vì chưa có thời gian di chuyển. Một nét nối cũng chưa cho biết người dùng xe lăn có đi được hay không.</p><p><strong>Thử:</strong> nêu một chi tiết cần thêm để tìm đường nhanh nhất, rồi một chi tiết khác để tìm đường không có bậc thang. Mô hình có thể đủ cho việc này nhưng thiếu cho việc khác.</p>",
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
          "title": "Cho thấy mô hình của bạn làm được gì",
          "html": "<p>Dùng bản đồ để đến E. Sau đó giải thích nó giữ gì, bỏ gì, và câu hỏi nào cần thêm thông tin. Bạn không cần thuộc mọi chuyến đi có thể có.</p><div class=\"br-takeaway\"><strong>Mang sang tuần sau:</strong> mô hình có ích khi các quan hệ trong nó giúp tạo ra đáp án, không chỉ nhắc lại đáp án. Sang tuần 4, một đoạn đường bị đóng. Mô hình ấy còn giúp được không?</div>",
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
      "tagline": "Hiểu thể hiện ở cách dùng lại, cập nhật và mở rộng điều đã học.",
      "checkpointStatement": "Tôi xử lý được điều kiện mới, phân biệt việc cập nhật dữ kiện với bổ sung loại thông tin còn thiếu, và dùng lại ý tưởng trong tình huống khác.",
      "beats": [
        {
          "kind": "puzzle",
          "title": "Vẫn điểm đến ấy. Một đường đã đóng.",
          "html": "<p>Bạn thuộc chuyến đi <strong>A → B → C → D</strong>. Hôm nay, đoạn <strong>C–D bị đóng</strong>. Bạn vẫn cần đi từ Nhà A đến Chỗ làm D. <strong>Hãy chọn một đường khác trên bản đồ.</strong></p><p>Các đường vẽ liền đều đang mở và đi được hai chiều. Dấu × đánh dấu đoạn bị đóng. Dùng lại các mối nối bạn đã dựng ở tuần 3.</p>",
          "widget": "route-change-lab"
        },
        {
          "kind": "exercise",
          "title": "Khác hình vẽ hay khác đường nối?",
          "html": "<p>Đổi vị trí các địa điểm trên trang chưa chắc làm thay đổi kết nối giữa chúng. Bỏ một đường thì có. Hãy so sánh hai bản đồ trước khi kiểm tra đáp án.</p>",
          "widget": "structure-compare"
        },
        {
          "kind": "exercise",
          "title": "Câu hỏi mới cần thêm thông tin",
          "html": "<p><strong>Tất cả đường đã mở lại.</strong> Giờ không chỉ hỏi “Có đến D được không?” mà hỏi “Đi từ A đến D theo đường nào nhanh nhất?”. Sơ đồ không theo tỷ lệ. Nét vẽ ngắn hơn chưa cho biết thời gian di chuyển ngắn hơn.</p>",
          "widget": "model-limits-lab"
        },
        {
          "kind": "exercise",
          "title": "Mang ý tưởng sang việc khác",
          "html": "<p>Một kiện hàng dễ vỡ cần đi từ <strong>Kho K</strong> tới <strong>Điểm giao G</strong>. Có thể chuyển qua Trạm Bắc N hoặc Trạm Nam S, nhưng <strong>Trạm Bắc không nhận hàng dễ vỡ</strong>. Các đường nối đều đi được hai chiều; bài này không có hạn chế xử lý hàng nào khác.</p><p>Hãy chọn đường chuyển hàng. Điều gì từ bài đường đi vẫn dùng được, dù đây đã là một mạng giao hàng?</p>",
          "widget": "transfer-route-lab"
        },
        {
          "kind": "naming",
          "title": "“Mới” không chỉ có một kiểu",
          "html": "<div class=\"br-concept-grid\"><div><h3>Một trường hợp khác</h3><p>Tìm chuyến đi khác từ các mối nối đã có trong mô hình.</p></div><div><h3>Một điều kiện đổi</h3><p>Đường bị đóng. Cập nhật đường nào còn dùng được; kiểu bản đồ kết nối vẫn đủ.</p></div><div><h3>Một yêu cầu mới</h3><p>Muốn đi nhanh nhất. Bổ sung thời gian di chuyển, thay vì đoán từ hình vẽ.</p></div></div><p><strong>Khái quát hóa</strong> là dùng điều đã học ra ngoài đúng ví dụ đã được chỉ sẵn. Chuyển ý tưởng sang việc khác còn đòi hỏi kiểm tra quan hệ nào vẫn áp dụng—không bê nguyên mọi giả định sang tình huống mới.</p><p><strong>Cách hiểu dùng trong bài này:</strong> nắm các quan hệ đủ để giải thích, dự đoán hoặc xử lý trường hợp mới, đồng thời nhận ra khi các quan hệ ấy chưa đủ. Đây là tiêu chí để học và thử, không phải định nghĩa tuyệt đối hay bài kiểm tra trí thông minh đạt/trượt.</p>"
        },
        {
          "kind": "checkpoint",
          "title": "Giải thích bạn sửa gì, không chỉ nêu đáp án",
          "html": "<p>Nêu một điều bạn dùng lại, một dữ kiện bạn cập nhật, và một loại thông tin bạn phải thêm. Dùng ví dụ đường đi và chuyển hàng, thay vì chỉ nhắc lại định nghĩa.</p><div class=\"br-takeaway\"><strong>Tuần 3:</strong> tổ chức điều đã biết thành mô hình dùng được.<br><strong>Tuần 4:</strong> dùng và sửa mô hình khi tình huống thay đổi.<br><strong>Sang tuần 5:</strong> kiểm tra hành vi ấy có thực sự ủng hộ năng lực ta đang gán cho người hoặc hệ thống không. Một lần làm đúng là bằng chứng, không phải chứng minh mọi kiểu hiểu.</div>",
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
                "Trong bài chuyển hàng, quan hệ dùng lại được là… Một giả định không nên bê nguyên sang là…"
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
      arc.name = vi ? 'Chặng 2 — Dùng điều đã học, rồi kiểm tra bằng chứng' : 'Arc 2 — Use what you learned, then test the evidence';
      arc.claim = vi ? 'Dùng mô hình trong tình huống mới; sau đó kiểm tra các cách giải thích và mức độ tin chắc.' : 'Use a model in new situations; then test alternative explanations and confidence.';
    }
    var w5 = GM.weeks.find(function (w) { return w.num === 5; });
    if (w5 && w5.beats && w5.beats[0]) {
      w5.beats[0].html = w5.beats[0].html.replace(/^<p>[\s\S]*?<\/p>/, vi
        ? '<p>Tuần 4 dùng bản đồ để tìm đường mới, xử lý đường đóng và nhận ra thông tin còn thiếu. Bây giờ ta hỏi: thành công đó có thể được giải thích bằng cách nào khác? Đổi điều kiện thử có thể giúp phân biệt các cách giải thích.</p>'
        : '<p>Week 4 used a map to plan new journeys, handle a closure, and identify missing information. Now ask: what else could explain successful performance? Changing a test condition can help distinguish the explanations.</p>');
    }
  };
  GM.bridgeApplyLessons();
})();
