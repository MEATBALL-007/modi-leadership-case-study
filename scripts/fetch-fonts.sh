#!/usr/bin/env bash
# ดาวน์โหลดฟอนต์ไทย (variable woff2 subset) มาเก็บไว้ใน fonts/
# ต้องต่อเน็ต "ครั้งเดียว" — หลังจากนั้น build.js ทำงาน offline ได้
# รัน:  bash scripts/fetch-fonts.sh
set -euo pipefail
cd "$(dirname "$0")/.."
mkdir -p fonts
UA="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36"

dl () { curl -fsSL -H "User-Agent: $UA" "$2" -o "fonts/$1"; echo "  ✓ fonts/$1"; }

echo "ดาวน์โหลดฟอนต์..."
dl sans-thai.woff2  "https://fonts.gstatic.com/s/notosansthai/v29/iJWQBXeUZi_OHPqn4wq6hQ2_hbJ1xyN9wd43SofNWcdfKI2hX2g.woff2"
dl sans-latin.woff2 "https://fonts.gstatic.com/s/notosansthai/v29/iJWQBXeUZi_OHPqn4wq6hQ2_hbJ1xyN9wd43SofNWcdfPI2h.woff2"
dl serif-thai.woff2 "https://fonts.gstatic.com/s/notoserifthai/v28/k3kHo80MPvpLmixYH7euCxWpSMu3-gcWGj0hHAKGvUQleOfz-UhI.woff2"
dl serif-latin.woff2 "https://fonts.gstatic.com/s/notoserifthai/v28/k3kHo80MPvpLmixYH7euCxWpSMu3-gcWGj0hHAKGvUQlePPz-Q.woff2"
echo "เสร็จ — รันต่อ: node build.js"
