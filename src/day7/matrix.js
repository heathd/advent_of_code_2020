

class Matrix {
  m = {}

  constructor(initialList) {
    if (initialList !== undefined) {
      initialList.forEach(([f,t, count]) => this.set(f,t, count))
    }
  }

  static parseToMatrix(rules) {
    return new Matrix(this.flatten(this.parse(rules)))
  }

  static parseBag(bagStatement) {
    // 1 bright white
    // 2 muted yellow
    const [ignored, countText, bag] = bagStatement.split(/^([0-9]+ )/)
    return [bag, parseInt(countText.trim())]
  }

  static parseLine(line) {
    var [outer, innerRaw] = line.split(" bags contain ");
    innerRaw = innerRaw.replace(/ bags?\.?/g, "");
    const inner = innerRaw
      .split(", ")
      .filter(s => s !== "no other")
      .map(s => this.parseBag(s))
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
      toList.forEach(([to, count]) => flatList.push([from, to, count]))
    }
    return flatList
  }

  set(from, to, count=1) {
    if (!this.m.hasOwnProperty(from)) {
      this.m[from] = {}
    }
    this.m[from][to] = count
  }

  has(from, to) {
    return this.m.hasOwnProperty(from) && this.m[from].hasOwnProperty(to)
  }

  numberOfInnerBags(from, to) {
    if (this.has(from,to)) {
      return this.m[from][to]
    }
    return 0;
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

  listPairsWithCounts() {
    var pairs = []
    for (const from of Object.keys(this.m)) {
      const toHash = this.m[from]
      for (const to of Object.keys(toHash)) {
        pairs.push([from, to, toHash[to]])
      }
    }
    return pairs
  }

  transitiveClosure() {
    do {
      var numAdded = 0
      this.listPairs().forEach(([from, mid]) => {
        this.allFrom(mid).forEach((to) => {
          if (!this.has(from,to)) {
            this.set(from, to, null)
            numAdded++
          }
        })
      })
    } while (numAdded > 0)
  }

  allDirectFrom(from) {
    if (this.m.hasOwnProperty(from)) {
      return Object.entries(this.m[from])
        .filter(([to, count]) => count !== null)
        .map(([to, count]) => to)
    } else {
      return []
    }
  }

  /*
    callback(bagPath, countPath)
  */
  depthFirstWalk(outermost, callback, path = undefined, countPath = []) {
    if (path === undefined) {
      path = [outermost]
    }
    this.allDirectFrom(outermost).forEach(inner => {
      const n = this.numberOfInnerBags(outermost, inner)
      callback(path.concat(inner), countPath.concat(n))

      this.depthFirstWalk(inner, callback, path.concat(inner), countPath.concat(n))
    })
  }

  totalBagsInside(outermost) {
    var total = 0
    function callback(bagPath, countPath) {
      total += countPath.reduce((a,b) => a*b, 1)
    }
    this.depthFirstWalk(outermost, callback)
    return total
  }
}

module.exports = Matrix
