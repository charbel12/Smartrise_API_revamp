
var connects = [];
var beaglebone = [{"message":"not connected"}];

module.exports = function(ws, req) {
	var _user = req.params.user;

	connects.push({"user":_user,"ws": ws});

	ws.on('message', function(msg) {
		//ws.send(msg);
		//console.log(msg);
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
	

};