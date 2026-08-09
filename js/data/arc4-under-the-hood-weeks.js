/* Arc 4 (Weeks 10-12): Under the hood, and the road onward. Jargon reveal,
   training loop, attention/circuits, alignment pipeline, capstone, exit ramp. */
GM.arcs.push({
  id: 4,
  name: 'Arc 4 — Under the hood, and the road onward',
  shortName: 'Arc 4 · Under the hood',
  claim: 'The intuitions are built; now attach the real machinery and the real words. First gentle math appears here. This arc is a foundation-plus-exit-ramp — success means you can enter the technical literature without drowning.',
  weeks: [10, 11, 12],
});

GM.weeks.push({
  num: 10, arcId: 4, showArcBanner: true,
  short: 'How training works — and the jargon reveal',
  title: 'How training works, and the jargon reveal',
  tagline: 'You’ve been doing the field’s concepts for nine weeks. Here are the passwords.',
  checkpointStatement: 'I can narrate the full training loop in plain words and in official vocabulary, and I can read the two-column dictionary as my own.',
  beats: [
    { kind: 'puzzle', html:
      '<p>Week 7’s claim was: <em>“adjusted over vast text until its surprise got low.”</em></p>' +
      '<p>Adjusted <strong>how</strong>? There are billions of numbers inside, and no programmer sets any of them by hand. ' +
      'Nobody could. So what does the adjusting?</p>' },
    { kind: 'exercise', title: 'The jargon reveal', html:
      '<p>First, the set-piece you’ve earned. Nine weeks of folk vocabulary — and every single term has an official name in ' +
      'the field. Reveal them one at a time:</p>',
      widget: 'jargon-reveal' },
    { kind: 'exercise', title: 'The training loop, narrated', html:
      '<div class="card"><p>Here is the entire loop, in the vocabulary you now own twice over:</p>' +
      '<ol><li><strong>Show</strong> the model a stretch of real text.</li>' +
      '<li><strong>Guess:</strong> it plays the guessing game (<em>next-token prediction</em>) at every position.</li>' +
      '<li><strong>Measure surprise:</strong> how wrong was it? (<em>loss, cross-entropy</em>)</li>' +
      '<li><strong>Nudge:</strong> adjust every number a hair in the direction that would have made the surprise smaller.</li>' +
      '<li><strong>Repeat</strong> — trillions of times.</li></ol>' +
      '<p>Step 4 has a name: <strong>gradient descent</strong> — “downhill in the dark, one small step at a time.” You can’t ' +
      'see the whole landscape; you can only feel the slope under your feet.</p></div>' },
    { kind: 'exercise', title: 'Hand-run the loop yourself', html:
      '<p>The first graph of the course. Below is a “model” with <strong>one</strong> adjustable number, and its surprise ' +
      'plotted against that number. Do the training yourself: feel the slope, take a step downhill, repeat. Arithmetic only — ' +
      'and it is genuinely the same loop, just with one number instead of billions.</p>',
      widget: 'gradient-descent' },
    { kind: 'exercise', title: 'Why the field bet everything on this', html:
      '<div class="card"><p>One more fact, and it’s the strategic one: more text, more numbers, more computing power → ' +
      'reliably lower surprise. And the improvement was <em>predictable</em> — predictable enough to plot as a straight line ' +
      'on the right axes <em>before building the next model</em> (the <strong>scaling laws</strong>).</p>' +
      '<p>This predictability — not any single clever idea — is why the field poured everything into scale. You could buy ' +
      'capability with a plotted line’s confidence.</p></div>' },
    { kind: 'naming', html:
      '<p>Today the naming beat <em>is</em> the reveal. From here on, the course uses both vocabularies interchangeably — and ' +
      'so can you. The <a href="#/dictionary">two-column dictionary</a> is now unlocked in the sidebar for reference.</p>' },
    { kind: 'checkpoint', html:
      '<p>Narrate the training loop twice — once in folk words (show, guess, surprise, nudge), once in official words (tokens, ' +
      'prediction, loss, gradient descent). If either version needs a word you can’t explain, go back one week.</p>' },
  ],
});

