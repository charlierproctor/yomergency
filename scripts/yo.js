var api_token = "25bf5243f31028ba2df7b75cb4189b672ec8baca";

var yoApiCall = function(method, route, addtlParams, callback){
	var http = new XMLHttpRequest();
	var url = "https://api.justyo.co/" + route;
	var params = "api_token=" + api_token + "&" + addtlParams;
	http.open(method, url, true);

	//Send the proper header information along with the request
	http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	http.setRequestHeader("Content-length", params.length);
	http.setRequestHeader("Connection", "close");

	http.onreadystatechange = function() {//Call a function when the state changes.
	    if(http.readyState == 4 && http.status == 200) {
	        callback(http.responseText);
	    }
	}
	http.send(params);
}

var yoall = function(link){
	if(link){
		linkParams = "link=" + link
	}
	yoApiCall("POST", "yoall", linkParams, function(response){
		console.log(response);
	})
}

module.exports = yoall;
