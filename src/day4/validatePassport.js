
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

function validatePassport(batch) {
  return parsePassportBatch(batch).map(parseRecord).filter(isValidPassport).length;
}
exports.validatePassport = validatePassport

function isValidPassportStrict(passport) {
  const requiredFields = [
    "byr",
    "iyr",
    "eyr",
    "hgt",
    "hcl",
    "ecl",
    "pid"
  ]

  return requiredFields.every((fieldName) => {
    return passport.hasOwnProperty(fieldName) && isValidPassportField(fieldName, passport[fieldName])
  })
}

function validatePassportStrict(batch) {
  return parsePassportBatch(batch).map(parseRecord).filter(isValidPassportStrict).length;
}
exports.validatePassportStrict = validatePassportStrict

function numberBetween(min, max) {
  return ((v) => {
    return v = ~ /^[0-9]{4}$/ && parseInt(v) >= min && parseInt(v) <= max
  })
}

function numberWithUnits(expectedUnits, numberPredicate) {
  return ((v) => {
    var found = v.match(/^(?<value>[0-9]+)(?<units>[a-z]+)$/)
    if (found && found.groups.units === expectedUnits) {
      return numberPredicate(found.groups.value)
    }
    return false
  })
}

function or(predicate1, predicate2) {
  return ((v) => predicate1(v) || predicate2(v))
}

function isValidPassportField(fieldName, fieldValue) {
  const validators = {
    "byr": numberBetween(1920, 2002),
    "iyr": numberBetween(2010, 2020),
    "eyr": numberBetween(2020, 2030),
    "hgt": or(
      numberWithUnits('cm', numberBetween(150, 193)),
      numberWithUnits('in', numberBetween(59, 76)),
    ),
    "hcl": (v) => /^#[0-9a-f]{6}$/.test(v),
    "ecl": (v) => /^(amb|blu|brn|gry|grn|hzl|oth)$/.test(v),
    "pid": (v) => /^([0-9]{9})$/.test(v),
  }

  return validators[fieldName](fieldValue)
}
exports.isValidPassportField = isValidPassportField
