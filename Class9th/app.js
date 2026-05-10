// ============================================================
// SCIENCEWIZ CLASS 9 — APP.JS
// ============================================================

// ---- STATE ----
const state = {
    completedTopics: JSON.parse(localStorage.getItem('sw9_completed') || '[]'),
    quizScores: parseInt(localStorage.getItem('sw9_quiz_scores') || '0'),
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

// ---- HELPERS ----
function isDone(id) { return state.completedTopics.includes(id); }

function markDone(topicId, btn) {
    if (!isDone(topicId)) {
        state.completedTopics.push(topicId);
        localStorage.setItem('sw9_completed', JSON.stringify(state.completedTopics));
    }
    btn.textContent = '✓ Completed!';
    btn.classList.add('done');
    btn.disabled = true;
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
        <div class="unit-topics">${u.subtopics.length} topic${u.subtopics.length > 1 ? 's' : ''}</div>
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

    ${unit.subtopics.length > 1 ? `<div class="topic-nav">
      ${unit.subtopics.map(t => `
        <button class="topic-tab ${t.id === topic.id ? 'active' : ''}"
          onclick="showPage('concept','${unitId}','${t.id}')">
          ${t.title}
        </button>
      `).join('')}
    </div>` : ''}

    <div class="concept-header">
      <div class="concept-badge">${unit.emoji} ${unit.num} — ${unit.title}</div>
      <h1 class="concept-title">${topic.title}</h1>
    </div>

    <div class="row gy-4">
      <div class="col-lg-8">

        <div class="step-card">
          <div class="step-label"><div class="step-num">1</div> REAL-LIFE QUESTION</div>
          <div class="step-question">"${topic.realQ}"</div>
        </div>

        <div class="step-card">
          <div class="step-label"><div class="step-num">2</div> VISUALIZE IT</div>
          <div class="viz-box">
            <canvas id="vizCanvas" width="560" height="220"></canvas>
            <div class="viz-label">Interactive visualization — watch the science happen</div>
          </div>
        </div>

        <div class="step-card">
          <div class="step-label"><div class="step-num">3</div> UNDERSTAND IT</div>
          <div class="step-explanation">${topic.explanation}</div>
          <div class="formula-box">${topic.formula}</div>
          <p style="font-size:0.85rem;color:var(--muted);text-align:center;margin-top:6px;">${topic.formulaNote}</p>
        </div>

        <div class="step-card">
          <div class="step-label"><div class="step-num">4</div> THINK FIRST 🧠</div>
          <div class="think-box">
            <div class="think-label">💭 Think about this before reading the answer:</div>
            <div class="think-q">${topic.thinkQ}</div>
            <button class="think-reveal-btn" onclick="revealThink(this)">💡 Reveal Answer</button>
            <div class="think-answer">${topic.thinkA}</div>
          </div>
        </div>

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

        <div class="step-card">
          <div class="step-label"><div class="step-num">6</div> QUICK SUMMARY ✅</div>
          <div class="summary-box">
            <h5>Key Takeaways</h5>
            <ul>${topic.summary.map(s => `<li>${s}</li>`).join('')}</ul>
          </div>
        </div>

        <div class="text-center mt-2 mb-5">
          <button class="mark-done-btn ${isDone(topic.id) ? 'done' : ''}"
            id="markDoneBtn"
            onclick="markDone('${topic.id}', this)"
            ${isDone(topic.id) ? 'disabled' : ''}>
            ${isDone(topic.id) ? '✓ Completed!' : '✅ Mark as Completed'}
          </button>
          <button class="pw-btn-outline ms-3" onclick="showPage('quiz')">Take Quiz →</button>
        </div>
      </div>

      <div class="col-lg-4">
        <div class="sidebar-card">
          <h6 class="sidebar-title">📚 All Chapters</h6>
          ${UNITS.map(u2 => `
            <div class="sidebar-unit ${u2.id === unitId ? 'active' : ''}"
              onclick="showPage('concept','${u2.id}','${u2.subtopics[0].id}')">
              <span class="sidebar-emoji">${u2.emoji}</span>
              <div>
                <div class="sidebar-unum">${u2.num}</div>
                <div class="sidebar-utitle">${u2.title}</div>
              </div>
              ${isDone(u2.subtopics[0].id) ? '<span class="sidebar-check">✓</span>' : ''}
            </div>
          `).join('')}
        </div>

        <div class="sidebar-card mt-4">
          <h6 class="sidebar-title">💡 Did You Know?</h6>
          <p class="did-you-know">${getDidYouKnow(topic.id)}</p>
        </div>

        <div class="sidebar-card mt-4">
          <h6 class="sidebar-title">🎯 Quick Quiz</h6>
          <p style="font-size:0.85rem;color:var(--muted);margin-bottom:12px;">Test your understanding on this chapter</p>
          <button class="pw-btn-primary w-100" onclick="showPage('quiz')">Start Quiz</button>
        </div>
      </div>
    </div>
  `;

    // Run the canvas viz
    runViz(topic.vizType, topic.id);

    // Update slider label on input
    const slider = document.getElementById('mainSlider');
    if (slider) {
        slider.addEventListener('input', function () {
            document.getElementById('sliderVal').textContent = this.value + ' ' + topic.interactUnit;
        });
    }
}

function updateInteract(val) {
    const topic = state.currentTopic;
    if (!topic) return;
    document.getElementById('sliderVal').textContent = val + ' ' + topic.interactUnit;
    document.getElementById('interactResult').innerHTML = topic.interactFn(parseFloat(val));
}

function revealThink(btn) {
    const answer = btn.nextElementSibling;
    answer.style.display = 'block';
    btn.style.display = 'none';
}

// -- Responsive code --

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

// ---- QUIZ ----
function renderQuizPage() {
    const sel = document.getElementById('quizChapterSelect');
    if (!sel) return;
    sel.innerHTML = UNITS.map(u =>
        `<option value="${u.subtopics[0].id}">${u.num}: ${u.title}</option>`
    ).join('');
    loadQuiz();
}

function loadQuiz() {
    const sel = document.getElementById('quizChapterSelect');
    const topicId = sel ? sel.value : null;
    if (!topicId) return;

    const questions = QUIZ_BANK[topicId];
    const container = document.getElementById('quizContainer');
    if (!container) return;

    if (!questions || questions.length === 0) {
        container.innerHTML = `<div class="quiz-card text-center"><p style="color:var(--muted)">Quiz coming soon for this chapter!</p></div>`;
        return;
    }

    container.innerHTML = questions.map((q, i) => `
    <div class="quiz-card" id="qcard-${i}">
      <div class="quiz-q-num">Question ${i + 1} of ${questions.length}</div>
      <div class="quiz-question">${q.q}</div>
      <div class="quiz-options">
        ${q.opts.map((opt, j) => `
          <button class="quiz-option" onclick="answerQ(${i}, ${j})" id="qopt-${i}-${j}">
            <span class="opt-letter">${['A', 'B', 'C', 'D'][j]}</span> ${opt}
          </button>
        `).join('')}
      </div>
      <div class="quiz-explanation" id="qexp-${i}">
        <strong>💡 Explanation:</strong> ${q.exp}
      </div>
    </div>
  `).join('') + `
    <div class="quiz-result-bar" id="quizResult" style="display:none">
      <div class="quiz-score-display">
        <span id="scoreText"></span>
        <button class="pw-btn-outline mt-3" onclick="loadQuiz()">🔄 Retry Quiz</button>
      </div>
    </div>
  `;

    window._quizAnswered = new Array(questions.length).fill(false);
    window._quizCorrect = 0;
}

function answerQ(qIdx, optIdx) {
    if (window._quizAnswered[qIdx]) return;
    window._quizAnswered[qIdx] = true;

    const topicId = document.getElementById('quizChapterSelect').value;
    const q = QUIZ_BANK[topicId][qIdx];
    const isCorrect = optIdx === q.ans;

    if (isCorrect) {
        window._quizCorrect = (window._quizCorrect || 0) + 1;
        state.quizScores++;
        localStorage.setItem('sw9_quiz_scores', state.quizScores);
    }

    // Style options
    for (let j = 0; j < q.opts.length; j++) {
        const btn = document.getElementById(`qopt-${qIdx}-${j}`);
        btn.disabled = true;
        if (j === q.ans) btn.classList.add('correct');
        else if (j === optIdx && !isCorrect) btn.classList.add('wrong');
    }

    document.getElementById(`qexp-${qIdx}`).style.display = 'block';

    // Show result if all answered
    const total = QUIZ_BANK[topicId].length;
    const answered = window._quizAnswered.filter(Boolean).length;
    if (answered === total) {
        const resultBar = document.getElementById('quizResult');
        resultBar.style.display = 'block';
        const pct = Math.round((window._quizCorrect / total) * 100);
        const emoji = pct >= 80 ? '🎉' : pct >= 50 ? '👍' : '📚';
        document.getElementById('scoreText').innerHTML = `
      ${emoji} You scored <strong>${window._quizCorrect}/${total}</strong> (${pct}%)
      <br><span style="font-size:0.9rem;color:var(--muted)">${pct >= 80 ? 'Excellent! You really understand this chapter.' : pct >= 50 ? 'Good effort! Review the explanations above.' : 'Keep studying — re-read the chapter and try again!'}</span>
    `;
        resultBar.scrollIntoView({ behavior: 'smooth' });
    }
}

// ---- PROGRESS ----
function renderProgress() {
    const allTopics = UNITS.flatMap(u => u.subtopics);
    const done = state.completedTopics.filter(id => allTopics.find(t => t.id === id)).length;
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

function resetProgress() {
    if (confirm('Reset all progress? This cannot be undone.')) {
        state.completedTopics = [];
        state.quizScores = 0;
        localStorage.removeItem('sw9_completed');
        localStorage.removeItem('sw9_quiz_scores');
        renderProgress();
    }
}

// ---- AI MODAL ----
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

  chatBox.scrollTop =
    chatBox.scrollHeight;
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


// ---- VISUALIZATIONS ----
function runViz(vizType, topicId) {
    const canvas = document.getElementById('vizCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const W = canvas.width, H = canvas.height;
    let t = 0;
    let animFrame;

    if (window._vizAnimation) cancelAnimationFrame(window._vizAnimation);

    function animate(fn) {
        fn();
        window._vizAnimation = requestAnimationFrame(() => animate(fn));
    }

    ctx.clearRect(0, 0, W, H);

    if (vizType === 'matter') {
        // Particle states animation
        animate(() => {
            ctx.clearRect(0, 0, W, H);
            ctx.fillStyle = '#f8f9ff'; ctx.fillRect(0, 0, W, H);

            const sections = [
                { label: 'SOLID', x: 50, color: '#4361ee', particles: generateSolidParticles(50, 110, 120, 100) },
                { label: 'LIQUID', x: 220, color: '#4cc9f0', particles: generateLiquidParticles(220, 110, 120, 100, t) },
                { label: 'GAS', x: 390, color: '#f72585', particles: generateGasParticles(390, 110, 160, 100, t) }
            ];

            sections.forEach(s => {
                ctx.fillStyle = 'rgba(255,255,255,0.7)';
                ctx.strokeStyle = s.color + '44';
                ctx.lineWidth = 1.5;
                roundRect(ctx, s.x - 70, 30, 130, H - 60, 10);

                ctx.font = 'bold 11px DM Sans, sans-serif';
                ctx.fillStyle = s.color;
                ctx.textAlign = 'center';
                ctx.fillText(s.label, s.x - 5, H - 18);

                s.particles.forEach(p => {
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, 6, 0, Math.PI * 2);
                    ctx.fillStyle = s.color + 'cc';
                    ctx.fill();
                });
            });

            t += 0.03;
        });
    } else if (vizType === 'motion') {
        // Moving car animation
        let carX = 20;
        animate(() => {
            ctx.clearRect(0, 0, W, H);
            ctx.fillStyle = '#eef2ff'; ctx.fillRect(0, 0, W, H);

            // Road
            ctx.fillStyle = '#374151';
            ctx.fillRect(0, H * 0.6, W, H * 0.15);
            // Dashes
            for (let x = (t * 80) % 60 - 60; x < W; x += 60) {
                ctx.fillStyle = '#fbbf24';
                ctx.fillRect(x, H * 0.67, 40, 4);
            }

            // Car
            carX = 30 + (t * 40) % (W - 100);
            drawCar(ctx, carX, H * 0.52, '#4361ee');

            // Speed label
            ctx.font = 'bold 13px DM Sans, sans-serif';
            ctx.fillStyle = '#4361ee';
            ctx.textAlign = 'center';
            ctx.fillText('→ Velocity', W / 2, 25);

            // Distance arrow
            ctx.strokeStyle = '#f72585';
            ctx.lineWidth = 2;
            ctx.setLineDash([5, 3]);
            ctx.beginPath();
            ctx.moveTo(30, H * 0.38);
            ctx.lineTo(carX + 30, H * 0.38);
            ctx.stroke();
            ctx.setLineDash([]);
            ctx.fillStyle = '#f72585';
            ctx.font = '11px DM Sans, sans-serif';
            ctx.fillText('Distance', (30 + carX) / 2, H * 0.33);

            t += 0.016;
        });
    } else if (vizType === 'force') {
        // Newton's laws — collision
        animate(() => {
            ctx.clearRect(0, 0, W, H);
            ctx.fillStyle = '#fff5f0'; ctx.fillRect(0, 0, W, H);

            const phase = (t * 0.4) % (Math.PI * 2);
            const x1 = W / 2 - 80 - Math.abs(Math.sin(phase)) * 60;
            const x2 = W / 2 + 40 + Math.abs(Math.sin(phase)) * 60;

            // Ball 1 (heavy)
            ctx.beginPath();
            ctx.arc(x1, H / 2, 28, 0, Math.PI * 2);
            ctx.fillStyle = '#f72585';
            ctx.fill();
            ctx.fillStyle = '#fff';
            ctx.font = 'bold 11px DM Sans';
            ctx.textAlign = 'center';
            ctx.fillText('5 kg', x1, H / 2 + 4);

            // Ball 2 (light)
            ctx.beginPath();
            ctx.arc(x2, H / 2, 18, 0, Math.PI * 2);
            ctx.fillStyle = '#4361ee';
            ctx.fill();
            ctx.fillStyle = '#fff';
            ctx.font = 'bold 10px DM Sans';
            ctx.fillText('1 kg', x2, H / 2 + 4);

            // Arrows
            if (Math.sin(phase) > 0) {
                drawArrow(ctx, x1 + 28, H / 2, x1 + 60, H / 2, '#f72585');
                drawArrow(ctx, x2 - 18, H / 2, x2 - 50, H / 2, '#4361ee');
            }

            ctx.fillStyle = '#374151';
            ctx.font = '12px DM Sans';
            ctx.fillText("F = ma — Same force, different acceleration!", W / 2, H - 20);

            t += 0.02;
        });
    } else if (vizType === 'gravitation') {
        // Planet-moon orbit
        animate(() => {
            ctx.clearRect(0, 0, W, H);
            const bg = ctx.createLinearGradient(0, 0, 0, H);
            bg.addColorStop(0, '#0f0c29');
            bg.addColorStop(1, '#1a1a2e');
            ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);

            // Stars
            for (let i = 0; i < 30; i++) {
                const sx = (i * 73.1 + 7) % W;
                const sy = (i * 51.7 + 13) % H;
                const br = 0.5 + 0.5 * Math.sin(t * 2 + i);
                ctx.beginPath();
                ctx.arc(sx, sy, 1.2, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255,255,255,${br})`;
                ctx.fill();
            }

            const cx = W / 2, cy = H / 2;

            // Earth
            ctx.beginPath(); ctx.arc(cx, cy, 22, 0, Math.PI * 2);
            ctx.fillStyle = '#2563eb'; ctx.fill();
            ctx.beginPath(); ctx.arc(cx - 5, cy - 5, 10, 0, Math.PI * 2);
            ctx.fillStyle = '#16a34a'; ctx.fill();

            // Orbit path
            ctx.beginPath(); ctx.ellipse(cx, cy, 100, 60, 0, 0, Math.PI * 2);
            ctx.strokeStyle = 'rgba(255,255,255,0.15)'; ctx.lineWidth = 1; ctx.stroke();

            // Moon
            const mx = cx + 100 * Math.cos(t);
            const my = cy + 60 * Math.sin(t);
            ctx.beginPath(); ctx.arc(mx, my, 10, 0, Math.PI * 2);
            ctx.fillStyle = '#d1d5db'; ctx.fill();

            // Gravity line
            ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(mx, my);
            ctx.strokeStyle = 'rgba(251,191,36,0.4)'; ctx.lineWidth = 1.5;
            ctx.setLineDash([4, 4]); ctx.stroke(); ctx.setLineDash([]);

            ctx.fillStyle = 'rgba(251,191,36,0.9)';
            ctx.font = '11px DM Sans'; ctx.textAlign = 'center';
            ctx.fillText('Gravity ↔', (cx + mx) / 2, (cy + my) / 2 - 8);

            t += 0.018;
        });
    } else if (vizType === 'sound') {
        // Sound wave animation
        animate(() => {
            ctx.clearRect(0, 0, W, H);
            ctx.fillStyle = '#f0fdf4'; ctx.fillRect(0, 0, W, H);

            // Source
            ctx.beginPath(); ctx.arc(60, H / 2, 18, 0, Math.PI * 2);
            ctx.fillStyle = '#7209b7'; ctx.fill();
            ctx.fillStyle = '#fff';
            ctx.font = 'bold 18px serif';
            ctx.textAlign = 'center';
            ctx.fillText('🔊', 60, H / 2 + 6);

            // Wavefronts (compressions)
            for (let i = 0; i < 5; i++) {
                const r = ((t * 60 + i * 60) % 300) + 10;
                if (r > 0 && r < 350) {
                    ctx.beginPath();
                    ctx.arc(60, H / 2, r, -Math.PI / 2.5, Math.PI / 2.5);
                    ctx.strokeStyle = `rgba(114,9,183,${Math.max(0, 1 - r / 300)})`;
                    ctx.lineWidth = 3;
                    ctx.stroke();
                }
            }

            // Sine wave at right
            ctx.beginPath();
            for (let x = 200; x < W - 20; x++) {
                const y = H / 2 + Math.sin((x - 200) * 0.05 - t * 3) * 35;
                x === 200 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
            }
            ctx.strokeStyle = '#7209b7'; ctx.lineWidth = 2.5; ctx.stroke();

            ctx.fillStyle = '#374151';
            ctx.font = '11px DM Sans'; ctx.textAlign = 'center';
            ctx.fillText('Compression waves', 360, 20);

            t += 0.02;
        });
    } else if (vizType === 'cell') {
        // Animated cell with organelles
        animate(() => {
            ctx.clearRect(0, 0, W, H);
            ctx.fillStyle = '#f0fdf4'; ctx.fillRect(0, 0, W, H);

            const cx = W / 2, cy = H / 2;

            // Cell membrane
            ctx.beginPath(); ctx.ellipse(cx, cy, 100, 80, 0, 0, Math.PI * 2);
            ctx.strokeStyle = '#2d9b6f'; ctx.lineWidth = 3; ctx.stroke();
            ctx.fillStyle = 'rgba(209,250,229,0.4)'; ctx.fill();

            // Nucleus
            ctx.beginPath(); ctx.ellipse(cx - 15, cy, 30, 25, 0.3, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(67,97,238,0.25)'; ctx.fill();
            ctx.strokeStyle = '#4361ee'; ctx.lineWidth = 2; ctx.stroke();
            ctx.fillStyle = '#4361ee'; ctx.font = 'bold 9px sans-serif';
            ctx.textAlign = 'center'; ctx.fillText('Nucleus', cx - 15, cy + 3);

            // Mitochondria (animated rotation)
            for (let i = 0; i < 3; i++) {
                const angle = t + (i * Math.PI * 2 / 3);
                const mx = cx + 55 * Math.cos(angle);
                const my = cy + 45 * Math.sin(angle);
                ctx.beginPath();
                ctx.ellipse(mx, my, 12, 6, angle, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(247,37,133,0.3)'; ctx.fill();
                ctx.strokeStyle = '#f72585'; ctx.lineWidth = 1.5; ctx.stroke();
            }

            // Ribosomes
            for (let i = 0; i < 8; i++) {
                const rx = cx - 80 + i * 18;
                const ry = cy + 50 + Math.sin(t + i) * 5;
                ctx.beginPath(); ctx.arc(rx, ry, 3, 0, Math.PI * 2);
                ctx.fillStyle = '#f4a261'; ctx.fill();
            }

            ctx.fillStyle = '#374151';
            ctx.font = '11px DM Sans'; ctx.textAlign = 'center';
            ctx.fillText('Animal Cell — organelles orbiting', W / 2, H - 12);

            t += 0.012;
        });
    } else if (vizType === 'energy') {
        // Ball bouncing with energy bar
        animate(() => {
            ctx.clearRect(0, 0, W, H);
            ctx.fillStyle = '#fffbeb'; ctx.fillRect(0, 0, W, H);

            const groundY = H - 30;
            const maxH = H - 100;
            const phase = (t * 1.2) % (Math.PI);
            const ballY = groundY - Math.abs(Math.sin(phase)) * maxH;
            const h = (groundY - ballY);
            const relH = h / maxH;

            // Ground
            ctx.fillStyle = '#374151'; ctx.fillRect(0, groundY, W, 5);

            // Ball
            ctx.beginPath(); ctx.arc(W / 3, ballY, 18, 0, Math.PI * 2);
            const g = ctx.createRadialGradient(W / 3 - 6, ballY - 6, 3, W / 3, ballY, 18);
            g.addColorStop(0, '#fbbf24'); g.addColorStop(1, '#f4a261');
            ctx.fillStyle = g; ctx.fill();

            // Energy bars
            const barX = W * 0.58, barW = 28, barMaxH = H - 80;
            // PE bar
            ctx.fillStyle = '#e8e8e0'; ctx.fillRect(barX, 30, barW, barMaxH);
            ctx.fillStyle = '#4361ee';
            const peH = relH * barMaxH;
            ctx.fillRect(barX, 30 + barMaxH - peH, barW, peH);
            ctx.fillStyle = '#4361ee'; ctx.font = 'bold 10px sans-serif';
            ctx.textAlign = 'center'; ctx.fillText('PE', barX + barW / 2, 22);

            // KE bar
            const barX2 = barX + barW + 20;
            ctx.fillStyle = '#e8e8e0'; ctx.fillRect(barX2, 30, barW, barMaxH);
            ctx.fillStyle = '#f72585';
            const keH = (1 - relH) * barMaxH;
            ctx.fillRect(barX2, 30 + barMaxH - keH, barW, keH);
            ctx.fillStyle = '#f72585'; ctx.font = 'bold 10px sans-serif';
            ctx.fillText('KE', barX2 + barW / 2, 22);

            ctx.fillStyle = '#2d9b6f'; ctx.font = 'bold 10px sans-serif';
            ctx.fillText('Total = constant!', barX + barW + 10, H - 10);

            t += 0.022;
        });
    } else if (vizType === 'floatation') {
        // Object floating in water
        animate(() => {
            ctx.clearRect(0, 0, W, H);

            // Sky
            ctx.fillStyle = '#dbeafe'; ctx.fillRect(0, 0, W, H / 2 + 10);
            // Water
            ctx.fillStyle = '#93c5fd';
            ctx.fillRect(0, H / 2, W, H / 2);

            // Ripple
            ctx.strokeStyle = 'rgba(255,255,255,0.5)'; ctx.lineWidth = 1.5;
            for (let i = 0; i < 3; i++) {
                const rx = W / 2 + 80 * Math.cos(t + i * 2);
                ctx.beginPath();
                ctx.ellipse(rx, H / 2, 30 + i * 15, 5, 0, 0, Math.PI * 2);
                ctx.stroke();
            }

            // Floating box
            const bob = Math.sin(t * 2) * 3;
            ctx.fillStyle = '#fbbf24';
            ctx.strokeStyle = '#92400e'; ctx.lineWidth = 2;
            ctx.fillRect(W / 2 - 30, H / 2 - 25 + bob, 60, 40);
            ctx.strokeRect(W / 2 - 30, H / 2 - 25 + bob, 60, 40);

            // Water line
            ctx.strokeStyle = '#1d4ed8'; ctx.lineWidth = 2;
            ctx.setLineDash([6, 3]);
            ctx.beginPath(); ctx.moveTo(W / 2 - 50, H / 2 + bob);
            ctx.lineTo(W / 2 + 50, H / 2 + bob);
            ctx.stroke(); ctx.setLineDash([]);

            // Arrows: weight down, buoyancy up
            drawArrow(ctx, W / 2, H / 2 + 25 + bob, W / 2, H / 2 + 55 + bob, '#ef4444');
            ctx.fillStyle = '#ef4444'; ctx.font = 'bold 10px sans-serif';
            ctx.textAlign = 'center'; ctx.fillText('Weight', W / 2, H / 2 + 68 + bob);

            drawArrow(ctx, W / 2 + 50, H / 2 + bob, W / 2 + 50, H / 2 - 45 + bob, '#16a34a');
            ctx.fillStyle = '#16a34a';
            ctx.fillText('Buoyancy', W / 2 + 50, H / 2 - 52 + bob);

            t += 0.02;
        });
    } else if (vizType === 'mixture') {
        // Mixing animation
        animate(() => {
            ctx.clearRect(0, 0, W, H);
            ctx.fillStyle = '#f8f9ff'; ctx.fillRect(0, 0, W, H);

            // Beaker
            ctx.strokeStyle = '#6b7280'; ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.moveTo(W / 2 - 70, 20); ctx.lineTo(W / 2 - 70, H - 20);
            ctx.lineTo(W / 2 + 70, H - 20); ctx.lineTo(W / 2 + 70, 20);
            ctx.stroke();

            // Water
            ctx.fillStyle = 'rgba(147,197,253,0.5)';
            ctx.fillRect(W / 2 - 68, H * 0.4, 136, H * 0.57);

            // Particles dissolving
            for (let i = 0; i < 20; i++) {
                const px = W / 2 - 60 + (i * 37.3) % 120;
                const py = H * 0.45 + (i * 29.7 + t * 15) % (H * 0.5);
                const alpha = 0.4 + 0.6 * Math.sin(t + i);
                ctx.beginPath(); ctx.arc(px, py, 4, 0, Math.PI * 2);
                ctx.fillStyle = i % 2 === 0 ? `rgba(247,37,133,${alpha})` : `rgba(67,97,238,${alpha})`;
                ctx.fill();
            }

            ctx.fillStyle = '#374151';
            ctx.font = 'bold 12px DM Sans'; ctx.textAlign = 'center';
            ctx.fillText('Solution — particles uniformly mixed', W / 2, H - 5);

            t += 0.02;
        });
    } else if (vizType === 'atoms') {
        // Bohr atom model
        animate(() => {
            ctx.clearRect(0, 0, W, H);
            ctx.fillStyle = '#f8f9ff'; ctx.fillRect(0, 0, W, H);

            const cx = W / 2, cy = H / 2;

            // Nucleus
            ctx.beginPath(); ctx.arc(cx, cy, 16, 0, Math.PI * 2);
            ctx.fillStyle = '#f72585'; ctx.fill();
            ctx.fillStyle = '#fff';
            ctx.font = 'bold 9px sans-serif'; ctx.textAlign = 'center';
            ctx.fillText('p+n', cx, cy + 3);

            // 3 orbit shells
            const orbits = [
                { r: 50, count: 2, color: '#4361ee', speed: 1.5 },
                { r: 85, count: 8, color: '#7209b7', speed: 1.0 },
                { r: 120, count: 3, color: '#4cc9f0', speed: 0.7 }
            ];

            orbits.forEach((orb, oi) => {
                // Orbit ellipse
                ctx.beginPath(); ctx.ellipse(cx, cy, orb.r, orb.r * 0.45, oi * 0.6, 0, Math.PI * 2);
                ctx.strokeStyle = 'rgba(0,0,0,0.12)'; ctx.lineWidth = 1; ctx.stroke();

                // Electrons
                for (let ei = 0; ei < orb.count; ei++) {
                    const angle = t * orb.speed + (ei / orb.count) * Math.PI * 2;
                    const ex = cx + orb.r * Math.cos(angle);
                    const ey = cy + orb.r * 0.45 * Math.sin(angle);
                    ctx.beginPath(); ctx.arc(ex, ey, 5, 0, Math.PI * 2);
                    ctx.fillStyle = orb.color; ctx.fill();
                }
            });

            ctx.fillStyle = '#374151';
            ctx.font = '11px DM Sans'; ctx.textAlign = 'center';
            ctx.fillText('Bohr Model — electrons in shells K, L, M', W / 2, H - 12);

            t += 0.018;
        });
    } else if (vizType === 'atom-structure') {
        // Sub-atomic particles
        animate(() => {
            ctx.clearRect(0, 0, W, H);
            ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, W, H);

            const cx = W / 2, cy = H / 2;

            // Nucleus background
            ctx.beginPath(); ctx.arc(cx, cy, 35, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(251,191,36,0.15)'; ctx.fill();
            ctx.strokeStyle = '#f59e0b'; ctx.lineWidth = 2; ctx.stroke();

            // Protons and neutrons
            const nucParticles = [
                { x: cx - 10, y: cy - 10, c: '#ef4444', label: 'p+' },
                { x: cx + 10, y: cy - 10, c: '#ef4444', label: 'p+' },
                { x: cx - 10, y: cy + 10, c: '#6b7280', label: 'n' },
                { x: cx + 10, y: cy + 10, c: '#6b7280', label: 'n' }
            ];
            nucParticles.forEach(p => {
                ctx.beginPath(); ctx.arc(p.x, p.y, 9, 0, Math.PI * 2);
                ctx.fillStyle = p.c; ctx.fill();
                ctx.fillStyle = '#fff'; ctx.font = 'bold 7px sans-serif';
                ctx.textAlign = 'center'; ctx.fillText(p.label, p.x, p.y + 2);
            });

            // Electron shells
            [60, 95].forEach((r, i) => {
                ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2);
                ctx.strokeStyle = 'rgba(67,97,238,0.2)'; ctx.lineWidth = 1.5; ctx.stroke();

                const count = i === 0 ? 2 : 4;
                for (let e = 0; e < count; e++) {
                    const angle = t * (i === 0 ? 1.3 : 0.8) + (e / count) * Math.PI * 2;
                    const ex = cx + r * Math.cos(angle);
                    const ey = cy + r * Math.sin(angle);
                    ctx.beginPath(); ctx.arc(ex, ey, 5, 0, Math.PI * 2);
                    ctx.fillStyle = '#4361ee'; ctx.fill();
                }
            });

            ctx.fillStyle = '#374151'; ctx.font = '11px DM Sans';
            ctx.textAlign = 'center';
            ctx.fillText('Protons & neutrons in nucleus; electrons orbiting', W / 2, H - 12);

            t += 0.016;
        });
    } else if (vizType === 'tissue') {
        // Four tissue types side by side
        animate(() => {
            ctx.clearRect(0, 0, W, H);
            ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, W, H);

            const tData = [
                { label: 'Epithelial', color: '#4cc9f0', x: 70, shape: 'square' },
                { label: 'Muscular', color: '#f72585', x: 210, shape: 'elongated' },
                { label: 'Connective', color: '#f4a261', x: 350, shape: 'irregular' },
                { label: 'Nervous', color: '#7209b7', x: 490, shape: 'neuron' }
            ];

            tData.forEach(td => {
                ctx.fillStyle = td.color + '22';
                roundRect2(ctx, td.x - 60, 20, 110, H - 50, 10, td.color);

                ctx.fillStyle = td.color;
                ctx.font = 'bold 9px DM Sans'; ctx.textAlign = 'center';
                ctx.fillText(td.label, td.x, H - 22);

                // Draw cells
                if (td.shape === 'square') {
                    for (let r = 0; r < 3; r++)
                        for (let c = 0; c < 3; c++) {
                            ctx.fillStyle = td.color + 'aa';
                            ctx.fillRect(td.x - 42 + c * 28, 40 + r * 28, 24, 24);
                            ctx.strokeStyle = td.color; ctx.lineWidth = 1;
                            ctx.strokeRect(td.x - 42 + c * 28, 40 + r * 28, 24, 24);
                        }
                } else if (td.shape === 'elongated') {
                    for (let i = 0; i < 5; i++) {
                        ctx.fillStyle = td.color + 'aa';
                        ctx.fillRect(td.x - 30, 35 + i * 22, 60, 18);
                        ctx.strokeStyle = td.color; ctx.lineWidth = 1;
                        ctx.strokeRect(td.x - 30, 35 + i * 22, 60, 18);
                    }
                } else if (td.shape === 'irregular') {
                    for (let i = 0; i < 5; i++) {
                        ctx.beginPath();
                        ctx.arc(td.x + Math.sin(i * 2.1) * 25, 60 + i * 22, 12, 0, Math.PI * 2);
                        ctx.fillStyle = td.color + 'aa'; ctx.fill();
                        ctx.strokeStyle = td.color; ctx.lineWidth = 1; ctx.stroke();
                    }
                } else if (td.shape === 'neuron') {
                    // Cell body
                    ctx.beginPath(); ctx.arc(td.x, H / 2, 18, 0, Math.PI * 2);
                    ctx.fillStyle = td.color + 'aa'; ctx.fill();
                    ctx.strokeStyle = td.color; ctx.lineWidth = 1.5; ctx.stroke();
                    // Axon
                    ctx.beginPath(); ctx.moveTo(td.x, H / 2 + 18);
                    ctx.lineTo(td.x, H / 2 + 70);
                    ctx.strokeStyle = td.color; ctx.lineWidth = 3; ctx.stroke();
                    // Dendrites
                    [-25, 0, 25].forEach(dx => {
                        ctx.beginPath(); ctx.moveTo(td.x, H / 2 - 18);
                        ctx.lineTo(td.x + dx, H / 2 - 55);
                        ctx.strokeStyle = td.color; ctx.lineWidth = 2; ctx.stroke();
                    });
                    // Signal pulse
                    const py = H / 2 + 18 + ((t * 40) % 52);
                    ctx.beginPath(); ctx.arc(td.x, py, 5, 0, Math.PI * 2);
                    ctx.fillStyle = '#fbbf24'; ctx.fill();
                }
            });

            t += 0.015;
        });
    } else if (vizType === 'farming') {
        // Crop field animation
        animate(() => {
            ctx.clearRect(0, 0, W, H);
            ctx.fillStyle = '#f0fdf4'; ctx.fillRect(0, 0, W, H);

            // Sky gradient
            const sky = ctx.createLinearGradient(0, 0, 0, H * 0.5);
            sky.addColorStop(0, '#dbeafe'); sky.addColorStop(1, '#bfdbfe');
            ctx.fillStyle = sky; ctx.fillRect(0, 0, W, H * 0.5);

            // Sun
            ctx.beginPath(); ctx.arc(W - 60, 40, 22, 0, Math.PI * 2);
            ctx.fillStyle = '#fbbf24'; ctx.fill();

            // Ground
            ctx.fillStyle = '#92400e'; ctx.fillRect(0, H * 0.6, W, H * 0.4);

            // Crops growing
            for (let i = 0; i < 14; i++) {
                const cx2 = 30 + i * 38;
                const growH = 60 + 15 * Math.abs(Math.sin(t * 0.5 + i * 0.5));
                // Stem
                ctx.strokeStyle = '#16a34a'; ctx.lineWidth = 3;
                ctx.beginPath();
                ctx.moveTo(cx2, H * 0.6);
                ctx.lineTo(cx2, H * 0.6 - growH);
                ctx.stroke();
                // Leaves
                ctx.fillStyle = '#22c55e';
                ctx.beginPath();
                ctx.ellipse(cx2 - 14, H * 0.6 - growH * 0.6, 14, 6, -0.5, 0, Math.PI * 2);
                ctx.fill();
                ctx.beginPath();
                ctx.ellipse(cx2 + 14, H * 0.6 - growH * 0.5, 14, 6, 0.5, 0, Math.PI * 2);
                ctx.fill();
                // Top
                ctx.beginPath();
                ctx.arc(cx2, H * 0.6 - growH, 9, 0, Math.PI * 2);
                ctx.fillStyle = i % 3 === 0 ? '#f59e0b' : '#16a34a'; ctx.fill();
            }

            ctx.fillStyle = '#374151';
            ctx.font = 'bold 11px DM Sans'; ctx.textAlign = 'center';
            ctx.fillText('Healthy crops with proper nutrients & care', W / 2, H - 8);

            t += 0.015;
        });
    } else {
        // Default: animated atom for science
        animate(() => {
            ctx.clearRect(0, 0, W, H);
            ctx.fillStyle = '#f8f9ff'; ctx.fillRect(0, 0, W, H);
            const cx = W / 2, cy = H / 2;
            ctx.beginPath(); ctx.arc(cx, cy, 12, 0, Math.PI * 2);
            ctx.fillStyle = '#4361ee'; ctx.fill();
            const orbits2 = [60, 95, 130];
            orbits2.forEach((r, i) => {
                ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2);
                ctx.strokeStyle = 'rgba(67,97,238,0.15)'; ctx.lineWidth = 1.5; ctx.stroke();
                const angle = t * (1 - i * 0.25) + i;
                const ex = cx + r * Math.cos(angle);
                const ey = cy + r * Math.sin(angle);
                ctx.beginPath(); ctx.arc(ex, ey, 6, 0, Math.PI * 2);
                ctx.fillStyle = ['#f72585', '#4cc9f0', '#f4a261'][i]; ctx.fill();
            });
            t += 0.02;
        });
    }
}

