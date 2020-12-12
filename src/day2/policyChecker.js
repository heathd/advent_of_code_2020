function policyChecker(policy, password) {
  const [range, letter] = policy.split(" ")
  const [low, high] = range.split("-").map((n) => parseInt(n))

  const count = Array.from(password).filter((l) => l===letter).length
  return low <= count && count <= high;
}

module.exports = policyChecker
