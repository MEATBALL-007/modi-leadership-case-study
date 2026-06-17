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

  /* ---------- เรนเดอร์เนื้อหาในแต่ละสไลด์ ---------- */
  function slideInner(s, idx) {
    const cat = DATA.categories[s.cat] || '';
    const head = `
      <div class="kicker" data-reveal>${esc(s.kicker)} <span class="cat-pill">${esc(cat)}</span></div>`;

    if (s.type === 'hero') {
      return `
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
      return `${head}
        <h2 data-reveal style="--d:80ms">${esc(s.title)}</h2>
        ${s.lead ? `<p class="lead" data-reveal style="--d:180ms">${esc(s.lead)}</p>` : ''}
        <div class="timeline" data-timeline>
          <div class="rail-fill"></div>
          ${s.timeline.map((t, i) => `<div class="tl-item ${t.accent ? 'accent' : ''} ${t.warn ? 'warn' : ''}" data-reveal data-tl style="--d:${i * 140}ms">
            <div class="dot"></div>
            <div class="tl-year">${esc(t.year)}</div>
            <div class="tl-head">${esc(t.head)}</div>
            <div class="tl-body">${esc(t.body)}</div>
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
                <div class="slabel">${esc(st.label)}</div>
                ${st.src ? `<div class="cite">ที่มา: ${esc(st.src)}</div>` : ''}</div>` : '';
            return `<div class="bigcard" data-reveal style="--d:${200 + i * 130}ms">
              <div class="bico">${ICONS[c.icon] || ''}</div>
              <div class="tag">${esc(c.tag)}</div>
              <div class="bhead">${esc(c.head)}</div>
              <div class="bbody">${esc(c.body)}</div>
              ${statHTML}
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
        </div>`;
    }

    if (s.type === 'stats-grid') {
      return `${head}
        <h2 data-reveal style="--d:80ms">${esc(s.title)}</h2>
        ${s.lead ? `<p class="lead" data-reveal style="--d:180ms">${esc(s.lead)}</p>` : ''}
        <div class="stats-grid">
          ${s.stats.map((st, i) => `<div class="stat-big" data-reveal style="--d:${220 + i * 120}ms">
            <div class="num"><span data-count="${st.value}" data-prefix="${esc(st.prefix||'')}" data-suffix="${esc(st.suffix||'')}"${st.plain ? ' data-plain="1"' : ''}>${esc(st.prefix||'')}0${esc(st.suffix||'')}</span></div>
            <div class="slabel">${esc(st.label)}</div>
            ${st.src ? `<div class="cite">ที่มา: ${esc(st.src)}</div>` : ''}
          </div>`).join('')}
        </div>`;
    }

    if (s.type === 'balance') {
      return `${head}
        <h2 data-reveal style="--d:80ms">${esc(s.title)}</h2>
        <div class="balance-wrap" data-reveal style="--d:180ms">
          <div class="balance-col pos">
            <div class="bcol-label">${esc(s.prosLabel)}</div>
            <ul>${s.pros.map(p => `<li>${esc(p)}</li>`).join('')}</ul>
          </div>
          <div class="balance-scale">${scaleSVG()}</div>
          <div class="balance-col neg">
            <div class="bcol-label">${esc(s.consLabel)}</div>
            <ul>${s.cons.map(p => `<li>${esc(p)}</li>`).join('')}</ul>
          </div>
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
  }
  function revealSlide(sec) {
    sec.querySelectorAll('.split-title').forEach(t => t.classList.add('is-visible'));
    const items = sec.querySelectorAll('[data-reveal]');
    items.forEach(el => el.classList.add('is-visible'));
    sec.querySelectorAll('[data-count]').forEach(countUp);
    fillTimeline(sec);
  }
  function resetSlide(sec) {
    sec.querySelectorAll('[data-reveal]').forEach(el => el.classList.remove('is-visible'));
    sec.querySelectorAll('.split-title').forEach(t => t.classList.remove('is-visible'));
    sec.querySelectorAll('[data-count]').forEach(el => { el.dataset.done = ''; el.textContent = (el.dataset.prefix || '') + '0' + (el.dataset.suffix || ''); });
    const rf = sec.querySelector('.rail-fill'); if (rf) rf.style.height = '0';
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
    current = i;
    updateUI();
    updateNotes();
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
        current = parseInt(e.target.dataset.index, 10);
        updateUI(); updateNotes();
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
    else if (k === '?' || (k === '/' && e.shiftKey)) { e.preventDefault(); toggleHelp(); }
    else if (k === 'escape') { toggleNotes(false); toggleHelp(false); }
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
  let scrollRAF = 0;
  function onScroll() {
    if (mode === 'slide') return;
    const h = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = (h > 0 ? (window.scrollY / h) * 100 : 0) + '%';
    updateTimelineRails();
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
