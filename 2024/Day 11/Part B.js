import { getFileData } from '../../helpers/index.js';

const blink = (n, depth, targetDepth, cache) => {
	const key = `${n}.${depth}`;
	const cached = cache.get(key);
	if (cached !== undefined) return cached;

	let result = 0;
	const nextDepth = depth + 1;
	if (depth == targetDepth) {
		result = 1;
	} else if (n == 0) {
		result = blink(1, nextDepth, targetDepth, cache);
	} else {
		const str = n.toString();
		if (str.length % 2 == 0) {
			const half = str.length / 2;
			result =
				blink(parseInt(str.substring(0, half)), nextDepth, targetDepth, cache) +
				blink(parseInt(str.substring(half, str.length)), nextDepth, targetDepth, cache);
		} else {
			result = blink(n * 2024, nextDepth, targetDepth, cache);
		}
	}
	cache.set(key, result);
	console.log(key, result);
	return result;
};

const run = (puzzle) => {
	const data = getFileData(import.meta, puzzle);
	let stones = data[0].split(' ').map(Number);

	let count = 0;
	const cache = new Map();

	for (const stone of stones) count += blink(stone, 0, 25, cache);
	console.log(puzzle, count);
};

run('sample');
// run('puzzle');
