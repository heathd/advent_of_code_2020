import { findContiguousSequenceThatSumsTo, findFirstInvalid, parseCodeStream, sumMinMax } from "./findFirstInvalid";

var fs = require("fs")
var data = fs.readFileSync(__dirname + '/input.txt', { encoding: 'utf8', flag: 'r' }).trim();

let codeStream = parseCodeStream(data)
let firstInvalid = findFirstInvalid(codeStream, 25)

if (firstInvalid) {
  console.log(`First invalid number is ${firstInvalid}`)

  let sequence = findContiguousSequenceThatSumsTo(codeStream, firstInvalid)
  if (sequence) {
    console.log(`Encyrption weakness: ${sumMinMax(sequence)}`)
  } else {
    console.log(`No sequence found that sums to ${firstInvalid}`)
  }
}
