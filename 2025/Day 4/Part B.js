import { getFileData } from '../../helpers/index.js';

const run = (puzzle) => {
	const data = getFileData(import.meta, puzzle);
	const grid = data.map((line) => line.split(''));

	const MIN_NEIGHBORS = 4;
	const directions = [
		[-1, -1], [-1, 0], [-1, 1],
		[0, -1], [0, 1],
		[1, -1], [1, 0], [1, 1],
	];

	const isValidPosition = (row, col) => {
		return row >= 0 && row < grid.length &&
			col >= 0 && col < grid[row].length;
	};

	const countNeighbors = (row, col) => {
		let count = 0;
		for (const [dx, dy] of directions) {
			const newRow = row + dy;
			const newCol = col + dx;
			if (!isValidPosition(newRow, newCol)) {
				continue;
			}
			const cell = grid[newRow][newCol];
			if (cell === '@' || cell === 'x') {
				count++;
			}
		}
		return count;
	};

	let sum = 0;
	let removed = 1;

	while (removed > 0) {
		removed = 0;
		for (let row = 0; row < grid.length; row++) {
			for (let col = 0; col < grid[row].length; col++) {
				if (grid[row][col] === '.') {
					continue;
				}
				if (countNeighbors(row, col) < MIN_NEIGHBORS) {
					grid[row][col] = '.';
					sum++;
					removed++;
				}
			}
		}
	}

	console.log(grid.map((row) => row.join('')).join('\n'));

	console.log(puzzle, sum);
};

// run('sample');
run('puzzle');
