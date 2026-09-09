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
  checkpointStatement: 'I can explain text prediction, training, and chat context with one example.',
  beats: [
    { kind: 'puzzle', html:
      '<p>Return to Week 1: “She poured the coffee into the ___.” This time compare your guess with a prepared set of model scores.</p><p>A <strong>large language model (LLM)</strong> calculates which pieces of text could come next. A piece, called a <strong>token</strong>, may be a word, part of a word, or punctuation.</p><p>This exercise uses prepared examples, not a live model.</p>' },
    { kind: 'exercise', title: 'Human vs machine cloze tournament', html:
      '<p>Fill each blank before revealing the scores. Is one answer much more likely than the rest, or do several fit? These prepared human guesses and model scores illustrate the comparison; they are not measurements from your class.</p>',
      widget: 'cloze-game', widgetOpts: { mode: 'versus' } },
    { kind: 'exercise', title: 'Learning vs recalling: the goldfish chat', html:
      '<p>Tell the simulation a fact, ask about it, then start a fresh conversation and ask again.</p><p>Think of a student using a note on their desk. The note helps with this question without changing what they learned during lessons. Similarly, chat context supplies information without changing the model’s trained numbers.</p><p>Some products save notes or retrieve past chats. That is separate from retraining the model.</p>',
      widget: 'chat-memory-demo' },
    { kind: 'exercise', title: 'One-minute explanations', html:
      '<p>Explain an LLM in 60 seconds. Include what it predicts, how training changes it, and how a conversation supplies clues. Use the note-on-the-desk example if it helps.</p>' },
    { kind: 'naming', html:
      '<p><strong>Training</strong> adjusts internal numbers, called weights, using examples. <strong>Using the model</strong> applies those numbers to the current text.</p><p>To generate a reply: score possible next tokens, choose one, add it to the text, and repeat. Week 8 examines the choosing step; Week 10 examines training.</p>' },
    { kind: 'checkpoint', html:
      '<p>Give your explanation to a beginner, or record it and listen back. Note one unclear phrase and replace it with an example. Save this draft for Week 12.</p>' },
  ],
});

GM.weeks.push({
  num: 8, arcId: 3,
  short: 'Scores, selection, and temperature',
  title: 'Scores, selection, and temperature',
  tagline: 'Temperature changes how the next token is chosen from fixed scores.',
  checkpointStatement: 'I can explain how temperature changes selection and why it does not check facts.',
  beats: [
    { kind: 'puzzle', html:
      '<p>Week 7 separated scoring from choosing. Imagine a next-word score card: “cup” 80%, “mug” 15%, “bowl” 5%.</p><p>Always choosing the top word gives “cup.” Drawing from a bag with 80 cup tickets, 15 mug tickets, and 5 bowl tickets can give other answers.</p><p><strong>Temperature</strong> changes how strongly the draw favors the higher scores. It does not retrain the model.</p>' },
    { kind: 'exercise', title: 'The knob lab', html:
      '<p>Try a factual, creative, and ambiguous prompt at low and high temperature. Predict which will vary most, then generate several times.</p><p>Use Week 2’s ranking: a prompt with several plausible continuations may show more variation. One random batch need not match your prediction.</p>',
      widget: 'temperature-lab' },
    { kind: 'exercise', title: 'The score card and the ticket bag', html:
      '<p>Keep one score card fixed. Compare always choosing its top word with drawing tickets from the bag.</p><p>Lower temperature concentrates more tickets on the top choices; higher temperature spreads them more evenly. In this demo, temperature 0 picks the top choice.</p><p>After a token is added, the text has changed, so the next step gets a new score card.</p>' },
    { kind: 'exercise', title: 'Reproducibility test', html:
      '<p>Run the same prompt twice at temperature 0, then twice at a higher setting. Compare the results.</p><p>Repeated draws can produce the same answer even at high temperature. Real services may also vary at temperature 0 if their computation or settings differ.</p>' },
    { kind: 'naming', html:
      '<p><strong>Scores</strong> describe possible next tokens. <strong>Decoding</strong> is the process of choosing tokens from those scores.</p><p><strong>Temperature</strong> changes the probabilities used for selection. Higher temperature can increase variety; it does not check facts. A likely word can still be part of a false answer.</p>' },
    { kind: 'checkpoint', html:
      '<p>Explain the ticket-bag example in your own words. Predict what higher temperature will do for two prompts, run several trials, and explain any mismatch. Why does lowering temperature not guarantee truth? Week 9 tests that question.</p>' },
  ],
});

GM.weeks.push({
  num: 9, arcId: 3,
  short: 'Why fluent answers can be false',
  title: 'Why fluent answers can be false',
  tagline: 'Likely-sounding text can still be false.',
  checkpointStatement: 'I can separate repeatability from truth, propose a fact check, and state what a scripted example cannot show.',
  beats: [
    { kind: 'puzzle', html:
      '<p>Week 8 showed that choosing the top answer removes the random draw. Does that make the answer true?</p><p>The lab below contains a prepared false biography. Run it twice. It repeats exactly because the text is scripted.</p><p>This illustrates that repeatability and truth are different. It does not show how often a real model makes this error; a real model might refuse the request or correct its premise.</p>' },
    { kind: 'exercise', title: 'Check a fluent answer', html:
      '<p>Compare the prepared biography, citation, and historical detail with the factual example. Record whether each answer repeats and what evidence would be needed to verify it.</p><p>Separate “we wrote this as a fictional example” from “we searched and found no source.” Failure to find a source alone does not prove a claim false.</p>',
      widget: 'hallucination-lab' },
    { kind: 'exercise', title: 'A plausible detail is not evidence', html:
      '<p>In Week 3, “cheap and busy” did not tell you whether a restaurant had wheelchair access. Guessing that detail from similar restaurants could sound plausible and be wrong.</p><p>A language model can likewise produce a familiar-looking detail without enough support. This analogy describes one risk; it does not diagnose every false answer or reveal what was in the training data.</p>' },
    { kind: 'exercise', title: 'Describe the error before explaining it', html:
      '<p>Return to Week 6: a false statement alone does not establish intent. “It invented a citation” describes the output. “It tried to deceive me” adds a claim that needs evidence.</p><p>Rewrite “the AI lied” as a specific observation: “The answer named a paper I could not verify.” Then state what you would check next.</p>' },
    { kind: 'exercise', title: 'Calibration check on the machine', html:
      '<p>Use the confidence button after a true and a false example. The same prepared assurance appears for both.</p><p>As in Week 6, a confidence claim is not a measurement. To measure calibration on a real model, collect many answers with stated confidence and independently check their accuracy.</p>' },
    { kind: 'exercise', title: 'Test more than consistency', html:
      '<p>Design a test from Week 5 for a model answering factual questions. Try rephrasing, supplying a reliable source, or including a false premise.</p><p>State what each result would support. Agreement under rephrasing shows consistency, but a consistently false answer is still false.</p>' },
    { kind: 'naming', html:
      '<p><strong>Hallucination</strong> is generated content that is false or unsupported, such as an invented citation. It need not sound confident.</p><p>Predicting text can produce correct and incorrect claims. Data, training, context, and tools affect accuracy. Verify important claims against evidence outside the answer.</p>' },
    { kind: 'checkpoint', html:
      '<p>Choose one false example. Explain why repeating it does not make it true, identify the unsupported detail, and propose a check. State what this scripted exercise cannot tell you about a real model.</p>' },
  ],
});
