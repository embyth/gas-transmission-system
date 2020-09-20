'use strict';

(function () {
  // Оброблювач кліку для відкриття модального вікна
  var openModalClickHandler = function () {
    var modalNode = document.querySelector('.modal');
    var modalOverlayNode = document.querySelector('.modal__overlay');
    var modalButtonClose = document.querySelector('.modal__close');
    var confirmButton = document.querySelector('.modal__apply');

    window.util.blockBodyScroll();
    modalNode.classList.remove('modal--hidden');
    modalOverlayNode.classList.remove('modal__overlay--hidden');

    modalButtonClose.addEventListener('click', closeModalClickHandler);
    modalOverlayNode.addEventListener('click', closeModalClickHandler);
    confirmButton.addEventListener('click', confirmButtonClickHandler);
    document.addEventListener('keydown', closeModalKeydownHandler);
  };

  // Оброблювач натиснення кнопки ESC
  var closeModalKeydownHandler = function (evt) {
    if (window.util.isEscKey(evt)) {
      closeModalClickHandler();
    }
  };

  // Оброблювач кліку для закриття модального вікна
  var closeModalClickHandler = function () {
    var modalNode = document.querySelector('.modal');
    var modalOverlayNode = document.querySelector('.modal__overlay');
    var modalButtonClose = document.querySelector('.modal__close');
    var confirmButton = document.querySelector('.modal__apply');

    window.util.unblockBodyScroll();
    modalNode.classList.add('modal--hidden');
    modalOverlayNode.classList.add('modal__overlay--hidden');

    modalButtonClose.removeEventListener('click', closeModalClickHandler);
    modalOverlayNode.removeEventListener('click', closeModalClickHandler);
    confirmButton.removeEventListener('click', confirmButtonClickHandler);
    document.removeEventListener('keydown', closeModalKeydownHandler);
  };

  // Активація модального вікна
  var activateModal = function () {
    var openModalButton = document.querySelector('.data__modal-opener');

    openModalButton.addEventListener('click', openModalClickHandler);
  };

  // Диактивація модального вікна
  var disableModal = function () {
    var openModalButton = document.querySelector('.data__modal-opener');

    openModalButton.removeEventListener('click', openModalClickHandler);
  };

  // Приховати іконку відкриття модального вікна
  var hideModalOpener = function () {
    document.querySelector('.data__modal-opener').classList.add('visually-hidden');
  };

  // Показати іконку відкриття модального вікна
  var showModalOpener = function () {
    document.querySelector('.data__modal-opener').classList.remove('visually-hidden');
  };

  // Оброблювач кліку на кнопці "Підтвердження"
  var confirmButtonClickHandler = function () {
    if (!window.validation.isModalDataValid()) return;

    var modal = document.querySelector('.modal');
    var Pvx2 = document.querySelector('.data__input--custom-inlet-pressure2').value;
    var Pvx3 = document.querySelector('.data__input--custom-inlet-pressure3').value;
    var isMulti = (Pvx2 === '' || Pvx2 === 0 || Pvx3 === '' || Pvx3 === 0) ? false : true;

    window.tech.CONSTANTS.GPU['custom'] = {
      nominalPower: +modal.querySelector('.data__input--custom-nominal-power').value,
      coefTechState: +modal.querySelector('.data__input--custom-tech-state').value,
      coefFreeze: 1,
      coefSpentGas: 0.985,
      coefAirImpact: +modal.querySelector('.data__input--custom-air-impact').value,
      nominalTemperature: +modal.querySelector('.data__input--custom-nominal-temperature').value,
      nominalFuelConsumption: +modal.querySelector('.data__input--custom-fuel-consumption').value,
      mechanicalEfficiency: +modal.querySelector('.data__input--custom-mech-efficiency').value,
    };
    window.tech.CONSTANTS.SUPERCHARGER['custom'] = {
      multi: isMulti,
      eps1: +modal.querySelector('.data__input--custom-eps1').value,
      eps2: +modal.querySelector('.data__input--custom-eps2').value,
      eps3: +modal.querySelector('.data__input--custom-eps3').value,
      eta1: +modal.querySelector('.data__input--custom-eta1').value,
      eta2: +modal.querySelector('.data__input--custom-eta2').value,
      eta3: +modal.querySelector('.data__input--custom-eta3').value,
      nizv1: +modal.querySelector('.data__input--custom-nizv1').value,
      nizv2: +modal.querySelector('.data__input--custom-nizv2').value,
      nizv3: +modal.querySelector('.data__input--custom-nizv3').value,
      Q1: +modal.querySelector('.data__input--custom-qzvmin').value,
      Q3: +modal.querySelector('.data__input--custom-qzvmax').value,
      qNom: +modal.querySelector('.data__input--custom-nominal-consumption').value,
      pInlet: +modal.querySelector('.data__input--custom-inlet-pressure1').value,
      pInlet2: +modal.querySelector('.data__input--custom-inlet-pressure2').value,
      pInlet3: +modal.querySelector('.data__input--custom-inlet-pressure3').value,
      pOutlet: +modal.querySelector('.data__input--custom-pressure-allow').value,
      epsBoost: +modal.querySelector('.data__input--custom-pressure-boost').value,
      nNominal: +modal.querySelector('.data__input--custom-nominal-rotate').value,
      Tzv: +modal.querySelector('.data__input--custom-tzv').value,
      Rzv: +modal.querySelector('.data__input--custom-rzv').value,
      zzv: +modal.querySelector('.data__input--custom-zzv').value,
      nn: +modal.querySelector('.data__input--custom-nominal-rotate').value,
      nnzvmin: +modal.querySelector('.data__input--custom-nnzvmin').value,
      nnzvmax: +modal.querySelector('.data__input--custom-nnzvmax').value
    };

    closeModalClickHandler();
  };

  // Передача функцій в глобальну область видимості
  window.modal = {
    open: openModalClickHandler,
    close: closeModalClickHandler,
    activate: activateModal,
    disable: disableModal,
    hideOpener: hideModalOpener,
    showOpener: showModalOpener
  };
})();
