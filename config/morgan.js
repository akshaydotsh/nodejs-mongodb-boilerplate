'use strict';

/**
 * Module dependencies.
 */

var config = require('./config');
var winston = require('./winston');

/**
 * Module init function for morgan logging. 
 * We set 2 parameters - 1) format 2? options
 * We set stream option to output logs in a log file combined with winston
 */
module.exports = {

  getMorganLogFormat: function () {
    return config.morgan.format;
  },

  getMorganLogOptions: function () {
    var options = {};
    try {
      if ('stream' in config.morgan.options) {
        options = {
          stream: winston.stream
        };
      }
    } catch (e) {
      options = {};
    }

    return options;
  }

};
