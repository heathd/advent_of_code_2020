var fs = require("fs")
var data = fs.readFileSync('input.txt', { encoding: 'utf8', flag: 'r' }).trim();

const Matrix = require('./matrix');

const m = Matrix.parseToMatrix(data)
m.transitiveClosure()
console.log(`There are ${m.allTo("shiny gold").length} outer bags which can enclose a shiny gold bag`)
