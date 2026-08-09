/* Home page: course pitch, how sessions work, design principles, arc overview cards. */
GM.views.home = function (main) {
  var page = GM.el('div', { class: 'page' });

  page.appendChild(GM.el('header', { class: 'hero' }, [
    GM.el('p', { class: 'eyebrow' }, ['A self-paced interactive course']),
    GM.el('h1', {}, ['Understanding the Guessing Machines']),
    GM.el('p', { class: 'hero-sub' }, ['Twelve weeks on AI and LLMs — epistemology first, machinery second.']),
    GM.el('div', { html:
      '<p>This course is for motivated adults with <strong>no math or CS background</strong> — arithmetic only until Week 10. ' +
      'You will not start with neural networks. You will start with <em>yourself</em>: the involuntary guessing you do every ' +
      'time someone leaves a sentence unfinished. By the time a machine appears (Week 7), you will already own every concept ' +
      'needed to understand it.</p>' +
      '<p>One deliberate trick runs through everything: <strong>the course quarantines jargon</strong>. For nine weeks, ideas ' +
      'go by plain names — the guessing game, surprise, maps that discard, the choosing knob. In Week 10 you get the ' +
      'passwords, and discover you already knew the field’s core ideas. That page stays locked until you earn it.</p>' }),
    GM.el('p', {}, [GM.el('a', { class: 'btn', href: '#/week/1' }, ['Start Week 1 →'])]),
  ]));

  page.appendChild(GM.el('h2', {}, ['How each week works']));
  page.appendChild(GM.el('div', { html:
    '<p>Every session follows the same four-beat shape:</p>' +
    '<ol>' +
    '<li><strong>🧩 The puzzle</strong> — something you observe or do that you cannot yet explain.</li>' +
    '<li><strong>🛠️ Do it yourself</strong> — you generate the phenomenon with your own hands, in interactive exercises. Many were designed for pairs; solo variants are built in, and grabbing a friend makes them better.</li>' +
    '<li><strong>🏷️ Naming</strong> — the concept, articulated in plain words, as the thing you just experienced.</li>' +
    '<li><strong>✅ Checkpoint</strong> — a concrete "can you now do X" self-test. Behavioral, never "do you feel you understood."</li>' +
    '</ol>' +
    '<p class="note">Assessment philosophy: you understand something when you can (a) teach it to an outsider, and ' +
    '(b) <em>predict</em> what a system will do before it does it. Nothing is graded; the checkpoints are yours.</p>' }));

  page.appendChild(GM.el('h2', {}, ['The four rules this course lives by']));
  var principles = [
    ['1 · Phenomenon first', 'No concept is introduced for its own sake. Every week opens with a puzzle you can’t yet explain; the concept is the resolution, never the starting point.'],
    ['2 · Operationalize or cut', 'Every concept must be done in an exercise, not just heard as a metaphor. If you can’t perform or observe it live, it isn’t in Weeks 1–9.'],
    ['3 · No theory of cognition', 'The course never claims what minds are or whether LLMs have them. It teaches how to decide, for any system, what evidence would justify saying it "knows."'],
    ['4 · Jargon quarantine', 'Weeks 1–9 build a folk vocabulary in plain words. Technical terms appear only in Week 10+, as labels attached to intuitions you already own.'],
  ];
  principles.forEach(function (p) {
    page.appendChild(GM.el('div', { class: 'card principle-card' }, [
      GM.el('h3', {}, [p[0]]), GM.el('p', {}, [p[1]]),
    ]));
  });

  page.appendChild(GM.el('h2', {}, ['The four arcs']));
  GM.arcs.forEach(function (arc) {
    var doneInArc = arc.weeks.filter(function (n) { return GM.store.isCheckpointDone(n); }).length;
    page.appendChild(GM.el('a', { class: 'card arc-overview-card', href: '#/week/' + arc.weeks[0] }, [
      GM.el('h3', {}, [arc.name]),
      GM.el('p', { style: { fontStyle: 'italic', color: 'var(--ink-soft)' } }, [arc.claim]),
      GM.el('p', { class: 'arc-weeks' }, [
        'Weeks ' + arc.weeks[0] + '–' + arc.weeks[arc.weeks.length - 1] +
        ' · ' + doneInArc + '/' + arc.weeks.length + ' checkpoints passed',
      ]),
    ]));
  });

  page.appendChild(GM.el('hr'));
  page.appendChild(GM.el('div', { html:
    '<p class="note">A note on the machines in this course: Weeks 7–9 include a small <strong>simulated language model</strong> ' +
    'built into these pages — real scoring-and-choosing math over hand-prepared candidate lists, so every knob works offline ' +
    'and reproducibly. Where behavior differs from a full-scale model, the text says so. For the full experience, the same ' +
    'exercises can be re-run against any playground-style LLM interface that exposes temperature.</p>' }));

  main.appendChild(page);
};
