// ============================================================
// CURSOR
// ============================================================
const CUR = document.getElementById('CUR'), CUR2 = document.getElementById('CUR2');
let mx = 0, my = 0, rx = 0, ry = 0;
document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; CUR.style.left = mx + 'px'; CUR.style.top = my + 'px'; });
(function animC() { rx += (mx - rx) * .1; ry += (my - ry) * .1; CUR2.style.left = rx + 'px'; CUR2.style.top = ry + 'px'; requestAnimationFrame(animC); })();

// ============================================================
// PAGE NAVIGATION
// ============================================================
function showPage(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById('page-' + id).classList.add('active');
  document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
  const nl = document.getElementById('nl-' + id); if (nl) nl.classList.add('active');
  window.scrollTo(0, 0);
  if (id === 'animations') initAnimations();
  if (id === 'sliders') { updateOhm(); updateCoulomb(); updateSnell(); }
  if (id === 'think') renderThinkCards();
  if (id === 'progress') renderProgress();
}

// ============================================================
// PAGE 1: LIVE CANVAS ANIMATIONS
// ============================================================
let animStarted = false;
function initAnimations() {
  if (animStarted) return; animStarted = true;
  startAnim_charges(); startAnim_current(); startAnim_mag(); startAnim_emf();
  startAnim_optics(); startAnim_wave(); startAnim_photo(); startAnim_diode();
}

function setupCanvas(id) {
  const c = document.getElementById(id);
  const box = c.parentElement;
  c.width = box.clientWidth || 320; c.height = 200;
  return { c, ctx: c.getContext('2d'), W: c.width, H: c.height };
}

/* ---- CHARGES ---- */
function startAnim_charges() {
  const { c, ctx, W, H } = setupCanvas('ca-charges'); let t = 0;
  (function loop() {
    ctx.clearRect(0, 0, W, H);
    const d = 70 + Math.sin(t * .8) * 25;
    // Glow background
    ctx.fillStyle = 'rgba(0,0,0,.06)'; ctx.fillRect(0, 0, W, H);
    // Field lines between
    for (let a = 0; a < 10; a++) {
      const ang = (a / 10) * Math.PI * 2;
      ctx.beginPath();
      ctx.moveTo(W / 2 - d + Math.cos(ang) * 24, H / 2 + Math.sin(ang) * 24);
      ctx.lineTo(W / 2 - d + Math.cos(ang) * (d - 26), H / 2 + Math.sin(ang) * (d - 26));
      ctx.strokeStyle = 'rgba(244,114,182,.25)'; ctx.lineWidth = 1; ctx.setLineDash([3, 5]); ctx.stroke(); ctx.setLineDash([]);
    }
    // Charge +
    const g1 = ctx.createRadialGradient(W / 2 - d, H / 2, 2, W / 2 - d, H / 2, 26);
    g1.addColorStop(0, '#f472b6'); g1.addColorStop(1, 'rgba(244,114,182,.1)');
    ctx.beginPath(); ctx.arc(W / 2 - d, H / 2, 24, 0, Math.PI * 2); ctx.fillStyle = g1; ctx.fill();
    ctx.strokeStyle = '#f472b6'; ctx.lineWidth = 2; ctx.stroke();
    ctx.fillStyle = '#fff'; ctx.font = 'bold 18px serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText('+', W / 2 - d, H / 2 + 1);
    // Charge -
    const g2 = ctx.createRadialGradient(W / 2 + d, H / 2, 2, W / 2 + d, H / 2, 26);
    g2.addColorStop(0, '#60a5fa'); g2.addColorStop(1, 'rgba(96,165,250,.1)');
    ctx.beginPath(); ctx.arc(W / 2 + d, H / 2, 24, 0, Math.PI * 2); ctx.fillStyle = g2; ctx.fill();
    ctx.strokeStyle = '#60a5fa'; ctx.lineWidth = 2; ctx.stroke();
    ctx.fillStyle = '#fff'; ctx.fillText('−', W / 2 + d, H / 2 + 1);
    // Force arrows
    const fl = Math.max(10, 28 * (1 / (d / 60)));
    ctx.strokeStyle = '#f472b6'; ctx.lineWidth = 2.5;
    arrow(ctx, W / 2 - d + 28, H / 2, W / 2 - d + 28 + fl, H / 2, '#f472b6');
    arrow(ctx, W / 2 + d - 28, H / 2, W / 2 + d - 28 - fl, H / 2, '#60a5fa');
    // Labels
    ctx.fillStyle = 'rgba(148,163,184,.7)'; ctx.font = '11px Exo 2,sans-serif';
    ctx.fillText('+Q', W / 2 - d, H / 2 + 40); ctx.fillText('−Q', W / 2 + d, H / 2 + 40);
    t += .025; requestAnimationFrame(loop);
  })();
}

