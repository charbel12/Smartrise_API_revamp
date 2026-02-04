const { Umzug, SequelizeStorage } = require('umzug');
const { sequelize } = require('./models'); // your Sequelize instance

const migrator = new Umzug({
  migrations: {
    glob: 'database/migrations/*.js', // path to your migration files
    resolve: ({ name, path, context }) => {
      const migration = require(path);
      return {
        name,
        up: async () => migration.up(context, sequelize.constructor),
        down: async () => migration.down(context, sequelize.constructor),
      };
    },
  },
  context: sequelize.getQueryInterface(),
  storage: new SequelizeStorage({ sequelize }),
  logger: console,
});

async function migrate() {
  console.log("Checking for pending migrations...");
  const pending = await migrator.pending();
  if (pending.length === 0) {
    console.log("No migrations to run.");
    return;
  }
  console.log(`Running ${pending.length} migrations...`);
  await migrator.up();
  console.log("Migrations completed.");
}

module.exports = migrate;