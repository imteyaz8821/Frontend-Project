// Portfolio JavaScript with GSAP Animations

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Global variables
let isMenuOpen = false;
let isScrolled = false;
let locomotiveScroll;

// DOM Elements
const preloader = document.getElementById('preloader');
const progressBar = document.getElementById('progressBar');
const navigation = document.getElementById('navigation');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
const menuIcon = document.getElementById('menuIcon');
const contactForm = document.getElementById('contactForm');

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Start with loading animation
    showLoadingScreen();

    // Initialize scroll listeners
    initializeScrollListeners();

    // Initialize mobile menu
    initializeMobileMenu();

    // Initialize form
    initializeContactForm();

    // Initialize smooth scroll
    initializeSmoothScroll();


}

// Loading Screen Animation
function showLoadingScreen() {
    // Animate progress bar
    gsap.to(progressBar, {
        width: "100%",
        duration: 2.5,
        ease: "power2.out",
        onComplete: hideLoadingScreen
    });
    
    // Animate loader text
    gsap.fromTo('.loader-text', 
        { 
            opacity: 0, 
            y: 30,
            scale: 0.8
        },
        { 
            opacity: 1, 
            y: 0,
            scale: 1,
            duration: 1,
            ease: "power3.out"
        }
    );
}

function hideLoadingScreen() {
    gsap.to(preloader, {
        opacity: 0,
        scale: 0.9,
        duration: 1,
        ease: "power3.out",
        onComplete: () => {
            preloader.style.display = 'none';
            initializeMainAnimations();
        }
    });
}

// Main animations after loading
function initializeMainAnimations() {
    // Animate navigation
    gsap.to(navigation, {
        y: 0,
        opacity: 1,
        duration: 1,
        delay: 0.2,
        ease: 'power3.out'
    });
    
    // Animate hero content
    gsap.to('.hero-content', {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 1.2,
        delay: 0.5,
        ease: 'power3.out'
    });
    
    // Animate floating orbs
    animateFloatingOrbs();
    
    // Initialize scroll-triggered animations
    initializeScrollAnimations();
}

// Floating orbs animation
function animateFloatingOrbs() {
    gsap.to('.orb-1', {
        y: -20,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut"
    });
    
    gsap.to('.orb-2', {
        y: -30,
        x: 20,
        duration: 6,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        delay: -2
    });
    
    gsap.to('.orb-3', {
        y: -15,
        x: -15,
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        delay: -1
    });
    
    // Animate footer particles
    gsap.to('.particle', {
        y: -10,
        opacity: 0.8,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        stagger: 0.5
    });
}

// Scroll-triggered animations
function initializeScrollAnimations() {
    // About section animations
    gsap.fromTo('.about-content', 
        { opacity: 0, x: 50 },
        {
            opacity: 1,
            x: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.about-section',
                start: 'top 70%'
            }
        }
    );
    
    // Skills animation with stagger
    gsap.fromTo('.skill-item', 
        { opacity: 0, y: 30 },
        {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power3.out',
            stagger: 0.1,
            scrollTrigger: {
                trigger: '.skills-grid',
                start: 'top 80%'
            }
        }
    );
    
    // Projects animation with stagger
    gsap.fromTo('.project-card', 
        { opacity: 0, y: 50, scale: 0.95 },
        {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: 'power3.out',
            stagger: 0.15,
            scrollTrigger: {
                trigger: '.projects-grid',
                start: 'top 80%'
            }
        }
    );
    
    // Contact form animation
    gsap.fromTo('.contact-form', 
        { opacity: 0, y: 30 },
        {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.contact-section',
                start: 'top 70%'
            }
        }
    );
    
    // Footer animation
    gsap.fromTo('.footer-content', 
        { opacity: 0, y: 30 },
        {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.footer',
                start: 'top 80%'
            }
        }
    );
}

// Scroll listeners
function initializeScrollListeners() {
    window.addEventListener('scroll', handleScroll);
}

function handleScroll() {
    const scrollY = window.scrollY;
    const newIsScrolled = scrollY > 50;
    
    if (newIsScrolled !== isScrolled) {
        isScrolled = newIsScrolled;
        navigation.classList.toggle('scrolled', isScrolled);
    }
}

// Mobile menu functionality
function initializeMobileMenu() {
    mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    mobileMenuOverlay.addEventListener('click', closeMobileMenu);
    
    // Close menu when clicking nav links
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });
}

function toggleMobileMenu() {
    if (isMenuOpen) {
        closeMobileMenu();
    } else {
        openMobileMenu();
    }
}

function openMobileMenu() {
    isMenuOpen = true;
    
    // Update icon
    menuIcon.className = 'ph-x';
    
    // Show overlay
    mobileMenuOverlay.classList.add('active');
    
    // Animate menu
    gsap.to(mobileMenu, {
        x: 0,
        duration: 0.5,
        ease: 'power3.out'
    });
    
    // Stagger animate menu items
    gsap.fromTo('.mobile-nav-link', 
        { opacity: 0, x: 30 },
        {
            opacity: 1,
            x: 0,
            duration: 0.3,
            stagger: 0.1,
            delay: 0.2,
            ease: 'power3.out'
        }
    );
}

