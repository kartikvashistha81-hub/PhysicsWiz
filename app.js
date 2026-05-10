// ============================================================
// PHYSICSWIZ — APP.JS
// All logic: navigation, rendering, animations, AI, quiz, progress
// ============================================================
// ---- FORMULA SYSTEM ----
const FORMULA_MAP = {
  charges: {
    formula: "F = k × (q₁q₂ / r²)",
    note: "Coulomb's Law — Force between charges"
  },
  capacitor: {
    formula: "C = Q / V",
    note: "Capacitance formula"
  },
  current: {
    formula: "I = Q / t",
    note: "Electric current definition"
  },
  magnetic: {
    formula: "B ∝ I / r",
    note: "Magnetic field around current"
  },
  induction: {
    formula: "E = - dΦ/dt",
    note: "Faraday’s Law"
  },
  optics: {
    formula: "1/f = 1/v + 1/u",
    note: "Lens formula"
  },
  photoelectric: {
    formula: "E = h f",
    note: "Photoelectric equation"
  },
  diode: {
    formula: "V = I R",
    note: "Ohm’s Law"
  }
};
// ---- STATE ----
const state = {
  completedTopics: JSON.parse(localStorage.getItem('pw_completed') || '[]'),
  quizScores: parseInt(localStorage.getItem('pw_quiz_scores') || '0'),
  currentUnit: null,
  currentTopic: null
};

// ---- NAVIGATION ----
function showPage(page, unitId, topicId) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById('page-' + page).classList.add('active');
  window.scrollTo(0, 0);
  if (page === 'units') renderUnitsGrid();
  if (page === 'concept' && unitId) renderConcept(unitId, topicId);
  if (page === 'quiz') renderQuizPage();
  if (page === 'progress') renderProgress();
  if (page === 'home') renderHomeUnits();
}
function renderFormula(vizType) {
  const box = document.getElementById('formulaBox');
  if (!box) return;

  const data = FORMULA_MAP[vizType];

  if (!data) {
    box.innerHTML = `<p style="color:#aaa">No formula available</p>`;
    return;
  }

  box.innerHTML = `
        <div class="formula-main">${data.formula}</div>
        <div class="formula-note">${data.note}</div>
    `;
}
// ---- HOME ----
function renderHomeUnits() {
  const grid = document.getElementById('homeUnitGrid');
  if (!grid) return;
  grid.innerHTML = UNITS.map(u => `
    <div class="col-6 col-md-4 col-lg-3">
      <div class="unit-card" style="--unit-color:${u.color}" onclick="showPage('concept','${u.id}','${u.subtopics[0].id}')">
        <div class="unit-emoji">${u.emoji}</div>
        <div class="unit-num">${u.num}</div>
        <div class="unit-title">${u.title}</div>
        <div class="unit-topics">${u.topics.length} topic${u.topics.length > 1 ? 's' : ''}</div>
        ${isDone(u.subtopics[0].id) ? '<div class="unit-done-badge">✓ Started</div>' : ''}
      </div>
    </div>
  `).join('');
}

// ---- UNITS PAGE ----
function renderUnitsGrid() {
  const grid = document.getElementById('unitsGrid');
  if (!grid) return;
  grid.innerHTML = UNITS.map(u => `
    <div class="col-md-6 col-lg-4">
      <div class="unit-card" style="--unit-color:${u.color}" onclick="showPage('concept','${u.id}','${u.subtopics[0].id}')">
        <div class="unit-emoji">${u.emoji}</div>
        <div class="unit-num">${u.num}</div>
        <div class="unit-title">${u.title}</div>
        <div class="unit-topics mt-1">${u.desc}</div>
        <div class="mt-3" style="font-size:0.8rem;color:var(--muted)">
          ${u.subtopics.map(t => `<span style="display:inline-block;margin-right:8px;margin-bottom:4px;">
            ${isDone(t.id) ? '✅' : '○'} ${t.title}
          </span>`).join('')}
        </div>
      </div>
    </div>
  `).join('');
}

