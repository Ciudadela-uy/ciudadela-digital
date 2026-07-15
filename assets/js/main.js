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
    const normalizedLang = (lang === 'es' || lang === 'en') ? lang : 'en';
    localStorage.setItem('lang', normalizedLang);
    document.documentElement.lang = normalizedLang;
    
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (translations[normalizedLang] && translations[normalizedLang][key]) {
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
          el.placeholder = translations[normalizedLang][key];
        } else {
          el.textContent = translations[normalizedLang][key];
        }
      } else if (translations.en && translations.en[key]) {
        // Fallback to English if a key is missing in the selected language.
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
          el.placeholder = translations.en[key];
        } else {
          el.textContent = translations.en[key];
        }
      }
    });

    const toggleBtn = document.getElementById('lang-toggle');
    if (toggleBtn) {
      toggleBtn.textContent = normalizedLang === 'en' ? 'ES' : 'EN';
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

  const navHeight = parseInt(
    getComputedStyle(document.documentElement).getPropertyValue('--nav-height'), 10
  ) || 72;

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
  const revealEls = Array.from(document.querySelectorAll('.reveal'));
  if (revealEls.length) {
    const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let ticking = false;

    function updateScrollMotion() {
      const scrollY = window.scrollY;

      if (parallaxEl && !prefersReducedMotion.matches) {
        parallaxEl.style.setProperty('--hero-parallax-offset', `${scrollY * 0.22}px`);
      }

      revealEls.forEach(el => {
        if (prefersReducedMotion.matches) {
          el.style.setProperty('--reveal-progress', '1');
          el.classList.add('is-visible');
          return;
        }

        const rect = el.getBoundingClientRect();
        const start = window.innerHeight * 0.76;
        const end = window.innerHeight * 0.38;
        const rawProgress = clamp((start - rect.top) / (start - end), 0, 1);
        const progress = 1 - Math.pow(1 - rawProgress, 2.1);

        el.style.setProperty('--reveal-progress', progress.toFixed(3));
        el.classList.toggle('is-visible', progress >= 0.995);
      });

      ticking = false;
    }

    function requestScrollMotionUpdate() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(updateScrollMotion);
    }

    window.addEventListener('scroll', requestScrollMotionUpdate, { passive: true });
    window.addEventListener('resize', requestScrollMotionUpdate, { passive: true });
    if (typeof prefersReducedMotion.addEventListener === 'function') {
      prefersReducedMotion.addEventListener('change', requestScrollMotionUpdate);
    }
    requestScrollMotionUpdate();
  } else if (parallaxEl && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const updateParallax = () => {
      parallaxEl.style.setProperty('--hero-parallax-offset', `${window.scrollY * 0.22}px`);
    };

    window.addEventListener('scroll', updateParallax, { passive: true });
    window.addEventListener('resize', updateParallax, { passive: true });
    updateParallax();
  }
})();