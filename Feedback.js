/* ── PREMIUM 3D FEEDBACK CANVAS ── */
   

const canvas = document.getElementById('bgCanvas');
const ctx = canvas.getContext('2d');
let W, H, mouseX = 0, mouseY = 0, tick = 0;

function resize() {
  W = canvas.width  = window.innerWidth;
  H = canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

document.addEventListener('mousemove', e => {
  mouseX = (e.clientX / W - 0.5) * 2;
  mouseY = (e.clientY / H - 0.5) * 2;
});

/* ── OBJECTS ── */

// Central orb
const orb = {
  x: () => W * 0.72 + mouseX * 18,
  y: () => H * 0.45 + mouseY * 12,
  r: 110,
  pulse: 0
};

// Ring waves
const rings = Array.from({length: 4}, (_, i) => ({
  progress: i / 4,
  opacity: 0
}));

// Star particles
const stars = Array.from({length: 55}, () => ({
  x: Math.random() * 1, y: Math.random() * 1,
  r: 1.5 + Math.random() * 3.5,
  speed: 0.0002 + Math.random() * 0.0006,
  angle: Math.random() * Math.PI * 2,
  orbitR: 60 + Math.random() * 340,
  orbitCX: 0.5 + (Math.random() - 0.5) * 0.6,
  orbitCY: 0.45 + (Math.random() - 0.5) * 0.5,
  opacity: 0.3 + Math.random() * 0.7,
  color: ['#f5a623','#fdd07a','#e8890c','#fbbf24','#fff0c0'][Math.floor(Math.random()*5)]
}));

// Speech bubbles
const bubbles = [
  { tx:0.68, ty:0.12, text:'Great animations!', stars:5, delay:0,   w:180 },
  { tx:0.82, ty:0.28, text:'So helpful for exams', stars:5, delay:25, w:190 },
  { tx:0.58, ty:0.72, text:'Love the AI tutor!', stars:4, delay:50,  w:175 },
  { tx:0.78, ty:0.78, text:'Concepts feel real now', stars:5, delay:35, w:200 },
  { tx:0.88, ty:0.55, text:'Best study app ⚡', stars:5, delay:60,   w:160 },
];

// Floating emojis
const floatEmojis = [
  {emoji:'⭐', x:0.12, y:0.18, a:0, speed:0.004, amp:25},
  {emoji:'💬', x:0.85, y:0.15, a:1, speed:0.003, amp:20},
  {emoji:'🌟', x:0.05, y:0.6,  a:2, speed:0.005, amp:30},
  {emoji:'❤️', x:0.9,  y:0.7,  a:3, speed:0.004, amp:22},
  {emoji:'✨', x:0.15, y:0.82, a:4, speed:0.006, amp:18},
  {emoji:'🏆', x:0.92, y:0.38, a:5, speed:0.003, amp:28},
];

// Geometric hexagon grid (subtle)
function drawHexGrid() {
  const s = 48;
  ctx.save();
  ctx.strokeStyle = 'rgba(245,166,35,0.04)';
  ctx.lineWidth = 1;
  for (let row = -1; row < H/s/0.87 + 2; row++) {
    for (let col = -1; col < W/(s*1.5) + 2; col++) {
      const x = col * s * 1.5;
      const y = row * s * 0.87 + (col % 2 === 0 ? 0 : s * 0.435);
      drawHex(x + mouseX * 4, y + mouseY * 3, s * 0.48);
    }
  }
  ctx.restore();
}
function drawHex(cx, cy, r) {
  ctx.beginPath();
  for (let i = 0; i < 6; i++) {
    const a = (Math.PI/3) * i - Math.PI/6;
    i === 0 ? ctx.moveTo(cx + r*Math.cos(a), cy + r*Math.sin(a)):
    ctx.lineTo(cx + r*Math.cos(a), cy + r*Math.sin(a));
  }
  ctx.closePath();
  ctx.stroke();
}

// Draw a speech bubble
function drawBubble(b, t) {
  const phase = ((t * 0.015 + b.delay * 0.01) % (Math.PI * 2));
  const floatY = Math.sin(phase) * 12;
  const bx = (b.tx + mouseX * 0.012) * W;
  const by = (b.ty + mouseY * 0.008) * H + floatY;
  const bw = b.w, bh = 56, br = 12;

  ctx.save();

  // Shadow
  ctx.shadowColor = 'rgba(180,120,0,0.15)';
  ctx.shadowBlur = 18;
  ctx.shadowOffsetY = 6;

  // Bubble body
  const grad = ctx.createLinearGradient(bx - bw/2, by - bh/2, bx + bw/2, by + bh/2);
  grad.addColorStop(0, 'rgba(255,253,245,0.90)');
  grad.addColorStop(1, 'rgba(255,248,235,0.82)');
  ctx.fillStyle = grad;
  ctx.strokeStyle = 'rgba(245,166,35,0.28)';
  ctx.lineWidth = 1.5;
  roundRect(ctx, bx - bw/2, by - bh/2, bw, bh, br);
  ctx.fill(); ctx.stroke();

  // Tail
  ctx.beginPath();
  ctx.moveTo(bx - 10, by + bh/2);
  ctx.lineTo(bx, by + bh/2 + 12);
  ctx.lineTo(bx + 10, by + bh/2);
  ctx.fillStyle = 'rgba(255,248,235,0.82)';
  ctx.fill();
  ctx.strokeStyle = 'rgba(245,166,35,0.28)';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(bx - 10, by + bh/2);
  ctx.lineTo(bx, by + bh/2 + 12);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(bx + 10, by + bh/2);
  ctx.lineTo(bx, by + bh/2 + 12);
  ctx.stroke();

  ctx.shadowBlur = 0; ctx.shadowOffsetY = 0;

  // Stars
  ctx.fillStyle = '#f5a623';
  ctx.font = '11px serif';
  const starStr = '★'.repeat(b.stars) + '☆'.repeat(5 - b.stars);
  ctx.textAlign = 'center';
  ctx.fillText(starStr, bx, by - 10);

  // Text
  ctx.fillStyle = '#3d2f10';
  ctx.font = '600 12px Outfit, sans-serif';
  ctx.fillText(b.text, bx, by + 9);

  ctx.restore();
}

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x+w, y, x+w, y+r);
  ctx.lineTo(x+w, y+h-r);
  ctx.quadraticCurveTo(x+w, y+h, x+w-r, y+h);
  ctx.lineTo(x+r, y+h);
  ctx.quadraticCurveTo(x, y+h, x, y+h-r);
  ctx.lineTo(x, y+r);
  ctx.quadraticCurveTo(x, y, x+r, y);
  ctx.closePath();
}

