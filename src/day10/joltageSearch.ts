export function stepSizes(sequence: number[]): number[] {
  let steps: number[] = []
  sequence.forEach((adapterValue, i) => {
    let prevValue = i === 0 ? 0 : sequence[i - 1]
    steps[i] = adapterValue - prevValue
  })
  steps.push(3) // last step is always 3
  return steps
}

export function countUp(steps: number[]): Map<number, number> {
  let counts = new Map()
  steps.forEach((value) => {
    if (counts.has(value)) {
      counts.set(value, counts.get(value) + 1)
    } else {
      counts.set(value, 1)
    }
  })
  return counts
}

export function isValidSequenceOfSteps(sequenceOfSteps: number[]): boolean {
  return sequenceOfSteps.findIndex((stepSize) => stepSize > 3) === -1
}

export function findValidAdapterSequence(adapters: number[]): number[] | undefined {
  let sorted = [...adapters].sort((a, b) => a - b)

  if (isValidSequenceOfSteps(stepSizes(sorted))) {
    return sorted
  } else {
    return undefined
  }
}
