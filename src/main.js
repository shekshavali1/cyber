import './style.css'

document.querySelector('#app').innerHTML = `
  <div class="space-y-8 animate-fade-in">
    <header>
      <h1 class="text-5xl md:text-7xl font-extrabold tracking-tight text-blue-400 mb-4">
        Welcome to our Project
      </h1>
      <p class="text-xl text-slate-400 max-w-2xl mx-auto">
        Your advanced AI system designed to detect and prevent 
        <span class="text-blue-300 font-semibold">online harassment</span> and 
        <span class="text-blue-300 font-semibold">cyberbullying</span> in real-time.
      </p>
    </header>

    <main class="grid gap-6 md:grid-cols-2 mt-12">
      <div class="p-6 bg-slate-800 rounded-2xl border border-slate-700 hover:border-blue-500 transition-colors">
        <h2 class="text-2xl font-bold mb-2">🛡️ Detect</h2>
        <p class="text-slate-400">Advanced NLP algorithms to identify harmful patterns and toxic language.</p>
      </div>
      
      <div class="p-6 bg-slate-800 rounded-2xl border border-slate-700 hover:border-blue-500 transition-colors">
        <h2 class="text-2xl font-bold mb-2">🚀 Protect</h2>
        <p class="text-slate-400">Automated moderation tools to keep digital communities safe and inclusive.</p>
      </div>
    </main>

    <footer class="mt-16">
      <button class="bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-8 rounded-full transition-transform active:scale-95">
        Get Started
      </button>
    </footer>
  </div>
`