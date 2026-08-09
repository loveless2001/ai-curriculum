/* Arc 2 (Weeks 4-6): What counting as knowing means. The course's inoculation arc. */
GM.arcs.push({
  id: 2,
  name: 'Arc 2 — What counting as knowing means',
  shortName: 'Arc 2 · Knowing',
  claim: '“Does it really understand?” is not answerable by staring harder at behavior. It requires knowing what test you’re running and what the test can and cannot show. This arc must land before any machine appears.',
  weeks: [4, 5, 6],
});

GM.weeks.push({
  num: 4, arcId: 2, showArcBanner: true,
  short: 'Memorizing, pattern-matching, understanding',
  title: 'Memorizing, pattern-matching, understanding',
  tagline: 'Identical answers, different insides — what question tells them apart?',
  checkpointStatement: 'I can design a simple test distinguishing a memorizer from someone who grasps a rule — and can say what the test still cannot rule out.',
  beats: [
    { kind: 'puzzle', html:
      '<p>Two students both answer “56” to 7×8. One has memorized the times table; one can multiply. ' +
      'Their answers are <em>identical</em>. Watching them answer tells you nothing.</p>' +
      '<p><strong>What question exposes the difference?</strong> Try to write one down before continuing. (Hint: it won’t be ' +
      'on the times table.)</p>' },
    { kind: 'exercise', title: 'The rule induction game', html:
      '<p>The machine below has a secret rule about sequences of three numbers. Probe it: enter any triple, and it tells you ' +
      'whether the triple fits the rule. When you’re confident, lock in your guess about what the rule is.</p>' +
      '<p>Fair warning: this game has embarrassed generations of confident people. The trap isn’t in the rule — it’s in how ' +
      'you test.</p>',
      widget: 'rule-induction' },
    { kind: 'exercise', title: 'Design-the-probe', html:
      '<div class="card"><p>Someone claims: <em>“this person knows chemistry.”</em> Design three test questions of increasing power:</p>' +
      '<ol><li>one a <strong>memorizer</strong> passes (recall of a stated fact),</li>' +
      '<li>one a <strong>pattern-matcher</strong> passes (familiar problem, new numbers),</li>' +
      '<li>one only <strong>understanding</strong> passes (novel situation the rules must be <em>applied</em> to, not matched).</li></ol>' +
      '<p>Then the uncomfortable question: is question three even always possible? For which skills can behavior alone never ' +
      'fully separate the three? Keep your answer — Week 5 turns it into a discipline.</p></div>' },
    { kind: 'naming', html:
      '<p><strong>Generalization to novel cases</strong> is the test that separates memorization from grasp. Not fluency, not ' +
      'speed, not confidence — novelty.</p>' +
      '<p><strong>Interpolation vs extrapolation, in plain words:</strong> filling in between what you’ve seen vs going beyond ' +
      'it. Memorizers interpolate over answers; understanders extrapolate over rules.</p>' +
      '<p>And the honest caveat: every behavioral test still leaves something unresolved. A clever-enough pattern-matcher can ' +
      'pass any <em>fixed</em> list of questions. Tests raise confidence; they don’t deliver certainty.</p>' },
    { kind: 'checkpoint', html:
      '<p>Pick any skill you know well. Design the three-question probe for it, and then complete the sentence: “even if all ' +
      'three are passed, this test cannot rule out ___.”</p>' },
  ],
});

GM.weeks.push({
  num: 5, arcId: 2,
  short: 'The ascription problem',
  title: 'The ascription problem',
  tagline: 'The horse was genuinely doing something impressive. It just wasn’t math.',
  checkpointStatement: 'I can state why fluent output alone never settles “does it understand,” and can name what a stronger test would look like for a case of my choosing.',
  beats: [
    { kind: 'puzzle', title: 'Clever Hans', html:
      '<p>Berlin, around 1904. A horse named Hans answers arithmetic questions in front of crowds — tap-tap-tap with a hoof, ' +
      'stopping at the right number. Add, subtract, even work with dates. His owner, a retired schoolteacher, isn’t cheating; ' +
      'he believes completely, and investigations find no trickery.</p>' +
      '<p>Then the psychologist Oskar von Pfungst runs two careful variations. He has questioners who <em>don’t know the ' +
      'answer</em> themselves. He puts blinders on Hans so he can’t see the asker. The arithmetic dissolves. Hans, it turns out, ' +
      'was reading micro-movements — the involuntary tension people show as the tap-count approaches the right answer, and the ' +
      'tiny release when it arrives.</p>' +
      '<p><strong>The horse was genuinely doing something impressive. It just wasn’t math.</strong> Notice what settled the ' +
      'question: not staring harder at the performances — <em>controls</em>.</p>' },
    { kind: 'exercise', title: 'The ELIZA story', html:
      '<div class="card"><p>1966: Joseph Weizenbaum builds ELIZA, a program with a handful of reflection tricks — turn “I am X” ' +
      'into “why are you X?”, sprinkle in “tell me more.” Users confide in it. Some insist it understands them. Weizenbaum’s ' +
      'own secretary asks him to leave the room so she can talk privately — <em>and she knows how it works</em>.</p>' +
      '<p>Discussion (with a partner, or in writing): the pull to ascribe minds is in <strong>us</strong>, and knowing the trick ' +
      'doesn’t fully disarm it. When did you last feel that pull? A pet? A car? A chatbot?</p></div>' },
    { kind: 'exercise', title: 'The ascription spectrum', html:
      '<div class="card"><p>Walk this ladder: <strong>thermostat → houseplant → dog → infant → adult → chatbot</strong>.</p>' +
      '<p>For each: what do we comfortably say it “knows”? (“The thermostat knows the room is cold” — do you object?) What ' +
      'behavioral evidence drives the comfort? Where does the vocabulary start to wobble? Mark the exact rung where you ' +
      'hesitate — that hesitation is the topic of this course.</p></div>' },
    { kind: 'exercise', title: 'The ascription game', html:
      '<p>The core exercise of the whole course. Below are transcripts of behavior — some human, some machine, some from animal ' +
      'experiments. Sources hidden. For each: argue <em>for</em> and <em>against</em> “it understands,” give your verdict, then ' +
      'see the source and — the real point — what additional test would actually move the needle.</p>',
      widget: 'ascription-game' },
    { kind: 'naming', html:
      '<p><strong>Behavior underdetermines mechanism.</strong> The same performance can come from very different insides.</p>' +
      '<p><strong>Fluency is evidence, but weak evidence</strong> — and our ascription reflex is trigger-happy; it fires on ' +
      'houseplants and horoscopes.</p>' +
      '<p><strong>“Understands” is a claim that needs a test attached.</strong> Without the test, it’s not a finding; it’s a ' +
      'feeling. Von Pfungst’s move — design the control that separates the explanations — is the transferable skill.</p>' },
    { kind: 'checkpoint', html:
      '<p>Pick any system you interact with (an app, an animal, a person’s skill). State what people casually say it ' +
      '“knows,” then design the von-Pfungst-style control that would test the claim. What would each outcome show?</p>' },
  ],
});