// ---- DRAWING HELPERS ----
function roundRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
}

function roundRect2(ctx, x, y, w, h, r, color) {
    ctx.fillStyle = color + '15';
    ctx.strokeStyle = color + '55';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.roundRect(x, y, w, h, r);
    ctx.fill();
    ctx.stroke();
}

function drawArrow(ctx, x1, y1, x2, y2, color) {
    const angle = Math.atan2(y2 - y1, x2 - x1);
    ctx.strokeStyle = color; ctx.lineWidth = 2.5;
    ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(x2, y2);
    ctx.lineTo(x2 - 10 * Math.cos(angle - 0.4), y2 - 10 * Math.sin(angle - 0.4));
    ctx.lineTo(x2 - 10 * Math.cos(angle + 0.4), y2 - 10 * Math.sin(angle + 0.4));
    ctx.closePath(); ctx.fill();
}

function drawCar(ctx, x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, 70, 22);
    ctx.beginPath();
    ctx.roundRect(x + 10, y - 16, 45, 18, 5);
    ctx.fillStyle = color + 'cc'; ctx.fill();
    // Windows
    ctx.fillStyle = '#bfdbfe';
    ctx.fillRect(x + 14, y - 13, 15, 12);
    ctx.fillRect(x + 34, y - 13, 15, 12);
    // Wheels
    [x + 10, x + 50].forEach(wx => {
        ctx.beginPath(); ctx.arc(wx, y + 22, 9, 0, Math.PI * 2);
        ctx.fillStyle = '#111'; ctx.fill();
        ctx.beginPath(); ctx.arc(wx, y + 22, 4, 0, Math.PI * 2);
        ctx.fillStyle = '#9ca3af'; ctx.fill();
    });
}

