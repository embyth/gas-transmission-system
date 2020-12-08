import AbstractView from './abstract.js';

const createModalTemplate = (data) => {
  const {nominalPower, coefTechState, coefAirImpact, nominalTemperature, nominalFuelConsumption, mechanicalEfficiency, eps1, eps2, eps3, eta1, eta2, eta3, nizv1, nizv2, nizv3, Q1, Q3, qNom, pInlet, pInlet2, pInlet3, pOutlet, epsBoost, nNominal, Tzv, Rzv, zzv, nnzvmin, nnzvmax} = data;

  return (
    `<div class="modal__container">
      <div class="modal__overlay modal__overlay--hidden"></div>
      <div class="modal modal--hidden">
        <button type="button" class="button modal__close" title="Закрити">
          <svg class="modal__close--svg" width="20" height="20">
            <use xlink:href="img/sprite.svg#icon-close"></use>
          </svg>
        </button>

        <h3 class="section-heading">Параметри вашого ГПА</h3>
        <div class="modal__inner">

          <div class="data__item">
            <label for="custom-nominal-power" class="data__label">Номінальна потужність ГТУ</label>
            <div class="data__item-input">
              <dfn class="data__input--definition">Ne<sup>N</sup></dfn>
              <input type="number" class="data__input data__input--custom-nominal-power" id="custom-nominal-power"
                placeholder="25000" min="4000" max="30000" step="1" autocomplete="off" required value="${nominalPower ? nominalPower : ``}">
              <span class="data__input--dimension">кВт</span>
            </div>
          </div>

          <div class="data__item">
            <label for="custom-nominal-temperature" class="data__label">Номінальна температура повітря на вході в
              ГТУ</label>
            <div class="data__item-input">
              <dfn class="data__input--definition">T<sub>з</sub><sup>N</sup></dfn>
              <input type="number" class="data__input data__input--custom-nominal-temperature"
                id="custom-nominal-temperature" placeholder="288" min="270" max="310" step="1" autocomplete="off" required value="${nominalTemperature ? nominalTemperature : ``}">
              <span class="data__input--dimension">К</span>
            </div>
          </div>

          <div class="data__item">
            <label for="custom-tech-state" class="data__label">Коефіцієнт, що враховує технічний стан ГТУ</label>
            <div class="data__item-input">
              <dfn class="data__input--definition">К<sub>N</sub></dfn>
              <input type="number" class="data__input data__input--custom-tech-state" id="custom-tech-state"
                placeholder="0.85" min="0.5" max="1" step="0.01" autocomplete="off" required value="${coefTechState ? coefTechState : ``}">
              <span class="data__input--dimension"></span>
            </div>
          </div>

          <div class="data__item">
            <label for="custom-air-impact" class="data__label">Коефіцієнт, що враховує вплив температури атм.
              повітря</label>
            <div class="data__item-input">
              <dfn class="data__input--definition">К<sub>t</sub></dfn>
              <input type="number" class="data__input data__input--custom-air-impact" id="custom-air-impact"
                placeholder="3.2" min="1" max="6" step="0.01" autocomplete="off" required value="${coefAirImpact ? coefAirImpact : ``}">
              <span class="data__input--dimension"></span>
            </div>
          </div>

          <div class="data__item">
            <label for="custom-mech-efficiency" class="data__label">Механічний ККД нагнітача</label>
            <div class="data__item-input">
              <dfn class="data__input--definition">η<sub>м</sub></dfn>
              <input type="number" class="data__input data__input--custom-mech-efficiency" id="custom-mech-efficiency"
                placeholder="0.95" min="0.8" max="1" step="0.001" autocomplete="off" required value="${mechanicalEfficiency ? mechanicalEfficiency : ``}">
              <span class="data__input--dimension"></span>
            </div>
          </div>

          <div class="data__item">
            <label for="custom-fuel-consumption" class="data__label">Номінальна витрата паливного газу</label>
            <div class="data__item-input">
              <dfn class="data__input--definition">q<sub>пг</sub><sup>N</sup></dfn>
              <input type="number" class="data__input data__input--custom-fuel-consumption" id="custom-fuel-consumption"
                placeholder="3.28" min="1" max="15" step="0.01" autocomplete="off" required value="${nominalFuelConsumption ? nominalFuelConsumption : ``}">
              <span class="data__input--dimension">тис. м<sup>3</sup>/д</span>
            </div>
          </div>

          <div class="data__item">
            <label for="custom-pressure-allow" class="data__label">Кінцений тиск при виході з нагнітального
              патрубка</label>
            <div class="data__item-input">
              <dfn class="data__input--definition">Р<sub>доп</sub></dfn>
              <input type="number" class="data__input data__input--custom-pressure-allow" id="custom-pressure-allow"
                placeholder="7.45" min="4" max="8" step="0.001" autocomplete="off" required value="${pOutlet ? pOutlet : ``}">
              <span class="data__input--dimension">МПа</span>
            </div>
          </div>

          <div class="data__item">
            <label for="custom-pressure-boost" class="data__label">Ступінь підвищення тиску</label>
            <div class="data__item-input">
              <dfn class="data__input--definition">ε</dfn>
              <input type="number" class="data__input data__input--custom-pressure-boost" id="custom-pressure-boost"
                placeholder="1.44" min="1" max="2" step="0.001" autocomplete="off" required value="${epsBoost ? epsBoost : ``}">
              <span class="data__input--dimension"></span>
            </div>
          </div>

          <div class="data__item">
            <label for="custom-nominal-rotate" class="data__label">Номінальна обертова частота ротора</label>
            <div class="data__item-input">
              <dfn class="data__input--definition">n<sub>ном</sub></dfn>
              <input type="number" class="data__input data__input--custom-nominal-rotate" id="custom-nominal-rotate"
                placeholder="6500" min="2000" max="15000" step="1" autocomplete="off" required value="${nNominal ? nNominal : ``}">
              <span class="data__input--dimension">об/хв</span>
            </div>
          </div>

          <div class="data__item">
            <label for="custom-zzv" class="data__label">Коефіцієнт стисливості газу при якому побудовані
              зведені газодинамічні характеристики нагнітача</label>
            <div class="data__item-input">
              <dfn class="data__input--definition">z<sub>зв</sub></dfn>
              <input type="number" class="data__input data__input--custom-zzv" id="custom-zzv" placeholder="0.888" min="0.6"
                max="1" step="0.001" autocomplete="off" required value="${zzv ? zzv : ``}">
              <span class="data__input--dimension"></span>
            </div>
          </div>

          <div class="data__item">
            <label for="custom-tzv" class="data__label">Температура газу на вході при якій побудовані
              зведені газодинамічні характеристики нагнітача</label>
            <div class="data__item-input">
              <dfn class="data__input--definition">Т<sub>зв</sub></dfn>
              <input type="number" class="data__input data__input--custom-tzv" id="custom-tzv" placeholder="288" min="260"
                max="320" step="0.1" autocomplete="off" required value="${Tzv ? Tzv : ``}">
              <span class="data__input--dimension">К</span>
            </div>
          </div>

          <div class="data__item">
            <label for="custom-rzv" class="data__label">Газова стала при якій побудовані
              зведені газодинамічні характеристики нагнітача</label>
            <div class="data__item-input">
              <dfn class="data__input--definition">R<sub>зв</sub></dfn>
              <input type="number" class="data__input data__input--custom-rzv" id="custom-rzv" placeholder="508" min="400"
                max="650" step="0.1" autocomplete="off" required value="${Rzv ? Rzv : ``}">
              <span class="data__input--dimension">Дж/(кг·К)</span>
            </div>
          </div>

          <div class="data__item">
            <label for="custom-qzvmin" class="data__label">Мінімальне значення зведеної продуктивності за умов
              входу</label>
            <div class="data__item-input">
              <dfn class="data__input--definition">Q<sub>зв</sub><sup>min</sup></dfn>
              <input type="number" class="data__input data__input--custom-qzvmin" id="custom-qzvmin" placeholder="200"
                min="50" max="1000" step="1" autocomplete="off" required value="${Q1 ? Q1 : ``}">
              <span class="data__input--dimension">м<sup>3</sup>/хв</span>
            </div>
          </div>

          <div class="data__item">
            <label for="custom-qzvmax" class="data__label">Максимальне значення зведеної продуктивності за умов
              входу</label>
            <div class="data__item-input">
              <dfn class="data__input--definition">Q<sub>зв</sub><sup>max</sup></dfn>
              <input type="number" class="data__input data__input--custom-qzvmax" id="custom-qzvmax" placeholder="500"
                min="50" max="1000" step="1" autocomplete="off" required value="${Q3 ? Q3 : ``}">
              <span class="data__input--dimension">м<sup>3</sup>/хв</span>
            </div>
          </div>

          <div class="data__item">
            <label for="custom-nnzvmin" class="data__label">Мінімальне значення зведених відносних обертів
              нагнітача</label>
            <div class="data__item-input">
              <dfn class="data__input--definition">[n/n<sub>н</sub>]<sub>зв</sub><sup>min</sup></dfn>
              <input type="number" class="data__input data__input--custom-nnzvmin" id="custom-nnzvmin" placeholder="0.8"
                min="0.5" max="1.3" step="0.01" autocomplete="off" required value="${nnzvmin ? nnzvmin : ``}">
              <span class="data__input--dimension"></span>
            </div>
          </div>

          <div class="data__item">
            <label for="custom-nnzvmax" class="data__label">Максимальне значення зведених відносних обертів
              нагнітача</label>
            <div class="data__item-input">
              <dfn class="data__input--definition">[n/n<sub>н</sub>]<sub>зв</sub><sup>max</sup></dfn>
              <input type="number" class="data__input data__input--custom-nnzvmax" id="custom-nnzvmax" placeholder="1.05"
                min="1" max="1.5" step="0.01" autocomplete="off" required value="${nnzvmax ? nnzvmax : ``}">
              <span class="data__input--dimension"></span>
            </div>
          </div>

          <div class="data__item">
            <label for="custom-inlet-pressure1" class="data__label">Тиск на вході в перший нагнітач</label>
            <div class="data__item--triple">
              <div class="data__item-input">
                <dfn class="data__input--definition">Р<sub>вх1</sub></dfn>
                <input type="number" class="data__input data__input--custom-inlet-pressure1" id="custom-inlet-pressure1"
                  placeholder="6.08" min="3" max="8" step="0.001" autocomplete="off" required value="${pInlet ? pInlet : ``}">
                <span class="data__input--dimension">МПа</span>
              </div>
              <div class="data__item-input">
                <dfn class="data__input--definition">Р<sub>вх2</sub></dfn>
                <input type="number" class="data__input data__input--custom-inlet-pressure2" id="custom-inlet-pressure2"
                  placeholder="4.97" min="3" max="8" step="0.001" autocomplete="off" value="${pInlet2 ? pInlet2 : ``}">
                <span class="data__input--dimension">МПа</span>
              </div>
              <div class="data__item-input">
                <dfn class="data__input--definition">Р<sub>вх3</sub></dfn>
                <input type="number" class="data__input data__input--custom-inlet-pressure3" id="custom-inlet-pressure3"
                  placeholder="4.32" min="3" max="8" step="0.001" autocomplete="off" value="${pInlet3 ? pInlet3 : ``}">
                <span class="data__input--dimension">МПа</span>
              </div>
            </div>
          </div>

          <div class="data__item">
            <label for="custom-eps1" class="data__label">Номінальний ступінь підвищення тиску для мат. моделі</label>
            <div class="data__item--triple">
              <div class="data__item-input">
                <dfn class="data__input--definition">ε<sub>1</sub></dfn>
                <input type="number" class="data__input data__input--custom-eps1" id="custom-eps1" placeholder="1.45"
                  min="1" max="1.9" step="0.001" autocomplete="off" required value="${eps1 ? eps1 : ``}">
                <span class="data__input--dimension"></span>
              </div>
              <div class="data__item-input">
                <dfn class="data__input--definition">ε<sub>2</sub></dfn>
                <input type="number" class="data__input data__input--custom-eps2" id="custom-eps2" placeholder="1.37"
                  min="1" max="1.9" step="0.001" autocomplete="off" required value="${eps2 ? eps2 : ``}">
                <span class="data__input--dimension"></span>
              </div>
              <div class="data__item-input">
                <dfn class="data__input--definition">ε<sub>3</sub></dfn>
                <input type="number" class="data__input data__input--custom-eps3" id="custom-eps3" placeholder="1.21"
                  min="1" max="1.9" step="0.001" autocomplete="off" required value="${eps3 ? eps3 : ``}">
                <span class="data__input--dimension"></span>
              </div>
            </div>
          </div>

          <div class="data__item">
            <label for="custom-eta1" class="data__label">Політропний ККД для мат. моделі</label>
            <div class="data__item--triple">
              <div class="data__item-input">
                <dfn class="data__input--definition">η<sub>1</sub></dfn>
                <input type="number" class="data__input data__input--custom-eta1" id="custom-eta1" placeholder="0.84"
                  min="0.4" max="1" step="0.001" autocomplete="off" required value="${eta1 ? eta1 : ``}">
                <span class="data__input--dimension"></span>
              </div>
              <div class="data__item-input">
                <dfn class="data__input--definition">η<sub>2</sub></dfn>
                <input type="number" class="data__input data__input--custom-eta2" id="custom-eta2" placeholder="0.81"
                  min="0.4" max="1" step="0.001" autocomplete="off" required value="${eta2 ? eta2 : ``}">
                <span class="data__input--dimension"></span>
              </div>
              <div class="data__item-input">
                <dfn class="data__input--definition">η<sub>3</sub></dfn>
                <input type="number" class="data__input data__input--custom-eta3" id="custom-eta3" placeholder="0.58"
                  min="0.4" max="1" step="0.001" autocomplete="off" required value="${eta3 ? eta3 : ``}">
                <span class="data__input--dimension"></span>
              </div>
            </div>
          </div>

          <div class="data__item">
            <label for="custom-nizv1" class="data__label">Зведена відносна внутрішня потужність для мат. моделі</label>
            <div class="data__item--triple">
              <div class="data__item-input">
                <dfn class="data__input--definition">[N<sub>i</sub>/ρ<sub>вх</sub>]<sub>зв1</sub></dfn>
                <input type="number" class="data__input data__input--custom-nizv1" id="custom-nizv1" placeholder="215"
                  min="100" max="1000" step="1" autocomplete="off" required value="${nizv1 ? nizv1 : ``}">
                <span class="data__input--dimension data__input--dimension-long">кВт/(кг/м<sup>3</sup>)</span>
              </div>
              <div class="data__item-input">
                <dfn class="data__input--definition">[N<sub>i</sub>/ρ<sub>вх</sub>]<sub>зв2</sub></dfn>
                <input type="number" class="data__input data__input--custom-nizv2" id="custom-nizv2" placeholder="238"
                  min="100" max="1000" step="1" autocomplete="off" required value="${nizv2 ? nizv2 : ``}">
                <span class="data__input--dimension data__input--dimension-long">кВт/(кг/м<sup>3</sup>)</span>
              </div>
              <div class="data__item-input">
                <dfn class="data__input--definition">[N<sub>i</sub>/ρ<sub>вх</sub>]<sub>зв3</sub></dfn>
                <input type="number" class="data__input data__input--custom-nizv3" id="custom-nizv3" placeholder="220"
                  min="100" max="1000" step="1" autocomplete="off" required value="${nizv3 ? nizv3 : ``}">
                <span class="data__input--dimension data__input--dimension-long">кВт/(кг/м<sup>3</sup>)</span>
              </div>
            </div>
          </div>

          <div class="data__item">
            <label for="custom-nominal-consumption" class="data__label">Номінальна продуктивнісь нагнітача</label>
            <div class="data__item-input">
              <dfn class="data__input--definition">q<sub>н</sub></dfn>
              <input type="number" class="data__input data__input--custom-nominal-consumption"
                id="custom-nominal-consumption" placeholder="31.0" min="5" max="70" step="0.01" autocomplete="off" required value="${qNom ? qNom : ``}">
              <span class="data__input--dimension">млн. м<sup>3</sup>/д</span>
            </div>
          </div>

          <div class="data__item">
            <button type="button" class="button button--primary modal__apply">Підтвердити</button>
          </div>
        </div>

      </div>
    </div>`
  );
};

