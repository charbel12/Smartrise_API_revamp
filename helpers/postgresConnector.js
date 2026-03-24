const sqlite3 = require('sqlite3').verbose();
const ENV = process.env;

const dbPath = ENV.DB_STORAGE || `/db/${ENV.DB_DATABASE || 'pre_smartriselocal'}.sqlite`;

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening sqlite database:', err.message);
    }
});

function convertQuery(qry, params) {
    let sql = qry;
    let newParams = params ? [...params] : [];

    // Handle MySQL-specific functions
    sql = sql.replace(/utc_timestamp\(\)/gi, 'CURRENT_TIMESTAMP');
    sql = sql.replace(/IFNULL/gi, 'COALESCE');

    // Handle "INSERT INTO table SET ?"
    if (sql.match(/INSERT\s+INTO\s+(\w+)\s+SET\s+\?/i) && params.length === 1 && typeof params[0] === 'object') {
        const match = sql.match(/INSERT\s+INTO\s+(\w+)\s+SET\s+\?/i);
        const tableName = match[1];
        const obj = params[0];
        const keys = Object.keys(obj);
        const columns = keys.join(', ');
        const placeholders = keys.map(() => '?').join(', ');
        sql = `INSERT INTO ${tableName} (${columns}) VALUES (${placeholders})`;
        newParams = Object.values(obj);
        return { sql, params: newParams };
    }

    // Handle "UPDATE table SET ? WHERE ..."
    if (sql.match(/UPDATE\s+(\w+)\s+SET\s+\?/i) && params.length >= 1 && typeof params[0] === 'object') {
        const match = sql.match(/UPDATE\s+(\w+)\s+SET\s+\?/i);
        const tableName = match[1];
        const obj = params[0];
        const remainingParams = params.slice(1);
        const keys = Object.keys(obj);
        const setClause = keys.map(key => `${key} = ?`).join(', ');
        
        sql = sql.replace(/SET\s+\?/i, `SET ${setClause}`);
        
        newParams = [...Object.values(obj), ...remainingParams];
        return { sql, params: newParams };
    }

    return { sql, params: newParams };
}

module.exports = {
    query: function (qry, param = [], callback) {
        const { sql, params } = convertQuery(qry, param);
        return new Promise((resolve, reject) => {
            db.all(sql, params, function(err, rows) {
                if (err) {
                    if (callback) callback(err);
                    reject(err);
                } else {
                    if (callback) callback(null, rows || []);
                    resolve(rows || []);
                }
            });
        });
    },
    pool: function (qry, param = [], callback) {
        return this.query(qry, param, callback);
    }
};
