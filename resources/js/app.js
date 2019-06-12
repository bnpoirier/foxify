import '../scss/app.scss';

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

// Node lists
const faq_questions = document.getElementsByClassName('faq-question');
const faq_boxes = document.getElementsByClassName('faq-box');

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

    return convert(url, format, force_dl);
}

/**
 * On link example click, fill the converter input
 * @param {*} e 
 */
const onExampleClick = (e) => {
    // Get clicked element
    converter_input.value = e.target.innerHTML;
}

/**
 * On FAQ question click
 * @param {*} e 
 */
const onFaqClick = (e) => {
    e.preventDefault();

    // Get the box which is the parent
    const faq_box = e.target.parentElement;

    // Toggle class open
    if(!faq_box.classList.contains(OPEN_CLASSNAME)){
        // Remove 'open' class name to foreign boxes
        Array.from(faq_boxes).forEach((faq_box) => {
            faq_box.classList.remove(OPEN_CLASSNAME);
        }); 
        
        // Add class to the clicked box
        faq_box.classList.add(OPEN_CLASSNAME);
    }
    else
        faq_box.classList.remove(OPEN_CLASSNAME);
}

const onWarningMoreBtnClick = (e) => {
    e.preventDefault();

    // Toggle class open
    if(!warning_box.classList.contains(OPEN_CLASSNAME))
        // Add class to the clicked box
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
const convert = (url, format, force_dl) => {
    let download_url = "/download/"+getExtensionName(url)+"."+format+"?url="+url+(force_dl == true ? '&force_dl=true' : '');

    let download_tab = window.open(download_url, "_self");
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

    // FAQ interactions
    Array.from(faq_questions).forEach((faq_question) => {
        faq_question.addEventListener('click', onFaqClick);
    });
}

if(document.getElementById && document.createTextNode) {
    init();
}
