export interface ProgramInstruction {
  op: string,
  arg: number
}

export function parseOne(programInstruction: string): ProgramInstruction {
  const matches = programInstruction.match(/^(?<op>nop|acc|jmp) (?<arg>[+-][0-9]+)/);
  if (matches) {
    return {
      op: matches?.groups?.op || "",
      arg: parseInt(matches?.groups?.arg || "0")
    };
  }
  throw new Error(`Invalid program instruction: "${programInstruction}"`);
}
module.exports.parseOne = parseOne

export function parse(program: string): Array<ProgramInstruction> {
  return program.split("\n").map((line) => parseOne(line))
}

interface ExecutionState {
  accumulator: number,
  programPointer: number,
  visitedPositions: Array<number>,
  terminationState: "clean" | "loop" | undefined
}

export function runProgramRaw(programSource: string): ExecutionState {
  return runProgram(parse(programSource))
}

export function runProgram(program: Array<ProgramInstruction>): ExecutionState {
  let e: ExecutionState = {
    accumulator: 0,
    programPointer: 0,
    visitedPositions: [],
    terminationState: undefined
  }

  while (e.programPointer < program.length) {
    if (e.visitedPositions.indexOf(e.programPointer) !== -1) {
      e.terminationState = "loop"
      return e
    }

    e.visitedPositions.push(e.programPointer)
    let instruction = program[e.programPointer]
    switch (instruction.op) {
      case "jmp":
        e.programPointer += instruction.arg
        break;
      case "nop":
        e.programPointer += 1
        break;
      case "acc":
        e.accumulator += instruction.arg
        e.programPointer += 1
        break;

      default:
        throw new Error(`unknown instruction ${instruction.op} at ${e.programPointer}`)
    }
  }

  e.terminationState = "clean"
  return e
}

export function terminatesCleanly(program: string) {
  return runProgramRaw(program) === undefined
}
