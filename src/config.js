module.exports = {
  // 服务运行端口
  port: process.env.PORT || 9527,
  // debug 日志
  debugLogging: true,
  // 仓库地址
  gitRepository: 'git@github.com:zhangzhengyi12/blog-demo.git',
  // 源代码分支
  gitBranch: 'master',
  // webhooks 密钥
  secret: 's90nmsl',
  // 构建前置脚本 工作目录 = 仓库文件夹
  beforeScript: 'cnpm i',
  // 构建后的脚本 工作目录 = 仓库文件夹
  buildScript: 'npm run build',
  // 构建完成后的静态文件目录 末尾不要加/
  publicDir: 'public',
  // clone 下来的源码目录 末尾不要加/
  sourceCodeDir: 'source'
}
