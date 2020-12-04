var data = `
ecl:gry pid:860033327 eyr:2020 hcl:#fffffd
byr:1937 iyr:2017 cid:147 hgt:183cm

iyr:2013 ecl:amb cid:350 eyr:2023 pid:028048884
hcl:#cfa07d byr:1929

hcl:#ae17e1 iyr:2013
eyr:2024
ecl:brn pid:760753108 byr:1931
hgt:179cm

hcl:#cfa07d eyr:2025 pid:166559648
iyr:2011 ecl:brn hgt:59in
`.trim()

const {parsePassportBatch, parseRecord, validatePassport} = require("./validatePassport")

test("parsing passport batch", () => {
  const passportList = parsePassportBatch(data);
  expect(passportList).toStrictEqual([
    expect.stringMatching(/^ecl:gry/),
    expect.stringMatching(/^iyr:2013/),
    expect.stringMatching(/^hcl:#ae17e1/),
    expect.stringMatching(/^hcl:#cfa07d/)
  ])
})

test("parsing one passport record", () => {
  const oneRecord = `
hcl:#ae17e1 iyr:2013
eyr:2024
ecl:brn pid:760753108 byr:1931
hgt:179cm`.trim()

  expect(parseRecord(oneRecord)).toStrictEqual(
    {
      "hcl": "#ae17e1",
      "iyr": "2013",
      "eyr": "2024",
      "ecl": "brn",
      "pid": "760753108",
      "byr": "1931",
      "hgt": "179cm"
    }
  )
})




test("passport validator", () => {
  expect(validatePassport(data)).toBe(2);
})
