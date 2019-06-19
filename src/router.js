const Router = require('koa-router')

const router = new Router()

const Blog = require('./controller/blog')
router.post('/push', Blog.push)

module.exports = router
