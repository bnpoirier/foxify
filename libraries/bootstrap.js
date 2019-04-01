/**
 * BOOTSTRAP FUNCTIONS
 * This file contains bootstrap and simple functions
 * ----------------------------------------------------
 */


/**
 * Check if value is meant to be true. Used for query parameters
 * @param {*} value
 */
const isTrue = (value) => {

    if(typeof value == 'number')
        return (value == 1);

    if(typeof value == 'string')
        return (value == '1' || value == 'true' || value == '');

    return false;
}

module.exports = { isTrue };