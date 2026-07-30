/* ==========================================================================
   Agung Setiyadi Widyanto — Portfolio
   main.js
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------------- Loader ---------------- */
  const loader = document.getElementById('loader');
  window.addEventListener('load', () => {
    setTimeout(() => loader && loader.classList.add('done'), 500);
  });
  // fallback in case 'load' already fired
  setTimeout(() => loader && loader.classList.add('done'), 2200);

  /* ---------------- Lucide icons ---------------- */
  if (window.lucide) lucide.createIcons();

  /* ---------------- AOS ---------------- */
  if (window.AOS) {
    AOS.init({ duration: 800, easing: 'ease-out-cubic', once: true, offset: 60 });
  }

  /* ---------------- Custom cursor ---------------- */
  const dot = document.querySelector('.cursor-dot');
  const ring = document.querySelector('.cursor-ring');
  if (dot && ring && matchMedia('(hover:hover)').matches) {
    let mx = 0, my = 0, rx = 0, ry = 0;
    document.addEventListener('mousemove', e => {
      mx = e.clientX; my = e.clientY;
      dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%,-50%)`;
    });
    const tick = () => {
      rx += (mx - rx) * 0.15;
      ry += (my - ry) * 0.15;
      ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%,-50%)`;
      requestAnimationFrame(tick);
    };
    tick();
    document.querySelectorAll('a, button, .glass, input, textarea').forEach(el => {
      el.addEventListener('mouseenter', () => ring.classList.add('active'));
      el.addEventListener('mouseleave', () => ring.classList.remove('active'));
    });
  }

  /* ---------------- Navbar scroll + toggle ---------------- */
  const navbar = document.querySelector('.navbar');
  const onScroll = () => {
    if (!navbar) return;
    navbar.classList.toggle('scrolled', window.scrollY > 30);
    const btt = document.getElementById('back-to-top');
    if (btt) btt.classList.toggle('show', window.scrollY > 500);
  };
  document.addEventListener('scroll', onScroll);
  onScroll();

  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('open');
      navLinks.classList.toggle('open');
    });
    navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      navToggle.classList.remove('open');
      navLinks.classList.remove('open');
    }));
  }

  /* ---------------- Active nav link (section scroll-spy on index) ---------------- */
  const sections = document.querySelectorAll('main section[id]');
  const spyLinks = document.querySelectorAll('.nav-links a[href*="#"]');
  if (sections.length && spyLinks.length) {
    const spy = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          spyLinks.forEach(l => {
            l.classList.toggle('active', l.getAttribute('href').endsWith('#' + id));
          });
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(s => spy.observe(s));
  }

  /* ---------------- Back to top ---------------- */
  const btt = document.getElementById('back-to-top');
  if (btt) btt.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  /* ---------------- Typing animation ---------------- */
  const typeEl = document.getElementById('type-target');
  if (typeEl) {
    const words = JSON.parse(typeEl.dataset.words || '[]');
    let wi = 0, ci = 0, deleting = false;
    const speedType = 70, speedDelete = 35, hold = 1400;
    const tick = () => {
      const word = words[wi];
      if (!deleting) {
        ci++;
        typeEl.textContent = word.slice(0, ci);
        if (ci === word.length) { deleting = true; setTimeout(tick, hold); return; }
        setTimeout(tick, speedType);
      } else {
        ci--;
        typeEl.textContent = word.slice(0, ci);
        if (ci === 0) { deleting = false; wi = (wi + 1) % words.length; setTimeout(tick, 300); return; }
        setTimeout(tick, speedDelete);
      }
    };
    tick();
  }

  /* ---------------- Animated counters ---------------- */
  const counters = document.querySelectorAll('[data-counter]');
  if (counters.length) {
    const co = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseFloat(el.dataset.counter);
        const suffix = el.dataset.suffix || '';
        const dur = 1400;
        const start = performance.now();
        const step = (now) => {
          const p = Math.min((now - start) / dur, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          const val = target < 10 ? (target * eased).toFixed(1) : Math.floor(target * eased);
          el.textContent = val + suffix;
          if (p < 1) requestAnimationFrame(step);
          else el.textContent = target + suffix;
        };
        requestAnimationFrame(step);
        co.unobserve(el);
      });
    }, { threshold: 0.6 });
    counters.forEach(c => co.observe(c));
  }

  /* ---------------- Skill bars ---------------- */
  const bars = document.querySelectorAll('.skill-bar-fill');
  if (bars.length) {
    const bo = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.width = entry.target.dataset.level + '%';
          bo.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });
    bars.forEach(b => bo.observe(b));
  }

  /* ---------------- Skill category tabs ---------------- */
  const tabs = document.querySelectorAll('.tab-btn');
  const skillGroups = document.querySelectorAll('[data-skill-group]');
  if (tabs.length && skillGroups.length) {
    tabs.forEach(tab => tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const cat = tab.dataset.tab;
      skillGroups.forEach(g => {
        const show = cat === 'all' || g.dataset.skillGroup === cat;
        g.style.display = show ? '' : 'none';
      });
    }));
  }

  /* ---------------- Project filter ---------------- */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  if (filterBtns.length && projectCards.length) {
    filterBtns.forEach(btn => btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      projectCards.forEach(card => {
        const techs = (card.dataset.tech || '').split(',');
        const show = filter === 'all' || techs.includes(filter);
        card.classList.toggle('hidden', !show);
      });
    }));
  }

  /* ---------------- Contact form ---------------- */
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const status = document.getElementById('form-status');
      const name = form.querySelector('#name').value.trim();
      const email = form.querySelector('#email').value.trim();
      const message = form.querySelector('#message').value.trim();
      if (!name || !email || !message) {
        status.textContent = 'Please fill in your name, email, and message.';
        status.classList.remove('ok');
        return;
      }
      const subject = encodeURIComponent(form.querySelector('#subject').value.trim() || 'Portfolio contact from ' + name);
      const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
      window.location.href = `mailto:agung.setiyadi.dev@gmail.com?subject=${subject}&body=${body}`;
      status.textContent = 'Opening your email app... thanks for reaching out!';
      status.classList.add('ok');
      form.reset();
    });
  }

  /* ---------------- GSAP hero parallax ---------------- */
  if (window.gsap) {
    const heroVisual = document.querySelector('.avatar-frame');
    if (heroVisual) {
      document.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 24;
        const y = (e.clientY / window.innerHeight - 0.5) * 24;
        gsap.to(heroVisual, { x, y, duration: 0.6, ease: 'power2.out' });
      });
    }
    gsap.utils.toArray('.gsap-fade').forEach((el, i) => {
      gsap.from(el, {
        opacity: 0, y: 24, duration: 0.9, delay: i * 0.08,
        ease: 'power3.out',
        scrollTrigger: window.ScrollTrigger ? { trigger: el, start: 'top 88%' } : undefined
      });
    });
  }

  /* ---------------- Particle canvas background ---------------- */
  const canvas = document.getElementById('particle-canvas');
  if (canvas && canvas.getContext) {
    const ctx = canvas.getContext('2d');
    let w, h, particles = [];
    const COUNT = window.innerWidth < 768 ? 35 : 70;

    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    class P {
      constructor() { this.reset(); }
      reset() {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.vx = (Math.random() - 0.5) * 0.25;
        this.vy = (Math.random() - 0.5) * 0.25;
        this.r = Math.random() * 1.6 + 0.4;
        this.hue = Math.random() > 0.5 ? '139,92,246' : '59,130,246';
        this.alpha = Math.random() * 0.5 + 0.15;
      }
      step() {
        this.x += this.vx; this.y += this.vy;
        if (this.x < 0 || this.x > w || this.y < 0 || this.y > h) this.reset();
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${this.hue},${this.alpha})`;
        ctx.fill();
      }
    }
    for (let i = 0; i < COUNT; i++) particles.push(new P());

    const loop = () => {
      ctx.clearRect(0, 0, w, h);
      particles.forEach(p => { p.step(); p.draw(); });
      // connecting lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i], b = particles[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 110) {
            ctx.strokeStyle = `rgba(139,92,246,${0.08 * (1 - dist / 110)})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(loop);
    };
    if (!matchMedia('(prefers-reduced-motion: reduce)').matches) loop();
  }

});
