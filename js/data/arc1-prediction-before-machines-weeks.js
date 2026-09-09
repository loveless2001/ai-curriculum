/* Arc 1 (Weeks 1-3): Prediction before machines. Content adapted for self-paced web. */
GM.arcs.push({
  id: 1,
  name: 'Arc 1 — Prediction before language models',
  shortName: 'Arc 1 · Prediction',
  claim: 'Start with a missing word, ask which clues help, then explore what a useful model keeps and leaves out.',
  weeks: [1, 2, 3],
});

GM.weeks.push({
  num: 1, arcId: 1, showArcBanner: true,
  short: 'How context shapes a guess',
  title: 'How context shapes a guess',
  tagline: 'Context makes some guesses much easier than others.',
  checkpointStatement: 'I can explain why one unfinished sentence has an obvious ending while another has many plausible endings.',
  beats: [
    { kind: 'puzzle', html:
      '<p>Read this aloud, or have someone read it to you:</p>' +
      '<blockquote>“She poured the coffee into the ___.”</blockquote>' +
      '<p>You probably thought of “cup.” The sentence gives you strong clues. Compare it with “For her birthday she wanted a ' +
      '___.” Many words could fit the second sentence.</p>' +
      '<p><strong>Why does one blank feel easy and the other open?</strong> Make a guess before you continue.</p>' },
    { kind: 'exercise', title: 'Cloze rounds', html:
      '<p>Guess the next word in each sentence. Before you reveal the answer, rate how surprised you would be if your guess ' +
      'were wrong. Also count how many other words could reasonably fit. Some blanks allow few answers; others allow many.</p>' +
      '<p class="note">Pair variant: one person reads sentences stopping mid-way, the other guesses. Same scoring.</p>',
      widget: 'cloze-game', widgetOpts: { mode: 'human' } },
    { kind: 'exercise', title: 'Shannon’s guessing game (1951)', html:
      '<p>Long before computers could talk, an engineer named Claude Shannon played a game with his wife Betty: he’d take a ' +
      'sentence from a book she hadn’t seen, and she’d guess it <em>letter by letter</em>. Every wrong guess, she guessed again. ' +
      'He counted the guesses each letter took.</p>' +
      '<p>Most letters took Betty only one guess. Her guesses gave Shannon a way to measure how predictable English is. ' +
      'The experiment matters here because it used a person, not a language model. Try Betty’s part yourself:</p>',
      widget: 'shannon-game' },
    { kind: 'naming', html:
      '<p><strong>Expectation.</strong> Before a sentence ends, you already have ideas about what may come next.</p>' +
      '<p><strong>Prediction.</strong> Context narrows the possible answers. Sometimes it leaves one likely option; sometimes it leaves many.</p>' +
      '<p><strong>Confidence.</strong> You can be more or less sure of a guess. Asking “how surprised would I be if I were wrong?” ' +
      'is one way to report that confidence.</p>' },
    { kind: 'checkpoint', html:
      '<p>Teach-back test: explain to someone (or say out loud, alone) why “she poured the coffee into the ___” and “for her ' +
      'birthday she wanted a ___” are different <em>kinds</em> of blank — without using any technical words. If you reach for ' +
      'a word like “probability,” try again with plainer ones.</p>' },
  ],
});

