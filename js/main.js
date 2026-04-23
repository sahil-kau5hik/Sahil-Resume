/**
 * Sahil Kaushik — Portfolio Website
 * Main JavaScript
 * Handles navigation, contact form (EmailJS), animations, and interactions
 */

// ============================================
// DOM Content Loaded
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initContactForm();
    initScrollEffects();
    initBackToTop();
    initLazyLoading();
    initCurrentYear();
    initSmoothScroll();
    initCertificateModal();
    initResumeDownload();
});

// ============================================
// Navigation
// ============================================
function initNavigation() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-menu a');

    // Mobile menu toggle
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
            navToggle.setAttribute('aria-expanded', navMenu.classList.contains('active'));
        });
    }

    // Close menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!navMenu || !navToggle) return;
        const isClickInsideNav = navMenu.contains(event.target) || navToggle.contains(event.target);
        if (!isClickInsideNav && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
        }
    });

    // Active nav link on scroll
    const sections = document.querySelectorAll('.section, .hero');
    const navItems = document.querySelectorAll('.nav-menu a');

    function updateActiveNav() {
        let current = '';
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav);
}

// ============================================
// Contact Form — EmailJS
//
// HOW TO SET UP:
// 1. Go to https://emailjs.com and log in
// 2. Add an Email Service (Gmail recommended) → note the Service ID
// 3. Create an Email Template → note the Template ID
//    Template variables to use: {{from_name}}, {{from_email}}, {{subject}}, {{message}}
// 4. Replace the placeholders below with your real IDs
//
// Public Key  : K6rXzEU1RNb3kXih2   ← already set
// Service ID  : YOUR_SERVICE_ID      ← replace this
// Template ID : YOUR_TEMPLATE_ID     ← replace this
// ============================================
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');

    if (!contactForm) return;

    // ✅ Public Key is set — DO NOT change this
    if (typeof emailjs !== 'undefined') {
        emailjs.init('K6rXzEU1RNb3kXih2');
    }

    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        // Get form data
        const formData = {
            name:    document.getElementById('name').value.trim(),
            email:   document.getElementById('email').value.trim(),
            subject: document.getElementById('subject').value.trim() || 'Portfolio Contact',
            message: document.getElementById('message').value.trim()
        };

        // Validate
        if (!formData.name || !formData.email || !formData.message) {
            showFormMessage('Please fill in all required fields.', 'error');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            showFormMessage('Please enter a valid email address.', 'error');
            return;
        }

        // Button loading state
        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalHTML = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

        try {
            const response = await fetch('https://formspree.io/kaushik93503@gmail.com', {
                method: 'POST',
                body: new FormData(contactForm),
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                showFormMessage('✅ Message sent! I\'ll get back to you soon.', 'success');
                contactForm.reset();
            } else {
                throw new Error('Send failed');
            }

        } catch (error) {
            console.error('Submission error:', error);
            showFormMessage('❌ Failed to send message. Please try again or use the email link.', 'error');
        } finally {
            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalHTML;
            }, 2000);
        }
    });

    function showFormMessage(message, type) {
        if (!formMessage) return;

        formMessage.textContent = message;
        formMessage.className = `form-message ${type}`;
        formMessage.setAttribute('role', 'alert');
        formMessage.style.display = 'block';
        formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

        const timeout = type === 'success' ? 8000 : 5000;
        setTimeout(() => {
            formMessage.className = 'form-message';
            formMessage.textContent = '';
            formMessage.style.display = 'none';
        }, timeout);
    }
}

// ============================================
// Scroll Effects
// ============================================
function initScrollEffects() {
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', function() {
        if (!navbar) return;
        if (window.pageYOffset > 100) {
            navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
        }
    });

    // Fade-in on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    const animateElements = document.querySelectorAll(
        '.section, .project-card, .skill-category, .certification-card, ' +
        '.achievement-card, .strength-card, .timeline-item, .experience-card'
    );

    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// ============================================
// Back to Top Button
// ============================================
function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    if (!backToTopBtn) return;

    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ============================================
