/* Induction-head demo: the "…A B … A → guess B" copy pattern, run on names the
   learner invents this minute — so the completion cannot be memorized. */
(function () {
  GM.widgets['induction-demo'] = function (container) {
    var w = GM.widgetShell(GM.t('The paired-name induction test', 'Phép thử suy ra cặp tên'),
      GM.t('Invent a first and last name nobody has ever written down. The machine will see the pair once — then complete the pattern.', 'Bịa một tên và họ chưa ai từng viết. Máy sẽ thấy cặp đó một lần — rồi hoàn tất mẫu.'));
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
        GM.el('span', { class: 'machine-tag' }, [GM.t('model’s top guess for the next word', 'dự đoán từ tiếp theo cao nhất của máy')]),
        B + GM.t('   (by a wide margin)', '   (vượt xa lựa chọn khác)'),
      ]));
      out.appendChild(GM.feedback('info',
        GM.t('“' + A + ' ' + B + '” appears in no training data — you invented it seconds ago. The model is running a learned, ' +
        'general pattern: <span class="mono">…A B … A → guess B</span>. Whatever followed this token last time it appeared, ' +
        'guess it again.', '“' + A + ' ' + B + '” không có trong dữ liệu huấn luyện — bạn vừa bịa ra. Mô hình đang chạy mẫu tổng quát đã học: <span class="mono">…A B … A → đoán B</span>. Thứ từng theo sau token này lần trước sẽ được đoán lại.')));
      out.appendChild(GM.feedback('good',
        GM.t('<strong>Why this matters:</strong> researchers located the specific internal components performing this copy ' +
        '(nicknamed <em>induction heads</em>), watched them form partway through training, and saw this ability appear when ' +
        'they do. Behavior you just replicated → mechanism found, traced, and tested. The box is opaque by default, ' +
        'not sealed.', '<strong>Vì sao điều này quan trọng:</strong> các nhà nghiên cứu đã xác định các thành phần bên trong thực hiện việc sao chép (gọi là <em>induction head</em>), quan sát chúng hình thành giữa quá trình huấn luyện và thấy năng lực này xuất hiện cùng lúc. Hành vi bạn vừa tái tạo → cơ chế được tìm, lần theo và kiểm tra. Chiếc hộp mặc định khó nhìn, nhưng không bị niêm phong.')));
    });
    w.body.appendChild(GM.el('div', { class: 'gm-row' }, [a, b, btn]));
    w.body.appendChild(out);
    container.appendChild(w.shell);
  };
})();
