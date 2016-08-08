const rp = require('request-promise')
const crypto = require('crypto')
const path = require('path')
const fs = require('fs-plus')

const cachePath = path.join('/tmp/desper/request-cache')
fs.makeTreeSync(cachePath)

const headers = {
  Authorization: `Token token=${process.env.NYPL_API_TOKEN}`,
  Accept: 'application/json'
}

function request (pathname) {
  return new Promise((resolve, reject) => {
    const url = `http://api.repo.nypl.org/api/v1/${pathname}`
    const urlDigest = crypto.createHash('md5').update(url).digest('hex')
    const cacheFilePath = path.join(cachePath, urlDigest)

    if (fs.existsSync(cacheFilePath)) {
      fs.readFile(cacheFilePath, (error, data) => {
        error ? reject(error) : resolve(JSON.parse(data))
      })
    } else {
      rp.get({url, headers, json: true}).then((json) => {
        const {response} = json.nyplAPI
        fs.writeFile(cacheFilePath, JSON.stringify(response), (error) => {
          error ? reject(error) : resolve(response)
        })
      }).catch((error) => {
        reject(error)
      })
    }
  })
}

module.exports = request
