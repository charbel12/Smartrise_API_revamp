#!/bin/sh
# wait for PostgreSQL to be ready
echo "Waiting for PostgreSQL..."
until nc -z $DB_HOST 5432; do
  sleep 1
done
echo "PostgreSQL is up!"

# run migrations
npx sequelize-cli db:migrate --env ${NODE_ENV:-development}

# run seeds (optional for dev)
if [ "$NODE_ENV" = "development" ]; then
  npx sequelize-cli db:seed:all --env development
fi

# start the app
node server.js
