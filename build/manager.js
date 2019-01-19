'use strict'

function Manager (tables) {
  const Page = require('./page')
  const Feed = require('./feed')

  this.pages = {}
  this.feeds = {}

  for (const parent in tables) {
    const table = tables[parent]
    // this.pages[parent] = new Page(parent, table, tables) // removed parent pages. main page will have only index.
    for (const id in table) {
      const sub = table[id]
      if (this.pages[id]) { console.warn(`Re-declaring page #${id}!`); return }
      this.pages[id] = new Page(id, sub, tables) // not passing parent as last arg, so sub pages will link back to index.
    }
  }

  this.feeds.rss = new Feed('rss', tables.journal)
}

module.exports = Manager
