/* The ascription game: transcripts with hidden sources. Vote, then reveal source
   + what test would actually move the needle. The point is the test, not the verdict. */
(function () {
  var CASES = [
    { title: 'Transcript A', text:
        '<span class="speaker">Q:</span> I’ve been feeling like nobody listens to me.<br>' +
        '<span class="speaker">A:</span> Why do you feel that nobody listens to you?<br>' +
        '<span class="speaker">Q:</span> My sister only talks about herself.<br>' +
        '<span class="speaker">A:</span> Tell me more about your sister.',
      source: 'ELIZA (1966) — a program of a few reflection tricks: flip pronouns, echo, prompt for more.',
      test: 'Break the script: say something the reflection rules mangle (“my sister is a submarine”). A listener who understands notices absurdity; a pattern-flipper reflects it back deadpan.' },
    { title: 'Transcript B', text:
        '<span class="speaker">Q:</span> Why does the big boat float when a little stone sinks?<br>' +
        '<span class="speaker">A:</span> The boat is spread out big so the water can hold it up everywhere. The stone is all squeezed into one spot, so the water can’t hold it.',
      source: 'A five-year-old human. Wrong in the details, yet tracking a real principle (displacement, groped-for).',
      test: 'Novel transfer: “would a flat sheet of the stone float?” The child’s answer will show whether the spread-out idea does real work or was a memorized phrase.' },
    { title: 'Transcript C', text:
        '<span class="speaker">Q:</span> Explain the joke: “I told my suitcase there’ll be no vacation this year. Now I’m dealing with emotional baggage.”<br>' +
        '<span class="speaker">A:</span> The humor comes from the double meaning of “emotional baggage”: literally, a suitcase with feelings; figuratively, unresolved psychological burdens. The joke treats the idiom as if it were literal.',
      source: 'A large language model. Fluent, correct, and produced by likely-text machinery.',
      test: 'The Week 4 move: novel cases. Invent a brand-new joke structure never written down anywhere and ask for the mechanism. Also probe consistency: does it give compatible explanations under rephrasing?' },
    { title: 'Transcript D', text:
        '<span class="speaker">Report:</span> The dog was taught names for over 1,000 toys. Told “fetch Bamboozle” — a name she had never heard, placed among familiar toys — she paused, then brought the one unfamiliar toy.',
      source: 'Chaser, a border collie (published animal-cognition research). The inference: new word → the thing without a name yet.',
      test: 'Controls, von-Pfungst style: does it survive when the handler doesn’t know which toy is which? Repeat with the experimenter out of the room; vary positions; rule out scent and gaze cues.' },
    { title: 'Transcript E', text:
        '<span class="speaker">Report:</span> Asked “what is 12 plus 7?”, the pony tapped its hoof nineteen times and stopped, to applause. It succeeded with several different questioners.',
      source: 'A Clever-Hans-style performance. Genuine skill — reading humans — misdescribed as arithmetic.',
      test: 'The historical controls exactly: questioners who don’t know the answer, and blinders. If accuracy collapses, the skill was cue-reading. (It did, and it was.)' },
  ];

  GM.widgets['ascription-game'] = function (container) {
    var w = GM.widgetShell('The ascription game',
      'For each transcript: argue both sides in your head, vote, then reveal. Score yourself on the quality of your proposed test, not your verdict.');
    CASES.forEach(function (c) {
      var verdict = null;
      var voteRow = GM.el('div', { class: 'gm-row' });
      var reveal = GM.el('div');
      ['It understands', 'It doesn’t', 'Can’t say without a further test'].forEach(function (v) {
        var chip = GM.el('span', { class: 'chip', role: 'button', tabindex: '0' }, [v]);
        chip.addEventListener('click', function () {
          voteRow.querySelectorAll('.chip').forEach(function (x) { x.classList.remove('selected'); });
          chip.classList.add('selected'); verdict = v;
        });
        voteRow.appendChild(chip);
      });
      var btn = GM.el('button', { class: 'btn small' }, ['Reveal source & the test']);
      btn.addEventListener('click', function () {
        btn.disabled = true;
        reveal.appendChild(GM.feedback('info', '<strong>Source:</strong> ' + c.source));
        reveal.appendChild(GM.feedback('good', '<strong>A test that would move the needle:</strong> ' + c.test));
        if (verdict === 'Can’t say without a further test') {
          reveal.appendChild(GM.el('p', { class: 'note' }, ['You picked the option this game exists to teach. “Understands” without a test attached is a feeling, not a finding.']));
        }
      });
      w.body.appendChild(GM.el('div', { class: 'card transcript', style: { boxShadow: 'none' } }, [
        GM.el('strong', { style: { fontFamily: 'var(--font-sans)', fontSize: '.85rem' } }, [c.title]),
        GM.el('p', { html: c.text }),
        voteRow,
        GM.el('div', { class: 'gm-row' }, [btn]),
        reveal,
      ]));
    });
    container.appendChild(w.shell);
  };
})();
