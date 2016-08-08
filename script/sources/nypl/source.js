const Collection = require('./collection')

const collectionUUIDs = ['8585c260-a8c9-0133-8a93-00505686a51c', 'b20798a0-c62b-012f-46d4-58d385a7bc34', '16916980-c6f0-012f-5f69-3c075448cc4b', 'd2305ed0-c6df-012f-ac9b-58d385a7bc34', '34007fd0-c6d2-012f-5566-58d385a7bc34']

class Source {
  constructor (uuid) {
    this.collections = collectionUUIDs.map(uuid => new Collection(uuid))
  }

  get name () {
    return 'nypl'
  }

  get title () {
    return 'The New York Public Library Digital Collections'
  }

  toJSON () {
    return { name: this.name, title: this.title, collections: this.collections }
  }
}

module.exports = Source
