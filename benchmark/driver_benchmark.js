#!/usr/bin/env node
/**
 * Run driver benchmark
 */
'use strict'

const { run } = require('clay-driver-benchmarks')
const { MysqlDriver } = require('../lib')
const setupMysqlDatabase = require('../lib/helpers/setup_mysql_database')
const co = require('co')

const DB_ROOT_USER = 'root'
const DB_ROOT_PASSWORD = ''
const DB_USER = 'benchmark'
const DB_PASSWORD = 'benchmark'
const DATABASE = 'clay_driver_mysql_benchmark'

co(function * () {
  yield setupMysqlDatabase(DB_ROOT_USER, DB_ROOT_PASSWORD, {
    database: DATABASE,
    username: DB_USER,
    password: DB_PASSWORD
  })
  const driver = new MysqlDriver(DATABASE, DB_USER, DB_PASSWORD, {
    benchmark: true,
    logging: false
  })
  yield run(driver)
}).catch((err) => {
  console.error(err)
  process.exit(1)
})
