/* Arc 1 (Weeks 1-3): Prediction before machines. Content adapted for self-paced web. */
GM.arcs.push({
  id: 1,
  name: 'Arc 1 — Prediction before machines',
  shortName: 'Arc 1 · Prediction',
  claim: 'Prediction is not exotic. You do it constantly, involuntarily, and with graded confidence. The machines did not invent the game; they industrialized yours.',
  weeks: [1, 2, 3],
});

GM.weeks.push({
  num: 1, arcId: 1, showArcBanner: true,
  short: 'You are a prediction machine',
  title: 'You are a prediction machine',
  tagline: 'Guessing has structure, and you can feel it.',
  checkpointStatement: 'I can articulate: “guessing has structure — some continuations are near-forced, others are open, and I can feel the difference before I check the answer.”',
  beats: [
    { kind: 'puzzle', html:
      '<p>Read this aloud, or have someone read it to you:</p>' +
      '<blockquote>“She poured the coffee into the ___.”</blockquote>' +
      '<p>A word appeared in your head before anyone asked you to produce one. You didn’t choose to guess. And notice the ' +
      '<em>texture</em> of it: “cup” arrived with near-certainty, while a sentence like “For her birthday she wanted a ___” ' +
      'leaves things wide open.</p>' +
      '<p><strong>Why is this instant, involuntary, and graded?</strong> That question is the whole course. Sit with it for a ' +
      'minute before scrolling on.</p>' },
    { kind: 'exercise', title: 'Cloze rounds', html:
      '<p>Guess the next word of each sentence below. Before revealing, rate how surprised you’d be to be wrong. The scoring ' +
      'isn’t just right/wrong — pay attention to <em>how many plausible candidates existed</em>. Some blanks have one answer, ' +
      'some have five, some have hundreds.</p>' +
      '<p class="note">Pair variant: one person reads sentences stopping mid-way, the other guesses. Same scoring.</p>',
      widget: 'cloze-game', widgetOpts: { mode: 'human' } },
    { kind: 'exercise', title: 'Shannon’s guessing game (1951)', html:
      '<p>Long before computers could talk, an engineer named Claude Shannon played a game with his wife Betty: he’d take a ' +
      'sentence from a book she hadn’t seen, and she’d guess it <em>letter by letter</em>. Every wrong guess, she guessed again. ' +
      'He counted the guesses each letter took.</p>' +
      '<p>The result: English is <em>predictable</em> — measurably so — and a human’s predictions are the measuring instrument. ' +
      'Most letters took her one guess. This is the course’s founding anecdote: <strong>the guessing game predates the machines ' +
      'by seventy years.</strong> Now play Betty’s side yourself:</p>',
      widget: 'shannon-game' },
    { kind: 'naming', html:
      '<p><strong>Expectation.</strong> Your mind runs a constant, involuntary next-bit-of-the-world guesser.</p>' +
      '<p><strong>Prediction as structured guessing.</strong> Not all guesses are equal: context narrows the field, sometimes to ' +
      'almost one option, sometimes barely at all.</p>' +
      '<p><strong>Confidence as a spectrum, not a switch.</strong> “How surprised would I be to be wrong?” has graded answers — ' +
      'not at all / a little / very — and you can feel the grade <em>before</em> checking. Degrees of belief are an experience ' +
      'you already have, not a math topic.</p>' },
    { kind: 'checkpoint', html:
      '<p>Teach-back test: explain to someone (or say out loud, alone) why “she poured the coffee into the ___” and “for her ' +
      'birthday she wanted a ___” are different <em>kinds</em> of blank — without using any technical words. If you reach for ' +
      'a word like “probability,” try again with plainer ones.</p>' },
  ],
});