// ---- CONCEPT PAGE ----
function renderConcept(unitId, topicId) {
  const unit = UNITS.find(u => u.id === unitId);
  if (!unit) return;
  const topic = unit.subtopics.find(t => t.id === topicId) || unit.subtopics[0];
  state.currentUnit = unit;
  state.currentTopic = topic;

  const container = document.getElementById('conceptContent');
  container.innerHTML = `
    <button class="back-btn" onclick="showPage('units')">← Back to Chapters</button>

    <!-- Topic nav tabs -->
    ${unit.subtopics.length > 1 ? `<div class="topic-nav">
      ${unit.subtopics.map(t => `
        <button class="topic-tab ${t.id === topic.id ? 'active' : ''}"
          onclick="showPage('concept','${unitId}','${t.id}')">
          ${t.title}
        </button>
      `).join('')}
    </div>` : ''}

    <!-- Concept Header -->
    <div class="concept-header">
      <div class="concept-badge">${unit.emoji} ${unit.num} — ${unit.title}</div>
      <h1 class="concept-title">${topic.title}</h1>
    </div>

    <div class="row gy-4">
      <div class="col-lg-8">

        <!-- STEP 1: Real Question -->
        <div class="step-card">
          <div class="step-label"><div class="step-num">1</div> REAL-LIFE QUESTION</div>
          <div class="step-question">"${topic.realQ}"</div>
        </div>

        <!-- STEP 2: Visualization -->
        <div class="step-card">
          <div class="step-label"><div class="step-num">2</div> VISUALIZE IT</div>
          <div class="viz-box">
            <canvas id="vizCanvas" width="560" height="220"></canvas>
            <div class="viz-label">Interactive visualization — watch the physics happen</div>
          </div>
        </div>

        <!-- STEP 3: Explanation -->
        <div class="step-card">
          <div class="step-label"><div class="step-num">3</div> UNDERSTAND IT</div>
          <div class="step-explanation">${topic.explanation}</div>
          <div class="formula-box" id="formulaBox"></div>
          <p style="font-size:0.85rem;color:var(--muted);text-align:center;margin-top:6px;">${topic.formulaNote}</p>
        </div>

        <!-- STEP 4: Think Question -->
        <div class="step-card">
          <div class="step-label"><div class="step-num">4</div> THINK FIRST 🧠</div>
          <div class="think-box">
            <div class="think-label">💭 Think about this before reading the answer:</div>
            <div class="think-q">${topic.thinkQ}</div>
            <button class="think-reveal-btn" onclick="revealThink(this)">💡 Reveal Answer</button>
            <div class="think-answer">${topic.thinkA}</div>
          </div>
        </div>

        <!-- STEP 5: Interactive -->
        <div class="step-card">
          <div class="step-label"><div class="step-num">5</div> INTERACT & EXPLORE 🎛️</div>
          <div class="interact-box">
            <label>${topic.interactLabel} <strong id="sliderVal">${topic.interactDefault} ${topic.interactUnit}</strong></label>
            <input type="range" class="pw-slider mt-3" id="mainSlider"
              min="${topic.interactMin}" max="${topic.interactMax}" value="${topic.interactDefault}"
              oninput="updateInteract(this.value)"/>
            <div class="interact-result" id="interactResult">${topic.interactFn(topic.interactDefault)}</div>
          </div>
        </div>

        <!-- STEP 6: Summary -->
        <div class="step-card">
          <div class="step-label"><div class="step-num">6</div> QUICK SUMMARY ✅</div>
          <div class="summary-box">
            <h5>Key Takeaways</h5>
            <ul>${topic.summary.map(s => `<li>${s}</li>`).join('')}</ul>
          </div>
        </div>

        <!-- MARK DONE & QUIZ -->
        <div class="d-flex gap-3 flex-wrap mb-5">
          <button class="mark-done-btn ${isDone(topic.id) ? 'done' : ''}" id="markDoneBtn"
            onclick="markTopicDone('${topic.id}')">
            ${isDone(topic.id) ? '✓ Completed!' : '✅ Mark as Completed'}
          </button>
          <button class="pw-btn-primary" onclick="showPage('quiz'); loadQuizFor('${topic.quiz}')">
            🎯 Take Quiz for This Topic
          </button>
        </div>

      </div>

      <!-- SIDEBAR -->
      <div class="col-lg-4">
        <div style="position:sticky;top:88px;">
          <!-- Chapter progress -->
          <div class="step-card">
            <div class="step-label">📊 Chapter Progress</div>
            <div class="fw-600 mb-2">${unit.title}</div>
            ${unit.subtopics.map(t => `
              <div class="progress-topic-row">
                <span class="progress-topic-name">${t.title}</span>
                <span class="progress-topic-status ${isDone(t.id) ? 'status-done' : 'status-pending'}">
                  ${isDone(t.id) ? '✓ Done' : 'Pending'}
                </span>
              </div>
            `).join('')}
            <div class="pw-progress mt-3">
              <div class="pw-progress-bar" style="width:${Math.round(unit.subtopics.filter(t => isDone(t.id)).length / unit.subtopics.length * 100)}%"></div>
            </div>
          </div>

          <!-- Quick Facts -->
          <div class="step-card mt-0">
            <div class="step-label">⚡ Did You Know?</div>
            <div style="font-size:0.88rem;line-height:1.7;color:var(--muted)" id="didYouKnow">
              ${getDidYouKnow(topic.id)}
            </div>
          </div>

          <!-- Ask AI button -->
          <div class="step-card mt-0">
            <div class="step-label">🤖 Stuck? Ask AI</div>
            <p style="font-size:0.85rem;color:var(--muted);margin-bottom:12px;">Get instant explanations for any doubt in this topic.</p>
            <button class="pw-btn-primary w-100" onclick="openAskAI('${topic.title}')">Ask about ${topic.title}</button>
          </div>
        </div>
      </div>
    </div>
  `;

  // Start visualization
  setTimeout(() => {
    startViz(topic.vizType);
    renderFormula(topic.vizType); // 🔥 AUTO FORMULA LINK
  }, 100);

  // Slider
  window._currentInteractFn = topic.interactFn;
  window._currentInteractUnit = topic.interactUnit;
}

function updateInteract(val) {
  document.getElementById('sliderVal').textContent = val + ' ' + window._currentInteractUnit;
  document.getElementById('interactResult').innerHTML = window._currentInteractFn(parseFloat(val));
}

function revealThink(btn) {
  const ans = btn.nextElementSibling;
  ans.style.display = 'block';
  btn.textContent = '🔒 Hide Answer';
  btn.onclick = function () {
    ans.style.display = 'none';
    btn.textContent = '💡 Reveal Answer';
    btn.onclick = function () { revealThink(btn); };
  };
}

// ---- VISUALIZATIONS ----
let vizAnimId = null;

