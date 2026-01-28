import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

// 1. Firebase Configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export const renderRegisterPage = (container) => {
    container.innerHTML = `
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&display=swap');

        :root {
            --primary: #2563eb;
            --primary-dark: #1e40af;
            --glass: rgba(255, 255, 255, 0.92);
            --text-dark: #0f172a;
        }

        /* FORCE PARENT SCROLLING */
        html, body {
            height: auto !important;
            min-height: 100% !important;
            overflow: auto !important;
            margin: 0;
            padding: 0;
        }

        * { box-sizing: border-box; }

        .page-wrapper {
            min-height: 100vh !important; /* Allow it to grow */
            width: 100%;
            font-family: 'Inter', sans-serif;
            background: linear-gradient(-45deg, #0f172a, #1e293b, #2563eb, #3b82f6);
            background-size: 400% 400%;
            animation: gradientAnimation 15s ease infinite;
            display: flex;
            flex-direction: column;
            overflow-y: visible !important; /* Force visibility of overflow */
        }

        @keyframes gradientAnimation {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }

        .header-nav {
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(12px);
            padding: 1.5rem;
            text-align: center;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            flex-shrink: 0;
        }

        .header-nav h1 {
            color: white;
            margin: 0;
            font-size: 1.2rem;
            letter-spacing: 2px;
            font-weight: 800;
            text-transform: uppercase;
        }

        .content-body {
            flex: 1 0 auto; /* Do not let this container shrink */
            display: flex;
            justify-content: center;
            align-items: flex-start; /* Align to top so it doesn't get cut off if it expands */
            padding: 4rem 1rem !important; /* Large padding for bottom clearance */
        }

        .register-card {
            background: var(--glass);
            width: 100%;
            max-width: 500px;
            padding: 2.5rem;
            border-radius: 24px;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
            margin-bottom: 2rem; /* Buffer for the bottom of the page */
        }

        .register-card h2 {
            margin-top: 0;
            font-weight: 800;
            color: var(--text-dark);
            text-align: center;
            font-size: 1.8rem;
        }

        .form-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1rem;
        }

        .full-row { grid-column: span 2; }

        .input-box { margin-bottom: 1rem; }
        .input-box label {
            display: block;
            font-size: 0.75rem;
            font-weight: 700;
            margin-bottom: 0.5rem;
            color: #64748b;
            text-transform: uppercase;
        }

        .input-box input {
            width: 100%;
            padding: 0.8rem 1rem;
            border: 2px solid #e2e8f0;
            border-radius: 12px;
            font-size: 1rem;
            transition: all 0.3s ease;
        }

        .input-box input:focus {
            outline: none;
            border-color: var(--primary);
            box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.1);
        }

        /* SPINNER STYLES */
        .signup-btn {
            width: 100%;
            padding: 1rem;
            background: var(--primary);
            color: white;
            border: none;
            border-radius: 12px;
            font-weight: 700;
            font-size: 1rem;
            cursor: pointer;
            margin-top: 1.5rem;
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 12px;
            transition: background 0.2s;
        }

        .signup-btn:disabled { background: #94a3b8; cursor: not-allowed; }

        .spinner {
            width: 20px;
            height: 20px;
            border: 3px solid rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            border-top-color: white;
            animation: spin 0.8s linear infinite;
            display: none;
        }

        @keyframes spin {
            to { transform: rotate(360deg); }
        }

        .error-container {
            display: none;
            background: #fef2f2;
            border-left: 4px solid #ef4444;
            color: #b91c1c;
            padding: 1rem;
            border-radius: 8px;
            margin-top: 1.5rem;
            font-size: 0.85rem;
        }

        .footer-text {
            text-align: center;
            margin-top: 1.5rem;
            font-size: 0.9rem;
            color: #64748b;
        }
    </style>

    <div class="page-wrapper">
        <header class="header-nav">
            <h1>🛡️ AI System to Detect Online Harassment & Cyberbullying</h1>
        </header>

        <main class="content-body">
            <div class="register-card">
                <h2>Create Account</h2>
                
                <form id="registration-form">
                    <div class="form-grid">
                        <div class="input-box full-row">
                            <label>Username</label>
                            <input type="text" id="u-name" required placeholder="SafetyExpert99">
                        </div>
                        <div class="input-box">
                            <label>Email Address</label>
                            <input type="email" id="u-email" required placeholder="name@domain.com">
                        </div>
                        <div class="input-box">
                            <label>Age</label>
                            <input type="number" id="u-age" required min="13" placeholder="18">
                        </div>
                        <div class="input-box full-row">
                            <label>Phone Number</label>
                            <input type="tel" id="u-phone" required placeholder="+1 234 567 8900">
                        </div>
                        <div class="input-box">
                            <label>Password</label>
                            <input type="password" id="u-pass" required placeholder="••••••••">
                        </div>
                        <div class="input-box">
                            <label>Confirm Password</label>
                            <input type="password" id="u-confirm" required placeholder="••••••••">
                        </div>
                    </div>

                    <button type="submit" id="submit-button" class="signup-btn">
                        <div class="spinner" id="loader"></div>
                        <span id="btn-text">Sign Up & Secure</span>
                    </button>
                    
                    <div id="error-box" class="error-container"></div>
                </form>

                <p class="footer-text">Already a member? <a href="/login" style="color:var(--primary); font-weight:600; text-decoration:none;">Log In</a></p>
            </div>
        </main>
    </div>
    `;

    const form = container.querySelector('#registration-form');
    const btn = container.querySelector('#submit-button');
    const loader = container.querySelector('#loader');
    const btnText = container.querySelector('#btn-text');
    const errorBox = container.querySelector('#error-box');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // 1. Reset state
        errorBox.style.display = "none";
        let validationErrors = [];

        // 2. Gather values
        const email = container.querySelector('#u-email').value;
        const password = container.querySelector('#u-pass').value;
        const confirmPass = container.querySelector('#u-confirm').value;
        const username = container.querySelector('#u-name').value;
        const phone = container.querySelector('#u-phone').value;
        const age = container.querySelector('#u-age').value;

        // 3. Validation
        if (password.length < 6) validationErrors.push("• Minimum 6 digits required.");
        if (!/[A-Z]/.test(password)) validationErrors.push("• Must include a Capital letter.");
        if (!/[0-9]/.test(password)) validationErrors.push("• Must include a Number.");
        if (password !== confirmPass) validationErrors.push("• Passwords do not match.");

        if (validationErrors.length > 0) {
            errorBox.innerHTML = validationErrors.join("<br>");
            errorBox.style.display = "block";
            return;
        }

        // 4. Loading UI
        btn.disabled = true;
        loader.style.display = "block";
        btnText.innerText = "Securing Account...";

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            await setDoc(doc(db, "users", user.uid), {
                username, email, phone, age: parseInt(age),
                uid: user.uid, role: "user", createdAt: new Date().toISOString()
            });

            alert("Account Created Successfully!");
            
        } catch (error) {
            errorBox.innerText = error.message;
            errorBox.style.display = "block";
            btn.disabled = false;
            loader.style.display = "none";
            btnText.innerText = "Sign Up & Secure";
        }
    });
};