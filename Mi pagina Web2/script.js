'use strict';

(function initYear() {
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();

(function initHeader() {
  const header = document.getElementById('site-header');
  if (!header) return;

  function updateHeader() {
    header.classList.toggle('scrolled', window.scrollY > 8);
  }

  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });
})();

(function initMobileMenu() {
  const button = document.getElementById('hamburger-btn');
  const menu = document.getElementById('mobile-menu');
  if (!button || !menu) return;

  function setOpen(isOpen) {
    button.classList.toggle('is-open', isOpen);
    menu.classList.toggle('is-open', isOpen);
    document.body.classList.toggle('menu-open', isOpen);
    button.setAttribute('aria-expanded', String(isOpen));
    button.setAttribute('aria-label', isOpen ? 'Cerrar menu' : 'Abrir menu');
    menu.setAttribute('aria-hidden', String(!isOpen));
  }

  button.addEventListener('click', function () {
    setOpen(!menu.classList.contains('is-open'));
  });

  menu.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      setOpen(false);
    });
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && menu.classList.contains('is-open')) {
      setOpen(false);
      button.focus();
    }
  });

  window.addEventListener('resize', function () {
    if (window.innerWidth > 760) setOpen(false);
  }, { passive: true });
})();

(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (event) {
      const targetId = link.getAttribute('href');
      if (!targetId || targetId === '#') return;

      const target = document.querySelector(targetId);
      if (!target) return;

      event.preventDefault();
      const offset = window.innerWidth <= 760 ? 64 : 72;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
})();

(function initReveal() {
  const elements = document.querySelectorAll('.reveal');
  if (!elements.length) return;

  if (!('IntersectionObserver' in window)) {
    elements.forEach(function (element) {
      element.classList.add('is-visible');
    });
    return;
  }

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, {
    rootMargin: '0px 0px -70px 0px',
    threshold: 0.12
  });

  elements.forEach(function (element) {
    observer.observe(element);
  });
})();

(function initActiveNavigation() {
  if (!('IntersectionObserver' in window)) return;

  const sections = document.querySelectorAll('section[id]');
  const links = document.querySelectorAll('.nav__links a[href^="#"]');
  if (!sections.length || !links.length) return;

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      links.forEach(function (link) {
        const isCurrent = link.getAttribute('href') === '#' + entry.target.id;
        if (isCurrent) {
          link.setAttribute('aria-current', 'page');
        } else {
          link.removeAttribute('aria-current');
        }
      });
    });
  }, {
    rootMargin: '-42% 0px -50% 0px',
    threshold: 0
  });

  sections.forEach(function (section) {
    observer.observe(section);
  });
})();
