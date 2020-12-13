import { findFirstInvalid } from "./findFirstInvalid";

var fs = require("fs")
var data = fs.readFileSync(__dirname + '/input.txt', { encoding: 'utf8', flag: 'r' }).trim();

let firstInvalid = findFirstInvalid(data, 25)
console.log(`First invalid number is ${firstInvalid}`)
