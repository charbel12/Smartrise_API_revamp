const LOGGER_MODEL = require("../models/index.js");

var wTimes = {};
var _inService = {};

function getCarCalls(carfloor, data) {
  var floorsSelected = [];
  var _offset = parseInt(data["GroupLandingOffset"]);
  var First33CallsFront = data["CarCallsF0"];
  var Second33CallsFront = data["CarCallsF1"];
  var Third33CallsFront = data["CarCallsF2"];

  var First33CallsRear = data["CarCallsR0"];
  var Second33CallsRear = data["CarCallsR1"];
  var Third33CallsRear = data["CarCallsR2"];

  var buttonLength = carfloor.length + _offset;
  for (var i = 0; i < buttonLength; i++) {
    var latchedFront = 0;
    var latchedRear = 0;

    if (i < 32) {
      latchedFront = parseInt(First33CallsFront >> i) & 0x01;
      latchedRear = parseInt(First33CallsRear >> i) & 0x01;
    } else if (i < 64) {
      latchedFront = parseInt(Second33CallsFront >> (i - 32)) & 0x01;
      latchedRear = parseInt(Second33CallsRear >> (i - 32)) & 0x01;
    } else {
      latchedFront = parseInt(Third33CallsFront >> (i - 64)) & 0x01;
      latchedRear = parseInt(Third33CallsRear >> (i - 64)) & 0x01;
    }

    var frontButton = i;
    var rearButton = i;

    if (latchedFront === 1) {
      floorsSelected.push(frontButton);
    }
    if (latchedRear === 1) {
      floorsSelected.push(rearButton);
    }
  }

  return floorsSelected;
}

function getHallCalls(carfloor, data) {
  var floorsSelected = {
    up: [],
    down: [],
  };

  //FRONT
  var firstUpHallCalls = data["HallCallsF0Up"];
  var secondUpHallCalls = data["HallCallsF1Up"];
  var thirdUpHallCalls = data["HallCallsF2Up"];

  var firstDownHallCalls = data["HallCallsF0Down"];
  var secondDownHallCalls = data["HallCallsF1Down"];
  var thirdDownHallCalls = data["HallCallsF2Down"];

  //REAR
  var rearfirstUpHallCalls = data["HallCallsR0Up"];
  var rearsecondUpHallCalls = data["HallCallsR1Up"];
  var rearthirdUpHallCalls = data["HallCallsR2Up"];

  var rearfirstDownHallCalls = data["HallCallsR0Down"];
  var rearsecondDownHallCalls = data["HallCallsR1Down"];
  var rearthirdDownHallCalls = data["HallCallsR2Down"];

  //FRONT
  var upLatched = 0;
  var downLatched = 0;

  //REAR
  var upLatchedRear = 0;
  var downLatchedRear = 0;

  var buttonsCount = carfloor.length + 1;

  for (var i = 0; i < buttonsCount; i++) {
    if (i < 32) {
      upLatched = parseInt(firstUpHallCalls >> i) & 0x01;
      downLatched = parseInt(firstDownHallCalls >> i) & 0x01;

      upLatchedRear = parseInt(rearfirstUpHallCalls >> i) & 0x01;
      downLatchedRear = parseInt(rearfirstDownHallCalls >> i) & 0x01;
    } else if (i < 64) {
      upLatched = parseInt(secondUpHallCalls >> (i - 32)) & 0x01;
      downLatched = parseInt(secondDownHallCalls >> (i - 32)) & 0x01;

      upLatchedRear = parseInt(rearsecondUpHallCalls >> i) & 0x01;
      downLatchedRear = parseInt(rearsecondDownHallCalls >> i) & 0x01;
    } else {
      upLatched = parseInt(thirdUpHallCalls >> (i - 64)) & 0x01;
      downLatched = parseInt(thirdDownHallCalls >> (i - 64)) & 0x01;

      upLatchedRear = parseInt(rearthirdUpHallCalls >> i) & 0x01;
      downLatchedRear = parseInt(rearthirdDownHallCalls >> i) & 0x01;
    }

    var buttonUp = i;

    if (upLatched === 1 || upLatchedRear === 1) {
      floorsSelected["up"].push(i);
    }

    var buttonDown = i;

    if (downLatched === 1 || downLatchedRear === 1) {
      floorsSelected["down"].push(i);
    }
  }

  return floorsSelected;
}

