import '../scss/app.scss';

import CRXExtension from './crx-extension';
import animations from './animations';
import translations from './translations';

// Converter elements
let converterForm = document.querySelector('.converter');
let converterInput = document.querySelector('.converter-input');

// Example link element
let exampleLink = document.querySelector('.link-ex');

// Solution warning box element
let solutionBox = document.querySelector('.warning-msg-box');
let solutionBtn = document.querySelector('.warning-msg-more');


/**
 * On input click
 * @param {Event} e
 */
let onConversionInputFocus = (e) => {
    // Select the whole content in the input
    e.target.setSelectionRange(0, e.target.value.length);
}

/**
 * On conversion form submit
 * @param {Event} e 
 */
let onConversionFormSubmit = (e) => {
    e.preventDefault();

    let url = converterForm.elements['u'].value;
    let format = converterForm.elements['format'].value;
    let forceDownload = (converterForm.elements['force_dl'].value == 1);

    // Try to create CRXExtension instance
    try{
        let extension = new CRXExtension(url);
        extension.triggerDownload(format, forceDownload);
        animations.showLoader();
    }
    catch{
        animations.shakeInput();
    }
}

/**
 * On example click
 * @param {*} e 
 */
let onExampleLinkClick = (e) => {
    converterInput.value = e.target.innerHTML;
}

/**
 * On solution click
 * @param {*} e 
 */
let onSolutionButtonClick = (e) => {
    // Name the class used for showing or hiding content
    const OPEN_CLASSNAME = 'open';
    
    // Toggle class open
    if(!solutionBox.classList.contains(OPEN_CLASSNAME)){
        solutionBox.classList.add(OPEN_CLASSNAME);
        solutionBtn.innerHTML = translations.get('warning-msg_hide');
    } 
    else{
        solutionBox.classList.remove(OPEN_CLASSNAME);
        solutionBtn.innerHTML = translations.get('warning-msg_show');
    }
}

/**
 * Initialize event listeners
 */
let init = () => {
    // Interactions with the conversion box
    converterInput.addEventListener('focus', onConversionInputFocus);
    converterForm.addEventListener('submit', onConversionFormSubmit);

    // On example link click
    exampleLink.addEventListener('click', onExampleLinkClick);

    // On solution click
    solutionBtn.addEventListener('click', onSolutionButtonClick);
};

// Init interactions on DOM loaded
document.addEventListener('DOMContentLoaded', init);