function startViz(type) {
  if (vizAnimId) cancelAnimationFrame(vizAnimId);
  const canvas = document.getElementById('vizCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  canvas.width = canvas.parentElement.clientWidth - 40;
  canvas.height = 220;
  const W = canvas.width, H = canvas.height;

  const vizMap = {
    charges: drawCharges,
    capacitor: drawCapacitor,
    current: drawCurrent,
    magnetic: drawMagnetic,
    induction: drawInduction,
    optics: drawOptics,
    photoelectric: drawPhotoelectric,
    diode: drawDiode
  };

  let t = 0;
  function loop() {
    ctx.clearRect(0, 0, W, H);
    (vizMap[type] || drawCharges)(ctx, W, H, t);
    t += 0.025;
    vizAnimId = requestAnimationFrame(loop);
  }
  loop();
}

// CHARGES VIZ
function drawCharges(ctx, W, H, t) {
  const cx = W / 2, cy = H / 2;
  const d = 80 + Math.sin(t) * 20;

  // Field lines
  for (let a = 0; a < 12; a++) {
    const angle = (a / 12) * Math.PI * 2;
    ctx.beginPath();
    ctx.strokeStyle = 'rgba(247,37,133,0.15)';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([4, 6]);
    const r = 30, R = d - 28;
    ctx.moveTo(cx - d + Math.cos(angle) * r, cy + Math.sin(angle) * r);
    ctx.lineTo(cx - d + Math.cos(angle) * R, cy + Math.sin(angle) * R);
    ctx.stroke();
    ctx.setLineDash([]);
  }

  // Charges
  function drawCharge(x, y, positive, label) {
    const grad = ctx.createRadialGradient(x, y, 2, x, y, 28);
    grad.addColorStop(0, positive ? '#f72585' : '#4361ee');
    grad.addColorStop(1, positive ? 'rgba(247,37,133,0.1)' : 'rgba(67,97,238,0.1)');
    ctx.beginPath();
    ctx.arc(x, y, 26, 0, Math.PI * 2);
    ctx.fillStyle = grad;
    ctx.fill();
    ctx.strokeStyle = positive ? '#f72585' : '#4361ee';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 20px serif';
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText(positive ? '+' : '−', x, y + 1);
  }

  drawCharge(cx - d, cy, true, '+');
  drawCharge(cx + d, cy, false, '−');

  // Force arrows
  const f = Math.max(0.3, 1 - (d - 60) / 60);
  const arrowLen = 30 * f;
  // Arrow from + toward −
  drawArrow(ctx, cx - d + 30, cy, cx - d + 30 + arrowLen, cy, '#f72585');
  drawArrow(ctx, cx + d - 30, cy, cx + d - 30 - arrowLen, cy, '#4361ee');

  // Labels
  ctx.fillStyle = '#6b7280'; ctx.font = '12px DM Sans, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('Attraction Force →', cx, H - 14);
  ctx.fillText('+Q', cx - d, cy + 44);
  ctx.fillText('−Q', cx + d, cy + 44);
}

function drawArrow(ctx, x1, y1, x2, y2, color) {
  const angle = Math.atan2(y2 - y1, x2 - x1);
  ctx.beginPath();
  ctx.moveTo(x1, y1); ctx.lineTo(x2, y2);
  ctx.strokeStyle = color; ctx.lineWidth = 2.5;
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(x2, y2);
  ctx.lineTo(x2 - 10 * Math.cos(angle - 0.4), y2 - 10 * Math.sin(angle - 0.4));
  ctx.lineTo(x2 - 10 * Math.cos(angle + 0.4), y2 - 10 * Math.sin(angle + 0.4));
  ctx.closePath();
  ctx.fillStyle = color; ctx.fill();
}

// CAPACITOR VIZ
function drawCapacitor(ctx, W, H, t) {
  const cx = W / 2, cy = H / 2;
  const pw = 10, ph = 130, gap = 60;

  // Plates
  const grad1 = ctx.createLinearGradient(cx - gap / 2 - pw, cy - ph / 2, cx - gap / 2, cy + ph / 2);
  grad1.addColorStop(0, '#f72585'); grad1.addColorStop(1, '#ff758f');
  ctx.fillStyle = grad1;
  ctx.fillRect(cx - gap / 2 - pw, cy - ph / 2, pw, ph);

  const grad2 = ctx.createLinearGradient(cx + gap / 2, cy - ph / 2, cx + gap / 2 + pw, cy + ph / 2);
  grad2.addColorStop(0, '#4361ee'); grad2.addColorStop(1, '#738eff');
  ctx.fillStyle = grad2;
  ctx.fillRect(cx + gap / 2, cy - ph / 2, pw, ph);

  // + and − labels on plates
  ctx.font = 'bold 13px sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  for (let i = 0; i < 5; i++) {
    const y = cy - ph / 2 + 20 + i * 22;
    ctx.fillStyle = '#f72585';
    ctx.fillText('+', cx - gap / 2 - pw / 2, y);
    ctx.fillStyle = '#4361ee';
    ctx.fillText('−', cx + gap / 2 + pw / 2, y);
  }

  // Electric field lines between plates (animated)
  const offset = (t * 0.4) % 1;
  ctx.setLineDash([6, 6]);
  for (let i = 0; i < 5; i++) {
    const y = cy - ph / 2 + 24 + i * 22;
    const x = (cx - gap / 2) + (gap * ((offset + i * 0.2) % 1));
    ctx.beginPath();
    ctx.moveTo(cx - gap / 2 + 2, y);
    ctx.lineTo(cx + gap / 2 - 2, y);
    ctx.strokeStyle = 'rgba(244,162,97,0.7)';
    ctx.lineWidth = 1.5;
    ctx.stroke();
  }
  ctx.setLineDash([]);

  // Arrowheads
  for (let i = 0; i < 5; i++) {
    const y = cy - ph / 2 + 24 + i * 22;
    drawArrow(ctx, cx - 8, y, cx + 8, y, '#f4a261');
  }

  // Labels
  ctx.fillStyle = '#6b7280'; ctx.font = '12px DM Sans, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('E (Electric Field) →', cx, cy + ph / 2 + 24);
  ctx.fillText('+ve plate', cx - gap / 2 - pw - 24, cy - ph / 2 - 14);
  ctx.fillText('−ve plate', cx + gap / 2 + pw + 24, cy - ph / 2 - 14);
}

