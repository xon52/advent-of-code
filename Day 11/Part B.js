import fs from 'fs'

const sample = fs.readFileSync(`./Day 11/sample.txt`).toLocaleString()
const puzzle = fs.readFileSync(`./Day 11/puzzle.txt`).toLocaleString()

const parseWorry = (str, old) => {
  const parts = str.split(' ')
  const a = parts[0] === 'old' ? old : BigInt(parts[0])
  const b = parts[2] === 'old' ? old : BigInt(parts[2])
  if (parts[1] === '+') return a + b
  if (parts[1] === '*') return a * b
}

/**
 * If the worry level drifts too high, you need to reduce it in a way that wouldn't affect the result after dividing ANY of the divisors.
 */
const parseWorryNew = (str, old, div) => {
  const parts = str.split(' ')
  const a = parts[0] === 'old' ? old : BigInt(parts[0])
  const b = parts[2] === 'old' ? old : BigInt(parts[2])
  let worry
  let mod
  let ta = +a.toString().slice(a.toString().length - div * 3)
  let tb = +b.toString().slice(b.toString().length - div * 3)
  if (parts[1] === '+') worry = ta + tb
  else if (parts[1] === '*') worry = ta * tb
  if (parts[1] === '+') mod = (ta + tb) % div
  else if (parts[1] === '*') mod = (ta * tb) % div
  return { worry, mod }
}

const run = (input) => {
  const inputSplit = input.split(`\r\n`)
  // Find and set monkey data
  const monkeys = []
  for (let i = 0; i < (inputSplit.length + 1) / 7; i++) {
    monkeys.push({
      name: `Monkey ${i}`,
      items: inputSplit[i * 7 + 1]
        .replace('  Starting items: ', '')
        .split(', ')
        .map((e) => BigInt(e)),
      operation: inputSplit[i * 7 + 2].replace('  Operation: new = ', ''),
      test: +inputSplit[i * 7 + 3].replace('  Test: divisible by ', ''),
      ifTrue: +inputSplit[i * 7 + 4].replace('    If true: throw to monkey ', ''),
      ifFalse: +inputSplit[i * 7 + 5].replace('    If false: throw to monkey ', ''),
      inspected: 0,
    })
  }
  // Rounds
  for (let r = 0; r < 1000; r++) {
    // Monkey round
    monkeys.forEach((monkey) => {
      // Monkey inspects an item with a worry level
      monkey.items.forEach((item) => {
        // Worry level is operated on
        let { worry, mod } = parseWorryNew(monkey.operation, item, monkey.test)
        const thrownTo = mod === 0 ? monkey.ifTrue : monkey.ifFalse
        monkeys[thrownTo].items.push(worry)
        monkey.inspected++
      })
      monkey.items = []
    })
    // console.log(`--- Round ${r + 1} ---`)
    // console.log(monkeys.map((m) => `${m.name}: ${m.items.toString()}`))
  }

  // Answer
  console.log(monkeys.map((m) => `${m.name}: ${m.inspected}`))
  console.log(
    monkeys
      .sort((a, b) => b.inspected - a.inspected)
      .slice(0, 2)
      .reduce((p, c) => p * c.inspected, 1)
  )
}

run(sample)
// run(puzzle)
