import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase.js";

export function renderLogin(app) {
  app.innerHTML = `
    <div class="min-h-screen flex items-center justify-center bg-[#060814] text-slate-100 p-6 relative font-['Outfit',sans-serif]">
      <!-- Background Ambient Glows -->
      <div class="absolute top-[10%] left-[20%] w-[350px] h-[350px] rounded-full bg-indigo-900/10 blur-[100px] pointer-events-none"></div>
      <div class="absolute bottom-[10%] right-[20%] w-[350px] h-[350px] rounded-full bg-cyan-950/15 blur-[100px] pointer-events-none"></div>

      <!-- Login Card -->
      <div class="bg-slate-900/40 border border-slate-800/80 backdrop-blur-xl w-full max-w-md rounded-2xl shadow-2xl p-8 z-10">
        
        <!-- Logo -->
        <div class="flex flex-col items-center mb-8">
          <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 mb-3">
            <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h1 class="text-3xl font-bold bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
            CyberGuard AI
          </h1>
          <p class="text-xs tracking-wide uppercase text-cyan-400 font-semibold mt-1">
            AI Cyberbullying Protection
          </p>
        </div>

        <h2 class="text-xl font-semibold text-slate-200 mb-6 text-center">Login to your account</h2>

        <form id="loginForm" class="space-y-5">
          <!-- Email Field -->
          <div>
            <label class="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Email Address</label>
            <input
              id="email"
              type="email"
              required
              class="w-full bg-slate-950/40 border border-slate-800 rounded-xl px-4 py-3 text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all font-medium"
              placeholder="name@company.com">
          </div>

          <!-- Password Field -->
          <div>
            <div class="flex justify-between items-center mb-1.5">
              <label class="block text-xs font-semibold text-slate-400 uppercase tracking-wider">Password</label>
              <a href="#/forgot" class="text-xs font-semibold text-cyan-400 hover:text-cyan-300 hover:underline transition-colors">
                Forgot Password?
              </a>
            </div>
            <input
              id="password"
              type="password"
              required
              class="w-full bg-slate-950/40 border border-slate-800 rounded-xl px-4 py-3 text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all font-medium"
              placeholder="••••••••">
          </div>

          <!-- Error Message -->
          <p id="loginError" class="text-rose-400 font-semibold text-xs min-h-[16px] text-center"></p>

          <!-- Submit Button -->
          <button
            type="submit"
            id="loginBtn"
            class="w-full bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white py-3.5 rounded-xl font-bold transition-all transform active:scale-95 shadow-lg shadow-cyan-500/10">
            Login
          </button>
        </form>

        <div class="mt-8 pt-6 border-t border-slate-800/80 text-center">
          <p class="text-sm text-slate-400">
            Don't have an account? 
            <a href="#/register" class="text-cyan-400 hover:text-cyan-300 font-bold hover:underline transition-colors">
              Create Account
            </a>
          </p>
        </div>

      </div>
    </div>
  `;

  const form = document.getElementById("loginForm");
  const error = document.getElementById("loginError");
  const btn = document.getElementById("loginBtn");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    error.textContent = "";

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    try {
      btn.disabled = true;
      btn.innerHTML = `
        <svg class="animate-spin -ml-1 mr-3 h-4.5 w-4.5 text-white inline-block" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg> Logging In...
      `;

      await signInWithEmailAndPassword(auth, email, password);
      window.location.hash = "#/dashboard";
    } catch (err) {
      error.textContent = err.message.replace("Firebase: ", "");
    } finally {
      btn.disabled = false;
      btn.innerHTML = "Login";
    }
  });
}