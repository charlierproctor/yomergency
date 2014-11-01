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
    console.log("you called me");
      FbUsers.findOne({fbId : profile.id}, function(err, oldUser){
        if(oldUser){
          console.log("old user");
            done(null,oldUser);
        }else{
            var newUser = new FbUsers({
                fbId : profile.id ,
                email : profile.emails[0].value,
                name : profile.displayName
            }).save(function(err,newUser){
                if(err) throw err;
                console.log("saved new user");
                done(null, newUser);
            });
        }
        console.log("hi");
      });
  }
));

router.get('/', function(req,res){
  res.send("/login");
});

router.get('/db', function(req,res){
      FbUsers.find({}, function(err, users){
        res.send(users);
      });
});

// Redirect the user to Facebook for authentication.  When complete,
// Facebook will redirect the user back to the application at
//     /auth/facebook/callback
router.get('/facebook', passport.authenticate('facebook'));

// Facebook will redirect the user to this URL after approval.  Finish the
// authentication process by attempting to obtain an access token.  If
// access was granted, the user will be logged in.  Otherwise,
// authentication has failed.
router.get('/facebook/callback', passport.authenticate('facebook', { successRedirect: '/',
                                      failureRedirect: '/login' }));

module.exports = router;