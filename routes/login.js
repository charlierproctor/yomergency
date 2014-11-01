var express = require('express');
var router = express.Router();

var monk=require('monk');

var db = require('../scripts/db.js');

var passport = require('passport')
  , FacebookStrategy = require('passport-facebook').Strategy;

passport.use(new FacebookStrategy({
    clientID: "714170931992033",
    clientSecret: "7a71942ad9b2053d7bb3e94e3ecf85e6",
    callbackURL: "http://yomergency.herokuapp.com/login/facebook/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    var collection = db.get('users');   // our users collection

    // attempt to find this token in our database
    collection.findOne({
            'facebook.id': profile.id 
        }, function(err, user) {
            if (err) {
                return done(err);
            }
            //No user was found... so create a new user with values from Facebook (all the profile. stuff)
            if (!user) {
                user = new User({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    username: profile.username,
                    provider: 'facebook',
                    //now in the future searching on User.findOne({'facebook.id': profile.id } will match because of this next line
                    facebook: profile._json
                });
                user.save(function(err) {
                    if (err) console.log(err);
                    return done(err, user);
                });
            } else {
                //found user. Return
                return done(err, user);
            }
        });
  }
));

router.get('/', function(req,res){
  res.send("/login");
});

// Redirect the user to Facebook for authentication.  When complete,
// Facebook will redirect the user back to the application at
//     /auth/facebook/callback
router.get('/facebook', passport.authenticate('facebook'));

// Facebook will redirect the user to this URL after approval.  Finish the
// authentication process by attempting to obtain an access token.  If
// access was granted, the user will be logged in.  Otherwise,
// authentication has failed.
router.get('/facebook/callback', function(req, res, next) {
  passport.authenticate('facebook', function(err, user, info) {
    res.redirect("http://www.google.com");
    console.log("callback");
  });
});

module.exports = router;