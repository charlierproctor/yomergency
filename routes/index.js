var express = require('express');
var router = express.Router();
var passport = require('passport');

var yo = require('../scripts/yo.js')

/* GET home page. */
router.get('/', function(req,res){
	res.send("hi")
});
router.get('/index', function(req, res, next) {
  passport.authenticate('facebook', function(err, user, info) {
    if (err) { return next(err); }
    if (!user) { return res.redirect('/login'); }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      return res.render('/index')
    });
  })(req, res, next);
});

module.exports = router;
