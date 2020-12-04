
function parsePassportBatch(data) {
  return data.split("\n\n")
}
exports.parsePassportBatch = parsePassportBatch

function parseRecord(rawRecord) {
  var record = {}

  rawRecord.split(/\s/).forEach((elem) => {
    [key, value] = elem.split(":")
    record[key] = value
  })
  return record
}
exports.parseRecord = parseRecord

function isValidPassport(passport) {
  const requiredFields = [
    "byr",
    "iyr",
    "eyr",
    "hgt",
    "hcl",
    "ecl",
    "pid"
  ]

  return requiredFields.every((required) => passport.hasOwnProperty(required))
}
exports.isValidPassport = isValidPassport

function validatePassport(batch) {
  return parsePassportBatch(batch).map(parseRecord).filter(isValidPassport).length;
}
exports.validatePassport = validatePassport
