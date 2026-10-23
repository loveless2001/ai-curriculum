/* Prediction difficulty ladder: rank events from easiest to hardest to predict,
   then reveal per-item discussion of WHAT makes each hard. */
(function () {
  var EN_ITEMS = [
    { t: 'The next word of your national anthem', d: 'Near-perfectly predictable — the text is fixed and you’ve rehearsed it. Prediction here is pure recall of structure.' },
    { t: 'The next word after “she poured the coffee into the…”', d: 'Almost forced by grammar and habit — but not fixed. This is structure without a script.' },
    { t: 'What a close friend texts back to “dinner tonight?”', d: 'You have a rich model of one specific person — better than any stranger could do, still far from certain. Personal data narrows the field.' },
    { t: 'Tomorrow’s weather', d: 'Partly predictable from today’s (persistence + physics), degrading fast with distance. Hard because the system is chaotic, not because we lack a script.' },
    { t: 'A fair coin flip', d: 'Irreducibly 50/50. No amount of skill or data helps. Note: hard-to-predict is not the same as complicated.' },
    { t: 'The winning lottery numbers', d: 'Like the coin but worse — vastly more possibilities, all equally likely. Maximum openness.' },
  ];
  var VI_ITEMS = [
    { t: 'Từ tiếp theo trong lời quốc ca', d: 'Gần như chắc chắn, vì lời bài hát đã cố định và bạn nghe nhiều lần. Ở đây chỉ cần nhớ đúng thứ tự.' },
    { t: 'Từ tiếp theo sau câu “cô ấy rót cà phê vào…”', d: 'Ngữ pháp và thói quen khiến chỉ còn vài cách điền tự nhiên, nhưng đáp án vẫn chưa hoàn toàn cố định.' },
    { t: 'Bạn thân sẽ trả lời gì khi bạn nhắn “tối nay ăn gì?”', d: 'Bạn hiểu khá rõ một người cụ thể nên đoán tốt hơn người lạ. Dù vậy, bạn vẫn không thể chắc chắn.' },
    { t: 'Thời tiết ngày mai', d: 'Thời tiết hôm nay và các quy luật vật lý giúp ta đoán được phần nào. Càng nhìn xa, dự báo càng kém vì thời tiết là một hệ hỗn loạn.' },
    { t: 'Mặt sấp hay ngửa khi tung một đồng xu cân bằng', d: 'Xác suất luôn là 50/50. Có thêm dữ liệu hay giỏi hơn cũng không giúp đoán đúng lần tung tiếp theo. Khó đoán chưa chắc đã phức tạp.' },
    { t: 'Dãy số trúng xổ số', d: 'Có rất nhiều dãy số có khả năng xuất hiện như nhau. Gần như không có gì để dựa vào mà thu hẹp lựa chọn.' },
  ];
  var ITEMS = GM.language.isVietnamese() ? VI_ITEMS : EN_ITEMS;

  GM.widgets['ladder-rank'] = function (container) {
    var w = GM.widgetShell(GM.t('The difficulty ladder', 'Thang độ khó'),
      GM.t('Use ▲▼ to order: easiest to predict at top, hardest at bottom. Then reveal the discussion.', 'Dùng ▲▼ để xếp: dễ dự đoán nhất ở trên, khó nhất ở dưới. Sau đó mở phần thảo luận.'));
    var order = ITEMS.map(function (_, i) { return i; });
    // Start shuffled so the ranking is real work.
    order.sort(function () { return Math.random() - 0.5; });
    var list = GM.el('div');
    var out = GM.el('div');

    function render() {
      list.innerHTML = '';
      order.forEach(function (itemIdx, pos) {
        var up = GM.el('button', { class: 'btn small secondary', 'aria-label': GM.t('move up', 'di chuyển lên') }, ['▲']);
        var down = GM.el('button', { class: 'btn small secondary', 'aria-label': GM.t('move down', 'di chuyển xuống') }, ['▼']);
        up.disabled = pos === 0; down.disabled = pos === order.length - 1;
        up.addEventListener('click', function () { swap(pos, pos - 1); });
        down.addEventListener('click', function () { swap(pos, pos + 1); });
        list.appendChild(GM.el('div', { class: 'ladder-item' }, [
          GM.el('span', { class: 'mono', style: { color: 'var(--muted)' } }, [String(pos + 1)]),
          GM.el('span', {}, [ITEMS[itemIdx].t]),
          GM.el('span', { class: 'ladder-btns' }, [up, down]),
        ]));
      });
    }
    function swap(a, b) {
      var t = order[a]; order[a] = order[b]; order[b] = t;
      render();
    }
    var revealBtn = GM.el('button', { class: 'btn small' }, [GM.t('Reveal the discussion', 'Mở phần thảo luận')]);
    revealBtn.addEventListener('click', function () {
      out.innerHTML = '';
      out.appendChild(GM.feedback('info', GM.t('There is no single right order — what matters is that “hard to predict” turned out to have <em>different causes</em>: fixed scripts, grammatical structure, personal knowledge, chaos, and pure chance are all different rungs.', 'Không có một thứ tự đúng duy nhất. Điều đáng chú ý là mỗi thứ khó đoán vì một lý do khác nhau: có thứ theo mẫu cố định, có thứ phụ thuộc vào ngữ pháp, hiểu biết về một người, hệ hỗn loạn hoặc hoàn toàn do may rủi.')));
      order.forEach(function (itemIdx) {
        out.appendChild(GM.el('div', { class: 'card', style: { boxShadow: 'none', padding: '.7rem 1rem' } }, [
          GM.el('strong', { style: { fontFamily: 'var(--font-sans)', fontSize: '.88rem' } }, [ITEMS[itemIdx].t]),
          GM.el('p', { style: { margin: '.3em 0 0', fontSize: '.92rem' } }, [ITEMS[itemIdx].d]),
        ]));
      });
      out.appendChild(GM.el('p', { class: 'plant-note' }, [GM.t('Keep this ladder. In Week 7, the machine will sit somewhere on it for every prompt you give it — and in Week 8 you’ll see that a knob only matters on the open rungs.', 'Ghi lại cách xếp này. Sang Tuần 7, bạn sẽ xem mỗi câu lệnh đặt mô hình vào mức dễ hay khó đoán nào. Tuần 8 sẽ cho thấy việc chỉnh cách chọn chỉ có tác dụng khi có nhiều đáp án ngang ngửa nhau.')]));
    });
    w.body.appendChild(list);
    w.body.appendChild(GM.el('div', { class: 'gm-row' }, [revealBtn]));
    w.body.appendChild(out);
    render();
    container.appendChild(w.shell);
  };
})();
