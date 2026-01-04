#!/bin/sh
# wait for MySQL to be ready
echo "Waiting for MySQL..."
until nc -z $DB_HOST 3306; do
  sleep 1
done
echo "MySQL is up!"

# run migrations
npx sequelize-cli db:migrate --env ${NODE_ENV:-development}

# run seeds (optional for dev)
if [ "$NODE_ENV" = "development" ]; then
  npx sequelize-cli db:seed:all --env development
fi

# start the app
node server.js
