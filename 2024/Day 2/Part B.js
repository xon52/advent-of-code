import { getFileData } from '../../helpers/index.js';

/*
The Problem Dampener is a reactor-mounted module that lets the reactor safety systems tolerate a single bad level in what would otherwise be a safe report.
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

const problemDampen = (level) => {
	for (let i = 0; i < level.length; i++) {
		const newLevel = [...level.slice(0, i), ...level.slice(i + 1)];
		// console.log('Level:', level, 'newLevel:', newLevel);
		if (checkLevel(newLevel)) {
			return true;
		}
	}
	return false;
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
			if (problemDampen(level)) {
				safes.push(`Level ${j} safe with dampen`);
				safeCount += 1;
			} else {
				safes.push(`Level ${j} unsafe`);
			}
		}
	});

	// console.log(safes);
	console.log(safeCount);
};

run('sample');
run('puzzle');
