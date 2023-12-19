import { getFileData } from '../../helpers/index.js';
import { create2DArray } from '../../helpers/utils.js';

// Setup
const target = 'puzzle';
const data = getFileData(import.meta, target);
const steps = data.map((e) => e.replace(/[\(\)]/g, '').split(' '));

const BLANK_FILL = ' ';
const WALL_FILL = '#';
const INNER_FILL = 'O';

// Find Maxes
let maxUp = 0;
let maxDown = 0;
let maxLeft = 0;
let maxRight = 0;
let pos = [maxDown, maxLeft];
steps.forEach((e) => {
	const dir = e[0];
	const len = parseInt(e[1]);
	if (dir === 'U') pos[0] -= len;
	if (dir === 'D') pos[0] += len;
	if (dir === 'L') pos[1] -= len;
	if (dir === 'R') pos[1] += len;
	if (pos[0] < maxUp) maxUp = pos[0];
	if (pos[0] > maxDown) maxDown = pos[0];
	if (pos[1] < maxLeft) maxLeft = pos[1];
	if (pos[1] > maxRight) maxRight = pos[1];
});
let shiftUp = Math.min(0, maxUp, maxDown) > 0 ? 0 : Math.abs(Math.min(0, maxUp, maxDown));
let shiftLeft = Math.min(0, maxLeft, maxRight) > 0 ? 0 : Math.abs(Math.min(0, maxLeft, maxRight));
let start = [shiftUp, shiftLeft];
// Create Grid
const map = create2DArray(maxDown - maxUp + 1, maxRight - maxLeft + 1, BLANK_FILL);
const showMap = () => console.log(map.map((e) => e.join('')).join('\n'));
const wall = [];

// Travel Map
pos = [start[0], start[1]];
steps.forEach((e) => {
	const dir = e[0];
	const len = parseInt(e[1]);
	for (let i = 0; i < len; i++) {
		if (dir === 'U') pos[0] -= 1;
		if (dir === 'D') pos[0] += 1;
		if (dir === 'L') pos[1] -= 1;
		if (dir === 'R') pos[1] += 1;
		map[pos[0]][pos[1]] = WALL_FILL;
		wall.push([pos[0], pos[1], dir]);
	}
});

const fillFromDirection = (x, y, d) => {
	const dx = d === 'L' ? -1 : d === 'R' ? 1 : 0;
	const dy = d === 'D' ? -1 : d === 'U' ? 1 : 0;
	let cx = x + dx;
	let cy = y + dy;
	while (true) {
		if (map[cx] === undefined || map[cx][cy] === undefined) break;
		if (map[cx][cy] === WALL_FILL) break;
		map[cx][cy] = INNER_FILL;
		cx += dx;
		cy += dy;
	}
};

const fillMissedCells = () => {
	for (let i = 0; i < map.length; i++) {
		for (let j = 0; j < map[i].length; j++) {
			if (map[i][j] === INNER_FILL && map[i][j + 1] === BLANK_FILL) map[i][j + 1] = INNER_FILL;
		}
	}
};

// Fill Map
wall.forEach(([r, c, d]) => {
	fillFromDirection(r, c, d);
});
fillMissedCells();

showMap();

const wallCount = [...map.flat(2).filter((e) => e.includes(WALL_FILL))].length;
const fillCount = [...map.flat(2).filter((e) => e.includes(INNER_FILL))].length;
console.log('Part 1:', wallCount + fillCount);
