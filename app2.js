/**
 * Created by santosh on 10/7/16.
 */
var express = require('express');
var bodyParser = require('body-parser');
var handle_error = require('./handle_error');

var winston = require('winston');
var expressWinston = require('express-winston');

var app = new express();
app.use(bodyParser.json({limit: '10mb'}));
app.use(bodyParser.urlencoded({limit: '10mb', extended: true }));


var router = express.Router();


app.use(expressWinston.logger({
    transports: [
        new (winston.transports.Console)({
            json: true,
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
    console.log("test");
    var s;
    //Math.sqrt(s);
    console.log("test");
    s.length;
    console.log("test");
    throw new Error("Some Error Happend");
    res.json({"name":"log"});

});

app.get("/1", function(req, res){
    res.json({})
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

// Handle 500
app.use(function(err, req, res, next) {

    res.status(500);
    res.json({ error: err.stack });
});


app.listen(3005, function(){
   console.log("Server Started");
});

