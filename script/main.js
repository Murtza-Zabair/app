// Main JavaScript for portfolio website

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function () {
  // Initialize all functionality
  initNavigation();
  initSkillBars();
  initProjectFilter();
  initFormValidation();
  initScrollAnimations();
});

// Navigation functionality
function initNavigation() {
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');

  if (hamburger) {
    hamburger.addEventListener('click', function () {
      navLinks.classList.toggle('active');
      hamburger.classList.toggle('active');
    });
  }

  // Close mobile menu when clicking on a link
  const navItems = document.querySelectorAll('.nav-links a');
  navItems.forEach((item) => {
    item.addEventListener('click', function () {
      if (navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
      }
    });
  });
}

// Skill bars animation
function initSkillBars() {
  const skillLevels = document.querySelectorAll('.skill-level');

  if (skillLevels.length > 0) {
    // Create an intersection observer to trigger animation when skills are in viewport
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const skillLevel = entry.target;
            const level = skillLevel.getAttribute('data-level');
            skillLevel.style.width = level + '%';
            observer.unobserve(skillLevel);
          }
        });
      },
      { threshold: 0.5 }
    );

    skillLevels.forEach((skill) => {
      observer.observe(skill);
    });
  }
}

// Project filtering
function initProjectFilter() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (filterButtons.length > 0 && projectCards.length > 0) {
    filterButtons.forEach((button) => {
      button.addEventListener('click', function () {
        // Remove active class from all buttons
        filterButtons.forEach((btn) => btn.classList.remove('active'));

        // Add active class to clicked button
        this.classList.add('active');

        const filterValue = this.getAttribute('data-filter');

        // Filter projects
        projectCards.forEach((card) => {
          if (filterValue === 'all' || card.classList.contains(filterValue)) {
            card.style.display = 'block';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }
}

// Form validation
function initFormValidation() {
  const contactForm = document.getElementById('contactForm');

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      // Simple validation
      const name = document.getElementById('name');
      const email = document.getElementById('email');
      const subject = document.getElementById('subject');
      const message = document.getElementById('message');

      let isValid = true;

      // Reset error states
      resetErrors([name, email, subject, message]);

      // Validate name
      if (!name.value.trim()) {
        showError(name, 'Name is required');
        isValid = false;
      }

      // Validate email
      if (!email.value.trim()) {
        showError(email, 'Email is required');
        isValid = false;
      } else if (!isValidEmail(email.value)) {
        showError(email, 'Please enter a valid email');
        isValid = false;
      }

      // Validate subject
      if (!subject.value.trim()) {
        showError(subject, 'Subject is required');
        isValid = false;
      }

      // Validate message
      if (!message.value.trim()) {
        showError(message, 'Message is required');
        isValid = false;
      }

      if (isValid) {
        // In a real application, you would send the form data to a server here
        // For this example, we'll just show a success message
        showSuccessMessage();
        contactForm.reset();
      }
    });
  }
}

// Helper function to reset error states
function resetErrors(fields) {
  fields.forEach((field) => {
    field.classList.remove('error');
    const errorElement = field.parentNode.querySelector('.error-message');
    if (errorElement) {
      errorElement.remove();
    }
  });
}

// Helper function to show error message
function showError(field, message) {
  field.classList.add('error');
  const errorElement = document.createElement('div');
  errorElement.className = 'error-message';
  errorElement.textContent = message;
  errorElement.style.color = 'var(--danger)';
  errorElement.style.fontSize = '0.9rem';
  errorElement.style.marginTop = '5px';
  field.parentNode.appendChild(errorElement);
}

// Helper function to validate email
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Show success message after form submission
function showSuccessMessage() {
  // Create success message element
  const successMessage = document.createElement('div');
  successMessage.className = 'success-message';
  successMessage.textContent = 'Thank you for your message! I will get back to you soon.';
  successMessage.style.backgroundColor = 'var(--success)';
  successMessage.style.color = 'white';
  successMessage.style.padding = '15px';
  successMessage.style.borderRadius = 'var(--radius)';
  successMessage.style.marginBottom = '20px';
  successMessage.style.textAlign = 'center';

  // Insert before the form
  const form = document.getElementById('contactForm');
  form.parentNode.insertBefore(successMessage, form);

  // Remove message after 5 seconds
  setTimeout(() => {
    successMessage.remove();
  }, 5000);
}

// Scroll animations
function initScrollAnimations() {
  // Elements to animate on scroll
  const animatedElements = document.querySelectorAll('.slide-up, .slide-in-left, .slide-in-right');

  if (animatedElements.length > 0) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.animationPlayState = 'running';
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    animatedElements.forEach((element) => {
      // Set animation to paused initially
      element.style.animationPlayState = 'paused';
      observer.observe(element);
    });
  }
}
