

class Matrix {
  m = {}

  constructor(initialList) {
    if (initialList !== undefined) {
      initialList.forEach(([f,t]) => this.set(f,t))
    }
  }

  static parseToMatrix(rules) {
    return new Matrix(this.flatten(this.parse(rules)))
  }

  static parseLine(line) {
    var [outer, innerRaw] = line.split(" bags contain ");
    innerRaw = innerRaw.replace(/ bags?\.?/g, "");
    const inner = innerRaw
      .split(", ")
      .map(s => s.replace(/^[0-9]+ /, ""))
      .filter(s => s !== "no other");
    return [outer, inner];
  }

  static parse(rules) {
    var data = {}
    rules.split("\n").forEach((line) => {
      const [outer, inner] = this.parseLine(line)
      data[outer] = inner
    })
    return data
  }

  static flatten(rules) {
    const flatList = []
    for (const [from, toList] of Object.entries(rules)) {
      toList.forEach(to => flatList.push([from, to]))
    }
    return flatList
  }

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
    return this.listPairs().filter(([from, to]) => to === desiredTo).map(([from, to]) => from)
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
            this.set(from, to)
            numAdded++
          }
        })
      })
    } while (numAdded > 0)
  }
}

module.exports = Matrix