export default class Modal extends AbstractView {
  constructor(incomeDataModel) {
    super();

    this._incomeDataModel = incomeDataModel;

    this._applyButtonClickHandler = this._applyButtonClickHandler.bind(this);
    this._closeModalClickHandler = this._closeModalClickHandler.bind(this);
  }

  getTemplate() {
    return createModalTemplate(this._getData());
  }

  setApplyButtonClickHandler(callback) {
    this._callback.applyClick = callback;
    this.getElement().querySelector(`.modal__apply`).addEventListener(`click`, this._applyButtonClickHandler);
  }

  _applyButtonClickHandler(evt) {
    evt.preventDefault();

    if (!this.isUserDataValid()) {
      return;
    }

    this._incomeDataModel.setData(this._collectData());
    this._callback.applyClick();
  }

  setCloseButtonClickHandler(callback) {
    this._callback.closeClick = callback;
    this.getElement().querySelector(`.modal__close`).addEventListener(`click`, this._closeModalClickHandler);
    this.getElement().querySelector(`.modal__overlay`).addEventListener(`click`, this._closeModalClickHandler);
  }

  _closeModalClickHandler(evt) {
    evt.preventDefault();

    this._incomeDataModel.setData(this._collectData());
    this._callback.closeClick();
  }

  animateAppearance() {
    setTimeout(() => {
      this.getElement().querySelector(`.modal__overlay`).classList.remove(`modal__overlay--hidden`);
      this.getElement().querySelector(`.modal`).classList.remove(`modal--hidden`);
    }, 100);
  }

