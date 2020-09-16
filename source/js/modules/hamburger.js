'use strict';

(function () {
  // Елемент гамбургера
  var hamburgerNode = document.querySelector('.hamburger');
  var menuNode = document.querySelector('.site-aside');
  var overlayNode = document.querySelector('.site-aside__overlay');

  // Логіка відкриття навігації по кліку на гамбургер
  var hamburgerClickHandler = function (evt) {
    evt.preventDefault();

    hamburgerNode.classList.toggle('is-active');
    menuNode.classList.toggle('site-aside--hidden');
    overlayNode.classList.toggle('site-aside__overlay--hidden');

    if (hamburgerNode.classList.contains('is-active')) {
      window.util.blockBodyScroll();
      document.addEventListener('keydown', hamburgerKeydownHandler);
    } else {
      window.util.unblockBodyScroll();
      document.removeEventListener('keydown', hamburgerKeydownHandler);
    }
  };

  // Обробник закриття меню на кнопку ESC
  var hamburgerKeydownHandler = function (evt) {
    if (window.util.isEscKey(evt)) {
      hamburgerClickHandler(evt);
    }
  };

  // Функція активації гамбургера
  var activate = function () {
    overlayNode.addEventListener('click', hamburgerClickHandler);
    hamburgerNode.addEventListener('click', hamburgerClickHandler);
  };

  // Передаємо активацію в глобальну область видимості
  window.hamburger = {
    activate: activate
  };
})();
