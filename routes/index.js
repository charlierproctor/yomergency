var express = require('express');
var router = express.Router();
var passport = require('passport');
var querystring = require('querystring');

var yo = require('../scripts/yo.js')

var mongoose=require('mongoose');
var db = require('../scripts/db.js');
var Yos = require('../scripts/yos.js');

var passport = require("../scripts/passport.js");
var moment = require('moment');

/* GET home page. */
router.get('/', function(req, res) {
	if(req.isAuthenticated()){
		res.redirect('/index');
	} else{
		res.redirect('/login');		
	}
});

router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

router.get('/index', function(req, res){
	if(req.isAuthenticated()){
		Yos.find({authorsFbId : req.user.fbId}, function(err, yos){
			console.log("YOS: " + yos);
			res.render('index', { user:req.user, yos:yos, flash:"" })		        
	    });
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

router.post('/index', function(req, res){
	if(req.isAuthenticated()){
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
			console.log("Yo sent successfully.")
		})	
		Yos.find({authorsFbId : req.user.fbId}, function(err, yos){
		console.log("YOS: " + yos);
		res.render('index', { user:req.user, yos:yos, flash:"Yo sent successfully!" })		        
    });
	} else{
		res.redirect('/login');		
	}	
})

module.exports = router;
