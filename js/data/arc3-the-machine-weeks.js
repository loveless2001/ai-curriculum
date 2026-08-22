/* Arc 3 (Weeks 7-9): The machine that took the guessing game seriously.
   Re-instantiation of Arcs 1-2 concepts on the simulated model. */
GM.arcs.push({
  id: 3,
  name: 'Arc 3 — How language models predict text',
  shortName: 'Arc 3 · The machine',
  claim: 'The ideas from the first six weeks now apply to language models: prediction, uncertainty, compression, testing, and calibration.',
  weeks: [7, 8, 9],
});

GM.weeks.push({
  num: 7, arcId: 3, showArcBanner: true,
  short: 'How a language model predicts text',
  title: 'How a language model predicts text',
  tagline: 'A language model scores possible continuations of text.',
  checkpointStatement: 'I can explain to an outsider, in one minute without jargon, what an LLM is and what the difference between training and using is.',
  beats: [
    { kind: 'puzzle', html:
      '<p>Below is the cloze game from Week 1 with model scores added. Compare the model’s preferred words with yours. Then ' +
      'compare how widely the human guesses and model scores are spread for each blank.</p>' +
      '<p><strong>What does the model calculate, and how did training change those calculations?</strong></p>' +
      '<p class="note">This page uses a small simulation with prepared candidate lists. It demonstrates scoring and selection, ' +
      'but it is not a full language model. You can repeat the exercise with a real model later.</p>' },
    { kind: 'exercise', title: 'Human vs machine cloze tournament', html:
      '<p>Play each blank yourself first, then reveal the machine’s scores next to typical human guesses. Where humans ' +
      'disagree with each other, notice the machine also spreads its bets.</p>',
      widget: 'cloze-game', widgetOpts: { mode: 'versus' } },
    { kind: 'exercise', title: 'Learning vs recalling: the goldfish chat', html:
      '<p>Tell the simulated model a fact and ask about it in the same conversation. Then start a new conversation and ask ' +
      'again. This demonstrates the difference between using conversation context and changing a model through training.</p>',
      widget: 'chat-memory-demo' },
    { kind: 'exercise', title: 'One-minute explanations', html:
      '<div class="card"><p>Explain what an LLM is to a partner or a voice memo in 60 seconds. Use the ideas of guessing, ' +
      'models, and surprise. Define any technical term you use. If you say that the model “thinks,” “wants,” or “knows,” ' +
      'state what observation would test that claim.</p></div>' },
    { kind: 'naming', html:
      '<p><strong>A large language model predicts text.</strong> During training, its internal numbers are adjusted so that it ' +
      'assigns better scores to continuations found in the training text.</p>' +
      '<p><strong>Training and use are different stages.</strong> Training changes the model’s internal numbers. Ordinary chat ' +
      'uses those numbers and the current conversation; it does not retrain the model.</p>' },
    { kind: 'checkpoint', html:
      '<p>Give the one-minute explanation to someone who has not taken the course. Record where they became confused. You will ' +
      'use that note in the Week 12 capstone.</p>' },
  ],
});

GM.weeks.push({
  num: 8, arcId: 3,
  short: 'Scores, selection, and temperature',
  title: 'Scores, selection, and temperature',
  tagline: 'Temperature changes how the next token is chosen from fixed scores.',
  checkpointStatement: 'I can predict the effect of changing temperature on a given prompt type before running it, and can explain to an outsider why the model itself didn’t change.',
  beats: [
    { kind: 'puzzle', html:
      '<p>Same prompt, submitted five times at <strong>temperature 0</strong>: five identical answers. Same prompt at ' +
      '<strong>high temperature</strong>: five different answers.</p>' +
      '<p>The model’s learned numbers are unchanged between runs. <strong>Which later step does temperature affect?</strong></p>' },
    { kind: 'exercise', title: 'The knob lab', html:
      '<p>Test a factual question, a creative request, and an ambiguous question at low and high temperature. Predict the ' +
      'result before each run, then record what changed.</p>' +
      '<p>Use the Week 2 ladder: temperature has more effect when several continuations have similar scores.</p>',
      widget: 'temperature-lab' },
    { kind: 'exercise', title: 'Two layers, physically separated', html:
      '<div class="card"><p>The widget separates scoring from selection:</p>' +
      '<ul><li>The <strong>scorer</strong> holds the card: every candidate next word, each with a weight. The scorer’s card ' +
      'never changes for a given prompt.</li>' +
      '<li>The <strong>chooser</strong> picks from the card by a rule: always-take-the-top, weighted dice, dice-among-the-top-few.</li></ul>' +
      '<p>Keep the score card fixed and change only the selection rule. If working with a partner, one person can hold the ' +
      'scores while the other follows the selection rule.</p></div>' },
    { kind: 'exercise', title: 'Reproducibility test', html:
      '<div class="card"><p>Prediction drill: which prompts will give identical output on every rerun at temperature 0, and ' +
      'which will vary at high temperature? Write your predictions, then verify in the lab above.</p>' +
      '<p class="note">Honest engineering note: on real large-scale systems, exact temp-0 determinism can wobble for boring ' +
      'infrastructure reasons (batching, hardware arithmetic). The <em>contrast</em> between the two settings is what’s real ' +
      'and robust.</p></div>' },
    { kind: 'naming', html:
      '<p><strong>Scoring and choosing are separate steps.</strong> The model assigns scores to possible next tokens. A decoding ' +
      'rule then chooses one. Temperature changes that rule, not the model’s learned numbers.</p>' +
      '<p><strong>Variation comes from selection.</strong> Lower temperature favors the highest-scoring option more strongly; ' +
      'higher temperature gives lower-scoring options more chances.</p>' },
    { kind: 'checkpoint', html:
      '<p>Before running anything: predict, for a factual prompt and a story-opening prompt, what turning the temperature up ' +
      'will do to each. Then run them in the lab and check. Two for two, with reasons, passes.</p>' },
  ],
});

