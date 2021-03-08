const mongoose = require('mongoose');
const server = require('../server');
const logger = require('../middlewares/logger');

const db = mongoose.createConnection(server.db.str, server.db.options);

db.on('connected', () => {
    console.log("connected")
    logger.info('Mongoose connection open to master DB');
})

db.on('disconnected', () => {
    logger.info('Mongoose connection disconnected for master DB');
})

db.on('error', () => {
    logger.error('Mongoose connection error');
})

db.on('reconnected', () => {
    logger.info('Mongoose connection reconnected');
})

module.exports = db;