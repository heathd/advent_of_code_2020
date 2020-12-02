
function policyChecker2(policy, password) {
  const [range, letter] = policy.split(" ")
  const [pos1, pos2] = range.split("-").map((n) => parseInt(n))

  const chars = [password[pos1 - 1], password[pos2 - 1]]
  const count = chars.filter((l) => l===letter).length
  return count == 1;
}

module.exports = policyChecker2