function arrDiff(prevArr, newArr) {
  return newArr.filter(function (i) {
    return prevArr.indexOf(i) < 0;
  });
}

function carDoorsCapture(pi_group, _cars, e, carDoors, rearCarDoors) {
  //CarDoors
  if (!carDoors[pi_group]) {
    carDoors[pi_group] = {};
  }
  if (!carDoors[pi_group][_cars[e].CarID + 1]) {
    carDoors[pi_group][_cars[e].CarID + 1] = {
      prev: "",
      new: "",
      time_sec: "",
      door_open: 0,
      time_to_open: 0,
      time_open: 0,
      time_to_close: 0,
    };
  }

  if (!rearCarDoors[pi_group]) {
    rearCarDoors[pi_group] = {};
  }
  if (!rearCarDoors[pi_group][_cars[e].CarID + 1]) {
    rearCarDoors[pi_group][_cars[e].CarID + 1] = {
      prev: "",
      new: "",
      time_sec: "",
      door_open: 0,
      time_to_open: 0,
      time_open: 0,
      time_to_close: 0,
    };
  }

  carDoors[pi_group][_cars[e].CarID + 1]["new"] = _cars[e].DoorStateF;
  rearCarDoors[pi_group][_cars[e].CarID + 1]["new"] = _cars[e].DoorStateR;

  if (
    carDoors[pi_group][_cars[e].CarID + 1]["time_to_open"] == 0 &&
    carDoors[pi_group][_cars[e].CarID + 1]["new"] == 2
  ) {
    carDoors[pi_group][_cars[e].CarID + 1]["time_to_open"] = new Date();
  }

  if (
    carDoors[pi_group][_cars[e].CarID + 1]["time_open"] == 0 &&
    carDoors[pi_group][_cars[e].CarID + 1]["new"] == 3
  ) {
    carDoors[pi_group][_cars[e].CarID + 1]["time_open"] = new Date();
  }

  if (
    carDoors[pi_group][_cars[e].CarID + 1]["time_to_close"] == 0 &&
    carDoors[pi_group][_cars[e].CarID + 1]["new"] == 5
  ) {
    carDoors[pi_group][_cars[e].CarID + 1]["time_to_close"] = new Date();
  }

  if (
    carDoors[pi_group][_cars[e].CarID + 1]["new"] !=
    carDoors[pi_group][_cars[e].CarID + 1]["prev"]
  ) {
    var door_state = "";

    if (
      carDoors[pi_group][_cars[e].CarID + 1]["new"] == 3 &&
      carDoors[pi_group][_cars[e].CarID + 1]["prev"] == 2
    ) {
      var _tto =
        new Date().getTime() -
        carDoors[pi_group][_cars[e].CarID + 1]["time_to_open"].getTime();
      _tto = Math.abs(_tto / 1000);
      door_state = "time_to_open";
      LOGGER_MODEL.createDoorsReport(
        pi_group,
        _cars[e].CarID + 1,
        _cars[e].CurrentLanding,
        door_state,
        _tto,
        "front"
      );
      carDoors[pi_group][_cars[e].CarID + 1]["time_to_open"] = 0;
    }

    if (
      carDoors[pi_group][_cars[e].CarID + 1]["new"] == 1 &&
      carDoors[pi_group][_cars[e].CarID + 1]["prev"] == 5
    ) {
      var _ttc =
        new Date().getTime() -
        carDoors[pi_group][_cars[e].CarID + 1]["time_to_close"].getTime();
      _ttc = Math.abs(_ttc / 1000);
      door_state = "time_to_close";
      LOGGER_MODEL.createDoorsReport(
        pi_group,
        _cars[e].CarID + 1,
        _cars[e].CurrentLanding,
        door_state,
        _ttc,
        "front"
      );
      carDoors[pi_group][_cars[e].CarID + 1]["time_to_close"] = 0;
    }

    if (
      carDoors[pi_group][_cars[e].CarID + 1]["new"] == 5 &&
      carDoors[pi_group][_cars[e].CarID + 1]["prev"] == 3
    ) {
      var _to =
        new Date().getTime() -
        carDoors[pi_group][_cars[e].CarID + 1]["time_open"].getTime();
      _to = Math.abs(_to / 1000);
      door_state = "time_open";
      LOGGER_MODEL.createDoorsReport(
        pi_group,
        _cars[e].CarID + 1,
        _cars[e].CurrentLanding,
        door_state,
        _to,
        "front"
      );
      carDoors[pi_group][_cars[e].CarID + 1]["time_open"] = 0;
    }

    carDoors[pi_group][_cars[e].CarID + 1]["prev"] =
      carDoors[pi_group][_cars[e].CarID + 1]["new"];
  }

  if (
    rearCarDoors[pi_group][_cars[e].CarID + 1]["time_to_open"] == 0 &&
    rearCarDoors[pi_group][_cars[e].CarID + 1]["new"] == 2
  ) {
    rearCarDoors[pi_group][_cars[e].CarID + 1]["time_to_open"] = new Date();
  }

  if (
    carDoors[pi_group][_cars[e].CarID + 1]["time_open"] == 0 &&
    rearCarDoors[pi_group][_cars[e].CarID + 1]["new"] == 3
  ) {
    rearCarDoors[pi_group][_cars[e].CarID + 1]["time_open"] = new Date();
  }

  if (
    rearCarDoors[pi_group][_cars[e].CarID + 1]["time_to_close"] == 0 &&
    rearCarDoors[pi_group][_cars[e].CarID + 1]["new"] == 5
  ) {
    rearCarDoors[pi_group][_cars[e].CarID + 1]["time_to_close"] = new Date();
  }

  if (
    rearCarDoors[pi_group][_cars[e].CarID + 1]["new"] !=
    rearCarDoors[pi_group][_cars[e].CarID + 1]["prev"]
  ) {
    var door_state = "";

    if (
      rearCarDoors[pi_group][_cars[e].CarID + 1]["new"] == 3 &&
      rearCarDoors[pi_group][_cars[e].CarID + 1]["prev"] == 2
    ) {
      var _tto =
        new Date().getTime() -
        rearCarDoors[pi_group][_cars[e].CarID + 1]["time_to_open"].getTime();
      _tto = Math.abs(_tto / 1000);
      door_state = "time_to_open";
      LOGGER_MODEL.createDoorsReport(
        pi_group,
        _cars[e].CarID + 1,
        _cars[e].CurrentLanding,
        door_state,
        _tto,
        "rear"
      );
      rearCarDoors[pi_group][_cars[e].CarID + 1]["time_to_open"] = 0;
    }

    if (
      rearCarDoors[pi_group][_cars[e].CarID + 1]["new"] == 1 &&
      rearCarDoors[pi_group][_cars[e].CarID + 1]["prev"] == 5
    ) {
      var _ttc =
        new Date().getTime() -
        rearCarDoors[pi_group][_cars[e].CarID + 1]["time_to_close"].getTime();
      _ttc = Math.abs(_ttc / 1000);
      door_state = "time_to_close";
      LOGGER_MODEL.createDoorsReport(
        pi_group,
        _cars[e].CarID + 1,
        _cars[e].CurrentLanding,
        door_state,
        _ttc,
        "rear"
      );
      rearCarDoors[pi_group][_cars[e].CarID + 1]["time_to_close"] = 0;
    }

    if (
      rearCarDoors[pi_group][_cars[e].CarID + 1]["new"] == 5 &&
      rearCarDoors[pi_group][_cars[e].CarID + 1]["prev"] == 3 &&
      rearCarDoors[pi_group][_cars[e].CarID + 1]["time_open"] > 0
    ) {
      var _to =
        new Date().getTime() -
        rearCarDoors[pi_group][_cars[e].CarID + 1]["time_open"].getTime();
      _to = Math.abs(_to / 1000);
      door_state = "time_open";
      LOGGER_MODEL.createDoorsReport(
        pi_group,
        _cars[e].CarID + 1,
        _cars[e].CurrentLanding,
        door_state,
        _to,
        "rear"
      );
      rearCarDoors[pi_group][_cars[e].CarID + 1]["time_open"] = 0;
    }

    rearCarDoors[pi_group][_cars[e].CarID + 1]["prev"] =
      rearCarDoors[pi_group][_cars[e].CarID + 1]["new"];
  }
}

