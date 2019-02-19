'use strict';

const { format } = require("winston");
const { combine, timestamp, prettyPrint, colorize } = format;


module.exports = {
    db: {
        uri: 'mongodb://localhost:27017/dbname',
        options: {
            user: '',
            pass: '',
            promiseLibrary: require('bluebird'),
            useNewUrlParser: true
        },
        dbName: 'dbname'
    },
    host: 'localhost',
    morgan: {
        format: 'combined',
    },
    sendGrid: {
        api_key: 'your_sendgrid_api_key',
        to: 'to@provider.com',
        from: 'from@provider.com'
    },
    winston: {
        level: "debug",
        format: combine(
            timestamp(),
            prettyPrint(),
            colorize()
        ),
        console: {
            format: format.simple(),
            handleExceptions: true,
            colorize: true,
            level: "debug"
        },
        exitOnError: false, // do not exit on handled exceptions
    },
    /**
    OTHER CONFIGS YOU MIGHT WANT TO USE
    jwt: {
        key: 'your_secret',
        accessTokenTime: 7200, // seconds (2 hours)
        refreshTokenTime: 2592000 // seconds (30days)
    },
    bcrypt: {
        saltRounds: 5,
    },
    dbProjections: {
        limit: 8
    },
    */
};
