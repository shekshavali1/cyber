import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase.js";

export function renderRegisterPage(app) {
  app.innerHTML = `
    <div class="min-h-screen flex items-center justify-center bg-[#060814] text-slate-100 p-6 relative font-['Outfit',sans-serif]">
      <!-- Background Ambient Glows -->
      <div class="absolute top-[10%] left-[20%] w-[350px] h-[350px] rounded-full bg-indigo-900/10 blur-[100px] pointer-events-none"></div>
      <div class="absolute bottom-[10%] right-[20%] w-[350px] h-[350px] rounded-full bg-cyan-950/15 blur-[100px] pointer-events-none"></div>

      <!-- Register Card -->
      <div class="bg-slate-900/40 border border-slate-800/80 backdrop-blur-xl w-full max-w-lg rounded-2xl shadow-2xl p-8 z-10">
        
        <!-- Logo -->
        <div class="flex flex-col items-center mb-6">
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

        <h2 class="text-xl font-semibold text-slate-200 mb-6 text-center">Create a new account</h2>

        <form id="registerForm" class="space-y-4">
          
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <!-- Username -->
            <div>
              <label class="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Username</label>
              <input
                id="username"
                type="text"
                required
                class="w-full bg-slate-950/40 border border-slate-800 rounded-xl px-4 py-2.5 text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all text-sm font-medium"
                placeholder="cyber_guard">
            </div>

            <!-- Email -->
            <div>
              <label class="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Email</label>
              <input
                id="email"
                type="email"
                required
                class="w-full bg-slate-950/40 border border-slate-800 rounded-xl px-4 py-2.5 text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all text-sm font-medium"
                placeholder="name@example.com">
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <!-- Phone Number -->
            <div>
              <label class="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Phone Number</label>
              <input
                id="phone"
                type="tel"
                required
                class="w-full bg-slate-950/40 border border-slate-800 rounded-xl px-4 py-2.5 text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all text-sm font-medium"
                placeholder="9876543210">
            </div>

            <!-- Age -->
            <div>
              <label class="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Age</label>
              <input
                id="age"
                type="number"
                required
                class="w-full bg-slate-950/40 border border-slate-800 rounded-xl px-4 py-2.5 text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all text-sm font-medium"
                placeholder="18">
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <!-- Password -->
            <div>
              <label class="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Password</label>
              <input
                id="password"
                type="password"
                required
                class="w-full bg-slate-950/40 border border-slate-800 rounded-xl px-4 py-2.5 text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all text-sm font-medium"
                placeholder="••••••••">
            </div>

            <!-- Confirm Password -->
            <div>
              <label class="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Confirm Password</label>
              <input
                id="confirmPassword"
                type="password"
                required
                class="w-full bg-slate-950/40 border border-slate-800 rounded-xl px-4 py-2.5 text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all text-sm font-medium"
                placeholder="••••••••">
            </div>
          </div>

          <!-- Error Message -->
          <p id="errorMsg" class="text-rose-400 font-semibold text-xs min-h-[16px] text-center"></p>

          <!-- Submit Button -->
          <button
            type="submit"
            id="registerBtn"
            class="w-full bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white py-3 rounded-xl font-bold transition-all transform active:scale-95 shadow-lg shadow-cyan-500/10 mt-2">
            Create Account
          </button>
        </form>

        <div class="mt-6 pt-5 border-t border-slate-800/80 text-center">
          <p class="text-sm text-slate-400">
            Already have an account? 
            <a href="#/login" class="text-cyan-400 hover:text-cyan-300 font-bold hover:underline transition-colors">
              Login
            </a>
          </p>
        </div>

      </div>
    </div>
  `;

  const form = document.getElementById("registerForm");
  const errorMsg = document.getElementById("errorMsg");
  const registerBtn = document.getElementById("registerBtn");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    errorMsg.textContent = "";

    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const age = document.getElementById("age").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    // Validation rules
    if (username.length < 3) {
      errorMsg.textContent = "Username must contain at least 3 characters.";
      return;
    }

    if (phone.length < 10) {
      errorMsg.textContent = "Enter a valid phone number.";
      return;
    }

    if (age < 13) {
      errorMsg.textContent = "Age must be 13 or above to register.";
      return;
    }

    if (password.length < 6) {
      errorMsg.textContent = "Password must contain at least 6 characters.";
      return;
    }

    if (!/[A-Z]/.test(password)) {
      errorMsg.textContent = "Password must contain one capital letter.";
      return;
    }

    if (!/[a-z]/.test(password)) {
      errorMsg.textContent = "Password must contain one small letter.";
      return;
    }

    if (!/[0-9]/.test(password)) {
      errorMsg.textContent = "Password must contain one number.";
      return;
    }

    if (!/[!@#$%^&*]/.test(password)) {
      errorMsg.textContent = "Password must contain one special symbol.";
      return;
    }

    if (password !== confirmPassword) {
      errorMsg.textContent = "Passwords do not match.";
      return;
    }

    try {
      registerBtn.disabled = true;
      registerBtn.innerHTML = `
        <svg class="animate-spin -ml-1 mr-3 h-4 w-4 text-white inline-block" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg> Creating Account...
      `;

      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        username,
        email,
        phone,
        age: Number(age),
        role: "user",
        blocked: false,
        blockedUsers: [],
        reports: 0,
        totalMessages: 0,
        harmfulMessages: 0,
        createdAt: new Date().toISOString()
      });

      alert("Registration Successful!");
      window.location.hash = "#/dashboard";
    } catch (error) {
      errorMsg.textContent = error.message.replace("Firebase: ", "");
    } finally {
      registerBtn.disabled = false;
      registerBtn.innerHTML = "Create Account";
    }
  });
}