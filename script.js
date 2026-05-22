// ========================================
// DOM Elements
// ========================================
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const backToTopBtn = document.getElementById('backToTop');
const newsletterForm = document.getElementById('newsletterForm');
const contactForm = document.getElementById('contactForm');

// ========================================
// Mobile Navigation Toggle
// ========================================
if (hamburger) {
  hamburger.addEventListener('click', () => {
    const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
    hamburger.setAttribute('aria-expanded', !isExpanded);
    navLinks.classList.toggle('active');
  });
}

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
    if (hamburger) {
      hamburger.setAttribute('aria-expanded', 'false');
    }
  });
});

// ========================================
// Smooth Scroll for Anchor Links
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      e.preventDefault();
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// ========================================
// Active Nav Link Highlighting
// ========================================
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a[href^="#"]');

function highlightActiveNav() {
  const scrollPosition = window.scrollY + 100;
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionBottom = sectionTop + section.offsetHeight;
    const sectionId = section.getAttribute('id');
    
    if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
      navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === `#${sectionId}`) {
          item.classList.add('active');
        }
      });
    }
  });
}

window.addEventListener('scroll', highlightActiveNav);
highlightActiveNav();

// ========================================
// Back to Top Button
// ========================================
window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    backToTopBtn.classList.add('show');
  } else {
    backToTopBtn.classList.remove('show');
  }
});

if (backToTopBtn) {
  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// ========================================
// Newsletter Form Validation
// ========================================
if (newsletterForm) {
  newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const emailInput = document.getElementById('newsletterEmail');
    const email = emailInput.value.trim();
    const messageDiv = document.getElementById('newsletterMessage');
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!email) {
      showFormMessage(messageDiv, 'Please enter your email address', 'error');
      emailInput.focus();
      return;
    }
    
    if (!emailRegex.test(email)) {
      showFormMessage(messageDiv, 'Please enter a valid email address', 'error');
      emailInput.focus();
      return;
    }
    
    // Simulate successful submission
    showFormMessage(messageDiv, 'Thanks for subscribing! Check your inbox soon.', 'success');
    newsletterForm.reset();
    
    // In production, you would send this to your backend
    console.log('Newsletter signup:', email);
  });
}

// ========================================
// Contact Form Validation
// ========================================
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('contactName');
    const email = document.getElementById('contactEmail');
    const message = document.getElementById('contactMessage');
    const messageDiv = document.getElementById('contactFormMessage');
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!name.value.trim()) {
      showFormMessage(messageDiv, 'Please enter your name', 'error');
      name.focus();
      return;
    }
    
    if (!email.value.trim()) {
      showFormMessage(messageDiv, 'Please enter your email address', 'error');
      email.focus();
      return;
    }
    
    if (!emailRegex.test(email.value.trim())) {
      showFormMessage(messageDiv, 'Please enter a valid email address', 'error');
      email.focus();
      return;
    }
    
    if (!message.value.trim()) {
      showFormMessage(messageDiv, 'Please enter your message', 'error');
      message.focus();
      return;
    }
    
    // Simulate successful submission
    showFormMessage(messageDiv, 'Message sent successfully! We\'ll get back to you soon.', 'success');
    contactForm.reset();
    
    // In production, you would send this to your backend
    console.log('Contact form submission:', {
      name: name.value.trim(),
      email: email.value.trim(),
      message: message.value.trim()
    });
  });
}

// ========================================
// Helper function to show form messages
// ========================================
function showFormMessage(element, message, type) {
  element.textContent = message;
  element.className = `form-message ${type}`;
  
  // Clear message after 5 seconds
  setTimeout(() => {
    element.textContent = '';
    element.className = 'form-message';
  }, 5000);
}

// ========================================
// Button Click Handlers (for demo purposes)
// ========================================
const trialBtn = document.getElementById('trialBtn');
if (trialBtn) {
  trialBtn.addEventListener('click', (e) => {
    e.preventDefault();
    alert('🎉 Start your 7-day free trial! Contact us or visit the gym to sign up.');
  });
}

const virtualTourBtn = document.getElementById('virtualTourBtn');
if (virtualTourBtn) {
  virtualTourBtn.addEventListener('click', (e) => {
    e.preventDefault();
    alert('🏋️ Virtual tour coming soon! Visit our YouTube channel for gym walkthroughs.');
  });
}

document.querySelectorAll('.btn-plan, .cta-trial, .cta-chat').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    alert('💪 Thanks for your interest! Our team will contact you shortly.');
  });
});

// ========================================
// Intersection Observer for Animations
// ========================================
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Apply fade-in animation to elements
document.querySelectorAll('.feature-card, .class-item, .testimonial-card, .pricing-card, .gallery-img').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});

// ========================================
// Lazy Loading Enhancement
// ========================================
// Images already have loading="lazy" attribute
// Additional check for browsers that don't support it
if ('loading' in HTMLImageElement.prototype === false) {
  const lazyImages = document.querySelectorAll('img[loading="lazy"]');
  const lazyImageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
        }
        lazyImageObserver.unobserve(img);
      }
    });
  });
  
  lazyImages.forEach(img => {
    if (img.src && img.src.includes('pexels')) {
      // Already has src, just observe
      lazyImageObserver.observe(img);
    }
  });
}

console.log('Iron Forge Fitness — Website loaded successfully!');