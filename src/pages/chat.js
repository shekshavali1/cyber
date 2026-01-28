import { initializeApp, getApps, getApp } from "firebase/app";
import { 
    getFirestore, collection, query, where, getDocs, 
    addDoc, onSnapshot, orderBy, serverTimestamp 
} from "firebase/firestore";

// 1. Safe Initialization (Prevents "duplicate-app" error)
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID
};

const firebaseApp = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(firebaseApp);

export function renderChat(app, currentUserId) {
    let activeChatId = null;

    // 2. WhatsApp-style UI
    app.innerHTML = `
        <div id="chat-container" style="display:flex; height:100vh; font-family: 'Segoe UI', sans-serif; background:#f0f2f5;">
            <div id="sidebar" style="width:350px; border-right:1px solid #ddd; display:flex; flex-direction:column; background:#fff;">
                <div style="padding:15px; background:#f0f2f5;">
                    <input type="text" id="search-input" placeholder="Search email, username, phone..." 
                           style="width:100%; padding:8px; border-radius:15px; border:1px solid #ccc; outline:none;">
                </div>
                <div id="user-results" style="flex:1; overflow-y:auto;"></div>
            </div>
            
            <div id="main-chat" style="flex:1; display:flex; flex-direction:column; background:#e5ddd5; position:relative;">
                <div id="chat-header" style="padding:15px; background:#f0f2f5; font-weight:bold; border-bottom:1px solid #ddd;">
                    Select a contact to start "new chat"
                </div>
                <div id="messages-list" style="flex:1; padding:20px; overflow-y:auto; display:flex; flex-direction:column;"></div>
                <div id="input-area" style="padding:15px; background:#f0f2f5; display:none;">
                    <input type="text" id="msg-input" placeholder="Type a message..." 
                           style="width:100%; padding:10px; border-radius:20px; border:none; outline:none;">
                </div>
            </div>
        </div>
    `;

    const searchInput = app.querySelector('#search-input');
    const userResults = app.querySelector('#user-results');
    const messagesList = app.querySelector('#messages-list');
    const chatHeader = app.querySelector('#chat-header');
    const inputArea = app.querySelector('#input-area');
    const msgInput = app.querySelector('#msg-input');

    // 3. Search Users (Email, Username, or Phone)
    searchInput.addEventListener('keyup', async (e) => {
        const val = e.target.value.trim();
        if (val.length < 3) { userResults.innerHTML = ''; return; }

        const usersRef = collection(db, "users");
        const fields = ['email', 'username', 'phone'];
        let foundUsers = [];

        for (const field of fields) {
            const q = query(usersRef, where(field, "==", val));
            const snap = await getDocs(q);
            snap.forEach(doc => {
                if (doc.id !== currentUserId) foundUsers.push({ id: doc.id, ...doc.data() });
            });
        }

        const uniqueUsers = Array.from(new Set(foundUsers.map(a => a.id))).map(id => foundUsers.find(a => a.id === id));

        userResults.innerHTML = uniqueUsers.map(u => `
            <div class="user-item" data-id="${u.id}" data-name="${u.username || u.email}" 
                 style="padding:15px; border-bottom:1px solid #eee; cursor:pointer; background:#fff; transition: 0.3s;">
                <strong>${u.username || 'User'}</strong><br>
                <small style="color:#666;">${u.email || u.phone}</small>
            </div>
        `).join('');

        app.querySelectorAll('.user-item').forEach(item => {
            item.addEventListener('click', () => createNewChat(item.dataset.id, item.dataset.name));
        });
    });

    // 4. Create "new chat" collection logic
    async function createNewChat(targetUserId, targetName) {
        chatHeader.innerText = targetName;
        inputArea.style.display = 'block';
        
        // Add document to "chats" with the name "new chat"
        const docRef = await addDoc(collection(db, "chats"), {
            name: "new chat",
            participants: [currentUserId, targetUserId],
            createdAt: serverTimestamp()
        });

        activeChatId = docRef.id;
        listenForMessages(activeChatId);
    }

    // 5. Real-time Message Loading
    function listenForMessages(chatId) {
        const q = query(collection(db, "chats", chatId, "messages"), orderBy("createdAt", "asc"));
        onSnapshot(q, (snapshot) => {
            messagesList.innerHTML = '';
            snapshot.forEach(doc => {
                const m = doc.data();
                const isMe = m.senderId === currentUserId;
                messagesList.innerHTML += `
                    <div style="align-self: ${isMe ? 'flex-end' : 'flex-start'}; 
                                background: ${isMe ? '#dcf8c6' : '#fff'}; 
                                padding: 8px 15px; border-radius: 10px; margin-bottom: 8px; max-width: 70%;
                                box-shadow: 0 1px 1px rgba(0,0,0,0.1);">
                        ${m.text}
                    </div>`;
            });
            messagesList.scrollTop = messagesList.scrollHeight;
        });
    }

    // 6. Send Message
    msgInput.addEventListener('keypress', async (e) => {
        if (e.key === 'Enter' && msgInput.value.trim() !== "" && activeChatId) {
            const text = msgInput.value;
            msgInput.value = ''; // Clear immediately for UX
            await addDoc(collection(db, "chats", activeChatId, "messages"), {
                text: text,
                senderId: currentUserId,
                createdAt: serverTimestamp()
            });
        }
    });
}