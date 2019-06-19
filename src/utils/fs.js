const nativeFS = require('fs')

// Node.js FS 模块 Promise化
class fs {
  exists(path) {
    return new Promise((resolve, reject) => {
      nativeFS.exists(path, exists => {
        resolve(exists)
      })
    })
  }
  readdir(path) {
    return new Promise((resolve, reject) => {
      fs.readdir(path, (err, files) => {
        if (err) {
          reject(err)
        } else {
          resolve(files)
        }
      })
    })
  }
}

module.exports = new fs()
