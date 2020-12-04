var fs = require("fs")
var data = fs
  .readFileSync('input.txt', { encoding: 'utf8', flag: 'r' })

const {validatePassportStrict} = require('./validatePassport');

const numValidPassports = validatePassportStrict(data)

console.log(`Found ${numValidPassports} strictly valid passports`)

