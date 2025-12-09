import { getFileData } from '../../helpers/index.js';

/*
p = position
v = velocity

p=0,4 v=3,-3
p=6,3 v=-1,-3
p=10,3 v=-1,2
p=2,0 v=2,-1
p=0,0 v=1,3
p=3,0 v=-2,-2
p=7,6 v=-1,-3
p=3,0 v=-1,-2
p=9,3 v=2,3
p=7,3 v=-1,2
p=2,4 v=2,-3
p=9,5 v=-3,-3
*/

const display = (points, maxX, maxY, step) => {
	const grid = Array.from({ length: maxY }, () => Array(maxX).fill('.'));
	for (let i = 0; i < points.length; i++) {
		const point = points[i];
		if (grid[point.y][point.x] !== '.') return;
		else grid[point.y][point.x] = '#';
	}
	console.log(`Step ${step + 1}:`);
	console.log(grid.map((row) => row.join('')).join('\n'));
	console.log('\n');
};

const step = (points, maxX, maxY) => {
	return points.map((point) => {
		return {
			x:
				point.x + point.vx < 0
					? point.x + point.vx + maxX
					: point.x + point.vx >= maxX
					? point.x + point.vx - maxX
					: point.x + point.vx,
			y:
				point.y + point.vy < 0
					? point.y + point.vy + maxY
					: point.y + point.vy >= maxY
					? point.y + point.vy - maxY
					: point.y + point.vy,
			vx: point.vx,
			vy: point.vy,
		};
	});
};

const run = (puzzle, maxX, maxY, steps) => {
	const data = getFileData(import.meta, puzzle);
	let points = data.map((line) => {
		const [p, v] = line.split(' v=');
		const [x, y] = p.split('=')[1].split(',').map(Number);
		const [vx, vy] = v.split(',').map(Number);
		return { x, y, vx, vy };
	});

	for (let i = 0; i < steps; i++) {
		points = step(points, maxX, maxY);
		display(points, maxX, maxY, i);
	}

	// console.log(countInQuadrants(points, maxX, maxY).reduce((a, b) => a * b, 1));
};

run('sample', 11, 7, 100);
run('puzzle', 101, 103, 10000);
