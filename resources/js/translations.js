/**
 * TRANSLATION
 * Small translation class
 */

const fallback = 'en';

const messages = {
    'en' : {
        'warning-msg_show': "Show the solution",
        'warning-msg_hide': "Hide the solution"
    },
    'fr' : {
        'warning-msg_show': "Afficher la solution",
        'warning-msg_hide': "Masquer la solution"
    }
}

class Translation{

    /**
     * Create Translation instance
     * @param {JSON} messages 
     * @param {string} fallback 
     */
    constructor(messages, fallback){
        this.lang = (navigator.language || navigator.userLanguage || fallback);
        this.messages = messages;
    }

    /**
     * Get all messages of the current language
     */
    getAll(){
        return this.messages[this.lang];
    }

    /**
     * Get message according to the given key
     * @param {string} key 
     */
    get(key){
        return (this.getAll()[key] || null);
    }
}

export default new Translation(messages, fallback);