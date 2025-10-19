// Google Translate Initialization
function googleTranslateElementInit() {
    new google.translate.TranslateElement({
        pageLanguage: 'en',
        includedLanguages: 'en,ur,sd,skr,bal,ps',
        layout: google.translate.TranslateElement.InlineLayout.SIMPLE
    }, 'google_translate_element');
}

// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.getElementById('header');
    const backToTop = document.querySelector('.back-to-top');
    
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
        backToTop.classList.add('active');
    } else {
        header.classList.remove('scrolled');
        backToTop.classList.remove('active');
    }
});

// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        if (hamburger) hamburger.classList.remove('active');
        if (navMenu) navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            if (hamburger) hamburger.classList.remove('active');
            if (navMenu) navMenu.classList.remove('active');
        }
    });
});

// Hero carousel functionality
let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-slide');
const totalSlides = slides.length;

function showSlide(n) {
    // Mark current slide for exit animation
    if (slides[currentSlide]) {
        slides[currentSlide].classList.add('exit');
    }
    
    setTimeout(() => {
        slides.forEach(slide => {
            slide.classList.remove('active');
            slide.classList.remove('exit');
        });
        currentSlide = (n + totalSlides) % totalSlides;
        if (slides[currentSlide]) {
            slides[currentSlide].classList.add('active');
        }
    }, 1000); // Match the transition time
}

function nextSlide() {
    showSlide(currentSlide + 1);
}

// Change slide every 6 seconds if there are slides
if (slides.length > 0) {
    setInterval(nextSlide, 6000);
}

// Scroll animations
const fadeElements = document.querySelectorAll('.fade-in');

const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

fadeElements.forEach(element => {
    fadeInObserver.observe(element);
});

// Counter animation
const counterElements = document.querySelectorAll('.counter');

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = +entry.target.getAttribute('data-target');
            const count = +entry.target.innerText;
            const increment = target / 100;
            
            if (count < target) {
                entry.target.innerText = Math.ceil(count + increment);
                setTimeout(() => {
                    counterObserver.observe(entry.target);
                }, 20);
            } else {
                entry.target.innerText = target.toLocaleString();
            }
        }
    });
}, { threshold: 0.5 });

counterElements.forEach(element => {
    counterObserver.observe(element);
});

// Back to top functionality
document.querySelector('.back-to-top').addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Modal functionality
function openModal(modalId) {
    document.getElementById(modalId).style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    document.querySelectorAll('.modal').forEach(modal => {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
});

// Form functionality
function openForm(formId) {
    document.getElementById(formId).style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeForm(formId) {
    document.getElementById(formId).style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Close form when clicking outside
window.addEventListener('click', (e) => {
    document.querySelectorAll('.form-modal').forEach(form => {
        if (e.target === form) {
            form.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
});

// Form submission
document.addEventListener('DOMContentLoaded', function() {
    const donationForm = document.getElementById('donation-form');
    const volunteerForm = document.getElementById('volunteer-form-data');
    const partnerForm = document.getElementById('partner-form-data');
    
    if (donationForm) {
        donationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your donation! We will contact you shortly.');
            closeForm('donate-form');
        });
    }
    
    if (volunteerForm) {
        volunteerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your interest in volunteering! We will contact you shortly.');
            closeForm('volunteer-form');
        });
    }
    
    if (partnerForm) {
        partnerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your partnership interest! We will contact you shortly.');
            closeForm('partner-form');
        });
    }
});
