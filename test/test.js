/* global expect */

let util = require("./util")
let underTest = require("..")

let tests = util.readTestCases()
let generate = (s) => underTest.generate(s, { pathPrefix: `${__dirname}/_t` })

beforeEach(util.prepareTestDir)
afterEach(util.cleanUpTestDir)

test("generates directories", () => {
  generate(tests[0])
  
  forEachLine(tests[0], entry => expect(util.isDir(entry)).toBeTruthy())
})

test("generates files", () => {
  generate(tests[1])
  
  forEachLine(tests[1], entry => expect(util.isFile(entry)).toBeTruthy())
})

test("generates nested directories", () => {
  generate(tests[2])
  
  setTimeout(() => {
    expect(util.isDir("dir1/dir3/dir6/dir8")).toBeTruthy()
    expect(util.isDir("dir1/dir2")).toBeTruthy()
    expect(util.isDir("dir4")).toBeTruthy()
  }, 1)
})

test("generates directories and files", () => {
  generate(tests[3])

  setTimeout(() => {
    expect(util.isDir("dir/dir")).toBeTruthy()
    expect(util.isDir("another_dir/dirr")).toBeTruthy()
    expect(util.isFile("dir/file.txt")).toBeTruthy()
    expect(util.isFile("dir/dir/file.h")).toBeTruthy()
    expect(util.isFile("file.s")).toBeTruthy()
  }, 1)
})

function forEachLine(str, fn) {
  setTimeout(() => str.split("\n").forEach(fn), 1)
}
