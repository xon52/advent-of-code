import { getFileData } from '../../helpers/index.js';

const dataSplitter = (str) =>
	str
		.split(':|')[1]
		.split('|')
		.map((e) => e.split(' ').map((f) => +f));

const convert = (seed, ranges) => {
	// Default is 1:1
	let result = seed;
	// If found in special ranges set result
	for (let r = 0; r < ranges.length; r++) {
		const [dest, source, range] = ranges[r];
		if (seed >= source && seed <= source + range) return dest + seed - source;
	}
	return result;
};

const run = (puzzle) => {
	const data = getFileData(import.meta, puzzle);
	const data2 = data.join('|').split('||');
	// Define seeds
	const seeds = data2[0]
		.split(': ')[1]
		.split(' ')
		.map((e) => +e);

	const seeds2 = [];
	for (let s = 0; s <= seeds.length / 2; s += 2) {
		for (let i = seeds[s]; i <= seeds[s] + seeds[s+1]; i++) {
			seeds2.push(i);
		}
	}

	// Define stages
	const stages = [];
	for (let i = 1; i < data2.length; i++) stages.push(dataSplitter(data2[i]));

	// Work through seeds
	const results = seeds2.map((seed) => {
		for (let s = 0; s < stages.length; s++) {
			seed = convert(seed, stages[s]);
		}
		return seed;
	});

	// Get minimum result
	const result = results.reduce((p, c) => (c < p ? c : p));
	console.log(puzzle, result);
};

run('sample');
run('puzzle');
