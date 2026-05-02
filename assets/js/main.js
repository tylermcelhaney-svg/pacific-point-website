/* ============================================================
   PACIFIC POINT — Main JavaScript
   ============================================================ */

(function () {
  'use strict';

  /* ---------- Nav: scroll shadow + mobile toggle ---------- */
  const nav = document.querySelector('.nav');
  const mobileToggle = document.querySelector('.nav-mobile-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (nav) {
    window.addEventListener('scroll', function () {
      nav.classList.toggle('scrolled', window.scrollY > 20);
    }, { passive: true });
  }

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', function () {
      const open = navLinks.classList.toggle('open');
      mobileToggle.classList.toggle('open', open);
      mobileToggle.setAttribute('aria-expanded', open);
    });

    // Close mobile nav when a link is clicked
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('open');
        mobileToggle.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
      });
    });

    // Close on outside click
    document.addEventListener('click', function (e) {
      if (!nav.contains(e.target)) {
        navLinks.classList.remove('open');
        mobileToggle.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ---------- Active nav link by page ---------- */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a:not(.nav-cta)').forEach(function (link) {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  /* ---------- Intersection Observer: fade-up ---------- */
  const fadeEls = document.querySelectorAll('.fade-up');
  if (fadeEls.length && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    fadeEls.forEach(function (el) { observer.observe(el); });
  } else {
    // Fallback: just show everything
    fadeEls.forEach(function (el) { el.classList.add('visible'); });
  }

  /* ---------- Contact form ---------- */
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const btn = contactForm.querySelector('[type="submit"]');
      const originalText = btn.textContent;

      btn.textContent = 'Sending…';
      btn.disabled = true;

      // Simulate submission — replace with actual endpoint when ready
      setTimeout(function () {
        contactForm.innerHTML = `
          <div style="text-align:center; padding: 48px 0;">
            <div style="width:64px;height:64px;background:var(--blue-pale);border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 20px;">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--blue)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            <h3 style="font-size:1.4rem;margin-bottom:12px;">Message Received</h3>
            <p style="color:var(--text-muted);">Thank you for getting in touch. A member of the Pacific Point team will respond within one business day.</p>
          </div>`;
      }, 1200);
    });
  }

  /* ---------- VIFC Guide gate form ---------- */
  const gateForm = document.getElementById('guideGateForm');
  if (gateForm) {
    gateForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const email = gateForm.querySelector('input[type="email"]').value;
      const btn = gateForm.querySelector('[type="submit"]');

      if (!email) return;

      btn.textContent = 'Sending…';
      btn.disabled = true;

      setTimeout(function () {
        gateForm.innerHTML = `
          <p style="color:rgba(255,255,255,0.85);font-size:1.05rem;margin:0;">
            ✓ &nbsp;The complete VIFC Market Entry Guide has been sent to <strong>${email}</strong>. Check your inbox — it usually arrives within a few minutes.
          </p>`;
      }, 1000);
    });
  }

  /* ---------- Smooth scroll for anchor links ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset - 16;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });

  /* ---------- Stats counter animation ---------- */
  const statNumbers = document.querySelectorAll('.stat-number[data-target]');
  if (statNumbers.length && 'IntersectionObserver' in window) {
    const statObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateStat(entry.target);
          statObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    statNumbers.forEach(function (el) { statObserver.observe(el); });
  }

  function animateStat(el) {
    const target = parseFloat(el.dataset.target);
    const suffix = el.dataset.suffix || '';
    const prefix = el.dataset.prefix || '';
    const duration = 1400;
    const start = performance.now();

    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out-cubic
      const value = target * eased;

      if (Number.isInteger(target)) {
        el.textContent = prefix + Math.round(value) + suffix;
      } else {
        el.textContent = prefix + value.toFixed(1) + suffix;
      }

      if (progress < 1) requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
  }

})();
