
var PORT = 3002;
var HOST = '176.66.1.77';
var dgram = require('dgram');
var server = dgram.createSocket('udp4');

var connects = [];
var beaglebone = [{"message":"not connected"}];

module.exports = function(ws, req) {
	var _user = req.params.user;

	connects.push({"user":_user,"ws": ws});

	ws.on('message', function(msg) {
		//ws.send(msg);
		if(_user = "beaglebone"){
			var _m = JSON.parse(msg);
			beaglebone = _m;
      	}
	});

  	ws.on('close', function open() {
  		connects = connects.filter(conn => {
  			var _ret = (conn === ws) ? false : true
	      	return _ret;
	    });
	});


	server.on('message', function (message, remote) {
		var msgResponse="OK";
		connects.forEach(socket => {
			try{
				if(socket['user'] != "beaglebone"){
					socket['ws'].send(""+message);
				}
			}
			catch(err){
				var _ret = (socket === ws) ? false : true
				//console.log(err);
			}
	    });
	});

	/**
  	setInterval(function(){ 
  		
		connects.forEach(socket => {
			try{
				if(socket['user'] != "beaglebone"){
					socket['ws'].send(JSON.stringify(beaglebone));
				}
			}
			catch(err){
				var _ret = (socket === ws) ? false : true
				//console.log(err);
			}
	    });
		
	}, process.env.SOCKET_INTERVAL);
	**/
};


server.bind(PORT, HOST);