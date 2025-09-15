const fs = require('fs');
const path = require('path');
const { Umzug, SequelizeStorage } = require('umzug');
const { sequelize } = require('../squelize');
const { Sequelize } = require('sequelize');

const SEEDERS_DIR = path.join(__dirname, '..', 'seeders');

console.log('[seed] Using seeders dir:', SEEDERS_DIR);
try {
  console.log('[seed] Files in seeders dir:', fs.readdirSync(SEEDERS_DIR));
} catch (e) {
  console.error('[seed] Cannot read seeders dir:', e.message);
}

const umzug = new Umzug({
  migrations: {
    glob: ['seeders/*.js', { cwd: path.join(__dirname, '..') }],
    resolve: ({ name, path: absPath, context }) => {
      const mod = require(absPath);
      return {
        name,
        up:   () => mod.up(context, Sequelize),
        down: () => mod.down(context, Sequelize),
        filepath: absPath,
      };
    },
  },
  context: sequelize.getQueryInterface(),
  storage: new SequelizeStorage({ sequelize, modelName: 'SequelizeData' }),
  logger: console,
});

const action = process.argv[2] || 'up';
const names  = (arr) => (Array.isArray(arr) ? arr.map(m => m.name) : []);

const args = process.argv.slice(3).reduce((acc, a) => {
  const [k, v] = a.split('=');
  acc[k] = v ?? true;
  return acc;
}, {});

function findSeedersForTable(tableName) {
  const files = fs.readdirSync(SEEDERS_DIR).filter(f => f.endsWith('.js'));

  const patterns = [
    new RegExp(String.raw`\.\s*bulkInsert\s*\(\s*['"\`]${tableName}['"\`]`, 'm'),
    new RegExp(String.raw`\.\s*bulkDelete\s*\(\s*['"\`]${tableName}['"\`]`, 'm'),

    new RegExp(String.raw`tableName\s*:\s*['"\`]${tableName}['"\`]`, 'm'),

    new RegExp(String.raw`INSERT\s+INTO\s+(?:\w+\.)?${tableName}\b`, 'mi'),
    new RegExp(String.raw`DELETE\s+FROM\s+(?:\w+\.)?${tableName}\b`, 'mi'),
  ];

  const matches = [];
  for (const file of files) {
    const abs = path.join(SEEDERS_DIR, file);
    const src = fs.readFileSync(abs, 'utf8');
    if (patterns.some(rx => rx.test(src))) matches.push(file);
  }
  return matches;
}

(async () => {
  try {
    if (action === 'up') {
      const opt = {};
      if (args.table) {
        const list = findSeedersForTable(args.table);
        if (!list.length) {
          throw new Error(
            `No seeder file found that calls bulkInsert/bulkDelete on '${args.table}'.`
          );
        }
        opt.migrations = list;
      }
      if (args.to)   opt.to = args.to;
      if (args.step) opt.step = Number(args.step);
      const result  = await umzug.up(opt);
      const applied = result?.migrations ?? result ?? [];
      const list    = names(applied);
      console.log(list.length ? 'Seeders applied:' : 'No seeders to apply.', list);
    } else if (action === 'down') {
      const opt = {};
      if (args.table) {
        const list = findSeedersForTable(args.table);
        if (!list.length) {
          throw new Error(
            `No seeder file found that calls bulkInsert/bulkDelete on '${args.table}'.`
          );
        }
        opt.migrations = list;
      }
      if (args.to)   opt.to = args.to;
      if (args.step) opt.step = Number(args.step);
      const result   = await umzug.down(opt);
      const reverted = result?.migrations ?? result ?? [];
      const list     = names(reverted);
      console.log(list.length ? 'Seeder reverted:' : 'No seeder to revert.', list);
    } else if (action === 'down:all') {
      const result   = await umzug.down({ to: 0 });
      const reverted = result?.migrations ?? result ?? [];
      const list     = names(reverted);
      console.log(list.length ? 'All seeders reverted:' : 'No seeders were reverted.', list);
    } else if (action === 'status') {
      const executed = await umzug.executed();
      const pending  = await umzug.pending();
      console.log('Executed:', names(executed));
      console.log('Pending :', names(pending));
    } else {
      console.log('Use: node scripts/seed.js [up|down|down:all|status] [table=NAME] [to=FILE] [step=N]');
    }
  } catch (err) {
    console.error(err);
    process.exit(1);
  } finally {
    await sequelize.close();
  }
})();
