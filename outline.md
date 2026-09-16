# Understanding the Guessing Machines

A 12-week course for adults with no programming or advanced mathematics background.

**Status:** revised teaching outline, September 2026. The bilingual website is the learner-facing course. See [the clarity and flow review](docs/course-clarity-and-flow-review.md) for changes and remaining pilot questions.

## Teaching approach

Begin with a concrete question, let the learner try it, explain the result, then check whether they can use the idea. Introduce technical terms when needed and define them immediately. Week 10 brings the terms together; it is not the first appearance of every term.

Use ordinary examples before abstract claims. Treat analogies as aids with stated limits. Distinguish an observed result, a possible explanation, and evidence that tests that explanation.

A weekly session can fit roughly two hours, including discussion. Self-paced learners can split it across sittings. Material marked optional is not needed for the checkpoint.

## Course sequence

| Weeks | Main question | Preparation for the next part |
| --- | --- | --- |
| 1–3: Prediction | Which clues help, and what does a useful model leave out? | Language for describing predictions and missing details |
| 4–6: Evidence | What can a test establish, and how should confidence match results? | A method for evaluating model answers |
| 7–9: Language models | How do training, context, and selection produce text and errors? | Concrete processes to explain technically |
| 10–12: Mechanisms | How are weights adjusted, how is context used, and how is an assistant trained? | A short explanation with examples and limits |

## Week 1 — How context shapes a guess

**Try:** complete a sentence, then guess a passage letter by letter.

**Explain:** some contexts strongly favor one answer; others leave many plausible choices. Confidence describes how sure you are.

**Check:** explain why the coffee sentence is easier to complete than an open birthday wish.

**Next:** what do you learn when an answer arrives?

## Week 2 — Surprise and information

**Try:** compare what a delivery-date message tells someone awaiting the parcel and someone who already knows the schedule. Compare questions that split eight equally likely items 4/4 and 1/7. Rank prediction tasks and explain the source of uncertainty.

**Explain:** information depends on the receiver's starting knowledge. Surprise depends on expectations; emotional shock and usefulness are different questions. Balanced questions help under stated assumptions.

**Check:** contrast a long, uninformative message with a short, informative one; identify a question whose likely answer rules out little.

**Between sessions:** record three surprises and whether they justify changing an expectation. The misconception exercise is a short review, not another lecture.

**Next:** which details must a useful model keep? Save the prediction ranking for Week 8.

## Week 3 — Remember a route. Build a map.

**Try:** start with a familiar A–B–C–D journey. Build a map from five explicit, bidirectional connections, then use it to plan a journey to E that was not shown as a worked example. Save the checked map for Week 4.

**Explain:** a useful model preserves relationships needed for a task, not merely fewer details. Remembering and understanding can coexist. A connection list can also be a model. A map of connections cannot yet answer questions about travel time or accessibility.

**Check:** use the model for a new journey; explain what it keeps, what it omits, and one question that requires more information. Written reflections are self-reviewed, not automatically graded.

**Next:** reuse the same model after one road closes.

## Week 4 — The road closes. Now what?

**Try:** find a new A-to-D journey when C–D closes; compare maps whose drawings or connections change; request travel-time information before choosing the fastest route; then transfer the path-and-constraints idea to a fragile-parcel delivery problem.

**Explain:** distinguish a new case using existing relationships, a changed availability fact, and a new requirement that needs additional kinds of information. Generalization extends beyond the exact worked example. A successful toy exercise is evidence of a specific performance, not proof of general intelligence.

**Check:** explain one relationship reused, one fact updated, and one type of information added. State what does and does not carry over to the delivery problem.

**Next:** Week 5 asks what alternative explanations could account for a successful performance and how to distinguish them.

## Week 5 — What behavior can and cannot show

**Try:** examine Clever Hans, an ELIZA-style reply, and the source-hidden behavior descriptions. For each, propose two explanations and a test that could distinguish them.

**Explain:** a control changes a condition to test an explanation. Replace vague claims about understanding with specific abilities you can test.

**Check:** predict what you would observe under each explanation.

**Next:** even after testing, how certain should you be?

## Week 6 — Measuring confidence

**Try:** give 90%-confidence ranges, compare them with reference answers, then attempt another round. Practice distinguishing evidence, a weak guess, and no basis to answer.

**Explain:** calibration is a pattern across many predictions. A short quiz is a starting measurement, not a diagnosis. An incorrect statement alone does not establish whether someone was mistaken, careless, or deceptive.

