# Codebase Summary — Understanding the Guessing Machines

Standalone bilingual interactive web curriculum implementing `outline.md` (12-week AI/LLM course).
**No build step, no server, no dependencies** — open `index.html` directly (works over `file://`).

English is the default. The sidebar language switch selects English or Vietnamese,
persists the choice in a dedicated localStorage key, and keeps learner progress and
saved widget work shared across both editions. Vietnamese lessons are reader-first
reconstructions; language-dependent exercises use Vietnamese prompts and examples.

## Architecture

Vanilla JS, classic `<script>` tags loading into a single `window.GM` namespace
(ES modules deliberately avoided — they break on `file://`). Hash-based SPA routing.

```
index.html                          # loads CSS + all scripts in dependency order
css/
  base-theme-and-design-tokens.css  # palette (warm paper/ink), dark mode via prefers-color-scheme
  layout-sidebar-and-navigation.css # fixed sidebar + reading column; mobile drawer
  content-components-and-cards.css  # session beats, cards, checkpoint box, pager
  interactive-widget-styles.css     # shared widget UI (dist bars, chips, sliders, SVG plots)
js/
  dom-helpers-and-namespace.js      # GM namespace, el(), widgetShell(), softmaxT(), sample()
  progress-store-local-storage.js   # checkpoints, jargon-reveal flag, widget saves (fails soft)
  app-router-and-sidebar-navigation.js  # routes: #/ , #/week/N , #/dictionary
  views/                            # home, week (4-beat session renderer), dictionary (gated)
  data/                             # GM.arcs + GM.weeks content per arc; jargon entries
  i18n/                             # Vietnamese arc overlays loaded before views
  widgets/                          # self-contained interactives, GM.widgets[name] = mount(el, opts)
```

## Key design decisions
- **Data-driven weeks**: each week = `{num, arcId, beats[], checkpointStatement}`; beats
  declare `widget`/`widgetOpts` mounted by `week-session-view`.
- **Arc structure**: Weeks 7–8 explain language models and finish a checked task.
  Weeks 9–12 cover selection, training, attention, and chatbot training.
- **Offline examples**: Week 7 uses prepared candidate lists; Week 8 uses checkable
  source notes and order costs; Week 9 uses real softmax-with-temperature math
  (`GM.softmaxT`) over prepared scores. The older scripted hallucination widget
  remains registered but is no longer the Week 8 core activity.
- **Jargon quarantine enforced in software**: `#/dictionary` renders locked until the
  Week 10 reveal widget sets `jargonRevealed` in localStorage.
- **Progress**: per-week checkpoint checkboxes → sidebar progress bar; calibration
  results and the capstone draft persist via `GM.store.setSaved`. Course-order
  version 2 swaps the old Week 8/9 checkpoint positions once. Original notebook
  IDs stay with the temperature and report content, preserving saved responses.
- **Practical examples**: four bilingual data files add one `Apply it` section before
  every checkpoint. Week 8 introduces a complete checked task; Week 12 refines it.
- **Saved notes**: the shared notes widget stores responses for writing, planning,
  research, comparison, and document-use examples locally.

## Testing
Check JavaScript syntax with `node --check`. Headless Chrome QA over `file://`
covers all 14 routes in each language, arc boundaries, dictionary rendering,
temperature interaction, checkpoint migration, notebook persistence, mobile
overflow, and browser errors. Inspect desktop and mobile screenshots when
lesson markup changes.

Run `node tests/bilingual-localization-smoke.js` to verify both language datasets,
all 12 practical examples, localization load order, and every widget registration.
Run `node tests/progress-course-order-test.js` to check the old checkpoint
migration, note preservation, repeat loads, and storage-unavailable behavior.

## Conventions
- Kebab-case, long descriptive filenames; every file < 200 lines.
- Widgets append themselves into the passed container and must not throw on mount
  (view wraps mounts in try/catch).
