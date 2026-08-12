/**
 * AgroPerú — JavaScript principal
 * Funcionalidades: Contadores animados, Sticky navbar,
 * Menú hamburguesa, Dropdown, Lightbox, Filtros, Smooth scroll,
 * WhatsApp float, Validación de formulario
 */

document.addEventListener('DOMContentLoaded', () => {

  /* La barra de indicadores (500 proyectos, 15 regiones, etc.)
     se elimino a pedido del cliente, junto con su contador animado. */

  /* ==============================================
     2. STICKY NAVBAR
     ============================================== */
  const header = document.querySelector('.header');
  let lastScrollY = window.scrollY;

  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;

    // Scrolled style
    if (currentScrollY > 80) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }

    // Hide on scroll down, show on scroll up
    if (currentScrollY > lastScrollY && currentScrollY > 150) {
      header?.classList.add('header-hidden');
    } else {
      header?.classList.remove('header-hidden');
    }

    lastScrollY = currentScrollY;
  }, { passive: true });

  /* ==============================================
     3. HAMBURGER / MOBILE NAV
     ============================================== */
  const hamburger   = document.querySelector('.hamburger');
  const mobileNav   = document.querySelector('.mobile-nav');
  const mobileClose = document.querySelector('.mobile-nav-close');

  function openMobileNav() {
    mobileNav?.classList.add('open');
    // La clase en <body> oculta header y botones flotantes para
    // que no se superpongan al panel del menu
    document.body.classList.add('nav-open');
    document.body.style.overflow = 'hidden';
    hamburger?.setAttribute('aria-expanded', 'true');
  }
  function closeMobileNav() {
    mobileNav?.classList.remove('open');
    document.body.classList.remove('nav-open');
    document.body.style.overflow = '';
    hamburger?.classList.remove('active');
    hamburger?.setAttribute('aria-expanded', 'false');
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
    lightbox?.classList.remove('open', 'product-view');
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
     4b. VIDEO LIGHTBOX
     ============================================== */
  const videoLightbox = document.getElementById('video-lightbox');
  const videoPlayer   = videoLightbox?.querySelector('.video-lightbox-player');
  const videoLbClose  = videoLightbox?.querySelector('.video-lightbox-close');

  function openVideoLightbox(src) {
    if (!videoPlayer || !videoLightbox) return;
    videoPlayer.querySelector('source').src = src;
    videoPlayer.load();
    videoPlayer.play();
    videoLightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeVideoLightbox() {
    videoLightbox?.classList.remove('open');
    videoPlayer?.pause();
    document.body.style.overflow = '';
  }

  document.querySelectorAll('.reel-item').forEach(item => {
    item.addEventListener('click', () => {
      const source = item.querySelector('video source');
      if (!source) return;
      // El <source> puede estar diferido (data-src) o ya cargado (src)
      const src = source.getAttribute('src') || source.dataset.src;
      if (src) openVideoLightbox(src);
    });
  });

  /* ----------------------------------------------
     4c. CARGA DIFERIDA DE LOS VIDEOS DEL REEL
     Los <source> llevan data-src en vez de src, asi
     el navegador no los descarga al abrir la pagina.
     Solo se cargan y reproducen al entrar en pantalla.
     ---------------------------------------------- */
  const reelVideos = document.querySelectorAll('.reel-item video');

  if (reelVideos.length) {
    const loadReelVideo = video => {
      const source = video.querySelector('source[data-src]');
      if (!source) return;
      source.src = source.dataset.src;
      source.removeAttribute('data-src');
      video.load();
    };

    const reelObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const video = entry.target;
        if (entry.isIntersecting) {
          loadReelVideo(video);
          video.play().catch(() => { /* el navegador puede bloquearlo, no es critico */ });
        } else {
          video.pause();
        }
      });
    }, { rootMargin: '200px 0px', threshold: 0.1 });

    reelVideos.forEach(v => reelObserver.observe(v));
  }

  videoLbClose?.addEventListener('click', closeVideoLightbox);
  videoLightbox?.addEventListener('click', e => { if (e.target === videoLightbox) closeVideoLightbox(); });
  document.addEventListener('keydown', e => {
    if (videoLightbox?.classList.contains('open') && e.key === 'Escape') closeVideoLightbox();
  });

  /* ==============================================
     4c. CATEGORY PRODUCT MODAL
     ============================================== */
  const catModal      = document.getElementById('cat-modal');
  const catModalClose = catModal?.querySelector('.cat-modal-close');
  let catModalTrigger = null;

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function openCatModal(card) {
    const images = (card.dataset.modalImages || '').split(',').map(s => s.trim()).filter(Boolean);
    const layout = card.dataset.modalLayout || 'collage';
    const title  = escapeHtml(card.dataset.modalTitle || '');
    if (!catModal) return;
    if (!images.length && layout !== 'texto') return;

    const content = catModal.querySelector('.cat-modal-content');
    const prev = content.querySelector('.cat-modal-collage, .cat-modal-grapas, .cat-modal-maya, .cat-modal-malla, .cat-modal-plastico, .cat-modal-tensor, .cat-modal-canal, .cat-modal-mecanico, .cat-modal-cable, .cat-modal-ventilador, .cat-modal-texto, .cat-modal-duo, .cat-modal-galeria');
    if (prev) prev.remove();

    if (layout === 'grapas') {
      const specs = (card.dataset.modalSpecs || '').split('|').filter(Boolean);
      const body = document.createElement('div');
      body.className = 'cat-modal-grapas';
      body.innerHTML = `
        <div class="cat-grapas-left">
          <div class="cat-grapas-banner">${title}</div>
          <ul class="cat-grapas-specs">${specs.map(s => `<li>${s}</li>`).join('')}</ul>
          <div class="cat-grapas-imgs">
            <img src="${images[0]}" alt="${title}" />
            <img src="${images[1] || images[0]}" alt="${title}" />
          </div>
        </div>
        <div class="cat-grapas-right">
          <img src="${images[2] || images[0]}" alt="${title}" />
        </div>`;
      content.appendChild(body);
    } else if (layout === 'malla') {
      const rawSections = (card.dataset.modalSections || '').split(';;;').filter(Boolean);
      const sections = rawSections.map(s => { const [t, ...rest] = s.split(':::'); return { title: t.trim(), text: rest.join(':::').trim() }; });
      const body = document.createElement('div');
      body.className = 'cat-modal-malla';
      // Las 2 primeras fotos van grandes, apiladas junto al texto (igual que siempre).
      // Desde la 3ra en adelante, van ABAJO de todo el bloque, ancho completo,
      // en pares lado a lado (y la ultima sola si sobra), mismo tamano grande.
      const mainImgs  = images.slice(0, 2);
      const extraImgs = images.slice(2);
      let extraRowsHtml = '';
      for (let i = 0; i < extraImgs.length; i += 2) {
        const pair = extraImgs.slice(i, i + 2);
        extraRowsHtml += `
          <div class="cat-malla-imgs-extra-row${pair.length === 1 ? ' single' : ''}">
            ${pair.map(src => `<img src="${src}" alt="${title}" />`).join('')}
          </div>`;
      }
      body.innerHTML = `
        <div class="cat-malla-imgs">
          ${mainImgs.map(src => `<img src="${src}" alt="${title}" />`).join('')}
        </div>
        <div class="cat-malla-sections">
          ${sections.map(s => `
            <div>
              <div class="cat-malla-section-title">${s.title}</div>
              <p class="cat-malla-section-text">${s.text.replace(/\\a/g, '<br>')}</p>
            </div>`).join('')}
          <a class="cat-malla-wa btn btn-primary" href="https://wa.me/51975068425" target="_blank" rel="noopener">
            <i class="fa-brands fa-whatsapp" aria-hidden="true"></i> Consultar por WhatsApp
          </a>
        </div>
        ${extraRowsHtml ? `<div class="cat-malla-imgs-extra-wrap">${extraRowsHtml}</div>` : ''}`;
      content.appendChild(body);
    } else if (layout === 'plastico') {
      const rawSections = (card.dataset.modalSections || '').split(';;;').filter(Boolean);
      const sections = rawSections.map(s => { const [t, ...rest] = s.split(':::'); return { title: t.trim(), text: rest.join(':::').trim() }; });
      const body = document.createElement('div');
      body.className = 'cat-modal-plastico';
      body.innerHTML = `
        <div class="cat-malla-sections">
          ${sections.map(s => `
            <div>
              <div class="cat-malla-section-title">${s.title}</div>
              <p class="cat-malla-section-text">${s.text.replace(/\\a/g, '<br>')}</p>
            </div>`).join('')}
          <a class="cat-malla-wa btn btn-primary" href="https://wa.me/51975068425" target="_blank" rel="noopener">
            <i class="fa-brands fa-whatsapp" aria-hidden="true"></i> Consultar por WhatsApp
          </a>
        </div>
        <div class="cat-malla-imgs">
          <img src="${images[0]}" alt="${title}" />
          <img src="${images[1] || images[0]}" alt="${title}" />
        </div>`;
      content.appendChild(body);
    } else if (layout === 'galeria') {
      const body = document.createElement('div');
      body.className = 'cat-modal-galeria';
      body.innerHTML = images.map(src => `<img src="${src}" alt="${title}" />`).join('');
      content.appendChild(body);
    } else if (layout === 'duo') {
      const body = document.createElement('div');
      body.className = 'cat-modal-duo';
      body.innerHTML = `
        <img src="${images[0]}" alt="${title}" />
        <img src="${images[1] || images[0]}" alt="${title}" />`;
      content.appendChild(body);
    } else if (layout === 'texto') {
      const desc = card.dataset.modalDesc || '';
      const segments = desc.split(/\\a/);
      const segHtml = segments.map(seg => {
        const s = seg.trim();
        if (!s) return '';
        if (s.startsWith('##')) {
          return `<p class="cat-texto-heading">${s.slice(2).trim()}</p>`;
        }
        return `<p class="cat-texto-p">${s.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}</p>`;
      }).join('');
      const body = document.createElement('div');
      body.className = 'cat-modal-texto';
      body.innerHTML = `
        <h3 class="cat-texto-title">${title}</h3>
        <div class="cat-texto-body">${segHtml}</div>
        <a class="btn btn-primary cat-texto-wa" href="https://wa.me/51975068425" target="_blank" rel="noopener">
          <i class="fa-brands fa-whatsapp" aria-hidden="true"></i> Consultar por WhatsApp
        </a>`;
      content.appendChild(body);
    } else if (layout === 'ventilador') {
      const rawSections = (card.dataset.modalSections || '').split(';;;').filter(Boolean);
      const body = document.createElement('div');
      body.className = 'cat-modal-ventilador';

      rawSections.forEach(raw => {
        const parts    = raw.split('||');
        const secTitle = (parts[0] || '').trim();
        const secLay   = (parts[1] || 'right').trim();
        const imgIdx   = parseInt((parts[2] || '0').trim(), 10);
        const subs     = (parts[3] || '').split('~~~').filter(Boolean).map(s => {
          const [t, ...rest] = s.split(':::');
          return { title: t.trim(), text: rest.join(':::').trim() };
        });

        const textHtml = `<div class="cat-vent-text-block">${subs.map(si =>
          `<div><span class="cat-vent-sub-title">${si.title}</span><span class="cat-vent-sub-text">${si.text}</span></div>`
        ).join('')}</div>`;

        const imgSrc  = images[imgIdx] || images[0];
        let bodyHtml = '';
        if (secLay === 'dual-right') {
          const idx2 = parseInt((parts[2] || '0').split(',')[1] || imgIdx + 1, 10);
          bodyHtml = `<div class="cat-vent-body layout-right">
            ${textHtml}
            <div class="cat-vent-imgs-dual">
              <img src="${imgSrc}" alt="${secTitle}" />
              <img src="${images[idx2] || imgSrc}" alt="${secTitle}" />
            </div>
          </div>`;
        } else if (secLay === 'left') {
          bodyHtml = `<div class="cat-vent-body layout-left"><img class="cat-vent-img" src="${imgSrc}" alt="${secTitle}" />${textHtml}</div>`;
        } else {
          bodyHtml = `<div class="cat-vent-body layout-right">${textHtml}<img class="cat-vent-img" src="${imgSrc}" alt="${secTitle}" /></div>`;
        }

        const sec = document.createElement('div');
        sec.className = 'cat-vent-section';
        sec.innerHTML = `<div class="cat-vent-title">${secTitle}</div>${bodyHtml}`;
        body.appendChild(sec);
      });

      const waBtn = document.createElement('a');
      waBtn.className = 'btn btn-primary';
      waBtn.style.cssText = 'display:inline-flex;align-items:center;gap:8px;width:fit-content;font-size:.88rem;margin-top:14px;background:#25D366;border-color:#25D366;';
      waBtn.href = 'https://wa.me/51975068425';
      waBtn.target = '_blank';
      waBtn.rel = 'noopener';
      waBtn.innerHTML = '<i class="fa-brands fa-whatsapp" aria-hidden="true"></i> Consultar por WhatsApp';
      body.appendChild(waBtn);

      content.appendChild(body);
    } else if (layout === 'cable') {
      const rawSections = (card.dataset.modalSections || '').split(';;;').filter(Boolean);
      const sections = rawSections.map(s => { const [t, ...rest] = s.split(':::'); return { title: t.trim(), text: rest.join(':::').trim().replace(/\\a/g, '<br>') }; });
      const body = document.createElement('div');
      body.className = 'cat-modal-cable';
      body.innerHTML = `
        <div class="cat-cable-imgs">
          <img src="${images[0]}" alt="${title}" />
          <img src="${images[1] || images[0]}" alt="${title}" />
        </div>
        <div class="cat-cable-info">
          <div class="cat-cable-title">${title}</div>
          <div class="cat-cable-boxes">
            ${sections.map(s => `
              <div class="cat-cable-box">
                <span class="cat-cable-box-title">${s.title}:</span>
                ${s.text}
              </div>`).join('')}
          </div>
          <a class="btn btn-primary" style="display:inline-flex;align-items:center;gap:8px;width:fit-content;font-size:.88rem;" href="https://wa.me/51975068425" target="_blank" rel="noopener">
            <i class="fa-brands fa-whatsapp" aria-hidden="true"></i> Consultar por WhatsApp
          </a>
        </div>`;
      content.appendChild(body);
    } else if (layout === 'mecanico') {
      const rawSections = (card.dataset.modalSections || '').split(';;;').filter(Boolean);
      const body = document.createElement('div');
      body.className = 'cat-modal-mecanico';

      rawSections.forEach(raw => {
        const parts = raw.split('||');
        const secTitle   = (parts[0] || '').trim();
        const secLayout  = (parts[1] || 'right').trim();
        const imgIndices = (parts[2] || '0').split(',').map(i => parseInt(i.trim(), 10));
        const bullets    = (parts[3] || '').split('~~').filter(Boolean);
        const bulletsHtml = `<ul class="cat-mec-bullets">${bullets.map(b => `<li>${b.trim()}</li>`).join('')}</ul>`;

        let innerHtml = '';
        if (secLayout === 'dual') {
          const imgs = imgIndices.map(i => images[i] || images[0]);
          innerHtml = `
            <div class="cat-mec-body layout-dual">
              <div class="cat-mec-imgs-dual">${imgs.map(src => `<img src="${src}" alt="${secTitle}" />`).join('')}</div>
              ${bulletsHtml}
            </div>`;
        } else if (secLayout === 'left') {
          innerHtml = `
            <div class="cat-mec-body layout-left">
              <img class="cat-mec-img" src="${images[imgIndices[0]] || images[0]}" alt="${secTitle}" />
              ${bulletsHtml}
            </div>`;
        } else {
          innerHtml = `
            <div class="cat-mec-body layout-right">
              ${bulletsHtml}
              <img class="cat-mec-img" src="${images[imgIndices[0]] || images[0]}" alt="${secTitle}" />
            </div>`;
        }

        const sec = document.createElement('div');
        sec.className = 'cat-mec-section';
        sec.innerHTML = `<div class="cat-mec-title">${secTitle}</div>${innerHtml}`;
        body.appendChild(sec);
      });

      // WhatsApp button at the end
      const waBtn = document.createElement('a');
      waBtn.className = 'cat-mec-wa btn btn-primary';
      waBtn.href = 'https://wa.me/51975068425';
      waBtn.target = '_blank';
      waBtn.rel = 'noopener';
      waBtn.innerHTML = '<i class="fa-brands fa-whatsapp" aria-hidden="true"></i> Consultar por WhatsApp';
      body.appendChild(waBtn);

      content.appendChild(body);
    } else if (layout === 'tensor') {
      const specs = (card.dataset.modalSpecs || '').split('|').filter(Boolean);
      const body = document.createElement('div');
      body.className = 'cat-modal-tensor';
      body.innerHTML = `
        <div class="cat-tensor-title-bar">${title}</div>
        <div class="cat-tensor-body">
          <img class="cat-tensor-main-img" src="${images[0]}" alt="${title}" />
          <ul class="cat-tensor-bullets">
            ${specs.map(s => `<li>${s.trim()}</li>`).join('')}
          </ul>
          <div class="cat-tensor-side">
            <img src="${images[1] || images[0]}" alt="${title}" />
            <img src="${images[2] || images[0]}" alt="${title}" />
          </div>
        </div>`;
      content.appendChild(body);
    } else if (layout === 'canal') {
      const specs = (card.dataset.modalSpecs || '').split('|').filter(Boolean);
      const footer = card.dataset.modalFooter || '';
      const specsHtml = specs.map(s => {
        const colon = s.indexOf(':');
        if (colon === -1) return `<div>${s}</div>`;
        return `<div><strong>${s.slice(0, colon + 1)}</strong>${s.slice(colon + 1)}</div>`;
      }).join('');
      const body = document.createElement('div');
      body.className = 'cat-modal-canal';
      body.innerHTML = `
        <img class="cat-canal-banner" src="${images[0]}" alt="${title}" />
        <div class="cat-canal-body">
          <img class="cat-canal-product-img" src="${images[1] || images[0]}" alt="${title}" />
          <div class="cat-canal-specs">${specsHtml}</div>
        </div>
        ${footer ? `<div class="cat-canal-footer">${footer}</div>` : ''}`;
      content.appendChild(body);
    } else if (layout === 'maya') {
      const desc = card.dataset.modalDesc || '';
      const body = document.createElement('div');
      body.className = 'cat-modal-maya';
      body.innerHTML = `
        <img class="cat-maya-img" src="${images[0]}" alt="${title}" />
        <div class="cat-maya-text">
          <h3>${title}</h3>
          <p>${desc}</p>
          <a class="cat-modal-wa btn btn-primary" href="https://wa.me/51975068425" target="_blank" rel="noopener">
            <i class="fa-brands fa-whatsapp" aria-hidden="true"></i> Consultar por WhatsApp
          </a>
        </div>
        <img class="cat-maya-img" src="${images[1] || images[0]}" alt="${title}" />`;
      content.appendChild(body);
    } else {
      const desc = card.dataset.modalDesc || '';
      const body = document.createElement('div');
      body.className = 'cat-modal-collage';
      body.innerHTML = `
        <img class="cat-img cat-img-1" src="${images[0]}" alt="${title}" />
        <img class="cat-img cat-img-2" src="${images[1] || images[0]}" alt="${title}" />
        <img class="cat-img cat-img-3" src="${images[2] || images[0]}" alt="${title}" />
        <div class="cat-modal-info">
          <h3 class="cat-modal-title">${title}</h3>
          <p class="cat-modal-desc">${desc}</p>
          <a class="cat-modal-wa btn btn-primary" href="https://wa.me/51975068425" target="_blank" rel="noopener">
            <i class="fa-brands fa-whatsapp" aria-hidden="true"></i> Consultar por WhatsApp
          </a>
        </div>`;
      content.appendChild(body);
    }

    catModal.classList.add('open');
    document.body.style.overflow = 'hidden';
    // Focus close button, remember trigger to restore later
    setTimeout(() => catModalClose?.focus(), 50);
  }

  function closeCatModal() {
    catModal?.classList.remove('open');
    document.body.style.overflow = '';
    catModalTrigger?.focus();
    catModalTrigger = null;
  }

  document.querySelectorAll('.cat-modal-trigger').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      catModalTrigger = link;
      openCatModal(link.closest('.category-card'));
    });
  });

  // Focus trap: keep Tab inside the modal while open
  catModal?.addEventListener('keydown', e => {
    if (e.key !== 'Tab' || !catModal.classList.contains('open')) return;
    const focusables = catModal.querySelectorAll('a[href], button:not([disabled]), input, textarea, select, [tabindex]:not([tabindex="-1"])');
    if (!focusables.length) return;
    const first = focusables[0];
    const last  = focusables[focusables.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  });

  catModalClose?.addEventListener('click', closeCatModal);
  catModal?.addEventListener('click', e => { if (e.target === catModal) closeCatModal(); });
  document.addEventListener('keydown', e => {
    if (catModal?.classList.contains('open') && e.key === 'Escape') closeCatModal();
  });

  /* ==============================================
     4c. CATEGORIES SHOW MORE
     ============================================== */
  const catCards    = document.querySelectorAll('.category-card');
  const catVerMas   = document.getElementById('cat-ver-mas');
  const CAT_VISIBLE = 6;
  let catExpanded   = false;

  catCards.forEach((card, i) => {
    if (i >= CAT_VISIBLE) card.classList.add('cat-hidden');
  });

  catVerMas?.addEventListener('click', () => {
    catExpanded = !catExpanded;
    catCards.forEach((card, i) => {
      if (i >= CAT_VISIBLE) card.classList.toggle('cat-hidden', !catExpanded);
    });
    catVerMas.classList.toggle('expanded', catExpanded);
    catVerMas.setAttribute('aria-expanded', String(catExpanded));
    catVerMas.innerHTML = catExpanded
      ? 'Ver menos <i class="fa-solid fa-chevron-down" aria-hidden="true"></i>'
      : 'Ver más <i class="fa-solid fa-chevron-down" aria-hidden="true"></i>';
  });

  /* La seccion "Productos Destacados" y su filtro se eliminaron
     (era redundante con "Soluciones para Toda la Cadena Agricola"). */

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

  contactForm?.addEventListener('submit', async e => {
    e.preventDefault();

    const fields = contactForm.querySelectorAll('input[required], select[required], textarea[required]');
    let allValid = true;
    fields.forEach(f => { if (!validateField(f)) allValid = false; });
    if (!allValid) return;

    const successEl = document.querySelector('.form-success');
    const failEl    = document.querySelector('.form-fail');
    const submitBtn = contactForm.querySelector('.form-submit');
    const btnHtml   = submitBtn?.innerHTML;

    successEl?.classList.remove('show');
    failEl?.classList.remove('show');

    // Estado "enviando": evita dobles envíos
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin" aria-hidden="true"></i> Enviando...';
    }

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: new FormData(contactForm)
      });
      const data = await res.json();

      if (res.ok && data.success) {
        successEl?.classList.add('show');
        contactForm.reset();
        setTimeout(() => successEl?.classList.remove('show'), 8000);
      } else {
        throw new Error(data.message || 'Error al enviar');
      }
    } catch (err) {
      failEl?.classList.add('show');
      setTimeout(() => failEl?.classList.remove('show'), 10000);
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = btnHtml;
      }
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
  const animatedCards = document.querySelectorAll('.category-card, .why-card, .testimonial-card, .mv-card');
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
