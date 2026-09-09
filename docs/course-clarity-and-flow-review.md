# Course clarity and flow review

Reviewed and revised September 5, 2026. Scope: novice wording from Week 2 onward in English and Vietnamese, associated explanations in widgets, and the sequence of the complete course.

## Verdict

Keep the 12-week order. It builds a useful progression: make predictions, learn how to test them, apply those tests to language models, then inspect mechanisms. The main problems were abstract prompts without examples, premature terminology, and claims stronger than the exercises could support.

Week 1 remains the entry point. Its missing-word exercise gives a concrete experience that Week 7 revisits with model scores. Weeks 4–6 earn their place by preparing learners to question fluent output before meeting the model examples.

The revised course uses examples before explanations and defines terms when they become useful. Week 10 now consolidates terminology rather than promising that every technical word appears there for the first time.

## Changes by week

| Week | Main obstacle | Revision |
| --- | --- | --- |
| 2 | Abstract descriptions of a receiver's possibilities; emotionally loaded messages | Parcel delivery example with explicit before/after knowledge; numerical 4/4 versus 1/7 question split; shorter journal and checkpoint |
| 3 | Compression treated as a complete explanation of later errors | Two neighborhood maps and a restaurant-access example; explicit limits of the analogy |
| 4 | Chemistry prerequisite and a question that supposedly only understanding could pass | Worked multiplication tests; new numbers versus new situations; no claim that one test proves understanding |
| 5 | Dense anecdotes and unexplained labels such as “ascription spectrum” | Shorter Hans account, an illustrative ELIZA exchange, and observation-versus-interpretation prompts |
| 6 | A ten-question score treated as a diagnosis; a philosophical detour | Worked confidence-range example; small-sample limits; concrete distinction between mistake, carelessness, and deception |
| 7 | Token used later without preparation; remembering equated with retraining | Define token, weights, and the generation loop; note-on-the-desk analogy; distinguish product memory from training |
| 8 | Selection described abstractly; exact random outcomes treated as pass/fail | Ticket-bag example, clear sampling instructions, new score card after each token, and interpretation of random variation |
| 9 | Scripted errors presented as live-model evidence; unsupported claims about intent and training data | Label prepared examples; separate truth, repetition, calibration, and intent; require an independent check |
| 10 | Loss equated with felt surprise; squared-error widget described as cross-entropy | Explain both loss measures, axes, and a worked weight update; make scaling enrichment optional |
| 11 | Prepared highlights and copying rules sounded like inspected neural mechanisms | Label the demos; highlighting analogy with a limit; separate behavior from causal evidence about circuits |
| 12 | Pipeline, frontier, reading list, and assessment crowded together | Core pipeline plus five-part capstone checklist; optional enrichment; explicit pending-feedback path for solo learners |

Widget feedback now follows the same distinctions. In particular, matching random samples do not establish which selection rule produced them, a short calibration quiz does not establish long-run reliability, and the induction demo does not claim to contain learned heads.

The dictionary no longer treats hallucination and miscalibration as synonyms, or every model as identical to lossy compression. The home page, dictionary introduction, outline, and Week 2 facilitator notes match the revised teaching sequence.

## Flow and workload

The transition from Week 2 to Week 3 is now “which clues help?” to “which clues should a model keep?” Week 4 tests whether success extends to new cases; Week 5 tests alternative explanations; Week 6 measures confidence across outcomes. Those are different questions, although a facilitator should keep their worked examples brief to avoid repetition.

Weeks 7–9 apply earlier ideas rather than restarting the course. Week 7 separates training from context, Week 8 separates scoring from selection, and Week 9 separates repeatability from truth. The Week 2 ranking returns in Week 8, the Week 6 results return in Week 9, and the Week 7 explanation becomes the Week 12 draft.

Weeks 10–12 add mechanisms only after learners can describe the behaviors. The first graph includes its axes, formula, examples, and a concrete action. Attention returns to Week 5's distinction between observing a result and testing its cause. Optional scaling, extra-computation, and further-study material no longer define what learners must finish.

No week was moved or added. English Weeks 2–12 decreased from 4,534 to 3,922 words, about 14%, counting titles, taglines, checkpoints, and lesson text with HTML removed. This excludes widget text and documentation. Weeks 9 and 10 are slightly longer because their missing distinctions needed explanation. Vietnamese was rewritten for natural phrasing and aligned meaning; English word counts are not a measure of Vietnamese reading effort.

## Evidence and limits

The technical qualifications were checked against the original [scaling-laws study](https://arxiv.org/abs/2001.08361), [induction-head study](https://transformer-circuits.pub/2022/in-context-learning-and-induction-heads/index.html), and [instruction-following study](https://arxiv.org/abs/2203.02155). These support the specific research examples, not a claim that every current model follows the same recipe or has the same mechanisms.

Validation completed:

- Existing bilingual localization smoke test: 12 weeks, four arcs, and 16 widgets passed.
- All 24 localized week pages and both home pages mounted using the existing test DOM harness.
- Revised hallucination, induction, attention, gradient, temperature, and calibration interaction paths ran in both languages.
- JavaScript syntax and whitespace checks passed.
- Beat kinds, widget bindings, and widget options match the pre-edit course.

These checks establish content integration, not visual browser rendering or learner comprehension. A novice pilot should measure where learners pause, what they can explain afterward, whether Weeks 4–6 feel repetitive, and whether Week 10's graph is manageable. Quiz trivia still uses fixed teaching reference values, including approximations; it should not be treated as a standardized calibration assessment.
