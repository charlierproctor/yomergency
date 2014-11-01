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
                // email : profile.emails[0].value,
                name : profile.displayName
            }).save(function(err,newUser){
                if(err) throw err;
                done(null, newUser);
            });
        }
      });
  }
));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  FbUsers.findById(id, function (err, user) {
    done(err, user);
  });
});

module.exports = passport;