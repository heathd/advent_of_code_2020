var fs = require("fs")
var data = fs
  .readFileSync('input.txt',{encoding:'utf8', flag:'r'})
  .split(/\r?\n/)
  .map((n)=>parseInt(n))
  .filter(Number.isFinite);

console.log(JSON.stringify(data))
const pairFinder = require('./pairFinder')

console.log(pairFinder(data, 2000))

