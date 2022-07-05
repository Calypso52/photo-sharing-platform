const rewire = require('rewire');
const defaults = rewire('react-scripts/scripts/build.js');
const config = defaults.__get__('config');


config.resolve.alias['@'] = path.resolve('src');
