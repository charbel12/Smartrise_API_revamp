const LOGGER_MODEL = require("../models/index.js");
const TOOLS = require("../../../helpers/tools.js");
const {
    getCarCalls,
    getHallCalls,
    arrDiff,
    startWait,
    waitTimes,
    getDoorModeOperation,
    inServiceLoop,
    carDoorsCapture,
    floorTfloor,
} = require("../helpers/utils.js");

class SocketLogic {
    constructor() {
        this.prevCarCalls = {};
        this.newCarCalls = {};
        this.prevHallCalls = {};
        this.newHallCalls = {}
        this.cFaults = {};
        this.cAlarms = {};
        this.cServices = {};
        this.carDoors = {};
        this.rearCarDoors = {};
        this.wTimes = {};
        this.currentFloors = {};
        this.currentModes = {
            0: "offline",
            1: "offline",
            2: "offline",
            3: "offline",
            4: "offline",
            5: "offline",
            6: "offline",
            7: "offline",
        };
        this.list_waited_floors = {
            up: [],
            down: [],
        };
        this.is_modified_dad_parameter = true;
        this.dad_parameter_modified_timestamp = 0;
        this._inService = {};

        this.CARS_DATA = [];
        this.updateCarsData();
        setInterval(this.updateCarsData.bind(this), 5000);
    }

    async updateCarsData() {
        try {
            const data = await TOOLS.getRedisKeyValue('cars_parameters_data');
            if (data) {
                this.CARS_DATA = JSON.parse(data);
            } else {
                const { syncFloorsData } = require("../../groups/helpers/carFloors.js");
                this.CARS_DATA = await syncFloorsData();
            }
        } catch (err) {
            console.error("updateCarsData error:", err);
        }
    }

    processMessage(pi_group, pi_ip, data, remoteManager) {
        let _d = {};
        try {
            _d = JSON.parse(data);
        } catch (err) {
            return;
        }

        // Forward to remote if enabled
        if (remoteManager && remoteManager.isEnabled()) {
            remoteManager.broadcast(pi_group, _d.JobID, _d.MessageType, data);
        }

        if (_d.MessageType == "Risers") {
            this.handleRisers(pi_group, _d, pi_ip);
        } else if (_d.MessageType == "Cars") {
            this.handleCars(pi_group, _d, pi_ip);
        }

        // Update global car modes
        LOGGER_MODEL.car_modes = this.currentModes;
    }

    handleRisers(pi_group, _d, pi_ip) {
        // Initialize if not exists
        if (!this.prevHallCalls[pi_group]) this.prevHallCalls[pi_group] = { up: [], down: [] };
        if (!this.newHallCalls[pi_group]) this.newHallCalls[pi_group] = { up: [], down: [] };

        try {
            if (this.CARS_DATA && this.CARS_DATA[0]) {
                this.newHallCalls[pi_group] = getHallCalls(
                    this.CARS_DATA[0],
                    _d.Risers
                );
            }
        } catch (catch_error) { }

        const hcWaitUp = arrDiff(this.newHallCalls[pi_group]["up"], this.prevHallCalls[pi_group]["up"]);
        const hcWaitDown = arrDiff(this.newHallCalls[pi_group]["down"], this.prevHallCalls[pi_group]["down"]);

        if (hcWaitUp.length > 0) waitTimes(pi_group, hcWaitUp, "up", this.list_waited_floors, this.CARS_DATA);
        if (hcWaitDown.length > 0) waitTimes(pi_group, hcWaitDown, "down", this.list_waited_floors, this.CARS_DATA);

        const hallCallDiffUp = arrDiff(this.prevHallCalls[pi_group]["up"], this.newHallCalls[pi_group]["up"]);
        const hallCallDiffDown = arrDiff(this.prevHallCalls[pi_group]["down"], this.newHallCalls[pi_group]["down"]);

        let accept_startUpWait = false;
        let accept_startDownWait = false;

        hallCallDiffUp.forEach((floor) => {
            Object.keys(this.currentFloors).forEach((CarID) => {
                const car = this.currentFloors[CarID];
                if (car.Status != "Offline" && car.CurrentLanding != floor) accept_startUpWait = true;
            });
            if (accept_startUpWait) this.list_waited_floors["up"].push(floor);
        });

        hallCallDiffDown.forEach((floor) => {
            Object.keys(this.currentFloors).forEach((CarID) => {
                const car = this.currentFloors[CarID];
                if (car.Status != "Offline" && car.CurrentLanding != floor) accept_startDownWait = true;
            });
            if (accept_startDownWait) this.list_waited_floors["down"].push(floor);
        });

        if (hallCallDiffUp.length > 0) {
            LOGGER_MODEL.createHallCalls(pi_group, hallCallDiffUp, "up", () => { });
            startWait(pi_group, hallCallDiffUp, "up");
        }
        this.prevHallCalls[pi_group]["up"] = this.newHallCalls[pi_group]["up"];

        if (hallCallDiffDown.length > 0) {
            LOGGER_MODEL.createHallCalls(pi_group, hallCallDiffDown, "down", () => { });
            startWait(pi_group, hallCallDiffDown, "down");
        }
        this.prevHallCalls[pi_group]["down"] = this.newHallCalls[pi_group]["down"];
    }

