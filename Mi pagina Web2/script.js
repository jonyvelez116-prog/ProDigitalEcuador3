'use strict';

/* ── Intro shutter animation ────────────────────────────────── */
(function initIntro() {
  const overlay = document.getElementById('intro-overlay');
  if (!overlay) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    overlay.classList.add('is-done');
    return;
  }

  document.body.classList.add('intro-active');
  const header = document.getElementById('site-header');
  if (header) header.style.visibility = 'hidden';

  /* Emergency fallback: if anything goes wrong, unlock the page after 4s max */
  var emergencyTimer = setTimeout(function() {
    overlay.classList.add('is-done');
    document.body.classList.remove('intro-active');
    if (header) header.style.visibility = '';
  }, 4000);

  /* Brand appears at ~400ms (CSS anim delay), tagline at ~750ms.
     Wait for both to be fully visible, then lift the shutter */
  setTimeout(function() {
    overlay.classList.add('is-opening'); /* CSS transition: 1000ms */
  }, 1400);

  /* 1400ms wait + 1000ms slide + small buffer = 2500ms */
  setTimeout(function() {
    clearTimeout(emergencyTimer);
    overlay.classList.add('is-done');
    document.body.classList.remove('intro-active');
    if (header) header.style.visibility = '';
  }, 2600);
})();

(function initYear() {
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();

(function initHeader() {
  const header = document.getElementById('site-header');
  if (!header) return;

  /* Fade-in con blur al cargar */
  header.style.opacity = '0';
  header.style.filter = 'blur(8px)';
  header.style.transition = 'opacity 600ms ease, filter 600ms ease, border-color 180ms ease, background 180ms ease, box-shadow 180ms ease';
  requestAnimationFrame(function() {
    setTimeout(function() {
      header.style.opacity = '1';
      header.style.filter = 'blur(0px)';
    }, 80);
  });

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

  const menuLinks = menu.querySelectorAll('a');

  function setOpen(isOpen) {
    button.classList.toggle('is-open', isOpen);
    menu.classList.toggle('is-open', isOpen);
    document.body.classList.toggle('menu-open', isOpen);
    button.setAttribute('aria-expanded', String(isOpen));
    button.setAttribute('aria-label', isOpen ? 'Cerrar menu' : 'Abrir menu');
    menu.setAttribute('aria-hidden', String(!isOpen));
    /* Prevent hidden links from being reachable via Tab */
    menuLinks.forEach(function(link) {
      link.setAttribute('tabindex', isOpen ? '0' : '-1');
    });
  }

  /* Init: links not focusable while menu is closed */
  menuLinks.forEach(function(link) { link.setAttribute('tabindex', '-1'); });

  button.addEventListener('click', function () {
    setOpen(!menu.classList.contains('is-open'));
  });

  menu.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () { setOpen(false); });
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
    elements.forEach(function (el) { el.classList.add('is-visible'); });
    return;
  }

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { rootMargin: '0px 0px -70px 0px', threshold: 0.12 });

  elements.forEach(function (el) { observer.observe(el); });
})();

/* ── Typed cycling text in hero ─────────────────────────────── */
(function initTypedEffect() {
  const title = document.querySelector('.hero__title');
  if (!title) return;
  const originalHTML = title.innerHTML;
  /* Find the last word/phrase to animate — look for WhatsApp first, fallback to last word */
  const anchorWord = originalHTML.includes('WhatsApp') ? 'WhatsApp'
    : originalHTML.match(/(\S+)\s*$/) ? originalHTML.match(/(\S+)\s*$/)[1] : null;
  if (!anchorWord) return;

  title.innerHTML = originalHTML.replace(
    anchorWord,
    '<span class="typed-word" aria-live="polite">' + anchorWord + '</span>'
  );
  const span = title.querySelector('.typed-word');
  if (!span) return;

  const style = document.createElement('style');
  style.textContent = [
    '.typed-word{color:var(--blue);border-right:3px solid var(--blue);padding-right:3px;',
    'animation:typed-blink .75s step-end infinite;}',
    '@keyframes typed-blink{0%,100%{border-color:var(--blue)}50%{border-color:transparent}}',
    '@media(prefers-reduced-motion:reduce){.typed-word{animation:none;border-right:none}}'
  ].join('');
  document.head.appendChild(style);

  const words = ['mensajes', 'WhatsApp'];
  let wi = 0, ci = 0, deleting = false;

  function tick() {
    const word = words[wi];
    span.textContent = deleting ? word.slice(0, ci - 1) : word.slice(0, ci + 1);
    deleting ? ci-- : ci++;
    let delay = deleting ? 55 : 95;
    if (!deleting && ci === word.length) { delay = 1800; deleting = true; }
    else if (deleting && ci === 0) { deleting = false; wi = (wi + 1) % words.length; delay = 280; }
    setTimeout(tick, delay);
  }
  setTimeout(tick, 2400);
})();

