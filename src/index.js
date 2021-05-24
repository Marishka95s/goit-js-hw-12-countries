var debounce = require('lodash.debounce');
import fetchCountries from './fetchCountries.js';
import countryItemTpl from './country.hbs';
import countriesListTpl from './country-list.hbs';

// import pontyfy styles and js
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/mobile/dist/PNotifyMobile.css';
import {error} from '@pnotify/core/dist/PNotify.js';

import './styles.css';

const resultsContainer = document.querySelector('.results-section');
const input = document.querySelector('.country-finder-input');

input.addEventListener('input', debounce(onInputChange, 500));

function onInputChange(){
    let searchQuery = input.value;
    console.log('input changed');
    resultsContainer.innerHTML = '';
    if (input.value !== '' && input.value !== ' '){
        console.log(searchQuery);
        fetchCountries(searchQuery).then(data => {
            if (data.status === 404) {
                pontyfyMassage('Nothing was found for your query!')
            }
            else if (data.length > 10) {
                pontyfyMassage('Too many matches found. Please enter more specific query!');
                }
            else if (data.length === 1) {
                const resultsMarkup = createMenuItemsMarkup(data);
                resultsContainer.insertAdjacentHTML('beforeend', resultsMarkup);
            }
            else if (2 <= data.length <= 10){
                const resList = createItemsList(data);
                resultsContainer.insertAdjacentHTML('beforeend', resList);        
            }
    })
}};

function createMenuItemsMarkup(data) {
    return countryItemTpl(data);
}
function createItemsList(data) {
    return countriesListTpl(data);
}
function pontyfyMassage(message) {
    error ({
            title: `${message}`,
            delay: 1200,
        });
}