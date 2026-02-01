/**
 * Yacht & Catamaran Rental - Main JavaScript
 * Handles navigation, catalog filtering, yacht detail rendering, and UI interactions
 */

document.addEventListener('DOMContentLoaded', function() {
  // Initialize language
  initLanguage();

  // Initialize mobile menu
  initMobileMenu();

  // Initialize language switcher
  initLanguageSwitcher();

  // Initialize page-specific functionality
  initPageFunctionality();

  // Initialize smooth scrolling
  initSmoothScroll();
});

/**
 * Initialize mobile menu toggle
 */
function initMobileMenu() {
  const menuToggle = document.querySelector('.mobile-menu-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const body = document.body;

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', function() {
      const isOpen = navMenu.classList.toggle('active');
      menuToggle.classList.toggle('active');
      body.classList.toggle('menu-open', isOpen);
      menuToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
      if (!menuToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('active');
        menuToggle.classList.remove('active');
        body.classList.remove('menu-open');
        menuToggle.setAttribute('aria-expanded', 'false');
      }
    });

    // Close menu when clicking a link
    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        menuToggle.classList.remove('active');
        body.classList.remove('menu-open');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }
}

/**
 * Initialize language switcher
 */
function initLanguageSwitcher() {
  const langButtons = document.querySelectorAll('.lang-btn');

  langButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      const lang = this.getAttribute('data-lang');
      setLanguage(lang);

      // Re-render dynamic content if on catalog or yacht page
      const currentPage = getCurrentPage();
      if (currentPage === 'catalog') {
        renderCatalog();
      } else if (currentPage === 'yacht') {
        renderYachtDetail();
      } else if (currentPage === 'home') {
        renderFleetSection();
        renderToursSection();
      }
    });
  });
}

/**
 * Get current page name
 */
function getCurrentPage() {
  const path = window.location.pathname;
  if (path.includes('catalog')) return 'catalog';
  if (path.includes('yacht')) return 'yacht';
  return 'home';
}

/**
 * Initialize page-specific functionality
 */
function initPageFunctionality() {
  const page = getCurrentPage();

  switch (page) {
    case 'home':
      renderFleetSection();
      renderToursSection();
      break;
    case 'catalog':
      initCatalogFilters();
      renderCatalog();
      break;
    case 'yacht':
      renderYachtDetail();
      initGallery();
      break;
  }
}

/**
 * Render fleet section on home page
 */
function renderFleetSection() {
  const fleetGrid = document.getElementById('fleet-grid');
  if (!fleetGrid) return;

  const lang = getCurrentLanguage();
  const featuredYachts = yachtsData.slice(0, 8);

  fleetGrid.innerHTML = featuredYachts.map(yacht => createYachtCard(yacht, lang)).join('');
}

/**
 * Render tours section on home page
 */
function renderToursSection() {
  const toursGrid = document.getElementById('tours-grid');
  if (!toursGrid) return;

  const lang = getCurrentLanguage();

  const tourCards = [
    {
      key: 'blueLagoon',
      descKey: 'blueLagoonDesc',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&h=400&fit=crop',
      duration: '8h',
      price: 95
    },
    {
      key: 'sunset',
      descKey: 'sunsetDesc',
      image: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=600&h=400&fit=crop',
      duration: '4h',
      price: 65
    },
    {
      key: 'fishing',
      descKey: 'fishingDesc',
      image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&h=400&fit=crop',
      duration: '6h',
      price: 120
    }
  ];

  toursGrid.innerHTML = tourCards.map(tour => `
    <a href="catalog.html" class="tour-card">
      <div class="tour-card-image">
        <img src="${tour.image}" alt="${t('tours.' + tour.key, lang)}" loading="lazy">
        <span class="tour-duration">${tour.duration}</span>
      </div>
      <div class="tour-card-content">
        <h3 class="tour-card-title">${t('tours.' + tour.key, lang)}</h3>
        <p class="tour-card-desc">${t('tours.' + tour.descKey, lang)}</p>
        <div class="tour-card-footer">
          <span class="tour-price">${t('tours.from', lang)} €${tour.price}</span>
          <span class="tour-cta">${t('tours.bookTour', lang)} →</span>
        </div>
      </div>
    </a>
  `).join('');
}

