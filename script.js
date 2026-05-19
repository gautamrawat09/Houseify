// ============================================
// HOUSIFY - Main JavaScript
// ============================================

document.addEventListener('DOMContentLoaded', () => {

  // ---- NAVBAR SCROLL ----
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  });

  // ---- HAMBURGER / MOBILE MENU ----
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  const hamburgerSpans = hamburger.querySelectorAll('span');

  hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
    const isOpen = mobileMenu.classList.contains('open');
    hamburgerSpans[0].style.transform = isOpen ? 'rotate(45deg) translate(5px, 5px)' : '';
    hamburgerSpans[1].style.opacity = isOpen ? '0' : '1';
    hamburgerSpans[2].style.transform = isOpen ? 'rotate(-45deg) translate(5px, -5px)' : '';
  });

  // Close on link click
  document.querySelectorAll('.mobile-menu a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      hamburgerSpans.forEach(s => { s.style.transform = ''; s.style.opacity = '1'; });
    });
  });

  // ---- SEARCH TABS ----
  document.querySelectorAll('.search-tab').forEach(tab => {
    tab.addEventListener('click', function () {
      document.querySelectorAll('.search-tab').forEach(t => t.classList.remove('active'));
      this.classList.add('active');
    });
  });

  // ---- PROPERTY FILTER BUTTONS ----
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', function () {
      filterBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      filterProperties(this.dataset.filter);
    });
  });

  function filterProperties(filter) {
    const cards = document.querySelectorAll('.property-card');
    cards.forEach(card => {
      const type = card.dataset.type || 'all';
      if (filter === 'all' || type === filter) {
        card.style.display = '';
        card.style.animation = 'fadeInUp 0.4s ease forwards';
      } else {
        card.style.display = 'none';
      }
    });
  }

  // ---- FAVORITE TOGGLE ----
  document.querySelectorAll('.card-fav').forEach(btn => {
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      this.classList.toggle('liked');
      const action = this.classList.contains('liked') ? 'Added to' : 'Removed from';
      showToast(`${action} favourites ♥`);
    });
  });

  // ---- PROPERTY CARD CLICK (MODAL) ----
  document.querySelectorAll('.property-card').forEach(card => {
    card.addEventListener('click', function () {
      openPropertyModal({
        name: this.querySelector('.card-title').textContent,
        price: this.querySelector('.card-price').childNodes[0].textContent,
        location: this.querySelector('.card-location').lastChild.textContent.trim(),
        beds: this.querySelector('[data-beds]')?.dataset.beds || '—',
        baths: this.querySelector('[data-baths]')?.dataset.baths || '—',
        area: this.querySelector('[data-area]')?.dataset.area || '—',
        people: this.querySelector('[data-people]')?.dataset.people || '—',
        duration: this.querySelector('[data-duration]')?.dataset.duration || '—',
      });
    });
  });

  // ---- MODAL ----
  const overlay = document.querySelector('.modal-overlay');
  const modalClose = document.querySelector('.modal-close');

  function openPropertyModal(data) {
    document.querySelector('.modal-prop-name').textContent = data.name;
    document.querySelector('.modal-prop-price').textContent = data.price + '/mo';
    document.querySelector('.modal-prop-location').textContent = data.location;
    document.querySelector('.modal-prop-beds').textContent = data.beds;
    document.querySelector('.modal-prop-baths').textContent = data.baths;
    document.querySelector('.modal-prop-area').textContent = data.area + ' sqft';
    document.querySelector('.modal-prop-people').textContent = data.people + ' people';
    document.querySelector('.modal-prop-duration').textContent = data.duration;
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  modalClose.addEventListener('click', closeModal);
  overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

  // ---- CONTACT FORM (in modal) ----
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      closeModal();
      showToast('Request sent! An agent will contact you soon 🏠');
    });
  }

  // ---- HERO SEARCH FORM ----
  const heroSearchBtn = document.querySelector('.search-btn');
  if (heroSearchBtn) {
    heroSearchBtn.addEventListener('click', () => {
      const location = document.getElementById('location-input')?.value;
      if (location) {
        document.querySelector('#listings').scrollIntoView({ behavior: 'smooth' });
        showToast(`Searching properties in "${location}"…`);
      } else {
        showToast('Please enter a location 📍');
      }
    });
  }

  // ---- LOAD MORE ----
  const loadMoreBtn = document.getElementById('load-more-btn');
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', () => {
      showToast('Loading more properties… 🔄');
      loadMoreBtn.textContent = 'Loading…';
      loadMoreBtn.disabled = true;
      setTimeout(() => {
        loadMoreBtn.textContent = 'No more listings right now';
        loadMoreBtn.style.opacity = '0.5';
      }, 1500);
    });
  }

  // ---- NEWSLETTER FORM ----
  const newsletterForm = document.querySelector('.newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const input = this.querySelector('input');
      if (input.value) {
        showToast('You\'re subscribed! 🎉');
        input.value = '';
      }
    });
  }

  // ---- TOAST ----
  function showToast(msg) {
    const toast = document.getElementById('toast');
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
  }

  // ---- SCROLL REVEAL (Intersection Observer) ----
  const revealEls = document.querySelectorAll('.step-card, .feature-card, .property-card, .testimonial-card');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        entry.target.style.animationDelay = (i % 4 * 0.1) + 's';
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  revealEls.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
  });

  // Apply styles for revealed elements
  const style = document.createElement('style');
  style.textContent = '.revealed { opacity: 1 !important; transform: translateY(0) !important; }';
  document.head.appendChild(style);

  // ---- COUNTER ANIMATION ----
  const counters = document.querySelectorAll('[data-count]');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => counterObserver.observe(c));

  function animateCounter(el) {
    const target = parseInt(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    const duration = 1500;
    const step = target / (duration / 16);
    let current = 0;
    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      el.textContent = Math.round(current) + suffix;
      if (current >= target) clearInterval(timer);
    }, 16);
  }

});
