var fs = require("fs")
var data = fs.readFileSync('input.txt', { encoding: 'utf8', flag: 'r' }).trim();

const { process } = require('./uniqueQuestions');

const sum = process(data)

console.log(`Sum ${sum}`)
