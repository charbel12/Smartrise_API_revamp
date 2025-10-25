const VARS = require("../vars.js");
const MOMENT = require("moment");
var mysql = require("../../../helpers/mysqlConnector.js");
const TABLE_NAME = VARS.table_name;
const TOOLS = require("../../../helpers/tools.js");

const { Op, fn, col,literal } = require("sequelize");
const { sequelize, Sequelize, RptFaults, SystemFaults ,RptAlarms,SystemAlarms,RptWait, ProgramEvents,RptServices,RefCategory,RefClass } = require('../../../database/models');


module.exports = {
  carUse: function (data, callback = null) {
    data = alterData(data);
    var async = require("async");
    let car_id = data.car_id ? ` AND car_id = ${data.car_id}` : "";

    var _params = {
      carCalls: function (cb) {
        var _query = `
                    SELECT 
                        group_id,
                        car_id,
                        count(id) as total_count,
                        DATE(date_created) as day_created,
                        HOUR(date_created) as hour_created
                    FROM 
                        rpt_carcalls 
                    WHERE
                        group_id = ?
                        ${car_id}
                    AND
                        date_created >= ?
                    AND
                        date_created <= ?
                    GROUP BY
                        group_id,
                        car_id,
                        day_created, 
                        hour_created
                `;
        mysql.pool(
          _query,
          [data.group_id, data.date_from, data.date_to],
          function (err, result) {
            console.log("The result is ", result);
            // for(var i=0; i< result.length; i++){
            //     result[i]['date_created'] = MOMENT(result[i]['date_created']).format("YYYY-MM-DDTHH:mm:ss").toString()+".000Z";
            // }
            cb(err, result);
          }
        );
      },
      hallCalls: function (cb) {
        var _query = `
                    SELECT 
                        group_id,
                        count(id) as total_count,
                        DATE(date_created) as day_created,
                        HOUR(date_created) as hour_created
                    FROM 
                        rpt_hallcalls 
                    WHERE
                        group_id = ?
                    AND
                        date_created >= ?
                    AND
                        date_created <= ?
                    GROUP BY
                        group_id,
                        hour_created,
                        day_created
                   
                `;
        mysql.pool(
          _query,
          [data.group_id, data.date_from, data.date_to],
          function (err, result) {
            cb(err, result);
          }
        );
      },
    };

    async.parallel(_params, function (err, results) {
      callback(err, results);
    });
  },
  faultSummary: function (data, callback = null) {
    data = alterData(data);
    var _query = `
            SELECT
                count(ef.id) as total_count,
                ef.elevator_id,
                ef.elevator_group_id,
                sf.*
            FROM
                elevator_faults ef 
            LEFT JOIN 
                system_faults sf 
            ON 
                ef.fault_id = sf.number
            WHERE
                ef.date_created >= "${data.date_from}" 
            AND 
                ef.date_created <= "${data.date_to}" 
            AND 
                ef.elevator_group_id="${data.group_id}" 
            GROUP BY
              ef.elevator_id,
             ef.elevator_group_id,
             sf.id,
              sf.number,
             sf.tag,
             sf.oos,
            sf.construction,
               sf.clear_type,
             sf.clear_ccs,
             sf.priority,
              sf.name,
              sf.definition,
               sf.category,
                sf.solution
        `;
    mysql.pool(
      _query,
      [data.group_id, data.date_from, data.date_to],
      function (err, result) {
        callback(err, result);
      }
    );
  },

  faultHistory: async function (data, callback = null) {
    data = alterData(data);
const where = {
  date_created: { [Op.between]: [data.date_from, data.date_to] },
  ...(data.group_id ? { elevator_group_id: Number(data.group_id) } : {}),
  ...(data.car_id ? { elevator_id: Number(data.car_id) } : {}),
  ...(data.floor_pi
      ? { floor_index: `${data.floor_pi}` }
      : {}),
};
    try {
      const results = await RptFaults.findAll({
        attributes: [
          "id",
          "elevator_id",
          "elevator_group_id",
          ["date_created", "fault_date"],
          [
            sequelize.literal(
              "DATE_FORMAT(`date_created`, '%Y-%m-%d %H:%i:%S')"
            ),
            "new_date",
          ],
          "fault_speed",
          "fault_position",
          "car_speed",
          "car_position",
          ["floor_index", "floor_index"],

        ],
        include: [
          {
            model: SystemFaults,
            required: false,
            as: "system_fault",
            attributes: [
              "id",
              "number",
              "tag",
              "construction",
              "clear_type",
              "clear_ccs",
              "priority",
              "name",
              "definition",
            ],
          },
        ],
        where,
        order: [["date_created", "ASC"]],
        raw: true,
        logging: console.log,
      });

      if (callback) {
        return callback(null, results); // old style
      } else {
        return results; // promise style
      }
    } catch (err) {
      console.error("Error fetching faults:", err);

      if (callback) {
        return callback(err); // pass error to callback
      } else {
        throw err; // let promise reject
      }
    }

    /*var tableDefinition = {
      sSelectSql: "*",
      sFromSql: `(
                SELECT
                    ef.elevator_id,
                    ef.elevator_group_id,
                    ef.date_created AS fault_date,
                    DATE_FORMAT(ef.date_created, '%Y-%m-%d %H:%i:%S') AS new_date,
                    ef.fault_speed,
                    ef.fault_position,
                    ef.car_speed,
                    ef.car_position,
                    ef.floor_pi  AS floor_pi,
                    sf.*
                FROM
                    rpt_faults ef
                LEFT JOIN
                    system_faults sf
                ON
                    ef.fault_id = sf.number
                WHERE
                    ef.date_created BETWEEN "${data.date_from}" AND "${
        data.date_to
      }"
                AND
                    ef.elevator_group_id="${data.group_id}"
                ${
                  data.car_id ? ' AND ef.elevator_id="' + data.car_id + '"' : ""
                }
                ${
                  data.floor_pi
                    ? " AND ef.floor_index=" + data.floor_pi + ""
                    : ""
                }
                group by 
                    ef.elevator_id, 
                    ef.fault_id, 
                    ef.date_created
                    
            ) as sqlQuery`,
      aSearchColumns: ["number", "name", "definition", "solution", "tag"],
    };*/
  },
  alarmHistory:async function (data, callback = null) {
    data = alterData(data);
    const where= {
      date_created: { [Op.between]: [data.date_from, data.date_to] },
      elevator_group_id: data.group_id,
      ...(data.car_id ? { elevator_id: data.car_id } : {}),
      ...(data.floor_pi ? { floor_index: data.floor_pi } : {}),
    };
try{
  const results = await RptAlarms.findAll({
    attributes: [
      "id",
      "elevator_id",
      "elevator_group_id",
      ["date_created", "alarm_date"],
      [
        sequelize.literal("DATE_FORMAT(`RptAlarms`.`date_created`, '%Y-%m-%d %H:%i:%S')"),
        "new_date",
      ],
      "alarm_speed",
      "alarm_position",
      "car_speed",
      "car_position",
      ["floor_index", "floor_index"],
    ],
    include: [
      {
        model: SystemAlarms,
        as: "system_alarms", 
        required: false,
        attributes: [ "id",
              "number",
              "name",
              "solution",
              "category",
              "definition",],
      },
    ],
    where,
    order: [["date_created", "ASC"]],
    raw: true,
    logging: console.log,
  });


  if (callback) {
        return callback(null, results); // old style
      } else {
        return results; // promise style
      }
    } catch (err) {
      console.error("Error fetching faults:", err);

      if (callback) {
        return callback(err); // pass error to callback
      } else {
        throw err; // let promise reject
      }
    }






    /*var async = require("async"),
      QueryBuilder = require("datatable");

    var tableDefinition = {
      sSelectSql: "*",
      sFromSql: `(
                SELECT
                    ea.elevator_id,
                    ea.elevator_group_id,
                    ea.date_created AS alarm_date,
                    DATE_FORMAT(ea.date_created, '%Y-%m-%d %H:%i:%S') AS new_date,
                    ea.alarm_speed,
                    ea.alarm_position,
                    ea.car_speed,
                    ea.car_position,
                    ea.floor_pi AS floor_pi,
                    sa.*
                FROM
                    rpt_alarms ea
                LEFT JOIN
                    system_alarms sa
                ON
                    ea.alarm_id = sa.number
                WHERE
                    ea.date_created >= "${data.date_from}"
                AND 
                    ea.date_created <= "${data.date_to}"
                AND 
                    ea.elevator_group_id="${data.group_id}"
                ${
                  data.car_id ? ' AND ea.elevator_id="' + data.car_id + '"' : ""
                }
                ${
                  data.floor_pi
                    ? " AND ea.floor_index=" + data.floor_pi + ""
                    : ""
                }
                group by
                    ea.date_created,
                    ea.alarm_id
            ) as sqlQuery`,
      aSearchColumns: ["number", "name", "definition", "solution", "tag"],
    };

    var queryBuilder = new QueryBuilder(tableDefinition);

    // requestQuery is normally provided by the DataTables AJAX call
    var requestQuery = {
      start: 0,
      length: 10,
      search: {
        value: "",
        regex: false,
      },
    };

    var opts = TOOLS.extendDefaults(requestQuery, data);
    opts = TOOLS.datatableColumnName(opts);
    // Build an object of SQL statements
    var queries = queryBuilder.buildQuery(opts);
    // Connect to the database
    var _params = {
      recordsTotal: function (cb) {
        mysql.pool(queries.recordsTotal, [], function (error, results) {
          cb(error, results);
        });
      },
      select: function (cb) {
        mysql.pool(queries.select, [], function (error, results) {
          cb(error, results);
        });
      },
    };

    if (opts.search.value != "") {
      _params["recordsFiltered"] = function (cb) {
        mysql.pool(queries.recordsTotal, [], function (error, results) {
          cb(error, results);
        });
      };
    }

    async.parallel(_params, function (err, results) {
      callback(err, queryBuilder.parseResponse(results));
    });
  },
  faultsDefinition: function (data, callback = null) {
    var async = require("async"),
      QueryBuilder = require("datatable");

    var tableDefinition = {
      sTableName: "system_faults",
    };

    var queryBuilder = new QueryBuilder(tableDefinition);

    // requestQuery is normally provided by the DataTables AJAX call
    var requestQuery = {
      start: 0,
      length: 10,
      search: {
        value: "",
        regex: false,
      },
    };

    var opts = TOOLS.extendDefaults(requestQuery, data);
    opts = TOOLS.datatableColumnName(opts);
    // Build an object of SQL statements
    var queries = queryBuilder.buildQuery(opts);

    // Connect to the database
    var _params = {
      recordsTotal: function (cb) {
        mysql.pool(queries.recordsTotal, [], function (error, results) {
          cb(error, results);
        });
      },
      select: function (cb) {
        mysql.pool(queries.select, [], function (error, results) {
          cb(error, results);
        });
      },
    };

    if (opts.search.value != "") {
      _params["recordsFiltered"] = function (cb) {
        mysql.pool(queries.recordsTotal, [], function (error, results) {
          cb(error, results);
        });
      };
    }

    async.parallel(_params, function (err, results) {
      callback(err, queryBuilder.parseResponse(results));
    });*/
  },
  alarmsDefinition: function (data, callback = null) {
    var async = require("async"),
      QueryBuilder = require("datatable");

    var tableDefinition = {
      sTableName: "system_alarms",
    };

    var queryBuilder = new QueryBuilder(tableDefinition);

    // requestQuery is normally provided by the DataTables AJAX call
    var requestQuery = {
      start: 0,
      length: 10,
      search: {
        value: "",
        regex: false,
      },
    };

    var opts = TOOLS.extendDefaults(requestQuery, data);
    opts = TOOLS.datatableColumnName(opts);
    // Build an object of SQL statements
    var queries = queryBuilder.buildQuery(opts);

    // Connect to the database
    var _params = {
      recordsTotal: function (cb) {
        mysql.pool(queries.recordsTotal, [], function (error, results) {
          cb(error, results);
        });
      },
      select: function (cb) {
        mysql.pool(queries.select, [], function (error, results) {
          cb(error, results);
        });
      },
    };

    if (opts.search.value != "") {
      _params["recordsFiltered"] = function (cb) {
        mysql.pool(queries.recordsTotal, [], function (error, results) {
          cb(error, results);
        });
      };
    }

    async.parallel(_params, function (err, results) {
      callback(err, queryBuilder.parseResponse(results));
    });
  },
  carCallsFloor: function (data, callback = null) {
    data = alterData(data);
    var _query = `
        SELECT 
        group_id,
        car_id,
        floor_id,
        COUNT(id) AS total_count,
        DATE(date_created) AS day_created
    FROM 
        rpt_carcalls 
    WHERE
        group_id = ?
        AND date_created BETWEEN ? AND ?
    GROUP BY
        group_id,
        car_id,
        floor_id,
        DATE(date_created)
    ORDER BY
        floor_id DESC;
    
        `;

    mysql.pool(
      _query,
      [data.group_id, data.date_from, data.date_to],
      function (err, result) {
        callback(err, result);
      }
    );
  },
  carCallsTime: function (data, callback = null) {
    data = alterData(data);

    var _query = `
            SELECT 
                group_id,
                car_id,
                count(id) as total_count,
                DATE(date_created) as day_created,
                HOUR(date_created) as hour_created
            FROM 
                rpt_carcalls 
            WHERE
                group_id = ?
            AND
                date_created BETWEEN ? AND ?
            GROUP BY
                group_id,
                car_id,
                day_created, 
                hour_created
        `;
    mysql.pool(
      _query,
      [data.group_id, data.date_from, data.date_to],
      function (err, result) {
        console.log('results',result)
        callback(err, result);
      }
    );
  },
  hallCallsFloor: function (data, callback = null) {
    data = alterData(data);

    var _query = `
            SELECT 
                group_id,
                floor_id,
                direction,
                count(id) as total_count,
                DATE(date_created) as day_created
            FROM 
                rpt_hallcalls 
            WHERE
                group_id = ?
            AND
                date_created >= ?
            AND
                date_created <= ?
            GROUP BY
                group_id,floor_id,direction,DATE(date_created)
            
        `;
    mysql.pool(
      _query,
      [data.group_id, data.date_from, data.date_to],
      function (err, result) {
        callback(err, result);
      }
    );
  },
  hallCallsTime: function (data, callback = null) {
    data = alterData(data);

    var _query = `
            SELECT 
                group_id,
                floor_id,
                direction,
                count(id) as total_count,
                DATE(date_created) as day_created,
                HOUR(date_created) as hour_created
            FROM 
                rpt_hallcalls 
            WHERE
                group_id = ?
            AND
                date_created BETWEEN ? AND ?
            GROUP BY
                group_id,
                floor_id,
                direction,
                day_created,
                hour_created
            ORDER BY
                floor_id desc
        `;
    mysql.pool(
      _query,
      [data.group_id, data.date_from, data.date_to],
      function (err, result) {
        console.log('result',result);

        callback(err, result);
      }
    );
  },
  doorTimes: function (data, callback = null) {
    data = alterData(data);

    if (typeof data.floor_id === "undefined") {
      data.floor_id = "null is null";
    }

    var _query = `
            SELECT 
                group_id,
                car_id,
                door_state,
                ROUND(AVG(time_sec),1) as average
            FROM 
                rpt_doors 
            WHERE
                group_id = ?
            AND
                floor_id = ${
                  typeof data.floor_id === "undefined"
                    ? "null is null"
                    : data.floor_id
                }
            AND
                date_created >= ?
            AND
                date_created <= ?
            GROUP BY
                group_id,
                car_id,
                door_state
        `;

    mysql.pool(
      _query,
      [data.group_id, data.date_from, data.date_to],
      function (err, result) {
        callback(err, result);
      }
    );
  },
  outOfService:async function (data, callback = null) {
 data = alterData(data);

   const where = {
    [Op.and]: [
      sequelize.where(
        fn(
          "CONCAT",
          col("RptServices.mode_of_operation"),
          col("RptServices.class_of_operation")
        ),
        { [Op.ne]: "23" }
      ),
    ],
    group_id: data.group_id, 
    ...(data.date_from && data.date_to
      ? { date_created: { [Op.between]: [data.date_from, data.date_to] } }
      : {}),
    ...(data.car_id ? { car_id: data.car_id } : {}),
  };
try{
const results = await RptServices.findAll({
  attributes: [
    
    "id",
    "group_id",
    "car_id",
    "floor_id",
    "mode_of_operation",
    "class_of_operation",

    [
      fn(
        "CONCAT",
        col("refClassCategory->refClass.name"),
        literal(" ' / ' "),
        col("refClassCategory.name")
      ),
      "mode_of",
    ],
    [
      literal(
        "CONCAT(" +
          "FLOOR(TIMESTAMPDIFF(SECOND, `RptServices`.`date_created`, `RptServices`.`date_next`) / 86400), 'd ', " +
          "FLOOR(MOD(TIMESTAMPDIFF(SECOND, `RptServices`.`date_created`, `RptServices`.`date_next`), 86400) / 3600), 'h ', " +
          "FLOOR(MOD(TIMESTAMPDIFF(SECOND, `RptServices`.`date_created`, `RptServices`.`date_next`), 3600) / 60), 'm'" +
        ")"
      ),
      "DURATION",
    ],
    [
      literal(
        "DATE_FORMAT(`RptServices`.`date_created`, '%d/%m/%Y %H:%i:%s')"
      ),
      "Date & Time",
    ],
  ],

  include: [
    {
      model: RefCategory,
      as: "refClassCategory",
      attributes: [],
      required: true,
      constraints: false,
      on: {
        ref_cat_id: { [Op.eq]: col("RptServices.mode_of_operation") },
        ref_class_id: { [Op.eq]: col("RptServices.class_of_operation") },
      },
      include: [
        {
          model: RefClass,
          as: "refClass",
          attributes: [],
          required: true,
          constraints: false,
          on: {
            class_id: { [Op.eq]: col("refClassCategory.ref_class_id") },
          },
        },
      ],
    },
  ],

  where,
  order: [["date_created", "ASC"]],
  raw: true,
});
      if (callback) {
        console.log('results ',results);
        return callback(null, results);
      } else {
        return results;
      }
    } catch (err) {
      console.error('Error fetching services:', err);
      if (callback) {
        return callback(err);
      } else {
        throw err;
      }
    }
  },




   /* var date = data.date_from
      ? `AND date_created BETWEEN '${data.date_from}' AND '${data.date_to}'`
      : "";
    var cID = data.car_id ? `AND car_id = ${data.car_id}` : "";*/
     
    /*  sFromSql: `(
                
                SELECT 
                    rpt_services.*,
                    CONCAT(ref_class.name,
                            ' / ',
                            ref_class_category.name) AS mode_of,
                    TIMESTAMPDIFF(SECOND,
                        date_created,
                        date_next) AS DURATION
                FROM
                    rpt_services,
                    ref_class_category,
                    ref_class
                WHERE
                    rpt_services.mode_of_operation = ref_class_category.ref_cat_id
                        AND rpt_services.class_of_operation = ref_class_category.ref_class_id
                        AND ref_class.class_id = ref_class_category.ref_class_id
                        AND CONCAT(mode_of_operation, class_of_operation) != '23'
                        AND group_id = ${data.group_id}
                        ${date}
                        ${cID}
                        group by mode_of
                    
                ) as sqQ`,*/
     

  inServiceOverview: function (data, callback = null) {
    let dateInput;

    if (data.date && MOMENT(data.date, "MM/DD/YYYY", true).isValid()) {
      dateInput = MOMENT(data.date, "MM/DD/YYYY").format("YYYY-MM-DD");
    } else {
      dateInput = MOMENT().format("YYYY-MM-DD");
    }

    let carsIn = "";
    let params = [data.group_id];

    if (data.car_ids && data.car_ids.length > 0) {
      carsIn = "AND car_id IN (?)";
      params.push(data.car_ids);
    }

    params.push(dateInput);

    const query = `
            SELECT 
                group_id,
                car_id,
                floor_id,
                mode_of_operation,
                class_of_operation,
                date_created,
                date_next,
                date_created AS max_date,
                date_created AS min_date,
                DATE(date_created) as day_created
            FROM
                rpt_services
            WHERE 
                group_id = ?
            AND
                class_of_operation <> -2
            AND
                class_of_operation <> 0
            AND
                DATE(date_created) >= ?
            ${carsIn}
            GROUP BY 
                DATE(date_created),
                group_id,
                car_id,
                floor_id,
                date_created,
                date_next,
                mode_of_operation,
                class_of_operation
            ORDER BY
                car_id ASC,
                date_created ASC`;

    mysql.pool(query, params, function (err, result) {
      if (err) {
        console.error(err);

        return callback(err, null);
      }
      console.error("Result: ", result);

      callback(null, result);
    });
  },
  waitTimeAveTimeDay: function (data, callback = null) {
    data = alterData(data);

    var _query = `
            SELECT 
                 group_id,
                floor_id,
                direction ,
                HOUR(date_created) as hour_created,
                ROUND(AVG(wait_time),1) as average
            FROM 
                rpt_wait
            WHERE
                group_id = ?
            AND
                date_created >= ?
            AND
                date_created <= ?
            GROUP BY
                group_id,
                floor_id,
              hour_created,
                direction
        `;
    mysql.pool(
      _query,
      [data.group_id, data.date_from, data.date_to],
      function (err, result) {
        console.log('result ',result);
        callback(err, result);
      }
    );
  },
  waitTimeAveTimeFloor: function (data, callback = null) {
    data = alterData(data);

    var _query = `
            SELECT 
                group_id,
                floor_id,
                direction,
                HOUR(date_created) as hour_created,
                ROUND(AVG(wait_time),1) as average
            FROM 
                rpt_wait
            WHERE
                group_id = ?
            AND
                date_created >= ?
            AND
                date_created <= ?
            GROUP BY
                group_id,
                floor_id,
                direction,
                hour_created
        `;
    mysql.pool(
      _query,
      [data.group_id, data.date_from, data.date_to],
      function (err, result) {
        console.log('result ',result );
        callback(err, result);
      }
    );
  },
  waitTime: function (data, callback = null) {
    data = alterData(data);

    var _query = `
            SELECT 
                * ,
                HOUR(date_created) as hour_created
            FROM 
                rpt_wait
            WHERE
                group_id = ?
            AND
                date_created >= ?
            AND
                date_created <= ?
        `;
    mysql.pool(
      _query,
      [data.group_id, data.date_from, data.date_to],
      function (err, result) {
        callback(err, result);
      }
    );
  },
  waitTimesLongest:  async function (data, callback = null)  {
    data = alterData(data);
 try{
const results = await RptWait.findAll({
  attributes: [
    "id",
    "group_id",
    "floor_id",
    [
      Sequelize.literal("CONCAT('Floor', ' ', `RptWait`.`floor_id`)"),
      "floor_name",
    ],
    "direction",
    "date_created",
    "wait_time",
  ],
  where: {
    wait_time: {
      [Op.gte]: 50,
    },
    date_created: {
      [Op.gte]: data.date_from,
      [Op.lte]: data.date_to,
    },
    group_id: data.group_id,
  },
  order: [["date_created", "ASC"]],
});

   if (callback) {
    console.log(results);
        return callback(null, results); 
      } else {
        return results; 
      }
    } catch (err) {
      console.error("Error fetching faults:", err);

      if (callback) {
        return callback(err); 
      } else {
        throw err; 
      }
    }

    /*
      //sTableName: 'rpt_wait',
      sSelectSql: "*",
      sFromSql: `
                (SELECT 
                    id, 
                    group_id, 
                    floor_id, 
                    CONCAT('Floor', ' ',floor_id) as floor_name, 
                    direction, 
                    date_created, 
                    wait_time
                FROM
                    rpt_wait
                WHERE
                    wait_time >= 50 
                AND 
                    date_created >= '${data.date_from}' 
                AND
                    date_created <= '${data.date_to}' 
                AND 
                    group_id= ${data.group_id}
            )as sqQ
            `,*/
     
  },

  waitTimesDistributionUp: function (data, callback = null) {
    data = alterData(data);

    const date = data.date_from
      ? `AND date_created between '${data.date_from}' and '${data.date_to}' `
      : "";

    var _query = `
        SELECT 
            *, HOUR(date_created) as hour_created
        FROM
            rpt_wait
        WHERE
            direction = 'up'
        AND 
            group_id = '${data.group_id}'
            ${date}
    ;
        `;
    mysql.pool(_query, [], function (err, result) {
      console.log('result ',result);
      callback(err, result);
    });
  },

  waitTimesDistributionDown: function (data, callback = null) {
    data = alterData(data);

    const date = data.date_from
      ? `AND date_created between'${data.date_from}' and '${data.date_to}' `
      : "";
    var _query = `
        SELECT 
            *, HOUR(date_created) as hour_created
        FROM
            rpt_wait
        WHERE
            direction = 'down'
        AND 
            group_id = '${data.group_id}'
            ${date}
    ;
        `;
    mysql.pool(_query, [], function (err, result) {
      callback(err, result);
    });
  },
  waitTimesDistributionWaitTime: function (data, callback = null) {
    data = alterData(data);
    const date = data.date_from
      ? `AND date_created between'${data.date_from}' and '${data.date_to}'`
      : "";
    var _query = `
        SELECT 
            *, HOUR(date_created) as hour_created
        FROM
            rpt_wait
        WHERE
            group_id = '${data.group_id}'
            ${date}
    ;
        `;
    mysql.pool(_query, [], function (err, result) {
      callback(err, result);
    });
  },

  floorToFloor: function (data, callback = null) {
    data = alterData(data);
    var async = require("async");

    var _params = {
      fromFloor: function (cb) {
        var _query = `  
                    SELECT 
                         group_id,
                        car_id,
                        floor_from,
                        floor_to,
                        direction,
                        ROUND(AVG(wait_time), 1) as average
                    FROM 
                        rpt_floortfloor
                    WHERE
                        group_id = '${data.group_id}'
                    AND
                        floor_from = '6'
                    AND
                        date_created >= '${data.date_from}'
                    AND
                        date_created <= '${data.date_to}'
                    GROUP BY
                        group_id,
                        car_id,
                        floor_from,
                        floor_to,
                        direction
                `;
        mysql.pool(
          _query,
          [data.group_id, data.floor_id, data.date_from, data.date_to],
          function (err, result) {
            cb(err, result);
          }
        );
      },
      toFloor: function (cb) {
        var _query = `  
                    SELECT 
                         group_id,
                        car_id,
                        floor_from,
                        floor_to,
                        direction,
                        ROUND(AVG(wait_time),1) as average
                    FROM 
                        rpt_floortfloor
                    WHERE
                    group_id = '${data.group_id}'
                    AND
                        floor_to = '6'
                    AND
                        date_created >= '${data.date_from}'
                    AND
                        date_created <= '${data.date_to}'
                    GROUP BY
                        group_id,
                        car_id,
                        floor_from,
                        floor_to,
                        direction
                `;
        mysql.pool(
          _query,
          [data.group_id, data.floor_id, data.date_from, data.date_to],
          function (err, result) {
            cb(err, result);
          }
        );
      },
    };

    async.parallel(_params, function (err, results) {
      callback(err, results);
    });
  },
  programEvents:async function (data, callback = null) {

    data = alterData(data);

    const type = data.type ? `AND type = '${data.type}'` : "";

const where = {
  date_created: { [Op.between]: [data.date_from, data.date_to] },
  ...(data.type
    ? Array.isArray(data.type)
      ? { type: { [Op.in]: data.type } }
      : { type: data.type }
    : {}),
};
try{
const results = await ProgramEvents.findAll({
  attributes: [
    'id',
    [fn('DATE_FORMAT', col('date_created'), '%d/%m/%Y %H:%i:%s'), 'date_created'],
    [fn('CONCAT', col('type'), ' : ', col('description')), 'type & description'],
  ],
  where: {
    date_created: { [Op.between]: [data.date_from, data.date_to] },
    ...(data.type ? { type: data.type } : {}),
  },
  order: [['date_created', 'ASC']],
  raw: true,
});
 if (callback) {
    console.log(results);
        return callback(null, results); 
      } else {
        return results; 
      }
    } catch (err) {
      console.error("Error fetching faults:", err);

      if (callback) {
        return callback(err); 
      } else {
        throw err; 
      }
    }
    /*var tableDefinition = {
      sSelectSql: "*",
      sFromSql: `
                (SELECT CONCAT(rpt_program_events.type,": ",rpt_program_events.description) as data,
                date_created,
                DATE_FORMAT(date_created, "%Y-%m-%d %H:%i:%s") AS new_date_created
            FROM
                rpt_program_events
            WHERE
                date_created between  '${data.date_from}' and '${data.date_to}'
                ${type}
                            )as sqQ
            `,*/
      
  },
};

