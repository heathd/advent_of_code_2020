const tripleFinder = require('./tripleFinder');

test('given the numbers [1,2,3] and target number 4 it returns [1,2,3]', () => {
  expect(tripleFinder([1,2,3], 6)).toStrictEqual([1,2,3]);
});

test('given the numbers [1,1,1] and target number 4 it returns []', () => {
  expect(tripleFinder([1,1,1], 4)).toStrictEqual([]);
});

test('given the numbers [1,1,1] and target number 3 it returns [1,1,1]', () => {
  expect(tripleFinder([1,1,1], 3)).toStrictEqual([1,1, 1]);
});

test('given the numbers [3,1,2,5,4] and target number 12 it returns [3,4,5]', () => {
  expect(tripleFinder([3,1,2,5,4], 12)).toStrictEqual([3,4,5]);
});
