import fs from 'fs'

const sample = fs.readFileSync(`./Day 10/sample.txt`).toLocaleString()
const puzzle = fs.readFileSync(`./Day 10/puzzle.txt`).toLocaleString()

let x

const insertPause = (str) => str.replaceAll(`\r\naddx`, `\r\npause\r\naddx`)
const exec = (instruction) => {
  const cmd = instruction[0]
  let val = 0
  // if (cmd === 'noop' || cmd === 'pause')
  if (cmd === 'addx') val = instruction[1]
  x.push(x[x.length - 1] + +val)
}
const getstrength = (cycle) => x[cycle - 2] * cycle

const run = (input) => {
  const instructions = insertPause(input)
    .split(`\r\n`)
    .map((e) => e.split(' '))
  x = [1]
  instructions.forEach((instruction) => exec(instruction))

  const ans = []
  ans.push(getstrength(20))
  ans.push(getstrength(60))
  ans.push(getstrength(100))
  ans.push(getstrength(140))
  ans.push(getstrength(180))
  ans.push(getstrength(220))
  // console.log(ans)
  console.log(ans.reduce((p, c) => p + c))
}

run(sample)
run(puzzle)
