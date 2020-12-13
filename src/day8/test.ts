import {ProgramInstruction, parse, runProgramRaw, terminatesCleanly} from "./parseOne"

describe("loop finder", () => {
  test('basic', () => {
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

    expect(runProgramRaw(program)).toMatchObject({ accumulator: 5, terminationState: "loop" })
  })
})

describe("parser", () => {
  test("it parses individual instructions", () => {
    expect(parse("nop +0")).toStrictEqual<Array<ProgramInstruction>>([{ op: "nop", arg: 0 }])
    expect(parse("acc +1")).toStrictEqual<Array<ProgramInstruction>>([{ op: "acc", arg: 1 }])
    expect(parse("acc -1")).toStrictEqual<Array<ProgramInstruction>>([{ op: "acc", arg: -1 }])
    expect(parse("jmp -1")).toStrictEqual<Array<ProgramInstruction>>([{ op: "jmp", arg: -1 }])
  })

  test("it parses multiple lines of instructions", () => {
    expect(parse("nop +0\nacc -1")).toStrictEqual<Array<ProgramInstruction>>(
      [
        { op: "nop", arg: 0 },
        { op: "acc", arg: -1 },
      ]
    )
  })
})


describe("program simulator", () => {
  test("it runs a program of nops and returns undefined", () => {
    expect(runProgramRaw("nop +0")).toMatchObject({ terminationState: "clean" })
  })

  test("it runs a program of jmp and returns 0", () => {
    expect(runProgramRaw("jmp +0")).toMatchObject({ accumulator: 0, terminationState: "loop" })
  })

  test("it runs a program of nop and jmp and returns the value in the accumulator", () => {
    expect(runProgramRaw("nop +0\njmp -1")).toMatchObject({ accumulator: 0, terminationState: "loop" })
    expect(runProgramRaw("nop +0\nnop +0\njmp -1")).toMatchObject({ accumulator: 0, terminationState: "loop" })
  })

  test("it runs a program with accumulator and loop", () => {
    expect(runProgramRaw("acc +1\njmp -1")).toMatchObject({ accumulator: 1, terminationState: "loop" })
  })

  test("it runs a program with accumulator, nop and loop", () => {
    expect(runProgramRaw("acc +1\nnop +0\njmp -1")).toMatchObject(
      {accumulator: 1, terminationState: "loop"})
    expect(runProgramRaw("jmp +2\nacc +3\nacc +1\njmp -1")).toMatchObject(
      { accumulator: 1, terminationState: "loop" }
    )
  })

  test("it reports if program terminates cleanly", () => {
    expect(runProgramRaw("nop +0")).toMatchObject({ terminationState: "clean" })
  })
})
