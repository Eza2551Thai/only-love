# 💌 LDR Modern - Project Log
# บันทึกโครงการ (สำหรับ AI และ Human)

---

## 📋 สรุปโครงการ

**ชื่อ:** LDR Modern - Love Letter for Long Distance Relationship
**ที่อยู่:** `C:\Users\OwONeko\Desktop\only-love-main\only-love-main`
**Host:** Vercel.app (ทำเสร็จแล้ว)
**สถานะ:** ✅ ทำงานได้ปกติ

---

## 🎯 วัตถุประสงค์

เว็บไซต์จดหมายรักแบบ interactive สำหรับคู่รัก Long Distance Relationship
- 3 หน้าจอ: คำถาม → โปรไฟล์ → จดหมาย
- GPS realtime ของ "แฟน" (คนเปิดเว็บ) คำนวณระยะทางจากกรุงเทพ (เรา fix)
- Countdown จากวันที่คบ 29/07/2569
- Anniversary ทุกวันที่ 29 ของทุกเดือน

---

## 📁 โครงสร้างไฟล์

```
only-love-main/
├── index.html          ← หน้า HTML หลัก (3 screens)
├── css/
│   └── style.css       ← สไตล์ทั้งหมด
├── js/
│   └── app.js          ← ลอจิกทั้งหมด
├── font/
│   ├── Athiti-Light.ttf
│   └── Athiti-Bold.ttf
├── img/
│   ├── gf1.jpg         ← รูปโปรไฟล์ + surprise single
│   ├── gf2-6.jpg       ← surprise singles
│   ├── fin1.jpg        ← couple pair (ซ้าย)
│   └── fin2.jpg        ← couple pair (ขวา)
├── music/
│   └── Multo (Instrumental Version).mp3
├── LOG.md              ← ไฟล์นี้
└── README.md           ← คู่มือการใช้งาน
```

---

## 🎨 ธีม (LDR Modern v8.1)

### สี
| ตัวแปร | สี | ใช้สำหรับ |
|--------|-----|----------|
| `--bg` | `#0B0D17` | พื้นหลังหลัก |
| `--blue` | `#6C63FF` | ไฮไลท์หลัก |
| `--pink` | `#FF6B9D` | ความรัก |
| `--cyan` | `#00D4FF` | ดาว/แสง |
| `--gold` | `#FFD93D` | ดาว |

### ฟอนต์
- **Heading/Body:** Inter
- **Thai:** Sarabun

---

## 📱 หน้าจอ (Screens)

### Screen 1: คำถาม
- Location Bar: "คุณอยู่ที่" (แฟน GPS) + "คนที่รักอยู่ที่" (เรา fix กรุงเทพ)
- คำถาม "รักกันไหม?" + GIF
- 6 ด่าน → กด "ไม่รัก" 5 ครั้ง → ปุ่ม LOVE!

### Screen 2: โปรไฟล์
- Profile Card (Video Call Style)
- Location Bar (เดียวกับ Screen 1)
- Distance Counter (GPS realtime)
- Countdown (คบ 29/07/2569 → วันนี้)
- Anniversary (คบรอบทุกวันที่ 29)
- ปุ่มเปิดจดหมาย + ปุ่มกลับ

### Screen 3: จดหมาย + Surprise BG
- Envelope (ซองจดหมาย) + Seal (ตราประทับ)
- คลิกเพื่อเปิด → เนื้อหาจดหมาย + Surprise BG
- **Surprise BG:** การ์ด fin1+fin2 couple pair + gf1-6 singles กระจายแบบ physics
- ลากได้ทุกใบ, ชนซองเด้งออก, ชนขอบจอเด้ง
- ดอกไม้ 🌷🌸🌺✿ + ดาว ✨⭐🌟 ลอยอัตโนมัติ
- Floating Hearts background
- ปุ่มกลับ

---

## 📍 GPS & Distance

### ตำแหน่ง
| ฝั่ง | ค่า | ที่มา |
|------|-----|-------|
| เรา (SELF) | `13.6936, 100.6389` = กรุงเทพฯ | Fix ใน code |
| แฟน (PARTNER) | GPS จริง | `watchPosition` realtime |

### วิธีคำนวณ
- สูตร Haversine
- Distance = จากเรา(fix กรุงเทพ) → แฟน(GPS)
- Reverse Geocoding ผ่าน OpenStreetMap (แปลงพิกัดเป็นชื่อสถานที่)
- Location Cache เพื่อความเร็ว

