/* ============================================================
   PRO DIGITAL — js/script.js
   Menú móvil, navbar interactivo y animaciones de scroll reveal
   Vanilla JS — sin dependencias externas
   ============================================================ */

'use strict';

/* ============================================================
   1. NAVBAR — Clase "scrolled" al hacer scroll
   ============================================================ */
(function initNavbarScroll() {
  const header = document.getElementById('site-header');
  if (!header) return;

  const SCROLL_THRESHOLD = 10;

  function onScroll() {
    if (window.scrollY > SCROLL_THRESHOLD) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  // Ejecutar al cargar por si la página ya está desplazada
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
})();


/* ============================================================
   2. MENÚ HAMBURGUESA — Toggle animado para mobile
   ============================================================ */
(function initHamburgerMenu() {
  const hamburger  = document.getElementById('hamburger-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  if (!hamburger || !mobileMenu) return;

  let isOpen = false;

  function openMenu() {
    isOpen = true;
    hamburger.classList.add('is-open');
    mobileMenu.classList.add('is-open');
    hamburger.setAttribute('aria-expanded', 'true');
    mobileMenu.setAttribute('aria-hidden', 'false');
    hamburger.setAttribute('aria-label', 'Cerrar menú de navegación');
    // Bloquear scroll del body cuando el menú está abierto
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    isOpen = false;
    hamburger.classList.remove('is-open');
    mobileMenu.classList.remove('is-open');
    hamburger.setAttribute('aria-expanded', 'false');
    mobileMenu.setAttribute('aria-hidden', 'true');
    hamburger.setAttribute('aria-label', 'Abrir menú de navegación');
    document.body.style.overflow = '';
  }

  function toggleMenu() {
    isOpen ? closeMenu() : openMenu();
  }

  // Toggle al hacer click en el hamburger
  hamburger.addEventListener('click', toggleMenu);

  // Cerrar al hacer click en un enlace del menú móvil
  const mobileLinks = mobileMenu.querySelectorAll('.mobile-nav-link');
  mobileLinks.forEach(function(link) {
    link.addEventListener('click', closeMenu);
  });

  // Cerrar al presionar Escape
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && isOpen) {
      closeMenu();
      hamburger.focus();
    }
  });

  // Cerrar si la ventana se redimensiona a desktop
  window.addEventListener('resize', function() {
    if (window.innerWidth > 768 && isOpen) {
      closeMenu();
    }
  }, { passive: true });
})();


/* ============================================================
   3. SCROLL SUAVE — para links internos con href="#"
   (fallback para navegadores sin soporte nativo de scroll-behavior)
   ============================================================ */
(function initSmoothScroll() {
  const navLinks = document.querySelectorAll('a[href^="#"]');

  navLinks.forEach(function(link) {
    link.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();

      // Offset para compensar el navbar fijo (48px)
      const navbarHeight = 48;
      const targetTop = target.getBoundingClientRect().top + window.scrollY - navbarHeight;

      window.scrollTo({
        top: targetTop,
        behavior: 'smooth'
      });
    });
  });
})();


/* ============================================================
   4. SCROLL REVEAL — Animaciones de entrada al hacer scroll
   Usa IntersectionObserver para máximo rendimiento
   ============================================================ */
(function initScrollReveal() {
  // Verificar soporte del navegador
  if (!('IntersectionObserver' in window)) {
    // Fallback: mostrar todos los elementos inmediatamente
    document.querySelectorAll('.reveal').forEach(function(el) {
      el.classList.add('is-visible');
    });
    return;
  }

  const revealElements = document.querySelectorAll('.reveal');
  if (!revealElements.length) return;

  const observerOptions = {
    root: null,            // Viewport como contenedor
    rootMargin: '0px 0px -60px 0px', // Trigger 60px antes del borde inferior
    threshold: 0.1         // 10% del elemento visible
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        // Dejar de observar una vez revelado (mejor rendimiento)
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealElements.forEach(function(el) {
    observer.observe(el);
  });
})();


/* ============================================================
   5. ACTIVE NAV LINK — Resaltar el link activo según sección visible
   ============================================================ */
(function initActiveNavLink() {
  if (!('IntersectionObserver' in window)) return;

  const sections  = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.nav__links a[href^="#"]');
  if (!sections.length || !navLinks.length) return;

  // Mapa de sección → link de nav
  function getLinkForSection(sectionId) {
    return document.querySelector('.nav__links a[href="#' + sectionId + '"]');
  }

  function setActiveLink(activeId) {
    navLinks.forEach(function(link) {
      link.removeAttribute('aria-current');
      link.style.color = '';
    });
    const activeLink = getLinkForSection(activeId);
    if (activeLink) {
      activeLink.setAttribute('aria-current', 'page');
      activeLink.style.color = 'var(--color-text-primary)';
    }
  }

  const sectionObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        setActiveLink(entry.target.id);
      }
    });
  }, {
    rootMargin: '-40% 0px -55% 0px',
    threshold: 0
  });

  sections.forEach(function(section) {
    sectionObserver.observe(section);
  });
})();