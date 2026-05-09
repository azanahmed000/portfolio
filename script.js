/* =========================================
   Azan Pirzada Portfolio - JavaScript
   Enhanced with Typing Effect & Animations
========================================= */

// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-links a');
const animatedElements = document.querySelectorAll('.animate-on-scroll');
const skillBars = document.querySelectorAll('.skill-progress');
const sections = document.querySelectorAll('section');
const dynamicText = document.querySelector('.dynamic-text');

// ========================
// MOBILE NAVIGATION
// ========================
hamburger?.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

navItems.forEach(item => {
    item.addEventListener('click', () => {
        hamburger?.classList.remove('active');
        navLinks?.classList.remove('active');
    });
});

// ========================
// TYPING EFFECT
// ========================
const phrases = [
    "CS Student",
    "AI Enthusiast",
    "Data Analyst",
    "ML Explorer",
    "Problem Solver"
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeEffect() {
    if (!dynamicText) return;

    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
        dynamicText.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
    } else {
        dynamicText.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
        typingSpeed = 2000;
        isDeleting = true;
    }

    if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typingSpeed = 500;
    }

    setTimeout(typeEffect, typingSpeed);
}

// Start typing after page load
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(typeEffect, 1500);
});

// ========================
// HIGH-END ANIMATION ENGINE
// ========================

