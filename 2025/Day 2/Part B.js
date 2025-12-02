import { getFileData } from '../../helpers/index.js';

// 11-22 still has two invalid IDs, 11 and 22.
// 95-115 now has two invalid IDs, 99 and 111.
// 998-1012 now has two invalid IDs, 999 and 1010.
// 1188511880-1188511890 still has one invalid ID, 1188511885.
// 222220-222224 still has one invalid ID, 222222.
// 1698522-1698528 still contains no invalid IDs.
// 446443-446449 still has one invalid ID, 446446.
// 38593856-38593862 still has one invalid ID, 38593859.
// 565653-565659 now has one invalid ID, 565656.
// 824824821-824824827 now has one invalid ID, 824824824.
// 2121212118-2121212124 now has one invalid ID, 2121212121.
// Adding up all the invalid IDs in this example produces 4174379265.

const run = (puzzle) => {
	const data = getFileData(import.meta, puzzle);
	const ranges = data[0].split(',').map((r) => r.split('-').map(Number));

	const isInvalid = (s) => {
		if (s.startsWith('0')) return true;
		if (s.length === 1) return false;
		for (let i = 0; i < s.length / 2; i++) {
			const pattern = s.slice(0, i + 1);
			if (s.length % pattern.length !== 0) continue;
			const repeatedPattern = pattern.repeat(s.length / pattern.length);
			if (repeatedPattern === s) return true;
		}
		return false;
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
