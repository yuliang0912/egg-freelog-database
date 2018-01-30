'use strict';

const knexLib = require('./lib/database/knex')
const mongooseLib = require('./lib/database/mongoose')

module.exports = app => {

    app.config.mongoose && mongooseLib(app)

    app.config.knex && knexLib(app)
};