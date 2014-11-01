var express = require('express');
var router = express.Router();
var passport = require('passport');

var yo = require('../scripts/yo.js')

/* GET home page. */
router.get('/', function(req, res, next) {
	res.redirect('/login');
});

router.get('/index', function(req, res, next) {
  //need to authenticate here.
  res.render('index');
});

module.exports = router;