// CURRENT VIZ
function drawCurrent(ctx, W, H, t) {
  const wireY = H / 2, padding = 40;

  // Wire
  ctx.fillStyle = '#e8c84a';
  ctx.fillRect(padding, wireY - 8, W - padding * 2, 16);
  ctx.strokeStyle = '#c9a800'; ctx.lineWidth = 1;
  ctx.strokeRect(padding, wireY - 8, W - padding * 2, 16);

  // Electrons flowing
  const numE = 12;
  for (let i = 0; i < numE; i++) {
    const xFrac = ((i / numE) + t * 0.4) % 1;
    const x = padding + xFrac * (W - padding * 2);
    const jitter = Math.sin(i * 2.3 + t) * 2;

    ctx.beginPath();
    ctx.arc(x, wireY + jitter, 5, 0, Math.PI * 2);
    const grad = ctx.createRadialGradient(x, wireY + jitter, 0, x, wireY + jitter, 5);
    grad.addColorStop(0, '#4cc9f0');
    grad.addColorStop(1, 'rgba(76,201,240,0.2)');
    ctx.fillStyle = grad;
    ctx.fill();

    // e− label
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 7px sans-serif';
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText('e⁻', x, wireY + jitter);
  }

  // Direction arrow (conventional current = opposite to electron flow)
  drawArrow(ctx, padding + 20, wireY - 28, W - padding - 20, wireY - 28, '#4361ee');
  ctx.fillStyle = '#4361ee'; ctx.font = 'bold 12px DM Sans, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('Conventional Current (I) →', W / 2, wireY - 42);

  drawArrow(ctx, W - padding - 20, wireY + 28, padding + 20, wireY + 28, '#4cc9f0');
  ctx.fillStyle = '#4cc9f0';
  ctx.fillText('← Electron flow (e⁻)', W / 2, wireY + 42);

  // Battery
  ctx.fillStyle = '#2d9b6f';
  ctx.fillRect(padding - 16, wireY - 22, 14, 44);
  ctx.fillStyle = '#fff'; ctx.font = 'bold 10px sans-serif';
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  ctx.fillText('+', padding - 9, wireY - 10);
  ctx.fillText('−', padding - 9, wireY + 10);

  ctx.fillStyle = '#6b7280'; ctx.font = '11px DM Sans, sans-serif';
  ctx.fillText('Battery', padding - 9, wireY + 36);
}

//-- Responsive Design -- 
const menu = document.getElementById("mobileMenu");
const toggleBtn = document.querySelector(".menu-toggle");

function toggleMenu(event) {
  event.stopPropagation();
  menu.classList.toggle("active");
}

