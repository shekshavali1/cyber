import { initializeApp } from "firebase/app";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

// Safety check for environment variables
if (!import.meta.env.VITE_FIREBASE_API_KEY) {
  console.error("Vite is not reading your .env file. Restart the dev server.");
}

// Firebase configuration
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

/**
 * Renders the Forgot Password page into the provided app container.
 * @param {HTMLElement} app - The root element (e.g., document.getElementById("app"))
 */
export function renderForgot(app) {
  const container = document.createElement("div");
  container.className =
    "min-h-screen bg-slate-50 flex items-center justify-center p-6 font-sans";

  container.innerHTML = `
    <div class="w-full max-w-[400px] bg-white rounded-2xl shadow-2xl border border-slate-100">
      <div class="p-8">
        <div class="mb-8 text-center">
          <h1 class="text-2xl font-bold text-slate-800">Reset Password</h1>
          <p class="text-slate-500 text-sm mt-2">
            Enter your email to receive a reset link
          </p>
        </div>

        <div class="space-y-5">
          <div>
            <label class="block text-xs font-semibold text-slate-500 mb-1">
              Email Address
            </label>
            <input
              id="forgot-email"
              type="email"
              class="w-full px-4 py-3 bg-slate-50 border rounded-xl outline-none transition focus:ring-2 focus:ring-blue-500"
              placeholder="name@company.com"
            />
          </div>

          <button
            id="resetBtn"
            class="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition transform active:scale-95 shadow-lg shadow-blue-100">
            Send Reset Link
          </button>
        </div>

        <p id="auth-msg" class="text-center text-sm mt-4 min-h-[20px]"></p>

        <div class="mt-6 text-center">
          <a href="#/login" class="inline-flex items-center text-sm text-blue-600 font-semibold hover:underline">
            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
            </svg>
            Back to Sign In
          </a>
        </div>
      </div>
    </div>
  `;

  // Handle the logic
  container.querySelector("#resetBtn").addEventListener("click", async () => {
    const email = container.querySelector("#forgot-email").value;
    const msg = container.querySelector("#auth-msg");
    const btn = container.querySelector("#resetBtn");

    if (!email) {
      msg.textContent = "Please enter your email address";
      msg.className = "text-center text-sm mt-4 text-red-500";
      return;
    }

    try {
      // Provide visual feedback that work is happening
      btn.textContent = "Sending...";
      btn.disabled = true;
      btn.classList.add("opacity-70", "cursor-not-allowed");

      await sendPasswordResetEmail(auth, email);

      msg.textContent = "Password reset email sent! Check your inbox.";
      msg.className = "text-center text-sm mt-4 text-green-600 font-medium";
      
      // Clear input on success
      container.querySelector("#forgot-email").value = "";
    } catch (err) {
      msg.textContent = err.message.replace("Firebase: ", "");
      msg.className = "text-center text-sm mt-4 text-red-500";
    } finally {
      // Re-enable button
      btn.textContent = "Send Reset Link";
      btn.disabled = false;
      btn.classList.remove("opacity-70", "cursor-not-allowed");
    }
  });

  // Inject into the DOM
  app.innerHTML = "";
  app.appendChild(container);
}