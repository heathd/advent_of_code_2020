var fs = require("fs")
var data = fs.readFileSync(__dirname + '/input.txt', { encoding: 'utf8', flag: 'r' }).trim();

import {runProgramRaw, findMutationWhichTerminatesCleanly, parse, runProgram} from './parseOne'

console.log(`Accumulator value on loop is ${runProgramRaw(data).accumulator}`)

let mutation = findMutationWhichTerminatesCleanly(parse(data))

if (mutation !== undefined) {
  console.log(`Accumulator value completion for mutated program ${runProgram(mutation).accumulator}`)
} else {
  console.log(`Couldn't find mutation which terminates cleanly`)
}
