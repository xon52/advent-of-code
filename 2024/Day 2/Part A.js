import { getFileData } from '../../helpers/index.js';

/*
The unusual data (your puzzle input) consists of many reports, one report per line. Each report is a list of numbers called levels that are separated by spaces.
A report only counts as safe if both of the following are true:
- The levels are either all increasing or all decreasing.
- Any two adjacent levels differ by at least one and at most three.
*/

const checkLevel = (level) => {
	let isIncreasing;
	for (let i = 1; i < level.length; i++) {
		// Check if the levels are increasing or decreasing
		if (i === 1) {
			isIncreasing = level[i] > level[i - 1];
		} else if (level[i] > level[i - 1] !== isIncreasing) {
			return false;
		}
		// Check if the numbers are the same
		if (level[i] === level[i - 1]) {
			return false;
		}
		// Check if the difference between levels is between 1 and 3
		if (Math.abs(level[i] - level[i - 1]) > 3) {
			return false;
		}
	}
	return true;
};

const run = (puzzle) => {
	const data = getFileData(import.meta, puzzle);

	const levels = data.map((line) => line.split(' ').map(Number));

	let safes = [];
	let safeCount = 0;
	// Loop through each level
	levels.forEach((level, j) => {
		if (checkLevel(level)) {
			safes.push(`Level ${j} safe`);
			safeCount += 1;
		} else {
			safes.push(`Level ${j} unsafe`);
		}
	});

	// console.log(safes);
	console.log(safeCount);
};

run('sample');
run('puzzle');
