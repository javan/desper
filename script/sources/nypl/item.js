const request = require('./client')

class Item {
  constructor (uuid, data) {
    this.uuid = uuid
    this.data = data
  }

  load () {
    return new Promise((resolve, reject) => {
      request(`items/${this.uuid}`).then((details) => {
        this.details = details
        resolve(this)
      }).catch((error) => {
        reject(error)
      })
    })
  }

  get title () {
    return this.data.titleInfo.title
  }

  get highResImageURL () {
    const {highResLink} = this.details.capture[0]
    return highResLink || this.imageURL
  }

  // b - .jpeg center cropped thumbnail (100x100 pixels)
  // f - .jpeg (140 pixels tall with variable width)
  // t - .gif (150 pixels on the long side)
  // r - .jpeg (300 pixels on the long side)
  // w - .jpeg (760 pixels on the long side)
  // q - .jpeg (1600 pixels on the long side)
  // v - .jpeg (2560 pixels on the long side)
  // g - .jpeg original dimensions

  findImageURL (...types) {
    for (let url of this.imageURLs) {
      for (let type of types) {
        if (url.indexOf(`&t=${type}`) !== 1) {
          return url
        }
      }
    }
  }

  get largeImageURL () {
    return this.findImageURL('v', 'q', 'w')
  }

  get thumbnailImageURL () {
    return this.findImageURL('w', 'r', 'f')
  }

  get imageURLs () {
    return this.details.capture[0].imageLinks.imageLink
  }

  toJSON () {
    return {
      id: this.uuid,
      title: this.title,
      imageURLs: {
        small: this.thumbnailImageURL,
        large: this.largeImageURL,
        original: this.highResImageURL
      }
    }
  }
}

module.exports = Item
