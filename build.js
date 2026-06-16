#!/usr/bin/env node
/* ============================================================================
   build.js — ประกอบไฟล์ self-contained `index.html`
   - ฝังฟอนต์ไทย (woff2) เป็น base64 ใน @font-face  → ไม่มี fetch ภายนอก
   - inline styles.css, content.js, app.js เข้า template.html
   วิธีใช้:  node build.js          (รัน offline ได้ ใช้ฟอนต์ที่ cache ไว้ใน fonts/)
   ============================================================================ */
'use strict';
const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const SRC = path.join(ROOT, 'src');
const FONTS = path.join(ROOT, 'fonts');

const read = p => fs.readFileSync(p, 'utf8');
const b64 = p => fs.readFileSync(p).toString('base64');

/* ---- unicode-range ที่ตรงกับ subset ที่ดาวน์โหลดมา (thai + latin) ---- */
const RANGE = {
  thai:  'U+02D7, U+0303, U+0331, U+0E01-0E5B, U+200C-200D, U+25CC',
  latin: 'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD',
};

/* ไฟล์ฟอนต์เป็น variable woff2 → ประกาศ font-weight: 100 900 ให้ครอบทุกน้ำหนัก */
function face(family, file, range) {
  const data = b64(path.join(FONTS, file));
  return `@font-face{font-family:'${family}';font-style:normal;font-weight:100 900;font-display:swap;` +
         `src:url(data:font/woff2;base64,${data}) format('woff2');unicode-range:${range};}`;
}

function buildFonts() {
  const need = ['sans-thai.woff2', 'sans-latin.woff2', 'serif-thai.woff2', 'serif-latin.woff2'];
  for (const f of need) {
    if (!fs.existsSync(path.join(FONTS, f))) {
      console.error(`\n  ✗ ไม่พบไฟล์ฟอนต์: fonts/${f}\n    รัน scripts/fetch-fonts.sh (ต้องต่อเน็ตครั้งเดียว) ก่อน build\n`);
      process.exit(1);
    }
  }
  return [
    face('Noto Sans Thai',  'sans-thai.woff2',  RANGE.thai),
    face('Noto Sans Thai',  'sans-latin.woff2', RANGE.latin),
    face('Noto Serif Thai', 'serif-thai.woff2', RANGE.thai),
    face('Noto Serif Thai', 'serif-latin.woff2', RANGE.latin),
  ].join('\n');
}

/* ฝังภาพพอร์เทรตเป็น base64 (ถ้ามีไฟล์ assets/modi.jpg) — ไม่มีก็ใช้ placeholder */
function buildPortrait() {
  const p = path.join(ROOT, 'assets', 'modi.jpg');
  if (!fs.existsSync(p)) {
    console.log('  · ไม่พบ assets/modi.jpg — ใช้ภาพ placeholder แทน');
    return 'const MODI_PHOTO = "";';
  }
  return 'const MODI_PHOTO = "data:image/jpeg;base64,' + b64(p) + '";';
}

function main() {
  const template = read(path.join(SRC, 'template.html'));
  const out = template
    .replace('{{FONTS}}',    () => buildFonts())
    .replace('{{STYLES}}',   () => read(path.join(SRC, 'styles.css')))
    .replace('{{PORTRAIT}}', () => buildPortrait())
    .replace('{{CONTENT}}',  () => read(path.join(SRC, 'content.js')))
    .replace('{{APP}}',      () => read(path.join(SRC, 'app.js')));

  const dest = path.join(ROOT, 'index.html');
  fs.writeFileSync(dest, out, 'utf8');

  const kb = (Buffer.byteLength(out, 'utf8') / 1024).toFixed(0);
  console.log(`\n  ✓ สร้าง index.html สำเร็จ  (${kb} KB, self-contained)`);
  console.log(`    เปิดด้วยการดับเบิลคลิกได้เลย — ไม่ต้องต่อเน็ต\n`);
}

main();
