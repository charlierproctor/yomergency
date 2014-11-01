var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');

var YoSchema = new mongoose.Schema({
    authorsFbId: String,
    message: String,
    category: String, 
    location: String
});

YoSchema.plugin(timestamps);
var Yos = mongoose.model('yos',YoSchema);

module.exports = Yos;