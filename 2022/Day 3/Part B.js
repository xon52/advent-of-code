import fs from 'fs'

const sample = fs.readFileSync(`./Day 3/sample.txt`).toLocaleString()
const puzzle = fs.readFileSync(`./Day 3/puzzle.txt`).toLocaleString()

const findCommonLetter = (str1, str2, str3) => {
  const orderedStrings = [str1, str2, str3].sort((a, b) => a.length - b.length)
  const shortestString = orderedStrings[0]
  return shortestString.split('').filter((e) => orderedStrings[1].search(e) > -1 && orderedStrings[2].search(e) > -1)[0]
}

const convertLetterToNumber = (letter) => {
  const code = letter.charCodeAt(0)
  return code < 97 ? code - 65 + 1 + 26 : code - 97 + 1
}

const run = (input) => {
  const rucksacks = input.split(`\r\n`)
  let sum = 0
  for (let i = 0; i < rucksacks.length; i += 3) {
    const commonLetter = findCommonLetter(rucksacks[i], rucksacks[i + 1], rucksacks[i + 2])
    const commonNumber = convertLetterToNumber(commonLetter)
    sum += commonNumber
  }
  console.log(sum)
}

run(sample)
run(puzzle)
