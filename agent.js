'use strict';

const knexLib = require('./lib/database/knex')
const mongooseLib = require('./lib/database/mongoose')

module.exports = agent => {

    agent.config.mongoose && mongooseLib(agent)

    agent.config.knex && knexLib(agent)
};