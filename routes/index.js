var express = require('express');
var router = express.Router();

var yo = require('../scripts/yo.js')

/* GET home page. */
router.get('/', function(req, res) {
	yo.yoOne("AKIM828", "http://www.google.com", function(err,res,body){
		console.log(body)
	});
	// yo.yoAll("", function(err,res,body){
	// 	console.log(body)
	// })
  	res.render('index', { title: 'Express' });
});

module.exports = router;
