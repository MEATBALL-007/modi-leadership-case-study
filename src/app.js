/* ============================================================================
   app.js — เรนเดอร์สไลด์จาก DATA + ตรรกะอินเทอแรกทีฟทั้งหมด (vanilla JS)
   ============================================================================ */
(function () {
  'use strict';

  /* ---------- ไอคอน SVG (วาดเอง ไม่พึ่งเน็ต) ---------- */
  const P = (d, extra) => `<path d="${d}" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"${extra ? ' ' + extra : ''}/>`;
  const SVG = (inner, vb) => `<svg viewBox="${vb || '0 0 24 24'}" aria-hidden="true">${inner}</svg>`;
  const ICONS = {
    cake:  SVG(P('M12 3v3 M4 21h16 M5 21v-7a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v7 M4 16c1.5 1.2 2.5 1.2 4 0s2.5-1.2 4 0 2.5 1.2 4 0 2.5-1.2 4 0') + '<circle cx="12" cy="4" r="1" fill="currentColor" stroke="none"/>'),
    home:  P('M3 11l9-7 9 7 M5 10v10h14V10 M10 20v-6h4v6'),
    cap:   P('M12 4 2 9l10 5 10-5-10-5z M6 11v5c0 1.5 2.7 3 6 3s6-1.5 6-3v-5 M22 9v5'),
    ring:  '<circle cx="12" cy="14" r="6" fill="none" stroke="currentColor" stroke-width="1.8"/>' + P('M9 7l3-3 3 3 M12 4v4'),
    pay:   '<rect x="3" y="5" width="18" height="14" rx="2.5" fill="none" stroke="currentColor" stroke-width="1.8"/>' + P('M3 9h18 M7 15h3'),
    factory: P('M3 21V10l6 4V10l6 4V7l6 3v11H3z M7 21v-4 M13 21v-4 M19 21v-4'),
    rocket: P('M12 3c3 2 4.5 5 4.5 9l-1.8 2.2H9.3L7.5 12C7.5 8 9 5 12 3z M9.3 14.2 7 18l2.5-.8 M14.7 14.2 17 18l-2.5-.8 M9 21c1-1.5 2-1.5 3 0') + '<circle cx="12" cy="9.5" r="1.6" fill="none" stroke="currentColor" stroke-width="1.8"/>',
    broadcast: '<circle cx="12" cy="12" r="2.4" fill="currentColor" stroke="none"/>' + P('M8.5 8.5a5 5 0 0 0 0 7 M15.5 8.5a5 5 0 0 1 0 7 M5.8 5.8a9 9 0 0 0 0 12.4 M18.2 5.8a9 9 0 0 1 0 12.4'),
    flask: P('M9 3h6 M10 3v6L5.5 18a2 2 0 0 0 1.8 3h9.4a2 2 0 0 0 1.8-3L14 9V3 M7.7 14h8.6'),
    target: '<circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="12" cy="12" r="1.2" fill="currentColor" stroke="none"/>',
    rise:  P('M3 17l5-5 4 4 8-8 M16 8h5v5'),
    /* UI */
    arrowL: P('M15 5l-7 7 7 7'),
    arrowR: P('M9 5l7 7-7 7'),
    mode:  '<rect x="3" y="4" width="18" height="16" rx="2" fill="none" stroke="currentColor" stroke-width="1.8"/>' + P('M3 9h18 M9 9v11'),
    motion: P('M5 12h3l2-6 4 12 2-6h3'),
    note:  P('M5 4h11l3 3v13H5z M14 4v4h4 M8 12h7 M8 16h5'),
    quiz:  '<circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="1.8"/>' + P('M9.2 9.2a2.8 2.8 0 1 1 3.6 2.7c-.7.3-.8.8-.8 1.6 M12 16.5v.01', 'stroke-width="2"'),
    close: P('M6 6l12 12 M18 6 6 18'),
    help:  '<circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="1.8"/>' + P('M9.2 9.2a2.8 2.8 0 1 1 3.6 2.7c-.7.3-.8.8-.8 1.6 M12 16.5v.01', 'stroke-width="2"'),
    theme: P('M21 12.8A8 8 0 1 1 11.2 3a6.2 6.2 0 0 0 9.8 9.8z'),
    print: '<rect x="6" y="13" width="12" height="8" rx="1" fill="none" stroke="currentColor" stroke-width="1.8"/>' + P('M6 13V4h12v9 M6 9h12') + '<rect x="3" y="9" width="18" height="7" rx="1.5" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="17.5" cy="12" r=".9" fill="currentColor" stroke="none"/>',
    sound: P('M4 9v6h4l5 4V5L8 9H4z M16 9.5a3.5 3.5 0 0 1 0 5 M18.5 7a7 7 0 0 1 0 10'),
    soundOff: P('M4 9v6h4l5 4V5L8 9H4z M16 9l5 6 M21 9l-5 6'),
    download: P('M12 4v11 M8 11l4 4 4-4 M5 20h14'),
    lens: '<circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" stroke-width="1.8"/>' + P('M20 20l-4-4'),
    mic: P('M12 3a3 3 0 0 1 3 3v5a3 3 0 0 1-6 0V6a3 3 0 0 1 3-3z M6 11a6 6 0 0 0 12 0 M12 17v4 M8.5 21h7'),
    globe: '<circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="1.8"/>' + P('M3 12h18 M12 3c2.6 2.5 4 5.6 4 9s-1.4 6.5-4 9c-2.6-2.5-4-5.6-4-9s1.4-6.5 4-9z'),
    handshake: P('M3 11l3-3 4 3 2-1.5L17 12l4 3 M7 13l3 3 M11 11l3 3 M9 15l2.5 2.5 M14 8l3-2 4 4-2 2'),
    present: '<rect x="3" y="4" width="18" height="12" rx="1.5" fill="none" stroke="currentColor" stroke-width="1.8"/>' + P('M9 20h6 M12 16v4 M9 12l4-2.5L9 7z'),
    tts: P('M5 5h14a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H10l-4 3v-3H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z') + P('M8.5 9.5v1 M11.5 8.5v3 M14.5 7.5v5 M17 9v2', 'stroke-width="1.6"'),
    ttsOff: P('M5 5h14a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H10l-4 3v-3H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z') + P('M4 4l16 16', 'stroke-width="2"'),
  };

  /* ---------- จักรอโศก (Ashoka Chakra) 24 ซี่ ---------- */
  function chakra(stroke) {
    let spokes = '';
    for (let i = 0; i < 24; i++) {
      const a = (i * 15) * Math.PI / 180;
      spokes += `<line x1="50" y1="50" x2="${50 + 42 * Math.cos(a)}" y2="${50 + 42 * Math.sin(a)}" stroke="${stroke}" stroke-width="1.4"/>`;
    }
    let pins = '';
    for (let i = 0; i < 24; i++) {
      const a = (i * 15) * Math.PI / 180;
      pins += `<circle cx="${50 + 38 * Math.cos(a)}" cy="${50 + 38 * Math.sin(a)}" r="2" fill="${stroke}"/>`;
    }
    return `<svg viewBox="0 0 100 100" aria-hidden="true">
      <circle cx="50" cy="50" r="44" fill="none" stroke="${stroke}" stroke-width="3"/>
      <circle cx="50" cy="50" r="6" fill="${stroke}"/>
      ${spokes}${pins}</svg>`;
  }

  /* ---------- helper: ตัดหัวข้อเป็นคำเพื่อ split reveal ---------- */
  function splitWords(text) {
    // ภาษาไทยไม่มีช่องว่างระหว่างคำ → แยกตามช่องว่างที่มีจริง (วลี) เพื่อให้เผยเป็นช่วง ๆ ดูเป็นธรรมชาติ
    const parts = text.split(' ');
    return '<span class="split-title" data-split>' + parts.map((w, i) =>
      `<span class="word" style="--wd:${i * 90}ms">${w}</span>`
    ).join('<span class="sp"></span>') + '</span>';
  }

  const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  /* #1(ใหม่) ถ้าเปิดด้วย #presenter → เรนเดอร์ "หน้าต่างผู้นำเสนอ" แล้วจบ ไม่สร้างเด็คปกติ */
  if (location.hash === '#presenter') { initPresenterView(); return; }

  /* ---------- เรนเดอร์เนื้อหาในแต่ละสไลด์ ---------- */
  /* #8 superscript ⓘ ที่แตะ/โฮเวอร์เพื่อดูแหล่งอ้างอิง (แทนข้อความ cite ที่รก) */
  function srcMark(src) {
    return src ? ` <sup class="src-mark" tabindex="0" role="button" aria-label="ดูแหล่งอ้างอิง" data-src="${esc(src)}">i</sup>` : '';
  }

  /* #4 ป้าย "ข้อเท็จจริง" vs "การตีความ" */
  function kindTag(kind) {
    if (kind === 'fact') return ` <span class="kind-tag fact">ข้อเท็จจริง</span>`;
    if (kind === 'claim') return ` <span class="kind-tag claim">การตีความ</span>`;
    return '';
  }

  function slideInner(s, idx) {
    const cat = DATA.categories[s.cat] || '';
    const lens = (DATA.lenses && DATA.lenses[s.id]) || '';
    const lensHTML = lens ? ` <span class="lens-badge" title="เลนส์ภาวะผู้นำ">${ICONS.lens}${esc(lens)}</span>` : '';
    const by = (DATA.presenters && DATA.presenters[s.id]) || '';
    const byHTML = by ? `<span class="byline" data-reveal title="ผู้นำเสนอสไลด์นี้">${ICONS.mic}<span class="by-lbl">นำเสนอโดย</span> <b>${esc(by)}</b></span>` : '';
    const head = `${byHTML}
      <div class="kicker" data-reveal>${esc(s.kicker)} <span class="cat-pill">${esc(cat)}</span>${lensHTML}</div>`;

    if (s.type === 'hero') {
      return `
        <div class="hero-aura" aria-hidden="true"><span></span><span></span><span></span></div>
        ${SVGghost()}
        <div class="hero-grid">
          <div>
            ${head}
            <h1 data-reveal style="--d:140ms">${splitWords(s.title)}</h1>
            <div class="name-en" data-reveal style="--d:520ms">${esc(s.titleEn)}</div>
            <p class="lead" data-reveal style="--d:640ms">${esc(s.lead)}</p>
            <div class="hero-tags" data-reveal style="--d:760ms">
              <span>นายกฯ คนที่ 14</span><span>BJP</span><span>2014 – ปัจจุบัน</span><span>ประชากร 1.4 พันล้าน</span>
            </div>
          </div>
          ${portraitHTML()}
        </div>`;
    }

    if (s.type === 'profile-intro') {
      return `${head}
        <h2 data-reveal style="--d:80ms">${esc(s.title)}</h2>
        <p class="lead" data-reveal style="--d:180ms">${esc(s.lead)}</p>
        <div class="facts-row">
          ${s.facts.map((f, i) => `<div class="fact-mini" data-reveal style="--d:${260 + i * 110}ms">
            <div class="k">${esc(f.k)}</div><div class="v">${esc(f.v)}</div></div>`).join('')}
        </div>`;
    }

    if (s.type === 'profile-grid') {
      return `${head}
        <h2 data-reveal style="--d:80ms">${esc(s.title)}</h2>
        <div class="profile-grid">
          ${s.facts.map((f, i) => `<div class="pcard" data-reveal style="--d:${180 + i * 110}ms">
            <div class="pico">${ICONS[f.icon] || ''}</div>
            <div class="k">${esc(f.k)}</div>
            <div class="v">${esc(f.v)}</div>
            <div class="sub">${esc(f.sub)}</div>
          </div>`).join('')}
        </div>`;
    }

    if (s.type === 'timeline') {
      const themes = s.themes || null;
      const filterHTML = themes ? `<div class="tl-filter" data-reveal style="--d:140ms" data-tl-filter>
          <button type="button" class="tlf active" data-theme="all">ทั้งหมด</button>
          ${Object.keys(themes).map(k => `<button type="button" class="tlf" data-theme="${esc(k)}">${esc(themes[k])}</button>`).join('')}
        </div>` : '';
      return `${head}
        <h2 data-reveal style="--d:80ms">${esc(s.title)}</h2>
        ${s.lead ? `<p class="lead" data-reveal style="--d:180ms">${esc(s.lead)}</p>` : ''}
        ${filterHTML}
        <div class="timeline" data-timeline>
          <div class="rail-fill"></div>
          ${s.timeline.map((t, i) => `<div class="tl-item ${t.accent ? 'accent' : ''} ${t.warn ? 'warn' : ''}" data-reveal data-tl data-theme="${esc(t.theme || '')}" style="--d:${i * 140}ms">
            <div class="dot"></div>
            <div class="tl-year">${esc(t.year)}</div>
            <div class="tl-head">${esc(t.head)}${t.theme && themes ? ` <span class="tl-tag">${esc(themes[t.theme] || '')}</span>` : ''}</div>
            <div class="tl-body">${esc(t.body)}</div>
            ${t.context ? `<details class="tl-context"><summary>บริบท / สถานะ</summary><div>${esc(t.context)}</div></details>` : ''}
          </div>`).join('')}
        </div>`;
    }

    if (s.type === 'cards') {
      return `${head}
        <h2 data-reveal style="--d:80ms">${esc(s.title)}</h2>
        ${s.lead ? `<p class="lead" data-reveal style="--d:180ms">${esc(s.lead)}</p>` : ''}
        <div class="cards">
          ${s.cards.map((c, i) => {
            const st = c.stat;
            const statHTML = st ? `<div class="stat">
                <div class="num"><span data-count="${st.value}" data-prefix="${esc(st.prefix||'')}" data-suffix="${esc(st.suffix||'')}">${esc(st.prefix||'')}0${esc(st.suffix||'')}</span></div>
                <div class="slabel">${esc(st.label)}${srcMark(st.src)}</div></div>` : '';
            const chartHTML = c.chart ? chartSVG(c.chart) : '';
            const counterHTML = c.counter ? `<div class="counter-note">${ICONS.quiz}<span>${esc(c.counter)}</span></div>` : '';
            const chandraHTML = c.icon === 'rocket' ? chandraSceneHTML() : '';
            return `<div class="bigcard ${c.icon === 'rocket' ? 'has-chandra' : ''}" data-reveal style="--d:${200 + i * 130}ms">
              ${chandraHTML}
              <div class="bico">${ICONS[c.icon] || ''}</div>
              <div class="tag">${esc(c.tag)}</div>
              <div class="bhead">${esc(c.head)}</div>
              <div class="bbody">${esc(c.body)}</div>
              ${statHTML}
              ${chartHTML}
              ${counterHTML}
            </div>`;
          }).join('')}
        </div>`;
    }

    if (s.type === 'split') {
      return `${head}
        <h2 data-reveal style="--d:80ms">${esc(s.title)}</h2>
        <div class="split">
          ${s.points.map((p, i) => `<div class="split-card" data-reveal style="--d:${180 + i * 150}ms">
            <div class="sico">${ICONS[p.icon] || ''}</div>
            <div><div class="shead">${esc(p.head)}</div><div class="sbody">${esc(p.body)}</div></div>
          </div>`).join('')}
        </div>
        ${s.reflection ? reflectionHTML() : ''}`;
    }

    if (s.type === 'stats-grid') {
      return `${head}
        <h2 data-reveal style="--d:80ms">${esc(s.title)}</h2>
        ${s.lead ? `<p class="lead" data-reveal style="--d:180ms">${esc(s.lead)}</p>` : ''}
        <div class="stats-grid">
          ${s.stats.map((st, i) => `<div class="stat-big" data-reveal style="--d:${220 + i * 120}ms">
            <div class="num"><span data-count="${st.value}" data-prefix="${esc(st.prefix||'')}" data-suffix="${esc(st.suffix||'')}"${st.plain ? ' data-plain="1"' : ''}>${esc(st.prefix||'')}0${esc(st.suffix||'')}</span></div>
            <div class="slabel">${esc(st.label)}${srcMark(st.src)}</div>
          </div>`).join('')}
        </div>
        ${s.id === 'numbers' ? scaleVizHTML() : ''}`;
    }

    if (s.type === 'agenda') {
      return `${head}
        <h2 data-reveal style="--d:80ms">${esc(s.title)}</h2>
        ${s.lead ? `<p class="lead" data-reveal style="--d:180ms">${esc(s.lead)}</p>` : ''}
        <div class="agenda">
          ${s.agenda.map((a, i) => `<div class="agenda-item" data-reveal style="--d:${240 + i * 130}ms">
            <div class="agenda-n">${esc(a.n)}</div>
            <div><div class="agenda-head">${esc(a.head)}</div><div class="agenda-body">${esc(a.body)}</div></div>
          </div>`).join('')}
        </div>`;
    }

    if (s.type === 'poll') {
      return `${head}
        <h2 data-reveal style="--d:80ms">${esc(s.title)}</h2>
        ${s.lead ? `<p class="lead" data-reveal style="--d:180ms">${esc(s.lead)}</p>` : ''}
        ${pollHTML(DATA.poll)}`;
    }

    /* #15 ตัวคั่นบท (chapter divider) — full-bleed + ส่งไม้ต่อผู้นำเสนอ */
    if (s.type === 'divider') {
      const by = (DATA.presenters && DATA.presenters[s.id]) || '';
      return `<div class="divider-stage" data-reveal>
          <div class="divider-num">${esc(s.num || '')}</div>
          <div class="divider-sweep"></div>
          <div class="divider-chakra" data-divider-chakra></div>
          <div class="divider-main">
            <div class="kicker" data-reveal>${esc(s.kicker || '')}</div>
            <h2 class="divider-title" data-reveal style="--d:120ms">${splitWords(s.title)}</h2>
            ${s.lead ? `<p class="lead divider-lead" data-reveal style="--d:360ms">${esc(s.lead)}</p>` : ''}
            ${by ? `<div class="divider-by" data-reveal style="--d:480ms">${ICONS.mic}<span>ช่วงนี้นำเสนอโดย</span> <b>${esc(by)}</b></div>` : ''}
          </div>
        </div>`;
    }

    /* #2 dashboard ก่อน/หลัง */
    if (s.type === 'dashboard') {
      return `${head}
        <h2 data-reveal style="--d:80ms">${esc(s.title)}</h2>
        ${s.lead ? `<p class="lead" data-reveal style="--d:180ms">${esc(s.lead)}</p>` : ''}
        <div class="dash" data-reveal style="--d:240ms" data-dash>
          ${s.metrics.map((m, i) => `<div class="dash-row" data-dash-row style="--di:${i * 120}ms">
            <div class="dash-label">${esc(m.label)}${kindTag(m.kind)}${srcMark(m.src)}</div>
            <div class="dash-vals">
              <span class="dash-from">${esc(m.from)}</span>
              <span class="dash-arrow ${m.dir === 'down' ? 'down' : 'up'}">${m.dir === 'down' ? '↓' : '↑'}</span>
              <span class="dash-to">${esc(m.to)}</span>
            </div>
          </div>`).join('')}
        </div>
        <div class="data-stamp" data-reveal>${esc(DATA.dataAsOf || '')}</div>`;
    }

    /* #3 comparison bars */
    if (s.type === 'comparison') {
      const max = Math.max.apply(null, s.bars.map(b => b.value)) || 1;
      return `${head}
        <h2 data-reveal style="--d:80ms">${esc(s.title)}</h2>
        ${s.lead ? `<p class="lead" data-reveal style="--d:180ms">${esc(s.lead)}</p>` : ''}
        <div class="cmp" data-reveal style="--d:240ms" data-cmp>
          ${s.bars.map((b, i) => `<div class="cmp-row ${b.hot ? 'hot' : ''}">
            <div class="cmp-name">${esc(b.label)}</div>
            <div class="cmp-track"><div class="cmp-bar" style="--w:${(b.value / max * 100).toFixed(1)}%;--bd:${200 + i * 130}ms"></div></div>
            <div class="cmp-val">${esc(String(b.value))}${esc(s.unit ? ' ' + s.unit.replace(' ต่อปี','') : '')}</div>
          </div>`).join('')}
        </div>
        <div class="cmp-unit" data-reveal>หน่วย: ${esc(s.unit || '')}${srcMark(s.src)}</div>`;
    }

    /* #9 international reception (สองคอลัมน์) */
    if (s.type === 'reception') {
      return `${head}
        <h2 data-reveal style="--d:80ms">${esc(s.title)}</h2>
        ${s.lead ? `<p class="lead" data-reveal style="--d:180ms">${esc(s.lead)}</p>` : ''}
        <div class="recv">
          <div class="recv-col praise" data-reveal style="--d:240ms">
            <div class="recv-h">${esc(s.praiseLabel)}${srcMark(s.praiseSrc)}</div>
            <ul>${s.praise.map(p => `<li>${esc(p)}</li>`).join('')}</ul>
          </div>
          <div class="recv-col concern" data-reveal style="--d:340ms">
            <div class="recv-h">${esc(s.concernLabel)}${srcMark(s.concernSrc)}</div>
            <ul>${s.concern.map(p => `<li>${esc(p)}</li>`).join('')}</ul>
          </div>
        </div>`;
    }

    /* #6 voices (มุมมองตัวแทน) */
    if (s.type === 'voices') {
      return `${head}
        <h2 data-reveal style="--d:80ms">${esc(s.title)}</h2>
        ${s.lead ? `<p class="lead" data-reveal style="--d:180ms">${esc(s.lead)}</p>` : ''}
        <div class="voices">
          ${s.voices.map((v, i) => `<figure class="voice ${v.tone}" data-reveal style="--d:${240 + i * 130}ms">
            <div class="voice-q">“</div>
            <blockquote class="voice-body" data-kinetic>${esc(v.body)}</blockquote>
            <figcaption class="voice-who">${esc(v.who)}</figcaption>
          </figure>`).join('')}
        </div>`;
    }

    /* #7 leadership model (สองคอลัมน์ + บทสรุป) */
    if (s.type === 'model') {
      return `${head}
        <h2 data-reveal style="--d:80ms">${esc(s.title)}</h2>
        ${s.lead ? `<p class="lead" data-reveal style="--d:180ms">${esc(s.lead)}</p>` : ''}
        <div class="model">
          ${s.cols.map((c, i) => `<div class="model-col ${c.tone}" data-reveal style="--d:${240 + i * 140}ms">
            <div class="model-h">${esc(c.label)}<span class="model-sub">${esc(c.sub || '')}</span></div>
            <ul>${c.traits.map(t => `<li>${esc(t)}</li>`).join('')}</ul>
          </div>`).join('')}
        </div>
        ${s.insight ? `<div class="model-insight" data-reveal style="--d:520ms">${ICONS.target}<span>${esc(s.insight)}</span></div>` : ''}`;
    }

    if (s.type === 'sources') {
      return `${head}
        <h2 data-reveal style="--d:80ms">${esc(s.title)}</h2>
        ${s.lead ? `<p class="lead" data-reveal style="--d:180ms">${esc(s.lead)}</p>` : ''}
        <div class="src-legend" data-reveal style="--d:240ms">
          <span class="conf-pill verified">ยืนยันได้</span>
          <span class="conf-pill approx">โดยประมาณ</span>
          <span class="conf-pill illus">ภาพประกอบ</span>
          ${DATA.dataAsOf ? `<span class="data-stamp inline">${esc(DATA.dataAsOf)}</span>` : ''}
        </div>
        <div class="src-list">
          ${collectSources().map((it, i) => `<div class="src-row" data-reveal style="--d:${300 + i * 70}ms">
            <span class="conf-pill ${it.conf}">${CONF_LABEL[it.conf]}</span>
            <div class="src-row-main"><div class="src-row-label">${esc(it.label)}</div><div class="src-row-src">${esc(it.src)}</div></div>
          </div>`).join('')}
        </div>
        <div class="footnote" data-reveal>${esc(DATA.footnote)}</div>`;
    }

    if (s.type === 'closing') {
      return `${SVGghost()}${head}
        <h2 data-reveal style="--d:80ms" class="closing-title">${splitWords(s.title)}</h2>
        ${s.lead ? `<p class="lead closing-lead" data-reveal style="--d:320ms">${esc(s.lead)}</p>` : ''}
        <div class="closing-echo" data-reveal style="--d:420ms" data-reflection-echo hidden></div>
        ${s.cta ? `<div class="closing-cta" data-reveal style="--d:520ms">${esc(s.cta)}</div>` : ''}
        <button type="button" class="takehome-btn" id="btn-takehome" data-reveal style="--d:600ms">${ICONS.download}<span>ดาวน์โหลดสรุปของฉัน (PNG)</span></button>
        <div class="footnote" data-reveal style="--d:700ms">${esc(DATA.footnote)}</div>`;
    }

    if (s.type === 'balance') {
      const chips = s.pros.map(p => ({ t: p, side: 'pos' })).concat(s.cons.map(c => ({ t: c, side: 'neg' })));
      return `${head}
        <h2 data-reveal style="--d:80ms">${esc(s.title)}</h2>
        <div class="dragscale" data-reveal style="--d:180ms" data-dragscale>
          <div class="ds-hint">ลากแต่ละข้อขึ้น “จาน” ฝั่งซ้าย/ขวา แล้วดูตาชั่งเอียงตามน้ำหนัก — หรือใช้ปุ่ม ◀ ▶ บนแต่ละชิป</div>
          <div class="ds-stage">
            <div class="ds-pan-zone left">
              <div class="ds-pan-label" style="color:var(--green)">${esc(s.prosLabel)}</div>
              <div class="ds-pan" data-pan="pos" aria-label="จานฝั่งผลงาน"></div>
            </div>
            <div class="ds-beam-wrap">
              <div class="ds-stand"></div>
              <div class="ds-beam" data-beam>
                <span class="ds-beam-end l"></span><span class="ds-beam-end r"></span>
              </div>
              <div class="ds-fulcrum"></div>
            </div>
            <div class="ds-pan-zone right">
              <div class="ds-pan-label" style="color:var(--clay)">${esc(s.consLabel)}</div>
              <div class="ds-pan" data-pan="neg" aria-label="จานฝั่งข้อวิจารณ์"></div>
            </div>
          </div>
          <div class="ds-pool" data-pool>
            ${chips.map((c, i) => `<button type="button" class="ds-chip ${c.side}" data-chip="${i}" data-side="${c.side}" data-where="pool">
              <span class="ds-arrow l" data-move="pos" aria-label="ย้ายไปฝั่งซ้าย">◀</span>
              <span class="ds-chip-t">${esc(c.t)}</span>
              <span class="ds-arrow r" data-move="neg" aria-label="ย้ายไปฝั่งขวา">▶</span>
            </button>`).join('')}
          </div>
          <div class="ds-readout" data-readout>วางทั้งหมดเพื่อชั่งน้ำหนักทั้งสองด้าน</div>
        </div>
        <div class="discuss" data-reveal style="--d:340ms">
          <div class="discuss-q">${ICONS.quiz} ${esc(s.question)}</div>
          <div class="discuss-prompts">${s.prompts.map(p => `<span>${esc(p)}</span>`).join('')}</div>
        </div>`;
    }

    if (s.type === 'summary') {
      return `${SVGghost()}${head}
        <h2 data-reveal style="--d:80ms">${esc(s.title)}</h2>
        <div class="takeaways">
          ${s.takeaways.map((t, i) => `<div class="takeaway" data-reveal style="--d:${160 + i * 120}ms">
            <div class="n">${i + 1}</div><div>${esc(t)}</div></div>`).join('')}
        </div>
        ${quizHTML()}
        <div class="footnote" data-reveal>${esc(DATA.footnote)}</div>`;
    }
    return head;
  }

  function quizHTML() {
    return `<div class="quiz-wrap" data-reveal style="--d:200ms">
      <div class="quiz-title">${ICONS.quiz} ทดสอบความเข้าใจ</div>
      ${DATA.quiz.map((q, qi) => `<div class="qcard" data-quiz="${qi}">
        <div class="q">${qi + 1}. ${esc(q.q)}</div>
        <div class="choices">
          ${q.choices.map((c, ci) => `<button class="choice" data-qi="${qi}" data-ci="${ci}" type="button">
            <span class="mk">${String.fromCharCode(65 + ci)}</span><span>${esc(c)}</span></button>`).join('')}
        </div>
        <div class="why"><b>เฉลย:</b> ${esc(q.why)}</div>
      </div>`).join('')}
      <div class="quiz-score" id="quiz-score" hidden>
        <div class="qs-ring"><svg viewBox="0 0 80 80"><circle class="qs-bg" cx="40" cy="40" r="34"/><circle class="qs-fg" cx="40" cy="40" r="34"/></svg><span class="qs-num">0/0</span></div>
        <div class="qs-text"><div class="qs-msg" id="qs-msg"></div><button type="button" class="qs-dl" id="qs-dl">${ICONS.download}<span>บันทึกการ์ดผลคะแนน</span></button></div>
      </div>
    </div>`;
  }

  /* ---------- SVG ประกอบ ---------- */
  function flagSVG() {
    return `<svg viewBox="0 0 100 125" preserveAspectRatio="none" style="width:100%;height:100%;opacity:.16">
      <rect width="100" height="41.6" y="0" fill="#FF9933"/>
      <rect width="100" height="41.6" y="41.6" fill="#ffffff"/>
      <rect width="100" height="41.8" y="83.3" fill="#138808"/>
    </svg>`;
  }
  function silhouetteSVG() {
    // ภาพเงาบุคคลแบบเรียบง่าย (placeholder) + จักรจาง ๆ ด้านหลัง
    return `<svg viewBox="0 0 200 250" style="width:78%;height:78%">
      <g opacity=".10" transform="translate(100,118)"><g transform="translate(-46,-46) scale(.92)">${chakra('#0e2f63').replace('<svg viewBox="0 0 100 100" aria-hidden="true">','').replace('</svg>','')}</g></g>
      <g fill="#0e2f63" opacity=".82">
        <circle cx="100" cy="92" r="40"/>
        <path d="M40 250c0-44 27-74 60-74s60 30 60 74z"/>
      </g>
      <path d="M70 88c6-16 54-16 60 0" fill="none" stroke="#f4efe4" stroke-width="3" opacity=".5"/>
    </svg>`;
  }
  function SVGghost() { return `<div class="ghost-chakra">${chakra('currentColor')}</div>`; }

  /* ตาชั่ง (balance scale) — ซ้าย=ผลงาน(เขียว) ขวา=ข้อวิจารณ์(แดง) สมดุล */
  function scaleSVG() {
    return `<svg viewBox="0 0 200 150" aria-hidden="true">
      <line x1="100" y1="18" x2="100" y2="120" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
      <line x1="40" y1="34" x2="160" y2="34" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
      <circle cx="100" cy="18" r="6" fill="currentColor"/>
      <path d="M70 120h60 M85 120c0-9 6-14 15-14s15 5 15 14" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
      <!-- จานซ้าย (เขียว) -->
      <g stroke="#1c7a45" stroke-width="2.5" fill="none">
        <line x1="40" y1="34" x2="22" y2="64"/><line x1="40" y1="34" x2="58" y2="64"/>
        <path d="M18 64a22 22 0 0 0 44 0z" fill="rgba(28,122,69,.16)"/>
      </g>
      <!-- จานขวา (แดง) -->
      <g stroke="#b23a25" stroke-width="2.5" fill="none">
        <line x1="160" y1="34" x2="142" y2="64"/><line x1="160" y1="34" x2="178" y2="64"/>
        <path d="M138 64a22 22 0 0 0 44 0z" fill="rgba(178,58,37,.16)"/>
      </g>
    </svg>`;
  }

  /* พอร์เทรต: ใช้ภาพจริงถ้าฝังมา (MODI_PHOTO) ไม่งั้นใช้ placeholder ธง+เงา */
  function portraitHTML() {
    if (typeof MODI_PHOTO !== 'undefined' && MODI_PHOTO) {
      return `<figure class="portrait has-photo" data-reveal style="--d:300ms">
        <img class="portrait-img" src="${MODI_PHOTO}" alt="ภาพพอร์เทรตของนเรนทรา โมดี นายกรัฐมนตรีอินเดีย" loading="eager" decoding="async">
        <figcaption class="portrait-credit">ภาพ: Government of India · PMO — GODL-India</figcaption>
      </figure>`;
    }
    return `<div class="portrait" data-reveal style="--d:300ms" data-portrait>
        <div class="flag-band">${flagSVG()}</div>
        <div class="silhouette">${silhouetteSVG()}</div>
        <div class="ph-note">ช่องสำหรับรูปจริง — วาง <b>assets/modi.jpg</b> แล้ว build ใหม่</div>
      </div>`;
  }

  /* #6 มินิกราฟเส้นแสดงการเติบโต (inline SVG, ภาพประกอบ) */
  function chartSVG(ch) {
    const pts = ch.points || [];
    if (!pts.length) return '';
    const W = 260, H = 96, padL = 6, padR = 6, padT = 8, padB = 18;
    const max = Math.max.apply(null, pts.map(p => p.y)) || 1;
    const xAt = i => padL + (i / (pts.length - 1)) * (W - padL - padR);
    const yAt = v => padT + (1 - v / max) * (H - padT - padB);
    const coords = pts.map((p, i) => [xAt(i), yAt(p.y)]);
    const line = coords.map((c, i) => (i ? 'L' : 'M') + c[0].toFixed(1) + ' ' + c[1].toFixed(1)).join(' ');
    const area = line + ` L${xAt(pts.length - 1).toFixed(1)} ${(H - padB)} L${padL} ${(H - padB)} Z`;
    const len = 520; // ความยาวเส้นโดยประมาณสำหรับอนิเมชัน draw
    return `<div class="mini-chart" data-chart>
      <div class="mc-head">${esc(ch.title)} <span class="mc-unit">(${esc(ch.unit)}${ch.illustrative ? ' · ภาพประกอบ' : ''})</span>${srcMark(ch.src)}</div>
      <svg viewBox="0 0 ${W} ${H}" class="mc-svg" preserveAspectRatio="none" aria-hidden="true">
        <path class="mc-area" d="${area}"/>
        <path class="mc-line" d="${line}" style="--len:${len}"/>
        ${coords.map((c, i) => `<circle class="mc-dot" cx="${c[0].toFixed(1)}" cy="${c[1].toFixed(1)}" r="2.6" style="--di:${i * 140 + 600}ms"/>`).join('')}
        ${pts.map((p, i) => `<text class="mc-x" x="${xAt(i).toFixed(1)}" y="${H - 5}" text-anchor="middle">${esc(p.x)}</text>`).join('')}
      </svg>
    </div>`;
  }

  /* #5 + #7 ภาพสเกล: แผนที่อินเดีย (กุจราต→ทั้งชาติ) + บล็อกคนเทียบไทย */
  function scaleVizHTML() {
    const THAI = 70;   // ล้านคนต่อ 1 ไอคอน (ราวประชากรไทย)
    const total = 1400;
    const blocks = Math.round(total / THAI); // ~20
    let icons = '';
    for (let i = 0; i < blocks; i++) icons += `<span class="ppl" style="--pi:${i * 45}ms"></span>`;
    return `<div class="scaleviz" data-reveal style="--d:360ms">
      <div class="sv-map">
        <div class="sv-cap">จากรัฐเดียว สู่ทั้งประเทศ</div>
        ${indiaMapSVG()}
        <div class="sv-map-legend"><span class="lg guj"></span>รัฐกุจราต (ห้องทดลอง) <span class="lg nat"></span>ทั้งอินเดีย</div>
      </div>
      <div class="sv-people">
        <div class="sv-cap">1.4 พันล้านคน ≈ <b>20×</b> ประชากรไทย</div>
        <div class="ppl-grid" data-people>${icons}</div>
        <div class="sv-people-note">1 รูป ≈ 70 ล้านคน (ราวประชากรไทย 1 ประเทศ)</div>
      </div>
    </div>`;
  }

  /* แผนที่อินเดียอย่างง่าย (วาดเอง) — ไฮไลต์กุจราตก่อน แล้วทั้งชาติ */
  function indiaMapSVG() {
    const india = 'M97 33 L112 30 L121 38 L138 36 L150 45 L146 58 L158 66 L150 78 L156 92 L146 96 L150 110 ' +
      'L138 116 L132 132 L120 150 L110 168 L101 182 L95 169 L90 150 L82 140 L70 140 L58 130 L50 116 ' +
      'L40 110 L33 96 L40 86 L34 74 L44 66 L40 54 L54 50 L66 54 L74 46 L84 40 Z';
    const gujarat = 'M40 86 L34 74 L44 66 L40 54 L54 50 L60 60 L56 74 L62 86 L52 96 L44 94 Z';
    /* #14 เส้นทางการเดินทาง กุจราต(49,74) → เดลี(~100,55) */
    const route = 'M49 74 Q66 50 100 55';
    return `<svg viewBox="0 0 190 200" class="india-svg" aria-label="แผนที่อินเดียอย่างง่าย">
      <path class="in-nation" d="${india}"/>
      <path class="in-guj" d="${gujarat}"/>
      <path class="in-route" d="${route}"/>
      <circle class="in-route-dot" r="2.6"><animateMotion class="smil-begin" dur="2.2s" begin="indefinite" fill="freeze" path="${route}"/></circle>
      <circle class="in-ping" cx="49" cy="74" r="4"/>
      <circle class="in-delhi" cx="100" cy="55" r="3"/>
    </svg>`;
  }

  /* #12 ฉากลงจอดจันทรายาน-3 (มินิอนิเมชัน บนการ์ดอวกาศ) */
  function chandraSceneHTML() {
    const arc = 'M6 72 Q46 4 86 40';
    return `<div class="chandra" aria-hidden="true">
      <svg viewBox="0 0 120 80">
        <circle class="ch-moon" cx="92" cy="48" r="20"/>
        <circle class="ch-crater" cx="86" cy="42" r="3"/>
        <circle class="ch-crater" cx="99" cy="54" r="4"/>
        <circle class="ch-crater" cx="95" cy="40" r="2"/>
        <path class="ch-arc" d="${arc}"/>
        <g class="ch-craft">
          <path d="M-3 -6 L3 -6 L4 4 L-4 4 Z"/>
          <path class="ch-flame" d="M-2.5 4 L2.5 4 L0 11 Z"/>
          <animateMotion class="smil-begin" id="chMove" dur="2.1s" begin="indefinite" fill="freeze" rotate="auto" path="${arc}"/>
        </g>
        <circle class="ch-dust" cx="86" cy="40" r="2" opacity="0">
          <animate attributeName="r" begin="chMove.end" dur="0.6s" from="2" to="16" fill="freeze"/>
          <animate attributeName="opacity" begin="chMove.end" dur="0.6s" values="0;.5;0" fill="freeze"/>
        </circle>
      </svg>
    </div>`;
  }

  /* #11 โพล (อ่าน/เขียน localStorage) */
  function pollHTML(poll) {
    if (!poll) return '';
    return `<div class="poll" data-reveal style="--d:240ms" data-poll="${esc(poll.id)}">
      <div class="poll-q">${esc(poll.question)}</div>
      <div class="poll-hint">${esc(poll.hint || '')}</div>
      <div class="poll-options">
        ${poll.options.map(o => `<button type="button" class="poll-opt" data-cat="${esc(o.cat)}" data-key="${esc(o.key)}">
          <span class="po-bar"></span>
          <span class="po-label">${esc(o.label)}</span>
          <span class="po-pct"></span>
        </button>`).join('')}
      </div>
      <div class="poll-foot"><span data-poll-total>0</span> โหวต · <button type="button" class="poll-reset" data-poll-reset>ล้างผลในเครื่องนี้</button></div>
    </div>`;
  }

  /* #14 กล่องสะท้อนความคิด */
  function reflectionHTML() {
    return `<div class="reflection" data-reveal style="--d:520ms">
      <label class="rf-label" for="rf-input">${esc(DATA.reflectionPrompt || '')}</label>
      <textarea id="rf-input" class="rf-input" rows="2" data-reflection placeholder="${esc(DATA.reflectionPlaceholder || '')}"></textarea>
      <div class="rf-saved" data-rf-saved hidden>บันทึกแล้ว ✓ จะไปปรากฏที่สไลด์สุดท้าย</div>
    </div>`;
  }

  /* #8(ใหม่) รวบรวมแหล่งอ้างอิงทั้งหมดจาก DATA + จัดระดับความเชื่อมั่น */
  const CONF_LABEL = { verified: 'ยืนยันได้', approx: 'โดยประมาณ', illus: 'ภาพประกอบ' };
  function classifyConf(src) {
    if (/ภาพประกอบ|illustrative/i.test(src)) return 'illus';
    if (/~|ราว|ประมาณ|สะสม|โดยประมาณ/.test(src)) return 'approx';
    return 'verified';
  }
  function collectSources() {
    const out = [], seen = new Set();
    const add = (label, src, conf) => {
      const key = src; if (!src || seen.has(key)) return; seen.add(key);
      out.push({ label, src, conf: conf || classifyConf(src) });
    };
    DATA.slides.forEach(s => {
      (s.stats || []).forEach(st => add(st.label, st.src));
      (s.cards || []).forEach(c => {
        if (c.stat) add(c.stat.label, c.stat.src);
        if (c.chart) add(c.chart.title, c.chart.src, c.chart.illustrative ? 'illus' : null);
      });
      (s.metrics || []).forEach(m => add(m.label, m.src));     // dashboard
      if (s.type === 'comparison') add(s.title, s.src, s.illustrative ? 'illus' : null);
      if (s.type === 'reception') { add(s.praiseLabel, s.praiseSrc); add(s.concernLabel, s.concernSrc); }
    });
    return out;
  }

  /* ====================================================================
     สร้าง DOM
     ==================================================================== */
  const deck = document.getElementById('deck');
  DATA.slides.forEach((s, idx) => {
    const sec = document.createElement('section');
    sec.className = 'slide' + (s.type === 'hero' ? ' hero' : '');
    sec.id = 'slide-' + s.id;
    sec.setAttribute('data-cat', s.cat);
    sec.setAttribute('data-index', idx);
    sec.innerHTML = slideInner(s, idx);
    deck.appendChild(sec);
  });

  const slides = Array.from(deck.querySelectorAll('.slide'));
  const total = slides.length;

  /* ---------- เติมแถบจุด + ตัวนับ ---------- */
  const dotsWrap = document.getElementById('dots');
  slides.forEach((_, i) => {
    const b = document.createElement('button');
    b.className = 'dot-i'; b.type = 'button';
    b.setAttribute('aria-label', 'ไปสไลด์ ' + (i + 1));
    b.addEventListener('click', () => goTo(i));
    dotsWrap.appendChild(b);
  });
  const counter = document.getElementById('counter');

  /* ---------- แถบ brand chakra + ปุ่ม ---------- */
  document.querySelector('.chakra-mini').innerHTML = chakra('#0e2f63');
  setIcon('btn-mode', ICONS.mode);
  setIcon('btn-motion', ICONS.motion);
  setIcon('btn-notes', ICONS.note);
  setIcon('btn-help', ICONS.help);
  setIcon('btn-theme', ICONS.theme);
  setIcon('btn-print', ICONS.print);
  setIcon('btn-sound', ICONS.sound);
  setIcon('btn-present', ICONS.present);
  setIcon('btn-tts', ICONS.ttsOff);
  document.getElementById('nav-prev').innerHTML = ICONS.arrowL;
  document.getElementById('nav-next').innerHTML = ICONS.arrowR;
  document.querySelector('.np-close').innerHTML = ICONS.close;
  function setIcon(id, svg) { const e = document.getElementById(id); if (e) e.querySelector('.ico').innerHTML = svg; }

  /* ====================================================================
     สถานะ + ตัวควบคุม MOTION
     ==================================================================== */
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let motionOn = !prefersReduced;
  let mode = 'scroll';
  let current = 0;

  function applyMotion() {
    document.body.classList.toggle('motion-off', !motionOn);
    const b = document.getElementById('btn-motion');
    b.setAttribute('aria-pressed', motionOn ? 'false' : 'true'); // pressed = ปิด motion
    b.querySelector('.lbl').textContent = motionOn ? 'Motion' : 'Motion: ปิด';
  }
  applyMotion();

  /* ---------- reveal helpers ---------- */
  function revealEl(el) {
    el.classList.add('is-visible');
    const st = el.querySelector(':scope > .split-title') || (el.classList.contains('split-title') ? el : el.querySelector('.split-title'));
    if (st) st.classList.add('is-visible');
    el.querySelectorAll('[data-count]').forEach(countUp);
    triggerMotionIn(el);
  }
  function revealSlide(sec) {
    sec.querySelectorAll('.split-title').forEach(t => t.classList.add('is-visible'));
    const items = sec.querySelectorAll('[data-reveal]');
    items.forEach(el => el.classList.add('is-visible'));
    sec.querySelectorAll('[data-count]').forEach(countUp);
    fillTimeline(sec);
    triggerMotionIn(sec);
  }
  function resetSlide(sec) {
    sec.querySelectorAll('[data-reveal]').forEach(el => el.classList.remove('is-visible'));
    sec.querySelectorAll('.split-title').forEach(t => t.classList.remove('is-visible'));
    sec.querySelectorAll('[data-count]').forEach(el => { el.dataset.done = ''; el.classList.remove('odo'); el.textContent = (el.dataset.prefix || '') + '0' + (el.dataset.suffix || ''); });
    const rf = sec.querySelector('.rail-fill'); if (rf) rf.style.height = '0';
  }

  /* #12 + #14 จุดเริ่มอนิเมชัน SMIL เมื่อ element โผล่ (เส้นทางแผนที่ + จันทรายาน) */
  function triggerMotionIn(scope) {
    if (!motionOn || !scope || !scope.querySelectorAll) return;
    scope.querySelectorAll('.smil-begin').forEach(a => { try { a.beginElement(); } catch (_) {} });
  }

  /* ---------- count up ---------- */
  function countUp(el) {
    if (el.dataset.done) return;
    el.dataset.done = '1';
    const target = parseFloat(el.dataset.count);
    const prefix = el.dataset.prefix || '', suffix = el.dataset.suffix || '';
    const sep = !el.dataset.plain; // years/รหัส ไม่ใส่ลูกน้ำคั่นหลัก
    const fmtNum = n => sep ? n.toLocaleString('en-US') : String(n);
    if (!motionOn) { el.textContent = prefix + fmtNum(target) + suffix; return; }
    /* #13 odometer — ตัวเลขม้วนหลักเข้าตำแหน่ง (เฉพาะจำนวนเต็ม) */
    if (Number.isInteger(target) && target >= 0) { odometer(el, prefix, fmtNum(target), suffix); return; }
    const dur = 1100, t0 = performance.now();
    function tick(now) {
      const p = Math.min(1, (now - t0) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      const val = Math.round(target * eased);
      el.textContent = prefix + fmtNum(val) + suffix;
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  /* #13 สร้างเลขม้วน (odometer): แต่ละหลักเป็นรีลแนวตั้ง 0–9 เลื่อนไปตำแหน่งเป้าหมาย */
  function odometer(el, prefix, str, suffix) {
    let digitIdx = 0, html = prefix ? `<span class="odo-fix">${esc(prefix)}</span>` : '';
    for (const ch of str) {
      if (/\d/.test(ch)) {
        const reel = '0123456789'.split('').map(n => `<span class="odo-n">${n}</span>`).join('');
        html += `<span class="odo-digit"><span class="odo-reel" data-d="${ch}" style="--dl:${digitIdx * 70}ms">${reel}</span></span>`;
        digitIdx++;
      } else {
        html += `<span class="odo-fix">${esc(ch)}</span>`;
      }
    }
    if (suffix) html += `<span class="odo-fix">${esc(suffix)}</span>`;
    el.innerHTML = html;
    el.classList.add('odo');
    requestAnimationFrame(() => requestAnimationFrame(() => {
      el.querySelectorAll('.odo-reel').forEach(r => { r.style.transform = `translateY(${-(+r.dataset.d)}em)`; });
    }));
  }

  /* ---------- timeline rail fill ---------- */
  function fillTimeline(sec) {
    const tl = sec.querySelector('[data-timeline]');
    if (!tl) return;
    const rf = tl.querySelector('.rail-fill');
    if (!rf) return;
    requestAnimationFrame(() => {
      const items = tl.querySelectorAll('[data-tl]');
      const last = items[items.length - 1];
      if (!last) return;
      const h = last.offsetTop + 14;
      rf.style.height = motionOn ? h + 'px' : h + 'px';
    });
  }

  /* ====================================================================
     SCROLL MODE — IntersectionObserver
     ==================================================================== */
  let io = null;
  function startObserver() {
    io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          revealEl(e.target);
          // timeline: เผยทีละจุดเมื่อเลื่อนถึง + เติมราง
          if (e.target.hasAttribute('data-tl')) {
            const sec = e.target.closest('.slide');
            const tl = e.target.closest('[data-timeline]');
            const rf = tl.querySelector('.rail-fill');
            const shown = tl.querySelectorAll('[data-tl].is-visible');
            const lastShown = shown[shown.length - 1];
            if (lastShown && rf) rf.style.height = (lastShown.offsetTop + 14) + 'px';
          }
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.18, rootMargin: '0px 0px -8% 0px' });
    deck.querySelectorAll('[data-reveal]').forEach(el => io.observe(el));
  }
  function stopObserver() { if (io) { io.disconnect(); io = null; } }

  /* ====================================================================
     SLIDE MODE
     ==================================================================== */
  function setMode(next) {
    if (next === mode) return;
    mode = next;
    if (mode === 'slide') {
      stopObserver();
      // ซ่อน reveal ทั้งหมดก่อน แล้วค่อยโชว์สไลด์ปัจจุบัน
      slides.forEach(resetSlide);
      document.body.classList.add('mode-slide');
      startTimer();
      goTo(current, true);
    } else {
      document.body.classList.remove('mode-slide');
      slides.forEach(s => s.classList.remove('is-active', 'leaving-left'));
      // เผยทุกอย่างที่เคยผ่านตา + เริ่ม observer ใหม่
      deck.querySelectorAll('[data-reveal]').forEach(el => el.classList.remove('is-visible'));
      deck.querySelectorAll('[data-count]').forEach(el => { el.dataset.done = ''; });
      startObserver();
      // เลื่อนไปสไลด์ที่ดูค้างไว้
      slides[current].scrollIntoView({ behavior: 'auto', block: 'start' });
    }
    updateModeBtn();
    updateNotes();
  }
  function updateModeBtn() {
    const b = document.getElementById('btn-mode');
    b.setAttribute('aria-pressed', mode === 'slide' ? 'true' : 'false');
    b.querySelector('.lbl').textContent = mode === 'slide' ? 'โหมด: สไลด์' : 'โหมด: เลื่อน';
  }

  function goTo(i, force) {
    i = Math.max(0, Math.min(total - 1, i));
    if (mode === 'slide') {
      const prev = current;
      slides.forEach((s, k) => {
        s.classList.remove('is-active', 'leaving-left');
        if (k === i) s.classList.add('is-active');
        else if (k < i) s.classList.add('leaving-left');
      });
      // replay อนิเมชันของสไลด์ที่เข้า: reset → force reflow (commit สถานะซ่อน)
      // → reveal ทันที  (ไม่พึ่ง requestAnimationFrame จึงเชื่อถือได้ทุกเบราว์เซอร์)
      const sec = slides[i];
      resetSlide(sec);
      void sec.offsetWidth; // บังคับ reflow เพื่อให้ transition เล่นซ้ำได้
      revealSlide(sec);
    }
    const changed = current !== i || force;
    current = i;
    updateUI();
    updateNotes();
    onNavigate(i, { play: mode === 'slide' && changed, broadcast: true });
  }
  function next() { if (mode === 'slide') goTo(current + 1); }
  function prev() { if (mode === 'slide') goTo(current - 1); }

  function updateUI() {
    dotsWrap.querySelectorAll('.dot-i').forEach((d, k) => d.classList.toggle('active', k === current));
    counter.innerHTML = `<b>${current + 1}</b> / ${total}`;
    document.getElementById('nav-prev').disabled = current === 0;
    document.getElementById('nav-next').disabled = current === total - 1;
    updateHash();
  }

  /* ---------- #4 deep-link: ผูกสไลด์ปัจจุบันกับ URL hash (ไม่เด้งหน้าจอ) ---------- */
  function updateHash() {
    const s = DATA.slides[current];
    if (!s) return;
    try { history.replaceState(null, '', '#' + s.id); }
    catch (_) { /* file:// บางเบราว์เซอร์ไม่ให้ replaceState — ข้ามไป */ }
  }
  function slideIndexFromHash() {
    const id = (location.hash || '').replace('#', '');
    return DATA.slides.findIndex(s => s.id === id);
  }

  /* ---------- ติดตามสไลด์ปัจจุบันใน scroll mode (เพื่อ notes/counter) ---------- */
  const scrollSpy = new IntersectionObserver((entries) => {
    if (mode !== 'scroll') return;
    entries.forEach(e => {
      if (e.isIntersecting) {
        const idx = parseInt(e.target.dataset.index, 10);
        const catChanged = current === undefined || DATA.slides[current].cat !== DATA.slides[idx].cat;
        current = idx;
        updateUI(); updateNotes();
        if (catChanged) washTo(idx);
        if (DATA.slides[idx].id === 'closing') updateReflectionEcho();
        if (typeof broadcastState === 'function') broadcastState();
        if (typeof narrateCurrent === 'function') narrateCurrent();
      }
    });
  }, { threshold: 0.5 });
  slides.forEach(s => scrollSpy.observe(s));

  /* ====================================================================
     SPEAKER NOTES
     ==================================================================== */
  let notesOpen = false;
  const panel = document.getElementById('notes-panel');
  const backdrop = document.getElementById('notes-backdrop');
  function updateNotes() {
    const s = DATA.slides[current];
    panel.querySelector('.np-kicker').textContent = `สไลด์ ${current + 1}/${total} · ${s.kicker}`;
    panel.querySelector('.np-slide-title').textContent = s.title;
    panel.querySelector('.np-body').textContent = s.note || '— ไม่มีโน้ตสำหรับสไลด์นี้ —';
  }
  function toggleNotes(forceState) {
    notesOpen = (forceState === undefined) ? !notesOpen : forceState;
    panel.classList.toggle('open', notesOpen);
    backdrop.classList.toggle('open', notesOpen);
    document.getElementById('btn-notes').setAttribute('aria-pressed', notesOpen ? 'true' : 'false');
  }
  backdrop.addEventListener('click', () => toggleNotes(false));
  panel.querySelector('.np-close').addEventListener('click', () => toggleNotes(false));
  updateNotes();

  /* ====================================================================
     QUIZ
     ==================================================================== */
  deck.addEventListener('click', (e) => {
    const ch = e.target.closest('.choice');
    if (!ch) return;
    const qi = +ch.dataset.qi, ci = +ch.dataset.ci;
    const card = deck.querySelector(`[data-quiz="${qi}"]`);
    if (card.classList.contains('answered')) return;
    const correct = DATA.quiz[qi].answer;
    card.classList.add('answered');
    card.querySelectorAll('.choice').forEach(c => {
      c.classList.add('locked');
      const k = +c.dataset.ci;
      if (k === correct) c.classList.add('correct');
      else if (k === ci) c.classList.add('wrong');
    });
    quizState[qi] = (ci === correct);
    if (ci === correct) sfxNav();
    updateQuizScore();
  });

  /* ====================================================================
     ปุ่ม + คีย์ลัด + ทัช
     ==================================================================== */
  document.getElementById('btn-mode').addEventListener('click', () => setMode(mode === 'slide' ? 'scroll' : 'slide'));
  document.getElementById('btn-motion').addEventListener('click', () => { motionOn = !motionOn; applyMotion(); });
  document.getElementById('btn-notes').addEventListener('click', () => toggleNotes());
  document.getElementById('btn-theme').addEventListener('click', () => toggleTheme());
  document.getElementById('btn-help').addEventListener('click', () => toggleHelp());
  document.getElementById('btn-print').addEventListener('click', () => window.print());
  document.getElementById('nav-prev').addEventListener('click', prev);
  document.getElementById('nav-next').addEventListener('click', next);

  document.addEventListener('keydown', (e) => {
    const t = e.target;
    if (t && typeof t.matches === 'function' && t.matches('input, textarea')) return;
    const k = e.key.toLowerCase();
    if (k === 'm') { e.preventDefault(); setMode(mode === 'slide' ? 'scroll' : 'slide'); }
    else if (k === 'a') { e.preventDefault(); motionOn = !motionOn; applyMotion(); }
    else if (k === 's' || k === 'n') { e.preventDefault(); toggleNotes(); }
    else if (k === 't') { e.preventDefault(); toggleTheme(); }
    else if (k === 'y') { e.preventDefault(); toggleSound(); }
    else if (k === 'v') { e.preventDefault(); toggleTts(); }
    else if (k === 'p') { e.preventDefault(); openPresenter(); }
    else if (k === '?' || (k === '/' && e.shiftKey)) { e.preventDefault(); toggleHelp(); }
    else if (k === 'escape') { toggleNotes(false); toggleHelp(false); hideTip(); }
    else if (mode === 'slide') {
      if (k === 'arrowright' || k === ' ' || k === 'pagedown') { e.preventDefault(); next(); }
      else if (k === 'arrowleft' || k === 'pageup') { e.preventDefault(); prev(); }
      else if (k === 'home') { e.preventDefault(); goTo(0); }
      else if (k === 'end') { e.preventDefault(); goTo(total - 1); }
    }
  });

  /* ทัช/สไวป์ ในโหมดสไลด์ */
  let tx = 0, ty = 0;
  deck.addEventListener('touchstart', (e) => { tx = e.changedTouches[0].clientX; ty = e.changedTouches[0].clientY; }, { passive: true });
  deck.addEventListener('touchend', (e) => {
    if (mode !== 'slide') return;
    const dx = e.changedTouches[0].clientX - tx, dy = e.changedTouches[0].clientY - ty;
    if (Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy) * 1.4) { dx < 0 ? next() : prev(); }
  }, { passive: true });

  /* ====================================================================
     scroll progress
     ==================================================================== */
  const bar = document.getElementById('progress');
  const brandChakra = document.querySelector('.chakra-mini');
  let scrollRAF = 0;
  function onScroll() {
    if (mode === 'slide') return;
    const h = document.documentElement.scrollHeight - window.innerHeight;
    const frac = h > 0 ? window.scrollY / h : 0;
    bar.style.width = (frac * 100) + '%';
    if (brandChakra && motionOn) brandChakra.style.transform = `rotate(${(frac * 720).toFixed(1)}deg)`; // #20 หมุนจักรตามสกรอลล์
    updateTimelineRails();
    updateScrolly();
  }
  window.addEventListener('scroll', () => {
    if (scrollRAF) return;
    scrollRAF = requestAnimationFrame(() => { scrollRAF = 0; onScroll(); });
  }, { passive: true });

  /* #8 เส้นเวลาไหลตามตำแหน่งสกรอลล์ — รางค่อย ๆ "ลากเส้น" ขณะอ่าน */
  function updateTimelineRails() {
    if (mode !== 'scroll') return;
    const refLine = window.innerHeight * 0.62; // จุดอ้างอิงกลางค่อนล่างของจอ
    deck.querySelectorAll('[data-timeline]').forEach(tl => {
      const rf = tl.querySelector('.rail-fill');
      if (!rf) return;
      const items = tl.querySelectorAll('[data-tl]');
      let fill = 0;
      items.forEach(it => {
        const r = it.getBoundingClientRect();
        if (r.top <= refLine) { fill = it.offsetTop + 14; it.classList.add('is-visible'); }
      });
      rf.style.height = fill + 'px';
    });
  }

  /* #11 scrollytelling — ไฮไลต์แถวแดชบอร์ดทีละแถวตามตำแหน่งสกรอลล์ (guided read) */
  function updateScrolly() {
    if (mode !== 'scroll') return;
    const ref = window.innerHeight * 0.5;
    deck.querySelectorAll('[data-dash]').forEach(dash => {
      const rows = dash.querySelectorAll('[data-dash-row]');
      let best = -1, bestDist = Infinity;
      rows.forEach((row, i) => {
        const r = row.getBoundingClientRect();
        const c = r.top + r.height / 2;
        const d = Math.abs(c - ref);
        if (d < bestDist) { bestDist = d; best = i; }
      });
      rows.forEach((row, i) => row.classList.toggle('focus', i === best && bestDist < window.innerHeight * 0.4));
    });
  }

  /* ====================================================================
     #9 THEME (สว่าง/มืด) — จำค่าไว้ด้วย localStorage
     ==================================================================== */
  const THEME_KEY = 'modi-theme';
  function currentTheme() { return document.documentElement.getAttribute('data-theme') || 'light'; }
  function applyTheme(t) {
    document.documentElement.setAttribute('data-theme', t);
    const b = document.getElementById('btn-theme');
    b.setAttribute('aria-pressed', t === 'dark' ? 'true' : 'false');
    b.querySelector('.lbl').textContent = t === 'dark' ? 'ธีม: มืด' : 'ธีม: สว่าง';
  }
  function toggleTheme() {
    const t = currentTheme() === 'dark' ? 'light' : 'dark';
    applyTheme(t);
    try { localStorage.setItem(THEME_KEY, t); } catch (_) {}
  }
  // พิมพ์ให้สว่างเสมอ (กันตัวอักษรขาวบนพื้นขาว) แล้วคืนธีมเดิม
  let printPrevTheme = null;
  window.addEventListener('beforeprint', () => { printPrevTheme = currentTheme(); applyTheme('light'); });
  window.addEventListener('afterprint', () => { if (printPrevTheme) applyTheme(printPrevTheme); });

  /* ====================================================================
     #6 HELP OVERLAY (คีย์ลัด)
     ==================================================================== */
  let helpOpen = false;
  const helpOverlay = document.getElementById('help-overlay');
  document.getElementById('help-close').innerHTML = ICONS.close;
  const HELP_ROWS = [
    ['M', 'สลับโหมด เลื่อน ↔ สไลด์'],
    ['← →', 'เปลี่ยนสไลด์ (โหมดสไลด์)'],
    ['Space', 'สไลด์ถัดไป'],
    ['Home / End', 'สไลด์แรก / สุดท้าย'],
    ['S / N', 'โน้ตผู้พูด (ผู้ชมไม่เห็น)'],
    ['A', 'เปิด/ปิดอนิเมชัน'],
    ['T', 'สลับธีม สว่าง/มืด'],
    ['Y', 'เปิด/ปิดเสียงประกอบ'],
    ['V', 'อ่านสไลด์ออกเสียง (ไทย)'],
    ['P', 'เปิดหน้าต่างผู้นำเสนอ'],
    ['?', 'เปิด/ปิดหน้าต่างนี้'],
    ['Esc', 'ปิดแผง/หน้าต่าง'],
  ];
  document.getElementById('help-list').innerHTML =
    HELP_ROWS.map(r => `<li><kbd>${r[0]}</kbd><span>${r[1]}</span></li>`).join('');
  function toggleHelp(force) {
    helpOpen = (force === undefined) ? !helpOpen : force;
    helpOverlay.classList.toggle('open', helpOpen);
  }
  helpOverlay.addEventListener('click', e => { if (e.target === helpOverlay) toggleHelp(false); });
  document.getElementById('help-close').addEventListener('click', () => toggleHelp(false));

  /* ====================================================================
     #5 PRESENTER TIMER (โหมดสไลด์) — คลิกเพื่อรีเซ็ต
     ==================================================================== */
  const timerEl = document.getElementById('timer');
  let timerStart = 0, timerInt = 0;
  function fmt(ms) {
    const s = Math.max(0, Math.floor(ms / 1000));
    return String(Math.floor(s / 60)).padStart(2, '0') + ':' + String(s % 60).padStart(2, '0');
  }
  function timerTick() { timerEl.textContent = fmt(Date.now() - timerStart); }
  function startTimer() {
    timerStart = Date.now(); timerTick();
    if (timerInt) clearInterval(timerInt);
    timerInt = setInterval(timerTick, 1000);
  }
  timerEl.addEventListener('click', () => { startTimer(); timerEl.classList.add('flash'); setTimeout(() => timerEl.classList.remove('flash'), 300); });

  /* ====================================================================
     #4 COLOR WASH — แฟลชสีหมวดสั้น ๆ เมื่อข้ามโซน
     ==================================================================== */
  const washEl = document.getElementById('cat-wash');
  let washPrevCat = null;
  function washTo(idx) {
    const s = DATA.slides[idx]; if (!s || !washEl) return;
    if (s.cat === washPrevCat) return;
    washPrevCat = s.cat;
    if (!motionOn) return;
    const accent = getComputedStyle(slides[idx]).getPropertyValue('--accent').trim() || '#888';
    washEl.style.background = `radial-gradient(120% 120% at 50% 50%, ${accent}, transparent 70%)`;
    washEl.classList.remove('flash'); void washEl.offsetWidth; washEl.classList.add('flash');
  }

  /* ====================================================================
     #19 SOUND — สังเคราะห์ด้วย WebAudio (ไม่มีไฟล์เสียง → ออฟไลน์ได้)
     ==================================================================== */
  let soundOn = false, actx = null;
  try { soundOn = localStorage.getItem('modi-sound') === 'on'; } catch (_) {}
  function ensureCtx() {
    if (!actx) { try { actx = new (window.AudioContext || window.webkitAudioContext)(); } catch (_) { actx = null; } }
    if (actx && actx.state === 'suspended') actx.resume();
    return actx;
  }
  function tone(freq, dur, type, gain, slideTo) {
    const c = ensureCtx(); if (!c) return;
    const t0 = c.currentTime;
    const o = c.createOscillator(), g = c.createGain();
    o.type = type || 'sine'; o.frequency.setValueAtTime(freq, t0);
    if (slideTo) o.frequency.exponentialRampToValueAtTime(slideTo, t0 + dur);
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(gain || 0.06, t0 + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    o.connect(g); g.connect(c.destination); o.start(t0); o.stop(t0 + dur + 0.02);
  }
  function sfxNav() { if (soundOn) tone(420, 0.18, 'sine', 0.05, 620); }
  function sfxSting() { if (soundOn) { tone(330, 0.5, 'triangle', 0.05, 495); setTimeout(() => tone(495, 0.6, 'sine', 0.04, 660), 90); } }
  function updateSoundBtn() {
    const b = document.getElementById('btn-sound');
    b.setAttribute('aria-pressed', soundOn ? 'true' : 'false');
    b.querySelector('.ico').innerHTML = soundOn ? ICONS.sound : ICONS.soundOff;
    b.querySelector('.lbl').textContent = soundOn ? 'เสียง' : 'เสียง: ปิด';
  }
  function toggleSound() {
    soundOn = !soundOn;
    if (soundOn) { ensureCtx(); sfxNav(); }
    try { localStorage.setItem('modi-sound', soundOn ? 'on' : 'off'); } catch (_) {}
    updateSoundBtn();
  }
  document.getElementById('btn-sound').addEventListener('click', toggleSound);
  updateSoundBtn();

  /* ====================================================================
     #15 ซิงก์หลายหน้าต่าง (BroadcastChannel) — รีโมตแบบออฟไลน์
     ==================================================================== */
  let bc = null, applyingRemote = false;
  const syncBadge = document.getElementById('sync-badge');
  try { bc = new BroadcastChannel('modi-deck'); } catch (_) { bc = null; }
  if (bc) {
    bc.onmessage = (ev) => {
      const m = ev.data || {};
      if (m.type === 'hello') { showSyncBadge(); bc.postMessage({ type: 'hi' }); return; }
      if (m.type === 'hi') { showSyncBadge(); return; }
      if (m.type === 'request') { broadcastState(); showSyncBadge(); return; }
      if (m.type === 'remote') {           // คำสั่งจากหน้าต่างผู้นำเสนอ
        showSyncBadge();
        if (mode !== 'slide') setMode('slide');
        if (m.action === 'next') next();
        else if (m.action === 'prev') prev();
        else if (m.action === 'goto' && typeof m.index === 'number') goTo(m.index);
        return;
      }
      if (m.type === 'nav') {              // ซิงก์จากหน้าต่าง audience อื่น
        showSyncBadge();
        applyingRemote = true;
        if (m.mode && m.mode !== mode) setMode(m.mode);
        if (typeof m.index === 'number' && m.index !== current) {
          if (mode === 'slide') goTo(m.index, true);
          else { current = m.index; slides[m.index].scrollIntoView({ behavior: 'smooth', block: 'start' }); updateUI(); updateNotes(); }
        }
        applyingRemote = false;
      }
    };
    try { bc.postMessage({ type: 'hello' }); } catch (_) {}
  }
  function broadcastState() {
    if (!bc) return;
    try { bc.postMessage({ type: 'nav', index: current, mode, total }); } catch (_) {}
  }
  let syncTimer = 0;
  function showSyncBadge() {
    if (!syncBadge) return;
    syncBadge.hidden = false; syncBadge.classList.add('on');
    clearTimeout(syncTimer); syncTimer = setTimeout(() => syncBadge.classList.remove('on'), 2600);
  }

  function onNavigate(idx, opts) {
    opts = opts || {};
    washTo(idx);
    if (opts.play) sfxNav();
    if (DATA.slides[idx] && DATA.slides[idx].id === 'closing') updateReflectionEcho();
    if (opts.broadcast && bc && !applyingRemote) {
      try { bc.postMessage({ type: 'nav', index: idx, mode, total }); } catch (_) {}
    }
    narrateCurrent();
  }

  /* ====================================================================
     #8 / #10 TOOLTIP ลอย (แหล่งอ้างอิง + อภิธานศัพท์)
     ==================================================================== */
  const tip = document.getElementById('tip');
  let tipFor = null;
  function showTip(el, text) {
    if (!tip) return;
    tip.textContent = text; tip.classList.add('on'); tip.setAttribute('aria-hidden', 'false');
    const r = el.getBoundingClientRect();
    const tw = tip.offsetWidth, th = tip.offsetHeight;
    let left = r.left + r.width / 2 - tw / 2;
    left = Math.max(8, Math.min(window.innerWidth - tw - 8, left));
    let top = r.top - th - 10;
    if (top < 8) top = r.bottom + 10;
    tip.style.left = left + 'px'; tip.style.top = top + 'px';
    tipFor = el;
  }
  function hideTip() { if (tip) { tip.classList.remove('on'); tip.setAttribute('aria-hidden', 'true'); tipFor = null; } }
  function tipText(el) {
    if (el.dataset.src) return 'ที่มา: ' + el.dataset.src;
    if (el.dataset.term) return (DATA.glossary && DATA.glossary[el.dataset.term]) || '';
    return '';
  }
  function tipTarget(t) { return t.closest && t.closest('.src-mark, .term'); }
  document.addEventListener('mouseover', (e) => { const m = tipTarget(e.target); if (m) showTip(m, tipText(m)); });
  document.addEventListener('mouseout', (e) => { const m = tipTarget(e.target); if (m && m === tipFor) hideTip(); });
  document.addEventListener('focusin', (e) => { const m = tipTarget(e.target); if (m) showTip(m, tipText(m)); });
  document.addEventListener('focusout', (e) => { const m = tipTarget(e.target); if (m && m === tipFor) hideTip(); });
  document.addEventListener('click', (e) => {
    const m = tipTarget(e.target);
    if (m) { e.preventDefault(); (tipFor === m) ? hideTip() : showTip(m, tipText(m)); }
    else if (tipFor) hideTip();
  });
  window.addEventListener('scroll', hideTip, { passive: true });

  /* #10 ห่อคำศัพท์ในเนื้อความ (ครั้งแรกที่พบต่อคำ) ด้วย TreeWalker */
  (function wrapGlossary() {
    if (!DATA.glossary) return;
    const SEL = '.bbody, .tl-body, .sbody, .lead, .agenda-body, .bhead';
    const terms = Object.keys(DATA.glossary).sort((a, b) => b.length - a.length);
    terms.forEach(term => {
      const hosts = deck.querySelectorAll(SEL);
      for (const host of hosts) {
        const w = document.createTreeWalker(host, NodeFilter.SHOW_TEXT, null);
        let node, done = false;
        while ((node = w.nextNode())) {
          const p = node.parentNode;
          if (p.closest('.term, .src-mark')) continue;
          const i = node.nodeValue.indexOf(term);
          if (i < 0) continue;
          const after = node.splitText(i);
          after.nodeValue = after.nodeValue.slice(term.length);
          const span = document.createElement('span');
          span.className = 'term'; span.tabIndex = 0; span.setAttribute('role', 'button');
          span.dataset.term = term; span.textContent = term;
          p.insertBefore(span, after);
          done = true; break;
        }
        if (done) break;
      }
    });
  })();

  /* ====================================================================
     #2 LOADER (chakra) — เปิดครั้งแรก แล้วเฟดเข้า hero
     ==================================================================== */
  (function initLoader() {
    const loader = document.getElementById('loader');
    if (!loader) return;
    const lc = document.getElementById('loader-chakra');
    if (lc) lc.innerHTML = chakra(getComputedStyle(document.documentElement).getPropertyValue('--navy').trim() || '#0e2f63');
    if (prefersReduced || !motionOn) { loader.remove(); return; }
    loader.classList.add('spin');
    setTimeout(() => loader.classList.add('done'), 1150);
    setTimeout(() => loader.remove(), 1750);
  })();

  /* ====================================================================
     #1 HERO PARALLAX — ขยับเลเยอร์ตามเมาส์ (เบา ๆ)
     ==================================================================== */
  (function initParallax() {
    const hero = deck.querySelector('.slide.hero');
    if (!hero) return;
    window.addEventListener('pointermove', (e) => {
      if (!motionOn || mode === 'slide') return;
      if (e.pointerType === 'touch') return;
      const dx = (e.clientX / window.innerWidth - 0.5);
      const dy = (e.clientY / window.innerHeight - 0.5);
      hero.style.setProperty('--px', (dx * 14).toFixed(1) + 'px');
      hero.style.setProperty('--py', (dy * 14).toFixed(1) + 'px');
    }, { passive: true });
  })();

  /* ====================================================================
     #11 POLL
     ==================================================================== */
  function pollKey(id) { return 'modi-poll-' + id; }
  function readPoll(id, opts) {
    let data = {};
    try { data = JSON.parse(localStorage.getItem(pollKey(id)) || '{}'); } catch (_) {}
    opts.forEach(o => { if (typeof data[o.key] !== 'number') data[o.key] = 0; });
    return data;
  }
  function renderPoll(wrap) {
    const id = wrap.dataset.poll;
    const opts = DATA.poll.options;
    const data = readPoll(id, opts);
    const total = opts.reduce((s, o) => s + (data[o.key] || 0), 0);
    let voted = false;
    try { voted = localStorage.getItem(pollKey(id) + '-voted') === '1'; } catch (_) {}
    wrap.classList.toggle('voted', voted);
    let maxKey = null, maxN = -1;
    opts.forEach(o => { if ((data[o.key] || 0) > maxN) { maxN = data[o.key] || 0; maxKey = o.key; } });
    wrap.querySelectorAll('.poll-opt').forEach(btn => {
      const k = btn.dataset.key; const n = data[k] || 0;
      const pct = total ? Math.round((n / total) * 100) : 0;
      btn.querySelector('.po-bar').style.width = (voted ? pct : 0) + '%';
      btn.querySelector('.po-pct').textContent = voted ? pct + '%' : '';
      btn.classList.toggle('lead', voted && total > 0 && k === maxKey);
    });
    const tEl = wrap.querySelector('[data-poll-total]'); if (tEl) tEl.textContent = total;
  }
  function initPoll(wrap) {
    const id = wrap.dataset.poll;
    renderPoll(wrap);
    wrap.querySelectorAll('.poll-opt').forEach(btn => {
      btn.addEventListener('click', () => {
        let voted = false; try { voted = localStorage.getItem(pollKey(id) + '-voted') === '1'; } catch (_) {}
        if (voted) return;
        const data = readPoll(id, DATA.poll.options);
        data[btn.dataset.key] = (data[btn.dataset.key] || 0) + 1;
        try { localStorage.setItem(pollKey(id), JSON.stringify(data)); localStorage.setItem(pollKey(id) + '-voted', '1'); localStorage.setItem(pollKey(id) + '-choice', btn.dataset.key); } catch (_) {}
        sfxNav();
        renderPoll(wrap);
      });
    });
    wrap.querySelector('[data-poll-reset]').addEventListener('click', () => {
      try { localStorage.removeItem(pollKey(id)); localStorage.removeItem(pollKey(id) + '-voted'); } catch (_) {}
      renderPoll(wrap);
    });
  }
  deck.querySelectorAll('[data-poll]').forEach(initPoll);

  /* #15 เติมจักรลงในตัวคั่นบท */
  deck.querySelectorAll('[data-divider-chakra]').forEach(el => { el.innerHTML = chakra('currentColor'); });

  /* #18 kinetic typography — ห่อคำในข้อความที่ทำเครื่องหมาย data-kinetic */
  deck.querySelectorAll('[data-kinetic]').forEach(el => {
    const words = el.textContent.split(' ');
    el.innerHTML = words.map((w, i) => `<span class="kw" style="--ki:${i * 55}ms">${esc(w)}</span>`).join(' ');
  });

  /* #8 ตัวกรองไทม์ไลน์ตามธีม */
  deck.querySelectorAll('[data-tl-filter]').forEach(bar => {
    const tl = bar.parentElement.querySelector('[data-timeline]');
    bar.addEventListener('click', (e) => {
      const btn = e.target.closest('.tlf'); if (!btn || !tl) return;
      const th = btn.dataset.theme;
      bar.querySelectorAll('.tlf').forEach(b => b.classList.toggle('active', b === btn));
      tl.querySelectorAll('[data-tl]').forEach(it => {
        const show = th === 'all' || it.dataset.theme === th;
        it.classList.toggle('tl-hidden', !show);
      });
    });
  });

  /* ====================================================================
     #14 REFLECTION — บันทึก localStorage + สะท้อนที่สไลด์ปิดท้าย
     ==================================================================== */
  const RF_KEY = 'modi-reflection';
  function updateReflectionEcho() {
    let v = ''; try { v = localStorage.getItem(RF_KEY) || ''; } catch (_) {}
    deck.querySelectorAll('[data-reflection-echo]').forEach(el => {
      if (v.trim()) { el.hidden = false; el.innerHTML = `<span class="ce-q">${esc(DATA.reflectionPrompt || '')}</span><span class="ce-a">“${esc(v)}”</span>`; }
      else { el.hidden = true; }
    });
  }
  (function initReflection() {
    const ta = deck.querySelector('[data-reflection]');
    if (!ta) return;
    try { ta.value = localStorage.getItem(RF_KEY) || ''; } catch (_) {}
    let saveT = 0;
    ta.addEventListener('input', () => {
      try { localStorage.setItem(RF_KEY, ta.value); } catch (_) {}
      const saved = ta.closest('.reflection').querySelector('[data-rf-saved]');
      if (saved) { saved.hidden = false; clearTimeout(saveT); saveT = setTimeout(() => { saved.hidden = true; }, 1500); }
      updateReflectionEcho();
    });
  })();

  /* ====================================================================
     #12 DRAG-THE-BALANCE
     ==================================================================== */
  (function initDragScale() {
    const root = deck.querySelector('[data-dragscale]');
    if (!root) return;
    const pool = root.querySelector('[data-pool]');
    const pans = { pos: root.querySelector('[data-pan="pos"]'), neg: root.querySelector('[data-pan="neg"]') };
    const beam = root.querySelector('[data-beam]');
    const readout = root.querySelector('[data-readout]');

    function place(chip, where) {
      chip.dataset.where = where;
      (where === 'pool' ? pool : pans[where]).appendChild(chip);
      update();
    }
    function update() {
      const pos = pans.pos.querySelectorAll('.ds-chip').length;
      const neg = pans.neg.querySelectorAll('.ds-chip').length;
      const diff = pos - neg;
      const ang = Math.max(-14, Math.min(14, -diff * 4));
      beam.style.transform = `rotate(${ang}deg)`;
      pans.pos.style.transform = `translateY(${Math.max(-22, Math.min(22, diff * 6))}px)`;
      pans.neg.style.transform = `translateY(${Math.max(-22, Math.min(22, -diff * 6))}px)`;
      const placed = pos + neg, totalChips = root.querySelectorAll('.ds-chip').length;
      if (placed < totalChips) readout.textContent = `วางแล้ว ${placed}/${totalChips} — ลากที่เหลือขึ้นตาชั่ง`;
      else if (diff > 0) { readout.textContent = `ฝั่งผลงานหนักกว่า (${pos} : ${neg})`; readout.className = 'ds-readout pos'; }
      else if (diff < 0) { readout.textContent = `ฝั่งข้อวิจารณ์หนักกว่า (${pos} : ${neg})`; readout.className = 'ds-readout neg'; }
      else { readout.textContent = `สมดุลพอดี (${pos} : ${neg}) — แล้วคุณจะเอียงไปทางไหน?`; readout.className = 'ds-readout even'; }
      if (placed === totalChips) readout.classList.add('done');
    }

    // ปุ่มลูกศร + แตะชิปในจานเพื่อคืน pool
    root.addEventListener('click', (e) => {
      const arrow = e.target.closest('.ds-arrow');
      const chip = e.target.closest('.ds-chip');
      if (!chip) return;
      if (arrow) { e.stopPropagation(); place(chip, arrow.dataset.move); sfxNav(); return; }
      if (chip.dataset.where !== 'pool') { place(chip, 'pool'); sfxNav(); }
    });
    // คีย์บอร์ด: ← → ย้ายซ้าย/ขวา, Backspace คืน pool
    root.addEventListener('keydown', (e) => {
      const chip = e.target.closest('.ds-chip'); if (!chip) return;
      if (e.key === 'ArrowLeft') { e.preventDefault(); place(chip, 'pos'); sfxNav(); }
      else if (e.key === 'ArrowRight') { e.preventDefault(); place(chip, 'neg'); sfxNav(); }
      else if (e.key === 'Backspace') { e.preventDefault(); place(chip, 'pool'); }
    });
    // ลากด้วย pointer
    let drag = null;
    root.addEventListener('pointerdown', (e) => {
      if (e.target.closest('.ds-arrow')) return;
      const chip = e.target.closest('.ds-chip'); if (!chip) return;
      drag = { chip, x0: e.clientX, y0: e.clientY, moved: false };
    });
    window.addEventListener('pointermove', (e) => {
      if (!drag) return;
      const dx = e.clientX - drag.x0, dy = e.clientY - drag.y0;
      if (!drag.moved && Math.hypot(dx, dy) < 6) return;
      drag.moved = true;
      drag.chip.classList.add('dragging');
      drag.chip.style.transform = `translate(${dx}px, ${dy}px)`;
      pans.pos.classList.toggle('hot', hitPan(e, pans.pos));
      pans.neg.classList.toggle('hot', hitPan(e, pans.neg));
    }, { passive: true });
    window.addEventListener('pointerup', (e) => {
      if (!drag) return;
      const chip = drag.chip;
      chip.classList.remove('dragging'); chip.style.transform = '';
      pans.pos.classList.remove('hot'); pans.neg.classList.remove('hot');
      if (drag.moved) {
        if (hitPan(e, pans.pos)) place(chip, 'pos');
        else if (hitPan(e, pans.neg)) place(chip, 'neg');
        else place(chip, 'pool');
        sfxNav();
      }
      drag = null;
    });
    function hitPan(e, pan) {
      const r = pan.getBoundingClientRect();
      return e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom;
    }
  })();

  /* ====================================================================
     #13 QUIZ SCORE + การ์ดผลคะแนน (canvas)
     ==================================================================== */
  const quizState = {};
  function updateQuizScore() {
    const totalQ = DATA.quiz.length;
    const answered = Object.keys(quizState).length;
    if (answered < totalQ) return;
    const correct = Object.values(quizState).filter(Boolean).length;
    const box = document.getElementById('quiz-score'); if (!box) return;
    box.hidden = false;
    const pct = Math.round((correct / totalQ) * 100);
    box.querySelector('.qs-num').textContent = correct + '/' + totalQ;
    const fg = box.querySelector('.qs-fg'), C = 2 * Math.PI * 34;
    fg.style.strokeDasharray = C; fg.style.strokeDashoffset = C * (1 - correct / totalQ);
    const msg = pct === 100 ? 'เต็ม! คุณจับแก่นบทเรียนได้ครบ 🎯'
      : pct >= 67 ? 'เยี่ยมมาก เข้าใจภาพรวมได้ดี 👍'
      : pct >= 34 ? 'มาถูกทางแล้ว ลองทบทวนอีกนิด 💪'
      : 'ไม่เป็นไร ย้อนดูสไลด์แล้วลองใหม่ได้เสมอ 🌱';
    document.getElementById('qs-msg').textContent = msg;
    if (!box.dataset.shown) { box.dataset.shown = '1'; sfxSting(); box.scrollIntoView({ behavior: motionOn ? 'smooth' : 'auto', block: 'center' }); }
  }
  function downloadResultCard() {
    const totalQ = DATA.quiz.length;
    const correct = Object.values(quizState).filter(Boolean).length;
    const W = 1200, H = 630, cv = document.createElement('canvas');
    cv.width = W; cv.height = H; const x = cv.getContext('2d');
    x.fillStyle = '#f4efe4'; x.fillRect(0, 0, W, H);
    x.fillStyle = '#FF9933'; x.fillRect(0, 0, W, 14);
    x.fillStyle = '#138808'; x.fillRect(0, H - 14, W, 14);
    x.fillStyle = '#0e2f63'; x.textAlign = 'left';
    x.font = '700 34px "Noto Sans Thai", sans-serif';
    x.fillText('นเรนทรา โมดี — กรณีศึกษาผู้นำ', 80, 110);
    x.font = '900 120px "Noto Serif Thai", serif'; x.fillStyle = '#1c7a45';
    x.fillText(correct + ' / ' + totalQ, 80, 300);
    x.fillStyle = '#1d2436'; x.font = '700 46px "Noto Sans Thai", sans-serif';
    x.fillText('คะแนนทดสอบความเข้าใจ', 80, 380);
    x.fillStyle = '#4a5266'; x.font = '400 30px "Noto Sans Thai", sans-serif';
    const pct = Math.round((correct / totalQ) * 100);
    const msg = pct === 100 ? 'เต็ม! จับแก่นบทเรียนได้ครบ' : pct >= 67 ? 'เข้าใจภาพรวมได้ดีมาก' : pct >= 34 ? 'มาถูกทางแล้ว' : 'ลองทบทวนอีกครั้ง';
    x.fillText(msg, 80, 440);
    x.fillStyle = '#8a8475'; x.font = '400 24px "Noto Sans Thai", sans-serif';
    x.fillText('จัดทำเพื่อการศึกษา · นำเสนอทั้งด้านบวกและด้านลบอย่างเป็นกลาง', 80, 560);
    try {
      const a = document.createElement('a');
      a.download = 'modi-quiz-result.png'; a.href = cv.toDataURL('image/png'); a.click();
    } catch (_) {}
  }
  document.getElementById('deck').addEventListener('click', (e) => {
    if (e.target.closest('#qs-dl')) downloadResultCard();
  });

  /* ====================================================================
     #6(ใหม่) TEXT-TO-SPEECH — อ่านสไลด์เป็นเสียงไทย (Web Speech API)
     ==================================================================== */
  const synth = window.speechSynthesis || null;
  let ttsOn = false, thaiVoice = null;
  function pickVoice() {
    if (!synth) return;
    const vs = synth.getVoices() || [];
    thaiVoice = vs.find(v => /^th(-|_|$)/i.test(v.lang)) || vs.find(v => /thai/i.test(v.name)) || null;
  }
  if (synth) { pickVoice(); if (typeof synth.addEventListener === 'function') synth.addEventListener('voiceschanged', pickVoice); }
  function narrationFor(s) {
    const parts = [];
    if (s.title) parts.push(s.title);
    if (s.lead) parts.push(s.lead);
    (s.facts || []).forEach(f => parts.push((f.k ? f.k + ' ' : '') + f.v));
    (s.agenda || []).forEach(a => parts.push(a.head + '. ' + a.body));
    (s.timeline || []).forEach(t => parts.push(t.year + ' ' + t.head + '. ' + t.body));
    (s.cards || []).forEach(c => parts.push(c.head + '. ' + c.body));
    (s.points || []).forEach(p => parts.push(p.head + '. ' + p.body));
    (s.takeaways || []).forEach(t => parts.push(t));
    return parts.join('. ');
  }
  function narrateCurrent() {
    if (!ttsOn || !synth) return;
    try {
      synth.cancel();
      const u = new SpeechSynthesisUtterance(narrationFor(DATA.slides[current]));
      u.lang = 'th-TH'; u.rate = 0.98; u.pitch = 1;
      if (thaiVoice) u.voice = thaiVoice;
      synth.speak(u);
    } catch (_) {}
  }
  function updateTtsBtn() {
    const b = document.getElementById('btn-tts');
    b.setAttribute('aria-pressed', ttsOn ? 'true' : 'false');
    b.querySelector('.ico').innerHTML = ttsOn ? ICONS.tts : ICONS.ttsOff;
    b.querySelector('.lbl').textContent = ttsOn ? 'อ่านออกเสียง' : 'อ่านออกเสียง: ปิด';
  }
  function toggleTts() {
    if (!synth) { alert('เบราว์เซอร์นี้ไม่รองรับการอ่านออกเสียง (Web Speech API)'); return; }
    ttsOn = !ttsOn;
    updateTtsBtn();
    if (ttsOn) { pickVoice(); narrateCurrent(); } else { try { synth.cancel(); } catch (_) {} }
  }
  document.getElementById('btn-tts').addEventListener('click', toggleTts);
  updateTtsBtn();

  /* ====================================================================
     #1(ใหม่) ปุ่มเปิดหน้าต่างผู้นำเสนอ
     ==================================================================== */
  function openPresenter() {
    const base = location.href.split('#')[0];
    const w = window.open(base + '#presenter', 'modi-presenter', 'width=820,height=620');
    if (!w) { alert('โปรดอนุญาตป๊อปอัปเพื่อเปิดหน้าต่างผู้นำเสนอ'); return; }
    setTimeout(broadcastState, 400);
  }
  document.getElementById('btn-present').addEventListener('click', openPresenter);

  /* ====================================================================
     #10(ใหม่) สรุปของฉัน (take-home) — รวม quiz + โพล + reflection + บทเรียน
     ==================================================================== */
  function downloadTakeHome() {
    const W = 1080, H = 1500, cv = document.createElement('canvas');
    cv.width = W; cv.height = H; const x = cv.getContext('2d');
    const wrap = (text, max, lh, fx, fy) => {
      const words = String(text).split(/(\s+)/); let line = '', y = fy;
      for (const w of words) { if (x.measureText(line + w).width > max && line) { x.fillText(line, fx, y); line = w.replace(/^\s+/, ''); y += lh; } else line += w; }
      if (line) { x.fillText(line, fx, y); y += lh; } return y;
    };
    x.fillStyle = '#f4efe4'; x.fillRect(0, 0, W, H);
    x.fillStyle = '#FF9933'; x.fillRect(0, 0, W, 16);
    x.fillStyle = '#138808'; x.fillRect(0, H - 16, W, 16);
    let y = 100; x.textAlign = 'left'; x.fillStyle = '#0e2f63';
    x.font = '900 52px "Noto Serif Thai", serif'; x.fillText('สรุปของฉัน', 80, y);
    x.fillStyle = '#8a8475'; x.font = '400 26px "Noto Sans Thai", sans-serif';
    x.fillText('นเรนทรา โมดี — กรณีศึกษาผู้นำ', 80, y + 40); y += 120;
    // quiz
    const totalQ = DATA.quiz.length, correct = Object.values(quizState).filter(Boolean).length, answered = Object.keys(quizState).length;
    x.fillStyle = '#1c7a45'; x.font = '700 34px "Noto Sans Thai", sans-serif';
    x.fillText('คะแนนทดสอบ', 80, y);
    x.fillStyle = '#1d2436'; x.font = '900 40px "Noto Serif Thai", serif';
    x.fillText(answered ? (correct + ' / ' + totalQ) : 'ยังไม่ได้ทำแบบทดสอบ', 80, y + 50); y += 130;
    // poll
    let pollLabel = 'ยังไม่ได้โหวต';
    try {
      const choice = localStorage.getItem('modi-poll-' + DATA.poll.id + '-choice');
      const opt = DATA.poll.options.find(o => o.key === choice);
      if (opt) pollLabel = opt.label;
    } catch (_) {}
    x.fillStyle = '#d9772a'; x.font = '700 34px "Noto Sans Thai", sans-serif';
    x.fillText('ความเห็นของฉัน', 80, y);
    x.fillStyle = '#1d2436'; x.font = '400 32px "Noto Sans Thai", sans-serif';
    y = wrap(pollLabel, W - 160, 44, 80, y + 50) + 50;
    // reflection
    let refl = ''; try { refl = localStorage.getItem('modi-reflection') || ''; } catch (_) {}
    x.fillStyle = '#0e2f63'; x.font = '700 34px "Noto Sans Thai", sans-serif';
    x.fillText('นิสัยผู้นำที่จะลองใช้', 80, y);
    x.fillStyle = '#1d2436'; x.font = '400 32px "Noto Sans Thai", sans-serif';
    y = wrap(refl ? '“' + refl + '”' : '(ยังไม่ได้กรอก)', W - 160, 44, 80, y + 50) + 50;
    // takeaways
    const sum = DATA.slides.find(s => s.id === 'summary');
    x.fillStyle = '#d9772a'; x.font = '700 34px "Noto Sans Thai", sans-serif';
    x.fillText('3 บทเรียนสำคัญ', 80, y); y += 50;
    x.fillStyle = '#4a5266'; x.font = '400 28px "Noto Sans Thai", sans-serif';
    (sum ? sum.takeaways : []).forEach((t, i) => { y = wrap((i + 1) + '. ' + t, W - 160, 40, 80, y) + 16; });
    x.fillStyle = '#8a8475'; x.font = '400 22px "Noto Sans Thai", sans-serif';
    x.fillText('จัดทำเพื่อการศึกษา · นำเสนอทั้งด้านบวกและด้านลบอย่างเป็นกลาง', 80, H - 60);
    try { const a = document.createElement('a'); a.download = 'modi-my-summary.png'; a.href = cv.toDataURL('image/png'); a.click(); } catch (_) {}
  }
  deck.addEventListener('click', (e) => { if (e.target.closest('#btn-takehome')) downloadTakeHome(); });

  /* ====================================================================
     #1(ใหม่) หน้าต่างผู้นำเสนอ — เรนเดอร์เมื่อเปิดด้วย #presenter
     ==================================================================== */
  function initPresenterView() {
    document.body.classList.add('is-presenter');
    const ld = document.getElementById('loader'); if (ld) ld.remove();
    const S = DATA.slides, N = S.length;
    let pi = 0, pmode = 'slide';
    const root = document.createElement('div');
    root.className = 'pv';
    document.body.appendChild(root);
    const txt = s => (s.lead || (s.takeaways ? s.takeaways[0] : '') || '');
    function render() {
      const cur = S[pi], nxt = S[pi + 1];
      const by = (DATA.presenters && DATA.presenters[cur.id]) || '';
      const nextBy = nxt ? (DATA.presenters && DATA.presenters[nxt.id]) || '' : '';
      const lens = (DATA.lenses && DATA.lenses[cur.id]) || '';
      root.innerHTML = `
        <div class="pv-head">
          <span class="pv-dot"></span> หน้าต่างผู้นำเสนอ · <b>${pi + 1}</b> / ${N}
          <span class="pv-timer" id="pv-timer" title="คลิกเพื่อรีเซ็ต">00:00</span>
        </div>
        <div class="pv-grid">
          <div class="pv-current">
            ${by ? `<div class="pv-by">🎤 นำเสนอโดย <b>${esc(by)}</b></div>` : ''}
            <div class="pv-kicker">${esc(cur.kicker || '')}${lens ? ' · ' + esc(lens) : ''}</div>
            <div class="pv-title">${esc(cur.title || '')}</div>
            <div class="pv-lead">${esc(txt(cur))}</div>
          </div>
          <div class="pv-side">
            <div class="pv-next-card">
              <div class="pv-next-tag">ถัดไป →${nextBy ? ' · 🎤 ' + esc(nextBy) : ''}</div>
              <div class="pv-next-title">${nxt ? esc(nxt.title || nxt.kicker || '') : '— สไลด์สุดท้าย —'}</div>
            </div>
            <div class="pv-notes-box">
              <div class="pv-notes-tag">โน้ตผู้พูด</div>
              <div class="pv-notes">${esc(cur.note || '— ไม่มีโน้ต —')}</div>
            </div>
          </div>
        </div>
        <div class="pv-controls">
          <button type="button" id="pv-prev" ${pi === 0 ? 'disabled' : ''}>◀ ก่อนหน้า</button>
          <button type="button" id="pv-next" ${pi === N - 1 ? 'disabled' : ''}>ถัดไป ▶</button>
        </div>`;
      root.querySelector('#pv-prev').onclick = () => send('prev');
      root.querySelector('#pv-next').onclick = () => send('next');
      root.querySelector('#pv-timer').onclick = resetTimer;
      timerEl = root.querySelector('#pv-timer');
    }
    // ช่องสื่อสารกับหน้าต่าง audience
    let pbc = null; try { pbc = new BroadcastChannel('modi-deck'); } catch (_) {}
    function send(action) {
      if (action === 'next' && pi < N - 1) pi++;
      else if (action === 'prev' && pi > 0) pi--;
      render();
      if (pbc) { try { pbc.postMessage({ type: 'remote', action }); } catch (_) {} }
    }
    if (pbc) {
      pbc.onmessage = (ev) => {
        const m = ev.data || {};
        if (m.type === 'nav' && typeof m.index === 'number') { pi = m.index; if (m.mode) pmode = m.mode; render(); }
      };
      try { pbc.postMessage({ type: 'request' }); } catch (_) {}
    }
    // คีย์ลูกศรในหน้าต่างผู้นำเสนอ
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') { e.preventDefault(); send('next'); }
      else if (e.key === 'ArrowLeft' || e.key === 'PageUp') { e.preventDefault(); send('prev'); }
    });
    // ตัวจับเวลา
    let timerEl = null, t0 = Date.now();
    function resetTimer() { t0 = Date.now(); }
    setInterval(() => {
      if (!timerEl) return;
      const s = Math.floor((Date.now() - t0) / 1000);
      timerEl.textContent = String(Math.floor(s / 60)).padStart(2, '0') + ':' + String(s % 60).padStart(2, '0');
    }, 1000);
    render();
  }

  /* ====================================================================
     เริ่มทำงาน
     ==================================================================== */
  // ใช้ธีมที่เคยบันทึกไว้ (ถ้ามี)
  try { const saved = localStorage.getItem(THEME_KEY); if (saved) applyTheme(saved); } catch (_) {}

  startObserver();
  updateUI();
  updateTimelineRails();

  // #4 กู้คืนสไลด์จาก URL hash (เช่น เปิดด้วย ...#policies)
  const hashIdx = slideIndexFromHash();
  if (hashIdx >= 0) {
    current = hashIdx;
    updateUI(); updateNotes();
    // เลื่อนแบบทันที (ไม่ smooth) ทั้งตอนนี้และหลัง layout/โหลดเสร็จ เพื่อความชัวร์
    const jump = () => slides[hashIdx].scrollIntoView({ behavior: 'auto', block: 'start' });
    jump();
    setTimeout(jump, 60);
    window.addEventListener('load', jump);
  }

  // เผยสไลด์แรกทันทีถ้าอยู่บนสุด
  requestAnimationFrame(() => { if (slides[0]) revealEl(slides[0].querySelector('.kicker')); });

})();
