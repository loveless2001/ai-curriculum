# Weeks 3–4: from remembered answers to usable models

Revision: 17 September 2026. Base: `9e9dd55fd33f7512b846e043f0124d811f123f65`.

## The revised sequence

Week 3: remember one journey, represent direct connections, and assemble a journey that was not supplied as a worked example. A model keeps relationships relevant to a task, not merely fewer words.

Week 4: use that same map after a closure, distinguish a changed drawing from changed connections, recognize missing travel-time information, and reuse the idea in a delivery network.

Week 5: ask what alternative explanations could account for the observed behavior. Only the opening bridge changes; its existing exercises remain intact.

The new working criterion for understanding is the ability to use relationships to explain, predict, or act in new cases, while recognizing when those relationships are insufficient. It is not a universal definition or an intelligence test. Remembering and understanding are not mutually exclusive, and a connection list can be as useful as a drawing.

## Learner-facing tasks

### Week 3 — Remember a route. Build a map. / Nhớ đường đi. Dựng bản đồ.

The familiar worked journey is A–B–C–D. Five visible cards give all direct, bidirectional connections: AB, BC, CD, BE, DE. The learner builds a map, receives specific feedback on missing or extra connections, then plans A to E. All valid simple paths are accepted, including A–B–C–D–E, not just the shortest path.

The accepted map is retained under a namespaced local-storage key. Week 4 uses it only if it remains exactly consistent with the five stated connections. Otherwise Week 4 explicitly presents a reference map so a learner can start there without falsely claiming earlier work was completed.

### Week 4 — The road closes. Now what? / Đường bị đóng. Giờ đi thế nào?

1. C–D closes. Use the map to find A–B–E–D. The task changes one availability fact, not the type of representation.
2. Compare an original and a rearranged map. One comparison preserves all connections; another removes BE. Comparison-tab titles do not reveal which answer is correct. The question is about direct connections, not merely eventual reachability.
3. All roads explicitly reopen. Ask for the fastest journey. A learner must first commit to needing travel times before the times are shown. The toy assumptions are stated: additive times, equal in either direction, no waiting. AB=4, BC=2, CD=3, BE=1, DE=7 minutes; the two simple A–D journeys take 9 and 12 minutes.
4. A fragile parcel must go from K to G. N cannot handle it; S can. Use K–S–G. The reusable relationship is a feasible path subject to conditions, but the restriction now applies to a handling location rather than a road.
5. Explain what was reused, updated, and added. Written reflections are not automatically graded.

The exact-ten-word compression activity and numeric rule-induction puzzle are no longer mounted in Weeks 3–4. Their legacy JavaScript files remain in the repository, but the flawed rule-induction feedback is not used by the revised lessons. This patch does not silently repurpose that uncorrected widget as a Week 5 activity.

## Integration

The added widgets register in `GM.widgets` and accept the existing `(container, widgetOpts)` interface. CSS is scoped with the `br-` prefix and uses the existing course color tokens. The lesson-replacement module loads **after** the original Vietnamese overlays and before the views/router. It replaces complete Week 3 and Week 4 beat arrays in either language, avoiding positional localization mismatches.

The original English and Vietnamese data files remain as the base. The revised content is maintained together in `js/data/weeks-03-04-models-and-transfer-revision.js`; edit this file for these two weeks. A future cleanup could fold the revision into the original data files and remove the overlay. The root outline is updated by the patch so it does not describe the superseded activities.

Storage is local only, prefixed `gm.w34.v2.`. No server, API, external asset, font download, or package dependency is required at runtime. A session-memory fallback keeps the interactions usable when local storage is denied. Handwritten notes are never translated or overwritten when the interface language changes. No data is transmitted.

## Validation performed

- JavaScript syntax checks for every new module.
- Node tests for both language editions, preservation of untouched weeks, widget bindings, idempotent application, canonical connections, blocked roads/nodes, all simple A–D paths and their travel-time totals.
- Chromium interaction tests for all revised activities in Vietnamese, English controls and feedback, switching languages, retaining notes, rehydrating saved state, invalid/closed connections, alternate valid paths, suboptimal/optimal routes, and keyboard activation of map nodes.
- Viewport checks at 320, 390, 768, and 1440 pixels; light and dark screenshots inspected. No horizontal document overflow or JavaScript errors in those checks.
- Zero network requests from the standalone HTML during testing.
- Native storage-denied fallback tested. Persistence and rehydration tested with a Storage-compatible test backend.

The browser environment blocks direct file-URL navigation, so the exact standalone HTML was injected into Chromium rather than tested through `file://`. Actual file-URL persistence is browser-dependent; the runtime handles storage denial. No claim is made that the unchanged 12-week site was fully browser-regression-tested, or that learning outcomes have been validated with novice participants. The patch is checked against the fetched index and outline context from the pinned base.

## Short facilitator prompts

English: “What did you reuse? What changed? What new information became necessary?” Ask for a concrete road or shipment example, not a definition repeated back. Do not infer that a drawing itself produces understanding.

Tiếng Việt: “Bạn dùng lại điều gì? Điều gì đã đổi? Bây giờ cần thêm thông tin nào?” Yêu cầu chỉ ra ngay trong bài đường đi hoặc chuyển hàng, không chỉ nhắc lại định nghĩa. Đừng đồng nhất việc có hình vẽ với việc đã hiểu.