GM.weeks.push({
  num: 11, arcId: 4,
  short: 'Inside the box: attention and circuits',
  title: 'Inside the box: attention and circuits',
  tagline: 'Opaque by default — but not sealed.',
  checkpointStatement: 'I can describe attention in one sentence without mentalist vocabulary, and recount one concrete, real mechanism found inside a real model.',
  beats: [
    { kind: 'puzzle', html:
      '<blockquote>“The keys are on the table next to the lamp; hand me ___.”</blockquote>' +
      '<p>Anything guessing one word at a time should guess “them.” But “them” refers to the <em>keys</em> — nine words back. ' +
      '<strong>How does a one-word-at-a-time guesser know which earlier words matter now?</strong> Something inside must ' +
      'decide.</p>' },
    { kind: 'exercise', title: 'The relevance visualizer', html:
      '<p>Here is that mechanism, made visible. At each step, the model computes how relevant every earlier word is to the ' +
      'current guess, and blends accordingly. Click any word in the sentence to see where its guess is “looking.”</p>' +
      '<p>Note what this is <em>not</em>: it is not “focus” in any mental sense. It is a learned, per-step relevance lookup — ' +
      'a computation with inspectable numbers, which is exactly why we can draw it.</p>',
      widget: 'attention-viz' },
    { kind: 'exercise', title: 'One real circuit, end to end: induction heads', html:
      '<p>Models learn a copyable pattern: <span class="mono">…A B … A → guess B</span>. If the text earlier contained ' +
      '“Blicket Farnsworth,” then the next time “Blicket” appears, guess “Farnsworth” — even for names invented this minute, ' +
      'which can’t be in any training data. Replicate the behavior yourself:</p>',
      widget: 'induction-demo' },
    { kind: 'exercise', title: 'What the researchers then found', html:
      '<div class="card"><p>Here’s why this little pattern is famous. Researchers didn’t just observe the behavior — they ' +
      '<strong>located the specific internal components doing it</strong> (nicknamed <em>induction heads</em>), watched them ' +
      'form during training, and saw the copy-the-pattern ability appear when they do.</p>' +
      '<p>The point, stated carefully: the box is opaque by default but <em>not sealed</em>. Mechanisms can be found, traced, ' +
      'and tested. This work — <strong>interpretability</strong> — is young, and most of the box is still unmapped. Neither ' +
      '“we understand everything inside” nor “it’s an unknowable black box” is true.</p></div>' },
    { kind: 'naming', html:
      '<p><strong>Attention:</strong> at each step, a computed weighting of how relevant every earlier word is to the current ' +
      'guess. One sentence, no minds mentioned.</p>' +
      '<p><strong>A circuit:</strong> a traceable internal mechanism with a testable job — induction heads are the classic ' +
      'worked example.</p>' },
    { kind: 'checkpoint', html:
      '<p>Two sentences, out loud: (1) attention, described without mentalist vocabulary; (2) the induction-head story — the ' +
      'behavior, and the fact that specific components doing it were found and watched forming.</p>' },
  ],
});

