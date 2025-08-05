const moment = require('moment');
const MOMENT_RANGE = require('moment-range')
const MOMENT = MOMENT_RANGE.extendMoment(moment)
const { execSync } = require("child_process");

var groups = require('../modules/settings/models/group-config.js');

function reformatPiLabels(selectedGroup, data, car_count, car_landing_offsets) {
	var new_data = []
	for (let index = 0; index < data.length; index++) {
		var floor_index = index;
		var floor_obj = {carIndex: data[index]["carIndex"], cars: ["", "", "","", "", "","", ""]}
        for (let car_index = 0; car_index < car_count; car_index++) {
            var _offset = car_landing_offsets[car_index];
			if (floor_index < _offset) {
				var label = {value: ""}
			} else if (floor_index - _offset < 0) {
				var label = {value: ""}
			} else {
                var label = data[floor_index - _offset]["cars"][car_index] 
			}
			floor_obj["cars"][car_index] = label
		}
		new_data.push(floor_obj)
	}
	return new_data
}

module.exports = {
    getAllGroupCarLabels: function (callback=null) {
        groups.getGroupConfigFiles(function(err,files){
            var all_labels = {}
            for (let group_index = 0; group_index < files.length; group_index++) {
                if (! all_labels.hasOwnProperty(group_index)) {
                    all_labels[group_index] = []
                }
                var cars = files[group_index].content.Cars
                for (let car_index = 0; car_index < cars.length; car_index++) {
                    const car = cars[car_index];
                    all_labels[group_index].push(car.Label)
                }
            }
            callback(all_labels);
        })
    },
    getAllGroupPiLabels: function (callback=null) {
        groups.getGroupConfigFiles(function(err,files){
            var all_labels = {}
            var max_floors=96;
            for (let group_index = 0; group_index < files.length; group_index++) {
                if (! all_labels.hasOwnProperty(group_index)) {
                    all_labels[group_index] = []
                }
                try {
                    var parameters_request_data = execSync("redis-cli -h redis_lm get requests:" + (group_index+1) + ":arrayparameters")
                    parameters_request_data = JSON.parse(parameters_request_data)
                    car_landing_offsets = []
                    for (let c = 0; c < 8; c++) {
                        landing_offset = parameters_request_data["8:174"]["value"+(c +1)]
                        if (landing_offset == "") {
                            landing_offset = 0;
                        }
                        car_landing_offsets[c] = parseInt(landing_offset)
                    }
                    max_floor_count = 0
                    for (let index = 0; index < 8; index++) {
                        c = index +1
                        fl_count = parameters_request_data["8:92"]["value"+c]
                        if (fl_count != "" && parseInt(fl_count) > max_floor_count) {
                            max_floor_count = parseInt(fl_count)
                        }
                    }
                    var car_request_data = execSync("redis-cli -h redis_lm get requests:" + (group_index+1) + ":settings")
                    nbr_cars = JSON.parse(car_request_data)["number_of_cars"]
                    var pi_request_data = execSync("redis-cli -h redis_lm get requests:" + (group_index+1) + ":cars_with_offset")
                    pi_labels = JSON.parse(pi_request_data);
                    cars_floors = []
                    pi_labels = reformatPiLabels(group_index, pi_labels, nbr_cars, car_landing_offsets).slice(0, max_floor_count)
                    pi_labels.forEach(pi_floor => {
                        try {
                            var unq = []
                            pi_floor.cars.slice(0, nbr_cars).forEach(pi_floor_label => {
                                if (parseInt(pi_floor.carIndex) < max_floor_count && pi_floor_label.value != "") {
                                    unq.push(pi_floor_label.value)
                                }
                            })
                            cars_floors[pi_floor.carIndex] = {
                                Pi: unq[0],
                                DoorSide:0
                            };
                        } catch (e) {}
                    })
                    all_labels[group_index] = cars_floors
                } catch (error) {
                }
            }
            callback(all_labels);
        })
    }

}