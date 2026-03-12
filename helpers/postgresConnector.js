const { Pool } = require('pg');
const ENV = process.env;

const pool = new Pool({
    host: ENV.DB_HOST,
    port: ENV.DB_PORT || 5432,
    user: ENV.DB_USERNAME,
    password: ENV.DB_PASSWORD,
    database: ENV.DB_DATABASE,
    max: 100,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 60000,
});

/**
 * Converts MySQL-style '?' placeholders to PostgreSQL '$n' placeholders.
 * Also handles basic 'SET ?' conversion for INSERT/UPDATE if it's the only param.
 */
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
        const placeholders = keys.map((_, i) => `$${i + 1}`).join(', ');
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
        const setClause = keys.map((key, i) => `${key} = $${i + 1}`).join(', ');
        
        sql = sql.replace(/SET\s+\?/i, `SET ${setClause}`);
        
        let placeholderCount = keys.length;
        sql = sql.replace(/\?/g, () => {
            placeholderCount++;
            return `$${placeholderCount}`;
        });
        
        newParams = [...Object.values(obj), ...remainingParams];
        return { sql, params: newParams };
    }

    // Standard "?" to "$n" replacement
    let count = 0;
    sql = sql.replace(/\?/g, () => {
        count++;
        return `$${count}`;
    });

    return { sql, params: newParams };
}

module.exports = {
    query: async function (qry, param = [], callback) {
        const { sql, params } = convertQuery(qry, param);
        try {
            const res = await pool.query(sql, params);
            if (callback) callback(null, res.rows);
            return res.rows;
        } catch (err) {
            if (callback) callback(err);
            throw err;
        }
    },
    pool: function (qry, param = [], callback) {
        this.query(qry, param, callback);
    }
};
