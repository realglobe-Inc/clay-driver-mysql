/**
 * Setup mysql database
 * @function setupMysqlDatabase
 */
'use strict'

const { exec } = require('child_process')
const co = require('co')

/** @lends setupMysqlDatabase */
function setupMysqlDatabase (rootUsername, rootPassword, config = {}) {
  const escape = (value) => `${'\\`'}${value}${'\\`'}`
  return co(function * () {
    let { username, password, database, host = 'localhost' } = config
    rootUsername = rootUsername || config.rootUsername || 'root'
    rootPassword = rootPassword || config.rootPassword
    let sql = `CREATE DATABASE IF NOT EXISTS ${database}; GRANT ALL ON ${escape(database)}.* TO '${username}'@'%' IDENTIFIED BY '${password}'`
    let command = `mysql -u${rootUsername} --host=${host} ${host === 'localhost' ? '' : '--protocol=tcp '}-e"${sql}"`
    let env = Object.assign({}, process.env)
    if (rootPassword) {
      env.MYSQL_PWD = rootPassword
    }
    let { stdout, stderr } = yield new Promise((resolve, reject) =>
      exec(command, { env }, (err, stdout, stderr) =>
        err ? reject(err) : resolve({ stdout, stderr })
      )
    )
    if (stdout) {
      console.log(stdout)
    }
    if (stderr) {
      console.error(stderr)
    }
  })
}

module.exports = setupMysqlDatabase
