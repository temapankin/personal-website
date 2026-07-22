document.addEventListener('DOMContentLoaded', function() {
    // Light/dark mode toggle
    const darkQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const sunIcon = '<svg class="icon" aria-hidden="true" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M8 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8M8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0m0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13m8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5M3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8m10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0m-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0m9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707M4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708"/></svg>';
    const moonIcon = '<svg class="icon" aria-hidden="true" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M6 .278a.77.77 0 0 1 .08.858 7.2 7.2 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277q.792-.001 1.533-.16a.79.79 0 0 1 .81.316.73.73 0 0 1-.031.893A8.35 8.35 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.75.75 0 0 1 6 .278"/></svg>';

    function effectiveTheme() {
        let stored = null;
        try { stored = localStorage.getItem('theme'); } catch (e) {}
        return stored || (darkQuery.matches ? 'dark' : 'light');
    }

    const themeToggle = document.createElement('button');
    themeToggle.className = 'theme-toggle';

    function updateToggle() {
        const dark = effectiveTheme() === 'dark';
        themeToggle.innerHTML = dark ? sunIcon : moonIcon;
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
    }, { passive: true });

    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Obfuscated email — base64-encoded so the address isn't readable in source,
    // then assembled at runtime so HTML-only scrapers never see it either.
    const emailAddress = atob('YXJ0ZW0ucGFua2luQHJ1dGdlcnMuZWR1');   // artem.pankin@rutgers.edu
    const [emailUser, emailDomain] = emailAddress.split('@');
    document.querySelectorAll('.js-email').forEach(function(link) {
        link.href = 'mailto:' + emailAddress;
        const text = link.querySelector('.js-email-text');
        if (text) text.textContent = emailUser + '[at]' + emailDomain;
    });

    // Copy-email button (hidden until JS runs, since it needs the assembled address)
    document.querySelectorAll('.js-copy-email').forEach(function(btn) {
        btn.hidden = false;

        function showCopied() {
            btn.classList.add('copied');
            const status = btn.querySelector('.js-copy-status');
            if (status) status.textContent = 'Copied';
            setTimeout(function() {
                btn.classList.remove('copied');
                if (status) status.textContent = '';
            }, 1500);
        }

        btn.addEventListener('click', function() {
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(emailAddress).then(showCopied);
            } else {
                const ta = document.createElement('textarea');
                ta.value = emailAddress;
                ta.setAttribute('readonly', '');
                ta.style.position = 'absolute';
                ta.style.left = '-9999px';
                document.body.appendChild(ta);
                ta.select();
                try { document.execCommand('copy'); showCopied(); } catch (e) {}
                document.body.removeChild(ta);
            }
        });
    });
});
