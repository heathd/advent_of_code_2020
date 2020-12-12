var fs = require("fs")
var data = fs
  .readFileSync('input.txt', { encoding: 'utf8', flag: 'r' })

const {validatePassport} = require('./validatePassport');

const numValidPassports = validatePassport(data)

console.log(`Found ${numValidPassports} valid passports`)

