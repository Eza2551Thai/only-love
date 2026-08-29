/* =============================================
   LDR MODERN — JavaScript (v8.1 Proportional Scale)
   ============================================= */

/* --- CONSTANTS --- */
const DIST_KM  = [300, 600, 1200, 2200, 3200, 4500];
const GIFS     = [
  'https://media.tenor.com/76BaX0eo304AAAAj/kitty-kitty-heart.gif',
  'https://media1.tenor.com/m/wVAjxnPa81IAAAAd/cat-cat-gif.gif',
  'https://media1.tenor.com/m/f6ts3WWJa-8AAAAC/funny-cats-funny.gif',
  'https://media.tenor.com/C35t4Pf5GlgAAAAi/peach-and-goma-cute.gif',
  'https://media1.tenor.com/m/kEZzd8WrRpAAAAAC/peach-peach-and-goma.gif',
  'https://media1.tenor.com/m/troWhJKIjZsAAAAC/hey-cat.gif'
];
const YES_GIF  = 'https://media.giphy.com/media/3oriO0OEd9QIDdllqo/giphy.gif';
const LOVE_GIF = 'https://media1.tenor.com/m/qR1sGRNmfqsAAAAC/besito-catlove.gif';
const SELF_LOC = { lat: 13.6936, lng: 100.6389 };
const START = new Date('2026-07-29T00:00:00');
const SCENES = [
  { q: 'รักกันไหม? 💭',           e: '✈️',  g: 'https://media.tenor.com/76BaX0eo304AAAAj/kitty-kitty-heart.gif' },
  { q: 'รักมากขึ้นเรื่อยๆรึเปล่า? 🥺', e: '💌', g: 'https://media1.tenor.com/m/wVAjxnPa81IAAAAd/cat-cat-gif.gif' },
  { q: 'อยากเจอเค้าบ้างไหม? 🤗',       e: '✈️', g: 'https://media1.tenor.com/m/f6ts3WWJa-8AAAAC/funny-cats-funny.gif' },
  { q: 'รอเค้าได้มั้ยครับ? 🥹',        e: '💜', g: 'https://media.tenor.com/C35t4Pf5GlgAAAAi/peach-and-goma-cute.gif' },
  { q: 'รักเค้ามั้ยครับ? 💕',           e: '💜', g: 'https://media1.tenor.com/m/kEZzd8WrRpAAAAAC/peach-peach-and-goma.gif' }
];

const SP_IMAGES = {
  couple: ['img/fin1.jpg', 'img/fin2.jpg'],
  single: ['img/gf1.jpg', 'img/gf2.jpg', 'img/gf3.jpg', 'img/gf4.jpg', 'img/gf5.jpg', 'img/gf6.jpg']
};

/* --- STATE --- */
let noCount = 0;
let yesScale = 1;
let watchId = null;
let prevDist = null;
let lastGifIdx = -1;
let surpriseOpen = false;

