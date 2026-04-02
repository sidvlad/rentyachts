/**
 * ON THE SEA - Luxury Yacht Charter
 * Main Application JavaScript
 */

(function() {
    'use strict';

    // ============================================
    // Global State
    // ============================================
    const state = {
        currentLang: localStorage.getItem('lang') || 'en',
        texts: null,
        yachts: null,
        services: null,
        currentSlide: 0
    };

    // Default to English if no saved preference
    if (!localStorage.getItem('lang')) {
        localStorage.setItem('lang', 'en');
    }

    // ============================================
    // Utility Functions
    // ============================================
    function getUrlParam(param) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    }

    function getText(key) {
        if (!state.texts) return key;
        const keys = key.split('.');
        let value = state.texts;
        for (const k of keys) {
            if (value && value[k] !== undefined) {
                value = value[k];
            } else {
                return key;
            }
        }
        if (typeof value === 'object' && value[state.currentLang] !== undefined) {
            return value[state.currentLang];
        }
        return value || key;
    }

    function formatPrice(price, currency = 'EUR') {
        return `€${price.toLocaleString()}`;
    }

    // ============================================
    // Data Loading
    // ============================================
    async function loadData() {
        try {
            const [textsRes, yachtsRes, servicesRes] = await Promise.all([
                fetch('content/site-texts.json'),
                fetch('content/yachts.json'),
                fetch('content/services.json')
            ]);

            state.texts = await textsRes.json();
            const yachtsData = await yachtsRes.json();
            const servicesData = await servicesRes.json();

            state.yachts = yachtsData.yachts;
            state.yachtOptions = yachtsData.options;
            state.services = servicesData.services;
            state.serviceIncludes = servicesData.includes;

            return true;
        } catch (error) {
            console.error('Error loading data:', error);
            return false;
        }
    }

    // ============================================
    // i18n (Internationalization)
    // ============================================
    function applyTranslations() {
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            const text = getText(key);
            if (text && text !== key) {
                // Use innerHTML for elements that might contain HTML (like <br>)
                if (text.includes('<br>') || text.includes('<')) {
                    el.innerHTML = text;
                } else {
                    el.textContent = text;
                }
            }
        });

        // Update page title
        const pageTitle = getText('meta.title');
        if (pageTitle) {
            document.title = pageTitle;
        }

        // Update html lang attribute
        document.documentElement.lang = state.currentLang;
    }

    function setLanguage(lang) {
        state.currentLang = lang;
        localStorage.setItem('lang', lang);

        // Update active buttons
        updateLangButtons();

        applyTranslations();

        // Re-render dynamic content
        const page = document.body.className;
        if (page.includes('page-yacht')) {
            renderYachtDetail();
        } else if (page.includes('page-catalog')) {
            renderCatalog();
        } else if (page.includes('page-service')) {
            renderServiceDetail();
        } else if (page.includes('page-tour')) {
            renderTourPage();
        } else {
            renderHomePage();
        }
    }

    function initLanguageSwitcher() {
        document.querySelectorAll('[data-lang]').forEach(btn => {
            btn.addEventListener('click', () => {
                const lang = btn.getAttribute('data-lang');
                setLanguage(lang);

                // If clicked from mobile menu, close it
                if (btn.classList.contains('mobile-menu__lang-btn')) {
                    closeMobileMenu();
                }
            });
        });

        // Set initial active state
        updateLangButtons();
    }

    function updateLangButtons() {
        document.querySelectorAll('[data-lang]').forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-lang') === state.currentLang);
        });
    }

    // ============================================
    // Mobile Menu
    // ============================================
    function initMobileMenu() {
        const burgerBtn = document.getElementById('burgerBtn');
        const mobileMenu = document.getElementById('mobileMenu');

        if (burgerBtn && mobileMenu) {
            burgerBtn.addEventListener('click', () => {
                const isActive = mobileMenu.classList.contains('active');
                if (isActive) {
                    closeMobileMenu();
                } else {
                    mobileMenu.classList.add('active');
                    burgerBtn.classList.add('active');
                    document.body.style.overflow = 'hidden';
                }
            });
        }

        // Close on link click (for links with data-close attribute or anchor links)
        document.querySelectorAll('.mobile-menu__link').forEach(link => {
            link.addEventListener('click', (e) => {
                // Only close if it's an anchor link on the same page
                const href = link.getAttribute('href');
                if (href && href.startsWith('#')) {
                    closeMobileMenu();
                } else if (link.hasAttribute('data-close')) {
                    closeMobileMenu();
                }
            });
        });

        // Close on overlay click (clicking outside content)
        if (mobileMenu) {
            mobileMenu.addEventListener('click', (e) => {
                if (e.target === mobileMenu) {
                    closeMobileMenu();
                }
            });
        }
    }

    function closeMobileMenu() {
        const mobileMenu = document.getElementById('mobileMenu');
        const burgerBtn = document.getElementById('burgerBtn');
        if (mobileMenu) {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
        if (burgerBtn) {
            burgerBtn.classList.remove('active');
        }
    }

    // ============================================
    // Header Scroll Effect
    // ============================================
    function initHeaderScroll() {
        const header = document.getElementById('header');
        if (!header) return;

        // Check initial scroll position
        if (window.pageYOffset > 50) {
            header.classList.add('header--scrolled');
        }

        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 50) {
                header.classList.add('header--scrolled');
            }
        });
    }

    // ============================================
    // Image Slider
    // ============================================
    function initSlider(images) {
        const container = document.getElementById('yachtSliderContainer');
        const thumbsContainer = document.getElementById('yachtSliderThumbs');
        const prevBtn = document.getElementById('sliderPrev');
        const nextBtn = document.getElementById('sliderNext');

        if (!container || !images || images.length === 0) return;

        // Render slides
        container.innerHTML = images.map((img, i) => `
            <div class="yacht-slider__slide ${i === 0 ? 'active' : ''}" data-index="${i}">
                <img src="${img}" alt="Yacht image ${i + 1}">
            </div>
        `).join('');

        // Render thumbnails
        if (thumbsContainer) {
            thumbsContainer.innerHTML = images.map((img, i) => `
                <button class="yacht-slider__thumb ${i === 0 ? 'active' : ''}" data-index="${i}">
                    <img src="${img}" alt="Thumbnail ${i + 1}">
                </button>
            `).join('');

            // Thumbnail click handlers
            thumbsContainer.querySelectorAll('.yacht-slider__thumb').forEach(thumb => {
                thumb.addEventListener('click', () => {
                    goToSlide(parseInt(thumb.getAttribute('data-index')));
                });
            });
        }

        // Navigation buttons
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                goToSlide(state.currentSlide - 1);
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                goToSlide(state.currentSlide + 1);
            });
        }

        // Touch/swipe support
        let touchStartX = 0;
        let touchEndX = 0;

        container.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        container.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });

        function handleSwipe() {
            const swipeThreshold = 50;
            const diff = touchStartX - touchEndX;

            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    goToSlide(state.currentSlide + 1);
                } else {
                    goToSlide(state.currentSlide - 1);
                }
            }
        }

        function goToSlide(index) {
            const slides = container.querySelectorAll('.yacht-slider__slide');
            const totalSlides = slides.length;

            // Loop around
            if (index < 0) index = totalSlides - 1;
            if (index >= totalSlides) index = 0;

            state.currentSlide = index;

            // Update slides
            slides.forEach((slide, i) => {
                slide.classList.toggle('active', i === index);
            });

            // Update thumbnails
            if (thumbsContainer) {
                thumbsContainer.querySelectorAll('.yacht-slider__thumb').forEach((thumb, i) => {
                    thumb.classList.toggle('active', i === index);
                });
            }
        }
    }

    // ============================================
    // Home Page Rendering
    // ============================================
    function renderHomePage() {
        renderFeaturedYachts();
        renderTours();
        renderCities();
    }

    function renderFeaturedYachts() {
        const grid = document.getElementById('yachtsGrid');
        if (!grid || !state.yachts) return;

        const featuredYachts = state.yachts.filter(y => y.featured);

        grid.innerHTML = featuredYachts.map(yacht => `
            <a href="yacht.html?slug=${yacht.slug}" class="yacht-card">
                <div class="yacht-card__image">
                    <img src="${yacht.images[0]}" alt="${yacht.name[state.currentLang]}">
                </div>
                <div class="yacht-card__content">
                    <h3 class="yacht-card__name">${yacht.name[state.currentLang]}</h3>
                    <div class="yacht-card__price">
                        <span class="yacht-card__price-label">${getText('yacht.from')}</span>
                        <span class="yacht-card__price-value">€${yacht.price}</span>
                        <span class="yacht-card__price-period">/ ${getText('yacht.hour')}</span>
                    </div>
                    <div class="yacht-card__specs">
                        <div class="yacht-card__spec">
                            <span class="yacht-card__spec-label">${getText('yacht.size')}:</span>
                            <span class="yacht-card__spec-value">
                                <img src="assets/img/icons/ruler.svg" alt="" class="yacht-card__spec-icon">
                                ${yacht.length} ${getText('yacht.metersShort')}
                            </span>
                        </div>
                        <div class="yacht-card__spec">
                            <span class="yacht-card__spec-label">${getText('yacht.guestsLabel')}:</span>
                            <span class="yacht-card__spec-value">
                                <img src="assets/img/icons/people.svg" alt="" class="yacht-card__spec-icon">
                                ${yacht.guests}
                            </span>
                        </div>
                        <div class="yacht-card__spec">
                            <span class="yacht-card__spec-label">${getText('yacht.yearLabel')}:</span>
                            <span class="yacht-card__spec-value">
                                <img src="assets/img/icons/ancor.png" alt="" class="yacht-card__spec-icon">
                                ${yacht.year}
                            </span>
                        </div>
                    </div>
                    <div class="yacht-card__footer">
                        <span class="yacht-card__order">${getText('yacht.order')}</span>
                        <div class="yacht-card__location">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                            ${yacht.location ? yacht.location[state.currentLang] : getText('cities.limassol')}
                        </div>
                    </div>
                </div>
            </a>
        `).join('');
    }

    function renderTours() {
        const grid = document.getElementById('toursGrid');
        if (!grid || !state.services) return;

        grid.innerHTML = state.services.map(service => `
            <a href="tour.html?slug=${service.slug}" class="tour-card">
                <div class="tour-card__image">
                    <img src="${service.image}" alt="${service.name[state.currentLang]}">
                </div>
                <div class="tour-card__content">
                    <h3 class="tour-card__name">${service.name[state.currentLang]}</h3>
                </div>
            </a>
        `).join('');
    }

    function renderServices() {
        const grid = document.getElementById('servicesGrid');
        if (!grid || !state.services) return;

        grid.innerHTML = state.services.map(service => `
            <a href="service.html?slug=${service.slug}" class="service-card">
                <div class="service-card__image">
                    <img src="${service.image}" alt="${service.name[state.currentLang]}">
                </div>
                <div class="service-card__content">
                    <h3 class="service-card__name">${service.name[state.currentLang]}</h3>
                    <p class="service-card__description">${service.shortDescription[state.currentLang]}</p>
                    <div class="service-card__footer">
                        <span class="service-card__price">
                            ${getText('yacht.from')} ${formatPrice(service.price)}
                        </span>
                        <span class="service-card__cta">${getText('yacht.viewDetails')}</span>
                    </div>
                </div>
            </a>
        `).join('');
    }

    function renderCities() {
        const grid = document.getElementById('citiesGrid');
        if (!grid || !state.texts || !state.texts.cities) return;

        grid.innerHTML = state.texts.cities.map(city => `
            <div class="city-card">
                <div class="city-card__image">
                    <img src="${city.image}" alt="${city.name[state.currentLang]}">
                </div>
                <h3 class="city-card__name">${city.name[state.currentLang]}</h3>
            </div>
        `).join('');
    }

    // ============================================
    // Catalog Page Rendering
    // ============================================
    function renderCatalog() {
        const grid = document.getElementById('catalogGrid');
        const noResults = document.getElementById('noResults');
        if (!grid || !state.yachts) return;

        let yachts = [...state.yachts];

        // Apply filters
        const filterGuests = document.getElementById('filterGuests')?.value;
        const filterPrice = document.getElementById('filterPrice')?.value;
        const sortBy = document.getElementById('sortBy')?.value;

        if (filterGuests) {
            const maxGuests = parseInt(filterGuests);
            if (maxGuests === 14) {
                yachts = yachts.filter(y => y.guests >= 14);
            } else {
                yachts = yachts.filter(y => y.guests <= maxGuests);
            }
        }

        if (filterPrice) {
            const priceLevel = parseInt(filterPrice);
            if (priceLevel === 1500) {
                yachts = yachts.filter(y => y.price < 1500);
            } else if (priceLevel === 2500) {
                yachts = yachts.filter(y => y.price >= 1500 && y.price < 2500);
            } else if (priceLevel === 3500) {
                yachts = yachts.filter(y => y.price >= 2500 && y.price < 3500);
            } else if (priceLevel === 9999) {
                yachts = yachts.filter(y => y.price >= 3500);
            }
        }

        // Apply sorting
        if (sortBy === 'priceLow') {
            yachts.sort((a, b) => a.price - b.price);
        } else if (sortBy === 'priceHigh') {
            yachts.sort((a, b) => b.price - a.price);
        } else if (sortBy === 'newest') {
            yachts.sort((a, b) => b.year - a.year);
        } else {
            // Default: featured first
            yachts.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        }

        // Show/hide no results message
        if (noResults) {
            noResults.style.display = yachts.length === 0 ? 'flex' : 'none';
        }

        grid.innerHTML = yachts.map(yacht => `
            <a href="yacht.html?slug=${yacht.slug}" class="yacht-card">
                <div class="yacht-card__image">
                    <img src="${yacht.images[0]}" alt="${yacht.name[state.currentLang]}">
                </div>
                <div class="yacht-card__content">
                    <h3 class="yacht-card__name">${yacht.name[state.currentLang]}</h3>
                    <div class="yacht-card__price">
                        <span class="yacht-card__price-label">${getText('yacht.from')}</span>
                        <span class="yacht-card__price-value">€${yacht.price}</span>
                        <span class="yacht-card__price-period">/ ${getText('yacht.hour')}</span>
                    </div>
                    <div class="yacht-card__specs">
                        <div class="yacht-card__spec">
                            <span class="yacht-card__spec-label">${getText('yacht.size')}:</span>
                            <span class="yacht-card__spec-value">
                                <img src="assets/img/icons/ruler.svg" alt="" class="yacht-card__spec-icon">
                                ${yacht.length} ${getText('yacht.metersShort')}
                            </span>
                        </div>
                        <div class="yacht-card__spec">
                            <span class="yacht-card__spec-label">${getText('yacht.guestsLabel')}:</span>
                            <span class="yacht-card__spec-value">
                                <img src="assets/img/icons/people.svg" alt="" class="yacht-card__spec-icon">
                                ${yacht.guests}
                            </span>
                        </div>
                        <div class="yacht-card__spec">
                            <span class="yacht-card__spec-label">${getText('yacht.yearLabel')}:</span>
                            <span class="yacht-card__spec-value">
                                <img src="assets/img/icons/ancor.png" alt="" class="yacht-card__spec-icon">
                                ${yacht.year}
                            </span>
                        </div>
                    </div>
                    <div class="yacht-card__footer">
                        <span class="yacht-card__order">${getText('yacht.order')}</span>
                        <div class="yacht-card__location">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                            ${yacht.location ? yacht.location[state.currentLang] : getText('cities.limassol')}
                        </div>
                    </div>
                </div>
            </a>
        `).join('');
    }

    function initCatalogFilters() {
        const filterGuests = document.getElementById('filterGuests');
        const filterPrice = document.getElementById('filterPrice');
        const sortBy = document.getElementById('sortBy');

        [filterGuests, filterPrice, sortBy].forEach(filter => {
            if (filter) {
                filter.addEventListener('change', renderCatalog);
            }
        });
    }

    // ============================================
    // Yacht Detail Page Rendering
    // ============================================
    function renderYachtDetail() {
        const slug = getUrlParam('slug');
        if (!slug || !state.yachts) return;

        const yacht = state.yachts.find(y => y.slug === slug);
        if (!yacht) {
            window.location.href = 'catalog.html';
            return;
        }

        // Update page title
        document.title = `${yacht.name[state.currentLang]} - ON THE SEA`;

        // Update basic info
        const nameEl = document.getElementById('yachtName');
        const priceEl = document.getElementById('yachtPrice');
        const stickyPriceEl = document.getElementById('stickyPrice');
        const lengthEl = document.getElementById('yachtLength');
        const guestsEl = document.getElementById('yachtGuests');
        const yearEl = document.getElementById('yachtYear');
        const descriptionEl = document.getElementById('yachtDescription');

        if (nameEl) nameEl.textContent = yacht.name[state.currentLang];
        if (priceEl) priceEl.textContent = formatPrice(yacht.price);
        if (stickyPriceEl) stickyPriceEl.textContent = formatPrice(yacht.price);
        if (lengthEl) lengthEl.textContent = `${yacht.length}${getText('yacht.meters')}`;
        if (guestsEl) guestsEl.textContent = yacht.guests;
        if (yearEl) yearEl.textContent = yacht.year;
        if (descriptionEl) descriptionEl.textContent = yacht.description[state.currentLang];

        // Render options
        const optionsGrid = document.getElementById('yachtOptions');
        if (optionsGrid && yacht.options && state.yachtOptions) {
            optionsGrid.innerHTML = yacht.options.map(optionKey => {
                const option = state.yachtOptions[optionKey];
                if (!option) return '';
                return `
                    <div class="yacht-option">
                        <i class="fas fa-${option.icon}"></i>
                        <span>${option.name[state.currentLang]}</span>
                    </div>
                `;
            }).join('');
        }

        // Render specs table
        const specsTable = document.getElementById('yachtSpecsTable');
        if (specsTable && yacht.specs) {
            const specKeys = ['length', 'beam', 'draft', 'engines', 'fuel', 'water', 'cabins', 'bathrooms'];
            specsTable.innerHTML = specKeys.map(key => {
                if (!yacht.specs[key]) return '';
                return `
                    <tr>
                        <td>${getText('specs.' + key)}</td>
                        <td>${yacht.specs[key]}</td>
                    </tr>
                `;
            }).join('');
        }

        // Initialize slider
        initSlider(yacht.images);
    }

    // ============================================
    // Tour Page Rendering
    // ============================================
    async function loadTourData() {
        try {
            const response = await fetch('content/tours.json');
            state.tours = await response.json();
            return true;
        } catch (error) {
            console.error('Error loading tour data:', error);
            return false;
        }
    }

    async function renderTourPage() {
        const slug = getUrlParam('slug');

        // Load tour data if not already loaded
        if (!state.tours) {
            await loadTourData();
        }

        if (!state.tours || !state.tours.tours) return;

        const tour = state.tours.tours.find(t => t.slug === slug);
        if (!tour) {
            // Default to birthday-yacht if no slug provided
            const defaultTour = state.tours.tours.find(t => t.slug === 'birthday-yacht') || state.tours.tours[0];
            if (defaultTour) {
                renderTourContent(defaultTour);
            }
            return;
        }

        renderTourContent(tour);
    }

    function renderTourContent(tour) {
        // Update page title
        document.title = `${tour.name[state.currentLang]} - ON THE SEA`;

        // Update tour title
        const titleEl = document.getElementById('tourTitle');
        if (titleEl) titleEl.textContent = tour.name[state.currentLang];

        // Update tour image
        const imageEl = document.getElementById('tourImage');
        if (imageEl && tour.image) {
            imageEl.src = tour.image;
            imageEl.alt = tour.name[state.currentLang];
        }

        // Update tour description
        const contentEl = document.getElementById('tourContent');
        if (contentEl && tour.description) {
            contentEl.innerHTML = tour.description[state.currentLang];
        }

        // Render yachts for this tour
        renderTourYachts();

        // Render tips
        if (tour.tips) {
            renderTourTips(tour.tips);
        }

        // Render reviews
        if (tour.reviews) {
            renderTourReviews(tour.reviews);
        }

        // Render similar tours
        renderSimilarTours(tour.similarTours || []);

        // Update booking/duration/contact texts from tours.json
        if (state.tours.booking) {
            const bookingText = document.querySelector('.tour-booking__text');
            if (bookingText) {
                bookingText.textContent = state.tours.booking.text[state.currentLang];
            }
        }

        if (state.tours.duration) {
            const durationText = document.querySelector('.tour-duration__text');
            if (durationText) {
                durationText.textContent = state.tours.duration.text[state.currentLang];
            }
        }

        if (state.tours.contact) {
            const contactTitle = document.querySelector('.tour-contact__title');
            if (contactTitle) {
                contactTitle.innerHTML = state.tours.contact.title[state.currentLang].replace(/\n/g, '<br>');
            }
        }
    }

    function renderTourYachts() {
        const grid = document.getElementById('tourYachtsGrid');
        if (!grid || !state.yachts) return;

        // Get featured yachts for the tour
        const featuredYachts = state.yachts.filter(y => y.featured).slice(0, 3);

        grid.innerHTML = featuredYachts.map(yacht => `
            <div class="tour-yacht-card">
                <div class="tour-yacht-card__image">
                    <img src="${yacht.images[0]}" alt="${yacht.name[state.currentLang]}">
                    <div class="tour-yacht-card__watermark">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><path d="M8 14 Q12 8 16 14"/></svg>
                        ON THE SEA
                    </div>
                </div>
                <div class="tour-yacht-card__body">
                    <h3 class="tour-yacht-card__name">${yacht.name[state.currentLang]}</h3>
                    <p class="tour-yacht-card__price">${getText('yacht.from')} <span>${formatPrice(yacht.price)} / ${getText('yacht.hour')}</span></p>
                    <div class="tour-yacht-card__specs">
                        <div class="tour-yacht-card__spec">
                            <p class="tour-yacht-card__spec-label">${getText('yacht.size')}:</p>
                            <p class="tour-yacht-card__spec-value">
                                <img src="assets/img/icons/ruler.svg" alt="" class="tour-yacht-card__spec-icon">
                                ${yacht.length} ${getText('yacht.metersShort')}
                            </p>
                        </div>
                        <div class="tour-yacht-card__spec">
                            <p class="tour-yacht-card__spec-label">${getText('yacht.guestsLabel')}:</p>
                            <p class="tour-yacht-card__spec-value">
                                <img src="assets/img/icons/people.svg" alt="" class="tour-yacht-card__spec-icon">
                                ${yacht.guests}
                            </p>
                        </div>
                        <div class="tour-yacht-card__spec">
                            <p class="tour-yacht-card__spec-label">${getText('yacht.yearLabel')}:</p>
                            <p class="tour-yacht-card__spec-value">
                                <img src="assets/img/icons/ancor.png" alt="" class="tour-yacht-card__spec-icon">
                                ${yacht.year}
                            </p>
                        </div>
                    </div>
                    <div class="tour-yacht-card__footer">
                        <a href="https://wa.me/35796343679?text=${encodeURIComponent('Хочу забронировать ' + yacht.name[state.currentLang])}" class="tour-yacht-card__order">${getText('yacht.order')}</a>
                        <div class="tour-yacht-card__location">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                            ${yacht.location ? yacht.location[state.currentLang] : getText('cities.limassol')}
                        </div>
                    </div>
                </div>
            </div>
        `).join('');
    }

    function renderTourTips(tips) {
        const titleEl = document.getElementById('tipsTitle');
        const introEl = document.getElementById('tipsIntro');
        const listEl = document.getElementById('tipsList');
        const outroEl = document.getElementById('tipsOutro');

        if (titleEl && tips.title) {
            titleEl.textContent = tips.title[state.currentLang];
        }

        if (introEl && tips.intro) {
            introEl.textContent = tips.intro[state.currentLang];
        }

        if (listEl && tips.items) {
            listEl.innerHTML = tips.items.map(item => `
                <div class="tour-tips__item">
                    <h4 class="tour-tips__item-title">${item.title[state.currentLang]}</h4>
                    <p class="tour-tips__item-text">${item.text[state.currentLang]}</p>
                </div>
            `).join('');
        }

        if (outroEl && tips.outro) {
            outroEl.textContent = tips.outro[state.currentLang];
        }
    }

    function renderTourReviews(reviews) {
        const carousel = document.getElementById('reviewsCarousel');
        if (!carousel || !reviews || reviews.length === 0) return;

        state.reviewIndex = 0;
        state.reviews = reviews;

        carousel.innerHTML = reviews.map((review, index) => `
            <div class="tour-reviews__slide ${index === 0 ? 'active' : ''}">
                <div class="tour-reviews__header">
                    <img src="${review.avatar.replace('.jpg', '.svg')}" alt="${review.name[state.currentLang]}" class="tour-reviews__avatar">
                    <div class="tour-reviews__meta">
                        <p class="tour-reviews__name">${review.name[state.currentLang]}</p>
                        <p class="tour-reviews__date">${review.date}</p>
                    </div>
                </div>
                <p class="tour-reviews__tag">${review.tag[state.currentLang]}</p>
                <p class="tour-reviews__label">${getText('tour.reviewLabel')}:</p>
                <p class="tour-reviews__text">${review.text[state.currentLang]}</p>
            </div>
        `).join('');

        // Initialize review navigation
        initReviewNavigation();
    }

    function initReviewNavigation() {
        const prevBtn = document.getElementById('reviewPrev');
        const nextBtn = document.getElementById('reviewNext');

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                if (!state.reviews) return;
                state.reviewIndex = (state.reviewIndex - 1 + state.reviews.length) % state.reviews.length;
                updateReviewSlide();
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                if (!state.reviews) return;
                state.reviewIndex = (state.reviewIndex + 1) % state.reviews.length;
                updateReviewSlide();
            });
        }
    }

    function updateReviewSlide() {
        const slides = document.querySelectorAll('.tour-reviews__slide');
        slides.forEach((slide, index) => {
            slide.classList.toggle('active', index === state.reviewIndex);
        });
    }

    function renderSimilarTours(similarSlugs) {
        const grid = document.getElementById('similarToursGrid');
        if (!grid || !state.tours) return;

        // Get similar tours, or fall back to other featured tours
        let similarTours = state.tours.tours.filter(t => similarSlugs.includes(t.slug));

        if (similarTours.length === 0) {
            // Fall back to other tours
            similarTours = state.tours.tours.filter(t => t.slug !== 'birthday-yacht').slice(0, 2);
        }

        grid.innerHTML = similarTours.map(tour => `
            <div class="tour-similar__card">
                <div class="tour-similar__image">
                    <img src="${tour.image ? tour.image.replace('.jpg', '.svg') : 'assets/img/tours/sunset.svg'}" alt="${tour.name[state.currentLang]}">
                </div>
                <div class="tour-similar__body">
                    <h3 class="tour-similar__name">${tour.name[state.currentLang]}</h3>
                    <p class="tour-similar__text">${tour.shortDescription[state.currentLang]}</p>
                    <a href="tour.html?slug=${tour.slug}" class="tour-similar__btn">${getText('tour.details')}</a>
                </div>
            </div>
        `).join('');
    }

    // ============================================
    // Service Detail Page Rendering
    // ============================================
    function renderServiceDetail() {
        const slug = getUrlParam('slug');
        if (!slug || !state.services) return;

        const service = state.services.find(s => s.slug === slug);
        if (!service) {
            window.location.href = 'index.html#services';
            return;
        }

        // Update page title
        document.title = `${service.name[state.currentLang]} - ON THE SEA`;

        // Update basic info
        const nameEl = document.getElementById('serviceName');
        const priceEl = document.getElementById('servicePrice');
        const stickyPriceEl = document.getElementById('stickyPrice');
        const durationEl = document.getElementById('serviceDuration');
        const descriptionEl = document.getElementById('serviceDescription');
        const imageEl = document.getElementById('serviceImage');

        if (nameEl) nameEl.textContent = service.name[state.currentLang];
        if (priceEl) priceEl.textContent = formatPrice(service.price);
        if (stickyPriceEl) stickyPriceEl.textContent = formatPrice(service.price);
        if (durationEl) durationEl.textContent = service.duration;
        if (descriptionEl) {
            // Convert newlines to paragraphs
            const paragraphs = service.description[state.currentLang].split('\n\n');
            descriptionEl.innerHTML = paragraphs.map(p => `<p>${p}</p>`).join('');
        }
        if (imageEl) imageEl.src = service.image;

        // Render includes
        const includesGrid = document.getElementById('serviceIncludes');
        if (includesGrid && service.includes && state.serviceIncludes) {
            includesGrid.innerHTML = service.includes.map(includeKey => {
                const include = state.serviceIncludes[includeKey];
                if (!include) return '';
                return `
                    <div class="service-include">
                        <i class="fas fa-${include.icon}"></i>
                        <span>${include.name[state.currentLang]}</span>
                    </div>
                `;
            }).join('');
        }
    }

    // ============================================
    // Forms
    // ============================================
    function initForms() {
        const contactForm = document.getElementById('contactForm');
        const bookingForm = document.getElementById('bookingForm');
        const serviceBookingForm = document.getElementById('serviceBookingForm');

        [contactForm, bookingForm, serviceBookingForm].forEach(form => {
            if (form) {
                form.addEventListener('submit', handleFormSubmit);
            }
        });

        // Set min date for date inputs to today
        document.querySelectorAll('input[type="date"]').forEach(input => {
            const today = new Date().toISOString().split('T')[0];
            input.setAttribute('min', today);
        });
    }

    function handleFormSubmit(e) {
        e.preventDefault();

        const form = e.target;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        // Get yacht or service name if applicable
        const yachtName = document.getElementById('yachtName')?.textContent;
        const serviceName = document.getElementById('serviceName')?.textContent;

        // Compose WhatsApp message
        let message = 'Hello! I would like to make a booking.\n\n';

        if (yachtName) {
            message += `Yacht: ${yachtName}\n`;
        }
        if (serviceName) {
            message += `Service: ${serviceName}\n`;
        }

        Object.entries(data).forEach(([key, value]) => {
            if (value) {
                const label = key.charAt(0).toUpperCase() + key.slice(1);
                message += `${label}: ${value}\n`;
            }
        });

        // Open WhatsApp
        const whatsappUrl = `https://wa.me/35796123456?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');

        // Show success message
        showNotification(getText('booking.success'));
        form.reset();
    }

    function showNotification(message) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.innerHTML = `
            <div class="notification__content">
                <i class="fas fa-check-circle"></i>
                <span>${message}</span>
            </div>
        `;

        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => notification.classList.add('active'), 10);

        // Remove after delay
        setTimeout(() => {
            notification.classList.remove('active');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    // ============================================
    // Sticky Booking Bar
    // ============================================
    function initStickyBooking() {
        const stickyBooking = document.getElementById('stickyBooking');
        const bookingSection = document.getElementById('booking');

        if (!stickyBooking || !bookingSection) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                stickyBooking.classList.toggle('hidden', entry.isIntersecting);
            });
        }, { threshold: 0.1 });

        observer.observe(bookingSection);
    }

    // ============================================
    // Smooth Scroll
    // ============================================
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href === '#') return;

                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    const headerHeight = document.getElementById('header')?.offsetHeight || 0;
                    const targetPosition = target.offsetTop - headerHeight - 20;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });

                    closeMobileMenu();
                }
            });
        });
    }

    // ============================================
    // Placeholder Images
    // ============================================
    function initPlaceholderImages() {
        // For images that fail to load, use a placeholder
        document.querySelectorAll('img').forEach(img => {
            img.addEventListener('error', function() {
                this.src = 'data:image/svg+xml,' + encodeURIComponent(`
                    <svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300">
                        <rect fill="#e2e8f0" width="400" height="300"/>
                        <text fill="#94a3b8" font-family="Arial" font-size="14" x="50%" y="50%" text-anchor="middle" dy=".3em">ON THE SEA</text>
                    </svg>
                `);
            });
        });
    }

    // ============================================
    // Initialize App
    // ============================================
    async function init() {
        // Load data
        await loadData();

        // Initialize components
        initLanguageSwitcher();
        initMobileMenu();
        initHeaderScroll();
        initSmoothScroll();
        initForms();
        initPlaceholderImages();

        // Apply translations
        applyTranslations();

        // Page-specific initialization
        const page = document.body.className;

        if (page.includes('page-yacht')) {
            renderYachtDetail();
            initStickyBooking();
        } else if (page.includes('page-catalog')) {
            initCatalogFilters();
            renderCatalog();
        } else if (page.includes('page-service')) {
            renderServiceDetail();
            initStickyBooking();
        } else if (page.includes('page-tour')) {
            renderTourPage();
        } else {
            renderHomePage();
            initReviewsSlider();
        }
    }

    // Reviews Slider
    function initReviewsSlider() {
        const track = document.getElementById('reviewsTrack');
        if (!track) return;

        const slides = track.querySelectorAll('.reviews__slide');
        const prevBtn = document.querySelector('.reviews__nav--prev');
        const nextBtn = document.querySelector('.reviews__nav--next');

        if (slides.length === 0) return;

        let currentSlide = 0;
        let startX = 0;
        let isDragging = false;

        // Show first slide
        slides[0].classList.add('active');

        function showSlide(index) {
            slides.forEach(slide => slide.classList.remove('active'));
            currentSlide = (index + slides.length) % slides.length;
            slides[currentSlide].classList.add('active');
        }

        function nextSlide() {
            showSlide(currentSlide + 1);
        }

        function prevSlide() {
            showSlide(currentSlide - 1);
        }

        // Button navigation
        if (prevBtn) prevBtn.addEventListener('click', prevSlide);
        if (nextBtn) nextBtn.addEventListener('click', nextSlide);

        // Touch/swipe support
        track.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            isDragging = true;
        }, { passive: true });

        track.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
        }, { passive: true });

        track.addEventListener('touchend', (e) => {
            if (!isDragging) return;
            isDragging = false;
            const endX = e.changedTouches[0].clientX;
            const diff = startX - endX;

            if (Math.abs(diff) > 50) {
                if (diff > 0) {
                    nextSlide();
                } else {
                    prevSlide();
                }
            }
        });
    }

    // Start app when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
