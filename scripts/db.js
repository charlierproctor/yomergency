// database
var mongo = require('mongodb');

var mongoUri = process.env.MONGOLAB_URI ||
  process.env.MONGOHQ_URL ||
  'mongodb://localhost/mydb';

var monk = require('monk');
var db = monk(mongoUri);

module.exports = db;