/* ---- CURRENT ---- */
function startAnim_current() {
  const { c, ctx, W, H } = setupCanvas('ca-current'); let t = 0;
  (function loop() {
    ctx.clearRect(0, 0, W, H);
    const wY = H / 2;
    ctx.fillStyle = '#e8c84a'; ctx.fillRect(20, wY - 7, W - 40, 14);
    ctx.strokeStyle = '#b89a00'; ctx.lineWidth = 1; ctx.strokeRect(20, wY - 7, W - 40, 14);
    // electrons
    for (let i = 0; i < 12; i++) {
      const x = 20 + ((i / 12 + t * .4) % 1) * (W - 40);
      const jit = Math.sin(i * 1.8 + t) * .5 * 2;
      const eg = ctx.createRadialGradient(x, wY + jit, 0, x, wY + jit, 6);
      eg.addColorStop(0, '#4cc9f0'); eg.addColorStop(1, 'rgba(76,201,240,.1)');
      ctx.beginPath(); ctx.arc(x, wY + jit, 5, 0, Math.PI * 2); ctx.fillStyle = eg; ctx.fill();
      ctx.fillStyle = '#fff'; ctx.font = 'bold 7px sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillText('e⁻', x, wY + jit + .5);
    }
    arrow(ctx, 30, wY - 26, W - 40, wY - 26, '#4361ee');
    ctx.fillStyle = '#4361ee'; ctx.font = 'bold 11px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('→ Conventional Current (I)', W / 2, wY - 36);
    arrow(ctx, W - 40, wY + 26, 30, wY + 26, '#4cc9f0');
    ctx.fillStyle = '#4cc9f0'; ctx.fillText('← Electron Flow (e⁻)', W / 2, wY + 36);
    t += .025; requestAnimationFrame(loop);
  })();
}

