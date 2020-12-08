
function split(input) {
  return input.split(/\n\n/)
}

function uniqueQuestions(input) {
  var seenChars = new Set();
  [...input.replace(/\n/g, '')].forEach((c) => seenChars.add(c));
  return seenChars.size;
}

module.exports.split = split
module.exports.uniqueQuestions = uniqueQuestions

function process(input) {
  const counts = split(input).map(uniqueQuestions)

  function reducer(accum, cur) {
    return accum + cur
  }
  return counts.reduce(reducer, 0)
}

module.exports.process = process


function questionsAllYes(block) {
  const countByChar = new Map()
  const eachPerson = block.split("\n")
  const numPeople = eachPerson.length

  eachPerson.forEach((yesList) => {
    [...yesList].forEach((c) => {
      if (countByChar.get(c)) {
        countByChar.set(c, countByChar.get(c) + 1)
      } else {
        countByChar.set(c, 1)
      }
    })

  })
  return [...countByChar].filter(([char, count]) => {
    return count == numPeople
  }).length
}

module.exports.questionsAllYes = questionsAllYes


function process2(input) {
  const counts = split(input).map(questionsAllYes)

  function reducer(accum, cur) {
    return accum + cur
  }
  return counts.reduce(reducer, 0)
}

module.exports.process2 = process2
