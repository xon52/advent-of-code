import { getFileData } from '../../helpers/index.js';
import { create2DArray } from '../../helpers/utils.js';

// Setup
const target = 'puzzle';
const data = getFileData(import.meta, target);
const steps = data.map((e) => e.replace(/[\(\)]/g, '').split(' '));

// Create Grid
const getMaxDir = (dir) => {
	let max = 0;
	steps.forEach((e) => {
		if (e[0] === dir) max += parseInt(e[1]);
	});
	return max;
};
const maxUp = getMaxDir('U');
const maxDown = getMaxDir('D');
const maxLeft = getMaxDir('L');
const maxRight = getMaxDir('R');
const FILL = ' ';
const COLORREGEX = /#[0-9a-f]{6}/g;
const map = create2DArray(maxUp + maxDown + 1, maxLeft + maxRight + 1, FILL);
const showMap = () => console.log(map.map((e) => e.join('')).join('\n'));

// Travel Map
let pos = [maxDown, maxLeft];
steps.forEach((e) => {
	const dir = e[0];
	const len = parseInt(e[1]);
	for (let i = 0; i < len; i++) {
		if (dir === 'U') pos[0] -= 1;
		if (dir === 'D') pos[0] += 1;
		if (dir === 'L') pos[1] -= 1;
		if (dir === 'R') pos[1] += 1;
		map[pos[0]][pos[1]] = '#';
	}
});

// Fill Map
pos = [maxDown, maxLeft];
const FILL2 = '#';
steps.forEach((e) => {
	const dir = e[0];
	const len = parseInt(e[1]);
	for (let i = 0; i < len; i++) {
		if (dir === 'U') {
			pos[0] -= 1;
			for (let j = pos[1] + 1; j < map.length; j++) {
				if (map[pos[0]][j].match('#')) break;
				else if (map[pos[0]]) map[pos[0]][j] = FILL2;
			}
		}
		if (dir === 'D') {
			pos[0] += 1;
			for (let j = pos[1] - 1; j > -1; j--) {
				if (map[pos[0]][j].match('#')) break;
				else if (map[pos[0]]) map[pos[0]][j] = FILL2;
			}
		}
		if (dir === 'L') {
			pos[1] -= 1;
			for (let j = pos[0] - 1; j < map.length; j--) {
				if (map[j][pos[1]].match('#')) break;
				else if (map[j]) map[j][pos[1]] = FILL2;
			}
		}
		if (dir === 'R') {
			pos[1] += 1;
			for (let j = pos[0] + 1; j < map.length; j++) {
				if (map[j][pos[1]].match('#')) break;
				else if (map[j]) map[j][pos[1]] = FILL2;
			}
		}
	}
});

showMap();

// console.log(map);

// ===========================================================
// PART 1
// ===========================================================
const answer1 = [...map.flat(2).filter((e) => e.includes('#'))].length;
console.log('Part 1:', answer1);

// ===========================================================
// PART 2
// ===========================================================
// let max = 0;
// const findMax = (x, y, d) => {
// 	resetEnergized();
// 	fireBeam(x, y, d);
// 	const energizedCount = [...getEnergizedMap().matchAll(/#/g)].length;
// 	if (energizedCount > max) max = energizedCount;
// };
// for (let i = 0; i < energized.length; i++) findMax(0, i, 'down');
// for (let i = 0; i < energized.length; i++) findMax(energized.length - 1, i, 'up');
// for (let i = 0; i < energized.length; i++) findMax(i, 0, 'right');
// for (let i = 0; i < energized.length; i++) findMax(i, energized[0].length - 1, 'left');

// console.log('Part 2:', max);
