import { getFileData } from '../../helpers/index.js';

/*
A circular safe dial numbered 0–99 starts at 50 and is rotated according to a list of left/right instructions, wrapping around as needed; instead of opening the decoy safe, the real goal is to count how many times any rotation leaves the dial pointing exactly at 0.
*/

const run = (puzzle) => {
	const data = getFileData(import.meta, puzzle);
	let start = 50;
	const max = 99;

	let count = 0;
	data.forEach((line) => {
		const direction = line.slice(0, 1);
		const steps = +line.slice(1);
		if (direction === 'L') {
			start -= steps;
		} else {
			start += steps;
		}
		start = ((start % (max + 1)) + (max + 1)) % (max + 1);
		if (start === 0) {
			count++;
		}
		// console.log(start);
	});

	console.log(puzzle, count);
};


run('sample');
run('puzzle');
