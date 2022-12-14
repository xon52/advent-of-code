import fs from 'fs'

const sample = fs.readFileSync(`./Day 2/sample.txt`).toLocaleString()
const puzzle = fs.readFileSync(`./Day 2/puzzle.txt`).toLocaleString()

const outcome = (opp, you) => {
  if (opp === 'A') {
    if (you === 'X') return 1 + 3
    if (you === 'Y') return 2 + 6
    if (you === 'Z') return 3 + 0
  }
  if (opp === 'B') {
    if (you === 'X') return 1 + 0
    if (you === 'Y') return 2 + 3
    if (you === 'Z') return 3 + 6
  }
  if (opp === 'C') {
    if (you === 'X') return 1 + 6
    if (you === 'Y') return 2 + 0
    if (you === 'Z') return 3 + 3
  }
}

const convert = (opp, you) => {
  if (opp === 'A') {
    if (you === 'X') return 'Z'
    if (you === 'Y') return 'X'
    if (you === 'Z') return 'Y'
  }
  if (opp === 'B') {
    if (you === 'X') return 'X'
    if (you === 'Y') return 'Y'
    if (you === 'Z') return 'Z'
  }
  if (opp === 'C') {
    if (you === 'X') return 'Y'
    if (you === 'Y') return 'Z'
    if (you === 'Z') return 'X'
  }
}

const run = (input) => {
  const rounds = input.split(`\r\n`).map((e) => e.split(' '))
  const score = rounds.reduce((prev, curr) => +outcome(curr[0], convert(curr[0], curr[1])) + prev, 0)
  console.log(score)
}

run(sample)
run(puzzle)