/* --- BACKGROUND MUSIC --- */
function initMusic() {
  const music = document.getElementById('bgMusic');
  if (!music) return;
  music.volume = 0;
  const fadeIn = () => {
    music.play().then(() => {
      let v = 0;
      const target = 0.05;
      const step = () => {
        v = Math.min(v + 0.001, target);
        music.volume = v;
        if (v < target) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }).catch(() => {});
  };
  fadeIn();
  ['click','touchstart'].forEach(evt => {
    window.addEventListener(evt, function once() {
      fadeIn();
      window.removeEventListener(evt, once);
    });
  });
}

/* --- SOUND EFFECTS (Web Audio beeps only) --- */
let _actx = null;
function ctx() { if (!_actx) _actx = new (window.AudioContext || window.webkitAudioContext)(); return _actx; }

function playPop(type) {
  try {
    const c = ctx(), o = c.createOscillator(), g = c.createGain();
    o.connect(g); g.connect(c.destination);
    o.type = 'sine';
    o.frequency.setValueAtTime(type === 'yes' ? 880 : 220, c.currentTime);
    g.gain.setValueAtTime(.12, c.currentTime);
    g.gain.exponentialRampToValueAtTime(.001, c.currentTime + .12);
    o.start(c.currentTime); o.stop(c.currentTime + .12);
  } catch (_) {}
}

function playWhoosh() {
  try {
    const c = ctx(), o = c.createOscillator(), g = c.createGain();
    o.connect(g); g.connect(c.destination);
    o.type = 'sine';
    o.frequency.setValueAtTime(100, c.currentTime);
    o.frequency.exponentialRampToValueAtTime(900, c.currentTime + .15);
    g.gain.setValueAtTime(.1, c.currentTime);
    g.gain.exponentialRampToValueAtTime(.001, c.currentTime + .15);
    o.start(c.currentTime); o.stop(c.currentTime + .15);
  } catch (_) {}
}

/* --- STARS --- */
function initStars() {
  const box = document.getElementById('stars');
  if (!box) return;
  const frag = document.createDocumentFragment();
  for (let i = 0; i < 100; i++) {
    const s = document.createElement('div');
    s.className = 'star';
    s.style.left = Math.random() * 100 + '%';
    s.style.top = Math.random() * 100 + '%';
    s.style.width = s.style.height = (.5 + Math.random() * 2) + 'px';
    s.style.animationDuration = (2 + Math.random() * 4) + 's';
    s.style.animationDelay = (Math.random() * 5) + 's';
    frag.appendChild(s);
  }
  box.appendChild(frag);
}
initStars();

/* --- GIF --- */
function swapGif(newSrc) {
  const img = document.getElementById('gif');
  if (!img || img.getAttribute('src') === newSrc) return;
  img.classList.add('hide');
  setTimeout(() => { img.src = newSrc; img.classList.remove('hide'); }, 350);
}

/* --- BURST HEARTS --- */
function burstHearts(x, y, n) {
  const hearts = ['💜','🩵','✨','🩷','💙','💝','💫'];
  for (let i = 0; i < n; i++) {
    const el = document.createElement('div');
    el.className = 'burst';
    el.textContent = hearts[i % hearts.length];
    const angle = (i / n) * Math.PI * 2;
    const dist = 60 + Math.random() * 60;
    el.style.left = x + 'px';
    el.style.top = y + 'px';
    el.style.setProperty('--dx', Math.cos(angle) * dist + 'px');
    el.style.setProperty('--dy', Math.sin(angle) * dist + 'px');
    el.style.fontSize = (.6 + Math.random() * .6) + 'rem';
    document.body.appendChild(el);
    el.addEventListener('animationend', () => el.remove());
  }
}

/* --- DISTANCE --- */
function haversine(a, b) {
  const R = 6371;
  const dLat = (b.lat - a.lat) * Math.PI / 180;
  const dLng = (b.lng - a.lng) * Math.PI / 180;
  const h = Math.sin(dLat/2)**2 +
            Math.cos(a.lat*Math.PI/180) * Math.cos(b.lat*Math.PI/180) *
            Math.sin(dLng/2)**2;
  return R * 2 * Math.atan2(Math.sqrt(h), Math.sqrt(1-h));
}
let _locCache = '';
function updateDistance(lat, lng) {
  const d = haversine(SELF_LOC, { lat, lng });
  const el = document.getElementById('distanceValue');
  if (el) {
    el.textContent = d.toFixed(0);
    el.style.animation = 'none'; el.offsetHeight;
    el.style.animation = 'valPulse .4s ease';
  }
  let idx = 0;
  for (let i = 0; i < DIST_KM.length; i++) { if (d >= DIST_KM[i]) idx = i + 1; }
  idx = Math.min(idx, GIFS.length - 1);
  if (idx !== lastGifIdx) { swapGif(GIFS[idx]); lastGifIdx = idx; }
  if (!prevDist || Math.abs(d - prevDist) > 0.3) {
    prevDist = d;
    const key = lat.toFixed(3) + ',' + lng.toFixed(3);
    if (key !== _locCache) {
      _locCache = key;
      fetch('https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=' + lat + '&lon=' + lng)
        .then(r => r.json())
        .then(j => {
          const addr = j.address;
          const city = addr?.city || addr?.town || addr?.village || addr?.state || addr?.country || 'Unknown Location';
          const road = addr?.road ? addr.road + ', ' : '';
          const name = road + city;
          const l1 = document.getElementById('location1');
          const p1 = document.getElementById('p2Location1');
          if (l1) l1.textContent = name;
          if (p1) p1.textContent = name;
        }).catch(() => {
          const l1 = document.getElementById('location1');
          if (l1) l1.textContent = 'ตำแหน่งไม่ระบุ';
        });
    }
  }
}

/* --- GPS --- */
function initGPS() {
  if (!navigator.geolocation) {
    const el = document.getElementById('location1');
    if (el) el.textContent = 'GPS ไม่รองรับ';
    return;
  }
  watchId = navigator.geolocation.watchPosition(
    (pos) => updateDistance(pos.coords.latitude, pos.coords.longitude),
    () => {
      const el = document.getElementById('location1');
      if (el) el.textContent = 'ไม่พบตำแหน่ง';
    },
    { enableHighAccuracy: true, maximumAge: 5000, timeout: 10000 }
  );
}
function stopGPS() { if (watchId !== null) navigator.geolocation.clearWatch(watchId); }

/* --- COUNTDOWN --- */
function updateCountdown() {
  const now = new Date();
  const diff = now - START;
  if (diff < 0) return;
  const s = Math.floor(diff / 1000);
  const d = Math.floor(s / 86400);
  const h = Math.floor((s % 86400) / 3600);
  const m = Math.floor((s % 3600) / 60);
  const eD = document.getElementById('cdDays');
  const eH = document.getElementById('cdHours');
  const eM = document.getElementById('cdMins');
  if (eD) eD.textContent = String(d).padStart(2, '0');
  if (eH) eH.textContent = String(h).padStart(2, '0');
  if (eM) eM.textContent = String(m).padStart(2, '0');
}

/* --- ANNIVERSARY --- */
function updateAnniversary() {
  const now = new Date();
  const month = (now.getFullYear() - START.getFullYear()) * 12 + (now.getMonth() - START.getMonth());
  const eM = document.getElementById('anniversaryMonth');
  if (eM) eM.textContent = month;
  const eN = document.getElementById('nextAnniversary');
  if (!eN) return;
  if (now.getDate() === 29) {
    eN.textContent = 'วันนี้! 🎉';
    return;
  }
  let next = new Date(now);
  if (next.getDate() < 29) { next.setDate(29); }
  else { next.setMonth(next.getMonth() + 1); next.setDate(29); }
  const daysLeft = Math.max(0, Math.ceil((next - now) / 86400000));
  eN.textContent = daysLeft;
}

/* --- SCREEN 1 GAME --- */
function renderDots(current, total) {
  const el = document.getElementById('dots');
  if (!el) return;
  el.innerHTML = '';
  for (let i = 0; i < total; i++) {
    const d = document.createElement('div');
    d.className = 'dot' + (i < current ? ' on' : '');
    el.appendChild(d);
  }
}
function renderBtns() {
  const c = document.getElementById('q-btnContainer');
  if (!c) return;
  c.innerHTML = `
    <button class="q-btn btn-yes" id="yesBtn">รัก 💜</button>
    <button class="q-btn btn-no"  id="noBtn">${SCENES[noCount].e} ไม่</button>`;
  document.getElementById('yesBtn').style.fontSize = (1 + yesScale * .1) + 'rem';
  document.getElementById('yesBtn').addEventListener('click', onYes);
  document.getElementById('noBtn').addEventListener('click', onNo);
}
function startGame() {
  noCount = 0; yesScale = 1;
  const s = SCENES[0];
  const q = document.getElementById('question');
  const e = document.getElementById('qEmoji');
  if (q) q.textContent = s.q;
  if (e) e.textContent = s.e;
  swapGif(s.g);
  renderDots(0, SCENES.length);
  renderBtns();
}
function onYes(e) {
  playPop('yes');
  burstHearts(e.clientX, e.clientY, 18);
  swapGif(YES_GIF);
  const q = document.getElementById('question');
  if (q) q.innerHTML = '<span class="hl">เค้าก็รักเทอเหมือนกัน 💜</span>';
  renderDots(SCENES.length, SCENES.length);
  const c = document.getElementById('q-btnContainer');
  if (c) c.innerHTML = '';
  setTimeout(goToScreen2, 2000);
}
function onNo() {
  playPop('no');
  const card = document.getElementById('q-card');
  if (card) {
    card.classList.remove('shake'); void card.offsetWidth; card.classList.add('shake');
    setTimeout(() => card.classList.remove('shake'), 400);
  }
  const noBtn = document.getElementById('noBtn');
  if (noBtn) {
    const dx = (Math.random() - 0.5) * 120;
    const dy = (Math.random() - 0.5) * 80;
    noBtn.style.setProperty('--dx', dx + 'px');
    noBtn.style.setProperty('--dy', dy + 'px');
    noBtn.classList.remove('moving');
    void noBtn.offsetWidth;
    noBtn.classList.add('moving');
  }
  noCount++; yesScale++;
  renderDots(noCount, SCENES.length);
  const s = SCENES[Math.min(noCount, SCENES.length - 1)];
  const q = document.getElementById('question');
  const e = document.getElementById('qEmoji');
  if (q) q.textContent = s.q;
  if (e) e.textContent = s.e;
  swapGif(s.g);
  if (noCount >= 5) {
    const c = document.getElementById('q-btnContainer');
    if (c) {
      c.innerHTML = '<button class="q-btn btn-love" id="loveBtn">💜 LOVE!</button>';
      document.getElementById('loveBtn').addEventListener('click', onLove);
    }
    renderDots(SCENES.length, SCENES.length);
  } else { renderBtns(); }
}
function onLove(e) {
  burstHearts(e.clientX, e.clientY, 26);
  swapGif(LOVE_GIF);
  const q = document.getElementById('question');
  if (q) q.innerHTML = '<div class="hl" style="font-size:1.2rem">รักเหมือนกันนนน 💞<br><small style="color:var(--muted)">เค้ารอให้รู้อยู่นานมากเลยนะ 🥺</small></div>';
  const c = document.getElementById('q-btnContainer');
  if (c) c.innerHTML = '';
  setTimeout(goToScreen2, 2000);
}

/* --- SURPRISE BG (Screen 3) --- */
let _physicsCards = [];
let _physicsRAF = null;

function spawnDecor(container) {
  const emojis = ['🌷','🌸','🌺','✿','✨','⭐','🌟'];
  const count = 20 + Math.floor(Math.random() * 11);
  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.className = i % 7 < 4 ? 'petal' : 'sparkle';
    p.textContent = emojis[i % emojis.length];
    p.style.left = Math.random() * 100 + '%';
    p.style.fontSize = (.6 + Math.random() * .8) + 'rem';
    p.style.animationDuration = (5 + Math.random() * 10) + 's';
    p.style.animationDelay = (Math.random() * 10) + 's';
    container.appendChild(p);
  }
}

