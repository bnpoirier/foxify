/**
 * INTERFACE ANIMATIONS
 * All reusables or/and verbose effects are placed here
 */

import cookies from './cookies';
import translations from './translations';

// Converter element
let converterBox = document.querySelector('.converter-box');
let converterSubmit = document.querySelector('.converter-submit');

// Solution element
let solutionBox = document.querySelector('.warning-msg-box');
let solutionBtn = document.querySelector('.warning-msg-more');


/**
 * Shake the conversion input
 */
let shakeInput = () => {
    // Add apply-shake class for a few seconds
    converterBox.classList.add('apply-shake');
    // ... and remove it to stop animation
    setTimeout(() => converterBox.classList.remove('apply-shake'), 500);
}

/**
 * Show loader until awaiting cookie is removed
 */
let showLoader = () => {
    // If "success" class still present, remove it
    converterSubmit.classList.remove('success');
    // Add "wait" class to show loading icon
    converterSubmit.classList.add('wait');
    // Set a cookie to be removed by the server
    cookies.set('is_awaiting_download', 1);

    // Check if cookie has been removed means the request is being processed.
    let intervalID = window.setInterval(() => {
        // When the processing has ended, remove the "wait" class
        if(cookies.get('is_awaiting_download') == null){
            // Show success icon
            converterSubmit.classList.replace('wait', 'success');
            // Remove success icon 3s later...
            window.setTimeout(() => converterSubmit.classList.remove('success'), 3000);
            // Clear this interval
            window.clearInterval(intervalID);
        }
    }, 500);
}

export default {shakeInput, showLoader};