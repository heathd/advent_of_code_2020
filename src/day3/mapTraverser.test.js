const mapTraverser = require('./mapTraverser');

const exampleMap = `
..##.......
#...#...#..
.#....#..#.
..#.#...#.#
.#...##..#.
..#.##.....
.#.#.#....#
.#........#
#.##...#...
#...##....#
.#..#...#.#
`.trim()

test('encounters 7 trees in the example map', () => {
  expect(mapTraverser(exampleMap)).toBe(7);
});

test('other slopes', () => {
  expect(mapTraverser(exampleMap, 1, 1)).toBe(2)
  expect(mapTraverser(exampleMap, 3, 1)).toBe(7)
  expect(mapTraverser(exampleMap, 5, 1)).toBe(3)
  expect(mapTraverser(exampleMap, 7, 1)).toBe(4)
  expect(mapTraverser(exampleMap, 1, 2)).toBe(2)
})

test('encounters no trees treeless map', () => {
  expect(mapTraverser(".")).toBe(0)
})

test('encounters a tree on every row in a treeful map', () => {
  expect(mapTraverser("#")).toBe(1)
  expect(mapTraverser("#\n#")).toBe(2)
  expect(mapTraverser("##\n##")).toBe(2)
  expect(mapTraverser("###\n###")).toBe(2)
  expect(mapTraverser("####\n####")).toBe(2)
  expect(mapTraverser("#\n#\n#")).toBe(3)
})
