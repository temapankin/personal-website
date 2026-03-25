document.addEventListener('DOMContentLoaded', function() {
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