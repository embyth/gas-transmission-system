import AbstractView from './abstract.js';

const createResultsTemplate = (results) => {
  return (
    `<section id="results" class="results">
      <div class="section__container">
        <h2 class="section-heading">Результати розрахунку пропускної здатності системи КС - прилегла ділянка</h2>

        <div class="data__container data__container--results">
          <table class="data__table data__table--results">
            <thead class="data__table-head">
              <tr class="data__table-row">
                <td class="data__table-cell data__table-cell--parameter">Параметр</td>
                <td class="data__table-cell data__table-cell--marking">Позначення</td>
                <td class="data__table-cell data__table-cell--value">Значення</td>
                <td class="data__table-cell data__table-cell--dimension">Розмірність</td>
              </tr>
            </thead>
            <tbody class="data__table-body">
              <tr class="data__table-row data__table-row--full">
                <td colspan="4">Результати розрахунку фізичних властивостей природного газу</td>
              </tr>
              <tr class="data__table-row">
                <td class="data__table-cell data__table-cell--parameter">Молярна маса газу</td>
                <td class="data__table-cell data__table-cell--marking">μ</td>
                <td class="data__table-cell data__table-cell--value data__table-cell--molar-mass"></td>
                <td class="data__table-cell data__table-cell--dimension">кг/кмоль</td>
              </tr>
              <tr class="data__table-row">
                <td class="data__table-cell data__table-cell--parameter">Густина природного газу за нормальних умов
                </td>
                <td class="data__table-cell data__table-cell--marking">ρ<sub>н</sub></td>
                <td class="data__table-cell data__table-cell--value data__table-cell--density-norm"></td>
                <td class="data__table-cell data__table-cell--dimension">кг/м<sup>3</sup></td>
              </tr>
              <tr class="data__table-row">
                <td class="data__table-cell data__table-cell--parameter">Відносна густина газу за повітрям</td>
                <td class="data__table-cell data__table-cell--marking">Δ</td>
                <td class="data__table-cell data__table-cell--value data__table-cell--density-rel"></td>
                <td class="data__table-cell data__table-cell--dimension"></td>
              </tr>
              <tr class="data__table-row">
                <td class="data__table-cell data__table-cell--parameter">Густина природного газу за стандартних
                  фізичних умов</td>
                <td class="data__table-cell data__table-cell--marking">ρ<sub>ст</sub></td>
                <td class="data__table-cell data__table-cell--value data__table-cell--density-st"></td>
                <td class="data__table-cell data__table-cell--dimension">кг/м<sup>3</sup></td>
              </tr>
              <tr class="data__table-row">
                <td class="data__table-cell data__table-cell--parameter">Газова стала природного газу</td>
                <td class="data__table-cell data__table-cell--marking">R</td>
                <td class="data__table-cell data__table-cell--value data__table-cell--gas-const"></td>
                <td class="data__table-cell data__table-cell--dimension">Дж/кг·К</td>
              </tr>
              <tr class="data__table-row">
                <td class="data__table-cell data__table-cell--parameter">Псевдокритичний тиск природного газу</td>
                <td class="data__table-cell data__table-cell--marking">P<sub>кр</sub></td>
                <td class="data__table-cell data__table-cell--value data__table-cell--pseudo-pressure"></td>
                <td class="data__table-cell data__table-cell--dimension">МПа</td>
              </tr>
              <tr class="data__table-row">
                <td class="data__table-cell data__table-cell--parameter">Псевдокритична температура природного газу
                </td>
                <td class="data__table-cell data__table-cell--marking">T<sub>кр</sub></td>
                <td class="data__table-cell data__table-cell--value data__table-cell--pseudo-temperature"></td>
                <td class="data__table-cell data__table-cell--dimension">K</td>
              </tr>
              <tr class="data__table-row">
                <td class="data__table-cell data__table-cell--parameter">Нижча об’ємна теплота згорання</td>
                <td class="data__table-cell data__table-cell--marking">Q<sub>нр</sub></td>
                <td class="data__table-cell data__table-cell--value data__table-cell--volumetric-heat"></td>
                <td class="data__table-cell data__table-cell--dimension">кДж/м<sup>3</sup></td>
              </tr>
              <tr class="data__table-row data__table-row--full">
                <td colspan="4">Результати визначення наявної потужності ГПА за заданих умов</td>
              </tr>
              <tr class="data__table-row">
                <td class="data__table-cell data__table-cell--parameter">Температура повітря на вході ГТУ</td>
                <td class="data__table-cell data__table-cell--marking">T<sub>з</sub></td>
                <td class="data__table-cell data__table-cell--value data__table-cell--inlet-air-temperature"></td>
                <td class="data__table-cell data__table-cell--dimension">К</td>
              </tr>
              <tr class="data__table-row">
                <td class="data__table-cell data__table-cell--parameter">Наявна потужність газоперекачувального
                  агрегату</td>
                <td class="data__table-cell data__table-cell--marking">N<sub>e</sub><sup>p</sup></td>
                <td class="data__table-cell data__table-cell--value data__table-cell--available-power"></td>
                <td class="data__table-cell data__table-cell--dimension">кВт</td>
              </tr>
              <tr class="data__table-row data__table-row--full">
                <td colspan="4">Результати розробки математичних моделей нагнітача</td>
              </tr>
              <tr class="data__table-row">
                <td class="data__table-cell data__table-cell--parameter">Коеф. математичної моделі ступеня
                  підвищення
                  тиску</td>
                <td class="data__table-cell data__table-cell--marking">с<sub>1</sub>·10<sup>6</sup></td>
                <td class="data__table-cell data__table-cell--value data__table-cell--coef-c1"></td>
                <td class="data__table-cell data__table-cell--dimension"></td>
              </tr>
              <tr class="data__table-row">
                <td class="data__table-cell data__table-cell--parameter">Коеф. математичної моделі ступеня
                  підвищення
                  тиску</td>
                <td class="data__table-cell data__table-cell--marking">b<sub>1</sub>·10<sup>3</sup></td>
                <td class="data__table-cell data__table-cell--value data__table-cell--coef-b1"></td>
                <td class="data__table-cell data__table-cell--dimension"></td>
              </tr>
              <tr class="data__table-row">
                <td class="data__table-cell data__table-cell--parameter">Коеф. математичної моделі ступеня
                  підвищення
                  тиску</td>
                <td class="data__table-cell data__table-cell--marking">a<sub>1</sub></td>
                <td class="data__table-cell data__table-cell--value data__table-cell--coef-a1"></td>
                <td class="data__table-cell data__table-cell--dimension"></td>
              </tr>
              <tr class="data__table-row">
                <td class="data__table-cell data__table-cell--parameter">Коефіцієнт математичної моделі політропного
                  коефіцієнта корисної дії</td>
                <td class="data__table-cell data__table-cell--marking">с<sub>2</sub>·10<sup>6</sup></td>
                <td class="data__table-cell data__table-cell--value data__table-cell--coef-c2"></td>
                <td class="data__table-cell data__table-cell--dimension"></td>
              </tr>
              <tr class="data__table-row">
                <td class="data__table-cell data__table-cell--parameter">Коефіцієнт математичної моделі політропного
                  коефіцієнта корисної дії</td>
                <td class="data__table-cell data__table-cell--marking">b<sub>2</sub>·10<sup>3</sup></td>
                <td class="data__table-cell data__table-cell--value data__table-cell--coef-b2"></td>
                <td class="data__table-cell data__table-cell--dimension"></td>
              </tr>
              <tr class="data__table-row">
                <td class="data__table-cell data__table-cell--parameter">Коефіцієнт математичної моделі політропного
                  коефіцієнта корисної дії</td>
                <td class="data__table-cell data__table-cell--marking">a<sub>2</sub></td>
                <td class="data__table-cell data__table-cell--value data__table-cell--coef-a2"></td>
                <td class="data__table-cell data__table-cell--dimension"></td>
              </tr>
              <tr class="data__table-row">
                <td class="data__table-cell data__table-cell--parameter">Коеф. математичної моделі зведеної
                  внутрішньої потужності</td>
                <td class="data__table-cell data__table-cell--marking">c<sub>3</sub>·10<sup>4</sup></td>
                <td class="data__table-cell data__table-cell--value data__table-cell--coef-c3"></td>
                <td class="data__table-cell data__table-cell--dimension"></td>
              </tr>
              <tr class="data__table-row">
                <td class="data__table-cell data__table-cell--parameter">Коеф. математичної моделі зведеної
                  внутрішньої потужності</td>
                <td class="data__table-cell data__table-cell--marking">b<sub>3</sub></td>
                <td class="data__table-cell data__table-cell--value data__table-cell--coef-b3"></td>
                <td class="data__table-cell data__table-cell--dimension"></td>
              </tr>
              <tr class="data__table-row">
                <td class="data__table-cell data__table-cell--parameter">Коеф. математичної моделі зведеної
                  внутрішньої потужності</td>
                <td class="data__table-cell data__table-cell--marking">a<sub>3</sub></td>
                <td class="data__table-cell data__table-cell--value data__table-cell--coef-a3"></td>
                <td class="data__table-cell data__table-cell--dimension"></td>
              </tr>
              <tr class="data__table-row data__table-row--full">
                <td colspan="4">Результати розрахунку режиму роботи нагнітача з використанням математичних моделей
                </td>
              </tr>
              <tr class="data__table-row">
                <td class="data__table-cell data__table-cell--parameter">Абсолютна температура газу на
                  вході в нагнітачі КС</td>
                <td class="data__table-cell data__table-cell--marking">Т<sub>вх</sub></td>
                <td class="data__table-cell data__table-cell--value data__table-cell--inlet-gas-temperature">
                </td>
                <td class="data__table-cell data__table-cell--dimension">К</td>
              </tr>
              <tr class="data__table-row">
                <td class="data__table-cell data__table-cell--parameter">Коефіцієнт стисливості газу за умов входу у
                  нагнітач</td>
                <td class="data__table-cell data__table-cell--marking">z<sub>вх</sub></td>
                <td class="data__table-cell data__table-cell--value data__table-cell--coef-compressibility">
                </td>
                <td class="data__table-cell data__table-cell--dimension"></td>
              </tr>
              <tr class="data__table-row">
                <td class="data__table-cell data__table-cell--parameter">Густина газу за умов входу в нагнітач</td>
                <td class="data__table-cell data__table-cell--marking">ρ<sub>вх</sub></td>
                <td class="data__table-cell data__table-cell--value data__table-cell--inlet-gas-density">
                </td>
                <td class="data__table-cell data__table-cell--dimension">кг/м<sup>3</sup></td>
              </tr>
              <tr class="data__table-row">
                <td class="data__table-cell data__table-cell--parameter">Кількість паралельно працюючих нагнітачів
                </td>
                <td class="data__table-cell data__table-cell--marking">N</td>
                <td class="data__table-cell data__table-cell--value data__table-cell--gpu-amount">
                </td>
                <td class="data__table-cell data__table-cell--dimension">шт</td>
              </tr>
              <tr class="data__table-row">
                <td class="data__table-cell data__table-cell--parameter">Комерційна продуктивність одиного нагнітача
                </td>
                <td class="data__table-cell data__table-cell--marking">Q<sub>0</sub></td>
                <td class="data__table-cell data__table-cell--value data__table-cell--single-consumption">
                </td>
                <td class="data__table-cell data__table-cell--dimension">млн. м<sup>3</sup>/д</td>
              </tr>
              <tr class="data__table-row">
                <td class="data__table-cell data__table-cell--parameter">Продуктивність за умов входу в нагнітач
                </td>
                <td class="data__table-cell data__table-cell--marking">Q<sub>вх</sub></td>
                <td class="data__table-cell data__table-cell--value data__table-cell--volumetric-consumption">
                </td>
                <td class="data__table-cell data__table-cell--dimension">м<sup>3</sup>/хв</td>
              </tr>
              <tr class="data__table-row">
                <td class="data__table-cell data__table-cell--parameter">Обертова частота вала нагнітача
                </td>
                <td class="data__table-cell data__table-cell--marking">n</td>
                <td class="data__table-cell data__table-cell--value data__table-cell--rotational-frequency">
                </td>
                <td class="data__table-cell data__table-cell--dimension">об/хв</td>
              </tr>
              <tr class="data__table-row">
                <td class="data__table-cell data__table-cell--parameter">Зведена витрата газу за умов входу в
                  нагнітач
                </td>
                <td class="data__table-cell data__table-cell--marking">Q<sub>зв</sub></td>
                <td class="data__table-cell data__table-cell--value data__table-cell--erected-consumption">
                </td>
                <td class="data__table-cell data__table-cell--dimension">м<sup>3</sup>/хв</td>
              </tr>
              <tr class="data__table-row">
                <td class="data__table-cell data__table-cell--parameter">Зведена відносна обертова частота нагнітача
                </td>
                <td class="data__table-cell data__table-cell--marking">[n/n<sub>н</sub>]<sub>зв</sub></td>
                <td class="data__table-cell data__table-cell--value data__table-cell--relative-rotational-frequency">
                </td>
                <td class="data__table-cell data__table-cell--dimension"></td>
              </tr>
              <tr class="data__table-row">
                <td class="data__table-cell data__table-cell--parameter">Номінальний ступінь підвищення тиску</td>
                <td class="data__table-cell data__table-cell--marking">ε<sub>н</sub></td>
                <td class="data__table-cell data__table-cell--value data__table-cell--nominal-pressure-increase">
                </td>
                <td class="data__table-cell data__table-cell--dimension"></td>
              </tr>
              <tr class="data__table-row">
                <td class="data__table-cell data__table-cell--parameter">Політропний ККД</td>
                <td class="data__table-cell data__table-cell--marking">η<sub>пол</sub></td>
                <td class="data__table-cell data__table-cell--value data__table-cell--polytropic-efficiency">
                </td>
                <td class="data__table-cell data__table-cell--dimension"></td>
              </tr>
              <tr class="data__table-row">
                <td class="data__table-cell data__table-cell--parameter">Зведена відносна внутрішня потужність</td>
                <td class="data__table-cell data__table-cell--marking">[N<sub>i</sub>/ρ<sub>вх</sub>]<sub>зв</sub>
                </td>
                <td class="data__table-cell data__table-cell--value data__table-cell--relative-internal-power">
                </td>
                <td class="data__table-cell data__table-cell--dimension">кВт/(кг/м<sup>3</sup>)</td>
              </tr>
              <tr class="data__table-row">
                <td class="data__table-cell data__table-cell--parameter">Ступінь підвищення тиску нагнітача</td>
                <td class="data__table-cell data__table-cell--marking">ε</td>
                <td class="data__table-cell data__table-cell--value data__table-cell--pressure-increase">
                </td>
                <td class="data__table-cell data__table-cell--dimension"></td>
              </tr>
              <tr class="data__table-row">
                <td class="data__table-cell data__table-cell--parameter">Абсолютний тиск газу на виході з нагнітача
                </td>
                <td class="data__table-cell data__table-cell--marking">P<sub>вих</sub></td>
                <td class="data__table-cell data__table-cell--value data__table-cell--pressure-outlet">
                </td>
                <td class="data__table-cell data__table-cell--dimension">МПа</td>
              </tr>
              <tr class="data__table-row">
                <td class="data__table-cell data__table-cell--parameter">Внутрішня потужність нагнітача
                </td>
                <td class="data__table-cell data__table-cell--marking">N<sub>i</sub></td>
                <td class="data__table-cell data__table-cell--value data__table-cell--indicator-power">
                </td>
                <td class="data__table-cell data__table-cell--dimension">кВт</td>
              </tr>
              <tr class="data__table-row">
                <td class="data__table-cell data__table-cell--parameter">Ефективна потужність нагнітача
                </td>
                <td class="data__table-cell data__table-cell--marking">N<sub>е</sub></td>
                <td class="data__table-cell data__table-cell--value data__table-cell--effective-power">
                </td>
                <td class="data__table-cell data__table-cell--dimension">кВт</td>
              </tr>
              <tr class="data__table-row">
                <td class="data__table-cell data__table-cell--parameter">Абсолютна температура газу на виході з
                  нагнітача
                </td>
                <td class="data__table-cell data__table-cell--marking">T<sub>вих</sub></td>
                <td class="data__table-cell data__table-cell--value data__table-cell--temperature-outlet">
                </td>
                <td class="data__table-cell data__table-cell--dimension">K</td>
              </tr>
              <tr class="data__table-row data__table-row--full">
                <td colspan="4">Результати витрат газу на власні потреби КС</td>
              </tr>
              <tr class="data__table-row">
                <td class="data__table-cell data__table-cell--parameter">Витрата паливного газу на один ГПА
                </td>
                <td class="data__table-cell data__table-cell--marking">q<sub>пг</sub></td>
                <td class="data__table-cell data__table-cell--value data__table-cell--fuel-consumption">
                </td>
                <td class="data__table-cell data__table-cell--dimension">тис. м<sup>3</sup>/год</td>
              </tr>
              <tr class="data__table-row">
                <td class="data__table-cell data__table-cell--parameter">Сумарна витрата паливного газу по КЦ
                </td>
                <td class="data__table-cell data__table-cell--marking">Q<sub>пг</sub></td>
                <td class="data__table-cell data__table-cell--value data__table-cell--fuel-consumption-full">
                </td>
                <td class="data__table-cell data__table-cell--dimension">млн. м<sup>3</sup>/д</td>
              </tr>
              <tr class="data__table-row">
                <td class="data__table-cell data__table-cell--parameter">Витрата газу на технологічні потреби та
                  технічні втрати КС
                </td>
                <td class="data__table-cell data__table-cell--marking">Q<sub>тп</sub>·10<sup>3</sup></td>
                <td class="data__table-cell data__table-cell--value data__table-cell--tech-consumption-full">
                </td>
                <td class="data__table-cell data__table-cell--dimension">млн. м<sup>3</sup>/д</td>
              </tr>
              <tr class="data__table-row">
                <td class="data__table-cell data__table-cell--parameter">Витрата газу на власні потреби КС
                </td>
                <td class="data__table-cell data__table-cell--marking">Q<sub>вп</sub></td>
                <td class="data__table-cell data__table-cell--value data__table-cell--self-consumption-full">
                </td>
                <td class="data__table-cell data__table-cell--dimension">млн. м<sup>3</sup>/д</td>
              </tr>
              <tr class="data__table-row data__table-row--full">
                <td colspan="4">Результати теплогідравлічного розрахунку прилеглої ділянки газопроводу</td>
              </tr>
              <tr class="data__table-row">
                <td class="data__table-cell data__table-cell--parameter">Продуктивність лінійної ділянки газопроводу
                </td>
                <td class="data__table-cell data__table-cell--marking">Q</td>
                <td class="data__table-cell data__table-cell--value data__table-cell--consumption-full">
                </td>
                <td class="data__table-cell data__table-cell--dimension">млн. м<sup>3</sup>/д</td>
              </tr>
              <tr class="data__table-row">
                <td class="data__table-cell data__table-cell--parameter">Абсолютний тиск газу на початку газопроводу
                </td>
                <td class="data__table-cell data__table-cell--marking">P<sub>п</sub></td>
                <td class="data__table-cell data__table-cell--value data__table-cell--start-pressure">
                </td>
                <td class="data__table-cell data__table-cell--dimension">МПа</td>
              </tr>
              <tr class="data__table-row">
                <td class="data__table-cell data__table-cell--parameter">Абсолютна температура газу на початку
                  газопроводу
                </td>
                <td class="data__table-cell data__table-cell--marking">T<sub>п</sub></td>
                <td class="data__table-cell data__table-cell--value data__table-cell--start-temperature">
                </td>
                <td class="data__table-cell data__table-cell--dimension">K</td>
              </tr>
              <tr class="data__table-row">
                <td class="data__table-cell data__table-cell--parameter">Середній значення тиску газу
                </td>
                <td class="data__table-cell data__table-cell--marking">Р<sub>ср</sub></td>
                <td class="data__table-cell data__table-cell--value data__table-cell--average-pressure">
                </td>
                <td class="data__table-cell data__table-cell--dimension">МПа</td>
              </tr>
              <tr class="data__table-row">
                <td class="data__table-cell data__table-cell--parameter">Середня теплоємність газу
                </td>
                <td class="data__table-cell data__table-cell--marking">C<sub>р</sub></td>
                <td class="data__table-cell data__table-cell--value data__table-cell--average-heat-capacity">
                </td>
                <td class="data__table-cell data__table-cell--dimension">кДж/(кг·К)</td>
              </tr>
              <tr class="data__table-row">
                <td class="data__table-cell data__table-cell--parameter">Середній коефіцієнт Джоуля-Томсона
                </td>
                <td class="data__table-cell data__table-cell--marking">D<sub>j</sub></td>
                <td class="data__table-cell data__table-cell--value data__table-cell--coef-djoel">
                </td>
                <td class="data__table-cell data__table-cell--dimension">К/МПа</td>
              </tr>
              <tr class="data__table-row">
                <td class="data__table-cell data__table-cell--parameter">Параметр Шухова
                </td>
                <td class="data__table-cell data__table-cell--marking">al·10<sup>3</sup></td>
                <td class="data__table-cell data__table-cell--value data__table-cell--shukhov">
                </td>
                <td class="data__table-cell data__table-cell--dimension">км<sup>-1</sup></td>
              </tr>
              <tr class="data__table-row">
                <td class="data__table-cell data__table-cell--parameter">Зведена температура грунту з урахуванням
                  ефекту Джоуля-Томсона
                </td>
                <td class="data__table-cell data__table-cell--marking">Т<sub>зв</sub></td>
                <td class="data__table-cell data__table-cell--value data__table-cell--erected-temperature">
                </td>
                <td class="data__table-cell data__table-cell--dimension">К</td>
              </tr>
              <tr class="data__table-row">
                <td class="data__table-cell data__table-cell--parameter">Середня абсолютна температура газу на
                  ділянці
                </td>
                <td class="data__table-cell data__table-cell--marking">Т<sub>ср</sub></td>
                <td class="data__table-cell data__table-cell--value data__table-cell--average-temperature">
                </td>
                <td class="data__table-cell data__table-cell--dimension">К</td>
              </tr>
              <tr class="data__table-row">
                <td class="data__table-cell data__table-cell--parameter">Середній коефіцієнт стисливості
                </td>
                <td class="data__table-cell data__table-cell--marking">z<sub>ср</sub></td>
                <td class="data__table-cell data__table-cell--value data__table-cell--average-coef-compressibility">
                </td>
                <td class="data__table-cell data__table-cell--dimension"></td>
              </tr>
              <tr class="data__table-row">
                <td class="data__table-cell data__table-cell--parameter">Число Рейнольдса
                </td>
                <td class="data__table-cell data__table-cell--marking">Re·10<sup>-6</sup></td>
                <td class="data__table-cell data__table-cell--value data__table-cell--reynolds">
                </td>
                <td class="data__table-cell data__table-cell--dimension"></td>
              </tr>
              <tr class="data__table-row">
                <td class="data__table-cell data__table-cell--parameter">Коефіцієнт гідравлічного опору
                </td>
                <td class="data__table-cell data__table-cell--marking">λ·10<sup>3</sup></td>
                <td class="data__table-cell data__table-cell--value data__table-cell--hydraulic-resist">
                </td>
                <td class="data__table-cell data__table-cell--dimension"></td>
              </tr>
              <tr class="data__table-row">
                <td class="data__table-cell data__table-cell--parameter">Уточнений абсолютний тиск газу в кінці
                  газопроводу
                </td>
                <td class="data__table-cell data__table-cell--marking">P<sub>ку</sub></td>
                <td class="data__table-cell data__table-cell--value data__table-cell--refined-end-pressure">
                </td>
                <td class="data__table-cell data__table-cell--dimension">МПа</td>
              </tr>
              <tr class="data__table-row">
                <td class="data__table-cell data__table-cell--parameter">Необхідний абсолютний тиск газу в кінці
                  лінійної ділянки
                </td>
                <td class="data__table-cell data__table-cell--marking">Р<sub>кн</sub></td>
                <td class="data__table-cell data__table-cell--value data__table-cell--end-pressure">
                </td>
                <td class="data__table-cell data__table-cell--dimension">МПа</td>
              </tr>
              <tr class="data__table-row">
                <td class="data__table-cell data__table-cell--parameter">Фактичний абсолютний тиск газу в кінці
                  газопроводу
                </td>
                <td class="data__table-cell data__table-cell--marking">P<sub>кф</sub></td>
                <td class="data__table-cell data__table-cell--value data__table-cell--actual-end-pressure">
                </td>
                <td class="data__table-cell data__table-cell--dimension">МПа</td>
              </tr>
              <tr class="data__table-row">
                <td class="data__table-cell data__table-cell--parameter">Абсолютна температура в кінці газопроводу
                </td>
                <td class="data__table-cell data__table-cell--marking">T<sub>к</sub></td>
                <td class="data__table-cell data__table-cell--value data__table-cell--end-temperature">
                </td>
                <td class="data__table-cell data__table-cell--dimension">К</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>`
  );
};

export default class Results extends AbstractView {
  constructor(resultsModel) {
    super();

    this._resultsModel = resultsModel;
  }

  getTemplate() {
    return createResultsTemplate(this._resultsModel.getResults());
  }
}
