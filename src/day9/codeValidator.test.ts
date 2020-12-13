import { findContiguousSequenceThatSumsTo, findFirstInvalid, sumMinMax } from "./findFirstInvalid"

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

  test("window size can be varied", () => {
    let codeStream = [1, 2, 3, 4, 5, 6, 11, 12, 11]

    expect(findFirstInvalid(codeStream, 3)).toBe(6)
  })
})

describe("contiguous sequence finder", () => {
  test("it finds the contiguous sequence that sums to the value", () => {
    let sequence = [1,2,3,4,5,6]
    expect(findContiguousSequenceThatSumsTo(sequence, 21)).toStrictEqual(sequence)
    expect(findContiguousSequenceThatSumsTo(sequence, 20)).toStrictEqual([2, 3, 4, 5, 6])
    expect(findContiguousSequenceThatSumsTo(sequence, 18)).toStrictEqual([3, 4, 5, 6])
    expect(findContiguousSequenceThatSumsTo(sequence, 18)).toStrictEqual([3, 4, 5, 6])
    expect(findContiguousSequenceThatSumsTo(sequence, 9)).toStrictEqual([2, 3, 4])
  })

})


describe("sumMinMax", () => {
  test("sums the min and max in a sequence", () => {
    expect(sumMinMax([1, 2, 3])).toBe(1 + 3)
    expect(sumMinMax([2, 3, 9])).toBe(2 + 9)
  })
})
