import * as formulas from './formulas.js';
import {GPU, SUPERCHARGER} from '../const.js';

export const calculate = (data, resultsModel) => {
  // Отримуємо вихідні дані
  let {Q, coefE, Tvx, Tgr} = data;
  coefE /= 100;
  Tvx += 273;
  Tgr += 273;

  const {ch4, c2h6, c3h8, c4h10, c5h12, n2, co2, Dz, bSt, L, Patm, Pvx, Ta, PkNeed, coefK, gpu, supercharger} = data;
  const PARAMS = {};

  // Постійні параметри для ГПА
  if (gpu === `custom` && supercharger === `custom`) {
    Object.assign(PARAMS, {
      GPU: {
        nominalPower: data.nominalPower,
        coefTechState: data.coefTechState,
        coefFreeze: data.coefFreeze,
        coefSpentGas: data.coefSpentGas,
        coefAirImpact: data.coefAirImpact,
        nominalTemperature: data.nominalTemperature,
        nominalFuelConsumption: data.nominalFuelConsumption,
        mechanicalEfficiency: data.mechanicalEfficiency,
      },
      SUPERCHARGER: {
        multi: data.multi,
        eps1: data.eps1,
        eps2: data.eps2,
        eps3: data.eps3,
        eta1: data.eta1,
        eta2: data.eta2,
        eta3: data.eta3,
        nizv1: data.nizv1,
        nizv2: data.nizv2,
        nizv3: data.nizv3,
        Q1: data.Q1,
        Q3: data.Q3,
        qNom: data.qNom,
        pInlet: data.pInlet,
        pOutlet: data.pOutlet,
        epsBoost: data.epsBoost,
        nNominal: data.nNominal,
        Tzv: data.Tzv,
        Rzv: data.Rzv,
        zzv: data.zzv,
        nn: data.nn,
        nnzvmin: data.nnzvmin,
        nnzvmax: data.nnzvmax
      }
    });
  } else {
    Object.assign(PARAMS, {
      GPU: GPU[gpu],
      SUPERCHARGER: SUPERCHARGER[supercharger]
    });
  }

  // Визначаємо молярну масу природного газу
  const mu = formulas.getMolarMass(ch4, c2h6, c3h8, c4h10, c5h12, n2, co2);
  resultsModel.setResults({mu: mu.toFixed(2)});

  // Знаходимо густину природного газу за нормальних умов
  const roNorm = formulas.getNormalDensity(mu);
  resultsModel.setResults({RoN: roNorm.toFixed(4)});

  // Визначаємо відносну густину газу за повітрям
  const delta = formulas.getRelativeDensity(roNorm);
  resultsModel.setResults({delta: delta.toFixed(4)});

  // Визначаємо густину газу за стандартних фізичних умов
  const roSt = formulas.getStandartDensity(delta);
  resultsModel.setResults({RoSt: roSt.toFixed(4)});

  // Визначаємо газову сталу природного газу
  const R = formulas.getGasConst(delta);
  resultsModel.setResults({Rgas: R.toFixed(1)});

  // Знаходимо псевдокритичний тиск природного газу
  const Pkr = formulas.getPseudoPressure(ch4, c2h6, c3h8, c4h10, c5h12, n2, co2);
  resultsModel.setResults({Pkr: Pkr.toFixed(3)});

  // Знаходимо псевдокритичне значення температури природного газу
  const Tkr = formulas.getPseudoTemperature(ch4, c2h6, c3h8, c4h10, c5h12, n2, co2);
  resultsModel.setResults({Tkr: Tkr.toFixed(1)});

  // Обчислюємо нижчу теплоту згорання газу
  const Qnr = formulas.getLowerVolumetricHeat(ch4, c2h6, c3h8, c4h10, c5h12);
  resultsModel.setResults({Qnr: Qnr.toFixed(0)});

  // Визначаємо розрахункову температуру повітря на вході ГТУ
  const Tz = formulas.getAirTemperature(Ta);
  resultsModel.setResults({Tz: Tz.toFixed(1)});

  // Знаходимо наявну потужність газотурбінної установки для привода відцентрових нагнітачів
  let NeP = formulas.getAvailablePower(PARAMS.GPU.nominalPower, PARAMS.GPU.coefTechState, PARAMS.GPU.coefFreeze, PARAMS.GPU.coefSpentGas, PARAMS.GPU.coefAirImpact, Tz, PARAMS.GPU.nominalTemperature, Patm);
  NeP = (NeP > 1.15 * PARAMS.GPU.nominalPower) ? 1.15 * PARAMS.GPU.nominalPower : NeP;
  resultsModel.setResults({NeP: NeP.toFixed(0)});

  // Знаходимо середню зведену продуктивності нагнітача
  const Q2 = formulas.getQ2(PARAMS.SUPERCHARGER.Q1, PARAMS.SUPERCHARGER.Q3);

  // Визначаємо коефіцієнти математичної моделі номінального ступеня підвищення тиску
  const epsMathCoefC = formulas.getMathCoefC(PARAMS.SUPERCHARGER.eps1, PARAMS.SUPERCHARGER.eps2, PARAMS.SUPERCHARGER.eps3, PARAMS.SUPERCHARGER.Q1, Q2);
  resultsModel.setResults({epsMathCoefC: (epsMathCoefC * Math.pow(10, 6)).toFixed(3)});

  const epsMathCoefB = formulas.getMathCoefB(PARAMS.SUPERCHARGER.eps1, PARAMS.SUPERCHARGER.eps2, PARAMS.SUPERCHARGER.Q1, Q2, epsMathCoefC);
  resultsModel.setResults({epsMathCoefB: (epsMathCoefB * Math.pow(10, 3)).toFixed(3)});

  const epsMathCoefA = formulas.getMathCoefA(PARAMS.SUPERCHARGER.eps1, PARAMS.SUPERCHARGER.Q1, epsMathCoefB, epsMathCoefC);
  resultsModel.setResults({epsMathCoefA: epsMathCoefA.toFixed(3)});

  // Визначаємо коефіцієнти математичної моделі політропного коефіцієнта корисної дії
  const etaMathCoefC = formulas.getMathCoefC(PARAMS.SUPERCHARGER.eta1, PARAMS.SUPERCHARGER.eta2, PARAMS.SUPERCHARGER.eta3, PARAMS.SUPERCHARGER.Q1, Q2);
  resultsModel.setResults({etaMathCoefC: (etaMathCoefC * Math.pow(10, 6)).toFixed(3)});

  const etaMathCoefB = formulas.getMathCoefB(PARAMS.SUPERCHARGER.eta1, PARAMS.SUPERCHARGER.eta2, PARAMS.SUPERCHARGER.Q1, Q2, etaMathCoefC);
  resultsModel.setResults({etaMathCoefB: (etaMathCoefB * Math.pow(10, 3)).toFixed(3)});

  const etaMathCoefA = formulas.getMathCoefA(PARAMS.SUPERCHARGER.eta1, PARAMS.SUPERCHARGER.Q1, etaMathCoefB, etaMathCoefC);
  resultsModel.setResults({etaMathCoefA: etaMathCoefA.toFixed(4)});

  // Визначаємо коефіцієнти математичної моделі зведеної відносної внутрішньої потужності нагнітача
  const nizvMathCoefC = formulas.getMathCoefC(PARAMS.SUPERCHARGER.nizv1, PARAMS.SUPERCHARGER.nizv2, PARAMS.SUPERCHARGER.nizv3, PARAMS.SUPERCHARGER.Q1, Q2);
  resultsModel.setResults({nizvMathCoefC: (nizvMathCoefC * Math.pow(10, 4)).toFixed(3)});

  const nizvMathCoefB = formulas.getMathCoefB(PARAMS.SUPERCHARGER.nizv1, PARAMS.SUPERCHARGER.nizv2, PARAMS.SUPERCHARGER.Q1, Q2, nizvMathCoefC);
  resultsModel.setResults({nizvMathCoefB: nizvMathCoefB.toFixed(3)});

  const nizvMathCoefA = formulas.getMathCoefA(PARAMS.SUPERCHARGER.nizv1, PARAMS.SUPERCHARGER.Q1, nizvMathCoefB, nizvMathCoefC);
  resultsModel.setResults({nizvMathCoefA: nizvMathCoefA.toFixed(1)});

  // Температура газу на вході в нагнітачі
  resultsModel.setResults({Tvx: Tvx.toFixed(1)});

  // Визначаємо коефіцієнт стисливості газу за умов входу
  const Zvx = formulas.getCompressibilityRatio(Pvx, delta, Tvx);
  resultsModel.setResults({Zvx: Zvx.toFixed(4)});

  // Обчислюємо густину газу за умов входу в нагнітачі
  const roVx = formulas.getInletDensity(Pvx, Zvx, R, Tvx);
  resultsModel.setResults({RoVx: roVx.toFixed(2)});

  // Задаємо змінну по виконанню умови
  let condition3 = true;
  do {
    // Визначаємо кількість паралельно працюючих нагнітачів
    let N = Q / PARAMS.SUPERCHARGER.qNom;
    N = ((N % 1).toFixed(1) > 0.2) ? Math.ceil(N) : Math.floor(N);
    resultsModel.setResults({N: N.toFixed(0)});

    // Обчислюємо комерційну продуктивність через один відцентровий нагнітач
    const Q0 = formulas.getCommercialConsumption(Q, N);
    resultsModel.setResults({Q0: Q0.toFixed(1)});

    // Визначаємо об’ємну витрату газу за умов входу в один нагнітач
    const Qvx = formulas.getVolumetricConsumption(roSt, Q0, roVx);
    resultsModel.setResults({Qvx: Qvx.toFixed(1)});

    // Приймаємо для першого наближення, що обертова частота нагнітача дорівнює номінальному значенню
    let nSpeed = PARAMS.SUPERCHARGER.nNominal;

    let epsf = 0;
    let etapol = 0;
    let Ne = 0;
    let Pvux = 0;

    // Задаємо змінну по виконанню умови
    let condition1 = true;
    do {
      // Визначаємо зведену витрату газу за умов входу в нагнітачі
      const Qzv = formulas.getErectedConsumption(Qvx, PARAMS.SUPERCHARGER.nNominal, nSpeed);
      resultsModel.setResults({Qzv: Qzv.toFixed(1)});

      // Обчислюємо зведену відносну обертову частоту нагнітача
      const nnzv = formulas.getReducedRelativeSpeed(nSpeed, PARAMS.SUPERCHARGER.nNominal, PARAMS.SUPERCHARGER.zzv, PARAMS.SUPERCHARGER.Rzv, PARAMS.SUPERCHARGER.Tzv, Zvx, R, Tvx);
      resultsModel.setResults({nnZv: nnzv.toFixed(3)});

      // Визначаємо номінальний ступінь підвищення тиску
      const epsn = formulas.getMathModel(epsMathCoefA, epsMathCoefB, epsMathCoefC, Qzv);
      resultsModel.setResults({epsN: epsn.toFixed(3)});

      // Визначаємо політропний ККД
      etapol = formulas.getMathModel(etaMathCoefA, etaMathCoefB, etaMathCoefC, Qzv);
      resultsModel.setResults({etaPol: etapol.toFixed(4)});

      // Визначаємо зведену відносну внутрішню потужність
      const nizvpol = formulas.getMathModel(nizvMathCoefA, nizvMathCoefB, nizvMathCoefC, Qzv);
      resultsModel.setResults({niZvPol: nizvpol.toFixed(1)});

      // Визначаємо фактичний ступінь підвищення тиску нагнітача
      epsf = formulas.getActualPressureIncrease(epsn, etapol, nnzv);
      resultsModel.setResults({epsF: epsf.toFixed(3)});

      // Обчислюємо абсолютний тиск газу на виході з відцентрових нагнітачів
      Pvux = formulas.getOutletPressure(epsf, Pvx);
      resultsModel.setResults({Pvux: Pvux.toFixed(3)});

      // Визначаємо внутрішню (індикаторну) потужність нагнітача
      const Ni = formulas.getInternalPower(nizvpol, roVx, nSpeed, PARAMS.SUPERCHARGER.nNominal);
      resultsModel.setResults({Ni: Ni.toFixed(0)});

      // Ефективна (спожита) потужність нагнітача
      Ne = formulas.getEffectivePower(Ni, PARAMS.GPU.coefTechState, PARAMS.GPU.mechanicalEfficiency);
      resultsModel.setResults({Ne: Ne.toFixed(0)});

      // Перевірка на виконання умов
      if (PARAMS.SUPERCHARGER.Q1 <= Qzv <= PARAMS.SUPERCHARGER.Q3 && PARAMS.SUPERCHARGER.nnzvmin <= nnzv <= PARAMS.SUPERCHARGER.nnzvmax && Pvux <= PARAMS.SUPERCHARGER.pOutlet && Ne <= NeP) {
        condition1 = false;
      } else {
        nSpeed--;
      }
      resultsModel.setResults({nSpeed});
    } while (condition1);

    // Абсолютну температуру газу на виході нагнітачів
    const Tvux = formulas.getOutletTemperature(Tvx, epsf, etapol);
    resultsModel.setResults({Tvux: Tvux.toFixed(1)});

    // Визначаэмо витрату паливного газу на одну газотурбінну установку
    const qpg = formulas.getFuelConsumption(PARAMS.GPU.nominalFuelConsumption, Ne, PARAMS.GPU.nominalPower, Tz, PARAMS.GPU.nominalTemperature, Patm, Qnr);
    resultsModel.setResults({Qpg: qpg.toFixed(3)});

    // Сумарна витрата паливного газу по компресорному цеху
    const qpgFull = formulas.getFullFuelConsumption(N, qpg);
    resultsModel.setResults({QpgFull: qpgFull.toFixed(4)});

    // Кількість ГПА на компресорний цех
    const Nkc = (N > 2) ? N + 2 : N + 1;
    // Середня питома витрата газу на технологічні потреби КС, робочий тиск, втрати тиску в комунікаціях між компресорним цехом і вузлом підключення до лінійної частини газопроводу
    let Pp;
    let Htp;
    let dPvux;
    let dPvx;
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
    const Qtp = formulas.getTechConsumption(Htp, PARAMS.GPU.nominalPower, Nkc, Pvux, Pp);
    resultsModel.setResults({Qtp: (Qtp * Math.pow(10, 3)).toFixed(2)});

    // Витрати газу на технологічні потреби КС
    const Qvp = formulas.getSelfConsumption(qpgFull, Qtp);
    resultsModel.setResults({Qvp: Qvp.toFixed(4)});

    // Визначаємо витрату газу на лінійній ділянці газопроводу
    const Qf = formulas.getActualConsumption(Q, Qvp);
    resultsModel.setResults({Qf: Qf.toFixed(2)});

    // Температура газу на початку лінійної ділянки газопроводу
    const Tp = (Tvux > 313) ? 313 : Tvux;
    resultsModel.setResults({Tpf: Tp.toFixed(1)});
    // Втрати тиску в системі охолодження газу
    const dPox = (Tp === 313) ? 0.06 : 0;

    // Визначаємо абсолютний тиск газу на початку лінійної ділянки газопроводу
    const Ppf = formulas.getStartingPressure(Pvux, dPvux, dPox);
    resultsModel.setResults({Ppf: Ppf.toFixed(3)});

    // Параметри для першого наближення
    const la = 0.009;
    const Tcp = 300;
    const Zcp = 0.9;

    // Визначаємо внутрішній діаметр газопроводу
    const d = formulas.getInnerDiameter(Dz, bSt);

    // Визначаємо абсолютний тиск газу у кінці лінійної ділянки в першому наближенні
    const Pk = formulas.getEndingPressure(Ppf, Qf, la, delta, Zcp, Tcp, L, coefE, d);

    let Pky = 0;
    let Tzv = 0;
    let al = 0;

    // Задаємо змінну по виконанню умови
    let condition2 = true;
    do {
      // Визначаємо середнє значення тиску газу на ділянці газопроводу
      const Pcp = formulas.getAveragePressure(Ppf, Pk);
      resultsModel.setResults({Pcp: Pcp.toFixed(3)});

      // Визначаємо середнє значення теплоємності газу на ділянці газопроводу
      const Cp = formulas.getAverageHeatCapicity(Tcp, Pcp);
      resultsModel.setResults({Cp: Cp.toFixed(3)});

      // Знаходимо середнє значення коефіцієнта Джоуля-Томсона
      const Dj = formulas.getDjoelCoef(Cp, Tcp);
      resultsModel.setResults({Dj: Dj.toFixed(3)});

      // Обчислюємо параметр Шухова
      al = formulas.getShukhovFactor(coefK, Dz, Cp, Qf, delta);
      resultsModel.setResults({al: (al * Math.pow(10, 3)).toFixed(3)});

      // Обчислюємо зведену температуру ґрунту
      Tzv = formulas.getErectedTempreture(Tgr, Dj, Ppf, Pk, al, L, Pcp);
      resultsModel.setResults({Tzv: Tzv.toFixed(1)});

      // Визначаємо середню абсолютну температуру газу на лінійній ділянці газопроводу
      Tcp = formulas.getAverageTemperature(Tp, Tzv, al, L);
      resultsModel.setResults({Tcp: Tcp.toFixed(1)});

      // Обчислюємо середнє значення коефіцієнта стисливості газу
      Zcp = formulas.getCompressibilityRatio(Pcp, delta, Tcp);
      resultsModel.setResults({Zcp: Zcp.toFixed(4)});

      // Знаходимо значення числа Рейнольдса в газопроводі
      const Re = formulas.getReynoldsFactor(Qf, delta, d);
      resultsModel.setResults({Re: (Re * Math.pow(10, -6)).toFixed(2)});

      // Визначаємо коефіцієнт гідравлічного опору газопроводу
      la = formulas.getHydraulicResistCoef(Re, d);
      resultsModel.setResults({la: (la * Math.pow(10, 3)).toFixed(3)});

      // Уточнений тиск в кінці перегону між КС для рівнинного газопроводу
      Pky = formulas.getEndingPressure(Ppf, Qf, la, delta, Zcp, Tcp, L, coefE, d);

      // Перевірка на виконання умов
      if (Math.abs(Pk - Pky) > 0.005) {
        Pk = Pky;
      } else {
        condition2 = false;
      }
      resultsModel.setResults({Pky: Pky.toFixed(3)});
    } while (condition2);

    // Визначаємо фактичний абсолютний тиск газу на вході відцентрових нагнітачів
    const Pkf = formulas.getActualEndingPressure(Pky, dPvx);
    resultsModel.setResults({Pkf: Pkf.toFixed(3)});
    resultsModel.setResults({PkNeed: PkNeed.toFixed(3)});

    // Визначаємо температуру газу у кінці ділянки газопроводу
    const Tk = formulas.getEndingTemperature(Tzv, Tp, al, L);
    resultsModel.setResults({Tk: Tk.toFixed(1)});

    // Перевірка на виконання умов
    if (Math.abs(Pky - PkNeed) > 0.005) {
      Q = (Pky > PkNeed) ? Q + 0.01 : Q - 0.01;
    } else {
      condition3 = false;
      resultsModel.setResults({Qq: Q.toFixed(2)});
    }
  } while (condition3);
};