function getEnvelopeRect() {
  const env = document.getElementById('envelope');
  if (!env) return null;
  return env.getBoundingClientRect();
}

function physicsTick() {
  const W = window.innerWidth;
  const H = window.innerHeight;
  const envRect = getEnvelopeRect();
  const FRICTION = 0.997;
  const BOUNCE_EDGE = 0.78;
  const BOUNCE_ENV = 0.65;
  const MIN_SPEED = 0.12;

  _physicsCards.forEach(c => {
    if (c.dragging) return;

    c.vx *= FRICTION;
    c.vy *= FRICTION;

    if (Math.abs(c.vx) < MIN_SPEED && Math.abs(c.vy) < MIN_SPEED) {
      c.vx = (Math.random() - 0.5) * 1.2;
      c.vy = (Math.random() - 0.5) * 1.2;
    }

    c.x += c.vx;
    c.y += c.vy;

    const r = c.el.getBoundingClientRect();
    const w = r.width || 120;
    const h = r.height || 120;

    if (c.x < 0) { c.x = 0; c.vx = Math.abs(c.vx) * BOUNCE_EDGE; }
    if (c.x + w > W) { c.x = W - w; c.vx = -Math.abs(c.vx) * BOUNCE_EDGE; }
    if (c.y < 0) { c.y = 0; c.vy = Math.abs(c.vy) * BOUNCE_EDGE; }
    if (c.y + h > H) { c.y = H - h; c.vy = -Math.abs(c.vy) * BOUNCE_EDGE; }

    if (envRect) {
      const pad = 8;
      const eL = envRect.left - pad;
      const eR = envRect.right + pad;
      const eT = envRect.top - pad;
      const eB = envRect.bottom + pad;
      const cx = c.x + w / 2;
      const cy = c.y + h / 2;

      if (cx > eL && cx < eR && cy > eT && cy < eB) {
        const overlapL = cx - eL;
        const overlapR = eR - cx;
        const overlapT = cy - eT;
        const overlapB = eB - cy;
        const minOverlap = Math.min(overlapL, overlapR, overlapT, overlapB);

        if (minOverlap === overlapL) {
          c.x = eL - w;
          c.vx = -Math.abs(c.vx) * BOUNCE_ENV;
          c.vy *= 0.95;
        } else if (minOverlap === overlapR) {
          c.x = eR;
          c.vx = Math.abs(c.vx) * BOUNCE_ENV;
          c.vy *= 0.95;
        } else if (minOverlap === overlapT) {
          c.y = eT - h;
          c.vy = -Math.abs(c.vy) * BOUNCE_ENV;
          c.vx *= 0.95;
        } else {
          c.y = eB;
          c.vy = Math.abs(c.vy) * BOUNCE_ENV;
          c.vx *= 0.95;
        }
      }
    }

    c.rot += c.vx * 0.25;
    c.rot *= 0.96;
    c.rot = Math.max(-20, Math.min(20, c.rot));

    c.el.style.left = c.x + 'px';
    c.el.style.top = c.y + 'px';
    c.el.style.transform = 'rotate(' + c.rot.toFixed(1) + 'deg)';
  });

  if (surpriseOpen) {
    _physicsRAF = requestAnimationFrame(physicsTick);
  }
}

