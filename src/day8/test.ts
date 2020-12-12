
let program = `nop +0
acc +1
jmp +4
acc +3
jmp -3
acc -99
acc +1
jmp -4
acc +6
`.trim()

function accumulatorValueOnRepetition(program: string): number {
  return 5
}

function parse(program: string) {
  return {op: "nop"}
}

describe("loop finder", () => {
  test('basic', () => {
    expect(accumulatorValueOnRepetition(program)).toBe(5);
  })
})

describe("parser", () => {
  test("it parses the program into instructions", () => {
    expect(parse("nop +0")).toStrictEqual({op: "nop"})
  })
})
