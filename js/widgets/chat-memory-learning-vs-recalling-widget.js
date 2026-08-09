/* The goldfish chat: scripted demo that in-conversation "memory" is just visible
   context, and a fresh conversation proves the weights never moved. */
(function () {
  GM.widgets['chat-memory-demo'] = function (container) {
    var w = GM.widgetShell('The goldfish chat',
      'A scripted conversation with the simulated model. Run the steps in order and watch what “remembering” turns out to be.');
    var told = false;
    var chat = GM.el('div');
    var controls = GM.el('div', { class: 'gm-row' });
    var explain = GM.el('div');

    function bubble(who, text) {
      chat.appendChild(GM.el('div', { class: 'machine-out', style: who === 'you' ? { borderLeftColor: 'var(--accent)' } : {} }, [
        GM.el('span', { class: 'machine-tag', style: who === 'you' ? { color: 'var(--accent)' } : {} }, [who === 'you' ? 'you' : 'model']),
        text,
      ]));
    }
    var tellBtn = GM.el('button', { class: 'btn small' }, ['Tell it: “My cat is named Marmalade”']);
    var askBtn = GM.el('button', { class: 'btn small teal' }, ['Ask: “What’s my cat’s name?”']);
    var freshBtn = GM.el('button', { class: 'btn small secondary' }, ['Start a fresh conversation']);

    tellBtn.addEventListener('click', function () {
      bubble('you', 'My cat is named Marmalade.');
      bubble('model', 'Marmalade — great name. Noted!');
      told = true;
    });
    askBtn.addEventListener('click', function () {
      bubble('you', 'What’s my cat’s name?');
      if (told) {
        bubble('model', 'Your cat’s name is Marmalade.');
        explain.innerHTML = '';
        explain.appendChild(GM.feedback('info',
          'It “remembers” — but look at <em>where</em> the fact lives: in the visible conversation above, which the model ' +
          're-reads on every turn. The fact is on the table in front of it, not inside it.'));
      } else {
        bubble('model', 'I don’t have any information about your cat. If you tell me its name, I can use it in this conversation.');
      }
    });
    freshBtn.addEventListener('click', function () {
      chat.innerHTML = '';
      told = false;
      bubble('model', '— new conversation —');
      explain.innerHTML = '';
      explain.appendChild(GM.feedback('warn',
        'The table has been cleared. Ask about the cat now: the fact is <strong>gone</strong>. Nothing was learned — the ' +
        'billions of frozen numbers inside the model did not move when you typed. What moved them was a training process ' +
        'that ended before you arrived. In-conversation “memory” = what’s written in front of a frozen guesser; ' +
        'learning = the adjusting that happened long ago, once.'));
    });
    controls.appendChild(tellBtn); controls.appendChild(askBtn); controls.appendChild(freshBtn);
    w.body.appendChild(controls);
    w.body.appendChild(chat);
    w.body.appendChild(explain);
    container.appendChild(w.shell);
  };
})();
