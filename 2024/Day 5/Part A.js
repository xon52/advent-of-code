import { getFileData } from '../../helpers/index.js';

// Find the word XMAS in the grid

const run = (puzzle) => {
	const data = getFileData(import.meta, puzzle);
	const emptyString = data.findIndex((item) => item === '');
	const rules = data.slice(0, emptyString);
	const messages = data.slice(emptyString + 1);

	const orderedNumbers = [];
	const addNumbers = (before, after) => {
		const hasAfter = orderedNumbers.includes(after);
		const hasBefore = orderedNumbers.includes(before);
		if (!hasAfter && !hasBefore) {
			orderedNumbers.push(before);
			orderedNumbers.push(after);
		} else if (hasAfter && !hasBefore) {
			orderedNumbers.splice(orderedNumbers.indexOf(after), 0, before);
		} else if (!hasAfter && hasBefore) {
			orderedNumbers.splice(orderedNumbers.indexOf(before) + 1, 0, after);
		} else if (hasAfter && hasBefore) {
			const beforeIndex = orderedNumbers.indexOf(before);
			const afterIndex = orderedNumbers.indexOf(after);
			if (beforeIndex > afterIndex) {
				orderedNumbers.splice(afterIndex, 1);
				orderedNumbers.splice(beforeIndex, 0, after);
			}
		}
	};
	rules.forEach((rule) => {
		const [id, after] = rule.split('|');
		addNumbers(id, after);
	});
	console.log('orderedNumbers', orderedNumbers);

	const matchesOrder = (message) => {
		const numbers = message.split(',');
		const indexes = [];
		numbers.forEach((number) => {
			if (orderedNumbers.indexOf(number) !== -1) {
				indexes.push(orderedNumbers.indexOf(number));
			}
		});
		// console.log(message, indexes);
		return indexes.every((index, i) => i === 0 || index > indexes[i - 1]);
	};

	const getMiddleNumber = (message) => {
		const numbers = message.split(',').map((item) => parseInt(item));
		const length = numbers.length;
		const middleIndex = Math.floor(length / 2);
		return numbers[middleIndex];
	};

	let result = 0;
	messages.forEach((message) => {
		if (matchesOrder(message)) {
			// console.log('message', message, getMiddleNumber(message));
			result += getMiddleNumber(message);
		}
	});

	console.log(puzzle, result);
};

run('sample');
run('puzzle');
