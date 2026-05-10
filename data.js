// ============================================================
// PHYSICSWIZ — DATA.JS
// All units, topics, visualizations, explanations, quizzes
// ============================================================

const UNITS = [
  {
    id: 'electrostatics', num: 'Unit 1', emoji: '⚡', color: '#f72585',
    title: 'Electrostatics',
    desc: 'Electric charges, fields, potential and capacitance',
    topics: ['Electric Charges & Fields', 'Electrostatic Potential & Capacitance'],
    subtopics: [
      {
        id: 'charges-fields', title: 'Electric Charges & Fields',
        realQ: 'Why do charged objects attract or repel each other without touching?',
        explanation: `
          <p>Everything around you is made of <strong>atoms</strong>. Atoms have:</p>
          <ul>
            <li><strong>Protons</strong> (positive charge, in nucleus)</li>
            <li><strong>Electrons</strong> (negative charge, orbiting nucleus)</li>
            <li><strong>Neutrons</strong> (no charge)</li>
          </ul>
          <p>Normally, atoms are balanced — equal +ve and −ve charges. But when you <strong>rub</strong> two objects together, electrons transfer between them. One gains extra electrons (becomes <strong>−ve</strong>), the other loses electrons (becomes <strong>+ve</strong>).</p>
          <p>The rule is simple: <strong>Like charges repel. Opposite charges attract.</strong> This force is described by <strong>Coulomb's Law</strong>:</p>
        `,
        formula: 'F = k·q₁·q₂ / r²',
        formulaNote: 'Force (F) ∝ product of charges, and ∝ 1/distance²',
        vizType: 'charges',
        thinkQ: 'If the distance between two charges doubles, what happens to the force between them?',
        thinkA: 'The force becomes 1/4th of the original. Since F ∝ 1/r², doubling r makes r² = 4×, so F drops to 1/4. This is why electrostatic forces weaken rapidly with distance.',
        interactLabel: 'Change distance between charges (r):',
        interactUnit: 'm',
        interactMin: 1, interactMax: 10, interactDefault: 3,
        interactFn: (r) => {
          const k = 9e9, q1 = 1e-6, q2 = 1e-6;
          const F = (k * q1 * q2) / (r * r * 1e-2);
          return `⚡ Coulomb Force = <strong>${F.toFixed(4)} N</strong> (at r = ${r} units, q₁=q₂=1μC)`;
        },
        summary: [
          'Two types of charges exist: positive (+) and negative (−)',
          'Like charges repel; unlike charges attract',
          "Coulomb's Law: F = kq₁q₂/r² — force depends on charges and distance",
          'Charge is conserved — it cannot be created or destroyed',
          'Electric field E = F/q points away from +ve, toward −ve'
        ],
        quiz: 'charges-fields'
      },
      {
        id: 'potential-capacitance', title: 'Electrostatic Potential & Capacitance',
        realQ: 'Why does a capacitor store energy, and where does it actually go?',
        explanation: `
          <p><strong>Electric potential (V)</strong> is like height in a gravitational field — a charge at high potential has more energy, just like a ball held high has more potential energy.</p>
          <p>When you move a positive charge from lower to higher potential, you do <strong>work</strong>. That work gets stored as electric potential energy.</p>
          <p>A <strong>capacitor</strong> is two conducting plates separated by a gap. When connected to a battery, one plate stores +Q and other stores −Q. The energy is stored in the <strong>electric field between the plates</strong>.</p>
          <p>Capacitance C = Q/V — it tells you how much charge you can store per volt.</p>
        `,
        formula: 'C = ε₀·A / d',
        formulaNote: 'Capacitance increases with plate area (A) and decreases with separation (d)',
        vizType: 'capacitor',
        thinkQ: 'If you insert a dielectric material between capacitor plates, what happens to its capacitance?',
        thinkA: 'Capacitance increases! The dielectric has molecules that polarize in the electric field, creating an opposing field that reduces the net electric field. This allows more charge to be stored at the same voltage, so C = κε₀A/d where κ > 1 is the dielectric constant.',
        interactLabel: 'Change plate separation (d):',
        interactUnit: 'mm',
        interactMin: 1, interactMax: 20, interactDefault: 5,
        interactFn: (d) => {
          const eps0 = 8.85e-12, A = 0.01;
          const C = (eps0 * A) / (d * 1e-3);
          return `🔋 Capacitance = <strong>${(C * 1e12).toFixed(2)} pF</strong> (d = ${d}mm, A = 100cm²)`;
        },
        summary: [
          'Electric potential V is work done per unit charge: V = W/q',
          'Equipotential surfaces are perpendicular to field lines',
          'A capacitor stores energy in the electric field between its plates',
          'C = Q/V; for parallel plates: C = ε₀A/d',
          'Dielectric increases capacitance by factor κ (dielectric constant)'
        ],
        quiz: 'potential-capacitance'
      }
    ]
  },
  {
    id: 'current-electricity', num: 'Unit 2', emoji: '🔌', color: '#4361ee',
    title: 'Current Electricity',
    desc: "Ohm's Law, resistance, circuits and Kirchhoff's laws",
    topics: ['Current Electricity'],
    subtopics: [
      {
        id: 'current-electricity-main', title: 'Current Electricity',
        realQ: "Why does a thick wire carry more current than a thin wire at the same voltage?",
        explanation: `
          <p><strong>Electric current</strong> is the flow of electrons through a conductor. Think of it like water in a pipe — more water flows through a wider pipe.</p>
          <p><strong>Resistance</strong> (R) is the opposition to current flow. A thin, long wire has higher resistance than a thick, short wire — just like a narrow pipe resists water flow more.</p>
          <p><strong>Ohm's Law</strong> (the most fundamental law in circuits):</p>
          <p>V = I × R</p>
          <p>If voltage is the "push", resistance is the "block", and current is how much actually flows.</p>
        `,
        formula: 'V = I × R',
        formulaNote: 'Voltage (V) = Current (I) × Resistance (R)',
        vizType: 'current',
        thinkQ: 'In a circuit, if you double the resistance but keep voltage the same, what happens to current?',
        thinkA: "Current becomes half. From Ohm's Law: I = V/R. If R doubles and V stays same, I = V/2R — exactly half the original. This is why fuses work — high current means something drew too little resistance!",
        interactLabel: 'Change Resistance (Ω):',
        interactUnit: 'Ω',
        interactMin: 1, interactMax: 100, interactDefault: 10,
        interactFn: (R) => {
          const V = 12;
          const I = V / R;
          const P = V * I;
          return `💡 Current = <strong>${I.toFixed(3)} A</strong> | Power = <strong>${P.toFixed(2)} W</strong> (V = 12V)`;
        },
        summary: [
          "Current I = Q/t — charge flowing per second (unit: Ampere)",
          "Ohm's Law: V = IR — valid for ohmic conductors at constant temperature",
          "Resistance R = ρL/A — depends on material, length, area",
          "Resistors in series: R_total = R₁+R₂+... | In parallel: 1/R = 1/R₁+1/R₂",
          "Kirchhoff's laws: Sum of currents at junction = 0; Sum of EMFs = sum of IR drops in a loop"
        ],
        quiz: 'current-electricity-main'
      }
    ]
  },
  {
    id: 'magnetism', num: 'Unit 3', emoji: '🧲', color: '#7209b7',
    title: 'Magnetic Effects & Magnetism',
    desc: 'Moving charges, magnetic fields and magnetic materials',
    topics: ['Moving Charges & Magnetism', 'Magnetism and Matter'],
    subtopics: [
      {
        id: 'moving-charges', title: 'Moving Charges & Magnetism',
        realQ: 'Why does a current-carrying wire attract a nearby magnet?',
        explanation: `
          <p>A <strong>moving charge creates a magnetic field</strong>. Current in a wire = moving electrons. So every current-carrying wire has a magnetic field around it.</p>
          <p>The shape of this field: circular rings around the wire (use the <strong>Right-Hand Thumb Rule</strong> — point thumb in current direction, fingers curl in field direction).</p>
          <p>If you put a magnet near this wire, the wire's field interacts with the magnet's field → <strong>force</strong>.</p>
          <p>The force on a charge moving in a field: <strong>F = qvB sinθ</strong> — maximum when motion is perpendicular to field.</p>
        `,
        formula: 'F = qvB sinθ',
        formulaNote: 'Force is zero when charge moves parallel to field (θ=0°), maximum when perpendicular (θ=90°)',
        vizType: 'magnetic',
        thinkQ: 'If a charged particle enters a magnetic field parallel to the field lines, what path does it follow?',
        thinkA: 'It moves in a straight line! Because F = qvBsinθ, and θ = 0° when velocity is parallel to B, so sin0° = 0, meaning F = 0. No force → no deflection. This is the key insight behind magnetic field direction analysis.',
        interactLabel: 'Change angle θ (degrees):',
        interactUnit: '°',
        interactMin: 0, interactMax: 90, interactDefault: 45,
        interactFn: (theta) => {
          const q = 1.6e-19, v = 1e6, B = 0.5;
          const F = q * v * B * Math.sin(theta * Math.PI / 180);
          return `🧲 Force on electron = <strong>${(F * 1e14).toFixed(3)} × 10⁻¹⁴ N</strong> at θ = ${theta}° (v=10⁶m/s, B=0.5T)`;
        },
        summary: [
          'Moving charges (current) create magnetic fields',
          'Right-Hand Thumb Rule gives direction of B around a wire',
          'Force on moving charge: F = qvBsinθ',
          'A current loop acts like a magnetic dipole (tiny magnet)',
          'Cyclotron uses magnetic force to accelerate charged particles in circles'
        ],
        quiz: 'moving-charges'
      }
    ]
  },
  {
    id: 'em-induction', num: 'Unit 4', emoji: '🌀', color: '#f4a261',
    title: 'EM Induction & AC',
    desc: 'Faraday\'s law, Lenz\'s law, transformers and AC circuits',
    topics: ['Electromagnetic Induction', 'Alternating Current'],
    subtopics: [
      {
        id: 'em-induction-main', title: 'Electromagnetic Induction',
        realQ: 'How does moving a magnet near a coil produce electricity?',
        explanation: `
          <p><strong>Faraday's Discovery:</strong> A changing magnetic field creates an electric field — and hence, a current in a conductor!</p>
          <p>This is the principle behind <strong>every generator</strong> on Earth — power plants, bicycle dynamos, your phone charger.</p>
          <p>The key quantity is <strong>magnetic flux (Φ)</strong>: Φ = BAcosθ</p>
          <p>When flux <em>changes</em>, EMF is induced: <strong>EMF = −dΦ/dt</strong> (Faraday's Law)</p>
          <p><strong>Lenz's Law:</strong> The induced current always opposes the change that caused it. (Nature resists change!)</p>
        `,
        formula: 'EMF = −N · dΦ/dt',
        formulaNote: 'More turns (N) = more EMF. Faster change in flux = more EMF.',
        vizType: 'induction',
        thinkQ: 'If you move a magnet into a coil quickly vs slowly, which produces more EMF, and why?',
        thinkA: "Moving quickly produces MORE EMF. Because EMF = −dΦ/dt, the rate of change of flux (dΦ/dt) is larger when you move the magnet faster. Faster motion → flux changes more per second → more EMF induced. This is why generators spin fast for high power output.",
        interactLabel: 'Change magnet speed (moving into coil):',
        interactUnit: 'cm/s',
        interactMin: 1, interactMax: 100, interactDefault: 30,
        interactFn: (speed) => {
          const N = 200, B = 0.5, A = 0.01;
          const dPhidt = B * A * (speed / 100) * 50;
          const emf = N * dPhidt;
          return `⚡ Induced EMF = <strong>${emf.toFixed(3)} V</strong> (N=200 turns, B=0.5T, A=100cm²)`;
        },
        summary: [
          'Changing magnetic flux induces EMF (Faraday\'s Law)',
          'EMF = −NdΦ/dt (negative sign → Lenz\'s Law)',
          'Lenz\'s Law: induced current opposes the change causing it',
          'Mutual induction is the basis of transformers',
          'Self-induction: coil opposes change in its own current'
        ],
        quiz: 'em-induction-main'
      }
    ]
  },
  {
    id: 'optics', num: 'Unit 6', emoji: '🔭', color: '#2d9b6f',
    title: 'Optics',
    desc: 'Ray optics, lenses, mirrors, wave optics and interference',
    topics: ['Ray Optics', 'Wave Optics'],
    subtopics: [
      {
        id: 'ray-optics', title: 'Ray Optics',
        realQ: "Why does a pencil look bent when placed in water?",
        explanation: `
          <p>Light travels at different speeds in different media. In vacuum/air: 3×10⁸ m/s. In water or glass: slower.</p>
          <p>When light crosses from one medium to another at an angle, it <strong>bends</strong> — this is <strong>refraction</strong>.</p>
          <p><strong>Snell's Law</strong> tells us exactly how much it bends:</p>
          <p>n₁ sinθ₁ = n₂ sinθ₂</p>
          <p>The pencil in water looks bent because light from the submerged part bends as it exits the water, making the pencil appear to be in a different position than it actually is.</p>
          <p>Lenses use this to focus light — <strong>convex lens</strong> converges (brings together), <strong>concave lens</strong> diverges (spreads out).</p>
        `,
        formula: 'n₁sinθ₁ = n₂sinθ₂',
        formulaNote: 'Snell\'s Law: Light bends toward normal when entering denser medium',
        vizType: 'optics',
        thinkQ: 'Why can\'t you see a fish in a pond directly above where it actually is?',
        thinkA: "Because of refraction! Light from the fish bends away from the normal as it exits the water (going from denser to rarer medium). Your eye traces the light backward in a straight line, so it sees the fish at a shallower position than it actually is. This 'apparent depth' is less than real depth: apparent depth = real depth / n.",
        interactLabel: 'Change angle of incidence (degrees):',
        interactUnit: '°',
        interactMin: 0, interactMax: 60, interactDefault: 30,
        interactFn: (theta1) => {
          const n1 = 1.0, n2 = 1.5;
          const sinTheta2 = (n1 * Math.sin(theta1 * Math.PI / 180)) / n2;
          const theta2 = Math.asin(sinTheta2) * 180 / Math.PI;
          return `🔭 Angle of refraction = <strong>${theta2.toFixed(1)}°</strong> (air→glass, n=1.5, i=${theta1}°)`;
        },
        summary: [
          "Reflection: angle of incidence = angle of reflection",
          "Refraction: light bends at boundary; n₁sinθ₁ = n₂sinθ₂ (Snell's Law)",
          "Total Internal Reflection occurs when angle > critical angle (θc = sin⁻¹(1/n))",
          "Mirror formula: 1/v + 1/u = 1/f",
          "Lens formula same: 1/v − 1/u = 1/f"
        ],
        quiz: 'ray-optics'
      }
    ]
  },
  {
    id: 'modern', num: 'Unit 7', emoji: '☢️', color: '#e05b3c',
    title: 'Dual Nature & Modern Physics',
    desc: 'Photoelectric effect, matter waves, atoms, nuclei',
    topics: ['Dual Nature of Radiation', 'Atoms & Nuclei'],
    subtopics: [
      {
        id: 'photoelectric', title: 'Photoelectric Effect',
        realQ: 'Why does shining UV light on metal release electrons, but visible light does not (even if it\'s brighter)?',
        explanation: `
          <p>Einstein's revolutionary insight: Light behaves like <strong>particles called photons</strong>, each carrying energy E = hf (h = Planck's constant, f = frequency).</p>
          <p>To release an electron from metal, a photon must have <em>enough energy</em> to overcome the binding force (called <strong>work function, φ</strong>).</p>
          <p>UV light has high frequency → high energy photons → can kick out electrons.<br>
          Red light has low frequency → low energy photons → can't kick out electrons, no matter how many you fire!</p>
          <p>This proved light has a <strong>particle nature</strong>. de Broglie later showed even particles have a <strong>wave nature</strong>: λ = h/mv</p>
        `,
        formula: 'KE_max = hf − φ',
        formulaNote: 'Energy of photon minus work function = maximum kinetic energy of emitted electron',
        vizType: 'photoelectric',
        thinkQ: 'If you double the intensity of UV light, does the maximum KE of emitted electrons change?',
        thinkA: "No! Maximum KE doesn't change. Intensity means more photons per second — so more electrons are emitted (more current), but each photon still has the same energy hf. The KE of each electron still equals hf − φ. Only increasing frequency increases the KE of emitted electrons.",
        interactLabel: 'Change light frequency:',
        interactUnit: '× 10¹⁴ Hz',
        interactMin: 4, interactMax: 14, interactDefault: 8,
        interactFn: (f14) => {
          const h = 6.626e-34, phi = 3.2e-19; // ~2 eV work function
          const E = h * f14 * 1e14;
          const KE = E - phi;
          if (KE <= 0) return `🚫 No photoelectric effect — photon energy (${(E*1e19).toFixed(1)}×10⁻¹⁹ J) < work function`;
          return `⚡ Max KE of electron = <strong>${(KE * 6.24e18).toFixed(2)} eV</strong> (f = ${f14}×10¹⁴ Hz)`;
        },
        summary: [
          'Light has particle nature — photons with energy E = hf',
          'Photoelectric effect: electrons emitted if photon energy > work function',
          'KE_max = hf − φ; stopping potential eV₀ = KE_max',
          'de Broglie hypothesis: particles have wavelength λ = h/mv',
          'Wave-particle duality: nature has BOTH properties simultaneously'
        ],
        quiz: 'photoelectric'
      }
    ]
  },
  {
    id: 'semiconductors', num: 'Unit 9', emoji: '💻', color: '#4cc9f0',
    title: 'Semiconductor Electronics',
    desc: 'p-n junction, diodes, transistors and logic gates',
    topics: ['Semiconductor Devices'],
    subtopics: [
      {
        id: 'semiconductor-main', title: 'p-n Junction Diode',
        realQ: 'Why does current flow through a diode in only one direction?',
        explanation: `
          <p>A <strong>semiconductor</strong> (like Silicon) can be modified:</p>
          <ul>
            <li><strong>n-type</strong>: Extra electrons added (donors) — negative carriers</li>
            <li><strong>p-type</strong>: "Holes" (missing electrons) added (acceptors) — positive carriers</li>
          </ul>
          <p>When p and n are joined, electrons from n-side move to p-side, creating a <strong>depletion region</strong> — a barrier that blocks further current.</p>
          <p><strong>Forward bias</strong>: +ve terminal to p-side → barrier reduces → current flows easily ✅<br>
          <strong>Reverse bias</strong>: +ve terminal to n-side → barrier increases → current blocked ❌</p>
          <p>This one-way valve property makes diodes useful in <strong>rectifiers</strong> — converting AC to DC!</p>
        `,
        formula: 'I = I₀(e^(eV/kT) − 1)',
        formulaNote: 'Diode equation: exponential rise in forward bias, near-zero in reverse bias',
        vizType: 'diode',
        thinkQ: 'Why is a diode used in a phone charger? What would happen without it?',
        thinkA: "Phone chargers convert AC (alternating current from wall) to DC (direct current needed by battery). The diode only allows current to flow in one direction, so it clips the negative half-cycles of AC, giving a pulsating DC. Without the diode, AC would damage the battery by pushing current backward during negative cycles.",
        interactLabel: 'Change forward bias voltage:',
        interactUnit: 'V',
        interactMin: 0, interactMax: 10, interactDefault: 3,
        interactFn: (V) => {
          const I0 = 1e-9, e = 1.6e-19, k = 1.38e-23, T = 300;
          const Vt = (k * T) / e;
          let I = I0 * (Math.exp(V / Vt) - 1);
          if (I > 1) I = 1;
          const state = V > 0.6 ? '✅ Forward biased — Current flows!' : (V > 0 ? '⚠️ Below threshold — minimal current' : '❌ Zero/reverse bias — No current');
          return `${state}<br>Approx. Current ≈ <strong>${(I * 1000).toFixed(2)} mA</strong>`;
        },
        summary: [
          'n-type: extra electrons; p-type: extra holes (both made from pure semiconductor)',
          'Depletion region forms at p-n junction — acts as a barrier',
          'Forward bias: reduces barrier → large current flows',
          'Reverse bias: increases barrier → almost no current',
          'Diodes rectify AC to DC; LEDs emit light; Zener diodes regulate voltage'
        ],
        quiz: 'semiconductor-main'
      }
    ]
  }
];

