const SetStore = require('./../lib/set_store')

class Favorites extends SetStore {
  get collectionAttributes () {
    const items = this.values.map(value => JSON.parse(value))
    return {id: this.namespace, title: 'Favorites', items}
  }
}

module.exports = new Favorites('favorites')
