// Optimized Parallax Scroll Effect with RequestAnimationFrame
let ticking = false;
let scrollPosition = 0;

window.addEventListener('scroll', () => {
    scrollPosition = window.pageYOffset;
    if (!ticking) {
        window.requestAnimationFrame(updateParallax);
        ticking = true;
    }
}, { passive: true });

function updateParallax() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    parallaxElements.forEach(element => {
        const parallaxValue = parseFloat(element.getAttribute('data-parallax'));
        const offset = scrollPosition * parallaxValue;
        
        // Use transform3d for better performance
        element.style.transform = `translate3d(0, ${offset}px, 0)`;
    });
    
    ticking = false;
}

// Smooth scroll navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Newsletter form submission
document.querySelector('.newsletter-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = e.target.querySelector('input[type="email"]').value;
    alert(`Thank you for subscribing with ${email}!`);
    e.target.reset();
});

// Explore button click handlers
document.querySelectorAll('.explore-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        alert('Coming soon! This collection will be available soon.');
    });
});

// CTA button click handler
document.querySelector('.cta-button')?.addEventListener('click', () => {
    document.querySelector('#collections').scrollIntoView({ behavior: 'smooth' });
});

// Scroll-triggered animations using Intersection Observer
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Add animation class instead of inline styles to avoid conflicts
            entry.target.classList.add('animate-in');
            observer.unobserve(entry.target); // Only animate once
        }
    });
}, observerOptions);

// Observe all showcase items
document.querySelectorAll('.showcase-text').forEach(item => {
    item.classList.add('scroll-animate');
    observer.observe(item);
});

// Observe gallery items
document.querySelectorAll('.gallery-item').forEach(item => {
    item.classList.add('scroll-animate');
    observer.observe(item);
});

// Dynamic mouse parallax for shoe cards
document.querySelectorAll('.shoe-card').forEach(card => {
    let currentRotationX = 0;
    let currentRotationY = 0;
    
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        currentRotationX = (e.clientY - centerY) / 10;
        currentRotationY = -(e.clientX - centerX) / 10;
        
        // Use translate3d for better performance
        card.style.transform = `perspective(1000px) rotateX(${currentRotationX}deg) rotateY(${currentRotationY}deg)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
        card.style.transition = 'transform 0.3s ease-out';
    });
    
    card.addEventListener('mouseenter', () => {
        card.style.transition = 'none';
    });
});

// Consolidated scroll event handler for navbar
let lastScrollPosition = 0;
let navbarScrollRaf = false;

function updateNavbarOnScroll() {
    const navbar = document.querySelector('.navbar');
    const scrollPos = window.pageYOffset;
    
    if (scrollPos > 50) {
        navbar.style.background = 'rgba(15, 15, 35, 0.98)';
        navbar.style.boxShadow = '0 5px 20px rgba(0, 212, 255, 0.2)';
    } else {
        navbar.style.background = 'rgba(15, 15, 35, 0.95)';
        navbar.style.boxShadow = 'none';
    }
    navbarScrollRaf = false;
}

window.addEventListener('scroll', () => {
    if (!navbarScrollRaf) {
        window.requestAnimationFrame(updateNavbarOnScroll);
        navbarScrollRaf = true;
    }
}, { passive: true });

// Animated counter for stats (optional enhancement)
const animateValue = (element, start, end, duration) => {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        element.textContent = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
};

// Console greeting
console.log('%cWelcome to SoleVibe! 👟', 'font-size: 20px; color: #00D4FF; font-weight: bold;');
console.log('%cStep into style with our premium shoe collection', 'font-size: 14px; color: #39FF14;');
