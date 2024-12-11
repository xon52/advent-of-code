import { getFileData } from '../../helpers/index.js';

const directions = [
	[0, -1], // Up
	[1, 0], // Right
	[0, 1], // Down
	[-1, 0], // Left
];

const findStartingPosition = (grid) =>
	grid.reduce((acc, row, y) => {
		const x = row.indexOf('^');
		if (x > -1) {
			acc = { x, y };
		}
		return acc;
	}, {});

const getNextPosition = (x, y, direction) => {
	if (direction === 0) return { x, y: y - 1 };
	if (direction === 1) return { x: x + 1, y };
	if (direction === 2) return { x, y: y + 1 };
	if (direction === 3) return { x: x - 1, y };
};

function getValueAtPosition(grid, x, y) {
	if (y < 0 || y >= grid.length || x < 0 || x >= grid[0].length) {
		return undefined;
	} else {
		return grid[y][x];
	}
}

const rotate90Right = (direction) => {
	return (direction + 1) % 4;
};

const placeObstruction = (grid, x, y) => {
	const gridCopy = JSON.parse(JSON.stringify(grid));
	gridCopy[y][x] = 'O';
	return gridCopy;
};

const isLoop = (grid) => {
	let { x, y } = findStartingPosition(grid);
	let prevX = x;
	let prevY = y;
	let direction = 0;
	let value = '^';

	const visitedPositions = new Set();

	while (value !== undefined) {
		const positionAndDirection = `${y},${x},${direction}`;

		if (visitedPositions.has(positionAndDirection)) {
			return true;
		}

		visitedPositions.add(positionAndDirection);

		const nextPosition = getNextPosition(x, y, direction);
		prevX = x;
		prevY = y;
		x = nextPosition.x;
		y = nextPosition.y;
		value = getValueAtPosition(grid, x, y);

		if (value === '#' || value === 'O') {
			direction = rotate90Right(direction);
			x = prevX;
			y = prevY;
		}
	}

	return false;
};

const run = (puzzle) => {
	const data = getFileData(import.meta, puzzle);
	const grid = data.map((row) => row.split(''));

	let result = 0;

	for (let y = 0; y < grid.length; y++) {
		for (let x = 0; x < grid[0].length; x++) {
			if (grid[y][x] === '.' && isLoop(placeObstruction(grid, x, y))) {
				result++;
			}
			console.log(Math.floor((y / grid.length) * 100), '%');
		}
	}

	console.log(puzzle, result);
};

run('sample');
run('puzzle');
