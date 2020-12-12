var fs = require("fs")
var data = fs
  .readFileSync('input.txt', { encoding: 'utf8', flag: 'r' })

const mapTraverser = require('./mapTraverser');

const trees = mapTraverser(data)
console.log(`number of trees encountered: ${trees}`)

var product = 1;

[
  [1, 1],
  [3, 1],
  [5, 1],
  [7, 1],
  [1, 2]
].forEach(([rightStep, downStep]) => {
  var treesEncountered = mapTraverser(data,rightStep, downStep)
  console.log(`Right ${rightStep} down ${downStep}: ${treesEncountered} trees`)

  product *= treesEncountered
})

console.log(`Product: ${product}`)
