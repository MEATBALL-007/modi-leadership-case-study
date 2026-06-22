# Modi Deck — 20 Enhancements: Information + Motion Graphics

**Date:** 2026-06-22
**Scope:** 10 information-depth additions + 10 motion-graphic upgrades to the self-contained Thai deck.

## Locked decisions
- **Data:** widely-cited public figures (IMF/World Bank/govt/ISRO), each tagged with a confidence pill (ยืนยันได้ / โดยประมาณ / ภาพประกอบ); neutral tone; existing "verify before presenting" disclaimer stands. New citations auto-flow into the sources appendix.
- **Structure:** add new slides (deck 15 → ~24); presenters auto-assigned by topic/section.
- **"Voices":** representative perspectives (supporter / critic / economist), clearly framed — NOT fabricated named quotes.

## Hard constraints (unchanged)
Offline/`file://` safe · `node build.js` → single index.html · respects `prefers-reduced-motion` + `body.motion-off` · existing features keep working (scroll/slide, presenter view, TTS, notes, timer, print/PDF, theme, deep-links, poll, drag-scale, bylines).

## INFORMATION (content.js + render branches)
1. **Foreign-policy slide** — G20 presidency 2023, Quad, Voice of Global South, neutral Russia-Ukraine stance. (verified/approx)
2. **Before/after dashboard** — 2014 vs latest: GDP rank, account ownership %, household electrification %, internet users, multidimensional poverty. Each: two values + delta + source pill.
3. **Comparison slide** — India GDP growth vs China/US/world (illustrative bars/lines).
4. **Fact-vs-interpretation tags** — `kind: 'fact'|'claim'` marker on stats/statements rendered as a tiny tag.
5. **Per-controversy context** — add `context` (what happened / status) to each controversies timeline item; rendered as expandable detail.
6. **Voices slide** — 3 framed perspectives (supporter / critic / economist).
7. **Leadership-model overlay** — map actions to transformational vs populist-authoritarian traits (a compact 2-column analysis slide).
8. **Filterable timeline** — add `theme` to rise/controversies events + filter chips (เศรษฐกิจ/สังคม/ต่างประเทศ/ข้อวิจารณ์).
9. **International reception slide** — recognition (state honors) alongside org criticisms (press-freedom/civil-liberties indices), side by side.
10. **"Data as of" transparency stamp** — `DATA.dataAsOf` shown on sources slide + a small global stamp.

## MOTION (app.js + styles.css)
11. **Scrollytelling pinned graphic** — a dedicated section pins the India map and advances steps (Gujarat → nation → data points) on scroll; slide-mode fallback auto-plays steps.
12. **Chandrayaan landing micro-animation** — rocket arc + lander touchdown + dust burst on the space card reveal.
13. **Odometer number rolls** — rolling-digit display for big stats (progressive enhancement over count-up; reduced-motion → static).
14. **Journey route on map** — dashed path Gujarat→Delhi animates (stroke-dashoffset) on reveal.
15. **Cinematic chapter dividers** — full-bleed animated section intros (giant number + color sweep + chakra) before each thematic block.
16. **SVG path-morph accents** — chakra↔map↔chart motif morph on related transitions (scoped, decorative; reduced-motion → cross-fade).
17. **Animated line-draw icons** — section/policy icons self-draw (stroke-dashoffset) on reveal.
18. **Kinetic typography** — quote/key phrases scale/weight word-by-word.
19. **Living hero background** — animated tricolor gradient mesh + floating chakra particles behind portrait.
20. **Scroll-reactive chakra** — corner brand chakra rotates with scroll + pulses on section change.

## Implementation notes
- New slide types: `dashboard`, `comparison`, `voices`, `model`, `reception`, `scrolly`, `divider` (+ reuse `timeline` with themes, `cards`/`split` where natural).
- Presenter assignment for new slides folds into the thematic split (foreign-policy/dashboard/comparison → NON; voices/reception → KEN; dividers → that block's presenter).
- All animations gated behind motion guards; all new citations classified by the existing `classifyConf`.
- Verify headless: deck builds N sections, no JS errors, motion-off + print still clean.
