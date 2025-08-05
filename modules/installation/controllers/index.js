const VARS = require('../vars.js');

const EXPRESS = require('express');
const APP = EXPRESS();
const TOOLS = require('../../../helpers/tools.js');
const ROUTER_MIDDLEWARE = require('../../../middlewares/router.js');
const AUTH = require('../../../helpers/authentication.js');
const BODY_PARSER = require('body-parser');
const MULTER = require('multer');
const REPLACE = require('replace-in-file');
ROUTER_MIDDLEWARE.USE_STANDARD(APP);
/**
* @route POST /installation
* @produces application/json
* @consumes application/json
* @returns {Response.model} 200  - An object of info
* @returns {AuthResponseFailed.model} 401 - Access is denied.
* @security JWT
*/

APP.post(`${VARS.base_route}`, async function (req, res) {	
	try {
		var fs = require('fs');

		const envContent = {
			files: '.env',
		  	from: [
		  		'DB_HOST='+process.env.DB_HOST,
		  		'DB_PORT='+process.env.DB_PORT,
		  		'DB_DATABASE='+process.env.DB_DATABASE,
		  		'DB_USERNAME='+process.env.DB_USERNAME,
		  		'DB_PASSWORD='+process.env.DB_PASSWORD
		  	],
		  	to: [
		  		'DB_HOST='+req.body.DB_HOST,
		  		'DB_PORT='+req.body.DB_PORT,
		  		'DB_DATABASE='+req.body.DB_DATABASE,
		  		'DB_USERNAME='+req.body.DB_USERNAME,
		  		'DB_PASSWORD='+req.body.DB_PASSWORD
		  	],
		};
	  	const envFile = await REPLACE(envContent);

	  	let rpi = {};
		rpi.data = req.body.RPi;
	
	  	// const PI = JSON.parse(fs.readFileSync(process.env.SETTINGS_PI_LOCATION, 'utf-8'))['data'];
	
	  	fs.writeFile("configs/pi/pi.json", JSON.stringify(rpi), function(err) {
			if(err) {
			    return console.log(err);
			}
		}); 

		res.json({
			"successful": true			
		});
	}
	catch (error) {
	  console.error('Error occurred:', error);
	}    
});

module.exports = APP;