/* ---- MAGNETIC ---- */
function startAnim_mag() {
  const { c, ctx, W, H } = setupCanvas('ca-mag'); let t = 0;
  (function loop() {
    ctx.clearRect(0, 0, W, H);
    const cx = W / 2, cy = H / 2;
    // Wire cross section
    ctx.beginPath(); ctx.arc(cx, cy, 14, 0, Math.PI * 2); ctx.fillStyle = '#e8c84a'; ctx.fill();
    ctx.fillStyle = '#1a1800'; ctx.font = 'bold 14px sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('•', cx, cy + 1);
    // Rings
    [36, 58, 82].forEach((r, i) => {
      ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(168,85,247,${.7 - .15 * i})`; ctx.lineWidth = 1.5;
      ctx.setLineDash([5, 4]); ctx.stroke(); ctx.setLineDash([]);
      // rotating arrow
      const a = t * (1 - .15 * i);
      const ax = cx + r * Math.cos(a), ay = cy + r * Math.sin(a);
      arrow(ctx, ax - Math.cos(a + Math.PI / 2) * 7, ay - Math.sin(a + Math.PI / 2) * 7,
        ax + Math.cos(a + Math.PI / 2) * 7, ay + Math.sin(a + Math.PI / 2) * 7, '#a855f7');
    });
    ctx.fillStyle = 'rgba(148,163,184,.7)'; ctx.font = '10px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('B field circles around wire', cx, H - 10);
    t += .025; requestAnimationFrame(loop);
  })();
}

/* ---- EMF INDUCTION ---- */
function startAnim_emf() {
  const { c, ctx, W, H } = setupCanvas('ca-emf'); let t = 0;
  (function loop() {
    ctx.clearRect(0, 0, W, H);
    const magX = W * .22 + Math.sin(t * .8) * 60, cy = H / 2;
    // Magnet
    ctx.fillStyle = '#f472b6'; ctx.fillRect(magX - 20, cy - 26, 20, 52);
    ctx.fillStyle = '#60a5fa'; ctx.fillRect(magX, cy - 26, 20, 52);
    ctx.fillStyle = '#fff'; ctx.font = 'bold 13px serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText('N', magX - 10, cy); ctx.fillText('S', magX + 10, cy);
    // Coil
    const coilX = W * .67;
    for (let i = 0; i < 7; i++) {
      ctx.beginPath(); ctx.ellipse(coilX + i * 7, cy, 6, 34, 0, 0, Math.PI * 2);
      ctx.strokeStyle = '#e8c84a'; ctx.lineWidth = 2.5; ctx.stroke();
    }
    // EMF spark
    const spd = Math.abs(Math.cos(t * .8));
    if (spd > .25) {
      ctx.fillStyle = `rgba(251,191,36,${spd})`;
      ctx.font = `bold ${11 + spd * 5}px Orbitron,monospace`; ctx.textAlign = 'left';
      ctx.fillText(`EMF≈${(spd * 5).toFixed(2)}V`, coilX + 60, cy - 20);
    }
    ctx.fillStyle = 'rgba(148,163,184,.6)'; ctx.font = '10px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('Magnet moves → Flux changes → EMF!', W / 2, H - 10);
    t += .025; requestAnimationFrame(loop);
  })();
}

/* ---- OPTICS ---- */
function startAnim_optics() {
  const { c, ctx, W, H } = setupCanvas('ca-optics'); let t = 0;
  (function loop() {
    ctx.clearRect(0, 0, W, H);
    const lX = W / 2, cy = H / 2, f = 70;
    // Optical axis
    ctx.strokeStyle = 'rgba(148,163,184,.2)'; ctx.lineWidth = 1; ctx.setLineDash([4, 4]);
    ctx.beginPath(); ctx.moveTo(10, cy); ctx.lineTo(W - 10, cy); ctx.stroke(); ctx.setLineDash([]);
    // Lens
    ctx.strokeStyle = '#34d399'; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(lX, cy - 65); ctx.lineTo(lX, cy + 65); ctx.stroke();
    ctx.fillStyle = 'rgba(52,211,153,.1)';
    ctx.beginPath(); ctx.ellipse(lX, cy, 14, 65, 0, 0, Math.PI * 2); ctx.fill();
    // Rays
    [-40, -16, 0, 16, 40].forEach((yOff, i) => {
      const rayY = cy - 40 + yOff;
      ctx.beginPath(); ctx.moveTo(20, rayY); ctx.lineTo(lX, rayY);
      ctx.strokeStyle = 'rgba(251,191,36,.8)'; ctx.lineWidth = 1.5; ctx.stroke();
      // Refracted
      const endY = cy + Math.sin(t * .3) * .5;
      ctx.beginPath(); ctx.moveTo(lX, rayY); ctx.lineTo(lX + f, endY);
      ctx.strokeStyle = 'rgba(244,114,182,.8)'; ctx.lineWidth = 1.5; ctx.stroke();
    });
    // Focal point
    ctx.beginPath(); ctx.arc(lX + f, cy, 6, 0, Math.PI * 2);
    ctx.fillStyle = '#f472b6'; ctx.fill();
    ctx.fillStyle = 'rgba(244,114,182,.8)'; ctx.font = '11px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('F', lX + f, cy - 16);
    ctx.fillStyle = 'rgba(148,163,184,.6)'; ctx.font = '10px sans-serif';
    ctx.fillText('Convex lens → focus at F', W / 2, H - 10);
    t += .025; requestAnimationFrame(loop);
  })();
}

/* ---- WAVE INTERFERENCE ---- */
function startAnim_wave() {
  const { c, ctx, W, H } = setupCanvas('ca-wave'); let t = 0;
  (function loop() {
    ctx.clearRect(0, 0, W, H);
    const s1y = H * .3, s2y = H * .7, srcX = 30;
    // Two sources
    [s1y, s2y].forEach(sy => {
      ctx.beginPath(); ctx.arc(srcX, sy, 5, 0, Math.PI * 2);
      ctx.fillStyle = '#00d4ff'; ctx.fill();
    });
    // Interference pattern
    for (let x = srcX + 10; x < W; x += 2) {
      for (let y = 0; y < H; y += 2) {
        const r1 = Math.sqrt((x - srcX) ** 2 + (y - s1y) ** 2);
        const r2 = Math.sqrt((x - srcX) ** 2 + (y - s2y) ** 2);
        const w1 = Math.sin(r1 * .3 - t * 4), w2 = Math.sin(r2 * .3 - t * 4);
        const amp = (w1 + w2) / 2;
        const alpha = Math.abs(amp) * .7;
        ctx.fillStyle = amp > 0 ? `rgba(0,212,255,${alpha})` : `rgba(168,85,247,${alpha})`;
        ctx.fillRect(x, y, 2, 2);
      }
    }
    ctx.fillStyle = 'rgba(148,163,184,.7)'; ctx.font = '10px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('Constructive (bright) + Destructive (dark) interference', W / 2, H - 8);
    t += .025; requestAnimationFrame(loop);
  })();
}

/* ---- PHOTOELECTRIC ---- */
function startAnim_photo() {
  const { c, ctx, W, H } = setupCanvas('ca-photo'); let t = 0;
  const electrons = [];
  (function loop() {
    ctx.clearRect(0, 0, W, H);
    const mY = H * .62;
    // Metal
    const mg = ctx.createLinearGradient(0, mY, 0, H);
    mg.addColorStop(0, '#4361ee'); mg.addColorStop(1, '#1a2b8a');
    ctx.fillStyle = mg; ctx.fillRect(30, mY, W - 60, H - mY);
    // Photons
    for (let i = 0; i < 7; i++) {
      const px = 40 + i * ((W - 80) / 6);
      const py = ((t * .6 + i * .14) % 1) * (mY - 20) + 10;
      const pg = ctx.createRadialGradient(px, py, 0, px, py, 7);
      pg.addColorStop(0, '#fbbf24'); pg.addColorStop(1, 'rgba(251,191,36,0)');
      ctx.beginPath(); ctx.arc(px, py, 6, 0, Math.PI * 2); ctx.fillStyle = pg; ctx.fill();
      // emit electron
      if (py > mY - 16 && py < mY + 2) {
        electrons.push({ x: px, y: mY - 10, vx: (Math.random() - .5) * 2, vy: -(1 + Math.random() * 2), life: 1 });
      }
    }
    // Electrons
    for (let i = electrons.length - 1; i >= 0; i--) {
      const e = electrons[i];
      e.x += e.vx; e.y += e.vy; e.vy += .06; e.life -= .02;
      if (e.life <= 0 || e.y > H) { electrons.splice(i, 1); continue; }
      ctx.beginPath(); ctx.arc(e.x, e.y, 4, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(76,201,240,${e.life})`; ctx.fill();
    }
    ctx.fillStyle = 'rgba(148,163,184,.7)'; ctx.font = '10px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('Photons ↓ hit metal → electrons emitted ↑', W / 2, H - 8);
    t += .025; requestAnimationFrame(loop);
  })();
}

/* ---- DIODE ---- */
function startAnim_diode() {
  const { c, ctx, W, H } = setupCanvas('ca-diode'); let t = 0;
  (function loop() {
    ctx.clearRect(0, 0, W, H);
    const cx = W / 2, cy = H / 2, fw = Math.sin(t) > 0;
    ctx.fillStyle = 'rgba(244,114,182,.15)'; ctx.fillRect(30, cy - 36, cx - 50, 72);
    ctx.fillStyle = 'rgba(96,165,250,.15)'; ctx.fillRect(cx + 20, cy - 36, W - cx - 50, 72);
    ctx.fillStyle = 'rgba(148,163,184,.1)'; ctx.fillRect(cx - 14, cy - 36, 28, 72);
    ctx.fillStyle = '#f472b6'; ctx.font = 'bold 18px Orbitron,monospace'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('P', cx - 50, cy);
    ctx.fillStyle = '#60a5fa'; ctx.fillText('N', cx + 50, cy);
    ctx.fillStyle = 'rgba(148,163,184,.6)'; ctx.font = '9px sans-serif'; ctx.fillText('depletion', cx, cy + 50);
    // Moving carriers
    for (let i = 0; i < 8; i++) {
      const prog = ((i / 8 + t * .28) % 1);
      let x;
      if (fw) x = 30 + prog * (W - 60);
      else { x = cx - 15 - prog * (cx - 45); x = Math.max(30, Math.min(cx - 16, x)); }
      const y = cy - 18 + (i % 3) * 18;
      ctx.beginPath(); ctx.arc(x, y, 5, 0, Math.PI * 2);
      ctx.fillStyle = fw ? 'rgba(244,114,182,.9)' : 'rgba(96,165,250,.5)'; ctx.fill();
      ctx.fillStyle = '#fff'; ctx.font = 'bold 8px sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillText(fw ? '+' : '−', x, y);
    }
    ctx.fillStyle = fw ? 'rgba(16,185,129,.9)' : 'rgba(239,68,68,.9)';
    ctx.font = 'bold 11px Orbitron,monospace'; ctx.textAlign = 'center';
    ctx.fillText(fw ? '✅ FORWARD — Current flows!' : '❌ REVERSE — Blocked', cx, cy - 52);
    ctx.fillStyle = 'rgba(148,163,184,.6)'; ctx.font = '10px sans-serif';
    ctx.fillText('p-n Junction — one-way current valve', cx, H - 10);
    t += .025; requestAnimationFrame(loop);
  })();
}

function arrow(ctx, x1, y1, x2, y2, col) {
  const a = Math.atan2(y2 - y1, x2 - x1);
  ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2);
  ctx.strokeStyle = col; ctx.lineWidth = 2; ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(x2, y2);
  ctx.lineTo(x2 - 9 * Math.cos(a - .4), y2 - 9 * Math.sin(a - .4));
  ctx.lineTo(x2 - 9 * Math.cos(a + .4), y2 - 9 * Math.sin(a + .4));
  ctx.closePath(); ctx.fillStyle = col; ctx.fill();
}

