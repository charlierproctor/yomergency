var express = require('express');
var router = express.Router();

var yo = require('../scripts/yo.js')

/* GET home page. */
router.get('/', function(req, res) {
	yo("charlierproctor", "http://www.google.com");
  	res.render('index', { title: 'Express' });
});

module.exports = router;
