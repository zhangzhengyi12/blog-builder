const config = require('./config')
const winston = require('winston')

winston.configure({
  level: config.debugLogging ? 'debug' : 'info',
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'info.log', level: 'info' }),
    new winston.transports.File({ filename: 'warn.log', level: 'warn' }),
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      )
    })
  ]
})

function getClientIP(req) {
  return req.headers['x-forwarded-for'] || req.headers['x-real-ip']
}

class Logger {
  log(logLevel = 'info', msg = '') {
    winston.log(logLevel, msg)
  }
  info(msg) {
    this.log('info', msg)
  }
  error(msg) {
    this.log('error', msg)
  }
  warn(msg) {
    this.log('warn', msg)
  }
  // 网络日志记录中间件
  async net(ctx, next) {
    const start = new Date().getMilliseconds()

    ctx.logger = logger
    await next()

    let logLevel = 'info'
    if (ctx.status >= 500) {
      logLevel = 'error'
    }
    if (ctx.status >= 400) {
      logLevel = 'warn'
    }
    if (ctx.status >= 100) {
      logLevel = 'info'
    }

    const ms = new Date().getMilliseconds() - start
    const msg = `${ctx.method} ${ctx.originalUrl} ${ctx.status} ${getClientIP(
      ctx.request
    )} ${ms}ms`
    logger.log(logLevel, msg)
  }
}

const logger = new Logger()

module.exports = logger
