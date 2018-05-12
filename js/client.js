function createHTML(type, text) {
	var para = document.createElement(type);
	var t = document.createTextNode(text);
	para.appendChild(t);
	document.getElementById("movies").appendChild(para);
}

function renderText(text) {
	createHTML("p", text);
}

function renderRentButton(title, name) {
	var btn = document.createElement("BUTTON");
	var t = document.createTextNode(name);
	btn.appendChild(t);
	document.getElementById("movies").appendChild(btn);
	btn.onclick = function() {
		rentAMovie(title);
	}
}

function renderMovieTitle(title, json) {
	var para = document.createElement("a");
	var t = document.createTextNode(title);
	para.appendChild(t);
	document.getElementById("movies").appendChild(para);
	para.onclick = function() {
		renderMovieDetails(json)
	}
}

function renderMovieDetails(json) {
	$("#movies").empty();
	for (key in json) {
		renderText(key + ": " + json[key]);
	}
	renderRentButton(json.title, "Rent");
}

function getResultJSON(result) {
	return result.responseJSON.result;
}

function updateMovieView(result) {
	getResultJSON(result).forEach(function(obj) {
		renderMovieTitle(obj.title, obj);
		renderText(" ");
	});
}

function rentAMovie(title) {
	$.ajax({
		url : 'http://127.0.0.1:1337',
		data : JSON.stringify({
			method : 'rentMovie',
			params : [ title ],
			id : "jsonrpc"
		}),
		type : "POST",
		dataType : "json",
		complete : function(result) {
			movie = getResultJSON(result);
			$("#movies").empty();
			renderMovieDetails(movie)
		}
	});
}

function getMovies() {
	$("#movies").empty();
	$.ajax({
		url : 'http://127.0.0.1:1337',
		data : JSON.stringify({
			method : 'getMovies',
			params : null,
			id : "jsonrpc"
		}),
		type : "POST",
		dataType : "json",
		complete : function(result) {
			updateMovieView(result);
		}
	});
}