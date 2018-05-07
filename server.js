var rpc = require('node-json-rpc');

var options = {
	port : 1337,
	host : '127.0.0.1',
	path : '/'
}

var server = new rpc.Server(options);

server.addMethod('add', function(params, callback) {
	var result = params[0] + params[1];
	var error = {
		code : 42,
		message : "There are no errors"
	};
	callback(null, result);
});

server.start(function(error) {
	if (error)
		throw error;
	else
		console.log('Server is running....');
});
