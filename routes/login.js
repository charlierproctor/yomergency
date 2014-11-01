var express = require('express');
var router = express.Router();

var mongoose=require('mongoose');
var db = require('../scripts/db.js');
var FbUsers = require('../scripts/fbUsers.js');
var passport = require("../scripts/passport.js");

router.get('/', function(req,res){
  res.render('login');
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
router.get('/facebook/callback', passport.authenticate('facebook', { successRedirect: '/index',
                                      failureRedirect: '/login' }));

module.exports = router;