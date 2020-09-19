'use strict';

(function () {
  // Функція відрисовки результатів в таблицю
  var render = function () {
    var table = document.querySelector('.data__table--results');
    table.querySelector('.data__table-cell--molar-mass').textContent = window.calculate.results.mu;
    table.querySelector('.data__table-cell--density-norm').textContent = window.calculate.results.RoN;
    table.querySelector('.data__table-cell--density-rel').textContent = window.calculate.results.delta;
    table.querySelector('.data__table-cell--density-st').textContent = window.calculate.results.RoSt;
    table.querySelector('.data__table-cell--gas-const').textContent = window.calculate.results.Rgas;
    table.querySelector('.data__table-cell--pseudo-pressure').textContent = window.calculate.results.Pkr;
    table.querySelector('.data__table-cell--pseudo-temperature').textContent = window.calculate.results.Tkr;
    table.querySelector('.data__table-cell--volumetric-heat').textContent = window.calculate.results.Qnr;

    table.querySelector('.data__table-cell--inlet-air-temperature').textContent = window.calculate.results.Tz;
    table.querySelector('.data__table-cell--available-power').textContent = window.calculate.results.NeP;

    table.querySelector('.data__table-cell--coef-c1').textContent = window.calculate.results.epsMathCoefC;
    table.querySelector('.data__table-cell--coef-b1').textContent = window.calculate.results.epsMathCoefB;
    table.querySelector('.data__table-cell--coef-a1').textContent = window.calculate.results.epsMathCoefA;
    table.querySelector('.data__table-cell--coef-c2').textContent = window.calculate.results.etaMathCoefC;
    table.querySelector('.data__table-cell--coef-b2').textContent = window.calculate.results.etaMathCoefB;
    table.querySelector('.data__table-cell--coef-a2').textContent = window.calculate.results.etaMathCoefA;
    table.querySelector('.data__table-cell--coef-c3').textContent = window.calculate.results.nizvMathCoefC;
    table.querySelector('.data__table-cell--coef-b3').textContent = window.calculate.results.nizvMathCoefB;
    table.querySelector('.data__table-cell--coef-a3').textContent = window.calculate.results.nizvMathCoefA;

    table.querySelector('.data__table-cell--inlet-gas-temperature').textContent = window.calculate.results.Tvx;
    table.querySelector('.data__table-cell--coef-compressibility').textContent = window.calculate.results.Zvx;
    table.querySelector('.data__table-cell--inlet-gas-density').textContent = window.calculate.results.RoVx;
    table.querySelector('.data__table-cell--gpu-amount').textContent = window.calculate.results.N;
    table.querySelector('.data__table-cell--single-consumption').textContent = window.calculate.results.Q0;
    table.querySelector('.data__table-cell--volumetric-consumption').textContent = window.calculate.results.Qvx;
    table.querySelector('.data__table-cell--rotational-frequency').textContent = window.calculate.results.nSpeed;
    table.querySelector('.data__table-cell--erected-consumption').textContent = window.calculate.results.Qzv;
    table.querySelector('.data__table-cell--relative-rotational-frequency').textContent = window.calculate.results.nnZv;
    table.querySelector('.data__table-cell--nominal-pressure-increase').textContent = window.calculate.results.epsN;
    table.querySelector('.data__table-cell--polytropic-efficiency').textContent = window.calculate.results.etaPol;
    table.querySelector('.data__table-cell--relative-internal-power').textContent = window.calculate.results.niZvPol;
    table.querySelector('.data__table-cell--pressure-increase').textContent = window.calculate.results.epsF;
    table.querySelector('.data__table-cell--pressure-outlet').textContent = window.calculate.results.Pvux;
    table.querySelector('.data__table-cell--indicator-power').textContent = window.calculate.results.Ni;
    table.querySelector('.data__table-cell--effective-power').textContent = window.calculate.results.Ne;
    table.querySelector('.data__table-cell--temperature-outlet').textContent = window.calculate.results.Tvux;

    table.querySelector('.data__table-cell--fuel-consumption').textContent = window.calculate.results.Qpg;
    table.querySelector('.data__table-cell--fuel-consumption-full').textContent = window.calculate.results.QpgFull;
    table.querySelector('.data__table-cell--tech-consumption-full').textContent = window.calculate.results.Qtp;
    table.querySelector('.data__table-cell--self-consumption-full').textContent = window.calculate.results.Qvp;

    table.querySelector('.data__table-cell--consumption-full').textContent = window.calculate.results.Qf;
    table.querySelector('.data__table-cell--start-pressure').textContent = window.calculate.results.Ppf;
    table.querySelector('.data__table-cell--start-temperature').textContent = window.calculate.results.Tpf;
    table.querySelector('.data__table-cell--end-pressure').textContent = window.calculate.results.PkNeed;
    table.querySelector('.data__table-cell--average-pressure').textContent = window.calculate.results.Pcp;
    table.querySelector('.data__table-cell--average-heat-capacity').textContent = window.calculate.results.Cp;
    table.querySelector('.data__table-cell--coef-djoel').textContent = window.calculate.results.Dj;
    table.querySelector('.data__table-cell--shukhov').textContent = window.calculate.results.al;
    table.querySelector('.data__table-cell--erected-temperature').textContent = window.calculate.results.Tzv;
    table.querySelector('.data__table-cell--average-temperature').textContent = window.calculate.results.Tcp;
    table.querySelector('.data__table-cell--average-coef-compressibility').textContent = window.calculate.results.Zcp;
    table.querySelector('.data__table-cell--reynolds').textContent = window.calculate.results.Re;
    table.querySelector('.data__table-cell--hydraulic-resist').textContent = window.calculate.results.la;
    table.querySelector('.data__table-cell--refined-end-pressure').textContent = window.calculate.results.Pky;
    table.querySelector('.data__table-cell--actual-end-pressure').textContent = window.calculate.results.Pkf;
    table.querySelector('.data__table-cell--end-temperature').textContent = window.calculate.results.Tk;
  };

  // Передаємо функцію у глобальну область видимості
  window.results = {
    render: render
  };
})();
