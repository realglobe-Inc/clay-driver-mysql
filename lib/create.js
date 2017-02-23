/**
 * Create driver instance
 * @function create
 * @param {...*} args
 * @returns {MysqlDriver}
 */
'use strict'

const MysqlDriver = require('./mysql_driver')

/** @lends create */
function create (...args) {
  return new MysqlDriver(...args)
}

module.exports = create
