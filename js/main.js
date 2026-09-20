/* ===== Allen V. De Lemos — Portfolio Interactions ===== */
document.addEventListener('DOMContentLoaded', function () {
  /* Footer year */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* Navbar state + back-to-top button on scroll */
  var nav = document.getElementById('nav');
  var backTop = document.getElementById('backTop');

  function onScroll() {
    if (nav) nav.classList.toggle('scrolled', window.scrollY > 10);
    if (backTop) backTop.classList.toggle('show', window.scrollY > 500);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if (backTop) {
    backTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* Mobile menu */
  var hamburger = document.getElementById('hamburger');
  var navLinks = document.getElementById('navLinks');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function () {
      hamburger.classList.toggle('open');
      navLinks.classList.toggle('open');
    });
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
      });
    });
  }

  /* Prevent placeholder demo links from jumping to top */
  document.querySelectorAll('a[href="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) { e.preventDefault(); });
  });

  /* Scroll-reveal animations */
  var revealObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  document.querySelectorAll('.reveal').forEach(function (el) { revealObserver.observe(el); });

  /* 3D tilt effect on project cards (desktop pointers only) */
  if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    document.querySelectorAll('.project-card').forEach(function (card) {
      card.addEventListener('mousemove', function (e) {
        var rect = card.getBoundingClientRect();
        var x = (e.clientX - rect.left) / rect.width - 0.5;
        var y = (e.clientY - rect.top) / rect.height - 0.5;
        card.style.transform =
          'perspective(900px) rotateY(' + (x * 6).toFixed(2) + 'deg) rotateX(' + (-y * 6).toFixed(2) + 'deg)';
      });
      card.addEventListener('mouseleave', function () {
        card.style.transform = '';
      });
    });
  }

  /* Contact form -> opens the visitor's email app (mailto) */
  var form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = document.getElementById('name').value.trim();
      var email = document.getElementById('email').value.trim();
      var message = document.getElementById('message').value.trim();
      var subject = encodeURIComponent('Portfolio inquiry from ' + name);
      var body = encodeURIComponent(message + '\n\n— ' + name + ' (' + email + ')');
      window.location.href =
        'mailto:allendelemos69@gmail.com?subject=' + subject + '&body=' + body;
    });
  }
});
