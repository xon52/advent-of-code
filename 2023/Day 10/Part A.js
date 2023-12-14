import { getFileData } from '../../helpers/index.js';

const target = 'puzzle';

const data = getFileData(import.meta, target);
const grid = data.map((e) => e.split(''));
// Get start position
const start = [];
startloop: for (let r = 0; r < data.length; r++) {
	for (let c = 0; c < data[0].length; c++) {
		if (grid[r][c] === 'S') {
			start.push(r, c);
			break startloop;
		}
	}
}

// Fake Grid
const fakeGrid = [];
data.forEach((e) => fakeGrid.push(new Array(data[0].length).fill('.')));
fakeGrid[start[0]][start[1]] = 'S';

// Path and first step
let path = [[start[0], start[1]]];

// Possible moves
const canNorth = (r, c) => grid[r - 1][c].match(/[|7FS]/);
const canSouth = (r, c) => grid[r + 1][c].match(/[|LJS]/);
const canEast = (r, c) => grid[r][c + 1].match(/[-7JS]/);
const canWest = (r, c) => grid[r][c - 1].match(/[-LFS]/);

// Moves
let prevDir = 'none';
const moveNorth = (r, c) => {
	path.push([r - 1, c]);
	prevDir = 'north';
	fakeGrid[r - 1][c] = '↑';
};
const moveSouth = (r, c) => {
	path.push([r + 1, c]);
	prevDir = 'south';
	fakeGrid[r + 1][c] = '↓';
};
const moveEast = (r, c) => {
	path.push([r, c + 1]);
	prevDir = 'east';
	fakeGrid[r][c + 1] = '→';
};
const moveWest = (r, c) => {
	path.push([r, c - 1]);
	prevDir = 'west';
	fakeGrid[r][c - 1] = '←';
};

// First move
if (canNorth(start[0], start[1])) moveNorth(start[0], start[1]);
else if (canSouth(start[0], start[1])) moveSouth(start[0], start[1]);
else if (canEast(start[0], start[1])) moveEast(start[0], start[1]);
else if (canWest(start[0], start[1])) moveWest(start[0], start[1]);

// Generate path from start
while (true) {
	let curr = grid[path[path.length - 1][0]][path[path.length - 1][1]];
	let [r, c] = [path[path.length - 1][0], path[path.length - 1][1]];

	if (curr === 'S') break;
	else if (curr === '7') prevDir === 'north' ? moveWest(r, c) : moveSouth(r, c);
	else if (curr === 'F') prevDir === 'north' ? moveEast(r, c) : moveSouth(r, c);
	else if (curr === 'L') prevDir === 'south' ? moveEast(r, c) : moveNorth(r, c);
	else if (curr === 'J') prevDir === 'south' ? moveWest(r, c) : moveNorth(r, c);
	else if (curr === '|') prevDir === 'south' ? moveSouth(r, c) : moveNorth(r, c);
	else if (curr === '-') prevDir === 'east' ? moveEast(r, c) : moveWest(r, c);
	else console.error('Error', curr);
}

console.log(fakeGrid.splice(0).map((e) => e.join('')));
console.log((path.length - 1) / 2);
