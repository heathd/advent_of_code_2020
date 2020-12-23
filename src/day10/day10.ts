var fs = require("fs")
var data = fs.readFileSync(__dirname + '/input.txt', { encoding: 'utf8', flag: 'r' }).trim();

import { countUp, findValidAdapterSequence, stepSizes } from './joltageSearch'

let adapterList = data.split("\n").map( (line: string) => parseInt(line) )
let sequence = findValidAdapterSequence(adapterList)
if (sequence) {
  let stepCounts: Map<number, number> = countUp(stepSizes(sequence))

  console.log(`Sequence found with the following step counts:`)
  let step: number = 0
  stepCounts.forEach((count, step) => {
    console.log(`Step ${step}: ${count}`)
  })

  let oneJoltDifferences = stepCounts.get(1) || 0
  let threeJoltDifferences = stepCounts.get(3) || 0

  console.log(`Number of 1-jolt differences multiplied by the number of 3-jolt differences? ${oneJoltDifferences * threeJoltDifferences}`)

} else {
  console.log(`Unable to find a valid sequence (using the naive algorithm)`)
}