function alterData(data) {
  try {
    if (!data.date_from) {
      data.date_from = MOMENT.utc(
        MOMENT("1990-01-01 00:00:00").format()
      ).format();
    } else {
      if (data.start_time && data.end_time) {
        data.date_from = MOMENT(
          MOMENT(data.date_from + " " + data.start_time, [
            "MM-DD-YYYY HH:mm:ss",
            "YYYY-MM-DD HH:mm:ss",
          ]).format("YYYY-MM-DD HH:mm:ss")
        )
          .utc()
          .format("YYYY-MM-DD HH:mm:ss");
      } else {
        // data.date_from = data.date_from = MOMENT(data.date_from + " " + MOMENT().format("HH:mm:ss"), ["MM-DD-YYYY HH:mm:ss", "YYYY-MM-DD HH:mm:ss"]).utc().format("YYYY-MM-DD");
        data.date_from = MOMENT(
          MOMENT(data.date_from + " 00:00:00", [
            "MM-DD-YYYY HH:mm:ss",
            "YYYY-MM-DD HH:mm:ss",
          ]).format("YYYY-MM-DD HH:mm:ss")
        )
          .utc()
          .format("YYYY-MM-DD HH:mm:ss");
      }
    }
    if (!data.date_to) {
      data.date_to = MOMENT.utc(MOMENT().format()).format();
    } else {
      if (data.start_time && data.end_time) {
        data.date_to = MOMENT(
          MOMENT(data.date_to + " " + data.end_time, [
            "MM-DD-YYYY HH:mm:ss",
            "YYYY-MM-DD HH:mm:ss",
          ]).format("YYYY-MM-DD HH:mm:ss")
        )
          .utc()
          .format("YYYY-MM-DD HH:mm:ss");
      } else {
        //  data.date_to = data.date_to = MOMENT(data.date_to + " " + MOMENT().format("HH:mm:ss"), ["MM-DD-YYYY HH:mm:ss", "YYYY-MM-DD HH:mm:ss"]).utc().format("YYYY-MM-DD");
        data.date_to = MOMENT(
          MOMENT(data.date_to + " 23:59:59", [
            "MM-DD-YYYY HH:mm:ss",
            "YYYY-MM-DD HH:mm:ss",
          ]).format("YYYY-MM-DD HH:mm:ss")
        )
          .utc()
          .format("YYYY-MM-DD HH:mm:ss");
      }
    }
    return data;
  } catch (err) {}
}
