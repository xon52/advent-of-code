import { getFileData } from '../../helpers/index.js';

const run = (puzzle) => {
	const startTime = performance.now();

	const data = getFileData(import.meta, puzzle);
	const grid = data.map((row) => row.split(''));

	// Memoization: cache the number of timelines from each position
	const memo = new Map();

	const countTimelines = (row, col) => {

		// Check memoization cache
		const key = `${row},${col}`;
		if (memo.has(key)) {
			return memo.get(key);
		}

		let result = 0;

		// Move down automatically through '.' cells until we hit a splitter or reach the bottom
		let currentRow = row;
		let currentCol = col;

		while (currentRow < grid.length) {
			const currentCell = grid[currentRow][currentCol];

			// If we hit a splitter, split to left and right (same row)
			if (currentCell === '^') {
				// Split: count timelines from both left and right paths
				const leftTimelines = countTimelines(currentRow, currentCol - 1);
				const rightTimelines = countTimelines(currentRow, currentCol + 1);
				result = leftTimelines + rightTimelines;
				break;
			}

			// If we reached the bottom row, this is one timeline
			if (currentRow === grid.length - 1) {
				result = 1;
				break;
			}

			// Move down to next row (particle always moves down through '.' cells)
			currentRow++;
		}

		// Cache the result
		memo.set(key, result);
		return result;
	};

	const startCol = grid[0].indexOf('S');
	let totalTimelines = countTimelines(0, startCol);

	const endTime = performance.now();
	const elapsedTime = (endTime - startTime).toFixed(3);
	console.log(puzzle, totalTimelines, `(${elapsedTime}ms)`);
};

run('sample');
run('puzzle');
