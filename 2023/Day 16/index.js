import { getFileData } from '../../helpers/index.js';
import { create2DArray } from '../../helpers/utils.js';

// Setup
const target = 'puzzle';
const data = getFileData(import.meta, target);
const map = data.map((e) => e.split(''));
let energized = create2DArray(map.length, map[0].length, '.');
const getEnergizedMap = () => energized.map((e) => e.map((f) => (f === '.' ? '.' : '#')).join('')).join('\n');
const resetEnergized = () => (energized = create2DArray(map.length, map[0].length, '.'));

// Fire Beam
const fireBeam = (x, y, direction) => {
	if (x < 0 || y < 0 || x >= map.length || y >= map[0].length) return;
	if (energized[x][y].includes(direction)) return;
	energized[x][y] += direction;
	// Up
	if (direction === 'up') {
		if (map[x][y] === '/') fireBeam(x, y + 1, 'right');
		else if (map[x][y] === '\\') fireBeam(x, y - 1, 'left');
		else if (map[x][y] === '-') {
			fireBeam(x, y - 1, 'left');
			fireBeam(x, y + 1, 'right');
		} else fireBeam(x - 1, y, 'up');
	}
	// Down
	else if (direction === 'down') {
		if (map[x][y] === '/') fireBeam(x, y - 1, 'left');
		else if (map[x][y] === '\\') fireBeam(x, y + 1, 'right');
		else if (map[x][y] === '-') {
			fireBeam(x, y - 1, 'left');
			fireBeam(x, y + 1, 'right');
		} else fireBeam(x + 1, y, 'down');
	}
	// Left
	else if (direction === 'left') {
		if (map[x][y] === '/') fireBeam(x + 1, y, 'down');
		else if (map[x][y] === '\\') fireBeam(x - 1, y, 'up');
		else if (map[x][y] === '|') {
			fireBeam(x - 1, y, 'up');
			fireBeam(x + 1, y, 'down');
		} else fireBeam(x, y - 1, 'left');
	}
	// Right
	else if (direction === 'right') {
		if (map[x][y] === '/') fireBeam(x - 1, y, 'up');
		else if (map[x][y] === '\\') fireBeam(x + 1, y, 'down');
		else if (map[x][y] === '|') {
			fireBeam(x - 1, y, 'up');
			fireBeam(x + 1, y, 'down');
		} else fireBeam(x, y + 1, 'right');
	} else throw new Error('Invalid direction');
};

// ===========================================================
// PART 1
// ===========================================================
fireBeam(0, 0, 'right');
const answer1 = [...getEnergizedMap().matchAll(/#/g)].length;
console.log('Part 1:', answer1);

// ===========================================================
// PART 2
// ===========================================================
let max = 0;
const findMax = (x, y, d) => {
	resetEnergized();
	fireBeam(x, y, d);
	const energizedCount = [...getEnergizedMap().matchAll(/#/g)].length;
	if (energizedCount > max) max = energizedCount;
};
for (let i = 0; i < energized.length; i++) findMax(0, i, 'down');
for (let i = 0; i < energized.length; i++) findMax(energized.length - 1, i, 'up');
for (let i = 0; i < energized.length; i++) findMax(i, 0, 'right');
for (let i = 0; i < energized.length; i++) findMax(i, energized[0].length - 1, 'left');

console.log('Part 2:', max);
