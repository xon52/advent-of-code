import fs from 'fs'

const sample = fs.readFileSync(`./Day 6/sample.txt`).toLocaleString()
const puzzle = fs.readFileSync(`./Day 6/puzzle.txt`).toLocaleString()

const isUnique = (str) => {
  const set = new Set(str.split(''))
  return set.size === str.length
}

const run = (input) => {
  let index
  for (let i = 0; i < input.length - 14; i++) {
    if (isUnique(input.substring(i, i + 14))) {
      console.log(input.substring(i, i + 14))
      index = i
      break
    }
  }
  console.log(index + 14)
}

run(sample)
run(puzzle)
