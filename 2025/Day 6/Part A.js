import { getFileData } from '../../helpers/index.js';

// 123 328  51 64 
//  45 64  387 23 
//   6 98  215 314
// *   +   *   +  

// 123 * 45 * 6 = 33210
// 328 + 64 + 98 = 490
// 51 * 387 * 215 = 4243455
// 64 + 23 + 314 = 401

const run = (puzzle) => {
	const data = getFileData(import.meta, puzzle);

	// Parse input: separate number rows from operator row
	const numberRows = [];
	const operatorRow = [];

	for (const line of data) {
		const parts = line.split(' ').filter(p => p !== '');
		if (!parts.length) continue;

		const isOperatorRow = /[*+\-/]/.test(parts[0]);
		if (isOperatorRow) {
			operatorRow.push(...parts);
		} else {
			numberRows.push(parts.map(Number));
		}
	}

	// Operate function: applies operator to all numbers in a column
	const operate = (columnNumbers, operator) => {
		const operations = {
			'*': (a, b) => a * b,
			'+': (a, b) => a + b,
			'-': (a, b) => a - b,
			'/': (a, b) => a / b
		};
		const operation = operations[operator];
		return columnNumbers.slice(1).reduce(operation, columnNumbers[0]);
	};

	// Process each column: apply operator to all numbers in that column
	const columnResults = [];
	const numColumns = numberRows[0].length;

	for (let col = 0; col < numColumns; col++) {
		const columnNumbers = numberRows.map(row => row[col]);
		const operator = operatorRow[col];
		const result = operate(columnNumbers, operator);
		columnResults.push(result);
	}

	// Sum all column results
	const total = columnResults.reduce((sum, result) => sum + result, 0);
	console.log(puzzle, total);
}

run('sample');
run('puzzle');
