// Oсновні фізичні властивості природного газу
// Молярна маса природного газу
export const getMolarMass = (ch4, c2h6, c3h8, c4h10, c5h12, n2, co2) => {
  return 0.01 * (16.04 * ch4 + 30.07 * c2h6 + 44.1 * c3h8 + 58.12 * c4h10 + 72.15 * c5h12 + 28.01 * n2 + 44.01 * co2);
};

// Густина природного газу за нормальних умов
export const getNormalDensity = (molarMass) => {
  return molarMass / 22.41;
};

// Відносна густина газу за повітрям
export const getRelativeDensity = (normalDensity) => {
  return normalDensity / 1.293;
};

// Густина природного газу за стандартних фізичних умов
export const getStandartDensity = (relativeDensity) => {
  return 1.205 * relativeDensity;
};

// Газова стала природного газу
export const getGasConst = (relativeDensity) => {
  return 287.1 / relativeDensity;
};

// Псевдокритичний тиск природного газу
export const getPseudoPressure = (ch4, c2h6, c3h8, c4h10, c5h12, n2, co2) => {
  return 0.01 * (4.64 * ch4 + 4.884 * c2h6 + 4.255 * c3h8 + 3.799 * c4h10 + 3.373 * c5h12 + 3.394 * n2 + 7.386 * co2);
};

// Псевдокритичний температура природного газу
export const getPseudoTemperature = (ch4, c2h6, c3h8, c4h10, c5h12, n2, co2) => {
  return 0.01 * (190.66 * ch4 + 305.46 * c2h6 + 369.9 * c3h8 + 425.2 * c4h10 + 469.5 * c5h12 + 126.2 * n2 + 304.26 * co2);
};

// Нижча об’ємна теплота згорання
export const getLowerVolumetricHeat = (ch4, c2h6, c3h8, c4h10, c5h12) => {
  return 0.01 * (35760 * ch4 + 63650 * c2h6 + 91140 * c3h8 + 118530 * c4h10 + 146180 * c5h12);
};

// Розрахунок наявної потужності газотурбінного приводу ГПА компресорної станції
// Температура повітря на вході в ГТУ
export const getAirTemperature = (airTemperature) => {
  return (airTemperature + 273) + 5;
};
// Наявна потужність газоперекачувального агрегату
export const getAvailablePower = (Nen, Kn, Kob, Ky, Kt, Tz, Tzn, Pa) => {
  return Nen * Kn * Kob * Ky * (1 - Kt * (Tz - Tzn) / Tz) * Pa / 0.1013;
};

// Математичні моделі нагнітача
// Коефіцієнт математичної можелі с
export const getMathCoefC = (x1, x2, x3, Q1, Q2) => {
  return (x1 - 2 * x2 + x3) / (2 * Math.pow((Q2 - Q1), 2));
};

// Коефіцієнт математичної можелі b
export const getMathCoefB = (x1, x2, Q1, Q2, coefC) => {
  return (x1 - x2) / (Q1 - Q2) - coefC * (Q1 + Q2);
};

// Коефіцієнт математичної можелі a
export const getMathCoefA = (x1, Q1, coefB, coefC) => {
  return x1 - coefB * Q1 - coefC * Math.pow(Q1, 2);
};

// Середня продуктивність
export const getQ2 = (Q1, Q3) => {
  return 0.5 * (Q1 + Q3);
};

// Математична модель
export const getMathModel = (a, b, c, Qzv) => {
  return a + b * Qzv + c * Math.pow(Qzv, 2);
};

// Режим роботи нагнітача з використанням математичних моделей
// Коефіцієнт стисливості газу
export const getCompressibilityRatio = (P, delta, T) => {
  return 1 - 5.5 * Math.pow(10, 6) * P * Math.pow(delta, 1.3) / Math.pow(T, 3.3);
};

// Густина газу за умов входу в нагнітачі
export const getInletDensity = (P, z, R, T) => {
  return (P * Math.pow(10, 6)) / (z * R * T);
};

// Комерційна продуктивність через один нагнітач
export const getCommercialConsumption = (Q, N) => {
  return Q / N;
};

// Об’ємна витрата газу за умов входу в один нагнітач
export const getVolumetricConsumption = (roSt, Q0, roVx) => {
  return (roSt * Q0) / roVx * Math.pow(10, 6) / 1440;
};

// Зведена витрата газу
export const getErectedConsumption = (Qvx, nNom, n) => {
  return Qvx * nNom / n;
};

// Зведена відносна обертова частота нагнітача
export const getReducedRelativeSpeed = (n, nNom, zZv, Rzv, Tzv, zVx, R, Tvx) => {
  return n / nNom * Math.sqrt((zZv * Rzv * Tzv) / (zVx * R * Tvx));
};

// Фактичний ступінь підвищення тиску нагнітача
export const getActualPressureIncrease = (epsNom, etaPol, reducedRelativeSpeed) => {
  const beta = (1.31 - 1) / (1.31 * etaPol);
  return Math.pow(((Math.pow(epsNom, beta) - 1) * Math.pow(reducedRelativeSpeed, 2) + 1), (1 / beta));
};

