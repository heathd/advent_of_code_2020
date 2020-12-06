/*
    BFFFBBFRRR: row 70, column 7, seat ID 567.
    FFFBBBFRRR: row 14, column 7, seat ID 119.
    BBFFBBFRLL: row 102, column 4, seat ID 820.
*/

const { seatId, gapFinder } = require('./seatId');

test("seat id", () => {
  expect(seatId("BFFFBBFRRR")).toStrictEqual({row: 70, column: 7, seat_id: 567})
})

test("gap finder", () => {
  expect(gapFinder([1, 2, 4])).toBe(3)
  expect(gapFinder([1, 2, 3, 4,5,6,7,8,9,10,12])).toBe(11)
})
