var fs = require("fs")
var data = fs.readFileSync('input.txt', { encoding: 'utf8', flag: 'r' }).trim().split(/[\r\n]/)

const { seatId, gapFinder } = require('./seatId');

console.log(data.map(seatId))

const seatIdList = data.map(seatId).map((s) => s.seat_id)
const maxSeatId = Math.max(...seatIdList)

console.log(`Max seat ID ${maxSeatId}`)

console.log(JSON.stringify(seatIdList))
const gap = gapFinder(seatIdList)
console.log(`Gap at Seat ID ${gap}`)
