const Model = require('./../lib/model')
const Collection = require('./collection')

class Source extends Model {
  get collections () {
    return this.get('collections').map(attributes => new Collection(attributes))
  }
}

module.exports = Source
