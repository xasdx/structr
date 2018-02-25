let { expect } = require("chai")
let util = require("./util")
let underTest = require("../lib")

let tests = util.readTestCases()
let generate = (s) => underTest.generate(s, { pathPrefix: `${__dirname}/_t` })

module.exports = {
  "beforeEach": util.prepareTestDir,
  "afterEach": util.cleanUpTestDir,
  "generates directories": done => {
    generate(tests[0])
    forEachLine(tests[0], entry => expect(util.pathExists(entry)).to.be.true, done)
  },
  "generates files": done => {
    generate(tests[1])
    forEachLine(tests[1], entry => expect(util.pathExists(entry)).to.be.true, done)
  },
  "generates nested directories": done => {
    generate(tests[2])
    setTimeout(() => {
      expect(util.pathExists("dir1/dir3/dir6/dir8")).to.be.true
      expect(util.pathExists("dir1/dir2")).to.be.true
      expect(util.pathExists("dir4")).to.be.true
      done()
    }, 1)
  },
  "generates directories and files": done => {
    generate(tests[3])
    setTimeout(() => {
      expect(util.pathExists("dir/dir")).to.be.true
      expect(util.pathExists("another_dir/dirr")).to.be.true
      expect(util.pathExists("dir/file.txt")).to.be.true
      expect(util.pathExists("dir/dir/file.h")).to.be.true
      expect(util.pathExists("file.s")).to.be.true
      done()
    }, 1)
  },
  "uses default path when no prefix supplied": () => underTest.generate(""),
  "rejects inputs with type different than string": () => expect(() => underTest.generate(true)).to.throw(),
}

function forEachLine(str, fn, done) {
  setTimeout(() => {
    str.split("\n").forEach(fn)
    done()
  }, 1)
}
