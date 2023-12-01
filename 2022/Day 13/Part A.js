import fs from 'fs'

const sample = fs.readFileSync(`./Day 13/sample.txt`).toLocaleString()
const puzzle = fs.readFileSync(`./Day 13/puzzle.txt`).toLocaleString()

const isNum = (str) => !isArr(str) && !isNaN(parseInt(str))
const isArr = (str) => Array.isArray(str)

function compare(a, b) {
  if (typeof a === 'number' && typeof b === 'number') {
    return a > b ? false : a < b ? true : undefined
  } else if (Array.isArray(a) !== Array.isArray(b)) {
    return compare(Array.isArray(a) ? a : [a], Array.isArray(b) ? b : [b])
  }

  for (let i = 0, end = Math.max(a.length, b.length); i < end; i++) {
    if (a[i] === undefined) return true
    if (b[i] === undefined) return false
    const result = compare(a[i], b[i])
    if (result !== undefined) return result
  }
  return undefined
}

const run = (input) => {
  const inputSplit = input.split(`\r\n\r\n`).map((e) => e.split(`\r\n`).map((f) => JSON.parse(f)))
  // console.log(
  //   inputSplit.forEach((e) => {
  //     console.log(`\r\n`)
  //     console.log(`\r\n`)
  //     console.log(e)
  //     console.log(`RESULT => ${compare(e[0], e[1])}`)
  //   })
  // )
  const results = inputSplit.map((e) => compare(e[0], e[1]))
  const sum = results.reduce((p, c, i) => (c ? p + i + 1 : p), 0)
  console.log(results)
  console.log(sum)
}

run(sample)
run(puzzle)