// Active nav link on scroll
function updateActiveNav() {
    const scrollPos = window.scrollY + 100;
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-links a');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            navItems.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

class ScrollManager {
    constructor() {
        this.cursor = { x: 0, y: 0 };
        this.scroll = window.scrollY;
        this.targetScroll = window.scrollY;
        this.parallaxElements = document.querySelectorAll('[data-speed]');
        this.tiltElements = document.querySelectorAll('.cert-card, .project-card, .btn');

        this.init();
    }

    init() {
        this.bindEvents();
        this.animate();
        this.initCursor();
        this.initMagneticButtons();
        this.initScrollAnimations();
    }

    bindEvents() {
        window.addEventListener('scroll', () => {
            this.targetScroll = window.scrollY;
            updateActiveNav();
        });

        window.addEventListener('mousemove', (e) => {
            this.cursor.x = e.clientX;
            this.cursor.y = e.clientY;
            this.handleTilt(e);
        });
    }

    initScrollAnimations() {
        const animatedElements = document.querySelectorAll('.animate-on-scroll');
        const skillBars = document.querySelectorAll('.skill-progress');
        const thinSkillBars = document.querySelectorAll('.skill-progress-thin');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    const skillBar = entry.target.querySelector('.skill-progress');
                    if (skillBar) {
                        skillBar.style.width = skillBar.dataset.width + '%';
                    }
                    // Also handle thin progress bars
                    const thinBars = entry.target.querySelectorAll('.skill-progress-thin');
                    thinBars.forEach(bar => {
                        bar.style.width = bar.dataset.width + '%';
                    });
                }
            });
        }, { threshold: 0.1 });

        animatedElements.forEach(el => observer.observe(el));

        // Observer for skill progress bars
        const skillObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.width = entry.target.dataset.width + '%';
                }
            });
        }, { threshold: 0.5 });

        skillBars.forEach(bar => skillObserver.observe(bar));
        thinSkillBars.forEach(bar => skillObserver.observe(bar));
    }

    initCursor() {
        // Cursor disabled - using default browser cursor
        return;

        // Smooth cursor animation
        const animateCursor = () => {
            const dx = this.cursor.x;
            const dy = this.cursor.y;

            dot.style.transform = `translate(${dx}px, ${dy}px) translate(-50%, -50%)`;

            // Outline follows with delay (lerp)
            const outlineX = parseFloat(outline.dataset.x) || 0;
            const outlineY = parseFloat(outline.dataset.y) || 0;

            const lx = outlineX + (dx - outlineX) * 0.15;
            const ly = outlineY + (dy - outlineY) * 0.15;

            outline.style.transform = `translate(${lx}px, ${ly}px) translate(-50%, -50%)`;
            outline.dataset.x = lx;
            outline.dataset.y = ly;

            requestAnimationFrame(animateCursor);
        };
        requestAnimationFrame(animateCursor);

        // Hover effects
        const interactive = document.querySelectorAll('a, button, input, textarea, .card');
        interactive.forEach(el => {
            el.addEventListener('mouseenter', () => document.body.classList.add('hovering'));
            el.addEventListener('mouseleave', () => document.body.classList.remove('hovering'));
        });
    }

    handleTilt(e) {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;

        // Tilt Cards 3D effect
        this.tiltElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            // Only tilt if mouse is near or over element to save performance
            if (e.clientY > rect.top - 100 && e.clientY < rect.bottom + 100) {
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;

                const tiltX = (e.clientY - centerY) / 20;
                const tiltY = (centerX - e.clientX) / 20;

                el.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02, 1.02, 1.02)`;
                el.style.transition = 'transform 0.1s ease-out';
            } else {
                el.style.transform = 'none';
                el.style.transition = 'transform 0.5s ease-out';
            }
        });
    }

    initMagneticButtons() {
        const magneticBtns = document.querySelectorAll('.magnetic, .btn');
        magneticBtns.forEach(btn => {
            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;

                btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
            });

            btn.addEventListener('mouseleave', () => {
                btn.style.transform = 'translate(0, 0)';
            });
        });
    }

    animate() {
        // Deep Parallax with stronger effect
        this.parallaxElements.forEach(el => {
            const speed = parseFloat(el.dataset.speed) || 0;
            const yPos = window.scrollY * speed * 2; // 2x multiplier for more dramatic effect
            el.style.transform = `translateY(${yPos}px)`;
        });

        // Parallax for floating circles based on scroll
        const circles = document.querySelectorAll('.floating-circle');
        circles.forEach((circle, index) => {
            const multiplier = (index + 1) * 0.3;
            const yPos = window.scrollY * multiplier;
            const rotation = window.scrollY * 0.02 * (index + 1);
            circle.style.transform = `translateY(${yPos}px) rotate(${rotation}deg)`;
        });

        requestAnimationFrame(() => this.animate());
    }
}

// Certificate cards scroll reveal
const certCards = document.querySelectorAll('.cert-card');
const certObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });
certCards.forEach(card => certObserver.observe(card));

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
    new ScrollManager();
    setTimeout(typeEffect, 1500); // Start typing effect

    // ========================
    // ROBOT PERFORMANCE OPTIMIZATION
    // Pause animation when hero is off-screen
    // ========================
    const heroRobot = document.querySelector('.hero-robot');
    if (heroRobot) {
        const robotObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.remove('offscreen');
                } else {
                    entry.target.classList.add('offscreen');
                }
            });
        }, { threshold: 0.1 });

        robotObserver.observe(heroRobot);
    }
});

// ========================
// EMAILJS FORM HANDLING
// ========================
(function () {
    // Initialize EmailJS
    emailjs.init('tZToHCP3YlXCPQT3Q');
})();

const contactForm = document.getElementById('contact-form');
const submitBtn = document.getElementById('submit-btn');
const btnText = submitBtn?.querySelector('.btn-text');
const btnLoading = submitBtn?.querySelector('.btn-loading');
const formStatus = document.getElementById('form-status');

contactForm?.addEventListener('submit', function (e) {
    e.preventDefault();

    // Prevent double submission
    if (submitBtn.disabled) return;

    // Show loading state
    submitBtn.disabled = true;
    btnText.style.display = 'none';
    btnLoading.style.display = 'inline';
    formStatus.className = 'form-status';
    formStatus.textContent = '';

    // Prepare template parameters
    const templateParams = {
        name: this.querySelector('[name="name"]').value,
        email: this.querySelector('[name="email"]').value,
        phone: this.querySelector('[name="phone"]').value || 'Not provided',
        message: this.querySelector('[name="message"]').value
    };

    // Send email via EmailJS
    emailjs.send('service_a6rtatp', 'template_b1607zp', templateParams)
        .then(function () {
            // Success
            formStatus.className = 'form-status success';
            formStatus.textContent = '✓ Message sent successfully! I\'ll get back to you soon.';
            contactForm.reset();
        })
        .catch(function (error) {
            // Error - show detailed message for debugging
            console.error('EmailJS Error:', error);
            formStatus.className = 'form-status error';
            formStatus.textContent = '✗ Failed to send: ' + (error.text || error.message || 'Unknown error');
        })
        .finally(function () {
            // Reset button state
            submitBtn.disabled = false;
            btnText.style.display = 'inline';
            btnLoading.style.display = 'none';
        });
});

// ========================
// SMOOTH SCROLL NAVIGATION
// ========================
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            window.scrollTo({
                top: targetSection.offsetTop - 60,
                behavior: 'smooth'
            });
        }
    });
});

// ========================
// INITIALIZE ANIMATION ENGINE
// ========================
new ScrollManager();

// ========================
// REVIEW FORM HANDLING
// ========================
const reviewForm = document.getElementById('review-form');
const reviewSubmitBtn = document.getElementById('review-submit-btn');
const reviewBtnText = reviewSubmitBtn?.querySelector('.btn-text');
const reviewBtnLoading = reviewSubmitBtn?.querySelector('.btn-loading');
const reviewFormStatus = document.getElementById('review-form-status');

reviewForm?.addEventListener('submit', function (e) {
    e.preventDefault();

    // Prevent double submission
    if (reviewSubmitBtn.disabled) return;

    // Show loading state
    reviewSubmitBtn.disabled = true;
    reviewBtnText.style.display = 'none';
    reviewBtnLoading.style.display = 'inline';
    reviewFormStatus.className = 'form-status';
    reviewFormStatus.textContent = '';

    // Send review via EmailJS using sendForm
    emailjs.sendForm('service_a6rtatp', 'template_l50sggp', this)
        .then(function () {
            // Success
            reviewFormStatus.className = 'form-status success';
            reviewFormStatus.textContent = '✓ Thank you! Your review has been submitted for approval.';
            reviewForm.reset();
        })
        .catch(function (error) {
            // Error
            console.error('Review EmailJS Error:', error);
            reviewFormStatus.className = 'form-status error';
            reviewFormStatus.textContent = '✗ Failed to submit: ' + (error.text || error.message || 'Please try again.');
        })
        .finally(function () {
            // Reset button state
            reviewSubmitBtn.disabled = false;
            reviewBtnText.style.display = 'inline';
            reviewBtnLoading.style.display = 'none';
        });
});

// ========================
// CERTIFICATE TOGGLE
// ========================
const certsWrapper = document.getElementById('certs-wrapper');
const toggleCertsBtn = document.getElementById('toggle-certs-btn');

toggleCertsBtn?.addEventListener('click', () => {
    const isCollapsed = certsWrapper.classList.contains('collapsed');

    if (isCollapsed) {
        certsWrapper.classList.remove('collapsed');
        certsWrapper.classList.add('expanded');
        toggleCertsBtn.innerHTML = '<ion-icon name="chevron-up-outline"></ion-icon> Show Less';
    } else {
        certsWrapper.classList.remove('expanded');
        certsWrapper.classList.add('collapsed');
        toggleCertsBtn.innerHTML = '<ion-icon name="chevron-down-outline"></ion-icon> View All Certificates';

        // Scroll back to top of certificates section if user is far down
        const certSection = document.getElementById('certifications');
        if (window.scrollY > certSection.offsetTop + 400) {
            window.scrollTo({
                top: certSection.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    }
});

console.log('Portfolio loaded! 🚀');
