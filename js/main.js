/* =================================================================
   IPS PORLASALUD — main.js
   ================================================================= */
(function () {
  'use strict';
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const WA = 'https://wa.me/573161776021?text=';
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Icon library (Lucide-style strokes) ---------- */
  const I = {
    home:'<path d="M3 11.3 12 4l9 7.3M5 10v9h4.5v-5h5v5H19v-9" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/><path d="M12 11.4v3.2M10.4 13h3.2" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/>',
    ambulance:'<rect x="2.5" y="7.5" width="11.5" height="8" rx="1.2" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M14 10h3.4l3 3v2.5H14z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><circle cx="7" cy="17.5" r="1.9" fill="none" stroke="currentColor" stroke-width="1.6"/><circle cx="17" cy="17.5" r="1.9" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M7.2 9.6v2.6M5.9 10.9h2.6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>',
    pulse:'<path d="M12 20S3 14 3 8.6A4.6 4.6 0 0 1 12 6a4.6 4.6 0 0 1 9 2.6C21 14 12 20 12 20Z" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M6.4 11h2.1l1.3-2.3 2 4.4 1.4-2.7 1 .6h3.6" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>',
    plane:'<path d="M21 15.4 14 13V6.6a2 2 0 0 0-4 0V13l-7 2.4v1.9l7-1.6V19l-2 1.3v1.4l4-1 4 1v-1.4L14 19v-3.3l7 1.6z" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/>',
    baby:'<circle cx="12" cy="12" r="8.4" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M9.2 10.8h.01M14.8 10.8h.01" stroke="currentColor" stroke-width="2.1" stroke-linecap="round"/><path d="M9.6 14.4c.7.7 1.5 1 2.4 1s1.7-.3 2.4-1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" fill="none"/><path d="M12 3.6v-1M8.2 4.2l-.5-.9M15.8 4.2l.5-.9" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>',
    physio:'<rect x="4.4" y="9" width="3" height="6" rx="1" fill="none" stroke="currentColor" stroke-width="1.6"/><rect x="16.6" y="9" width="3" height="6" rx="1" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M2.6 12h1.8M19.6 12h1.8M7.4 12h9.2" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>',
    nutrition:'<path d="M12 8.2C10.4 6.6 6.7 6.4 5.4 9.5 3.9 13 6.5 19.5 9.3 19.5c1 0 1.6-.5 2.7-.5s1.7.5 2.7.5c2.8 0 5.4-6.5 3.9-10-1.3-3.1-5-2.9-6.6-1.3Z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M12 8.2c0-2 1-3.6 3.1-4.2-.2 2.1-1.2 3.5-3.1 4.2Z" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/>',
    elder:'<circle cx="10.5" cy="5" r="2.2" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M10.5 8c-1.7 0-2.6 1.1-2.8 2.6L7 16M10.5 8c1.4 0 2.3.8 2.7 2.1l1.1 4.6M8.6 13l-1.3 7M12.6 14.2l1.1 6.1M16.4 9v12" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>',
    stetho:'<path d="M5 4v5a4 4 0 0 0 8 0V4" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><path d="M5 4H3.5M13 4h1.5M9 13v3a4 4 0 0 0 8 0v-1" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><circle cx="18" cy="13" r="2.2" fill="none" stroke="currentColor" stroke-width="1.6"/>',
    cross:'<path d="M9 3h6v6h6v6h-6v6H9v-6H3V9h6z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>',
    clip:'<rect x="5" y="4" width="14" height="17" rx="2" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M9 4a3 3 0 0 1 6 0M8.5 11h7M8.5 15h5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" fill="none"/>',
    arrow:'<path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
    star:'<path d="M12 3.2l2.5 5.3 5.8.7-4.3 4 1.1 5.8L12 16.2 6.9 19l1.1-5.8-4.3-4 5.8-.7z"/>'
  };
  const svg = (k, cls = 'ic') => `<svg viewBox="0 0 24 24" class="${cls}" aria-hidden="true">${I[k]}</svg>`;

  /* ================= LOADER ================= */
  (function loader() {
    const el = $('#loader'); if (!el) return;
    // particles
    const pc = $('#loaderParticles');
    if (pc && !reduce) {
      for (let i = 0; i < 16; i++) {
        const s = document.createElement('span');
        const size = 4 + Math.random() * 10;
        s.style.cssText = `width:${size}px;height:${size}px;left:${Math.random()*100}%;top:${60+Math.random()*40}%;animation-duration:${2.5+Math.random()*2.5}s;animation-delay:${Math.random()*2}s`;
        pc.appendChild(s);
      }
    }
    const bar = $('#loaderBar');
    const done = () => { el.classList.add('is-done'); document.body.style.overflow = ''; setTimeout(() => el.remove(), 750); };
    let p = 0;
    const tick = setInterval(() => {
      p = Math.min(100, p + Math.random() * 16 + 6);
      if (bar) bar.style.width = p + '%';
      if (p >= 100) clearInterval(tick);
    }, 130);
    document.body.style.overflow = 'hidden';
    // hide between 1.7s and 2s max
    const start = performance.now();
    const finish = () => { const wait = Math.max(0, 1700 - (performance.now() - start)); setTimeout(done, wait); };
    if (document.readyState === 'complete') finish(); else window.addEventListener('load', finish);
    setTimeout(done, 2050); // hard cap
  })();

  /* ================= HEADER / NAV ================= */
  const header = $('#header'), navToggle = $('#navToggle'), nav = $('#nav');
  const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 40);
  onScroll(); addEventListener('scroll', onScroll, { passive: true });

  navToggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    navToggle.classList.toggle('open', open);
    navToggle.setAttribute('aria-expanded', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });
  $$('.nav__link').forEach(l => l.addEventListener('click', () => {
    nav.classList.remove('open'); navToggle.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false'); document.body.style.overflow = '';
  }));

  /* ================= DATA ================= */
  const services = [
    { t:'Salud Domiciliaria', img:'svc-domiciliaria', ic:'home', bic:'doctor',
      d:'Visita médica, urgencias a domicilio, administración de medicamentos, inyectología, nebulizaciones, electrocardiograma, glucometría e inmovilización con vendajes.' },
    { t:'Traslados Asistenciales Básicos', img:'svc-basico', ic:'ambulance', bic:'ambulance',
      d:'Movilización segura de pacientes y neonatos de baja complejidad (TAB) con equipos médicos certificados y personal capacitado.' },
    { t:'Traslados Medicalizados', img:'svc-medicalizado', ic:'pulse', bic:'iv',
      d:'Ambulancias de alta complejidad (TAM) equipadas con personal especializado para el transporte de pacientes en estado crítico.' },
    { t:'Ambulancia Aérea', img:'svc-aerea', ic:'plane', bic:'air',
      d:'Traslados aeromédicos nacionales con profesionales y aeronaves de alta experiencia, según los protocolos del Min. de Salud y Aeronáutica Civil.' },
    { t:'Pediatría', img:'svc-pediatria', ic:'baby', bic:'pediatric',
      d:'Atención médica especializada y cercana para el cuidado y bienestar de los más pequeños de la casa.' },
    { t:'Fisioterapia', img:'svc-fisio', ic:'physio', bic:'physio',
      d:'Recuperación física y rehabilitación con acompañamiento profesional, en el sitio que el paciente necesite.' },
    { t:'Nutrición', img:null, ic:'nutrition', bic:'nutrition',
      d:'Evaluación y acompañamiento nutricional personalizado para promover hábitos saludables en toda la familia.' },
    { t:'Atención al Adulto Mayor', img:'svc-adultomayor', ic:'elder', bic:'elderly',
      d:'Seguimiento integral y cuidado especializado, con calidez y respeto, para nuestros adultos mayores.' },
  ];

  const testimonials = [
    { n:'María Fernanda Gómez', r:'Familiar de paciente', img:'avatar-nurse', s:5,
      x:'La ambulancia llegó rapidísimo y el personal fue muy humano con mi papá. Nos sentimos acompañados en todo momento.' },
    { n:'Carlos A. Ramírez', r:'Paciente domiciliario', img:'avatar-doctor', s:5,
      x:'Recibo mis curaciones en casa con total profesionalismo. Excelente atención y siempre puntuales.' },
    { n:'Liliana Restrepo', r:'Cuidadora familiar', img:'avatar-nurse', s:5,
      x:'Coordinaron un traslado medicalizado entre ciudades sin un solo contratiempo. Gracias por el cuidado y la calidez.' },
  ];

  const roles = [
    { t:'Médicos', ic:'stetho' }, { t:'Enfermeras/os', ic:'cross' },
    { t:'Paramédicos', ic:'ambulance' }, { t:'Fisioterapeutas', ic:'physio' },
    { t:'Nutricionistas', ic:'nutrition' }, { t:'Pilotos y conductores', ic:'plane' },
    { t:'Personal administrativo', ic:'clip' }, { t:'Atención al usuario', ic:'pulse' },
  ];

  const cities = [
    { n:'Barranquilla', x:37, y:14 }, { n:'Medellín', x:39, y:35 },
    { n:'Bucaramanga', x:53, y:31 }, { n:'Bogotá', x:53, y:46, hub:true },
    { n:'Pereira', x:38, y:46 }, { n:'Cali', x:34, y:57 },
    { n:'Pasto', x:33, y:70 }, { n:'Villavicencio', x:59, y:49 }, { n:'Leticia', x:60, y:89 },
  ];

  /* ================= RENDER: SERVICES ================= */
  $('#servicesGrid').innerHTML = services.map(s => {
    const badge = `<img class="svc-card__icon" src="assets/icons/${s.bic}.webp" alt="" loading="lazy" width="58" height="58">`;
    const media = s.img
      ? `<div class="svc-card__media"><img src="assets/img/${s.img}.webp" alt="${s.t}" loading="lazy">${badge}</div>`
      : `<div class="svc-card__media svc-card__media--brand"><span class="brand-mark">${svg(s.ic)}</span>${badge}</div>`;
    const msg = encodeURIComponent(`Hola, deseo más información sobre el servicio de ${s.t} de IPS PORLASALUD.`);
    return `<article class="svc-card" data-aos="fade-up">
      ${media}
      <div class="svc-card__body">
        <h3>${s.t}</h3>
        <p>${s.d}</p>
        <a class="svc-card__link" href="${WA}${msg}" target="_blank" rel="noopener">Solicitar servicio ${svg('arrow')}</a>
      </div>
    </article>`;
  }).join('');

  /* ================= RENDER: TESTIMONIALS ================= */
  $('#testiGrid').innerHTML = testimonials.map(t =>
    `<article class="testi__card" data-aos="fade-up">
      <span class="testi__quote">&rdquo;</span>
      <div class="testi__stars">${svg('star').repeat(t.s)}</div>
      <p class="testi__text">${t.x}</p>
      <div class="testi__author">
        <img src="assets/img/${t.img}.webp" alt="${t.n}" loading="lazy">
        <div><strong>${t.n}</strong><span>${t.r}</span></div>
      </div>
    </article>`).join('');

  /* ================= RENDER: TEAM ROLES ================= */
  $('#teamRoles').innerHTML = roles.map(r =>
    `<div class="team__role">${svg(r.ic)}<span>${r.t}</span></div>`).join('');

  /* ================= RENDER: SPECIALTIES (branded icons del logo) ================= */
  const specialties = [
    ['doctor','Consulta médica'], ['iv','Atención domiciliaria'], ['ambulance','Ambulancias'],
    ['air','Ambulancia aérea'], ['pediatric','Pediatría'], ['elderly','Adulto mayor'],
    ['police','Transporte especial'], ['dental','Odontología'], ['vet','Veterinaria'],
  ];
  const sg = $('#specialtiesGrid');
  if (sg) sg.innerHTML = specialties.map(([ic, label]) =>
    `<div class="specialty"><img src="assets/icons/${ic}.webp" alt="${label}" loading="lazy"><span>${label}</span></div>`).join('');

  /* ================= RENDER: COVERAGE ================= */
  const pinsBox = $('#mapPins'), routesSvg = $('#mapRoutes'), citiesBox = $('#coverageCities');
  const hub = cities.find(c => c.hub);
  pinsBox.innerHTML = cities.map(c =>
    `<div class="map-pin ${c.hub ? 'map-pin--hub' : ''}" style="left:${c.x}%;top:${c.y}%"><i></i><b></b><span>${c.n}</span></div>`).join('');
  citiesBox.innerHTML = cities.map(c => `<span>${c.n}</span>`).join('');
  // routes hub -> selected cities
  const targets = ['Barranquilla','Medellín','Cali','Bucaramanga','Leticia','Pasto'];
  routesSvg.innerHTML = cities.filter(c => targets.includes(c.n)).map(c => {
    const mx = (hub.x + c.x) / 2, my = (hub.y + c.y) / 2;
    const dx = c.x - hub.x, dy = c.y - hub.y;
    const cx = mx - dy * 0.18, cy = my + dx * 0.18;
    return `<path class="map-route" d="M${hub.x} ${hub.y} Q ${cx} ${cy} ${c.x} ${c.y}"/>`;
  }).join('');

  /* ================= YEAR ================= */
  $('#year').textContent = new Date().getFullYear();

  /* ================= CONTACT FORM -> WHATSAPP ================= */
  $('#contactForm').addEventListener('submit', e => {
    e.preventDefault();
    const f = e.target;
    if (!f.name.value.trim() || !f.phone.value.trim()) {
      [f.name, f.phone].forEach(i => { if (!i.value.trim()) { i.style.borderColor = '#e0556a'; i.addEventListener('input', () => i.style.borderColor = '', { once: true }); } });
      return;
    }
    const msg = `*Solicitud de atención — IPS PORLASALUD*%0A%0A*Nombre:* ${encodeURIComponent(f.name.value)}%0A*Teléfono:* ${encodeURIComponent(f.phone.value)}%0A*Servicio:* ${encodeURIComponent(f.service.value)}%0A*Mensaje:* ${encodeURIComponent(f.msg.value || '—')}`;
    window.open(WA + msg, '_blank');
  });

  /* ================= FLOATING UI ================= */
  const toTop = $('#toTop');
  addEventListener('scroll', () => toTop.classList.toggle('show', window.scrollY > 600), { passive: true });
  toTop.addEventListener('click', () => scrollTo({ top: 0, behavior: 'smooth' }));

  /* ================= ANIMATION LIBS ================= */
  // AOS
  if (window.AOS) AOS.init({ duration: 800, easing: 'ease-out-cubic', once: true, offset: 60, disable: reduce });
  else $$('[data-aos]').forEach(el => el.removeAttribute('data-aos'));

  // ScrollReveal (hero sequence)
  if (window.ScrollReveal && !reduce) {
    ScrollReveal().reveal('[data-sr-hero]', { origin: 'bottom', distance: '34px', duration: 850, interval: 110, easing: 'cubic-bezier(.22,1,.36,1)', opacity: 0 });
  }

  // GSAP
  if (window.gsap) {
    if (window.ScrollTrigger) gsap.registerPlugin(ScrollTrigger);
    if (!reduce && window.ScrollTrigger) {
      gsap.to('.hero__img', { yPercent: 16, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
      gsap.to('.hero__content', { y: 60, opacity: .7, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
    }
    // counters
    const runCount = el => {
      const target = +el.dataset.target; const dur = 1.6; const o = { v: 0 };
      if (reduce || !window.gsap) { el.textContent = target; return; }
      gsap.to(o, { v: target, duration: dur, ease: 'power2.out', onUpdate: () => el.textContent = Math.round(o.v) });
    };
    if (window.ScrollTrigger) {
      ScrollTrigger.create({ trigger: '.stats', start: 'top 80%', once: true, onEnter: () => $$('.count').forEach(runCount) });
      // reveal map labels briefly when in view
      ScrollTrigger.create({ trigger: '#cobertura', start: 'top 65%', once: true, onEnter: () => {
        const pins = $$('.map-pin'); pins.forEach((p, i) => setTimeout(() => { p.classList.add('show-label'); setTimeout(() => p.classList.remove('show-label'), 2200); }, i * 160));
      }});
    } else {
      $$('.count').forEach(el => el.textContent = el.dataset.target);
    }
  } else {
    $$('.count').forEach(el => el.textContent = el.dataset.target);
  }

  /* ================= ACTIVE NAV (scroll spy) ================= */
  const links = $$('.nav__link');
  const map = {};
  links.forEach(l => { const id = l.getAttribute('href').slice(1); if (id) map[id] = l; });
  const spy = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { links.forEach(l => l.classList.remove('active')); map[e.target.id] && map[e.target.id].classList.add('active'); } });
  }, { rootMargin: '-45% 0px -50% 0px' });
  ['inicio','nosotros','servicios','porque','cobertura','contacto'].forEach(id => { const el = document.getElementById(id); if (el) spy.observe(el); });

  /* ================= MAGNETIC BUTTONS ================= */
  if (!reduce && matchMedia('(hover:hover)').matches) {
    $$('.btn--gold, .btn--navy').forEach(b => {
      b.addEventListener('mousemove', e => { const r = b.getBoundingClientRect(); gsap && gsap.to(b, { x: (e.clientX - r.left - r.width/2) * .18, y: (e.clientY - r.top - r.height/2) * .28, duration: .4 }); });
      b.addEventListener('mouseleave', () => gsap && gsap.to(b, { x: 0, y: 0, duration: .5, ease: 'elastic.out(1,.4)' }));
    });
  }
})();
