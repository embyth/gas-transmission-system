import AbstractView from './abstract.js';
import {GpuToSupercharger} from '../const.js';

const createIncomeDataTemplate = (data) => {
  return (
    `<section id="income-data" class="income-data">
      <div class="section__container">
        <h2 class="section-heading">Вихідні дані для розрахунку</h2>

        <fieldset class="data__fieldset">
          <div class="data__fieldset-replacer">
            <div class="data__container">

              <div class="data__item">
                <label for="methane" class="data__label">Метан</label>
                <div class="data__item-input">
                  <dfn class="data__input--definition">CH<sub>4</sub></dfn>
                  <input type="number" class="data__input data__input--methane" id="methane" placeholder="95.37"
                    min="0" max="100" step="0.01" autocomplete="off" required>
                  <span class="data__input--dimension">%</span>
                </div>
              </div>

              <div class="data__item">
                <label for="ethane" class="data__label">Етан</label>
                <div class="data__item-input">
                  <dfn class="data__input--definition">C<sub>2</sub>H<sub>6</sub></dfn>
                  <input type="number" class="data__input data__input--ethane" id="ethane" placeholder="2.63" min="0"
                    max="100" step="0.01" autocomplete="off" required>
                  <span class="data__input--dimension">%</span>
                </div>
              </div>

              <div class="data__item">
                <label for="propane" class="data__label">Пропан</label>
                <div class="data__item-input">
                  <dfn class="data__input--definition">C<sub>3</sub>H<sub>8</sub></dfn>
                  <input type="number" class="data__input data__input--propane" id="propane" placeholder="0.85"
                    min="0" max="100" step="0.01" autocomplete="off" required>
                  <span class="data__input--dimension">%</span>
                </div>
              </div>

              <div class="data__item">
                <label for="butane" class="data__label">Н-бутан</label>
                <div class="data__item-input">
                  <dfn class="data__input--definition">C<sub>4</sub>H<sub>10</sub></dfn>
                  <input type="number" class="data__input data__input--butane" id="butane" placeholder="0.27" min="0"
                    max="100" step="0.01" autocomplete="off" required>
                  <span class="data__input--dimension">%</span>
                </div>
              </div>

              <div class="data__item">
                <label for="pentane" class="data__label">Н-пентан</label>
                <div class="data__item-input">
                  <dfn class="data__input--definition">C<sub>5</sub>H<sub>12</sub></dfn>
                  <input type="number" class="data__input data__input--pentane" id="pentane" placeholder="0.07"
                    min="0" max="100" step="0.01" autocomplete="off" required>
                  <span class="data__input--dimension">%</span>
                </div>
              </div>

              <div class="data__item">
                <label for="nitrogen" class="data__label">Азот</label>
                <div class="data__item-input">
                  <dfn class="data__input--definition">N<sub>2</sub></dfn>
                  <input type="number" class="data__input data__input--nitrogen" id="nitrogen" placeholder="0.62"
                    min="0" max="100" step="0.01" autocomplete="off" required>
                  <span class="data__input--dimension">%</span>
                </div>
              </div>

              <div class="data__item">
                <label for="carbon-dioxide" class="data__label">Вуглекислий газ</label>
                <div class="data__item-input">
                  <dfn class="data__input--definition">CO<sub>2</sub></dfn>
                  <input type="number" class="data__input data__input--carbon-dioxide" id="carbon-dioxide"
                    placeholder="0.19" min="0" max="100" step="0.01" autocomplete="off" required>
                  <span class="data__input--dimension">%</span>
                </div>
              </div>

              <div class="data__item">
                <label for="diameter" class="data__label">Зовнішній діаметр газопроводу</label>
                <div class="data__item-input">
                  <dfn class="data__input--definition">D<sub>з</sub></dfn>
                  <input type="number" class="data__input data__input--diameter" id="diameter" placeholder="1420"
                    min="530" max="1420" autocomplete="off" required>
                  <span class="data__input--dimension">мм</span>
                </div>
              </div>

              <div class="data__item">
                <label for="wall" class="data__label">Товщина стінки газопроводу</label>
                <div class="data__item-input">
                  <dfn class="data__input--definition">δ<sub>ст</sub></dfn>
                  <input type="number" class="data__input data__input--wall" id="wall" placeholder="18.7" min="5"
                    max="20" step="0.01" autocomplete="off" required>
                  <span class="data__input--dimension">мм</span>
                </div>
              </div>

              <div class="data__item">
                <label for="length" class="data__label">Довжина газопроводу</label>
                <div class="data__item-input">
                  <dfn class="data__input--definition">L</dfn>
                  <input type="number" class="data__input data__input--length" id="length" placeholder="128.4"
                    min="50" max="170" step="0.01" autocomplete="off" required>
                  <span class="data__input--dimension">км</span>
                </div>
              </div>

              <div class="data__item">
                <label for="consumption" class="data__label">Комерційна витрата газу на КС для першого
                  наближення</label>
                <div class="data__item-input">
                  <dfn class="data__input--definition">Q</dfn>
                  <input type="number" class="data__input data__input--consumption" id="consumption"
                    placeholder="76.4" min="20" max="150" step="0.01" autocomplete="off" required>
                  <span class="data__input--dimension">млн. м<sup>3</sup>/д</span>
                </div>
              </div>

              <div class="data__item">
                <label for="hydraulic-coef" class="data__label">Коефіцієнт гідравлічної ефективності
                  газопроводу</label>
                <div class="data__item-input">
                  <dfn class="data__input--definition">E</dfn>
                  <input type="number" class="data__input data__input--hydraulic-coef" id="hydraulic-coef"
                    placeholder="95" min="1" max="100" step="0.01" autocomplete="off" required>
                  <span class="data__input--dimension">%</span>
                </div>
              </div>

              <div class="data__item">
                <label for="pressure-atm" class="data__label">Атмосферний тиск</label>
                <div class="data__item-input">
                  <dfn class="data__input--definition">P<sub>атм</sub></dfn>
                  <input type="number" class="data__input data__input--pressure-atm" id="pressure-atm"
                    placeholder="0.10" min="0.070" max="0.150" step="0.0001" autocomplete="off" required>
                  <span class="data__input--dimension">МПа</span>
                </div>
              </div>

              <div class="data__item">
                <label for="pressure-inlet" class="data__label">Абсолютний тиск газу на вході в нагнітачі КС</label>
                <div class="data__item-input">
                  <dfn class="data__input--definition">P<sub>вх</sub></dfn>
                  <input type="number" class="data__input data__input--pressure-inlet" id="pressure-inlet"
                    placeholder="5.25" min="2" max="7" step="0.001" autocomplete="off" required>
                  <span class="data__input--dimension">МПа</span>
                </div>
              </div>

              <div class="data__item">
                <label for="temperature-inlet" class="data__label">Температура газу на вході в нагнітачі КС</label>
                <div class="data__item-input">
                  <dfn class="data__input--definition">T<sub>вх</sub></dfn>
                  <input type="number" class="data__input data__input--temperature-inlet" id="temperature-inlet"
                    placeholder="18" min="0" max="50" step="0.1" autocomplete="off" required>
                  <span class="data__input--dimension"><sup>o</sup>C</span>
                </div>
              </div>

              <div class="data__item">
                <label for="temperature-ground" class="data__label">Температура ґрунту в місці залягання
                  газопроводу</label>
                <div class="data__item-input">
                  <dfn class="data__input--definition">T<sub>гр</sub></dfn>
                  <input type="number" class="data__input data__input--temperature-ground" id="temperature-ground"
                    placeholder="16.6" min="-10" max="30" step="0.1" autocomplete="off" required>
                  <span class="data__input--dimension"><sup>o</sup>C</span>
                </div>
              </div>

              <div class="data__item">
                <label for="temperature-air" class="data__label">Температура повітря в районі розміщення КС</label>
                <div class="data__item-input">
                  <dfn class="data__input--definition">T<sub>атм</sub></dfn>
                  <input type="number" class="data__input data__input--temperature-air" id="temperature-air"
                    placeholder="20.7" min="-15" max="40" step="0.1" autocomplete="off" required>
                  <span class="data__input--dimension"><sup>o</sup>C</span>
                </div>
              </div>

              <div class="data__item">
                <label for="pressure-end" class="data__label">Необхідний абсолютний тиск газу в кінці лінійної
                  ділянки</label>
                <div class="data__item-input">
                  <dfn class="data__input--definition">P<sub>к</sub></dfn>
                  <input type="number" class="data__input data__input--pressure-end" id="pressure-end"
                    placeholder="5.5" min="2" max="8" step="0.001" autocomplete="off" required>
                  <span class="data__input--dimension">МПа</span>
                </div>
              </div>

              <div class="data__item">
                <label for="heat-coef" class="data__label">Повний коефіцієнт теплопередачі від газу в навколишнє
                  середовище</label>
                <div class="data__item-input">
                  <dfn class="data__input--definition">K</dfn>
                  <input type="number" class="data__input data__input--heat-coef" id="heat-coef" placeholder="1.754"
                    min="0.1" max="5" step="0.001" autocomplete="off" required>
                  <span class="data__input--dimension">Вт/(м<sup>2</sup>·К)</span>
                </div>
              </div>

              <div class="data__item">
                <label for="gpu" class="data__label">Вибір газоперекачувального агрегату</label>
                <div class="data__item-input data__item-input--select">
                  <button type="button" class="button data__modal-opener visually-hidden"
                    title="Відкрити параметри ГПА">
                    <svg class="data__modal-opener--svg" width="20" height="20">
                      <use xlink:href="img/sprite.svg#icon-show"></use>
                    </svg>
                  </button>
                  <div class="select-wrapper select-wrapper--gpu">
                    <select name="gpu" id="gpu" class="data__input data__input--select data__input--gpu" required>
                      <option value="" selected disabled>Привід</option>
                      <option value="gtn-16">ГТН-16</option>
                      <option value="gtk-10-4">ГТК-10-4</option>
                      <option value="gtn-25">ГТН-25</option>
                      <option value="nc-16-76-1.45">НЦ-16/76-1,45</option>
                      <option value="gtk-10i">ГТК-10И</option>
                      <option value="gtn-25i">ГТН-25И</option>
                      <option value="gtk-25i">ГТК-25И</option>
                      <option value="custom">Інший</option>
                    </select>
                  </div>

                  <div class="select-wrapper select-wrapper--superchargers">
                    <select name="superchargers" id="superchargers"
                      class="data__input data__input--select data__input--superchargers" required>
                      <option value="" selected disabled>Нагнітач</option>
                      <option value="n-16-76-1.37">Н-16-76-1,37</option>
                      <option value="n-16-76-1.44">Н-16-76-1,44</option>
                      <option value="235-21-1">235-21-1</option>
                      <option value="650-21-2">650-21-2</option>
                      <option value="650-22-2">650-22-2</option>
                      <option value="gpa-c-16-76">ГПА-Ц-16/76</option>
                      <option value="rf2bb-30">RF2BB-30</option>
                      <option value="cdp-224">CDP-224</option>
                      <option value="pcl-802-24">PCL-802/24</option>
                      <option value="pcl-1002-40">PCL-1002/40</option>
                      <option value="pcl-804-2">PCL-804-2</option>
                      <option value="655-r2">655 P2</option>
                      <option value="custom">Інший</option>
                    </select>
                  </div>
                </div>
              </div>

              <div class="data__item">
                <button class="button button--primary data__button data__button--calc"
                  type="button">Розрахувати</button>
              </div>
            </div>
          </div>
        </fieldset>
      </div>
    </section>`
  );
};

