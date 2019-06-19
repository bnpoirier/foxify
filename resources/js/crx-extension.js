export default class CRXExtension{

    /**
     * New instance
     * @param {*} url
     */
    constructor(url){
        let rules = "^https:\/\/chrome\.google\.com\/webstore\/detail\/([a-zA-Z0-9\-]*)\/([a-z]*)";
        let matches = url.match(rules);
    
        if(typeof matches[1] === "undefined" || typeof matches[2] === "undefined")
            throw "Following URL is probably incorrect : "+url;

        this.url = url;
        this.name = matches[1];
        this.extensionId = matches[2];
    }

    /**
     * Trigger download on a new tab
     * @param {string} format 
     * @param {boolean} forceDownload 
     */
    triggerDownload(format, forceDownload){
        // Build download url
        let download_url = "/download/"+this.name+"."+format+"?url="+this.url+(forceDownload == true ? '&force_dl=true' : '');

        // Launch download on a new transparent tab
        return window.open(download_url, "_self");
    }
}