var rpc = require('node-json-rpc');

var options = {
	port : 1337,
	host : '127.0.0.1',
	path : '/'
}

var client = new rpc.Client(options);

client.call({
	"method" : "add",
	"params" : [ 1, 2 ]
}, function(err, res) {
	if (err) {
		console.log(err);
	} else {
		console.log(res);
	}
});