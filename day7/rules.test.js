const rules = `light red bags contain 1 bright white bag, 2 muted yellow bags.
dark orange bags contain 3 bright white bags, 4 muted yellow bags.
bright white bags contain 1 shiny gold bag.
muted yellow bags contain 2 shiny gold bags, 9 faded blue bags.
shiny gold bags contain 1 dark olive bag, 2 vibrant plum bags.
dark olive bags contain 3 faded blue bags, 4 dotted black bags.
vibrant plum bags contain 5 faded blue bags, 6 dotted black bags.
faded blue bags contain no other bags.
dotted black bags contain no other bags.
`.trim()

/*
    [white, shiny gold]
    [muted yellow, shiny gold]
    [dark orange, [bright white, muted yellow], shiny gold]
    [light red, [bright white, muted yellow], shiny gold]
*/

function parseLine(line) {
  var [outer, innerRaw] = line.split(" bags contain ")
  innerRaw = innerRaw.replace(/ bags?\.?/g, "")
  const inner = innerRaw
    .split(", ")
    .map(s => s.replace(/^[0-9]+ /, ""))
    .filter(s => s !== "no other")
  return [outer, inner]
}

function parse(rules) {
  var data = {}
  rules.split("\n").forEach((line) => {
    const [outer, inner] = parseLine(line)
    data[outer] = inner
  })
  return data
}

test("parse", () => {
  expect(parse("bright white bags contain 1 shiny gold bag.")).toStrictEqual({"bright white": ["shiny gold"]})

  const twoLines = `bright white bags contain 1 shiny gold bag.
muted yellow bags contain 2 shiny gold bags, 9 faded blue bags.`
  expect(parse(twoLines)).toStrictEqual({
     "bright white": ["shiny gold"],
     "muted yellow": ["shiny gold", "faded blue"]
  })
})

function flatten(rules) {
  const out = new Matrix()
  for (const key in rules) {
    if (rules.hasOwnProperty(key)) {
      rules[key].forEach(v => out.set(key, v))
    }
  }
  return out
}

test("flatten", () => {
  const input = { "a": ["x", "y"] }
  const expectedOutput = [["a", "x"], ["a", "y"]]
  expect(flatten(input).listPairs()).toStrictEqual(expectedOutput)
})

class Matrix {
  m = {}

  set(from, to) {
    if (!this.m.hasOwnProperty(from)) {
      this.m[from] = {}
    }
    this.m[from][to] = 1
  }

  has(from, to) {
    return this.m.hasOwnProperty(from) && this.m[from].hasOwnProperty(to)
  }

  allFrom(from) {
    if (this.m.hasOwnProperty(from)) {
      return Object.keys(this.m[from])
    } else {
      return []
    }
  }

  allTo(desiredTo) {
    return this.listPairs().filter(([from,to]) => to === desiredTo).map(([from, to]) => from)
  }

  listPairs() {
    var pairs = []
    for (const from of Object.keys(this.m)) {
      const toHash = this.m[from]
      for (const to of Object.keys(toHash)) {
        pairs.push([from, to])
      }
    }
    return pairs
  }

  transitiveClosure() {
    do {
      var numAdded = 0
      this.listPairs().forEach((pair) => {
        var [from, mid] = pair
        this.allFrom(mid).forEach((to) => {
          if (!this.has(from, to)) {
            this.set(from,to)
            numAdded++
          }
        })
      })
    } while (numAdded > 0)
  }

}

function parseToMatrix(rules) {
  return flatten(parse(rules))
}

describe("Matrix", () => {
  test("set/has", () => {
    var m = new Matrix()
    expect(m.has("a", "b")).toBe(false)
    m.set("a", "b")
    expect(m.has("a", "b")).toBe(true)
    expect(m.has("a", "c")).toBe(false)

  })
  test("transitive closure", () => {
    var input = new Matrix()
    input.set("a", "b")
    input.set("b", "c")
    input.transitiveClosure()
    expect(input.listPairs()).toStrictEqual([["a", "b"], ["a", "c"], ["b","c"]])

    var input = new Matrix()
    input.set("a", "b")
    input.set("b", "c")
    input.set("c", "d")
    input.transitiveClosure()
    expect(input.listPairs()).toStrictEqual(
      [
        ["a", "b"],
        ["a", "c"],
        ["a", "d"],
        ["b", "c"],
        ["b", "d"],
        ["c", "d"]
      ])
  })

  test("parse to matrix", () => {
    const rules = `light red bags contain 1 bright white bag, 2 muted yellow bags.
dark orange bags contain 3 bright white bags, 4 muted yellow bags.`

    var m = parseToMatrix(rules)
    expect(m.has("light red", "bright white")).toBe(true)
    expect(m.has("light red", "muted yellow")).toBe(true)
    expect(m.has("dark orange", "bright white")).toBe(true)
    expect(m.has("dark orange", "muted yellow")).toBe(true)
  })

  test("allTo", () => {
    var m = new Matrix()
    m.set("a", "b")
    m.set("x", "b")
    m.set("z", "c")

    expect(m.allTo("b")).toStrictEqual(["a", "x"])
  })

})

test("compute outermost bags ending in shiny gold", () => {
  var m = parseToMatrix(rules)
  m.transitiveClosure()
  var outermostBags = m.allTo("shiny gold")
  expect(outermostBags).toIncludeAllMembers([
    "bright white",
    "muted yellow",
    "dark orange",
    "light red"
  ])
})
