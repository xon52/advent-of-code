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
		if (!visited.has(`${x},${y},${direction}`) || visited.get(`${x},${y},${direction}`) > totalCost) {
			visited.set(`${x},${y},${direction}`, totalCost);
			queue.push({ pos: { x, y }, direction, path: [...path, move] });
		}
	}
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
	let bestPath = null;

	while (queue.length > 0) {
		const { pos, direction, path } = queue.shift();
		move(pos.x, pos.y, direction, grid, visited, queue, path);
		if (pos.x === endPos.x && pos.y === endPos.y) {
			const currentCost = getPathCost(path);
			if (currentCost < minCost) {
				minCost = currentCost;
				bestPath = path;
			}
		}
	}
	console.log(minCost);
};

run('sample');
run('puzzle');
