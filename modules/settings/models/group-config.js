const { dirname } = require('path');
var mysql = require('../../../helpers/mysqlConnector.js')
const TOOLS = require('../../../helpers/tools.js');
const { exec } = require("child_process");
const axios = require('axios');

module.exports = {
	getGroup: function(id, callback = null) {
		const fs = require('fs');
		var _path = process.env.SETTINGS_GROUP_LOCATION + '/' + id;
		try {
			if (fs.existsSync(_path)) {
				fs.readFile(_path, {
					encoding: 'utf-8'
				}, (err, fd) => {
					callback(err, JSON.parse(fd));
				});
			} else {
				callback(err, {});
			}
		} catch (err) {
			callback(err, {});
		}
	},
	getGroupConfigFiles: function(callback) {
		var fs = require('fs');
		var _files = [];
		var carcall_specialFeature = process.env.SPECIAL_FEATURE_CARCALL;
		var hallcall_specialFeature = process.env.SPECIAL_FEATURE_HALLCALL;
		var dirname = process.env.SETTINGS_GROUP_LOCATION + '/';
		fs.readdir(dirname, function(err, filenames) {
			if (err) {
				//onError(err);
				callback(err, []);
				return;
			}
			filenames.forEach(function(filename, index) {
				try {

					fs.readFile(dirname + filename, 'utf-8', function(err, content) {
						content = JSON.parse(content)
						content['carcall_specialFeature'] = carcall_specialFeature
						content['hallcall_specialFeature'] = hallcall_specialFeature
						if (err) {
							//onError(err);
							callback(err, []);
							return;
						}

						_files.push({
							file: filename,
							content: content
						});

						if (filenames.length == _files.length) {
							callback(null, _files);
							return;
						}
					});
				} catch (err) {
					console.log(err);
				}
			});
		});
	},
	getPiConfig: async function() {
		var filename = process.env.SETTINGS_PI_LOCATION;

		const files = await fileReader(filename);

		if(files){
			return JSON.parse(files);
		}else{
			return null;
		}
	},
	getGroupStructured: function(callback) {
		var fs = require('fs');
		var _files = {};
		var dirname = process.env.SETTINGS_GROUP_LOCATION + '/';
		fs.readdir(dirname, function(err, filenames) {
			if (err) {
				//onError(err);
				callback(err, []);
				return;
			}
			filenames.forEach(function(filename, index) {
				fs.readFile(dirname + filename, 'utf-8', function(err, content) {
					if (err) {
						//onError(err);
						callback(err, []);
						return;
					}
					var _c = JSON.parse(content);
					_files[_c.GroupID] = _c;

					if (filenames.length - 1 == index) {
						callback(null, _files);
					}
				});
			});
		});
	},
	restore: function(callback) {
		const path = require('path');
		var fs = require('fs');
		var id = "1"
		var fileName = process.env.SETTINGS_GROUP_LOCATION + "/Group" + id + ".json";
		var piFileName = process.env.SETTINGS_PI_LOCATION;
		var _groupFile = {"MessageType":"GroupConfig","JobName":"Generic JOB ","JobNumber":"","JobID":5387,"SiteID":0,"ContractSpeed":200,"NumberOfFloors":192,"NumberOfCars":4,"Cars":[{"Id":1,"TotalHeight":0,"NumberOfFloors":48,"FloorArray":[{"Pi":"G","DoorSide":2,"GroupFloorID":0},{"Pi":"2","DoorSide":2,"GroupFloorID":1},{"Pi":"3","DoorSide":2,"GroupFloorID":2},{"Pi":"3A","DoorSide":2,"GroupFloorID":3},{"Pi":"4","DoorSide":2,"GroupFloorID":4},{"Pi":"6","DoorSide":2,"GroupFloorID":5},{"Pi":"7","DoorSide":2,"GroupFloorID":6},{"Pi":"8","DoorSide":2,"GroupFloorID":7},{"Pi":"9","DoorSide":2,"GroupFloorID":8},{"Pi":"10","DoorSide":2,"GroupFloorID":9},{"Pi":"11","DoorSide":2,"GroupFloorID":10},{"Pi":"12","DoorSide":2,"GroupFloorID":11},{"Pi":"13","DoorSide":2,"GroupFloorID":12},{"Pi":"14","DoorSide":2,"GroupFloorID":13},{"Pi":"15","DoorSide":2,"GroupFloorID":14},{"Pi":"16","DoorSide":2,"GroupFloorID":15},{"Pi":"17","DoorSide":2,"GroupFloorID":16},{"Pi":"18","DoorSide":2,"GroupFloorID":17},{"Pi":"19","DoorSide":2,"GroupFloorID":18},{"Pi":"20","DoorSide":2,"GroupFloorID":19},{"Pi":"21","DoorSide":2,"GroupFloorID":20},{"Pi":"22","DoorSide":2,"GroupFloorID":21},{"Pi":"23","DoorSide":2,"GroupFloorID":22},{"Pi":"24","DoorSide":2,"GroupFloorID":23},{"Pi":"25","DoorSide":2,"GroupFloorID":24},{"Pi":"26","DoorSide":2,"GroupFloorID":25},{"Pi":"27","DoorSide":2,"GroupFloorID":26},{"Pi":"28","DoorSide":2,"GroupFloorID":27},{"Pi":"29","DoorSide":2,"GroupFloorID":28},{"Pi":"30","DoorSide":2,"GroupFloorID":29},{"Pi":"31","DoorSide":2,"GroupFloorID":30},{"Pi":"32","DoorSide":2,"GroupFloorID":31},{"Pi":"33","DoorSide":2,"GroupFloorID":32},{"Pi":"34","DoorSide":2,"GroupFloorID":33},{"Pi":"35","DoorSide":2,"GroupFloorID":34},{"Pi":"36","DoorSide":2,"GroupFloorID":35},{"Pi":"37","DoorSide":2,"GroupFloorID":36},{"Pi":"38","DoorSide":2,"GroupFloorID":37},{"Pi":"39","DoorSide":2,"GroupFloorID":38},{"Pi":"40","DoorSide":2,"GroupFloorID":39},{"Pi":"41","DoorSide":2,"GroupFloorID":40},{"Pi":"42","DoorSide":2,"GroupFloorID":41},{"Pi":"43","DoorSide":2,"GroupFloorID":42},{"Pi":"44","DoorSide":2,"GroupFloorID":43},{"Pi":"45","DoorSide":2,"GroupFloorID":44},{"Pi":"46","DoorSide":2,"GroupFloorID":45},{"Pi":"47","DoorSide":2,"GroupFloorID":46},{"Pi":"48","DoorSide":2,"GroupFloorID":47}],"NumDoors":"1","GroupLandingOffset":"0"},{"Id":2,"TotalHeight":0,"NumberOfFloors":48,"FloorArray":[{"Pi":"G","DoorSide":2,"GroupFloorID":0},{"Pi":"2","DoorSide":2,"GroupFloorID":1},{"Pi":"3","DoorSide":2,"GroupFloorID":2},{"Pi":"3A","DoorSide":2,"GroupFloorID":3},{"Pi":"4","DoorSide":2,"GroupFloorID":4},{"Pi":"6","DoorSide":2,"GroupFloorID":5},{"Pi":"7","DoorSide":2,"GroupFloorID":6},{"Pi":"8","DoorSide":2,"GroupFloorID":7},{"Pi":"9","DoorSide":2,"GroupFloorID":8},{"Pi":"10","DoorSide":2,"GroupFloorID":9},{"Pi":"11","DoorSide":2,"GroupFloorID":10},{"Pi":"12","DoorSide":2,"GroupFloorID":11},{"Pi":"13","DoorSide":2,"GroupFloorID":12},{"Pi":"14","DoorSide":2,"GroupFloorID":13},{"Pi":"15","DoorSide":2,"GroupFloorID":14},{"Pi":"16","DoorSide":2,"GroupFloorID":15},{"Pi":"17","DoorSide":2,"GroupFloorID":16},{"Pi":"18","DoorSide":2,"GroupFloorID":17},{"Pi":"19","DoorSide":2,"GroupFloorID":18},{"Pi":"20","DoorSide":2,"GroupFloorID":19},{"Pi":"21","DoorSide":2,"GroupFloorID":20},{"Pi":"22","DoorSide":2,"GroupFloorID":21},{"Pi":"23","DoorSide":2,"GroupFloorID":22},{"Pi":"24","DoorSide":2,"GroupFloorID":23},{"Pi":"25","DoorSide":2,"GroupFloorID":24},{"Pi":"26","DoorSide":2,"GroupFloorID":25},{"Pi":"27","DoorSide":2,"GroupFloorID":26},{"Pi":"28","DoorSide":2,"GroupFloorID":27},{"Pi":"29","DoorSide":2,"GroupFloorID":28},{"Pi":"30","DoorSide":2,"GroupFloorID":29},{"Pi":"31","DoorSide":2,"GroupFloorID":30},{"Pi":"32","DoorSide":2,"GroupFloorID":31},{"Pi":"33","DoorSide":2,"GroupFloorID":32},{"Pi":"34","DoorSide":2,"GroupFloorID":33},{"Pi":"35","DoorSide":2,"GroupFloorID":34},{"Pi":"36","DoorSide":2,"GroupFloorID":35},{"Pi":"37","DoorSide":2,"GroupFloorID":36},{"Pi":"38","DoorSide":2,"GroupFloorID":37},{"Pi":"39","DoorSide":2,"GroupFloorID":38},{"Pi":"40","DoorSide":2,"GroupFloorID":39},{"Pi":"41","DoorSide":2,"GroupFloorID":40},{"Pi":"42","DoorSide":2,"GroupFloorID":41},{"Pi":"43","DoorSide":2,"GroupFloorID":42},{"Pi":"44","DoorSide":2,"GroupFloorID":43},{"Pi":"45","DoorSide":2,"GroupFloorID":44},{"Pi":"46","DoorSide":2,"GroupFloorID":45},{"Pi":"47","DoorSide":2,"GroupFloorID":46},{"Pi":"48","DoorSide":2,"GroupFloorID":47}],"NumDoors":"1","GroupLandingOffset":"0"},{"Id":3,"TotalHeight":0,"NumberOfFloors":48,"FloorArray":[{"Pi":"G","DoorSide":2,"GroupFloorID":0},{"Pi":"2","DoorSide":2,"GroupFloorID":1},{"Pi":"3","DoorSide":2,"GroupFloorID":2},{"Pi":"3A","DoorSide":2,"GroupFloorID":3},{"Pi":"4","DoorSide":2,"GroupFloorID":4},{"Pi":"6","DoorSide":2,"GroupFloorID":5},{"Pi":"7","DoorSide":2,"GroupFloorID":6},{"Pi":"8","DoorSide":2,"GroupFloorID":7},{"Pi":"9","DoorSide":2,"GroupFloorID":8},{"Pi":"10","DoorSide":2,"GroupFloorID":9},{"Pi":"11","DoorSide":2,"GroupFloorID":10},{"Pi":"12","DoorSide":2,"GroupFloorID":11},{"Pi":"13","DoorSide":2,"GroupFloorID":12},{"Pi":"14","DoorSide":2,"GroupFloorID":13},{"Pi":"15","DoorSide":2,"GroupFloorID":14},{"Pi":"16","DoorSide":2,"GroupFloorID":15},{"Pi":"17","DoorSide":2,"GroupFloorID":16},{"Pi":"18","DoorSide":2,"GroupFloorID":17},{"Pi":"19","DoorSide":2,"GroupFloorID":18},{"Pi":"20","DoorSide":2,"GroupFloorID":19},{"Pi":"21","DoorSide":2,"GroupFloorID":20},{"Pi":"22","DoorSide":2,"GroupFloorID":21},{"Pi":"23","DoorSide":2,"GroupFloorID":22},{"Pi":"24","DoorSide":2,"GroupFloorID":23},{"Pi":"25","DoorSide":2,"GroupFloorID":24},{"Pi":"26","DoorSide":2,"GroupFloorID":25},{"Pi":"27","DoorSide":2,"GroupFloorID":26},{"Pi":"28","DoorSide":2,"GroupFloorID":27},{"Pi":"29","DoorSide":2,"GroupFloorID":28},{"Pi":"30","DoorSide":2,"GroupFloorID":29},{"Pi":"31","DoorSide":2,"GroupFloorID":30},{"Pi":"32","DoorSide":2,"GroupFloorID":31},{"Pi":"33","DoorSide":2,"GroupFloorID":32},{"Pi":"34","DoorSide":2,"GroupFloorID":33},{"Pi":"35","DoorSide":2,"GroupFloorID":34},{"Pi":"36","DoorSide":2,"GroupFloorID":35},{"Pi":"37","DoorSide":2,"GroupFloorID":36},{"Pi":"38","DoorSide":2,"GroupFloorID":37},{"Pi":"39","DoorSide":2,"GroupFloorID":38},{"Pi":"40","DoorSide":2,"GroupFloorID":39},{"Pi":"41","DoorSide":2,"GroupFloorID":40},{"Pi":"42","DoorSide":2,"GroupFloorID":41},{"Pi":"43","DoorSide":2,"GroupFloorID":42},{"Pi":"44","DoorSide":2,"GroupFloorID":43},{"Pi":"45","DoorSide":2,"GroupFloorID":44},{"Pi":"46","DoorSide":2,"GroupFloorID":45},{"Pi":"47","DoorSide":2,"GroupFloorID":46},{"Pi":"48","DoorSide":2,"GroupFloorID":47}],"NumDoors":"1","GroupLandingOffset":"0"},{"Id":4,"TotalHeight":0,"NumberOfFloors":48,"FloorArray":[{"Pi":"G","DoorSide":2,"GroupFloorID":0},{"Pi":"2","DoorSide":2,"GroupFloorID":1},{"Pi":"3","DoorSide":2,"GroupFloorID":2},{"Pi":"3A","DoorSide":2,"GroupFloorID":3},{"Pi":"4","DoorSide":2,"GroupFloorID":4},{"Pi":"6","DoorSide":2,"GroupFloorID":5},{"Pi":"7","DoorSide":2,"GroupFloorID":6},{"Pi":"8","DoorSide":2,"GroupFloorID":7},{"Pi":"9","DoorSide":2,"GroupFloorID":8},{"Pi":"10","DoorSide":2,"GroupFloorID":9},{"Pi":"11","DoorSide":2,"GroupFloorID":10},{"Pi":"12","DoorSide":2,"GroupFloorID":11},{"Pi":"13","DoorSide":2,"GroupFloorID":12},{"Pi":"14","DoorSide":2,"GroupFloorID":13},{"Pi":"15","DoorSide":2,"GroupFloorID":14},{"Pi":"16","DoorSide":2,"GroupFloorID":15},{"Pi":"17","DoorSide":2,"GroupFloorID":16},{"Pi":"18","DoorSide":2,"GroupFloorID":17},{"Pi":"19","DoorSide":2,"GroupFloorID":18},{"Pi":"20","DoorSide":2,"GroupFloorID":19},{"Pi":"21","DoorSide":2,"GroupFloorID":20},{"Pi":"22","DoorSide":2,"GroupFloorID":21},{"Pi":"23","DoorSide":2,"GroupFloorID":22},{"Pi":"24","DoorSide":2,"GroupFloorID":23},{"Pi":"25","DoorSide":2,"GroupFloorID":24},{"Pi":"26","DoorSide":2,"GroupFloorID":25},{"Pi":"27","DoorSide":2,"GroupFloorID":26},{"Pi":"28","DoorSide":2,"GroupFloorID":27},{"Pi":"29","DoorSide":2,"GroupFloorID":28},{"Pi":"30","DoorSide":2,"GroupFloorID":29},{"Pi":"31","DoorSide":2,"GroupFloorID":30},{"Pi":"32","DoorSide":2,"GroupFloorID":31},{"Pi":"33","DoorSide":2,"GroupFloorID":32},{"Pi":"34","DoorSide":2,"GroupFloorID":33},{"Pi":"35","DoorSide":2,"GroupFloorID":34},{"Pi":"36","DoorSide":2,"GroupFloorID":35},{"Pi":"37","DoorSide":2,"GroupFloorID":36},{"Pi":"38","DoorSide":2,"GroupFloorID":37},{"Pi":"39","DoorSide":2,"GroupFloorID":38},{"Pi":"40","DoorSide":2,"GroupFloorID":39},{"Pi":"41","DoorSide":2,"GroupFloorID":40},{"Pi":"42","DoorSide":2,"GroupFloorID":41},{"Pi":"43","DoorSide":2,"GroupFloorID":42},{"Pi":"44","DoorSide":2,"GroupFloorID":43},{"Pi":"45","DoorSide":2,"GroupFloorID":44},{"Pi":"46","DoorSide":2,"GroupFloorID":45},{"Pi":"47","DoorSide":2,"GroupFloorID":46},{"Pi":"48","DoorSide":2,"GroupFloorID":47}],"NumDoors":"1","GroupLandingOffset":"0"}],"GroupID":"1","location":"192.168.4.1:9100","FileName":"config_all_Generic_JOB_Group_1.h"}

		var _piFile = {
			"data":[{
				"GroupID": "1",
				"JobID": "5387",
				"JobName": "Generic JOB",
				"location": "192.168.4.1:9100",
				"FileName": "config_all_Generic_JOB_Group_1.h"
			}]
		}

		fs.readdir(process.env.SETTINGS_GROUP_LOCATION, (err, files) => {
			if (err) throw err;
			fs.unlink(piFileName, err => {
				if (err) throw err;
			});
			for (const file of files) {
				fs.unlink(path.join(process.env.SETTINGS_GROUP_LOCATION, file), err => {
					if (err) throw err;
				});
			}
			setTimeout(() => {
				fs.writeFileSync(piFileName, JSON.stringify(_piFile));
				fs.writeFileSync(fileName, JSON.stringify(_groupFile));
			}, 1000);
		});

		exec("rm -rf /files/Smartrise_Local_Monitor/SMARTRISE_API/configs/", (error, stdout, stderr) => {
			exec("cp -r /data/default_configs/ /files/Smartrise_Local_Monitor/SMARTRISE_API/configs/", (error, stdout, stderr) => {
				exec("redis-cli -h redis_lm --raw keys \"*\" | xargs redis-cli -h redis_lm del 2>&1 1>/dev/null", (error, stdout, stderr) => {
					callback("", "success")
				});
			});
		});

	},
	update: async function(all_config, callback) {
		const path = require('path');
		var fs = require('fs');

		var piFileName = process.env.SETTINGS_PI_LOCATION;
		var _piFile = {"data":[]}

		var current_piFile = JSON.parse(await readFile('configs/pi/pi.json'));
		var current_group_count = current_piFile["data"].length

		Object.keys(all_config).forEach(async function(_id) {
			_id = parseInt(_id)
			var group_index = _id
			var body = all_config[group_index]
			_id = _id + 1

			

			var fileName = process.env.SETTINGS_GROUP_LOCATION + "/Group" + _id + ".json";

			var file;
			
			if ( group_index < current_group_count) {
				current_piFile["data"][group_index]["GroupID"] = group_index + 1 + ""
				current_piFile["data"][group_index]["location"] = body["location"]
				if (body["FileName"] != "") {
					current_piFile["data"][group_index]["JobID"] = body["JobID"]
					current_piFile["data"][group_index]["JobName"] = body["JobName"]
					current_piFile["data"][group_index]["FileName"] = body["FileName"]
					file = JSON.parse(await readFile("configs/groups/Group" + body["GroupID"] + ".json"));
					file.JobName =  body["JobName"]
					file.GroupID = body["GroupID"]
					file.JobID = body["JobID"]
					file.FileName = body["FileName"]
					file.location = body["location"];	
					file.Cars = body["Cars"]		
					fs.writeFileSync(fileName, JSON.stringify(file), {
						flag: "w"
					});					
				} else {
					file = JSON.parse(await readFile("configs/groups/Group" + body["GroupID"] + ".json"));
					file.location = body["location"];	
					file.GroupID = group_index + 1 + ""
					current_piFile["data"][group_index]["FileName"] = file["FileName"]
					current_piFile["data"][group_index]["JobID"] = file["JobID"]
					current_piFile["data"][group_index]["JobName"] = file["JobName"]
					fs.writeFileSync(fileName, JSON.stringify(file), {
						flag: "w"
					});
				}
			} else {
				current_piFile["data"].push({
					GroupID: _id,
					JobName: body["JobName"],
					JobID: body["JobID"],
					location: body["location"],
					FileName: body["FileName"]
				})
				file = JSON.parse(await readFile("configs/groups/Group1.json"));
				file.JobName =  body["JobName"]
				file.GroupID =  body["GroupID"]
				file.JobID = body["JobID"]
				file.FileName = body["FileName"]
				file.location = body["location"];	
				file.Cars = body["Cars"]
				const create = await createFile(fileName);
				fs.writeFileSync(fileName, JSON.stringify(file));
			}
			if (_id == Object.keys(all_config).length) {
				current_piFile["data"] = current_piFile["data"].splice(0, Object.keys(all_config).length)
				fs.writeFileSync(piFileName, JSON.stringify(current_piFile), {
					flag: "w"
				});
				for (let index = _id + 1; index <= 8; index++) {
					if (fs.existsSync(process.env.SETTINGS_GROUP_LOCATION + "/Group" + index + ".json")) {
						fs.unlinkSync(process.env.SETTINGS_GROUP_LOCATION + "/Group" + index + ".json")
					}
				}
				exec("redis-cli -h redis_lm --raw keys \"*\" | xargs redis-cli -h redis_lm del 2>&1 1>/dev/null", (error, stdout, stderr) => {
					callback("", "success")
				});
			}
		})
	}

}

