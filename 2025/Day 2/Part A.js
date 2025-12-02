import { getFileData } from '../../helpers/index.js';

// 11-22 has two invalid IDs, 11 and 22.
// 95-115 has one invalid ID, 99.
// 998-1012 has one invalid ID, 1010.
// 1188511880-1188511890 has one invalid ID, 1188511885.
// 222220-222224 has one invalid ID, 222222.
// 1698522-1698528 contains no invalid IDs.
// 446443-446449 has one invalid ID, 446446.
// 38593856-38593862 has one invalid ID, 38593859.
// The rest of the ranges contain no invalid IDs.
// Adding up all the invalid IDs in this example produces 1227775554.

const run = (puzzle) => {
	const data = getFileData(import.meta, puzzle);
	const ranges = data[0].split(',').map((r) => r.split('-').map(Number));

	const isInvalid = (s) => {
		if (s.startsWith('0')) return true;
		if (s.length % 2 === 1) return false;
		const half = s.length / 2;
		return Number(s.slice(0, half)) === Number(s.slice(half));
	};

	let sum = 0;
	for (const [start, end] of ranges) {
		for (let id = start; id <= end; id++) {
			if (isInvalid(id.toString())) {
				sum += id;
			}
		}
	}

	console.log(puzzle, sum);
};

run('sample');
run('puzzle');
