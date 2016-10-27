/**
 * Created by santosh on 10/7/16.
 */
/**
 * http://usejsdoc.org/
 */
var winston = require('winston');
winston.emitErrs = true;

var logger = new winston.Logger({
    transports: [
        new (winston.transports.File)({
            "name" : "info",
            filename:  "info.log",
            level: 'info',

            handleExceptions: true,
            json: true,
            maxsize: 5242880, //5MB
            maxFiles: 5,
            colorize: false
        }),

        new (winston.transports.File)({
            "name" : "error",
            filename:  "error.log",
            level: 'error',

            handleExceptions: true,
            json: true,
            maxsize: 5242880, //5MB
            maxFiles: 5,
            colorize: false
        }),

        new winston.transports.Console({
            level: 'info',
            handleExceptions: true,
            json: false,
            colorize: true
        })
    ],
    exitOnError: false
});

module.exports = logger;
module.exports.stream = {
    write: function(message, encoding){
        logger.info(message);
    }
};
