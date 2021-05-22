var debounce = require('lodash.debounce');
import countryItemTpl from './country.hbs';
import countriesListTpl from './country-list.hbs';
import fetchCountries from './fetchCountries.js';
import { alert } from '@pnotify/core';
import './styles.css';

const resultsContainer = document.querySelector('.results-section');
const input = document.querySelector('.country-finder-input');

input.addEventListener('input', debounce(onInputChange, 500));

function onInputChange(){
    let searchQuery = input.value;
    if (input.value !== ''){
        console.log(searchQuery);
        fetchCountries(searchQuery).then(data => {
            if (data.length >= 10) {
                alert({
                    text: 'Необходимо сделать запрос более специфичным!'
                });
                }
            else if (data.length === 1) {
                const resultsMarkup = createMenuItemsMarkup(data);
                resultsContainer.insertAdjacentHTML('afterend', resultsMarkup);
            }
            else if (2 <= data.length <= 9){
                const resList = createItemsList(data);
                resultsContainer.insertAdjacentHTML('afterend', resList);        
            }
    })
}};

function createMenuItemsMarkup(data) {
    return countryItemTpl(data);
}
function createItemsList(data) {
    return countriesListTpl(data);
}