/**
 * Mysql driver for ClayDB
 * @module clay-driver-mysql
 * @version 5.2.35
 */

'use strict'

const create = require('./create')
const MysqlDriver = require('./mysql_driver')

let lib = create.bind(this)

Object.assign(lib, MysqlDriver, {
  create,
  MysqlDriver
})

module.exports = lib
