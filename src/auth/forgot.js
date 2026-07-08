import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase.js";

/**
 * Renders the Forgot Password page into the provided app container.
 * @param {HTMLElement} app - The root element (e.g., document.getElementById("app"))
 */
export function renderForgot(app) {
  const container = document.createElement("div");
  container.className =
    "min-h-screen flex items-center justify-center bg-[#060814] text-slate-100 p-6 relative font-['Outfit',sans-serif]";

  container.innerHTML = `
    <!-- Background Ambient Glows -->
    <div class="absolute top-[10%] left-[20%] w-[350px] h-[350px] rounded-full bg-indigo-900/10 blur-[100px] pointer-events-none"></div>
    <div class="absolute bottom-[10%] right-[20%] w-[350px] h-[350px] rounded-full bg-cyan-950/15 blur-[100px] pointer-events-none"></div>

    <div class="w-full max-w-[400px] bg-slate-900/40 border border-slate-800/80 backdrop-blur-xl rounded-2xl shadow-2xl p-8 z-10">
      
      <!-- Logo -->
      <div class="flex flex-col items-center mb-6">
        <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 mb-3">
          <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        </div>
        <h1 class="text-3xl font-bold bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
          Reset Password
        </h1>
        <p class="text-xs text-slate-400 mt-2 text-center">
          Enter your email to receive a secure link to reset your password.
        </p>
      </div>

      <div class="space-y-5">
        <div>
          <label class="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
            Email Address
          </label>
          <input
            id="forgot-email"
            type="email"
            class="w-full bg-slate-950/40 border border-slate-800 rounded-xl px-4 py-3 text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all font-medium"
            placeholder="name@company.com"
          />
        </div>

        <button
          id="resetBtn"
          class="w-full bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white py-3 rounded-xl font-bold transition-all transform active:scale-95 shadow-lg shadow-cyan-500/10">
          Send Reset Link
        </button>
      </div>

      <p id="auth-msg" class="text-center text-xs mt-4 min-h-[20px] font-semibold"></p>

      <div class="mt-6 pt-5 border-t border-slate-800/80 text-center">
        <a href="#/login" class="inline-flex items-center text-sm text-cyan-400 font-bold hover:text-cyan-300 transition-colors hover:underline">
          <svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
          </svg>
          Back to Sign In
        </a>
      </div>
    </div>
  `;

  // Handle the logic
  container.querySelector("#resetBtn").addEventListener("click", async () => {
    const email = container.querySelector("#forgot-email").value.trim();
    const msg = container.querySelector("#auth-msg");
    const btn = container.querySelector("#resetBtn");

    if (!email) {
      msg.textContent = "Please enter your email address";
      msg.className = "text-center text-xs mt-4 text-rose-400 font-semibold";
      return;
    }

    try {
      btn.innerHTML = `
        <svg class="animate-spin -ml-1 mr-3 h-4 w-4 text-white inline-block" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg> Sending...
      `;
      btn.disabled = true;

      await sendPasswordResetEmail(auth, email);

      msg.textContent = "Password reset email sent! Check your inbox.";
      msg.className = "text-center text-xs mt-4 text-emerald-400 font-semibold";
      
      // Clear input on success
      container.querySelector("#forgot-email").value = "";
    } catch (err) {
      msg.textContent = err.message.replace("Firebase: ", "");
      msg.className = "text-center text-xs mt-4 text-rose-400 font-semibold";
    } finally {
      // Re-enable button
      btn.textContent = "Send Reset Link";
      btn.disabled = false;
    }
  });

  // Inject into the DOM
  app.innerHTML = "";
  app.appendChild(container);
}