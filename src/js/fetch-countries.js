import Notiflix from 'notiflix';
export default class Counries {
  constructor() {
    this.inputName = '';
    this.fullName = 'name';
    this.population = 'population';
    this.capital = 'capital';
    this.flag = 'flags';
    this.language = 'languages';
  }

  fetchCountries() {
    const URL = `https://restcountries.com/v3.1/name/${this.inputName}?fields=${this.fullName},${this.population},${this.capital},${this.flag},${this.language}`;

    return fetch(URL).then(r => {
      if (!r.ok) {
        if (r.status === 404) {
          Notiflix.Notify.failure('Oops, there is no country with that name');
        }
        throw Error;
      }

      return r.json();
    });
  }

  get name() {
    return this.inputName;
  }

  set name(newName) {
    this.inputName = newName;
  }
}
