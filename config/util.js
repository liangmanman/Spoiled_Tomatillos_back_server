const _ = require('lodash');

const requiredEnvList = [
    'MONGO_DB_URI',
    'SESSION_SECRET',
];

function checkRequiredEnv() {
    if (process.env['NODE_ENV'] === 'test' || process.env['NODE_ENV'] === 'CI') {
        return;
    }

    const unsetEnv = _.filter(requiredEnvList, (envString) => {
        return _.isNil(process.env[envString])
    });

    if (unsetEnv.length > 0) {
        throw new Error("Required ENV variables are not set: [" + unsetEnv.join(', ') + "]");
    }
}

module.exports = {
    checkRequiredEnv,
};