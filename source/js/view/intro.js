import AbstractView from './abstract.js';

const createIntroTemplate = () => {
  return (
    `<section id="intro" class="intro">
      <div class="section__container">
        <h1 class="site-heading">Аналітичний розрахунок режиму роботи газотранспортної системи</h1>

        <p class="intro__text">
          При проектуванні і експлуатації газопроводів нерідко постає задача у визначенні пропускної здатності
          газопроводу або його ділянки, розрахунок тиску і температури в будь-якій точці газопроводу. Дана задача
          пов’язана із гідравлічними та тепловими розрахунками газопроводів, які проводяться разом, оскільки
          гідравлічні втрати і фізичні властивості газу залежать від його температури, а тепловий режим газопроводу
          змінюється із зміною гідравлічного режиму.
        </p>

        <div class="intro__buttons">
          <a class="button button--secondary intro__button--info"
            href="https://github.com/embyth/gas-transmission-system#comet-%D1%80%D0%BE%D0%B7%D1%80%D0%B0%D1%85%D1%83%D0%BD%D0%BE%D0%BA-%D1%80%D0%B5%D0%B6%D0%B8%D0%BC%D1%83-%D1%80%D0%BE%D0%B1%D0%BE%D1%82%D0%B8-%D0%B3%D0%B0%D0%B7%D0%BE%D1%82%D1%80%D0%B0%D0%BD%D1%81%D0%BF%D0%BE%D1%80%D1%82%D0%BD%D0%BE%D1%97-%D1%81%D0%B8%D1%81%D1%82%D0%B5%D0%BC%D0%B8"
            target="_blank">Інформація</a>
          <button class="button button--primary intro__button--begin" type="button">Почати</button>
        </div>
      </div>
    </section>`
  );
};

export default class Intro extends AbstractView {
  constructor() {
    super();

    this._beginButtonClickHandler = this._beginButtonClickHandler.bind(this);
  }

  getTemplate() {
    return createIntroTemplate();
  }

  setBeginButtonClickHandler(callback) {
    this._callback.click = callback;
    this.getElement().querySelector(`.intro__button--begin`).addEventListener(`click`, this._beginButtonClickHandler);
  }

  _beginButtonClickHandler(evt) {
    evt.preventDefault();

    this._callback.click();
  }
}
