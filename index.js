let fs = require("fs")

module.exports = { generate }

function generate(s, opts) {
  let pathPrefix = opts.pathPrefix || __dirname
  let entries = parseDescriptor(s)
  for (let i = 0; i < entries.length; i += 1) {
    let path = collectAscendants(i, entries)
    createEntry(`${pathPrefix}/${path}`)
  }
}

function collectAscendants(i, entries) {
  let path = entries[i].trim()
  let actual = entries[i]
  while (i > 0) {
    i -= 1
    if (isParentEntryOf(actual, entries[i])) {
      path = `${entries[i].trim()}/${path}`
      actual = entries[i]
    }
  }
  return path
}

function isParentEntryOf(entry, parent) {
  let entryMatcher = entry.match(/[\s]/g)
  let parentMatcher = parent.match(/[\s]/g)
  let parentSpaces = parentMatcher ? parentMatcher.length : 0
  let entrySpaces = entryMatcher ? entryMatcher.length : 0
  return parentSpaces === entrySpaces - 1
}

function createEntry(path) {
  if (path.includes(".")) { createFile(path)      }
                     else { createDirectory(path) }
}

function createDirectory(path) { fs.mkdirSync(path) }

function createFile(path) { fs.writeFileSync(path, "") }

function parseDescriptor(s) { return s.split("\n") }
