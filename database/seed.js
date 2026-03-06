// database/seed.js
const { Umzug, SequelizeStorage } = require('umzug');
const { sequelize } = require('./models');

const seeder = new Umzug({
  migrations: {
    glob: 'database/seeders/*.js',
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
  storage: new SequelizeStorage({
    sequelize,
    tableName: 'SequelizeData', // keeps track of applied seeds
  }),
  logger: console,
});

async function seed() {
  console.log("Checking for pending seeds...");
  const pending = await seeder.pending();
  if (pending.length === 0) {
    console.log("No seeds to run.");
    return;
  }
  console.log(`Running ${pending.length} seeds...`);
  await seeder.up();
  console.log("Seeding completed.");
}

module.exports = seed;
