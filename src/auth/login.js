import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);

export function renderLogin(app) {
  const showLogin = () => {
    app.innerHTML = `
      <div class="min-h-screen bg-slate-50 flex items-center justify-center p-6 font-sans">
        <div class="w-full max-w-[420px] bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden">
          <div class="bg-blue-600 p-8 text-center text-white">
            <h1 class="text-3xl font-extrabold tracking-tight">Cyber Bullying</h1>
            <p class="text-blue-100 mt-2 opacity-90">Secure Access Management</p>
          </div>
          <div class="p-8">
            <div class="space-y-5">
              <div>
                <label class="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Email Address</label>
                <input id="email" type="email" class="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition-all" placeholder="name@company.com" />
              </div>
              <div>
                <label class="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Password</label>
                <input id="password" type="password" class="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition-all" placeholder="••••••••" />
              </div>
              <button id="loginBtn" class="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-all transform active:scale-95 shadow-lg shadow-blue-200">Sign In</button>
              <p id="auth-msg" class="text-center text-sm min-h-[20px]"></p>
              <div class="pt-4 border-t border-slate-100 text-center space-y-3">
                <button id="to-forgot" class="text-sm text-blue-600 font-bold hover:text-blue-800 transition">Forgot password?</button>
              </div>
              <a href="#/register" class="block text-sm text-blue-600 font-bold text-center space-y-3">
               Create a new account
              </a>
            </div>
          </div>
        </div>
      </div>
    `;

    document.getElementById("to-forgot").onclick = showForgot;
    document.getElementById("loginBtn").onclick = async () => {
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      const msg = document.getElementById("auth-msg");
      try {
        await signInWithEmailAndPassword(auth, email, password);
        msg.className = "text-center text-sm text-green-600 font-medium";
        msg.textContent = "Success! Redirecting...";
      } catch (err) {
        msg.className = "text-center text-sm text-red-500";
        msg.textContent = err.message.replace("Firebase: ", "");
      }
    };
  };

  const showForgot = () => {
    app.innerHTML = `
      <div class="min-h-screen bg-slate-50 flex items-center justify-center p-6 font-sans">
        <div class="w-full max-w-[420px] bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden">
          <div class="bg-slate-800 p-8 text-center text-white">
            <h1 class="text-2xl font-bold italic">Cyber Bullying</h1>
            <p class="text-slate-400 mt-2 text-sm">Reset Your Account Password</p>
          </div>
          <div class="p-8">
            <div class="space-y-5">
              <div>
                <label class="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Account Email</label>
                <input id="forgot-email" type="email" class="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-slate-500 transition-all" placeholder="Enter your email" />
              </div>
              <button id="resetBtn" class="w-full py-4 bg-slate-800 hover:bg-black text-white rounded-xl font-bold transition-all shadow-lg shadow-slate-200">Send Recovery Link</button>
              <p id="forgot-msg" class="text-center text-sm min-h-[20px]"></p>
              <div class="text-center">
                <button id="back-login" class="text-sm font-bold text-slate-500 hover:text-slate-800 underline underline-offset-4">Return to login</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    document.getElementById("back-login").onclick = showLogin;
    document.getElementById("resetBtn").onclick = async () => {
      const email = document.getElementById("forgot-email").value;
      const msg = document.getElementById("forgot-msg");
      try {
        await sendPasswordResetEmail(auth, email);
        msg.className = "text-center text-sm text-green-600 font-medium";
        msg.textContent = "Email sent! Please check your inbox.";
      } catch (err) {
        msg.className = "text-center text-sm text-red-500";
        msg.textContent = err.message.replace("Firebase: ", "");
      }
    };
  };

  showLogin();
}