function startPhysics() {
  if (_physicsRAF) cancelAnimationFrame(_physicsRAF);
  _physicsCards = [];
  _physicsRAF = requestAnimationFrame(physicsTick);
}

function stopPhysics() {
  if (_physicsRAF) cancelAnimationFrame(_physicsRAF);
  _physicsRAF = null;
  _physicsCards = [];
}

function addPhysicsCard(el, startX, startY, vx, vy) {
  const rect = el.getBoundingClientRect();
  _physicsCards.push({
    el,
    x: startX ?? rect.left,
    y: startY ?? rect.top,
    vx: vx ?? (Math.random() - 0.5) * 2,
    vy: vy ?? (Math.random() - 0.5) * 2,
    rot: (Math.random() - 0.5) * 20,
    dragging: false
  });
}

function setupDrag(card) {
  let isDragging = false, startX, startY;
  const onDown = (e) => {
    isDragging = true;
    const pc = _physicsCards.find(p => p.el === card);
    if (pc) pc.dragging = true;
    card.style.zIndex = 100;
    const touch = e.touches ? e.touches[0] : e;
    const rect = card.getBoundingClientRect();
    startX = touch.clientX - rect.left;
    startY = touch.clientY - rect.top;
  };
  const onMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const touch = e.touches ? e.touches[0] : e;
    const newX = touch.clientX - startX;
    const newY = touch.clientY - startY;
    card.style.left = newX + 'px';
    card.style.top = newY + 'px';
    const pc = _physicsCards.find(p => p.el === card);
    if (pc) { pc.x = newX; pc.y = newY; }
  };
  const onUp = () => {
    if (!isDragging) return;
    isDragging = false;
    card.style.zIndex = 6;
    const pc = _physicsCards.find(p => p.el === card);
    if (pc) {
      pc.dragging = false;
      pc.vx = (Math.random() - 0.5) * 3;
      pc.vy = (Math.random() - 0.5) * 3;
    }
  };
  card.addEventListener('mousedown', onDown);
  card.addEventListener('touchstart', onDown, {passive: false});
  window.addEventListener('mousemove', onMove);
  window.addEventListener('touchmove', onMove, {passive: false});
  window.addEventListener('mouseup', onUp);
  window.addEventListener('touchend', onUp);
}

