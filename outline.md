# Understanding the Guessing Machines
### A 12-week course on AI and LLMs — epistemology first, machinery second

**Status:** v0.1 draft for reviewer feedback
**Audience:** motivated adults, no math or CS background assumed. Arithmetic only until Week 10.
**Assumed cadence:** one ~2-hour session per week + a short exercise between sessions. Adjustable.

---

## Design principles

These four rules govern every week. Reviewers: if any session violates one, flag it.

1. **Phenomenon first.** No concept is introduced for its own sake. Every session opens with a puzzle — something the learner observes or does that they cannot yet explain. The concept is the resolution, never the starting point.
2. **Operationalize or cut.** Every concept must be *done* in an exercise, not just heard as a metaphor. If a concept cannot be demonstrated through something the learner performs or observes live, it does not belong in Weeks 1–9.
3. **No theory of cognition.** The course never claims what minds are or whether LLMs have them. It teaches the *epistemology of ascription*: how to decide, for any system, what evidence would justify saying it "knows" or "understands." This is the skill that transfers; theories of mind are contested territory we stay out of.
4. **Jargon quarantine.** Weeks 1–9 build a folk vocabulary in plain words. Technical terms appear only in Arc 4, as *labels attached to intuitions the learner already owns* — the "jargon reveal." A learner should never meet a term before they've met the thing.

**The jargon reveal, explicitly.** The course maintains a running two-column dictionary that stays hidden until Arc 4:

| Folk term (Weeks 1–9) | Technical term (Weeks 10–12) |
|---|---|
| the guessing game | next-token prediction |
| surprise | loss / cross-entropy |
| a map that discards | a model / learned representation / compression |
| the scoring layer | the forward pass / the distribution |
| the choosing knob | decoding: temperature, top-p |
| learning vs recalling | training vs inference |
| confident wrongness | miscalibration / hallucination |
| which earlier words matter | attention |

Revealing this table in Week 10 is a deliberate set-piece: learners discover they already understand the core of the field and were only missing the passwords.

---

## Weekly session template

Every session follows the same four-beat shape:

1. **Puzzle** (10 min) — a demonstration or question that resists explanation.
2. **Exercise** (50–60 min) — learners generate the phenomenon themselves, in pairs or small groups.
3. **Naming** (30 min) — the concept is articulated, in plain words, as the thing they just experienced. Discussion.
4. **Checkpoint** (10 min) — a concrete "can you now do X" test. Checkpoints are behavioral, never "do you feel you understood."

Assessment philosophy throughout: you understand something when you can (a) teach it to an outsider, and (b) *predict* what a system will do before it does it. Both are used; neither is graded formally.

---

# ARC 1 — Prediction before machines (Weeks 1–3)

*Claim of the arc: prediction is not exotic. You do it constantly, involuntarily, and with graded confidence. The machines did not invent the game; they industrialized yours.*

## Week 1 — You are a prediction machine

**Puzzle.** Read aloud: "She poured the coffee into the ___." Everyone in the room produced a word before being asked. Nobody chose to. Some words came with near-certainty ("cup"), some contexts leave it wide open. Why is this instant, involuntary, and *graded*?

**Exercises.**
- Cloze rounds in pairs: one person reads sentences stopping mid-way, the other guesses the next word. Score not just right/wrong but *how many plausible candidates existed*. Some blanks have one answer, some have five, some have hundreds.
- Shannon's guessing game (1951, presented as a story, no formula): guess a text letter-by-letter; count guesses needed per letter. English is *predictable*, measurably so, and a human's predictions are the measuring instrument. This is the course's founding anecdote — the guessing game predates computers.
- Confidence without numbers: for each guess, learners place it on a "how surprised would you be to be wrong?" scale (not at all / a little / very). Degrees of belief, introduced as felt experience.

**Naming.** Expectation. Prediction as structured guessing. Confidence as a spectrum, not a switch.

**Checkpoint.** Learner can articulate: "guessing has structure — some continuations are near-forced, others are open, and I can feel the difference before I check the answer."

## Week 2 — Surprise is information

**Puzzle.** Two messages arrive: "the sun rose this morning" and "your bank called about a large transfer." One is news, one is not. Both are short sentences. What's the difference made of?

