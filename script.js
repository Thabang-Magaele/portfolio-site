/* ============================================================
   Thabang Magaele — Portfolio interactions
   ============================================================ */
(function () {
  'use strict';

  /* ---------- Mobile navigation ---------- */
  const toggle   = document.querySelector('.nav-toggle');
  const nav      = document.getElementById('nav');
  const backdrop = document.getElementById('navBackdrop');

  function closeNav() {
    nav.classList.remove('open');
    if (toggle)   toggle.classList.remove('open');
    if (backdrop) backdrop.classList.remove('show');
    if (toggle)   toggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      const open = nav.classList.toggle('open');
      toggle.classList.toggle('open', open);
      if (backdrop) backdrop.classList.toggle('show', open);
      toggle.setAttribute('aria-expanded', String(open));
      document.body.style.overflow = open ? 'hidden' : '';
    });
  }

  if (backdrop) backdrop.addEventListener('click', closeNav);

  // close menu when a link is tapped
  nav && nav.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', closeNav);
  });

  // close on Escape
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeNav();
  });

  /* ---------- Header state on scroll ---------- */
  const header = document.querySelector('.site-header');
  function onScroll() {
    if (header) header.classList.toggle('scrolled', window.scrollY > 24);
  }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- Scroll reveal ---------- */
  const items = document.querySelectorAll('.reveal');

  if (!('IntersectionObserver' in window)) {
    items.forEach(function (el) { el.classList.add('in'); });
    return;
  }

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  // stagger reveals that share a parent for a smoother cascade
  const groups = new Map();
  items.forEach(function (el) {
    const parent = el.parentElement;
    const idx = groups.get(parent) || 0;
    el.style.transitionDelay = Math.min(idx * 90, 450) + 'ms';
    groups.set(parent, idx + 1);
    observer.observe(el);
  });
})();