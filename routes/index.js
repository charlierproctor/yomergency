var express = require('express');
var router = express.Router();
var passport = require('passport');

var yo = require('../scripts/yo.js')

/* GET home page. */
router.get('/', function(req, res) {
	if(req.user){
		res.redirect('/index');
	} else{
		res.redirect('/login');		
	}
});

router.get('/index', ensureAuthenticated, function(req, res){
	if(req.user){
		res.render('index', { user:req.user })
	} else{
		res.redirect('/login');		
	}
});

var ensureAuthenticated = function(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login')
}

module.exports = router;
