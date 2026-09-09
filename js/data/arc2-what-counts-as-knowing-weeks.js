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
  checkpointStatement: 'I can design tests of a skill and explain what their results still cannot prove.',
  beats: [
    { kind: 'puzzle', html:
      '<p>Two students answer “56” to 7 × 8. One recalls the answer; the other calculates it. This answer alone cannot tell you which happened.</p><p><strong>What would you ask next?</strong> Try 17 × 8, then ask how they worked it out. A new question gives more evidence, but they might have practiced that one too.</p>' },
    { kind: 'exercise', title: 'Find the hidden rule', html:
      '<p>Enter three numbers to test a hidden rule. The game tells you whether they fit.</p><p>After each result, write your current guess. Then choose a test whose result could show that guess is wrong. Testing only examples you expect to pass can hide a mistaken rule.</p>',
      widget: 'rule-induction' },
    { kind: 'exercise', title: 'Build a stronger test', html:
      '<p>Try three tests of multiplication:</p><ol><li>Recall: “What is 7 × 8?”</li><li>New numbers: “What is 17 × 8?”</li><li>New situation: “Seven boxes hold eight cups each. Two cups break. How many remain?”</li></ol><p>The last question also tests choosing the right operations. None proves understanding by itself. Design a similar set for a skill you know.</p>' },
    { kind: 'naming', html:
      '<p><strong>Generalization</strong> means using something learned on a new case. The student who can multiply unfamiliar numbers shows more than recall of one answer.</p><p>If you practiced numbers from 1 to 10, trying 6 is <strong>interpolation</strong>: inside that range. Trying 20 is <strong>extrapolation</strong>: beyond it. These describe where a test falls, not how someone solves it.</p>' },
    { kind: 'checkpoint', html:
      '<p>Give your three test questions. Explain what each adds, then finish: “Even if all three answers are correct, I still cannot rule out ___.” Week 5 will help you test an alternative explanation.</p>' },
  ],
});

GM.weeks.push({
  num: 5, arcId: 2,
  short: 'What behavior can show',
  title: 'What behavior can and cannot show',
  tagline: 'Good controls can separate two explanations of the same behavior.',
  checkpointStatement: 'I can give two explanations for a result and a test that could distinguish them.',
  beats: [
    { kind: 'puzzle', title: 'Clever Hans', html:
      '<p>Week 4 asked whether a new question can separate recall from calculation. Here is a case where changing the test exposed an unexpected explanation.</p><p>A horse called Clever Hans appeared to answer arithmetic by tapping its hoof. Psychologist Oskar Pfungst tested what happened when the questioner did not know the answer, or Hans could not see them. Performance dropped.</p><p>Hans had been responding to small human cues. A <strong>control</strong> changes a condition to check an alternative explanation.</p>' },
    { kind: 'exercise', title: 'A reply that sounds understanding', html:
      '<p>ELIZA was an early program that used text rules to imitate conversation. Imagine this exchange:</p><blockquote>“I feel worried.”<br>“Why do you feel worried?”</blockquote><p>The reply fits without showing what caused the worry. Write a follow-up question that would test more than repeating your words.</p>' },
    { kind: 'exercise', title: 'Observation or interpretation?', html:
      '<p>Consider a thermostat, a dog, and a chatbot. For each, finish: “People say it knows ___ because it does ___.”</p><p>Separate what you observed from what you inferred. For example, turning on the heater shows a response to temperature; it does not show awareness of feeling cold.</p>' },
    { kind: 'exercise', title: 'Compare explanations', html:
      '<p>Read each description before revealing its source. Write one explanation of the behavior, one alternative, and one test that could separate them. After the reveal, decide whether your evidence changed or only your expectation did.</p>',
      widget: 'ascription-game' },
    { kind: 'naming', html:
      '<p><strong>The same result can have different causes.</strong> A correct answer might come from calculation, memory, or an unnoticed clue.</p><p><strong>Test a specific claim.</strong> “It can multiply unfamiliar numbers without hints” is easier to test than “it understands everything.”</p>' },
    { kind: 'checkpoint', html:
      '<p>Choose a skill, state two explanations for a successful performance, and change one test condition to distinguish them. Predict what each explanation would lead you to observe.</p>' },
  ],
});

GM.weeks.push({
  num: 6, arcId: 2,
  short: 'Measuring confidence',
  title: 'Measuring confidence',
  tagline: 'Compare your stated confidence with how often you are right.',
  checkpointStatement: 'I can compare my confidence with my quiz results and explain the limits of a short quiz.',
  beats: [
    { kind: 'puzzle', html:
      '<p>Last week you tested an answer. This week you test how sure you should be of it.</p><p>For each quiz question, give a range you are <strong>90% confident</strong> contains the answer. For an unfamiliar building, you might estimate “20–60 meters tall,” rather than guess one height.</p><p>Over many such estimates, about nine in ten ranges should contain the answer. One short quiz will vary; it cannot settle how well calibrated you are.</p>',
      widget: 'calibration-quiz', widgetOpts: { round: 1 } },
    { kind: 'exercise', title: 'Recalibration round', html:
      '<p>Try the second set. Use wider ranges where your first estimates were too confident. Aim for honest uncertainty, not a range so wide it would cover almost anything.</p>',
      widget: 'calibration-quiz', widgetOpts: { round: 2 } },
    { kind: 'exercise', title: '“I don’t know” drills', html:
      '<p>Practice three answers with a partner or in writing:</p><ul><li>“I know this because ___.”</li><li>“My best guess is ___, based on ___.”</li><li>“I have no evidence for an answer.”</li></ul><p>Try “What is the capital of Australia?” and “What was my grandmother’s favorite song?” What evidence would let you answer each?</p>' },
    { kind: 'exercise', title: 'Error, carelessness, or deception?', html:
      '<p>A person can make an honest mistake, knowingly mislead you, or answer without checking. The same false sentence does not tell you which happened.</p><p>Example: someone gives you the wrong train time. What would distinguish an outdated timetable from an attempt to make you miss the train? Keep this distinction for Week 9.</p>' },
    { kind: 'naming', html:
      '<p><strong>Calibration</strong> means stated confidence matches results over many cases. Of 100 predictions labeled “90% sure,” roughly 90 should be right.</p><p><strong>Confident wrongness</strong> makes an error harder for the listener to spot. Confidence should reflect evidence, not how easily an answer comes to mind.</p>' },
    { kind: 'checkpoint', html:
      '<p>Report your hit rate from each round. Give one reason to widen a future estimate and explain why a short quiz is only a starting point for measuring calibration. Keep the results for Week 9.</p>' },
  ],
});
