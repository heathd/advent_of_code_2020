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

const Matrix = require("./matrix.js")


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

  test("allTo", () => {
    var m = new Matrix()
    m.set("a", "b")
    m.set("x", "b")
    m.set("z", "c")

    expect(m.allTo("b")).toStrictEqual(["a", "x"])
  })

  test("parse", () => {
    expect(Matrix.parse("bright white bags contain 1 shiny gold bag.")).toStrictEqual({ "bright white": ["shiny gold"] })

    const twoLines = `bright white bags contain 1 shiny gold bag.
muted yellow bags contain 2 shiny gold bags, 9 faded blue bags.`
    expect(Matrix.parse(twoLines)).toStrictEqual({
      "bright white": ["shiny gold"],
      "muted yellow": ["shiny gold", "faded blue"]
    })
  })

  test("parse to matrix", () => {
    const rules = `light red bags contain 1 bright white bag, 2 muted yellow bags.
dark orange bags contain 3 bright white bags, 4 muted yellow bags.`

    var m = Matrix.parseToMatrix(rules)
    expect(m.has("light red", "bright white")).toBe(true)
    expect(m.has("light red", "muted yellow")).toBe(true)
    expect(m.has("dark orange", "bright white")).toBe(true)
    expect(m.has("dark orange", "muted yellow")).toBe(true)
  })
})

test("compute outermost bags ending in shiny gold", () => {
  var m = Matrix.parseToMatrix(rules)
  m.transitiveClosure()
  var outermostBags = m.allTo("shiny gold")
  expect(outermostBags).toIncludeAllMembers([
    "bright white",
    "muted yellow",
    "dark orange",
    "light red"
  ])
})
