'use strict'

const { MysqlDriver } = require('clay-driver-mysql')

{
  const clayLump = require('clay-lump')
  let lump01 = clayLump({
    driver: new MysqlDriver('my-app', 'user01', 'xxxxxx', {})
  })
  /* ... */
}
