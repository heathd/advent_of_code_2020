import {ProgramInstruction, parse, runProgramRaw, eachMutationOf, findMutationWhich, runProgram, findMutationWhichTerminatesCleanly} from "./parseOne"

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

describe("each mutation of", () => {
  test("it invokes the callback with each possible mutation of a single nop", () => {
    let program = parse("nop +0")
    const f = jest.fn();
    eachMutationOf(program, f)
    expect(f).toHaveBeenCalledWith([{op: "jmp", arg: 0}])
  })

  test("it invokes the callback with each possible mutation of a single jmp program", () => {
    let program = parse("jmp +0")
    const f = jest.fn();
    eachMutationOf(program, f)
    expect(f).toHaveBeenCalledWith([{ op: "nop", arg: 0 }])
  })

  test("it invokes the callback with each possible mutation of a multi instruction program", () => {
    let program = parse("jmp +0\nnop +1")
    const f = jest.fn();
    eachMutationOf(program, f)
    expect(f).toHaveBeenNthCalledWith(1, [
      { op: "nop", arg: 0 },
      { op: "nop", arg: 1 },
    ])
    expect(f).toHaveBeenNthCalledWith(2, [
      { op: "jmp", arg: 0 },
      { op: "jmp", arg: 1 },
    ])
  })

  test("it skips acc instructions", () => {
    let program = parse("jmp +0\nacc +3\nnop +1")
    const f = jest.fn((any) => false);
    eachMutationOf(program, f)
    expect(f).toHaveBeenNthCalledWith(1, [
      { op: "nop", arg: 0 },
      { op: "acc", arg: 3 },
      { op: "nop", arg: 1 },
    ])
    expect(f).toHaveBeenNthCalledWith(2, [
      { op: "jmp", arg: 0 },
      { op: "acc", arg: 3 },
      { op: "jmp", arg: 1 },
    ])
  })

})

describe("searching for program mutation which terminates cleanly", () => {
  test("it can find the mutation", () => {
    let program = parse("jmp +0\nacc +3\nnop +1")

    expect(findMutationWhichTerminatesCleanly(program)).toStrictEqual(
      parse("nop +0\nacc +3\nnop +1")
    )
  })

  test("it returns undefined if there is no mutation which satisfies", () => {
    let program = parse("jmp +0\nacc +3\nnop +1")

    expect(findMutationWhichTerminatesCleanly(program)).toBeUndefined()
  })

  test("it returns the mutation of nop=>jmp", () => {
    let program = parse("nop +0\nacc +3\nnop +1")

    expect(findMutationWhichTerminatesCleanly(program)).toStrictEqual(
      parse("nop +0\nacc +3\njmp +1")
    )
  })

  test("more complex example", () => {
    let program = parse("nop +0\nacc +3\njmp +3\njmp -2\njmp -3\njmp -4")

    expect(findMutationWhichTerminatesCleanly(program)).toStrictEqual(
      parse("nop +0\nacc +3\njmp +3\njmp -2\njmp -3\nnop -4")
    )
  })
})
