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
  widgets/                          # 16 self-contained interactives, GM.widgets[name] = mount(el, opts)
```

## Key design decisions
- **Data-driven weeks**: each week = `{num, arcId, beats[], checkpointStatement}`; beats
  declare `widget`/`widgetOpts` mounted by `week-session-view`.
- **Simulated model** (Weeks 7–9): canned candidate lists + real softmax-with-temperature
  math (`GM.softmaxT`) → scorer/chooser separation, temp-0 reproducibility, and
  hallucination demos all work offline. Honesty notes in copy mark it as simulated.
- **Jargon quarantine enforced in software**: `#/dictionary` renders locked until the
  Week 10 reveal widget sets `jargonRevealed` in localStorage.
- **Progress**: per-week checkpoint checkboxes → sidebar progress bar; calibration
  results and the capstone draft persist via `GM.store.setSaved`.

## Testing
`node --check` passes on all JS. Headless-Chrome smoke test (scratchpad,
`headless-smoke-test-all-routes.js`) verifies: all 13 routes render, dictionary
gate, temp-0 determinism, calibration scoring, checkpoint persistence, 0 console
errors. Re-run against `file://` after changes.

Run `node tests/bilingual-localization-smoke.js` to verify both language datasets,
all 12 Vietnamese weeks, localization load order, and all 16 widget registrations.

## Conventions
- Kebab-case, long descriptive filenames; every file < 200 lines.
- Widgets append themselves into the passed container and must not throw on mount
  (view wraps mounts in try/catch).
