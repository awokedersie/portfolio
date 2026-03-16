document.addEventListener('DOMContentLoaded', function() {
    // Set dynamic year in footer
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navList = document.querySelector('.nav-list');
    const body = document.body;
    
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navList.classList.toggle('active');
        body.style.overflow = navList.classList.contains('active') ? 'hidden' : '';
    });
    
    // Close mobile menu when clicking a nav link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navList.classList.contains('active')) {
                hamburger.classList.remove('active');
                navList.classList.remove('active');
                body.style.overflow = '';
            }
        });
    });
    
    // Active Link Highlighting with IntersectionObserver
    const observerOptions = {
        root: null,
        rootMargin: '-50% 0px -50% 0px',
        threshold: 0
    };

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
    }, observerOptions);

    document.querySelectorAll('section.section, section.hero').forEach(section => {
        sectionObserver.observe(section);
    });

    // Typing Animation
    const typingElements = [
        { element: document.querySelector('.typing-text'), delay: 1000 },
        { element: document.querySelector('.typing-text-2'), delay: 1500 }
    ];
    const professions = ['Web Developer', 'UI/UX Designer', 'Freelancer'];
    
    typingElements.forEach((typing, index) => {
        if (typing.element) {
            let professionIndex = 0;
            let charIndex = 0;
            let isDeleting = false;
            
            function type() {
                const currentProfession = professions[professionIndex];
                
                if (isDeleting) {
                    typing.element.textContent = currentProfession.substring(0, charIndex - 1);
                    charIndex--;
                } else {
                    typing.element.textContent = currentProfession.substring(0, charIndex + 1);
                    charIndex++;
                }
                
                if (!isDeleting && charIndex === currentProfession.length) {
                    setTimeout(type, 1500);
                    isDeleting = true;
                } else if (isDeleting && charIndex === 0) {
                    isDeleting = false;
                    professionIndex = (professionIndex + 1) % professions.length;
                    setTimeout(type, 500);
                } else {
                    setTimeout(type, isDeleting ? 100 : 200);
                }
            }
            
            setTimeout(type, typing.delay);
        }
    });
    
    // Premium Scroll Animations using IntersectionObserver
    const fadeObserverOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const fadeObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, fadeObserverOptions);
    
    // Initialize elements for animation
    document.querySelectorAll('.about-content, .service-card, .portfolio-item, .contact-content').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
        fadeObserver.observe(element);
    });
document.getElementById('sendEmailBtn').addEventListener('click', function(e) {
  e.preventDefault();
  
  const name = encodeURIComponent(document.getElementById('userName').value);
  const email = encodeURIComponent(document.getElementById('userEmail').value);
  const subject = encodeURIComponent(document.getElementById('emailSubject').value);
  const message = encodeURIComponent(document.getElementById('userMessage').value);
  
  const mailtoLink = `mailto:awokedersie@gmail.com?subject=${subject}&body=Name: ${name}%0AEmail: ${email}%0A%0AMessage:%0A${message}`;
  
  window.location.href = mailtoLink;
});
});