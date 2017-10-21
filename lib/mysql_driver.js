/**
 * Driver to save data into sqlite
 * @augments SequelizeDriver
 * @class MysqlDriver
 * @param {string} database - Name of database
 * @param {string} username - Database username
 * @param {string} password - Database password
 * @param {Object} [options={}] - Optional settings
 * @param {boolean|function} [options.logging] - Logging option
 * @param {boolean} [options.benchmark] - Show benchmark
 * @see http://docs.sequelizejs.com/
 */
'use strict'

const {SequelizeDriver} = require('clay-driver-sequelize')
const {LogPrefixes} = require('clay-constants')
const path = require('path')
const amkdirp = require('amkdirp')
const moment = require('moment')
const mysqldump = require('mysqldump')
const {DRIVER_PREFIX} = LogPrefixes

/** @lends MysqlDriver */
class MysqlDriver extends SequelizeDriver {
  constructor (database, username, password, options = {}) {
    super(database, username, password, Object.assign({
      logging: false,
      benchmark: false
    }, options, {
      dialect: 'mysql'
    }))
  }

  get config () {
    return super.config || this._db.config
  }

  async dump (dirname, options = {}) {
    const s = this
    const {config} = s

    const filename = path.join(dirname, moment(new Date()).format('YYYY-MM-DD') + '.sql')
    await amkdirp(dirname)
    const {
      username,
      host,
      port,
      password,
      database
    } = config
    await new Promise((resolve, reject) =>
      mysqldump({
        user: username,
        host,
        port,
        password,
        database,
        dest: filename
      }, (err) => err ? reject(err) : resolve())
    )
    return {filename}
  }

  async restore (dirname, options = {}) {
    throw new Error(`Not implemented!`)
  }
}

module.exports = MysqlDriver