---

## ⏰ Countdown & Anniversary

### Countdown
- วันเริ่มคบ: 29/07/2569
- นับจากวันนั้น → วันนี้ (ไม่ใช่นับถอยหลัง)
- `setInterval` ทุก 1 วินาที
- แสดง Days / Hours / Mins

### Anniversary
- คบรอบทุกวันที่ 29 ของทุกเดือน
- นับจำนวนเดือนที่คบ
- แสดงวันที่เหลือถึงครบรอบถัดไป

---

## 🔄 Animation System (v7.1)

### Screen Transitions (blur + slide + bounce)
- ใช้ `.screen.active` class สำหรับ transition ทุกหน้า
- CSS `transition: opacity .6s, filter .6s, transform .6s` พร้อม `cubic-bezier(.4,0,.2,1)` easing
- Effect: fade out + blur 8px + scale .95 + slide down 20px → fade in + blur 0 + scale 1 + slide up
- Duration: 0.6s ทุก transition (ช้าลงเล็กน้อยจาก 0.5s ให้นุ่มนวลขึ้น)

### Micro-Interactions
| Animation | Duration | Effect |
|-----------|----------|--------|
| `cardUp` | 0.7s | หน้าจอเลื่อนขึ้น + bounce |
| `shake` | 0.4s | สั่นเมื่อกด "ไม่" |
| `bobble` | 3s | Emoji ลอยขึ้นลง |
| `twinkle` | 2-5s | ดาวกะพริบ |
| `heartBeat` | 1.4s | หัวใจเต้น |
| `linkPulse` | 2s | เส้นเชื่อมกะพริบ |
| `burstFly` | 0.85s | หัวใจระเบิด |
| `envFloat` | 4s | ซองจดหมายลอย |
| `fhUp` | 10-22s | หัวใจลอยขึ้น |
| `decorFloat` | 5-15s | ดอกไม้+ดาวลอยขึ้น |
| `hintBounce` | 2s | คำใบ้สั่นขึ้นลง |
| `btnDodge` | .35s | ปุ่ม "ไม่" หลบไปตาม --dx/--dy (v7.2) |

### Letter Typography (v7.2)
- **Letter date:** `font-size: .85rem`, `letter-spacing: 4px`, cyan color, bottom border
- **Letter greeting:** `font-size: 1.7rem`, pink color, text-shadow glow
- **Letter body:** `font-size: 1.30rem`, `line-height: 2.2`, soft white
- **Letter divider:** `💜` with gradient lines (left/right)
- **Signature:** Gradient text (blue → pink), italic, bold, `1.30rem`
- **Postscript:** Gold color, italic, `1.15rem`
- **Letter spacing:** `letter-spacing: .3px` + `margin-bottom: 16px` ร่างๆ
- **No first-letter highlight** — ทุกตัวอักษรสีเดียวกัน
- **Envelope width:** 560px, max-height 1100px (รองรับข้อความใหญ่)
| `decorFloat` | 5-15s | ดอกไม้+ดาวลอยขึ้น |

### Physics System (v7.1)
- **requestAnimationFrame** loop สำหรับ cards ที่เด้งกระจาย
- **Friction** (`0.997`) — cards ช้าลงตามธรรมชาติ (เร็วกว่าเดิมเล็กน้อย)
- **Dynamic Rotation** — หมุนตาม velocity (`rot += vx * 0.25`), decay (`rot *= 0.96`)
- **Envelope Hitbox** — ซองจดหมายเป็น hitbox, cards ชนแล้วเด้ง柔和 hơn (BOUNCE_ENV = 0.65)
- **Padding** — 8px รอบซองก่อน collision
- **Perpendicular dampening** — `vx/vy *= 0.95` ขณะ bounce ให้หมุนน้อยลง
- **Screen Edges** — bounce ขอบจอด้วย `BOUNCE_EDGE = 0.78`
- **Min Speed** — เมื่อช้าเกินไป (`0.12`) จะได้ velocity ใหม่ (ไม่หยุดนิ่ง)
- **Draggable** — ลากได้ทุกใบ, pause physics ขณะลาก, resume ด้วย velocity ใหม่

