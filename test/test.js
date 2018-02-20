let { expect } = require("chai")
let util = require("./util")
let underTest = require("../lib")

let tests = util.readTestCases()
let generate = (s) => underTest.generate(s, { pathPrefix: `${__dirname}/_t` })

module.exports = {
  "beforeEach": util.prepareTestDir,
  "afterEach": util.cleanUpTestDir,
  "generates directories": () => {
    generate(tests[0])
    forEachLine(tests[0], entry => expect(util.isDir(entry)).to.be.true)
  },
  "generates files": () => {
    generate(tests[1])
    forEachLine(tests[1], entry => expect(util.isFile(entry)).to.be.true)
  },
  "generates nested directories": () => {
    generate(tests[2])
    setTimeout(() => {
      expect(util.isDir("dir1/dir3/dir6/dir8")).to.be.true
      expect(util.isDir("dir1/dir2")).to.be.true
      expect(util.isDir("dir4")).to.be.true
    }, 100)
  },
  "generates directories and files": () => {
    generate(tests[3])
    setTimeout(() => {
      expect(util.isDir("dir/dir")).to.be.true
      expect(util.isDir("another_dir/dirr")).to.be.true
      expect(util.isFile("dir/file.txt")).to.be.true
      expect(util.isFile("dir/dir/file.h")).to.be.true
      expect(util.isFile("file.s")).to.be.true
    }, 100)
  }
}

function forEachLine(str, fn) {
  setTimeout(() => str.split("\n").forEach(fn), 1)
}
