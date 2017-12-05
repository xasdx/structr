let util = require("./util")
let underTest = require("..")

let tests = util.readTestCases()

beforeEach(util.prepareTestDir)
afterEach(util.cleanUpTestDir)

test("generates directories", () => {
  underTest.generate(tests[0])
  
  forEachLine(tests[0], entry => expect(util.isDir(entry)).toBeTruthy())
})

test("generates files", () => {
  underTest.generate(tests[1])
  
  forEachLine(tests[1], entry => expect(util.isFile(entry)).toBeTruthy())
})

test("generates nested directories", () => {
  underTest.generate(tests[2])
  
  expect(util.isDir("dir1/dir3/dir6/dir8")).toBeTruthy()
  expect(util.isDir("dir1/dir2")).toBeTruthy()
  expect(util.isDir("dir4")).toBeTruthy()
})

test("generates directories and files", () => {
  underTest.generate(tests[3])
  
  expect(util.isDir("dir/dir")).toBeTruthy()
  expect(util.isDir("another_dir/dirr")).toBeTruthy()
  expect(util.isFile("dir/file.txt")).toBeTruthy()
  expect(util.isFile("dir/dir/file.h")).toBeTruthy()
  expect(util.isFile("file.s")).toBeTruthy()
})

function forEachLine(str, fn) {
  str.split("\n").forEach(fn)
}
