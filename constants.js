
/**
 * Google service url for downloading CRX files.
 */
const CRX_SOURCE_URL = 'https://clients2.google.com/service/update2/crx?response=redirect&prodversion=49.0&x=id%3D***%26installsource%3Dondemand%26uc';

/**
 * Available formats for exportation.
 */
const FORMATS = ['zip', 'crx', 'xpi'];


module.exports = {
    CRX_SOURCE_URL,
    FORMATS
}