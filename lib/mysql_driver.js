/**
 * Driver to save data into sqlite
 * @inheritdoc
 * @augments SequelizeDriver
 * @class MysqlDriver
 * @param {string} filename - Filename to save
 * @param {Object} [options={}] - Optional settings
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