/* ── Animated counters ──────────────────────────────────────── */
(function initCounters() {
  const targets = document.querySelectorAll('.metrics-panel, .preview-stats');
  if (!targets.length) return;

  function countUp(el) {
    const raw = el.textContent.trim();
    const m = raw.match(/^([<]?)(\d+\.?\d*)(.*)$/);
    /* Skip elements that have no number to animate (e.g. "Rápida", "Ecuador") */
    if (!m || isNaN(parseFloat(m[2]))) return;
    const pre = m[1], num = parseFloat(m[2]), suf = m[3];
    const duration = 1300, t0 = performance.now();
    (function frame(now) {
      const p = Math.min((now - t0) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      const val = num % 1 !== 0 ? (eased * num).toFixed(1) : Math.round(eased * num);
      el.textContent = pre + val + suf;
      if (p < 1) requestAnimationFrame(frame);
    })(t0);
  }

  const obs = new IntersectionObserver(function(entries) {
    entries.forEach(function(e) {
      if (!e.isIntersecting) return;
      obs.unobserve(e.target);
      e.target.querySelectorAll('strong').forEach(countUp);
    });
  }, { threshold: 0.5 });

  targets.forEach(function(t) { obs.observe(t); });
})();

/* ── Parallax hero visual ───────────────────────────────────── */
(function initParallax() {
  const visual = document.querySelector('.hero__visual');
  if (!visual || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  let ticking = false;
  window.addEventListener('scroll', function() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function() {
      if (window.scrollY < window.innerHeight)
        visual.style.transform = 'translateY(' + (window.scrollY * 0.07) + 'px)';
      ticking = false;
    });
  }, { passive: true });
})();

/* ── Magnetic buttons ───────────────────────────────────────── */
(function initMagnetic() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if ('ontouchstart' in window) return;
  document.querySelectorAll('.btn--primary, .btn--whatsapp').forEach(function(btn) {
    btn.addEventListener('mousemove', function(e) {
      const r = btn.getBoundingClientRect();
      const x = (e.clientX - r.left - r.width / 2) * 0.11;
      const y = (e.clientY - r.top - r.height / 2) * 0.11;
      btn.style.transform = 'translate(' + x + 'px,' + (y - 2) + 'px)';
    });
    btn.addEventListener('mouseleave', function() { btn.style.transform = ''; });
  });
})();

/* ── Custom cursor ──────────────────────────────────────────── */
(function initCursor() {
  if ('ontouchstart' in window) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const style = document.createElement('style');
  style.textContent = `
    *{cursor:none!important}
    .cur-dot{
      position:fixed;top:0;left:0;width:8px;height:8px;
      background:var(--blue);border-radius:50%;pointer-events:none;
      z-index:9999;transform:translate(-50%,-50%);
      transition:transform 120ms ease,background 200ms ease,width 200ms ease,height 200ms ease;
      will-change:left,top;
    }
    .cur-ring{
      position:fixed;top:0;left:0;width:32px;height:32px;
      border:1.5px solid rgba(4,120,216,0.55);border-radius:50%;pointer-events:none;
      z-index:9998;transform:translate(-50%,-50%);
      transition:width 220ms ease,height 220ms ease,border-color 220ms ease,opacity 220ms ease;
      will-change:left,top;
    }
    .cur-dot.is-hover{width:12px;height:12px;background:#0460b0}
    .cur-ring.is-hover{width:48px;height:48px;border-color:rgba(4,96,176,0.35)}
    .cur-dot.is-click{width:6px;height:6px}
    .cur-ring.is-click{width:22px;height:22px;border-color:rgba(4,120,216,0.9)}
    @media(max-width:760px){.cur-dot,.cur-ring{display:none}}
  `;
  document.head.appendChild(style);

  const dot = document.createElement('div');
  const ring = document.createElement('div');
  dot.className = 'cur-dot';
  ring.className = 'cur-ring';
  document.body.append(dot, ring);

  let mx = -100, my = -100, rx = -100, ry = -100;
  let rafId, running = true;

  document.addEventListener('mousemove', function(e) {
    mx = e.clientX; my = e.clientY;
    dot.style.left = mx + 'px';
    dot.style.top  = my + 'px';
  });

  /* Ring follows with lag — stops rAF when mouse leaves document */
  function animateRing() {
    if (!running) return;
    rx += (mx - rx) * 0.14;
    ry += (my - ry) * 0.14;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    rafId = requestAnimationFrame(animateRing);
  }
  animateRing();

  /* Hover state on interactive elements */
  const hoverSel = 'a,button,summary,.btn,.price-card,.feature-card,.step-card,.support-card,.faq-item';
  document.querySelectorAll(hoverSel).forEach(function(el) {
    el.addEventListener('mouseenter', function() { dot.classList.add('is-hover'); ring.classList.add('is-hover'); });
    el.addEventListener('mouseleave', function() { dot.classList.remove('is-hover'); ring.classList.remove('is-hover'); });
  });

  document.addEventListener('mousedown', function() { dot.classList.add('is-click'); ring.classList.add('is-click'); });
  document.addEventListener('mouseup',   function() { dot.classList.remove('is-click'); ring.classList.remove('is-click'); });
  document.addEventListener('mouseleave', function() {
    dot.style.opacity = '0'; ring.style.opacity = '0';
    running = false; cancelAnimationFrame(rafId);
  });
  document.addEventListener('mouseenter', function() {
    dot.style.opacity = '1'; ring.style.opacity = '1';
    if (!running) { running = true; animateRing(); }
  });
})();