GM.weeks.push({
  num: 2, arcId: 1,
  short: 'Surprise and information',
  title: 'Surprise and information',
  tagline: 'A message is informative when it changes what you expected.',
  checkpointStatement: 'I can explain why the same message can carry different amounts of information to different people, and compare two yes-or-no questions.',
  beats: [
    { kind: 'puzzle', html:
      '<p>Last week, context helped you guess a missing word. Now ask what you learn when an answer arrives.</p><p>You are waiting for a parcel due Monday or Tuesday. The courier says, “Tuesday.” Your neighbor already saw the schedule.</p><p><strong>Who learns more from the same message?</strong> You had two possible days; your neighbor already knew which one.</p>' },
    { kind: 'exercise', title: 'Predict first: information needs a receiver', html:
      '<p>For each message, say what the receiver knew <strong>before</strong> and learns <strong>after</strong>:</p><ul><li>“The parcel arrives Tuesday,” sent to you and to your neighbor.</li><li>“Heads,” after a fair coin toss.</li><li>“Yes,” with no question attached.</li></ul><p>Which can you explain without more context? What would you need to know about the others?</p>' },
    { kind: 'exercise', title: 'Twenty questions, dissected', html:
      '<p>Suppose eight items are equally likely. One question splits them into two groups of four. Another asks about just one item: its answers leave either one or seven.</p><p><strong>Which question leaves fewer items on average?</strong> Try the game. Before asking, count the items on each side. A balanced split helps when items are equally likely and questions cost the same.</p>',
      widget: 'question-splitter' },
    { kind: 'exercise', title: 'The prediction difficulty ladder', html:
      '<p>Put the easiest predictions at the top. For each, give a reason: “I lack a clue,” “many outcomes fit,” or “the outcome is chosen at random.” Different assumptions can produce different rankings.</p><p>Keep your ranking for Week 8, when we compare easy and open-ended text predictions.</p>',
      widget: 'ladder-rank' },
    { kind: 'exercise', title: 'Between now and next week: surprise journaling', html:
      '<p><strong>Between sessions:</strong> record three surprises. Write what you expected, what happened, and whether you now expect something different.</p><p>Example: a late bus does not by itself prove the timetable changed. Look for more evidence before changing your view.</p>' },
    { kind: 'exercise', title: 'Misconception clinic', html:
      '<p>Choose one claim and give an example that shows its limit:</p><ul><li>“Longer messages always tell us more.”</li><li>“A surprising message is always useful.”</li><li>“The best question always divides the options in half.”</li></ul><p>Then write a more accurate version in one sentence.</p>' },
    { kind: 'naming', html:
      '<p><strong>Information:</strong> what a message tells you depends on what you already knew. In the parcel example, it removes one possible delivery day.</p><p><strong>Surprise:</strong> an outcome is more surprising when you thought it less likely. Feeling shocked is different: emotion also depends on how much you care.</p><p>Week 10 uses a numerical measure of prediction surprise. No formula is needed here.</p>' },
    { kind: 'checkpoint', html:
      '<p>Give one long message that tells its receiver little and one short message that tells them a lot. State what each receiver knew beforehand. Then give a yes-or-no question that rules out few options with its most likely answer.</p>' },
  ],
});

GM.weeks.push({
  num: 3, arcId: 1,
  short: 'What models keep and omit',
  title: 'What models keep and omit',
  tagline: 'A useful model keeps the details needed for a particular job.',
  checkpointStatement: 'I can describe two models for different jobs and one detail each leaves out.',
  beats: [
    { kind: 'puzzle', html:
      '<p>A metro map leaves out most streets and distorts distances. A satellite photo keeps those details. <strong>Which helps you choose where to change trains?</strong></p><p>Week 2 asked which clues reduce uncertainty. This week asks which clues a useful model needs to keep.</p>' },
    { kind: 'exercise', title: 'The compression relay', html:
      '<p>Read the story and summarize it in <strong>exactly ten words</strong>. What could a reader recover from your summary? What detail would they have to guess?</p><p>If possible, ask someone who has not read the story to retell it from your summary.</p>',
      widget: 'compression-relay' },
    { kind: 'exercise', title: 'Two maps, two jobs', html:
      '<p>Sketch two maps of your neighborhood: one for finding lunch, one for repairing water pipes. List two details each map needs and two it can leave out.</p><p>A useful map depends on the job. A restaurant map will not tell a plumber where to dig.</p>' },
    { kind: 'exercise', title: 'When a summary leaves out what matters', html:
      '<p>A review says a restaurant is “cheap and busy.” Can you tell whether it has wheelchair access? The summary may be accurate and still omit what you need.</p><p><strong>Try:</strong> add one detail for a wheelchair user, then one for someone avoiding nuts. In Week 9, we will ask what happens when a model supplies a plausible detail without evidence.</p>' },
    { kind: 'naming', html:
      '<p><strong>A model</strong> is a simplified description or system used to explain or predict something. A map is one example.</p><p><strong>Lossy compression</strong> means shortening information while losing some detail. Our ten-word summary does this. It is an analogy for learned models, not a complete account of how they work.</p>' },
    { kind: 'checkpoint', html:
      '<p>Choose one place or subject. Describe two models of it for different jobs. What does each keep, and what question can it not answer?</p>' },
  ],
});
