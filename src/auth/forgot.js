import { getAuth, confirmPasswordReset } from "firebase/auth";

export function renderForgot(app, actionCode) {
  const auth = getAuth();

  app.innerHTML = `
    <div class="min-h-screen bg-slate-50 flex items-center justify-center p-6 font-sans">
      <div class="w-full max-w-[420px] bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden">
        <div class="bg-indigo-600 p-8 text-center text-white">
          <h1 class="text-2xl font-bold">Update Password</h1>
          <p class="text-indigo-100 mt-1 text-sm">Cyber Bullying</p>
        </div>
        
        <div class="p-8 space-y-5">
          <div>
            <label class="block text-xs font-bold text-slate-400 uppercase mb-2">New Password</label>
            <input id="new-pw" type="password" class="w-full px-4 py-3 bg-slate-50 border rounded-xl outline-none focus:ring-2 focus:ring-indigo-500" placeholder="••••••••" />
          </div>

          <div class="grid grid-cols-2 gap-2 text-[10px] font-bold uppercase tracking-tight">
            <div id="len" class="text-red-500 transition-colors">✖ 6+ Characters</div>
            <div id="cap" class="text-red-500 transition-colors">✖ 1 Uppercase</div>
            <div id="small" class="text-red-500 transition-colors">✖ 1 Lowercase</div>
            <div id="num" class="text-red-500 transition-colors">✖ 1 Number</div>
            <div id="spec" class="text-red-500 transition-colors">✖ 1 Special</div>
          </div>

          <div>
            <label class="block text-xs font-bold text-slate-400 uppercase mb-2">Confirm Password</label>
            <input id="conf-pw" type="password" class="w-full px-4 py-3 bg-slate-50 border rounded-xl outline-none focus:ring-2 focus:ring-indigo-500" placeholder="••••••••" />
          </div>

          <button id="updateBtn" disabled class="w-full py-4 bg-indigo-600 text-white rounded-xl font-bold opacity-50 cursor-not-allowed transition-all transform active:scale-95 shadow-lg">
            Update Password
          </button>
          
          <p id="msg" class="text-center text-sm min-h-[20px]"></p>
        </div>
      </div>
    </div>
  `;

  const newPw = document.getElementById("new-pw");
  const confPw = document.getElementById("conf-pw");
  const btn = document.getElementById("updateBtn");

  const validate = () => {
    const val = newPw.value;
    const checks = {
      len: val.length >= 6,
      cap: /[A-Z]/.test(val),
      small: /[a-z]/.test(val),
      num: /[0-9]/.test(val),
      spec: /[^A-Za-z0-9]/.test(val)
    };

    let allPass = true;
    for (const [id, pass] of Object.entries(checks)) {
      const el = document.getElementById(id);
      el.textContent = (pass ? "✓ " : "✖ ") + el.textContent.slice(2);
      el.className = pass ? "text-green-500 transition-colors" : "text-red-500 transition-colors";
      if (!pass) allPass = false;
    }

    const match = val === confPw.value && val !== "";
    btn.disabled = !(allPass && match);
    btn.className = (allPass && match) 
      ? "w-full py-4 bg-indigo-600 text-white rounded-xl font-bold shadow-lg shadow-indigo-200" 
      : "w-full py-4 bg-indigo-600 text-white rounded-xl font-bold opacity-50 cursor-not-allowed";
  };

  newPw.oninput = validate;
  confPw.oninput = validate;

  btn.onclick = async () => {
    const msg = document.getElementById("msg");
    try {
      await confirmPasswordReset(auth, actionCode, newPw.value);
      msg.className = "text-center text-sm text-green-600 font-bold";
      msg.textContent = "Password updated! You can now sign in.";
      setTimeout(() => window.location.hash = "#/login", 2000);
    } catch (err) {
      msg.className = "text-center text-sm text-red-500";
      msg.textContent = err.message.replace("Firebase: ", "");
    }
  };
}