/**
 * Create yacht card HTML
 */
function createYachtCard(yacht, lang) {
  const typeLabels = {
    sailing: { en: 'Sailing', ru: 'Парусная', el: 'Ιστιοπλοϊκό' },
    motor: { en: 'Motor', ru: 'Моторная', el: 'Μηχανοκίνητο' },
    catamaran: { en: 'Catamaran', ru: 'Катамаран', el: 'Καταμαράν' }
  };

  return `
    <a href="yacht.html?id=${yacht.id}" class="yacht-card">
      <div class="yacht-card-image">
        <img src="${yacht.images[0]}" alt="${yacht.name}" loading="lazy">
        <span class="yacht-type-badge">${typeLabels[yacht.type][lang]}</span>
      </div>
      <div class="yacht-card-content">
        <h3 class="yacht-card-title">${yacht.name}</h3>
        <p class="yacht-card-desc">${yacht.shortDesc[lang]}</p>
        <div class="yacht-card-specs">
          <span class="spec">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
            ${yacht.guests} ${t('fleet.guests', lang)}
          </span>
          <span class="spec">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M2 4v16"></path>
              <path d="M22 4v16"></path>
              <path d="M6 4h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z"></path>
              <path d="M6 12h12"></path>
            </svg>
            ${yacht.cabins} ${t('fleet.cabins', lang)}
          </span>
          <span class="spec">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21.5 12H2.5"></path>
              <path d="M5.5 5.5L2.5 12l3 6.5"></path>
              <path d="M18.5 5.5l3 6.5-3 6.5"></path>
            </svg>
            ${yacht.length}${t('common.meters', lang)}
          </span>
        </div>
        <div class="yacht-card-footer">
          <span class="yacht-price">${t('fleet.from', lang)} €${yacht.priceFrom}<span class="per-day">${t('fleet.perDay', lang)}</span></span>
          <span class="yacht-cta">${t('fleet.viewDetails', lang)} →</span>
        </div>
      </div>
    </a>
  `;
}

/**
 * Initialize catalog filters
 */
function initCatalogFilters() {
  const filterButtons = document.querySelectorAll('.filter-btn');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      const filter = this.getAttribute('data-filter');

      // Update active state
      filterButtons.forEach(b => b.classList.remove('active'));
      this.classList.add('active');

      // Render filtered catalog
      renderCatalog(filter);
    });
  });
}

/**
 * Render catalog with optional filter
 */
function renderCatalog(filter = 'all') {
  const catalogGrid = document.getElementById('catalog-grid');
  if (!catalogGrid) return;

  const lang = getCurrentLanguage();
  let filteredYachts = yachtsData;

  if (filter !== 'all') {
    filteredYachts = yachtsData.filter(yacht => yacht.type === filter);
  }

  if (filteredYachts.length === 0) {
    catalogGrid.innerHTML = `<p class="no-results">${t('catalog.noResults', lang)}</p>`;
    return;
  }

  catalogGrid.innerHTML = filteredYachts.map(yacht => createYachtCard(yacht, lang)).join('');
}

/**
 * Get yacht by ID from URL
 */
function getYachtFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  return yachtsData.find(yacht => yacht.id === id);
}

/**
 * Render yacht detail page
 */
