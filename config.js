const convict = require('convict');
const env = require('dotenv').config();

const conf = convict({
    env: {
        format: ['development', 'production'],
        default: 'development',
        env: 'NODE_ENV'
    },
    host: {
        format: String,
        default: '127.0.0.1',
        env: 'HOST'
    },
    port: {
        format: Number,
        default: 3000,
        env: 'PORT'
    },
    secret: {
        format: String,
        default: '',
        env: 'SECRET'
    },
    i18n_dflt_lang: {
        format: String,
        default: 'en',
        env: 'I18N_DFLT_LANG'
    },
    crx_src_url: {
        format: String,
        default: '',
        env: 'CRX_SRC_URL'
    },
    crx_max_size: {
        format: Number,
        default: 20971520,
        env: 'CRX_MAX_SIZE'
    }
});
  
// Perform validation
conf.validate();

module.exports = conf.getProperties();