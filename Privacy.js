const canvas = document.getElementById('bgCanvas');
const ctx = canvas.getContext('2d');
let W, H, tick = 0, mouseX = 0, mouseY = 0;

function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

document.addEventListener('mousemove', e => {
    mouseX = (e.clientX / W - 0.5) * 2;
    mouseY = (e.clientY / H - 0.5) * 2;
});

/* ── PARTICLE SYSTEM ── */
const particles = Array.from({ length: 80 }, () => ({
    x: Math.random() * W,
    y: Math.random() * H,
    r: 1 + Math.random() * 3,
    vx: (Math.random() - 0.5) * 0.5,
    vy: (Math.random() - 0.5) * 0.5,
    opacity: Math.random() * 0.5 + 0.2,
    color: ['rgba(37,99,235,', 'rgba(59,130,246,', 'rgba(147,197,253,'][Math.floor(Math.random() * 3)]
}));

/* ── FLOATING LINES (NETWORK EFFECT) ── */
const nodes = Array.from({ length: 12 }, () => ({
    x: Math.random() * W,
    y: Math.random() * H,
    vx: (Math.random() - 0.5) * 0.3,
    vy: (Math.random() - 0.5) * 0.3,
    r: 3 + Math.random() * 5
}));

/* ── SECURITY SHIELD ORBS ── */
const shields = Array.from({ length: 5 }, (_, i) => ({
    x: (i + 1) / 6 * W,
    y: (Math.sin(i) + 1) / 2 * H,
    r: 40 + Math.random() * 80,
    angle: Math.random() * Math.PI * 2,
    spin: 0.001 + Math.random() * 0.003,
    opacity: 0.08 + Math.random() * 0.04
}));

function animate() {
    tick++;
    ctx.clearRect(0, 0, W, H);

    // Background
    const bgGrad = ctx.createLinearGradient(0, 0, W, H);
    bgGrad.addColorStop(0, '#eff6ff');
    bgGrad.addColorStop(0.5, '#dbeafe');
    bgGrad.addColorStop(1, '#e0e7ff');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, W, H);

    // ── GRID PATTERN ──
    ctx.strokeStyle = 'rgba(37,99,235,0.04)';
    ctx.lineWidth = 1;
    const gridSize = 50;
    for (let x = 0; x < W; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, H);
        ctx.stroke();
    }
    for (let y = 0; y < H; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(W, y);
        ctx.stroke();
    }

    // ── SECURITY SHIELD ORBS ──
    shields.forEach(s => {
        s.angle += s.spin;
        const x = s.x + Math.sin(tick * 0.003 + s.angle) * 20;
        const y = s.y + Math.cos(tick * 0.004 + s.angle) * 20;

        // Rings
        for (let ring = 0; ring < 3; ring++) {
            ctx.beginPath();
            ctx.arc(x, y, s.r + ring * 30, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(37,99,235,${s.opacity * (1 - ring * 0.3)})`;
            ctx.lineWidth = 1.5;
            ctx.stroke();
        }

        // Core glow
        const coreGrad = ctx.createRadialGradient(x, y, 0, x, y, s.r);
        coreGrad.addColorStop(0, `rgba(59,130,246,${s.opacity * 0.6})`);
        coreGrad.addColorStop(1, 'rgba(37,99,235,0)');
        ctx.beginPath();
        ctx.arc(x, y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = coreGrad;
        ctx.fill();
    });

    // ── NODES & CONNECTIONS ──
    nodes.forEach(n => {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > W) n.vx *= -1;
        if (n.y < 0 || n.y > H) n.vy *= -1;

        // Draw node
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        const nodeGrad = ctx.createRadialGradient(n.x - n.r / 3, n.y - n.r / 3, 0, n.x, n.y, n.r);
        nodeGrad.addColorStop(0, 'rgba(147,197,253,0.7)');
        nodeGrad.addColorStop(1, 'rgba(59,130,246,0.3)');
        ctx.fillStyle = nodeGrad;
        ctx.fill();
    });

    // Draw connections
    for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
            const dx = nodes[i].x - nodes[j].x;
            const dy = nodes[i].y - nodes[j].y;
            const d = Math.sqrt(dx * dx + dy * dy);
            if (d < 200) {
                ctx.beginPath();
                ctx.moveTo(nodes[i].x, nodes[i].y);
                ctx.lineTo(nodes[j].x, nodes[j].y);
                ctx.strokeStyle = `rgba(37,99,235,${0.1 * (1 - d / 200)})`;
                ctx.lineWidth = 1;
                ctx.stroke();
            }
        }
    }

    // ── PARTICLES ──
    particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color + (p.opacity + Math.sin(tick * 0.02) * 0.2) + ')';
        ctx.fill();
    });

    // ── VIGNETTE ──
    const vig = ctx.createRadialGradient(W / 2, H / 2, H * 0.2, W / 2, H / 2, H * 1);
    vig.addColorStop(0, 'rgba(239,246,255,0)');
    vig.addColorStop(1, 'rgba(255,255,255,0.3)');
    ctx.fillStyle = vig;
    ctx.fillRect(0, 0, W, H);

    requestAnimationFrame(animate);
}
animate();

/* ── SMOOTH SCROLL TO SECTION ── */
document.querySelectorAll('.toc-item').forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
});