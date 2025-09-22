// --- Mobile Menu Functionality ---
let mobileMenuOpen = false;
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');
    const closeIcon = document.getElementById('close-icon');
    mobileMenuOpen = !mobileMenuOpen;
    if (mobileMenuOpen) {
        mobileMenu.classList.remove('hidden');
        menuIcon.classList.add('hidden');
        closeIcon.classList.remove('hidden');
    } else {
        mobileMenu.classList.add('hidden');
        menuIcon.classList.remove('hidden');
        closeIcon.classList.add('hidden');
    }
}

function closeMobileMenu() {
    if (mobileMenuOpen) {
        toggleMobileMenu();
    }
}

// --- Smooth Scrolling ---
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

// --- Animated Portfolio Filtering ---
function filterPortfolio(category) {
    const buttons = document.querySelectorAll('#portfolio button[id^="filter-"]');
    buttons.forEach(button => {
        const buttonId = button.id.split('-')[1];
        const buttonCategory = buttonId.charAt(0).toUpperCase() + buttonId.slice(1);
        if (buttonCategory === category || (buttonId === 'all' && category === 'All')) {
            button.className = "px-6 py-2 rounded-full transition-all bg-gradient-to-r from-blue-500 to-purple-600 text-white";
        } else {
            button.className = "px-6 py-2 rounded-full transition-all bg-slate-700 text-gray-300 hover:bg-slate-600";
        }
    });

    const portfolioItems = document.querySelectorAll('.portfolio-item');
    portfolioItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        const shouldBeVisible = category === 'All' || itemCategory === category;
        
        if (shouldBeVisible) {
            item.style.display = 'block';
            setTimeout(() => {
                item.classList.remove('hidden-item');
            }, 50);
        } else {
            item.classList.add('hidden-item');
            setTimeout(() => {
                if (item.classList.contains('hidden-item')) {
                    item.style.display = 'none';
                }
            }, 400); // Corresponds to the transition duration in CSS
        }
    });
}

// --- Pricing Modal ---
function openPricing() {
    const modal = document.getElementById('pricingModal');
    modal.classList.remove('hidden');
    modal.classList.add('show'); // 'show' class triggers the animation
}

function closePricing() {
    const modal = document.getElementById('pricingModal');
    modal.classList.remove('show');
    // We can use an animationend event listener for a cleaner exit, but for simplicity, setTimeout works
    setTimeout(() => {
        modal.classList.add('hidden');
    }, 400); // Match animation duration
}


// --- Execute code when the document is fully loaded ---
document.addEventListener('DOMContentLoaded', function() {
    
    // --- Scroll-Triggered Animations and Number Counter ---
    const animatedElements = document.querySelectorAll('.animated-element');
    const counterElements = document.querySelectorAll('[data-count]');

    const animateCounter = (el) => {
        const target = +el.getAttribute('data-count');
        el.innerText = '0+';
        let current = 0;
        
        const updateCounter = () => {
            const increment = Math.ceil(target / 100);
            current += increment;
            
            if (current < target) {
                el.innerText = current + '+';
                requestAnimationFrame(updateCounter);
            } else {
                el.innerText = target + '+';
            }
        };
        requestAnimationFrame(updateCounter);
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');

                if (entry.target.hasAttribute('data-count') && !entry.target.dataset.counted) {
                    animateCounter(entry.target);
                    entry.target.dataset.counted = 'true'; // Prevent re-counting
                    observer.unobserve(entry.target);
                } else {
                     // Unobserve regular elements after they appear to improve performance
                    observer.unobserve(entry.target);
                }
            }
        });
    }, {
        threshold: 0.1 // Trigger when 10% of the element is visible
    });

    animatedElements.forEach(el => observer.observe(el));
    counterElements.forEach(el => observer.observe(el));
    
    // --- Initialize Portfolio Filter ---
    filterPortfolio('All');
});




// Select all thumbnail overlays
const thumbnails = document.querySelectorAll('.video-thumb');

thumbnails.forEach(thumb => {
  thumb.addEventListener('click', () => {
    // Find the corresponding iframe
    const iframe = thumb.parentElement.querySelector('.portfolio-video');

    // Append autoplay param (works for Google Drive preview)
    if (!iframe.src.includes('autoplay=1')) {
      iframe.src += iframe.src.includes('?') ? '&autoplay=1' : '?autoplay=1';
    }

    // Hide the thumbnail overlay
    thumb.style.display = 'none';
  });
});
