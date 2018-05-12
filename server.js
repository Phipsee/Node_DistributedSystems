var rpc = require('node-json-rpc');

var options = {
	port : 1337,
	host : '127.0.0.1',
	path : '/'
}

var server = new rpc.Server(options);

server.addMethod('getMovies', function(params, callback) {
	console.log("someone asked for movies")
	var result = movies;
	var error = {
		code : 42,
		message : "There are no errors"
	};
	callback(null, result);
});

server.addMethod('rentMovie', function(params, callback) {
	console.log("someone rents a movie")
	var movieTitle = params[0];
	var movie;
	for (i = 0; i < movies.length; i++) {
		if (movies[i].title == movieTitle) {
			movies[i].numRents++;
			movie = movies[i];
			break;
		}
	}
	var error = {
		code : 42,
		message : "There are no errors"
	};
	callback(null, movie);
});

server.start(function(error) {
	if (error)
		throw error;
	else
		console.log('Server is running....');
});

var movies = [ {
	"title" : "movie1",
	"year" : "2000",
	"movieInfo" : "This movie won 5 oscars...",
	"numRents" : 0
}, {
	"title" : "movie2",
	"year" : "2008",
	"movieInfo" : "Another great movie...",
	"numRents" : 2
} ]