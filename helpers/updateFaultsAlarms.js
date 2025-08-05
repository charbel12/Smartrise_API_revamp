const fs = require('fs');
const axios = require('axios');
const { exec } = require('child_process');
module.exports = {
    /**
    * Update faults and alarms files in /PORTAL/database/data/
    * @param {String} type 
    */
    update_file_from_pi: (type) => {
        try {
            var pi_json = JSON.parse(fs.readFileSync('/files/Smartrise_Local_Monitor/SMARTRISE_API/configs/pi/pi.json', 'utf-8'))['data'];
            if (pi_json != undefined && pi_json.length && pi_json[0].hasOwnProperty('location')) {
                var pi_ip = pi_json[0].location.split(':')[0];
                axios.get(`http://${pi_ip}/api/${type}`).then((response) => {
                    var jsonObj = response.data[type];
                    var jsonContent = JSON.stringify(jsonObj);
                    fs.writeFile(`/files/Smartrise_Local_Monitor/PORTAL/database/data/${type}_data.json`, jsonContent, 'utf8', function (err) {
                        if (err) {
                            console.log("An error occured while writing JSON Object to File. " + type);
                            return console.log(err);
                        }
                    });
                    setTimeout(() => {
                        exec('php /files/Smartrise_Local_Monitor/PORTAL/artisan db:seed', (err, stdout, stderr) => {

                        });
                    }, 3000);
                }).catch((err) => {
                    console.log(err)
                })
            } else {
                console.log('Unable to get the IP from configs/pi/pi.json')
            }
        } catch (err) {
            console.log("Get pi IP from configs/pi/pi.json failed ::: ", err.message)
            console.log('TYPE: ' + type)
        }
    }
}
