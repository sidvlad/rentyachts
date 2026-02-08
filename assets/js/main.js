/**
 * Yacht Rental Cyprus - Main JavaScript
 */

document.addEventListener('DOMContentLoaded', function() {
  initMobileMenu();
  initYachtTabs();
  initFaqAccordion();
  initSmoothScroll();
  initHeaderScroll();
});

/**
 * Mobile menu toggle
 */
function initMobileMenu() {
  const menuBtn = document.querySelector('.mobile-menu-btn');
  const nav = document.querySelector('.nav');

  if (menuBtn && nav) {
    menuBtn.addEventListener('click', function() {
      nav.classList.toggle('active');
      menuBtn.classList.toggle('active');
    });

    // Close menu on link click
    const navLinks = nav.querySelectorAll('a');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('active');
        menuBtn.classList.remove('active');
      });
    });
  }
}

/**
 * Yacht category tabs
 */
function initYachtTabs() {
  const tabs = document.querySelectorAll('.yacht-tab');
  const cards = document.querySelectorAll('.yacht-card');

  if (tabs.length === 0 || cards.length === 0) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', function() {
      // Update active tab
      tabs.forEach(t => t.classList.remove('active'));
      this.classList.add('active');

      // Filter cards
      const category = this.dataset.category;

      cards.forEach(card => {
        if (category === 'all' || card.dataset.category === category) {
          card.style.display = 'block';
          card.style.animation = 'fadeInUp 0.4s ease-out forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/**
 * FAQ Accordion
 */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');

    if (question) {
      question.addEventListener('click', function() {
        // Close other items
        faqItems.forEach(other => {
          if (other !== item) {
            other.classList.remove('active');
          }
        });

        // Toggle current item
        item.classList.toggle('active');
      });
    }
  });
}

/**
 * Smooth scroll for anchor links
 */
function initSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');

      if (href === '#') return;

      const target = document.querySelector(href);

      if (target) {
        e.preventDefault();
        const headerHeight = document.querySelector('.header').offsetHeight;
        const targetPosition = target.offsetTop - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

/**
 * Header background on scroll
 */
function initHeaderScroll() {
  const header = document.querySelector('.header');

  if (!header) return;

  function updateHeader() {
    if (window.scrollY > 100) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', updateHeader);
  updateHeader();
}
