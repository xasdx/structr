let fs = require("fs")

module.exports = { generate }

function generate(s, opts) {
  let pathPrefix = opts && opts.pathPrefix || __dirname
  console.log(`Creating file structure at ${pathPrefix}\n`)
  if (typeof s !== "string") { throw new Error("Input must be a string") }
  if (s.length < 1) { return }
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

function createDirectory(path) {
  console.log(`Creating directory ${path}`)
  fs.mkdirSync(path)
}

function createFile(path) {
  console.log(`Creating file ${path}`)
  fs.writeFileSync(path, "")
}

function parseDescriptor(s) { return s.split("\n") }

if (!module.parent) { generate(process.argv[2], { pathPrefix: process.argv[3] }) }
