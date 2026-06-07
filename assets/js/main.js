/* ═══════════════════════════════════════════════════════════════
   Ciudadela Digital — main.js
   Navbar · Mobile menu · Smooth scroll · Active link ·
   Hero parallax · Scroll reveal · Section snap
═══════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  // ── Single source of truth for navbar height ─────────────────
  const navHeight = parseInt(
    getComputedStyle(document.documentElement).getPropertyValue('--nav-height'), 10
  ) || 72;

  // ── Footer year ───────────────────────────────────────────────
  const yearEl = document.getElementById('footer-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const footerEl = document.querySelector('.site-footer');
  function syncFooterHeightVar() {
    if (!footerEl) return;
    document.documentElement.style.setProperty('--footer-height', `${footerEl.offsetHeight}px`);
  }
  syncFooterHeightVar();
  window.addEventListener('resize', syncFooterHeightVar, { passive: true });

  // ── Navbar: glass effect on scroll ───────────────────────────
  const header = document.querySelector('.site-header');
  if (header) {
    const onScroll = () => {
      header.classList.toggle('is-scrolled', window.scrollY > 20);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // ── Mobile nav toggle ─────────────────────────────────────────
  const toggle = document.querySelector('.nav__toggle');
  const menu   = document.getElementById('nav-menu');

  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      const isOpen = menu.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(isOpen));
      const bars = toggle.querySelectorAll('.nav__toggle-bar');
      if (isOpen) {
        bars[0].style.transform = 'translateY(7px) rotate(45deg)';
        bars[1].style.opacity   = '0';
        bars[2].style.transform = 'translateY(-7px) rotate(-45deg)';
      } else {
        bars.forEach(b => { b.style.transform = ''; b.style.opacity = ''; });
      }
    });

    menu.querySelectorAll('.nav__link').forEach(link => {
      link.addEventListener('click', () => {
        menu.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        const bars = toggle.querySelectorAll('.nav__toggle-bar');
        bars.forEach(b => { b.style.transform = ''; b.style.opacity = ''; });
      });
    });

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && menu.classList.contains('is-open')) {
        menu.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        const bars = toggle.querySelectorAll('.nav__toggle-bar');
        bars.forEach(b => { b.style.transform = ''; b.style.opacity = ''; });
        toggle.focus();
      }
    });
  }

  // ── Smooth scroll on nav links ────────────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (!target) return;
      e.preventDefault();
      window.scrollTo({
        top: target.getBoundingClientRect().top + window.scrollY - navHeight,
        behavior: 'smooth'
      });
    });
  });

  // ── Active nav link on scroll ─────────────────────────────────
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav__link');

  if (sections.length && navLinks.length) {
    function setActiveLink() {
      let current = '';
      sections.forEach(s => {
        if (window.scrollY >= s.offsetTop - navHeight - 48) {
          current = s.getAttribute('id');
        }
      });

      const scrolledBottom = window.scrollY + window.innerHeight >=
        document.documentElement.scrollHeight - 2;
      if (scrolledBottom) {
        const last = sections[sections.length - 1];
        if (last) current = last.getAttribute('id') || current;
      }

      navLinks.forEach(link => {
        link.classList.toggle(
          'nav__link--active',
          link.getAttribute('href') === '#' + current
        );
      });
    }

    window.addEventListener('scroll', setActiveLink, { passive: true });
    setActiveLink();
  }

  // ── Hero Parallax ─────────────────────────────────────────────
  const parallaxEl = document.querySelector('.hero__parallax');
  if (parallaxEl) {
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (isSnapping) return;
      if (!ticking) {
        requestAnimationFrame(() => {
          parallaxEl.style.transform = `translateY(${window.scrollY * 0.35}px)`;
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  // ── Scroll Reveal — IntersectionObserver (reversible) ─────────
  const revealEls = Array.from(document.querySelectorAll('.reveal'));

  if (revealEls.length) {
    if ('IntersectionObserver' in window) {
      // Tuning knobs for reveal timing:
      // - Higher threshold => later entry and earlier exit
      // - More negative top/bottom margins => smaller active viewport zone
      const REVEAL_THRESHOLD = 0.24;
      const REVEAL_ROOT_MARGIN = '-10% 0px -14% 0px';

      const io = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            entry.target.classList.toggle(
              'is-visible',
              entry.intersectionRatio >= REVEAL_THRESHOLD
            );
          });
        },
        { threshold: [0, REVEAL_THRESHOLD, 1], rootMargin: REVEAL_ROOT_MARGIN }
      );
      revealEls.forEach(el => io.observe(el));
    } else {
      revealEls.forEach(el => el.classList.add('is-visible'));
    }
  }

  // ── Section Snap — desktop only ───────────────────────────────
  if (sections.length && window.matchMedia('(min-width: 901px)').matches) {
    const sectionArr = Array.from(sections);
    let locked = false;
    let lockTimer;
    let lastWheelTime = 0;
    const SNAP_DURATION = 850;

    function easeOutQuint(t) { return 1 - Math.pow(1 - t, 5); }

    let isSnapping = false;

    function snapTo(targetY) {
      isSnapping = true;
      const startY = window.scrollY;
      const dist   = targetY - startY;
      const start  = performance.now();
      function step(now) {
        const t = Math.min((now - start) / SNAP_DURATION, 1);
        window.scrollTo(0, startY + dist * easeOutQuint(t));
        if (t < 1) requestAnimationFrame(step);
        else {
          window.scrollTo(0, targetY);
          isSnapping = false;
        }
      }
      requestAnimationFrame(step);
    }

    function nearestIndex() {
      const mid = window.scrollY + window.innerHeight * 0.5;
      let idx = 0;
      for (let i = 0; i < sectionArr.length; i++) {
        if (sectionArr[i].offsetTop - navHeight <= mid) idx = i;
      }
      return idx;
    }

    function targetYFor(index) {
      const maxY = document.documentElement.scrollHeight - window.innerHeight;
      const baseY = Math.max(0, sectionArr[index].offsetTop - navHeight);
      
      if (index === sectionArr.length - 1) {
        return maxY;
      }
      
      return Math.min(maxY, baseY);
    }

    window.addEventListener('wheel', function (e) {
      if (Math.abs(e.deltaY) < 3) return;

      if (locked) {
        e.preventDefault();
        return;
      }

      const now = performance.now();
      if (now - lastWheelTime < 100) return;

      const dir     = e.deltaY > 0 ? 1 : -1;
      const current = nearestIndex();
      const next    = current + dir;

      if (next < 0 || next >= sectionArr.length) return;

      e.preventDefault();
      lastWheelTime = now;
      locked = true;
      snapTo(targetYFor(next));

      clearTimeout(lockTimer);
      lockTimer = setTimeout(() => { locked = false; }, SNAP_DURATION + 50);

    }, { passive: false });

    // Touch swipe snap (touchpad)
    let touchStartY = 0;
    window.addEventListener('touchstart', e => {
      touchStartY = e.touches[0].clientY;
    }, { passive: true });

    window.addEventListener('touchend', e => {
      if (locked) return;
      const delta = touchStartY - e.changedTouches[0].clientY;
      if (Math.abs(delta) < 30) return;

      const dir     = delta > 0 ? 1 : -1;
      const current = nearestIndex();
      const next    = current + dir;
      if (next < 0 || next >= sectionArr.length) return;

      locked = true;
      snapTo(targetYFor(next));

      clearTimeout(lockTimer);
      lockTimer = setTimeout(() => { locked = false; }, SNAP_DURATION + 50);
    }, { passive: true });
  }

})();
