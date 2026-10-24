const header = document.querySelector('[data-site-header]');
const menuToggle = document.querySelector('[data-menu-toggle]');
const navigation = document.querySelector('[data-site-nav]');
const toast = document.querySelector('[data-toast]');
const toastMessage = document.querySelector('[data-toast-message]');
const toastClose = document.querySelector('[data-toast-close]');

document.documentElement.classList.add('has-js');

if (header) {
  const updateHeader = () => header.classList.toggle('is-scrolled', window.scrollY > 24);
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });
}

if (menuToggle && navigation) {
  menuToggle.hidden = false;

  const closeMenu = () => {
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open navigation menu');
    navigation.classList.remove('is-open');
    document.body.classList.remove('menu-is-open');
  };

  menuToggle.addEventListener('click', () => {
    const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Open navigation menu' : 'Close navigation menu');
    navigation.classList.toggle('is-open', !isOpen);
    document.body.classList.toggle('menu-is-open', !isOpen);
  });

  navigation.addEventListener('click', (event) => {
    if (event.target.closest('a, button')) closeMenu();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMenu();
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 760) closeMenu();
  });
}

if (toast && toastMessage && toastClose) {
  let dismissTimer;

  const dismissToast = () => {
    window.clearTimeout(dismissTimer);
    toast.classList.remove('is-visible');
    toast.setAttribute('aria-hidden', 'true');
  };

  document.querySelectorAll('[data-toast-trigger]').forEach((trigger) => {
    trigger.addEventListener('click', () => {
      toastMessage.textContent = 'This page is not yet ready.';
      toast.setAttribute('aria-hidden', 'false');
      toast.classList.add('is-visible');
      window.clearTimeout(dismissTimer);
      dismissTimer = window.setTimeout(dismissToast, 3200);
    });
  });

  toastClose.addEventListener('click', dismissToast);
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') dismissToast();
  });
}