// Lazy Loading Images
// ============================================
function initLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');

    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('loaded');
                    observer.unobserve(entry.target);
                }
            });
        });
        images.forEach(img => imageObserver.observe(img));
    } else {
        images.forEach(img => img.classList.add('loaded'));
    }
}

// ============================================
// Current Year in Footer
// ============================================
function initCurrentYear() {
    const yearEl = document.getElementById('currentYear');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
}

// ============================================
// Smooth Scroll
// ============================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#' || href === '#!') return;

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ============================================
// Certificate Modal Logic
// ============================================
function initCertificateModal() {
    const modal = document.getElementById('certModal');
    const modalImg = document.getElementById('certImage');
    const modalPdf = document.getElementById('certPdf');
    const modalTitle = document.getElementById('modalTitle');
    const closeModal = document.querySelector('.close-modal');
    
    function openModal(title, file, type) {
        if (!modal) return;
        
        modalTitle.textContent = title;
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';

        if (type === 'pdf') {
            modalImg.style.display = 'none';
            modalPdf.style.display = 'block';
            modalPdf.src = file;
        } else {
            modalPdf.style.display = 'none';
            modalImg.style.display = 'block';
            modalImg.src = file;
        }
    }

    function hideModal() {
        if (!modal) return;
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        modalImg.src = '';
        modalPdf.src = '';
    }
    
    // NCC Trigger
    const nccTrigger = document.getElementById('viewNccCert');
    if (nccTrigger) {
        nccTrigger.addEventListener('click', () => openModal('NCC Certificate', 'assets/NCC Certificate.jpeg', 'image'));
    }

    // AI Trigger
    const aiTrigger = document.getElementById('viewAiCert');
    if (aiTrigger) {
        aiTrigger.addEventListener('click', () => openModal('Artificial Intelligence Certificate', 'assets/AI simplilearn.pdf', 'pdf'));
    }

    // ML Trigger
    const mlTrigger = document.getElementById('viewMlCert');
    if (mlTrigger) {
        mlTrigger.addEventListener('click', () => openModal('Machine Learning Certificate', 'assets/Machine learning simplilearn.pdf', 'pdf'));
    }

    // SIH Trigger
    const sihTrigger = document.getElementById('viewSihCert');
    if (sihTrigger) {
        sihTrigger.addEventListener('click', () => openModal('Smart India Hackathon Certificate', 'assets/SIH Certificate.jpeg', 'image'));
    }

    // PIET Trigger
    const pietTrigger = document.getElementById('viewPietCert');
    if (pietTrigger) {
        pietTrigger.addEventListener('click', () => openModal('SSH-01 Hackathon PIET Certificate', 'assets/PIET hackathon.jpeg', 'image'));
    }

    // Resume Trigger
    const resumeTrigger = document.getElementById('viewResumeBtn');
    if (resumeTrigger) {
        resumeTrigger.addEventListener('click', () => openModal('Sahil Resume', 'assets/sahil_resume.pdf', 'pdf'));
    }

    // Close logic
    if (closeModal) closeModal.addEventListener('click', hideModal);
    
    window.addEventListener('click', (e) => {
        if (e.target === modal) hideModal();
    });

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'block') hideModal();
    });
}

// ============================================
// Utility: Debounce
// ============================================
function debounce(func, wait) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

// ============================================
// Utility: Throttle
// ============================================
function throttle(func, limit) {
    let inThrottle;
    return function() {
        if (!inThrottle) {
            func.apply(this, arguments);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ============================================
// Error Handling
// ============================================
window.addEventListener('error', function(e) {
    console.error('Portfolio error:', e.error);
});

// ============================================
// Console Message
// ============================================
console.log('%c👋 Hello! Welcome to Sahil\'s Portfolio', 'color: #a855f7; font-size: 20px; font-weight: bold;');
console.log('%cInterested in working together? Contact me at kaushik93503@gmail.com', 'color: #6b7280; font-size: 14px;');

// ============================================
// Resume Download Logic
// ============================================
function initResumeDownload() {
    const downloadBtns = document.querySelectorAll('a[download]');
    downloadBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            // Optional: Add any tracking or premium animations here
            console.log('Resume download started');
        });
    });
}