    handleCars(pi_group, _d, pi_ip) {
        const _cars = _d.Cars;
        this._inService[pi_group] = _cars;
        const first_car = _cars[Object.keys(_cars)[0]];

        if (this.dad_parameter_modified_timestamp != first_car.LastUpdateParameter) {
            this.is_modified_dad_parameter = true;
            this.dad_parameter_modified_timestamp = first_car.LastUpdateParameter;
        } else {
            this.is_modified_dad_parameter = false;
        }

        if (first_car && this.is_modified_dad_parameter) {
             const { syncFloorsData } = require("../../groups/helpers/carFloors.js");
             syncFloorsData().then(() => this.updateCarsData()).catch(e => console.log('sync error', e));
             this.is_modified_dad_parameter = false;
        }

        Object.keys(_cars).forEach((e) => {
            this.currentFloors[_cars[e].CarID] = {
                CarSpeed: _cars[e].CarSpeed,
                CurrentLanding: _cars[e].CurrentLanding,
                ModeOfOperation: _cars[e].ModeOfOperation,
                ClassOfOperation: _cars[e].ClassOfOperation,
                Status: getDoorModeOperation(
                    _cars[e].ClassOfOperation,
                    _cars[e].ModeOfOperation
                ),
            };

            const car_mode = getDoorModeOperation(
                _cars[e].ClassOfOperation,
                _cars[e].ModeOfOperation
            );
            this.currentModes[_cars[e].CarID] = car_mode;

            // Initialize calls
            if (!this.prevCarCalls[pi_group]) this.prevCarCalls[pi_group] = {};
            if (!this.prevCarCalls[pi_group][_cars[e].CarID]) this.prevCarCalls[pi_group][_cars[e].CarID] = [];

            if (!this.newCarCalls[pi_group]) this.newCarCalls[pi_group] = {};
            // DO NOT OVERWRITE newCarCalls with [] AFTER IT HAS BEEN SET.
            // But wait, it's just initializing to [] so it's fine.
            this.newCarCalls[pi_group][_cars[e].CarID] = [];

            try {
                if (
                    this.CARS_DATA &&
                    this.CARS_DATA[_cars[e].CarID]
                ) {
                    this.newCarCalls[pi_group][_cars[e].CarID] = getCarCalls(
                        this.CARS_DATA[_cars[e].CarID],
                        _cars[e]
                    );
                } else {
                    console.log(`[DEBUG] Skipped getCarCalls for CarID: ${_cars[e].CarID}. File conditions not met.`);
                }
            } catch (catch_error) { 
                console.log('[DEBUG] Error getting car calls:', catch_error);
            }

            const carCallDiff = arrDiff(
                this.prevCarCalls[pi_group][_cars[e].CarID],
                this.newCarCalls[pi_group][_cars[e].CarID]
            );

            console.log(`[DEBUG] CarID: ${_cars[e].CarID}, newCarCalls:`, this.newCarCalls[pi_group][_cars[e].CarID]);
            console.log(`[DEBUG] CarID: ${_cars[e].CarID}, prevCarCalls:`, this.prevCarCalls[pi_group][_cars[e].CarID]);
            console.log(`[DEBUG] CarID: ${_cars[e].CarID}, carCallDiff:`, carCallDiff);

            if (carCallDiff.length > 0) {
                LOGGER_MODEL.createCarCalls(_cars[e].CarID + 1, pi_group, carCallDiff, () => { });
            }
            this.prevCarCalls[pi_group][_cars[e].CarID] = this.newCarCalls[pi_group][_cars[e].CarID];

            // Services
            if (!this.cServices[pi_group]) this.cServices[pi_group] = {};
            if (!this.cServices[pi_group][_cars[e].CarID + 1]) {
                this.cServices[pi_group][_cars[e].CarID + 1] = {
                    ClassOfOperation: {},
                    ModeOfOperation: {},
                };
            }
            this.cServices[pi_group][_cars[e].CarID + 1]["ClassOfOperation"]["new"] = _cars[e].ClassOfOperation;
            this.cServices[pi_group][_cars[e].CarID + 1]["ModeOfOperation"]["new"] = _cars[e].ModeOfOperation;

            if (_cars[e].Faults === 0) {
                if (
                    this.cServices[pi_group][_cars[e].CarID + 1]["ClassOfOperation"]["prev"] !=
                    this.cServices[pi_group][_cars[e].CarID + 1]["ClassOfOperation"]["new"] ||
                    this.cServices[pi_group][_cars[e].CarID + 1]["ModeOfOperation"]["prev"] !=
                    this.cServices[pi_group][_cars[e].CarID + 1]["ModeOfOperation"]["new"]
                ) {
                    this.cServices[pi_group][_cars[e].CarID + 1]["ClassOfOperation"]["prev"] =
                        this.cServices[pi_group][_cars[e].CarID + 1]["ClassOfOperation"]["new"];
                    this.cServices[pi_group][_cars[e].CarID + 1]["ModeOfOperation"]["prev"] =
                        this.cServices[pi_group][_cars[e].CarID + 1]["ModeOfOperation"]["new"];
                }
            } else {
                this.cServices[pi_group][_cars[e].CarID + 1]["ModeOfOperation"]["prev"] = "faulted";
            }

            carDoorsCapture(pi_group, _cars, e, this.carDoors, this.rearCarDoors);
            floorTfloor(pi_group, _cars, e);
        });
    }

    resetServiceForGroup(pi_group) {
        try {
            for (var x = 1; x <= 8; x++) {
                if (!this.cServices[pi_group]) this.cServices[pi_group] = {};
                LOGGER_MODEL.createServices(x, pi_group, 0, -2, -2, function () { });
            }
        } catch (err) { }
    }
}

module.exports = new SocketLogic();
