/**
 * Created by santosh on 10/7/16.
 */
var express = require('express');
var bodyParser = require('body-parser');
var handle_error = require('./handle_error');


var app = new express();
app.use(bodyParser.json({limit: '10mb'}));
app.use(bodyParser.urlencoded({limit: '10mb', extended: true }));


var router = express.Router();


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


// Handle 500
app.use(function(err, req, res, next) {
    console.error(err.stack);

    res.status(500);
    res.json({ error: err.stack });
});


app.listen(3004, function(){
   console.log("Server Started");
});

