const koa = require('koa')
const router = require('./router')
const config = require('./config')
const logger = require('./logger')
const blog = require('./controller/blog')
const static = require('koa-static')
const path = require('path')

const app = new koa()

app.use(static(path.join(__dirname, '../public')))
app.use(router.routes())
app.use(logger.net)

blog.push({
  init: true
})

app.listen(config.port)
console.log(`Server running on port http://localhost:${config.port}`)
