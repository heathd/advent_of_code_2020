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

  describe("inner bag count", () => {
    test("zero if unset", () => {
      var m = new Matrix()
      expect(m.numberOfInnerBags("a", "b")).toBe(0)
    })

    test("defaults to 1", () => {
      var m = new Matrix()
      m.set("a", "b")
      expect(m.numberOfInnerBags("a", "b")).toBe(1)
    })

    test("can be specified", () => {
      var m = new Matrix()
      m.set("a", "b", 3)
      expect(m.numberOfInnerBags("a", "b")).toBe(3)
    })
  })

  describe("transitive closure", () => {
    test("computes one additional path", () => {
      var input = new Matrix()
      input.set("a", "b")
      input.set("b", "c")
      input.transitiveClosure()
      expect(input.listPairs()).toStrictEqual([["a", "b"], ["a", "c"], ["b","c"]])
    })

    test("computes additional paths over a depth of 3 nodes", () => {
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
        ]
      )
    })

    test("keeps track of inner bag count", () => {
      var input = new Matrix()
      input.set("a", "b", 3)
      input.set("b", "c", 2)
      input.transitiveClosure()
      expect(input.listPairsWithCounts()).toStrictEqual([["a", "b", 3], ["a", "c", null], ["b", "c", 2]])
    })

    test("keeps track of inner bag with multiple levels of depth", () => {
      var input = new Matrix()
      input.set("a", "b", 3)
      input.set("b", "c", 2)
      input.set("c", "d", 5)
      input.transitiveClosure()
      expect(input.listPairsWithCounts()).toStrictEqual([
        ["a", "b", 3],
        ["a", "c", null],
        ["a", "d", null],
        ["b", "c", 2],
        ["b", "d", null],
        ["c", "d", 5],
      ])
    })

    test("all direct from", () => {
      var input = new Matrix()
      input.set("a", "b", 3)
      input.set("b", "c", 2)
      input.transitiveClosure()
      expect(input.allDirectFrom("a")).toStrictEqual(["b"])
    })
  })

  describe("depth first walk", () => {
    test("it invokes callback", () => {
      var input = new Matrix()
      input.set("a", "b", 3)
      input.set("b", "c", 2)
      input.set("b", "d", 5)
      input.set("d", "e", 8)
      input.transitiveClosure() // not needed, just to ensure side effects don't cause a problem

      var callRecord = []

      function callback(bagPath, countPath) {
        callRecord.push([bagPath, countPath])
      }
      input.depthFirstWalk("a", callback)

      expect(callRecord).toStrictEqual([
        [["a", "b"], [3]],
        [["a", "b", "c"], [3, 2]],
        [["a", "b", "d"], [3, 5]],
        [["a", "b", "d", "e"], [3, 5, 8]]
      ])
    })
  })

  describe("calculate total bag nesting", () => {
    test("gets 32 for the example", () => {
      const rules = `shiny gold bags contain 1 dark olive bag, 2 vibrant plum bags.
dark olive bags contain 3 faded blue bags, 4 dotted black bags.
vibrant plum bags contain 5 faded blue bags, 6 dotted black bags.
faded blue bags contain no other bags.
dotted black bags contain no other bags.`
      var m = Matrix.parseToMatrix(rules)

      /*
      shiny gold
        1 dark olive
          3 faded blue bags
            -
          4 dotted black bags
            -
        2 vibrant plum bags
          5 faded blue bags
            -
          6 dotted black bags
            -

        1 + 1*3 + 1*4 + 2 + 2*5 + 2*6
      */
      expect(m.totalBagsInside("dark olive")).toBe(3 + 4)
      expect(m.totalBagsInside("vibrant plum")).toBe(5 + 6)

      expect(m.totalBagsInside("shiny gold")).toBe(32)
    })

    test("gets 126 for the second example", () => {
      const rules = `shiny gold bags contain 2 dark red bags.
dark red bags contain 2 dark orange bags.
dark orange bags contain 2 dark yellow bags.
dark yellow bags contain 2 dark green bags.
dark green bags contain 2 dark blue bags.
dark blue bags contain 2 dark violet bags.
dark violet bags contain no other bags.`
      var m = Matrix.parseToMatrix(rules)

      expect(m.totalBagsInside("shiny gold")).toBe(126)
    })

    test("another example", () => {
      var m = new Matrix()
      m.set("a", "b", 3)
      m.set("b", "c", 5)

      expect(m.totalBagsInside("a")).toBe(3 + 3 * 5)
    })

    test("another example2", () => {
      var m = new Matrix()
      m.set("a", "b", 3)
      m.set("b", "c", 5)
      m.set("c", "d", 7)

      expect(m.totalBagsInside("a")).toBe(3 + 3 * 5 + 3 * 5 * 7)
    })
  })



  test("allTo", () => {
    var m = new Matrix()
    m.set("a", "b")
    m.set("x", "b")
    m.set("z", "c")

    expect(m.allTo("b")).toStrictEqual(["a", "x"])
  })

  describe("parseBag", () => {
    test("it parses numbers", () => {
      expect(Matrix.parseBag("1 white")).toStrictEqual(["white", 1])
      expect(Matrix.parseBag("2 fine red")).toStrictEqual(["fine red", 2])
    })
  })
  test("parse", () => {
    expect(Matrix.parse("bright white bags contain 1 shiny gold bag.")).toStrictEqual({ "bright white": [["shiny gold", 1]] })

    const twoLines = `bright white bags contain 1 shiny gold bag.
muted yellow bags contain 2 shiny gold bags, 9 faded blue bags.`
    expect(Matrix.parse(twoLines)).toStrictEqual({
      "bright white": [["shiny gold", 1]],
      "muted yellow": [["shiny gold", 2], ["faded blue", 9]]
    })
  })

  describe("parse to matrix", () => {
    test("identifies connections", () => {
      const rules = `light red bags contain 1 bright white bag, 2 muted yellow bags.
dark orange bags contain 3 bright white bags, 4 muted yellow bags.`

      var m = Matrix.parseToMatrix(rules)
      expect(m.has("light red", "bright white")).toBe(true)
      expect(m.has("light red", "muted yellow")).toBe(true)
      expect(m.has("dark orange", "bright white")).toBe(true)
      expect(m.has("dark orange", "muted yellow")).toBe(true)
    })

    test("identifies counts", () => {
      var m = Matrix.parseToMatrix(`light red bags contain 2 bright white bag`)
      expect(m.numberOfInnerBags("light red", "bright white")).toBe(2)

      var m = Matrix.parseToMatrix(`light red bags contain 2 bright white bags, 7 green bags`)
      expect(m.numberOfInnerBags("light red", "bright white")).toBe(2)
      expect(m.numberOfInnerBags("light red", "green")).toBe(7)
    })

    test("counts with longer rule", () => {
      const rules = `shiny gold bags contain 2 dark red bags.
dark red bags contain 2 dark orange bags.
dark orange bags contain 2 dark yellow bags.
dark yellow bags contain 2 dark green bags.
dark green bags contain 2 dark blue bags.
dark blue bags contain 2 dark violet bags.
dark violet bags contain no other bags.`

      var m = Matrix.parseToMatrix(rules)
      expect(m.numberOfInnerBags("shiny gold", "dark red")).toBe(2)
      expect(m.numberOfInnerBags("dark red", "dark orange")).toBe(2)
    })

    test("counts with longer rule2", () => {
      const rules = `dark maroon bags contain 2 striped silver bags, 4 mirrored maroon bags, 5 shiny gold bags, 1 dotted gold bag.`

      var m = Matrix.parseToMatrix(rules)
      expect(m.numberOfInnerBags("dark maroon", "striped silver")).toBe(2)
      expect(m.numberOfInnerBags("dark maroon", "mirrored maroon")).toBe(4)
      expect(m.numberOfInnerBags("dark maroon", "shiny gold")).toBe(5)
      expect(m.numberOfInnerBags("dark maroon", "dotted gold")).toBe(1)
    })
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
