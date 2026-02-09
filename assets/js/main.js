document.addEventListener('DOMContentLoaded', function() {
  var menuBtn = document.querySelector('.menu-btn');
  var menu = document.querySelector('.mobile-menu');

  if (menuBtn && menu) {
    menuBtn.addEventListener('click', function() {
      menu.classList.toggle('active');
    });
  }
});
