/* Arc 4 (Weeks 10-12): Under the hood, and the road onward. Jargon reveal,
   training loop, attention/circuits, alignment pipeline, capstone, exit ramp. */
GM.arcs.push({
  id: 4,
  name: 'Arc 4 — Training, attention, and chatbots',
  shortName: 'Arc 4 · Under the hood',
  claim: 'This arc connects the course’s plain-language ideas to technical terms, then shows the basic training loop, attention, and instruction tuning.',
  weeks: [10, 11, 12],
});

GM.weeks.push({
  num: 10, arcId: 4, showArcBanner: true,
  short: 'How training changes a model',
  title: 'How training changes a model',
  tagline: 'Connect familiar ideas to the terms used in technical writing.',
  checkpointStatement: 'I can explain one weight update and distinguish the toy error measure from text-prediction loss.',
  beats: [
    { kind: 'puzzle', html:
      '<p>In Week 7, training changed the model’s internal numbers. How does it choose a change?</p><p>A toy model guesses that three items cost 12 coins. The example says they cost 6. <strong>Should it increase or decrease its estimated price per item?</strong> Training uses an error measure to guide changes like this.</p>' },
    { kind: 'exercise', title: 'The jargon reveal', html:
      '<p>Reveal the terms below. These connect earlier examples to technical ideas; an analogy and a technical definition are not always identical. Attention is a preview of Week 11.</p>',
      widget: 'jargon-reveal' },
    { kind: 'exercise', title: 'The training loop, narrated', html:
      '<ol><li><strong>Show</strong> some training text, hiding later tokens from each prediction.</li><li><strong>Predict</strong> the next token at each position.</li><li><strong>Measure loss:</strong> a larger penalty when the actual token was assigned a lower probability.</li><li><strong>Adjust</strong> the trainable weights in a direction expected to reduce loss.</li><li><strong>Repeat</strong> over batches of examples.</li></ol><p>This text-prediction loss is called <strong>cross-entropy</strong>. The downhill adjustment is <strong>gradient descent</strong>. Smaller loss on training examples does not guarantee correct answers on new ones.</p>' },
    { kind: 'exercise', title: 'Hand-run the loop yourself', html:
      '<p>The toy model predicts <strong>y = w × x</strong>: input x times adjustable number w. Its examples are 1 → 2, 2 → 4, and 3 → 6. What value of w fits all three?</p><p>The graph shows w horizontally and loss vertically. This toy uses average squared error, not text cross-entropy. Both give training a number to reduce.</p><p>Take three small steps, then try a reckless step. Why can a step that is too large make the error worse?</p>',
      widget: 'gradient-descent' },
    { kind: 'exercise', title: 'Optional: what scaling laws predict', html:
      '<p><strong>Optional:</strong> researchers found patterns relating model size, data, and computing budget to prediction loss. These are called scaling laws.</p><p>Like estimating travel time from distance, they help plan within tested conditions. Lower prediction loss is not a guarantee of every useful skill. <a href="https://arxiv.org/abs/2001.08361">Read the original scaling study.</a></p>' },
    { kind: 'naming', html:
      '<p><strong>Loss</strong> is a numerical penalty for predictions. <strong>Gradient</strong> describes how it changes when weights change. <strong>Learning rate</strong> controls the size of an update.</p><p>Use the <a href="#/dictionary">dictionary</a> for reference after revealing the terms.</p>' },
    { kind: 'checkpoint', html:
      '<p>Explain one toy-model update: the prediction, the error, and why w moves in that direction. Then describe how text training uses the same predict–measure–adjust loop with a different loss. Revisit the graph if a step is unclear.</p>' },
  ],
});

