/* Arc 3 (Weeks 7-8): understand language models, then check their work. */
GM.arcs.push({
  id: 3,
  name: 'Arc 3 — Working with language models',
  shortName: 'Arc 3 · Working with AI',
  claim: 'Explain how a language model generates text, then use it for a task with relevant information, clear criteria, and concrete checks.',
  weeks: [7, 8],
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
      '<p>Tell the simulation a fact, ask about it, then start a fresh conversation and ask again.</p><p>Think of a student using a note on their desk. The note helps with this question without changing what they learned during lessons. Similarly, chat context supplies information without changing the model’s trained numbers.</p><p>Some products save notes or retrieve past chats. That is separate from retraining the model.</p><p>A chatbot may also connect the model to search, a calculator, or email. Writing a draft and sending it are different steps. Week 8 asks what evidence each step needs.</p>',
      widget: 'chat-memory-demo' },
    { kind: 'exercise', title: 'One-minute explanations', html:
      '<p>Explain an LLM in 60 seconds. Include what it predicts, how training changes it, and how a conversation supplies clues. Use the note-on-the-desk example if it helps.</p>' },
    { kind: 'naming', html:
      '<p><strong>Training</strong> adjusts internal numbers, called weights, using examples. <strong>Using the model</strong> applies those numbers to the current text.</p><p>To generate a reply: score possible next tokens, choose one, add it to the text, and repeat. Week 8 brings the earlier testing methods to a complete task. Week 9 examines token selection; Week 10 examines training.</p>' },
    { kind: 'checkpoint', html:
      '<p>Give your explanation to a beginner, or record it and listen back. Note one unclear phrase and replace it with an example. Save this draft for Week 12.</p>' },
  ],
});

