var mongoose = require('mongoose');

var YoSchema = new mongoose.Schema({
    authorsFbId: String,
    message: String,
    category: String, 
    location: String
});
var Yos = mongoose.model('yos',YoSchema);

module.exports = Yos;