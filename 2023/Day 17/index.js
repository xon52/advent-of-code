import { getFileData } from '../../helpers/index.js';
import { create2DArray } from '../../helpers/utils.js';

// Setup
const target = 'sample';
const data = getFileData(import.meta, target);
const map = data.map((e) => e.split('').map((f) => +f));
let visited = create2DArray(map.length, map[0].length, 0);
const getVisited = () => visited.map((e) => e.map((f) => (f === 0 ? ' . ' : f)).join(' ')).join('\n');
visited[0][0] = 0;
// const resetVisited = () => visited = create2DArray(map.length, map[0].length, '.');
let visitedCount = 0;

const travelDirs = (x, y, dir, dirCount) => {
	['up', 'down', 'left', 'right'].forEach((d) => {
		const dx = d === 'up' ? -1 : d === 'down' ? 1 : 0;
		const dy = d === 'left' ? -1 : d === 'right' ? 1 : 0;
		if (
			visited[x + dx] === undefined ||
			visited[x + dx][y + dy] === undefined
		)
			return;
		travel(x, y, x + dx, y + dy, d, dir === d ? dirCount + 1 : 0);
	});
};

// Fire Beam
const travel = (a, b, x, y, dir, dirCount) => {
	if (dirCount > 1) return;
	if (visitedCount > 10) return;
	if (x < 0 || y < 0 || x >= map.length || y >= map[0].length) return;
	const dist = visited[a][b] + map[x][y];
	if (visited[x][y] === 0 || dist < visited[x][y]) visited[x][y] = dist;
	if (x === map.length - 1 && y === map[0].length - 1) return visitedCount++;
	travelDirs(x, y, dir, dirCount);
};

// ===========================================================
// PART 1
// ===========================================================
travel(0, 0, 0, 1, 'right', 0);
travel(0, 0, 1, 0, 'down', 0);
console.log(getVisited());
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
