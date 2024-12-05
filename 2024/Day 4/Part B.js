import { getFileData } from '../../helpers/index.js';

// Find two instances of the word MAS in the shape of an X within the grid

const run = (puzzle) => {
	const data = getFileData(import.meta, puzzle);
	const grid = data.map((line) => line.split(''));
	const word = 'MAS';
	const wordLength = word.length;
	const gridLength = grid[0].length;

	// if so, increment result
	let result = 0;
	for (let row = 1; row < grid.length - 1; row++) {
		for (let col = 1; col < gridLength - 1; col++) {
			if (grid[row][col] === 'A') {
				if (grid[row - 1][col - 1] === 'M') {
					if (grid[row + 1][col + 1] !== 'S') {
						continue;
					}
				} else if (grid[row - 1][col - 1] === 'S') {
					if (grid[row + 1][col + 1] !== 'M') {
						continue;
					}
				} else {
					continue;
				}
				if (grid[row - 1][col + 1] === 'M') {
					if (grid[row + 1][col - 1] !== 'S') {
						continue;
					}
				} else if (grid[row - 1][col + 1] === 'S') {
					if (grid[row + 1][col - 1] !== 'M') {
						continue;
					}
				} else {
					continue;
				}

				// display the found X
				console.log(grid[row - 1][col - 1], grid[row - 1][col], grid[row - 1][col + 1]);
				console.log(grid[row][col - 1], grid[row][col], grid[row][col + 1]);
				console.log(grid[row + 1][col - 1], grid[row + 1][col], grid[row + 1][col + 1]);
				console.log('');

				result++;
			}
		}
	}

	console.log(puzzle, result);
};

run('sample');
run('puzzle');