GM.weeks.push({
  num: 12, arcId: 4,
  short: 'From predictor to chatbot; the exit',
  title: 'From predictor to chatbot; the frontier; the exit',
  tagline: 'The personality is a trained layer, not a resident.',
  checkpointStatement: 'My 500-word artifact passes two tests: an outsider learns from it, and a technical reader finds nothing to correct.',
  beats: [
    { kind: 'puzzle', html:
      '<p>The Weeks 7–9 object predicts likely text. But the <em>likely continuation</em> of “How do I ask my boss for a ' +
      'raise?” on the raw internet is another forum user’s reply — or a list of ten similar questions.</p>' +
      '<p><strong>Why does the chatbot instead answer helpfully, in a consistent voice?</strong> Something happened between ' +
      'the predictor and the product.</p>' },
    { kind: 'exercise', title: 'The alignment pipeline, one picture', html:
      '<div class="card"><p style="font-family:var(--font-mono);font-size:.85rem;text-align:center;line-height:2">' +
      'base predictor<br>↓ &nbsp;shown examples of assistant-style responses <em>(instruction tuning)</em><br>' +
      '↓ &nbsp;adjusted using human preferences between candidate answers <em>(RLHF — named, not detailed)</em><br>' +
      'the chatbot</p>' +
      '<p>The “personality” is a <strong>trained layer on top of the predictor, not a resident</strong>. And note: Week 5 ' +
      'discipline applies to the persona too — “the assistant is honest/friendly/cautious” is an ascription, and it needs a ' +
      'test attached, same as ever.</p></div>' },
    { kind: 'exercise', title: 'The frontier, honestly labeled as moving ground', html:
      '<div class="card"><p><strong>Reasoning models:</strong> systems trained to generate intermediate work before answering ' +
      '(<em>test-time computation</em>). This connects to Week 4: some problems need scratch paper, and one-shot next-word ' +
      'guessing demonstrably hits walls that step-by-step traces get past.</p>' +
      '<p><strong>Live debates, not settled facts</strong> — flagged as such: how much of “emergence” (abilities appearing ' +
      'suddenly with scale) is real versus a measurement artifact; where the limits of the predict-text paradigm lie. Anyone ' +
      'who tells you these are settled, in either direction, is ahead of the evidence.</p></div>' },
    { kind: 'exercise', title: 'Capstone, part 1: teach one concept', html:
      '<div class="card"><p>Before you write anything: teach one course concept to a real outsider — a friend, a colleague, a ' +
      'family member. Then note what broke. Where did they get lost? What example saved you? What question couldn’t you ' +
      'answer? That wreckage is the raw material for part 2.</p></div>' },
    { kind: 'exercise', title: 'Capstone, part 2: “What an LLM is and isn’t”', html:
      '<p>The course’s final artifact and its real exam: at most <strong>500 words</strong>, for a lay reader. It passes when ' +
      'an outsider learns from it <em>and</em> a technical reader finds nothing to correct. Your draft saves automatically on ' +
      'this device.</p>',
      widget: 'capstone-editor' },
    { kind: 'exercise', title: 'The exit ramp', html:
      '<div class="card"><p>For those continuing into depth — the annotated path:</p>' +
      '<p><strong>Hands-on:</strong> Andrej Karpathy’s <em>“Neural Networks: Zero to Hero”</em> video series — build the toy ' +
      'versions with your own hands.</p>' +
      '<p><strong>The spine, in reading order:</strong></p>' +
      '<ol style="font-size:.95rem">' +
      '<li>Vaswani et al. 2017, <em>Attention Is All You Need</em> — the architecture</li>' +
      '<li>Kaplan et al. 2020 — scaling laws (Week 10’s plotted line)</li>' +
      '<li>Holtzman et al. 2020 — decoding (Week 8’s knob, formalized)</li>' +
      '<li>Ouyang et al. 2022 — InstructGPT (this week’s pipeline)</li>' +
      '<li>Wei et al. 2022 — chain-of-thought</li>' +
      '<li>Schaeffer et al. 2023 — the emergence-mirage debate</li>' +
      '<li>Olsson et al. 2022 — induction heads (Week 11’s circuit, in full)</li></ol>' +
      '<p><strong>Then:</strong> mechanistic interpretability (superposition, sparse autoencoders) and the reasoning-model ' +
      'literature — both moving fast enough that this course points at directions, not canon.</p></div>' },
    { kind: 'naming', html:
      '<p>The last naming beat names the course itself: what you built here is not a stock of facts about one technology. ' +
      'It’s a discipline — <strong>phenomenon first, tests attached to claims, calibration over confidence</strong> — and it ' +
      'transfers to whatever the machines become next.</p>' },
    { kind: 'checkpoint', html:
      '<p>Ship the artifact: show your 500 words to one outsider and, if you can find one, one technical reader. Revise until ' +
      'both tests pass. That’s the exam, and nobody grades it but reality.</p>' },
  ],
});
