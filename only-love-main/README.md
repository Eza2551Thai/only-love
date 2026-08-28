# 💌 LDR Modern - Love Letter Website
# เว็บไซต์จดหมายรักสำหรับ Long Distance Relationship

---

## 📖 เกี่ยวกับโครงการ

เว็บไซต์จดหมายรักแบบ interactive สำหรับคู่รักที่อยู่ห่างไกลกัน (LDR)
- GPS realtime คำนวณระยะทางจริง
- Countdown จากวันที่คบ
- Anniversary ทุกวันที่ 29
- Animation ที่นุ่มนวล (blur 8px + slide + scale + bounce 0.6s)

---

## ✨ ฟีเจอร์

| ฟีเจอร์ | รายละเอียด |
|---------|-----------|
| 📍 GPS Realtime | ติดตามตำแหน่งแฟนจริงผ่าน `watchPosition` |
| 📏 Distance | คำนวณระยะทางจากกรุงเทพ $\rightarrow$ ตำแหน่งแฟน |
| 🗺️ Reverse Geocoding | แปลงพิกัดเป็นชื่อสถานที่จริง |
| ⏰ Countdown | นับวันที่คบ 29/07/2569 $\rightarrow$ วันนี้ |
| 💕 Anniversary | คบรอบทุกวันที่ 29 ของทุกเดือน |
| 🌙 Night Sky | ดาวระยิบระยับ + Glassmorphism |
| 💜 Burst Hearts | แอนิเมชันหัวใจระเบิด |
| 💌 Envelope | ซองจดหมายเปิดแบบ smooth |
| 🎁 Surprise BG | การ์ดรูปกระจายแบบ physics + ลากได้ + ดอกไม้ลอย เมื่อเปิดจดหมาย |
| 💑 Couple Pair | fin1+fin2 จับคู่ + หัวใจ connector + glow effect |
| 🔀 Smooth Transitions | blur 8px + slide 20px + scale .95 + bounce 0.6s |
| 🎭 Micro-Animations | cardUp, shake, bobble, twinkle |

---

## 🚀 วิธีใช้งาน

### เปิดเว็บ
```
เปิด index.html ในบราวเซอร์
หรือเปิดผ่าน Vercel (HTTPS) สำหรับ GPS บนมือถือ
```

### วิธีเล่น
1. **Screen 1:** กด "รัก" หรือ "ไม่รัก" (6 ด่าน)
2. **GPS:** กด "เปิด GPS" → ตำแหน่งแฟนจะถูกติดตาม realtime
3. **Screen 2:** ดูโปรไฟล์ + ระยะทาง + countdown + anniversary
4. **Screen 3:** คลิกซองจดหมายเพื่อเปิด

---

## 🛠️ วิธีแก้ไข

### เปลี่ยนตำแหน่งเรา (fix)
```javascript
// js/app.js
const SELF_LOC = { lat: 13.6936, lng: 100.6389 };
```

### เปลี่ยนวันที่คบ
```javascript
// js/app.js
const START = new Date('2026-07-29T00:00:00');
```

### เปลี่ยนรูปโปรไฟล์
```html
<!-- index.html -->
<img id="screen2Img" src="img/รูปใหม่.png">
```

### เปลี่ยนข้อความจดหมาย
```html
<!-- index.html -->
<div class="letter-body">
  <p>ข้อความใหม่...</p>
  <div class="letter-divider">💜</div>
  <p>ส่วนที่สอง...</p>
</div>
```

### เปลี่ยนคำถาม
```javascript
// js/app.js → SCENES array
{ q: 'คำถามใหม่?', e: '✈️', g: 'gf_new.gif' }
```

---

## 📱 Responsive

| อุปกรณ์ | รองรับ |
|---------|--------|
| Desktop | ✅ |
| Tablet | ✅ |
| Mobile | ✅ |

---

## 🔧 เทคโนโลยี
 
- **HTML5** - โครงสร้าง
- **CSS3** - Glassmorphism + Animation
- **JavaScript (ES6+)** - GPS + Web Audio API
- **Local Fonts** - Athiti (Light/Bold)
- **OpenStreetMap** - Reverse Geocoding
- **Vercel** - Hosting (HTTPS)

---

## 📝 บันทึก

- ดูบันทึกทั้งหมดใน `LOG.md`
- GPS ต้องใช้ HTTPS (Vercel) สำหรับมือถือ
- มีเพลงประกอบพื้นหลัง (5% volume, fade-in, loop)
- จดหมายมี gradient signature + pink first-letter + divider 💜
- Animation ใช้ CSS `.screen.active` class (ไม่ใช่ JS opacity)
- Physics ใช้ `requestAnimationFrame` สำหรับ cards ที่เด้งกระจาย

---

**OwONeko** - สิงหาคม 2569 💌
