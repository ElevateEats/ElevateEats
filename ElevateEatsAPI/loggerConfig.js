const winston = require('winston');
const LokiTransport = require('winston-loki');

const logger = winston.createLogger({
    transports: [
        new LokiTransport({
            host: 'https://logs-prod-006.grafana.net',
            basicAuth: `:${process.env.LOKI_API_TOKEN}`, // Use your Grafana Cloud API key
            labels: { app: 'ElevateEats Back-End' },
        }),
    ],
});

module.exports = logger;
