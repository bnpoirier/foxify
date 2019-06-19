class CookieManager{

    /**
     * Get cookie value
     * @param {*} key 
     */
    get(key){
        let value = "; " + document.cookie;
        let parts = value.split("; " + key + "=");

        if (parts.length == 2) 
            return parts.pop().split(";").shift();
        return null;
    }

    /**
     * Set a cookie value
     * @param {*} key 
     * @param {*} value 
     */
    set(key, value){
        document.cookie = key+'='+value;
    }

    /**
     * Delete a cookie
     * @param {*} key 
     */
    clear(key){
        document.cookie = document.cookie = key+'= ; expires = Thu, 01 Jan 1970 00:00:00 GMT';
    }
}

export default new CookieManager();