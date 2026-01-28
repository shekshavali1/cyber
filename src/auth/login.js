import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

// Safety check
if (!import.meta.env.VITE_FIREBASE_API_KEY) {
  console.error("Vite is not reading your .env file. Restart the dev server.");
}

// Firebase config
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
  const container = document.createElement("div");
  container.className =
    "min-h-screen bg-slate-50 flex items-center justify-center p-6 font-sans";

  container.innerHTML = `
    <div class="w-full max-w-[400px] bg-white rounded-2xl shadow-2xl border border-slate-100">
      <div class="p-8">
        <div class="mb-8 text-center">
          <h1 class="text-2xl font-bold text-slate-800">Welcome Back</h1>
          <p class="text-slate-500 text-sm mt-2">
            Sign in to continue
          </p>
        </div>

        <div class="space-y-5">
          <div>
            <label class="block text-xs font-semibold text-slate-500 mb-1">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              class="w-full px-4 py-3 bg-slate-50 border rounded-xl outline-none"
              placeholder="name@company.com"
            />
          </div>

          <div>
            <label class="block text-xs font-semibold text-slate-500 mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              class="w-full px-4 py-3 bg-slate-50 border rounded-xl outline-none"
              placeholder="••••••••"
            />
          </div>

          <button
            id="loginBtn"
            class="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold">
            Sign In
          </button>
        </div>

        <p id="auth-msg" class="text-center text-sm mt-4 min-h-[20px]"></p>

        <div class="mt-6 text-center space-y-2">
          <a href="#/forgot" class="block text-sm text-blue-600 font-semibold">
            Forgot password?
          </a>
          <a href="#/register" class="block text-sm text-blue-600 font-semibold">
            Create a new account
          </a>
        </div>
      </div>
    </div>
  `;

  container.querySelector("#loginBtn").addEventListener("click", async () => {
    const email = container.querySelector("#email").value;
    const password = container.querySelector("#password").value;
    const msg = container.querySelector("#auth-msg");

    if (!email || !password) {
      msg.textContent = "Email and password are required";
      msg.className = "text-center text-sm mt-4 text-red-500";
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      msg.textContent = "Login successful";
      msg.className = "text-center text-sm mt-4 text-green-600";
    } catch (err) {
      msg.textContent = err.message.replace("Firebase: ", "");
      msg.className = "text-center text-sm mt-4 text-red-500";
    }
  });

  app.innerHTML = "";
  app.appendChild(container);
}