/**
 * ON THE SEA - Main JavaScript
 */

document.addEventListener('DOMContentLoaded', function() {
  const menuBtn = document.getElementById('menuBtn') || document.querySelector('.menu-btn');
  const mobileMenu = document.getElementById('mobileMenu') || document.querySelector('.mobile-menu');

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', function() {
      menuBtn.classList.toggle('active');
      mobileMenu.classList.toggle('active');
    });

    // Close menu on link click
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        menuBtn.classList.remove('active');
        mobileMenu.classList.remove('active');
      });
    });

    // Close menu on outside click
    document.addEventListener('click', function(e) {
      if (!menuBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
        menuBtn.classList.remove('active');
        mobileMenu.classList.remove('active');
      }
    });
  }
});
