/* config-overrides.js */
const path = require('path');

module.exports = function override(config, env) {
    
    config.resolve.alias['@'] = path.resolve('src');

    return config;
}