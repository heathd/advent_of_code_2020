import findPairsThatAddUpTo from "../day1/pairFinder"

function findFirstInvalid(codeStreamRaw: string | number[], windowSize: number): number | undefined {
  let codeStream: number[]
  if (typeof(codeStreamRaw) === "string") {
    codeStream = codeStreamRaw.split("\n").map((l) => parseInt(l))
  } else {
    codeStream = codeStreamRaw
  }

  function doesntHavePairInWindowThatSumsTo(desiredSum: number, position: number): boolean {
    if (position < windowSize) {
      return false
    }

    let window = codeStream.slice(position - 5, position)

    let found = findPairsThatAddUpTo(window, codeStream[position])
    return found.length === 0
  }

  return codeStream.find(doesntHavePairInWindowThatSumsTo)
}

describe("findPairsThatAddUpTo", () => {
  test("it finds a pair within a list of numbers", () => {
    expect(findPairsThatAddUpTo([1, 2, 3, 4, 5], 6)).toStrictEqual([1, 5])
  })

  test("it returns [] if none found", () => {
    expect(findPairsThatAddUpTo([1, 2, 3, 4, 5], 100)).toStrictEqual([])
  })
})

describe("findFirstInvalid", () => {
  test("it finds 127 for the example", () => {
    let codeStream = `35
20
15
25
47
40
62
55
65
95
102
117
150
182
127
219
299
277
309
576`

    expect(findFirstInvalid(codeStream, 5)).toBe(127)
  })

  test("it finds 7 for a simple example", () => {
    let codeStream = [1, 2, 3, 4, 5, 10]

    expect(findFirstInvalid(codeStream, 5)).toBe(10)
  })

  test("it finds 12 for a more complex example", () => {
    let codeStream = [1, 2, 3, 4, 5, 6, 11, 12, 11]

    expect(findFirstInvalid(codeStream, 5)).toBe(12)
  })
})