### Couple Pair (fin1 + fin2)
- รูปคู่อยู่ด้วยกันเป็นคู่
- หัวใจ 💜 ตรงกลาง + glow effect
- border-radius ต่างกัน (fin1 ซ้าย, fin2 ขวา) ให้ feel จับคู่
- `drop-shadow` glow สีชมพู

### Performance
- ใช้ `will-change` สำหรับ animation ที่ซับซ้อน
- ใช้ `transform` แทน `top/left` (GPU accelerated)
- ใช้ `cubic-bezier(.4,0,.2,1)` สำหรับ easing ที่นุ่มนวล
- ใช้ `@keyframes` แทน JS animation
- `object-fit: cover` สำหรับ thumbnails ลดกระตุก

---

## 🔧 วิธีแก้ไข

### เปลี่ยนตำแหน่งคู่รัก (เรา)
แก้ใน `js/app.js`:
```javascript
const SELF_LOC = { lat: 13.6936, lng: 100.6389 };
```

### เปลี่ยนวันที่คบ
แก้ใน `js/app.js`:
```javascript
const START = new Date('2026-07-29T00:00:00');
```

### เปลี่ยนรูปโปรไฟล์
แก้ใน `index.html`:
```html
<img id="screen2Img" src="img/รูปใหม่.png">
```

### เปลี่ยนข้อความจดหมาย
แก้ใน `index.html` → `<div class="letter-body">...</div>`

### เปลี่ยนคำถาม
แก้ใน `js/app.js` → `SCENES` array

---

## 🐛 ปัญหาที่พบและแก้ไข

| ปัญหา | สาเหตุ | วิธีแก้ |
|--------|--------|--------|
| GPS ไม่ทำงานบนมือถือ | ไม่ได้ใช้ HTTPS | Host บน Vercel |
| Distance แสดง 0 | แฟนอยู่กรุงเทพเหมือนกัน | ปกติ |
| Countdown แสดง 00/00/00 | เริ่มคบ 29/07/2569 ยังไม่ถึง | แก้ logic ให้นับ FROM ไม่ใช่ TO |
| Page 2 card ถูกตัด | `overflow: hidden` | แก้เป็น `overflow-y: auto` |
| HeartBeat keyframes ซ้ำ | CSS ประกาศ 2 ที่ | รวมเป็นที่เดียว |
| หน้าจอกลับไม่ได้ | switchScreen ไม่รีเซ็ตเกม | แก้ goToScreen1() เรียก startGame() |

---

## 📝 ประวัติการแก้ไข

### v7.2 (ปัจจุบัน)
- ✅ เปลี่ยนคำว่า "คิดถึง" → "รัก" ทั้งหมด (คำถาม, ปุ่ม, ข้อความตอบ, LOG, README)
- ✅ Letter text ใหญ่ขึ้น: body 1.30rem, greeting 1.7rem, sig 1.30rem, ps 1.15rem, date .85rem
- ✅ Envelope กว้างขึ้น 560px, letter max-height 1100px
- ✅ เอา first-letter highlight ออก (ทุกตัวอักษรสีเดียวกัน)
- ✅ ปุ่ม "ไม่" dodges ไปมาเมื่อกด (`btnDodge` animation + `--dx`/`--dy` random)
- ✅ letter-spacing .3px + first paragraph ไม่ indent
- ✅ JS version: v7.2 Final
- ✅ CSS version: v7.2 Final

### v7.1
- ✅ Letter typography: gradient signature, divider 💜, bottom border date, glow greeting
- ✅ Smoother envelope collision: BOUNCE_ENV 0.65 (soft), padding 8px, perpendicular dampening
- ✅ Page transitions: blur 8px + slide down 20px + scale .95, 0.6s duration
- ✅ Envelope glass: gradient background + inner glow border
- ✅ Rotation decay: `rot *= 0.96` (cards level out over time)
- ✅ JS version: v7.1 Final
- ✅ CSS version: v7.1 Final

### v7.0
- ✅ Couple pair: fin1+fin2 matched, heart 💜 connector, glow effect, asymmetric border-radius
- ✅ Physics upgrade: friction (0.998), dynamic rotation (rot += vx * 0.3), min speed re-kick
- ✅ Bounce coefficient 0.82 สำหรับ smoother bounce ทั้ง screen edges + envelope hitbox
- ✅ CSS upgrade: card glow shadow, border-color on drag, couple-pair drop-shadow
- ✅ JS version: v7.0 Final
- ✅ CSS version: v7.0 Final
- ✅ Background music: fade-in 5% volume, loop
- ✅ Screen switching fixed: goToScreen2() removes active from all screens
- ✅ Envelope z-index: 100 (cards behind letter)
- ✅ Letter font: 1.1rem, line-height 2, env width 520px
- ✅ Removed: duplicate functions, dead code, unused music code

