'use strict';

(function () {
  // Елементи кнопок
  var beginButton = document.querySelector('.intro__button--begin');
  var calcButton = document.querySelector('.data__button--calc');
  var navButtons = document.querySelectorAll('.site-nav__button');

  // Елементи секцій
  var incomeDataNode = document.querySelector('#income-data');
  var resultsNode = document.querySelector('#results');

  // Константи імен секцій
  var SECTION_NAMES = {
    intro: 'intro',
    data: 'income-data',
    results: 'results'
  };

  // Функція переключатель секцій
  var toggleSection = function (section) {
    var sections = document.querySelectorAll('section');
    sections.forEach(function (item) {
      item.classList.add('visually-hidden');
    });

    section.classList.remove('visually-hidden');
  };

  // Функція переключатель активного стану кнопки навігації
  var toggleCurrentState = function (button) {
    var buttons = document.querySelectorAll('.site-nav__button');
    buttons.forEach(function (item) {
      item.classList.remove('site-nav__button--current');
    });

    button.classList.add('site-nav__button--current');
  };

  // Функція яка отримує ноду секції через клас кнопки навігації
  var getSectionNode = function (target) {
    var strings = target.className.split(' ');
    var section;

    strings.forEach(function (item) {
      for (var name in SECTION_NAMES) {
        if (item.includes(SECTION_NAMES[name])) {
          section = document.querySelector('#' + SECTION_NAMES[name]);
        }
      }
    });

    return section;
  };

  // Оброблювач кліку на кнопку "Почати"
  var beginButtonClickHandler = function (evt) {
    evt.preventDefault();

    toggleSection(incomeDataNode);
    toggleCurrentState(navButtons[1]);
  };

  // Оброблювач кліку на кнопку "Розрахувати"
  var calcButtonClickHandler = function (evt) {
    evt.preventDefault();

    if (!window.validation.isDataValid()) return;
    if (window.select.check()) {
      if (!window.validation.isModalDataValid()) {
        window.modal.open();
        return;
      }
    }
    window.calculate.activate();
    window.results.render();
    navButtons[2].disabled = false;
    toggleSection(resultsNode);
    toggleCurrentState(navButtons[2]);
  };

  // Оброблювач кліку на кнопки навігації
  var navButtonClickHandler = function (evt) {
    evt.preventDefault();
    var target = evt.target;

    toggleSection(getSectionNode(target));
    toggleCurrentState(target);
  };

  // Функція активації секцій
  var activate = function () {
    beginButton.addEventListener('click', beginButtonClickHandler);
    calcButton.addEventListener('click', calcButtonClickHandler);

    navButtons.forEach(function (button) {
      button.addEventListener('click', navButtonClickHandler);
    });
  };

  // Передаємо функції в глобальну область видимості
  window.sections = {
    activate: activate
  };
})();
