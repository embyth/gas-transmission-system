'use strict';

(function () {
  // Функція управління полем вибору нагнітача
  var handleSuperchargesSelectOptions = function (arr) {
    var superchargersSelectNode = document.querySelector('#superchargers');
    var options = superchargersSelectNode.querySelectorAll('option');

    options.forEach(function (option) {
      option.disabled = true;

      arr.forEach(function (item) {
        if (option.value === item) {
          option.disabled = false;
          option.selected = true;
        }
      });
    });

    if (arr.includes('custom')) {
      window.modal.showOpener();
      window.modal.open();
    } else {
      window.modal.hideOpener();
      window.modal.close();
    }
  };

  // Функція управління полем вибору приводу
  var handleGpuSelectOptions = function (string) {
    var gpuSelectNode = document.querySelector('#gpu');
    var options = gpuSelectNode.querySelectorAll('option');

    options.forEach(function (option) {
      if (option.value === string) option.selected = true;
    });

    if (string === 'custom') {
      window.modal.showOpener();
      window.modal.open();
    } else {
      window.modal.hideOpener();
      window.modal.close();
    }
  };

  // Оброблювач події зміни на полі вибору приводу
  var gpuSelectChangeHandler = function (evt) {
    evt.preventDefault();

    handleSuperchargesSelectOptions(window.tech.GpuToSupercharger[evt.target.value]);
  };

  // Оброблювач події зміни на полі вибору нагнітача
  var superchargersSelectChangeHandler = function (evt) {
    evt.preventDefault();

    for (var gpu in window.tech.GpuToSupercharger) {
      var result = window.tech.GpuToSupercharger[gpu].find(function (item) {
        return item === evt.target.value;
      });

      if (result) {
        result = gpu;
        break;
      }
    }

    handleGpuSelectOptions(result);
  };

  // Оброблювач умов вибору ГПА
  var selectHandler = function () {
    var gpuSelectNode = document.querySelector('#gpu');
    var superchargersSelectNode = document.querySelector('#superchargers');

    gpuSelectNode.addEventListener('change', gpuSelectChangeHandler);
    superchargersSelectNode.addEventListener('change', superchargersSelectChangeHandler);
  };

  // Перевірка на "Інший" нагнітач
  var checkSelectValue = function () {
    var gpuSelectNode = document.querySelector('#gpu');
    var superchargersSelectNode = document.querySelector('#superchargers');
    var status = false;

    if (gpuSelectNode.value === 'custom' && superchargersSelectNode.value === 'custom') {
      status = true;
    }

    return status;
  };

  // Передаємо функцію у глобальну область видимості
  window.select = {
    handle: selectHandler,
    check: checkSelectValue
  };
})();
