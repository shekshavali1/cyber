export function renderChat(container) {
    // 1. Inject HTML
    container.innerHTML = `
    <div class="flex h-screen bg-gray-200 overflow-hidden">
      <div class="hidden md:flex flex-col w-[30%] bg-white border-r border-gray-300">
        <div class="bg-gray-100 p-4 border-b border-gray-200 flex justify-between items-center">
          <div class="h-10 w-10 rounded-full bg-gray-300"></div>
          <span class="text-gray-500">My Status</span>
        </div>
        <div class="overflow-y-auto flex-1">
          <div class="flex items-center gap-4 p-3 bg-white hover:bg-gray-100 cursor-pointer border-b border-gray-100">
             <div class="h-12 w-12 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">H</div>
             <div>
               <h4 class="font-semibold text-gray-800">Help Center</h4>
               <p class="text-sm text-gray-500">Click to chat...</p>
             </div>
          </div>
        </div>
      </div>

      <div class="flex-1 flex flex-col relative w-full md:w-[70%]">
        <div class="bg-gray-100 px-4 py-3 flex items-center gap-3 border-b border-gray-300 z-10">
            <a href="#/home" class="md:hidden text-gray-600">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" /></svg>
            </a>
            <div class="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">H</div>
            <div>
              <h4 class="font-semibold text-gray-800">Help Center</h4>
              <p class="text-xs text-gray-500">Online</p>
            </div>
        </div>

        <div id="chat-container" class="flex-1 overflow-y-auto p-4 md:p-10 chat-bg bg-wa-bg space-y-2">
           <div class="flex justify-start">
            <div class="bg-white p-2 px-3 rounded-lg rounded-tl-none shadow-sm max-w-[80%] md:max-w-[60%] text-sm md:text-base">
              <span class="text-gray-800">Hello! You are safe here. How can we help?</span>
              <div class="text-[10px] text-gray-400 text-right mt-1">10:00 AM</div>
            </div>
          </div>
        </div>

        <div class="bg-gray-100 px-4 py-3 flex items-center gap-3">
          <input id="msg-input" type="text" placeholder="Type a message" class="flex-1 py-2 px-4 rounded-lg outline-none border-none focus:ring-0 text-gray-700 placeholder-gray-500" />
          <button id="btn-send" class="text-wa-green transition transform active:scale-90">
             <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" viewBox="0 0 20 20" fill="currentColor"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" /></svg>
          </button>
        </div>
      </div>
    </div>
    `;

    // 2. Attach Logic (Event Listeners)
    const chatContainer = document.getElementById('chat-container');
    const input = document.getElementById('msg-input');
    const sendBtn = document.getElementById('btn-send');

    function sendMessage() {
        const text = input.value.trim();
        if (!text) return;

        // User Message
        chatContainer.innerHTML += `
            <div class="flex justify-end">
                <div class="bg-wa-chat-my p-2 px-3 rounded-lg rounded-tr-none shadow-sm max-w-[80%] md:max-w-[60%] text-sm md:text-base animate-bounce-short">
                  <span class="text-gray-800">${text}</span>
                  <div class="text-[10px] text-gray-500 text-right mt-1">Just now</div>
                </div>
            </div>
        `;
        input.value = '';
        chatContainer.scrollTop = chatContainer.scrollHeight;

        // Auto Reply
        setTimeout(() => {
            chatContainer.innerHTML += `
                <div class="flex justify-start">
                    <div class="bg-white p-2 px-3 rounded-lg rounded-tl-none shadow-sm max-w-[80%] md:max-w-[60%] text-sm md:text-base">
                      <span class="text-gray-800">We have received your message. A counselor will join shortly.</span>
                      <div class="text-[10px] text-gray-400 text-right mt-1">Just now</div>
                    </div>
                </div>
            `;
            chatContainer.scrollTop = chatContainer.scrollHeight;
        }, 1500);
    }

    sendBtn.addEventListener('click', sendMessage);
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });
}