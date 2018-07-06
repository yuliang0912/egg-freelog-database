'use strict'

const Promise = require('bluebird')
const lodaMongooseModel = require('../loader/load-mongoose-model')

module.exports = async app => {

    const mongoose = require('mongoose')
    const config = app.config.mongoose

    //wiki:http://mongodb.github.io/node-mongodb-native/2.2/api/MongoClient.html
    //wiki:http://mongoosejs.com/docs/connections.html
    config.options = config.options || {
        autoReconnect: true,
        reconnectTries: Number.MAX_VALUE,
        reconnectInterval: 1000,
        poolSize: 5,
        keepAlive: true,
        bufferMaxEntries: 0, //不缓存command,失败直接返回错误
        useNewUrlParser: true,
        promiseLibrary: config.Promise || Promise
    }

    mongoose.set('bufferCommands', false);
    mongoose.Promise = config.Promise || Promise

    const database = mongoose.createConnection(config.url, config.options)

    // 连接成功
    database.on('connected', function () {
        console.log('Mongoose connection open to ' + config.url);
        app.coreLogger.info(`[egg-mongoose] ${config.url} connected successfully`);
    })

    // 连接失败
    database.on('error', function (err) {
        console.log('Mongoose connection error: ' + err);
        app.coreLogger.error(err);
    })

    // 断开连接
    database.on('disconnected', function () {
        console.log('Mongoose connection disconnected');
        app.coreLogger.error(`[egg-freelog-mongoose] ${config.url} disconnected`);
    })

    //重新连接
    database.on('reconnected', () => {
        app.coreLogger.info(`[egg-freelog-mongoose] ${config.url} reconnected successfully`);
    });

    app.__mongoose = mongoose
    app.mongoose = database
    app.mongoose.Schema = mongoose.Schema
    app.mongoose.getNewObjectId = () => {
        return new mongoose.Types.ObjectId
    }
    app.beforeStart(async () => {
        await database.catch(err => {
            console.error("mongooseError:", err)
        })
    })
    lodaMongooseModel(app)
}