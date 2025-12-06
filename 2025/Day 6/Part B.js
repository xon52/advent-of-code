import { getFileData } from '../../helpers/index.js';

// 123 328  51 64 
//  45 64  387 23 
//   6 98  215 314
// *   +   *   +  

// The rightmost problem is 4 + 431 + 623 = 1058
// The second problem from the right is 175 * 581 * 32 = 3253600
// The third problem from the right is 8 + 248 + 369 = 625
// Finally, the leftmost problem is 356 * 24 * 1 = 8544

const run = (puzzle) => {
	const data = getFileData(import.meta, puzzle);
	const rows = data.length;
	const cols = data[0].length;
	const operators = [];
	const columnNumbers = [];

	let currentGroup = 0;

	const operate = (numbers, operator) => {
		const operations = {
			'*': (a, b) => a * b,
			'+': (a, b) => a + b
		};
		return numbers.slice(1).reduce(operations[operator], numbers[0]);
	};

	for (let col = 0; col < cols; col++) {
		if (!columnNumbers[currentGroup]) columnNumbers[currentGroup] = [];

		let numberStr = '';
		for (let row = 0; row < rows - 1; row++) {
			if (data[row][col] !== '') {
				numberStr += data[row][col];
			}
		}

		const number = Number(numberStr);
		if (number !== 0) {
			columnNumbers[currentGroup].push(number);
		} else {
			currentGroup++;
		}

		if (data[rows - 1][col] !== ' ') {
			operators.push(data[rows - 1][col]);
		}
	}

	const results = columnNumbers.map((numbers, i) => operate(numbers, operators[i]));
	const total = results.reduce((sum, result) => sum + result, 0);

	console.log(puzzle, total);
}

run('sample');
run('puzzle');
