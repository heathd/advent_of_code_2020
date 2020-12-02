const pairFinder = require('./pairFinder');

function tripleFinder(listOfNumbers, target) {
  var sortedList = [...listOfNumbers].sort()
  const listEnd = sortedList.length - 1;

  var i = 0

  while (i < listEnd - 1) {
    var curValue = sortedList[i]
    var remainder = target - curValue;
    var maybePair = pairFinder(sortedList.slice(i+1, sortedList.length), remainder)
    if (maybePair.length > 0) {
      return [sortedList[i]].concat(maybePair)
    } else {
      i++;
    }
  }
  return []
}
module.exports = tripleFinder
