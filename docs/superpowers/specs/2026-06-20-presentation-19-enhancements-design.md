# Modi Leadership Deck — 19 Enhancements Design

**Date:** 2026-06-20
**Scope:** Add 19 enhancements to the existing self-contained Thai-language kinetic presentation (`index.html` built from `src/`). Idea #20 (full TH/EN toggle) is explicitly **out of scope** — deck stays Thai-only.

## Hard constraints (must not break)
- Stays 100% offline / `file://`-safe: no CDN, no network fetch, no audio/image asset downloads.
- `node build.js` still produces a single double-click-able `index.html` (fonts/portrait base64-inlined).
- Every animation respects `prefers-reduced-motion` AND the existing `body.motion-off` toggle.
- Existing features keep working: scroll/slide modes, speaker notes, presenter timer, print/PDF handout, deep-links, light/dark theme, quiz, keyboard shortcuts, touch swipe.
- All new copy lives in `src/content.js`; logic in `src/app.js`; styles in `src/styles.css`; shells in `src/template.html`.

## The 19 enhancements

### Group A — Visual & motion
1. **Hero Ken Burns + parallax** — slow CSS zoom/pan on portrait; pointer/scroll parallax on tricolor gradient layers. Disabled under reduced-motion/motion-off.
2. **Chakra loader** — 1s spin-up overlay on first load, fades into hero. Skipped under reduced-motion.
3. **Reading-progress bar** — existing `#progress` upgraded to saffron→white→green gradient; thin variant also shown in slide mode.
4. **Category color washes** — brief full-viewport tint when crossing into a new category zone, both scroll and slide modes.
5. **Animated India map** — hand-drawn simplified SVG India on the `numbers` slide: Gujarat lights first, then the nation.

### Group B — Data & content
6. **UPI growth chart** — animated inline-SVG line chart in the UPI card; clearly labelled *illustrative* with source.
7. **"20× Thailand" scale visual** — proportional human-icon blocks on the `numbers` slide (1 figure ≈ 70M).
8. **Source footnotes** — `src`/`cite` become tap/hover superscript tooltips (shared tooltip component).
9. **Counter-arguments on wins** — one-line "แต่ผู้วิจารณ์ชี้ว่า…" added to each policy card.
10. **Glossary tooltips** — tap key terms (CAA, demonetization, Jan Dhan, UPI, GDP…) for one-sentence Thai explainers, via TreeWalker over selected body text nodes (first occurrence only).

### Group C — Interactivity
11. **Live poll** — new `poll` slide before balance; tap-to-vote, animated bars, tally in localStorage.
12. **Drag-the-balance** — drag pros/cons chips onto the scale; it tips; keyboard-accessible fallback; resets.
13. **Quiz score + result card** — track answers, show encouraging score, generate downloadable result image via canvas.
14. **Reflection input** — textarea on the lessons slide ("habit I'll adopt"), saved to localStorage, echoed on closing slide.
15. **Presenter sync** — **offline-honest:** multi-window/tab sync via `BroadcastChannel` (slide position + mode). No cross-device QR (would need a server). Documented caveat.

### Group D — Narrative & polish
16. **Agenda slide** — new `agenda` slide after hero ("3 เรื่องที่จะดูวันนี้").
17. **Leadership-lens motif** — per-slide `lens` tag rendered as a small badge by the kicker.
18. **Closing CTA slide** — new `closing` slide after summary/quiz: one reflective question + reflection echo.
19. **Ambient sound toggle** — WebAudio-synthesized whoosh on slide change + gentle hero sting; off by default; toolbar button + `Y` shortcut.

## Implementation map
- **content.js:** new slides `agenda`, `poll`, `closing`; per-slide `lens`; `counter` on policy cards; `chart` on UPI card; `DATA.glossary`; `DATA.poll`; reflection prompt strings.
- **template.html:** loader overlay, sound button, color-wash layer, shared tooltip node, sync badge.
- **app.js:** render branches for new slide types; lens badge; counter; chart renderer; shared tooltip system (glossary + sources); hero parallax; loader; color washes; India map + human-block renderers; drag-scale; quiz scoring + canvas result card; BroadcastChannel sync; WebAudio sound module.
- **styles.css:** all new component styles + dark-theme variants + reduced-motion/motion-off guards + print guards (hide interactive-only chrome).

## Risks / decisions locked
- #6 uses **illustrative** UPI data (labelled), since exact yearly figures aren't in source data.
- #15 ships **multi-window sync**, not cross-device — preserves the offline guarantee.
- Glossary auto-wrap restricted to specific body selectors and first-occurrence to avoid mangling HTML/Thai text.
