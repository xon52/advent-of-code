import { getFileData } from '../../helpers/index.js';
import { create2DArray } from '../../helpers/utils.js';

// Setup
const target = 'sample';
const data = getFileData(import.meta, target);
const map = data.map((e) => e.split(''));
let visited = create2DArray(map.length, map[0].length, Infinity);
const getVisited = () => visited.map((e) => e.map((f) => (f === '.' ? '.' : '#')).join('')).join('\n');
// const resetVisited = () => visited = create2DArray(map.length, map[0].length, '.');

// Fire Beam
const travel = (a, b, x, y) => {
	if (x < 0 || y < 0 || x >= map.length || y >= map[0].length) return;
	const dist = visited[a][b] + map[x][y];
	if (dist < visited[x][y]) visited[x][y] = dist;
	travel(x, y, x + 1, y);
	travel(x, y, x, y + 1);
	travel(x, y, x - 1, y);
	travel(x, y, x + 1, y - 1);
};

// ===========================================================
// PART 1
// ===========================================================
travel(0, 0, 0, 1);
travel(0, 0, 1, 0);
console.log(visited)
// const answer1 = [...getEnergizedMap().matchAll(/#/g)].length;
// console.log('Part 1:', answer1);˜

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
