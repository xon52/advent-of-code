import fs from 'fs'

const sample = fs.readFileSync(`./Day 13/sample.txt`).toLocaleString()
const puzzle = fs.readFileSync(`./Day 13/puzzle.txt`).toLocaleString()

const isNum = (str) => !isNaN(parseInt(str))
const parseArr = (str) => {
  console.log('parseArr', str, Array.isArray(str))
  if (Array.isArray(str)) return str
  else return str.slice(1, str.length - 1).split(',')
}

const compareArrays = (left, right) => {
  left.every((e, i) => {
    if (right[i] === undefined) return false
    else {
      console.log('compareArrays', left[i], right[i])
      return compare(left[i], right[i])
    }
  })
  return true
}

const compare = (left, right) => {
  console.log('compare', left, right)
  // Both are integers
  if (isNum(left) && isNum(right)) return right >= left
  // Left is number
  if (isNum(left) && !isNum(right)) return compare([left], parseArr(right))
  // Right is number
  if (!isNum(left) && isNum(right)) return compare(parseArr(left), [right])
  // Both arrays
  return compareArrays(parseArr(left), parseArr(right))
}

const run = (input) => {
  const inputSplit = input.split(`\r\n\r\n`).map((e) => e.split(`\r\n`))
  console.log(inputSplit.map((e) => compare(e[0], e[1])))
}

run(sample)
// run(puzzle)
