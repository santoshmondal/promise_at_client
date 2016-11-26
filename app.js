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

// REFERENCE :: http://stackoverflow.com/questions/18310394/no-access-control-allow-origin-node-apache-port-issue
app.use(function (req, res, next) {

    var allowedOrigins = ['http://192.168.1.2:3003', 'http://localhost:3003', 'http://127.0.0.1:3003'];
    var origin = req.headers.origin;
    if(allowedOrigins.indexOf(origin) > -1){
        res.setHeader('Access-Control-Allow-Origin', origin);
    }

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    // res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

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