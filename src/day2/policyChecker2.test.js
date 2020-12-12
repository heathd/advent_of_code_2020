const policyChecker2 = require('./policyChecker2');

// 1-3 a: abcde is valid: position 1 contains a and position 3 does not.
// 1-3 b: cdefg is invalid: neither position 1 nor position 3 contains b.
// 2-9 c: ccccccccc is invalid: both position 2 and position 9 contain c.

test('given the policy `1-3 a` and input `abcde` it returns true', () => {
  expect(policyChecker2("1-3 a", "abcde")).toBe(true);
});

test('given the policy `1-3 b` and input `cdefg` it returns false', () => {
  expect(policyChecker2("1-3 b", "cdefg")).toBe(false);
});

test('given the policy `2-9 c` and input `ccccccccc` it returns false', () => {
  expect(policyChecker2("2-9 c", "ccccccccc")).toBe(false);
});
