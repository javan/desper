const fs = require('fs')
const path = require('path')
const Source = require('./../models/source')

const data = fs.readFileSync(path.join(__dirname, '..', '..', 'data', 'sources.json'))
const sources = JSON.parse(data)

class HTMLWallpaperSourceElement extends window.HTMLElement {
  attachedCallback () {
    const name = this.getAttribute('name')
    this.source = new Source(sources.find(source => source.name === name))

    this.createTitleElement()
    this.createCollectionElements()
  }

  createTitleElement () {
    let element = document.createElement('h1')
    element.textContent = this.source.title
    this.appendChild(element)
  }

  createCollectionElements () {
    this.source.collections.forEach((collection) => {
      let element = document.createElement('wallpaper-collection')
      element.collection = collection
      this.appendChild(element)
    })
  }
}

document.registerElement('wallpaper-source', HTMLWallpaperSourceElement)
