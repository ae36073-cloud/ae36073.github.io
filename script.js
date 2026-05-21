// Parallax Scroll Effect
document.addEventListener('scroll', () => {
    const scrollPosition = window.pageYOffset;
    
    // Get all elements with parallax data attribute
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    parallaxElements.forEach(element => {
        const parallaxValue = parseFloat(element.getAttribute('data-parallax'));
        
        // Calculate the parallax offset
        const offset = scrollPosition * parallaxValue;
        
        // Apply the transform
        element.style.transform = `translateY(${offset}px)`;
    });
});

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

// Add scroll animation for elements
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all showcase items
document.querySelectorAll('.showcase-text').forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(30px)';
    item.style.transition = 'all 0.6s ease-out';
    observer.observe(item);
});

// Observe gallery items
document.querySelectorAll('.gallery-item').forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(30px)';
    item.style.transition = 'all 0.6s ease-out';
    observer.observe(item);
});

// Dynamic mouse parallax for shoe cards
document.querySelectorAll('.shoe-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const angleX = (e.clientY - centerY) / 10;
        const angleY = (e.clientX - centerX) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${-angleY}deg)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    });
});

// Add scroll velocity effect
let lastScrollTop = 0;
let scrollVelocity = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    scrollVelocity = currentScroll - lastScrollTop;
    lastScrollTop = currentScroll;
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.pageYOffset > 50) {
        navbar.style.background = 'rgba(15, 15, 35, 0.98)';
        navbar.style.boxShadow = '0 5px 20px rgba(0, 212, 255, 0.2)';
    } else {
        navbar.style.background = 'rgba(15, 15, 35, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

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
