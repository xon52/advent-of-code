import fs from 'fs'

const sample = fs.readFileSync(`./Day 8/sample.txt`).toLocaleString()
const puzzle = fs.readFileSync(`./Day 8/puzzle.txt`).toLocaleString()

let rows, cols, grid

const getNextPos = (row, col, dir) => {
  if (dir === 'L') return [row, col - 1]
  if (dir === 'R') return [row, col + 1]
  if (dir === 'U') return [row - 1, col]
  if (dir === 'D') return [row + 1, col]
}
const isValid = (a) => a[0] >= 0 && a[0] < rows && a[1] >= 0 && a[1] < cols

const calcScenic = (row, col) => {
  let scores = []
  let dirs = ['L', 'R', 'U', 'D']
  dirs.forEach((dir) => {
    let dirScore = 0
    let initHeight = grid[row][col]
    let curPos = [row, col]
    while (true) {
      let nextPos = getNextPos(curPos[0], curPos[1], dir)
      if (!isValid(nextPos)) break
      dirScore++
      let nextHeight = grid[nextPos[0]][nextPos[1]]
      if (nextHeight >= initHeight) break
      curPos = nextPos
    }
    scores.push(dirScore)
  })
  return scores.reduce((p, c) => c * p, 1)
}

const getMax = (arr) => arr.reduce((p, c) => (c > p ? c : p), 0)

const run = (input) => {
  const inputToArray = input.split(`\r\n`)
  grid = inputToArray.map((e) => e.split(``))
  rows = inputToArray.length
  cols = inputToArray[0].length
  const scores = {}
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) scores[`${r},${c}`] = calcScenic(r, c)
  console.log(getMax(Object.values(scores)))
}

run(sample)
run(puzzle)
