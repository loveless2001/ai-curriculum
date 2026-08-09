/* Arc 3 (Weeks 7-9): The machine that took the guessing game seriously.
   Re-instantiation of Arcs 1-2 concepts on the simulated model. */
GM.arcs.push({
  id: 3,
  name: 'Arc 3 — The machine that took the guessing game seriously',
  shortName: 'Arc 3 · The machine',
  claim: 'You already own every concept needed. These three weeks are re-instantiation, not new material. If this arc feels like review, the course is working.',
  weeks: [7, 8, 9],
});

GM.weeks.push({
  num: 7, arcId: 3, showArcBanner: true,
  short: 'What an LLM literally is',
  title: 'What an LLM literally is',
  tagline: 'The Week 1 game, industrialized and frozen.',
  checkpointStatement: 'I can explain to an outsider, in one minute without jargon, what an LLM is and what the difference between training and using is.',
  beats: [
    { kind: 'puzzle', html:
      '<p>Remember Week 1’s sentences? Below, the same cloze game — but now a machine plays alongside you, showing its top ' +
      'candidate next words. Watch two things: whether its guesses match yours, and — more telling — whether it agrees with ' +
      'you about <em>which blanks were open and which were forced</em>.</p>' +
      '<p><strong>What is this thing, such that it plays our game? And what happened to it that made it able to?</strong></p>' +
      '<p class="note">The “model” on this page is a small built-in simulation with hand-prepared candidate lists — real ' +
      'scoring-and-choosing math, honest about being canned. Every behavior it shows is one a full-scale LLM shows too; ' +
      're-run any of these exercises against a real playground interface when you have one.</p>' },
    { kind: 'exercise', title: 'Human vs machine cloze tournament', html:
      '<p>Play each blank yourself first, then reveal the machine’s scores next to typical human guesses. Where humans ' +
      'disagree with each other, notice the machine also spreads its bets.</p>',
      widget: 'cloze-game', widgetOpts: { mode: 'versus' } },
    { kind: 'exercise', title: 'Learning vs recalling: the goldfish chat', html:
      '<p>Mid-conversation, tell the machine a fact, then ask about it: it uses the fact. Start a fresh conversation: the fact ' +
      'is gone. Nothing was learned — <em>the numbers inside it didn’t move</em>. What did move them was a training process ' +
      'that ended before you ever arrived.</p>',
      widget: 'chat-memory-demo' },
    { kind: 'exercise', title: 'One-minute explanations', html:
      '<div class="card"><p>Explain “what an LLM is” to a partner (or a voice memo) in 60 seconds, using only course ' +
      'vocabulary: the guessing game, maps, surprise. The listener’s job is to flag two kinds of smuggling:</p>' +
      '<ul><li><strong>smuggled jargon</strong> — any technical word you haven’t earned yet;</li>' +
      '<li><strong>smuggled minds</strong> — “it thinks…”, “it wants…”, “it knows…” (Week 5 discipline: those are claims ' +
      'needing tests, not descriptions).</li></ul></div>' },
    { kind: 'naming', html:
      '<p><strong>An LLM is the guessing game from Week 1, industrialized:</strong> a system adjusted over vast amounts of ' +
      'text until its surprise at real text got low — then frozen.</p>' +
      '<p><strong>Training vs using = learning vs recalling.</strong> All the adjustment happened before you arrived. When you ' +
      'chat, nothing is learning; a frozen guesser is guessing.</p>' },
    { kind: 'checkpoint', html:
      '<p>Deliver the one-minute explanation to a real outsider before next week. Note where it broke — that’s your material ' +
      'for the capstone in Week 12.</p>' },
  ],
});

GM.weeks.push({
  num: 8, arcId: 3,
  short: 'The scoring layer and the choosing knob',
  title: 'The scoring layer and the choosing knob',
  tagline: 'The model never changed. What are we actually turning?',
  checkpointStatement: 'I can predict the effect of changing temperature on a given prompt type before running it, and can explain to an outsider why the model itself didn’t change.',
  beats: [
    { kind: 'puzzle', html:
      '<p>Same prompt, submitted five times at <strong>temperature 0</strong>: five identical answers. Same prompt at ' +
      '<strong>high temperature</strong>: five different answers.</p>' +
      '<p>The model — every number inside it — is unchanged between runs. <strong>So what are we actually turning?</strong></p>' },
    { kind: 'exercise', title: 'The knob lab', html:
      '<p>Run the prompt matrix: a factual question, a creative request, an ambiguous question — each at low and high ' +
      'temperature. Before each run, <em>predict</em> what will happen. Chart what changes and what doesn’t.</p>' +
      '<p>Connect to Week 2’s ladder: the knob matters where the distribution is open, not where it’s forced.</p>',
      widget: 'temperature-lab' },
    { kind: 'exercise', title: 'Two layers, physically separated', html:
      '<div class="card"><p>The widget above splits the machine into its two layers, the way the classroom version splits them ' +
      'into two <em>people</em>:</p>' +
      '<ul><li>The <strong>scorer</strong> holds the card: every candidate next word, each with a weight. The scorer’s card ' +
      'never changes for a given prompt.</li>' +
      '<li>The <strong>chooser</strong> picks from the card by a rule: always-take-the-top, weighted dice, dice-among-the-top-few.</li></ul>' +
      '<p>Watch identical score-cards produce different texts as only the choosing rule changes. If you have two people ' +
      'handy, actually play it: one holds the card, one rolls dice. The layers stay separate in your head forever afterward.</p></div>' },
    { kind: 'exercise', title: 'Reproducibility test', html:
      '<div class="card"><p>Prediction drill: which prompts will give identical output on every rerun at temperature 0, and ' +
      'which will vary at high temperature? Write your predictions, then verify in the lab above.</p>' +
      '<p class="note">Honest engineering note: on real large-scale systems, exact temp-0 determinism can wobble for boring ' +
      'infrastructure reasons (batching, hardware arithmetic). The <em>contrast</em> between the two settings is what’s real ' +
      'and robust.</p></div>' },
    { kind: 'naming', html:
      '<p><strong>Two layers.</strong> The model <em>scores</em> every possible next word; a separate rule <em>chooses</em> ' +
      'among them. Temperature and its cousins are choosing rules, not model changes.</p>' +
      '<p><strong>“The AI is random” confuses the layers.</strong> The scoring is fixed; the dice are a setting we control — ' +
      'and can turn off.</p>' },
    { kind: 'checkpoint', html:
      '<p>Before running anything: predict, for a factual prompt and a story-opening prompt, what turning the temperature up ' +
      'will do to each. Then run them in the lab and check. Two for two, with reasons, passes.</p>' },
  ],
});

