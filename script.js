document.addEventListener('DOMContentLoaded', function() {
    const toggleBtn = document.querySelector('.mobile-links-toggle');
    const popup = document.querySelector('.mobile-links-popup');
    if (toggleBtn && popup) {
        toggleBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            popup.style.display = popup.style.display === 'flex' ? 'none' : 'flex';
        });
        document.addEventListener('click', function(e) {
            if (!popup.contains(e.target) && e.target !== toggleBtn) {
                popup.style.display = 'none';
            }
        });
    }
});


document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle functionality
    const toggleBtn = document.querySelector('.mobile-links-toggle');
    const popup = document.querySelector('.mobile-links-popup');
    
    if (toggleBtn && popup) {
        toggleBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            popup.style.display = popup.style.display === 'flex' ? 'none' : 'flex';
        });
        
        document.addEventListener('click', function(e) {
            if (!popup.contains(e.target) && e.target !== toggleBtn) {
                popup.style.display = 'none';
            }
        });
    }

    // Smooth scroll for hash links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId && targetId !== '#') {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    e.preventDefault();
                    targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    history.pushState(null, null, targetId);
                }
            }
        });
    });

    // Back to top button
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = '↑';
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.setAttribute('aria-label', 'Back to top');
    document.body.appendChild(backToTopBtn);

    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) backToTopBtn.classList.add('visible');
        else backToTopBtn.classList.remove('visible');
    });

    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});