/* Attention made visible: click a word, see how strongly the model weighs each
   earlier word when guessing at that position. Canned weights for key positions. */
(function () {
  var WORDS = GM.language.isVietnamese()
    ? ['Chìa', 'khóa', 'đang', 'ở', 'trên', 'bàn', 'cạnh', 'ngọn', 'đèn', ';', 'đưa', 'chúng', 'cho', 'tôi']
    : ['The', 'keys', 'are', 'on', 'the', 'table', 'next', 'to', 'the', 'lamp', ';', 'hand', 'me', 'them'];
  // Hand-prepared relevance maps (index -> {earlierIndex: weight}) for the interesting positions.
  var MAPS = {
    13: { 1: 0.58, 11: 0.13, 9: 0.08, 5: 0.07, 12: 0.06 },     // "them" -> keys
    9:  { 5: 0.34, 6: 0.22, 8: 0.14, 3: 0.09 },                 // "lamp" -> table/next
    5:  { 3: 0.31, 1: 0.27, 4: 0.16 },                          // "table" -> on/keys
    11: { 10: 0.25, 1: 0.22, 9: 0.12, 5: 0.1 },                 // "hand" -> ;/keys
  };
  var TARGET = 13;
  if (GM.language.isVietnamese()) {
    MAPS = {
      11: { 1: 0.58, 10: 0.13, 8: 0.08, 5: 0.07, 9: 0.06 },
      8: { 5: 0.34, 6: 0.22, 7: 0.14, 3: 0.09 },
      5: { 3: 0.31, 1: 0.27, 4: 0.16 },
      10: { 9: 0.25, 1: 0.22, 8: 0.12, 5: 0.1 },
    };
    TARGET = 11;
  }
  function weightsFor(idx) {
    if (MAPS[idx]) return MAPS[idx];
    var m = {}; // fallback: mild recency profile
    for (var i = Math.max(0, idx - 3); i < idx; i++) m[i] = 0.3 - 0.08 * (idx - 1 - i);
    return m;
  }

  GM.widgets['attention-viz'] = function (container) {
    var w = GM.widgetShell(GM.t('The relevance visualizer', 'Trình trực quan hóa mức liên quan'),
      GM.t('Click any word. Shading shows how strongly the model weighs each earlier word while guessing at that position. Try “them” last.', 'Nhấp từ bất kỳ. Màu đậm cho thấy mô hình đặt trọng số lên mỗi từ trước mạnh đến đâu khi dự đoán ở vị trí đó. Hãy thử “chúng” sau cùng.'));
    var row = GM.el('div', { class: 'attn-sentence' });
    var detail = GM.el('div');
    var wordEls = [];

    function select(idx) {
      var map = weightsFor(idx);
      var max = Math.max.apply(null, Object.keys(map).map(function (k) { return map[k]; }).concat([0.01]));
      wordEls.forEach(function (el, i) {
        el.classList.toggle('focus', i === idx);
        if (i < idx && map[i]) {
          var pct = Math.round(map[i] / max * 75);
          el.style.background = 'color-mix(in srgb, var(--teal) ' + pct + '%, var(--bg-inset))';
          el.style.color = pct > 45 ? '#fff' : '';
        } else if (i !== idx) {
          el.style.background = ''; el.style.color = '';
        }
      });
      detail.innerHTML = '';
      var top = Object.keys(map).sort(function (a, b) { return map[b] - map[a]; }).slice(0, 3);
      detail.appendChild(GM.el('p', { class: 'note' }, [
        GM.t('While guessing at “', 'Khi dự đoán ở “') + WORDS[idx] + GM.t('”, the heaviest-weighted earlier words: ', '”, các từ trước có trọng số cao nhất: ') +
        top.map(function (k) { return '“' + WORDS[k] + '” (' + Math.round(map[k] * 100) + '%)'; }).join(', ') + '.',
      ]));
      if (idx === TARGET) {
        detail.appendChild(GM.feedback('info',
          GM.t('“them” leans hardest on <strong>“keys”</strong> — nine words back, past a decoy noun (“lamp”) and a nearer one ' +
          '(“table”). This is the answer to the puzzle: at every step, a computed relevance lookup decides which earlier ' +
          'words matter <em>now</em>, and it learned to link pronouns to the things they stand for. No “focus” in any mental ' +
          'sense — numbers you are currently looking at.', '“chúng” dựa mạnh nhất vào <strong>“khóa”</strong> — cách nhiều từ, vượt qua danh từ gây nhiễu “đèn” và từ gần hơn “bàn”. Đây là đáp án câu đố: ở mỗi bước, phép tra cứu mức liên quan quyết định từ nào trước đó quan trọng <em>ngay lúc này</em>, và mô hình đã học liên kết đại từ với đối tượng được chỉ. Không có “tập trung” theo nghĩa tâm trí — chỉ có các con số bạn đang nhìn.')));
      }
    }
    WORDS.forEach(function (word, i) {
      var el = GM.el('span', { class: 'attn-word', role: 'button', tabindex: '0' }, [word]);
      el.addEventListener('click', function () { select(i); });
      el.addEventListener('keydown', function (e) { if (e.key === 'Enter') select(i); });
      wordEls.push(el); row.appendChild(el);
    });
    w.body.appendChild(row);
    w.body.appendChild(detail);
    w.body.appendChild(GM.el('p', { class: 'note' },
      [GM.t('These weights are hand-prepared for this one sentence, shaped like real attention maps; real models compute fresh ones for every sentence, at every position, in every layer — all inspectable the same way.', 'Các trọng số này được soạn cho riêng câu này theo hình dạng bản đồ attention thật; mô hình thật tính bộ mới cho mọi câu, mọi vị trí, mọi lớp — và đều có thể quan sát theo cách tương tự.')])) ;
    select(TARGET);
    container.appendChild(w.shell);
  };
})();
