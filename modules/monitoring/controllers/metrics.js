const client = require('prom-client');

// Create a Registry which registers the metrics
const register = new client.Registry();

// Add a default label which is added to all metrics
register.setDefaultLabels({
    app: 'smartrise-api'
});

// Enable the collection of default metrics
client.collectDefaultMetrics({ register });

// Create a custom metric example (optional)
// const httpRequestDuration = new client.Histogram({
//   name: 'http_request_duration_seconds',
//   help: 'Duration of HTTP requests in seconds',
//   labelNames: ['method', 'route', 'code'],
//   buckets: [0.1, 0.3, 0.5, 0.7, 1, 3, 5, 7, 10]
// });
// register.registerMetric(httpRequestDuration);

module.exports = {
    getMetrics: async (req, res) => {
        try {
            res.set('Content-Type', register.contentType);
            res.end(await register.metrics());
        } catch (err) {
            res.status(500).end(err);
        }
    },
    register,
    client
};