function openSurprise() {
  const bg = document.getElementById('surpriseBg');
  if (!bg) return;
  bg.innerHTML = '<div class="sp-cards"></div><div class="sp-decor"></div>';
  const cardsContainer = bg.querySelector('.sp-cards');
  const decor = bg.querySelector('.sp-decor');
  bg.classList.add('active');
  surpriseOpen = true;

  const env = document.getElementById('envelope');
  const envRect = env ? env.getBoundingClientRect() : null;
  const cx = envRect ? envRect.left + envRect.width / 2 : window.innerWidth / 2;
  const cy = envRect ? envRect.top + envRect.height / 2 : window.innerHeight / 2;

  const pair = document.createElement('div');
  pair.className = 'couple-pair';
  pair.innerHTML = `<div class="photo-card"><img src="${SP_IMAGES.couple[0]}" alt="photo"></div>
                     <div class="photo-card"><img src="${SP_IMAGES.couple[1]}" alt="photo"></div>`;
  cardsContainer.appendChild(pair);
  setupDrag(pair);

  SP_IMAGES.single.forEach((src) => {
    const card = document.createElement('div');
    card.className = 'photo-card';
    card.innerHTML = `<img src="${src}" alt="photo">`;
    cardsContainer.appendChild(card);
    setupDrag(card);
  });

  requestAnimationFrame(() => {
    startPhysics();
    cardsContainer.querySelectorAll('.photo-card, .couple-pair').forEach((el, i) => {
      const rect = el.getBoundingClientRect();
      const w = rect.width || 120;
      const h = rect.height || 120;
      const startX = cx - w / 2;
      const startY = cy - h / 2;
      el.style.left = startX + 'px';
      el.style.top = startY + 'px';
      el.style.opacity = '0';
      el.style.transition = 'opacity .3s ease';

      const angle = (i / (cardsContainer.children.length)) * Math.PI * 2 + (Math.random() - 0.5) * 0.5;
      const speed = 3 + Math.random() * 4;

      setTimeout(() => {
        el.style.opacity = '1';
        addPhysicsCard(el, startX, startY, Math.cos(angle) * speed, Math.sin(angle) * speed);
      }, 50 + i * 60);
    });
  });

  spawnDecor(decor);
}

