
module.exports = function(APP){
    const expressSwagger = require('express-swagger-generator')(APP);

    if(process.env.APP_ENV != "production"){
        let options = {
            swaggerDefinition: {
                info: {
                    description: 'Smartrise swagger file. Contains all documented API',
                    title: 'Smartrise Local Monitor',
                    version: process.env.APP_VERSION,
                },
                //host: `${process.env.APP_URL}:${process.env.PORT}`,
                //basePath: '/v1',
                produces: [
                    "application/json",
                    //"application/xml"
                ],
                schemes: ['http', 'https'],
                securityDefinitions: {
                    JWT: {
                        type: 'apiKey',
                        in: 'header',
                        name: 'Authorization',
                        description: "",
                    }
                }
            },
            basedir: process.env.Dirname, //app absolute path
            files: [process.env.Dirname + '/modules/**/controllers/*.js',process.env.Dirname + '/documentation/*.js'] //Path to the API handle folder
        };
        expressSwagger(options);
    }
}