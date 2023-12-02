import { getFileData } from '../../helpers/index.js';

const run = (puzzle) => {
	const data = getFileData(import.meta, puzzle);
	const numbers = data.map((e) => e.replace(/[^0-9]/g, ''));
	const combined = numbers.map((arr) => `${arr[0]}${arr[arr.length - 1]}`);
	const result = combined.reduce((prev, curr) => +prev + +curr);
	console.log(puzzle, result);
};

run('sample');
run('puzzle');
