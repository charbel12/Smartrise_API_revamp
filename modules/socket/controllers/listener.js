const WebSocket = require("ws");
require("dotenv").config();

const LOGGER_MODEL = require("../models/index.js");
const SETTINGS_MODEL = require("../../settings/models/group-config.js");

const TOOLS = require("../../../helpers/tools.js");
const zlib = require("zlib");

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
} = require("../helpers/socket-helpers.js");

var fs = require("fs");

const PI = JSON.parse(
  fs.readFileSync(process.env.SETTINGS_PI_LOCATION, "utf-8")
)["data"];


var GROUP_FILES;
var startBroadcast = false;

SETTINGS_MODEL.getGroupStructured(function (err, files) {
  GROUP_FILES = files;
});

LOGGER_MODEL.createProgramEvent("Application", "Startup", function () {});

var prevCarCalls = {};
var newCarCalls = {};

var prevHallCalls = {};
var newHallCalls = {};

var cFaults = {};
var cAlarms = {};
var cServices = {};

var carDoors = {};
var rearCarDoors = {};
var wTimes = {};

var reconnectInterval = 3000;

var remote_ws_open = false;
var remote_ws;
var remote_enabled = process.env.ENABLE_REMOTE_MONITORING;


var _inService = {};
var _inServiceTimer = {};
let wsLists = {};

remoteConnect();
function remoteConnect() {
  if (process.env.REMOTE_URL) {
    if (remote_enabled && remote_enabled != 0) {
      try {
        remote_ws = new WebSocket(
          process.env.REMOTE_URL + "/socket/site/" + process.env.SITE_ID,
          ["soap", "wamp"]
        );

        remote_ws.on("close", function close() {
          startBroadcast = false;
          remote_ws_open = false;
          sendGroup = true;
          LOGGER_MODEL.createProgramEvent(
            "Connection",
            "Remote Connection disconnected",
            function () {}
          );
          remote_ws.close();
          setTimeout(function () {
            remoteConnect();
          }, reconnectInterval * 10);
        });

        remote_ws.on("open", function open() {
          LOGGER_MODEL.createProgramEvent(
            "Connection",
            "Remote Connection connected",
            function () {}
          );
          remote_ws_open = true;

          setInterval(() => {
            if (remote_ws.readyState === 1) {
              var groups = require("../../settings/models/group-config.js");
              groups.getGroupConfigFiles(function (err, data) {
                if (err) {
                  console.error("Error fetching group config files:", err);
                  return;
                }
                var _cont = {};
                data.forEach(function (val) {
                  var _v = val["content"];
                  _v.SiteID = parseInt(process.env.SITE_ID);
                  _v.connected = connectedRPI[_v.GroupID];
                  _v.version = process.env.APP_VERSION
                    ? process.env.APP_VERSION
                    : "";
                  _cont[_v.GroupID] = _v;
                });
                try {
                  var obj1 = {
                    SiteID: process.env.SITE_ID,
                    MessageType: "GroupConfig",
                    data: _cont,
                  };
                  zlib.gzip(JSON.stringify(obj1), function (err, result) {
                    if (err) {
                      console.error("Error during zlib compression:", err);
                      return;
                    }
                    if (startBroadcast && remote_ws.readyState === 1) {
                      remote_ws.send(result);
                    }
                  });
                } catch (er) {}
              });
            }
          }, 3000);
        });

        remote_ws.on("error", function (err) {
          console.error("WebSocket encountered an error:", err);
        });

        remote_ws.on("close", function () {
          remote_ws_open = false;
          // Optionally, add reconnection logic here
        });

        remote_ws.on("error", function error(err) {});

        remote_ws.on("message", function (msg) {
          //ws.send(msg);
          var _msg = JSON.parse(msg);

          if (_msg.startBroadcast == true) {
            startBroadcast = true;
          } else if (_msg.startBroadcast == false) {
            startBroadcast = false;
          }

          if (_msg["controls"] && !_msg["api"]) {
            var c_group = parseInt(_msg["group"]) - 1;
            var cows = new WebSocket(`ws://` + PI[c_group]["location"], {
              origin: "",
            });
            cows.on("open", function open() {
              try {
                if (cows.readyState === 1) {
                  cows.send(JSON.stringify(_msg["data"]));
                }
              } catch (err) {}
              cows.close();
            });

            cows.on("close", function close() {
              cows.close();
            });
            cows.on("error", function (data) {
              cows.close();
            });
          }

          if (_msg["api"] && _msg["notControls"]) {
            const DATA = _msg["data"] ? _msg["data"] : null;
            const GROUP_ID = _msg["group"] ? _msg["group"] : 0;
            const UUID = _msg["uuid"] ? _msg["uuid"] : 0;

            if (DATA) {
              try {
                const OUTGOING = require("./outgoing");

                OUTGOING.outgoing(DATA, GROUP_ID, UUID, remote_ws);
              } catch (err) {}
            } else {
            }
          }
        });
      } catch (err) {}
    }
  }
}