GM.weeks.push({
  num: 2, arcId: 1,
  short: 'Surprise is information',
  title: 'Surprise is information',
  tagline: 'The unexpected teaches; the expected doesn’t.',
  checkpointStatement: 'I can explain why a message everyone saw coming carries no information, and why a good question is one whose answer surprises you.',
  beats: [
    { kind: 'puzzle', html:
      '<p>Two messages arrive on your phone:</p>' +
      '<blockquote>“The sun rose this morning.”<br>“Your bank called about a large transfer.”</blockquote>' +
      '<p>One is news; one is not. Both are short, grammatical sentences of about the same length. ' +
      '<strong>What is the difference made of?</strong> It isn’t in the words themselves — it’s in what you expected.</p>' },
    { kind: 'exercise', title: 'Twenty questions, dissected', html:
      '<p>In twenty questions, why does “is it bigger than a breadbox?” beat “is it the Eiffel Tower?” as an opening move? ' +
      'Play the mini-version below: find the hidden item, and watch what each question does to the field of possibilities. ' +
      'Good questions are the ones whose answers you <em>cannot predict</em> — they split the possibilities.</p>',
      widget: 'question-splitter' },
    { kind: 'exercise', title: 'The prediction difficulty ladder', html:
      '<p>Rank these from easiest to predict (top) to hardest (bottom). There’s no single right order — the point is the ' +
      'argument you have with yourself about each one. What exactly makes one harder than another?</p>',
      widget: 'ladder-rank' },
    { kind: 'exercise', title: 'Between now and next week: surprise journaling', html:
      '<div class="card"><p>Note <strong>three moments of genuine surprise</strong> this week — big or small — and for each, ' +
      'write one line on what it taught you. The pattern to notice: surprise = you learned something = your expectations moved. ' +
      'No surprise, no learning.</p></div>' },
    { kind: 'naming', html:
      '<p><strong>Information is reduction of uncertainty.</strong> The unexpected message is informative; the expected one is ' +
      'not, no matter how long or eloquent it is.</p>' +
      '<p><strong>“Surprise” is a measurable quantity.</strong> We will keep using it by exactly that plain name until Week 10, ' +
      'where it gets its official one.</p>' +
      '<p class="plant-note">Planted for later: the machine you’ll meet in Week 7 sits somewhere on your difficulty ladder for ' +
      'every prompt you give it. Keep the ladder.</p>' },
    { kind: 'checkpoint', html:
      '<p>Test yourself: give an original example of (a) a long message that carries almost no information, and (b) a one-word ' +
      'message that carries a lot. Then explain what made the difference — in plain words.</p>' },
  ],
});

GM.weeks.push({
  num: 3, arcId: 1,
  short: 'Maps, models, compression',
  title: 'Maps, models, compression',
  tagline: 'All models discard; usefulness lives in what they discard.',
  checkpointStatement: 'I can give an original example of one territory needing two different maps, and say what each map sacrificed.',
  beats: [
    { kind: 'puzzle', html:
      '<p>Picture a metro map and a satellite photo of the same city, side by side. The metro map is <em>wildly wrong</em>: ' +
      'distances distorted, curves straightened, geography ignored. Yet for catching a train it beats the photograph — the ' +
      'accurate one — every time.</p>' +
      '<p><strong>How can the more wrong picture be more useful?</strong></p>' },
    { kind: 'exercise', title: 'The compression relay', html:
      '<p>Read the short story below, then summarize it in <strong>exactly ten words</strong>. Then look at what a stranger could ' +
      'and couldn’t reconstruct from your ten words. What survived? What died? And — the real question — <em>was what survived ' +
      'the right thing to keep?</em></p>' +
      '<p class="note">Pair variant: pass your ten words to someone who hasn’t read the story; have them retell it; compare to the original.</p>',
      widget: 'compression-relay' },
    { kind: 'exercise', title: 'Purpose-dependent maps', html:
      '<div class="card"><p>Take your own neighborhood. On paper (or in your head), sketch three maps of it:</p>' +
      '<ul><li>for a <strong>food tour</strong></li><li>for a <strong>plumber</strong></li><li>for a <strong>burglar</strong></li></ul>' +
      '<p>Same territory, three different documents. For each: what did you keep, what did you throw away, and why? Notice ' +
      'there is no “best map of the neighborhood” — only best <em>for a purpose</em>.</p></div>' },
    { kind: 'exercise', title: 'Stereotypes as compression (handle with care)', html:
      '<div class="card"><p>A generalization about a group of people is also a map: it trades detail for speed. It misfires ' +
      'exactly where the discarded detail mattered — on the individual in front of you. This isn’t a defense of stereotypes; ' +
      'it’s a diagnosis of their failure mode: <strong>the errors of a compressor are systematic, not random</strong>. They ' +
      'happen precisely where the compression threw away what you needed.</p>' +
      '<p class="plant-note">Planted for Week 9: when the machine confidently invents facts, it will be this exact failure ' +
      'shape — a compressor’s misfire, plausible-looking and systematic.</p></div>' },
    { kind: 'naming', html:
      '<p><strong>A model is a compression of experience, tuned for a purpose.</strong> All models discard — that’s not a flaw, ' +
      'that’s what makes them usable. Usefulness lives in <em>what</em> they discard.</p>' +
      '<p><strong>The map is not the territory.</strong> And there is no purpose-free map.</p>' },
    { kind: 'checkpoint', html:
      '<p>Produce your own example: one territory (a domain, a place, a person, a subject) that needs two different maps for ' +
      'two different purposes. Name what each map sacrifices. If your example is one you’ve heard before, find another.</p>' },
  ],
});
