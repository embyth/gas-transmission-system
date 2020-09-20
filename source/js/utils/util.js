'use strict';

(function () {
  // Константи
  window.CONSTANTS = {
    KEY_CODES: {
      ENTER: 13,
      ESC: 27
    },
  };
  // Утилітні функції
  window.util = {
    // Перевірка на натиснення кнопки Esc
    isEscKey: function (evt) {
      return evt.keyCode === window.CONSTANTS.KEY_CODES.ESC;
    },
    // Блокуємо прокрутку сторінки
    blockBodyScroll: function () {
      document.body.style.overflowY = 'hidden';
    },
    // Розблокуємо прокрутку сторінки
    unblockBodyScroll: function () {
      document.body.style.overflowY = 'auto';
    },
  };
})();
