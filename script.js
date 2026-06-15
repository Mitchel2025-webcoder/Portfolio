// ===========================
// MOBILE NAVIGATION TOGGLE
// ===========================

const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle mobile menu
if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        
        // Animate hamburger
        hamburger.style.transform = navMenu.classList.contains('active') 
            ? 'rotate(90deg)' 
            : 'rotate(0)';
    });
}

// Close menu when a link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.style.transform = 'rotate(0)';
    });
});

// ===========================
// FORM VALIDATION & SUBMISSION
// ===========================

const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

// Regular expressions for validation
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;

// Validation functions
function validateName(name) {
    return name.trim().length >= 2;
}

function validateEmail(email) {
    return emailRegex.test(email.trim());
}

function validatePhone(phone) {
    // Phone is optional, but if provided, must be valid
    if (phone.trim() === '') return true;
    return phone.trim().length >= 10;
}

function validateMessage(message) {
    return message.trim().length >= 10;
}

// Show error message
function showError(fieldId, errorId, message) {
    const field = document.getElementById(fieldId);
    const errorElement = document.getElementById(errorId);
    
    field.parentElement.classList.add('error');
    errorElement.textContent = message;
    errorElement.classList.add('show');
}

// Clear error message
function clearError(fieldId, errorId) {
    const field = document.getElementById(fieldId);
    const errorElement = document.getElementById(errorId);
    
    field.parentElement.classList.remove('error');
    errorElement.textContent = '';
    errorElement.classList.remove('show');
}

// Clear form status message
function clearFormStatus() {
    formStatus.textContent = '';
    formStatus.classList.remove('success', 'error');
}

// Validate form on submit
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const message = document.getElementById('message').value;

        let isValid = true;

        // Clear all errors first
        clearError('name', 'nameError');
        clearError('email', 'emailError');
        clearError('phone', 'phoneError');
        clearError('message', 'messageError');
        clearFormStatus();

        // Validate name
        if (!validateName(name)) {
            showError('name', 'nameError', 'Please enter a valid name (at least 2 characters)');
            isValid = false;
        }

        // Validate email
        if (!validateEmail(email)) {
            showError('email', 'emailError', 'Please enter a valid email address');
            isValid = false;
        }

        // Validate phone (optional but must be valid if provided)
        if (!validatePhone(phone)) {
            showError('phone', 'phoneError', 'Please enter a valid phone number (at least 10 digits)');
            isValid = false;
        }

        // Validate message
        if (!validateMessage(message)) {
            showError('message', 'messageError', 'Please enter a message (at least 10 characters)');
            isValid = false;
        }

        // If valid, submit form
        if (isValid) {
            submitForm(name, email, phone, message);
        }
    });
}

// Submit form (simulated - in production, this would send to a backend)
function submitForm(name, email, phone, message) {
    // Show loading state
    const submitBtn = contactForm.querySelector('.btn-submit');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    // Simulate form submission delay
    setTimeout(() => {
        // Create form data object
        const formData = {
            name: name,
            email: email,
            phone: phone,
            message: message,
            timestamp: new Date().toISOString()
        };

        // Log the form data (in production, send to backend/email service)
        console.log('Form submitted:', formData);

        // Show success message
        formStatus.textContent = 'Thank you! Your message has been sent successfully. I\'ll get back to you soon!';
        formStatus.classList.add('success');

        // Reset form
        contactForm.reset();

        // Restore button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;

        // Scroll to form status
        formStatus.scrollIntoView({ behavior: 'smooth', block: 'center' });

        // Clear success message after 5 seconds
        setTimeout(() => {
            clearFormStatus();
        }, 5000);
    }, 1500);
}

// ===========================
// REAL-TIME FORM VALIDATION
// ===========================

// Name validation
const nameInput = document.getElementById('name');
if (nameInput) {
    nameInput.addEventListener('blur', () => {
        if (nameInput.value.trim() === '') {
            clearError('name', 'nameError');
        } else if (!validateName(nameInput.value)) {
            showError('name', 'nameError', 'Please enter a valid name');
        } else {
            clearError('name', 'nameError');
        }
    });

    nameInput.addEventListener('input', () => {
        if (nameInput.parentElement.classList.contains('error')) {
            if (validateName(nameInput.value)) {
                clearError('name', 'nameError');
            }
        }
    });
}

