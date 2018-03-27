'use strict';

/**
 * Module dependencies.
 */

const path = require('path');

const { checkRequiredEnv } = require('./util');

// check required env variables
checkRequiredEnv();

const development = require('./env/development');
const test = require('./env/test');
const production = require('./env/production');


const defaults = {
    root: path.join(__dirname, '..'),
};

/**
 * Expose
 */

module.exports = {
    development: Object.assign({}, development, defaults),
    test: Object.assign({}, test, defaults),
    production: Object.assign({}, production, defaults),
}[process.env.NODE_ENV || 'development'];