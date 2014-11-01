var express = require('express');
var router = express.Router();

var mongoose=require('mongoose');

var db = require('../scripts/db.js');

var FbUsers = require('../scripts/fbUsers.js');

var passport = require('passport')
  , FacebookStrategy = require('passport-facebook').Strategy;

passport.use(new FacebookStrategy({
    clientID: "714170931992033",
    clientSecret: "7a71942ad9b2053d7bb3e94e3ecf85e6",
    callbackURL: "http://yomergency.herokuapp.com/login/facebook/callback"
  },
  function(accessToken, refreshToken, profile, done) {
      FbUsers.findOne({fbId : profile.id}, function(err, oldUser){
        if(oldUser){
            done(null,oldUser);
        }else{
            var newUser = new FbUsers({
                fbId : profile.id ,
                email : profile.emails[0].value,
                name : profile.displayName
            }).save(function(err,newUser){
                if(err) throw err;
                done(null, newUser);
            });
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
  console.log("looking for user");
  passport.authenticate('facebook', function(err, user, info) {
    res.redirect("http://www.google.com");
    console.log("callback");
  });
});

module.exports = router;