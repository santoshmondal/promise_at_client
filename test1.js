/**
 * Created by santosh on 10/7/16.
 */
var express = require('express');
var router = express.Router();
var logger = require('./logger');

router.get("/1", function(req, res){
    logger.info("hello");
    res.json({"1":"1"});
});


router.get("/2", function(req, res){
    var abcd;
    abcd.toLowerCase();
    logger.error("Error Log");
    res.json({"1":"1"});
});


router.post("/1", function(req, res){
    logger.info(req.body);

    res.json(req.body);
});

module.exports = router;