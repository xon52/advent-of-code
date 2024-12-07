import { getFileData } from '../../helpers/index.js';

/*
Example data:
....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#...

^ - Guard starting point and direction (up)
# - Wall

Example result:
....#.....
....XXXXX#
....X...X.
..#.X...X.
..XXXXX#X.
..X.X.X.X.
.#XXXXXXX.
.XXXXXXX#.
#XXXXXXX..
......#X..

X - Path

Final answer is the number of Xs in the result (41).

*/

const run = (puzzle) => {
	const data = getFileData(import.meta, puzzle);
	const grid = data.map((row) => row.split(''));
	const [startX, startY] = grid.reduce((acc, row, y) => {
		const x = row.indexOf('^');
		if (x > -1) {
			acc = [x, y];
		}
		return acc;
	}, []);

	const directions = [
		[0, -1], // Up
		[1, 0], // Right
		[0, 1], // Down
		[-1, 0], // Left
	];

	let x = startX;
	let y = startY;
	let direction = 0;

	const stepForward = () => {
		try {
			if (grid[y][x] === '.' || grid[y][x] === '^') {
				grid[y][x] = 'X';
			}
			let [dx, dy] = directions[direction];

			if (grid[y + dy][x + dx] === '#') {
				turnRight();
				[dx, dy] = directions[direction];
			}
			x += dx;
			y += dy;
			return x >= 0 && x < grid[0].length && y >= 0 && y < grid.length;
		} catch (e) {
			return false;
		}
	};

	const turnRight = () => {
		direction = (direction + 1) % 4;
	};

	while (stepForward()) {
		// console.log(grid.map((row) => row.join('')).join('\n'));
	}

	const result = grid.reduce((acc, row) => acc + row.filter((cell) => cell === 'X').length, 0);

	console.log(grid.map((row) => row.join('')).join('\n'));

	console.log(puzzle, result);
};

run('sample');
run('puzzle');