/* ── FAQ smooth slide (replace native <details>) ────────────── */
(function initFaqSlide() {
  const items = document.querySelectorAll('.faq-item');
  if (!items.length) return;

  const style = document.createElement('style');
  style.textContent = `
    .faq-item{overflow:hidden}
    .faq-item summary{user-select:none}
    .faq-body{
      display:grid;
      grid-template-rows:0fr;
      transition:grid-template-rows 380ms cubic-bezier(.4,0,.2,1);
    }
    .faq-body.is-open{grid-template-rows:1fr}
    .faq-body__inner{overflow:hidden}
    .faq-item[open]>.faq-body{grid-template-rows:1fr}
  `;
  document.head.appendChild(style);

  items.forEach(function(item) {
    const summary = item.querySelector('summary');
    const p = item.querySelector('p');
    if (!summary || !p) return;

    /* Set initial aria-expanded state */
    summary.setAttribute('aria-expanded', 'false');

    /* Wrap content in animated div */
    const body = document.createElement('div');
    body.className = 'faq-body';
    const inner = document.createElement('div');
    inner.className = 'faq-body__inner';
    inner.appendChild(p);
    body.appendChild(inner);
    item.appendChild(body);

    summary.addEventListener('click', function(e) {
      e.preventDefault();
      const isOpen = body.classList.contains('is-open');

      /* Close all others */
      items.forEach(function(other) {
        if (other === item) return;
        const ob = other.querySelector('.faq-body');
        if (ob) ob.classList.remove('is-open');
        other.removeAttribute('open');
        other.querySelector('summary').setAttribute('aria-expanded', 'false');
      });

      if (isOpen) {
        body.classList.remove('is-open');
        item.removeAttribute('open');
        summary.setAttribute('aria-expanded', 'false');
      } else {
        item.setAttribute('open', '');
        body.classList.add('is-open');
        summary.setAttribute('aria-expanded', 'true');
      }
    });
  });
})();

/* ── 3D tilt hover on cards ─────────────────────────────────── */
(function initTilt() {
  if ('ontouchstart' in window) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const cards = document.querySelectorAll('.feature-card, .price-card, .step-card, .support-card');
  const MAX = 8; /* max degrees */

  cards.forEach(function(card) {
    card.style.transition = 'transform 80ms ease, box-shadow 200ms ease';

    card.addEventListener('mousemove', function(e) {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width  - 0.5;
      const y = (e.clientY - r.top)  / r.height - 0.5;
      const rotX = (-y * MAX).toFixed(2);
      const rotY = ( x * MAX).toFixed(2);
      card.style.willChange = 'transform';
      card.style.transform = 'perspective(700px) rotateX(' + rotX + 'deg) rotateY(' + rotY + 'deg) translateZ(6px)';
      card.style.boxShadow = '0 24px 50px rgba(0,0,0,0.14)';
    });

    card.addEventListener('mouseleave', function() {
      card.style.transition = 'transform 400ms ease, box-shadow 400ms ease';
      card.style.transform  = '';
      card.style.boxShadow  = '';
      setTimeout(function() {
        card.style.transition = 'transform 80ms ease, box-shadow 200ms ease';
        card.style.willChange = 'auto';
      }, 420);
    });
  });
})();

/* ── Active nav highlight ───────────────────────────────────── */
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
        if (isCurrent) link.setAttribute('aria-current', 'page');
        else link.removeAttribute('aria-current');
      });
    });
  }, { rootMargin: '-42% 0px -50% 0px', threshold: 0 });

  sections.forEach(function (section) { observer.observe(section); });
})();
