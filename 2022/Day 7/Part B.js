import fs from 'fs'

const sample = fs.readFileSync(`./Day 7/sample.txt`).toLocaleString()
const puzzle = fs.readFileSync(`./Day 7/puzzle.txt`).toLocaleString()

let curDir
let solved
let unsolved

const openDir = (dir) => {
  if (dir === '..') curDir.pop()
  else curDir.push(dir)
}

const canSum = (path) => unsolved[path].every((e) => e > 0 || solved[e] !== undefined)
const sum = (path) =>
  unsolved[path].reduce((p, c) => {
    if (Number.isSafeInteger(c)) return p + +c
    return p + +solved[c]
  }, 0)

const run = (input) => {
  solved = {}
  unsolved = {}
  curDir = []
  // Separate commands
  const commands = input.split(`\r\n`).map((e) => e.split(' '))
  // Create initial tree
  commands.forEach((cmd) => {
    if (cmd[0] === '$' && cmd[1] === 'cd') openDir(cmd[2])
    else if (cmd[0] === '$' && cmd[1] === 'ls') null
    else {
      const path = curDir.join('/')
      if (unsolved[path] === undefined) unsolved[path] = []
      if (cmd[0] === 'dir') unsolved[path].push(`${path}/${cmd[1]}`)
      else unsolved[path].push(+cmd[0])
    }
  })
  // Replace each dir with numbers
  while (solved['/'] === undefined) {
    Object.keys(unsolved).forEach((k) => (canSum(k) ? (solved[k] = sum(k)) : null))
  }

  // Order dirs by size
  const ordered = Object.entries(solved).sort((a, b) => a[1] - b[1])
  console.log(ordered)

  const maxSpace = 70000000
  const targetSpaceNeeded = 30000000
  const minSpaceDeleted = targetSpaceNeeded - (maxSpace - solved['/'])
  console.log(minSpaceDeleted)
  console.log(ordered.find((e) => e[1] > minSpaceDeleted))
}

// run(sample)
run(puzzle)
