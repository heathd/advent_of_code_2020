function parseOne(programInstruction: string): ProgramInstruction {
  const matches = programInstruction.match(/^(?<op>nop|acc|jmp) (?<arg>[+-][0-9]+)/)
  if (matches) {
    return {
      op: matches?.groups?.op || "",
      arg: parseInt(matches?.groups?.arg || "0")
    }
  }
  throw new Error(`Invalid program instruction: "${programInstruction}"`)
}

function parse(program: string): Array<ProgramInstruction> {
  return program.split("\n").map((line) => parseOne(line))
}

interface ProgramInstruction {
  op: string,
  arg: number
}

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

function runProgram(programSource: string): number | undefined {
  const program = parse(programSource)
  let accumulator = 0
  let programPointer = 0
  let visitedPositions = []

  while (programPointer < program.length) {
    if (visitedPositions.indexOf(programPointer) !== -1) {
      return accumulator
    }

    visitedPositions.push(programPointer)
    let instruction = program[programPointer]
    switch(instruction.op) {
      case "jmp":
        programPointer += instruction.arg
        break;
      case "nop":
        programPointer += 1
        break;
      case "acc":
        accumulator += instruction.arg
        programPointer += 1
        break;

      default:
        throw new Error(`unknown instruction ${instruction.op} at ${programPointer}`)
    }
  }
  return undefined
}

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
