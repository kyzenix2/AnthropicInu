/* ── site config ─────────────────────────────────────────── */
const TOKEN_NAME = 'Anthropic Inu';
const TICKER = '$AI';
const CHAIN = 'Ethereum';
const CONTRACT_ADDRESS = '0x446f33a65b0c1ed85167d1ca6749c35008a7a3c3'; // empty -> "Coming soon"
const BUY_URL = ''; // when empty and CA is set, build the Uniswap link below
const X_URL = 'https://x.com/AnthropicEthInu';

const UNISWAP_FOR = (ca) =>
  `https://app.uniswap.org/#/swap?inputCurrency=eth&outputCurrency=${ca}`;
const CHART_FOR = (ca) => `https://dexscreener.com/ethereum/${ca}`;

const GALLERY = [
  { src: 'assets/gallery/lab-origin.webp', w: 1312, h: 1199, cap: 'The lab reveal — official art from @InuAnthropic' },
  { src: 'assets/gallery/inu-bell.webp', w: 1280, h: 720, cap: 'Ringing the opening bell' },
  { src: 'assets/gallery/inu-chart.webp', w: 1280, h: 720, cap: 'Leading the comeback' },
  { src: 'assets/gallery/inu-lab.webp', w: 1152, h: 864, cap: 'Inside the tube' },
  { src: 'assets/gallery/inu-pfp.webp', w: 400, h: 400, cap: 'Visor on' },
];

const TAPE_BITS = [
  'IPO day · Nov 19, 2026',
  'Reported on X: $ANT perp $103.96',
  '+25.3% from the $83 IPO price',
  '$267M volume in a day',
  'The future of AI is orange',
  'The Inu that saved AI',
  TICKER + ' · ' + CHAIN,
];

const MARQUEE_BITS = [
  'The future of AI is orange',
  TICKER,
  'The Inu that saved AI',
  'Ethereum',
  'Visor on',
];

/* ── boot ────────────────────────────────────────────────── */
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const isTouch = matchMedia('(hover: none), (pointer: coarse)').matches;
if (reduce) document.body.classList.add('is-reduced');
if (isTouch) document.body.classList.add('is-touch');

const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];

const buyUrl = BUY_URL || (CONTRACT_ADDRESS ? UNISWAP_FOR(CONTRACT_ADDRESS) : '');
const chartUrl = CONTRACT_ADDRESS ? CHART_FOR(CONTRACT_ADDRESS) : '';
const caText = CONTRACT_ADDRESS || 'Coming soon';

function applyConfig() {
  $$('[data-x-link]').forEach((a) => { a.href = X_URL; a.target = '_blank'; a.rel = 'noopener'; });

  $$('[data-buy-link]').forEach((a) => bindSoon(a, buyUrl, 'Buy link coming soon.'));
  $$('[data-chart-link]').forEach((a) => {
    if (chartUrl) {
      a.href = chartUrl; a.target = '_blank'; a.rel = 'noopener';
      a.classList.remove('is-hidden', 'is-soon'); a.removeAttribute('aria-disabled');
    } else {
      a.classList.add('is-hidden');
    }
  });

  const val = $('#caValue');
  if (val) val.textContent = caText;
  $$('[data-ca-text]').forEach((el) => { el.textContent = caText; });

  const copiers = [$('#caCopy'), ...$$('[data-copy-ca]')].filter(Boolean);
  copiers.forEach((btn) => {
    btn.disabled = !CONTRACT_ADDRESS;
    btn.addEventListener('click', () => copyCA(btn));
  });
}

function bindSoon(a, url, msg) {
  if (url) {
    a.href = url; a.target = '_blank'; a.rel = 'noopener';
    a.classList.remove('is-soon'); a.removeAttribute('aria-disabled');
    a.querySelectorAll('small').forEach((s) => s.remove());
  } else {
    a.href = '#';
    a.classList.add('is-soon');
    a.setAttribute('aria-disabled', 'true');
    a.addEventListener('click', (e) => { e.preventDefault(); toast(msg); });
  }
}