**Check:** report both hit rates, explain one adjustment, and state the short quiz's limits.

**Next:** carry the test-and-confidence method into the language-model lessons. Save results for Week 9.

## Week 7 — How a language model predicts text

**Try:** compare prepared human guesses and model scores; use a fact within a scripted chat and start a new one.

**Explain:** define LLM and token before using them. Training adjusts weights. Chat context is like a note on the desk: it supplies information without itself changing those weights. Product memory or retrieval is separate from training.

Generation repeats: score possible next tokens, choose one, append it, then score again with the new context.

**Check:** give a one-minute explanation and save one confusing phrase to revise in Week 12. A recording is an alternative for solo learners.

**Next:** what changes when the choice rule changes?

## Week 8 — Scores, selection, and temperature

**Try:** use a score card and ticket-bag analogy; compare three prompt types across temperature settings and repeated draws.

**Explain:** temperature changes selection probabilities, not trained weights. Choose weighted dice in the widget to observe it; always choosing the top candidate overrides the temperature effect. The next generated token changes the context and therefore the next score card.

Matching draws can occur by chance. Real-service output is not guaranteed identical at temperature 0. Lower temperature does not verify facts.

**Check:** predict a trend, run several trials, and explain any mismatch. Do not grade a random sample as if its precise outcome were guaranteed.

**Next:** separate an answer's repeatability from its truth.

## Week 9 — Why fluent answers can be false

**Try:** inspect scripted true and false examples, compare their prepared confidence statements, and propose independent checks.

**Explain:** hallucination concerns false or unsupported content; calibration concerns confidence matching accuracy. Compression offers one analogy for plausible unsupported details, not a diagnosis of every error. A false answer alone does not establish intent.

A scripted example demonstrates a distinction. It does not measure a live model's error rate, training-data coverage, or internal cause. A real model may refuse a request with a false premise.

**Check:** identify one unsupported detail, explain why repetition is insufficient, and propose a check with a stated limit.

**Next:** how does training change the numbers that produce predictions?

## Week 10 — How training changes a model

**Try:** reveal the dictionary, narrate text training, and adjust the one-number model y = w × x.

**Explain:** show examples, predict, measure loss, adjust weights, repeat. Text cross-entropy penalizes low probability for actual tokens. The toy graph uses average squared error; these losses are different. Introduce gradient and learning rate through the graph and overshoot exercise.

**Optional:** scaling laws describe measured relationships between resources and prediction loss, not guaranteed gains on every skill.

**Check:** explain one update and the distinction between the toy and text losses.

**Next:** inspect a calculation that uses the trained weights.

## Week 11 — Attention and internal circuits

**Try:** inspect prepared attention highlights and a programmed A B … A → B copying rule.

**Explain:** attention combines information from token positions using calculated weights. Highlighting passages is an analogy. The display is not a measurement from a neural model and is not a complete explanation of a generated answer.

Connect the copying behavior to published induction-head experiments. Changing or disabling components tests a causal explanation; a correct completion alone does not.

**Check:** distinguish the behavior, our programmed demonstration, and evidence about a real circuit.

**Next:** how does further training encourage assistant-style responses?

## Week 12 — From text predictor to chatbot

**Try:** trace one example pipeline: base training, instruction tuning, preference training. RLHF is one approach to preference training, not a required step for every product. Product instructions and tools also shape behavior.

**Capstone:** revisit the Week 7 explanation, seek a beginner's feedback, then write at most 500 words covering:

1. What the model predicts.
2. How training differs from chat context.
3. How scores become selected tokens.
4. A possible factual error and a way to check it.
5. One example or analogy, with its limit.

Revise unclear or unsupported claims. Record external review as pending when no reader is available; self-review is not evidence that external review occurred.

**Optional:** extra computation before answering, then a choice of further-study paths with prerequisites. These are enrichment, not a barrier to completing the course.

## Pilot questions

- Can a beginner complete each checkpoint without using an unexplained term?
- Do Weeks 4–6 feel like increasingly useful tests, rather than three versions of the same debate?
- Does Week 7's return to the guessing game feel like application rather than repetition?
- Can learners tell the scripted demos apart from measurements of real models?
- Is Week 10 manageable with arithmetic and a first reading of a graph?
- Does the Week 12 core fit once enrichment is optional?

The order is pedagogically coherent on review. Timing and novice comprehension still need learner trials.
