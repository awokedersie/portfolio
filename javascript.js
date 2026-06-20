document.addEventListener('DOMContentLoaded', function () {

  /* =====================================================
     DYNAMIC YEAR
  ===================================================== */
  const yearSpan = document.getElementById('year');
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();

  /* =====================================================
     DARK MODE TOGGLE
  ===================================================== */
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon = document.getElementById('themeIcon');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const savedTheme = localStorage.getItem('theme');

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    if (themeIcon) {
      themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }
  }

  // Initialise from saved preference or system preference
  applyTheme(savedTheme || (prefersDark ? 'dark' : 'light'));

  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      const current = document.documentElement.getAttribute('data-theme') || 'light';
      const next = current === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      localStorage.setItem('theme', next);
    });
  }

  /* =====================================================
     SCROLL PROGRESS BAR
  ===================================================== */
  const scrollProgress = document.getElementById('scrollProgress');

  function updateScrollProgress() {
    if (!scrollProgress) return;
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    scrollProgress.style.width = progress + '%';
  }

  window.addEventListener('scroll', updateScrollProgress, { passive: true });

  /* =====================================================
     MOBILE NAVIGATION TOGGLE
  ===================================================== */
  const hamburger = document.getElementById('hamburger');
  const navList = document.getElementById('navList');
  const body = document.body;

  function closeMenu() {
    if (!hamburger || !navList) return;
    hamburger.classList.remove('active');
    navList.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
    body.style.overflow = '';
  }

  function openMenu() {
    if (!hamburger || !navList) return;
    hamburger.classList.add('active');
    navList.classList.add('active');
    hamburger.setAttribute('aria-expanded', 'true');
    body.style.overflow = 'hidden';
  }

  if (hamburger) {
    hamburger.addEventListener('click', function () {
      const isOpen = navList.classList.contains('active');
      isOpen ? closeMenu() : openMenu();
    });
  }

  // Close menu on nav link click
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Close menu on outside click
  document.addEventListener('click', function (e) {
    if (navList && navList.classList.contains('active')) {
      if (!navList.contains(e.target) && !hamburger.contains(e.target)) {
        closeMenu();
      }
    }
  });

  // Close menu on Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeMenu();
  });

  /* =====================================================
     ACTIVE NAV LINK HIGHLIGHTING (IntersectionObserver)
  ===================================================== */
  const navLinks = document.querySelectorAll('.nav-link');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        if (id) {
          navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${id}`) {
              link.classList.add('active');
            }
          });
        }
      }
    });
  }, {
    root: null,
    rootMargin: '-50% 0px -50% 0px',
    threshold: 0
  });

  document.querySelectorAll('section').forEach(section => {
    sectionObserver.observe(section);
  });

  /* =====================================================
     BACK TO TOP BUTTON
  ===================================================== */
  const backToTop = document.getElementById('backToTop');

  window.addEventListener('scroll', function () {
    if (backToTop) {
      if (window.scrollY > 400) {
        backToTop.classList.add('active');
      } else {
        backToTop.classList.remove('active');
      }
    }
  }, { passive: true });

  /* =====================================================
     TYPING ANIMATION
  ===================================================== */
  const professions = ['Web Developer', 'UI/UX Designer', 'Freelancer', 'Problem Solver'];

  function createTypingEffect(element, startDelay) {
    if (!element) return;
    let profIdx = 0, charIdx = 0, isDeleting = false;

    function type() {
      const current = professions[profIdx];
      if (isDeleting) {
        element.textContent = current.substring(0, charIdx - 1);
        charIdx--;
      } else {
        element.textContent = current.substring(0, charIdx + 1);
        charIdx++;
      }

      if (!isDeleting && charIdx === current.length) {
        setTimeout(() => { isDeleting = true; type(); }, 1800);
        return;
      } else if (isDeleting && charIdx === 0) {
        isDeleting = false;
        profIdx = (profIdx + 1) % professions.length;
        setTimeout(type, 400);
        return;
      }
      setTimeout(type, isDeleting ? 70 : 130);
    }

    setTimeout(type, startDelay);
  }

  createTypingEffect(document.querySelector('.typing-text'), 800);
  createTypingEffect(document.querySelector('.typing-text-2'), 1200);

  /* =====================================================
     SCROLL REVEAL ANIMATION (IntersectionObserver)
  ===================================================== */
  const revealElements = document.querySelectorAll(
    '.about-content, .project-card, .service-card, .contact-content, .hero-stats, .tech-badge, .stat-item'
  );

  revealElements.forEach(el => el.classList.add('reveal'));

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

  revealElements.forEach(el => revealObserver.observe(el));

  /* =====================================================
     ANIMATED SKILL PROGRESS BARS (trigger on scroll)
  ===================================================== */
  const progressBars = document.querySelectorAll('.progress-bar span');

  // Store the target widths from inline style
  const targetWidths = Array.from(progressBars).map(bar => bar.style.width);

  // Reset to 0 initially
  progressBars.forEach(bar => { bar.style.width = '0'; });

  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bars = entry.target.querySelectorAll('.progress-bar span');
        bars.forEach((bar, i) => {
          const target = bar.getAttribute('data-width') || targetWidths[
            Array.from(progressBars).indexOf(bar)
          ];
          setTimeout(() => { bar.style.width = target; }, i * 150);
        });
        skillObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  const skillsSection = document.querySelector('.skills');
  if (skillsSection) {
    // Save target widths as data attributes
    progressBars.forEach((bar, i) => bar.setAttribute('data-width', targetWidths[i]));
    skillObserver.observe(skillsSection);
  }

  /* =====================================================
     CONTACT FORM — VALIDATION & MAILTO
  ===================================================== */
  const emailForm = document.getElementById('emailForm');

  if (emailForm) {
    emailForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const nameInput = document.getElementById('userName');
      const emailInput = document.getElementById('userEmail');
      const messageInput = document.getElementById('userMessage');

      const nameError = document.getElementById('nameError');
      const emailError = document.getElementById('emailError');
      const messageError = document.getElementById('messageError');

      let valid = true;

      // Clear previous errors
      [nameInput, emailInput, messageInput].forEach(input => {
        input.classList.remove('error');
      });
      [nameError, emailError, messageError].forEach(el => { if (el) el.textContent = ''; });

      // Validate Name
      const name = nameInput.value.trim();
      if (!name) {
        nameInput.classList.add('error');
        if (nameError) nameError.textContent = 'Please enter your name.';
        valid = false;
      }

      // Validate Email
      const email = emailInput.value.trim();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email) {
        emailInput.classList.add('error');
        if (emailError) emailError.textContent = 'Please enter your email address.';
        valid = false;
      } else if (!emailRegex.test(email)) {
        emailInput.classList.add('error');
        if (emailError) emailError.textContent = 'Please enter a valid email address.';
        valid = false;
      }

      // Validate Message
      const message = messageInput.value.trim();
      if (!message) {
        messageInput.classList.add('error');
        if (messageError) messageError.textContent = 'Please enter your message.';
        valid = false;
      }

      if (!valid) return;

      // Build mailto link
      const subject = encodeURIComponent(document.getElementById('emailSubject').value.trim() || 'New message from portfolio');
      const body = encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
      );

      window.location.href = `mailto:awokedersie@gmail.com?subject=${subject}&body=${body}`;

      // Reset form
      emailForm.reset();
    });

    // Live validation — clear error on input
    ['userName', 'userEmail', 'userMessage'].forEach(id => {
      const input = document.getElementById(id);
      const error = document.getElementById(id.replace('user', '').replace('User', '').toLowerCase() + 'Error');
      if (input) {
        input.addEventListener('input', function () {
          input.classList.remove('error');
          const errEl = document.getElementById(
            id === 'userName' ? 'nameError' :
            id === 'userEmail' ? 'emailError' :
            'messageError'
          );
          if (errEl) errEl.textContent = '';
        });
      }
    });
  }

});