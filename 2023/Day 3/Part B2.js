import { getFileData } from '../../helpers/index.js';

const reDigits = /[0-9]+/g;
const reSymbols = /[^.0-9]/g;

// Get position of gears
const getPositionsAroundGear = (row, col) => {
	const positions = [];
	// Previous Row
	for (let i = col - 1; i < col + 2; i++) positions.push([row - 1, i]);
	// Current Row
	positions.push([row, col - 1]);
	positions.push([row, col + 1]);
	// Next Row
	for (let i = col - 1; i < col + 2; i++) positions.push([row + 1, i]);
	return positions;
};

const run = (puzzle) => {
	const data = getFileData(import.meta, puzzle);
	const gearPositions = [];
	data.forEach((rowData, rowIndex) => {
		[...rowData.matchAll(/[*]/g)].forEach((match) => {
			gearPositions.push([rowIndex, match.index]);
		});
	});

	console.log(gearPositions);

	// const numbersToAdd = [];
	// data.forEach((rowData, rowIndex) => {
	// 	const numbersToCheck = [...rowData.matchAll(reDigits)];
	// 	numbersToCheck.forEach((n) => {
	// 		const positionsToCheck = getPositionsAroundNumber(rowIndex, n.index, n[0]);
	// 		const allMatch = positionsToCheck.some((p) => {
	// 			// Early returns for high/low rows/cols
	// 			if (p[0] < 0 || p[0] > data.length - 1) return false;
	// 			if (p[1] < 0 || p[1] > data[0].length - 1) return false;
	// 			return data[p[0]][p[1]].match(reSymbols);
	// 		});
	// 		if (allMatch) numbersToAdd.push(n[0]);
	// 	});
	// });

	// const result = numbersToAdd.reduce((p, c) => +p + +c, 0);
	// console.log(puzzle, result);
};

run('sample');
run('puzzle');
