'use strict'

module.exports = app => {
    const knex = require('knex')
    const config = app.config.knex

    let knexClients = {}
    Object.keys(config).forEach(name => {
        let selfConfig = config[name]
        knexClients[name] = knex(selfConfig)
        knexClients[name].on('query-error', selfConfig.error || console.error)
    })

    app.knex = knexClients
}