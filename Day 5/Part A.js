import fs from 'fs'

const sample = fs.readFileSync(`./Day 5/sample.txt`).toLocaleString()
const puzzle = fs.readFileSync(`./Day 5/puzzle.txt`).toLocaleString()

const parseInput = (str) => {
  const separateByLines = str.split(`\r\n`)
  const partTransitionIndex = separateByLines.findIndex((e) => e === '')
  const columnsByLine = separateByLines.slice(partTransitionIndex - 1, partTransitionIndex)
  const columns = columnsByLine[0].split(' ').join('').split('')
  const indexes = columns.map((e) => columnsByLine[0].indexOf(e))
  const cratesByLine = separateByLines.slice(0, partTransitionIndex - 1)
  const instructionsByLine = separateByLines.slice(partTransitionIndex + 1)
  const crates = parseCrates(cratesByLine, indexes)
  const instructions = parseInstructions(instructionsByLine)
  moveCrates(crates, instructions)
  return crates.map((e) => e[0]).join('')
}

const parseCrates = (arr, indexes) =>
  indexes.map((colIndex) => arr.map((crateRow) => crateRow[colIndex]).filter((e) => e !== ' '))
const parseInstructions = (arr) =>
  arr.map((e) =>
    e
      .split('move ')
      .join(',')
      .split(' from ')
      .join(',')
      .split(' to ')
      .join(',')
      .split(',')
      .filter((f) => f !== '')
  )
const moveCrates = (crates, instructions) =>
  instructions.forEach((ins) => {
    for (let i = 0; i < ins[0]; i++) {
      const pickup = crates[ins[1] - 1].shift()
      crates[ins[2] - 1].unshift(pickup)
    }
  })

const run = (input) => {
  console.log(parseInput(input))
}

run(sample)
run(puzzle)
