var api_token = "25bf5243f31028ba2df7b75cb4189b672ec8baca";

var yoApiCall = function(method, route, params, callback){

	var request = require('request');
	var url = "https://api.justyo.co/" + route;
	console.log(method + ": " + url);
	console.log(params);
	request.post(url, function (error, response, body) {
	  if (!error && response.statusCode == 200) {
	    callback(body);
	  } else{
	  	console.log("ERROR " + response.statusCode + ": " + body)
	  }
	}).form(params)

}

var yoall = function(link){
	var params = {api_token:api_token}
	if(link){
		params.link = link;
	}
	yoApiCall("POST", "yoall", params, function(response){
		console.log(response);
	})
}

var yo = function(username,link){
	var params = {username:username, api_token:api_token}		
	if(link){
		params.link = link;
	}
	yoApiCall("POST", "yo", params, function(response){
		console.log(response);
	})
}

module.exports = yo;
