/**
 * AgroPerú — JavaScript principal
 * Funcionalidades: Contadores animados, Sticky navbar,
 * Menú hamburguesa, Dropdown, Lightbox, Filtros, Smooth scroll,
 * WhatsApp float, Validación de formulario
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ==============================================
     1. ANIMATED COUNTERS
     ============================================== */
  function animateCounter(el, target, duration = 1800) {
    const start    = Date.now();
    const startVal = 0;
    const tick = () => {
      const elapsed  = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased    = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      el.textContent = Math.floor(startVal + (target - startVal) * eased);
      if (progress < 1) requestAnimationFrame(tick);
      else el.textContent = target;
    };
    requestAnimationFrame(tick);
  }

  const statNumbers = document.querySelectorAll('.stat-number[data-target]');
  const statsBar    = document.querySelector('.stats-bar');
  let countersStarted = false;

  const statsObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !countersStarted) {
      countersStarted = true;
      statNumbers.forEach(el => {
        const target = parseInt(el.dataset.target, 10);
        animateCounter(el, target);
      });
    }
  }, { threshold: 0.4 });

  if (statsBar) statsObserver.observe(statsBar);

  /* ==============================================
     2. STICKY NAVBAR
     ============================================== */
  const header = document.querySelector('.header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 80) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  }, { passive: true });

  /* ==============================================
     3. HAMBURGER / MOBILE NAV
     ============================================== */
  const hamburger   = document.querySelector('.hamburger');
  const mobileNav   = document.querySelector('.mobile-nav');
  const mobileClose = document.querySelector('.mobile-nav-close');

  function openMobileNav() {
    mobileNav?.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeMobileNav() {
    mobileNav?.classList.remove('open');
    document.body.style.overflow = '';
    hamburger?.classList.remove('active');
  }

  hamburger?.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileNav?.classList.contains('open') ? closeMobileNav() : openMobileNav();
  });
  mobileClose?.addEventListener('click', closeMobileNav);
  mobileNav?.addEventListener('click', e => { if (e.target === mobileNav) closeMobileNav(); });

  // Mobile dropdown toggles
  document.querySelectorAll('.mobile-nav-item > a[data-toggle]').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const item = link.closest('.mobile-nav-item');
      item.classList.toggle('open');
    });
  });

  /* ==============================================
     4. LIGHTBOX
     ============================================== */
  const lightbox     = document.querySelector('.lightbox');
  const lightboxImg  = document.querySelector('.lightbox-img');
  const lightboxPrev = document.querySelector('.lightbox-prev');
  const lightboxNext = document.querySelector('.lightbox-next');
  const lightboxClose= document.querySelector('.lightbox-close');
  const galleryItems = document.querySelectorAll('.gallery-item');
  let currentLightbox = 0;

  const galleryImages = Array.from(galleryItems).map(item => ({
    src: item.querySelector('img')?.src,
    alt: item.querySelector('img')?.alt || ''
  }));

  function openLightbox(index) {
    currentLightbox = index;
    lightboxImg.src = galleryImages[index].src;
    lightboxImg.alt = galleryImages[index].alt;
    lightbox?.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeLightboxFn() {
    lightbox?.classList.remove('open');
    document.body.style.overflow = '';
  }

  function lightboxNavigate(dir) {
    currentLightbox = (currentLightbox + dir + galleryImages.length) % galleryImages.length;
    lightboxImg.src = galleryImages[currentLightbox].src;
    lightboxImg.alt = galleryImages[currentLightbox].alt;
  }

  galleryItems.forEach((item, i) => item.addEventListener('click', () => openLightbox(i)));
  lightboxClose?.addEventListener('click', closeLightboxFn);
  lightbox?.addEventListener('click', e => { if (e.target === lightbox) closeLightboxFn(); });
  lightboxPrev?.addEventListener('click', () => lightboxNavigate(-1));
  lightboxNext?.addEventListener('click', () => lightboxNavigate(1));
  document.addEventListener('keydown', e => {
    if (!lightbox?.classList.contains('open')) return;
    if (e.key === 'ArrowLeft')  lightboxNavigate(-1);
    if (e.key === 'ArrowRight') lightboxNavigate(1);
    if (e.key === 'Escape')     closeLightboxFn();
  });

  /* ==============================================
     5. PRODUCT FILTER
     ============================================== */
  const filterBtns   = document.querySelectorAll('.filter-btn');
  const productCards = document.querySelectorAll('.product-card[data-category]');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      productCards.forEach(card => {
        const match = filter === 'all' || card.dataset.category === filter;
        card.style.display = match ? '' : 'none';
      });
    });
  });

  /* ==============================================
     6. SMOOTH SCROLL
     ============================================== */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        closeMobileNav();
        const offset = 100;
        window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
      }
    });
  });

  /* ==============================================
     7. BACK TO TOP
     ============================================== */
  const backToTop = document.querySelector('.back-to-top');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) backToTop?.classList.add('show');
    else backToTop?.classList.remove('show');
  }, { passive: true });
  backToTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  /* ==============================================
     8. FORM VALIDATION
     ============================================== */
  const contactForm = document.getElementById('contact-form');
  
  function validateField(input) {
    const parent = input.closest('.form-group');
    const errorEl = parent?.querySelector('.form-error');
    let valid = true;
    let msg = '';

    if (input.hasAttribute('required') && !input.value.trim()) {
      valid = false; msg = 'Este campo es requerido.';
    } else if (input.type === 'email' && input.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value)) {
      valid = false; msg = 'Ingresa un email válido.';
    } else if (input.type === 'tel' && input.value && !/^\+?[\d\s\-()]{7,}$/.test(input.value)) {
      valid = false; msg = 'Ingresa un teléfono válido.';
    }

    if (!valid) {
      input.classList.add('error');
      if (errorEl) { errorEl.textContent = msg; errorEl.classList.add('show'); }
    } else {
      input.classList.remove('error');
      if (errorEl) { errorEl.textContent = ''; errorEl.classList.remove('show'); }
    }
    return valid;
  }

  contactForm?.querySelectorAll('input, select, textarea').forEach(field => {
    field.addEventListener('blur', () => validateField(field));
    field.addEventListener('input', () => { if (field.classList.contains('error')) validateField(field); });
  });

  contactForm?.addEventListener('submit', e => {
    e.preventDefault();
    const fields = contactForm.querySelectorAll('input[required], select[required], textarea[required]');
    let allValid = true;
    fields.forEach(f => { if (!validateField(f)) allValid = false; });
    if (allValid) {
      const successEl = document.querySelector('.form-success');
      successEl?.classList.add('show');
      contactForm.reset();
      setTimeout(() => successEl?.classList.remove('show'), 6000);
    }
  });

  /* ==============================================
     9. NAVBAR ACTIVE LINK ON SCROLL
     ============================================== */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link[href^="#"]');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id);
        });
      }
    });
  }, { rootMargin: '-30% 0px -60% 0px' });

  sections.forEach(s => sectionObserver.observe(s));

  /* ==============================================
     10. CARD HOVER ANIMATION (IntersectionObserver)
     ============================================== */
  const animatedCards = document.querySelectorAll('.category-card, .product-card, .why-card, .testimonial-card');
  const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        cardObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  animatedCards.forEach(card => {
    card.style.opacity    = '0';
    card.style.transform  = 'translateY(30px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease, box-shadow 0.28s ease';
    cardObserver.observe(card);
  });

});
