import fs from 'fs'

const sample = fs.readFileSync(`./Day 10/sample.txt`).toLocaleString()
const puzzle = fs.readFileSync(`./Day 10/puzzle.txt`).toLocaleString()

let x, sprites

const insertPause = (str) => str.replaceAll(`\r\naddx`, `\r\npause\r\naddx`)
const exec = (instruction) => {
  const cmd = instruction[0]
  let val = 0
  // if (cmd === 'noop' || cmd === 'pause')
  if (cmd === 'addx') val = instruction[1]
  x.push(x[x.length - 1] + +val)
}

const getSprite = (pos) => {
  let s = '.....................................'
  for (let i = 0; i < 3; i++) {
    if ([i + pos] >= 0) {
      s = s.substring(0, [i + pos]) + '#' + s.substring([i + pos])
    }
  }
  return s
}

const run = (input) => {
  const instructions = insertPause(input)
    .split(`\r\n`)
    .map((e) => e.split(' '))
  x = [1]
  sprites = ['###.....................................']
  instructions.forEach((instruction) => exec(instruction))
  x.forEach((e) => sprites.push(getSprite(e - 1)))
  for (let i = 0; i < x.length / 40; i++) {
    let row = []
    for (let j = 0; j < 40; j++) {
      if (sprites[i * 40 + j][j] === '#') row.push('█')
      else row.push('░')
    }
    // console.log(sprites.slice([i * 40], [(i + 1) * 40 - 1]))
    console.log(row.join(''))
  }
}

// run(sample)
run(puzzle)
