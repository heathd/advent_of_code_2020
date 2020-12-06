function parseRow(rowDescriptor) {
  const newLocal = rowDescriptor.replace(/F/g, "0").replace(/B/g, "1")
  return parseInt(newLocal, 2)
}

function parseColumn(columnDescriptor) {
  return parseInt(columnDescriptor.replace(/L/g, "0").replace(/R/g, "1"), 2)
}

function seatId(descriptor) {
  const matches = /(?<rowDescriptor>[BF]+)(?<columnDescriptor>[RL]+)/.exec(descriptor);
  if (matches !== null) {
    const row = parseRow(matches.groups.rowDescriptor);
    const column = parseColumn(matches.groups.columnDescriptor);

    return {
      row: row,
      column: column,
      seat_id: row * 8 + column
    };
  }
}
module.exports.seatId = seatId


function gapFinder(sequence) {
  const sorted = [...sequence].sort((a,b) => a-b)
  var previous = null
  for (i = 0; i < sorted.length; i++) {
    if (previous !== null && previous + 1 !== sorted[i]) {
      return previous + 1
    } else {
      previous = sorted[i]
    }
  }
  return null
}
module.exports.gapFinder = gapFinder