// ============================================================
// PAGE 2: SLIDERS
// ============================================================
function updateOhm() {
  const V = +document.getElementById('ohm-v').value;
  const R = +document.getElementById('ohm-r').value;
  document.getElementById('ohm-v-val').textContent = V + ' V';
  document.getElementById('ohm-r-val').textContent = R + ' Ω';
  const I = V / R, P = V * I;
  document.getElementById('ohm-i').textContent = I.toFixed(3);
  document.getElementById('ohm-bar').style.width = Math.min(100, I / 5 * 100) + '%';
  document.getElementById('ohm-insight').innerHTML = `Current = ${I.toFixed(3)}A | Power = <strong>${P.toFixed(2)}W</strong>`;
  drawOhmGraph(V, R);
}
function drawOhmGraph(V, R) {
  const c = document.getElementById('ohm-graph');
  const ctx = c.getContext('2d'); const W = c.width = c.parentElement.clientWidth - 24, H = 120;
  ctx.clearRect(0, 0, W, H);
  ctx.strokeStyle = 'rgba(255,255,255,.1)'; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(40, 10); ctx.lineTo(40, H - 20); ctx.lineTo(W - 10, H - 20); ctx.stroke();
  ctx.fillStyle = 'rgba(148,163,184,.6)'; ctx.font = '9px sans-serif'; ctx.textAlign = 'center';
  ctx.fillText('Resistance (Ω)', W / 2, H - 4); ctx.textAlign = 'right'; ctx.fillText('I (A)', 38, 12);
  // I vs R curve
  ctx.beginPath(); ctx.moveTo(40, H - 20);
  for (let r = 1; r <= 100; r++) {
    const xi = 40 + (r / 100) * (W - 50), yi = (H - 20) - (V / r / 3) * (H - 30);
    r === 1 ? ctx.moveTo(xi, Math.max(10, yi)) : ctx.lineTo(xi, Math.max(10, yi));
  }
  ctx.strokeStyle = '#a855f7'; ctx.lineWidth = 2; ctx.stroke();
  // Current point
  const cx2 = 40 + (R / 100) * (W - 50), cy2 = Math.max(10, (H - 20) - (V / R / 3) * (H - 30));
  ctx.beginPath(); ctx.arc(cx2, cy2, 5, 0, Math.PI * 2); ctx.fillStyle = '#00d4ff'; ctx.fill();
}