// Абсолютний тиск газу на виході
export const getOutletPressure = (eps, Pvx) => {
  return eps * Pvx;
};

// Температура газу на виході нагнітачів
export const getOutletTemperature = (Tvx, eps, etaPol) => {
  return Tvx * Math.pow(eps, (1.31 - 1) / (1.31 * etaPol));
};

// Внутрішня (індикаторна) потужність нагнітача
export const getInternalPower = (reducedRelativeSpeed, roVx, n, nNom) => {
  return reducedRelativeSpeed * roVx * Math.pow((n / nNom), 3);
};

// Потужність, спожита нагнітачем (ефективна потужність)
export const getEffectivePower = (Ni, Kn, etaMech) => {
  return Ni / (Kn * etaMech);
};

// Абсолютний тиск газу на початку лінійної ділянки газопроводу
export const getActualOutletPressure = (Pvux, dPvux, dPox) => {
  return Pvux - dPvux - dPox;
};

// Витрати газу на власні потреби компресорної станції
// Витрата паливного газу на одну газотурбінну установку
export const getFuelConsumption = (qFuelNom, Ne, NeN, Tz, Tzn, Pa, Qnr) => {
  return qFuelNom * (0.75 * Ne / NeN + 0.25 * Math.sqrt(Tz / Tzn) * Pa / 0.1013) * 34500 / Qnr;
};

// Сумарна витрата паливного газу по КЦ
export const getFullFuelConsumption = (N, qFuel) => {
  return 0.024 * N * qFuel;
};

// Витрата газу на технологічні потреби та технічні втрати КС та лінійної ділянки
export const getTechConsumption = (Htp, NeN, Nkc, Pvux, Pp) => {
  return 24 * Math.pow(10, -6) * Htp * NeN * Nkc * Pvux / Pp;
};

// Витрати газу на власні потреби КС
export const getSelfConsumption = (QFuel, Qtech) => {
  return QFuel + Qtech;
};

// Об’ємна продуктивність лінійної ділянки газопроводу
export const getActualConsumption = (Qks, Qself) => {
  return Qks - Qself;
};

// Фактичний абсолютний тиск на початку лінійної ділянки
export const getStartingPressure = (Pvux, dPvux, dPox) => {
  return Pvux - dPvux - dPox;
};

// Теплогідравлічний розрахунок ділянки газопроводу
// Внутрішній діаметр в метрах
export const getInnerDiameter = (Dz, bSt) => {
  return +((Dz - 2 * bSt) * Math.pow(10, -3)).toFixed(3);
};

// Тиск в кінці перегону між КС для рівнинного газопроводу
export const getEndingPressure = (Ppf, Q, la, delta, zcp, Tcp, L, E, d) => {
  return Math.sqrt(Math.pow(Ppf, 2) - (Math.pow(Q, 2) * la * delta * zcp * Tcp * L) / (Math.pow(105.087 * E, 2) * Math.pow(d, 5)));
};

// Середнє значення тиску газу на ділянці газопроводу
export const getAveragePressure = (Pp, Pk) => {
  return 2 / 3 * (Pp + Math.pow(Pk, 2) / (Pp + Pk));
};

// Середнє значення теплоємності газу на ділянці газопроводу
export const getAverageHeatCapicity = (Tcp, Pcp) => {
  return 1.695 + 1.838 * Math.pow(10, -3) * Tcp + 1.93 * Math.pow(10, 6) * (Pcp - 0.1) / Math.pow(Tcp, 3);
};

// Середнє значення коефіцієнта Джоуля-Томсона
export const getDjoelCoef = (Cp, Tcp) => {
  return 1 / Cp * ((0.98 * Math.pow(10, 6)) / Math.pow(Tcp, 2) - 1.5);
};

// Параметр Шухова
export const getShukhovFactor = (K, Dz, Cp, Q, delta) => {
  return (0.225 * K * Dz / 1000) / (Cp * Q * delta);
};

// Зведена температура грунту
export const getErectedTempreture = (Tgr, Dj, Pp, Pk, al, L, Pcp) => {
  return Tgr - (Dj * (Math.pow(Pp, 2) - Math.pow(Pk, 2))) / (2 * al * L * Pcp);
};

// Середнє значення температури газу на ділянці газопроводу
export const getAverageTemperature = (Tp, Tzv, al, L) => {
  return Tzv + (Tp - Tzv) / (al * L) * (1 - Math.exp(-al * L));
};

// Число Рейнольдса в газопроводі
export const getReynoldsFactor = (Q, delta, d) => {
  return 17.75 * (Q * delta) / (d * 12.5 * Math.pow(10, -6));
};

// Коефіцієнт гідравлічного опору в газопроводі
export const getHydraulicResistCoef = (Re, d) => {
  return 0.067 * Math.pow((158 / Re + (2 * 3 * Math.pow(10, -5)) / d), 0.2);
};

// Температура газу у кінці ділянки газопроводу
export const getEndingTemperature = (Tzv, Tp, al, L) => {
  return Tzv + (Tp - Tzv) * Math.exp(-al * L);
};

// Абсолютний тиск газу на вході відцентрових нагнітачів
export const getActualEndingPressure = (Pvx, dPvx) => {
  return Pvx + dPvx;
};