GM.weeks.push({
  num: 8, arcId: 3,
  short: 'Is the result ready to use?',
  title: 'Is this AI result ready to use?',
  tagline: 'Check the facts, the task, and what has actually been done.',
  checkpointStatement: 'I can check a result against its sources and purpose, locate a problem, and test a revised process on two cases.',
  beats: [
    { kind: 'puzzle', html:
      '<p>You want a client to agree to move a meeting from 10 November to 12 November. You have not supplied a reason. AI drafts: “I am sorry, but an internet outage means we need to postpone our meeting. Thank you for understanding.”</p><p>It sounds polite. What does it invent, what does it leave out, and what would count as getting the meeting moved?</p><p>Week 7 explained how text is generated. This week uses the ideas from Weeks 1–6 to check that text and the work it is meant to support. All cases below are fictional and can be checked without a live model.</p>' },
    { kind: 'exercise', title: 'Which numbers have a source?', html:
      '<p><strong>Three source notes:</strong> (N1) Monday: 12 new requests received, 11 of those resolved. (N2) Tuesday: 8 received, all 8 resolved. (N3) Wednesday: 10 received, 9 of those resolved.</p><p><strong>AI writes:</strong> “Over three days the team resolved 30 requests, has no work left open, and raised customer satisfaction by 20%.”</p><p>Mark each claim as supported, contradicted, or not covered by these notes. Rewrite the report and cite N1–N3 after the numbers. What source would let you check the satisfaction claim?</p><details class="answer-reveal"><summary>Check against the notes</summary><p>The team <strong>received 30</strong> requests and <strong>resolved 28</strong>; 2 of these new requests remain open. The satisfaction claim is <strong>not covered</strong>: these notes cannot establish whether it is true or false. They also do not describe any older backlog.</p></details>',
      widget: 'application-notebook', widgetOpts: { id: 'week-9', fields: [
        { label: 'Rewrite the three-day report with references to N1–N3', placeholder: 'The team received… (N1–N3), resolved… (N1–N3)…' },
        { label: 'Which source would you check for a report in your work?', placeholder: 'For the claim… I would check…' },
      ] } },
    { kind: 'exercise', title: 'Correct arithmetic, wrong choice?', html:
      '<p>You need <strong>24 to 30 pens of the same type</strong> at the lowest total cost. Both suppliers have stock and sell whole boxes only. A sells 12 pens for 96,000 VND, with free delivery. B sells 10 pens for 75,000 VND, plus 20,000 VND delivery per order. These are the full costs for this case.</p><p>AI calculates 8,000 VND per pen at A and 7,500 at B, then recommends B. The divisions are correct. Does B cost less for the order you need?</p><p>Work out the boxes, pens, delivery fee, and total for each supplier before opening the answer.</p><details class="answer-reveal"><summary>Compare complete orders</summary><table><thead><tr><th scope="col">Supplier</th><th scope="col">Whole boxes and pens</th><th scope="col">Total cost</th></tr></thead><tbody><tr><td>A</td><td>2 × 12 = 24 pens</td><td>2 × 96,000 = <strong>192,000 VND</strong></td></tr><tr><td>B</td><td>3 × 10 = 30 pens</td><td>3 × 75,000 + 20,000 = <strong>245,000 VND</strong></td></tr></tbody></table><p>A meets the quantity requirement at the lower total cost. Two boxes from B provide only 20 pens. Price per pen answers a different question from the cheapest qualifying order. These figures say nothing about quality or delivery time.</p></details><p><strong>Change one condition:</strong> A now charges 60,000 VND for delivery. Predict whether your choice changes, then calculate again.</p><details class="answer-reveal"><summary>Check the changed case</summary><p>A now costs 252,000 VND; B still costs 245,000 VND. B is now cheaper by 7,000 VND. The method stays the same; the new fee changes the result.</p></details>' },
    { kind: 'exercise', title: 'What has actually been completed?', html:
      '<p>Return to the meeting email. Ask four separate questions:</p><ol><li><strong>Has anything been produced?</strong> A draft exists. Sending it would need a separate action and evidence that it was sent.</li><li><strong>Are the facts supported?</strong> The dates are 10 and 12 November. The internet outage has no source and should not be stated as fact.</li><li><strong>Does it do the job?</strong> It must propose 12 November and ask the client to confirm.</li><li><strong>Has the goal been reached?</strong> The client’s agreement would support that conclusion. Until then, the request is pending.</li></ol><p>Rewrite the email. If the client declines the new date, what would you need to find out before writing again? A polished email cannot make an unavailable date work.</p>' },
    { kind: 'exercise', title: 'Find the step that needs fixing', html:
      '<p>For the pen order, use three steps: <strong>record the quantity, box sizes, and fees → calculate qualifying orders → recommend one with its conditions</strong>.</p><p>Before calculating, check that the units and fees are right. Before recommending, check that both orders meet the quantity limit. Keep the source figures with the totals so someone else can check them.</p><p>If a fee is missing, ask for it or give a conditional comparison. If the sums are wrong, calculate again. If the sums are right but the recommendation ignores the quantity requirement, fix the comparison. Describe the problem before choosing a remedy, as you did in Week 5.</p>' },
    { kind: 'exercise', title: 'What would count as evidence?', html:
      '<p>As in Week 6, “I am very sure” is a claim to check. Repeating an answer shows consistency; a wrong answer can repeat too. Asking the same model to review its work can help find errors, but does not provide independent evidence.</p><p>For a number, calculate from the original data. For a citation, open the source and check whether it supports the claim, including the relevant date and scope. Failing to find a source leaves a question open; it does not by itself prove a claim false.</p><p>A single correct or incorrect answer cannot measure calibration. That needs many confidence estimates compared with checked outcomes. Likewise, an invented citation describes an output error; intent requires further evidence. These teaching cases do not measure a real model’s error rate.</p>' },
    { kind: 'naming', html:
      '<p><strong>Hallucination</strong> is generated content that is false or unsupported, such as an invented citation. It need not sound confident. A recommendation can also fail because it uses the wrong criterion, even when every quoted number is correct.</p><p>Weeks 1–3 helped you choose context and preserve useful information. Weeks 4–6 helped you test changed cases, compare explanations, and assess confidence. Week 7 applied those ideas to language models. Now use them together: define the task, supply what matters, check the result, and revise the step that failed.</p>' },
    { kind: 'checkpoint', html:
      '<p>Use the task and two trials from your notes above. Explain what counted as success, which claims or calculations you checked, what changed between trials, and where you would return if the result failed. Distinguish what you checked from any outcome still waiting on someone else.</p><p>Why can a result be factually correct but unsuitable? Why does agreement between repeated answers not establish truth? Use an example from this lesson.</p><p>This completes Arc 3. Arc 4 begins in Week 9 with a closer look at how scores become selected tokens, then examines training, attention, and chatbot behavior.</p>' },
  ],
});
