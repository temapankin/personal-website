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

    // ===== SMOOTH SCROLLING FOR ANCHOR LINKS =====
    // Select all links with href starting with #
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            // Only handle if it's a valid anchor (not just "#")
            if (targetId && targetId !== '#') {
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    e.preventDefault();
                    
                    // Smooth scroll to element
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    // Update URL without jumping
                    history.pushState(null, null, targetId);
                }
            }
        });
    });

    // ===== FADE IN ANIMATIONS ON SCROLL (Optional) =====
    // Add fade-in effect for sections as they come into view
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all content sections
    const sections = document.querySelectorAll('.page.content');
    sections.forEach(section => {
        observer.observe(section);
    });

    // ===== CONTACT LINK RIPPLE EFFECT (Optional Enhancement) =====
    const contactLinks = document.querySelectorAll('.contact-link');
    
    contactLinks.forEach(link => {
        link.addEventListener('mouseenter', function(e) {
            // Add a subtle highlight effect
            this.style.transition = 'all 0.3s ease';
        });
    });

    // ===== BACK TO TOP BUTTON (Bonus Feature) =====
    // Create a back to top button
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = '↑';
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.setAttribute('aria-label', 'Back to top');
    document.body.appendChild(backToTopBtn);

    // Show/hide back to top button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    // Smooth scroll to top when clicked
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});