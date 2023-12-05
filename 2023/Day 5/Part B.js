import { getFileData } from '../../helpers/index.js';

const data = getFileData(import.meta, 'puzzle');
const data2 = data.join('|').split('||');

// Define seeds
const seeds = data2[0]
	.split(': ')[1]
	.split(' ')
	.map((e) => +e);

// Define maps
const maps = [];
for (let i = 1; i < data2.length; i++)
	maps.push(
		data2[i]
			.split(':|')[1]
			.split('|')
			.map((e) => e.split(' ').map((f) => +f))
	);

// Get location from seed
const getLocation = (seed) => {
	for (let m = 0; m < maps.length; m++) {
		const map = maps[m];
		for (let r = 0; r < map.length; r++) {
			const [dest, source, range] = map[r];
			if (seed >= source && seed < source + range) {
				seed = dest + seed - source;
				break;
			}
		}
	}
	return seed;
};

console.log(getLocation(2250051846));

// Get approx
let min = Infinity;
let minSeed = undefined;
let delta = 10000;
for (let s = 0; s <= seeds.length / 2; s += 2) {
	const start = seeds[s];
	const end = seeds[s] + seeds[s + 1];
	console.log('Pair', s / 2 + 1, seeds[s], seeds[s + 1]);
	for (let seed = start; seed <= end; seed += delta) {
		if (getLocation(seed) < min) {
			min = getLocation(seed);
			minSeed = seed;
			console.log('New min', min, seed);
		}
	}
}

// Get exact
const start = minSeed - delta;
const end = minSeed + delta;
for (let seed = start; seed <= end; seed++) {
	if (getLocation(seed) < min) {
		min = getLocation(seed);
		console.log('New min', min);
	}
}