export default class Income extends AbstractView {
  constructor(incomeDataModel) {
    super();

    this._incomeDataModel = incomeDataModel;

    this._calcButtonClickHandler = this._calcButtonClickHandler.bind(this);
    this._gpuSelectChangeHandler = this._gpuSelectChangeHandler.bind(this);
    this._superchargerSelectChangeHandler = this._superchargerSelectChangeHandler.bind(this);
  }

  getTemplate() {
    return createIncomeDataTemplate(this._getData());
  }

  setCalcButtonClickHandler(callback) {
    this._callback.click = callback;
    this.getElement().querySelector(`.data__button--calc`).addEventListener(`click`, this._calcButtonClickHandler);
  }

  _getData() {
    return this._incomeDataModel.getData();
  }

  _calcButtonClickHandler(evt) {
    evt.preventDefault();

    // if (!this.isUserDataValid()) {
    //   this.shake();
    //   return;
    // }

    this._incomeDataModel.setData(this._collectData());
    this._callback.click();
  }

  setSuperchargerSelectChangeHandler(callback) {
    this._callback.superchargerChange = callback;
    this.getElement().querySelector(`#superchargers`).addEventListener(`change`, this._superchargerSelectChangeHandler);
  }

  _superchargerSelectChangeHandler(evt) {
    evt.preventDefault();
    const value = evt.target.value;
    const neededGpu = Object
      .entries(GpuToSupercharger)
      .map(([gpu, chargers]) => {
        const result = chargers.find((charger) => charger === value);

        if (result) {
          return gpu;
        } else {
          return null;
        }
      })
      .find((item) => !!item);

    const gpuOptions = this.getElement().querySelector(`#gpu`).querySelectorAll(`option`);

    [...gpuOptions].find((option) => option.value === neededGpu).selected = true;

    this._callback.superchargerChange(neededGpu === `custom`);
  }

  setGpuSelectChangeHandler(callback) {
    this._callback.gpuChange = callback;
    this.getElement().querySelector(`#gpu`).addEventListener(`change`, this._gpuSelectChangeHandler);
  }

  _gpuSelectChangeHandler(evt) {
    evt.preventDefault();
    const value = evt.target.value;
    const neededSuperchargers = GpuToSupercharger[value];

    const superchargersOptions = this.getElement().querySelector(`#superchargers`).querySelectorAll(`option`);

    [...superchargersOptions]
      .map((option) => {
        option.disabled = true;
        return option;
      })
      .filter((option) => neededSuperchargers.includes(option.value))
      .map((option, index) => {
        if (index === 0) {
          option.selected = true;
        }
        option.disabled = false;
      });

    this._callback.gpuChange(neededSuperchargers.includes(`custom`));
  }

  _collectData() {
    return {

    };
  }
}
