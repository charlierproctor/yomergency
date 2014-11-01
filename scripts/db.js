// database
var mongo = require('mongodb');

var mongoose = require('mongoose');

var mongoUri = process.env.MONGOLAB_URI ||
  process.env.MONGOHQ_URL ||
  'mongodb://localhost/mydb';

var db = mongoose.connect(mongoUri);

module.exports = db;