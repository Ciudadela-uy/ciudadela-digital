(function () {
  'use strict';

  const translations = {
    en: {
      "page.title": "Ciudadela Digital",
      "nav.about": "About",
      "nav.games": "Games",
      "nav.contact": "Contact",
      "hero.subtitle": "Game Studio · Montevideo, Uruguay",
      "hero.title.1": "Ciudadela",
      "hero.title.2": "Digital",
      "hero.tagline": "We build worlds worth getting lost in.",
      "hero.cta.games": "See Our Games",
      "hero.cta.team": "Meet the Team",
      "hero.scroll": "scroll",
      "about.label": "Who we are",
      "about.title": "About Us",
      "about.subtitle": "Five developers. One mission.",
      "about.p1": "Ciudadela Digital is a five-person independent studio passionate about creating memorable, handcrafted games. Founded in Montevideo, we believe that small teams can build experiences that rival those of much larger studios — as long as every pixel, line of code, and sound effect is made with intention.",
      "about.p2": "We draw inspiration from retro aesthetics, sci-fi narratives, and the richness of Latin American culture. Our games are designed to challenge, surprise, and above all, stay with you long after you put the controller down.",
      "team.role.producer": "Co-founder & Producer",
      "team.role.artist": "Co-founder & Artist",
      "team.role.developer": "Co-founder & Developer",
      "team.role.writer": "Co-founder & Writer",
      "games.label": "What we make",
      "games.title": "Our Games",
      "games.subtitle": "Worlds built with passion.",
      "game.tag.action": "Action",
      "game.tag.scifi": "Sci-Fi",
      "game.tag.dev": "In Development",
      "game.desc": "A third-person action game set inside a collapsing AI megastructure. Fight rogue systems, hack terminals, and race the clock before the entire network wipes itself clean.",
      "game.cta": "Follow Updates",
      "contact.label": "Reach out",
      "contact.title": "Get in Touch",
      "contact.subtitle": "Press, collaborations, or just saying hi — we'd love to hear from you.",
      "contact.email": "agregar mail",
      "footer.rights": "© Ciudadela Digital. All rights reserved.",
      "404.title": "404 — Page Not Found | Ciudadela Digital",
      "404.code": "404",
      "404.label": "Error 404 — Page Not Found",
      "404.heading": "You've entered the void.",
      "404.desc": "The page you were looking for doesn't exist, was moved, or maybe got deleted by a rogue AI. Happens to the best of us.",
      "404.cta.home": "Go Back Home",
      "404.cta.games": "See Our Games"
    },
    es: {
      "page.title": "Ciudadela Digital",
      "nav.about": "Acerca de",
      "nav.games": "Juegos",
      "nav.contact": "Contacto",
      "hero.subtitle": "Estudio de Videojuegos · Montevideo, Uruguay",
      "hero.title.1": "Ciudadela",
      "hero.title.2": "Digital",
      "hero.tagline": "Construimos mundos en los que vale la pena perderse.",
      "hero.cta.games": "Ver Nuestros Juegos",
      "hero.cta.team": "Conoce al Equipo",
      "hero.scroll": "desplazar",
      "about.label": "Quiénes somos",
      "about.title": "Sobre Nosotros",
      "about.subtitle": "Cinco desarrolladores. Una misión.",
      "about.p1": "Ciudadela Digital es un estudio independiente de cinco personas apasionado por crear juegos memorables y hechos a mano. Fundado en Montevideo, creemos que los equipos pequeños pueden construir experiencias que rivalizan con las de estudios mucho más grandes, siempre que cada píxel, línea de código y efecto de sonido se haga con intención.",
      "about.p2": "Nos inspiramos en la estética retro, las narrativas de ciencia ficción y la riqueza de la cultura latinoamericana. Nuestros juegos están diseñados para desafiar, sorprender y, sobre todo, quedarse contigo mucho después de que sueltes el control.",
      "team.role.producer": "Co-fundador y Productor",
      "team.role.artist": "Co-fundador y Artista",
      "team.role.developer": "Co-fundador y Desarrollador",
      "team.role.writer": "Co-fundador y Escritor",
      "games.label": "Lo que hacemos",
      "games.title": "Nuestros Juegos",
      "games.subtitle": "Mundos construidos con pasión.",
      "game.tag.action": "Acción",
      "game.tag.scifi": "Ciencia Ficción",
      "game.tag.dev": "En Desarrollo",
      "game.desc": "Un juego de acción en tercera persona ambientado dentro de una megaestructura de IA en colapso. Lucha contra sistemas rebeldes, hackea terminales y contrarreloj antes de que toda la red se borre por completo.",
      "game.cta": "Seguir Actualizaciones",
      "contact.label": "Contáctanos",
      "contact.title": "Ponte en Contacto",
      "contact.subtitle": "Prensa, colaboraciones o simplemente para saludar, nos encantaría saber de ti.",
      "contact.email": "agregar mail",
      "footer.rights": "© Ciudadela Digital. Todos los derechos reservados.",
      "404.title": "404 — Página No Encontrada | Ciudadela Digital",
      "404.code": "404",
      "404.label": "Error 404 — Página No Encontrada",
      "404.heading": "Has entrado al vacío.",
      "404.desc": "La página que buscabas no existe, fue movida o quizás fue eliminada por una IA rebelde. Nos pasa a los mejores.",
      "404.cta.home": "Volver al Inicio",
      "404.cta.games": "Ver Nuestros Juegos"
    }
  };

  function setLanguage(lang) {
    localStorage.setItem('lang', lang);
    document.documentElement.lang = lang;
    
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (translations[lang] && translations[lang][key]) {
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
          el.placeholder = translations[lang][key];
        } else {
          el.textContent = translations[lang][key];
        }
      }
    });

    const toggleBtn = document.getElementById('lang-toggle');
    if (toggleBtn) {
      toggleBtn.textContent = lang === 'en' ? 'ES' : 'EN';
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('lang') || 'en';
    setLanguage(savedLang);

    const toggleBtn = document.getElementById('lang-toggle');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => {
        const currentLang = document.documentElement.lang || 'en';
        const newLang = currentLang === 'en' ? 'es' : 'en';
        setLanguage(newLang);
      });
    }
  });

  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }
  window.scrollTo(0, 0);

  const navHeight = parseInt(
    getComputedStyle(document.documentElement).getPropertyValue('--nav-height'), 10
  ) || 72;
  let isSnapping = false;

  const yearEl = document.getElementById('footer-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
  const footerEl = document.querySelector('.site-footer');
  function syncFooterHeightVar() {
    if (!footerEl) return;
    document.documentElement.style.setProperty('--footer-height', `${footerEl.offsetHeight}px`);
  }
  syncFooterHeightVar();
  window.addEventListener('resize', syncFooterHeightVar, { passive: true });

  const header = document.querySelector('.site-header');
  if (header) {
    const onScroll = () => {
      header.classList.toggle('is-scrolled', window.scrollY > 20);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    window.addEventListener('load', onScroll);
  }

  const toggle = document.querySelector('.nav__toggle');
  const menu = document.getElementById('nav-menu');

  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      const isOpen = menu.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(isOpen));
      const bars = toggle.querySelectorAll('.nav__toggle-bar');
      if (isOpen) {
        bars[0].style.transform = 'translateY(7px) rotate(45deg)';
        bars[1].style.opacity = '0';
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

  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav__link');
  if (sections.length && navLinks.length) {
    function setActiveLink() {
      if (isSnapping) return;
      let current = '';
      sections.forEach(s => {
        if (window.scrollY >= s.offsetTop - navHeight - 48) {
          current = s.getAttribute('id');
        }
      });
      const scrolledBottom = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2;
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

  const revealEls = Array.from(document.querySelectorAll('.reveal'));
  if (revealEls.length) {
    if ('IntersectionObserver' in window) {
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

  if (sections.length && window.matchMedia('(min-width: 901px)').matches) {
    const sectionArr = Array.from(sections);
    let locked = false;
    let lockTimer;
    let lastWheelTime = 0;
    const SNAP_DURATION = 850;
    function easeOutQuint(t) { return 1 - Math.pow(1 - t, 5); }

    function snapTo(targetY) {
      isSnapping = true;
      const startY = window.scrollY;
      const dist = targetY - startY;
      const start = performance.now();
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

      const dir = e.deltaY > 0 ? 1 : -1;
      const current = nearestIndex();
      const next = current + dir;

      if (next < 0 || next >= sectionArr.length) return;

      e.preventDefault();
      lastWheelTime = now;
      locked = true;
      snapTo(targetYFor(next));

      clearTimeout(lockTimer);
      lockTimer = setTimeout(() => { locked = false; }, SNAP_DURATION + 50);
    }, { passive: false });

    let touchStartY = 0;
    window.addEventListener('touchstart', e => {
      touchStartY = e.touches[0].clientY;
    }, { passive: true });

    window.addEventListener('touchend', e => {
      if (locked) return;
      const delta = touchStartY - e.changedTouches[0].clientY;
      if (Math.abs(delta) < 30) return;

      const dir = delta > 0 ? 1 : -1;
      const current = nearestIndex();
      const next = current + dir;
      if (next < 0 || next >= sectionArr.length) return;

      locked = true;
      snapTo(targetYFor(next));

      clearTimeout(lockTimer);
      lockTimer = setTimeout(() => { locked = false; }, SNAP_DURATION + 50);
    }, { passive: true });
  }
})();