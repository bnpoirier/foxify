const { FORMATS, CRX_SOURCE_URL } = require('../constants');

/**
 * Chrome Web Store url parser
 * @param {String} url 
 * @param {Integer} index 
 */
function getExtensionParam(url, index) {
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
function getExtensionName(url) {
    return getExtensionParam(url, 1);
}

/**
 * Get extension id from url
 * @param {String} url 
 */
function getExtensionId(url) {
    return getExtensionParam(url, 2);
}

/**
 * Returns format or false if not in range
 * @param {String} format 
 */
function getFormat(format) {
    return (FORMATS.indexOf(format) === -1) ? false : format;
}

/**
 * Get download url according to id
 * @param {String} id 
 */
function getDownloadUrl(id) {
    return CRX_SOURCE_URL.replace("***", id);
}

/**
 * Check if value is meant to be true. Used for query parameters
 * @param {String|number} value
 */
function getBoolean(value) {
    if(typeof value == 'number')
        return (value == 1);

    if(typeof value == 'string')
        return (value == '1' || value == 'true' || value == '');

    return false;
}

module.exports = {
    getExtensionId,
    getExtensionName,
    getExtensionParam,
    getFormat,
    getDownloadUrl,
    getBoolean
}