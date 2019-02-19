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
    host: 'https://www.stagingserver.com',
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
      /**
       * There are 2 types of logs setup for production
       * 1) Combined - all API request and everything you log for level info
       * 2) Error - error logs (mostly for handling db errors and other exceptions)
       */
      file: {
          combined: {
              "level": "info",
              filename: `${appRoot}/logs/combined.log`,
              handleExceptions: true,
              colorize: false,
          },
          error: {
              "level": "error",
              filename: `${appRoot}/logs/error.log`,
              handleExceptions: true,
              colorize: false,
          }
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
