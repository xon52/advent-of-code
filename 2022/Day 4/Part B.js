import fs from 'fs'

const sample = fs.readFileSync(`./Day 4/sample.txt`).toLocaleString()
const puzzle = fs.readFileSync(`./Day 4/puzzle.txt`).toLocaleString()

const parseRange = (str) => {
  const rangeArr = str.split('-')
  const start = +rangeArr[0]
  const end = +rangeArr[1]
  const arr = []
  for (let i = start; i <= end; i++) {
    arr.push(i)
  }
  return arr
}
const rangeOverlapsRange = (rng1, rng2) => {
  const sml = rng1.length > rng2.length ? rng2 : rng1
  const lge = rng1.length <= rng2.length ? rng2 : rng1
  return sml.some((e) => lge.includes(e))
}

const run = (input) => {
  const ranges = input.split(`\r\n`).map((r) => r.split(','))
  const parsedRanges = ranges.map((e) => [parseRange(e[0]), parseRange(e[1])])
  const freeElves = parsedRanges.filter((e) => rangeOverlapsRange(e[0], e[1])).length
  console.log(freeElves)
}

run(sample)
run(puzzle)
