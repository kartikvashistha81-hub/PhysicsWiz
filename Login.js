const firebaseConfig = {
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: ""
};

if (firebaseConfig.apiKey) {
    firebase.initializeApp(firebaseConfig);
}

// ─── TABS ───
function switchTab(btn, tab) {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById('loginForm').style.display = tab === 'login' ? 'block' : 'none';
    document.getElementById('signupForm').style.display = tab === 'signup' ? 'block' : 'none';
    document.getElementById('switchText').innerHTML = tab === 'login'
        ? 'Don\'t have an account? <a href="#" onclick="manualSwitch()">Sign Up free</a>'
        : 'Already have an account? <a href="#" onclick="manualSwitch()">Sign In</a>';
    hideError();
}

function manualSwitch() {
    const tabs = document.querySelectorAll('.tab-btn');
    const active = document.querySelector('.tab-btn.active');
    const idx = Array.from(tabs).indexOf(active);
    const next = tabs[(idx + 1) % 2];
    const tab = next.textContent.toLowerCase().includes('login') ? 'login' : 'signup';
    switchTab(next, tab);
}

// ─── PASSWORD TOGGLE ───
function togglePwd() {
    const inp = document.getElementById('password');
    const btn = document.getElementById('eyeBtn');
    if (inp.type === 'password') { inp.type = 'text'; btn.textContent = '🙈'; }
    else { inp.type = 'password'; btn.textContent = '👁'; }
}

// ─── ERROR ───
function showError(msg) {
    const el = document.getElementById('errorMsg');
    el.textContent = '❌ ' + msg;
    el.style.display = 'block';
}
function hideError() {
    document.getElementById('errorMsg').style.display = 'none';
}

// ─── LOGIN ───
function loginUser() {
    hideError();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const btn = document.getElementById('loginBtn');

    if (!email || !password) { showError('Please fill in all fields.'); return; }
    if (!email.includes('@')) { showError('Please enter a valid email address.'); return; }
    if (password.length < 6) { showError('Password must be at least 6 characters.'); return; }

    btn.textContent = '⏳ Signing in...';
    btn.classList.add('loading');

    // Save user locally
    localStorage.setItem('pw_user', email);

    // Firebase Firestore (if configured)
    if (firebaseConfig.apiKey && window.firebase) {
        const db = firebase.firestore();
        db.collection('users').add({ email, time: new Date() })
            .catch(err => console.warn('Firestore error:', err));
    }

    // Simulate / redirect
    setTimeout(() => {
        btn.textContent = '✅ Success! Redirecting...';
        setTimeout(() => {
            window.location.href = 'Contact.html';
        }, 700);
    }, 1100);
}

function signUpUser(e) {
    e.preventDefault();
    const btn = e.target;
    btn.textContent = '⏳ Creating account...';
    btn.classList.add('loading');
    setTimeout(() => {
        btn.textContent = '✅ Account created!';
        setTimeout(() => { window.location.href = 'Contact.html'; }, 700);
    }, 1200);
}

// ─── ENTER KEY ───
document.addEventListener('keydown', e => {
    if (e.key === 'Enter') loginUser();
});

// GOOGLE LOGIN

const googleBtn = document.getElementById("googleLoginBtn");

googleBtn.addEventListener("click", () => {

    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }

    const provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth()
        .signInWithPopup(provider)

        .then((result) => {

            const user = result.user;

            console.log("User Name:", user.displayName);
            console.log("User Email:", user.email);

            // Local storage
            localStorage.setItem("pw_user", user.email);

            // Firestore save
            const db = firebase.firestore();

            db.collection("users").add({
                name: user.displayName,
                email: user.email,
                loginTime: new Date()
            });

            // Redirect
            window.location.href = "Contact.html";

        })

        .catch((error) => {
            console.log(error);
            alert(error.message);
        });

});
