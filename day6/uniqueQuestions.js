
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
