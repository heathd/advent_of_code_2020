var fs = require("fs")
var data = fs.readFileSync('input.txt', { encoding: 'utf8', flag: 'r' }).trim();

const { process, process2 } = require('./uniqueQuestions');

console.log(`Sum1 ${process(data)}`)
console.log(`Sum2 ${process2(data)}`)
