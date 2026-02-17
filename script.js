// ===== MOBILE NAV =====
const hamburger = document.getElementById('hamburger');
const sidebar = document.getElementById('sidebar');

hamburger.addEventListener('click', () => {
  sidebar.classList.toggle('open');
  hamburger.classList.toggle('active');
});

// Close sidebar when a nav link is clicked (mobile)
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    if (window.innerWidth <= 768) {
      sidebar.classList.remove('open');
      hamburger.classList.remove('active');
    }
  });
});

// ===== ACTIVE NAV ON SCROLL =====
const sections = document.querySelectorAll('.section');
const navLinks = document.querySelectorAll('.nav-link');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(l => l.classList.remove('active'));
      const id = entry.target.getAttribute('id');
      const active = document.querySelector(`.nav-link[href="#${id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { threshold: 0.35 });

sections.forEach(s => observer.observe(s));

// ===== SKILL BAR ANIMATION =====
const skillFills = document.querySelectorAll('.skill-fill');
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animated');
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

skillFills.forEach(fill => skillObserver.observe(fill));

// ===== COUNTER ANIMATION =====
function animateCount(el, target, duration = 3000) {
  let start = 0;
  const step = target / (duration / 16);
  const update = () => {
    start = Math.min(start + step, target);
    el.textContent = Math.floor(start) + (target >= 100 ? '+' : target === 84 ? '' : '+');
    if (start < target) requestAnimationFrame(update);
  };
  update();
}

const statNums = document.querySelectorAll('.stat-num');
const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const raw = el.textContent.replace(/\D/g, '');
      const target = parseInt(raw);
      animateCount(el, target);
      statObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

statNums.forEach(el => statObserver.observe(el));

// ===== FORM SUBMIT via FORMSPREE =====
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = document.getElementById('submitBtn');
    const status = document.getElementById('formStatus');
    const orig = btn.innerHTML;

    btn.innerHTML = 'Sending...';
    btn.disabled = true;
    status.className = 'form-status';

    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      });

      if (res.ok) {
        status.className = 'form-status success';
        status.textContent = '✓ Message sent! I\'ll get back to you soon.';
        form.reset();
        btn.innerHTML = '✓ Sent!';
        setTimeout(() => {
          btn.innerHTML = orig;
          btn.disabled = false;
        }, 4000);
      } else {
        throw new Error('Server error');
      }
    } catch {
      status.className = 'form-status error';
      status.textContent = '✗ Failed to send. Please try again or email me directly at engahmedkhalid3s@gmail.com';
      btn.innerHTML = orig;
      btn.disabled = false;
    }
  });
}

// ===== SMOOTH REVEAL ANIMATION =====
const cards = document.querySelectorAll('.project-card, .detail-card, .timeline-card, .skill-category, .contact-info-item');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      entry.target.style.transitionDelay = `${i * 0.05}s`;
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

cards.forEach(card => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(20px)';
  card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  revealObserver.observe(card);
});