/* SCREEN PAR CLICK KARNE SE CLOSE */
document.addEventListener("click", function (e) {

  if (
    menu.classList.contains("active") &&
    !menu.contains(e.target) &&
    !toggleBtn.contains(e.target)
  ) {
    menu.classList.remove("active");
  }

});
// MAGNETIC VIZ
function drawMagnetic(ctx, W, H, t) {
  const cx = W / 2, cy = H / 2;

  // Wire (cross-section: dot = current out of page)
  ctx.beginPath();
  ctx.arc(cx, cy, 18, 0, Math.PI * 2);
  ctx.fillStyle = '#e8c84a';
  ctx.fill();
  ctx.strokeStyle = '#c9a800'; ctx.lineWidth = 2; ctx.stroke();
  ctx.fillStyle = '#1a1a2e'; ctx.font = 'bold 16px sans-serif';
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  ctx.fillText('•', cx, cy);

  // Circular field lines (concentric, rotating)
  const radii = [40, 65, 90];
  radii.forEach((r, idx) => {
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(123,47,255,${0.6 - idx * 0.15})`;
    ctx.lineWidth = 1.5;
    ctx.setLineDash([6, 4]);
    ctx.stroke();
    ctx.setLineDash([]);

    // Rotating arrow on circle
    const a = t + idx * 2;
    const ax = cx + r * Math.cos(a), ay = cy + r * Math.sin(a);
    const tangAngle = a + Math.PI / 2;
    drawArrow(ctx,
      ax - Math.cos(tangAngle) * 8, ay - Math.sin(tangAngle) * 8,
      ax + Math.cos(tangAngle) * 8, ay + Math.sin(tangAngle) * 8,
      '#7b2fff');
  });

  // Labels
  ctx.fillStyle = '#6b7280'; ctx.font = '12px DM Sans, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('Magnetic field lines (circles) around wire', cx, H - 10);
  ctx.fillStyle = '#e8c84a'; ctx.fillText('⊙ Current OUT of page', cx, 18);
}

// INDUCTION VIZ
function drawInduction(ctx, W, H, t) {
  const coilX = W * 0.62, coilY = H / 2, coilW = 80, coilH = 80;
  const magnetX = W * 0.22 + Math.sin(t * 0.8) * 60, magnetY = H / 2;
  const speed = Math.abs(Math.cos(t * 0.8));

  // Magnet
  ctx.fillStyle = '#f72585';
  ctx.fillRect(magnetX - 22, magnetY - 30, 22, 60);
  ctx.fillStyle = '#4361ee';
  ctx.fillRect(magnetX, magnetY - 30, 22, 60);
  ctx.fillStyle = '#fff'; ctx.font = 'bold 14px sans-serif';
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  ctx.fillText('N', magnetX - 11, magnetY);
  ctx.fillText('S', magnetX + 11, magnetY);

  // Coil (drawn as layered arcs)
  ctx.strokeStyle = '#e8c84a'; ctx.lineWidth = 3;
  for (let i = 0; i < 6; i++) {
    const x = coilX + i * 10;
    ctx.beginPath();
    ctx.ellipse(x, coilY, 6, coilH / 2, 0, 0, Math.PI * 2);
    ctx.stroke();
  }

  // EMF arrow / spark
  if (speed > 0.3) {
    const emfAmp = speed;
    const sparkX = coilX + 85, sparkY = coilY - 30;
    ctx.beginPath();
    ctx.moveTo(sparkX, sparkY);
    ctx.lineTo(sparkX + 12 * emfAmp, sparkY + 15 * emfAmp);
    ctx.lineTo(sparkX + 6, sparkY + 10);
    ctx.lineTo(sparkX + 18 * emfAmp, sparkY + 25 * emfAmp);
    ctx.strokeStyle = `rgba(244,162,97,${emfAmp})`;
    ctx.lineWidth = 2; ctx.stroke();

    ctx.fillStyle = '#f4a261'; ctx.font = `bold ${10 + speed * 6}px DM Sans, sans-serif`;
    ctx.textAlign = 'left';
    ctx.fillText(`EMF = ${(speed * 4).toFixed(2)} V`, sparkX + 22, sparkY + 12);
  }

  // Labels
  ctx.fillStyle = '#6b7280'; ctx.font = '12px DM Sans, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('Magnet moving → Flux changes → EMF induced!', W / 2, H - 10);
}

// OPTICS VIZ
function drawOptics(ctx, W, H, t) {
  const lensX = W / 2, lensY = H / 2, f = 70;
  const angle = Math.sin(t * 0.5) * 20 + 20; // incident angle oscillates

  // Lens
  ctx.strokeStyle = '#2d9b6f'; ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(lensX, lensY - 80); ctx.lineTo(lensX, lensY + 80); ctx.stroke();
  ctx.fillStyle = 'rgba(45,155,111,0.12)';
  ctx.beginPath();
  ctx.ellipse(lensX, lensY, 18, 80, 0, 0, Math.PI * 2); ctx.fill();

  // Optical axis
  ctx.strokeStyle = 'rgba(107,114,128,0.3)'; ctx.lineWidth = 1;
  ctx.setLineDash([4, 4]);
  ctx.beginPath(); ctx.moveTo(30, lensY); ctx.lineTo(W - 30, lensY); ctx.stroke();
  ctx.setLineDash([]);

  // Incident ray
  const rayStartX = 50, rayStartY = lensY - 60;
  const hitX = lensX, hitY = lensY + (rayStartY - lensY) * 0.2;

  ctx.beginPath();
  ctx.moveTo(rayStartX, rayStartY);
  ctx.lineTo(hitX, hitY);
  ctx.strokeStyle = '#f4a261'; ctx.lineWidth = 2; ctx.stroke();

  // Refracted ray (through focal point)
  const refractAngle = Math.atan2(hitY - lensY, f);
  const rayEndX = lensX + 200;
  const rayEndY = hitY + (hitY - lensY) * -1.5 + f * 1.2;
  ctx.beginPath();
  ctx.moveTo(hitX, hitY);
  ctx.lineTo(rayEndX, Math.min(H - 20, Math.max(20, rayEndY)));
  ctx.strokeStyle = '#f72585'; ctx.lineWidth = 2; ctx.stroke();

  // Focal point
  ctx.beginPath();
  ctx.arc(lensX + f, lensY, 5, 0, Math.PI * 2);
  ctx.fillStyle = '#4361ee'; ctx.fill();

  // Labels
  ctx.fillStyle = '#6b7280'; ctx.font = '11px DM Sans, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('F', lensX + f, lensY - 12);
  ctx.fillText('Convex lens focuses parallel rays to focal point', W / 2, H - 10);
  ctx.fillStyle = '#f4a261';
  ctx.textAlign = 'left';
  ctx.fillText('Incident ray', rayStartX + 10, rayStartY - 8);
  ctx.fillStyle = '#f72585';
  ctx.fillText('Refracted ray', hitX + 20, hitY - 12);
}

// PHOTOELECTRIC VIZ
function drawPhotoelectric(ctx, W, H, t) {
  const metalY = H * 0.62, metalLeft = 60, metalRight = W - 60;

  // Metal plate
  const metalGrad = ctx.createLinearGradient(0, metalY, 0, H - 20);
  metalGrad.addColorStop(0, '#4361ee'); metalGrad.addColorStop(1, '#2541b2');
  ctx.fillStyle = metalGrad;
  ctx.fillRect(metalLeft, metalY, metalRight - metalLeft, H - metalY - 20);

  // Photons coming down
  const numPhotons = 6;
  for (let i = 0; i < numPhotons; i++) {
    const x = metalLeft + 30 + i * ((metalRight - metalLeft - 60) / (numPhotons - 1));
    const y = ((t * 0.6 + i * 0.16) % 1) * (metalY - 20) + 10;
    ctx.beginPath();
    ctx.arc(x, y, 6, 0, Math.PI * 2);
    const pGrad = ctx.createRadialGradient(x, y, 0, x, y, 6);
    pGrad.addColorStop(0, '#f4a261'); pGrad.addColorStop(1, 'rgba(244,162,97,0)');
    ctx.fillStyle = pGrad; ctx.fill();

    // Wavy trail
    ctx.beginPath();
    ctx.moveTo(x, y - 8);
    for (let dy = 0; dy < 14; dy++) {
      ctx.lineTo(x + Math.sin((y - dy + t * 10) * 0.8) * 3, y - 8 - dy);
    }
    ctx.strokeStyle = 'rgba(244,162,97,0.4)'; ctx.lineWidth = 1; ctx.stroke();

    // Emitted electron (if above surface)
    if (y > metalY - 14 && y < metalY + 2) {
      const eAngle = -Math.PI / 2 + (i - 2.5) * 0.3;
      const eLen = 30 + (t % 0.5) * 80;
      const ex = x + Math.cos(eAngle) * eLen;
      const ey = metalY - 10 + Math.sin(eAngle) * eLen;
      ctx.beginPath();
      ctx.arc(Math.min(metalRight - 10, Math.max(metalLeft + 10, ex)), Math.max(10, ey), 4, 0, Math.PI * 2);
      ctx.fillStyle = '#4cc9f0'; ctx.fill();
    }
  }

  // Labels
  ctx.fillStyle = '#6b7280'; ctx.font = '12px DM Sans, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('UV Photons ↓', W / 2, 22);
  ctx.fillStyle = '#4cc9f0';
  ctx.fillText('Electrons emitted ↑ (if hf > φ)', W / 2, metalY - 26);
  ctx.fillStyle = '#fff';
  ctx.fillText('Metal Surface', W / 2, metalY + 20);
}

// DIODE VIZ
function drawDiode(ctx, W, H, t) {
  const cx = W / 2, cy = H / 2;
  const flowing = Math.sin(t) > 0;

  // P-N boundary
  ctx.fillStyle = 'rgba(247,37,133,0.15)';
  ctx.fillRect(cx - 140, cy - 50, 130, 100);
  ctx.fillStyle = 'rgba(67,97,238,0.15)';
  ctx.fillRect(cx + 10, cy - 50, 130, 100);

  ctx.fillStyle = '#f72585'; ctx.font = 'bold 16px Fraunces, serif';
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  ctx.fillText('P', cx - 75, cy);
  ctx.fillStyle = '#4361ee';
  ctx.fillText('N', cx + 75, cy);

  // Depletion region
  ctx.fillStyle = 'rgba(107,114,128,0.15)';
  ctx.fillRect(cx - 12, cy - 50, 24, 100);
  ctx.fillStyle = '#6b7280'; ctx.font = '10px DM Sans, sans-serif';
  ctx.fillText('Depletion', cx, cy + 60);

  // Carrier movement
  const numCarriers = 8;
  for (let i = 0; i < numCarriers; i++) {
    const progress = ((i / numCarriers + t * 0.3) % 1);
    if (flowing) {
      // Holes from p to n (conventional current)
      const x = (cx - 130) + progress * 260;
      const y = cy - 20 + (i % 3) * 20;
      ctx.beginPath();
      ctx.arc(x, y, 6, 0, Math.PI * 2);
      ctx.strokeStyle = '#f72585'; ctx.lineWidth = 2; ctx.stroke();
      ctx.fillStyle = '#fff'; ctx.font = '9px sans-serif';
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillText('+', x, y);
    }
  }

  // Labels
  ctx.fillStyle = flowing ? '#2d9b6f' : '#e05b3c';
  ctx.font = 'bold 13px DM Sans, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(flowing ? '✅ Forward Bias — Current flows!' : '❌ Reverse Bias — Blocked', cx, cy - 70);

  ctx.fillStyle = '#6b7280'; ctx.font = '11px DM Sans, sans-serif';
  ctx.fillText('p-n Junction Diode — one-way current valve', cx, H - 10);
}

// ---- QUIZ ----
let currentQuizData = [], userAnswers = {}, quizScoreGained = 0;

function renderQuizPage() {
  const sel = document.getElementById('quizChapterSelect');
  if (!sel) return;
  sel.innerHTML = UNITS.flatMap(u => u.subtopics).map(t =>
    `<option value="${t.quiz}">${t.title}</option>`
  ).join('');
  loadQuiz();
}

function loadQuizFor(quizId) {
  showPage('quiz');
  setTimeout(() => {
    const sel = document.getElementById('quizChapterSelect');
    if (sel) {
      sel.value = quizId;
      loadQuiz();
    }
  }, 100);
}

function loadQuiz() {
  const sel = document.getElementById('quizChapterSelect');
  const qId = sel ? sel.value : null;
  currentQuizData = QUIZZES[qId] || [];
  userAnswers = {};
  quizScoreGained = 0;
  renderQuiz();
}

function renderQuiz() {
  const container = document.getElementById('quizContainer');
  if (!currentQuizData.length) {
    container.innerHTML = '<p class="text-muted">No quiz available for this topic yet.</p>';
    return;
  }
  container.innerHTML = currentQuizData.map((q, qi) => `
    <div class="quiz-card" id="qcard-${qi}">
      <div class="quiz-q-num">Question ${qi + 1} of ${currentQuizData.length}</div>
      <div class="quiz-question">${q.q}</div>
      <div class="quiz-opts">
        ${q.opts.map((opt, oi) => `
          <button class="quiz-option" onclick="answerQuiz(${qi},${oi})" id="qopt-${qi}-${oi}">
            <span style="opacity:0.5;margin-right:8px;">${String.fromCharCode(65 + oi)}.</span>${opt}
          </button>
        `).join('')}
      </div>
      <div class="quiz-explanation" id="qexp-${qi}">${q.exp}</div>
    </div>
  `).join('') + `<div id="quiz-score-box" style="display:none" class="step-card text-center mt-2">
    <div class="big-stat" id="finalScore"></div>
    <div class="stat-label">Your Score</div>
    <button class="pw-btn-primary mt-3" onclick="loadQuiz()">🔄 Retry Quiz</button>
  </div>`;
}

function answerQuiz(qi, oi) {
  if (userAnswers[qi] !== undefined) return;
  userAnswers[qi] = oi;
  const q = currentQuizData[qi];
  const correct = oi === q.ans;
  if (correct) quizScoreGained++;

  // Style options
  for (let i = 0; i < q.opts.length; i++) {
    const btn = document.getElementById(`qopt-${qi}-${i}`);
    btn.disabled = true;
    if (i === q.ans) btn.classList.add('correct');
    if (i === oi && !correct) btn.classList.add('wrong');
  }
  document.getElementById(`qexp-${qi}`).style.display = 'block';

  // If all answered
  if (Object.keys(userAnswers).length === currentQuizData.length) {
    state.quizScores += quizScoreGained;
    localStorage.setItem('pw_quiz_scores', state.quizScores);
    const scoreBox = document.getElementById('quiz-score-box');
    scoreBox.style.display = 'block';
    document.getElementById('finalScore').textContent =
      `${quizScoreGained} / ${currentQuizData.length}`;
    scoreBox.scrollIntoView({ behavior: 'smooth' });
  }
}

// ---- PROGRESS ----
function isDone(topicId) {
  return state.completedTopics.includes(topicId);
}

function markTopicDone(topicId) {
  if (!isDone(topicId)) {
    state.completedTopics.push(topicId);
    localStorage.setItem('pw_completed', JSON.stringify(state.completedTopics));
  }
  const btn = document.getElementById('markDoneBtn');
  if (btn) { btn.textContent = '✓ Completed!'; btn.classList.add('done'); }
  // Update sidebar
  renderConcept(state.currentUnit.id, state.currentTopic.id);
}

function resetProgress() {
  if (!confirm('Reset all progress?')) return;
  state.completedTopics = [];
  state.quizScores = 0;
  localStorage.removeItem('pw_completed');
  localStorage.removeItem('pw_quiz_scores');
  renderProgress();
}

function renderProgress() {
  const allTopics = UNITS.flatMap(u => u.subtopics);
  const done = allTopics.filter(t => isDone(t.id)).length;
  const pct = Math.round((done / allTopics.length) * 100);

  document.getElementById('progPercent').textContent = pct + '%';
  document.getElementById('progTopics').textContent = done;
  document.getElementById('progQuiz').textContent = state.quizScores;
  document.getElementById('overallBar').style.width = pct + '%';

  const details = document.getElementById('progressDetails');
  details.innerHTML = UNITS.map(u => `
    <div class="mb-4">
      <div class="d-flex justify-content-between align-items-center mb-2">
        <span class="fw-600">${u.emoji} ${u.title}</span>
        <span style="font-size:0.8rem;color:var(--muted)">
          ${u.subtopics.filter(t => isDone(t.id)).length} / ${u.subtopics.length}
        </span>
      </div>
      <div class="pw-progress mb-2">
        <div class="pw-progress-bar" style="width:${Math.round(u.subtopics.filter(t => isDone(t.id)).length / u.subtopics.length * 100)}%"></div>
      </div>
      ${u.subtopics.map(t => `
        <div class="progress-topic-row">
          <span class="progress-topic-name" style="cursor:pointer;color:var(--accent)" onclick="showPage('concept','${u.id}','${t.id}')">
            ${t.title}
          </span>
          <span class="progress-topic-status ${isDone(t.id) ? 'status-done' : 'status-pending'}">
            ${isDone(t.id) ? '✓ Done' : 'Pending'}
          </span>
        </div>
      `).join('')}
    </div>
  `).join('');
}


// ---- AI MODAL ----
// ================= OPEN CHATBOT =================
function openAskAI(topicHint) {

  const modal = document.getElementById('askAIModal');

  if (modal) {
    modal.classList.add('open');
  }

  if (topicHint) {

    const input = document.getElementById('aiInput');

    if (input) {
      input.placeholder =
        `Ask about ${topicHint}...`;
    }
  }
}


// ================= CLOSE CHATBOT =================

function closeAskAI() {

  const modal = document.getElementById('askAIModal');

  if (modal) {
    modal.classList.remove('open');
  }
}


// ================= SEND MESSAGE =================

async function sendAI() {

  const input = document.getElementById('aiInput');
  const chatBox = document.getElementById('aiChat');

  if (!input || !chatBox) return;

  const text = input.value.trim();

  if (!text) return;

  // USER MESSAGE
  const userMsg = document.createElement('div');
  userMsg.className = 'ai-msg user';
  userMsg.textContent = text;
  chatBox.appendChild(userMsg);

  input.value = '';

  // THINKING MESSAGE
  const thinkMsg = document.createElement('div');
  thinkMsg.className = 'ai-msg bot thinking';
  thinkMsg.textContent = '⏳ Thinking...';
  chatBox.appendChild(thinkMsg);

  chatBox.scrollTop = chatBox.scrollHeight;

  try {

    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: text
      })
    });

    const data = await response.json();

    thinkMsg.remove();

    if (response.ok && data.candidates) {

      const botMsg = document.createElement('div');

      botMsg.className = 'ai-msg bot';

      botMsg.textContent =
        data.candidates[0].content.parts[0].text;

      chatBox.appendChild(botMsg);

    } else {

      const errorMsg = document.createElement('div');

      errorMsg.className = 'ai-msg bot';

      errorMsg.textContent =
        "❌ Error: " +
        (data.error?.message || "Something went wrong");

      chatBox.appendChild(errorMsg);
    }

  } catch (error) {

    console.error(error);

    thinkMsg.textContent =
      '❌ Connection Error!';

  }

  chatBox.scrollTop = chatBox.scrollHeight;
}

// ================= CLOSE ON OUTSIDE CLICK =================

const modal = document.getElementById('askAIModal');

if (modal) {

  modal.addEventListener('click', function (e) {

    if (e.target === this) {

      closeAskAI();
    }
  });
}
// ============================================================
// DID YOU KNOW
// ============================================================

function getDidYouKnow(topicId) {

  const facts = {

    'charges-fields':
      "⚡ Lightning is a giant electric discharge between clouds and Earth.",

    'potential-capacitance':
      "🔋 Capacitors are used in camera flashes to release energy instantly.",

    'current-electricity-main':
      "💡 Electric current powers everything from fans to phones.",

    'moving-charges':
      "🧲 MRI machines use extremely strong magnetic fields.",

    'em-induction-main':
      "🌀 Every power plant uses electromagnetic induction.",

    'ray-optics':
      "🔭 Optical fibers work using total internal reflection.",

    'photoelectric':
      "☀️ Solar panels work using the photoelectric effect.",

    'semiconductor-main':
      "💻 Smartphones contain billions of tiny transistors."

  };

  return facts[topicId] ||
    "Physics exists everywhere around you!";
}
// ---- HERO CANVAS ----
(function () {
  const canvas = document.getElementById('heroCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height;
  let t = 0;

  function drawHero() {
    ctx.clearRect(0, 0, W, H);

    // Background gradient
    const bg = ctx.createRadialGradient(W / 2, H / 2, 20, W / 2, H / 2, 220);
    bg.addColorStop(0, 'rgba(240,244,255,0.8)');
    bg.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);

    // Atom nucleus
    const cx = W / 2 + 10, cy = H / 2;
    ctx.beginPath(); ctx.arc(cx, cy, 14, 0, Math.PI * 2);
    ctx.fillStyle = '#4361ee'; ctx.fill();

    // Electron orbits
    const orbits = [
      { rx: 90, ry: 55, angle: t, color: '#f72585', eSize: 7 },
      { rx: 140, ry: 70, angle: -t * 0.7 + 1, color: '#4cc9f0', eSize: 6 },
      { rx: 180, ry: 90, angle: t * 0.5 + 2, color: '#f4a261', eSize: 5 }
    ];

    orbits.forEach(orb => {
      // Orbit ellipse
      ctx.beginPath();
      ctx.ellipse(cx, cy, orb.rx, orb.ry, orb.angle * 0.1, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(67,97,238,0.12)'; ctx.lineWidth = 1.5;
      ctx.stroke();

      // Electron
      const ex = cx + orb.rx * Math.cos(orb.angle);
      const ey = cy + orb.ry * Math.sin(orb.angle);
      ctx.beginPath(); ctx.arc(ex, ey, orb.eSize, 0, Math.PI * 2);
      const g = ctx.createRadialGradient(ex, ey, 0, ex, ey, orb.eSize);
      g.addColorStop(0, orb.color);
      g.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = g; ctx.fill();
    });

    // Wave at bottom
    ctx.beginPath();
    for (let x = 0; x < W; x += 2) {
      const y = H - 50 + Math.sin(x * 0.04 + t * 2) * 14 + Math.sin(x * 0.08 - t) * 8;
      x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.strokeStyle = 'rgba(76,201,240,0.5)'; ctx.lineWidth = 2.5; ctx.stroke();

    // Floating formula labels
    const labels = [
      { text: 'F=ma', x: 70, y: 50 + Math.sin(t + 1) * 8, color: '#4361ee' },
      { text: 'E=hf', x: W - 80, y: 80 + Math.sin(t + 2) * 8, color: '#f72585' },
      { text: 'V=IR', x: 60, y: H - 80 + Math.sin(t) * 8, color: '#2d9b6f' },
      { text: 'λ=h/p', x: W - 90, y: H - 60 + Math.sin(t + 3) * 8, color: '#f4a261' }
    ];
    labels.forEach(l => {
      ctx.font = 'bold 15px Fraunces, serif';
      ctx.fillStyle = l.color + 'cc';
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillText(l.text, l.x, l.y);
    });

    t += 0.02;
    requestAnimationFrame(drawHero);
  }
  drawHero();
})();

// ---- INIT ----
renderHomeUnits();
renderQuizPage();