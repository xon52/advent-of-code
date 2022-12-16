import fs from 'fs'

const sample = fs.readFileSync(`./Day 9/sample.txt`).toLocaleString()
const puzzle = fs.readFileSync(`./Day 9/puzzle.txt`).toLocaleString()

const start = [0, 0]
let headsHistory, tailsHistory

const convertToSteps = (motions) => {
  const steps = []
  motions.forEach((m) => {
    for (let i = 0; i < m[1]; i++) steps.push(m[0])
  })
  return steps
}

const isTailTouching = (head, tail) => {
  const hDiff = Math.abs(head[0] - tail[0])
  const vDiff = Math.abs(head[1] - tail[1])
  return hDiff < 2 && vDiff < 2
}

const step = (step) => {
  // Head
  const headPos = headsHistory[headsHistory.length - 1]
  if (step === 'R') headsHistory.push([headPos[0], headPos[1] + 1])
  if (step === 'L') headsHistory.push([headPos[0], headPos[1] - 1])
  if (step === 'U') headsHistory.push([headPos[0] + 1, headPos[1]])
  if (step === 'D') headsHistory.push([headPos[0] - 1, headPos[1]])
  const newHeadPos = headsHistory[headsHistory.length - 1]
  // Tail
  const tailPos = tailsHistory[tailsHistory.length - 1]
  if (isTailTouching(newHeadPos, tailPos)) tailsHistory.push(tailPos.slice())
  else tailsHistory.push(headPos.slice())
}

const run = (input) => {
  const motions = input.split(`\r\n`).map((e) => e.split(' '))
  const steps = convertToSteps(motions)
  headsHistory = [start.slice()]
  tailsHistory = [start.slice()]
  steps.forEach((s) => step(s))
  const uniqueTailSteps = new Set(tailsHistory.map((e) => `${e[0]},${e[1]}`))
  console.log(uniqueTailSteps.size)
}

run(sample)
run(puzzle)
