import fs from 'fs'

const sample = fs.readFileSync(`./Day 3/sample.txt`).toLocaleString()
const puzzle = fs.readFileSync(`./Day 3/puzzle.txt`).toLocaleString()

const splitArray = (arr) => {
  const c1 = arr.slice(0, arr.length / 2)
  const c2 = arr.slice(arr.length / 2)
  return [c1, c2]
}
const findCommonLetter = (str1, str2) => str1.split('').filter((e) => str2.search(e) > -1)[0]
const convertLetterToNumber = (letter) => {
  const code = letter.charCodeAt(0)
  return code < 97 ? code - 65 + 1 + 26 : code - 97 + 1
}

const run = (input) => {
  const rucksacks = input.split(`\r\n`).map((r) => splitArray(r))
  const commonLetters = rucksacks.map((r) => findCommonLetter(r[0], r[1]))
  const commonNumbers = commonLetters.map((n) => convertLetterToNumber(n))
  const result = commonNumbers.reduce((prev, curr) => curr + prev, 0)
  console.log(result)
}

run(sample)
run(puzzle)
