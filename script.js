/* ========================================
   SYD Events - Premium Event Management
   Interactive JavaScript
   ======================================== */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
  // Initialize all features
  initNavbar();
  initFloatingElements();
  initParallax();
  initScrollReveal();
  initPortfolioFilter();
  initCuisineTabs();
  initModal();
  initForms();
  initSmoothScroll();
});

/* ========================================
   Navigation
   ======================================== */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');
  
  // Scroll effect for navbar
  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
  
  // Mobile menu toggle
  navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
  });
  
  // Close mobile menu when clicking a link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      navToggle.classList.remove('active');
    });
  });
}

/* ========================================
   Floating Decorative Elements
   ======================================== */
function initFloatingElements() {
  const container = document.getElementById('floatingElements');
  if (!container) return;
  
  const elements = [];
  const elementTypes = ['petal', 'confetti', 'lantern'];
  const count = 30;
  
  for (let i = 0; i < count; i++) {
    const element = document.createElement('div');
    const type = elementTypes[Math.floor(Math.random() * elementTypes.length)];
    element.className = `floating-element ${type}`;
    
    // Random starting position
    element.style.left = `${Math.random() * 100}%`;
    element.style.top = `${100 + Math.random() * 20}%`;
    
    // Random animation delay and duration
    element.style.animationDelay = `${Math.random() * 20}s`;
    element.style.animationDuration = `${15 + Math.random() * 15}s`;
    
    // Random size variation
    const scale = 0.5 + Math.random() * 1;
    element.style.transform = `scale(${scale})`;
    
    container.appendChild(element);
    elements.push(element);
  }
  
  // Mouse movement effect
  document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX / window.innerWidth - 0.5;
    const mouseY = e.clientY / window.innerHeight - 0.5;
    
    elements.forEach((el, index) => {
      const speed = (index % 5 + 1) * 2;
      const x = mouseX * speed;
      const y = mouseY * speed;
      el.style.transform = `translate(${x}px, ${y}px)`;
    });
  });
}

/* ========================================
   3D Parallax Effects
   ======================================== */
function initParallax() {
  const parallaxElements = document.querySelectorAll('.parallax-element');
  
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    
    parallaxElements.forEach(el => {
      const speed = parseFloat(el.dataset.speed) || 0.5;
      const y = scrollY * speed;
      el.style.transform = `translateY(${y}px) scale(1.1)`;
    });
  });
  
  // Hero content parallax on mouse move
  const heroContent = document.querySelector('.hero-content');
  if (heroContent) {
    document.querySelector('.hero').addEventListener('mousemove', (e) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / 50;
      const y = (e.clientY - rect.top - rect.height / 2) / 50;
      
      heroContent.style.transform = `perspective(1000px) rotateX(${-y}deg) rotateY(${x}deg)`;
    });
    
    document.querySelector('.hero').addEventListener('mouseleave', () => {
      heroContent.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    });
  }
}

/* ========================================
   Scroll Reveal Animations
   ======================================== */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Optional: unobserve after revealing
        // revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  
  revealElements.forEach(el => {
    revealObserver.observe(el);
  });
}

/* ========================================
   Cultural Portfolio Filter
   ======================================== */
function initPortfolioFilter() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');
  
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active button
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      const filter = btn.dataset.filter;
      
      // Filter items with animation
      portfolioItems.forEach(item => {
        const culture = item.dataset.culture;
        
        if (filter === 'all' || culture === filter) {
          item.style.display = 'block';
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          }, 50);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.8)';
          setTimeout(() => {
            item.style.display = 'none';
          }, 400);
        }
      });
    });
  });
}

/* ========================================
   Cuisine Tabs (Interactive Menu)
   ======================================== */
function initCuisineTabs() {
  const tabButtons = document.querySelectorAll('.cuisine-tab');
  const contents = document.querySelectorAll('.cuisine-content');
  
  tabButtons.forEach(tab => {
    tab.addEventListener('click', () => {
      // Update active tab
      tabButtons.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      
      const cuisine = tab.dataset.cuisine;
      
      // Show corresponding content
      contents.forEach(content => {
        content.classList.remove('active');
      });
      
      const targetContent = document.getElementById(`cuisine-${cuisine}`);
      if (targetContent) {
        targetContent.classList.add('active');
      }
    });
  });
}

/* ========================================
   Inquiry Modal
   ======================================== */
function initModal() {
  const modal = document.getElementById('inquiryModal');
  const floatingBtn = document.getElementById('floatingCta');
  const closeBtn = document.getElementById('modalClose');
  
  // Open modal
  floatingBtn.addEventListener('click', () => {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  });
  
  // Close modal
  closeBtn.addEventListener('click', () => {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  });
  
  // Close on outside click
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
  
  // Close on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
}

/* ========================================
   Form Handling
   ======================================== */
function initForms() {
  const contactForm = document.getElementById('contactForm');
  const modalForm = document.getElementById('modalForm');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    // Show success message (in production, this would send to server)
    const button = e.target.querySelector('button[type="submit"]');
    const originalText = button.innerHTML;
    
    button.innerHTML = '<i class="fas fa-check"></i> Thank You!';
    button.disabled = true;
    button.style.background = '#28a745';
    
    // Reset form
    e.target.reset();
    
    // Close modal if it was the modal form
    if (e.target.id === 'modalForm') {
      setTimeout(() => {
        const modal = document.getElementById('inquiryModal');
        modal.classList.remove('active');
        document.body.style.overflow = '';
      }, 1500);
    }
    
    // Reset button after delay
    setTimeout(() => {
      button.innerHTML = originalText;
      button.disabled = false;
      button.style.background = '';
    }, 3000);
  };
  
  if (contactForm) {
    contactForm.addEventListener('submit', handleSubmit);
  }
  
  if (modalForm) {
    modalForm.addEventListener('submit', handleSubmit);
  }
}

/* ========================================
   Smooth Scroll
   ======================================== */
function initSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');
  
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href === '#') return;
      
      e.preventDefault();
      const target = document.querySelector(href);
      
      if (target) {
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

/* ========================================
   Image Lazy Loading Enhancement
   ======================================== */
document.addEventListener('DOMContentLoaded', () => {
  const images = document.querySelectorAll('img');
  
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
        }
        img.classList.add('loaded');
        imageObserver.unobserve(img);
      }
    });
  });
  
  images.forEach(img => {
    imageObserver.observe(img);
  });
});

/* ========================================
   Performance: Debounce & Throttle Utilities
   ======================================== */
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// Apply throttle to scroll events for better performance
window.addEventListener('scroll', throttle(() => {
  // Additional scroll effects can be added here
}, 16));
