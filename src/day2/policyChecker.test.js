const policyChecker = require('./policyChecker');

test('given the policy `1-3 a` and input `abcde` it returns true', () => {
  expect(policyChecker("1-3 a", "abcde")).toBe(true);
});


test('given the policy `1-3 b` and input `cdefg` it returns false', () => {
  expect(policyChecker("1-3 b", "cdefg")).toBe(false);
});

test('given the policy `1-3 b` and input `bbb` it returns true', () => {
  expect(policyChecker("1-3 b", "bbb")).toBe(true);
});

test('given the policy `1-3 b` and input `bbbb` it returns false', () => {
  expect(policyChecker("1-3 b", "bbbb")).toBe(false);
});

test('given the policy `2-3 b` and input `b` it returns false', () => {
  expect(policyChecker("2-3 b", "b")).toBe(false);
});