function updateCoulomb() {
  const q1 = +document.getElementById('coul-q1').value;
  const q2 = +document.getElementById('coul-q2').value;
  const r = +document.getElementById('coul-r').value / 10;
  document.getElementById('coul-q1-val').textContent = q1 + ' μC';
  document.getElementById('coul-q2-val').textContent = q2 + ' μC';
  document.getElementById('coul-r-val').textContent = r.toFixed(1) + ' m';
  const F = 9e9 * (q1 * 1e-6) * (q2 * 1e-6) / (r * r);
  document.getElementById('coul-f').textContent = F.toFixed(3);
  document.getElementById('coul-bar').style.width = Math.min(100, F / 1 * 100) + '%';
  document.getElementById('coul-insight').innerHTML = `F = k·q₁·q₂/r² | r double → F = <strong>1/4</strong>`;
  drawCoulombGraph(q1, q2, r);
}
function drawCoulombGraph(q1, q2, r) {
  const c = document.getElementById('coul-graph');
  const ctx = c.getContext('2d'); const W = c.width = c.parentElement.clientWidth - 24, H = 120;
  ctx.clearRect(0, 0, W, H);
  ctx.strokeStyle = 'rgba(255,255,255,.1)'; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(40, 10); ctx.lineTo(40, H - 20); ctx.lineTo(W - 10, H - 20); ctx.stroke();
  ctx.fillStyle = 'rgba(148,163,184,.6)'; ctx.font = '9px sans-serif'; ctx.textAlign = 'center';
  ctx.fillText('Distance r (m)', W / 2, H - 4); ctx.textAlign = 'right'; ctx.fillText('F (N)', 38, 12);
  // F vs r curve
  const k = 9e9, qprod = (q1 * 1e-6) * (q2 * 1e-6);
  ctx.beginPath();
  for (let ri = 5; ri <= 200; ri++) {
    const rv = ri / 20; const F = k * qprod / (rv * rv);
    const xi = 40 + (ri / 200) * (W - 50), yi = Math.max(10, (H - 20) - F / 1 * (H - 30));
    ri === 5 ? ctx.moveTo(xi, yi) : ctx.lineTo(xi, yi);
  }
  ctx.strokeStyle = '#f472b6'; ctx.lineWidth = 2; ctx.stroke();
  const F = 9e9 * qprod / (r * r);
  const cx2 = 40 + (r / 10) * (W - 50), cy2 = Math.max(10, (H - 20) - F / 1 * (H - 30));
  ctx.beginPath(); ctx.arc(cx2, cy2, 5, 0, Math.PI * 2); ctx.fillStyle = '#00d4ff'; ctx.fill();
}