function generateSolidParticles(cx, cy, w, h) {
    const particles = [];
    const cols = 5, rows = 4;
    for (let r = 0; r < rows; r++)
        for (let c = 0; c < cols; c++)
            particles.push({ x: cx - w / 2 + 15 + c * (w / cols), y: cy - h / 2 + 15 + r * (h / rows) });
    return particles;
}

function generateLiquidParticles(cx, cy, w, h, t) {
    const particles = [];
    for (let i = 0; i < 14; i++) {
        const baseX = cx - w / 2 + 15 + (i % 4) * 28;
        const baseY = cy - h / 2 + 20 + Math.floor(i / 4) * 28;
        particles.push({
            x: baseX + Math.sin(t * 1.2 + i * 0.7) * 4,
            y: baseY + Math.cos(t + i * 0.9) * 4
        });
    }
    return particles;
}

function generateGasParticles(cx, cy, w, h, t) {
    const particles = [];
    for (let i = 0; i < 10; i++) {
        particles.push({
            x: cx - w / 2 + 20 + (Math.sin(t * 0.9 + i * 1.3) * 0.5 + 0.5) * (w - 40),
            y: cy - h / 2 + 20 + (Math.cos(t * 1.1 + i * 0.8) * 0.5 + 0.5) * (h - 40)
        });
    }
    return particles;
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

        const bg = ctx.createRadialGradient(W / 2, H / 2, 20, W / 2, H / 2, 220);
        bg.addColorStop(0, 'rgba(240,244,255,0.8)');
        bg.addColorStop(1, 'rgba(255,255,255,0)');
        ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);

        const cx = W / 2 + 10, cy = H / 2;
        ctx.beginPath(); ctx.arc(cx, cy, 14, 0, Math.PI * 2);
        ctx.fillStyle = '#4361ee'; ctx.fill();

        const orbits = [
            { rx: 90, ry: 55, angle: t, color: '#f72585', eSize: 7 },
            { rx: 140, ry: 70, angle: -t * 0.7 + 1, color: '#4cc9f0', eSize: 6 },
            { rx: 180, ry: 90, angle: t * 0.5 + 2, color: '#f4a261', eSize: 5 }
        ];

        orbits.forEach(orb => {
            ctx.beginPath();
            ctx.ellipse(cx, cy, orb.rx, orb.ry, orb.angle * 0.1, 0, Math.PI * 2);
            ctx.strokeStyle = 'rgba(67,97,238,0.12)'; ctx.lineWidth = 1.5; ctx.stroke();

            const ex = cx + orb.rx * Math.cos(orb.angle);
            const ey = cy + orb.ry * Math.sin(orb.angle);
            ctx.beginPath(); ctx.arc(ex, ey, orb.eSize, 0, Math.PI * 2);
            const g = ctx.createRadialGradient(ex, ey, 0, ex, ey, orb.eSize);
            g.addColorStop(0, orb.color);
            g.addColorStop(1, 'rgba(255,255,255,0)');
            ctx.fillStyle = g; ctx.fill();
        });

        ctx.beginPath();
        for (let x = 0; x < W; x += 2) {
            const y = H - 50 + Math.sin(x * 0.04 + t * 2) * 14 + Math.sin(x * 0.08 - t) * 8;
            x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.strokeStyle = 'rgba(76,201,240,0.5)'; ctx.lineWidth = 2.5; ctx.stroke();

        const labels = [
            { text: 'F=ma', x: 70, y: 50 + Math.sin(t + 1) * 8, color: '#4361ee' },
            { text: 'E=mc²', x: W - 80, y: 80 + Math.sin(t + 2) * 8, color: '#f72585' },
            { text: 'p=mv', x: 60, y: H - 80 + Math.sin(t) * 8, color: '#2d9b6f' },
            { text: 'PV=nRT', x: W - 90, y: H - 60 + Math.sin(t + 3) * 8, color: '#f4a261' }
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
