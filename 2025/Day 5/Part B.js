import { getFileData } from '../../helpers/index.js';

const run = (puzzle) => {
	const data = getFileData(import.meta, puzzle);
	const freshRanges = data.slice(0, data.indexOf('')).map((line) => line.split('-').map(Number));
	const sortedRanges = freshRanges.sort((a, b) => a[0] - b[0]);
	const combinedRanges = [sortedRanges[0]];

	for (let i = 1; i < sortedRanges.length; i++) {
		const currentRange = sortedRanges[i];
		const lastRange = combinedRanges[combinedRanges.length - 1];

		// If the current range is completely contained within the last range, skip it
		if (currentRange[0] >= lastRange[0] && currentRange[1] <= lastRange[1]) {
			continue;
		}

		// If the current range overlaps with the last range, combine them
		if (currentRange[0] <= lastRange[1] + 1) {
			lastRange[1] = Math.max(lastRange[1], currentRange[1]);
		} else {
			combinedRanges.push(currentRange);
		}
	}

	const sum = combinedRanges.reduce((acc, range) => acc + (range[1] - range[0] + 1), 0);

	console.log(puzzle, sum);
};

run('sample');
run('puzzle');
