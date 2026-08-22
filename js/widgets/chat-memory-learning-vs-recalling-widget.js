/* The goldfish chat: scripted demo that in-conversation "memory" is just visible
   context, and a fresh conversation proves the weights never moved. */
(function () {
  GM.widgets['chat-memory-demo'] = function (container) {
    var w = GM.widgetShell(GM.t('The goldfish chat', 'Cuộc trò chuyện cá vàng'),
      GM.t('A scripted conversation with the simulated model. Run the steps in order and watch what “remembering” turns out to be.', 'Cuộc trò chuyện có kịch bản với mô hình mô phỏng. Chạy đúng thứ tự và xem “nhớ” thật ra là gì.'));
    var told = false;
    var chat = GM.el('div');
    var controls = GM.el('div', { class: 'gm-row' });
    var explain = GM.el('div');

    function bubble(who, text) {
      chat.appendChild(GM.el('div', { class: 'machine-out', style: who === 'you' ? { borderLeftColor: 'var(--accent)' } : {} }, [
        GM.el('span', { class: 'machine-tag', style: who === 'you' ? { color: 'var(--accent)' } : {} }, [who === 'you' ? GM.t('you', 'bạn') : GM.t('model', 'mô hình')]),
        text,
      ]));
    }
    var tellBtn = GM.el('button', { class: 'btn small' }, [GM.t('Tell it: “My cat is named Marmalade”', 'Nói: “Mèo của tôi tên Marmalade”')]);
    var askBtn = GM.el('button', { class: 'btn small teal' }, [GM.t('Ask: “What’s my cat’s name?”', 'Hỏi: “Mèo của tôi tên gì?”')]);
    var freshBtn = GM.el('button', { class: 'btn small secondary' }, [GM.t('Start a fresh conversation', 'Mở cuộc trò chuyện mới')]);

    tellBtn.addEventListener('click', function () {
      bubble('you', GM.t('My cat is named Marmalade.', 'Mèo của tôi tên Marmalade.'));
      bubble('model', GM.t('Marmalade — great name. Noted!', 'Marmalade — tên hay đấy. Tôi ghi nhận rồi!'));
      told = true;
    });
    askBtn.addEventListener('click', function () {
      bubble('you', GM.t('What’s my cat’s name?', 'Mèo của tôi tên gì?'));
      if (told) {
        bubble('model', GM.t('Your cat’s name is Marmalade.', 'Mèo của bạn tên Marmalade.'));
        explain.innerHTML = '';
        explain.appendChild(GM.feedback('info',
          GM.t('The answer uses text from the visible conversation. The application sends that conversation back to the model on each turn.', 'Câu trả lời dùng thông tin trong cuộc trò chuyện đang hiển thị. Ứng dụng gửi lại nội dung cuộc trò chuyện cho mô hình ở mỗi lượt.')));
      } else {
        bubble('model', GM.t('I don’t have any information about your cat. If you tell me its name, I can use it in this conversation.', 'Tôi không có thông tin về mèo của bạn. Nếu bạn cho biết tên, tôi có thể dùng nó trong cuộc trò chuyện này.'));
      }
    });
    freshBtn.addEventListener('click', function () {
      chat.innerHTML = '';
      told = false;
      bubble('model', GM.t('— new conversation —', '— cuộc trò chuyện mới —'));
      explain.innerHTML = '';
      explain.appendChild(GM.feedback('warn',
        GM.t('The new conversation does not include the cat’s name, so the model cannot use it. Starting a normal chat did ' +
        'not retrain the model; it only changed the text supplied for the current response.', 'Cuộc trò chuyện mới không chứa tên con mèo nên mô hình không thể dùng thông tin đó. Mở một cuộc trò chuyện thông thường không huấn luyện lại mô hình; nó chỉ thay đổi phần văn bản được đưa vào cho câu trả lời hiện tại.')));
    });
    controls.appendChild(tellBtn); controls.appendChild(askBtn); controls.appendChild(freshBtn);
    w.body.appendChild(controls);
    w.body.appendChild(chat);
    w.body.appendChild(explain);
    container.appendChild(w.shell);
  };
})();
