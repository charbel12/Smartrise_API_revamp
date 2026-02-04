const migrate = require('./database/migrate');
require('dotenv').config();
(async () => {
  try {
    await migrate();
    process.exit(0);
  } catch (error) {
    console.error("Migration failed:", error);
    process.exit(1);
  }
})();
