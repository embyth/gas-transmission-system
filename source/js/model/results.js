export default class ResultsData {
  constructor() {
    this._results = {};
  }

  setResults(results) {
    this._results = Object.assign(this._results, results);
  }

  getResults() {
    return this._results;
  }
}
