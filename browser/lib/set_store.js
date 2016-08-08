const {app} = require('electron').remote
const EventEmitter = require('events')
const fs = require('fs-plus')
const path = require('path')

class SetStore extends EventEmitter {
  constructor (namespace) {
    super()
    this.namespace = namespace
    this.load()
  }

  add (value) {
    if (!this.has(value)) {
      value = serialize(value)
      this.values.push(value)
      this.emit('change')
      this.save()
    }
  }

  remove (value) {
    if (this.has(value)) {
      value = serialize(value)
      this.values = this.values.filter(v => v !== value)
      this.emit('change')
      this.save()
    }
  }

  has (value) {
    value = serialize(value)
    return this.values.indexOf(value) !== -1
  }

  load () {
    if (fs.existsSync(this.filePath)) {
      this.values = deseralize(fs.readFileSync(this.filePath))
    }
    if (!Array.isArray(this.values)) {
      this.values = []
      this.save()
    }
  }

  save () {
    fs.writeFile(this.filePath, serialize(this.values))
  }

  get filePath () {
    return path.join(app.getPath('userData'), `${this.namespace}.json`)
  }
}

function serialize (value) {
  if (typeof value === 'object') {
    return JSON.stringify(value)
  } else {
    return value
  }
}

function deseralize (value) {
  try {
    return JSON.parse(value)
  } catch (e) {
    return value
  }
}

module.exports = SetStore
