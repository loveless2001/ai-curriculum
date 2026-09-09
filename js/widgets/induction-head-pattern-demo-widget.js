/* Induction-head demo: the "…A B … A → guess B" copy pattern, run on names the
   learner invents this minute — so the completion cannot be memorized. */
(function () {
  GM.widgets['induction-demo'] = function (container) {
    var w = GM.widgetShell(GM.t('The paired-name induction test', 'Phép thử suy ra cặp tên'),
      GM.t('Enter a pair of names. A programmed rule copies the second name when the first appears again.', 'Nhập một cặp tên. Quy tắc lập trình sẵn chép tên thứ hai khi tên thứ nhất xuất hiện lại.'));
    var a = GM.el('input', { type: 'text', placeholder: GM.t('first name (e.g. Blicket)', 'tên (vd: Blicket)'), value: 'Blicket' });
    var b = GM.el('input', { type: 'text', placeholder: GM.t('last name (e.g. Farnsworth)', 'họ (vd: Farnsworth)'), value: 'Vantorbeck' });
    var out = GM.el('div');
    var btn = GM.el('button', { class: 'btn small teal' }, [GM.t('Run the test', 'Chạy phép thử')]);
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
        GM.t('The demo copies your second entry using <span class="mono">A B … A → B</span>. No training occurs here, and inventing a name does not prove that it never appeared elsewhere.', 'Mô phỏng chép mục thứ hai theo <span class="mono">A B … A → B</span>. Không có huấn luyện ở đây; tự nghĩ ra tên chưa chứng minh tên đó chưa từng xuất hiện nơi khác.')));
      out.appendChild(GM.feedback('good',
        GM.t('Researchers studied similar copying behavior inside neural networks. The Week 11 study tests which components cause it. This programmed demo illustrates the behavior only.', 'Các nhà nghiên cứu đã khảo sát hành vi sao chép tương tự trong mạng nơ-ron. Nghiên cứu ở Tuần 11 kiểm tra thành phần nào gây ra nó. Mô phỏng lập trình sẵn này chỉ minh họa hành vi.')));
    });
    w.body.appendChild(GM.el('div', { class: 'gm-row' }, [a, b, btn]));
    w.body.appendChild(out);
    container.appendChild(w.shell);
  };
})();