GM.weeks.push({
  num: 11, arcId: 4,
  short: 'Attention and internal circuits',
  title: 'Attention and internal circuits',
  tagline: 'Internal mechanisms are difficult to study, but some can be tested directly.',
  checkpointStatement: 'I can explain attention with an analogy and distinguish a programmed demo from evidence about a real model.',
  beats: [
    { kind: 'puzzle', html:
      '<p>Week 10 showed how training changes weights. Now examine one calculation those weights help perform.</p><blockquote>“The keys are on the table next to the lamp; hand me ___.”</blockquote><p>“Them” could refer back to “keys.” <strong>How can a model use an earlier word when predicting a later one?</strong></p>' },
    { kind: 'exercise', title: 'The relevance visualizer', html:
      '<p>Attention mixes information from text positions using calculated weights. Think of highlighting useful passages before answering a question, but with numbers controlling how much each passage contributes.</p><p>Click the words below. The highlights are hand-prepared illustrations, not measurements from a model. Real attention acts on token representations, and one attention map alone does not explain an answer.</p>',
      widget: 'attention-viz' },
    { kind: 'exercise', title: 'Copy a pattern from context', html:
      '<p>Try the pattern <span class="mono">A B … A → B</span>. If “Blicket Farnsworth” appeared earlier, seeing “Blicket” again can cue “Farnsworth.”</p><p>This demo uses a programmed copying rule. It shows the behavior researchers studied; it does not train or inspect a neural network.</p>',
      widget: 'induction-demo' },
    { kind: 'exercise', title: 'How researchers tested the mechanism', html:
      '<p>Researchers identified attention components called <strong>induction heads</strong> that help copy patterns in studied models. In small models, they tested the explanation by changing or disabling components.</p><p>This goes beyond seeing a correct completion: it tests a proposed cause. It does not explain every model or every form of learning. <a href="https://transformer-circuits.pub/2022/in-context-learning-and-induction-heads/index.html">Read the induction-head study.</a></p>' },
    { kind: 'naming', html:
      '<p><strong>Attention</strong> combines information from token positions using calculated weights. It is not a claim about conscious focus.</p><p><strong>A circuit</strong> is a group of components proposed to do a particular job. <strong>Interpretability</strong> studies how model components produce behavior. Week 5’s rule still applies: test competing explanations.</p>' },
    { kind: 'checkpoint', html:
      '<p>Explain attention with the highlighting analogy and state its limit. Then distinguish three things: a copying behavior, our programmed demo, and evidence that a circuit causes that behavior inside a model.</p>' },
  ],
});

GM.weeks.push({
  num: 12, arcId: 4,
  short: 'From text predictor to chatbot',
  title: 'From text predictor to chatbot',
  tagline: 'Additional training turns a text predictor into an assistant-style product.',
  checkpointStatement: 'My draft covers the five requirements, and I have recorded any feedback still needed.',
  beats: [
    { kind: 'puzzle', html:
      '<p>You can now explain text prediction, training, selection, and errors. One step remains: why does a chatbot usually respond like an assistant?</p><p>A text predictor could continue “How do I ask for a raise?” with advice, another question, or a forum discussion. Additional training helps favor useful responses to requests.</p>' },
    { kind: 'exercise', title: 'How a predictor becomes an assistant', html:
      '<ol><li><strong>Base training:</strong> learn to predict text.</li><li><strong>Instruction tuning:</strong> train on examples of requests and suitable responses.</li><li><strong>Preference training:</strong> use comparisons of answers to encourage preferred responses.</li></ol><p>Think of learning to write, then practicing how to answer a customer. These are training stages, not separate personalities inside the model.</p><p>RLHF means reinforcement learning from human feedback, one approach to preference training. This is <a href="https://arxiv.org/abs/2203.02155">one documented recipe</a>, not a required pipeline for every chatbot. Product instructions and tools also shape the reply.</p>' },
    { kind: 'exercise', title: 'Optional: doing more work before answering', html:
      '<p><strong>Optional:</strong> extra work before answering can help with some tasks. Compare multiplying 17 × 24 in one guess with writing intermediate steps.</p><p>More steps can still contain errors. To test whether extra computation helps, compare accuracy on the same questions. A fluent explanation alone does not prove the steps are sound.</p>' },
    { kind: 'exercise', title: 'Capstone, part 1: teach one concept', html:
      '<p>Revisit your Week 7 explanation and its confusing phrase. Teach the revised version to someone unfamiliar with AI. Ask them to explain the idea back and note what needs another example.</p><p>If studying alone, record it and check every technical word against a concrete example.</p>' },
    { kind: 'exercise', title: 'Capstone, part 2: “What an LLM is and isn’t”', html:
      '<p>Write <strong>at most 500 words</strong> answering “What is an LLM, and when should I check its answer?” Include:</p><ol><li>What the model predicts.</li><li>How training differs from chat context.</li><li>How scores become selected tokens.</li><li>A possible factual error and a way to check it.</li><li>One example or analogy, with its limit.</li></ol><p> Your draft saves on this device.</p>',
      widget: 'capstone-editor' },
    { kind: 'exercise', title: 'Optional: where to go next', html:
      '<p><strong>Optional next steps:</strong> choose a topic you want to explore; these are not required for the capstone.</p><ul><li>Training: practice arithmetic, graphs, and basic programming, then build a small prediction model.</li><li>Attention: revisit Week 11 and its linked study after learning vectors and matrices.</li><li>Chatbot training: revisit the linked instruction-tuning study after you can explain the training loop.</li></ul><p>You do not need to read research papers to complete this course.</p>' },
    { kind: 'naming', html:
      '<p>Keep using the same method: make a prediction, test it, compare explanations, and report uncertainty. That method connects the opening guessing game to checking a chatbot’s answer.</p>' },
    { kind: 'checkpoint', html:
      '<p>Check the draft against the five requirements above. Ask a beginner what they learned and a technical reader, if available, what needs correction. If neither is available, use the checklist yourself and mark external feedback as still pending. Revise unclear or unsupported claims.</p>' },
  ],
});
