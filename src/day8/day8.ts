var fs = require("fs")
var data = fs.readFileSync(__dirname + '/input.txt', { encoding: 'utf8', flag: 'r' }).trim();

import {runProgram} from './parseOne'

console.log(`Accumulator value on loop is ${runProgram(data)}`)
