var express = require('express');
var router = express.Router();
var passport = require('passport');
var querystring = require('querystring');

var yo = require('../scripts/yo.js')

/* GET home page. */
router.get('/', function(req, res) {
	if(req.isAuthenticated){
		res.redirect('/index');
	} else{
		res.redirect('/login');		
	}
});

router.get('/index', function(req, res){
	if(req.isAuthenticated){
		res.render('index', { user:req.user })
	} else{
		res.redirect('/login');		
	}
});

router.get('/yo', function(req,res){
	res.render('message', {category:querystring.parse(req.query.category), 
		location:querystring.parse(req.query.location), 
		message:querystring.parse(req.query.message)})
});

router.post('/sendyo', function(req, res){
	var category = req.body.category;
	var location = req.body.location;
	var message = req.body.message;
	var query = querystring.stringify({category: category, 
		location: location, message: message})
	yo.yoAll("http://yomergency.herokuapp.com/yo?" + query, function(response){
		res.send("Yo sent successfully.")
	})
})

module.exports = router;
