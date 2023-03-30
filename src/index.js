import './css/styles.css';
import debounce from '/node_modules/lodash.debounce';
import Counries from './js/fetch-countries';
import Notiflix from 'notiflix';
import listOfCounries from './templates/list-of-counries.hbs';
import desiredCounry from './templates/desired-country.hbs';

const searchingField = document.querySelector('#search-box');
const countryListEl = document.querySelector('.country-list');
const desiredCountryEl = document.querySelector('.country-info');
const DEBOUNCE_DELAY = 300;

const countrie = new Counries();
Notiflix.Notify.init({position: "center-top"});

searchingField.addEventListener(
  'input',
  debounce(e => {
    clearingField();

    countrie.name = e.target.value.trim();

    if (countrie.name === '') {
      return;
    }

    countrie
      .fetchCountries()
      .then(searchCountry)
      .catch(error => {
        clearingField();
        error.message;
      });
  }, DEBOUNCE_DELAY)
);

function searchCountry(data) {
  if (data.length > 10) {
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
    return;
  }

  if (data.length <= 10 && data.length >= 2) {
    countryListEl.insertAdjacentHTML('beforeend', listOfCounries(data));
    return;
  }

  desiredCountryEl.insertAdjacentHTML(
    'beforeend',
    desiredCounry({
      ...data[0],
      languages: Object.values(data[0].languages).join(', '),
    })
  );
}

function clearingField() {
  countryListEl.innerHTML = '';
  desiredCountryEl.innerHTML = '';
}
