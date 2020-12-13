import {ProgramInstruction, parse, runProgram} from "./parseOne"

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

    expect(runProgram(program)).toBe(5);
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
    expect(runProgram("nop +0")).toBe(undefined)
  })

  test("it runs a program of jmp and returns 0", () => {
    expect(runProgram("jmp +0")).toBe(0)
  })

  test("it runs a program of nop and jmp and returns the value in the accumulator", () => {
    expect(runProgram("nop +0\njmp -1")).toBe(0)
    expect(runProgram("nop +0\nnop +0\njmp -1")).toBe(0)
  })

  test("it runs a program with accumulator and loop", () => {
    expect(runProgram("acc +1\njmp -1")).toBe(1)
  })

  test("it runs a program with accumulator, nop and loop", () => {
    expect(runProgram("acc +1\nnop +0\njmp -1")).toBe(1)
    expect(runProgram("jmp +2\nacc +3\nacc +1\njmp -1")).toBe(1)
  })
})