**Exercises.**
- Receiver-first ranking: compare a routine weather report, one coin toss, 100 identical tosses, a medical result, and a context-free “yes.” Name what the receiver considered possible before ranking how informative each message is.
- Twenty questions, played then dissected: why does "is it bigger than a breadbox?" beat "is it the Eiffel Tower?" Before asking, compare the possible branches. Near-even splits are often useful because either answer narrows the field, but cost, reliability, and consequences can justify uneven questions.
- Prediction difficulty ladder: coin flip vs tomorrow's weather vs what a close friend texts back vs the next word of a national anthem. Rank them, then complete “my uncertainty comes mainly from ___” for each. (Plant: the machine will later sit somewhere on this ladder for every prompt.)
- Surprise journaling (between-session): record what happened, what was expected, what supported that expectation, and what changed afterward. Surprise creates an opportunity to revise an expectation; it does not guarantee that revision is warranted.
- Misconception clinic: repair claims equating information with message length, rarity with usefulness, felt shock with a technical measure, or even splits with a universal decision rule.

**Naming.** Information as a change in a receiver's uncertainty. The same message can carry different information under different prior expectations. Felt surprise is not identical to a formal measure, which requires stated possibilities and probabilities. We keep the plain-language term until Week 10.

**Checkpoint.** Learner can contrast a long low-information message with a short high-information message, diagnose a weak yes-or-no question, and explain all three using the receiver's prior expectations rather than word count or emotional drama.

## Week 3 — Maps, models, compression

**Puzzle.** Show a metro map and a satellite photo of the same city. The metro map is wildly wrong — distances distorted, geography ignored — yet for catching a train it beats the photograph. How can the *more wrong* picture be *more useful*?

