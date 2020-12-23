import { countUp, findValidAdapterSequence, stepSizes} from './joltageSearch'


describe("countUp", () => {
  test("it counts the occurences of numbers", () => {
    expect(countUp([1, 2, 3])).toStrictEqual(new Map([[1, 1], [2, 1], [3, 1]]))
    expect(countUp([1, 1, 1])).toStrictEqual(new Map([[1, 3]] ))
    expect(countUp([1, 1, 9, 9, 9])).toStrictEqual(new Map([[1, 2], [9, 3]] ))
  })
})

describe("findValidAdapterSequence", () => {
  test('returns an empty list if given an empty list', () => {
    expect(findValidAdapterSequence([])).toStrictEqual([])
  })

  test('returns the single value if its within 3 steps of zero', () => {
    expect(findValidAdapterSequence([1])).toStrictEqual([1])
    expect(findValidAdapterSequence([2])).toStrictEqual([2])
    expect(findValidAdapterSequence([3])).toStrictEqual([3])
  })

  test('returns undefined if the step is too large', () => {
    expect(findValidAdapterSequence([4])).toBeUndefined()
  })

  test('returns the values put in order', () => {
    expect(findValidAdapterSequence([4,3,1,2])).toStrictEqual([1,2,3,4])
  })

  test('example from text', () => {
    let example = [
      28, 33, 18, 42, 31, 14, 46, 20, 48,
      47, 24, 23, 49, 45, 19, 38, 39, 11,
      1, 32, 25, 35, 8, 17, 7, 9, 4, 2,
      34, 10, 3
    ]

    let sequence = findValidAdapterSequence(example) || []
    let stepCounts = countUp(stepSizes(sequence))
    expect(stepCounts).toStrictEqual(
      new Map([
        [1, 22],
        [3, 10]
      ])
    );
  })

})
