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
        console.log("DB_INIT_ERR ::: ", err.message)
    }
    //console.log(_connectionString);

    try {
        connection.on("error", (err) => { });
    } catch (err) {
        console.log("DB_ERROR ::: ", err.message);
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
            //     console.log('sudo systemctl start mysql');
            //     console.log(stderr);
            //     console.log(stdout);
            // });
        }

        con = connect();
        con.connect();
    });
} catch (err) {
    console.log("DB_ERROR ::: ", err.message);
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
    //console.log('connection established');
    //connection.query('SET SESSION auto_increment_increment=1')
});

pool.on('enqueue', function () {
    //console.log('Waiting for available connection slot');
});

pool.on('release', function (connection) {
    //console.log('Connection %d released', connection.threadId);
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
                console.log(qry,param)
                connection.release();
                callback(err,result);
            });
        });*/
        //console.log(qry,param)
        pool.query(qry, param, function (err, result) {
            //console.log(qry,param)
            callback(err, result);
        });



        // pool.end(function (err) {
        //     // all connections in the pool have ended
        //     //console.log("POOL ERROR ===>",err);
        // });

    }
}