GM.weeks.push({
  num: 9, arcId: 3,
  short: 'Confident wrongness, mechanized',
  title: 'Confident wrongness, mechanized',
  tagline: 'Randomness is off. So what is this?',
  checkpointStatement: 'I can produce a reproducible hallucination on demand, explain in course vocabulary why it happens, and correct someone who calls it “lying” or “glitching.”',
  beats: [
    { kind: 'puzzle', html:
      '<p>Set the temperature to 0 — the reproducible setting, no dice anywhere. Now ask the machine for the biography of a ' +
      'plausible-sounding person who <em>does not exist</em>.</p>' +
      '<p>It answers. Fluently. In detail. And <strong>identically on every rerun.</strong></p>' +
      '<p>This is not randomness — randomness is off. What is it?</p>' },
    { kind: 'exercise', title: 'The hallucination elicitation lab', html:
      '<p>Hunt for reproducible confident errors: invented biographies, plausible fake citations, fine-grained details in ' +
      'thinly-covered territory. Log each find: reproducible? plausible-sounding? what kind of territory (obscure, recent, ' +
      'fine-grained)? Compare against the same machine answering well-covered questions.</p>',
      widget: 'hallucination-lab' },
    { kind: 'exercise', title: 'The compression connection', html:
      '<div class="card"><p>Return to Week 3. A compressor’s errors happen exactly where the discarded detail mattered — and ' +
      'they look like <em>plausible reconstructions</em>, not noise. The stereotype misfiring on an individual and the machine ' +
      'inventing a citation are <strong>the same failure shape</strong>: thin territory, filled in with what’s typical.</p></div>' },
    { kind: 'exercise', title: 'Frankfurt, applied', html:
      '<div class="card"><p>Week 6’s distinction, now aimed at the machine:</p>' +
      '<ul><li><strong>Is it lying?</strong> No. Lying requires tracking the truth in order to avoid it. Nothing in the ' +
      'mechanism tracks truth at all.</li>' +
      '<li><strong>Is it bullshitting?</strong> Closer: text produced without regard to truth, optimized to be <em>likely</em>.</li></ul>' +
      '<p>Precision drill — rewrite each of these as an accurate sentence: “the AI lied to me”; “the AI glitched”; “the AI ' +
      'doesn’t know that fact.” (Try before peeking at the lab’s model answers.)</p></div>' },
    { kind: 'exercise', title: 'Calibration check on the machine', html:
      '<div class="card"><p>In the lab, ask the machine how confident it is in one of its fabricated answers. Compare its ' +
      'stated confidence to its actual reliability — then compare with your own Week 6 quiz results. Neither humans nor ' +
      'machines get calibration for free; it must be measured, and it must be earned.</p></div>' },
    { kind: 'exercise', title: 'The ascription game, final round', html:
      '<div class="card"><p>Week 5’s discipline, aimed at the machine itself: what would count as evidence that it ' +
      '<em>knows</em> a fact, versus produces likely text about it? Design the von Pfungst controls — the machine equivalents ' +
      'of blinders and ignorant questioners. (Some real candidates: does it give the same answer under rephrasing? Does its ' +
      'confidence track its accuracy? Does it distinguish “I don’t know” territory from covered territory?)</p></div>' },
    { kind: 'naming', html:
      '<p><strong>Hallucination as confident interpolation:</strong> the system fills thin territory with plausible ' +
      'reconstructions — because producing likely text is <em>the entire mechanism</em>, the same mechanism that produces the ' +
      'correct answers.</p>' +
      '<p><strong>Structural, reproducible, not a bug awaiting a patch</strong> — though it can be reduced, and it can be ' +
      'checked. The fix isn’t in the machine; it’s in the checking.</p>' },
    { kind: 'checkpoint', html:
      '<p>Produce a reproducible confident error in the lab, then explain — in course vocabulary only — why the same mechanism ' +
      'produces both this and the right answers. Finally, correct this sentence out loud: “the AI lied to me about that ' +
      'citation.”</p>' },
  ],
});
