const HTMLWallpaperCollectionElement = require('./wallpaper_collection')
const Collection = require('./../models/collection')
const favorites = require('./../models/favorites')

class HTMLWallpaperFavoritesElement extends HTMLWallpaperCollectionElement {
  createdCallback () {
    this.collection = createCollection()
    favorites.on('change', () => {
      this.collection = createCollection()
      this.render()
    })
  }
}

function createCollection () {
  return new Collection(favorites.collectionAttributes)
}

document.registerElement('wallpaper-favorites', HTMLWallpaperFavoritesElement)
