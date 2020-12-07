import {createElement} from '../utils/render.js';
import {highlightInput, resetHighlightInput} from '../utils/common.js';
import {SHAKE_ANIMATION_TIMEOUT, ErrorMessage} from '../const.js';

export default class Abstract {
  constructor() {
    if (new.target === Abstract) {
      throw new Error(`Can't instantiate Abstract, only concrete one.`);
    }

    this._element = null;
    this._callback = {};
  }

  getTemplate() {
    throw new Error(`Abstract method not implemented: getTemplate`);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }

  shake() {
    this.getElement().style.animation = `shake ${SHAKE_ANIMATION_TIMEOUT / 1000}s`;
    setTimeout(() => {
      this.getElement().style.animation = ``;
    }, SHAKE_ANIMATION_TIMEOUT);
  }

  _checkInputValidity(input) {
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
      input.setCustomValidity(``);
      resetHighlightInput(input);
    }
  }

  _checkSelectValidity(select) {
    if (select.value === ``) {
      select.setCustomValidity(ErrorMessage.SELECT_OPTION);
      select.reportValidity();
      highlightInput(select);
    } else {
      select.setCustomValidity(``);
      resetHighlightInput(select);
    }
  }

  isUserDataValid() {
    const inputs = this.getElement().querySelectorAll(`input`);
    const selects = this.getElement().querySelectorAll(`select`);
    const notValidInputs = [];
    const notValidSelects = [];

    inputs.forEach((input) => {
      if (!input.checkValidity()) {
        highlightInput(input);
        notValidInputs.push(input);
        input.addEventListener(`input`, (evt) => {
          this._checkInputValidity(evt.target);
        });
      }
    });

    selects.forEach((select) => {
      if (!select.checkValidity()) {
        notValidSelects.push(select);

        select.addEventListener(`change`, (evt) => {
          this._checkSelectValidity(evt.target);
        });
      }
    });

    if (notValidSelects.length) {
      this._checkSelectValidity(notValidSelects[0]);
    }

    if (notValidInputs.length) {
      this._checkInputValidity(notValidInputs[0]);
    }

    return notValidInputs.length === 0 && notValidSelects.length === 0;
  }
}
