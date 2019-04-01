const express = require('express');
const request = require('request');
const config = require('../config');
const crxtozip = require('./../libraries/crxtozip');
const ziptoxpi = require('./../libraries/ziptoxpi');
const { isTrue } = require('../libraries/bootstrap');
const router = express.Router();

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
 * Get extension id from url
 * @param {String} url 
 */
const getExtensionId = (url) => {
    return getExtensionParam(url, 2);
}

/**
 * Returns format or false if not in range
 * @param {String} format 
 */
const getFormat = (format) => {
    return (["crx", "zip", "xpi"].indexOf(format) === -1) ? false : format;
}

/**
 * Get download url according to id
 * @param {String} id 
 */
const getDownloadUrl = (id) => {
    var source = config.crx_src_url;
    return source.replace("***", id);
}


router.get('/:name([a-z]*).:format(crx|zip|xpi)', (req, res, next) => {
    const extension_id = getExtensionId(req.query.url);
    const format = getFormat(req.params.format);
    const force_dl = isTrue(req.query.force_dl);

    // If something isn't valid, return Bad request error.
    if(!extension_id || !format){
        res.sendStatus(400);
        return;
    }

    let download_url = getDownloadUrl(extension_id);

    // Request download extension from Google Web Store servers
    let crx = request.get({
        url: download_url,
        followAllRedirects: true,
        encoding: null,
        headers: {
            'uri': download_url,
            'Accept': '*/*',
            'User-Agent': req.get('User-Agent'),
        }
    })

    // Instance of converters classes
    let tozip = new crxtozip();
    let toxpi = new ziptoxpi();

    // If converted to XPI, set application id
    toxpi.setApplicationId(getExtensionName(req.query.url));

    // Convert file to desired format (xpi, zip or crx)
    if(format == "zip") crx.pipe(tozip).pipe(res).header('Content-type', 'application/zip');
    else if(format == "xpi" && force_dl) crx.pipe(tozip).pipe(toxpi).pipe(res).header('Content-type', 'application/octet-stream');
    else if(format == "xpi") crx.pipe(tozip).pipe(toxpi).pipe(res).header('Content-type', 'application/x-xpinstall');
    else crx.pipe(res).header('Content-type', 'application/x-chrome-extension');
});


module.exports = router;
