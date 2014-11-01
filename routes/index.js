var express = require('express');
var router = express.Router();

var yoall = require('../scripts/yo.js')

/* GET home page. */
router.get('/', function(req, res) {
	yoall("http://www.google.com");
  	res.render('index', { title: 'Express' });
});

module.exports = router;
