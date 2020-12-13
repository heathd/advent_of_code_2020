const findPairsThatAddUpTo = require('./pairFinder');

test('given the numbers [1,2,3] and target number 4 it returns [1,3]', () => {
  expect(findPairsThatAddUpTo([1,2,3], 4)).toStrictEqual([1,3]);
});

test('given the numbers [1,1,1] and target number 4 it returns []', () => {
  expect(findPairsThatAddUpTo([1,1,1], 4)).toStrictEqual([]);
});

test('given the numbers [1,1,1] and target number 2 it returns [1,1]', () => {
  expect(findPairsThatAddUpTo([1,1,1], 2)).toStrictEqual([1,1]);
});

test('given the numbers [3,1,2,5,4] and target number 9 it returns [4,5]', () => {
  expect(findPairsThatAddUpTo([3,1,2,5,4], 9)).toStrictEqual([4,5]);
});

test('given the numbers that dont sort lexicographically', () => {
  expect(findPairsThatAddUpTo([62, 55, 65, 95, 102], 117)).toStrictEqual([55, 62]);
});
