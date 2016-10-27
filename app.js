/**
 * Created by santosh on 10/7/16.
 */
var express = require('express');
var bodyParser = require('body-parser');

var winston = require('winston');
var expressWinston = require('express-winston');
var logger = require('./logger');
expressWinston.requestWhitelist.push('body');
expressWinston.responseWhitelist.push('body');
expressWinston.bodyBlacklist.push('password', 'user.password');




var test = require('./test.js');

var app = new express();
app.use(bodyParser.json({limit: '10mb'}));
app.use(bodyParser.urlencoded({limit: '10mb', extended: true }));

app.use(express.static('public'));

app.use(expressWinston.logger({
    transports: [
        new (winston.transports.Console)({
            json: false,
            colorize: true
        }),new (winston.transports.File)({
            name: 'httpinfo',
            filename: "httpinfo.log",
            level: 'info',

            handleExceptions: true,
            json: true,
            maxsize: 5242880, //5MB
            maxFiles: 5,
            colorize: false
        })
    ]
}));

app.get("/", function(req, res){
    winston.info("Hello");

    res.json({"name":"log"});
});


app.use('/test', test);

app.post("/", function(req, res){
    console.log(req.body);
    res.json(req.body);
});


app.use(expressWinston.errorLogger({
    transports: [
        new winston.transports.Console({
            json: true,
            colorize: true
        }),
        new (winston.transports.File)({
            name: 'httperror',
            filename: "httperror.log",
            level: 'error',

            handleExceptions: true,
            json: true,
            maxsize: 5242880, //5MB
            maxFiles: 5,
            colorize: false
        })
    ]
}));




app.listen(3003, function(){
    logger.info("Server Started");
    logger.log('info', 'Hello distributed log files!');
    logger.info('Hello again distributed logs');
})