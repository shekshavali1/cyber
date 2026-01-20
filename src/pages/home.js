export function renderHome(container) {
    // 1. Inject HTML
    container.innerHTML = `
    <div class="min-h-full bg-gradient-to-br from-indigo-900 to-purple-800 text-white overflow-y-auto">
      <nav class="p-6 flex justify-between items-center max-w-6xl mx-auto">
        <h1 class="text-2xl font-bold tracking-wider">CYBER<span class="text-pink-500">GUARD</span></h1>
        <a href="#/chat" class="bg-pink-500 hover:bg-pink-600 px-6 py-2 rounded-full font-medium transition shadow-lg shadow-pink-500/30">
          Live Support Chat
        </a>
      </nav>

      <header class="flex flex-col items-center text-center mt-20 px-4">
        <div class="bg-white/10 p-4 rounded-full mb-6 backdrop-blur-sm">
           <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
        </div>
        <h1 class="text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
          Stop <span class="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-orange-400">Cyberbullying</span>
        </h1>
        <p class="text-lg text-gray-300 max-w-2xl mb-10">
          Creating a safer internet for everyone. Report incidents, get counseling, and learn how to protect yourself online.
        </p>
      </header>

      <section class="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto px-6 pb-20">
        <div class="bg-white/5 backdrop-blur-md p-8 rounded-2xl border border-white/10">
          <h3 class="text-xl font-bold mb-3 text-pink-400">Identify</h3>
          <p class="text-gray-400">Recognize the signs of harassment and stalking.</p>
        </div>
        <div class="bg-white/5 backdrop-blur-md p-8 rounded-2xl border border-white/10">
          <h3 class="text-xl font-bold mb-3 text-blue-400">Report</h3>
          <p class="text-gray-400">Learn how to report abuse effectively.</p>
        </div>
        <div class="bg-white/5 backdrop-blur-md p-8 rounded-2xl border border-white/10">
          <h3 class="text-xl font-bold mb-3 text-green-400">Recover</h3>
          <p class="text-gray-400">Access mental health resources.</p>
        </div>
      </section>
    </div>
    `;
}