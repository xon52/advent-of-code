import fs from 'fs'

const sample = fs.readFileSync(`./Day 9/sampleB.txt`).toLocaleString()
const puzzle = fs.readFileSync(`./Day 9/puzzle.txt`).toLocaleString()

const start = [0, 0]
const sections = 10
let history

const convertToSteps = (motions) => {
  const steps = []
  motions.forEach((m) => {
    for (let i = 0; i < m[1]; i++) steps.push(m[0])
  })
  return steps
}

const isTouching = (head, tail) => {
  const hDiff = Math.abs(head[0] - tail[0])
  const vDiff = Math.abs(head[1] - tail[1])
  return hDiff < 2 && vDiff < 2
}

const step = (step) => {
  // Head
  const headPos = history[0][history[0].length - 1]
  if (step === 'R') history[0].push([headPos[0], headPos[1] + 1])
  if (step === 'L') history[0].push([headPos[0], headPos[1] - 1])
  if (step === 'U') history[0].push([headPos[0] + 1, headPos[1]])
  if (step === 'D') history[0].push([headPos[0] - 1, headPos[1]])
  // Body
  for (let s = 1; s < sections; s++) {
    const pPos = history[s - 1][history[s - 1].length - 1]
    const sPos = history[s][history[s].length - 1]
    if (isTouching(pPos, sPos)) history[s].push(sPos.slice())
    else {
      const dX = pPos[0] === sPos[0] ? 0 : pPos[0] > sPos[0] ? 1 : -1
      const dY = pPos[1] === sPos[1] ? 0 : pPos[1] > sPos[1] ? 1 : -1
      history[s].push([sPos[0] + dX, sPos[1] + dY])
    }
  }
}

const run = (input) => {
  const motions = input.split(`\r\n`).map((e) => e.split(' '))
  const steps = convertToSteps(motions)
  history = Array.from(Array(sections)).map((e) => [start.slice()])
  steps.forEach((s) => step(s))
  const uniqueTailSteps = new Set(history[sections - 1].map((e) => `${e[0]},${e[1]}`))
  console.log(uniqueTailSteps.size)
}

run(sample)
run(puzzle)