GM.weeks.push({
  num: 6, arcId: 2,
  short: 'Calibration: knowing what you don’t know',
  title: 'Calibration: knowing what you don’t know',
  tagline: 'The room discovers its own overconfidence, empirically.',
  checkpointStatement: 'I have a measured record of my own calibration, and I can define confident wrongness and say why it’s worse than admitted ignorance.',
  beats: [
    { kind: 'puzzle', html:
      '<p>Before any explanation, take the quiz below. Ten questions with numeric answers. For each, give a range you are ' +
      '<strong>90% sure</strong> contains the truth. Make the range as wide as you honestly need.</p>' +
      '<p>A perfectly calibrated person misses about one in ten. Nearly everyone misses four or more. Let’s see.</p>',
      widget: 'calibration-quiz', widgetOpts: { round: 1 } },
    { kind: 'exercise', title: 'Recalibration round', html:
      '<p>Now that you’ve seen your score: new questions, same task. Widen your ranges until they’re honest. Feel how ' +
      '<em>uncomfortable</em> honest uncertainty is — ranges that feel embarrassingly wide are usually about right.</p>',
      widget: 'calibration-quiz', widgetOpts: { round: 2 } },
    { kind: 'exercise', title: '“I don’t know” drills', html:
      '<div class="card"><p>With a partner (or against yourself, written): take turns asking questions that range from knowable ' +
      'to unknowable — “what’s the capital of Australia?”, “what will the weather be in 40 days?”, “what was my grandmother’s ' +
      'favorite song?” Practice the three honest registers:</p>' +
      '<ul><li>“I know: X.”</li><li>“I’d guess X, weakly.”</li><li>“I have no basis to answer.”</li></ul>' +
      '<p>Notice which one your mouth resists. Fluent confident answering is the <em>easy</em> mode; calibrated answering is ' +
      'the skill.</p></div>' },
    { kind: 'exercise', title: 'Bullshit vs lying', html:
      '<div class="card"><p>A distinction from the philosopher Harry Frankfurt, in plain language: the <strong>liar</strong> ' +
      'tracks the truth carefully — in order to avoid it. The <strong>bullshitter</strong> speaks without regard to whether ' +
      'what they say is true; truth just isn’t the variable being optimized.</p>' +
      '<p>Discussion: which failure is more dangerous in an advisor — someone who lies to you, or someone who doesn’t care? ' +
      'Why?</p>' +
      '<p class="plant-note">Planted for Week 9: this exact distinction returns, applied to the machine. Spoiler: the machine ' +
      'is never lying.</p></div>' },
    { kind: 'naming', html:
      '<p><strong>Calibration:</strong> the match between how confident you are and how often you’re right. It’s measurable — ' +
      'you just measured yours.</p>' +
      '<p><strong>Confident wrongness</strong> is <em>the</em> failure mode to watch for — in experts, in yourself, and soon in ' +
      'machines. Admitted ignorance costs you an answer; confident wrongness costs you the ability to know which answers to ' +
      'trust.</p>' +
      '<p><strong>Overconfidence is the default state.</strong> It takes deliberate work to correct, and the correction feels ' +
      'wrong from the inside.</p>' },
    { kind: 'checkpoint', html:
      '<p>Your quiz results above are saved on this page. State your hit rate out loud, then define “confident wrongness” to ' +
      'an imaginary outsider and explain why it’s worse than “I don’t know.”</p>' },
  ],
});
