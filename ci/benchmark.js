#!/usr/bin/env node

/**
 * Run benchmark tests
 */
'use strict'

process.chdir(`${__dirname}/..`)

const { runTasks } = require('ape-tasking')
const { fork } = require('child_process')

runTasks('benchmark', [
  () => new Promise((resolve, reject) => {
    let forked = fork('./benchmark/driver_benchmark.js', {
      stdio: 'pipe'
    })
    forked.on('close', () => resolve())
    forked.on('error', (err) => reject(err))
  })
], true)
