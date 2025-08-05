
var connects = [];
var message;

var riserBuffer = {};
module.exports = function (ws, req) {
	connects.push(ws);
	var _ws_open = false;

	var groups = require('../../settings/models/group-config.js');
	groups.getGroupConfigFiles(function (err, data) {
		//console.log(data);
		var _cont = {};
		data.forEach(function (val) {
			var _v = val['content'];
			_cont[_v.GroupID] = _v;
			//ws.send(JSON.stringify({pi_group: (_v.GroupID),MessageType:'GroupConfig', data: _v}));
		});

		try {
			setTimeout(function(){
				if(ws.readyState === 1){
					ws.send(JSON.stringify({ MessageType: 'GroupConfig', data: _cont }));
					let _g = Object.keys(riserBuffer);
					_g.forEach(function(v){
						setTimeout(function(){
							try{
								if(ws.readyState === 1){
									ws.send(riserBuffer[v]);
								}
							}
							catch(err){
								console.log('RISER BUFFER ERR',err);
							}
						},2000);
					})
				}
			},300);
		}
		catch (err) {
			console.log('server socket error');
		}
	});


	ws.on('message', function (msg) {
		//ws.send(msg);
		//console.log(msg);
		message = msg;
		if(JSON.parse(msg).MessageType == "Risers"){
			let _groupPi = JSON.parse(msg).pi_group;
			riserBuffer[_groupPi] = msg;
		}
		connects.forEach(socket => {
			try {
				if(socket.readyState === 1){
					socket.send(message);
				}
			}
			catch (err) {
				var _ret = (socket === ws) ? false : true
				console.log(err);
			}
		});
	});

	ws.on('close', function open() {
		connects = connects.filter(conn => {
			var _ret = (conn === ws) ? false : true
			//console.log(connects.length - 1)
			return _ret;
		});
	});

	ws.on('open', function open() {
		_ws_open = true;

	});

};