async function copyCA(btn) {
  if (!CONTRACT_ADDRESS) { toast('Contract address coming soon.'); return; }
  try { await navigator.clipboard.writeText(CONTRACT_ADDRESS); }
  catch {
    const t = document.createElement('textarea'); t.value = CONTRACT_ADDRESS; document.body.appendChild(t); t.select(); document.execCommand('copy'); t.remove();
  }
  btn.classList.add('is-ok');
  toast('Contract address copied.');
  setTimeout(() => btn.classList.remove('is-ok'), 1600);
}

let toastTimer;
function toast(msg) {
  const el = $('#toast');
  if (!el) return;
  el.textContent = msg;
  el.classList.add('is-on');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('is-on'), 2200);
}

/* ── repeating tracks ────────────────────────────────────── */
function fillTrack(el, bits, icon, loops = 6, altEvery) {
  if (!el) return;
  const frag = document.createDocumentFragment();
  for (let i = 0; i < loops; i++) {
    bits.forEach((t, idx) => {
      const span = document.createElement('span');
      span.className = 'tape__item';
      if (altEvery && idx % 2) span.classList.add('alt');
      span.innerHTML = `<svg><use href="#${icon}"></use></svg><span>${t}</span>`;
      frag.appendChild(span);
    });
  }
  el.appendChild(frag);
}

function fillMarquee(el, bits, loops = 8) {
  if (!el) return;
  const frag = document.createDocumentFragment();
  for (let i = 0; i < loops; i++) {
    bits.forEach((t, idx) => {
      const span = document.createElement('span');
      span.className = 'marquee__item' + (idx % 2 ? ' alt' : '');
      span.innerHTML = `<svg><use href="#i-asterisk"></use></svg><span>${t}</span>`;
      frag.appendChild(span);
    });
  }
  el.appendChild(frag);
}

/* ── seal ticks ──────────────────────────────────────────── */
function drawSealTicks() {
  const g = $('#sealTicks');
  if (!g) return;
  const cx = 100, cy = 100, r = 90;
  let html = '';
  for (let i = 0; i < 8; i++) {
    const a = (i * 45 - 90) * Math.PI / 180;
    const x = cx + r * Math.cos(a);
    const y = cy + r * Math.sin(a);
    html += `<g transform="translate(${x.toFixed(2)},${y.toFixed(2)}) rotate(${i * 45})"><use href="#i-asterisk" x="-8" y="-8" width="16" height="16"/></g>`;
  }
  html += `<circle cx="100" cy="100" r="84" fill="none" stroke="currentColor" stroke-width=".6" stroke-dasharray="2 6" opacity=".55"/>`;
  g.innerHTML = html;
}

/* ── gallery ─────────────────────────────────────────────── */
function renderGallery() {
  const grid = $('#galleryGrid');
  if (!grid) return;
  grid.innerHTML = GALLERY.map((g, i) => `
    <figure class="g-card reveal" data-idx="${i}">
      <img src="${g.src}" alt="${g.cap}" width="${g.w}" height="${g.h}" decoding="async"/>
      <span class="exp" aria-hidden="true"><svg><use href="#i-expand"/></svg></span>
      <figcaption>${g.cap}</figcaption>
    </figure>`).join('');
  $$('.g-card', grid).forEach((card) => {
    card.tabIndex = 0;
    card.setAttribute('role', 'button');
    card.setAttribute('aria-label', 'Open ' + card.querySelector('figcaption').textContent);
    const open = () => openLb(+card.dataset.idx);
    card.addEventListener('click', open);
    card.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); } });
  });
}

/* ── lightbox ────────────────────────────────────────────── */
let lbIdx = 0, lastFocus = null;
const lb = $('#lightbox');

function openLb(i) {
  lbIdx = (i + GALLERY.length) % GALLERY.length;
  const g = GALLERY[lbIdx];
  $('#lbImg').src = g.src;
  $('#lbImg').alt = g.cap;
  $('#lbCap').textContent = g.cap;
  lastFocus = document.activeElement;
  lb.hidden = false;
  $('#lbClose').focus();
  document.addEventListener('keydown', onLbKey);
}

