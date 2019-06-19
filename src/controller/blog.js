const cmd = require('../utils/cmd')
const fs = require('../utils/fs')
const path = require('path')
const config = require('../config')
const logger = require('../logger')
const spgit = require('simple-git')

class Blog {
  // 构建应用
  async push(ctx, next) {
    let start = Date.now()
    ctx.body = "ass we can"
    ctx.status = 200

    // git pull
    await spgit(config.sourceCodeDir).pull()

    // before script
    await cmd(config.beforeScript, config.sourceCodeDir)

    // build
    await cmd(config.buildScript, config.sourceCodeDir)

    // move to public
    await cmd(
      `mkdir public && \cp -fr ${config.sourceCodeDir}/${
        config.publicDir
      }/* public`,
      ''
    )

    logger.info(`script end: ${Date.now() - start}ms`)
  }
}

module.exports = new Blog()
