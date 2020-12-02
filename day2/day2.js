var fs = require("fs")
var data = fs
  .readFileSync('input.txt',{encoding:'utf8', flag:'r'})
  .split(/\r?\n/)

console.log(JSON.stringify(data))
const policyChecker = require('./policyChecker')

const numberOfValidLines = data.filter((line) => {
  var [policy, password] = line.split(": ")
  if (policy !== "") {
    return policyChecker(policy, password)
  } else {
    return false
  }
}).length
console.log(`numberOfValidLines: ${numberOfValidLines}`)

