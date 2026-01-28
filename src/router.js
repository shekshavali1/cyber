import { renderHome } from './pages/home.js';
import { renderChat } from './pages/chat.js';
import { renderRegisterPage } from './auth/register.js';
import { renderLogin} from './auth/login.js';
import { renderForgot} from './auth/forgot.js';

const app = document.querySelector('#app');

// Define your routes here
const routes = {
    '/': renderHome,
    '/home': renderHome,
    '/chat': renderChat,
    '/register' : renderRegisterPage,
    '/login' : renderLogin,
    '/forgot' : renderForgot
    
};

// Function to handle navigation
export function handleLocation() {
    // Get the current path (e.g., #/chat -> /chat)
    // If empty, default to '/'
    const path = window.location.hash.slice(1) || '/';
    
    // Find the matching function or default to Home
    const route = routes[path] || routes['/'];
    
    // Clear the app and run the page function
    app.innerHTML = '';
    route(app);
}

// Enable navigation
export function initRouter() {
    // Listen for Back/Forward button clicks
    window.addEventListener('popstate', handleLocation);
    // Listen for hash changes
    window.addEventListener('hashchange', handleLocation);
    // Load the correct page on initial refresh
    handleLocation();
}
