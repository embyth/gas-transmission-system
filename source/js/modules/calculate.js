'use strict';

(function () {
  // Функція активації розрахунку
  var activate = function () {
    // Отримуємо вихідні дані з інпутів
    var incomeDataNode = document.querySelector('#income-data');
    var ch4 = +incomeDataNode.querySelector('.data__input--methane').value;
    var c2h6 = +incomeDataNode.querySelector('.data__input--ethane').value;
    var c3h8 = +incomeDataNode.querySelector('.data__input--propane').value;
    var c4h10 = +incomeDataNode.querySelector('.data__input--butane').value;
    var c5h12 = +incomeDataNode.querySelector('.data__input--pentane').value;
    var n2 = +incomeDataNode.querySelector('.data__input--nitrogen').value;
    var co2 = +incomeDataNode.querySelector('.data__input--carbon-dioxide').value;
    var Dz = +incomeDataNode.querySelector('.data__input--diameter').value;
    var bSt = +incomeDataNode.querySelector('.data__input--wall').value;
    var L = +incomeDataNode.querySelector('.data__input--length').value;
    var Q = +incomeDataNode.querySelector('.data__input--consumption').value;
    var coefE = +incomeDataNode.querySelector('.data__input--hydraulic-coef').value / 100;
    var Patm = +incomeDataNode.querySelector('.data__input--pressure-atm').value;
    var Pvx = +incomeDataNode.querySelector('.data__input--pressure-inlet').value;
    var Tvx = +incomeDataNode.querySelector('.data__input--temperature-inlet').value + 273;
    var Tgr = +incomeDataNode.querySelector('.data__input--temperature-ground').value + 273;
    var Ta = +incomeDataNode.querySelector('.data__input--temperature-air').value;
    var PkNeed = +incomeDataNode.querySelector('.data__input--pressure-end').value;
    var coefK = +incomeDataNode.querySelector('.data__input--heat-coef').value;
    var gpu = incomeDataNode.querySelector('.data__input--gpu').value;
    var supercharger = incomeDataNode.querySelector('.data__input--superchargers').value;

    // Ініціюємо об'єкт для результатів
    window.calculate.results = {};

    // Постійні параметри для ГПА
    var PARAMS = {
      GPU: window.tech.CONSTANTS.GPU[gpu],
      SUPERCHARGER: window.tech.CONSTANTS.SUPERCHARGER[supercharger]
    };

    // Визначаємо молярну масу природного газу
    var mu = window.formulas.getMolarMass(ch4, c2h6, c3h8, c4h10, c5h12, n2, co2);
    window.calculate.results.mu = mu.toFixed(2);

    // Знаходимо густину природного газу за нормальних умов
    var roNorm = window.formulas.getNormalDensity(mu);
    window.calculate.results.RoN = roNorm.toFixed(4);

    // Визначаємо відносну густину газу за повітрям
    var delta = window.formulas.getRelativeDensity(roNorm);
    window.calculate.results.delta = delta.toFixed(4);

    // Визначаємо густину газу за стандартних фізичних умов
    var roSt = window.formulas.getStandartDensity(delta);
    window.calculate.results.RoSt = roSt.toFixed(4);

    // Визначаємо газову сталу природного газу
    var R = window.formulas.getGasConst(delta);
    window.calculate.results.Rgas = R.toFixed(1);

    // Знаходимо псевдокритичний тиск природного газу
    var Pkr = window.formulas.getPseudoPressure(ch4, c2h6, c3h8, c4h10, c5h12, n2, co2);
    window.calculate.results.Pkr = Pkr.toFixed(3);

    // Знаходимо псевдокритичне значення температури природного газу
    var Tkr = window.formulas.getPseudoTemperature(ch4, c2h6, c3h8, c4h10, c5h12, n2, co2);
    window.calculate.results.Tkr = Tkr.toFixed(1);

    // Обчислюємо нижчу теплоту згорання газу
    var Qnr = window.formulas.getLowerVolumetricHeat(ch4, c2h6, c3h8, c4h10, c5h12);
    window.calculate.results.Qnr = Qnr.toFixed(0);

    // Визначаємо розрахункову температуру повітря на вході ГТУ
    var Tz = window.formulas.getAirTemperature(Ta);
    window.calculate.results.Tz = Tz.toFixed(1);

    // Знаходимо наявну потужність газотурбінної установки для привода відцентрових нагнітачів
    var NeP = window.formulas.getAvailablePower(PARAMS.GPU.nominalPower, PARAMS.GPU.coefTechState, PARAMS.GPU.coefFreeze, PARAMS.GPU.coefSpentGas, PARAMS.GPU.coefAirImpact, Tz, PARAMS.GPU.nominalTemperature, Patm);
    NeP = (NeP > 1.15 * PARAMS.GPU.nominalPower) ? 1.15 * PARAMS.GPU.nominalPower : NeP;
    window.calculate.results.NeP = NeP.toFixed(0);

    // Знаходимо середню зведену продуктивності нагнітача
    var Q2 = window.formulas.getQ2(PARAMS.SUPERCHARGER.Q1, PARAMS.SUPERCHARGER.Q3);

    // Визначаємо коефіцієнти математичної моделі номінального ступеня підвищення тиску
    var epsMathCoefC = window.formulas.getMathCoefC(PARAMS.SUPERCHARGER.eps1, PARAMS.SUPERCHARGER.eps2, PARAMS.SUPERCHARGER.eps3, PARAMS.SUPERCHARGER.Q1, Q2);
    window.calculate.results.epsMathCoefC = (epsMathCoefC * Math.pow(10, 6)).toFixed(3);

    var epsMathCoefB = window.formulas.getMathCoefB(PARAMS.SUPERCHARGER.eps1, PARAMS.SUPERCHARGER.eps2, PARAMS.SUPERCHARGER.Q1, Q2, epsMathCoefC);
    window.calculate.results.epsMathCoefB = (epsMathCoefB * Math.pow(10, 3)).toFixed(3);

    var epsMathCoefA = window.formulas.getMathCoefA(PARAMS.SUPERCHARGER.eps1, PARAMS.SUPERCHARGER.Q1, epsMathCoefB, epsMathCoefC);
    window.calculate.results.epsMathCoefA = epsMathCoefA.toFixed(3);

    // Визначаємо коефіцієнти математичної моделі політропного коефіцієнта корисної дії
    var etaMathCoefC = window.formulas.getMathCoefC(PARAMS.SUPERCHARGER.eta1, PARAMS.SUPERCHARGER.eta2, PARAMS.SUPERCHARGER.eta3, PARAMS.SUPERCHARGER.Q1, Q2);
    window.calculate.results.etaMathCoefC = (etaMathCoefC * Math.pow(10, 6)).toFixed(3);

    var etaMathCoefB = window.formulas.getMathCoefB(PARAMS.SUPERCHARGER.eta1, PARAMS.SUPERCHARGER.eta2, PARAMS.SUPERCHARGER.Q1, Q2, etaMathCoefC);
    window.calculate.results.etaMathCoefB = (etaMathCoefB * Math.pow(10, 3)).toFixed(3);

    var etaMathCoefA = window.formulas.getMathCoefA(PARAMS.SUPERCHARGER.eta1, PARAMS.SUPERCHARGER.Q1, etaMathCoefB, etaMathCoefC);
    window.calculate.results.etaMathCoefA = etaMathCoefA.toFixed(4);

    // Визначаємо коефіцієнти математичної моделі зведеної відносної внутрішньої потужності нагнітача
    var nizvMathCoefC = window.formulas.getMathCoefC(PARAMS.SUPERCHARGER.nizv1, PARAMS.SUPERCHARGER.nizv2, PARAMS.SUPERCHARGER.nizv3, PARAMS.SUPERCHARGER.Q1, Q2);
    window.calculate.results.nizvMathCoefC = (nizvMathCoefC * Math.pow(10, 4)).toFixed(3);

    var nizvMathCoefB = window.formulas.getMathCoefB(PARAMS.SUPERCHARGER.nizv1, PARAMS.SUPERCHARGER.nizv2, PARAMS.SUPERCHARGER.Q1, Q2, nizvMathCoefC);
    window.calculate.results.nizvMathCoefB = nizvMathCoefB.toFixed(3);

    var nizvMathCoefA = window.formulas.getMathCoefA(PARAMS.SUPERCHARGER.nizv1, PARAMS.SUPERCHARGER.Q1, nizvMathCoefB, nizvMathCoefC);
    window.calculate.results.nizvMathCoefA = nizvMathCoefA.toFixed(1);

    // Температура газу на вході в нагнітачі
    window.calculate.results.Tvx = Tvx.toFixed(1);

    // Визначаємо коефіцієнт стисливості газу за умов входу
    var Zvx = window.formulas.getCompressibilityRatio(Pvx, delta, Tvx);
    window.calculate.results.Zvx = Zvx.toFixed(4);

    // Обчислюємо густину газу за умов входу в нагнітачі
    var roVx = window.formulas.getInletDensity(Pvx, Zvx, R, Tvx);
    window.calculate.results.RoVx = roVx.toFixed(2);

    // Задаємо змінну по виконанню умови
    var condition3 = true;
    do {
      // Визначаємо кількість паралельно працюючих нагнітачів
      var N = Q / PARAMS.SUPERCHARGER.qNom;
      N = ((N % 1).toFixed(1) > 0.2) ? Math.ceil(N) : Math.floor(N);
      window.calculate.results.N = N.toFixed(0);

      // Обчислюємо комерційну продуктивність через один відцентровий нагнітач
      var Q0 = window.formulas.getCommercialConsumption(Q, N);
      window.calculate.results.Q0 = Q0.toFixed(1);

      // Визначаємо об’ємну витрату газу за умов входу в один нагнітач
      var Qvx = window.formulas.getVolumetricConsumption(roSt, Q0, roVx);
      window.calculate.results.Qvx = Qvx.toFixed(1);

      // Приймаємо для першого наближення, що обертова частота нагнітача дорівнює номінальному значенню
      var nSpeed = PARAMS.SUPERCHARGER.nNominal;

      // Задаємо змінну по виконанню умови
      var condition1 = true;
      do {
        // Визначаємо зведену витрату газу за умов входу в нагнітачі
        var Qzv = window.formulas.getErectedConsumption(Qvx, PARAMS.SUPERCHARGER.nNominal, nSpeed);
        window.calculate.results.Qzv = Qzv.toFixed(1);

        // Обчислюємо зведену відносну обертову частоту нагнітача
        var nnzv = window.formulas.getReducedRelativeSpeed(nSpeed, PARAMS.SUPERCHARGER.nNominal, PARAMS.SUPERCHARGER.zzv, PARAMS.SUPERCHARGER.Rzv, PARAMS.SUPERCHARGER.Tzv, Zvx, R, Tvx);
        window.calculate.results.nnZv = nnzv.toFixed(3);

        // Визначаємо номінальний ступінь підвищення тиску
        var epsn = window.formulas.getMathModel(epsMathCoefA, epsMathCoefB, epsMathCoefC, Qzv);
        window.calculate.results.epsN = epsn.toFixed(3);

        // Визначаємо політропний ККД
        var etapol = window.formulas.getMathModel(etaMathCoefA, etaMathCoefB, etaMathCoefC, Qzv);
        window.calculate.results.etaPol = etapol.toFixed(4);

        // Визначаємо зведену відносну внутрішню потужність
        var nizvpol = window.formulas.getMathModel(nizvMathCoefA, nizvMathCoefB, nizvMathCoefC, Qzv);
        window.calculate.results.niZvPol = nizvpol.toFixed(1);

        // Визначаємо фактичний ступінь підвищення тиску нагнітача
        var epsf = window.formulas.getActualPressureIncrease(epsn, etapol, nnzv);
        window.calculate.results.epsF = epsf.toFixed(3);

        // Обчислюємо абсолютний тиск газу на виході з відцентрових нагнітачів
        var Pvux = window.formulas.getOutletPressure(epsf, Pvx);
        window.calculate.results.Pvux = Pvux.toFixed(3);

        // Визначаємо внутрішню (індикаторну) потужність нагнітача
        var Ni = window.formulas.getInternalPower(nizvpol, roVx, nSpeed, PARAMS.SUPERCHARGER.nNominal);
        window.calculate.results.Ni = Ni.toFixed(0);

        // Ефективна (спожита) потужність нагнітача
        var Ne = window.formulas.getEffectivePower(Ni, PARAMS.GPU.coefTechState, PARAMS.GPU.mechanicalEfficiency);
        window.calculate.results.Ne = Ne.toFixed(0);

        // Перевірка на виконання умов
        if (PARAMS.SUPERCHARGER.Q1 <= Qzv <= PARAMS.SUPERCHARGER.Q3 && PARAMS.SUPERCHARGER.nnzvmin <= nnzv <= PARAMS.SUPERCHARGER.nnzvmax && Pvux <= PARAMS.SUPERCHARGER.pOutlet && Ne <= NeP) {
          condition1 = false;
        } else {
          nSpeed--;
        }
        window.calculate.results.nSpeed = nSpeed;
      } while (condition1);

      // Абсолютну температуру газу на виході нагнітачів
      var Tvux = window.formulas.getOutletTemperature(Tvx, epsf, etapol);
      window.calculate.results.Tvux = Tvux.toFixed(1);

      // Визначаэмо витрату паливного газу на одну газотурбінну установку
      var qpg = window.formulas.getFuelConsumption(PARAMS.GPU.nominalFuelConsumption, Ne, PARAMS.GPU.nominalPower, Tz, PARAMS.GPU.nominalTemperature, Patm, Qnr);
      window.calculate.results.Qpg = qpg.toFixed(3);

      // Сумарна витрата паливного газу по компресорному цеху
      var qpgFull = window.formulas.getFullFuelConsumption(N, qpg);
      window.calculate.results.QpgFull = qpgFull.toFixed(4);

      // Кількість ГПА на компресорний цех
      var Nkc = (N > 2) ? N + 2 : N + 1;
      // Середня питома витрата газу на технологічні потреби КС, робочий тиск, втрати тиску в комунікаціях між компресорним цехом і вузлом підключення до лінійної частини газопроводу
      var Pp, Htp, dPvux, dPvx;
      if (Pvux > 5.5) {
        // Для робочого тиску 7.5
        Pp = 7.5;
        Htp = 0.02;
        dPvux = 0.11;
        dPvx = 0.12;
      } else {
        // Для робочого тиску 5.5
        Pp = 5.5;
        Htp = 0.015;
        dPvux = 0.07;
        dPvx = 0.08;
      }

      // Визначаємо витрату газу на технологічні потреби та технічні втрати КС
      var Qtp = window.formulas.getTechConsumption(Htp, PARAMS.GPU.nominalPower, Nkc, Pvux, Pp);
      window.calculate.results.Qtp = (Qtp * Math.pow(10, 3)).toFixed(2);

      // Витрати газу на технологічні потреби КС
      var Qvp = window.formulas.getSelfConsumption(qpgFull, Qtp);
      window.calculate.results.Qvp = Qvp.toFixed(4);

      // Визначаємо витрату газу на лінійній ділянці газопроводу
      var Qf = window.formulas.getActualConsumption(Q, Qvp);
      window.calculate.results.Qf = Qf.toFixed(2);

      // Температура газу на початку лінійної ділянки газопроводу
      var Tp = (Tvux > 313) ? 313 : Tvux;
      window.calculate.results.Tpf = Tp.toFixed(1);
      // Втрати тиску в системі охолодження газу
      var dPox = (Tp === 313) ? 0.06 : 0;

      // Визначаємо абсолютний тиск газу на початку лінійної ділянки газопроводу
      var Ppf = window.formulas.getStartingPressure(Pvux, dPvux, dPox);
      window.calculate.results.Ppf = Ppf.toFixed(3);

      // Параметри для першого наближення
      var la = 0.009;
      var Tcp = 300;
      var Zcp = 0.9;

      // Визначаємо внутрішній діаметр газопроводу
      var d = window.formulas.getInnerDiameter(Dz, bSt);

      // Визначаємо абсолютний тиск газу у кінці лінійної ділянки в першому наближенні
      var Pk = window.formulas.getEndingPressure(Ppf, Qf, la, delta, Zcp, Tcp, L, coefE, d);

      // Задаємо змінну по виконанню умови
      var condition2 = true;
      do {
        // Визначаємо середнє значення тиску газу на ділянці газопроводу
        var Pcp = window.formulas.getAveragePressure(Ppf, Pk);
        window.calculate.results.Pcp = Pcp.toFixed(3);

        // Визначаємо середнє значення теплоємності газу на ділянці газопроводу
        var Cp = window.formulas.getAverageHeatCapicity(Tcp, Pcp);
        window.calculate.results.Cp = Cp.toFixed(3);

        // Знаходимо середнє значення коефіцієнта Джоуля-Томсона
        var Dj = window.formulas.getDjoelCoef(Cp, Tcp);
        window.calculate.results.Dj = Dj.toFixed(3);

        // Обчислюємо параметр Шухова
        var al = window.formulas.getShukhovFactor(coefK, Dz, Cp, Qf, delta);
        window.calculate.results.al = (al * Math.pow(10, 3)).toFixed(3);

        // Обчислюємо зведену температуру ґрунту
        var Tzv = window.formulas.getErectedTempreture(Tgr, Dj, Ppf, Pk, al, L, Pcp);
        window.calculate.results.Tzv = Tzv.toFixed(1);

        // Визначаємо середню абсолютну температуру газу на лінійній ділянці газопроводу
        Tcp = window.formulas.getAverageTemperature(Tp, Tzv, al, L);
        window.calculate.results.Tcp = Tcp.toFixed(1);

        // Обчислюємо середнє значення коефіцієнта стисливості газу
        Zcp = window.formulas.getCompressibilityRatio(Pcp, delta, Tcp);
        window.calculate.results.Zcp = Zcp.toFixed(4);

        // Знаходимо значення числа Рейнольдса в газопроводі
        var Re = window.formulas.getReynoldsFactor(Qf, delta, d);
        window.calculate.results.Re = (Re * Math.pow(10, -6)).toFixed(2);

        // Визначаємо коефіцієнт гідравлічного опору газопроводу
        la = window.formulas.getHydraulicResistCoef(Re, d);
        window.calculate.results.la = (la * Math.pow(10, 3)).toFixed(3);

        // Уточнений тиск в кінці перегону між КС для рівнинного газопроводу
        var Pky = window.formulas.getEndingPressure(Ppf, Qf, la, delta, Zcp, Tcp, L, coefE, d);

        // Перевірка на виконання умов
        if (Math.abs(Pk - Pky) > 0.005) {
          Pk = Pky;
        } else {
          condition2 = false;
        }
        window.calculate.results.Pky = Pky.toFixed(3);
      } while (condition2);

      // Визначаємо фактичний абсолютний тиск газу на вході відцентрових нагнітачів
      var Pkf = window.formulas.getActualEndingPressure(Pky, dPvx);
      window.calculate.results.Pkf = Pkf.toFixed(3);
      window.calculate.results.PkNeed = PkNeed.toFixed(3);

      // Визначаємо температуру газу у кінці ділянки газопроводу
      var Tk = window.formulas.getEndingTemperature(Tzv, Tp, al, L);
      window.calculate.results.Tk = Tk.toFixed(1);

      // Перевірка на виконання умов
      if (Math.abs(Pky - PkNeed) > 0.005) {
        Q = (Pky > PkNeed) ? Q + 0.01 : Q - 0.01;
      } else {
        condition3 = false;
        window.calculate.results.Qq = Q.toFixed(2);
      }
    } while (condition3);
  };

  // Передаємо функцію у глобальну область видимості
  window.calculate = {
    activate: activate
  };
})();
