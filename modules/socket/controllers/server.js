
var connects = [];
var message;

var riserBuffer = {};

const broadcast = (data) => {
	connects.forEach(socket => {
		try {
			if (socket.readyState === 1) {
				socket.send(typeof data === 'string' ? data : JSON.stringify(data));
			}
		}
		catch (err) {

		}
	});
};

const handleConnection = function (ws, req) {
	connects.push(ws);
	var _ws_open = false;

	var groups = require('../../settings/models/group-config.js');
	groups.getGroupConfigFiles(function (err, data) {

		var _cont = {};
		data.forEach(function (val) {
			var _v = val['content'];
			_cont[_v.GroupID] = _v;
			//ws.send(JSON.stringify({pi_group: (_v.GroupID),MessageType:'GroupConfig', data: _v}));
		});

	});


	ws.on('message', function (msg) {
		message = msg;
		if (JSON.parse(msg).MessageType == "Risers") {
			let _groupPi = JSON.parse(msg).pi_group;
			riserBuffer[_groupPi] = msg;
		}
		connects.forEach(socket => {
			try {
				if (socket.readyState === 1) {
					socket.send(message);
				}
			}
			catch (err) {
				var _ret = (socket === ws) ? false : true

			}
		});
	});

	ws.on('close', function open() {
		connects = connects.filter(conn => {
			var _ret = (conn === ws) ? false : true
			return _ret;
		});
	});

	ws.on('open', function open() {
		_ws_open = true;

	});

};

module.exports = handleConnection;
module.exports.broadcast = broadcast;