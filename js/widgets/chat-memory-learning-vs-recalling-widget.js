/* The goldfish chat: scripted demo that in-conversation "memory" is just visible
   context, and a fresh conversation proves the weights never moved. */
(function () {
  GM.widgets['chat-memory-demo'] = function (container) {
    var w = GM.widgetShell(GM.t('The goldfish chat', 'Mô hình “nhớ” bằng cách nào?'),
      GM.t('A scripted conversation with the simulated model. Run the steps in order and watch what “remembering” turns out to be.', 'Hãy bấm các nút theo thứ tự để xem vì sao mô hình trả lời được thông tin vừa nói, rồi điều gì xảy ra khi mở cuộc trò chuyện mới.'));
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
      bubble('model', GM.t('Marmalade — great name. Noted!', 'Marmalade — tên hay đấy!'));
      told = true;
    });
    askBtn.addEventListener('click', function () {
      bubble('you', GM.t('What’s my cat’s name?', 'Mèo của tôi tên gì?'));
      if (told) {
        bubble('model', GM.t('Your cat’s name is Marmalade.', 'Mèo của bạn tên Marmalade.'));
        explain.innerHTML = '';
        explain.appendChild(GM.feedback('info',
          GM.t('The answer uses text from the visible conversation. The application sends that conversation back to the model on each turn.', 'Mô hình trả lời được vì ứng dụng gửi lại phần trò chuyện phía trên cùng với câu hỏi mới ở mỗi lượt.')));
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
        'not retrain the model; it only changed the text supplied for the current response.', 'Cuộc trò chuyện mới không có tên con mèo, nên mô hình không còn thông tin để trả lời. Cuộc trò chuyện trước chỉ nằm trong ngữ cảnh được gửi kèm; nó không làm mô hình được huấn luyện lại.')));
    });
    controls.appendChild(tellBtn); controls.appendChild(askBtn); controls.appendChild(freshBtn);
    w.body.appendChild(controls);
    w.body.appendChild(chat);
    w.body.appendChild(explain);
    container.appendChild(w.shell);
  };
})();
