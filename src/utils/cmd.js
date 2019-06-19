const process = require('child_process')
const logger = require('../logger')

const exec = process.exec

function cmd(command, cwd = '') {
  return new Promise((resolve, reject) => {
    let start = Date.now()
    logger.info(`run command: ${command}`)

    const h = exec(command, {
      cwd
    })
    h.stdout.on('data', data => {
      logger.info(`command stdout: ${data}`)
    })
    h.stdout.on('end', () => {
      logger.info(`command stdend: ${Date.now() - start}ms`)
      resolve(1)
    })
    h.stderr.on('data', data => {
      logger.error(`command stderr: ${data}`)
    })
  })
}

module.exports = cmd
