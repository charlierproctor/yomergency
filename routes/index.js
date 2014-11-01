var express = require('express');
var router = express.Router();
var passport = require('passport');

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

module.exports = router;