function readFile(_dir) {
	const path = require('path');
	var fs = require('fs');

	return new Promise(resolve => {
		fs.readFile(_dir, 'utf8', function(err, content) {
			if (err) {
				console.log("File read failed:", err)
				return
			}

			resolve(content);

		});
	});;
}

const fileReader = async (dir) => {
	const fs = require('fs');
	let result;

	try {
		result = fs.readFileSync(dir);
	} catch (err) {
		result = null;
	}

	return result;
}

const createFile = async (filename) => {
	const fs = require('fs');
	try {
		const create = fs.createWriteStream(filename);
		create.end();
		return create;
	} catch (err) {
		throw err.message
	}
}

const updateFile = async (data) => {

	try {
		await updatePiFile(data).then(async () => {
			const result = await updateGroupFile(data);

			if (result) {
				// if(process.env.APP_ENV === "production"){
				// 	const { exec } = require("child_process");

				// 	exec(`sudo npm restart`, (error, stdout, stderr) =>{
				// 		if (error) {
				// 			console.log(`error: ${error.message}`);
				// 			return;
				// 		}
				// 		if (stderr) {
				// 			console.log(`stderr: ${stderr}`);
				// 			return;
				// 	    	}
				// 	    console.log(`********************************`);
				// 	    console.log(`> RESTARTING THE API: ${stdout}`);
				// 	    console.log(`********************************`);
				// 	  });
				// }
				return true;
			}
		});
	} catch (err) {
		throw err.message;
	}
}

const updatePiFile = async (data) => {
	const fs = require('fs');
	try {
		fs.writeFileSync(data.piFileName, JSON.stringify(data._piFile), {
			flag: "w"
		});
		return true;
	} catch (err) {
		throw err.message;
	}
}

const updateGroupFile = async (data) => {
	const fs = require('fs');
	try {
		fs.writeFileSync(data.fileName, JSON.stringify(data.body), {
			flag: "w"
		});
		return true;
	} catch (err) {
		throw err.message;
	}
}