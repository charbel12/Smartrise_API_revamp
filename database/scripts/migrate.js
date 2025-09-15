const fs = require('fs');
const path = require('path');
const { Umzug, SequelizeStorage } = require('umzug');
const { sequelize } = require('../squelize');
const { Sequelize } = require('sequelize');

const MIGRATIONS_DIR = path.join(__dirname, '..', 'migrations');

console.log('[migrate] Using migrations dir:', MIGRATIONS_DIR);
try {
  console.log('[migrate] Files in migrations dir:', fs.readdirSync(MIGRATIONS_DIR));
} catch (e) {
  console.error('[migrate] Cannot read migrations dir:', e.message);
}

const umzug = new Umzug({
  migrations: {
    glob: ['migrations/*.js', { cwd: path.join(__dirname, '..') }],
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
  storage: new SequelizeStorage({ sequelize, modelName: 'SequelizeMeta' }),
  logger: console,
});

const action = process.argv[2] || 'up';
const names = (arr) => (Array.isArray(arr) ? arr.map(m => m.name) : []);


const args = process.argv.slice(3).reduce((acc, a) => {
  const [first, second] = a.split('=');
  acc[first] = second ?? true;
  return acc;
}, {});

function findMigrationsForTable(tableName) {
 
  const rx = new RegExp(
    String.raw`createTable\s*\(\s*['"\`]${tableName}['"\`]`,
    'm'
  );

  const files = fs.readdirSync(MIGRATIONS_DIR)
    .filter(f => f.endsWith('.js'));

  const matches = [];
  for (const file of files) {
    const abs = path.join(MIGRATIONS_DIR, file);
    const src = fs.readFileSync(abs, 'utf8');
    if (rx.test(src)) {
      matches.push(file); 
    }
  }
  return matches;
}


(async () => {
  try {
    if (action === 'up') {
      const opt = {};

      if (args.table) {
        const list = findMigrationsForTable(args.table);
        if (!list.length) {
          throw new Error(
            `No migration file found that calls createTable('${args.table}').`
          );
        }
        opt.migrations = list;   
      }

      if (args.to)   opt.to = args.to;
      if (args.step) opt.step = Number(args.step);

      const result   = await umzug.up(opt);
      const applied  = result?.migrations ?? result ?? [];
      const list     = names(applied);
      console.log(list.length ? 'Migrations applied:' : 'No migrations to apply.', list);

    } else if (action === 'down') {
      const opt = {};

  
      if (args.table) {
        const list = findMigrationsForTable(args.table);
        if (!list.length) {
          throw new Error(
            `No migration file found that calls createTable('${args.table}').`
          );
        }
        
        opt.migrations = list;
      }

      if (args.to)   opt.to = args.to;
      if (args.step) opt.step = Number(args.step);

      const result    = await umzug.down(opt);
      const reverted  = result?.migrations ?? result ?? [];
      const list      = names(reverted);
      console.log(list.length ? 'Migration reverted:' : 'No migration to revert.', list);

    } else if (action === 'down:all') {
      const result   = await umzug.down({ to: 0 });
      const reverted = result?.migrations ?? result ?? [];
      const list     = names(reverted);
      console.log(list.length ? 'All migrations reverted:' : 'No migrations were reverted.', list);

    } else if (action === 'status') {
      const executed = await umzug.executed();
      const pending  = await umzug.pending();
      console.log('Executed:', names(executed));
      console.log('Pending :', names(pending));
    } else {
      console.log('Use: node scripts/migrate.js [up|down|down:all|status] [table=NAME] [to=FILE] [step=N]');
    }
  } catch (err) {
    console.error(err);
    process.exit(1);
  } finally {
    await sequelize.close();
  }
})();
