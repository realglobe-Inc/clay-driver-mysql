#!/usr/bin/env node

/**
 * Generate docs
 */

'use strict'

process.chdir(`${__dirname}/..`)

const apeTasking = require('ape-tasking')
const coz = require('coz')
const jsdoc = require('the-script-jsdoc')

apeTasking.runTasks('doc', [
  // Generate jsdoc.json
  async () => {
    let src = [
      'lib/*.js',
      require.resolve('clay-driver-base/lib/driver.js'),
      require.resolve('clay-driver-sequelize/lib/sequelize_driver.js')
    ]
    let dest = 'jsdoc.json'
    await jsdoc(src, dest)
  },
  () => coz.render('doc/**/.*.bud')
], true)