function renderYachtDetail() {
  const yacht = getYachtFromUrl();
  if (!yacht) {
    // Redirect to catalog if yacht not found
    window.location.href = 'catalog.html';
    return;
  }

  const lang = getCurrentLanguage();

  // Update page title
  document.title = `${yacht.name} - Yacht & Catamaran Rental`;

  // Update yacht name
  const nameEl = document.getElementById('yacht-name');
  if (nameEl) nameEl.textContent = yacht.name;

  // Update main image
  const mainImageEl = document.getElementById('yacht-main-image');
  if (mainImageEl) {
    mainImageEl.src = yacht.images[0];
    mainImageEl.alt = yacht.name;
  }

  // Update gallery thumbnails
  const galleryEl = document.getElementById('yacht-gallery');
  if (galleryEl) {
    galleryEl.innerHTML = yacht.images.map((img, index) => `
      <button class="gallery-thumb ${index === 0 ? 'active' : ''}" data-image="${img}">
        <img src="${img}" alt="${yacht.name} - Photo ${index + 1}" loading="lazy">
      </button>
    `).join('');
  }

  // Update specifications
  updateSpec('yacht-length', `${yacht.length}${t('common.meters', lang)}`);
  updateSpec('yacht-cabins', yacht.cabins);
  updateSpec('yacht-guests', yacht.guests);
  updateSpec('yacht-location', yacht.location);
  updateSpec('yacht-price', `€${yacht.priceFrom}`);

  // Update description
  const descEl = document.getElementById('yacht-description');
  if (descEl) descEl.textContent = yacht.fullDesc[lang];

  // Update amenities
  const amenitiesEl = document.getElementById('yacht-amenities');
  if (amenitiesEl) {
    amenitiesEl.innerHTML = yacht.amenities.map(amenity => {
      const amenityInfo = amenitiesMap[amenity];
      if (!amenityInfo) return '';
      return `
        <li class="amenity-item">
          <span class="material-icons">${amenityInfo.icon}</span>
          <span>${amenityInfo[lang]}</span>
        </li>
      `;
    }).join('');
  }

  // Render similar yachts
  renderSimilarYachts(yacht);
}

/**
 * Update specification element
 */
function updateSpec(id, value) {
  const el = document.getElementById(id);
  if (el) el.textContent = value;
}

/**
 * Render similar yachts
 */
function renderSimilarYachts(currentYacht) {
  const similarGrid = document.getElementById('similar-yachts');
  if (!similarGrid) return;

  const lang = getCurrentLanguage();
  const similarYachts = yachtsData
    .filter(yacht => yacht.type === currentYacht.type && yacht.id !== currentYacht.id)
    .slice(0, 3);

  if (similarYachts.length === 0) {
    similarGrid.parentElement.style.display = 'none';
    return;
  }

  similarGrid.innerHTML = similarYachts.map(yacht => createYachtCard(yacht, lang)).join('');
}

/**
 * Initialize gallery functionality
 */
function initGallery() {
  const gallery = document.getElementById('yacht-gallery');
  const mainImage = document.getElementById('yacht-main-image');

  if (!gallery || !mainImage) return;

  gallery.addEventListener('click', function(e) {
    const thumb = e.target.closest('.gallery-thumb');
    if (!thumb) return;

    const imageSrc = thumb.getAttribute('data-image');
    mainImage.src = imageSrc;

    // Update active state
    gallery.querySelectorAll('.gallery-thumb').forEach(t => t.classList.remove('active'));
    thumb.classList.add('active');
  });
}

/**
 * Initialize smooth scrolling for anchor links
 */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

/**
 * Booking modal functionality
 */
function openBookingModal() {
  const modal = document.getElementById('booking-modal');
  if (modal) {
    modal.classList.add('active');
    document.body.classList.add('modal-open');
  }
}

function closeBookingModal() {
  const modal = document.getElementById('booking-modal');
  if (modal) {
    modal.classList.remove('active');
    document.body.classList.remove('modal-open');
  }
}

// Handle booking form submission
document.addEventListener('submit', function(e) {
  if (e.target.id === 'booking-form') {
    e.preventDefault();
    const lang = getCurrentLanguage();

    // Show success message
    const form = e.target;
    form.innerHTML = `
      <div class="booking-success">
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
          <polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg>
        <p>${t('booking.success', lang)}</p>
      </div>
    `;

    setTimeout(closeBookingModal, 3000);
  }
});

// Close modal when clicking outside
document.addEventListener('click', function(e) {
  const modal = document.getElementById('booking-modal');
  if (modal && e.target === modal) {
    closeBookingModal();
  }
});

// Close modal on Escape key
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    closeBookingModal();
  }
});
