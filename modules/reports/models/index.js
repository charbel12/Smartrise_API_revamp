const VARS = require("../vars.js");
const MOMENT = require("moment");
const { Op, fn, col, literal, and } = require("sequelize");
const {
  sequelize,
  RptCarCalls,
  RptHallCalls,
  RptFaults,
  SystemFaults,
  RptAlarms,
  SystemAlarms,
  RptWait,
  RptProgramEvents: ProgramEvents,
  RptServices,
  RefCategory,
  RefClass,
  RptDoors,
  RptFloorToFloor,
} = require("../../../database/models");

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
  } catch (err) { }
}

module.exports = {
  carUse: async function (data, callback = null) {
    data = alterData(data);
    const { car_id, date_from, date_to } = data;
    const where = {
      date_created: {
        [Op.between]: [date_from, date_to],
      },
      ...(car_id && { car_id: car_id }),
    };
    try {
      const carCalls = await RptCarCalls.findAll({
        attributes: [
          "car_id",
          [fn("COUNT", col("id")), "total_count"],
          [fn("DATE", col("date_created")), "day_created"],
          [fn("date_part", "hour", col("date_created")), "hour_created"],
        ],
        where,
        group: ["car_id", "day_created", "hour_created"],
      });
      const hallCalls = await RptHallCalls.findAll({
        attributes: [
          [fn("COUNT", col("id")), "total_count"],
          [fn("DATE", col("date_created")), "day_created"],
          [fn("date_part", "hour", col("date_created")), "hour_created"],
        ],
        where,
        group: ["hour_created", "day_created"],
      });

      const results = {
        carCalls,
        hallCalls,
      };
      if (callback) {
        return callback(null, results);
      }
    } catch (error) {
      if (callback) {
        return callback(error);
      }
    }
  },
  faultSummary: async function (data, callback = null) {
    data = alterData(data);
    const { car_id, date_from, date_to } = data;
    const where = {
      date_created: {
        [Op.between]: [date_from, date_to],
      },
      ...(car_id && { car_id: car_id }),
    };

    try {
      const results = await RptFaults.findAll({
        attributes: [
          [fn("COUNT", col("RptFaults.id")), "total_count"],
          "elevator_id",
        ],
        include: [
          {
            model: SystemFaults,
            as: "system_faults",
            attributes: [],
          },
        ],
        where,
        group: ["elevator_id", "system_faults.id"],
        raw: true,
      });
      if (callback) {
        return callback(null, results);
      }
    } catch (error) {
      if (callback) {
        return callback(error);
      }
    }
  },

  faultHistory: async function (data, callback = null) {
    data = alterData(data);
    const where = {
      date_created: { [Op.between]: [data.date_from, data.date_to] },
      ...(data.car_id ? { elevator_id: Number(data.car_id) } : {}),
      ...(data.floor_pi ? { floor_index: `${data.floor_pi}` } : {}),
    };
    try {
      const results = await RptFaults.findAll({
        attributes: [
          "id",
          "elevator_id",
          ["date_created", "fault_date"],
          [
            sequelize.literal(
              "to_char(\"date_created\", 'YYYY-MM-DD HH24:MI:SS')"
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
  },
  alarmHistory: async function (data, callback = null) {
    data = alterData(data);
    const where = {
      date_created: { [Op.between]: [data.date_from, data.date_to] },
      ...(data.car_id ? { elevator_id: data.car_id } : {}),
      ...(data.floor_pi ? { floor_index: data.floor_pi } : {}),
    };
    try {
      const results = await RptAlarms.findAll({
        attributes: [
          "id",
          "elevator_id",
          ["date_created", "alarm_date"],
          [
            sequelize.literal(
              "to_char(\"RptAlarms\".\"date_created\", 'YYYY-MM-DD HH24:MI:SS')"
            ),
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
            attributes: [
              "id",
              "number",
              "name",
              "solution",
              "category",
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
  },
  alarmsDefinition: async function (data, callback = null) {
    const { search } = data;
    const where = {
      ...(search && {
        [Op.or]: [
          { name: { [Op.like]: `%${search}%` } },
          { solution: { [Op.like]: `%${search}%` } },
          { category: { [Op.like]: `%${search}%` } },
          { definition: { [Op.like]: `%${search}%` } },
        ],
      }),
    };
    try {
      const results = await SystemAlarms.findAll({ where });
      if (callback) {
        return callback(null, results);
      }
    } catch (error) {
      if (callback) {
        return callback(error);
      }
    }
  },
  carCallsFloor: async function (data, callback = null) {
    data = alterData(data);
    const { car_id, date_from, date_to } = data;
    const where = {
      date_created: {
        [Op.between]: [date_from, date_to],
      },
      ...(car_id && { car_id: car_id }),
    };

    try {
      const results = await RptCarCalls.findAll({
        attributes: [
          "car_id",
          "floor_id",
          [fn("COUNT", col("id")), "total_count"],
          [fn("DATE", col("date_created")), "day_created"],
        ],
        where,
        group: ["car_id", "floor_id", "day_created"],
        order: [["floor_id", "DESC"]],
      });
      if (callback) {
        return callback(null, results);
      }
    } catch (error) {
      if (callback) {
        return callback(error);
      }
    }
  },
  carCallsTime: async function (data, callback = null) {
    data = alterData(data);
    const { car_id, date_from, date_to } = data;

    const where = {
      date_created: {
        [Op.between]: [date_from, date_to],
      },
      ...(car_id && { car_id: car_id }),
    };
    try {
      const results = await RptCarCalls.findAll({
        attributes: [
          "car_id",
          [fn("COUNT", col("id")), "total_count"],
          [fn("DATE", col("date_created")), "day_created"],
          [fn("date_part", "hour", col("date_created")), "hour_created"],
        ],
        where,
        group: ["car_id", "day_created", "hour_created"],
      });
      if (callback) {
        return callback(null, results);
      }
    } catch (error) {
      if (callback) {
        return callback(error);
      }
    }
  },
  hallCallsFloor: async function (data, callback = null) {
    data = alterData(data);
    const { car_id, date_from, date_to } = data;
    const where = {
      date_created: {
        [Op.between]: [date_from, date_to],
      },
      ...(car_id && { car_id: car_id }),
    };
    try {
      const results = await RptHallCalls.findAll({
        attributes: [
          "floor_id",
          "direction",
          [fn("COUNT", col("id")), "total_count"],
          [fn("DATE", col("date_created")), "day_created"],
        ],
        where,
        group: ["floor_id", "direction", "day_created"],
      });
      if (callback) {
        return callback(null, results);
      }
    } catch (error) {
      if (callback) {
        return callback(error);
      }
    }
  },
  hallCallsTime: async function (data, callback = null) {
    data = alterData(data);
    const { car_id, date_from, date_to } = data;
    const where = {
      date_created: {
        [Op.between]: [date_from, date_to],
      },
      ...(car_id && { car_id: car_id }),
    };
    try {
      const results = await RptHallCalls.findAll({
        attributes: [
          "floor_id",
          "direction",
          [fn("COUNT", col("id")), "total_count"],
          [fn("DATE", col("date_created")), "day_created"],
          [fn("date_part", "hour", col("date_created")), "hour_created"],
        ],
        where,
        group: ["floor_id", "direction", "day_created", "hour_created"],
        order: [["floor_id", "DESC"]],
      });
      if (callback) {
        return callback(null, results);
      }
    } catch (error) {
      if (callback) {
        return callback(error);
      }
    }
  },
  doorTimes: async function (data, callback = null) {
    data = alterData(data);
    const { car_id, floor_id, date_from, date_to } = data;
    const where = {
      date_created: {
        [Op.between]: [date_from, date_to],
      },
      ...(car_id && { car_id: car_id }),
      ...(floor_id && { floor_id: floor_id }),
    };

    try {
      const results = await RptDoors.findAll({
        attributes: [
          "car_id",
          "door_state",
          [literal('ROUND(CAST(AVG("time_sec") AS numeric), 1)'), "average"],
        ],
        where,
        group: ["car_id", "door_state"],
      });

      if (callback) {
        return callback(null, results);
      }
    } catch (error) {
      if (callback) {
        return callback(error);
      }
    }
  },
  outOfService: async function (data, callback = null) {
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
      ...(data.date_from &&
        data.date_to && {
        date_created: { [Op.between]: [data.date_from, data.date_to] },
      }),
      ...(data.car_id ? { car_id: data.car_id } : {}),
    };
    try {
      const results = await RptServices.findAll({
        attributes: [
          "id",
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
              "FLOOR(EXTRACT(EPOCH FROM (\"RptServices\".\"date_next\" - \"RptServices\".\"date_created\")) / 86400), 'd ', " +
              "FLOOR(MOD(CAST(EXTRACT(EPOCH FROM (\"RptServices\".\"date_next\" - \"RptServices\".\"date_created\")) AS NUMERIC), 86400) / 3600), 'h ', " +
              "FLOOR(MOD(CAST(EXTRACT(EPOCH FROM (\"RptServices\".\"date_next\" - \"RptServices\".\"date_created\")) AS NUMERIC), 3600) / 60), 'm'" +
              ")"
            ),
            "DURATION",
          ],
          [
            literal(
              "to_char(\"RptServices\".\"date_created\", 'DD/MM/YYYY HH24:MI:SS')"
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
        return callback(null, results);
      } else {
        return results;
      }
    } catch (err) {
      console.error("Error fetching services:", err);
      if (callback) {
        return callback(err);
      } else {
        throw err;
      }
    }
  },

  inServiceOverview: async function (data, callback = null) {
    let dateInput;

    if (data.date && MOMENT(data.date, "MM/DD/YYYY", true).isValid()) {
      dateInput = MOMENT(data.date, "MM/DD/YYYY").format("YYYY-MM-DD");
    } else {
      dateInput = MOMENT().format("YYYY-MM-DD");
    }

    let where = {
      class_of_operation: {
        [Op.notIn]: [-2, 0],
      },
      date_created: {
        [Op.gte]: dateInput,
      },
      ...(data.car_ids &&
        data.car_ids.length > 0 && { car_id: { [Op.in]: data.car_ids } }),
    };

    try {
      const results = await RptServices.findAll({
        attributes: [
          "car_id",
          "floor_id",
          "mode_of_operation",
          "class_of_operation",
          "date_created",
          "date_next",
          [fn("DATE", col("date_created")), "day_created"],
        ],
        where,
        group: [
          "day_created",
          "car_id",
          "floor_id",
          "date_created",
          "date_next",
          "mode_of_operation",
          "class_of_operation",
        ],
        order: [
          ["car_id", "ASC"],
          ["date_created", "ASC"],
        ],
      });
      if (callback) {
        return callback(null, results);
      }
    } catch (error) {
      if (callback) {
        return callback(error);
      }
    }
  },
  waitTimeAveTimeDay: async function (data, callback = null) {
    data = alterData(data);
    const { car_id, date_from, date_to } = data;
    const where = {
      date_created: {
        [Op.between]: [date_from, date_to],
      },
      ...(car_id && { car_id: car_id }),
    };
    try {
      const results = await RptWait.findAll({
        attributes: [
          "floor_id",
          "direction",
          [fn("date_part", "hour", col("date_created")), "hour_created"],
          [literal('ROUND(CAST(AVG("wait_time") AS numeric), 1)'), "average"],
        ],
        where,
        group: ["floor_id", "hour_created", "direction"],
      });
      if (callback) {
        return callback(null, results);
      }
    } catch (error) {
      if (callback) {
        return callback(error);
      }
    }
  },
  waitTimeAveTimeFloor: async function (data, callback = null) {
    data = alterData(data);
    const { car_id, date_from, date_to } = data;
    const where = {
      date_created: {
        [Op.between]: [date_from, date_to],
      },
      ...(car_id && { car_id: car_id }),
    };

    try {
      const results = await RptWait.findAll({
        attributes: [
          "floor_id",
          "direction",
          [fn("date_part", "hour", col("date_created")), "hour_created"],
          [literal('ROUND(CAST(AVG("wait_time") AS numeric), 1)'), "average"],
        ],
        where,
        group: ["floor_id", "direction", "hour_created"],
      });

      if (callback) {
        return callback(null, results);
      }
    } catch (error) {
      if (callback) {
        return callback(error);
      }
    }
  },
  waitTime: async function (data, callback = null) {
    data = alterData(data);
    const { car_id, date_from, date_to } = data;

    const where = {
      date_created: {
        [Op.between]: [date_from, date_to],
      },
      ...(car_id && { car_id: car_id }),
    };
    try {
      const results = await RptWait.findAll({
        attributes: ["*", [fn("date_part", "hour", col("date_created")), "hour_created"]],
        where,
      });

      if (callback) {
        return callback(null, results);
      }
    } catch (error) {
      if (callback) {
        return callback(error);
      }
    }
  },
  waitTimesLongest: async function (data, callback = null) {
    data = alterData(data);
    try {
      const results = await RptWait.findAll({
        attributes: [
          "id",
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
        },
        order: [["date_created", "ASC"]],
      });

      if (callback) {
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
  },

  waitTimesDistributionUp: async function (data, callback = null) {
    data = alterData(data);
    const { car_id, date_from, date_to } = data;
    const where = {
      direction: "up",
      ...(date_from && {
        date_created: { [Op.between]: [date_from, date_to] },
      }),
      ...(car_id && { car_id: car_id }),
    };
    try {
      const results = await RptWait.findAll({
        attributes: ["*", [fn("date_part", "hour", col("date_created")), "hour_created"]],
        where,
      });
      if (callback) {
        return callback(null, results);
      }
    } catch (error) {
      if (callback) {
        return callback(error);
      }
    }
  },

  waitTimesDistributionDown: async function (data, callback = null) {
    data = alterData(data);
    const { car_id, date_from, date_to } = data;
    const where = {
      direction: "down",
      ...(date_from && {
        date_created: { [Op.between]: [date_from, date_to] },
      }),
      ...(car_id && { car_id: car_id }),
    };
    try {
      const results = await RptWait.findAll({
        attributes: ["*", [fn("date_part", "hour", col("date_created")), "hour_created"]],
        where,
      });
      if (callback) {
        return callback(null, results);
      }
    } catch (error) {
      if (callback) {
        return callback(error);
      }
    }
  },
  waitTimesDistributionWaitTime: async function (data, callback = null) {
    data = alterData(data);
    const { car_id, date_from, date_to } = data;

    const where = {
      ...(date_from && {
        date_created: { [Op.between]: [date_from, date_to] },
      }),
      ...(car_id && { car_id: car_id }),
    };
    try {
      const results = await RptWait.findAll({
        attributes: ["*", [fn("date_part", "hour", col("date_created")), "hour_created"]],
        where,
      });
      if (callback) {
        return callback(null, results);
      }
    } catch (error) {
      if (callback) {
        return callback(error);
      }
    }
  },

  floorToFloor: async function (data, callback = null) {
    data = alterData(data);
    const { floor_id, date_from, date_to, car_id } = data;
    const where = {
      date_created: {
        [Op.between]: [date_from, date_to],
      },
      ...(car_id && { car_id: car_id }),
    };
    try {
      const fromFloor = await RptFloorToFloor.findAll({
        attributes: [
          "car_id",
          "floor_from",
          "floor_to",
          "direction",
          [literal('ROUND(CAST(AVG("wait_time") AS numeric), 1)'), "average"],
        ],
        where: {
          ...where,
          floor_from: floor_id,
        },
        group: ["car_id", "floor_from", "floor_to", "direction"],
      });

      const toFloor = await RptFloorToFloor.findAll({
        attributes: [
          "car_id",
          "floor_from",
          "floor_to",
          "direction",
          [literal('ROUND(CAST(AVG("wait_time") AS numeric), 1)'), "average"],
        ],
        where: {
          ...where,
          floor_to: floor_id,
        },
        group: ["car_id", "floor_from", "floor_to", "direction"],
      });

      if (callback) {
        return callback(null, { fromFloor, toFloor });
      }
    } catch (error) {
      if (callback) {
        return callback(error);
      }
    }
  },
  programEvents: async function (data, callback = null) {
    data = alterData(data);

    const where = {
      date_created: { [Op.between]: [data.date_from, data.date_to] },
      ...(data.type ? { type: data.type } : {}),
    };
    try {
      const results = await ProgramEvents.findAll({
        attributes: [
          "id",
          [
            fn("to_char", col("date_created"), "DD/MM/YYYY HH24:MI:SS"),
            "date_created",
          ],
          [
            fn("CONCAT", col("type"), " : ", col("description")),
            "type & description",
          ],
        ],
        where: {
          date_created: { [Op.between]: [data.date_from, data.date_to] },
          ...(data.type ? { type: data.type } : {}),
        },
        order: [["date_created", "ASC"]],
        raw: true,
      });
      if (callback) {
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
  },
};