/* ── MAIN RENDER ── */
function render() {
  tick++;
  ctx.clearRect(0, 0, W, H);

  // Background gradient
  const bgGrad = ctx.createLinearGradient(0, 0, W, H);
  bgGrad.addColorStop(0,   '#fff8ec');
  bgGrad.addColorStop(0.5, '#ffefc8');
  bgGrad.addColorStop(1,   '#fff3d4');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, W, H);

  // Hex grid
  drawHexGrid();

  // ── Central orb ──
  const ox = orb.x(), oy = orb.y();

  // Pulse rings
  rings.forEach((ring, i) => {
    ring.progress += 0.004;
    if (ring.progress > 1) ring.progress = 0;
    const r = orb.r * 0.8 + ring.progress * orb.r * 2.2;
    const alpha = Math.max(0, (1 - ring.progress) * 0.22);
    ctx.beginPath();
    ctx.arc(ox, oy, r, 0, Math.PI*2);
    ctx.strokeStyle = `rgba(245,166,35,${alpha})`;
    ctx.lineWidth = 2;
    ctx.stroke();
  });

  // Orb glow layers
  for (let g = 3; g >= 0; g--) {
    const glowR = orb.r * (1 + g * 0.6);
    const glowAlpha = 0.12 - g * 0.025;
    ctx.beginPath();
    ctx.arc(ox, oy, glowR, 0, Math.PI*2);
    ctx.fillStyle = `rgba(245,166,35,${glowAlpha})`;
    ctx.fill();
  }

  // Orb body
  const orbGrad = ctx.createRadialGradient(ox - orb.r*0.3, oy - orb.r*0.3, orb.r*0.1, ox, oy, orb.r);
  orbGrad.addColorStop(0, 'rgba(255,248,225,0.85)');
  orbGrad.addColorStop(0.4, 'rgba(253,208,122,0.65)');
  orbGrad.addColorStop(0.75, 'rgba(245,166,35,0.35)');
  orbGrad.addColorStop(1, 'rgba(232,137,12,0.05)');
  ctx.beginPath();
  ctx.arc(ox, oy, orb.r, 0, Math.PI*2);
  ctx.fillStyle = orbGrad;
  ctx.fill();

  // Inner shimmer on orb
  const shX = ox + Math.sin(tick * 0.02) * orb.r * 0.2;
  const shY = oy + Math.cos(tick * 0.018) * orb.r * 0.15;
  const shimGrad = ctx.createRadialGradient(shX, shY, 0, shX, shY, orb.r * 0.5);
  shimGrad.addColorStop(0, 'rgba(255,255,255,0.35)');
  shimGrad.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.beginPath();
  ctx.arc(ox, oy, orb.r, 0, Math.PI*2);
  ctx.fillStyle = shimGrad;
  ctx.fill();

  // Star icon inside orb
  ctx.save();
  ctx.font = `${orb.r * 0.8}px serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.globalAlpha = 0.28 + Math.sin(tick * 0.03) * 0.07;
  ctx.fillText('⭐', ox, oy);
  ctx.restore();

  // ── Star particles ──
  stars.forEach(s => {
    s.angle += s.speed;
    const cx = s.orbitCX * W + mouseX * 15;
    const cy = s.orbitCY * H + mouseY * 10;
    const sx = cx + Math.cos(s.angle) * s.orbitR;
    const sy = cy + Math.sin(s.angle) * s.orbitR * 0.55;

    // Trail
    ctx.beginPath();
    ctx.arc(sx, sy, s.r, 0, Math.PI*2);
    ctx.fillStyle = s.color;
    ctx.globalAlpha = s.opacity * (0.5 + 0.5 * Math.sin(tick * 0.05 + s.angle * 3));
    ctx.fill();
    ctx.globalAlpha = 1;
  });

  // ── Speech bubbles ──
  bubbles.forEach(b => drawBubble(b, tick));

  // ── Floating emojis ──
  floatEmojis.forEach(fe => {
    const ex = fe.x * W + mouseX * 10;
    const ey = fe.y * H + Math.sin(tick * fe.speed * 60 + fe.a) * fe.amp + mouseY * 6;
    ctx.save();
    ctx.font = '28px serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.globalAlpha = 0.55 + 0.3 * Math.sin(tick * fe.speed * 80 + fe.a);
    ctx.shadowColor = 'rgba(245,166,35,0.4)';
    ctx.shadowBlur = 12;
    ctx.fillText(fe.emoji, ex, ey);
    ctx.restore();
  });

  // Vignette edges
  const vig = ctx.createRadialGradient(W/2, H/2, H*0.3, W/2, H/2, H*0.85);
  vig.addColorStop(0, 'rgba(255,248,236,0)');
  vig.addColorStop(1, 'rgba(255,240,210,0.25)');
  ctx.fillStyle = vig;
  ctx.fillRect(0, 0, W, H);

  requestAnimationFrame(render);
}
render();

/* ══════════════════════════════════════
   FORM LOGIC
══════════════════════════════════════ */
const steps = 4;
let currentStep = 1;

const stepLabels = [
  'Step 1 of 4 — Overall Feeling',
  'Step 2 of 4 — Detailed Ratings',
  'Step 3 of 4 — Your Thoughts',
  'Step 4 of 4 — About You'
];

function goStep(n) {
  if (n < 1 || n > steps) return;
  document.getElementById('step' + currentStep).classList.remove('active');
  currentStep = n;
  document.getElementById('step' + currentStep).classList.add('active');

  // Update progress
  const pct = Math.round((n / steps) * 100);
  document.getElementById('progressFill').style.width = pct + '%';
  document.getElementById('stepLabel').textContent = stepLabels[n - 1];
  document.getElementById('stepPct').textContent = pct + '%';
}

function selectMood(btn) {
  document.querySelectorAll('.mood-btn').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
}

function rateStar(groupId, rating) {
  const container = document.getElementById(groupId);
  const stars = container.querySelectorAll('.star');
  stars.forEach((s, i) => {
    s.classList.toggle('lit', i < rating);
  });
}

function toggleChip(el) { el.classList.toggle('selected'); }

function countChars(textarea, countId) {
  document.getElementById(countId).textContent = textarea.value.length;
}

function submitFeedback() {
  // Hide form elements
  document.getElementById('cardHeader').style.display = 'none';
  document.getElementById('progressWrap').style.display = 'none';
  document.getElementById('step' + currentStep).classList.remove('active');

  // Show success
  const success = document.getElementById('successState');
  success.style.display = 'block';

  // Animate extra stars on canvas
  for (let i = 0; i < 20; i++) {
    stars.push({
      x: Math.random(), y: Math.random(),
      r: 2 + Math.random() * 5,
      speed: 0.001 + Math.random() * 0.002,
      angle: Math.random() * Math.PI * 2,
      orbitR: 20 + Math.random() * 200,
      orbitCX: 0.3 + Math.random() * 0.4,
      orbitCY: 0.3 + Math.random() * 0.4,
      opacity: 0.8,
      color: '#f5a623'
    });
  }
}