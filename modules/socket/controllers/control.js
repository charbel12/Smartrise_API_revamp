const WebSocket = require('ws');

var fs = require('fs')
const PI = JSON.parse(fs.readFileSync(process.env.SETTINGS_PI_LOCATION, 'utf-8'))['data']

// const PI = [
//   process.env.PI_0,
//   process.env.PI_1,
//   process.env.PI_2,
//   process.env.PI_3,
// ];

module.exports = function(ws, req) {

  
  ws.on('message', function(msg) {
    //ws.send(msg);
    
    var _msg = JSON.parse(msg);
    var _group = parseInt(_msg['group']) - 1;



    var ows = new WebSocket(`ws://` + PI[_group]['location'], {
      origin: ''
    });
    
    

    ows.on('open', function open() {
     if(ows.readyState === 1){
       ows.send(JSON.stringify(_msg['data']));
      }
      ows.close();
    });

    ows.on('error', function(data) {
    });
  });

  ws.on('close', function close() {
    
  });

    
  

};