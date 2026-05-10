// ============================================================
// SCIENCEWIZ CLASS 9 — DATA.JS
// Chapters from NCERT Class 9 Science textbook
// ============================================================

const UNITS = [
  {
    id: 'matter-surroundings', num: 'Chapter 1', emoji: '🧪', color: '#f72585',
    title: 'Matter in Our Surroundings',
    desc: 'States of matter, evaporation, and changes of state',
    topics: ['Matter in Our Surroundings'],
    subtopics: [
      {
        id: 'matter-surroundings-main',
        title: 'Matter in Our Surroundings',
        realQ: 'Why does wet clothes dry faster on a hot, windy day than on a cold, still day?',
        explanation: `
          <p><strong>Matter</strong> is anything that has mass and occupies space. Everything around us — air, water, stone, fire — is matter.</p>
          <p>Matter exists in three states: <strong>Solid</strong> (fixed shape & volume), <strong>Liquid</strong> (fixed volume, no fixed shape), and <strong>Gas</strong> (no fixed shape or volume).</p>
          <p>Particles of matter are always in motion. In solids, they vibrate. In liquids, they slide past each other. In gases, they move freely and fast.</p>
          <p><strong>Evaporation</strong> is the process where liquid turns to gas at the surface — even below boiling point. Factors increasing evaporation: higher temperature, more surface area, lower humidity, higher wind speed.</p>
        `,
        formula: 'Latent Heat: Q = mL',
        formulaNote: 'Q = heat absorbed/released, m = mass, L = latent heat of substance',
        vizType: 'matter',
        thinkQ: 'Why does evaporation cause cooling? (Hint: which particles escape first?)',
        thinkA: 'The fastest-moving particles escape during evaporation, leaving behind slower (cooler) particles. This reduces the average kinetic energy of remaining particles — that is, the temperature drops. This is why sweating cools your body!',
        interactLabel: 'Change Temperature (°C):',
        interactUnit: '°C',
        interactMin: 0, interactMax: 100, interactDefault: 25,
        interactFn: (T) => {
          const evapRate = (T / 100 * 5).toFixed(2);
          const state = T < 0 ? 'Ice (Solid)' : T < 100 ? 'Water (Liquid)' : 'Steam (Gas)';
          return `💧 State: <strong>${state}</strong> | Evaporation Rate: <strong>${evapRate} units/min</strong>`;
        },
        summary: [
          'Matter is made of tiny particles with spaces between them',
          'Three states: Solid (rigid), Liquid (fluid), Gas (free)',
          'Particles move faster at higher temperatures',
          'Evaporation is surface phenomenon — causes cooling',
          'Latent heat: energy absorbed/released during change of state without temp change'
        ],
        quiz: 'matter-surroundings-main'
      }
    ]
  },
  {
    id: 'matter-pure', num: 'Chapter 2', emoji: '⚗️', color: '#4361ee',
    title: 'Is Matter Around Us Pure?',
    desc: 'Mixtures, solutions, compounds and separation techniques',
    topics: ['Pure Substances and Mixtures'],
    subtopics: [
      {
        id: 'matter-pure-main',
        title: 'Pure Substances & Mixtures',
        realQ: 'How does a water purifier separate impurities from dirty water?',
        explanation: `
          <p>A <strong>pure substance</strong> has a definite composition. Elements (like gold, oxygen) and compounds (like water, salt) are pure.</p>
          <p>A <strong>mixture</strong> has variable composition. Mixtures can be <strong>homogeneous</strong> (uniform — like saltwater) or <strong>heterogeneous</strong> (non-uniform — like sand+water).</p>
          <p>Separation techniques depend on the properties of components:</p>
          <ul>
            <li><strong>Filtration</strong> — separates insoluble solids from liquids</li>
            <li><strong>Distillation</strong> — separates liquids with different boiling points</li>
            <li><strong>Chromatography</strong> — separates colored components based on adsorption</li>
            <li><strong>Centrifugation</strong> — separates based on density differences</li>
          </ul>
        `,
        formula: 'Concentration = (Mass of Solute / Mass of Solution) × 100%',
        formulaNote: 'Higher concentration = more solute dissolved per unit solution',
        vizType: 'mixture',
        thinkQ: 'Why can a mixture be separated by physical methods but a compound cannot?',
        thinkA: 'In a mixture, components are just physically mixed — no chemical bonds form. So physical methods (filtration, distillation) can separate them. In a compound, atoms are chemically bonded (like H₂O), so you need a chemical reaction (electrolysis of water) to separate them.',
        interactLabel: 'Change amount of salt added (g):',
        interactUnit: 'g',
        interactMin: 0, interactMax: 50, interactDefault: 10,
        interactFn: (g) => {
          const maxSolubility = 36;
          if (g <= maxSolubility) {
            return `✅ Solution: <strong>${g}g dissolved</strong> — Unsaturated solution (max ~36g/100mL at 20°C)`;
          } else {
            return `⚠️ Saturation reached! Extra <strong>${g - maxSolubility}g</strong> remains undissolved — Saturated solution`;
          }
        },
        summary: [
          'Pure substances: elements (one type of atom) or compounds (fixed ratio)',
          'Mixtures: components retain their properties, variable composition',
          'Homogeneous mixtures = solutions (uniform throughout)',
          'Heterogeneous mixtures = suspensions/colloids (non-uniform)',
          'Separation uses physical differences: boiling point, particle size, density'
        ],
        quiz: 'matter-pure-main'
      }
    ]
  },
  {
    id: 'atoms-molecules', num: 'Chapter 3', emoji: '⚛️', color: '#7209b7',
    title: 'Atoms and Molecules',
    desc: "Dalton's atomic theory, atoms, molecules and chemical formulae",
    topics: ['Atoms and Molecules'],
    subtopics: [
      {
        id: 'atoms-molecules-main',
        title: 'Atoms and Molecules',
        realQ: 'If atoms are so small they cannot be seen, how do scientists know they exist?',
        explanation: `
          <p><strong>Dalton's Atomic Theory</strong> (1808): All matter is made of indivisible atoms. Atoms of the same element are identical. Atoms combine in fixed ratios to form compounds.</p>
          <p>An <strong>atom</strong> is the smallest particle of an element. Size: ~10⁻¹⁰ meters (0.1 nm) — incredibly tiny!</p>
          <p>A <strong>molecule</strong> is the smallest particle of a substance that can exist independently. E.g., O₂ (2 oxygen atoms), H₂O (2H + 1O), CO₂ (1C + 2O).</p>
          <p><strong>Mole concept</strong>: 1 mole = 6.022 × 10²³ particles (Avogadro's number). Molar mass = mass in grams of 1 mole of a substance.</p>
        `,
        formula: 'n = m / M (moles = mass / molar mass)',
        formulaNote: '1 mole of any substance contains 6.022 × 10²³ particles',
        vizType: 'atoms',
        thinkQ: 'Why do atoms combine in fixed ratios to form compounds (Law of Definite Proportions)?',
        thinkA: 'Atoms combine in fixed ratios because chemical bonds form between specific numbers of atoms based on their valency (bonding capacity). Water is always H₂O (not H₃O or HO) because oxygen needs exactly 2 bonds and hydrogen needs 1 — this is why every pure water molecule has exactly 2H:1O.',
        interactLabel: 'Number of moles:',
        interactUnit: 'mol',
        interactMin: 1, interactMax: 10, interactDefault: 1,
        interactFn: (n) => {
          const particles = (n * 6.022e23).toExponential(3);
          const massH2O = (n * 18).toFixed(1);
          return `🔬 Particles: <strong>${particles}</strong> | Mass of H₂O: <strong>${massH2O} g</strong>`;
        },
        summary: [
          "Dalton's atomic theory: matter made of indivisible atoms",
          'Atom = smallest particle of element; molecule = smallest particle of substance',
          'Chemical formula shows types and numbers of atoms in a molecule',
          '1 mole = 6.022 × 10²³ particles (Avogadro number)',
          'Molar mass (g/mol) numerically equals atomic/molecular mass (u)'
        ],
        quiz: 'atoms-molecules-main'
      }
    ]
  },
  {
    id: 'structure-atom', num: 'Chapter 4', emoji: '🔬', color: '#f4a261',
    title: 'Structure of the Atom',
    desc: 'Electrons, protons, neutrons and atomic models',
    topics: ['Structure of the Atom'],
    subtopics: [
      {
        id: 'structure-atom-main',
        title: 'Structure of the Atom',
        realQ: 'Why are most atoms electrically neutral even though they contain positive and negative charges?',
        explanation: `
          <p>An atom has three subatomic particles:</p>
          <ul>
            <li><strong>Proton</strong> (+1 charge, in nucleus) — mass ≈ 1 u</li>
            <li><strong>Neutron</strong> (0 charge, in nucleus) — mass ≈ 1 u</li>
            <li><strong>Electron</strong> (−1 charge, around nucleus) — mass ≈ 1/1840 u</li>
          </ul>
          <p>Atoms are neutral because #protons = #electrons. If electrons are lost → positive ion (cation). If gained → negative ion (anion).</p>
          <p><strong>Bohr's Model</strong>: Electrons revolve in fixed orbits (shells) K, L, M, N. Each shell has a maximum electron capacity: 2n² (K=2, L=8, M=18).</p>
          <p><strong>Valency</strong> = electrons in outermost shell (or 8 minus that, whichever is less).</p>
        `,
        formula: 'Mass Number (A) = Protons (Z) + Neutrons (N)',
        formulaNote: 'Atomic Number Z = number of protons = number of electrons in neutral atom',
        vizType: 'atom-structure',
        thinkQ: 'Two atoms have the same mass number (40) but different atomic numbers (18 and 20). Can they be the same element?',
        thinkA: 'No! They are different elements. Atomic number (Z) determines the element — Z=18 is Argon (Ar), Z=20 is Calcium (Ca). Same mass number but different atomic number means different elements. These are called isobars.',
        interactLabel: 'Atomic Number (Z):',
        interactUnit: '',
        interactMin: 1, interactMax: 20, interactDefault: 6,
        interactFn: (Z) => {
          const elements = {1:'H',2:'He',3:'Li',4:'Be',5:'B',6:'C',7:'N',8:'O',9:'F',10:'Ne',11:'Na',12:'Mg',13:'Al',14:'Si',15:'P',16:'S',17:'Cl',18:'Ar',19:'K',20:'Ca'};
          const el = elements[Z] || '?';
          const k = Math.min(2, Z);
          let rem = Z - k;
          const l = Math.min(8, rem);
          rem -= l;
          const m = Math.min(8, rem);
          const shells = `K=${k}${l>0?', L='+l:''}${m>0?', M='+m:''}`;
          const valency = m > 0 ? (m <= 4 ? m : 8-m) : (l <= 4 ? l : 8-l);
          return `⚛️ <strong>${el}</strong> (Z=${Z}) | Shells: ${shells} | Valency: <strong>${valency}</strong>`;
        },
        summary: [
          'Protons (+), neutrons (0) in nucleus; electrons (−) in shells',
          'Atomic number Z = protons (defines element); Mass number A = p + n',
          "Bohr's model: electrons in fixed orbits K,L,M,N with max capacity 2n²",
          'Isotopes: same Z, different A (e.g., C-12, C-14) — same element, different mass',
          'Valency = outermost electrons (or 8 minus, whichever is less)'
        ],
        quiz: 'structure-atom-main'
      }
    ]
  },
  {
    id: 'fundamental-unit-life', num: 'Chapter 5', emoji: '🦠', color: '#2d9b6f',
    title: 'The Fundamental Unit of Life',
    desc: 'Cell structure, organelles and cell division',
    topics: ['The Cell'],
    subtopics: [
      {
        id: 'fundamental-unit-main',
        title: 'The Cell — Fundamental Unit of Life',
        realQ: 'Why can a single cell like an amoeba survive on its own, but a single muscle cell from your body cannot?',
        explanation: `
          <p>The <strong>cell</strong> is the basic structural and functional unit of all living organisms. Every living thing is made of one or more cells.</p>
          <p>Key organelles and their functions:</p>
          <ul>
            <li><strong>Cell membrane</strong> — selectively permeable boundary; controls what enters/exits</li>
            <li><strong>Nucleus</strong> — control center; contains DNA (hereditary information)</li>
            <li><strong>Mitochondria</strong> — "powerhouse"; produces energy (ATP) via cellular respiration</li>
            <li><strong>Chloroplast</strong> — in plant cells; site of photosynthesis</li>
            <li><strong>Ribosomes</strong> — site of protein synthesis</li>
            <li><strong>Vacuole</strong> — storage; large in plants, small in animals</li>
          </ul>
          <p>Plant vs Animal cells: Plants have cell wall, chloroplasts, large central vacuole. Animals do not.</p>
        `,
        formula: 'Osmosis: Water moves from High [water] → Low [water] across membrane',
        formulaNote: 'Semi-permeable membrane allows water but not solute to pass',
        vizType: 'cell',
        thinkQ: 'If you put a red blood cell in pure water, what happens? What if you put it in very salty water?',
        thinkA: 'In pure water (hypotonic): water rushes IN by osmosis → cell swells and bursts (lysis). In very salty water (hypertonic): water rushes OUT → cell shrinks (crenation). This is why doctors use "normal saline" (0.9% NaCl) in injections — it matches body fluid concentration (isotonic), so cells remain normal.',
        interactLabel: 'External salt concentration (%):',
        interactUnit: '%',
        interactMin: 0, interactMax: 5, interactDefault: 1,
        interactFn: (c) => {
          const bodyConc = 0.9;
          if (Math.abs(c - bodyConc) < 0.15) {
            return `✅ Isotonic (~0.9%): Cell is <strong>normal</strong> — no net water movement`;
          } else if (c < bodyConc) {
            return `💧 Hypotonic (${c}%): Water enters cell → Cell <strong>swells</strong> (risk of bursting)`;
          } else {
            return `🔴 Hypertonic (${c}%): Water exits cell → Cell <strong>shrinks</strong> (crenation)`;
          }
        },
        summary: [
          'Cell = basic unit of life; unicellular (amoeba) or multicellular (humans)',
          'Cell membrane: semi-permeable; controls entry/exit of substances',
          'Nucleus: contains DNA; directs cell activities',
          'Mitochondria: produces ATP (energy); called powerhouse of cell',
          'Plant cells: have cell wall, chloroplasts, large vacuole — animal cells do not'
        ],
        quiz: 'fundamental-unit-main'
      }
    ]
  },
  {
    id: 'tissues', num: 'Chapter 6', emoji: '🫀', color: '#e05b3c',
    title: 'Tissues',
    desc: 'Plant tissues, animal tissues and their functions',
    topics: ['Tissues'],
    subtopics: [
      {
        id: 'tissues-main',
        title: 'Plant & Animal Tissues',
        realQ: 'Why is bone rigid while muscle is flexible — even though both are animal tissues?',
        explanation: `
          <p>A <strong>tissue</strong> is a group of similar cells performing a specific function.</p>
          <p><strong>Plant Tissues:</strong></p>
          <ul>
            <li><strong>Meristematic</strong> — dividing cells; at root/shoot tips (growth)</li>
            <li><strong>Permanent tissues</strong>: Parenchyma (storage), Collenchyma (flexibility), Sclerenchyma (support/rigidity)</li>
            <li><strong>Xylem</strong> — conducts water upward; <strong>Phloem</strong> — conducts food (both ways)</li>
          </ul>
          <p><strong>Animal Tissues:</strong></p>
          <ul>
            <li><strong>Epithelial</strong> — covering/lining (skin, gut lining)</li>
            <li><strong>Connective</strong> — support & binding (bone, cartilage, blood, fat)</li>
            <li><strong>Muscular</strong> — movement (striated/voluntary, smooth/involuntary, cardiac)</li>
            <li><strong>Nervous</strong> — coordination (neurons)</li>
          </ul>
        `,
        formula: 'Surface Area / Volume ratio determines tissue efficiency',
        formulaNote: 'Smaller cells have higher SA:V ratio — more efficient exchange',
        vizType: 'tissue',
        thinkQ: 'Why are cardiac muscle cells (heart muscle) different from skeletal muscle cells?',
        thinkA: 'Cardiac muscle must work non-stop for your entire life — it cannot tire and cannot take voluntary rest breaks. So it is: (1) involuntary (not under conscious control), (2) has its own electrical rhythm (self-stimulating), (3) never fatigues due to abundant mitochondria, and (4) cells are interconnected (syncytium) so they beat together as one unit.',
        interactLabel: 'Select tissue type (1=Epithelial, 2=Muscular, 3=Connective, 4=Nervous):',
        interactUnit: '',
        interactMin: 1, interactMax: 4, interactDefault: 1,
        interactFn: (t) => {
          const tissues = {
            1: '🔲 Epithelial — Lines body surfaces; protection & secretion; tightly packed cells',
            2: '💪 Muscular — Movement; contains actin & myosin protein filaments; 3 types',
            3: '🦴 Connective — Supports & binds; blood, bone, cartilage, fat; matrix-rich',
            4: '⚡ Nervous — Electrical signals; neurons with dendrites, axon; rapid communication'
          };
          return tissues[t] || tissues[1];
        },
        summary: [
          'Tissue = group of similar cells with same function',
          'Meristematic tissue: dividing cells at growing points in plants',
          'Xylem carries water up; phloem carries food in both directions',
          'Four animal tissue types: Epithelial, Connective, Muscular, Nervous',
          'Cardiac muscle: involuntary, never fatigues, self-stimulating'
        ],
        quiz: 'tissues-main'
      }
    ]
  },
  {
    id: 'motion', num: 'Chapter 7', emoji: '🚀', color: '#4cc9f0',
    title: 'Motion',
    desc: 'Distance, displacement, velocity, acceleration and graphs',
    topics: ['Motion'],
    subtopics: [
      {
        id: 'motion-main',
        title: 'Motion — Distance, Speed & Acceleration',
        realQ: 'Why does a car moving at 60 km/h take longer to stop than one moving at 30 km/h?',
        explanation: `
          <p><strong>Distance</strong> is total path length (scalar). <strong>Displacement</strong> is shortest path between start and end (vector — has direction).</p>
          <p><strong>Speed</strong> = Distance / Time (scalar). <strong>Velocity</strong> = Displacement / Time (vector).</p>
          <p><strong>Acceleration</strong> = Change in velocity / Time = (v − u) / t. It is a vector.</p>
          <p>Equations of motion (for uniform acceleration):</p>
          <ul>
            <li>v = u + at</li>
            <li>s = ut + ½at²</li>
            <li>v² = u² + 2as</li>
          </ul>
          <p>Displacement-time graph: slope = velocity. Velocity-time graph: slope = acceleration, area under = displacement.</p>
        `,
        formula: 'v = u + at | s = ut + ½at² | v² = u² + 2as',
        formulaNote: 'u = initial velocity, v = final velocity, a = acceleration, s = displacement',
        vizType: 'motion',
        thinkQ: 'A car travels 100 km — first 50 km at 50 km/h, then 50 km at 100 km/h. Is average speed 75 km/h?',
        thinkA: 'No! Average speed = Total distance / Total time. Time for first half = 50/50 = 1 hr. Time for second half = 50/100 = 0.5 hr. Total time = 1.5 hr. Average speed = 100/1.5 ≈ 66.7 km/h, NOT 75. You spend more time at the slower speed, so it drags the average down.',
        interactLabel: 'Initial velocity (u) in m/s:',
        interactUnit: 'm/s',
        interactMin: 0, interactMax: 30, interactDefault: 10,
        interactFn: (u) => {
          const a = 2, t = 5;
          const v = u + a * t;
          const s = u * t + 0.5 * a * t * t;
          return `🚗 After ${t}s: Final velocity = <strong>${v} m/s</strong> | Distance covered = <strong>${s} m</strong> (a = 2 m/s²)`;
        },
        summary: [
          'Distance (scalar) vs Displacement (vector — shortest path)',
          'Speed = distance/time (scalar); Velocity = displacement/time (vector)',
          'Uniform acceleration: constant change in velocity per unit time',
          'Three equations of motion link u, v, a, s, t',
          'v-t graph: area = displacement; slope = acceleration'
        ],
        quiz: 'motion-main'
      }
    ]
  },
  {
    id: 'force-laws', num: 'Chapter 8', emoji: '⚽', color: '#f72585',
    title: 'Force and Laws of Motion',
    desc: "Newton's three laws, inertia, momentum and conservation",
    topics: ['Force and Laws of Motion'],
    subtopics: [
      {
        id: 'force-laws-main',
        title: "Newton's Laws of Motion",
        realQ: "Why do you lurch forward when a moving bus suddenly brakes?",
        explanation: `
          <p><strong>Newton's First Law (Inertia)</strong>: An object at rest stays at rest, and an object in motion stays in motion, unless acted upon by an external force.</p>
          <p>When the bus brakes, your body tends to continue moving forward (inertia of motion). The seat belt or friction provides the external force to stop you.</p>
          <p><strong>Newton's Second Law</strong>: F = ma. Force = mass × acceleration. Larger mass → more force needed for same acceleration.</p>
          <p><strong>Momentum</strong> p = mv (mass × velocity). It is a vector quantity.</p>
          <p><strong>Newton's Third Law</strong>: Every action has an equal and opposite reaction. Forces always act in pairs on different bodies.</p>
          <p><strong>Law of Conservation of Momentum</strong>: Total momentum of a system remains constant if no external force acts.</p>
        `,
        formula: 'F = ma | p = mv | F = Δp/Δt',
        formulaNote: 'SI unit of Force: Newton (N) = kg·m/s². 1 N accelerates 1 kg by 1 m/s²',
        vizType: 'force',
        thinkQ: 'When a gun fires a bullet, the gun recoils backward. Does the gun have the same force as the bullet?',
        thinkA: 'Yes — the force is exactly equal (Newton\'s 3rd Law). But the effect is different! Recoil: same force F acts on both. But F = ma → a = F/m. Since the gun is MUCH heavier than the bullet, its acceleration (and thus recoil speed) is much less. The bullet flies fast because it is very light. This is conservation of momentum: before firing, total momentum = 0. After firing: bullet momentum + gun recoil momentum = 0.',
        interactLabel: 'Applied Force (N):',
        interactUnit: 'N',
        interactMin: 1, interactMax: 100, interactDefault: 20,
        interactFn: (F) => {
          const m1 = 2, m2 = 10;
          const a1 = (F / m1).toFixed(2);
          const a2 = (F / m2).toFixed(2);
          return `⚡ On 2 kg object: <strong>${a1} m/s²</strong> | On 10 kg object: <strong>${a2} m/s²</strong> — Same force, different accelerations!`;
        },
        summary: [
          "1st Law: Inertia — objects resist change in their state of motion",
          "2nd Law: F = ma — force, mass and acceleration are related",
          "3rd Law: Action-reaction — forces always in pairs on different bodies",
          "Momentum p = mv; rate of change = Force (F = Δp/t)",
          "Conservation of momentum: total momentum constant if no external force"
        ],
        quiz: 'force-laws-main'
      }
    ]
  },
  {
    id: 'gravitation', num: 'Chapter 9A', emoji: '🌍', color: '#4361ee',
    title: 'Gravitation',
    desc: "Universal gravitation, free fall, g and Kepler's laws",
    topics: ['Gravitation'],
    subtopics: [
      {
        id: 'gravitation-main',
        title: 'Gravitation & Universal Law',
        realQ: 'Why do astronauts float in the International Space Station? Is there no gravity there?',
        explanation: `
          <p><strong>Universal Law of Gravitation</strong>: Every object in the universe attracts every other object with a force proportional to their masses and inversely proportional to the square of the distance between them.</p>
          <p>F = G × m₁m₂ / r²  where G = 6.67 × 10⁻¹¹ N·m²/kg²</p>
          <p><strong>g = 9.8 m/s²</strong> — acceleration due to gravity on Earth's surface.</p>
          <p>Astronauts float because they are in <strong>free fall</strong> — both the ISS and astronauts fall toward Earth at the same rate, so they feel weightless (no support force). There IS gravity at ISS altitude — it's about 90% of surface gravity!</p>
          <p><strong>Weight</strong> W = mg (varies with location). <strong>Mass</strong> stays constant everywhere.</p>
        `,
        formula: 'F = Gm₁m₂/r² | g = GM/R²',
        formulaNote: 'G = 6.67×10⁻¹¹ N·m²/kg² (Universal Gravitational Constant)',
        vizType: 'gravitation',
        thinkQ: 'The Moon is ~60 times farther from Earth\'s center than the surface. How much weaker is gravity there?',
        thinkA: "By inverse square law: F ∝ 1/r². Moon is 60× farther, so r² = 60² = 3600 times larger. Therefore, Earth's gravitational pull on the Moon = 1/3600 of surface gravity. This matches! The Moon stays in orbit because this weak gravity provides exactly the centripetal force needed for its circular motion.",
        interactLabel: 'Distance from Earth center (R = 6400 km units):',
        interactUnit: 'R',
        interactMin: 1, interactMax: 10, interactDefault: 1,
        interactFn: (r) => {
          const g_surface = 9.8;
          const g = (g_surface / (r * r)).toFixed(3);
          const weight = (70 * g).toFixed(1);
          return `🌍 g at ${r}R = <strong>${g} m/s²</strong> | Weight of 70 kg person: <strong>${weight} N</strong>`;
        },
        summary: [
          "Universal gravitation: F = Gm₁m₂/r² — acts between ALL masses",
          "g = 9.8 m/s² on Earth surface; varies with altitude and location",
          "Weight = mg (force); Mass = constant everywhere",
          "Free fall: all objects fall with same acceleration g (ignoring air)",
          "Weightlessness = continuous free fall (astronauts in ISS)"
        ],
        quiz: 'gravitation-main'
      }
    ]
  },
  {
    id: 'floatation', num: 'Chapter 9B', emoji: '🚢', color: '#4cc9f0',
    title: 'Gravitation (Floatation)',
    desc: 'Thrust, pressure, buoyancy and Archimedes principle',
    topics: ['Floatation'],
    subtopics: [
      {
        id: 'floatation-main',
        title: 'Pressure, Buoyancy & Floatation',
        realQ: 'How can a massive steel ship float on water, when a steel nail sinks?',
        explanation: `
          <p><strong>Pressure</strong> = Force / Area (Pa = N/m²). Pressure in a fluid increases with depth: P = ρgh.</p>
          <p><strong>Buoyancy</strong>: When an object is submerged in a fluid, the fluid exerts an upward force called <strong>buoyant force</strong> or upthrust.</p>
          <p><strong>Archimedes' Principle</strong>: Buoyant force = Weight of fluid displaced by the object.</p>
          <p>An object floats when buoyant force ≥ its weight. This happens when object's density ≤ fluid's density.</p>
          <p>A steel ship floats because it is hollow — its total density (steel + air inside) is less than water. A steel nail is solid, so its density > water → sinks.</p>
          <p><strong>Relative density</strong> = Density of substance / Density of water</p>
        `,
        formula: 'Buoyant Force = ρ × V × g (weight of displaced fluid)',
        formulaNote: 'ρ = fluid density, V = volume of object submerged, g = 9.8 m/s²',
        vizType: 'floatation',
        thinkQ: 'Will the same iron block float in mercury (density 13,600 kg/m³)? Why?',
        thinkA: "Yes! Iron's density is ~7,870 kg/m³, which is LESS than mercury (13,600 kg/m³). By Archimedes' principle, the buoyant force from mercury is greater than iron's weight when only partially submerged. The iron block floats about 57% submerged in mercury. This is why even a nail floats in mercury!",
        interactLabel: 'Density of object (kg/m³):',
        interactUnit: 'kg/m³',
        interactMin: 200, interactMax: 2000, interactDefault: 800,
        interactFn: (rho) => {
          const waterDensity = 1000;
          if (rho < waterDensity) {
            const submerged = ((rho / waterDensity) * 100).toFixed(1);
            return `🚢 Object FLOATS: <strong>${submerged}%</strong> submerged in water (density=${rho} < 1000 kg/m³)`;
          } else if (rho === waterDensity) {
            return `⚖️ Object is NEUTRALLY BUOYANT: stays anywhere in water`;
          } else {
            return `⬇️ Object SINKS: density ${rho} > water (1000 kg/m³). Buoyant force < weight.`;
          }
        },
        summary: [
          "Pressure = Force/Area; increases with depth in fluids (P = ρgh)",
          "Buoyant force = weight of fluid displaced (Archimedes' Principle)",
          "Object floats if buoyant force ≥ weight (density ≤ fluid density)",
          "Ships float because hollow design makes average density < water",
          "Relative density = density of substance / density of water (no unit)"
        ],
        quiz: 'floatation-main'
      }
    ]
  },
  {
    id: 'work-energy', num: 'Chapter 10', emoji: '⚡', color: '#f4a261',
    title: 'Work and Energy',
    desc: 'Work, kinetic energy, potential energy and power',
    topics: ['Work and Energy'],
    subtopics: [
      {
        id: 'work-energy-main',
        title: 'Work, Energy and Power',
        realQ: 'A man holds a 20 kg weight above his head for 10 minutes — has he done any work?',
        explanation: `
          <p><strong>Work</strong> (in physics): W = F × d × cosθ. Work is done only when force causes displacement.</p>
          <p>Holding a weight without moving = NO displacement = NO work done! (Even though it feels tiring — that's physiological work, not physical work.)</p>
          <p><strong>Kinetic Energy</strong>: KE = ½mv² — energy due to motion</p>
          <p><strong>Potential Energy</strong>: PE = mgh — energy due to position/configuration</p>
          <p><strong>Law of Conservation of Energy</strong>: Energy cannot be created or destroyed; only transformed. Total mechanical energy (KE + PE) remains constant.</p>
          <p><strong>Power</strong>: P = Work / Time = W/t (unit: Watt = J/s). 1 horsepower = 746 W.</p>
        `,
        formula: 'W = Fs·cosθ | KE = ½mv² | PE = mgh | P = W/t',
        formulaNote: 'SI unit: Work & Energy → Joule (J) | Power → Watt (W)',
        vizType: 'energy',
        thinkQ: 'A ball is thrown upward. At the highest point, all KE is converted to PE. Where does the energy go when it hits the ground and stops?',
        thinkA: 'When the ball hits the ground, KE converts to: (1) Sound energy (thud sound), (2) Heat energy (tiny warming at point of impact), (3) Deformation energy (if ball/ground deforms). Energy is NEVER destroyed — it transforms. A perfectly elastic ball bounces back — all KE is preserved. Real balls are inelastic — some energy becomes heat/sound.',
        interactLabel: 'Height of object (m):',
        interactUnit: 'm',
        interactMin: 1, interactMax: 50, interactDefault: 10,
        interactFn: (h) => {
          const m = 5, g = 9.8;
          const pe = (m * g * h).toFixed(1);
          const v = Math.sqrt(2 * g * h).toFixed(2);
          return `🎯 PE at height ${h}m = <strong>${pe} J</strong> | Speed at ground = <strong>${v} m/s</strong> (5 kg object)`;
        },
        summary: [
          "Work W = Fs·cosθ — force × displacement × cos(angle between them)",
          "KE = ½mv² — increases with mass and velocity squared",
          "PE = mgh — gravitational potential energy depends on height",
          "Conservation of energy: total energy constant, only form changes",
          "Power = Work/Time (Watts); 1 kWh = 3.6 × 10⁶ J"
        ],
        quiz: 'work-energy-main'
      }
    ]
  },
  {
    id: 'sound', num: 'Chapter 11', emoji: '🔊', color: '#7209b7',
    title: 'Sound',
    desc: 'Wave nature, speed, reflection and human hearing',
    topics: ['Sound'],
    subtopics: [
      {
        id: 'sound-main',
        title: 'Sound — Waves, Speed and Hearing',
        realQ: "Why does thunder come seconds after lightning, even though they happen at the same time?",
        explanation: `
          <p><strong>Sound</strong> is a longitudinal mechanical wave — it needs a medium to travel and cannot travel in vacuum.</p>
          <p>Speed of sound: ~340 m/s in air at 25°C. In water: ~1500 m/s. In steel: ~5000 m/s. (Faster in denser/more elastic media.)</p>
          <p>Light travels at 3×10⁸ m/s — nearly 1 million times faster than sound. So we see lightning instantly but hear thunder seconds later.</p>
          <p><strong>Characteristics of sound:</strong></p>
          <ul>
            <li><strong>Pitch</strong> — frequency (Hz) — how high or low a sound feels</li>
            <li><strong>Loudness</strong> — amplitude — how strong (measured in decibels dB)</li>
            <li><strong>Quality/Timbre</strong> — waveform shape — distinguishes instruments</li>
          </ul>
          <p><strong>Echo</strong>: reflection of sound from a surface. Minimum distance for echo = 17.2 m (so it takes ≥0.1 s to return).</p>
          <p>Human hearing range: 20 Hz to 20,000 Hz. Ultrasound: >20,000 Hz (bats, SONAR, medical imaging).</p>
        `,
        formula: 'v = fλ | Speed of sound in air ≈ 340 m/s',
        formulaNote: 'v = velocity, f = frequency (Hz), λ = wavelength (m)',
        vizType: 'sound',
        thinkQ: 'You shout at a cliff and hear your echo after 2 seconds. How far is the cliff?',
        thinkA: 'Sound travels to cliff AND back = 2 × distance. Total time = 2 s. Distance = (speed × time) / 2 = (340 × 2) / 2 = 340 meters. Simple! SONAR works exactly this way — ships send sound pulses and measure the echo time to calculate depth of the ocean.',
        interactLabel: 'Frequency (Hz):',
        interactUnit: 'Hz',
        interactMin: 20, interactMax: 20000, interactDefault: 440,
        interactFn: (f) => {
          const v = 340;
          const lambda = (v / f * 100).toFixed(2);
          const type = f < 20 ? 'Infrasound (below human hearing)' : f > 20000 ? 'Ultrasound (above human hearing)' : 'Audible sound ✅';
          return `🔊 Wavelength: <strong>${lambda} cm</strong> | Type: <strong>${type}</strong>`;
        },
        summary: [
          'Sound: longitudinal mechanical wave — needs medium, cannot travel in vacuum',
          'Speed in air ~340 m/s; faster in water and solids',
          'Pitch ↔ frequency; Loudness ↔ amplitude (decibels)',
          'Echo = reflected sound; needs minimum 17.2 m distance from reflector',
          'Human hearing: 20 Hz–20,000 Hz; Ultrasound: >20,000 Hz'
        ],
        quiz: 'sound-main'
      }
    ]
  },
  {
    id: 'food-resources', num: 'Chapter 12', emoji: '🌾', color: '#2d9b6f',
    title: 'Improvement in Food Resources',
    desc: 'Crop improvement, animal husbandry and sustainable farming',
    topics: ['Food Resources'],
    subtopics: [
      {
        id: 'food-resources-main',
        title: 'Improvement in Food Resources',
        realQ: "How did India transform from a food-importing country to a food-exporting country in just 30 years?",
        explanation: `
          <p>The <strong>Green Revolution</strong> (1960s–70s) — introduction of high-yielding variety (HYV) seeds, irrigation, fertilizers and pesticides — dramatically increased India's food production.</p>
          <p><strong>Crop improvement methods:</strong></p>
          <ul>
            <li><strong>Hybridization</strong> — crossing different varieties for better traits</li>
            <li><strong>Introduction of new varieties</strong> — disease-resistant, high-yielding</li>
            <li><strong>Genetic modification</strong> — Bt cotton, golden rice</li>
          </ul>
          <p><strong>Crop production management:</strong> Nutrients (macronutrients: N, P, K; micronutrients), Irrigation, Crop rotation, Mixed cropping, Intercropping.</p>
          <p><strong>Animal husbandry:</strong> Cattle (dairy + draught), Poultry, Fisheries (capture vs culture), Bee-keeping (apiculture).</p>
        `,
        formula: 'Crop yield = f(variety × environment × management)',
        formulaNote: 'Better yield requires improved variety AND right conditions AND good management',
        vizType: 'farming',
        thinkQ: 'Why is crop rotation (alternating legumes with other crops) better than monoculture (growing same crop every year)?',
        thinkA: "Legumes (peas, beans) have nitrogen-fixing bacteria (Rhizobium) in root nodules. These bacteria convert atmospheric N₂ to ammonia (NH₃) — enriching the soil naturally. After harvesting legumes, this nitrogen-rich soil benefits the next crop. Monoculture depletes specific nutrients and builds up specific pests/diseases. Rotation breaks pest cycles and restores soil fertility — it's cheaper and more sustainable than chemical fertilizers.",
        interactLabel: 'Nitrogen fertilizer applied (kg/hectare):',
        interactUnit: 'kg/ha',
        interactMin: 0, interactMax: 200, interactDefault: 80,
        interactFn: (n) => {
          const optimal = 120;
          let yield_pct;
          if (n <= optimal) {
            yield_pct = (50 + (n / optimal) * 50).toFixed(0);
          } else {
            yield_pct = Math.max(60, 100 - (n - optimal) * 0.3).toFixed(0);
          }
          const note = n > optimal ? '⚠️ Over-fertilization! Causes soil acidification & water pollution' : n < 40 ? '📉 Under-fertilized — yield limited' : '✅ Good range';
          return `🌱 Estimated yield: <strong>${yield_pct}%</strong> of potential | ${note}`;
        },
        summary: [
          'Green Revolution: HYV seeds + irrigation + fertilizers = food security',
          'Crop improvement: hybridization, introduction, genetic modification',
          'Macronutrients: N (leaves), P (roots), K (overall), Ca, Mg, S',
          'Crop rotation with legumes fixes nitrogen naturally — sustainable',
          'Animal husbandry: cattle, poultry, fisheries, bee-keeping for food'
        ],
        quiz: 'food-resources-main'
      }
    ]
  }
];