var fTfData = {};
function floorTfloor(pi_group, _cars, e) {
  //CarDoors
  if (!fTfData[pi_group]) {
    fTfData[pi_group] = {};
  }
  if (!fTfData[pi_group][_cars[e].CarID + 1]) {
    fTfData[pi_group][_cars[e].CarID + 1] = {
      DestinationLanding: 0,
      CurrentLanding: 0,
      WaitTime: 0,
      Timer: 0,
    };
  }
  //fTfData[pi_group][_cars[e].CarID + 1]["new"] = _cars[e].DoorStateF;

  if (_cars[e].CurrentLanding != _cars[e].DestinationLanding) {
    //if(fTfData[pi_group][_cars[e].CarID + 1]["CurrentLanding"] != fTfData[pi_group][_cars[e].CarID + 1]["DestinationLanding"]){
    if (
      fTfData[pi_group][_cars[e].CarID + 1]["Timer"] == 0 &&
      fTfData[pi_group][_cars[e].CarID + 1]["CurrentLanding"] == 0 &&
      fTfData[pi_group][_cars[e].CarID + 1]["DestinationLanding"] == 0
    ) {
      fTfData[pi_group][_cars[e].CarID + 1]["Timer"] = new Date();
      fTfData[pi_group][_cars[e].CarID + 1]["CurrentLanding"] =
        _cars[e].CurrentLanding;
      fTfData[pi_group][_cars[e].CarID + 1]["DestinationLanding"] =
        _cars[e].DestinationLanding;
    }
  } else {
    if (
      fTfData[pi_group][_cars[e].CarID + 1]["Timer"] != 0 &&
      _cars[e].CarSpeed == 0
    ) {
      var wt =
        new Date().getTime() -
        fTfData[pi_group][_cars[e].CarID + 1]["Timer"].getTime();
      wt = Math.abs(wt / 1000);
      var direction =
        fTfData[pi_group][_cars[e].CarID + 1]["CurrentLanding"] >
        fTfData[pi_group][_cars[e].CarID + 1]["DestinationLanding"]
          ? "down"
          : "up";
      LOGGER_MODEL.createFTF(
        pi_group,
        _cars[e].CarID + 1,
        fTfData[pi_group][_cars[e].CarID + 1]["CurrentLanding"],
        fTfData[pi_group][_cars[e].CarID + 1]["DestinationLanding"],
        direction,
        wt,
        function () {}
      );
      fTfData[pi_group][_cars[e].CarID + 1]["Timer"] = 0;
      fTfData[pi_group][_cars[e].CarID + 1]["CurrentLanding"] = 0;
      fTfData[pi_group][_cars[e].CarID + 1]["DestinationLanding"] = 0;
    }
  }
}

