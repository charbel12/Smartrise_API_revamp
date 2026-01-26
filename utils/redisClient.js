const redis = require('redis');

let client;

const getClient = async () => {
    if (client && client.isOpen) {
        return client;
    }

    const host = process.env.REDIS_HOST || 'redis_lm';
    const port = process.env.REDIS_PORT || 6379;

    client = redis.createClient({
        url: `redis://${host}:${port}`
    });

    client.on('error', (err) => console.log('Redis Client Error', err));

    await client.connect();

    return client;
};

module.exports = {
    getClient
};
