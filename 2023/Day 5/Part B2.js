import { Worker, isMainThread, parentPort, workerData } from 'node:worker_threads';

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

if (isMainThread) {
	// Get approx
	let min = Infinity;
	for (let s = 0; s <= seeds.length / 2; s += 2) {
		const start = seeds[s];
		const end = seeds[s] + seeds[s + 1];

		const worker = new Worker(`./2023/Day 5/Part B2.js`, { workerData: [start, end] });
		worker.on('message', (_min) => {
			if (_min < min) {
				min = _min;
				console.log('New min', min);
			}
		});
		worker.on('error', (err) => console.error(err));
		worker.on('exit', (code) => console.log(`Worker exited with code ${code}.`));
	}
} else {
	const [start, end] = workerData;
	for (let seed = start; seed <= end; seed++) {
		let min = Infinity;
		if (getLocation(seed) < min) {
			min = getLocation(seed);
			parentPort.postMessage(min);
		}
	}
}
