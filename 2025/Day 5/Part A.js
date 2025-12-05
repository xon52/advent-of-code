import { getFileData } from '../../helpers/index.js';

const run = (puzzle) => {
	const data = getFileData(import.meta, puzzle);
	const freshRanges = data.slice(0, data.indexOf('')).map((line) => line.split('-').map(Number));
	const availableIngredients = data.slice(data.indexOf('') + 1).map(Number);
	const freshIngredients = [];

	for (const ingredient of availableIngredients) {
		if (freshRanges.some((range) => ingredient >= range[0] && ingredient <= range[1])) {
			freshIngredients.push(ingredient);
		}
	}

	console.log(puzzle, freshIngredients.length);
};

run('sample');
run('puzzle');
