const express = require('express');
const request = require('request');
const AppError = require('../errors/AppError');
const CrxToZip = require('../utils/converters/CrxToZip');
const ZipToXpi = require('../utils/converters/ZipToXpi');
const { getDownloadUrl, getExtensionId, getExtensionName, getFormat, getBoolean } = require('../utils/misc');
const router = express.Router();

router.get('/:name([a-z]*).:format(crx|zip|xpi)', function (req, res) {

    const extension_id = getExtensionId(req.query.url);
    const format = getFormat(req.params.format);
    const force_download = getBoolean(req.query.force_dl);
    const download_url = getDownloadUrl(extension_id);

    if(!format) throw new AppError('Please provide a valid format: xpi, zip or crx.', 400)
    if(!extension_id) throw new AppError('Chrome extension id is not found in the provided url.', 400);
    if(!download_url) throw new AppError('Failed to download Chrome extension.', 500)

    // Request download extension from Google Web Store servers
    let crx = request.get(download_url, {
        followAllRedirects: true,
        encoding: null,
        headers: {
            'uri': download_url,
            'Accept': '*/*',
            'User-Agent': req.get('User-Agent'),
        }
    });

    // Instance of converters classes
    let tozip = new CrxToZip();
    let toxpi = new ZipToXpi();

    // If converted to XPI, set application id
    toxpi.setApplicationId(getExtensionName(req.query.url));

    // Convert file to desired format (xpi, zip or crx)
    if(format == "zip") crx.pipe(tozip).pipe(res).header('Content-type', 'application/zip');
    else if(format == "xpi" && force_download) crx.pipe(tozip).pipe(toxpi).pipe(res).header('Content-type', 'application/octet-stream');
    else if(format == "xpi") crx.pipe(tozip).pipe(toxpi).pipe(res).header('Content-type', 'application/x-xpinstall');
    else crx.pipe(res).header('Content-type', 'application/x-chrome-extension');
});


module.exports = router;
