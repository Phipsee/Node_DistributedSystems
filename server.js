var rpc = require('node-json-rpc');

// ---------------Ex1---------------
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

// ---------------Ex2---------------
var WebSocketServer = require('websocket').server;
var http = require('http');
var history = [];
var users = [];

var server = http.createServer(function(request, response) {
	response.writeHead(404);
	response.end();
});
server.listen(8080, function() {
	console.log((new Date()) + ' WebSocketServer is listening on port 8080');
});

wsServer = new WebSocketServer({
	httpServer : server,
	autoAcceptConnections : false
});

wsServer.on('request', function(request) {
	var connection = request.accept('echo-protocol', request.origin);

	connection.sendUTF(JSON.stringify(history));

	connection.on('message', function(message) {
		if (message.type === 'utf8') {
			var msg = JSON.parse(message.utf8Data);
			if (msg.type === "login") {
				var responseMsg = addUser(msg.user, this);
				forwardMsg(JSON.stringify([ responseMsg ]));
			} else {
				addToChatHistory(msg);
				forwardMsg(JSON.stringify([ msg ]));
			}
		}
	});

	connection.on('close', function(reasonCode, description) {
		removeUser(connection);

	});
});

function addToChatHistory(msg) {
	history.push(msg);
}

function addUser(user, connection) {
	var loginMsg = {
		type : "login",
		text : "Welcome " + user,
		user : "system",
		date : Date.now()
	};

	for (i = 0; i < users.length; i++) {
		if (users[i].user === user) {
			loginMsg.type = "failed"
			return loginMsg;
		}
	}
	connection.userName = user;
	users.push({
		user : user,
		connection : connection
	});
	sendUsersOnline();
	return loginMsg;
}

function removeUser(connection) {
	for (i = 0; i < users.length; i++) {

		if (users[i].user == connection.userName) {
			var msg = {
				type : "message",
				text : users[i].user + " left",
				user : "system",
				date : Date.now()
			};
			forwardMsg(JSON.stringify([ msg ]))
			users = users.splice(i, 1);
			sendUsersOnline();
		}
	}
}

function forwardMsg(msg) {
	for (i = 0; i < users.length; i++) {
		users[i].connection.sendUTF(msg);
	}
}

function sendUsersOnline() {
	var tmpUsers = [];
	for(i = 0; i<users.length; i++){
		tmpUsers.push(users[i].user);
	}
		
	forwardMsg(JSON.stringify(tmpUsers));
}
