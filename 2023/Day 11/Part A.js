import { Worker, isMainThread, parentPort, workerData } from 'node:worker_threads';
import { getFileData, getFilePath } from '../../helpers/index.js';

const target = 'puzzle';
const data = getFileData(import.meta, target);
const map = data.map((e) => e.split(''));

// View input
console.log('Input:\n', map.map((e) => e.join('')).join(`\n`));

// Find blank rows
const blankRows = [];
for (let r = 0; r < map.length; r++) {
	if (!data[r].includes('#')) blankRows.push(r);
}
// Find blank columns
const blankColumns = [];
blankColumnFor: for (let c = 0; c < map[0].length; c++) {
	for (let r = 0; r < map.length; r++) {
		if (map[r][c] === '#') continue blankColumnFor;
	}
	blankColumns.push(c);
}
// Add rows
const blankRowInsert = new Array(map[0].length).fill('.');
blankRows.reverse();
blankRows.forEach((r) => map.splice(r, 0, blankRowInsert.slice(0)));
// Add columns
blankColumns.reverse();
blankColumns.forEach((c) => {
	for (let r = 0; r < map.length; r++) {
		map[r].splice(c, 0, '.');
	}
	blankColumns.push(c);
});

// View
console.log('\nExpanded:\n', map.map((e) => e.join('')).join(`\n`));

// Find all galaxies
const galaxies = [];
for (let r = 0; r < map.length; r++)
	for (let c = 0; c < map[0].length; c++) if (map[r][c] === '#') galaxies.push([r, c]);
console.log('Galaxies:\n', galaxies.join(' | '));

// Find distances
const distances = [];
galaxies.forEach(([r1, c1], i1) => {
	galaxies.forEach(([r2, c2], i2) => {
		if (i1 === i2) return;
		// Get distances
		const dist = (Math.abs(r2 - r1) + Math.abs(c2 - c1)) / 2;
		distances.push(dist);
	});
});

const result = distances.reduce((p, c) => p + c, 0);
console.log(`\n-----------------`);
console.log(target, result);
