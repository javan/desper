#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

const Source = require('./sources/nypl/source')
const source = new Source()

Promise.all(source.collections.map(s => s.load())).then(() => {
  let items = []

  source.collections.forEach(collection => {
    items = items.concat(collection.items)
  })

  Promise.all(items.map(i => i.load())).then(() => {
    const filePath = path.resolve(__dirname, '..', 'data', 'sources.json')
    fs.writeFile(filePath, JSON.stringify([source]))
  })
})
