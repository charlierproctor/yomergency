var express = require('express');
var router = express.Router();
var passport = require('passport');

var yo = require('../scripts/yo.js')

/* GET home page. */
router.get('/', function(req, res, next) {
	res.redirect('/login');
});

router.get('/index',
  passport.authenticate('facebook', { successRedirect: '/bob',
                                   failureRedirect: '/steve' }));

module.exports = router;
