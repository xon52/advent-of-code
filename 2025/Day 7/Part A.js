import { getFileData } from '../../helpers/index.js';

const run = (puzzle) => {
	const startTime = performance.now();

	const data = getFileData(import.meta, puzzle);
	const grid = data.map((row) => row.split(''));
	let splitCount = 0;

	const addBeam = (row, col) => {
		if (row < 0 || row >= grid.length || col < 0 || col >= grid[row].length) return;
		else grid[row][col] = '|';
	}

	grid.forEach((row, r) => {
		row.forEach((col, c) => {
			if (col === 'S') {
				addBeam(r + 1, c);
				return;
			}
			if (r === 0) return;
			if (col === '^' && grid[r - 1][c] === '|') {
				splitCount++;
				addBeam(r, c - 1);
				addBeam(r, c + 1);
				addBeam(r + 1, c - 1);
				addBeam(r + 1, c + 1);
				return;
			}
			if (col === '.' && grid[r - 1][c] === '|') {
				addBeam(r, c);
				return;
			}
		});
	});

	const endTime = performance.now();
	const elapsedTime = (endTime - startTime).toFixed(3);

	// console.log(grid.map((row) => row.join('')).join('\n'));

	console.log(puzzle, splitCount, `(${elapsedTime}ms)`);
};

run('sample');
run('puzzle');
