const winston = require('winston');
const LokiTransport = require('winston-loki');

const logger = winston.createLogger({
    transports: [
        new LokiTransport({
            host: 'https://<your-loki-endpoint>',
            basicAuth: , // Use your Grafana Cloud API key
            labels: { app: 'ElevateEats Back-End' },
        }),
    ],
});

module.exports = logger;
