Yo = require("yo-api");
yo = new Yo("25bf5243f31028ba2df7b75cb4189b672ec8baca");

var yoAll = function(link, callback){
	if(link){
		yo.yo_all_link(link, callback)
	} else{
		yo.yo_all(callback)
	}
}

var yoOne = function(username,link, callback){
	if(link){
		yo.yo_link(username, link, callback)
	} else{
		yo.yo(username, callback)		
	}
}

module.exports = {yoOne: yoOne, yoAll: yoAll}
