import fs from 'fs'

const sample = fs.readFileSync(`./Day 12/sample.txt`).toLocaleString()
const puzzle = fs.readFileSync(`./Day 12/puzzle.txt`).toLocaleString()

let startPos, endPos, rows, cols, nodes, map

const getPos = (row, col, dir) => {
  let _row = row
  let _col = col
  if (dir === 'west') _col -= 1
  else if (dir === 'east') _col += 1
  else if (dir === 'north') _row -= 1
  else if (dir === 'south') _row += 1
  if (_row >= 0 && _row < rows && _col >= 0 && _col < cols) return [_row, _col]
  else return undefined
}
const getElev = (row, col) => {
  const curr = map[row][col]
  const west = col - 1 >= 0 ? map[row][col - 1] : undefined
  const east = col + 1 < cols ? map[row][col + 1] : undefined
  const north = row - 1 >= 0 ? map[row - 1][col] : undefined
  const south = row + 1 < rows ? map[row + 1][col] : undefined
  return { curr, west, east, north, south }
}
const getNode = (row, col) => {
  const curr = nodes[row][col]
  const west = col - 1 >= 0 ? nodes[row][col - 1] : undefined
  const east = col + 1 < cols ? nodes[row][col + 1] : undefined
  const north = row - 1 >= 0 ? nodes[row - 1][col] : undefined
  const south = row + 1 < rows ? nodes[row + 1][col] : undefined
  return { curr, west, east, north, south }
}
const setNode = (row, col, dir, val) => {
  if (dir === 'west') nodes[row][col - 1] = val
  else if (dir === 'east') nodes[row][col + 1] = val
  else if (dir === 'north') nodes[row - 1][col] = val
  else if (dir === 'south') nodes[row + 1][col] = val
}

const getElevationMap = (arr) =>
  arr.map((r, ri) =>
    r.map((c, ci) => {
      if (c === 'S') {
        startPos = [ri, ci]
        return 0
      }
      if (c === 'E') {
        endPos = [ri, ci]
        return 25
      }
      return c.charCodeAt(0) - 97
    })
  )

const solveNeighbours = (row, col) => {
  const elev = getElev(row, col)
  const node = getNode(row, col)
  const dirs = ['west', 'east', 'north', 'south']
  dirs.forEach((d) => {
    if (elev[d] !== undefined && elev[d] < elev.curr + 2 && node.curr + 1 < node[d]) {
      setNode(row, col, d, node.curr + 1)
      const pos = getPos(row, col, d)
      solveNeighbours(pos[0], pos[1])
    }
  })
}

const run = (input) => {
  const inputSplit = input.split(`\r\n`).map((e) => e.split(''))
  // Map
  rows = inputSplit.length
  cols = inputSplit[0].length
  map = getElevationMap(inputSplit)
  // Unvisited
  nodes = map.map((r) => r.map(() => Infinity))
  nodes[startPos[0]][startPos[1]] = 0
  solveNeighbours(startPos[0], startPos[1])
  console.log(nodes[endPos[0]][endPos[1]])
}

run(sample)
run(puzzle)
