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

  /* ---------- Light / dark theme ---------- */
  const root        = document.documentElement;
  const themeToggle = document.querySelector('.theme-toggle');

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    if (themeToggle) {
      themeToggle.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
    }
  }

  function savedTheme() {
    try { return localStorage.getItem('theme'); } catch (e) { return null; }
  }

  applyTheme(root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light');

  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      try { localStorage.setItem('theme', next); } catch (e) {}
    });
  }

  // follow the device setting until the visitor picks a theme themselves
  if (window.matchMedia) {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const onSystemChange = function (e) {
      if (!savedTheme()) applyTheme(e.matches ? 'dark' : 'light');
    };
    if (mq.addEventListener) mq.addEventListener('change', onSystemChange);
    else if (mq.addListener) mq.addListener(onSystemChange);
  }

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