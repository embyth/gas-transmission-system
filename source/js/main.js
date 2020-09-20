'use strict';

(function () {
  // Активація першочергових функцій
  var DOMLoadedHandler = function () {
    window.sections.activate();
    window.hamburger.activate();
    window.select.handle();
    window.modal.activate();
  };

  document.addEventListener('DOMContentLoaded', DOMLoadedHandler);
})();