// ============================================================
// QUIZ DATA
// ============================================================
const QUIZZES = {
  'charges-fields': [
    {
      q: "Two point charges of +2μC and +2μC are placed 1m apart. The force between them is:",
      opts: ["Attractive, 0.036 N", "Repulsive, 0.036 N", "Attractive, 0.18 N", "Repulsive, 0.18 N"],
      ans: 1,
      exp: "Like charges (both +ve) repel. F = kq₁q₂/r² = 9×10⁹ × 2×10⁻⁶ × 2×10⁻⁶ / 1² = 0.036 N (repulsive)."
    },
    {
      q: "Electric field lines starting from a positive charge always:",
      opts: ["Curve toward the charge", "Point radially outward", "Point radially inward", "Form closed loops"],
      ans: 1,
      exp: "Field lines originate from +ve charges and terminate on −ve charges. From a positive charge alone, they point radially outward in all directions."
    },
    {
      q: "If the distance between two charges is halved, the Coulomb force becomes:",
      opts: ["Half", "Double", "Four times", "One-fourth"],
      ans: 2,
      exp: "F ∝ 1/r². If r becomes r/2, new F ∝ 1/(r/2)² = 4/r². So force becomes 4 times the original."
    },
    {
      q: "Which property of charge does conservation of charge represent?",
      opts: ["Charge can be created", "Charge can be destroyed", "Total charge in an isolated system stays constant", "Charge flows only in metals"],
      ans: 2,
      exp: "Conservation of charge: the net charge of an isolated system remains constant. Charges can transfer, but cannot be created or destroyed."
    }
  ],
  'potential-capacitance': [
    {
      q: "Work done in moving a charge on an equipotential surface is:",
      opts: ["Maximum", "Minimum", "Zero", "Depends on path"],
      ans: 2,
      exp: "An equipotential surface has the same potential everywhere. Since W = q(V₁−V₂) and V₁=V₂ on an equipotential surface, W = 0."
    },
    {
      q: "When a dielectric is inserted in a capacitor connected to a battery, capacitance:",
      opts: ["Decreases", "Increases", "Stays same", "Becomes zero"],
      ans: 1,
      exp: "C = κε₀A/d. Inserting a dielectric (κ>1) increases C. With battery connected, V stays constant, so Q = CV increases — more charge is stored."
    },
    {
      q: "A capacitor of capacitance C is charged to voltage V. Energy stored is:",
      opts: ["CV", "½CV²", "CV²", "½CV"],
      ans: 1,
      exp: "Energy stored in capacitor U = ½CV² = ½QV = Q²/2C. The ½ factor comes from the average voltage during charging."
    }
  ],
  'current-electricity-main': [
    {
      q: "In a circuit, doubling the voltage while keeping resistance constant will:",
      opts: ["Halve the current", "Double the current", "Keep current same", "Quadruple the current"],
      ans: 1,
      exp: "Ohm's Law: I = V/R. If V doubles and R stays same, I = 2V/R — current doubles."
    },
    {
      q: "Three 6Ω resistors are connected in parallel. The equivalent resistance is:",
      opts: ["18Ω", "6Ω", "2Ω", "3Ω"],
      ans: 2,
      exp: "For parallel: 1/R = 1/6 + 1/6 + 1/6 = 3/6 = 1/2. So R = 2Ω. Parallel connection always gives resistance less than smallest individual."
    },
    {
      q: "Kirchhoff's Current Law (KCL) states that:",
      opts: ["Sum of EMFs = 0 in a loop", "Sum of currents at a node = 0", "Current is same in series", "Voltage drops are equal in parallel"],
      ans: 1,
      exp: "KCL: The algebraic sum of all currents at a junction equals zero (conservation of charge). Currents entering = currents leaving."
    }
  ],
  'moving-charges': [
    {
      q: "A charge moves parallel to a magnetic field. The magnetic force on it is:",
      opts: ["Maximum", "Zero", "qvB", "qvB/2"],
      ans: 1,
      exp: "F = qvBsinθ. When charge moves parallel to B, θ=0°, sin0°=0, so F=0. Magnetic force is zero when velocity is parallel to the field."
    },
    {
      q: "The shape of magnetic field lines around a long straight current-carrying wire is:",
      opts: ["Straight lines", "Ellipses", "Concentric circles", "Parabolas"],
      ans: 2,
      exp: "The magnetic field around a long straight wire forms concentric circles in planes perpendicular to the wire. The direction is given by the right-hand thumb rule."
    },
    {
      q: "Two parallel wires carrying currents in the same direction:",
      opts: ["Repel each other", "Attract each other", "Have no force", "Push apart then attract"],
      ans: 1,
      exp: "Wires with current in the same direction attract each other. The magnetic field of one wire acts on the current in the other wire, creating an attractive force."
    }
  ],
  'em-induction-main': [
    {
      q: "According to Faraday's Law, EMF is induced when:",
      opts: ["Magnetic field is strong", "Magnetic flux is large", "Magnetic flux is changing", "Current is large"],
      ans: 2,
      exp: "EMF = −dΦ/dt. EMF is induced only when flux CHANGES, not merely when it is large or strong. A stationary coil in a strong static field has zero induced EMF."
    },
    {
      q: "Lenz's Law is a consequence of:",
      opts: ["Ohm's Law", "Conservation of energy", "Newton's third law", "Coulomb's Law"],
      ans: 1,
      exp: "Lenz's Law (induced current opposes change) ensures energy conservation. If induced current helped the change, we'd get energy for free — which violates conservation of energy."
    },
    {
      q: "A transformer steps up voltage from 200V to 2000V. The turns ratio (N₂/N₁) is:",
      opts: ["1:10", "10:1", "1:100", "100:1"],
      ans: 1,
      exp: "V₂/V₁ = N₂/N₁. So N₂/N₁ = 2000/200 = 10. This is a step-up transformer with turns ratio 10:1."
    }
  ],
  'ray-optics': [
    {
      q: "A concave mirror has focal length 10cm. An object at 30cm gives an image at:",
      opts: ["15cm (real)", "15cm (virtual)", "20cm (real)", "5cm (virtual)"],
      ans: 0,
      exp: "1/v + 1/u = 1/f. Using u = −30cm, f = −10cm: 1/v = 1/f − 1/u = −1/10 + 1/30 = −3/30+1/30 = −2/30. v = −15cm. Negative → real, inverted."
    },
    {
      q: "Total Internal Reflection occurs when light goes from:",
      opts: ["Rarer to denser medium", "Denser to rarer medium, angle > critical angle", "Air to glass always", "Glass to glass"],
      ans: 1,
      exp: "TIR requires: (1) light going from denser to rarer medium, AND (2) angle of incidence > critical angle. Both conditions must be met simultaneously."
    },
    {
      q: "A fish inside water looks at an object in air. The object appears:",
      opts: ["Closer than it is", "Farther than it is", "At actual distance", "Distorted but same distance"],
      ans: 1,
      exp: "Due to refraction, objects in air appear farther to a fish in water. Apparent depth from water side = real distance × n (where n = refractive index of water ≈ 1.33)."
    }
  ],
  'photoelectric': [
    {
      q: "In the photoelectric effect, increasing the intensity of light increases:",
      opts: ["Maximum KE of electrons", "Threshold frequency", "Number of electrons emitted", "Stopping potential"],
      ans: 2,
      exp: "Intensity = number of photons per second. More photons → more electrons emitted per second (more current). But each photon energy (hf) is unchanged, so KE and stopping potential don't change."
    },
    {
      q: "If the stopping potential for a metal is 2V, the maximum KE of emitted electrons is:",
      opts: ["2 eV", "1 eV", "4 eV", "0.5 eV"],
      ans: 0,
      exp: "eV₀ = KE_max. So KE_max = e × 2V = 2 eV. The stopping potential directly gives the maximum kinetic energy in electron volts."
    },
    {
      q: "de Broglie wavelength of a particle with mass m moving at velocity v is:",
      opts: ["λ = mv/h", "λ = h/mv", "λ = hm/v", "λ = h·m·v"],
      ans: 1,
      exp: "de Broglie: λ = h/p = h/(mv). Larger momentum → smaller wavelength. This is why macroscopic objects have negligibly small wavelengths."
    }
  ],
  'semiconductor-main': [
    {
      q: "In a p-n junction diode, the depletion region is formed due to:",
      opts: ["Flow of majority carriers", "Diffusion of charge carriers across junction", "External battery", "Reverse biasing only"],
      ans: 1,
      exp: "Depletion region forms spontaneously due to diffusion: electrons from n-side and holes from p-side diffuse across and recombine near the junction, leaving behind immobile ions and creating a charge-free zone."
    },
    {
      q: "A diode is said to be forward biased when:",
      opts: ["p-side is connected to −ve terminal", "n-side is connected to −ve terminal", "p-side is connected to −ve, n to +ve", "No external voltage is applied"],
      ans: 1,
      exp: "Forward bias: p-side to +ve terminal, n-side to −ve terminal. This reduces the potential barrier, allowing majority carriers to flow — large current results."
    },
    {
      q: "The primary use of a p-n junction diode in power supplies is:",
      opts: ["Amplification", "Oscillation", "Rectification (AC to DC)", "Switching"],
      ans: 2,
      exp: "Rectification: converting AC to DC. The diode's one-way conduction property allows current only during half-cycles (half-wave) or both (full-wave with bridge), giving pulsating DC."
    }
  ]
};