function updateSnell() {
  const i = +document.getElementById('snell-i').value;
  const n2 = +document.getElementById('snell-n').value / 100;
  document.getElementById('snell-i-val').textContent = i + '°';
  document.getElementById('snell-n-val').textContent = n2.toFixed(2);
  const sinR = Math.sin(i * Math.PI / 180) / n2;
  const R = Math.asin(Math.min(1, sinR)) * 180 / Math.PI;
  document.getElementById('snell-r').textContent = isNaN(R) ? 'TIR!' : R.toFixed(1) + '°';
  document.getElementById('snell-bar').style.width = (R / 90 * 100) + '%';
  const critical = Math.asin(1 / n2) * 180 / Math.PI;
  document.getElementById('snell-insight').innerHTML = isNaN(R) ? `Total Internal Reflection! i > critical angle (${critical.toFixed(1)}°)` :
    `Air → Glass (n=${n2.toFixed(2)}). Critical angle = ${critical.toFixed(1)}°`;
  drawSnellGraph(i, n2);
}
function drawSnellGraph(iAngle, n2) {
  const c = document.getElementById('snell-graph');
  const ctx = c.getContext('2d'); const W = c.width = c.parentElement.clientWidth - 24, H = 120;
  ctx.clearRect(0, 0, W, H);
  ctx.strokeStyle = 'rgba(255,255,255,.1)'; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(40, 10); ctx.lineTo(40, H - 20); ctx.lineTo(W - 10, H - 20); ctx.stroke();
  ctx.fillStyle = 'rgba(148,163,184,.6)'; ctx.font = '9px sans-serif'; ctx.textAlign = 'center';
  ctx.fillText('Angle of Incidence (°)', W / 2, H - 4); ctx.textAlign = 'right'; ctx.fillText('θ_r', 38, 12);
  ctx.beginPath();
  for (let ang = 0; ang <= 89; ang++) {
    const sr = Math.sin(ang * Math.PI / 180) / n2;
    if (sr > 1) break;
    const r = Math.asin(sr) * 180 / Math.PI;
    const xi = 40 + (ang / 90) * (W - 50), yi = (H - 20) - (r / 90) * (H - 30);
    ang === 0 ? ctx.moveTo(xi, yi) : ctx.lineTo(xi, yi);
  }
  ctx.strokeStyle = '#34d399'; ctx.lineWidth = 2; ctx.stroke();
  const sr = Math.sin(iAngle * Math.PI / 180) / n2;
  if (sr <= 1) {
    const r = Math.asin(sr) * 180 / Math.PI;
    const cx2 = 40 + (iAngle / 90) * (W - 50), cy2 = (H - 20) - (r / 90) * (H - 30);
    ctx.beginPath(); ctx.arc(cx2, cy2, 5, 0, Math.PI * 2); ctx.fillStyle = '#00d4ff'; ctx.fill();
  }
}

