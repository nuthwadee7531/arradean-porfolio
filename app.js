/**
 * Arradean's Portfolio Site Interactivity
 * Focus: Modal control, Theme Toggle, Scroll Effects
 */

document.addEventListener('DOMContentLoaded', () => {
  setupModals();
  setupThemeToggle();
  setupScrollEffects();
});

/**
 * Handle Modal Dialog Show/Close Actions
 */
function setupModals() {
  const projectCards = document.querySelectorAll('.project-card');
  
  projectCards.forEach(card => {
    const projectId = card.getAttribute('data-project');
    const dialog = document.getElementById(`modal-${projectId}`);
    const triggerBtn = card.querySelector('.btn-text');
    
    if (!dialog) return;

    const closeBtn = dialog.querySelector('.btn-close');

    // Helper to open modal
    const openModal = () => {
      dialog.showModal();
      document.body.style.overflow = 'hidden'; // Lock background scroll
    };

    // Helper to close modal
    const closeModal = () => {
      dialog.close();
      document.body.style.overflow = ''; // Restore background scroll
    };

    // Trigger on card click OR read more button click
    if (triggerBtn) {
      triggerBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        openModal();
      });
    }
    
    card.addEventListener('click', openModal);

    // Close button event
    if (closeBtn) {
      closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        closeModal();
      });
    }

    // Close when clicking on backdrop
    dialog.addEventListener('click', (e) => {
      const rect = dialog.getBoundingClientRect();
      const isInDialog = (
        rect.top <= e.clientY && 
        e.clientY <= rect.top + rect.height &&
        rect.left <= e.clientX && 
        e.clientX <= rect.left + rect.width
      );
      if (!isInDialog) {
        closeModal();
      }
    });

    // Handle ESC key press (browser default handles dialog close, but we restore overflow)
    dialog.addEventListener('cancel', () => {
      document.body.style.overflow = '';
    });
  });
}

/**
 * Handle Light/Dark Mode Toggle with Persistent Storage
 */
function setupThemeToggle() {
  const themeToggle = document.getElementById('theme-toggle');
  if (!themeToggle) return;

  // Icons for visual feedback inside button
  const sunIcon = '☀️';
  const moonIcon = '🌙';

  // Check saved preference
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') {
    document.body.classList.add('light-mode');
    themeToggle.innerHTML = moonIcon;
  } else {
    themeToggle.innerHTML = sunIcon;
  }

  themeToggle.addEventListener('click', () => {
    const isLight = document.body.classList.toggle('light-mode');
    if (isLight) {
      localStorage.setItem('theme', 'light');
      themeToggle.innerHTML = moonIcon;
    } else {
      localStorage.setItem('theme', 'dark');
      themeToggle.innerHTML = sunIcon;
    }
  });
}

/**
 * Handle Scroll Effects (Navbar Shrink & Styling)
 */
function setupScrollEffects() {
  const header = document.getElementById('site-header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll);
  // Initial check
  handleScroll();
}
