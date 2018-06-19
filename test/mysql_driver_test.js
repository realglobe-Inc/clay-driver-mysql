/**
 * Test case for mysqlDriver.
 * Runs with mocha.
 */
'use strict'

const MysqlDriver = require('../lib/mysql_driver.js')
const setupMysqlDatabase = require('../lib/helpers/setup_mysql_database')
const {ok, equal, deepEqual} = require('assert')
const leakage = require('leakage')
const clayLump = require('clay-lump')

describe('mysql-driver', function () {
  this.timeout(18000)

  const DB_ROOT_USER = 'root'
  const DB_ROOT_PASSWORD = ''
  const DB_USER = 'hoge'
  const DB_PASSWORD = 'fuge'
  const DATABASE = 'clay_driver_mysql_test'

  before(async () => {
    await setupMysqlDatabase(DB_ROOT_USER, DB_ROOT_PASSWORD, {
      database: DATABASE,
      username: DB_USER,
      password: DB_PASSWORD,
    })
  })

  after(async () => {

  })

  it('Mysql driver', async () => {
    let driver = new MysqlDriver(DATABASE, DB_USER, DB_PASSWORD, {
      // logging: console.log
    })
    await driver.drop('User')

    const created = await driver.create('User', {
      username: 'okunishinishi',
      message: 'Hey 😄'
    })
    const created2 = await driver.create('User', {
      username: 'hoge'
    })
    ok(created2.id !== created.id)
    ok(created.id)
    equal(created.username, 'okunishinishi')

    const one = await driver.one('User', created.id)

    equal(String(created.id), String(one.id))

    const updated = await driver.update('User', one.id, {
      password: 'hogehoge'
    })
    equal(String(updated.id), String(one.id))
    equal(updated.password, 'hogehoge')

    const list01 = await driver.list('User', {})
    deepEqual(list01.meta, {offset: 0, limit: 100, length: 2, total: 2})

    const list02 = await driver.list('User', {
      filter: {username: 'okunishinishi'}
    })
    deepEqual(list02.meta, {offset: 0, limit: 100, length: 1, total: 1})

    let list03 = await driver.list('User', {
      page: {size: 1, number: 1}
    })
    deepEqual(list03.meta, {offset: 0, limit: 1, length: 1, total: 2})

    let destroyed = await driver.destroy('User', one.id)
    equal(destroyed, 1)
    let destroyed2 = await driver.destroy('User', one.id)
    equal(destroyed2, 0)

    equal((await driver.list('User')).meta.total, 1)
    await driver.drop('User')
    equal((await driver.list('User')).meta.total, 0)

    {
      await driver.list('User', {})
    }

    await driver.close()
  })

  // https://github.com/realglobe-Inc/clay-resource/issues/28
  it('issues/28', async () => {
    let driver = new MysqlDriver(DATABASE, DB_USER, DB_PASSWORD, {})
    const lump = clayLump('hec-eye-alpha', {
      driver
    })
    let Person = lump.resource('Person')
    await Person.drop()
    await Person.createBulk([{
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
    }])

    {
      let people = await Person.list({filter: {pid: 1}, sort: ['age']})
      let ages = people.entities.map(p => p.age)
      deepEqual(ages, [1, 2, 3])
    }

    {
      let people = await Person.list({filter: {pid: 1}, sort: ['-age']})
      let ages = people.entities.map(p => p.age)
      deepEqual(ages, [3, 2, 1])
    }

    await Person.drop()

    await driver.dump(`${__dirname}/../tmp/testing-dump`)

    await driver.close()
  })

  it('A lot of CRUD', async () => {
    let driver = new MysqlDriver(DATABASE, DB_USER, DB_PASSWORD, {})
    await driver.drop('Box')

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
          }), {index: i})
        creatingQueue.push(driver.create('Box', attributes))
      }
      ids.push(
        ...(await Promise.all(creatingQueue)).map(({id}) => id)
      )
      console.log(`Took ${new Date() - startAt}ms for ${NUMBER_OF_ENTITY} entities, ${NUMBER_OF_ATTRIBUTE} attributes to create`)
    }

    await driver.close()
  })

  it('leakage', async () => {

    const driver = new MysqlDriver(DATABASE, DB_USER, DB_PASSWORD, {})
    await driver.drop('L')
    await leakage.iterate.async(async () => {
      const created = await driver.create('L', {a: 1})
      await driver.destroy('L', created.id)
    })
    await driver.close()
  })
})

/* global describe, before, after, it */
