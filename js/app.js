// Import SCSS at the top of your main.js file
import '../scss/style.scss';

// Your existing JavaScript code...
document.addEventListener('DOMContentLoaded', function() {
  const navToggle = document.querySelector('.navbar__toggle');
  const navMenu = document.querySelector('.navbar__menu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function() {
      navMenu.classList.toggle('active');
    });

    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll('.navbar__link');
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        navMenu.classList.remove('active');
      });
    });
  }

  // Smooth scrolling for anchor links
  const links = document.querySelectorAll('a[href^="#"]');
  links.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const targetPosition = targetSection.offsetTop - headerHeight - 20;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // Initialize EmailJS
  emailjs.init("X0u6ONfu7Iyf1Azu-"); // Replace with your actual public key

  // Contact form handling with EmailJS
  const contactForm = document.querySelector('.contact__form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();

      // Get form data
      const name = this.querySelector('#name').value.trim();
      const email = this.querySelector('#email').value.trim();
      const message = this.querySelector('#message').value.trim();

      // Basic form validation
      if (!name || !email || !message) {
        alert('Vul alle verplichte velden in.');
        return;
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        alert('Voer een geldig e-mailadres in.');
        return;
      }

      // Show loading state
      const submitButton = this.querySelector('button[type="submit"]');
      const originalText = submitButton.textContent;
      submitButton.textContent = 'Versturen...';
      submitButton.disabled = true;

      // Prepare template parameters
      const templateParams = {
        from_name: name,
        from_email: email,
        message: message,
        to_email: 'info@arankavandongen.be' // Your email address
      };

      // Send email using EmailJS
      emailjs.send('service_1u40ijc', 'template_la5drod', templateParams)
        .then(function(response) {
          console.log('SUCCESS!', response.status, response.text);
          alert('Bedankt voor uw bericht. Ik neem zo spoedig mogelijk contact met u op!');
          contactForm.reset();
        })
        .catch(function(error) {
          console.log('FAILED...', error);
          alert('Er is een fout opgetreden bij het versturen van uw bericht. Probeer het later opnieuw of neem direct contact op via telefoon.');
        })
        .finally(function() {
          // Reset button state
          submitButton.textContent = originalText;
          submitButton.disabled = false;
        });
    });
  }

  // Keep header always visible with subtle background change on scroll
  const header = document.querySelector('.header');

  window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > 50) {
      header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
      header.style.backdropFilter = 'blur(10px)';
    } else {
      header.style.backgroundColor = '#ffffff';
      header.style.backdropFilter = 'none';
    }
  });

  // Add fade-in animation to elements when they come into view
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in-up');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe elements for animation
  const animateElements = document.querySelectorAll('.service-card, .method, .about__text, .about__image');
  animateElements.forEach(el => observer.observe(el));
});
