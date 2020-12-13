import { findFirstInvalid } from "./findFirstInvalid"

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
