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


export function runProgram(programSource: string): number | undefined {
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
    switch (instruction.op) {
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
