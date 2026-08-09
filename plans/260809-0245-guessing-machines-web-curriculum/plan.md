# Plan: Guessing Machines — Standalone Interactive Web Curriculum

**Status:** ✅ Complete (2026-08-09) | **Mode:** auto (goal hook, no user gates)
**Outcome:** All 6 phases done. 27 source files, all JS syntax-checked, headless smoke
test 100% pass (13 routes, widget interactions, persistence, 0 console errors) over file://.
**Source spec:** `outline.md` (12-week course, 4 arcs, jargon-quarantine design)

## Goal
Standalone web app (open `index.html`, no server/build/backend) delivering the full
12-week curriculum as a self-paced interactive experience: all session content
(puzzle → exercise → naming → checkpoint) plus one or more live interactive
widgets per week, progress tracking, and the Week-10 jargon-reveal set-piece.

## Key decisions
- Vanilla JS, classic `<script>` tags + `window.GM` namespace (ES modules break on `file://`).
- Weeks 7–9 model behaviors are **simulated** with canned token distributions
  (real softmax-with-temperature math internally) — resolves outline open issue #1 offline.
- Solo-adapted exercises (outline assumes pairs); partner variants noted in copy.
- localStorage: checkpoint completion, calibration results, capstone draft.
- Jargon dictionary locked until Week 10 reveal (or explicit override).
- Files kebab-case, <200 lines each.

## Structure
```
index.html
css/  base-theme.css, layout-navigation.css, components.css, widgets.css
js/   app.js (hash router+nav), progress-store.js
js/views/    home-view.js, week-view.js, dictionary-view.js
js/data/     arc1-weeks.js … arc4-weeks.js, widget-datasets-*.js
js/widgets/  cloze-game, shannon-game, question-splitter, ladder-rank,
             compression-relay, rule-induction, ascription-game,
             calibration-quiz, chat-memory-demo, temperature-lab,
             hallucination-lab, jargon-reveal, gradient-descent,
             attention-viz, induction-demo, capstone-editor
```

## Phases
1. **Scaffold** — index.html, CSS theme (warm paper/ink, dark-mode aware), router, progress store. ☑ when app shell navigates.
2. **Content** — 4 arc data files: learner-facing prose for all 12 weeks. ☑ when every week renders all four beats.
3. **Widgets Arc 1–2** — cloze, shannon, splitter, ladder, compression, rule-induction, ascription, calibration. 
4. **Widgets Arc 3–4** — chat-memory, temperature lab, hallucination lab, jargon reveal, gradient descent, attention viz, induction demo, capstone editor.
5. **Verify** — `node --check` all JS, serve + headless smoke test, fix issues.
6. **Finalize** — docs/codebase-summary, plan status update, report.

## Success criteria
- Opens from file:// with zero console errors; all 12 weeks reachable.
- Every outline exercise is either interactive or adapted prose; no week dropped.
- Checkpoints tracked; dictionary reveal gated; capstone editor with 500-word counter.

## Risks
- Scope (16 widgets): mitigate by KISS per widget; shared helpers in app.js.
- file:// quirks: no fetch/modules — all data inlined as JS.
