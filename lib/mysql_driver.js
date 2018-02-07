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
const {LogPrefixes, DateFormats} = require('clay-constants')
const path = require('path')
const amkdirp = require('amkdirp')
const moment = require('moment')
const execcli = require('execcli')
const fs = require('fs')
const {spawn} = require('child_process')
const {DRIVER_PREFIX} = LogPrefixes
const {DUMP_FILENAME_FORMAT} = DateFormats

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

    const filename = path.join(dirname, moment(new Date()).format(DUMP_FILENAME_FORMAT) + '.sql')
    await amkdirp(dirname)
    const {
      username,
      host,
      port,
      password,
      database
    } = config
    const w = fs.createWriteStream(filename)

    await new Promise((resolve, reject) => {
      const mysqldump = spawn('mysqldump', [
        '--user', username,
        '--host', host,
        '--port', port,
        '-p' + password,
        '--databases', database,
      ])
      mysqldump.stdout.pipe(w)
      mysqldump.on('close', resolve)
      mysqldump.stderr.on('error', reject)
    })
    return {filename}
  }

  async restore (dirname, options = {}) {
    throw new Error(`Not implemented!`)
  }
}

module.exports = MysqlDriver