// Email validation
const emailInput = document.getElementById('email');
if (emailInput) {
    emailInput.addEventListener('blur', () => {
        if (emailInput.value.trim() === '') {
            clearError('email', 'emailError');
        } else if (!validateEmail(emailInput.value)) {
            showError('email', 'emailError', 'Please enter a valid email address');
        } else {
            clearError('email', 'emailError');
        }
    });

    emailInput.addEventListener('input', () => {
        if (emailInput.parentElement.classList.contains('error')) {
            if (validateEmail(emailInput.value)) {
                clearError('email', 'emailError');
            }
        }
    });
}

// Phone validation
const phoneInput = document.getElementById('phone');
if (phoneInput) {
    phoneInput.addEventListener('blur', () => {
        if (phoneInput.value.trim() === '') {
            clearError('phone', 'phoneError');
        } else if (!validatePhone(phoneInput.value)) {
            showError('phone', 'phoneError', 'Please enter a valid phone number');
        } else {
            clearError('phone', 'phoneError');
        }
    });

    phoneInput.addEventListener('input', () => {
        if (phoneInput.parentElement.classList.contains('error')) {
            if (validatePhone(phoneInput.value)) {
                clearError('phone', 'phoneError');
            }
        }
    });
}

// Message validation
const messageInput = document.getElementById('message');
if (messageInput) {
    messageInput.addEventListener('blur', () => {
        if (messageInput.value.trim() === '') {
            clearError('message', 'messageError');
        } else if (!validateMessage(messageInput.value)) {
            showError('message', 'messageError', 'Please enter a message (at least 10 characters)');
        } else {
            clearError('message', 'messageError');
        }
    });

    messageInput.addEventListener('input', () => {
        if (messageInput.parentElement.classList.contains('error')) {
            if (validateMessage(messageInput.value)) {
                clearError('message', 'messageError');
            }
        }
    });
}

// ===========================
// SMOOTH SCROLL OFFSET FOR FIXED NAVBAR
// ===========================

// This ensures sections scroll to the correct position accounting for the fixed navbar
document.addEventListener('click', (e) => {
    if (e.target.matches('.nav-link[href^="#"]')) {
        const targetId = e.target.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            const navHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = targetElement.offsetTop - navHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    }
});

// ===========================
// SCROLL ANIMATIONS
// ===========================

// Intersection Observer for fade-in animations on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe skill cards, project cards, and timeline items
document.querySelectorAll('.skill-card, .project-card, .timeline-item').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// ===========================
// KEYBOARD NAVIGATION SUPPORT
// ===========================

// Improve keyboard navigation for accessibility
document.addEventListener('keydown', (e) => {
    // Close mobile menu on Escape
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        hamburger.style.transform = 'rotate(0)';
    }
});

// ===========================
// FORM INPUT FORMATTING
// ===========================

// Auto-format phone number as user types
if (phoneInput) {
    phoneInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 0) {
            if (value.length <= 3) {
                value = value;
            } else if (value.length <= 6) {
                value = value.slice(0, 3) + ' ' + value.slice(3);
            } else if (value.length <= 10) {
                value = value.slice(0, 3) + ' ' + value.slice(3, 6) + ' ' + value.slice(6);
            } else {
                value = value.slice(0, 3) + ' ' + value.slice(3, 6) + ' ' + value.slice(6, 10);
            }
        }
        e.target.value = value;
    });
}

// ===========================
// ACTIVE NAVIGATION LINK
// ===========================

// Update active nav link based on scroll position
window.addEventListener('scroll', () => {
    let current = '';
    
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.style.color = 'var(--primary-color)';
        } else {
            link.style.color = 'var(--text-dark)';
        }
    });
});

// ===========================
// LOG MESSAGE ON LOAD
// ===========================

console.log('Welcome to Newsong\'s Portfolio! 🚀');
console.log('Feel free to connect via the contact form or reach out directly at brocodex64@gmail.com');
