import { getFileData } from '../../helpers/index.js';

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

// Find all galaxies
const galaxies = [];
for (let r = 0; r < map.length; r++)
	for (let c = 0; c < map[0].length; c++) if (map[r][c] === '#') galaxies.push([r, c]);

// Find distances
const distances = [];
const expansion = 1000000;
galaxies.forEach(([r1, c1], i1) => {
	galaxies.forEach(([r2, c2], i2) => {
		if (i1 === i2) return;
		// Get distances
		let dist = 0;
		for (let c = Math.min(c1, c2); c < Math.max(c1, c2); c++) {
			if (blankColumns.includes(c)) dist += expansion;
			else dist++;
		}
		for (let r = Math.min(r1, r2); r < Math.max(r1, r2); r++) {
			if (blankRows.includes(r)) dist += expansion;
			else dist++;
		}
		distances.push(dist / 2);
	});
});
const result = distances.reduce((p, c) => p + c, 0);
console.log(`\n-----------------`);
console.log(target, result);
