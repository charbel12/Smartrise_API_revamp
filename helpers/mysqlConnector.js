var mysql = require('mysql');
var ENV = process.env;

function connect() {
    let _connectionString = {}

    let connection;

    _connectionString = {
        host: ENV.DB_HOST,
        port: ENV.DB_PORT,
        user: ENV.DB_USERNAME,
        password: ENV.DB_PASSWORD,
        database: ENV.DB_DATABASE,
        connectTimeout: 60000,
        multipleStatements: true,
        timezone: 'utc'
    }

    try {
        connection = mysql.createConnection(_connectionString);
    } catch (err) {

    }


    try {
        connection.on("error", (err) => { });
    } catch (err) {

    }

    return connection;
}

var con = connect();
con.connect();
try {
    con.on("error", (err) => {
        if (!err.fatal) {
            return;
        }

        if (err.code !== 'PROTOCOL_CONNECTION_LOST') {
            // throw err;
            // exec('sudo systemctl start mysql', (err, stdout, stderr) => {
            // });
        }

        con = connect();
        con.connect();
    });
} catch (err) {

}

var pool = mysql.createPool({
    connectionLimit: 100,
    host: ENV.DB_HOST,
    port: ENV.DB_PORT,
    user: ENV.DB_USERNAME,
    password: ENV.DB_PASSWORD,
    database: ENV.DB_DATABASE,
    connectTimeout: 60000
});

pool.on('connection', function (connection) {

    //connection.query('SET SESSION auto_increment_increment=1')
});

pool.on('enqueue', function () {

});

pool.on('release', function (connection) {

});

module.exports = {
    query: function (qry, param = [], callback) {


        let _query = con.query(qry, param, function (err, result) {
            //con.end();
            callback(err, result);
        });
        //console.debug(_query.sql);
    },
    pool: function (qry, param = [], callback) {
        /*pool.getConnection(function(err, connection) {
            connection.query(qry, param, function (err, result) {

                connection.release();
                callback(err,result);
            });
        });*/
        pool.query(qry, param, function (err, result) {
            callback(err, result);
        });



        // pool.end(function (err) {
        // });

    }
}
