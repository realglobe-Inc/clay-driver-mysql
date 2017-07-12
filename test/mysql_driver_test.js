/**
 * Test case for mysqlDriver.
 * Runs with mocha.
 */
'use strict'

const MysqlDriver = require('../lib/mysql_driver.js')
const setupMysqlDatabase = require('../lib/helpers/setup_mysql_database')
const { ok, equal, deepEqual } = require('assert')
const co = require('co')
const clayLump = require('clay-lump')

describe('mysql-driver', function () {
  this.timeout(18000)

  const DB_ROOT_USER = 'root'
  const DB_ROOT_PASSWORD = ''
  const DB_USER = 'hoge'
  const DB_PASSWORD = 'fuge'
  const DATABASE = 'clay_driver_mysql_test'

  before(() => co(function * () {
    yield setupMysqlDatabase(DB_ROOT_USER, DB_ROOT_PASSWORD, {
      database: DATABASE,
      username: DB_USER,
      password: DB_PASSWORD
    })
  }))

  after(() => co(function * () {

  }))

  it('Mysql driver', () => co(function * () {
    let driver = new MysqlDriver(DATABASE, DB_USER, DB_PASSWORD, {})
    yield driver.drop('User')

    let created = yield driver.create('User', {
      username: 'okunishinishi'
    })
    let created2 = yield driver.create('User', {
      username: 'hoge'
    })
    ok(created2.id !== created.id)
    ok(created.id)
    equal(created.username, 'okunishinishi')

    let one = yield driver.one('User', created.id)

    equal(String(created.id), String(one.id))

    let updated = yield driver.update('User', one.id, {
      password: 'hogehoge'
    })
    equal(String(updated.id), String(one.id))
    equal(updated.password, 'hogehoge')

    let list01 = yield driver.list('User', {})
    deepEqual(list01.meta, { offset: 0, limit: 100, length: 2, total: 2 })

    let list02 = yield driver.list('User', {
      filter: { username: 'okunishinishi' }
    })
    deepEqual(list02.meta, { offset: 0, limit: 100, length: 1, total: 1 })

    let list03 = yield driver.list('User', {
      page: { size: 1, number: 1 }
    })
    deepEqual(list03.meta, { offset: 0, limit: 1, length: 1, total: 2 })

    let destroyed = yield driver.destroy('User', one.id)
    equal(destroyed, 1)
    let destroyed2 = yield driver.destroy('User', one.id)
    equal(destroyed2, 0)

    equal((yield driver.list('User')).meta.total, 1)
    yield driver.drop('User')
    equal((yield driver.list('User')).meta.total, 0)
  }))

  // https://github.com/realglobe-Inc/clay-resource/issues/28
  it('issues/28', () => co(function * () {
    let driver = new MysqlDriver(DATABASE, DB_USER, DB_PASSWORD, {})
    const lump = clayLump('hec-eye-alpha', {
      driver
    })
    let Person = lump.resource('Person')
    yield Person.drop()
    yield Person.createBulk([ {
      pid: 1,
      name: 'a',
      age: 2
    }, {
      pid: 1,
      name: 'b',
      age: 1
    }, {
      pid: 1,
      name: 'c',
      age: 3
    }, {
      pid: 2,
      name: 'd',
      age: 6
    } ])

    {
      let people = yield Person.list({ filter: { pid: 1 }, sort: [ 'age' ] })
      let ages = people.entities.map(p => p.age)
      deepEqual(ages, [ 1, 2, 3 ])
    }

    {
      let people = yield Person.list({ filter: { pid: 1 }, sort: [ '-age' ] })
      let ages = people.entities.map(p => p.age)
      deepEqual(ages, [ 3, 2, 1 ])
    }

    yield Person.drop()
  }))

  it('A lot of CRUD', () => co(function * () {
    let driver = new MysqlDriver(DATABASE, DB_USER, DB_PASSWORD, {})
    yield driver.drop('Box')

    const NUMBER_OF_ENTITY = 100
    const NUMBER_OF_ATTRIBUTE = 20
    let ids = []

    // Create
    {
      let startAt = new Date()
      let creatingQueue = []
      for (let i = 0; i < NUMBER_OF_ENTITY; i++) {
        let attributes = new Array(NUMBER_OF_ATTRIBUTE - 1)
          .fill(null)
          .reduce((attr, _, j) => Object.assign(attr, {
            [`attr-${j}`]: j
          }), { index: i })
        creatingQueue.push(driver.create('Box', attributes))
      }
      ids.push(
        ...(yield Promise.all(creatingQueue)).map(({ id }) => id)
      )
      console.log(`Took ${new Date() - startAt}ms for ${NUMBER_OF_ENTITY} entities, ${NUMBER_OF_ATTRIBUTE} attributes to create`)
    }
  }))
})

/* global describe, before, after, it */