function closeMobileMenu() {
    isMenuOpen = false;
    
    // Update icon
    menuIcon.className = 'ph-list';
    
    // Hide overlay
    mobileMenuOverlay.classList.remove('active');
    
    // Animate menu out
    gsap.to(mobileMenu, {
        x: '100%',
        duration: 0.5,
        ease: 'power3.out'
    });
}

// Smooth scrolling for navigation links
function initializeSmoothScroll() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (isMenuOpen) {
                    closeMobileMenu();
                }
            }
        });
    });
}

// Contact form functionality
function initializeContactForm() {
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
        
        // Add focus/blur animations to form inputs
        const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
        
        formInputs.forEach(input => {
            input.addEventListener('focus', () => {
                gsap.to(input.parentElement, {
                    scale: 1.02,
                    duration: 0.2,
                    ease: 'power2.out'
                });
            });
            
            input.addEventListener('blur', () => {
                gsap.to(input.parentElement, {
                    scale: 1,
                    duration: 0.2,
                    ease: 'power2.out'
                });
            });
        });
    }
}

function handleFormSubmit(e) {
    e.preventDefault();
    
    const submitBtn = e.target.querySelector('.submit-btn');
    const originalText = submitBtn.innerHTML;
    
    // Animate button
    gsap.to(submitBtn, {
        scale: 0.95,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        ease: 'power2.out'
    });
    
    // Simulate form submission
    submitBtn.innerHTML = '<span>Sending...</span>';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        submitBtn.innerHTML = '<span>Message Sent!</span><i class="ph-check"></i>';
        
        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            contactForm.reset();
        }, 2000);
    }, 1500);
}

// Button hover effects
document.addEventListener('mouseover', (e) => {
    if (e.target.matches('.hero-cta, .project-cta, .submit-btn')) {
        gsap.to(e.target, {
            scale: 1.05,
            duration: 0.2,
            ease: 'power2.out'
        });
    }
    
    if (e.target.matches('.project-card')) {
        gsap.to(e.target, {
            y: -10,
            scale: 1.02,
            duration: 0.3,
            ease: 'power2.out'
        });
    }
    
    if (e.target.matches('.skill-item')) {
        gsap.to(e.target, {
            y: -5,
            duration: 0.3,
            ease: 'power2.out'
        });
    }
    
    if (e.target.matches('.profile-frame')) {
        gsap.to(e.target, {
            scale: 1.05,
            rotation: 5,
            duration: 0.3,
            ease: 'power2.out'
        });
    }
});

document.addEventListener('mouseout', (e) => {
    if (e.target.matches('.hero-cta, .project-cta, .submit-btn')) {
        gsap.to(e.target, {
            scale: 1,
            duration: 0.2,
            ease: 'power2.out'
        });
    }
    
    if (e.target.matches('.project-card')) {
        gsap.to(e.target, {
            y: 0,
            scale: 1,
            duration: 0.3,
            ease: 'power2.out'
        });
    }
    
    if (e.target.matches('.skill-item')) {
        gsap.to(e.target, {
            y: 0,
            duration: 0.3,
            ease: 'power2.out'
        });
    }
    
    if (e.target.matches('.profile-frame')) {
        gsap.to(e.target, {
            scale: 1,
            rotation: 0,
            duration: 0.3,
            ease: 'power2.out'
        });
    }
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    const heroSection = document.querySelector('.hero-section');
    
    if (heroSection && scrollY < window.innerHeight) {
        gsap.set('.hero-bg', {
            y: scrollY * 0.5
        });
        
        gsap.set('.floating-orbs', {
            y: scrollY * 0.3
        });
    }
});

// Resize handler
window.addEventListener('resize', () => {
    // Close mobile menu on resize to desktop
    if (window.innerWidth > 768 && isMenuOpen) {
        closeMobileMenu();
    }
    
    // Refresh ScrollTrigger
    ScrollTrigger.refresh();
});

// Intersection Observer for additional animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            
            // Add specific animations for different elements
            if (entry.target.classList.contains('project-card')) {
                gsap.fromTo(entry.target, 
                    { opacity: 0, y: 50 },
                    { 
                        opacity: 1, 
                        y: 0, 
                        duration: 0.8, 
                        ease: 'power3.out' 
                    }
                );
            }
        }
    });
}, observerOptions);

// Observe elements when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const elementsToObserve = document.querySelectorAll('.project-card, .skill-item');
    elementsToObserve.forEach(el => observer.observe(el));
});

// Performance optimization
window.addEventListener('load', () => {
    // Preload critical images
    const criticalImages = [
        '/public/lovable-uploads/80dbe4e5-d79c-4292-b859-978bd6ef6ac1.png'
    ];
    
    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
});

// Error handling
window.addEventListener('error', (e) => {
    console.error('JavaScript error:', e.error);
});

// Debug mode (remove in production)
if (window.location.hash === '#debug') {
    document.body.style.outline = '2px solid red';
    console.log('Debug mode activated');
}


