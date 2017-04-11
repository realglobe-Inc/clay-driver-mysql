/**
 * Driver to save data into sqlite
 * @augments SequelizeDriver
 * @class MysqlDriver
 * @param {string} database - Name of database
 * @param {string} username - Database username
 * @param {string} password - Database password
 * @param {Object} [options={}] - Optional settings
 * @see http://docs.sequelizejs.com/
 */
'use strict'

const { SequelizeDriver } = require('clay-driver-sequelize')
const { LogPrefixes } = require('clay-constants')

const { DRIVER_PREFIX } = LogPrefixes

/** @lends MysqlDriver */
class MysqlDriver extends SequelizeDriver {
  constructor (database, username, password, options = {}) {
    super(database, username, password, Object.assign({}, options, {
      dialect: 'mysql'
    }))
  }

}

module.exports = MysqlDriver
