'use strict';

/**
 * Module dependencies.
 */

const winston = require('winston');
const config = require('./config');

/**
 * Create Logger
 */
const logger = winston.createLogger({
    level: config.winston.level,
    format: config.winston.format,
    exitOnError: config.winston.exitOnError
})


/**
 * Setting up logging ...
 * You can configure any way you want
 * here console loggin is for 'dev' / 'stage' / 'test' environments
 * AND file logging for 'prod' environment
 */
if (process.env.NODE_ENV !== "prod") {
    // loggin to console for dev / test / stage
    if ("console" in config.winston) {
        logger.add(new winston.transports.Console(config.winston.console));
    }
} else {
    // logging to file + console in prod
    if ("file" in config.winston) {
        logger.add(new winston.transports.File(config.winston.file.combined));
        logger.add(new winston.transports.File(config.winston.file.error));     
    }
}


// Output from morgan logging to winston files
logger.stream = {
    write: function(message, encoding) {
        logger.info(message);
    }
};


module.exports = logger;