function closeLb() {
  lb.hidden = true;
  document.removeEventListener('keydown', onLbKey);
  if (lastFocus && lastFocus.focus) lastFocus.focus();
}

function onLbKey(e) {
  if (e.key === 'Escape') closeLb();
  if (e.key === 'ArrowRight') openLb(lbIdx + 1);
  if (e.key === 'ArrowLeft') openLb(lbIdx - 1);
  if (e.key === 'Tab') {
    const f = $$('button', lb);
    const first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }
}

function bindLightbox() {
  $('#lbClose').addEventListener('click', closeLb);
  $('#lbPrev').addEventListener('click', () => openLb(lbIdx - 1));
  $('#lbNext').addEventListener('click', () => openLb(lbIdx + 1));
  lb.addEventListener('click', (e) => { if (e.target === lb) closeLb(); });
  let x0 = null;
  lb.addEventListener('touchstart', (e) => { x0 = e.changedTouches[0].clientX; }, { passive: true });
  lb.addEventListener('touchend', (e) => {
    if (x0 == null) return;
    const dx = e.changedTouches[0].clientX - x0; x0 = null;
    if (dx > 40) openLb(lbIdx - 1);
    if (dx < -40) openLb(lbIdx + 1);
  });
}

/* ── nav / progress / reveals ────────────────────────────── */
function bindNav() {
  const btn = $('#menuBtn'), links = $('#navLinks');
  btn.addEventListener('click', () => {
    const open = links.classList.toggle('is-open');
    btn.setAttribute('aria-expanded', String(open));
  });
  $$('a', links).forEach((a) => a.addEventListener('click', () => {
    links.classList.remove('is-open');
    btn.setAttribute('aria-expanded', 'false');
  }));
}

