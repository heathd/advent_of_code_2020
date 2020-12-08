/*
    BFFFBBFRRR: row 70, column 7, seat ID 567.
    FFFBBBFRRR: row 14, column 7, seat ID 119.
    BBFFBBFRLL: row 102, column 4, seat ID 820.
*/

const data = `abc

a
b
c

ab
ac

a
a
a
a

b
`.trim()

const { split, uniqueQuestions, process } = require('./uniqueQuestions');

test("split", () => {
  expect(split(data).length).toBe(5)
  expect(split(data)[0]).toBe("abc")
  expect(split(data)[1]).toBe("a\nb\nc")
  expect(split(data)[2]).toBe("ab\nac")
})

test("unique questions", () => {
  expect(uniqueQuestions("a")).toBe(1)
  expect(uniqueQuestions("ab")).toBe(2)
  expect(uniqueQuestions("abb")).toBe(2)
  expect(uniqueQuestions("a\nb")).toBe(2)
  expect(uniqueQuestions("ab\nac")).toBe(3)
})

test('process', () => {
  expect(process(data)).toBe(11)
})
