document.addEventListener('DOMContentLoaded', function() {
    // Light/dark mode toggle
    const darkQuery = window.matchMedia('(prefers-color-scheme: dark)');

    function effectiveTheme() {
        let stored = null;
        try { stored = localStorage.getItem('theme'); } catch (e) {}
        return stored || (darkQuery.matches ? 'dark' : 'light');
    }

    const themeToggle = document.createElement('button');
    themeToggle.className = 'theme-toggle';

    function updateToggle() {
        const dark = effectiveTheme() === 'dark';
        themeToggle.innerHTML = dark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
        themeToggle.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
    }

    themeToggle.addEventListener('click', function() {
        const next = effectiveTheme() === 'dark' ? 'light' : 'dark';
        document.documentElement.dataset.theme = next;
        try { localStorage.setItem('theme', next); } catch (e) {}
        updateToggle();
    });

    darkQuery.addEventListener('change', updateToggle);
    updateToggle();

    const headNav = document.querySelector('.head-nav');
    if (headNav) {
        headNav.appendChild(themeToggle);
    }

    // Back to top button
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = '↑';
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.setAttribute('aria-label', 'Back to top');
    document.body.appendChild(backToTopBtn);

    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(function() {
                backToTopBtn.classList.toggle('visible', window.pageYOffset > 300);
                ticking = false;
            });
            ticking = true;
        }
    });

    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Obfuscated email — assembled at runtime so HTML-only scrapers don't see the address
    const emailUser = 'artem.pankin', emailDomain = 'rutgers.edu';
    document.querySelectorAll('.js-email').forEach(function(link) {
        link.href = 'mailto:' + emailUser + '@' + emailDomain;
    });
});