var connectedRPI = {};
var connect = function (pi_group, location) {

  var ows = new WebSocket(
    `ws://` + "0.0.0.0" + ":" + process.env.APP_PORT + "/socket/server"
  );
  var ows_open = false;

  ows.on("close", function close() {
    ows_open = false;
    ows.close();
  });
  ows.on("error", function error(err) {
    ows_open = false;
    ows.close();
  });
  ows.on("open", function open() {
    ows_open = true;
    try {
      SETTINGS_MODEL.getGroupStructured(function (err, files) {
        if (files && !err) {
          GROUP_FILES = files;
        } else {
          throw new Error(err);
        }
      });
    } catch (err) {}
  });

  var ws = new WebSocket(location, {
    origin: "",
  });

  var _pingInterval;
  ws.on("open", function open() {
    LOGGER_MODEL.createProgramEvent(
      "Connection",
      "RaspberryPi Connected. Location: " + location,
      function () {}
    );
    connectedRPI[pi_group] = true;
    pi_ip = location.replace("ws://", "");
    pi_ip = pi_ip.replace(":9100", "");
    pi_ip = pi_ip.trim();
    //ws.send(Date.now());
    setInterval(function () {
      try {
        if (ws.readyState === 1) {
          ws.send(JSON.stringify({ MessageType: "Ping" }));
        }
      } catch (err) {
        wsCloseFunc(ws, pi_group, location);
      }
    }, reconnectInterval);

    _inServiceTimer[pi_group] = setInterval(function () {
      inServiceLoop(pi_group);
    }, 300000);
  });

  ws.on("close", function close() {
    try {
      clearInterval(_inServiceTimer[pi_group]);
    } catch (er) {}
    LOGGER_MODEL.createProgramEvent(
      "Connection",
      "RaspberryPi Disconnected. Location: " + location,
      function () {}
    );

    setInterval(function () {
      Func(ws, pi_group, location, 1000);
      // }
      wsLists[pi_group] = { ...wsLists[pi_group], location };
    }, 5000);

    wsCloseFunc(ws, pi_group, location);
  });

  let hallCalls = {};
  let list_waited_floors = {
    up: [],
    down: [],
  };
  var currentFloors = {};
  var currentModes = {
    0: "offline",
    1: "offline",
    2: "offline",
    3: "offline",
    4: "offline",
    5: "offline",
    6: "offline",
    7: "offline",
  };

  var is_modified_dad_parameter = true;
  var dad_parameter_modified_timestamp = 0;

  ws.on("message", function incoming(data) {
    var _d = [];

    pi_ip = location.replace("ws://", "");
    pi_ip = pi_ip.replace(":9100", "");
    pi_ip = pi_ip.trim();
    _d[pi_ip] = {};

    try {
      _d[pi_ip] = JSON.parse(data);
    } catch (err) {}

    if (remote_ws_open && remote_enabled && remote_enabled != 0) {
      sendGroup = false;

      let obj2 = {
        SiteID: process.env.SITE_ID,
        pi_group: pi_group,
        JobID: _d[pi_ip].JobID,
        MessageType: _d[pi_ip].MessageType,
        data: data,
      };
      try {
        if (startBroadcast) {
          zlib.gzip(JSON.stringify(obj2), function (err, compressedData) {
            remote_ws.send(compressedData);
          });
        }
      } catch (err) {}
    }

    if (ows_open) {
      if (_d[pi_ip].MessageType === "Risers") {
        hallCalls = {};
        hallCalls = {
          ...hallCalls,
          pi_group: pi_group,
          MessageType: _d[pi_ip].MessageType,
          data: data,
        };
      }
      if (Object.keys(hallCalls).length > 0) {
        try {
          if (ows.readyState === 1) {
            ows.send(JSON.stringify(hallCalls));
          } else {
            throw new Error("Websocket is not open: LM");
          }

          if (remote_ws_open && remote_ws && remote_ws.readyState === 1) {
            hallCalls = {
              ...hallCalls,
              ...{ SiteID: process.env.SITE_ID, JobID: _d[pi_ip].JobID },
            };
            // zlib.gzip(JSON.stringify(hallCalls), function (_, result) {
            //     remote_ws.send(result);
            // });
          } else {
            // throw new Error("Websocket is not open: RM");
          }
        } catch (err) {}
      }
      try {
        ows.send(
          JSON.stringify({
            pi_group: pi_group,
            MessageType: _d[pi_ip].MessageType,
            data: data,
          })
        );
      } catch (err) {}

      try {
        if (ows.readyState === 1) {
          ows.send(JSON.stringify({ MessageType: "Ping" }));
        }
      } catch (err) {}
    }

    if (_d[pi_ip].MessageType == "Risers") {
      //PREVIOUS HALL
      if (!prevHallCalls[pi_group]) {
        prevHallCalls[pi_group] = {
          up: [],
          down: [],
        };
      }
      //NEW HALL
      if (!newHallCalls[pi_group]) {
        newHallCalls[pi_group] = {
          up: [],
          down: [],
        };
      }

      try {
        if (
          typeof GROUP_FILES[pi_group] != "undefined" &&
          typeof GROUP_FILES[pi_group]["Cars"] != "undefined" &&
          typeof GROUP_FILES[pi_group]["Cars"][0] != "undefined" &&
          typeof GROUP_FILES[pi_group] != "undefined" &&
          typeof GROUP_FILES[pi_group]["Cars"] != "undefined"
        ) {
          newHallCalls[pi_group] = getHallCalls(
            GROUP_FILES[pi_group]["Cars"][0]["FloorArray"],
            _d[pi_ip].Risers
          );
        }
      } catch (catch_error) {}

      var hcWaitUp = arrDiff(
        newHallCalls[pi_group]["up"],
        prevHallCalls[pi_group]["up"]
      );
      var hcWaitDown = arrDiff(
        newHallCalls[pi_group]["down"],
        prevHallCalls[pi_group]["down"]
      );
      if (hcWaitUp.length > 0) {
        waitTimes(pi_group, hcWaitUp, "up", list_waited_floors);
      }
      if (hcWaitDown.length > 0) {
        waitTimes(pi_group, hcWaitDown, "down", list_waited_floors);
      }

      var hallCallDiffUp = arrDiff(
        prevHallCalls[pi_group]["up"],
        newHallCalls[pi_group]["up"]
      );
      var hallCallDiffDown = arrDiff(
        prevHallCalls[pi_group]["down"],
        newHallCalls[pi_group]["down"]
      );
      accept_startUpWait = false;
      accept_startDownWait = false;
      hallCallDiffUp.forEach(function (floor) {
        Object.keys(currentFloors).forEach(function (CarID, key) {
          var car = currentFloors[CarID];
          if (car.Status != "Offline" && car.CurrentLanding != floor) {
            accept_startUpWait = true;
          }
        });
        if (accept_startUpWait) {
          list_waited_floors["up"].push(floor);
        }
      });
      hallCallDiffDown.forEach(function (floor) {
        Object.keys(currentFloors).forEach(function (CarID, key) {
          var car = currentFloors[CarID];
          if (car.Status != "Offline" && car.CurrentLanding != floor) {
            accept_startDownWait = true;
          }
        });
        if (accept_startDownWait) {
          list_waited_floors["down"].push(floor);
        }
      });

      if (hallCallDiffUp.length > 0) {
        LOGGER_MODEL.createHallCalls(
          pi_group,
          hallCallDiffUp,
          "up",
          function () {}
        );
        startWait(pi_group, hallCallDiffUp, "up");
      }
      prevHallCalls[pi_group]["up"] = newHallCalls[pi_group]["up"];

      if (hallCallDiffDown.length > 0) {
        LOGGER_MODEL.createHallCalls(
          pi_group,
          hallCallDiffDown,
          "down",
          function () {}
        );
        startWait(pi_group, hallCallDiffDown, "down");
      }
      prevHallCalls[pi_group]["down"] = newHallCalls[pi_group]["down"];
    }

    if (_d[pi_ip].MessageType == "Cars") {
      var _cars = _d[pi_ip].Cars;

      _inService[pi_group] = _cars;

      var first_car = _cars[Object.keys(_cars)[0]];

      if (dad_parameter_modified_timestamp != first_car.LastUpdateParameter) {
        is_modified_dad_parameter = true;
        dad_parameter_modified_timestamp = first_car.LastUpdateParameter;
      } else {
        is_modified_dad_parameter = false;
      }
      if (first_car && is_modified_dad_parameter) {
        TOOLS.setRedisKeyValue(
          "requests:" + pi_group + ":last_updated_remote",
          parseInt(first_car.LastUpdateParameter)
        );
        TOOLS.updateAllDataInRedis(pi_group, pi_ip);
        is_modified_dad_parameter = false;
      }

      Object.keys(_cars).forEach(function (e, key) {
        CarSpeed = _cars[e].CarSpeed;
        CurrentLanding = _cars[e].CurrentLanding;
        currentFloors[_cars[e].CarID] = {
          CarSpeed: _cars[e].CarSpeed,
          CurrentLanding: _cars[e].CurrentLanding,
          ModeOfOperation: _cars[e].ModeOfOperation,
          ClassOfOperation: _cars[e].ClassOfOperation,
          Status: getDoorModeOperation(
            _cars[e].ClassOfOperation,
            _cars[e].ModeOfOperation
          ),
        };

        var car_mode = getDoorModeOperation(
          _cars[e].ClassOfOperation,
          _cars[e].ModeOfOperation
        );
        currentModes[_cars[e].CarID] = car_mode;

        //PREVIOUS CAR
        if (!prevCarCalls[pi_group]) {
          prevCarCalls[pi_group] = {};
        }
        if (!prevCarCalls[pi_group][_cars[e].CarID]) {
          prevCarCalls[pi_group][_cars[e].CarID] = [];
        }
        //NEW CAR
        if (!newCarCalls[pi_group]) {
          newCarCalls[pi_group] = {};
        }
        if (!newCarCalls[pi_group][_cars[e].CarID]) {
          newCarCalls[pi_group][_cars[e].CarID] = [];
        }
        try {
          if (
            typeof _cars[e].CarID != "undefined" &&
            typeof GROUP_FILES[pi_group] != "undefined" &&
            typeof GROUP_FILES[pi_group]["Cars"] != "undefined" &&
            typeof GROUP_FILES[pi_group]["Cars"][_cars[e].CarID] !=
              "undefined" &&
            typeof GROUP_FILES[pi_group]["Cars"][_cars[e].CarID][
              "FloorArray"
            ] != "undefined"
          ) {
            newCarCalls[pi_group][_cars[e].CarID] = getCarCalls(
              GROUP_FILES[pi_group]["Cars"][_cars[e].CarID]["FloorArray"],
              _cars[e]
            );
          }
        } catch (catch_error) {}

        var carCallDiff = arrDiff(
          prevCarCalls[pi_group][_cars[e].CarID],
          newCarCalls[pi_group][_cars[e].CarID]
        );
        if (carCallDiff.length > 0) {
          LOGGER_MODEL.createCarCalls(
            _cars[e].CarID + 1,
            pi_group,
            carCallDiff,
            function () {}
          );
        }
        prevCarCalls[pi_group][_cars[e].CarID] =
          newCarCalls[pi_group][_cars[e].CarID];

        //Services

        if (!cServices[pi_group]) {
          cServices[pi_group] = {};
        }
        if (!cServices[pi_group][_cars[e].CarID + 1]) {
          cServices[pi_group][_cars[e].CarID + 1] = {
            ClassOfOperation: {},
            ModeOfOperation: {},
          };
        }
        cServices[pi_group][_cars[e].CarID + 1]["ClassOfOperation"]["new"] =
          _cars[e].ClassOfOperation;
        cServices[pi_group][_cars[e].CarID + 1]["ModeOfOperation"]["new"] =
          _cars[e].ModeOfOperation;
        if (_cars[e].Faults === 0) {
          if (
            cServices[pi_group][_cars[e].CarID + 1]["ClassOfOperation"][
              "prev"
            ] !=
              cServices[pi_group][_cars[e].CarID + 1]["ClassOfOperation"][
                "new"
              ] ||
            cServices[pi_group][_cars[e].CarID + 1]["ModeOfOperation"][
              "prev"
            ] !=
              cServices[pi_group][_cars[e].CarID + 1]["ModeOfOperation"]["new"]
          ) {
            cServices[pi_group][_cars[e].CarID + 1]["ClassOfOperation"][
              "prev"
            ] =
              cServices[pi_group][_cars[e].CarID + 1]["ClassOfOperation"][
                "new"
              ];
            cServices[pi_group][_cars[e].CarID + 1]["ModeOfOperation"]["prev"] =
              cServices[pi_group][_cars[e].CarID + 1]["ModeOfOperation"]["new"];

            //LOGGER_MODEL.createServices((_cars[e].CarID + 1), (pi_group), _cars[e].CurrentLanding, _cars[e].ModeOfOperation, _cars[e].ClassOfOperation, function () { });
          } else {
            //LOGGER_MODEL.updateServices((_cars[e].CarID + 1), (pi_group), _cars[e].CurrentLanding, function () { });
          }
        } else {
          cServices[pi_group][_cars[e].CarID + 1]["ModeOfOperation"]["prev"] =
            "faulted";
        }

        carDoorsCapture(pi_group, _cars, e, carDoors, rearCarDoors);
        floorTfloor(pi_group, _cars, e);
        //}
      });
    }
    LOGGER_MODEL.car_modes = currentModes;
    //LOGGER_MODEL.createReportLog(pi_group, _d[pi_ip].MessageType, data);
  });

  ws.on("error", function error(err) {
    //LOGGER_MODEL.createProgramEvent('Connection', 'RaspberryPi Connection Error. Location: ' + location, function () { });
    /*for (var x = 1; x <= 8; x++) {
      cServices[pi_group] = {};
      LOGGER_MODEL.createServices(x, (pi_group), 0, -2, -2, function () { });
    }*/
    //wsCloseFunc(ws,pi_group,location);
  });
};

module.exports = function () {
  PI.forEach(function (p, i) {
    if (p["location"]) {
      ip = p["location"].split(":")[0];
      connect(p["GroupID"], `ws://` + p["location"]);
    }
  });
};

var _wsCloseInterval;
function wsCloseFunc(ws, pi_group, location, interval = 10000) {
  pi_group = parseInt(pi_group);
  connectedRPI[pi_group] = false;
  _wsCloseInterval = setTimeout(function () {
    console.table({ DISCONNECTED: location, GROUP: pi_group });
    try {
      for (var x = 1; x <= 8; x++) {
        cServices[pi_group] = {};
        LOGGER_MODEL.createServices(x, pi_group, 0, -2, -2, function () {});
      }
      ws.close();
    } catch (err) {}
    try {
      connect(pi_group, wsLists[pi_group].location);
      clearInterval(_wsCloseInterval);
    } catch (err) {}
  }, interval);
}