### v6.0
- ✅ Surprise BG inside screen3 (not popup overlay)
- ✅ Physics-based card movement (requestAnimationFrame)
- ✅ Cards pop out from envelope center
- ✅ Envelope as hitbox collision
- ✅ spawnDecor() auto-generates petals + sparkles
- ✅ Removed Multo.mp3 popup music
- ✅ ลบ duplicate functions: `SP_IMAGES`, `openSurprise()`, `closeSurprise()` ซ้ำกัน 2 ชุด
- ✅ ลบ dead code: unused forEach loop ใน drag logic
- ✅ แก้ decoration class ternary ที่ซับซ้อนเกินไป
- ✅ ตรวจสอบ state variables: `spAudio`, `isMuted` ประกาศถูกต้อง
- ✅ ตรวจสอบ single definitions: ทุกฟังก์ชันมีแค่ 1 definition
- ✅ ลดขนาดไฟล์: 682 → 553 บรรทัด (-19%)

### v5.0 - v5.3
- ✅ Local Athiti fonts (Light 100-500, Bold 600-900), ลบ Google Fonts
- ✅ Background music: fade-in/out loop ที่ 5% volume
- ✅ Surprise Popup: couple pair + single cards + draggable + decorations
- ✅ Mute toggle (🔊/🔇)
- ✅ Screen switching: envelopeBack → popup close → Screen2
- ✅ goToScreen3(): reset envelope `.open` + close popup
- ✅ UI polish: button hover/active, `valPulse`, `prefers-reduced-motion`
- ✅ Mobile responsive: 24px margins, hidden scrollbar, blur(20px)
- ✅ Profile image: `img/gf1.jpg`

### v4.0
- ✅ Rebuild animation system: fade + blur 0.5s ทุกหน้าจอ
- ✅ ใช้ CSS `.screen.active` class แทน JS opacity/transform
- ✅ เพิ่ม micro-animations: cardUp, shake, bobble, burst, float
- ✅ ลบ scrollbar ทั้งหมด (html, body, #screen2)
- ✅ Optimize code: ลด code 50%+ พร้อม comment ไทย/อังกฤษ
- ✅ เปลี่ยน class names: กระชับ + ใช้ BEM-like
- ✅ เพิ่ม `will-change` สำหรับ GPU acceleration
- ✅ Back button: กลับหน้า 1 → รีเซ็ตคำถาม

### v3.0
- ✅ GPS: เรา=fix กรุงเทพ, แฟน=GPS realtime
- ✅ Countdown: คบ 29/07/2569 → วันนี้
- ✅ Anniversary: คบรอบทุกวันที่ 29
- ✅ Page 2: เพิ่ม Location Bar + Anniversary
- ✅ Optimized: ลบ console.log, รวม keyframes, switchScreen()
- ✅ CSS: Page 2 overflow-y:auto, responsive

### v2.0
- ✅ เปลี่ยนธีม Dark Romance → LDR Modern
- ✅ Stars, Glassmorphism, Location Bar

### v1.0
- ✅ Dark Romance theme, 3D Origami, Web Audio API

---

## 💡 หมายเหตุสำหรับ AI

### สิ่งที่ต้องรู้
1. **3 Screens:** `#screen1`, `#screen2`, `#screen3` (ใช้ class `.active` สำหรับแสดง)
2. **GPS:** ใช้ `watchPosition` realtime → ตำแหน่ง "แฟน"
3. **We = fix:** `SELF_LOC` คงที่ กรุงเทพ
4. **Countdown:** FROM start date TO now (ไม่ใช่ countdown TO target)
5. **Screen Switch:** ใช้ `.classList.add('active')` / `.classList.remove('active')`
6. **Host:** Vercel.app (HTTPS) → GPS ทำงานบนมือถือ

### สิ่งที่ไม่ควรแก้
- ❌ อย่าลบ `will-change` / `backdrop-filter`
- ❌ อย่าลบ HTTPS requirement
- ❌ อย่าลบ CSS transitions

---

## 👤 ผู้สร้าง

**OwONeko** - สิงหาคม 2569 💌
