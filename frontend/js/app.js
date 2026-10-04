/* ═══════════════════════════════════════════
   App.js — SPA Router, Navbar, Initialization
   ═══════════════════════════════════════════ */

(function () {
    'use strict';

    /* ─── SPA Router ─── */
    const routes = {};
    let currentCleanup = null;

    function registerRoute(hash, mountFn) {
        routes[hash] = mountFn;
    }

    function navigate(hash) {
        window.location.hash = hash;
    }

    function handleRoute() {
        const app = document.getElementById('app');
        if (!app) return;

        // Cleanup previous page
        if (currentCleanup) { currentCleanup(); currentCleanup = null; }

        let hash = window.location.hash.replace('#', '') || '/';
        if (hash === '/') hash = State.isAuthenticated() ? '/home' : '/login';

        // Auth guard
        const publicRoutes = ['/login', '/signup', '/terms', '/privacy'];
        if (!publicRoutes.includes(hash) && !State.isAuthenticated()) {
            navigate('/login');
            return;
        }
        if (['/login', '/signup'].includes(hash) && State.isAuthenticated()) {
            navigate('/home');
            return;
        }

        const mountFn = routes[hash];
        if (mountFn) {
            app.innerHTML = '';
            currentCleanup = mountFn(app) || null;
        } else {
            navigate('/home');
        }
    }

    window.addEventListener('hashchange', handleRoute);

    /* ─── Navbar Renderer ─── */
    function renderNavbar() {
        const isAuth = State.isAuthenticated();
        const user = AppState.user;
        const theme = AppState.theme;
        const currentHash = window.location.hash.replace('#', '') || '/';

        function initials(input) {
            const v = (input || '').trim();
            if (!v) return 'U';
            return v.split(/\s+/).slice(0, 2).map(p => (p[0] || '').toUpperCase()).join('');
        }

        const navItems = [
            { label: 'Home', href: '#/home' },
            { label: 'Converter', href: '#/converter' },
            { label: 'Editor', href: '#/editor' },
        ];

        let navLinksHTML = '';
        if (isAuth) {
            navLinksHTML = navItems.map(i => {
                const active = currentHash === i.href.replace('#', '') ? 'active' : '';
                return `<a href="${i.href}" class="navbar-link ${active}">${i.label}</a>`;
            }).join('');
        }

        const themeIcon = theme === 'dark' ? '<i class="ph ph-sun"></i>' : '<i class="ph ph-moon"></i>';

        let rightHTML = '';
        if (isAuth && user) {
            rightHTML = `
        <div class="user-info-pill" style="display: none;">
          <div class="user-avatar">${initials(user.name || user.email)}</div>
          <div>
            <div class="user-name">${user.name || ''}</div>
            <div class="user-email">${user.email || ''}</div>
          </div>
        </div>
        <button class="btn btn-primary btn-sm" id="navbar-logout" style="display: none;">
          ↪ Logout
        </button>
      `;
        } else {
            rightHTML = `
        <a href="#/login" class="btn btn-outline btn-sm" style="display: none;">Login</a>
        <a href="#/signup" class="btn btn-brand btn-sm" style="display: none;">Sign up</a>
      `;
        }

        return `
      <header class="navbar">
        <div class="navbar-inner">
          <a href="${isAuth ? '#/home' : '#/login'}" class="navbar-logo">
            <span class="navbar-logo-icon" style="display:inline-flex; align-items:center; justify-content:center; background:linear-gradient(135deg, #3b82f6 0%, #6366f1 50%, #8b5cf6 100%); border-radius:10px; box-shadow:0 3px 10px rgba(99,102,241,0.35);">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <!-- Graduation cap / Scholar anvil & spark concept -->
                <path d="M12 2L1 7L12 12L23 7L12 2Z" fill="white" fill-opacity="0.95"/>
                <path d="M5 10.5V16C5 18.5 8.134 20.5 12 20.5C15.866 20.5 19 18.5 19 16V10.5L12 14.5L5 10.5Z" fill="white" fill-opacity="0.75"/>
                <path d="M21 9V15" stroke="white" stroke-width="1.8" stroke-linecap="round"/>
                <circle cx="21" cy="16" r="1.2" fill="white"/>
              </svg>
            </span>
            <span class="navbar-logo-text" style="font-weight: 700; letter-spacing: -0.03em; font-size: 1.15rem; background: linear-gradient(135deg, var(--text-primary) 60%, var(--brand-from)); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">ScholarForge</span>
          </a>
          <nav class="navbar-links desktop-only">${navLinksHTML}</nav>
          <div class="flex items-center gap-2">
            <button class="icon-btn" id="theme-toggle" title="Toggle theme">${themeIcon}</button>
            ${isAuth && user ? `
              <div class="user-info-pill">
                <div class="user-avatar">${initials(user.name || user.email)}</div>
                <div>
                  <div class="user-name">${user.name || ''}</div>
                  <div class="user-email">${user.email || ''}</div>
                </div>
              </div>
              <button class="btn btn-primary btn-sm" id="navbar-logout">↪ Logout</button>
            ` : `
              <a href="#/login" class="btn btn-outline btn-sm">Login</a>
              <a href="#/signup" class="btn btn-brand btn-sm">Sign up</a>
            `}
          </div>
        </div>
      </header>
    `;
    }

    function attachNavbarEvents() {
        const toggle = document.getElementById('theme-toggle');
        if (toggle) toggle.addEventListener('click', () => {
            State.toggleTheme();
            handleRoute(); // re-render
        });

        const logoutBtn = document.getElementById('navbar-logout');
        if (logoutBtn) logoutBtn.addEventListener('click', () => {
            State.setUser(null);
            navigate('/login');
        });
    }

    /* ─── Footer ─── */
    function renderFooter() {
        return `
      <footer class="footer">
        <div class="footer-inner">
          <div>
            <h3 class="text-sm font-semibold text-primary">About</h3>
            <p class="mt-2 text-sm text-secondary">A platform that helps researchers easily forge conference-ready papers.</p>
          </div>
          <div>
            <h3 class="text-sm font-semibold text-primary">Legal & Policies</h3>
            <ul style="list-style: none; margin-top: 0.5rem;">
              <li><a href="#/terms" class="link-blue text-sm">Terms and Conditions</a></li>
              <li class="mt-1.5"><a href="#/privacy" class="link-blue text-sm">Privacy Policy</a></li>
            </ul>
          </div>
          <div>
            <h3 class="text-sm font-semibold text-primary">Build</h3>
            <p class="mt-2 text-sm text-secondary">HTML • CSS • JavaScript • FastAPI • Local persistence</p>
          </div>
        </div>
        <div class="footer-bottom">© ${new Date().getFullYear()} ScholarForge. Built for HackaMined 2026.</div>
      </footer>
    `;
    }

    /* ─── Initialization ─── */
    function init() {
        // Load persisted state
        State.loadTheme();
        State.loadUser();

        // Register routes (page modules register themselves via window.Pages)
        registerRoute('/login', window.Pages.login);
        registerRoute('/signup', window.Pages.signup);
        registerRoute('/home', window.Pages.home);
        registerRoute('/editor', window.Pages.editor);
        registerRoute('/converter', window.Pages.converter);
        registerRoute('/terms', window.Pages.terms);
        registerRoute('/privacy', window.Pages.privacy);

        // Initial route
        handleRoute();
    }

    /* ─── Exports ─── */
    window.App = {
        navigate,
        renderNavbar,
        attachNavbarEvents,
        renderFooter,
        handleRoute,
        init,
    };

    // Boot when DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
