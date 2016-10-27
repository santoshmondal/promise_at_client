/**
 * http://usejsdoc.org/
 */
var express = require('express');
var router = express.Router();



// Handle 404
router.use(function(req, res, next) {
      console.log('Resource not found - ' + req.url);
      
	  res.status(404);
	  res.json({
		  'code' : '404',
		  'message' : 'resource not found'
	  });
});




module.exports = router;