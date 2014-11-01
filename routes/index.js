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


var passport = require('passport')
  , FacebookStrategy = require('passport-facebook').Strategy;

passport.use(new FacebookStrategy({
    clientID: "714170931992033",
    clientSecret: "7a71942ad9b2053d7bb3e94e3ecf85e6",
    callbackURL: "http://www.example.com/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOrCreate(..., function(err, user) {
      if (err) { return done(err); }
      done(null, user);
    });
  }
));

module.exports = router;
