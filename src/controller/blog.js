const cmd = require('../utils/cmd')
const fs = require('../utils/fs')
const path = require('path')
const config = require('../config')
const logger = require('../logger')

class Blog {
  // 构建应用
  async push(ctx, next) {
    let start = Date.now()
    // 密钥验证失败
    if (!ctx.init && ctx.body.secret !== config.secret) {
      ctx.warn(`secret valid Faild: ${ctx.secret}`)
      ctx.body = 'secret valid Faild'
      return next()
    }

    // git pull
    await cmd('git pull', config.sourceCodeDir)

    // before script
    await cmd(config.beforeScript, config.sourceCodeDir)

    // build
    await cmd(config.buildScript, config.sourceCodeDir)

    // move to public
    await cmd(`cp -r ${config.sourceCodeDir}/${config.publicDir}/* public`, '')

    logger.info(`script end: ${Date.now() - start}ms`)
  }
}

module.exports = new Blog()
