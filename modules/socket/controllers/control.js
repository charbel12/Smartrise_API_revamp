const WebSocket = require('ws');

const fs = require('fs')
const PI = JSON.parse(fs.readFileSync(process.env.SETTINGS_PI_LOCATION, 'utf-8'))['data']

const Metrics = require('../../monitoring/controllers/metrics');
const activeConnections = new Metrics.client.Gauge({
  name: 'smartrise_websocket_connections_active',
  help: 'Number of active WebSocket connections',
  registers: [Metrics.register]
});


module.exports = function (ws, req) {
  activeConnections.inc();
  ws.on('message', function (msg) {
    //ws.send(msg);

    var _msg = JSON.parse(msg);
    var _group = parseInt(_msg['group']) - 1;



    var ows = new WebSocket(`ws://` + PI[_group]['location'], {
      origin: ''
    });



    ows.on('open', function open() {
      if (ows.readyState === 1) {
        ows.send(JSON.stringify(_msg['data']));
      }
      ows.close();
    });

    ows.on('error', function (data) {
    });
  });

  ws.on('close', function close() {
    activeConnections.dec();

  });




};