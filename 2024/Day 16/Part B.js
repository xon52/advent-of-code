import { getFileData } from '../../helpers/index.js';

/*
  The puzzle is a maze with # as walls and . as paths. 
  The maze has a start point S and an end point E.
  Moving forward costs 1 minute.
  Rotating 90 degrees costs 1000 minutes.
  The goal is to find the shortest path from S to E.
*/

const FORWARD_COST = 1;
const ROTATE_COST = 1000;

const getForwardMove = (x, y, direction) => {
	if (direction === 'N') return { x, y: y - 1, direction };
	if (direction === 'E') return { x: x + 1, y, direction };
	if (direction === 'S') return { x, y: y + 1, direction };
	if (direction === 'W') return { x: x - 1, y, direction };
	throw new Error('Invalid direction', direction);
};

const rotateLeft = (direction) => {
	const directions = ['N', 'E', 'S', 'W'];
	const currentIndex = directions.indexOf(direction);
	return directions[(currentIndex + 3) % 4];
};

const rotateRight = (direction) => {
	const directions = ['N', 'E', 'S', 'W'];
	const currentIndex = directions.indexOf(direction);
	return directions[(currentIndex + 1) % 4];
};

const checkIfValid = (x, y, grid) => {
	return x >= 0 && x < grid[0].length && y >= 0 && y < grid.length && grid[y][x] !== '#';
};

const getPossibleMoves = (x, y, direction, grid) => {
	const moves = [];
	const forward = getForwardMove(x, y, direction);
	if (checkIfValid(forward.x, forward.y, grid)) {
		moves.push({ ...forward, cost: FORWARD_COST });
	}
	moves.push({ x, y, direction: rotateLeft(direction), cost: ROTATE_COST });
	moves.push({ x, y, direction: rotateRight(direction), cost: ROTATE_COST });
	return moves;
};

const getPathCost = (path) => {
	return path.reduce((acc, move) => acc + move.cost, 0);
};

const move = (x, y, direction, grid, visited, queue, path) => {
	const moves = getPossibleMoves(x, y, direction, grid);
	for (const move of moves) {
		const { x, y, direction, cost } = move;
		const totalCost = getPathCost(path) + cost;
		if (!visited.has(`${x},${y},${direction}`) || visited.get(`${x},${y},${direction}`) >= totalCost) {
			visited.set(`${x},${y},${direction}`, totalCost);
			queue.push({ pos: { x, y }, direction, path: [...path, move] });
		}
	}
};

const countUniquePositions = (paths) => {
	const uniquePositions = new Set();
	for (const path of paths) {
		for (const move of path) {
			uniquePositions.add(`${move.x},${move.y}`);
		}
	}
	return uniquePositions.size;
};

const overlayUniquePositions = (grid, uniquePositions) => {
	const overlayGrid = grid.map((row) => row.split('')); // Create a mutable copy of the grid
	for (const pos of uniquePositions) {
		const [x, y] = pos.split(',').map(Number);
		if (grid[y][x] === '.') {
			// Only overlay on paths
			overlayGrid[y][x] = 'O';
		}
	}
	// Log the modified grid
	overlayGrid.forEach((row) => console.log(row.join('')));
};

const run = (puzzle) => {
	const grid = getFileData(import.meta, puzzle);
	let startPos = { x: 0, y: 0 };
	let endPos = { x: 0, y: 0 };
	const startDirection = 'E';
	for (let y = 0; y < grid.length; y++) {
		for (let x = 0; x < grid[y].length; x++) {
			if (grid[y][x] === 'S') startPos = { x, y };
			if (grid[y][x] === 'E') endPos = { x, y };
		}
	}

	const visited = new Map();
	const queue = [{ pos: startPos, direction: startDirection, path: [] }];
	let minCost = Infinity;
	let bestPaths = []; // Change from bestPath to bestPaths
	const allPaths = []; // Store all valid paths

	while (queue.length > 0) {
		const { pos, direction, path } = queue.shift();
		move(pos.x, pos.y, direction, grid, visited, queue, path);
		if (pos.x === endPos.x && pos.y === endPos.y) {
			const currentCost = getPathCost(path);
			allPaths.push(path); // Add the valid path to the list
			if (currentCost < minCost) {
				minCost = currentCost;
				bestPaths = [path]; // Reset bestPaths with the new best path
			} else if (currentCost === minCost) {
				bestPaths.push(path); // Add to bestPaths if cost is equal
			}
		}
	}
	console.log(minCost);
	console.log(`Unique positions: ${countUniquePositions(bestPaths)}`); // Log unique positions from bestPaths

	const uniquePositions = Array.from(new Set(bestPaths.flat().map((move) => `${move.x},${move.y}`))); // Get unique positions from bestPaths
	// overlayUniquePositions(grid, uniquePositions); // Overlay unique positions on the grid
};

run('sample');
run('sample2');
run('puzzle');
