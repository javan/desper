const Item = require('./item')
const request = require('./client')

class Collection {
  constructor (uuid) {
    this.uuid = uuid
  }

  load () {
    return new Promise((resolve, reject) => {
      request(`collections/${this.uuid}`).then((data) => {
        this.data = data
        this.items = this.stillImageResources.map((resource) => {
          return new Item(resource.uuid, resource.mods)
        })
        resolve(this)
      }).catch((error) => {
        reject(error)
      })
    })
  }

  get title () {
    const textResource = this.data.item.find(item => item.mods.typeOfResource === 'text')
    const imageResource = this.data.item.find(item => item.mods.typeOfResource === 'still image')
    const resource = textResource || imageResource

    if (resource) {
      let {relatedItem} = resource.mods
      if (relatedItem.relatedItem) {
        relatedItem = relatedItem.relatedItem
      }
      return relatedItem.titleInfo.title
    } else {
      throw new Error("Can't find title")
    }
  }

  get itemUUIDs () {
    return this.stillImageResources.map(resource => resource.uuid)
  }

  get stillImageResources () {
    return this.data.item.filter(item => item.mods.typeOfResource === 'still image')
  }

  toJSON () {
    return { id: this.uuid, title: this.title, items: this.items }
  }
}

module.exports = Collection
