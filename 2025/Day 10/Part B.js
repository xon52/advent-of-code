import { getFileData } from '../../helpers/index.js';

const run = (puzzle) => {
	const startTime = performance.now();

	const data = getFileData(import.meta, puzzle);


	const endTime = performance.now();
	const elapsedTime = (endTime - startTime).toFixed(3);

	console.log(puzzle, totalPresses, `(${elapsedTime}ms)`);
};

run('sample');
run('puzzle');
