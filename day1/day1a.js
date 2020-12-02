var fs = require("fs")
var data = fs
  .readFileSync('input.txt',{encoding:'utf8', flag:'r'})
  .split(/\r?\n/)
  .map((n)=>parseInt(n))
  .filter(Number.isFinite);

console.log(JSON.stringify(data))
const tripleFinder = require('./tripleFinder')

const [a, b, c] = tripleFinder(data, 2020)
console.log(`${a} * ${b} * ${c} = ${a * b * c}`)


