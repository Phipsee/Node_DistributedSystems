var username = 'hugo'

function receiveMsg(event) {
	console.log(event.data);
	addToChatHistory(JSON.parse(event.data));
}

function login() {
	username = $('#username')[0].value;
	var msg = {
		type : "login",
		text : null,
		user : username,
		date : Date.now()
	};

	socket.send(JSON.stringify(msg));
}

function sendMsg(msg) {
	var msg = {
		type : "message",
		text : msg,
		user : username,
		date : Date.now()
	};

	socket.send(JSON.stringify(msg));
}

function addToChatHistory(msgs) {
	for (i = 0; i < msgs.length; i++) {
		if (msgs[i].type === "login") {
			showChat();
		}
		
		if (msgs[i].type === "failed") {
			showError();
			return;
		}

		var text = "[" + new Date(msgs[i].date).toLocaleString() + "]"
				+ msgs[i].user + ": " + msgs[i].text;
		var para = document.createElement("p");
		var t = document.createTextNode(text);
		para.appendChild(t);
		document.getElementById("chat").appendChild(para);
	}
}

function showChat() {
	$("#loginContainer").fadeOut();
	$("#chatContainer").fadeIn();
}

function showError(){
	$("#usernameError").html('username already taken');
}

$(function() {
	socket = new WebSocket("ws://localhost:8080/", "echo-protocol");
	socket.onmessage = function(event) {
		receiveMsg(event);
	}

	$("#input").keyup(function(event) {
		if (event.keyCode === 13 && this.value !== "") {
			sendMsg(this.value);
			this.value = "";
		}
	});
});