function startWait(pi_group, floors, direction) {
  if (!wTimes[pi_group]) {
    wTimes[pi_group] = {};
  }
  floors.forEach(function (floor) {
    if (!wTimes[pi_group][floor]) {
      wTimes[pi_group][floor] = {
        up: "",
        down: "",
      };
    }

    wTimes[pi_group][floor][direction] = new Date();
  });
}

function waitTimes(pi_group, floors, direction, list_waited_floors, GROUP_FILES) {
  var register_waitTime = true;
  max_floors = 0;
  GROUP_FILES[pi_group]["Cars"].forEach((car) => {
    if (car.NumberOfFloors > max_floors) {
      max_floors = car.NumberOfFloors;
    }
  });

  floors.forEach(function (floor) {
    if (list_waited_floors[direction].includes(floor)) {
      const index = list_waited_floors[direction].indexOf(floor);
      if (index > -1) {
        list_waited_floors[direction].splice(index, 1);
        if (
          floor >= 0 &&
          pi_group &&
          wTimes[pi_group][floor] &&
          wTimes[pi_group][floor][direction] != ""
        ) {
          var _time =
            new Date().getTime() - wTimes[pi_group][floor][direction].getTime();
          _time = Math.abs(_time / 1000);
          //wTimes[pi_group][floor][direction] = new Date();
          LOGGER_MODEL.createWaitTime(
            pi_group,
            floor,
            direction,
            _time,
            max_floors
          );
          wTimes[pi_group][floor][direction] = "";
        }
      }
    }
  });
}

