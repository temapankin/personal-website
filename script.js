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