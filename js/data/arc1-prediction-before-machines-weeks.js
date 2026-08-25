/* Arc 1 (Weeks 1-3): Prediction before machines. Content adapted for self-paced web. */
GM.arcs.push({
  id: 1,
  name: 'Arc 1 — Prediction before language models',
  shortName: 'Arc 1 · Prediction',
  claim: 'You already predict what comes next in a sentence. This arc shows how context changes the guesses available to you, and why surprise tells you that you have learned something.',
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
  checkpointStatement: 'I can explain why the same message can carry different amounts of information to different receivers, and why a useful question is one whose possible answers narrow the live possibilities.',
  beats: [
    { kind: 'puzzle', html:
      '<p>Two messages arrive on your phone:</p>' +
      '<blockquote>“The sun rose this morning.”<br>“Your bank called about a large transfer.”</blockquote>' +
      '<p>The second message changes what you know; the first probably does not. Their length is similar. ' +
      '<strong>What makes one more informative?</strong> The difference depends on what you expected before reading it.</p>' +
      '<p>Now change the receiver. A bank employee already reviewing that transfer may learn little from the second message. ' +
      'Information is not stored inside the words alone; it appears in the relationship between a message and someone’s prior expectations.</p>' },
    { kind: 'exercise', title: 'Predict first: information needs a receiver', html:
      '<p>Without calculating, rank these messages from least to most informative <em>to the named receiver</em>:</p>' +
      '<ol><li>A weather app tells a Bangkok resident in August: “It is humid.”</li>' +
      '<li>A fair coin lands heads after one ordinary toss.</li>' +
      '<li>A laboratory reports that the same coin landed heads 100 times in a row.</li>' +
      '<li>A doctor tells a patient awaiting a test: “The result is negative.”</li>' +
      '<li>A stranger texts: “Yes.”</li></ol>' +
      '<p>The last item cannot be ranked without context: “yes” could confirm lunch or a marriage proposal. Before continuing, ' +
      'name what each receiver thought was possible before the message arrived.</p>' },
    { kind: 'exercise', title: 'Twenty questions, dissected', html:
      '<p>In twenty questions, why does “is it bigger than a breadbox?” beat “is it the Eiffel Tower?” as an opening move? ' +
      'Play the mini-version below: find the hidden item, and watch what each question does to the field of possibilities. ' +
      'Before clicking, predict how many items will fall on the “yes” side and how many on the “no” side.</p>' +
      '<p>A useful early question leaves two substantial branches, so either answer rules out many possibilities. A near-even ' +
      'split is a useful starting rule, not a commandment: cost, reliability, and consequences can make an uneven question worth asking.</p>',
      widget: 'question-splitter' },
    { kind: 'exercise', title: 'The prediction difficulty ladder', html:
      '<p>Rank these from easiest to predict (top) to hardest (bottom). There’s no single right order — the point is the ' +
      'argument you have with yourself about each one. For every item, finish the sentence: <strong>“My uncertainty comes mainly ' +
      'from ___.”</strong> Too many alternatives, missing evidence, unstable causes, and deliberate randomness are different problems.</p>',
      widget: 'ladder-rank' },
    { kind: 'exercise', title: 'Between now and next week: surprise journaling', html:
      '<div class="card"><p>Note <strong>three moments of genuine surprise</strong> this week — small ones are often easier to inspect. For each, answer:</p>' +
      '<ol><li>What happened?</li><li>What did I expect instead?</li><li>What evidence supported that expectation?</li>' +
      '<li>What changed afterward: my belief, my model, or only my mood?</li><li>If nothing changed, why not?</li></ol>' +
      '<p>Surprise creates an opportunity to learn, not a guarantee. The event may be noise, the source may be unreliable, or your earlier expectation may still have stronger evidence.</p></div>' },
    { kind: 'exercise', title: 'Misconception clinic', html:
      '<div class="card"><p>Choose one claim and repair it:</p><ul>' +
      '<li>“Longer messages contain more information.”</li><li>“Rare events are always useful.”</li>' +
      '<li>“Feeling shocked and receiving information are the same thing.”</li><li>“The best question always divides the options exactly in half.”</li></ul>' +
      '<p>Give a counterexample, then rewrite the claim so that it says when it is useful and where it stops.</p></div>' },
    { kind: 'naming', html:
      '<p><strong>Information changes uncertainty.</strong> A message tells a receiver more when it rules out—or sharply lowers—the possibilities that receiver previously took seriously.</p>' +
      '<p><strong>Surprise is relative to expectations.</strong> The same event can be routine under one person’s model and unexpected under another’s.</p>' +
      '<p><strong>Felt surprise is not the technical measure.</strong> Emotion also depends on attention, stakes, and memory. A formal measure needs stated possibilities and probabilities. For now, the intuition is enough; Week 10 introduces the technical vocabulary.</p>' +
      '<p class="plant-note">Keep your difficulty ladder. In Week 7 you will use it to compare your predictions with a model’s.</p>' },
    { kind: 'checkpoint', html:
      '<p>Give an original example of (a) a long message carrying very little information to its receiver, (b) a one-word ' +
      'message carrying a great deal, and (c) a relevant-sounding yes-or-no question that barely narrows the possibilities. ' +
      'For each, name the receiver’s expectations before the message or answer. Your explanation should depend on those expectations—not word count or emotional drama alone.</p>' },
  ],
});

GM.weeks.push({
  num: 3, arcId: 1,
  short: 'What models keep and omit',
  title: 'What models keep and omit',
  tagline: 'A useful model keeps the details needed for a particular job.',
  checkpointStatement: 'I can give an original example of one territory needing two different maps, and say what each map sacrificed.',
  beats: [
    { kind: 'puzzle', html:
      '<p>Picture a metro map beside a satellite photo of the same city. The metro map distorts distance, straightens curves, ' +
      'and leaves out most geography. Yet it is usually better for planning a train journey.</p>' +
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
      '<p><strong>A model is a selective summary made for a purpose.</strong> It leaves details out so that the details relevant ' +
      'to the job are easier to use.</p>' +
      '<p><strong>The map is not the territory.</strong> Judge a map by the job it needs to do.</p>' },
    { kind: 'checkpoint', html:
      '<p>Produce your own example: one territory (a domain, a place, a person, a subject) that needs two different maps for ' +
      'two different purposes. Name what each map sacrifices. If your example is one you’ve heard before, find another.</p>' },
  ],
});