function inServiceLoop(pi_group) {
  try {
    if (_inService[pi_group]) {
      let _cars = _inService[pi_group];
      Object.keys(_cars).forEach(function (e, key) {
        let _modeOfOperation = _cars[e].ModeOfOperation;
        let _classOfOperation = _cars[e].ClassOfOperation;
        if (_cars[e].Faults != 0) {
          _modeOfOperation = -1;
          _classOfOperation = -1;
        }
        LOGGER_MODEL.createServices(
          _cars[e].CarID + 1,
          pi_group,
          _cars[e].CurrentLanding,
          _modeOfOperation,
          _classOfOperation,
          function () {}
        );
      });
    }
  } catch (err) {}
}

function getDoorModeOperation(x, y) {
  var mode_structure = {
    0: {
      0: "Offline",
    },
    1: {
      0: "Offline",
      1: "Offline",
      2: "Offline",
      3: "Inspection (CT)",
      4: "Inspection (IC)",
      5: "Inspection (HA)",
      6: "Inspection (MR)",
      7: "Inspection (PIT)",
      8: "Inspection (LND)",
      9: "Construction",
      10: "Inspection (HA-TOP)",
      11: "Inspection (HA-BOTTOM)",
    },

    3: {
      0: "Unknown",
      1: "None",
      2: "Normal",
      3: "Fire Phase 1",
      4: "Fire Phase 2",
      5: "EMS",
      6: "EMS 2",
      7: "Attendant",
      8: "Independent Service",
      9: "Seismic",
      10: "CW DRAIL",
      11: "Sabbath",
      12: "E-Power",
      13: "EVAC",
      14: "Out Of Service",
      15: "Car To Lobby",
      16: "Battery Rescue",
      17: "PRSN TRSPT 1",
      18: "PRSN TRSPT 2",
      19: "Recall To Floor",
      20: "Wanderguard",
      21: "HUGS",
      22: "Car-SW",
      23: "Test",
      24: "Wind OP",
      25: "Flood OP",
      26: "Swing",
      27: "Custom",
      28: "Active Shooter",
      29: "Marshal",
      30: "VIP",
      31: "Normal (T2T)",
      32: "Normal (F2F)",
      33: "Normal (Random)",
      34: "UP PEAK",
      35: "DOWN PEAK",
      36: "LOBBY PEAK",
      37: "LOW OIL",
      38: "VISCOSITY",
      39: "JACK RESYNC",
      40: "LOW PRESSURE",
      41: "MOTOR OVERHEAT",
      42: "PHASE FLT OP",
      43: "TERMINAL EXPRESS",
      44: "SHUNT TRIP RECALL",
    },

    2: {
      0: "Offline",
      1: "Offline",
      2: "Offline",
      3: "Go To Terminal",
      4: "Ready Brake 1",
      5: "Ready Brake 2",
      6: "BYPASS TERM LIMIT",
      7: "Ready",
      8: "Learning Brakes",
      9: "Learning Brakes 2",
      10: "Learning Up",
      11: "Learning Down",
      12: "Enable BPS",
      13: "Unused",
      14: "Complete",
      15: "Ready Loads",
      16: "Learning Loads",
      17: "Learn",
    },
  };
  return mode_structure[x][y];
}

module.exports ={
    getCarCalls,
    getHallCalls,
    arrDiff,
    carDoorsCapture,
    floorTfloor,
    startWait,
    waitTimes,
    inServiceLoop,
    getDoorModeOperation,
    _inService
}