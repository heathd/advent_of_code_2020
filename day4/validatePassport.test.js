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

const {
  parsePassportBatch,
  parseRecord,
  validatePassport,
  validatePassportStrict,
  isValidPassportField
} = require("./validatePassport")

test("parsing passport batch", () => {
  const passportList = parsePassportBatch(data);
  expect(passportList).toStrictEqual([
    expect.stringMatching(/^ecl:gry/),
    expect.stringMatching(/^iyr:2013/),
    expect.stringMatching(/^hcl:#ae17e1/),
    expect.stringMatching(/^hcl:#cfa07d/)
  ])
})

test("passport validator", () => {
  expect(validatePassport(data)).toBe(2)
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

describe("isValidPassportField", () => {
  /*
    pid (Passport ID) - a nine-digit number, including leading zeroes.
    cid (Country ID) - ignored, missing or not.
  */
  test("byr four digits; at least 1920 and at most 2002.", () => {
    expect(isValidPassportField("byr", "a")).toBe(false)
    expect(isValidPassportField("byr", "1")).toBe(false)
    expect(isValidPassportField("byr", "1919")).toBe(false)
    expect(isValidPassportField("byr", "1920")).toBe(true)
    expect(isValidPassportField("byr", "2002")).toBe(true)
    expect(isValidPassportField("byr", "2003")).toBe(false)
  })

  test("iyr four digits; at least 2010 and at most 2020.", () => {
    expect(isValidPassportField("iyr", "a")).toBe(false)
    expect(isValidPassportField("iyr", "1")).toBe(false)
    expect(isValidPassportField("iyr", "2009")).toBe(false)
    expect(isValidPassportField("iyr", "2010")).toBe(true)
    expect(isValidPassportField("iyr", "2020")).toBe(true)
    expect(isValidPassportField("iyr", "2021")).toBe(false)
  })

  test("eyr four digits; four digits; at least 2020 and at most 2030.", () => {
    expect(isValidPassportField("eyr", "a")).toBe(false)
    expect(isValidPassportField("eyr", "1")).toBe(false)
    expect(isValidPassportField("eyr", "2019")).toBe(false)
    expect(isValidPassportField("eyr", "2020")).toBe(true)
    expect(isValidPassportField("eyr", "2030")).toBe(true)
    expect(isValidPassportField("eyr", "2031")).toBe(false)
  })

  test("hgt(Height) - a number followed by cm at least 150 and at most 193", () => {
    expect(isValidPassportField("hgt", "123")).toBe(false) // no units
    expect(isValidPassportField("hgt", "123ff")).toBe(false) // invalid units
    expect(isValidPassportField("hgt", "123cm")).toBe(false) // valid units, too low
    expect(isValidPassportField("hgt", "149cm")).toBe(false) // valid units, too low
    expect(isValidPassportField("hgt", "150cm")).toBe(true) // valid units, lower bound
    expect(isValidPassportField("hgt", "193cm")).toBe(true) // valid units, upper bound
    expect(isValidPassportField("hgt", "194cm")).toBe(false) // valid units, too high
  })

  test("hgt(Height) - a number followed by in at least 59 and at most 76", () => {
    expect(isValidPassportField("hgt", "123")).toBe(false) // no units
    expect(isValidPassportField("hgt", "123ff")).toBe(false) // invalid units
    expect(isValidPassportField("hgt", "58in")).toBe(false) // valid units, too low
    expect(isValidPassportField("hgt", "59in")).toBe(true) // valid units, lower bound
    expect(isValidPassportField("hgt", "76in")).toBe(true) // valid units, upper bound
    expect(isValidPassportField("hgt", "77in")).toBe(false) // valid units, too high
  })

  test("hcl(Hair Color) - a # followed by exactly six characters 0 - 9 or a - f.", () => {
    expect(isValidPassportField("hcl", "#000000")).toBe(true)
    expect(isValidPassportField("hcl", "#abcdef")).toBe(true)
    expect(isValidPassportField("hcl", "#00000g")).toBe(false)
  })

  test("ecl(Eye Color) - exactly one of: amb blu brn gry grn hzl oth.", () => {
    expect(isValidPassportField("ecl", "amb")).toBe(true)
    expect(isValidPassportField("ecl", "blu")).toBe(true)
    expect(isValidPassportField("ecl", "brn")).toBe(true)
    expect(isValidPassportField("ecl", "gry")).toBe(true)
    expect(isValidPassportField("ecl", "grn")).toBe(true)
    expect(isValidPassportField("ecl", "hzl")).toBe(true)
    expect(isValidPassportField("ecl", "oth")).toBe(true)

    expect(isValidPassportField("ecl", "zzz")).toBe(false)
    expect(isValidPassportField("ecl", "0")).toBe(false)
    expect(isValidPassportField("ecl", "")).toBe(false)
    expect(isValidPassportField("ecl", "ambe")).toBe(false)
  })

  test("pid(Passport ID) - a nine - digit number, including leading zeroes.", () => {
    expect(isValidPassportField("pid", "000000000")).toBe(true);
    expect(isValidPassportField("pid", "0000000000")).toBe(false);
    expect(isValidPassportField("pid", "00000000")).toBe(false);
  })
})

test("strict passport validator", () => {
  const allInvalid = `
eyr:1972 cid:100
hcl:#18171d ecl:amb hgt:170 pid:186cm iyr:2018 byr:1926

iyr:2019
hcl:#602927 eyr:1967 hgt:170cm
ecl:grn pid:012533040 byr:1946

hcl:dab227 iyr:2012
ecl:brn hgt:182cm pid:021572410 eyr:2020 byr:1992 cid:277

hgt:59cm ecl:zzz
eyr:2038 hcl:74454a iyr:2023
pid:3556412378 byr:2007
`.trim()

  expect(validatePassportStrict(allInvalid)).toBe(0);

  const allValid = `
pid:087499704 hgt:74in ecl:grn iyr:2012 eyr:2030 byr:1980
hcl:#623a2f

eyr:2029 ecl:blu cid:129 byr:1989
iyr:2014 pid:896056539 hcl:#a97842 hgt:165cm

hcl:#888785
hgt:164cm byr:2001 iyr:2015 cid:88
pid:545766238 ecl:hzl
eyr:2022

iyr:2010 hgt:158cm hcl:#b6652a ecl:blu byr:1944 eyr:2021 pid:093154719
`.trim()

  expect(validatePassportStrict(allValid)).toBe(4);

})