// ============================================================
// PAGE 3: THINK QUESTIONS
// ============================================================
const TQS = [
  { unit: 'ELECTROSTATICS', q: 'Do positive charges ke beech distance double karne pe force?', opts: ['Double ho jaata hai', '4 guna ho jaata hai', '1/4 reh jaata hai', 'Same rehta hai'], ans: 2, exp: "F ∝ 1/r². Distance double → r² = 4x → F = 1/4. Inverse square law!", diff: 'easy' },
  { unit: 'OHM\'S LAW', q: 'Voltage same rakho, resistance 3 guna karo — current?', opts: ['3 guna', '1/3 ho jaayega', 'Same rehega', 'Zero ho jaayega'], ans: 1, exp: "I = V/R. R triple → I = V/3R = 1/3 original. Simple inverse relation!", diff: 'easy' },
  { unit: 'MAGNETIC FIELDS', q: 'Electron B field ke parallel move kare — magnetic force kaisi hogi?', opts: ['Maximum (qvB)', 'Zero', 'qvB/2', 'F = qv+B'], ans: 1, exp: "F = qvBsinθ. θ=0° (parallel) → sin0°=0 → F=0. No deflection!", diff: 'medium' },
  { unit: 'EM INDUCTION', q: 'Coil ki turns number double karo, same flux change — EMF?', opts: ['Same', 'Half', 'Double', '4 guna'], ans: 2, exp: "EMF = N×dΦ/dt. N double → EMF double. More turns = more EMF for same flux change.", diff: 'medium' },
  { unit: 'OPTICS', q: 'Concave lens ki focal length 20cm hai. Object 60cm pe — image kahaan?', opts: ['15cm virtual same side', '15cm real other side', '30cm real', '60cm virtual'], ans: 0, exp: "1/v - 1/u = 1/f. u=-60, f=+20 (concave). 1/v = 1/20 - 1/60 = 2/60. v=+15cm? Nahi — concave: 1/v = 1/(-20)+1/(-60) = -4/60 = v=-15cm virtual.", diff: 'hard' },
  { unit: 'PHOTOELECTRIC', q: 'UV light ka intensity double karo — electrons ki max KE?', opts: ['Double ho jaayegi', 'Half ho jaayegi', 'Same rehegi', 'Zero ho jaayegi'], ans: 2, exp: "KE_max = hf − φ. Intensity = zyada photons, but har photon ki energy hf same! KE change nahi hoti. Sirf frequency se KE change hoti hai.", diff: 'medium' },
  { unit: 'SEMICONDUCTORS', q: 'Forward bias mein diode mein current flow karta hai kyun?', opts: ['Electrons destroy ho jaate hain', 'Depletion region narrow ho jaati hai', 'Reverse leakage current badh jaata hai', 'Holes disappear ho jaate hain'], ans: 1, exp: "Forward bias: +ve to p, -ve to n. Majority carriers junction ki taraf push hote hain → depletion region narrow → barrier reduce → current flow.", diff: 'medium' },
  { unit: 'CURRENT ELECTRICITY', q: '3 equal resistors of R each in parallel — equivalent resistance?', opts: ['3R', 'R', 'R/3', 'R/9'], ans: 2, exp: "Parallel: 1/Req = 1/R + 1/R + 1/R = 3/R. Req = R/3. Parallel always less than smallest individual.", diff: 'easy' },
  { unit: 'WAVE OPTICS', q: 'Young\'s double slit — fringe width β = λD/d. D double karo (d same), β?', opts: ['Same', 'Half', 'Double', '4 guna'], ans: 2, exp: "β = λD/d. D double → β double. Fringe width directly proportional to distance D.", diff: 'hard' },
  { unit: 'MAGNETISM', q: 'Two parallel wires — currents opposite direction mein. Force?', opts: ['Attract', 'Repel', 'Zero', 'Depends'], ans: 1, exp: "Opposite direction currents → repel. Same direction → attract. Ampere's law se derive hota hai.", diff: 'medium' },
];

let tqCorrect = 0, tqWrong = 0;
function renderThinkCards() {
  document.getElementById('thinkGrid').innerHTML = TQS.map((q, i) => `
    <div class="tq-card" id="tqc-${i}">
      <span class="tq-score-badge difficulty-${q.diff}">${q.diff.toUpperCase()}</span>
      <div class="tq-unit">${q.unit}</div>
      <div class="tq-q">"${q.q}"</div>
      <div class="tq-timer" id="tq-timer-${i}">
        <div class="timer-bar"><div class="timer-fill" id="tf-${i}" style="width:100%"></div></div>
        <div class="timer-txt" id="tt-${i}">30s</div>
      </div>
      <div class="tq-options">
        ${q.opts.map((o, oi) => `
          <button class="tq-opt" id="tqo-${i}-${oi}" onclick="answerTQ(${i},${oi})">
            <span style="opacity:.4;margin-right:8px;">${String.fromCharCode(65 + oi)}.</span>${o}
          </button>
        `).join('')}
      </div>
      <div class="tq-explain" id="tqe-${i}">${q.exp}</div>
    </div>
  `).join('');
  TQS.forEach((_, i) => startTimer(i));
  updateThinkStats();
}

const timers = {};
function startTimer(i) {
  if (timers[i]) clearInterval(timers[i]);
  let sec = 30;
  timers[i] = setInterval(() => {
    sec--;
    const fill = document.getElementById('tf-' + i);
    const txt = document.getElementById('tt-' + i);
    if (fill) fill.style.width = (sec / 30 * 100) + '%';
    if (txt) txt.textContent = sec + 's';
    if (sec <= 0) { clearInterval(timers[i]); autoFail(i); }
  }, 1000);
}

function autoFail(i) {
  document.querySelectorAll(`#tqc-${i} .tq-opt`).forEach(b => b.disabled = true);
  document.getElementById(`tqo-${i}-${TQS[i].ans}`)?.classList.add('correct');
  document.getElementById(`tqe-${i}`).style.display = 'block';
  const tf = document.getElementById('tf-' + i); if (tf) { tf.style.width = '0%'; tf.style.background = '#ef4444'; }
}

