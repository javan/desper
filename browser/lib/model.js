class Model {
  constructor (attributes) {
    this.attributes = attributes || {}
  }

  get id () {
    return this.get('id')
  }

  get title () {
    return this.get('title')
  }

  get (attributeName) {
    return this.attributes[attributeName]
  }

  toJSON () {
    return this.attributes
  }
}

module.exports = Model
