const VARS = require('../vars.js');

var mysql = require('../../../helpers/mysqlConnector.js');
const TABLE = VARS.table_name;

module.exports = {
    get: (params) =>{
        return new Promise((resolve, reject)=>{
            mysql.pool(`SELECT * from ${TABLE} WHERE name = ? AND group_id = ? AND car_id = ?;`, [params.name, params.group_id, params.car_id], (err,result) =>{
                if(result){
                    resolve(result);
                }else{
                    reject(err);
                }
            });
        })
    },
    update: (payload, params) =>{
        return new Promise((resolve, reject)=>{
            mysql.pool(`SELECT id FROM ${TABLE} WHERE name = ? AND group_id = ? AND car_id = ?;`, [params.name, params.group_id, params.car_id], async (e, r) =>{
                if(r.length){
                    mysql.pool(`UPDATE ${TABLE} SET ?, date_modified = utc_timestamp() WHERE name = ? AND group_id = ? AND car_id = ?;`, [payload, params.name, params.group_id, params.car_id], (err,result) =>{
                        if(result){
                            resolve(result);
                        }else{
                            reject(err);
                        }
                    });
                }else{
                    const result = await module.exports.insert(payload);

                    if(result){
                        resolve(result);
                    }else{
                        reject(err);
                    }
                }
            });
        })
    },
    insert: (payload) =>{
        return new Promise((resolve, reject) =>{
            mysql.pool(`INSERT INTO ${TABLE} SET ?, date_created = utc_timestamp();`, [payload], (err, result) =>{
                if(result){
                    resolve(result);
                }else{
                    reject(err);
                }
            })
        });
    }
}