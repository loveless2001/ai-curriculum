/* Arc 2 (Weeks 4-6): What counting as knowing means. The course's inoculation arc. */
GM.arcs.push({
  id: 2,
  name: 'Arc 2 — Testing claims about understanding',
  shortName: 'Arc 2 · Knowing',
  claim: 'A correct answer does not reveal how it was produced. This arc shows how to test claims about knowledge, and how to state what each test cannot prove.',
  weeks: [4, 5, 6],
});

GM.weeks.push({
  num: 4, arcId: 2, showArcBanner: true,
  short: 'Testing recall, patterns, and rules',
  title: 'Testing recall, patterns, and rules',
  tagline: 'The same answer can come from memory, a familiar pattern, or a rule.',
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
      '<p>The rule is simple. The difficult part is choosing tests that could prove your first idea wrong.</p>',
      widget: 'rule-induction' },
    { kind: 'exercise', title: 'Design-the-probe', html:
      '<div class="card"><p>Someone claims: <em>“this person knows chemistry.”</em> Design three test questions of increasing power:</p>' +
      '<ol><li>one a <strong>memorizer</strong> passes (recall of a stated fact),</li>' +
      '<li>one a <strong>pattern-matcher</strong> passes (familiar problem, new numbers),</li>' +
      '<li>one only <strong>understanding</strong> passes (novel situation the rules must be <em>applied</em> to, not matched).</li></ol>' +
      '<p>Then the uncomfortable question: is question three even always possible? For which skills can behavior alone never ' +
      'fully separate the three? Keep your answer — Week 5 turns it into a discipline.</p></div>' },
    { kind: 'naming', html:
      '<p><strong>Generalization</strong> means applying what was learned to a new case. Novel cases help distinguish recall from use of a rule.</p>' +
      '<p><strong>Interpolation</strong> stays among familiar examples. <strong>Extrapolation</strong> goes beyond them.</p>' +
      '<p>No short behavioral test proves understanding. A system may learn the test itself. A good result increases confidence; ' +
      'it does not remove every alternative explanation.</p>' },
    { kind: 'checkpoint', html:
      '<p>Pick any skill you know well. Design the three-question probe for it, and then complete the sentence: “even if all ' +
      'three are passed, this test cannot rule out ___.”</p>' },
  ],
});

GM.weeks.push({
  num: 5, arcId: 2,
  short: 'What behavior can show',
  title: 'What behavior can and cannot show',
  tagline: 'Good controls can separate two explanations of the same behavior.',
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
      '<p>Hans was responding to subtle human cues, not solving arithmetic. The decisive evidence came from changing who knew ' +
      'the answer and what the horse could see. Those changes were <strong>controls</strong>.</p>' },
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
      '<p><strong>Behavior does not uniquely identify its cause.</strong> Different mechanisms can produce the same visible result.</p>' +
      '<p><strong>Fluent output is evidence, but it is not enough by itself.</strong> People readily attribute knowledge or intention to many things.</p>' +
      '<p><strong>A claim about understanding needs a test.</strong> The useful move is to design a control that separates competing explanations.</p>' },
    { kind: 'checkpoint', html:
      '<p>Pick any system you interact with (an app, an animal, a person’s skill). State what people casually say it ' +
      '“knows,” then design the von-Pfungst-style control that would test the claim. What would each outcome show?</p>' },
  ],
});

GM.weeks.push({
  num: 6, arcId: 2,
  short: 'Measuring confidence',
  title: 'Measuring confidence',
  tagline: 'Compare your stated confidence with how often you are right.',
  checkpointStatement: 'I have a measured record of my own calibration, and I can define confident wrongness and say why it’s worse than admitted ignorance.',
  beats: [
    { kind: 'puzzle', html:
      '<p>Before any explanation, take the quiz below. Ten questions with numeric answers. For each, give a range you are ' +
      '<strong>90% sure</strong> contains the truth. Make the range as wide as you honestly need.</p>' +
      '<p>A perfectly calibrated person misses about one in ten. Nearly everyone misses four or more. Let’s see.</p>',
      widget: 'calibration-quiz', widgetOpts: { round: 1 } },
    { kind: 'exercise', title: 'Recalibration round', html:
      '<p>Now try new questions. Use what you learned from the first score. Widen a range when the evidence does not justify a narrow one.</p>',
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
      '<p><strong>Calibration</strong> is the match between stated confidence and actual accuracy. The quiz gives you one measurement of it.</p>' +
      '<p><strong>Confident wrongness</strong> is dangerous because the listener receives both an error and a false reason to trust it. ' +
      '“I don’t know” leaves the uncertainty visible.</p>' +
      '<p><strong>Calibration takes practice.</strong> Check predictions against results and adjust future confidence.</p>' },
    { kind: 'checkpoint', html:
      '<p>Your quiz results above are saved on this page. State your hit rate out loud, then define “confident wrongness” to ' +
      'an imaginary outsider and explain why it’s worse than “I don’t know.”</p>' },
  ],
});
