(() => {
  'use strict';

  /* ---------- Mobile menu ---------- */
  const menuBtn = document.getElementById('menuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const menuScrim = document.getElementById('menuScrim');

  function setMenuState(open){
    if(!menuBtn || !mobileMenu) return;
    mobileMenu.classList.toggle('open', open);
    menuBtn.setAttribute('aria-expanded', String(open));
    menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    if(menuScrim) menuScrim.hidden = !open;
    document.body.classList.toggle('no-scroll', open);
    const icon = menuBtn.querySelector('i');
    if(icon) icon.className = open ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
  }

  if(menuBtn && mobileMenu){
    menuBtn.addEventListener('click', () => {
      setMenuState(!mobileMenu.classList.contains('open'));
    });

    mobileMenu.querySelectorAll('a').forEach(a =>
      a.addEventListener('click', () => setMenuState(false))
    );

    if(menuScrim) menuScrim.addEventListener('click', () => setMenuState(false));

    document.addEventListener('keydown', (e) => {
      if(e.key === 'Escape' && mobileMenu.classList.contains('open')){
        setMenuState(false);
        menuBtn.focus();
      }
    });

    window.addEventListener('resize', () => {
      if(window.innerWidth > 900) setMenuState(false);
    });
  }

  /* ---------- Typewriter roles ---------- */
  const roles = ["Beginner Web Developer", "BSCS Student", "Curious Coder", "Aspiring Front-end Dev"];
  const typedEl = document.getElementById('typedRole');
  if(typedEl){
    let ri = 0, ci = 0, deleting = false;

    function typeLoop(){
      const current = roles[ri];
      if(!deleting){
        ci++;
        typedEl.textContent = current.slice(0, ci);
        if(ci === current.length){ deleting = true; setTimeout(typeLoop, 1400); return; }
      } else {
        ci--;
        typedEl.textContent = current.slice(0, ci);
        if(ci === 0){ deleting = false; ri = (ri + 1) % roles.length; }
      }
      setTimeout(typeLoop, deleting ? 45 : 85);
    }
    typeLoop();
  }

  /* ---------- Active nav link on scroll (desktop rail + mobile menu) ---------- */
  const navLinks = document.querySelectorAll('[data-nav]');
  const sections = document.querySelectorAll('main section');

  function setActive(id){
    navLinks.forEach(link => {
      link.classList.toggle('is-active', link.getAttribute('href') === '#' + id);
    });
  }

  if('IntersectionObserver' in window && sections.length){
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if(entry.isIntersecting) setActive(entry.target.id);
      });
    }, { rootMargin: '-40% 0px -50% 0px' });
    sections.forEach(s => observer.observe(s));
  } else {
    window.addEventListener('scroll', () => {
      let current = sections[0] && sections[0].id;
      sections.forEach(s => {
        if(s.getBoundingClientRect().top <= 0) current = s.id;
      });
      setActive(current);
    }, { passive: true });
  }

  /* ---------- Footer year ---------- */
  const yearEl = document.getElementById('year');
  if(yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Marquee tool icons ---------- */
  const row1 = [
    { icon: 'fa-brands fa-html5', label: 'HTML5' },
    { icon: 'fa-brands fa-css3-alt', label: 'CSS3' },
    { icon: 'fa-brands fa-js', label: 'JavaScript' },
    { icon: 'fa-brands fa-bootstrap', label: 'Bootstrap' },
    { icon: 'fa-brands fa-git-alt', label: 'Git' },
    { icon: 'fa-brands fa-github', label: 'GitHub' },
  ];
  const row2 = [
    { icon: 'fa-brands fa-python', label: 'Python' },
    { text: 'C', label: 'C' },
    { text: 'C++', label: 'C++' },
    { text: 'ASM', label: 'Assembly' },
    { icon: 'fa-brands fa-figma', label: 'Figma' },
    { icon: 'fa-solid fa-code', label: 'VS Code' },
  ];

  function buildTrack(el, items){
    if(!el) return;
    const html = items.map(i => `
      <div class="tool-item">
        <span class="icon-box ${i.text ? 'text' : ''}">${i.text ? i.text : `<i class="${i.icon}"></i>`}</span>
        <span>${i.label}</span>
      </div>`).join('');
    el.innerHTML = html + html;
  }
  buildTrack(document.getElementById('track1'), row1);
  buildTrack(document.getElementById('track2'), row2);
})();