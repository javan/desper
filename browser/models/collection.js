const Model = require('./../lib/model')
const Item = require('./item')

class Collection extends Model {
  get items () {
    return this.get('items').map(attributes => new Item(attributes))
  }
}

module.exports = Collection
