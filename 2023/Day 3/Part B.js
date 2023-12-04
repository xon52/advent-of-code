import { getFileData } from '../../helpers/index.js';

const reDigits = /[0-9]+/g;
const reSymbols = /[*]/g;

// Get position of number
const getPositionsAroundNumber = (row, startCol, number) => {
	const positions = [];
	// Previous Row
	for (let i = startCol - 1; i < startCol + number.length + 1; i++) positions.push([row - 1, i]);
	// Current Row
	positions.push([row, startCol - 1]);
	positions.push([row, startCol + number.length]);
	// Next Row
	for (let i = startCol - 1; i < startCol + number.length + 1; i++) positions.push([row + 1, i]);
	return positions;
};

const run = (puzzle) => {
	const data = getFileData(import.meta, puzzle);
	const numbersToAdd = [];
	const foundGears = {};
	data.forEach((rowData, rowIndex) => {
		const numbersToCheck = [...rowData.matchAll(reDigits)];
		numbersToCheck.forEach((n) => {
			const positionsToCheck = getPositionsAroundNumber(rowIndex, n.index, n[0]);
			const allMatch = positionsToCheck.some((p) => {
				// Early returns for high/low rows/cols
				if (p[0] < 0 || p[0] > data.length - 1) return false;
				if (p[1] < 0 || p[1] > data[0].length - 1) return false;
				const foundGear = data[p[0]][p[1]].match(reSymbols);
				if (foundGear !== null) {
					if (!foundGears[`${p[0]},${p[1]}`]) foundGears[`${p[0]},${p[1]}`] = [];
					foundGears[`${p[0]},${p[1]}`].push(n[0]);
				}
				return foundGear;
			});
			if (allMatch) numbersToAdd.push(n[0]);
		});
	});
	// console.log(foundGears);
	let result = 0;
	Object.values(foundGears)
		.filter((g) => g.length === 2)
		.forEach((g) => {
			result += +g[0] * +g[1];
		});
	console.log(puzzle, result);
};

run('sample');
run('puzzle');
