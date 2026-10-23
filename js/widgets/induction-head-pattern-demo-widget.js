/* Induction-head demo: the "…A B … A → guess B" copy pattern, run on names the
   learner invents this minute — so the completion cannot be memorized. */
(function () {
  GM.widgets['induction-demo'] = function (container) {
    var w = GM.widgetShell(GM.t('The paired-name induction test', 'Thử quy luật lặp tên'),
      GM.t('Enter a pair of names. A programmed rule copies the second name when the first appears again.', 'Nhập tên và họ bất kỳ. Khi tên xuất hiện lần nữa, đoạn mã sẽ điền lại họ đứng sau nó ở lần đầu.'));
    var a = GM.el('input', { type: 'text', placeholder: GM.t('first name (e.g. Blicket)', 'tên (vd: Blicket)'), value: 'Blicket' });
    var b = GM.el('input', { type: 'text', placeholder: GM.t('last name (e.g. Farnsworth)', 'họ (vd: Farnsworth)'), value: 'Vantorbeck' });
    var out = GM.el('div');
    var btn = GM.el('button', { class: 'btn small teal' }, [GM.t('Run the test', 'Thử')]);
    btn.addEventListener('click', function () {
      var A = (a.value.trim().split(/\s+/)[0] || 'Blicket');
      var B = (b.value.trim().split(/\s+/)[0] || 'Vantorbeck');
      out.innerHTML = '';
      out.appendChild(GM.el('div', { class: 'machine-out' }, [
        GM.el('span', { class: 'machine-tag' }, [GM.t('prompt', 'yêu cầu')]),
        GM.t('At the conference I was introduced to ', 'Ở hội nghị, tôi được giới thiệu với ') + A + ' ' + B + GM.t(', who gave the opening talk. Later that evening, I ran into ', ', người trình bày khai mạc. Tối hôm đó, tôi gặp lại ') + A + ' ▊',
      ]));
      out.appendChild(GM.el('div', { class: 'machine-out' }, [
        GM.el('span', { class: 'machine-tag' }, [GM.t('programmed completion', 'phần điền theo quy tắc')]),
        B,
      ]));
      out.appendChild(GM.feedback('info',
        GM.t('The demo copies your second entry using <span class="mono">A B … A → B</span>. No training occurs here, and inventing a name does not prove that it never appeared elsewhere.', 'Đoạn mã làm đúng một việc: thấy mẫu <span class="mono">A B … A</span> thì điền <span class="mono">B</span>. Nó không học thêm gì trong lúc bạn thử. Việc bạn tự nghĩ ra một cái tên cũng chưa đủ để chứng minh tên đó chưa từng xuất hiện ở đâu khác.')));
      out.appendChild(GM.feedback('good',
        GM.t('Researchers studied similar copying behavior inside neural networks. The Week 11 study tests which components cause it. This programmed demo illustrates the behavior only.', 'Các nhà nghiên cứu đã tìm thấy hành vi sao chép tương tự bên trong mạng nơ-ron và kiểm tra xem bộ phận nào tạo ra nó. Bạn sẽ đọc nghiên cứu đó ở Tuần 11; ví dụ này chỉ giúp hình dung hành vi cần giải thích.')));
    });
    w.body.appendChild(GM.el('div', { class: 'gm-row' }, [a, b, btn]));
    w.body.appendChild(out);
    container.appendChild(w.shell);
  };
})();
