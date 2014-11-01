var express = require('express');
var router = express.Router();

var yo = require('../scripts/yo.js')

/* GET home page. */
router.get('/', function(req, res) {
	yo.yoAll("http://www.google.com/", function(err,res,body){
		console.log(err)
		console.log(body)
	});
	// yo.yoAll("", function(err,res,body){
	// 	console.log(body)
	// })
  	res.render('index', { title: 'Express' });
});

router.post('/login', passport.authenticate('local', { successRedirect: '/',
                                                    failureRedirect: '/login' }));

module.exports = router;
