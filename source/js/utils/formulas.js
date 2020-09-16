'use strict';

(function () {
  window.formulas = {
    // Oсновні фізичні властивості природного газу

    // Молярна маса природного газу
    getMolarMass: function (ch4, c2h6, c3h8, c4h10, c5h12, n2, co2) {
      return 0.01 * (16.04 * ch4 + 30.07 * c2h6 + 44.1 * c3h8 + 58.12 * c4h10 + 72.15 * c5h12 + 28.01 * n2 + 44.01 * co2);
    },
    // Густина природного газу за нормальних умов
    getNormalDensity: function (molarMass) {
      return molarMass / 22.41;
    },
    // Відносна густина газу за повітрям
    getRelativeDensity: function (normalDensity) {
      return normalDensity / 1.293;
    },
    // Густина природного газу за стандартних фізичних умов
    getStandartDensity: function (relativeDensity) {
      return 1.205 * relativeDensity;
    },
    // Газова стала природного газу
    getGasConst: function (relativeDensity) {
      return 287.1 / relativeDensity;
    },
    // Псевдокритичний тиск природного газу
    getPseudoPressure: function (ch4, c2h6, c3h8, c4h10, c5h12, n2, co2) {
      return 0.01 * (4.64 * ch4 + 4.884 * c2h6 + 4.255 * c3h8 + 3.799 * c4h10 + 3.373 * c5h12 + 3.394 * n2 + 7.386 * co2);
    },
    // Псевдокритичний температура природного газу
    getPseudoTemperature: function (ch4, c2h6, c3h8, c4h10, c5h12, n2, co2) {
      return 0.01 * (190.66 * ch4 + 305.46 * c2h6 + 369.9 * c3h8 + 425.2 * c4h10 + 469.5 * c5h12 + 126.2 * n2 + 304.26 * co2);
    },
    // Нижча об’ємна теплота згорання
    getLowerVolumetricHeat: function (ch4, c2h6, c3h8, c4h10, c5h12) {
      return 0.01 * (35760 * ch4 + 63650 * c2h6 + 91140 * c3h8 + 118530 * c4h10 + 146180 * c5h12);
    },

    // Розрахунок наявної потужності газотурбінного приводу ГПА компресорної станції

    // Температура повітря на вході в ГТУ
    getAirTemperature: function (airTemperature) {
      return (airTemperature + 273) + 5;
    },
    // Наявна потужність газоперекачувального агрегату
    getAvailablePower: function (Nen, Kn, Kob, Ky, Kt, Tz, Tzn, Pa) {
      return Nen * Kn * Kob * Ky * (1 - Kt * (Tz - Tzn) / Tz) * Pa / 0.1013;
    },

    // Математичні моделі нагнітача

    // Коефіцієнт математичної можелі с
    getMathCoefC: function (eps1, eps2, eps3, Q1, Q2) {
      return (eps1 - 2 * eps2 + eps3) / 2 * (Q2 - Q1);
    },
    // Коефіцієнт математичної можелі b
    getMathCoefB: function (eps1, eps2, Q1, Q2, coefC) {
      return (eps1 - eps2) / (Q1 - Q2) - coefC * (Q1 - Q2);
    },
    // Коефіцієнт математичної можелі a
    getMathCoefA: function (eps1, Q1, coefB, coefC) {
      return eps1 - coefB * Q1 - coefC * Math.pow(Q1, 2);
    },
    // Середня продуктивність
    getQ2: function (Q1, Q3) {
      return 0.5 * (Q1 + Q3);
    },
    // Математична модель
    getMathModel: function (a, b, c, Qzv) {
      return a + b * Qzv + c * Math.pow(Qzv, 2);
    },

    // Режим роботи нагнітача з використанням математичних моделей

    // Коефіцієнт стисливості газу
    getCompressibilityRatio: function (P, delta, T) {
      return 1 - 5.5 * Math.pow(10, 6) * P * Math.pow(delta, 1.3) / Math.pow(T, 3.3);
    },
    // Густина газу за умов входу в нагнітачі
    getInletDensity: function (P, z, R, T) {
      return (P * Math.pow(10, 6)) / (z * R * T);
    },
    // Комерційна продуктивність через один нагнітач
    getCommercialConsumption: function (Q, N) {
      return Q / N;
    },
    // Об’ємна витрата газу за умов входу в один нагнітач
    getVolumetricConsumption: function (roSt, Q0, roVx) {
      return (roSt * Q0) / roVx * Math.pow(10, 6) / 1440;
    },
    // Зведена витрата газу
    getErectedConsumption: function (Qvx, nNom, n) {
      return Qvx * nNom / n;
    },
    // Зведена відносна обертова частота нагнітача
    getReducedRelativeSpeed: function (n, nNom, zZv, Rzv, Tzv, zVx, R, Tvx) {
      return n / nNom * Math.sqrt((zZv * Rzv * Tzv) / (zVx * R * Tvx));
    },
    // Фактичний ступінь підвищення тиску нагнітача
    getActualPressureIncrease: function (epsNom, etaPol, reducedRelativeSpeed) {
      return Math.pow((Math.pow(epsNom, (1.31 - 1) / (1.31 * etaPol)) - 1) * Math.pow(reducedRelativeSpeed, 2) + 1), (1.31 * etaPol) / (1.31 - 1);
    },
    // Абсолютний тиск газу на виході
    getOutletPressure: function (eps, Pvx) {
      return eps * Pvx;
    },
    // Температура газу на виході нагнітачів
    getOutletTemperature: function (Tvx, eps, etaPol) {
      return Tvx * Math.pow(eps, (1.31 - 1) / (1.31 * etaPol));
    },
    // Внутрішня (індикаторна) потужність нагнітача
    getInternalPower: function (reducedRelativeSpeed, roVx, n, nNom) {
      return reducedRelativeSpeed * roVx * Math.pow((n / nNom), 3);
    },
    // Потужність, спожита нагнітачем (ефективна потужність)
    getEffectivePower: function (Ni, Kn, etaMech) {
      return Ni / (Kn * etaMech);
    },
    // Абсолютний тиск газу на початку лінійної ділянки газопроводу
    getActualOutletPressure: function (Pvux, dPvux, dPox) {
      return Pvux - dPvux - dPox;
    },

    // Витрати газу на власні потреби компресорної станції

    // Витрата паливного газу на одну газотурбінну установку
    getFuelConsumption: function (qFuelNom, Ne, NeN, Tz, Tzn, Pa, Qnr) {
      return qFuelNom * (0.75 * Ne / NeN + 0.25 * Math.sqrt(Tz / Tzn) * Pa / 0.1013) * 34500 / Qnr;
    },
    // Сумарна витрата паливного газу по КЦ
    getFullFuelConsumption: function (N, qFuel) {
      return 0.024 * N * qFuel;
    },
    // Витрата газу на технологічні потреби та технічні втрати КС та лінійної ділянки
    getTechConsumption: function (Htp, NeN, Nkc, Pvux, Pp) {
      return 24 * Math.pow(10, -6) * Htp * NeN * Nkc * Pvux / Pp;
    },
    // Витрати газу на власні потреби КС
    getSelfConsumption: function (QFuel, Qtech) {
      return QFuel + Qtech;
    },
    // Об’ємна продуктивність лінійної ділянки газопроводу
    getActualConsumption: function (Qks, Qself) {
      return Qks - Qself;
    },

    // Теплогідравлічний розрахунок ділянки газопроводу

    // Тиск в кінці перегону між КС для рівнинного газопроводу
    getEndingPressure: function (Ppf, Q, la, delta, zcp, Tcp, L, E, Dz, bSt) {
      return Math.sqrt(Math.pow(Ppf, 2) - (Math.pow(Q, 2) * la * delta * zcp * Tcp * L) / (Math.pow(105.087 * E, 2) * Math.pow(Dz - 2 * bSt, 5)));
    },
    // Середнє значення тиску газу на ділянці газопроводу
    getAveragePressure: function (Pp, Pk) {
      return 2 / 3 * (Pp + Math.pow(Pk, 2) / (Pp + Pk));
    },
    // Середнє значення теплоємності газу на ділянці газопроводу
    getAverageHeatCapicity: function (Tcp, Pcp) {
      return 1.695 + 1.838 * Math.pow(10, -3) * Tcp + 1.93 * Math.pow(10, 6) * (Pcp - 0.1) / Math.pow(Tcp, 3);
    },
    // Середнє значення коефіцієнта Джоуля-Томсона
    getDjoelCoef: function (Cp, Tcp) {
      return 1 / Cp * ((0.98 * Math.pow(10, 6)) / Math.pow(Tcp, 2) - 1.5);
    },
    // Параметр Шухова
    getShukhovFactor: function (K, Dz, Cp, Q, delta) {
      return (0.225 * K * Dz) / (Cp * Q * delta);
    },
    // Зведена температура грунту
    getErectedTempreture: function (Tgr, Dj, Pp, Pk, al, L, Pcp) {
      return Tgr - (Dj * (Math.pow(Pp, 2) - Math.pow(Pk, 2))) / (2 * al * L * Pcp);
    },
    // Середнє значення температури газу на ділянці газопроводу
    getAverageTemperature: function (Tgr, Tp, Tzv, al, L) {
      return Tgr + (Tp - Tzv) / (al * L) * (1 - Math.exp(-al * L));
    },
    // Число Рейнольдса в газопроводі
    getReynoldsFactor: function (Q, delta, d) {
      return 17.75 * (Q * delta) / (d * 12.5 * Math.pow(10, -6));
    },
    // Коефіцієнт гідравлічного опору в газопроводі
    getHydraulicResistCoef: function (Re, ke, d) {
      return 0.067 * Math.pow((158 / Re + (2 * ke) / d), 0.2);
    },
    // Температура газу у кінці ділянки газопроводу
    getEndingTemperature: function (Tzv, Tp, al, L) {
      return Tzv + (Tp - Tzv) * Math.exp(-al * L);
    },
    // Абсолютний тиск газу на вході відцентрових нагнітачів
    getActualEndingPressure: function (Pvx, dPvx) {
      return Pvx + dPvx;
    }
  };
})();