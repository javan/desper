const {ipcRenderer} = require('electron')
const Model = require('./../lib/model')
const favorites = require('./favorites')

class Item extends Model {
  isFavorite () {
    return favorites.has(this)
  }

  toggleFavorite () {
    if (this.isFavorite()) {
      favorites.remove(this)
    } else {
      favorites.add(this)
    }
  }

  setWallpaper () {
    ipcRenderer.send('set-wallpaper', { url: this.largeImageURL, title: this.title })
  }

  get thumbnailImageURL () {
    return this.imageURL('small')
  }

  get largeImageURL () {
    return this.imageURL('large')
  }

  imageURL (size) {
    return this.get('imageURLs')[size]
  }
}

module.exports = Item
