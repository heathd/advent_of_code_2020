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

export type ProgramCallback = (program: Array<ProgramInstruction>) => void
export type ProgramPredicate = (program: Array<ProgramInstruction>) => boolean

export function eachMutationOf(program: Array<ProgramInstruction>,
  callback: ProgramCallback): void {
  findMutationWhich(program, (mutated: ProgramInstruction[]) => {
    callback(mutated)
    return false
  })
}

function mutation(op: string): string | undefined {
  let lookup = new Map([
    ["nop", "jmp"],
    ["jmp", "nop"]
  ])
  return lookup.get(op)
}

function terminatesCleanly(program: ProgramInstruction[]): boolean {
  let e = runProgram(program)
  return e.terminationState === "clean"
}

export function findMutationWhichTerminatesCleanly(program: Array<ProgramInstruction>):
Array<ProgramInstruction> | undefined {
  return findMutationWhich(program, terminatesCleanly)
}

export function findMutationWhich(program: Array<ProgramInstruction>,
  callback: ProgramPredicate): Array<ProgramInstruction> | undefined {

  for(let index = 0; index <program.length; index++) {
    const instruction = program[index];
    let m = mutation(instruction.op)
    if (m !== undefined) {
      const mutated = [...program]
      mutated.splice(index, 1, { op: m, arg: instruction.arg })
      if (callback(mutated)) {
        return mutated
      }
    }
  }
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
