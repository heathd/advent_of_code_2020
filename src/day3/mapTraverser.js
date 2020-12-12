function mapTraverser(map, rightStep = 3, downStep = 1) {
  var lines = map.split("\n");
  var xPos = 0;
  var lineNumber = 0;

  var treeCount = 0;
  var lineLength = lines[0].length;

  while(lineNumber < lines.length) {
    if (lines[lineNumber][xPos] === '#') {
      treeCount++;
    }
    xPos = (xPos + rightStep) % lineLength;
    lineNumber += downStep
  }
  return treeCount;
}

module.exports = mapTraverser
