document.addEventListener('DOMContentLoaded', function() {
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
    
    // Animation on Scroll
    const animateElements = () => {
        document.querySelectorAll('.about-content, .service-card, .portfolio-item, .contact-content').forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Initialize elements for animation
    document.querySelectorAll('.about-content, .service-card, .portfolio-item, .contact-content').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    window.addEventListener('scroll', animateElements);
    window.addEventListener('load', animateElements);
document.getElementById('sendEmailBtn').addEventListener('click', function(e) {
  e.preventDefault();
  
  const name = encodeURIComponent(document.getElementById('userName').value);
  const email = encodeURIComponent(document.getElementById('userEmail').value);
  const subject = encodeURIComponent(document.getElementById('emailSubject').value);
  const message = encodeURIComponent(document.getElementById('userMessage').value);
  
  const mailtoLink = `mailto:tomasderese49@gmail.com?subject=${subject}&body=Name: ${name}%0AEmail: ${email}%0A%0AMessage:%0A${message}`;
  
  window.location.href = mailtoLink;
});
});