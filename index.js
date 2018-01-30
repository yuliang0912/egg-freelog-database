'use strict'

const KnexBaseOperation = require('./lib/database/knex-base-operation')
const MongooseBaseOperation = require('./lib/database/mongo-base-operation')

module.exports = {
    KnexBaseOperation,
    MongooseBaseOperation
}