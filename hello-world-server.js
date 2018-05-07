var http = require('http');
var rpc = require('json-rpc2');

server = http.createServer(function handler(req, res) {
	res.writeHead(200, {
		'Content-Type' : 'text/plain'
	});
	res.end(displayMovies());

}).listen(1337, '127.0.0.1');
console.log('Server running at http://127.0.0.1:1337/');

var movieDB = [ {
	"title" : "movie1",
	"year" : "2000",
	"movieInfo" : "This movie won 5 oscars...",
	"numRents" : 0
}, {
	"title" : "movie2",
	"year" : "2008",
	"movieInfo" : "Another great movie...",
	"numRents" : 2
} ];

function displayMovies() {
	var s = "";
	movieDB.forEach(function(e) {
		for (key in e) {
			s = s + key + ": " + e[key] + "\n";
		}
		s += "\n";
	});

	return s;
}
