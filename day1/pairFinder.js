function findPairsThatAddUpTo(listOfNumbers, target) {
  var sortedList = [...listOfNumbers].sort()
  const listEnd = sortedList.length - 1;

  var i = 0
  var j = listEnd

  while (i<j) {
    var sum = sortedList[i] + sortedList[j];
    console.log(`sortedList[${i}]=${sortedList[i]} sortedList[${j}]=${sortedList[j]}  sum: ${sum}`)
    if (i===j || sum < target) {
      i++;
      j = listEnd;
    } else if (sum > target) {
      j--;
    } else {
      return [sortedList[i], sortedList[j]]
    }
  }
  return []
}
module.exports = findPairsThatAddUpTo