const answered = {};
function answerTQ(qi, oi) {
  if (answered[qi]) return;
  answered[qi] = true;
  clearInterval(timers[qi]);
  const q = TQS[qi], ok = oi === q.ans;
  if (ok) tqCorrect++; else tqWrong++;
  for (let j = 0; j < q.opts.length; j++) {
    const b = document.getElementById(`tqo-${qi}-${j}`); if (!b) continue;
    b.disabled = true;
    if (j === q.ans) b.classList.add('correct');
    if (j === oi && !ok) b.classList.add('wrong');
  }
  document.getElementById('tqe-' + qi).style.display = 'block';
  updateThinkStats();
}
function updateThinkStats() {
  document.getElementById('tq-correct').textContent = tqCorrect;
  document.getElementById('tq-wrong').textContent = tqWrong;
  const total = tqCorrect + tqWrong;
  document.getElementById('tq-pct').textContent = total ? Math.round(tqCorrect / total * 100) + '%' : '—';
}

// ============================================================
// PAGE 4: PROGRESS
// ============================================================
const UNIT_DATA = [
  { emoji: '⚡', title: 'ELECTROSTATICS', color: '#f472b6', done: 2, total: 2 },
  { emoji: '🔌', title: 'CURRENT ELECTRICITY', color: '#60a5fa', done: 1, total: 1 },
  { emoji: '🧲', title: 'MAGNETIC EFFECTS', color: '#a78bfa', done: 1, total: 2 },
  { emoji: '🌀', title: 'EM INDUCTION & AC', color: '#fb923c', done: 0, total: 2 },
  { emoji: '🌊', title: 'EM WAVES', color: '#34d399', done: 0, total: 1 },
  { emoji: '🔭', title: 'OPTICS', color: '#34d399', done: 1, total: 2 },
  { emoji: '☢️', title: 'MODERN PHYSICS', color: '#f87171', done: 0, total: 2 },
  { emoji: '⚛️', title: 'ATOMS & NUCLEI', color: '#fbbf24', done: 0, total: 1 },
  { emoji: '💻', title: 'SEMICONDUCTORS', color: '#22d3ee', done: 0, total: 1 },
];
const ACHIEVEMENTS = [
  { icon: '🌟', name: 'FIRST STEP', desc: 'Complete 1 topic', earned: true },
  { icon: '⚡', name: 'SPARKY', desc: 'Finish Electrostatics', earned: true },
  { icon: '🔥', name: 'ON FIRE', desc: '7-day streak', earned: true },
  { icon: '🎯', name: 'SHARPSHOOTER', desc: '10/10 quiz score', earned: false },
  { icon: '🧠', name: 'THINKER', desc: 'Answer 5 think Qs', earned: false },
  { icon: '🏆', name: 'CHAMPION', desc: 'Complete all units', earned: false },
  { icon: '⚡', name: 'SPEED RUN', desc: 'Finish in < 1 hour', earned: false },
  { icon: '💯', name: 'PERFECT', desc: '100% accuracy', earned: false },
];

function renderProgress() {
  // Ring
  const done = UNIT_DATA.reduce((a, u) => a + u.done, 0);
  const total = UNIT_DATA.reduce((a, u) => a + u.total, 0);
  const pct = Math.round(done / total * 100);
  const circ = 2 * Math.PI * 52;
  document.getElementById('ringFill').setAttribute('stroke-dashoffset', circ - (circ * pct / 100));
  document.getElementById('ringPct').textContent = pct + '%';
  document.getElementById('ps-done').textContent = `${done} / ${total}`;

  // Streak days
  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  const doneIdx = [0, 1, 2, 3, 4, 5, 6]; const today = new Date().getDay() || 7;
  document.getElementById('streakDays').innerHTML = days.map((d, i) => `
    <div class="streak-day ${i < 7 ? 'done' : ''} ${i === today - 1 ? 'today' : ''}">${d}</div>
  `).join('');

  // Unit list
  document.getElementById('unitProgList').innerHTML = UNIT_DATA.map(u => {
    const p = Math.round(u.done / u.total * 100);
    return `<div class="up-card" style="--up-color:${u.color}">
      <div class="up-row">
        <div class="up-emoji">${u.emoji}</div>
        <div class="up-info">
          <div class="up-title">${u.title}</div>
          <div class="up-sub">${u.done}/${u.total} topics done</div>
        </div>
        <div class="up-right">
          <div class="up-pct">${p}%</div>
          <div class="up-done">${u.done === u.total ? '✅ Done' : 'In progress'}</div>
        </div>
      </div>
      <div class="up-bar"><div class="up-bar-fill" style="width:${p}%"></div></div>
    </div>`;
  }).join('');

  // Achievements
  document.getElementById('achGrid').innerHTML = ACHIEVEMENTS.map(a => `
    <div class="ach-card ${a.earned ? 'earned' : ''}">
      <div class="ach-icon">${a.icon}</div>
      <div class="ach-name">${a.name}</div>
      <div style="font-size:.68rem;color:var(--muted);margin-top:3px;">${a.desc}</div>
    </div>
  `).join('');
}