GM.weeks.push({
  num: 9, arcId: 3,
  short: 'Why fluent answers can be false',
  title: 'Why fluent answers can be false',
  tagline: 'Likely-sounding text can still be false.',
  checkpointStatement: 'I can produce a reproducible hallucination on demand, explain in course vocabulary why it happens, and correct someone who calls it “lying” or “glitching.”',
  beats: [
    { kind: 'puzzle', html:
      '<p>Set the temperature to 0 — the reproducible setting, no dice anywhere. Now ask the machine for the biography of a ' +
      'plausible-sounding person who <em>does not exist</em>.</p>' +
      '<p>It answers. Fluently. In detail. And <strong>identically on every rerun.</strong></p>' +
      '<p>The output is reproducible, so sampling alone does not explain the error. What does?</p>' },
    { kind: 'exercise', title: 'The hallucination elicitation lab', html:
      '<p>Test invented biographies, fake citations, and details that are unlikely to be documented. For each response, note ' +
      'whether it repeats, whether its claims can be verified, and how well the topic is documented. Compare these results ' +
      'with questions about widely documented facts.</p>',
      widget: 'hallucination-lab' },
    { kind: 'exercise', title: 'The compression connection', html:
      '<div class="card"><p>Return to Week 3. A compressed representation may preserve common patterns while losing a ' +
      'particular detail. When asked for that detail, a model can produce something typical-looking instead of something ' +
      'supported by evidence.</p></div>' },
    { kind: 'exercise', title: 'Frankfurt, applied', html:
      '<div class="card"><p>Week 6’s distinction, now aimed at the machine:</p>' +
      '<ul><li><strong>Is it lying?</strong> No. Lying requires tracking the truth in order to avoid it. Nothing in the ' +
      'mechanism tracks truth at all.</li>' +
      '<li><strong>Is it bullshitting?</strong> Closer: text produced without regard to truth, optimized to be <em>likely</em>.</li></ul>' +
      '<p>Precision drill — rewrite each of these as an accurate sentence: “the AI lied to me”; “the AI glitched”; “the AI ' +
      'doesn’t know that fact.” (Try before peeking at the lab’s model answers.)</p></div>' },
    { kind: 'exercise', title: 'Calibration check on the machine', html:
      '<div class="card"><p>Ask the model how confident it is in a fabricated answer. Compare that statement with the ' +
      'verified result, then compare this process with your Week 6 quiz. Calibration is measured across predictions and outcomes.</p></div>' },
    { kind: 'exercise', title: 'The ascription game, final round', html:
      '<div class="card"><p>Week 5’s discipline, aimed at the machine itself: what would count as evidence that it ' +
      '<em>knows</em> a fact, versus produces likely text about it? Design the von Pfungst controls — the machine equivalents ' +
      'of blinders and ignorant questioners. (Some real candidates: does it give the same answer under rephrasing? Does its ' +
      'confidence track its accuracy? Does it distinguish “I don’t know” territory from covered territory?)</p></div>' },
    { kind: 'naming', html:
      '<p><strong>A hallucination is fluent output unsupported by the facts.</strong> The model continues a pattern even when ' +
      'the prompt asks for a detail that is absent, rare, or confused in its learned data.</p>' +
      '<p><strong>The same prediction process produces correct and incorrect answers.</strong> Better data, tools, and training ' +
      'can reduce errors, but users still need to verify claims where accuracy matters.</p>' },
    { kind: 'checkpoint', html:
      '<p>Produce a reproducible confident error in the lab, then explain — in course vocabulary only — why the same mechanism ' +
      'produces both this and the right answers. Finally, correct this sentence out loud: “the AI lied to me about that ' +
      'citation.”</p>' },
  ],
});
