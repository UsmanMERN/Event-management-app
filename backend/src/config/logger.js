const windson = require('winston');
const { MongoDB } = require('winston-mongodb');


const logger = windson.createLogger({
    level: 'info',
    transports: [
        new windson.transports.Console(),
        new windson.transports.File({ filename: 'combined.log' }),
        new windson.transports.File({ filename: 'error.log', level: 'error' }),
        new MongoDB({
            dbName: 'eventmanagement',
            collection: 'logs',
            db: process.env.DATABASE_URL,
            mongoOptions: {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                url: process.env.DATABASE_URL,
            },
            level: 'info',
        }),
    ],
    format: windson.format.combine(
        windson.format.timestamp(),
        windson.format.json()
    ),
});

module.exports = logger;