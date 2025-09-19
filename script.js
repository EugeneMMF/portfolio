document.addEventListener('DOMContentLoaded', () => {

  // --- STICKY HEADER ---
  const header = document.getElementById('main-header');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // --- SMOOTH SCROLL FOR NAV LINKS ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });

  // --- SCROLL REVEAL ANIMATION ---
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.remove('hidden');
        observer.unobserve(entry.target); // Stop observing after it's visible
      }
    });
  }, {
    rootMargin: '0px',
    threshold: 0.1
  });

  const elementsToReveal = document.querySelectorAll('.hidden');
  elementsToReveal.forEach(element => {
    observer.observe(element);
  });

});

// --- ACTIVE NAV LINK ON SCROLL ---
const sections = document.querySelectorAll('main section[id]');
const navLinks = document.querySelectorAll('nav a');

const observerOptions = {
  root: null, // observes intersections relative to the viewport
  rootMargin: '-40% 0px -60% 0px',
  threshold: 0
};

const sectionObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    // If a section is 60% in view
    if (entry.isIntersecting) {
      // Remove .active class from all nav links
      navLinks.forEach(link => {
        link.classList.remove('active');
      });

      // Find the matching nav link by its href and add the .active class
      const link = document.querySelector(`nav a[href="#${entry.target.id}"]`);
      if (link) {
        link.classList.add('active');
      }
    }
  });
}, observerOptions);

// Observe each section
sections.forEach(section => {
  sectionObserver.observe(section);
});