  _getData() {
    return this._incomeDataModel.getData();
  }

  _collectData() {
    const Pvx2 = this.getElement().querySelector(`.data__input--custom-inlet-pressure2`).value;
    const isMulti = !(Pvx2 === `` || Pvx2 === 0);

    return {
      nominalPower: +this.getElement().querySelector(`.data__input--custom-nominal-power`).value,
      coefTechState: +this.getElement().querySelector(`.data__input--custom-tech-state`).value,
      coefFreeze: 1,
      coefSpentGas: 0.985,
      coefAirImpact: +this.getElement().querySelector(`.data__input--custom-air-impact`).value,
      nominalTemperature: +this.getElement().querySelector(`.data__input--custom-nominal-temperature`).value,
      nominalFuelConsumption: +this.getElement().querySelector(`.data__input--custom-fuel-consumption`).value,
      mechanicalEfficiency: +this.getElement().querySelector(`.data__input--custom-mech-efficiency`).value,
      multi: isMulti,
      eps1: +this.getElement().querySelector(`.data__input--custom-eps1`).value,
      eps2: +this.getElement().querySelector(`.data__input--custom-eps2`).value,
      eps3: +this.getElement().querySelector(`.data__input--custom-eps3`).value,
      eta1: +this.getElement().querySelector(`.data__input--custom-eta1`).value,
      eta2: +this.getElement().querySelector(`.data__input--custom-eta2`).value,
      eta3: +this.getElement().querySelector(`.data__input--custom-eta3`).value,
      nizv1: +this.getElement().querySelector(`.data__input--custom-nizv1`).value,
      nizv2: +this.getElement().querySelector(`.data__input--custom-nizv2`).value,
      nizv3: +this.getElement().querySelector(`.data__input--custom-nizv3`).value,
      Q1: +this.getElement().querySelector(`.data__input--custom-qzvmin`).value,
      Q3: +this.getElement().querySelector(`.data__input--custom-qzvmax`).value,
      qNom: +this.getElement().querySelector(`.data__input--custom-nominal-consumption`).value,
      pInlet: +this.getElement().querySelector(`.data__input--custom-inlet-pressure1`).value,
      pInlet2: Pvx2,
      pInlet3: +this.getElement().querySelector(`.data__input--custom-inlet-pressure3`).value,
      pOutlet: +this.getElement().querySelector(`.data__input--custom-pressure-allow`).value,
      epsBoost: +this.getElement().querySelector(`.data__input--custom-pressure-boost`).value,
      nNominal: +this.getElement().querySelector(`.data__input--custom-nominal-rotate`).value,
      Tzv: +this.getElement().querySelector(`.data__input--custom-tzv`).value,
      Rzv: +this.getElement().querySelector(`.data__input--custom-rzv`).value,
      zzv: +this.getElement().querySelector(`.data__input--custom-zzv`).value,
      nn: +this.getElement().querySelector(`.data__input--custom-nominal-rotate`).value,
      nnzvmin: +this.getElement().querySelector(`.data__input--custom-nnzvmin`).value,
      nnzvmax: +this.getElement().querySelector(`.data__input--custom-nnzvmax`).value
    };
  }
}