// ============================================================
// QUIZ BANK — Chapter-based questions
// ============================================================
const QUIZ_BANK = {
  'matter-surroundings-main': [
    {
      q: "Which state of matter has a definite shape AND definite volume?",
      opts: ["Gas", "Liquid", "Solid", "Plasma"],
      ans: 2,
      exp: "Solids have both definite shape and definite volume because their particles are tightly packed and vibrate in fixed positions. Liquids have definite volume but no fixed shape; gases have neither."
    },
    {
      q: "During evaporation, which particles escape from the liquid surface?",
      opts: ["Slowest moving particles", "Fastest moving particles", "All particles equally", "Only surface particles regardless of speed"],
      ans: 1,
      exp: "The fastest moving particles have enough kinetic energy to overcome surface tension and escape. This leaves behind slower (lower energy) particles, reducing average KE — which is why evaporation causes cooling."
    },
    {
      q: "The temperature at which a liquid converts to gas at atmospheric pressure is called:",
      opts: ["Melting point", "Sublimation point", "Boiling point", "Freezing point"],
      ans: 2,
      exp: "Boiling point is the temperature at which vapour pressure equals atmospheric pressure and the liquid converts to gas throughout its volume, not just at the surface. Water boils at 100°C at 1 atm."
    },
    {
      q: "Dry ice (solid CO₂) directly converts to gas without becoming liquid. This is called:",
      opts: ["Evaporation", "Condensation", "Sublimation", "Vaporization"],
      ans: 2,
      exp: "Sublimation is the direct conversion from solid to gas (or gas to solid) without passing through the liquid state. Dry ice, camphor, and iodine show sublimation at normal atmospheric pressure."
    }
  ],
  'matter-pure-main': [
    {
      q: "Which of the following is a homogeneous mixture?",
      opts: ["Sand + Water", "Salt + Water (saltwater)", "Oil + Water", "Gravel + Sand"],
      ans: 1,
      exp: "Saltwater is a homogeneous mixture (solution) — it looks and behaves uniformly throughout. Sand+Water, Oil+Water, and Gravel+Sand are heterogeneous mixtures where different parts are visually distinct."
    },
    {
      q: "Which technique is used to separate two miscible liquids with different boiling points?",
      opts: ["Filtration", "Crystallization", "Distillation", "Centrifugation"],
      ans: 2,
      exp: "Distillation separates miscible liquids based on different boiling points — the lower boiling point liquid vaporizes first, then condenses and is collected separately. Used to separate alcohol-water mixtures."
    },
    {
      q: "In a true solution, the particle size of solute is:",
      opts: ["Greater than 100 nm", "Between 1 nm and 100 nm", "Less than 1 nm", "Greater than 1000 nm"],
      ans: 2,
      exp: "True solution: particles < 1 nm (not visible, cannot be filtered). Colloid: 1–100 nm (Tyndall effect). Suspension: >100 nm (can be filtered, settles on standing)."
    },
    {
      q: "Tyndall effect is shown by:",
      opts: ["True solutions", "Colloids", "Pure solvents", "Crystals"],
      ans: 1,
      exp: "Tyndall effect (scattering of light beam, making it visible) is shown by colloids because their particles (1–100 nm) are large enough to scatter light. True solutions do not show this effect."
    }
  ],
  'atoms-molecules-main': [
    {
      q: "According to Dalton's atomic theory, atoms are:",
      opts: ["Divisible particles with sub-particles", "Indivisible, indestructible particles", "Tiny magnets", "Always found in pairs"],
      ans: 1,
      exp: "Dalton's atomic theory (1808) stated atoms are the smallest, indivisible, indestructible particles of matter. (We now know atoms have substructure — protons, neutrons, electrons — but Dalton's core ideas were revolutionary.)"
    },
    {
      q: "How many atoms are present in 1 mole of O₂ molecules?",
      opts: ["6.022 × 10²³", "2 × 6.022 × 10²³", "3.011 × 10²³", "4 × 6.022 × 10²³"],
      ans: 1,
      exp: "1 mole of O₂ = 6.022×10²³ MOLECULES. Each O₂ molecule has 2 oxygen ATOMS. So total atoms = 2 × 6.022×10²³. Always distinguish between molecules and atoms!"
    },
    {
      q: "The molar mass of water (H₂O) is:",
      opts: ["16 g/mol", "17 g/mol", "18 g/mol", "20 g/mol"],
      ans: 2,
      exp: "H₂O: 2 hydrogen atoms (2×1=2 u) + 1 oxygen atom (16 u) = 18 u. Molar mass = 18 g/mol. This means 18 grams of water contains 6.022×10²³ water molecules."
    },
    {
      q: "The Law of Conservation of Mass states that:",
      opts: ["Mass increases in chemical reactions", "Total mass of reactants = total mass of products", "Mass is converted to energy", "Only atoms are conserved"],
      ans: 1,
      exp: "Law of Conservation of Mass (Lavoisier): Total mass of reactants = Total mass of products in a chemical reaction. Atoms are rearranged but not created or destroyed, so mass is conserved."
    }
  ],
  'structure-atom-main': [
    {
      q: "The atomic number of an element is equal to the number of:",
      opts: ["Neutrons", "Protons only", "Protons and neutrons", "Electrons in the outermost shell"],
      ans: 1,
      exp: "Atomic number Z = number of protons in the nucleus. In a neutral atom, this also equals the number of electrons. The atomic number uniquely identifies an element."
    },
    {
      q: "Isotopes of an element have the same:",
      opts: ["Mass number", "Number of neutrons", "Atomic number (protons)", "Physical properties"],
      ans: 2,
      exp: "Isotopes have the same atomic number (same number of protons, same element) but different mass numbers (different number of neutrons). Example: C-12 and C-14 are both carbon isotopes."
    },
    {
      q: "The maximum number of electrons in the M shell (n=3) of an atom is:",
      opts: ["2", "8", "18", "32"],
      ans: 2,
      exp: "Maximum electrons in nth shell = 2n². For M shell (n=3): 2×3² = 2×9 = 18 electrons. K(n=1)=2, L(n=2)=8, M(n=3)=18, N(n=4)=32."
    },
    {
      q: "An atom has 2, 8, 7 electrons in its K, L, M shells respectively. Its valency is:",
      opts: ["7", "2", "1", "8"],
      ans: 2,
      exp: "Valency = electrons needed to complete the outermost shell to 8 (octet). Outermost shell has 7 electrons. Needs 1 more to complete octet. Valency = 8-7 = 1. This is Chlorine (Cl), which forms Cl⁻ ions or single covalent bonds."
    }
  ],
  'fundamental-unit-main': [
    {
      q: "Which organelle is known as the 'powerhouse of the cell'?",
      opts: ["Nucleus", "Ribosome", "Mitochondria", "Chloroplast"],
      ans: 2,
      exp: "Mitochondria produce ATP (adenosine triphosphate) — the energy currency of the cell — through cellular respiration. They are called the powerhouse because most of the cell's energy is generated here."
    },
    {
      q: "Which feature is found in PLANT cells but NOT in animal cells?",
      opts: ["Cell membrane", "Mitochondria", "Cell wall and chloroplasts", "Nucleus"],
      ans: 2,
      exp: "Plant cells have: (1) Cell wall (cellulose) for rigidity, (2) Chloroplasts for photosynthesis, (3) Large central vacuole for storage — all absent in animal cells. Both have cell membrane, mitochondria, and nucleus."
    },
    {
      q: "The process by which water moves across a semi-permeable membrane from a region of high water concentration to low water concentration is:",
      opts: ["Diffusion", "Active transport", "Osmosis", "Plasmolysis"],
      ans: 2,
      exp: "Osmosis is the movement of water (or solvent) from high water concentration (low solute) to low water concentration (high solute) through a selectively permeable membrane. It does not require energy."
    },
    {
      q: "The nucleus is separated from the cytoplasm by the:",
      opts: ["Cell membrane", "Nuclear membrane (envelope)", "Cell wall", "Endoplasmic reticulum"],
      ans: 1,
      exp: "The nuclear membrane (nuclear envelope) — a double-layered membrane with nuclear pores — surrounds and protects the nucleus, controlling the movement of materials between nucleus and cytoplasm."
    }
  ],
  'tissues-main': [
    {
      q: "Which plant tissue is responsible for transport of water and minerals from roots to leaves?",
      opts: ["Phloem", "Xylem", "Parenchyma", "Sclerenchyma"],
      ans: 1,
      exp: "Xylem transports water and dissolved minerals from roots upward to all parts of the plant. Phloem transports food (sugars) made in leaves to other parts. Xylem transport is one-directional (upward); phloem is bidirectional."
    },
    {
      q: "Which type of muscle is present in the walls of internal organs like the stomach and intestines?",
      opts: ["Striated (skeletal) muscle", "Smooth (visceral) muscle", "Cardiac muscle", "Voluntary muscle"],
      ans: 1,
      exp: "Smooth muscle (also called visceral or involuntary muscle) is found in walls of internal organs (gut, blood vessels, uterus). It is not under conscious control and shows slow, sustained contractions — like peristalsis in the gut."
    },
    {
      q: "Meristematic tissue in plants is characterized by:",
      opts: ["Dead cells with thick walls", "Actively dividing cells", "Cells with large vacuoles", "Cells with chloroplasts only"],
      ans: 1,
      exp: "Meristematic tissue consists of actively dividing cells found at growing points (root tips, shoot tips, between bark and wood). These cells are small, have thin walls, large nucleus, and no vacuoles."
    },
    {
      q: "Which tissue forms the outer covering of the human body (skin)?",
      opts: ["Connective tissue", "Muscular tissue", "Epithelial tissue", "Nervous tissue"],
      ans: 2,
      exp: "Epithelial tissue covers body surfaces (skin) and lines cavities (gut, lungs). It provides protection, secretion, and absorption. Cells are tightly packed with little intercellular matrix — forms a continuous covering."
    }
  ],
  'motion-main': [
    {
      q: "A car travels 40 km in 1 hour. Its average speed is:",
      opts: ["40 m/s", "40 km/h", "400 m/s", "4 km/h"],
      ans: 1,
      exp: "Average speed = total distance / total time = 40 km / 1 h = 40 km/h. Converting: 40 km/h = 40 × (1000/3600) m/s ≈ 11.1 m/s. The unit km/h is fine as the answer matches."
    },
    {
      q: "The area under a velocity-time (v-t) graph represents:",
      opts: ["Acceleration", "Force", "Displacement", "Speed"],
      ans: 2,
      exp: "Area under v-t graph = displacement. Slope of v-t graph = acceleration. Area under s-t graph has no direct physical meaning. Slope of s-t graph = velocity."
    },
    {
      q: "A body starts from rest and accelerates at 5 m/s². Its velocity after 4 seconds is:",
      opts: ["5 m/s", "10 m/s", "20 m/s", "25 m/s"],
      ans: 2,
      exp: "Using v = u + at: u = 0 (starts from rest), a = 5 m/s², t = 4 s. v = 0 + 5×4 = 20 m/s."
    },
    {
      q: "Which of the following is a vector quantity?",
      opts: ["Speed", "Distance", "Mass", "Displacement"],
      ans: 3,
      exp: "Displacement is a vector — it has both magnitude (how far) and direction (which way). Speed, distance, and mass are scalars (magnitude only). Velocity and acceleration are also vectors."
    }
  ],
  'force-laws-main': [
    {
      q: "Newton's first law of motion defines:",
      opts: ["Force", "Acceleration", "Inertia", "Momentum"],
      ans: 2,
      exp: "Newton's first law defines INERTIA — the tendency of objects to resist changes in their state of motion. Objects at rest stay at rest; objects in motion stay in motion unless acted on by an external net force."
    },
    {
      q: "A 10 kg object accelerates at 3 m/s². The net force acting on it is:",
      opts: ["3 N", "10 N", "30 N", "0.3 N"],
      ans: 2,
      exp: "F = ma = 10 kg × 3 m/s² = 30 N. Newton's second law directly gives us: force equals mass times acceleration."
    },
    {
      q: "A rocket works on the principle of:",
      opts: ["Newton's First Law", "Newton's Second Law", "Newton's Third Law", "Law of Inertia"],
      ans: 2,
      exp: "Rockets use Newton's 3rd Law: hot gases are expelled backward (action), the rocket moves forward (reaction). Conservation of momentum also applies — total momentum of rocket+gas system stays zero."
    },
    {
      q: "The SI unit of momentum is:",
      opts: ["kg/m/s", "N/s", "kg·m/s", "N·m"],
      ans: 2,
      exp: "Momentum p = mv. SI units: kg × m/s = kg·m/s. This is also equivalent to N·s (since 1 N = 1 kg·m/s²)."
    }
  ],
  'gravitation-main': [
    {
      q: "The value of universal gravitational constant G is:",
      opts: ["9.8 N/kg", "6.67 × 10⁻¹¹ N·m²/kg²", "6.022 × 10²³", "3 × 10⁸ m/s"],
      ans: 1,
      exp: "G = 6.67 × 10⁻¹¹ N·m²/kg² (universal gravitational constant). It is the same throughout the universe. g = 9.8 m/s² is acceleration due to gravity at Earth's surface (not G)."
    },
    {
      q: "If the mass of a planet doubles but its radius stays same, g on its surface will:",
      opts: ["Halve", "Double", "Stay same", "Quadruple"],
      ans: 1,
      exp: "g = GM/R². If M doubles and R stays same: g = G(2M)/R² = 2GM/R² = 2g. Gravity doubles! This is why Jupiter (more massive than Earth) has much stronger surface gravity."
    },
    {
      q: "A person weighs 60 N on Earth. Their weight on Moon (g = 1.6 m/s²) is approximately:",
      opts: ["60 N", "10 N", "6 N", "30 N"],
      ans: 1,
      exp: "Weight W = mg. Mass = W/g_earth = 60/10 = 6 kg. Weight on Moon = m × g_moon = 6 × 1.6 = 9.6 ≈ 10 N. Weight is ~1/6th on Moon because Moon's gravity is ~1/6th of Earth's."
    },
    {
      q: "Why do all objects fall with the same acceleration in vacuum (ignoring mass)?",
      opts: ["Gravity doesn't depend on mass", "Both gravitational force and inertia increase with mass", "Heavier objects fall faster", "Lighter objects experience more g"],
      ans: 1,
      exp: "F_gravity = mg, and F = ma → mg = ma → g = a. The mass cancels out! Both the gravitational pull and the inertia (resistance to acceleration) increase equally with mass, so the acceleration g is the same for all masses."
    }
  ],
  'floatation-main': [
    {
      q: "Archimedes' principle states that the buoyant force equals:",
      opts: ["Weight of the object", "Weight of fluid displaced by the object", "Volume of the object", "Density of the fluid"],
      ans: 1,
      exp: "Archimedes' principle: Buoyant force = Weight of fluid displaced. The more fluid an object displaces, the greater the upthrust. A submerged object displaces fluid equal to its own volume."
    },
    {
      q: "An object has density 0.8 g/cm³ and is placed in water (1 g/cm³). It will:",
      opts: ["Sink completely", "Float with 80% submerged", "Float with 20% submerged", "Stay suspended"],
      ans: 1,
      exp: "An object floats such that the fraction submerged = density_object / density_fluid = 0.8/1.0 = 0.8 = 80%. So 80% of it is under water, 20% above. (Think of an iceberg — density 0.92 g/cm³ → 92% submerged!)"
    },
    {
      q: "Pressure in a fluid at depth h is given by P = ρgh. If depth doubles, pressure:",
      opts: ["Stays the same", "Doubles", "Quadruples", "Halves"],
      ans: 1,
      exp: "P = ρgh. Pressure is directly proportional to depth h. If h doubles → P doubles. This is why deep-sea fish have special adaptations — pressure at 10 km depth is ~1000 times atmospheric pressure."
    },
    {
      q: "Relative density of a substance is defined as:",
      opts: ["Density × Volume", "Density of substance / Density of water", "Mass / Area", "Weight in air − Weight in water"],
      ans: 1,
      exp: "Relative density (specific gravity) = Density of substance / Density of water. It has NO unit. If RD > 1, the substance sinks in water. If RD < 1, it floats. Used to quickly compare densities with water."
    }
  ],
  'work-energy-main': [
    {
      q: "A coolie carrying a load on his head walks 10 m horizontally on a flat road. Work done by him against gravity is:",
      opts: ["mgh", "mgs (where s=10 m)", "Zero", "mg × 10"],
      ans: 2,
      exp: "W = Fs·cosθ. The displacement is horizontal (10 m) and gravity acts vertically downward. θ = 90° between force and displacement. cos90° = 0. So W = 0. No work is done against gravity in horizontal motion!"
    },
    {
      q: "The kinetic energy of an object is quadrupled when its speed is:",
      opts: ["Doubled", "Halved", "Tripled", "Unchanged"],
      ans: 0,
      exp: "KE = ½mv². If speed doubles (v → 2v): KE = ½m(2v)² = ½m·4v² = 4×(½mv²) = 4 KE. So doubling speed quadruples kinetic energy. KE depends on v²!"
    },
    {
      q: "A 600 W motor lifts a load in 10 seconds. Work done by the motor is:",
      opts: ["60 J", "6000 J", "600 J", "60,000 J"],
      ans: 1,
      exp: "Power P = Work/Time → Work = P × t = 600 W × 10 s = 6000 J. Power is the rate of doing work — 600 W means 600 joules per second."
    },
    {
      q: "At the highest point of a projectile's path (ignoring air resistance), which statement is true?",
      opts: ["KE = 0, PE is maximum", "KE is maximum, PE = 0", "Both KE and PE are maximum", "KE is minimum but not zero, PE is maximum"],
      ans: 3,
      exp: "At highest point, vertical velocity = 0 but horizontal velocity remains unchanged. KE = ½mv_x² (only horizontal component) — minimum but NOT zero (for projectile). PE is maximum. Total mechanical energy = KE + PE = constant throughout."
    }
  ],
  'sound-main': [
    {
      q: "Sound travels fastest in:",
      opts: ["Air", "Water", "Vacuum", "Steel"],
      ans: 3,
      exp: "Sound speed: vacuum = 0 (cannot travel), air ≈ 340 m/s, water ≈ 1500 m/s, steel ≈ 5000 m/s. Sound travels fastest in solids because particles are closest together and transmit vibrations fastest. Cannot travel in vacuum at all."
    },
    {
      q: "A person hears an echo after 0.6 seconds. The distance of the reflecting surface is (speed of sound = 340 m/s):",
      opts: ["204 m", "102 m", "340 m", "600 m"],
      ans: 1,
      exp: "Sound travels to reflector and back = 2d. Time = 0.6 s. Distance = (speed × time) / 2 = (340 × 0.6) / 2 = 204/2 = 102 m."
    },
    {
      q: "Which property of sound determines its shrillness (pitch)?",
      opts: ["Amplitude", "Wavelength", "Frequency", "Speed"],
      ans: 2,
      exp: "Frequency determines pitch (shrillness/highness of sound). Higher frequency = higher pitch = shriller sound. Amplitude determines loudness. Both frequency and amplitude are independent properties of a wave."
    },
    {
      q: "SONAR uses which type of sound waves to detect underwater objects?",
      opts: ["Infrasound (<20 Hz)", "Audible sound (20-20000 Hz)", "Ultrasound (>20000 Hz)", "Electromagnetic waves"],
      ans: 2,
      exp: "SONAR (Sound Navigation And Ranging) uses ultrasound (>20,000 Hz) because high-frequency waves travel better underwater with less energy loss and provide better resolution for detecting objects. Dolphins and bats also use ultrasound (echolocation)."
    }
  ],
  'food-resources-main': [
    {
      q: "Which of the following is a macronutrient essential for plant growth?",
      opts: ["Zinc", "Boron", "Nitrogen", "Copper"],
      ans: 2,
      exp: "Macronutrients (needed in large amounts): N, P, K, Ca, Mg, S. Micronutrients (trace): Fe, Mn, Zn, B, Cu, Mo, Cl. Nitrogen is crucial for leaf growth and chlorophyll production — its deficiency causes yellowing of leaves."
    },
    {
      q: "Leguminous plants help in soil nitrogen fixation because they have:",
      opts: ["Chloroplasts in roots", "Rhizobium bacteria in root nodules", "Deep taproots", "High transpiration rate"],
      ans: 1,
      exp: "Rhizobium bacteria live in root nodules of legumes (peas, beans, lentils) in a symbiotic relationship. Bacteria fix atmospheric N₂ into ammonia (NH₃), enriching the soil. The plant provides shelter and food; bacteria provide nitrogen."
    },
    {
      q: "The scientific term for growing two or more crops simultaneously on the same field is:",
      opts: ["Crop rotation", "Mixed cropping / Intercropping", "Monoculture", "Slash and burn"],
      ans: 1,
      exp: "Mixed cropping: two or more crops grown together simultaneously. Intercropping: two crops in separate rows. Crop rotation: different crops in different seasons/years. All are better than monoculture for soil health."
    },
    {
      q: "Apiculture refers to the rearing of:",
      opts: ["Fish", "Silkworms", "Honey bees", "Poultry"],
      ans: 2,
      exp: "Apiculture = bee-keeping (apis = bee). It provides honey and beeswax. Pisciculture = fish farming. Sericulture = silk worm rearing. Poultry farming = chickens/ducks for eggs and meat."
    }
  ]
};
