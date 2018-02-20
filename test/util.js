let fs = require("fs-extra")

const TEST_CASES_PATH = `${__dirname}/tests`
const TEST_CASE_SEPARATOR = "\n-----\n"
const TEST_WORKING_DIRECTORY_PATH = `${__dirname}/_t`

module.exports = {
  readTestCases,
  prepareTestDir,
  cleanUpTestDir,
  pathExists
}

function readTestCases() {
  let fileContent = fs.readFileSync(TEST_CASES_PATH, { encoding: "utf8" })
  return fileContent.split(TEST_CASE_SEPARATOR)
}

function prepareTestDir() {
  if (!fs.existsSync(TEST_WORKING_DIRECTORY_PATH)) {
    fs.mkdirSync(TEST_WORKING_DIRECTORY_PATH)
  }
}

function cleanUpTestDir() {
  if (fs.existsSync(TEST_WORKING_DIRECTORY_PATH)) {
    fs.removeSync(TEST_WORKING_DIRECTORY_PATH)
  }
}

function pathExists(path) {
  return fs.pathExistsSync(`${TEST_WORKING_DIRECTORY_PATH}/${path}`)
}