**Exercises.**
- Compression relay: summarize a one-page story in exactly 10 words; pass the summary to someone who hasn't read it; they reconstruct the story; compare to the original. What survived, what died, and *was what survived the right thing to keep?* Lossy compression, felt directly.
- Purpose-dependent maps: same neighborhood, draw three maps — for a food tour, for a plumber, for a burglar. Same territory, different keeps and discards.
- Stereotypes as compression: discuss (carefully) how generalizations are maps that trade accuracy for speed, and how they misfire exactly where the discarded detail mattered. (Plant: this is the seed of Week 9's hallucination discussion — errors of a compressor are systematic, not random.)

**Naming.** A model is a compression of experience, tuned for a purpose. All models discard; usefulness lives in *what* they discard. The map is not the territory.

**Checkpoint.** Learner can give an original example of one territory needing two different maps, and say what each map sacrificed.

---

# ARC 2 — What counting as knowing means (Weeks 4–6)

*Claim of the arc: "does it really understand?" is not answerable by staring harder at behavior. It requires knowing what test you're running and what the test can and cannot show. This arc is the course's inoculation — it must land before any machine appears.*

## Week 4 — Memorizing, pattern-matching, understanding

**Puzzle.** Two students both answer "56" to 7×8. One has memorized the times table; one can multiply. Their answers are identical. What question exposes the difference?

**Exercises.**
- Rule induction game: person A invents a simple rule (e.g., "sequences where each number is bigger than the last"); person B sees only examples labeled yes/no, then must handle *novel* cases — including adversarial edge cases A designs to catch mere memorizers. (This is a disguised version of Wason's 2-4-6 task; no need to say so.)
- Design-the-probe: given a claimed skill ("this person knows chemistry"), design three test questions of increasing power: one a memorizer passes, one a pattern-matcher passes, one only understanding passes. Discuss whether question three is even always possible.

**Naming.** Generalization to novel cases as the test that separates memorization from grasp. Interpolation vs extrapolation, in plain words: filling in between what you've seen vs going beyond it.

**Checkpoint.** Learner can design a simple test distinguishing a memorizer from someone who grasps a rule — and can say what the test still *cannot* rule out.

## Week 5 — The ascription problem

**Puzzle.** Full telling of Clever Hans: the horse that did arithmetic in front of crowds, the owner who wasn't cheating, the psychologist (von Pfungst) whose controls — blinders, questioners who didn't know the answer — dissolved the arithmetic into cue-reading. The horse was genuinely doing something impressive. It just wasn't math.

**Exercises.**
- The ELIZA story and effect: a 1960s program with a few reflection tricks; users confided in it and some insisted it understood them — including people who knew how it worked. Discuss: the pull to ascribe minds is in *us*, and knowing the trick doesn't fully disarm it.
- The ascription spectrum: thermostat → plant → dog → infant → adult → chatbot. For each: what do we comfortably say it "knows"? What behavioral evidence drives that? Where does the vocabulary start to wobble?
- The ascription game (core exercise of the course): teams receive transcripts of behavior — some human, some machine, some animal-experiment writeups, sources hidden. For each, argue *for* and *against* "it understands," then specify what additional test would move the needle. The point is not the verdict; it's discovering that verdicts require specified tests.

**Naming.** Behavior underdetermines mechanism. Fluency is evidence, but weak evidence, and our ascription reflex is trigger-happy. "Understands" is a claim that needs a test attached.

**Checkpoint.** Learner can state why fluent output alone never settles "does it understand," and can name what a stronger test would look like for a case of their choosing.

## Week 6 — Calibration: knowing what you don't know

**Puzzle.** Run the classic calibration quiz before any explanation: ten trivia estimates ("length of the Nile?"), each with a range the learner is *90% sure* contains the truth. Score it live. A well-calibrated person misses one. Nearly everyone misses four or more. The room discovers its own overconfidence empirically.

**Exercises.**
- Recalibration round: same task, new questions, now trying to widen ranges honestly. Feel how uncomfortable honest uncertainty is — ranges that feel embarrassingly wide are usually right.
- "I don't know" drills: pairs ask each other questions ranging from knowable to unknowable; practice the graded honest answers — "I know," "I'd guess X, weakly," "I have no basis to answer." Fluent confident answering is the *easy* mode; calibrated answering is the skill.
- Bullshit vs lying (Frankfurt's distinction, plain-language): the liar tracks the truth to avoid it; the bullshitter speaks without regard to whether it's true. Which failure is more dangerous from an advisor? (Plant: this exact distinction returns in Week 9 — the machine is never lying.)

**Naming.** Calibration. Confident wrongness as *the* failure mode to watch for — in experts, in yourself, and (soon) in machines. Overconfidence as the default state that takes work to correct.

**Checkpoint.** Learner has a measured record of their own calibration, and can define confident wrongness and say why it's worse than admitted ignorance.

---

# ARC 3 — The machine that took the guessing game seriously (Weeks 7–9)

*Claim of the arc: the learner already owns every concept needed. These three weeks are re-instantiation, not new material. If Arc 3 feels like review, the course is working.*

## Week 7 — What an LLM literally is

**Puzzle.** Return to Week 1's cloze sentences — now typed into a live LLM, asked for its top candidate next words. Its guesses and the room's guesses largely agree, including on *which blanks were open vs forced*. What is this thing such that it plays our game — and what happened to it that made it able to?

**Exercises.**
- Human vs machine cloze tournament: same 20 sentences, room vs model. Compare not just answers but the *shape* of uncertainty — where humans disagreed with each other, the model also spreads its bets.
- Learning vs recalling, demonstrated: mid-conversation, tell the model a fact, watch it use the fact; open a fresh conversation, fact gone. Nothing was learned; the weights didn't move. Then discuss what *did* change the weights: a training process that ended before you arrived.
- One-minute explanations: each learner explains "what an LLM is" to a partner in 60 seconds using only course vocabulary — guessing game, maps, surprise. Partners flag any smuggled jargon or smuggled minds ("it thinks…", "it wants…").

**Naming.** An LLM is the guessing game from Week 1, industrialized: a system adjusted over vast text until its surprise at real text got low, then frozen. Training vs using = learning vs recalling. When you chat, nothing is learning.

**Checkpoint.** Learner can explain to an outsider, in one minute without jargon, what an LLM is and what the difference between training and using is.

## Week 8 — The scoring layer and the choosing knob

**Puzzle.** Same prompt, submitted five times at temperature 0: five identical answers. Same prompt at high temperature: five different answers. The model — every number inside it — is unchanged. What are we actually turning?

**Exercises.**
- The knob lab: learners run a prompt matrix (factual question / creative request / ambiguous question) across low and high temperature. Chart what changes and what doesn't. Factual answers barely move; open-ended ones diverge. Connect to Week 2's difficulty ladder: the knob matters where the distribution is open, not where it's forced.
- Two-layer role-play: one learner is the *scorer* (holds a card listing candidate next words with weights), another is the *chooser* (picks by different rules — always-top, weighted dice, dice-among-top-3). The room watches identical scores produce different texts. The layers are physically separated by being different people.
- Reproducibility test: learners predict, before running, which prompts will be reproducible at temp 0 and which will still vary slightly — then test. (Honest note in materials: exact determinism can wobble for boring engineering reasons; the *contrast* is what's real.)

**Naming.** Two layers: the model *scores* every possible next word; a separate rule *chooses*. Temperature and its cousins are choosing rules. "The AI is random" confuses the layers — the scoring is fixed; the dice are a setting *we* control.

**Checkpoint.** Learner can predict the effect of changing temperature on a given prompt type before running it, and can explain to an outsider why the model itself didn't change.

## Week 9 — Confident wrongness, mechanized

**Puzzle.** At temperature 0 — the reproducible setting — ask the model for the biography of a plausible-sounding but nonexistent person, or an obscure citation. It answers fluently, in detail, and *identically on every rerun*. This is not randomness; randomness is off. What is it?

**Exercises.**
- Hallucination elicitation lab: learners hunt for reproducible confident errors — invented references, plausible fake details in territory the training data covered thinly. Log them: reproducible? plausible-sounding? in what kind of territory (obscure, recent, fine-grained)?
- The compression connection: return to Week 3. A compressor's errors happen exactly where discarded detail mattered, and they look like *plausible reconstructions*, not noise. The stereotype misfire and the fake citation are the same failure shape.
- Frankfurt applied: is the model lying? (No — lying requires tracking the truth to avoid it.) Is it bullshitting? (Closer: text produced without regard to truth, optimized to be *likely*.) Precision drill: replace "the AI lied to me" with an accurate sentence.
- Calibration check on the machine: ask the model how confident it is in its fake answer. Compare its stated confidence to its actual reliability — and to the room's own Week 6 quiz results. Neither humans nor models get calibration for free.
- Ascription discipline applied (closing exercise of the arc): the Week 5 game, final round — target: the model itself. What would count as evidence that it "knows" a fact vs produces likely text about it? Design the von Pfungst controls.

**Naming.** Hallucination as confident interpolation: the system fills thin territory with plausible reconstructions, because producing likely text is *the entire mechanism* — the same mechanism that produces correct answers. Structural, reproducible, not a bug awaiting a patch, though it can be reduced and checked.

**Checkpoint.** Learner can produce a reproducible hallucination on demand, explain in course vocabulary why it happens, and correct someone who calls it "lying" or "glitching."

---

# ARC 4 — Under the hood, and the road onward (Weeks 10–12)

*Claim of the arc: the intuitions are built; now attach the real machinery and the real words. First gentle math appears here. Arc 4 is a foundation-plus-exit-ramp, not a compressed technical degree — its success criterion is that a learner can enter the technical literature without drowning.*

## Week 10 — How training works, and the jargon reveal

**Puzzle.** The Week 7 claim was "adjusted until its surprise got low." Adjusted *how*? Billions of numbers, no programmer setting any of them by hand.

**Session.**
- **The jargon reveal** (opening set-piece): unveil the two-column dictionary. Everything the course called by folk names has an official name; learners have been doing the field's concepts for nine weeks. Surprise → *loss*, *cross-entropy*. The guessing game → *next-token prediction*. Maps that discard → *learned representations*.
- Training loop, narrated: show text, model guesses, measure surprise, nudge every number a hair in the direction that would have made surprise smaller, repeat trillions of times. Gradient descent as "downhill in the dark, one small step at a time" — with an actual 2D loss-landscape picture, the first graph of the course.
- Scale: more text, more numbers, more compute → reliably lower surprise, and the improvement was *predictable* enough to plot before building (scaling laws, shown as a plotted line, not an equation). This predictability, not any single idea, is why the field bet everything on it.
- Exercise: hand-run three steps of guess-measure-nudge on a toy one-parameter "model" with arithmetic only.

**Checkpoint.** Learner can narrate the full training loop in plain words *and* in official vocabulary, and read the two-column dictionary as their own.

## Week 11 — Inside the box: attention and circuits

**Puzzle.** In "The keys are on the table next to the lamp; hand me ___," how does anything guessing one-word-at-a-time know "them" refers to keys, nine words back? Something inside must decide *which earlier words matter now*.

**Session.**
- Attention, plainly: at each step, the model computes how relevant every earlier word is to the current guess, and blends accordingly. A learned, per-step relevance lookup — not "focus" in any mental sense, a computation with inspectable numbers. Show a real attention visualization on a real sentence.
- One real circuit, end to end — induction heads: models learn a copyable pattern "…A B … A → guess B." Learners first *replicate the behavior* (feed a model a made-up name pair twice, watch it complete the pattern), then see the finding: researchers located specific internal components doing this, watched them form during training, and the ability appears when they do.
- The point, stated carefully: the box is opaque by default but *not sealed* — mechanisms can be found, traced, and tested, and this work (interpretability) is young. Neither "we understand everything inside" nor "it's an unknowable black box" is true.
- Exercise: the paired-name induction test, run by every learner on a live model.

**Checkpoint.** Learner can describe attention in one sentence without mentalist vocabulary, and recount one concrete, real mechanism found inside a real model.

## Week 12 — From predictor to chatbot; the frontier; the exit

**Puzzle.** The Week 7–9 object predicts likely text. Likely text completion for "How do I ask my boss for a raise?" might be *another forum user's reply*, or a list of similar questions. Why does the chatbot instead answer helpfully, in a consistent voice?

**Session.**
- The alignment pipeline, one picture: base predictor → shown examples of the assistant-style responses (instruction tuning) → adjusted further using human preferences between candidate answers (RLHF, named but not detailed). The "personality" is a trained layer on top of the predictor, not a resident. Week 5 discipline applies to the persona too.
- The current frontier, honestly labeled as moving ground: reasoning models that generate intermediate work before answering (test-time computation — connects to Week 4: some problems need scratch paper, and one-shot next-word guessing demonstrably hits walls that step-by-step traces get past). Flag what is *contested* in the field — how much of "emergence" is measurement artifact, where the limits of the paradigm lie — as live debates, not settled facts on either side.
- **Capstone (both parts):**
  1. Each learner teaches one course concept to a real outsider before the final session and reports what broke.
  2. Each learner writes "What an LLM is and isn't" in ≤500 words for a lay reader — the course's final artifact and its real exam.
- **The exit ramp** — the annotated path for those continuing into depth:
  - *Hands-on:* Karpathy's "Neural Networks: Zero to Hero" series; build the toy versions.
  - *The spine, in order:* Vaswani et al. 2017 (the architecture) → Kaplan et al. 2020 (scaling laws) → Holtzman et al. 2020 (decoding — Week 8's knob, formalized) → Ouyang et al. 2022 (InstructGPT — Week 12's pipeline) → Wei et al. 2022 (chain-of-thought) → Schaeffer et al. 2023 (the emergence-mirage debate) → Olsson et al. 2022 (induction heads — Week 11's circuit, in full).
  - *Then:* mechanistic interpretability (superposition, sparse autoencoders) and the reasoning-model literature, both moving fast enough that the course points at directions, not canon.

**Checkpoint.** The 500-word artifact passes two tests: an outsider learns from it, and a technical reader finds nothing to correct.

---

## Reviewer instrumentation

Questions to put to feedback readers, per arc:

- **Arc 1:** Did any session feel like philosophy class rather than a game? (Failure of principle 1 or 2.) Where did you first get bored?
- **Arc 2:** After Week 5, did you catch *yourself* ascribing? Does the ascription game work on paper or does it need live behavior?
- **Arc 3:** Did it feel like review (intended) or repetition (failure)? Was any machine behavior surprising in a way Arcs 1–2 hadn't prepared?
- **Arc 4:** Was the jargon reveal satisfying or gimmicky? Is Week 10's math gentle enough? Does Week 12 overstuff?
- **Overall:** At which week would you have quit? What's the one concept you'd now explain differently to a friend than before the course?

## Known open issues (v0.1)

1. **Tooling dependency.** Weeks 7–9 assume access to a model interface exposing temperature and ideally top-k candidates. A playground-style tool, not a consumer chat app, is needed for the knob lab; consumer apps hide the knobs. Decide the reference tool before piloting.
2. **Week 12 density.** Alignment + frontier + capstone + exit ramp in one session is the schedule's tightest squeeze. If piloting shows overflow, the capstone presentation can move to an optional Week 13.
3. **Live-model drift.** Exercises specify behaviors (reproducibility at temp 0, induction completion, hallucination elicitation) that are robust today but should be re-verified against whatever model the course standardizes on, each cohort.
4. **The 500-word capstone rubric** doesn't exist yet; write it after the first pilot produces real samples.
