/* ============================================================
   BuildMate — script.js
   Handles: Navbar, Hamburger, Scroll Reveal, Scroll-to-top
   ============================================================ */
console.log("BuildMate JS Connected Successfully");
document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Navbar Scroll Behavior ---------- */
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 40);
    });
  }

  /* ---------- Hamburger / Mobile Menu ---------- */
  const hamburger   = document.querySelector('.hamburger');
  const mobileMenu  = document.querySelector('.mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-menu a');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      mobileMenu.classList.toggle('open');
      document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
    });
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  /* ---------- Active Nav Link ---------- */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  /* ---------- Scroll Reveal ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(el => observer.observe(el));
  }

  /* ---------- Scroll-to-top Button ---------- */
  const scrollBtn = document.querySelector('.scroll-top');
  if (scrollBtn) {
    window.addEventListener('scroll', () => {
      scrollBtn.classList.toggle('visible', window.scrollY > 400);
    });
    scrollBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  /* ---------- Hero Counter Animation ---------- */
  const counters = document.querySelectorAll('[data-count]');
  if (counters.length) {
    const countObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el     = entry.target;
        const target = parseInt(el.dataset.count, 10);
        const suffix = el.dataset.suffix || '';
        let   start  = 0;
        const dur    = 1800;
        const step   = Math.ceil(target / (dur / 16));
        const timer  = setInterval(() => {
          start = Math.min(start + step, target);
          el.textContent = start.toLocaleString() + suffix;
          if (start >= target) clearInterval(timer);
        }, 16);
        countObserver.unobserve(el);
      });
    }, { threshold: 0.5 });
    counters.forEach(c => countObserver.observe(c));
  }

  /* ---------- Smooth Filter Interaction (Listings) ---------- */
  const filterBtn = document.querySelector('.filter-apply');
  if (filterBtn) {
    filterBtn.addEventListener('click', () => {
      const cards = document.querySelectorAll('.plot-card, .listing-card');
      cards.forEach(card => {
        card.style.opacity = '0.4';
        card.style.transform = 'scale(0.97)';
        setTimeout(() => {
          card.style.opacity = '1';
          card.style.transform = '';
        }, 400);
      });
    });
  }

  /* ---------- Contact Form Submit ---------- */
  const form = document.querySelector('.contact-form');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const btn = form.querySelector('[type="submit"]');
      btn.textContent = '✓ Message Sent!';
      btn.style.background = 'linear-gradient(135deg, #22c55e, #16a34a)';
      setTimeout(() => {
        btn.textContent = 'Send Message';
        btn.style.background = '';
        form.reset();
      }, 3000);
    });
  }

  /* ---------- Design Gallery Lightbox (simple) ---------- */
  document.querySelectorAll('.design-card').forEach(card => {
    card.addEventListener('click', () => {
      const img   = card.querySelector('img');
      const title = card.querySelector('.design-title')?.textContent || '';
      if (!img) return;
      const overlay = document.createElement('div');
      overlay.style.cssText = `
        position:fixed;inset:0;background:rgba(15,23,42,0.95);z-index:9999;
        display:flex;align-items:center;justify-content:center;cursor:pointer;
        animation:fadeOverlay 0.3s ease forwards;padding:24px;
      `;
      const style = document.createElement('style');
      style.textContent = '@keyframes fadeOverlay{from{opacity:0}to{opacity:1}}';
      document.head.appendChild(style);
      overlay.innerHTML = `
        <div style="text-align:center;max-width:900px;width:100%">
          <img src="${img.src}" style="max-width:100%;max-height:80vh;border-radius:16px;object-fit:contain;" />
          <p style="color:rgba(255,255,255,0.7);margin-top:16px;font-family:'Poppins',sans-serif;font-size:0.9rem;">${title}</p>
          <p style="color:rgba(255,255,255,0.4);font-size:0.8rem;margin-top:8px;">Click anywhere to close</p>
        </div>
      `;
      document.body.appendChild(overlay);
      document.body.style.overflow = 'hidden';
      overlay.addEventListener('click', () => {
        document.body.removeChild(overlay);
        document.body.style.overflow = '';
      });
    });
  });

});