import '../scss/app.scss';

import cookie from './libraries/cookies';

// Converter elements
const converter_form = document.querySelector(".converter");
const converter_input = document.querySelector('.converter-input');
const converter_submit = document.querySelector('.converter-submit');
const converter_box = document.querySelector('.converter-box');

// Link example
const link_example = document.querySelector('.link-ex');

// Warning messages
const warning_box = document.querySelector('.warning-msg-box');
const warning_more_btn = document.querySelector('.warning-msg-more');

// Classes constants
const OPEN_CLASSNAME = 'open';


/**
 * On input focus, select the whole URL if present
 * @param {*} e 
 */
const onFocus = (e) => {
    e.target.setSelectionRange(0, e.target.value.length);
}


/**
 * On form submit, start conversion
 * @param {*} e 
 */
const onSubmit = (e) => {
    e.preventDefault();

    let url = converter_form.elements['u'].value;
    let format = converter_form.elements['format'].value;
    let force_dl = (converter_form.elements['force_dl'].value == '1');

    if(!isValidURL(url)) {
        applyShake();
        return false;
    }

    // Show loading icon
    showLoading();

    return download(url, format, force_dl);
}


/**
 * On link example click, fill the converter input
 * @param {*} e 
 */
const onExampleClick = (e) => {
    // Get clicked element value and fill the input with it
    converter_input.value = e.target.innerHTML;
}


/**
 * If the "show more" button has been clicked
 * @param {*} e 
 */
const onWarningMoreBtnClick = (e) => {
    e.preventDefault();

    // Toggle class open
    if(!warning_box.classList.contains(OPEN_CLASSNAME))
        warning_box.classList.add(OPEN_CLASSNAME);
    else
        warning_box.classList.remove(OPEN_CLASSNAME);
}


/**
 * Simple url check
 * @param {*} url 
 */
const isValidURL = (url) => {
    var o = document.createElement("a");
    if (o.href = url, "chrome.google.com" == o.host) {
        return true;
    }
    return false;
}


/**
 * Shake input if value is wrong
 */
const applyShake = () => {
    converter_box.classList.add('apply-shake');

    setTimeout(() => {
        converter_box.classList.remove('apply-shake');
    }, 500);
}


/**
 * Show the waiting icon and remove it once the request is processed.
 */
const showLoading = () => {
    // Add wait class to show loading icon
    converter_submit.classList.add('wait');
    cookie.set('is_awaiting_download', 1);

    // Check if cookie has been removed means the request is being processed.
    let intervalID = window.setInterval(() => {
        // When the processing has ended, remove the "wait" class
        if(cookie.get('is_awaiting_download') == null){
            // Show success icon
            converter_submit.classList.replace('wait', 'success');
            // Remove success icon 3s later...
            window.setTimeout(() => converter_submit.classList.remove('success'), 3000);
            // Clear this interval
            window.clearInterval(intervalID);
        }
    }, 500);
}


/**
 * Chrome Web Store url parser
 * @param {String} url 
 * @param {Integer} index 
 */
const getExtensionParam = (url, index) => {
    var index = index || 0;
    var url = url || "";
    var rules = "^https:\/\/chrome\.google\.com\/webstore\/detail\/([a-zA-Z0-9\-]*)\/([a-z]*)";
    
    var matches = url.match(rules);

    return (matches !== null) ? matches[index] : null;
}

/**
 * Get extension name from url
 * @param {String} url 
 */
const getExtensionName = (url) => {
    return getExtensionParam(url, 1);
}

/**
 * Start conversion and download conversion
 * @param {*} url 
 * @param {*} format 
 */
const download = (url, format, force_dl) => {
    // Build download url
    let download_url = "/download/"+getExtensionName(url)+"."+format+"?url="+url+(force_dl == true ? '&force_dl=true' : '');

    // Launch download on a new transparent tab
    return window.open(download_url, "_self");
}

/**
 * On page load, declare event listeners
 */
const init = () => {
    // Form interactions
    converter_input.addEventListener("focus", onFocus);
    converter_form.addEventListener("submit", onSubmit);

    // Link example interaction
    link_example.addEventListener("click", onExampleClick);

    // Warning button interactions
    warning_more_btn.addEventListener("click", onWarningMoreBtnClick);
}


if(document.getElementById && document.createTextNode) {
    init();
}
