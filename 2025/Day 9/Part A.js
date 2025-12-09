import { getFileData } from '../../helpers/index.js';

const run = (puzzle) => {
	const startTime = performance.now();

	const data = getFileData(import.meta, puzzle);
	const tiles = data.map((row) => row.split(',').map(Number));

	let largestArea = 0;

	tiles.forEach(([x1, y1]) => {
		tiles.forEach(([x2, y2]) => {
			const area = Math.abs((x1 - x2 + 1) * (y1 - y2 + 1));
			if (area > largestArea) {
				largestArea = area;
			}
		});
	});

	const endTime = performance.now();
	const elapsedTime = (endTime - startTime).toFixed(3);

	console.log(puzzle, largestArea, `(${elapsedTime}ms)`);
};

run('sample');
run('puzzle');