function closeSurprise() {
  stopPhysics();
  const bg = document.getElementById('surpriseBg');
  if (bg) {
    bg.classList.remove('active');
    bg.innerHTML = '';
  }
  surpriseOpen = false;
}

/* --- SCREEN SWITCHING --- */
function goToScreen1() {
  closeSurprise();
  const s3 = document.getElementById('screen3');
  const s2 = document.getElementById('screen2');
  const s1 = document.getElementById('screen1');
  if (s3) s3.classList.remove('active');
  if (s2) s2.classList.remove('active');
  if (s1) s1.classList.add('active');
  playWhoosh();
  startGame();
}

function goToScreen2() {
  closeSurprise();
  const s1 = document.getElementById('screen1');
  const s3 = document.getElementById('screen3');
  const s2 = document.getElementById('screen2');
  if (s1) s1.classList.remove('active');
  if (s3) s3.classList.remove('active');
  if (s2) s2.classList.add('active');
  playWhoosh();
}

function goToScreen3() {
  closeSurprise();
  const env = document.getElementById('envelope');
  if (env) env.classList.remove('open');
  const s2 = document.getElementById('screen2');
  const s3 = document.getElementById('screen3');
  if (s2) s2.classList.remove('active');
  if (s3) s3.classList.add('active');
  playWhoosh();
}

/* --- INIT --- */
document.addEventListener('DOMContentLoaded', () => {
  initMusic();
  startGame();
  updateCountdown(); setInterval(updateCountdown, 1000);
  updateAnniversary(); setInterval(updateAnniversary, 1000);

  const prompt = document.getElementById('gpsPrompt');
  const allow = document.getElementById('gpsAllow');
  const skip = document.getElementById('gpsSkip');
  if (prompt && allow && skip) {
    prompt.style.display = 'flex';
    allow.addEventListener('click', () => {
      prompt.classList.add('hide');
      setTimeout(() => { prompt.style.display = 'none'; }, 400);
      initGPS();
    });
    skip.addEventListener('click', () => {
      prompt.classList.add('hide');
      setTimeout(() => { prompt.style.display = 'none'; }, 400);
      const el = document.getElementById('location1');
      if (el) el.textContent = 'ไม่พบตำแหน่ง';
    });
  } else { setTimeout(initGPS, 1000); }

  document.getElementById('giftBtn').addEventListener('click', goToScreen3);
  document.getElementById('envelopeBack').addEventListener('click', () => {
    closeSurprise();
    goToScreen2();
  });
  document.getElementById('backToQ').addEventListener('click', goToScreen1);

  const env = document.getElementById('envelope');
  if (env) env.addEventListener('click', () => {
    if (surpriseOpen) return;
    env.classList.add('open');
    openSurprise();
  });

  const hc = document.getElementById('letterHearts');
  if (hc) {
    ['💜','🩵','✨','💫','🩷','💝','🌙','⭐'].forEach(em => {
      const el = document.createElement('div');
      el.className = 'fh';
      el.textContent = em;
      el.style.left = Math.random() * 100 + 'vw';
      el.style.fontSize = (.8 + Math.random() * .8) + 'rem';
      el.style.animationDuration = (10 + Math.random() * 12) + 's';
      el.style.animationDelay = (Math.random() * 15) + 's';
      hc.appendChild(el);
    });
  }
});

window.addEventListener('beforeunload', stopGPS);
