import findPairsThatAddUpTo from "../day1/pairFinder";

export function parseCodeStream(codeStreamRaw: string): number[] {
  return codeStreamRaw.split("\n").map((l) => parseInt(l))
}

export function findFirstInvalid(codeStreamRaw: string | number[], windowSize: number): number | undefined {
  let codeStream: number[];
  if (typeof (codeStreamRaw) === "string") {
    codeStream = parseCodeStream(codeStreamRaw)
  } else {
    codeStream = codeStreamRaw;
  }

  function doesntHavePairInWindowThatSumsTo(desiredSum: number, position: number): boolean {
    if (position < windowSize) {
      return false;
    }

    let window = codeStream.slice(position - windowSize, position);

    let found = findPairsThatAddUpTo(window, codeStream[position]);
    return found.length === 0;
  }

  return codeStream.find(doesntHavePairInWindowThatSumsTo);
}

export function findContiguousSequenceThatSumsTo(sequence: number[], desiredSum: number): number[] | undefined {
  for (let sequenceStart = 0; sequenceStart < sequence.length; sequenceStart++) {
    let sequenceEnd = sequenceStart + 1
    let sum = 0
    do {
      let subSequence = sequence.slice(sequenceStart, sequenceEnd)
      sum = subSequence.reduce((sum, v) => sum + v)
      if (sum === desiredSum) {
        return subSequence
      }
      sequenceEnd++
    } while (sum < desiredSum && sequenceEnd <= sequence.length)
  }
}

export function sumMinMax(seq: number[]): number {
  let min = +Infinity
  let max = -Infinity
  seq.forEach(cur => {
    if (cur > max) {
      max = cur
    }
    if (cur < min) {
      min = cur
    }
  })

  return min + max
}
