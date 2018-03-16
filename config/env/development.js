'use strict';

/**
 * Expose
 */

module.exports = {
    mongodb: process.env.MONGO_DB_URI,
    mysql: {
        "username": process.env.MYSQL_USERNAME,
        "password": process.env.MYSQL_PASSWORD,
        "database": process.env.MYSQL_DATABASE,
        "host": process.env.MYSQL_HOST,
        "dialect": "mysql",
    },
    secret: "Spring is coming",
};