function bindScroll() {
  const bar = $('#progress');
  const on = () => {
    const h = document.documentElement;
    const max = h.scrollHeight - h.clientHeight;
    bar.style.width = (max > 0 ? (h.scrollTop / max) * 100 : 0) + '%';
  };
  on();
  addEventListener('scroll', on, { passive: true });

  const ios = new IntersectionObserver((ents) => {
    ents.forEach((e) => { if (e.isIntersecting) e.target.classList.add('is-in'); });
  }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
  $$('.reveal').forEach((el) => (reduce ? el.classList.add('is-in') : ios.observe(el)));
}

/* ── cited number tick (reported figures only) ───────────── */
function bindCounts() {
  const els = $$('[data-count]');
  const run = (el) => {
    if (reduce) { return; }
    const end = parseFloat(el.dataset.count);
    const prefix = el.dataset.prefix || '';
    const suffix = el.dataset.suffix || '';
    const dec = (String(el.dataset.count).split('.')[1] || '').length;
    const t0 = performance.now(), dur = 1100;
    const step = (t) => {
      const p = Math.min(1, (t - t0) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = prefix + (end * eased).toFixed(dec) + suffix;
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  const io = new IntersectionObserver((ents) => {
    ents.forEach((e) => { if (e.isIntersecting) { run(e.target); io.unobserve(e.target); } });
  }, { threshold: 0.5 });
  els.forEach((el) => io.observe(el));
}

/* ── mascot tilt + magnetic buttons ──────────────────────── */
function bindMotion() {
  if (reduce || isTouch) return;
  const seal = $('#seal');
  const inu = seal && $('.seal__inu', seal);
  if (seal && inu) {
    seal.addEventListener('pointermove', (e) => {
      const r = seal.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      inu.style.transform = `translateX(-50%) rotateY(${x * 14}deg) rotateX(${-y * 10}deg)`;
    });
    seal.addEventListener('pointerleave', () => { inu.style.transform = 'translateX(-50%)'; });
  }
  $$('.magnetic').forEach((btn) => {
    btn.addEventListener('pointermove', (e) => {
      const r = btn.getBoundingClientRect();
      const x = (e.clientX - (r.left + r.width / 2)) * 0.28;
      const y = (e.clientY - (r.top + r.height / 2)) * 0.28;
      btn.style.transform = `translate(${x}px, ${y}px)`;
    });
    btn.addEventListener('pointerleave', () => { btn.style.transform = ''; });
  });
}

/* ── custom cursor ───────────────────────────────────────── */
function bindCursor() {
  const c = $('.cursor');
  if (!c || reduce || isTouch) return;
  let x = innerWidth / 2, y = innerHeight / 2, cx = x, cy = y;
  addEventListener('pointermove', (e) => { x = e.clientX; y = e.clientY; c.classList.add('is-on'); });
  const loop = () => {
    cx += (x - cx) * 0.28; cy += (y - cy) * 0.28;
    c.style.transform = `translate(${cx}px, ${cy}px) translate(-50%,-50%)`;
    requestAnimationFrame(loop);
  };
  requestAnimationFrame(loop);
}

/* ── asterisk field ──────────────────────────────────────── */
function startField() {
  const canvas = $('#field');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let w = 0, h = 0, dpr = 1, stars = [];
  const mouse = { x: -9999, y: -9999 };

  function asterisk(x, y, r, rot, a) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rot);
    ctx.beginPath();
    for (let i = 0; i < 8; i++) {
      const ang = i * Math.PI / 4;
      ctx.moveTo(Math.cos(ang) * r * 0.18, Math.sin(ang) * r * 0.18);
      ctx.lineTo(Math.cos(ang) * r, Math.sin(ang) * r);
    }
    ctx.strokeStyle = `rgba(255,122,26,${a})`;
    ctx.lineWidth = Math.max(0.8, r * 0.08);
    ctx.lineCap = 'round';
    ctx.stroke();
    ctx.restore();
  }

  function resize() {
    dpr = Math.min(devicePixelRatio || 1, 2);
    w = innerWidth; h = innerHeight;
    canvas.width = w * dpr; canvas.height = h * dpr;
    canvas.style.width = w + 'px'; canvas.style.height = h + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const n = reduce ? 18 : Math.min(70, Math.floor((w * h) / 22000));
    stars = Array.from({ length: n }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: 4 + Math.random() * 16,
      a: 0.08 + Math.random() * 0.22,
      rot: Math.random() * Math.PI,
      spin: (Math.random() - 0.5) * 0.004,
      vx: (Math.random() - 0.5) * 0.15,
      vy: (Math.random() - 0.5) * 0.12,
    }));
    if (reduce) paint();
  }

  function paint() {
    ctx.clearRect(0, 0, w, h);
    for (const s of stars) asterisk(s.x, s.y, s.r, s.rot, s.a);
  }

  function tick() {
    ctx.clearRect(0, 0, w, h);
    for (const s of stars) {
      const dx = s.x - mouse.x, dy = s.y - mouse.y;
      const d2 = dx * dx + dy * dy;
      if (d2 < 16000) {
        const d = Math.sqrt(d2) || 1;
        s.x += (dx / d) * 1.4;
        s.y += (dy / d) * 1.4;
      }
      s.x += s.vx; s.y += s.vy; s.rot += s.spin;
      if (s.x < -30) s.x = w + 30; if (s.x > w + 30) s.x = -30;
      if (s.y < -30) s.y = h + 30; if (s.y > h + 30) s.y = -30;
      asterisk(s.x, s.y, s.r, s.rot, s.a);
    }
    requestAnimationFrame(tick);
  }

  addEventListener('resize', resize);
  addEventListener('pointermove', (e) => { mouse.x = e.clientX; mouse.y = e.clientY; }, { passive: true });
  resize();
  if (!reduce) requestAnimationFrame(tick);
}

/* ── go ──────────────────────────────────────────────────── */
applyConfig();
fillTrack($('#tapeTrack'), TAPE_BITS, 'i-asterisk', 8);
fillMarquee($('#marqueeTrack'), MARQUEE_BITS, 8);
drawSealTicks();
renderGallery();
bindLightbox();
bindNav();
bindScroll();
bindCounts();
bindMotion();
bindCursor();
startField();
