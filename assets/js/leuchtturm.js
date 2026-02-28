// LEUCHTTURM THEME - CUSTOM JS

// Stats Counter Animation
function animateStats() {
    const stats = document.querySelectorAll('.stat-number');
    
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalValue = parseInt(target.dataset.count);
                const duration = 2000; // 2 seconds
                const startTime = Date.now();
                
                function updateCounter() {
                    const elapsed = Date.now() - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    
                    // Easing function
                    const easeOut = 1 - Math.pow(1 - progress, 3);
                    const currentValue = Math.floor(easeOut * finalValue);
                    
                    target.textContent = currentValue.toLocaleString('de-DE');
                    
                    if (progress < 1) {
                        requestAnimationFrame(updateCounter);
                    } else {
                        target.textContent = finalValue.toLocaleString('de-DE');
                    }
                }
                
                updateCounter();
                observer.unobserve(target);
            }
        });
    }, observerOptions);
    
    stats.forEach(stat => observer.observe(stat));
}

// Smooth scroll for anchor links
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Newsletter form success handling
function initNewsletterForm() {
    const form = document.querySelector('[data-members-form="subscribe"]');
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        const button = form.querySelector('button[type="submit"]');
        const originalText = button.textContent;
        
        button.textContent = 'Wird verarbeitet...';
        button.disabled = true;
        
        // Reset after submission attempt
        setTimeout(() => {
            button.textContent = originalText;
            button.disabled = false;
        }, 3000);
    });
}

// Init when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

function init() {
    animateStats();
    initSmoothScroll();
    initNewsletterForm();
}
