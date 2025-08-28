const WebSocket = require("ws");
require("dotenv").config();

const LOGGER_MODEL = require("../models/index.js");
const SETTINGS_MODEL = require("../../settings/models/group-config.js");

const TOOLS = require("../../../helpers/tools.js");
const zlib = require("zlib");

const UPDATE_FAULTS_OR_ALARMS = require("../../../helpers/updateFaultsAlarms.js");
var lastAlarmUpdateTime = 0;
var lastFaultUpdateTime = 0;
var missingFaultAlarmKey = false;

var fs = require("fs");
const { default: axios } = require("axios");
const { send } = require("process");
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

var sendGroup = true;
var _remotePing;

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

          if (_msg["dynamic-security-cars"] && !_msg["api"]) {
            var pi_json = JSON.parse(
              fs.readFileSync("configs/pi/pi.json", "utf-8")
            )["data"];
            pi_json.forEach((pi) => {
              if (pi.GroupID == parseInt(_msg["group"]) - 1) {
                pi_ip = pi.location.split(":")[0];
              }
            });

            axios
              .get(`http://` + pi_ip + `/api/cars`, { timeout: 3000 })
              .then((response) => {
                var jsonObj = response.data;
                remote_ws.send(jsonObj);
              })
              .catch((err) => {});
          }

          if (_msg["dynamic-security-rules"] && !_msg["api"]) {
            var pi_json = JSON.parse(
              fs.readFileSync("configs/pi/pi.json", "utf-8")
            )["data"];
            pi_json.forEach((pi) => {
              if (pi.GroupID == parseInt(_msg["group"]) - 1) {
                pi_ip = pi.location.split(":")[0];
              }
            });

            axios
              .get(`http://` + pi_ip + `/api/dynamic-security/rules`, {
                timeout: 3000,
              })
              .then((response) => {
                var jsonObj = response.data;
                var result = {
                  data: jsonObj,
                  MessageType: "dynamic-security-rule",
                };
                remote_ws.send(JSON.stringify(result));
              })
              .catch((err) => {});
          }

          if (_msg["dynamic-security-is-config-uploaded"] && !_msg["api"]) {
            var pi_json = JSON.parse(
              fs.readFileSync("configs/pi/pi.json", "utf-8")
            )["data"];
            pi_json.forEach((pi) => {
              if (pi.GroupID == parseInt(_msg["group"]) - 1) {
                pi_ip = pi.location.split(":")[0];
              }
            });

            axios
              .get(`http://` + pi_ip + `/api/is-config-uploaded`, {
                timeout: 3000,
              })
              .then((response) => {
                var jsonObj = response.data;
                remote_ws.send(jsonObj);
              })
              .catch((err) => {});
          }

          if (_msg["dynamic-security-cars-labels"] && !_msg["api"]) {
            var pi_json = JSON.parse(
              fs.readFileSync("configs/pi/pi.json", "utf-8")
            )["data"];
            pi_json.forEach((pi) => {
              if (pi.GroupID == parseInt(_msg["group"]) - 1) {
                pi_ip = pi.location.split(":")[0];
              }
            });

            axios
              .get(`http://` + pi_ip + `/api/cars-label`, { timeout: 3000 })
              .then((response) => {
                var jsonObj = response.data;
                remote_ws.send(jsonObj);
              })
              .catch((err) => {});
          }

          if (_msg["dynamic-security-set-rule"] && !_msg["api"]) {
            var pi_json = JSON.parse(
              fs.readFileSync("configs/pi/pi.json", "utf-8")
            )["data"];
            pi_json.forEach((pi) => {
              if (pi.GroupID == parseInt(_msg["group"]) - 1) {
                pi_ip = pi.location.split(":")[0];
              }
            });

            var bodyFormData = {
              name: _msg.name,
              active: _msg.active ? 1 : 0,
              day: _msg.day,
              from: _msg.from,
              to: _msg.to,
              doors: _msg.doors,
              calls: _msg.calls,
              car_specific: _msg.car_specific ? 1 : 0,
              cars: _msg.cars,
            };

            axios
              .post(
                "http://" + pi_ip + "/api/lm-dynamic-security/rule",
                bodyFormData
              )
              .then(function (response) {})
              .catch((error) => {});
          }

          if (_msg["dynamic-security-update-rule"] && !_msg["api"]) {
            var pi_json = JSON.parse(
              fs.readFileSync("configs/pi/pi.json", "utf-8")
            )["data"];
            pi_json.forEach((pi) => {
              if (pi.GroupID == parseInt(_msg["group"]) - 1) {
                pi_ip = pi.location.split(":")[0];
              }
            });

            var bodyFormData = {
              name: _msg.name,
              active: _msg.active ? 1 : 0,
              day: _msg.day,
              from: _msg.from,
              to: _msg.to,
              doors: _msg.doors,
              calls: _msg.calls,
              car_specific: _msg.car_specific ? 1 : 0,
              cars: _msg.cars,
            };

            axios
              .post(
                "http://" + pi_ip + "/api/lm-dynamic-security/rule/",
                bodyFormData
              )
              .then(function (response) {})
              .catch((error) => {});
          }

          if (_msg["dynamic-security-update-rule"] && !_msg["api"]) {
            var pi_json = JSON.parse(
              fs.readFileSync("configs/pi/pi.json", "utf-8")
            )["data"];
            pi_json.forEach((pi) => {
              if (pi.GroupID == parseInt(_msg["group"]) - 1) {
                pi_ip = pi.location.split(":")[0];
              }
            });

            axios({
              method: "post",
              url:
                "http://" +
                pi_ip +
                "/api/dynamic-security/rule/" +
                _msg.ruleID +
                "/delete",
            })
              .then(function (response) {})
              .catch((error) => {});
          }

          if (_msg["dynamic-security-activate-rule"] && !_msg["api"]) {
            var pi_json = JSON.parse(
              fs.readFileSync("configs/pi/pi.json", "utf-8")
            )["data"];
            pi_json.forEach((pi) => {
              if (pi.GroupID == parseInt(_msg["group"]) - 1) {
                pi_ip = pi.location.split(":")[0];
              }
            });

            axios({
              method: "post",
              url:
                "http://" +
                pi_ip +
                "/api/dynamic-security/rule/" +
                _msg.ruleID +
                "/delete",
            })
              .then(function (response) {})
              .catch((error) => {});
          }

          if (_msg["dynamic-security-deactivate-rule"] && !_msg["api"]) {
            var pi_json = JSON.parse(
              fs.readFileSync("configs/pi/pi.json", "utf-8")
            )["data"];
            pi_json.forEach((pi) => {
              if (pi.GroupID == parseInt(_msg["group"]) - 1) {
                pi_ip = pi.location.split(":")[0];
              }
            });

            axios({
              method: "post",
              url:
                "http://" +
                pi_ip +
                "/api/dynamic-security/rule/" +
                req.params.ruleID +
                "/deactivate",
              headers: { "Content-Type": "multipart/form-data" },
            })
              .then(function (response) {})
              .catch((error) => {});
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
  var lastFaultsUpdated = TOOLS.getRedisKeyValue("lastFaultsUpdated") || [
    0, 0, 0, 0, 0, 0, 0, 0,
  ];
  var lastAlarmsUpdated = TOOLS.getRedisKeyValue("lastAlarmsUpdated") || [
    0, 0, 0, 0, 0, 0, 0, 0,
  ];
  var lastFaultId = TOOLS.getRedisKeyValue("lastFaultId") || [
    0, 0, 0, 0, 0, 0, 0, 0,
  ];
  var lastAlarmId = TOOLS.getRedisKeyValue("lastAlarmId") || [
    0, 0, 0, 0, 0, 0, 0, 0,
  ];

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
        if (_d[pi_ip].MessageType == "Cars") {
          updateFaultsAlarms(JSON.parse(data));
        }
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

        if (_cars[e].Faults > 0) {
          if (
            lastFaultId[e] != _cars[e].Faults ||
            lastFaultId[e] === undefined
          ) {
            let params = {};
            if (lastFaultsUpdated[e] != 0) {
              params.date_time = parseInt(lastFaultsUpdated[e]);
            }

            axios
              .get(`http://` + pi_ip + `/api/faults/cars`, {
                params: params,
                timeout: 3000,
              })
              .then((response) => {
                lastFaultsUpdated[e] = parseInt(Math.floor(Date.now() / 1000));
                lastFaultId[e] = _cars[e].Faults;
                TOOLS.setRedisKeyValue("lastFaultsUpdated", lastFaultsUpdated);
                TOOLS.setRedisKeyValue("lastFaultId", _cars[e].FaultId);
                LOGGER_MODEL.updateRptFaultsTable(
                  pi_group,
                  response.data,
                  function () {}
                );
              })
              .catch((err) => {});
          }
        } else {
          lastFaultId[e] = 0;
        }

        if (_cars[e].Alarms > 0) {
          if (
            lastAlarmId[e] != _cars[e].Alarms ||
            lastAlarmId[e] === undefined
          ) {
            let params = {};
            if (lastAlarmsUpdated[e] != 0) {
              params.date_time = parseInt(lastAlarmsUpdated[e]);
            }
            axios
              .get(`http://` + pi_ip + `/api/alarms/cars`, {
                params: params,
                timeout: 3000,
              })
              .then((response) => {
                lastAlarmsUpdated[e] = Math.floor(Date.now() / 1000);
                lastAlarmId[e] = _cars[e].Alarms;
                TOOLS.setRedisKeyValue("lastAlarmsUpdated", lastAlarmsUpdated);
                TOOLS.setRedisKeyValue("lastAlarmId", _cars[e].AlarmId);
                LOGGER_MODEL.updateRptAlarmsTable(
                  pi_group,
                  response.data,
                  function () {}
                );
              })
              .catch((err) => {});
          }
        } else {
          lastAlarmId[e];
        }

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

        carDoorsCapture(pi_group, _cars, e);
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

function carDoorsCapture(pi_group, _cars, e) {
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

function waitTimes(pi_group, floors, direction, list_waited_floors) {
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

/**
 * Update faults or alarms when receiving a socket message 'lastFaultUpdateTime' or 'LastAlarmUpdateTime' = true
 * @param {*} data
 */
function updateFaultsAlarms(data) {
  var now = new Date().getTime();
  var data_cars = {};

  /* Check the Cars key if it is available in the socket message  */
  if (
    Object.keys(data).length > 0 &&
    data.hasOwnProperty("Cars") &&
    Object.keys(data.Cars).length > 0
  ) {
    data_cars = data.Cars[0];
  }

  /* Prevent hitting the api more than once within 10 seconds */
  var preventUpdatingAlarms = now - lastAlarmUpdateTime > 10000;
  var preventUpdatingFaults = now - lastFaultUpdateTime > 10000;
  var hasFaultKey = data_cars.hasOwnProperty("LastAlarmUpdateTime");
  var hasAlarmtKey = data_cars.hasOwnProperty("LastFaultUpdateTime");

  if (
    hasFaultKey &&
    data_cars.LastAlarmUpdateTime == "true" &&
    preventUpdatingAlarms
  ) {
    UPDATE_FAULTS_OR_ALARMS.update_file_from_pi("alarms");
    lastAlarmUpdateTime = now;
  }
  if (
    hasAlarmtKey &&
    data_cars.LastFaultUpdateTime == "true" &&
    preventUpdatingFaults
  ) {
    UPDATE_FAULTS_OR_ALARMS.update_file_from_pi("faults");
    lastFaultUpdateTime = now;
  }

  /* Print log in case gui or middleware are not sending the needed keys */
  if ((!hasFaultKey || !hasAlarmtKey) && !missingFaultAlarmKey) {
    setTimeout(() => {
      missingFaultAlarmKey = true;
    }, 3000);
  }
}
