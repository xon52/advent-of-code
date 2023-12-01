import fs from 'fs'

const sample = fs.readFileSync(`./Day 8/sample.txt`).toLocaleString()
const puzzle = fs.readFileSync(`./Day 8/puzzle.txt`).toLocaleString()

let rows, cols, visible

const add = (row, col) => visible.add(`${row}, ${col}`)

const addOuterLayer = () => {
  for (let r = 0; r < rows; r++)
    for (let c = 0; c < cols; c++) if (r === 0 || c === 0 || r === rows - 1 || c === cols - 1) add(r, c)
}

const countFromLeft = (grid) => {
  for (let r = 1; r < rows - 1; r++) {
    let max = grid[r][0]
    for (let c = 1; c < cols - 1; c++) {
      if (max < grid[r][c]) {
        add(r, c)
        max = grid[r][c]
      }
    }
  }
}
const countFromTop = (grid) => {
  for (let c = 1; c < cols - 1; c++) {
    let max = grid[0][c]
    for (let r = 1; r < rows - 1; r++) {
      if (max < grid[r][c]) {
        add(r, c)
        max = grid[r][c]
      }
    }
  }
}
const countFromBottom = (grid) => {
  for (let c = 1; c < cols - 1; c++) {
    let max = grid[rows - 1][c]
    for (let r = rows - 1; r > 0; r--) {
      if (max < grid[r][c]) {
        add(r, c)
        max = grid[r][c]
      }
    }
  }
}
const countFromRight = (grid) => {
  for (let r = 1; r < rows - 1; r++) {
    let max = grid[r][cols - 1]
    for (let c = cols - 1; c > 0; c--) {
      if (max < grid[r][c]) {
        add(r, c)
        max = grid[r][c]
      }
    }
  }
}

const run = (input) => {
  const inputToArray = input.split(`\r\n`)
  const grid = inputToArray.map((e) => e.split(``))
  rows = inputToArray.length
  cols = inputToArray[0].length
  visible = new Set()
  addOuterLayer()
  countFromLeft(grid)
  countFromTop(grid)
  countFromBottom(grid)
  countFromRight(grid)
  // console.log(visible)
  console.log(visible.size)
}

run(sample)
run(puzzle)
