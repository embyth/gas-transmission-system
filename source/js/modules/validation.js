'use strict';

(function () {
  'use strict';

  (function () {
    // Повідомлення про помилки при вводі
    var ErrorMessage = {
      VALUE_MISSING: 'Введіть дані',
      RANGE_OVERFLOW: 'Значення не може бути більше ',
      RANGE_UNDERFLOW: 'Значення не може бути менше ',
      SELECT_CHOOSE: 'Виберіть тип ГПА'
    };

    // Виділяємо поле вводу
    var highlightInput = function (input) {
      input.classList.add('data__input--error');
    };

    // Знімаємо виділення поля вводу
    var resetHighlightInput = function (input) {
      input.classList.remove('data__input--error');
    };

    // Перевіряємо поле на правильність вводу
    var checkInputValidity = function (input) {
      if (input.validity.valueMissing) {
        input.setCustomValidity(ErrorMessage.VALUE_MISSING);
        input.reportValidity();
        highlightInput(input);
      } else if (input.validity.rangeUnderflow) {
        input.setCustomValidity(ErrorMessage.RANGE_UNDERFLOW + input.min);
        input.reportValidity();
        highlightInput(input);
      } else if (input.validity.rangeOverflow) {
        input.setCustomValidity(ErrorMessage.RANGE_OVERFLOW + input.max);
        input.reportValidity();
        highlightInput(input);
      } else {
        input.setCustomValidity('');
        resetHighlightInput(input);
      }
    };

    // Перевіряємо селект на вибрану опцію
    var checkSelectValidity = function (select) {
      if (select.value === '') {
        select.setCustomValidity(ErrorMessage.SELECT_CHOOSE);
        select.reportValidity();
        highlightInput(select);
      } else {
        select.setCustomValidity('');
        resetHighlightInput(select);
      }
    };

    // Перевірка на валідність поля вводу
    var isInputsValid = function (form) {
      var inputs = form.querySelectorAll('input');
      var selects = form.querySelectorAll('select');
      var isValid = true;
      var notValidInputs = [];
      var notValidSelects = [];

      inputs.forEach(function (item) {
        if (!item.checkValidity()) {
          highlightInput(item);
          notValidInputs.push(item);

          var itemInputHandler = function () {
            checkInputValidity(item);
          };
          item.addEventListener('input', itemInputHandler);

          isValid = false;
        }
      });

      selects.forEach(function (item) {
        if (!item.checkValidity()) {
          notValidSelects.push(item);

          var itemSelectHandler = function () {
            checkSelectValidity(item);
          };
          item.addEventListener('change', itemSelectHandler);

          isValid = false;
        }
      });

      if (notValidSelects.length > 0) checkSelectValidity(notValidSelects[0]);
      if (notValidInputs.length > 0) checkInputValidity(notValidInputs[0]);

      return isValid;
    };

    // Перевірка секції вихідних даних на правильність
    var isIncomeDataValid = function () {
      var incomeDataFieldset = document.querySelector('#income-data .data__fieldset');
      return isInputsValid(incomeDataFieldset);
    };

    // Перевірка секції вихідних ділянок на правильність
    var isModalDataValid = function () {
      var modalFieldset = document.querySelector('.modal .modal__inner');
      return isInputsValid(modalFieldset);
    };

    // Передаємо функції в глобальну область видимості
    window.validation = {
      isDataValid: isIncomeDataValid,
      isModalDataValid: isModalDataValid
    };
  })();
})();
