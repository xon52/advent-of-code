import { getFileData } from '../../helpers/index.js';

/*
A circular safe dial numbered 0–99 starts at 50 and is rotated according to a list of left/right instructions, wrapping around as needed; instead of opening the decoy safe, the real goal is to count how many times any rotation points at 0.
*/

const run = (puzzle) => {
	const data = getFileData(import.meta, puzzle);
	const max = 99;
	let pos = 50;
	let count = 0;

	data.forEach((line) => {
		const dir = line[0] === 'L' ? -1 : 1;
		const steps = +line.slice(1);
		const prevPos = pos;

		count += Math.floor(steps / (max + 1));
		pos += dir * (steps % (max + 1));

		// Normalize position and count 0 crossings
		if (pos < 0) {
			if (prevPos > 0) count++;
			pos = max + pos + 1;
		} else if (pos > max) {
			count++;
			pos = pos - max - 1;
		} else if (pos === 0) {
			count++;
		}
	});

	console.log(puzzle, count);
};

// run('sample');
run('puzzle');
