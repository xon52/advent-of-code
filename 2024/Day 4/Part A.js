import { getFileData } from '../../helpers/index.js';

// Find the word XMAS in the grid

const run = (puzzle) => {
	const data = getFileData(import.meta, puzzle);
	const grid = data.map((line) => line.split(''));
	const word = 'XMAS';
	const wordLength = word.length;
	const gridLength = grid[0].length;
	const directions = [
		[0, 1], // right
		[0, -1], // left
		[1, 0], // down
		[-1, 0], // up
		[1, 1], // down right
		[1, -1], // down left
		[-1, 1], // up right
		[-1, -1], // up left
	];
	let result = 0;

	const checkWord = (row, col, direction) => {
		for (let i = 0; i < wordLength; i++) {
			const newRow = row + i * direction[0];
			const newCol = col + i * direction[1];
			if (newRow < 0 || newRow >= grid.length || newCol < 0 || newCol >= gridLength) {
				return false;
			}
			if (grid[newRow][newCol] !== word[i]) {
				return false;
			}
		}
		return true;
	};

	for (let row = 0; row < grid.length; row++) {
		for (let col = 0; col < gridLength; col++) {
			for (let direction of directions) {
				if (checkWord(row, col, direction)) {
					result++;
				}
			}
		}
	}

	console.log(puzzle, result);
};

run('sample');
run('puzzle');
