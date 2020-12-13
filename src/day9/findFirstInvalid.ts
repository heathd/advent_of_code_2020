import findPairsThatAddUpTo from "../day1/pairFinder";

export function findFirstInvalid(codeStreamRaw: string | number[], windowSize: number): number | undefined {
  let codeStream: number[];
  if (typeof (codeStreamRaw) === "string") {
    codeStream = codeStreamRaw.split("\n").map((l) => parseInt(l));
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
