var express = require('express');
var router = express.Router();
var passport = require('passport');
var querystring = require('querystring');

var yo = require('../scripts/yo.js')

var mongoose=require('mongoose');
var db = require('../scripts/db.js');
var Yos = require('../scripts/yos.js');

var passport = require("../scripts/passport.js");

/* GET home page. */
router.get('/', function(req, res) {
	if(req.isAuthenticated()){
		res.redirect('/index');
	} else{
		res.redirect('/login');		
	}
});

router.get('/index', function(req, res){
	if(req.isAuthenticated()){
		res.render('index', { user:req.user })
	} else{
		res.redirect('/login');		
	}
});

router.get('/yo', function(req,res){
	var query = querystring.parse(req.originalUrl.substring(4));
	res.render('message', {category:query.category, 
		location:query.location, 
		message:query.message})
});

router.post('/sendyo', function(req, res){
	var category = req.body.category;
	var location = req.body.location;
	var message = req.body.message;

	console.log("user: " + req.user);
	var newYo = new Yos({
                authorsFbId : req.user.fbId,
                message : message,
                category : category,
                location : location
            }).save(function(err,newYo){
                if(err) throw err;
                console.log("Saved: " + newYo);
            });

	var query = querystring.stringify({category: category, 
		location: location, message: message})
	yo.yoAll("http://yomergency.herokuapp.com/yo?" + query, function(response){
		res.send("Yo sent successfully.")
	})
})

module.exports = router;
